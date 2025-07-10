let Play = false;
let startTime;
let stopwatchInterval;
let elapsedPausedTime = 0;

// Start/Pause Toggle
function change() {
  const btn = document.querySelector('.start-pause');
const btn1 = document.querySelector('.reset-lap');
  if (!Play) {
    btn.innerHTML = '<i class="fa-solid fa-pause fa-lg"></i>';
    btn1.innerHTML = '<i class="fa-solid fa-flag fa-lg"></i>';
    if (!stopwatchInterval) {
      startTime = new Date().getTime() - elapsedPausedTime;
      stopwatchInterval = setInterval(updateStopwatch, 100);
    }
    Play = true;
  } else {
    btn.innerHTML = '<i class="fa-solid fa-circle-play fa-lg"></i>';
    btn1.innerHTML = '<i class="fa-solid fa-rotate-right fa-lg"></i>';
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    elapsedPausedTime = new Date().getTime() - startTime;
    Play = false;
  }
}

function updateStopwatch() {
  const now = new Date().getTime();
  const elapsedTime = now - startTime;

  const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
  const milliseconds = Math.floor((elapsedTime % 1000));

  document.querySelector('.sh').innerText = String(hours).padStart(2, '0');
  document.querySelector('.sm').innerText = String(minutes).padStart(2, '0');
  document.querySelector('.ss').innerText = String(seconds).padStart(2, '0');
  document.querySelector('.sms').innerText = String(milliseconds).padStart(3, '0');
}

// Reset & Lap Toggle
let lap = false;

function laps() {
  if (!lap) {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    startTime = null;
    elapsedPausedTime = 0;
    Play = false;

    document.querySelector('.sh').innerText = `00`;
    document.querySelector('.sm').innerText = `00`;
    document.querySelector('.ss').innerText = `00`;
    document.querySelector('.sms').innerText = `000`;

    lap = true;
  } else {
    lap = false;
  }
}

// Real Clock
function timeset() {
  const hr = document.querySelector('.hour');
  const min = document.querySelector('.min');
  const sec = document.querySelector('.sec');
  const ms = document.querySelector('.ms');
  const d = new Date();
  hr.innerHTML = String(d.getHours()).padStart(2, '0');
  min.innerHTML = String(d.getMinutes()).padStart(2, '0');
  sec.innerHTML = String(d.getSeconds()).padStart(2, '0');
  ms.innerHTML = String(d.getMilliseconds()).padStart(3, '0');
}

setInterval(timeset, 100);
