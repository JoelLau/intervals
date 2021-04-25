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

  setSchedule(getScheduleAtIndex(appState.scheduleIndex));
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

function getScheduleName() {
  return document.getElementById("schedule-name");
}

function getClockTimeMinutes() {
  return document.getElementById("clock-time__minutes");
}

function getClockTimeSeconds() {
  return document.getElementById("clock-time__seconds");
}

function setSchedule(schedule) {
  console.log(`setting schedule to ${JSON.stringify(schedule)}`);
  const { name, duration } = schedule;
  setScheduleName(name);
  setTimer(duration);
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

function setScheduleName(name) {
  console.log(`setting schedule name to ${name}`);
  getScheduleName().innerText = name;
}

function setTimer(duration) {
  console.log(`setting timer to ${duration}`);
  const minutes = duration / 60;
  const seconds = duration - minutes * 60;

  setTimerMinutes(minutes);
  setTimerSeconds(seconds);
}

function setTimerMinutes(minutes) {
  console.log(`setting timer (minutes) to ${minutes}`);
  getClockTimeMinutes().innerText = `${minutes}`.padStart(2, "0");
}

function setTimerSeconds(seconds) {
  console.log(`setting timer (seconds) to ${seconds}`);
  getClockTimeSeconds().innerText = `${seconds}`.padStart(2, "0");
}

function getScheduleAtIndex(index = appState.scheduleIndex) {
  const completeSchedule = getCompleteSchedule();
  return completeSchedule[index % completeSchedule.length];
}

function getCompleteSchedule() {
  const scheduleWork = {
    name: "Work",
    duration: 15 * 60,
  };

  const scheduleShortBreak = {
    name: "Short Break",
    duration: 5 * 60,
  };

  const scheduleLongBreak = {
    name: "Long Break",
    duration: 15 * 60,
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
