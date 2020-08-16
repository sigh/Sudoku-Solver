const formatTimeMs = (timeMs) => {
  if (timeMs < 1000) {
    return timeMs.toPrecision(3) + ' ms';
  }
  return (timeMs/1000).toPrecision(3) + ' s';
};

const collapseFnCalls = (fn) => {
  let alreadyEnqueued = false;
  return (() => {
    if (alreadyEnqueued) return;
    alreadyEnqueued = true;
    window.requestAnimationFrame(() => {
      try {
        fn();
      } finally {
        alreadyEnqueued = false;
      }
    });
  });
};

// A timer which can be paused and unpaused and accumulates the elapsed time.
// Start paused.
class Timer {
  constructor() {
    this._elapsedMs = 0;
    // The timestamp for the start of the current periods. If null, the timer
    // is currently paused.
    this._startTimestamp = null;
  }

  unpause() {
    if (this._startTimestamp == null) {
      this._startTimestamp = performance.now();
    }
  }

  pause() {
    if (this._startTimestamp != null) {
      this._elapsedMs += performance.now() - this._startTimestamp;
      this._startTimestamp = null;
    }
  }

  elapsedMs() {
    let elapsedMs = this._elapsedMs;
    if (this._startTimestamp != null) {
      elapsedMs += performance.now() - this._startTimestamp;
    }
    return elapsedMs;
  }
}
