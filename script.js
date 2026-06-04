console.log("script loaded");

// Views
const routinesView = document.getElementById("routinesView");
const timerView = document.getElementById("timerView");
const settingsView = document.getElementById("settingsView");

// Docks Btns
const routinesBtn = document.getElementById("routinesBtn");
const timerBtn = document.getElementById("timerBtn");
const settingsBtn = document.getElementById("settingsBtn");

// loader function
async function loadRoutines() {
  try {
    const response = await fetch("./data/routines.json");

    const data = await response.json();

    console.log("loaded routines:");
    console.log(data);
  } catch (e) {
    console.error("Failed to load routines:");
    console.error(e);
  }
}

// func to switch views
function showView(viewName) {
  // hides all views
  routinesView.classList.add("hidden");
  timerView.classList.add("hidden");
  settingsView.classList.add("hidden");

  // makes all btn inactive
  routinesBtn.classList.remove("dock-active");
  timerBtn.classList.remove("dock-active");
  settingsBtn.classList.remove("dock-active");

  if (viewName === "routines") {
    routinesView.classList.remove("hidden");
    routinesBtn.classList.add("dock-active");
  }

  if (viewName === "timer") {
    timerView.classList.remove("hidden");
    timerBtn.classList.add("dock-active");
  }

  if (viewName === "settings") {
    settingsView.classList.remove("hidden");
    settingsBtn.classList.add("dock-active");
  }
}

// btns event listener
routinesBtn.addEventListener("click", () => {
  showView("routines");
});

timerBtn.addEventListener("click", () => {
  showView("timer");
});

settingsBtn.addEventListener("click", () => {
  showView("settings");
});

// Functions to run on start
loadRoutines();
showView("timer");
