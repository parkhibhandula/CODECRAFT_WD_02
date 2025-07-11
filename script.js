let Play = false;
let startTime;
let stopwatchInterval;
let elapsedPausedTime = 0;
let lap = false;
let count = 1;

// Start/Pause Toggle
function change() {
  const btn = document.querySelector('.start-pause');
  if (!Play) {
    btn.innerHTML = '<i class="fa-solid fa-pause fa-lg"></i>';
    document.getElementById("flag").style.visibility = "visible";
    if (!stopwatchInterval) {
      startTime = new Date().getTime() - elapsedPausedTime;
      stopwatchInterval = setInterval(updateStopwatch, 100);
    }
    Play = true;
  } else {
    btn.innerHTML = '<i class="fa-solid fa-circle-play fa-lg"></i>';
    document.getElementById("flag").style.visibility = "hidden";
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
function reset() {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  startTime = null;
  elapsedPausedTime = 0;
  Play = false;
  lap = false;
  count = 1;

  document.querySelector('.sh').innerText = '00';
  document.querySelector('.sm').innerText = '00';
  document.querySelector('.ss').innerText = '00';
  document.querySelector('.sms').innerText = '000';

  document.querySelector('.start-pause').innerHTML = '<i class="fa-solid fa-circle-play fa-lg"></i>';
  document.getElementById("flag").style.visibility = "hidden";
  document.getElementById("laps").innerHTML = "";
}

function formatTime(ms) {
  let totalSeconds = Math.floor(ms / 1000);
  let hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  let minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  let seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function lapcount() {
  if (stopwatchInterval) {
    const now = new Date().getTime();
    const elapsed = now - startTime;
    const lapTime = formatTime(elapsed);

    const li = document.createElement("li");
    li.innerHTML = `<span style="display:inline-flex; width: 80px;">Lap ${count}</span>${lapTime}`;
    document.getElementById("laps").appendChild(li);
    count++;
  }
}

// Clock/Stopwatch Mode Toggle
let mode = true;
function clockmode() {
  if (mode) {
    document.getElementById('clock-stop').innerHTML = 'StopWatch';
    document.querySelector('.stop').style.display = "none";
    document.querySelector('.buttons').style.display = "none";
    document.querySelector('.lapsrec').style.display = "none";
    document.querySelector('.main').style.display = "flex";
  } else {
    document.getElementById('clock-stop').innerHTML = 'Clock';
    document.querySelector('.stop').style.display = "flex";
    document.querySelector('.buttons').style.display = "flex";
    document.querySelector('.lapsrec').style.display = "flex";
    document.querySelector('.main').style.display = "none";
  }
  mode = !mode;
}

// Real-time Clock
function timeset() {
  const d = new Date();
  document.querySelector('.hour').innerHTML = `hr <br> ${String(d.getHours()).padStart(2, '0')}`;
  document.querySelector('.min').innerHTML = `min <br> ${String(d.getMinutes()).padStart(2, '0')}`;
  document.querySelector('.sec').innerHTML = `sec <br> ${String(d.getSeconds()).padStart(2, '0')}`;
  document.querySelector('.ms').innerHTML = `ms <br>${String(d.getMilliseconds()).padStart(3, '0')}`;
}

setInterval(timeset, 100);
