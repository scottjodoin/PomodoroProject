document.addEventListener("DOMContentLoaded", function () {
  let sessionDisplay = document.querySelector("#timer-display");

  pomodoro.updateDOM = function updateTime() {
    document.querySelector(
      "#timer-display"
    ).innerHTML = pomodoro.formattedTime();
  };

  //set the timer display to value set in session options
  function changeDisplay(val) {
    pomodoro.stop();
    pomodoro.time = val * 60;
    sessionDisplay.innerHTML = `${val}:00`;
  }

  document
    .querySelector("#session-down-arrow")
    .addEventListener("click", function () {
      var $val = document.querySelector("#session-selection-value");
      var val = parseInt($val.innerHTML);
      if (val <= 1) return;
      val--;
      $val.innerHTML = val;
      changeDisplay(val);
    });

  document
    .querySelector("#session-up-arrow")
    .addEventListener("click", function () {
      var $val = document.querySelector("#session-selection-value");
      var val = parseInt($val.innerHTML);
      if (val >= 60) return;
      val++;
      $val.innerHTML = val;
      changeDisplay(val);
    });

  document
    .querySelector("#break-down-arrow")
    .addEventListener("click", function () {
      var $val = document.querySelector("#break-selection-value");
      var val = parseInt($val.innerHTML);
      if (val <= 1) return;
      val--;
      $val.innerHTML = val;
    });

  document
    .querySelector("#break-up-arrow")
    .addEventListener("click", function () {
      var $val = document.querySelector("#break-selection-value");
      var val = parseInt($val.innerHTML);
      if (val >= 15) return;
      val++;
      $val.innerHTML = val;
    });

  document.querySelector("#reset-timer").addEventListener("click", function () {
    pomodoro.stop();
    document.querySelector(
      "#timer-display"
    ).innerHTML = pomodoro.formattedTime();
    document.querySelector("#play-pause").innerHTML = "▶︎";
  });

  //TODO: implement play / pause buttons - ascii characters
  const playPause = document.querySelector("#play-pause");
  playPause.addEventListener("click", function () {
    if (playPause.innerHTML == "▶︎") {
      pomodoro.defaultSessionTime = parseInt(
        document.querySelector("#session-selection-value").innerHTML
      );
      pomodoro.defaultBreakTime = parseInt(
        document.querySelector("#break-selection-value").innerHTML
      );
      pomodoro.play();
      playPause.innerHTML = "||";
    } else if (playPause.innerHTML == "||") {
      pomodoro.pause();
      playPause.innerHTML = "▶︎";
    }
  });
});

var pomodoro = {
  defaultSessionTime: 25 * 60,
  defaultBreakTime: 5 * 60,
  session: true,
  updateDOM: undefined,
  timer: undefined,
  time: 25 * 60,
  formattedTime: function () {
    var minutes = Math.floor(pomodoro.time / 60);
    var seconds = pomodoro.time % 60;
    return `${minutes}:${("0" + seconds).slice(-2)}`;
  },
  tick: function () {
    if (pomodoro.time <= 0) {
      if (pomodoro.session) {
        pomodoro.time = pomodoro.defaultBreakTime;
      } else {
        pomodoro.time = pomodoro.defaultSessionTime;
      }
    }
    pomodoro.time -= 1;
    pomodoro.updateDOM(); //TODO: figure out scope for this? pomodoro.time!?
  },
  play: function () {
    clearTimeout(pomodoro.timer);
    pomodoro.timer = setInterval(pomodoro.tick, 1000);
    pomodoro.tick();
  },
  pause: function () {
    clearTimeout(pomodoro.timer);
  },
  stop: function () {
    clearTimeout(this.timer);
    pomodoro.time = pomodoro.defaultSessionTime;
  },
};
