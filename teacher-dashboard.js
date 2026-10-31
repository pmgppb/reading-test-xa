const TEACHER_PASSWORD = "20ppbibt26";
const SUBMISSION_COLLECTION = "reading_test_submissions";

function getDb() {
  if (window.db && typeof window.db.collection === "function") return window.db;

  if (window.firebase && firebase.apps && firebase.apps.length) {
    window.db = firebase.firestore();
    return window.db;
  }

  return null;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[c]);
}

function showLogin() {
  document.getElementById("teacher-login-screen").hidden = false;
  document.getElementById("teacher-dashboard-screen").hidden = true;
}

function showDashboard() {
  document.getElementById("teacher-login-screen").hidden = true;
  document.getElementById("teacher-dashboard-screen").hidden = false;
}

function renderRows(rows) {
  const tbody = document.getElementById("submission-table-body");
  if (!rows.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" class="empty-state">No submissions yet.</td>
      </tr>
    `;
    document.getElementById("submission-count").textContent = "0";
    document.getElementById("student-count").textContent = "0";
    return;
  }

  const uniqueStudents = new Set(rows.map((row) => row.studentFullName)).size;

  document.getElementById("submission-count").textContent = String(rows.length);
  document.getElementById("student-count").textContent = String(uniqueStudents);

  tbody.innerHTML = rows.map((row) => {
    const answered = Array.isArray(row.answeredQuestionNumbers) ? row.answeredQuestionNumbers : [];
    const unanswered = Array.isArray(row.unansweredQuestionNumbers) ? row.unansweredQuestionNumbers : [];
    const unscored = Array.isArray(row.unscoredQuestionNumbers) ? row.unscoredQuestionNumbers : [];

    return `
      <tr>
        <td>${escapeHtml(row.studentFullName)}</td>
        <td>Module ${row.module}</td>
        <td>${escapeHtml(row.score ?? 0)}/${escapeHtml(row.maxScore ?? 0)}</td>
        <td>${answered.length}/${row.maxScore ?? 0}</td>
        <td>${answered.length ? escapeHtml(answered.join(", ")) : "—"}</td>
        <td>${unanswered.length ? escapeHtml(unanswered.join(", ")) : "—"}</td>
        <td>${unscored.length ? escapeHtml(unscored.join(", ")) : "—"}</td>
        <td>${escapeHtml(new Date(row.submittedAt || Date.now()).toLocaleString())}</td>
      </tr>
    `;
  }).join("");
}

function setupRealtimeDashboard() {
  const db = getDb();

  if (!db) {
    const tbody = document.getElementById("submission-table-body");
    tbody.innerHTML = `
      <tr>
        <td colspan="8" class="empty-state">Firebase config is missing. Add your web config in firebase-config.js.</td>
      </tr>
    `;
    return;
  }

  db.collection(SUBMISSION_COLLECTION)
    .orderBy("submittedAt", "desc")
    .onSnapshot((snapshot) => {
      const rows = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      renderRows(rows);
    }, (error) => {
      console.error("Dashboard snapshot error:", error);
      const tbody = document.getElementById("submission-table-body");
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="empty-state">Unable to load submissions. Check Firestore permissions.</td>
        </tr>
      `;
    });
}

document.getElementById("teacher-login-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const password = document.getElementById("teacher-password").value;
  const error = document.getElementById("teacher-error");

  if (password === TEACHER_PASSWORD) {
    sessionStorage.setItem("teacherDashboardUnlocked", "true");
    error.hidden = true;
    showDashboard();
    setupRealtimeDashboard();
  } else {
    error.hidden = false;
  }
});

document.getElementById("logout-btn").addEventListener("click", () => {
  sessionStorage.removeItem("teacherDashboardUnlocked");
  document.getElementById("teacher-password").value = "";
  document.getElementById("teacher-error").hidden = true;
  showLogin();
});

const alreadyUnlocked = sessionStorage.getItem("teacherDashboardUnlocked") === "true";
if (alreadyUnlocked) {
  showDashboard();
  setupRealtimeDashboard();
} else {
  showLogin();
}
