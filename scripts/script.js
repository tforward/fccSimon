"use strict";

const myApp = Object.create(null);

// ======================================================================
// App
// ======================================================================

myApp.initApplication = function init() {
    myApp.main();
  };
  

myApp.main = function main() {
};

// Handler when the DOM is fully loaded
document.onreadystatechange = function onreadystatechange() {
  if (document.readyState === "complete") {
    myApp.initApplication(document.readyState);
  } else {
    // Do something during loading [opitional]
  }
};

// ======================================================================
