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

  /**
   * number of seconds that have passed
   */
  secondsElapsed: 0,

  /**
   * call back for setInterval / clearInterval
   */
  interval: null,
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("started");

  updateTimer();
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
    revealElement(getStartButton());
    hideElement(getPauseButton());
    hideElement(getResetButton());
  });

  getResetButton().addEventListener("click", () => {
    console.log("reset button clicked");
    resetTimer();
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

  console.log(duration);
  console.log(typeof duration);

  console.log(appState.secondsElapsed);
  console.log(typeof appState.secondsElapsed);
  setTimer(duration - appState.secondsElapsed);
}

function startTimer() {
  console.log("timer started");
  appState.isRunning = true;
  appState.interval = setInterval(() => {
    appState.secondsElapsed++;
    updateTimer();

    const currentSchedule = getScheduleAtIndex(appState.scheduleIndex);

    console.log(appState.secondsElapsed);
    console.log(currentSchedule.duration);
    if (appState.secondsElapsed === currentSchedule.duration + 1) {
      alert("complete");
      stopTimer();

      revealElement(getStartButton());
      hideElement(getPauseButton());
      hideElement(getResetButton());

      resetTimer();
      appState.scheduleIndex++;
      updateTimer();
    }
  }, 1000);
}

function stopTimer() {
  console.log("timer stopped");
  appState.isRunning = false;
  clearInterval = clearInterval(appState.interval);
}

function resetTimer() {
  console.log("timer reset");
  appState.secondsElapsed = 0;
  updateTimer();
}

function updateTimer() {
  setSchedule(getScheduleAtIndex(appState.scheduleIndex));
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
  const minutes = Math.floor(duration / 60);
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
