// ======================================================================
// OLOO Event
// ======================================================================

export function EventDelegator() {
  // Creates an Event object on the element
  const Event = Object.create(null);

  Event.initEvent = function setup(elem, type, args) {
    // The Element to bind the event handler too
    this.elem = elem;
    // The type of event ex: "Click"
    this.eventType = type;
    // Additional arguments that will be passed to the bound function as an object
    this.args = args;
    // Helper: If Array convert to object
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

// ======================================================================
// Event Utilities
// ======================================================================

export function getTargetId(e, tags) {
  // Prevents events triggering on the parent element
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
