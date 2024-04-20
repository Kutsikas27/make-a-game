//@ts-nocheck
let startTime;
let stopwatchInterval;

const startStopwatch = () => {
  if (!stopwatchInterval) {
    startTime = new Date().getTime();
    stopwatchInterval = setInterval(updateStopwatch, 1000);
  }
};
function stopStopwatch() {
  clearInterval(stopwatchInterval); // stop the interval
  const elapsedTime = new Date().getTime() - startTime; // calculate elapsed paused time
  return elapsedTime;
}

function resetStopwatch() {
  stopStopwatch(); // stop the interval
  elapsedPausedTime = 0; // reset the elapsed paused time variable
  document.getElementById("stopwatch").innerHTML = "00:00:00"; // reset the display
}
const updateStopwatch = () => {
  const currentTime = new Date().getTime();
  const elapsedTime = currentTime - startTime;
  const seconds = Math.floor(elapsedTime / 1000) % 60;
  const minutes = Math.floor(elapsedTime / 1000 / 60) % 60;
  const hours = Math.floor(elapsedTime / 1000 / 60 / 60);
  const displayTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
  document.getElementById("stopwatch").innerHTML = displayTime;
};

const pad = (number) => {
  return (number < 10 ? "0" : "") + number;
};
