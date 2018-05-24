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

  myApp.strictBtn = startElem();
  myApp.strictBtn.init("btnSimonStrict");
  myApp.strictBtn.off();

  myApp.strictLight = ElementDelegator();
  myApp.strictLight.init("strictLightID");

  myApp.btnYellow = colourElem();
  myApp.btnYellow.init("btnYellow");

  myApp.btnGreen = colourElem();
  myApp.btnGreen.init("btnGreen");

  myApp.btnRed = colourElem();
  myApp.btnRed.init("btnRed");

  myApp.btnBlue = colourElem();
  myApp.btnBlue.init("btnBlue");
};

myApp.main = function main(selfId) {
  if (selfId) {
    const state = gameState(selfId);

    if (state) {
      if (myApp.turn === "ai") {
        setTimeout(aiTurn, 1000);
      } else if (myApp.turn === "player") {
        const plColour = getButtonColour(selfId);
        myApp.playerMoves.push(plColour);
        const validMove = checkMove();
        if (validMove === false) {
          myApp.playerMoves = [];
          myApp.score.error();
          displayAiMoves();
        } else if (validMove) {
          if (noMoreMoves()) {
            switchTurn();
            myApp.main(true);
          }
        }
      }
    }
  }
};

function aiTurn() {
  const colour = getRandomColour();
  myApp.aiMoves.push(colour);
  myApp.score.add();
  displayAiMoves();
  myApp.playerMoves = [];
  switchTurn();
}

function noMoreMoves() {
  if (myApp.playerMoves.length === myApp.aiMoves.length) {
    return true;
  }
  return false;
}

function displayAiMoves() {
  let i = 0;
  function displayDelay() {
    pressBtn(myApp.aiMoves[i]);
    i += 1;
    if (i < myApp.aiMoves.length) {
      setTimeout(displayDelay, 1600);
    }
  }
  displayDelay();
}

function checkMove() {
  // Check to make sure each player move matches AI
  for (let i = 0; i < myApp.playerMoves.length; i += 1) {
    if (myApp.playerMoves[i] !== myApp.aiMoves[i]) {
      return false;
    }
  }
  return true;
}

function getButtonColour(iid) {
  const colourDict = { btnRed: "red", btnGreen: "green", btnBlue: "blue", btnYellow: "yellow" };
  return colourDict[iid];
}

function switchTurn() {
  myApp.turn = myApp.turn === "ai" ? "player" : "ai";
}

function gameState(selfId) {
  const turnGameOn = checkToggleState(selfId);
  if (turnGameOn) {
    if (selfId === "btnSimonStart") {
      myApp.startBtn.toggleBtn();
      const { toggle } = myApp.startBtn;
      if (toggle === 1) {
        gameStart();
        return true;
      } // If Start Pressed Again
      gameEnd();
      gameStart();
      myApp.startBtn.toggle = 1;
      return true;
    } else if (selfId === "btnSimonStrict") {
      myApp.strictBtn.toggleBtn();
      myApp.strictLight.elem.classList.toggle("disable");
    } else if (selfId !== "btnSimonStart" && myApp.startBtn.toggle === 1) {
      return true;
    }
  }
  return undefined;
}

function gameStart() {
  myApp.turn = "ai";
  myApp.aiMoves = [];
  myApp.playerMoves = [];
  myApp.score.reset();
}

function gameEnd() {
  myApp.score.reset();
}

function powerOff() {
  myApp.score.setup();
  myApp.startBtn.off();
}

function turnOn() {}

function checkToggleState(selfId) {
  const { toggle } = myApp.toggleBtn.btn;
  if (selfId === "toggleBtn" && toggle === 1) {
    myApp.score.on();
    return true;
  } else if (toggle === 1) {
    return true;
  } else if (selfId !== "toggleBtn" && toggle === 0) {
    alert("No sound comes from the Simon game, it appears to be off \n(Hint: Hit the toggle button)");
    return false;
  } else if (toggle === 0) {
    powerOff();
  }
  return undefined;
}

function pressBtn(colour) {
  const audioRed = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
  const audioYellow = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
  const audioGreen = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
  const audioBlue = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
  switch (colour) {
    case "yellow":
      audioYellow.play();
      myApp.btnYellow.press();
      break;
    case "red":
      audioRed.play();
      myApp.btnRed.press();
      break;
    case "green":
      audioGreen.play();
      myApp.btnGreen.press();
      break;
    case "blue":
      audioBlue.play();
      myApp.btnBlue.press();
      break;
    default:
      return undefined;
  }
  return false;
}

// ======================================================================
//  Simon Logic
// ======================================================================

function getRandomColour() {
  const colours = ["red", "green", "yellow", "blue"];
  const index = Math.floor(Math.random() * colours.length);
  return colours[index];
}

// ======================================================================
//  Element Delegators
// ======================================================================

function colourElem() {
  const colourBtn = Object.create(ElementDelegator());
  colourBtn.press = function press() {
    this.elem.classList.add("quarterCompHover");
    setTimeout(() => {
      colourBtn.unPress();
    }, 630);
  };
  colourBtn.unPress = function unPress() {
    this.elem.classList.remove("quarterCompHover");
  };
  return colourBtn;
}

function startElem() {
  const StartBtn = Object.create(ElementDelegator());
  StartBtn.off = function off() {
    this.toggle = 0;
  };
  StartBtn.toggleBtn = function toggleBtn() {
    this.toggle = this.toggle === 0 ? 1 : 0;
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
  Score.error = function error() {
    const score = this.elem.textContent;
    setTimeout(() => {
      this.elem.textContent = score;
    }, 1300);
    this.elem.textContent = "!!";
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
