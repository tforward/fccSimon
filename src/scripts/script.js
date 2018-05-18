"use strict";

import { EventDelegator, getTargetId } from "./olooEvent";
import { SubscribersDelegator, createObserversById } from "./olooObserver";
import css_ from "../css/styles.css";

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
  eventSandbox.initEvent(eventSandboxElem, "click", { tags: ["BUTTON"] });
  // Add the event to the event sandbox area
  // EventController Handles all events within the Event sandbox
  eventSandbox.addEvent(eventController);

  myApp.toggleBtn = ToggleBtnDelegator();
  myApp.toggleBtn.setup("toggleDiv", turnOn);

  myApp.score = scoreElem();
  myApp.score.init("scoreValue");
  myApp.score.setup();

  myApp.startBtn = startElem();
  myApp.startBtn.init("btnSimonStart");
  myApp.startBtn.off();

  // Create a event Observer
  myApp.subscribers = SubscribersDelegator();
  myApp.subscribers.init();

  // You can change out the Delegator used if needed
  // Elements part of the same delegator share the same properites
  createObserversById(myApp.subscribers, ["toggleBtn"], ElementDelegator);

  // console.log(myApp.subscribers.observers);

  // Run any setup Delegators here
  // myApp.subscribers.broadcast("setup");
};

myApp.main = function main(selfId) {
  if (selfId) {
    console.log(selfId);

    const gameOn = checkToggleState(selfId);

    if (gameOn) {
      myApp.score.on();
      myApp.startBtn.on();
    } else {
      myApp.score.setup();
    }

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

function turnOn() {
  console.log("");
}

function checkToggleState(selfId) {
  const { toggle } = myApp.toggleBtn.btn;
  if (toggle === 1) {
    return true;
  } else if (selfId !== "toggleBtn" && toggle === 0) {
    alert("No sound comes from the Simon game, it appears to be off \n(Hint: Hit the toggle button)");
    return false;
  }
  return undefined;
}

// ======================================================================
//  Element Delegators
// ======================================================================

function startElem() {
  const StartBtn = Object.create(ElementDelegator());
  // I'm here I need to fix the toggle of this button, see the other toggle for help
  StartBtn.off = function on() {
    this.toggle = 0;
    console.log(this.toggle);
  };
  StartBtn.on = function off() {
    this.toggle = 1;
    console.log(this.toggle);
  };
  return StartBtn;
}

function scoreElem() {
  const Score = Object.create(ElementDelegator());

  Score.setup = function setup() {
    this.count = 0;
    this.elem.textContent = "";
  };
  Score.on = function on() {
    this.elem.textContent = "--";
  };
  Score.add = function add() {
    this.count += 1;
    Score.display();
  };
  Score.reset = function reset() {
    this.count = 0;
    Score.display();
  };
  Score.display = function display() {
    this.elem.textContent = this.count;
  };
  return Score;
}

function ToggleBtnDelegator() {
  const Button = Object.create(BtnElem());

  Button.onClick = function toggleBtn() {
    if (this.btn.toggle === 1) {
      this.btn.toggle = 0;
      this.slider.className = "slider round";
      this.ball.className = "ball";
    } else {
      this.btn.toggle += 1;
      this.slider.className = "slider round enable";
      this.ball.className = "ball last";
    }
    this.func(this);
  };
  return Button;
}

function BtnElem() {
  const Button = {
    setup(elemId, func) {
      this.div = document.getElementById(elemId);
      this.label = this.div.getElementsByClassName("label")[0];
      this.btn = this.div.getElementsByClassName("btn")[0];
      this.slider = this.div.getElementsByClassName("slider")[0];
      this.ball = this.div.getElementsByClassName("ball")[0];
      this.btn.toggle = 0;
      this.func = func;
      this.btn.addEventListener("click", this.onClick.bind(this));
      return this;
    }
  };
  return Button;
}

// ======================================================================
//  Delegators
//
//      - Create new Delegators for elements that should operate similarly
// ======================================================================

function ElementDelegator() {
  // This is the base Delegator "Class" for a element
  const Element = Object.create(null);
  Element.init = function init(elemId) {
    this.id = elemId;
    this.elem = document.getElementById(this.id);
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
// Handler when the DOM is fully loaded
document.onreadystatechange = function onreadystatechange() {
  if (document.readyState === "complete") {
    myApp.initApplication();
  } else {
    // Do something during loading (optional)
  }
};
// ======================================================================
