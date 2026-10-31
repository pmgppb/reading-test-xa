// Source-based question content. The key is kept client-side only for mock-test scoring;
// this is suitable for practice, not a high-stakes or secure examination.
const TEST_DATA = {
  1: {
    title: "Module 1",
    minutes: 20,
    total: 35,
    scoredMax: 20,
    passages: {
      rooftop: {
        title: "Complete the Words",
        html: `
          <h4>Complete the Words</h4>
          <p class="task-instruction">Fill in the missing letters in the words marked with underscores. Enter only the missing letters.</p>
          <p>
            The university's new rooftop garden was de<span class="slot">[1]</span>ned to re<span class="slot">[2]</span>ce building heat and provide a small ha<span class="slot">[3]</span>at for pollinators.
            During the first year, students rec<span class="slot">[4]</span>ed the number of visiting insects and co<span class="slot">[5]</span>ed the results with data from nearby ground-level gardens.
            Although the rooftop space had fewer plant var<span class="slot">[6]</span>ties, it at<span class="slot">[7]</span>ted a surprising range of bees and butterflies.
            Res<span class="slot">[8]</span>hers concluded that careful plant selec<span class="slot">[9]</span>n can compen<span class="slot">[10]</span>te for the limits of a compact urban garden.
          </p>
        `
      },
      coastal: {
        title: "Complete the Words",
        html: `
          <h4>Complete the Words</h4>
          <p class="task-instruction">Fill in the missing letters in the words marked with underscores. Enter only the missing letters.</p>
          <p>
            In many coastal reg<span class="slot">[11]</span>s, mangrove forests act as natural barri<span class="slot">[12]</span>s during storms.
            Their tangled roots slow moving water, trap sediment, and create shel<span class="slot">[13]</span>ed areas where young fish can develop.
            Scientists have also found that mangrove soils can store sub<span class="slot">[14]</span>tial amounts of carbon.
            Yet these forests are often cl<span class="slot">[15]</span>ed for construction or aquacul<span class="slot">[16]</span>re.
            Recent res<span class="slot">[17]</span>ation projects suggest that protecting ex<span class="slot">[18]</span>ing mangroves may be more ef<span class="slot">[19]</span>cient than rebuilding them after exte<span class="slot">[20]</span>ive damage has occurred.
          </p>
        `
      },
      flu: {
        title: "Read in Daily Life",
        html: `
          <h4>Campus Health Notice - Flu Vaccination Clinic</h4>
          <div class="vaccination-box">
            <p>Walk-in appointments are available in Room 214 from 10:00 a.m. to 3:00 p.m. on Thursday. Students should bring their university ID. If you have received a vaccination elsewhere this season, you do not need another dose unless a medical professional has advised otherwise.
          </p>
        `
      },
      student: {
        title: "Read in Daily Life",
        html: `
          <h4>Student Housing</h4>
          <div class="housing-box">
            <p>The heating system in Oak Hall will be inspected on Monday afternoon. Maintenance staff may need access to bedrooms between 1:00 and 4:00 p.m. Residents who will not be present should use the online portal to authorize access. The inspection is expected to take less than twenty minutes per room.
          </p>
        `
      },
      library: {
        title: "Read in Daily Life",
        html: `
          <h4>Library Update</h4>
          <div class="update-box">
            <p>Starting next week, the second floor will remain open until midnight on weekdays. The change is intended to provide more study space during the examination period. The first floor will continue to close at 10:00 p.m., and group-study rooms must still be reserved in advance.
          </p>
        `
      },
      club: {
        title: "Read in Daily Life",
        html: `
          <h4>Club Announcement</h4>
          <div class="announcement-box">
            <p>The Environmental Society has moved its weekly meeting from Wednesday to Tuesday because the usual room is being used for a guest lecture. The meeting will still begin at 5:30 p.m. Members who cannot attend may submit questions through the club's discussion board.
          </p>
          </div>
        `
      },
      seed: {
        title: "Read an Academic Passage",
        html: `
          <h3>Biology: Why Some Seeds Remain Dormant</h3>
          <p>Many plants produce seeds that do not germinate immediately after they mature. This condition, known as seed dormancy, can appear to be inefficient because a dormant seed does not produce a new plant at once. However, dormancy can protect a species when environmental conditions are temporarily unsuitable. A seed may remain inactive until temperature, moisture, or light reaches a level favorable for growth.</p>
          <p>Dormancy also changes the timing of competition. If every seed germinated as soon as it became mature, a sudden period of drought could eliminate a large group of seedlings at the same time. By spreading germination across different seasons or years, a plant population reduces the risk that one unfavorable period will affect every new individual. Some seeds therefore remain dormant for several years.</p>
          <p>Scientists distinguish between forms of dormancy. In physical dormancy, a hard seed coat prevents water from entering. In physiological dormancy, chemical conditions inside the seed inhibit growth. Some species combine these mechanisms. Researchers study such differences because agricultural crops with predictable germination are easier to manage, while wild plants may benefit from more variable timing. Thus, dormancy should not be viewed simply as delayed growth; it is a strategy that can improve survival in uncertain environments.</p>
        `
      },
      markets: {
        title: "Read an Academic Passage",
        html: `
          <h3>History: Markets and the Growth of Medieval Towns</h3>
          <p>In medieval Europe, markets were more than places where goods were exchanged. Regular markets created predictable opportunities for farmers, artisans, and traveling merchants to meet. As these gatherings became more frequent, settlements near market sites could attract permanent shops and workshops. Over time, some small settlements developed into towns with more specialized economic activity.</p>
          <p>The growth of a market did not automatically guarantee urban expansion. Roads, political protection, and access to water were also important. A market located on a difficult-to-reach hill, for example, might attract fewer traders than one situated near a river crossing. Local rulers sometimes encouraged markets because they could collect fees from commerce, but those same rulers also had to maintain order and protect traders.</p>
          <p>Markets therefore influenced town development through several connected processes. They increased the frequency of economic interaction, encouraged specialization, and could attract people who provided services to merchants. Yet their effects depended on geography and political conditions. The development of a town was usually the result of several reinforcing factors rather than a single economic event.</p>
        `
      }
    },
    questions: [
      { n: 1, p: "rooftop", type: "text", prefix: "de", suffix: "ned", answer: "designed", scored: true },
      { n: 2, p: "rooftop", type: "text", prefix: "re", suffix: "ce", answer: "reduce", scored: true },
      { n: 3, p: "rooftop", type: "text", prefix: "ha", suffix: "at", answer: "habitat", scored: true },
      { n: 4, p: "rooftop", type: "text", prefix: "rec", suffix: "ed", answer: "recorded", scored: true },
      { n: 5, p: "rooftop", type: "text", prefix: "co", suffix: "ed", answer: "compared", scored: true },
      { n: 6, p: "rooftop", type: "text", prefix: "var", suffix: "ties", answer: "varieties", scored: true },
      { n: 7, p: "rooftop", type: "text", prefix: "at", suffix: "ted", answer: "attracted", scored: true },
      { n: 8, p: "rooftop", type: "text", prefix: "Res", suffix: "hers", answer: "Researchers", scored: true },
      { n: 9, p: "rooftop", type: "text", prefix: "selec", suffix: "n", answer: "selection", scored: true },
      { n: 10, p: "rooftop", type: "text", prefix: "compen", suffix: "te", answer: "compensate", scored: true },

      { n: 11, p: "coastal", type: "text", prefix: "reg", suffix: "s", answer: "regions", scored: false },
      { n: 12, p: "coastal", type: "text", prefix: "barri", suffix: "s", answer: "barriers", scored: false },
      { n: 13, p: "coastal", type: "text", prefix: "shel", suffix: "ed", answer: "sheltered", scored: false },
      { n: 14, p: "coastal", type: "text", prefix: "sub", suffix: "tial", answer: "substantial", scored: false },
      { n: 15, p: "coastal", type: "text", prefix: "cl", suffix: "ed", answer: "cleared", scored: false },
      { n: 16, p: "coastal", type: "text", prefix: "aquacul", suffix: "re", answer: "aquaculture", scored: false },
      { n: 17, p: "coastal", type: "text", prefix: "res", suffix: "ation", answer: "restoration", scored: false },
      { n: 18, p: "coastal", type: "text", prefix: "ex", suffix: "ing", answer: "existing", scored: false },
      { n: 19, p: "coastal", type: "text", prefix: "ef", suffix: "cient", answer: "efficient", scored: false },
      { n: 20, p: "coastal", type: "text", prefix: "exte", suffix: "ive", answer: "extensive", scored: false },

      { n: 21, p: "flu", type: "mc", stem: "Who is the notice primarily for?", options: ["Visitors to the campus", "Students", "Clinic employees", "Medical researchers"], answer: "B", scored: true },
      { n: 22, p: "flu", type: "mc", stem: "What should students bring?", options: ["A prescription", "Proof of insurance", "University identification", "A completed research survey"], answer: "C", scored: true },
      { n: 23, p: "student", type: "mc", stem: "What are residents asked to do if they will be away?", options: ["Call the heating company", "Leave their room unlocked", "Authorize access online", "Move to another residence"], answer: "C", scored: true },
      { n: 24, p: "library", type: "mc", stem: "Why is the second floor staying open later?", options: ["A renovation is underway", "More study space is needed", "The first floor will be closed", "Students requested new furniture"], answer: "B", scored: true },
      { n: 25, p: "club", type: "mc", stem: "What changed?", options: ["The meeting room and time", "The meeting day", "The club's discussion board", "The topic of the meeting"], answer: "B", scored: true },

      { n: 26, p: "seed", type: "mc", stem: "What is the main purpose of the passage?", options: ["To describe how farmers can eliminate seed dormancy", "To explain why seed dormancy can help plants survive", "To compare seeds with seedlings", "To show that all dormant seeds are physically protected"], answer: "B", scored: false },
      { n: 27, p: "seed", type: "mc", stem: "According to paragraph 2, what is one advantage of spreading germination over time?", options: ["It increases the size of each seed", "It prevents all seedlings from being exposed to drought at once", "It removes competition among plants", "It guarantees that every seed germinates"], answer: "B", scored: false },
      { n: 28, p: "seed", type: "mc", stem: "The word 'inhibit' in paragraph 3 is closest in meaning to", options: ["encourage", "measure", "prevent", "observe"], answer: "C", scored: false },
      { n: 29, p: "seed", type: "mc", stem: "Why does the author mention agricultural crops?", options: ["To show that predictable germination can be useful in farming", "To argue that wild plants are easier to manage", "To explain how hard seed coats form", "To suggest that crops never experience dormancy"], answer: "A", scored: false },
      { n: 30, p: "seed", type: "mc", stem: "Which statement can be inferred about seed dormancy?", options: ["It always results from lack of sunlight", "It may involve more than one biological mechanism", "It is unique to plants in dry climates", "It prevents seeds from surviving for several years"], answer: "B", scored: false },

      { n: 31, p: "markets", type: "mc", stem: "According to the passage, why were regular markets important?", options: ["They replaced all agricultural activity", "They created recurring opportunities for economic exchange", "They guaranteed political protection", "They prevented towns from specializing"], answer: "B", scored: true },
      { n: 32, p: "markets", type: "mc", stem: "Why does the author mention a hill and a river crossing?", options: ["To illustrate how geography could affect market success", "To compare two medieval political systems", "To describe how merchants traveled by boat", "To explain why markets were usually built uphill"], answer: "A", scored: true },
      { n: 33, p: "markets", type: "mc", stem: "The word 'reinforcing' in paragraph 3 is closest in meaning to", options: ["weakening one another", "working together to strengthen an effect", "occurring at random", "replacing older traditions"], answer: "B", scored: true },
      { n: 34, p: "markets", type: "mc", stem: "What did local rulers sometimes gain from markets?", options: ["Free transportation", "Fees from commercial activity", "Control of agricultural production", "Permanent ownership of shops"], answer: "B", scored: true },
      { n: 35, p: "markets", type: "mc", stem: "What can be inferred about town development?", options: ["A market alone was usually sufficient", "Economic growth was unrelated to geography", "Several conditions often combined to support growth", "Political protection mattered only after towns were large"], answer: "C", scored: true }
    ]
  },

  2: {
    title: "Module 2",
    minutes: 9,
    total: 15,
    scoredMax: 15,
    passages: {
      navigation: {
        title: "Complete the Words",
        html: `
          <h3>Complete the Words</h3>
          <p class="task-instruction">Fill in the missing letters in the words shown by underscores.</p>
          <p>
            The university mu<span class="slot">[1]</span>um recently opened a small exh<span class="slot">[2]</span>it on the history of navig<span class="slot">[3]</span>ion.
            Early sailors depended on obser<span class="slot">[4]</span>tions of the stars, coastal landmarks, and seas<span class="slot">[5]</span>al winds.
            Over time, instr<span class="slot">[6]</span>ents such as the co<span class="slot">[7]</span>ass and the astro<span class="slot">[8]</span>be made it easier to determine direc<span class="slot">[9]</span>ion and estimate position.
            The exh__it also explains how printed charts grad<span class="slot">[10]</span>ally replaced hand-drawn maps and allowed information to be shared more widely.
          </p>
        `
      },
      urbanTrees: {
        title: "Read an Academic Passage",
        html: `
          <h3>Urban Trees and Heat</h3>
          <p>Cities often experience higher temperatures than nearby rural areas, a pattern commonly called the urban heat island effect. Buildings and paved surfaces absorb solar energy during the day and release it slowly after sunset. Trees can modify this pattern in several ways. Their leaves provide shade, while water released through transpiration can cool the surrounding air.</p>
          <p>However, the cooling effect of urban trees depends on location and maintenance. A tree planted where tall buildings block sunlight may grow slowly and provide limited shade. Trees that are not watered during extended droughts may also lose leaves, reducing their cooling contribution. In addition, the benefits of a tree are not distributed evenly across a city. Neighborhoods with fewer mature trees may remain substantially warmer. For these reasons, urban forestry programs increasingly focus on strategic placement rather than simply counting the number of trees planted. Researchers may combine temperature measurements with information about street design, building height, and tree canopy. The goal is to identify locations where new vegetation is most likely to reduce heat exposure for residents.</p>
        `
      }
    },
    questions: [
      { n: 1, p: "navigation", type: "text", prefix: "mu", suffix: "um", answer: "museum", scored: true },
      { n: 2, p: "navigation", type: "text", prefix: "exh", suffix: "it", answer: "exhibit", scored: true },
      { n: 3, p: "navigation", type: "text", prefix: "navig", suffix: "ion", answer: "navigation", scored: true },
      { n: 4, p: "navigation", type: "text", prefix: "obser", suffix: "tions", answer: "observations", scored: true },
      { n: 5, p: "navigation", type: "text", prefix: "seas", suffix: "al", answer: "seasonal", scored: true },
      { n: 6, p: "navigation", type: "text", prefix: "instr", suffix: "ents", answer: "instruments", scored: true },
      { n: 7, p: "navigation", type: "text", prefix: "co", suffix: "ass", answer: "compass", scored: true },
      { n: 8, p: "navigation", type: "text", prefix: "astro", suffix: "be", answer: "astrolabe", scored: true },
      { n: 9, p: "navigation", type: "text", prefix: "direc", suffix: "ion", answer: "direction", scored: true },
      { n: 10, p: "navigation", type: "text", prefix: "grad", suffix: "ally", answer: "gradually", scored: true },

      { n: 11, p: "urbanTrees", type: "mc", stem: "What is the passage mainly about?", options: ["How rural areas are becoming cities", "Why urban trees can reduce heat and why placement matters", "Why trees grow faster in cities than in rural areas", "How buildings are designed to store solar energy"], answer: "B", scored: true },
      { n: 12, p: "urbanTrees", type: "mc", stem: "According to paragraph 2, why may a tree near tall buildings provide limited cooling?", options: ["It receives less sunlight", "It produces too much water", "Its roots cannot reach pavement", "It always loses its leaves"], answer: "A", scored: true },
      { n: 13, p: "urbanTrees", type: "mc", stem: "The word 'strategic' in paragraph 3 is closest in meaning to", options: ["carefully planned", "temporary", "expensive", "unusual"], answer: "A", scored: true },
      { n: 14, p: "urbanTrees", type: "mc", stem: "Why do researchers combine temperature measurements with information about street design?", options: ["To determine where trees are likely to be most effective", "To estimate the age of urban buildings", "To identify neighborhoods with no residents", "To calculate how much rainfall a city receives"], answer: "A", scored: true },
      { n: 15, p: "urbanTrees", type: "mc", stem: "What does the passage imply about tree-planting programs?", options: ["Planting more trees everywhere automatically produces equal benefits", "The effectiveness of trees can vary across a city", "Trees are rarely useful during summer", "Maintenance is less important than tree species"], answer: "B", scored: true }
    ]
  }
};