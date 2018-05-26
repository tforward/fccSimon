!function(n){var t={};function r(e){if(t[e])return t[e].exports;var o=t[e]={i:e,l:!1,exports:{}};return n[e].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=n,r.c=t,r.d=function(n,t,e){r.o(n,t)||Object.defineProperty(n,t,{configurable:!1,enumerable:!0,get:e})},r.r=function(n){Object.defineProperty(n,"__esModule",{value:!0})},r.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return r.d(t,"a",t),t},r.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},r.p="",r(r.s=0)}([function(n,t,r){"use strict";r.r(t);r(5);const e=Object.create(null);function o(){const n=function(){const n=["red","green","yellow","blue"],t=Math.floor(Math.random()*n.length);return n[t]}();e.aiMoves.push(n),e.score.add(),i(),e.playerMoves=[],s()}function i(){let n=0;!function t(){d(e.aiMoves[n]),(n+=1)<e.aiMoves.length?setTimeout(t,1600):e.pausePlayerMoves=!1}()}function s(){e.turn="ai"===e.turn?"player":"ai"}function a(n){if(function(n){const{toggle:t}=e.toggleBtn.btn;if("toggleBtn"===n&&1===t)return e.score.on(),!0;if(1===t)return!0;if("toggleBtn"!==n&&0===t)return alert("No sound comes from the Simon game, it appears to be off \n(Hint: Hit the toggle button)"),!1;0===t&&(e.score.setup(),e.aiMoves=[],e.playerMoves=[],e.startBtn.off());return}(n)){if("btnSimonStart"===n){e.startBtn.toggleBtn();const{toggle:n}=e.startBtn;return 1===n?(c(),!0):(e.score.reset(),c(),e.startBtn.toggle=1,!0)}if("btnSimonStrict"===n)e.strictBtn.toggleBtn(),e.strictLight.elem.classList.toggle("disable");else if("btnSimonStart"!==n&&1===e.startBtn.toggle)return!0}}function c(){e.turn="ai",e.aiMoves=[],e.playerMoves=[],e.score.reset()}function u(){}function l(n){const t=new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),r=new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),e=new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),o=new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");switch(n){case"yellow":r.play();break;case"red":t.play();break;case"green":e.play();break;case"blue":o.play();break;default:return}return!1}function d(n){switch(l(n),n){case"yellow":e.btnYellow.press();break;case"red":e.btnRed.press();break;case"green":e.btnGreen.press();break;case"blue":e.btnBlue.press();break;default:return}return!1}function f(){const n=Object.create(m());return n.press=function(){this.elem.classList.add("quarterCompHover"),setTimeout(()=>{n.unPress()},630)},n.unPress=function(){this.elem.classList.remove("quarterCompHover")},n}function h(){const n=Object.create(m());return n.off=function(){this.toggle=0},n.toggleBtn=function(){this.toggle=0===this.toggle?1:0},n}function m(){const n=Object.create(null);return n.init=function(n){this.id=n,this.elem=document.getElementById(this.id)},n.newProp=function(n){void 0===this[n]&&(this[n]=Object.create(null))},n.newFunc=function(n,t){void 0===this[n]&&(this[n]=t)},n}function b(n,t){const r=function(n,t){if(n.target!==n.currentTarget&&t.indexOf(n.target.tagName)>-1)return n.stopPropagation(),n.target.id;n.stopPropagation()}(t,n.tags);r&&(!0===e.pausePlayerMoves&&-1!==e.ColourBtns.indexOf(r)||e.main(r)),t.stopPropagation()}e.initApplication=function(){const n=function(){const n=Object.create(null);return n.initEvent=function(n,t,r){this.elem=n,this.eventType=t,this.args=r,Array.isArray(r)&&(this.args=Object.assign({},r))},n.addEvent=function(n,t){this.boundFunc=n.bind(this.elem,this.args),this.boundOptions=t,this.elem.addEventListener(this.eventType,this.boundFunc,this.boundOptions)},n.removeEvent=function(){this.elem.removeEventListener(this.eventType,this.boundFunc,this.boundOptions)},n}(),t=document.getElementById("eventSandboxMain");n.initEvent(t,"click",{tags:["BUTTON"]}),n.addEvent(b),e.toggleBtn=function(){const n=Object.create({setup(n,t){return this.div=document.getElementById(n),this.label=this.div.getElementsByClassName("label")[0],this.btn=this.div.getElementsByClassName("btn")[0],this.slider=this.div.getElementsByClassName("slider")[0],this.ball=this.div.getElementsByClassName("ball")[0],this.btn.toggle=0,this.func=t,this.btn.addEventListener("click",this.onClick.bind(this)),this}});return n.onClick=function(){1===this.btn.toggle?(this.btn.toggle=0,this.slider.className="slider round",this.ball.className="ball"):(this.btn.toggle=1,this.slider.className="slider round enable",this.ball.className="ball last"),this.func(this)},n}(),e.toggleBtn.setup("toggleDiv",u),e.score=function(){const n=Object.create(m());return n.setup=function(){this.count=0,this.elem.textContent="OFF"},n.on=function(){this.elem.textContent="--"},n.error=function(){const n=this.elem.textContent;setTimeout(()=>{this.elem.textContent=n},1300),this.elem.textContent="!!"},n.add=function(){this.count+=1,n.display()},n.reset=function(){this.count=0,this.elem.textContent=0},n.display=function(){this.elem.textContent=this.count},n.win=function(){this.elem.textContent="Win"},n}(),e.score.init("scoreValue"),e.score.setup(),e.startBtn=h(),e.startBtn.init("btnSimonStart"),e.startBtn.off(),e.strictBtn=h(),e.strictBtn.init("btnSimonStrict"),e.strictBtn.off(),e.strictLight=m(),e.strictLight.init("strictLightID"),e.btnYellow=f(),e.btnYellow.init("btnYellow"),e.btnGreen=f(),e.btnGreen.init("btnGreen"),e.btnRed=f(),e.btnRed.init("btnRed"),e.btnBlue=f(),e.btnBlue.init("btnBlue"),e.ColourBtns=["btnRed","btnGreen","btnBlue","btnYellow"]},e.main=function(n){if(n){const t=a(n);if(20===e.score.count&&(e.score.win(),setTimeout(l("red"),100),setTimeout(l("green"),200),a("btnSimonStart")),t)if("ai"===e.turn)e.pausePlayerMoves=!0,setTimeout(o,1e3);else if("player"===e.turn){const t={btnRed:"red",btnGreen:"green",btnBlue:"blue",btnYellow:"yellow"}[n];e.playerMoves.push(t);const r=function(){for(let n=0;n<e.playerMoves.length;n+=1)if(e.playerMoves[n]!==e.aiMoves[n])return!1;return!0}();!1===r?(e.playerMoves=[],setTimeout(e.score.error(),300),l("blue"),l("green"),1===e.strictBtn.toggle?e.main("btnSimonStart"):setTimeout(i,1e3)):r&&(d(t),function(){if(e.playerMoves.length===e.aiMoves.length)return!0;return!1}()&&(s(),e.main(!0)))}}},document.onreadystatechange=function(){"complete"===document.readyState&&e.initApplication()}},function(n,t){n.exports=function(n){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!n||"string"!=typeof n)return n;var r=t.protocol+"//"+t.host,e=r+t.pathname.replace(/\/[^\/]*$/,"/");return n.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(n,t){var o,i=t.trim().replace(/^"(.*)"$/,function(n,t){return t}).replace(/^'(.*)'$/,function(n,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?n:(o=0===i.indexOf("//")?i:0===i.indexOf("/")?r+i:e+i.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}},function(n,t,r){var e,o,i={},s=(e=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=e.apply(this,arguments)),o}),a=function(n){var t={};return function(n){if("function"==typeof n)return n();if(void 0===t[n]){var r=function(n){return document.querySelector(n)}.call(this,n);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(n){r=null}t[n]=r}return t[n]}}(),c=null,u=0,l=[],d=r(1);function f(n,t){for(var r=0;r<n.length;r++){var e=n[r],o=i[e.id];if(o){o.refs++;for(var s=0;s<o.parts.length;s++)o.parts[s](e.parts[s]);for(;s<e.parts.length;s++)o.parts.push(g(e.parts[s],t))}else{var a=[];for(s=0;s<e.parts.length;s++)a.push(g(e.parts[s],t));i[e.id]={id:e.id,refs:1,parts:a}}}}function h(n,t){for(var r=[],e={},o=0;o<n.length;o++){var i=n[o],s=t.base?i[0]+t.base:i[0],a={css:i[1],media:i[2],sourceMap:i[3]};e[s]?e[s].parts.push(a):r.push(e[s]={id:s,parts:[a]})}return r}function m(n,t){var r=a(n.insertInto);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var e=l[l.length-1];if("top"===n.insertAt)e?e.nextSibling?r.insertBefore(t,e.nextSibling):r.appendChild(t):r.insertBefore(t,r.firstChild),l.push(t);else if("bottom"===n.insertAt)r.appendChild(t);else{if("object"!=typeof n.insertAt||!n.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=a(n.insertInto+" "+n.insertAt.before);r.insertBefore(t,o)}}function b(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n);var t=l.indexOf(n);t>=0&&l.splice(t,1)}function p(n){var t=document.createElement("style");return void 0===n.attrs.type&&(n.attrs.type="text/css"),v(t,n.attrs),m(n,t),t}function v(n,t){Object.keys(t).forEach(function(r){n.setAttribute(r,t[r])})}function g(n,t){var r,e,o,i;if(t.transform&&n.css){if(!(i=t.transform(n.css)))return function(){};n.css=i}if(t.singleton){var s=u++;r=c||(c=p(t)),e=B.bind(null,r,s,!1),o=B.bind(null,r,s,!0)}else n.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(r=function(n){var t=document.createElement("link");return void 0===n.attrs.type&&(n.attrs.type="text/css"),n.attrs.rel="stylesheet",v(t,n.attrs),m(n,t),t}(t),e=function(n,t,r){var e=r.css,o=r.sourceMap,i=void 0===t.convertToAbsoluteUrls&&o;(t.convertToAbsoluteUrls||i)&&(e=d(e));o&&(e+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var s=new Blob([e],{type:"text/css"}),a=n.href;n.href=URL.createObjectURL(s),a&&URL.revokeObjectURL(a)}.bind(null,r,t),o=function(){b(r),r.href&&URL.revokeObjectURL(r.href)}):(r=p(t),e=function(n,t){var r=t.css,e=t.media;e&&n.setAttribute("media",e);if(n.styleSheet)n.styleSheet.cssText=r;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(r))}}.bind(null,r),o=function(){b(r)});return e(n),function(t){if(t){if(t.css===n.css&&t.media===n.media&&t.sourceMap===n.sourceMap)return;e(n=t)}else o()}}n.exports=function(n,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=s()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var r=h(n,t);return f(r,t),function(n){for(var e=[],o=0;o<r.length;o++){var s=r[o];(a=i[s.id]).refs--,e.push(a)}n&&f(h(n,t),t);for(o=0;o<e.length;o++){var a;if(0===(a=e[o]).refs){for(var c=0;c<a.parts.length;c++)a.parts[c]();delete i[a.id]}}}};var y,w=(y=[],function(n,t){return y[n]=t,y.filter(Boolean).join("\n")});function B(n,t,r,e){var o=r?"":e.css;if(n.styleSheet)n.styleSheet.cssText=w(t,o);else{var i=document.createTextNode(o),s=n.childNodes;s[t]&&n.removeChild(s[t]),s.length?n.insertBefore(i,s[t]):n.appendChild(i)}}},function(n,t){n.exports=function(n){var t=[];return t.toString=function(){return this.map(function(t){var r=function(n,t){var r=n[1]||"",e=n[3];if(!e)return r;if(t&&"function"==typeof btoa){var o=(s=e,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(s))))+" */"),i=e.sources.map(function(n){return"/*# sourceURL="+e.sourceRoot+n+" */"});return[r].concat(i).concat([o]).join("\n")}var s;return[r].join("\n")}(t,n);return t[2]?"@media "+t[2]+"{"+r+"}":r}).join("")},t.i=function(n,r){"string"==typeof n&&(n=[[null,n,""]]);for(var e={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(e[i]=!0)}for(o=0;o<n.length;o++){var s=n[o];"number"==typeof s[0]&&e[s[0]]||(r&&!s[2]?s[2]=r:r&&(s[2]="("+s[2]+") and ("+r+")"),t.push(s))}},t}},function(n,t,r){(n.exports=r(3)(!1)).push([n.i,"/* CSS */\r\n\r\nhtml {\r\n    box-sizing: border-box;\r\n  }\r\n  *, *:before, *:after {\r\n    box-sizing: inherit;\r\n  }\r\n  \r\n  html {\r\n    box-sizing: border-box;\r\n  }\r\n  *, *:before, *:after {\r\n    box-sizing: inherit;\r\n  }\r\n\r\n.frame {\r\n  height: 97vh;\r\n  width: 100%;\r\n  overflow-y: hidden;\r\n}\r\n\r\n.circle {\r\n  border-radius: 50%;\r\n  height: 74vmin;\r\n  width: 74vmin;\r\n  background-color: #454545;\r\n}\r\n\r\n.controlFrame {\r\n  border-radius: 50%;\r\n  height: 33vmin;\r\n  width: 33vmin;\r\n  background-color: #454545;\r\n  position: absolute;\r\n}\r\n\r\n.controls {\r\n  position: absolute;\r\n  border-radius: 50%;\r\n  height: 31vmin;\r\n  width: 31vmin;\r\n  background-color: white;\r\n}\r\n\r\n.center {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n}\r\n\r\nh1{\r\n  font-size: 5vmin;\r\n  margin: 1vmin 0em;\r\n}\r\n\r\n.posBtn{\r\n  position: relative;\r\n  border-radius: 50%;\r\n  height: 68vmin;\r\n  width: 68vmin;\r\n}\r\n\r\n.quarter {\r\n  margin: 34vmin;\r\n  position: absolute;\r\n\twidth: 50%;\r\n\theight: 50%;\r\n\ttransition: background-color 0.2s ease-in-out;\r\n}\r\n.quarter:active {\r\n  background-color:pink;\r\n  cursor: pointer;\r\n  outline: none;\r\n  transition: .4s ease;\r\n  -webkit-transition: .4s ease;\r\n}\r\n\r\n.quarter:hover {\r\n  cursor: pointer;\r\n  outline: none;\r\n}\r\n\r\n.quarter1 {\r\n  top:0;\r\n\tleft:0;\r\n\tbackground-color: #FFF732;\r\n  border-radius: 100% 0 0 0;\r\n  border: none;\r\n  outline: none;\r\n}\r\n.quarter2 {\r\n  top:0;\r\n\tright:0;\r\n\tbackground-color:#F8311A;\r\n  border-radius:0 100% 0 0 ;\r\n  border: none;\r\n  outline: none;\r\n}\r\n.quarter3 {\r\n  bottom: 0;\r\n\tleft: 0;\r\n\tbackground-color: #0298E8;\r\n  border-radius: 0 0 0 100%;\r\n  border: none;\r\n  outline: none;\r\n}\r\n.quarter4 {\r\n  bottom: 0;\r\n\tright: 0;\r\n\tbackground-color: #4DD95C;\r\n  border-radius: 0 0 100% 0 ;\r\n  border: none;\r\n  outline: none;\r\n}\r\n\r\n.centerRing {\r\n\twidth: 50%;\r\n\theight: 50%;\r\n\tbackground-color: white;\r\n\tposition: absolute;\r\n\ttop: 25%;\r\n\tleft: 25%;\r\n\tborder-radius: 50%;\r\n  z-index: 2;\r\n  }\r\n\r\n.row{\r\n  display: flex;\r\n  flex-direction: row;\r\n}\r\n\r\n.column{\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.simonScore {\r\n  margin: 1vmin;\r\n  font-weight: bold;\r\n  font-size: 4vmin;\r\n  height: 5vmin;\r\n  width: 9.5vmin;\r\n  border: 0.2vmin solid black;\r\n  border-radius: 1vmin;\r\n  color: #FF000C;\r\n  background-color: #33021D;\r\n}\r\n\r\n.simonStrict {\r\n  margin: -0.1vmin 1vmin 0vmin 1vmin;\r\n  height: 3vmin;\r\n  width: 3vmin;\r\n  border: 0.2vmin solid #333333;\r\n  background-color: #ffff76;\r\n  border-radius: 50%;\r\n  cursor: pointer;\r\n  outline: none;\r\n}\r\n\r\n  \r\n.simonStart {\r\n  margin: -0.1vmin 1vmin 0vmin 1vmin;\r\n  height: 3vmin;\r\n  width: 3vmin;\r\n  border: 0.2vmin solid #333333;\r\n  background-color: #ff3333;\r\n  border-radius: 50%;\r\n  cursor: pointer;\r\n  outline: none;\r\n}\r\n\r\n.simonStrictLight2 {\r\n  margin: 0.6vmin 0vmin 0.5vmin 0vmin;\r\n  height: 1vmin;\r\n  width: 1vmin;\r\n  visibility: hidden;\r\n}\r\n\r\n.simonStrictLight {\r\n  margin: 0.6vmin 0vmin 0.5vmin 0vmin;\r\n  height: 1vmin;\r\n  width: 1vmin;\r\n  border: 0.1vmin solid #333333;\r\n  background-color: black;\r\n  border-radius: 50%;\r\n}\r\n\r\nh4 {\r\n  margin: 0.3vw 0.5vw;\r\n  font-size: 1.7vmin;\r\n}\r\n\r\n.switch {\r\n  position: relative;\r\n  display: inline-block;\r\n  width: 7vmin;\r\n  height: 4vmin;\r\n}\r\n\r\n/* Hide default HTML checkbox */\r\n.switch button {display: none;}\r\n\r\n/* The slider */\r\n.slider {\r\n  position: absolute;\r\n  cursor: pointer;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  border-radius: 34vmin;\r\n  background-color: #ccc;\r\n  transition: .4s ease;\r\n  -webkit-transition: .4s ease;\r\n}\r\n\r\n.ball {\r\n  position: absolute;\r\n  height: 3vmin;\r\n  width: 3vmin;\r\n  left: 0.5vmin;\r\n  bottom: 0.5vmin;\r\n  border-radius: 50%;\r\n  background-color: white;\r\n  transition: .4s ease;\r\n  -webkit-transition: .4s ease;\r\n}\r\n\r\n.disable{\r\n  background-color: #EB5B43;\r\n}\r\n\r\n.enable{\r\n  background-color: #49D06E;\r\n}\r\n\r\n.last{\r\n  left: 3.5vmin;\r\n}\r\n\r\n.quarterCompHover {\r\n  background-color:pink;\r\n  cursor: pointer;\r\n  outline: none;\r\n  transition: .4s ease;\r\n  -webkit-transition: .4s ease;\r\n}",""])},function(n,t,r){var e=r(4);"string"==typeof e&&(e=[[n.i,e,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};r(2)(e,o);e.locals&&(n.exports=e.locals)}]);