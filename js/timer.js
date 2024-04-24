//@ts-nocheck
let startTime;
let stopwatchInterval;

const startStopwatch = () => {
  if (!stopwatchInterval) {
    startTime = new Date().getTime() + 1 * 60 * 1000; // Set start time to current time plus 5 minutes
    stopwatchInterval = setInterval(updateStopwatch, 1000);
  }
};

function stopStopwatch() {
  stopwatchInterval = clearInterval(stopwatchInterval); // clear the interval
  const remainingTime = startTime - new Date().getTime(); // calculate remaining time
  return remainingTime;
};

function resetStopwatch() {
  stopStopwatch(); // stop the interval
  elapsedPausedTime = 0; // reset the elapsed paused time variable
  document.getElementById("stopwatch").innerHTML = "00:01:00"; // reset the display to 5 minutes
}

const updateStopwatch = () => {
  const remainingTime = startTime - new Date().getTime();
  if (remainingTime <= 0) {
    clearInterval(stopwatchInterval);
    endGame();
    document.getElementById("stopwatch").innerHTML = "00:00:00";
    return;
  }
  const seconds = Math.floor((remainingTime / 1000) % 60);
  const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
  const hours = Math.floor(remainingTime / 1000 / 60 / 60);
  const displayTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
  document.getElementById("stopwatch").innerHTML = displayTime;
};

const addSeconds = (secondsToAdd) => {
  startTime += secondsToAdd * 1000; // Add seconds in milliseconds to the start time
};

const pad = (number) => {
  return (number < 10 ? "0" : "") + number;
};
