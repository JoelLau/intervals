/**
 * Global App State
 */
const appState = {
  /**
   * increments whenever timer finishes
   */
  scheduleIndex: 0,

  /**
   * whether or not the timer is currently running
   */
  isRunning: false,
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("started");
  addButtonEventListeners();
});

function addButtonEventListeners() {
  console.log("added event listeners");
  getStartButton().addEventListener("click", () => {
    console.log("start button clicked");
    startTimer();
    hideElement(getStartButton());
    revealElement(getPauseButton());
    revealElement(getResetButton());
  });

  getPauseButton().addEventListener("click", () => {
    console.log("pause button clicked");
    stopTimer();
  });

  getResetButton().addEventListener("click", () => {
    console.log("reset button clicked");
    stopTimer();
    revealElement(getStartButton());
    hideElement(getPauseButton());
    hideElement(getResetButton());
  });
}

function getStartButton() {
  return document.getElementById("start-btn");
}

function getPauseButton() {
  return document.getElementById("pause-btn");
}

function getResetButton() {
  return document.getElementById("reset-btn");
}

function startTimer() {
  console.log("timer started");
  appState.isRunning = true;
}

function stopTimer() {
  console.log("timer stopped");
  appState.isRunning = false;
}

function resetTimer() {
  console.log("timer reset");
}

function revealElement(element) {
  element.classList.remove("hidden");
}
function hideElement(element) {
  element.classList.add("hidden");
}

function getCurrentSchedule(num) {
  const completeSchedule = getCompleteSchedule();
  return completeSchedule[num % completeSchedule.length];
}

function getCompleteSchedule() {
  const scheduleWork = {
    name: "work",
    duration: 2500,
  };

  const scheduleShortBreak = {
    name: "shortbreak",
    duration: 500,
  };

  const scheduleLongBreak = {
    duration: 1500,
  };

  return [
    scheduleWork,
    scheduleShortBreak,
    scheduleWork,
    scheduleShortBreak,
    scheduleWork,
    scheduleShortBreak,
    scheduleWork,
    scheduleShortBreak,
    scheduleWork,
    scheduleLongBreak,
  ];
}
