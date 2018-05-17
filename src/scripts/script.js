"use strict";

import css from "../css/styles.css";

const myApp = Object.create(null);

// ======================================================================
// App
// ======================================================================

myApp.initApplication = function init() {
  // Creates an isolated event sandbox around a element
  // Any elements inside the Event sandbox will be passed to the EventDelegator
  const eventSandbox = EventDelegator();
  const eventSandboxElem = document.getElementById("eventSandboxMain");
  // Events are only triggered on defined tags
  eventSandbox.initEvent(eventSandboxElem, "click", { tags: ["BUTTON", "DIV"] });
  // Add the event to the event sandbox area
  // EventController Handles all events within the Event sandbox
  eventSandbox.addEvent(eventController);

  // Create a event Observer
  myApp.subscribers = SubscribersDelegator();
  myApp.subscribers.init();

  // You can change out the Delegator used if needed
  // Elements part of the same delegator share the same properites
  createObserversById(myApp.subscribers, ["toggleBtn"], ElementDelegator);

  console.log(myApp.subscribers.observers);

  // Run any setup Delegators here
  // myApp.subscribers.broadcast("setup");
};

myApp.main = function main(selfId) {
  if (selfId) {
    console.log(selfId);

    // http://dabblet.com/gist/5476973

    // const elemObj = myApp.subscribers.observers[selfId];

    // let colourClass = elemObj.elem.className;

    // colourClass = colourClass === "greenClass" ? "redClass" : "greenClass";

    // elemObj.elem.className = colourClass;

    // const test5 = function test5() {
    //   console.log("TEST5");
    // };

    // // Adds a new function to all observers
    // myApp.subscribers.broadcast("newFunc", "test5", test5);

    // elemObj.add();

    // // elemObj.newFunc("test5", test5)

    // elemObj.test5();

    // elemObj.msg(elemObj.id);

    // console.log(myApp.subscribers);
  }
};

// ======================================================================
//  Delegators
//
//      - Create new Delegators for elements that should operate similarly
// ======================================================================

function ElementDelegator() {
  // This is the base Delegator "Class" for a element
  const Element = Object.create(null);
  Element.init = function init(elemId, elem) {
    this.id = elemId;
    this.elem = elem;
  };
  // Can add new properties on the fly
  // But these will only apply to the "this" element and not all
  // under the same delegator, unless done before the first assignment.
  // If you need on all. You can use the broadcast function on the
  // subscribers Delegator to pass the newProp function and go from there
  Element.newProp = function newProp(propName) {
    if (this[propName] === undefined) {
      this[propName] = Object.create(null);
    }
  };
  Element.newFunc = function newFunc(funcName, func) {
    if (this[funcName] === undefined) {
      this[funcName] = func;
    }
  };

  return Element;
}

function TestDelegator() {
  // Here you can define properties that will be shared between all defined within
  // the subscription
  // These can be accessed via the subscriptions or
  // directly by calling myApp.subscribers.observers[id]
  // which you can use dot notation on any property or method
  // For object.create(null) you can replace null with a prototype you want to inherit
  // Ex: functionName(), just don't have duplicate name spaces
  const Test = Object.create(ElementDelegator());

  Test.setup = function setup() {
    this.count = 0;
  };

  Test.add = function add() {
    this.count += 1;
    this.elem.textContent = this.count;
  };

  Test.msg = function msg(content) {
    console.log(this.count);
  };
  return Test;
}

// ======================================================================
// Handle Events
// ======================================================================

function eventController(args, e) {
  // To know what button was pressed just use console.log(id).
  // let {arg1, arg2, arg3} = args;
  // args: comes from when the event was first init. It's not to be defined directly
  //      ex: NOT LIKE eventController(args) "THIS WON'T WORK"
  // It is defined where the EventDelegator was initialized
  // You can access the event directly with "e", such as console.log(e.target)

  // Only Passes events of with tagNames defined in the array
  const id = getTargetId(e, args.tags);

  if (id) {
    myApp.main(id);
  }

  // Stop the event from going further up the DOM
  e.stopPropagation();
}

// ======================================================================
// Observer Pattern
// ======================================================================

function createObserversById(subscriber, ids, delegator) {
  ids.forEach(elemId => {
    const elem = document.getElementById(elemId);
    const observer = delegator();
    observer.init(elemId, elem);
    subscriber.subscribe(observer);
  });
}

function SubscribersDelegator() {
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
// Event Utilities
// ======================================================================

function EventDelegator() {
  // Creates an Event object on the element
  const Event = Object.create(null);

  Event.initEvent = function setup(elem, type, args) {
    // The Element to bind the event handler too
    this.elem = elem;
    // The type of event ex: "Click"
    this.eventType = type;
    // Additional arguments that will be passed to the bound function as an object
    this.args = args;
    // If Array convert to object
    if (Array.isArray(args)) {
      this.args = Object.assign({}, args);
    }
  };
  Event.addEvent = function add(func, options) {
    // func: Bound an Function to an Event
    // (options): Optional parameter for passing options to event listener ex: "once: true"
    this.boundFunc = func.bind(this.elem, this.args);
    // this.bound prevents binding loss for arguments and options
    this.boundOptions = options;
    this.elem.addEventListener(this.eventType, this.boundFunc, this.boundOptions);
  };
  Event.removeEvent = function remove() {
    // Remove the listener, do not have to pass the "options" since it is bound
    this.elem.removeEventListener(this.eventType, this.boundFunc, this.boundOptions);
  };
  return Event;
}

function getTargetId(e, tags) {
  // Prevents events triggering on the parent
  if (e.target !== e.currentTarget) {
    // Returns the target Id of event for allowed tags
    if (tags.indexOf(e.target.tagName) > -1) {
      e.stopPropagation();
      return e.target.id;
    }
  }
  e.stopPropagation();
  // Returns undefined if no target match
  return undefined;
}

// ======================================================================
// Handler when the DOM is fully loaded
document.onreadystatechange = function onreadystatechange() {
  if (document.readyState === "complete") {
    myApp.initApplication();
  } else {
    // Do something during loading (optional)
  }
};
// ======================================================================
