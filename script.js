console.log("script loaded");

// timer states
let timerInterval = null; // holds the running setInterval
let totalTime = 0; // total time for the countdown
let timeLeft = 0; // current countdown value in seconds
let isRunning = false; // prevents double-start bugs

// timer countdown
const timerValueMin = document.getElementById("timerValueMin");
const timerValueSec = document.getElementById("timerValueSec");
const timerValueRadial = document.getElementById("timerValueRadial");

// timer btns
const timerResetBtn = document.getElementById("timerResetBtn");
const timerStartBtn = document.getElementById("timerStartBtn");
const timerSkipBtn = document.getElementById("timerSkipBtn");

// Views
const routinesView = document.getElementById("routinesView");
const timerView = document.getElementById("timerView");
const settingsView = document.getElementById("settingsView");

// Docks Btns
const routinesBtn = document.getElementById("routinesBtn");
const timerBtn = document.getElementById("timerBtn");
const settingsBtn = document.getElementById("settingsBtn");

// routine list
const routinesList = document.getElementById("routinesList");

// loader function for json
async function loadRoutines() {
  try {
    const response = await fetch("./data/routines.json");

    const data = await response.json();

    renderRoutines(data.routines);

    console.log("loaded routines:");
    console.log(data);
  } catch (e) {
    console.error("Failed to load routines:");
    console.error(e);
  }
}

// func to render the json
function renderRoutines(routines) {
  routinesList.innerHTML = ""; // clears existing content

  routines.forEach((routine) => {
    const listItem = createRoutinelistItem(routine);
    routinesList.appendChild(listItem);
  });
}

// func to create routine listItem
function createRoutinelistItem(routine) {
  const wrapper = document.createElement("div");

  wrapper.innerHTML = `
    <div tabindex='0' class='collapse collapse-arrow'>
        <div class='collapse-title font-semibold'>
            <div class='flex flex-row justify-between'>
                <span>${routine.name}</span>
                <input type="checkbox" class="toggle" ${routine.enabled ? "checked" : ""}/>
            </div>
        </div>
        <div class='collapse-content text-sm'>
            <span>
                sets: ${routine.sets} <br>
                reps: ${routine.reps} <br>
                hang time: ${routine.hangTime}s <br>
                rest time: ${routine.restTime}s <br>
                rest between sets: ${routine.restBetweenSets}s <br>
            </span>
        </div>
    </div>
    `;
  return wrapper;
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

timerStartBtn.addEventListener("click", () => {
  startTimer(10);
});

// timer functions

// update display
function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const percentage = (timeLeft / totalTime) * 100;

  // updates minutes
  timerValueMin.style.setProperty("--value", minutes);
  timerValueMin.setAttribute("aria-label", String(minutes).padStart(2, "0"));
  timerValueMin.textContent = String(minutes).padStart(2, "0");

  // updates seconds
  timerValueSec.style.setProperty("--value", seconds);
  timerValueSec.setAttribute("aria-label", String(seconds).padStart(2, "0"));
  timerValueSec.textContent = String(seconds).padStart(2, "0");

  // updates the countdown cirlce
  timerValueRadial.style.setProperty("--value", percentage);
  timerValueRadial.setAttribute(
    "aria-label",
    String(percentage).padStart(2, "0"),
  );
}

// start timer
function startTimer(duration) {
  totalTime = duration;
  timeLeft = duration;

  if (timerInterval) {
    clearInterval(timerInterval);
  }

  isRunning = true;
  updateDisplay();

  timerInterval = setInterval(() => {
    timeLeft--;

    updateDisplay();
    console.log(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      isRunning = false;
    }
  }, 1000);
}

// restart timer
function restartTimer() {
  if (totalTime === 0) return;

  clearInterval(timerInterval);
  timeLeft = totalTime;
  isRunning = false;

  updateDisplay();
}

// Functions to run on start
loadRoutines();
showView("timer");
