/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/bkmks_panel_content_script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/bkmks_panel_content_script.js":
/*!******************************************!*\
  !*** ./js/bkmks_panel_content_script.js ***!
  \******************************************/
/*! exports provided: bkmksMainIframe, init, bkmksToggleInj */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bkmksMainIframe", function() { return bkmksMainIframe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bkmksToggleInj", function() { return bkmksToggleInj; });

var bkmksMainIframe;

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg == "bkmks_test") {
    sendResponse(true);
  }
  if (msg == "bkmks_toggle") {
    bkmksToggleInj(sender);
  }
  if (msg == "bkmks_close_all") {
    if (bkmksMainIframe.style.width != "0px") {
      chrome.runtime.sendMessage(sender.id, "bkmks_close_panel");
      bkmksMainIframe.style.setProperty("width", "0px", "important");
    }
  }
});

function time() {
  var today = new Date();
  console.log(today.getMinutes() + ":" + today.getSeconds());
}

function init() {
  bkmksMainIframe = document.createElement("iframe");
  bkmksMainIframe.id = "bkmks_iframe";
  bkmksMainIframe.style.overflow = "auto";
  bkmksMainIframe.style.height = "100vh";
  bkmksMainIframe.style.setProperty("width", "0px", "important");
  bkmksMainIframe.style.position = "fixed";
  bkmksMainIframe.style.top = "0px";
  bkmksMainIframe.style.right = "0px";
  bkmksMainIframe.style.left = "0px";
  bkmksMainIframe.style.zIndex = "9999999999";
  bkmksMainIframe.style.border = 0;
  bkmksMainIframe.style.setProperty("min_width", "0", "important");
  setTimeout(function() {
    bkmksMainIframe.src = chrome.runtime.getURL("bkmks_panel_inj.html");
  }, 100);
  document.body.appendChild(bkmksMainIframe);
}

function bkmksToggleInj(sender) {
  if (bkmksMainIframe.style.width == "0px") {
    chrome.runtime.sendMessage(sender.id, "bkmks_open_panel");
    bkmksMainIframe.style.setProperty("width", "calc(100%)", "important");
  } else {
    chrome.runtime.sendMessage(sender.id, "bkmks_close_panel");
    bkmksMainIframe.style.setProperty("width", "0px", "important");
  }
}

init();


/***/ })

/******/ });