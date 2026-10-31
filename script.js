/* Google Apps Script Web App URL */
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzZCl7L7_0aQNKp7yxfEod7VmljJQFD7Xey9vuca7Pzqolbht-rfgame56vYSf3_Gkx5A/exec";

const $ = (id) => document.getElementById(id);

let studentName = "";
let moduleNo = 1;
let currentIndex = 0;
let answers = { 1: {}, 2: {} };
let secondsLeft = TEST_DATA[1].minutes * 60;
let timerHandle = null;
let largeText = false;
let submitting = false;
let submittedModules = [];
let testFinished = false;

const optionLetters = ["A", "B", "C", "D"];

function initFirebase() {
  const config = window.firebaseConfig || (typeof firebaseConfig !== "undefined" ? firebaseConfig : null);

  if (!config) {
    return false;
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  if (!window.db) {
    window.db = firebase.firestore();
  }

  return !!window.db;
}

/* ---------- ANSWER HELPERS ---------- */

function normalizeAnswer(value) {
  return String(value ?? "")
    .trim()
    .toLocaleLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/\s+/g, " ");
}

function currentModule() {
  return TEST_DATA[moduleNo];
}

function currentQuestion() {
  return currentModule().questions[currentIndex];
}

function answered(q) {
  const v = answers[moduleNo][q.n];

  if (q.type !== "text") return Boolean(v);

  const prefix = q.prefix || "";
  const suffix = q.suffix || "";
  return String(v ?? "").trim().length > prefix.length + suffix.length;
}

function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[c]);
}

/* ---------- SCORING ---------- */

function scoreModule(num) {
  const data = TEST_DATA[num];
  let correct = 0;
  let scoredAnswered = 0;

  for (const q of data.questions) {
    if (!q.scored) continue;

    const response = answers[num][q.n];

    if (response !== undefined && String(response).trim() !== "") {
      scoredAnswered++;
    }

    if (q.type === "mc" && response === q.answer) {
      correct++;
    }

    if (
      q.type === "text" &&
      normalizeAnswer(response) === normalizeAnswer(q.answer)
    ) {
      correct++;
    }
  }

  return {
    correct,
    max: data.scoredMax,
    scoredAnswered
  };
}

function getSubmissionAnswerMeta(num) {
  const moduleQuestions = TEST_DATA[num].questions;

  return {
    answeredQuestionNumbers: moduleQuestions
      .filter((q) => answered(q))
      .map((q) => q.n),
    unansweredQuestionNumbers: moduleQuestions
      .filter((q) => !answered(q))
      .map((q) => q.n),
    unscoredQuestionNumbers: moduleQuestions
      .filter((q) => !q.scored)
      .map((q) => q.n)
  };
}

/* ---------- FIRESTORE STORAGE ---------- */

async function postModule(num, autoSubmitted = false) {
  const score = scoreModule(num);
  const answerMeta = getSubmissionAnswerMeta(num);

  const payload = {
    event: "module_submission",
    testName: "Reading Practice Test",
    studentFullName: studentName,
    module: num,
    moduleLabel: `Module ${num}`,
    submittedAt: new Date().toISOString(),
    autoSubmitted,
    score: score.correct,
    maxScore: score.max,
    scoredQuestionsAnswered: score.scoredAnswered,
    answeredQuestionNumbers: answerMeta.answeredQuestionNumbers,
    unansweredQuestionNumbers: answerMeta.unansweredQuestionNumbers,
    unscoredQuestionNumbers: answerMeta.unscoredQuestionNumbers,
    answers: TEST_DATA[num].questions.map((q) => ({
      questionNumber: q.n,
      answer: answers[num][q.n] ?? "",
      scored: q.scored,
      correctAnswer: q.scored ? q.answer : ""
    }))
  };

  try {
    if (initFirebase()) {
      await window.db.collection("reading_test_submissions").add(payload);
      return { saved: true, score };
    }
  } catch (err) {
    console.error("Firestore save failed:", err);
  }

  if (
    GOOGLE_SCRIPT_URL &&
    !GOOGLE_SCRIPT_URL.includes("PASTE_YOUR")
  ) {
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(payload)
      });
      return { saved: true, score };
    } catch (err) {
      console.error("Google Apps Script submission error:", err);
    }
  }

  console.warn("No submission backend configured; using local-only mode.", payload);
  return { saved: false, score };
}
