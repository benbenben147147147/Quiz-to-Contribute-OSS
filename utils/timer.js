 function initTimer() {
    const clock = document.getElementById("time");
    let time = -1;
    function incrementTime() {
      time++;
      clock.textContent =
      "Timer: " +
        ("0" + Math.trunc(time / 60)).slice(-2) +
        ":" + ("0" + (time % 60)).slice(-2);
    }
    incrementTime();
    window.intervalId = setInterval(incrementTime, 1000);
  }

  window.addEventListener("load", initTimer);