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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/bkmks_panel_background.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/bkmks_panel_background.js":
/*!**************************************!*\
  !*** ./js/bkmks_panel_background.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// import "bkmks_panel_content_script.js";

chrome.browserAction.onClicked.addListener(function(tab) {
  ensureSendMessage(tab.id, "bkmks_toggle");
});

function ensureSendMessage(tabId, message, callback) {
  chrome.tabs.sendMessage(tabId, "bkmks_test", function(response) {
    if (chrome.runtime.lastError && !response) {
      chrome.browserAction.setPopup({
        tabId: tabId,
        popup: "../bkmks_panel_popup.html",
      });
    } else {
      chrome.tabs.sendMessage(tabId, message, callback);
    }
  });
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status == "complete" && tab.active) {
    if (tab.url.includes("chrome://") || tab.url.includes("data:")) {
      chrome.browserAction.setPopup({
        tabId: tab.id,
        popup: "../bkmks_panel_popup.html",
      });
    }
  }
});

chrome.webNavigation.onErrorOccurred.addListener(function(data) {
  // console.log(data.error);
  if (
    data.error.indexOf("ERR_FILE_NOT_FOUND") > 0 ||
    data.error.indexOf("ERR_NAME_NOT_RESOLVED") > 0 ||
    data.error.indexOf("ERR_CONNECTION_REFUSED") > 0 ||
    data.error.indexOf("ERR_CONNECTION_TIMED_OUT") > 0 ||
    data.error.indexOf("ERR_CERT_DATE_INVALID") > 0
  ) {
    chrome.browserAction.setPopup({
      tabId: data.tabId,
      popup: "../bkmks_panel_popup.html",
    });
  }
});


/***/ })

/******/ });