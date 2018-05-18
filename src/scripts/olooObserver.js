// ======================================================================
// Observer Delegator Pattern
// ======================================================================

export function SubscribersDelegator() {
  const Subscribe = Object.create(null);

  Subscribe.init = function init() {
    this.observers = Object.create(null);
  };
  Subscribe.subscribe = function subscribe(observer) {
    this.observers[observer.id] = observer;
  };
  Subscribe.unsubscribe = function unsubscribe(observer) {
    // Can unsubscribe one observer, or an array of observers
    if (typeof observer === "string") {
      delete this.observers[observer];
    } else {
      observer.forEach(key => delete this.observers[key]);
    }
  };
  Subscribe.broadcast = function broadcast(func, ...args) {
    // On each object called func
    // Any additional args will get passed into the func
    // define them just using comma seperator
    const keys = Object.keys(this.observers);
    for (let i = 0; i < keys.length; i += 1) {
      this.observers[keys[i]][func](...args);
    }
  };
  return Subscribe;
}

// ======================================================================
// Observer Delegator Utilities
// ======================================================================

export function createObserversById(subscriber, ids, delegator) {
  ids.forEach(elemId => {
    const elem = document.getElementById(elemId);
    const observer = delegator();
    observer.init(elemId, elem);
    subscriber.subscribe(observer);
  });
}
