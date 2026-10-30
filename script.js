// =============================================================
// 2.03 Fetch + async/await: Friends Cards (STARTER)
// This version loads friends.json with XMLHttpRequest, and it works.
// Your job: convert loadFriends() to fetch (Checkpoint 2), then
// to async/await (Checkpoint 3).
// =============================================================

// Supplied page connections. Keep these IDs unchanged.
const loadButton = document.getElementById("loadFriends");
const cardsContainer = document.getElementById("cards");
const statusMessage = document.getElementById("status");

loadButton.addEventListener("click", loadFriends);

// -------------------------------------------------------------
// loadFriends: CURRENT VERSION, uses XMLHttpRequest.
// Checkpoints 2 and 3 replace this whole function.
// -------------------------------------------------------------

// unfortunatley I did not initliazie so I do not have commits for each section mb gang
async function loadFriends() {

  statusMessage.classList.remove("error");
  statusMessage.textContent = "Loading friends...";
  try {
    const response = await fetch("friends.json");
    if (!response.ok) { // 404 needs this becuase otherwise if the error is a 404 it won't throw the error. Response.ok checks if it lands between 200 and 300
      throw new Error("Network response was not ok");
    }
    const friends = await response.json();
    renderFriends(friends);
    console.log(friends);

  } catch (error) {
    showLoadError();
  }

  // fetch version without async/await (using .then/.catch)
  /*
  fetch("friends.json")
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("Network response was not ok");

    })
    .then(data => {
      renderFriends(data);
      console.log(data);
    })
    .catch(() => {
      showLoadError();
    });
    */
}


// -------------------------------------------------------------
// renderFriends: turns the array into cards. Do not change it for this lesson.
// -------------------------------------------------------------
function renderFriends(friends) {
  let cardsHTML = "";

  friends.forEach(function (friend) {
    cardsHTML += `
      <div class="col-12 col-md-6 col-lg-4">
        <article class="card h-100">
          <div class="card-body">
            <h2 class="card-title h4">${friend.name}</h2>
            <p class="relationship">${friend.relationship}</p>
            <p>${friend.detail}</p>
            <p class="hobbies"><strong>Hobbies:</strong> ${friend.hobbies.join(", ")}</p>
          </div>
        </article>
      </div>`;
  });

  cardsContainer.innerHTML = cardsHTML;
  statusMessage.classList.remove("error");
  statusMessage.textContent = `${friends.length} friends loaded.`;
}

// =============================================================
// Supplied helpers. Do not change these.
// =============================================================

// Call when the file cannot be loaded: wrong name, 404, or no connection.
function showLoadError() {
  cardsContainer.innerHTML = "";
  statusMessage.classList.add("error");
  statusMessage.textContent =
    "Could not load friends. Check the JSON file name and path, then try again.";
}

// Call when the file loaded but its JSON is broken.
function showDataError(error) {
  cardsContainer.innerHTML = "";
  statusMessage.classList.add("error");
  statusMessage.textContent =
    "friends.json loaded, but its data could not be used. Check quotes, commas, brackets, and key names.";
  console.error("Data problem:", error.message);
}
