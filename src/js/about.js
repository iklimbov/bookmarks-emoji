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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/about.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/about.js":
/*!*********************!*\
  !*** ./js/about.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bkmks_panel_common.js */ "./js/bkmks_panel_common.js");


$("#mG61Hd").submit(function(e) {
  e.preventDefault();
  $.ajax({
    url:
      "https://docs.google.com/forms/u/0/d/e/1FAIpQLSewrVVkxLn7RaTt7QfirdDz2SMAoi_XGSd0H3FZ7Zpm1Oj_-Q/formResponse?embedded=true",
    data: $("#mG61Hd").serialize(),
    type: "POST",

    success: function(data) {
      document.getElementById("contact_page").hidden = true;
      document.getElementById("howto_page").hidden = true;
      document.getElementById("welcome_page").hidden = false;
      _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_0__["displayInfoBox"](
        "Message is on its way, thank you!",
        _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_0__["BKMKS_INFO"],
        3000
      );
      document.body.style.backgroundImage = "url('../images/water3.jpg')";
      var elements = document.getElementsByClassName("form_input");
      for (var ii = 0; ii < elements.length; ii++) {
        elements[ii].value = "";
      }
    },
    error: function(xhr, status, error) {
      _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_0__["displayInfoBox"](
        "Error sending.  Please try again later.",
        _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_0__["BKMKS_ERROR"],
        3000
      );
    },
  });
});
document.getElementById("wel_lnk").addEventListener("click", function(ev) {
  document.getElementById("welcome_page").hidden = false;
  document.getElementById("about_page").hidden = true;
  document.getElementById("howto_page").hidden = true;
  document.getElementById("contact_page").hidden = true;
  document.body.style.backgroundImage = "url('../images/water1.jpg')";
});

document.getElementById("ht_lnk").addEventListener("click", function(ev) {
  document.getElementById("howto_page").hidden = false;
  document.getElementById("welcome_page").hidden = true;
  document.getElementById("about_page").hidden = true;
  document.getElementById("contact_page").hidden = true;
  document.body.style.backgroundImage = "url('../images/water4.jpg')";
});

document.getElementById("con_lnk").addEventListener("click", function(ev) {
  document.getElementById("contact_page").hidden = false;
  document.getElementById("welcome_page").hidden = true;
  document.getElementById("about_page").hidden = true;
  document.getElementById("howto_page").hidden = true;
  document.body.style.backgroundImage = "url('../images/water3.jpg')";
});

document.getElementById("ab_lnk").addEventListener("click", function(ev) {
  document.getElementById("about_page").hidden = false;
  document.getElementById("welcome_page").hidden = true;
  document.getElementById("howto_page").hidden = true;
  document.getElementById("contact_page").hidden = true;
  document.body.style.backgroundImage = "url('../images/water4.jpg')";
});

var manifestData = chrome.runtime.getManifest();
document.getElementById("bkmks_info").innerHTML = "v" + manifestData.version;


/***/ }),

/***/ "./js/bkmks_panel_common.js":
/*!**********************************!*\
  !*** ./js/bkmks_panel_common.js ***!
  \**********************************/
/*! exports provided: BKMKS_INFO, BKMKS_ERROR, BKMKS_ARCHIVE, BKMKS_WASTE, BKMKS_SPEC, BKMKS_ARCHIVE_EM, archiveFld, wasteFld, setArchiveFld, setWasteFld, displayInfoBox, clearMultiSelect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BKMKS_INFO", function() { return BKMKS_INFO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BKMKS_ERROR", function() { return BKMKS_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BKMKS_ARCHIVE", function() { return BKMKS_ARCHIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BKMKS_WASTE", function() { return BKMKS_WASTE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BKMKS_SPEC", function() { return BKMKS_SPEC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BKMKS_ARCHIVE_EM", function() { return BKMKS_ARCHIVE_EM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "archiveFld", function() { return archiveFld; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wasteFld", function() { return wasteFld; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setArchiveFld", function() { return setArchiveFld; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setWasteFld", function() { return setWasteFld; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "displayInfoBox", function() { return displayInfoBox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearMultiSelect", function() { return clearMultiSelect; });
const BKMKS_INFO = 1,
  BKMKS_ERROR = 2,
  BKMKS_ARCHIVE = "Bookmarks Archive",
  BKMKS_WASTE = "Recycling Bin",
  BKMKS_SPEC = ["🅰️", "📂"],
  BKMKS_ARCHIVE_EM = "🅰️";

var archiveFld = "",
  wasteFld = "";

function setArchiveFld(x) {
  archiveFld = x;
}
function setWasteFld(x) {
  wasteFld = x;
}

//-------------------------------------------------
// red alert box
//-------------------------------------------------
function displayInfoBox(alrt, msg_type, seconds, emj) {
  if (!seconds) seconds = 2000;
  var box = document.getElementById("bkmks_message_info");
  if (!emj) {
    emj = "🙂";
    if (msg_type == BKMKS_ERROR) {
      emj = "❌";
    }
  }
  if (msg_type == BKMKS_ERROR) {
    box = document.getElementById("bkmks_message_alrt");
  }
  box.innerHTML = emj + "  " + alrt;
  box.hidden = false;
  setTimeout(function() {
    box.innerHTML = "";
    box.hidden = true;
  }, seconds);
}

function clearMultiSelect() {
  var elems = document.querySelectorAll(".bkmks_multi");
  [].forEach.call(elems, function(el) {
    el.classList.remove("bkmks_multi");
  });
}


/***/ })

/******/ });