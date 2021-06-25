// Modified from: https://gist.github.com/mudge/5830382#gistcomment-2995300
export default class EventEmitter {
  events = {};

  on(event, listener) {
    if (this.events[event] === undefined) {
      this.events[event] = [];
    }

    this.events[event].push(listener);

    return function () {
      this.off(event, listener);
    };
  }

  off(event, listener) {
    if (event === undefined && listener === undefined) {
      this.events = {};
    } else if (listener === undefined) {
      delete this.events[event];
    } else if (this.events[event].indexOf(listener) !== -1) {
      this.events[event].splice(this.events[event].indexOf(listener), 1);
    }
  }

  emit(event, ...args) {
    if (this.events[event] !== undefined) {
      for (const listener of this.events[event]) {
        listener(...args);
      }
    }

    if (event !== '*') {
      this.emit('*', ...args);
    }
  }

  once(event, listener) {
    return this.on(event, () => {
      this.emit(event);

      this.off(event, listener);
    });
  }
}
