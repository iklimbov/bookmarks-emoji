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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/bkmks_panel_enj_start.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/bkmks_enj_slider.js":
/*!********************************!*\
  !*** ./js/bkmks_enj_slider.js ***!
  \********************************/
/*! exports provided: sliderSetUp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sliderSetUp", function() { return sliderSetUp; });
function sliderSetUp() {
  $(document).ready(function() {
    var element = document.getElementById("bkmk_resizable");
    if (element) {
      var resizer = document.createElement("div");
      resizer.className = "draghandle";
      resizer.style.width = "3px";
      resizer.style.display = "block";
      resizer.style.zIndex = "1";
      resizer.style.boxShadow = "1px 1px 1px grey";
      element.appendChild(resizer);
      resizer.addEventListener("mousedown", initResize, false);
    }

    function initResize(e) {
      window.addEventListener("mousemove", Resize, false);
      window.addEventListener("mouseup", stopResize, false);
      $("#mainArea.content, #tabs iframe").addClass("marginLeft");
    }

    function Resize(e) {
      var rt = $(window).width() - e.clientX;
      element.style.width = rt + "px";
    }

    function stopResize(e) {
      window.removeEventListener("mousemove", Resize, false);
      window.removeEventListener("mouseup", stopResize, false);
    }
  });

  //mobile toggle
  $(".toggle-mobile").click(function() {
    $(".overlay").toggleClass("hidden");
  });
}


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


/***/ }),

/***/ "./js/bkmks_panel_enj_start.js":
/*!*************************************!*\
  !*** ./js/bkmks_panel_enj_start.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bkmks_panel_popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bkmks_panel_popup.js */ "./js/bkmks_panel_popup.js");
/* harmony import */ var _bkmks_enj_slider_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bkmks_enj_slider.js */ "./js/bkmks_enj_slider.js");
/* harmony import */ var _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bkmks_panel_common.js */ "./js/bkmks_panel_common.js");




var opened = false;

function time() {
  var today = new Date();
  console.log(today.getMinutes() + ":" + today.getSeconds());
}

chrome.tabs.onActivated.addListener(function(tabId) {
  if (!opened) return;
  chrome.tabs.getCurrent(function(tab1) {
    if (tab1.id != tabId) {
      opened = false;
      chrome.tabs.sendMessage(tab1.id, "bkmks_close_all");
    }
  });
});

chrome.runtime.onMessage.addListener(function(msg, sender) {
  if (msg == "bkmks_open_panel") {
    opened = true;
    chrome.storage.local.get(
      {
        includeText: true,
        largeIcons: false,
        singleFolderNav: false,
        darkMode: false,
        openedFolderIds: ["0", "1"],
        currentFolderId: "",
      },
      function(items) {
        _bkmks_panel_popup_js__WEBPACK_IMPORTED_MODULE_0__["setColorMode"](items.darkMode);
        if (items.includeText) {
          document.getElementById("bkmk_resizable").classList.add("bkmks_400");
        } else {
          document.getElementById("bkmk_resizable").classList.add("bkmks_200");
        }
        document.body.style.fontSize = items.largeIcons ? "120%" : "85%";
        _bkmks_panel_popup_js__WEBPACK_IMPORTED_MODULE_0__["clearFilter"]();
        chrome.storage.sync.get(null, function(items2) {
          _bkmks_panel_popup_js__WEBPACK_IMPORTED_MODULE_0__["setOptions"](
            items.largeIcons,
            items.includeText,
            items.singleFolderNav,
            items.currentFolderId,
            items.darkMode,
            items.openedFolderIds,
            items2
          );
          chrome.bookmarks.getTree(function(bkmksTree) {
            _bkmks_panel_popup_js__WEBPACK_IMPORTED_MODULE_0__["updateTree"](bkmksTree, true);
            document.getElementById("bkmks_text_icon").focus();
          });
        });
      }
    );
  } else if (msg == "bkmks_close_panel") {
    opened = false;
    _bkmks_panel_popup_js__WEBPACK_IMPORTED_MODULE_0__["clearFilter"]();
    _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_2__["clearMultiSelect"]();
    document.getElementById("bkmks_loader").hidden = false;
    document.getElementById("bkmks_bookmarks").innerHTML = "";
    document.getElementById("bkmks_folders_only").innerHTML = "";
    document.getElementById("bkmks_breadcrumb_bar").innerHTML = "";
  }
});

// toggle when grey area clicked
window.addEventListener("click", function(e) {
  if (document.getElementById("bkmks_tr_pane").contains(e.target)) {
    if (chrome.tabs) {
      chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendMessage(tab.id, "bkmks_toggle");
      });
    }
  }
});

_bkmks_enj_slider_js__WEBPACK_IMPORTED_MODULE_1__["sliderSetUp"]();


/***/ }),

/***/ "./js/bkmks_panel_menu.js":
/*!********************************!*\
  !*** ./js/bkmks_panel_menu.js ***!
  \********************************/
/*! exports provided: toggleBkmksMenuOff */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleBkmksMenuOff", function() { return toggleBkmksMenuOff; });
/* harmony import */ var _bkmks_panel_menu_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bkmks_panel_menu_common.js */ "./js/bkmks_panel_menu_common.js");
/* harmony import */ var _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bkmks_panel_common.js */ "./js/bkmks_panel_common.js");




var menu_bkmks = document.querySelector("#bkmks_context_menu");
var bkmks_menu_state = 0;

function init() {
  bkmksContextListener();
  bkmksKeyupListener();
}

function bkmksContextListener() {
  document.addEventListener("contextmenu", function(e) {
    _bkmks_panel_menu_common_js__WEBPACK_IMPORTED_MODULE_0__["setBkmkInContext"](_bkmks_panel_menu_common_js__WEBPACK_IMPORTED_MODULE_0__["clickInsideElement"](e, "bkmks_bookmark"));
    if (_bkmks_panel_menu_common_js__WEBPACK_IMPORTED_MODULE_0__["bkmkInContext"]) {
      removeExtra();

      e.preventDefault();
      e.stopPropagation();
      toggleBkmksMenuOn();
      _bkmks_panel_menu_common_js__WEBPACK_IMPORTED_MODULE_0__["positionMenu"](e, menu_bkmks);
    } else {
      _bkmks_panel_menu_common_js__WEBPACK_IMPORTED_MODULE_0__["setBkmkInContext"](null);
      toggleBkmksMenuOff();
    }
  });
}

function removeExtra() {
  if (_bkmks_panel_menu_common_js__WEBPACK_IMPORTED_MODULE_0__["multiSelectParent"]) {
    document.getElementById("bkmks_edit").hidden = true;
    document.getElementById("bkmks_emoji").hidden = true;
    document.getElementById("bkmks_view").hidden = true;
    var c = document.getElementById("bkmks_copy");
    if (c) c.hidden = true;
  } else {
    document.getElementById("bkmks_edit").hidden = false;
    document.getElementById("bkmks_emoji").hidden = false;
    document.getElementById("bkmks_view").hidden = false;
    var c = document.getElementById("bkmks_copy");
    if (c) c.hidden = false;
  }
}

function bkmksKeyupListener() {
  window.onkeyup = function(e) {
    if (e.keyCode === 27) {
      toggleBkmksMenuOff();
    }
  };
}

function toggleBkmksMenuOn() {
  if (bkmks_menu_state !== 1) {
    bkmks_menu_state = 1;
    menu_bkmks.classList.add("bkmks_context_menu--active");
  }
}

function toggleBkmksMenuOff() {
  if (bkmks_menu_state !== 0) {
    bkmks_menu_state = 0;
    menu_bkmks.classList.remove("bkmks_context_menu--active");
    _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_1__["clearMultiSelect"]();
  }
}
init();


/***/ }),

/***/ "./js/bkmks_panel_menu_common.js":
/*!***************************************!*\
  !*** ./js/bkmks_panel_menu_common.js ***!
  \***************************************/
/*! exports provided: bkmkInContext, bkmkFolderInContext, multiSelectParent, setFolderInContext, setBkmkInContext, setMultiSelectParent, clickInsideElement, positionMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bkmkInContext", function() { return bkmkInContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bkmkFolderInContext", function() { return bkmkFolderInContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiSelectParent", function() { return multiSelectParent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setFolderInContext", function() { return setFolderInContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setBkmkInContext", function() { return setBkmkInContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setMultiSelectParent", function() { return setMultiSelectParent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clickInsideElement", function() { return clickInsideElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "positionMenu", function() { return positionMenu; });
/* harmony import */ var _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bkmks_panel_common.js */ "./js/bkmks_panel_common.js");



var bkmkInContext; //used in popup as a link to current item
var bkmkFolderInContext; //used in popup as a link to current item
var multiSelectParent; // multile items

function setFolderInContext(x) {
  bkmkFolderInContext = x;
}
function setBkmkInContext(x) {
  bkmkInContext = x;
}

function setMultiSelectParent(x) {
  multiSelectParent = x;
}

function clickInsideElement(e, className) {
  var el = e.srcElement || e.target;
  if (el.classList.contains(className)) {
    return el;
  } else {
    while ((el = el.parentNode)) {
      if (el.classList && el.classList.contains(className)) {
        return el;
      }
    }
  }
  return false;
}

function getPosition(e) {
  var posx = 0;
  var posy = 0;
  if (!e) var e = window.event;
  if (e.layerX || e.layerY) {
    posx = e.layerX;
    posy = e.layerY;
  } else if (e.clientX || e.clientY) {
    posx = e.clientX;
    posy = e.clientY;
  }
  return {
    x: posx,
    y: posy,
  };
}

function positionMenu(e, menu) {
  var clickCoords = getPosition(e);
  var clickCoordsX = clickCoords.x;
  var clickCoordsY = clickCoords.y;

  var smallFolder = false;
  var y_offset = 20;
  var x_offset = 20;
  var size = document.getElementById("bkmks_bookmarks").getBoundingClientRect();
  var windowWidth = size.width;
  var windowHeight = size.height;
  var temp = document.getElementById("bkmks_folders_only");
  var temp2 = document.getElementById("bkmks_breadcrumb_bar");
  var temp1 = document.getElementById(menu.id);
  var menuWidth = 150;
  var menuHight = temp1.getBoundingClientRect().height;

  // X
  var x = clickCoordsX - menuWidth / 2;
  if (x + menuWidth > windowWidth) {
    x = clickCoordsX - menuWidth - x_offset;
  }
  var extraY = 0;
  if (temp) {
    var ix = e.composedPath().indexOf(temp);
    if (ix < 0) {
      //we below the bookmarks bar, add it to the hight
      extraY = temp.getBoundingClientRect().height;
      extraY = extraY + temp2.getBoundingClientRect().height;
    } else {
      // we are inside the bar
      extraY = -1;
    }
  }
  var y = 0;
  if (extraY == -1) {
    // this is click inside the top folders bar
    y = clickCoordsY + y_offset;
  } else {
    // we are below the top folders bar (or not displayied fb)
    if (bkmkFolderInContext) {
      var m = bkmkFolderInContext.getAttribute("managed_f");
      if (m) {
        if (m == _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_0__["archiveFld"] || m == _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_0__["wasteFld"] || m < 3) {
          menuHight = 100;
          smallFolder = true;
        }
      }
    }
    y = clickCoordsY + extraY + menuHight / 2;
    if (y + 0.5 * menuHight > windowHeight && !smallFolder) {
      y = clickCoordsY + extraY - y_offset - menuHight / 2;
    }
  }

  menu.style.top = (y < 0 ? 0 : y) + "px";
  menu.style.left = (x < 0 ? 0 : x) + "px";
}


/***/ }),

/***/ "./js/bkmks_panel_menu_f.js":
/*!**********************************!*\
  !*** ./js/bkmks_panel_menu_f.js ***!
  \**********************************/
/*! exports provided: toggleBkmksFolderMenuOff */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleBkmksFolderMenuOff", function() { return toggleBkmksFolderMenuOff; });
/* harmony import */ var _bkmks_panel_menu_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bkmks_panel_menu_common.js */ "./js/bkmks_panel_menu_common.js");
/* harmony import */ var _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bkmks_panel_common.js */ "./js/bkmks_panel_common.js");





var menu_bkmks_f = document.querySelector("#bkmks_context_menu_f");
var bkmks_menu_f_state = 0;

function init() {
  bkmksFolderContextListener();
  bkmksFolderKeyupListener();
}

function bkmksFolderContextListener() {
  document.addEventListener("contextmenu", function(e) {
    _bkmks_panel_menu_common_js__WEBPACK_IMPORTED_MODULE_0__["setFolderInContext"](_bkmks_panel_menu_common_js__WEBPACK_IMPORTED_MODULE_0__["clickInsideElement"](e, "bkmks_folder_title"));
    if (_bkmks_panel_menu_common_js__WEBPACK_IMPORTED_MODULE_0__["bkmkFolderInContext"]) {
      e.preventDefault();
      // remove menues for non-editable
      if (!removeExtraF()) {
        return;
      }
      toggleBkmksFolderMenuOn();
      _bkmks_panel_menu_common_js__WEBPACK_IMPORTED_MODULE_0__["positionMenu"](e, menu_bkmks_f, 50);
    } else {
      _bkmks_panel_menu_common_js__WEBPACK_IMPORTED_MODULE_0__["setFolderInContext"](null);
      toggleBkmksFolderMenuOff();
    }
  });
}

function removeExtraF() {
  var m = _bkmks_panel_menu_common_js__WEBPACK_IMPORTED_MODULE_0__["bkmkFolderInContext"].getAttribute("managed_f");
  if (m < 1) {
    return false;
  }
  if (m < 3) {
    document.getElementById("bkmks_edit_f").hidden = true;
    document.getElementById("bkmks_emoji_f").hidden = true;
    document.getElementById("bkmks_delete_f").hidden = true;
    document.getElementById("bkmks_newfolder_f").hidden = false;
  } else if (m == _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_1__["wasteFld"] || m == _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_1__["archiveFld"]) {
    document.getElementById("bkmks_edit_f").hidden = true;
    document.getElementById("bkmks_emoji_f").hidden = true;
    document.getElementById("bkmks_delete_f").hidden = true;
    document.getElementById("bkmks_newfolder_f").hidden = true;
  } else {
    document.getElementById("bkmks_edit_f").hidden = false;
    document.getElementById("bkmks_emoji_f").hidden = false;
    document.getElementById("bkmks_delete_f").hidden = false;
    document.getElementById("bkmks_newfolder_f").hidden = false;
  }
  if (m == _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_1__["wasteFld"]) {
    document.getElementById("bkmks_empty_f_link").innerHTML =
      "Empty Recycling Bin";
  } else {
    document.getElementById("bkmks_empty_f_link").innerHTML = "Empty Folder";
  }
  return true;
}

function bkmksFolderKeyupListener() {
  window.onkeyup = function(e) {
    if (e.keyCode === 27) {
      toggleBkmksFolderMenuOff();
    }
  };
}

function toggleBkmksFolderMenuOn() {
  if (bkmks_menu_f_state !== 1) {
    bkmks_menu_f_state = 1;
    menu_bkmks_f.classList.add("bkmks_context_menu_f--active");
  }
}

function toggleBkmksFolderMenuOff() {
  if (bkmks_menu_f_state !== 0) {
    bkmks_menu_f_state = 0;
    menu_bkmks_f.classList.remove("bkmks_context_menu_f--active");
    _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_1__["clearMultiSelect"]();
  }
}
init();


/***/ }),

/***/ "./js/bkmks_panel_popup.js":
/*!*********************************!*\
  !*** ./js/bkmks_panel_popup.js ***!
  \*********************************/
/*! exports provided: currentFolderId, openedFolderIds, singleFolderNav, objecto, includeText, largeIcons, darkMode, includeCounters, currentSrc, foldersDropDownTree, sortByName, sortByVisits, filter, siteVisits, allEmojis, allChFolders, allPrFolders, emojiLoaded, emojiDialogLoaded, emojiPanelLoaded, selectorAnc, myEms, toLoad, alreadyLoaded, images, hoverDiv, setOptions, updateTree, clearFilter, setColorMode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currentFolderId", function() { return currentFolderId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openedFolderIds", function() { return openedFolderIds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "singleFolderNav", function() { return singleFolderNav; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "objecto", function() { return objecto; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "includeText", function() { return includeText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "largeIcons", function() { return largeIcons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "darkMode", function() { return darkMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "includeCounters", function() { return includeCounters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currentSrc", function() { return currentSrc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "foldersDropDownTree", function() { return foldersDropDownTree; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortByName", function() { return sortByName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortByVisits", function() { return sortByVisits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filter", function() { return filter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "siteVisits", function() { return siteVisits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "allEmojis", function() { return allEmojis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "allChFolders", function() { return allChFolders; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "allPrFolders", function() { return allPrFolders; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emojiLoaded", function() { return emojiLoaded; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emojiDialogLoaded", function() { return emojiDialogLoaded; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emojiPanelLoaded", function() { return emojiPanelLoaded; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectorAnc", function() { return selectorAnc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "myEms", function() { return myEms; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toLoad", function() { return toLoad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "alreadyLoaded", function() { return alreadyLoaded; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "images", function() { return images; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hoverDiv", function() { return hoverDiv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setOptions", function() { return setOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateTree", function() { return updateTree; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearFilter", function() { return clearFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setColorMode", function() { return setColorMode; });
/* harmony import */ var _bkmks_panel_menu_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bkmks_panel_menu_common.js */ "./js/bkmks_panel_menu_common.js");
/* harmony import */ var _bkmks_panel_menu_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bkmks_panel_menu.js */ "./js/bkmks_panel_menu.js");
/* harmony import */ var _bkmks_panel_menu_f_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bkmks_panel_menu_f.js */ "./js/bkmks_panel_menu_f.js");
/* harmony import */ var _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bkmks_panel_common.js */ "./js/bkmks_panel_common.js");




var currentFolderId,
  openedFolderIds = [],
  singleFolderNav = false,
  objecto = [],
  includeText,
  largeIcons,
  darkMode,
  includeCounters,
  currentSrc,
  foldersDropDownTree = [],
  sortByName,
  sortByVisits,
  filter = "",
  siteVisits = {},
  allEmojis = [],
  allChFolders = {},
  allPrFolders = {},
  emojiLoaded = false,
  emojiDialogLoaded = false,
  emojiPanelLoaded = false,
  selectorAnc = "",
  myEms = {},
  toLoad = {},
  alreadyLoaded = [],
  images = {},
  hoverDiv = "";

const DR_1 = document.createElement("img");
DR_1.src = "../images/dr1.png";

const DR_2 = document.createElement("img");
DR_2.src = "../images/dr2.png";

function setOptions(
  _largeIcons,
  _includeText,
  _singleFolderNav,
  _currentFolderId,
  _darkMode,
  _openedFolderIds,
  _myEms
) {
  includeText = _includeText;
  largeIcons = _largeIcons;
  singleFolderNav = _singleFolderNav;
  openedFolderIds = _openedFolderIds;
  currentFolderId = _currentFolderId;
  darkMode = _darkMode;
  myEms = _myEms;
}

//-------------------------------------------------
// DELTE KEY
//-------------------------------------------------
$("html").keyup(function(e) {
  if (e.keyCode == 46 || e.keyCode == 8) {
    deleteCurrentSelection();
  }
});

$("#bkmks_bookmarks").click(function(e) {
  _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["clearMultiSelect"]();
  _bkmks_panel_menu_common_js__WEBPACK_IMPORTED_MODULE_0__["setMultiSelectParent"]("");
  selectorAnc = "";
});

//-------------------------------------------------
// titles for folders in main view
// ------------------------------------------------
function setupTitleBar(bar) {
  bar.click(function() {
    var id = this.getAttribute("managed_f");
    var e = document.getElementById(id);
    clearFilter();
    if (singleFolderNav) {
      // SINGLE FOLDER
      setOpenedFolders([]);
      currentFolderId = id;
      //get folder to display
      chrome.bookmarks.getTree(function(bkmksTree) {
        updateTree(bkmksTree);
      });
    } else {
      if (e) {
        if (e.hidden) {
          // opening
          addToOpenedFolders(id);
        } else {
          removeFromOpenedFolders(e.getAttribute("managed_f"));
          currentFolderId = "";
        }
      } else {
        // opening, probably found it in filter mode
        currentFolderId = id;
      }
      chrome.bookmarks.getTree(function(bkmksTree1) {
        updateTree(bkmksTree1, true);
      });
    }
  });
}

//-------------------------------------------------
// what if we move something in empty space of child panel
// ------------------------------------------------
function setupChildrenPanel(i) {
  i[0].ondrop = function(ev) {
    hoverDiv = "";
    var distino = this.getAttribute("id");
    if (!validateDragToEvent(distino)) {
      ev.stopPropagation();
      return true;
    }
    new Promise((resolve, reject) => {
      moveObjToFolder(distino, resolve, reject);
    }).then((ret) => {
      if (ret) {
        chrome.bookmarks.getTree(function(bkmksTree) {
          _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["displayInfoBox"](
            "Moved to End of Folder",
            _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["BKMKS_INFO"],
            800,
            "⬇"
          );
          updateTree(bkmksTree, true);
        });
      }
    });
    ev.stopPropagation();
    return true;
  };
}

//-------------------------------------------------
// separate forlders with highlightable bars
//-------------------------------------------------
function setupSeparator(dsep) {
  dsep[0].ondragleave = function(event1) {
    event1.preventDefault();
    dsep[0].classList.remove("bkmks_f_highligt_more");
  };

  dsep[0].ondragenter = function(event2) {
    event2.preventDefault();
    dsep[0].classList.add("bkmks_f_highligt_more");
  };
  dsep[0].ondrop = function(event) {
    var distino = this.getAttribute("managed_f");
    var index = this.getAttribute("index");
    index = parseInt(index, 10);
    if (!validateDragToEvent(distino)) {
      event.stopPropagation();
      return true;
    }
    new Promise((resolve, reject) => {
      moveObjToFolder(distino, resolve, reject, index);
    }).then((ret) => {
      if (ret) {
        chrome.bookmarks.getTree(function(bkmksTree) {
          updateTree(bkmksTree, true);
        });
      }
    });
    event.stopPropagation();
    return true;
  };
}

//-------------------------------------------------
// most outer header of the object (d1)
//-------------------------------------------------
function setupHeader(head) {
  head[0].ondragleave = function(event1) {
    event1.preventDefault();
    head[0].classList.remove("bkmks_f_highlight");
  };

  head[0].ondragenter = function(event2) {
    event2.preventDefault();
    head[0].classList.add("bkmks_f_highlight");
  };

  head[0].ondrop = function(event) {
    var distino = this.getAttribute("managed_f");
    if (!validateDragToEvent(distino)) {
      event.stopPropagation();
      return true;
    }
    new Promise((resolve, reject) => {
      moveObjToFolder(distino, resolve, reject);
      if (!singleFolderNav) {
        openedFolderIds.push(distino);
      }
    }).then((ret) => {
      if (ret) {
        chrome.bookmarks.getTree(function(bkmksTree) {
          _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["displayInfoBox"](
            "Moved to End of Folder",
            _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["BKMKS_INFO"],
            800,
            "⬇"
          );
          updateTree(bkmksTree, true);
        });
      }
    });
    event.stopPropagation();
    return true;
  };
}

//-------------------------------------------------
// exactly what it sais
// objecto is the array of currently active bkmks
//-------------------------------------------------
function moveObjToFolder(distino, resolve, reject, index) {
  if (!distino) {
    return resolve(false);
  }
  if (!objecto) {
    return resolve(false);
  } else if (objecto.length == 0) {
    return resolve(false);
  }
  if (objecto.indexOf(distino) > -1) {
    return resolve(false);
  }
  if (objecto[0] < 3) {
    return resolve(false);
  }

  // are we moving folder to system folder?
  if (
    Object.keys(allChFolders).indexOf(objecto[0]) > -1 &&
    (distino == _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["wasteFld"] || distino == _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["archiveFld"])
  ) {
    _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["displayInfoBox"](
      "Error: cannot move folders to this location",
      _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["BKMKS_ERROR"]
    );
    return resolve(false);
  }

  var path = [];
  [].forEach.call(allPrFolders[distino], function(el) {
    path.push(el[0]);
  });

  if (path.indexOf(objecto[0]) > -1) {
    _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["displayInfoBox"]("Error: move to the child folder.", _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["BKMKS_ERROR"]);
    return resolve(false);
  }
  //save emoji
  var saveEm = getEmoji(getFolderURL(objecto));

  for (var i = 0; i < objecto.length; i++) {
    var toM = objecto[i];
    chrome.bookmarks.move(
      toM,
      {
        parentId: distino,
        index: index,
      },
      function() {
        if (saveEm) {
          //we just moved a folder
          chrome.bookmarks.getTree(function(bkmksTree) {
            allPrFolders = populateCurrentParentsTree(bkmksTree);
            var f = getFolderURL(objecto);
            myEms[f] = saveEm;
            var p2 = new Promise((resolve, reject) => {
              saveEmojies(f, saveEm, resolve, reject);
            });
            p2.then((t) => {});
          });
        }
        if (i == objecto.length) {
          resolve(true);
        }
      }
    );
  }
}

//-------------------------------------------------
// drag bkmk folder
//-------------------------------------------------
function setupFolderIcon(i) {
  i[0].ondragstart = function() {
    if (validateFldrDragFromEvent(this)) {
      objecto = [this.getAttribute("managed_f")];
      return true;
    }
  };
}

//--------------------------------------------------
// events in bkmks icons
//--------------------------------------------------
function setupIcon(i) {
  var idName = "id";

  i[0].ondragenter = function(event2) {
    event2.preventDefault();
    i[0].classList.add("bkmks_icon_highlight");
    setTimeout(function() {
      i[0].classList.remove("bkmks_icon_highlight");
    }, 200);
  };

  i[0].ondragstart = function(event) {
    if (validateMoveEvent()) {
      if (!_bkmks_panel_menu_common_js__WEBPACK_IMPORTED_MODULE_0__["multiSelectParent"]) {
        event.dataTransfer.setDragImage(DR_2, 0, 0);
        var elems = document.querySelectorAll(".bkmks_multi");
        objecto = [this.getAttribute(idName)];
      } else {
        _bkmks_panel_menu_common_js__WEBPACK_IMPORTED_MODULE_0__["setMultiSelectParent"]("");
        event.dataTransfer.setDragImage(DR_1, 0, 0);
        var elems = document.querySelectorAll(".bkmks_multi");
        objecto = [];
        [].forEach.call(elems, function(el) {
          el.classList.remove("bkmks_multi");
          objecto.push(el.getAttribute(idName));
        });
      }
    }
    event.stopPropagation();
    return true;
  };

  i[0].ondrop = function(event) {
    event.stopPropagation();
    event.preventDefault();

    var id = this.getAttribute(idName);

    chrome.bookmarks.get(id, function(node) {
      var node = node[0];
      var index = node.index;
      var distino = node.parentId;

      new Promise((resolve, reject) => {
        moveObjToFolder(distino, resolve, reject, index);
      }).then((ret) => {
        if (ret) {
          chrome.bookmarks.getTree(function(bkmksTree) {
            updateTree(bkmksTree, true);
          });
        }
      });
    });
  };

  i.click(function(event) {
    event.stopPropagation();
    event.preventDefault();
    if (event.ctrlKey) {
      if (_bkmks_panel_menu_common_js__WEBPACK_IMPORTED_MODULE_0__["multiSelectParent"] != this.getAttribute("parentId")) {
        _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["clearMultiSelect"]();
        _bkmks_panel_menu_common_js__WEBPACK_IMPORTED_MODULE_0__["setMultiSelectParent"](this.getAttribute("parentId"));
      }
      selectorAnc = this.getAttribute(idName);
      if (i[0].classList) {
        if (i[0].classList.contains("bkmks_multi")) {
          i.removeClass("bkmks_multi");
        } else {
          i.addClass("bkmks_multi");
        }
      } else {
        i.addClass("bkmks_multi");
      }
    } else if (event.shiftKey) {
      if (_bkmks_panel_menu_common_js__WEBPACK_IMPORTED_MODULE_0__["multiSelectParent"] != this.getAttribute("parentId")) {
        _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["clearMultiSelect"]();
        _bkmks_panel_menu_common_js__WEBPACK_IMPORTED_MODULE_0__["setMultiSelectParent"](this.getAttribute("parentId"));
        selectorAnc = this.getAttribute(idName);
        i.addClass("bkmks_multi");
        return;
      }
      if (selectorAnc) {
        if (i[0][idName] == selectorAnc) {
          i.removeClass("bkmks_multi");
          selectorAnc = "";
          return;
        }
        _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["clearMultiSelect"]();
        var me = $("#" + i[0][idName]);
        me.addClass("bkmks_multi");
        var him = $("#" + selectorAnc);
        him.addClass("bkmks_multi");
        var mePos = me.position().left + me.position().top * 10;
        var hisPos = him.position().left + him.position().top * 10;

        var elems = [];
        elems = mePos > hisPos ? him.nextUntil(me) : me.nextUntil(him);
        for (var xx = 0; xx < elems.length; xx++) {
          elems[xx].classList.add("bkmks_multi");
        }
      }
    } else {
      var url = this.getAttribute("url");
      chrome.tabs.update({ url: url });
      window.close();
    }
  });
}

//-------------------------------------------------
// context menu for bookmarks
//-------------------------------------------------
document.addEventListener("click", function(e) {
  var link = _bkmks_panel_menu_common_js__WEBPACK_IMPORTED_MODULE_0__["clickInsideElement"](e, "bkmks_context_menu_link");
  if (link) {
    e.preventDefault();
    e.stopPropagation();
    menuItemListener(link, e);
  } else {
    var button = e.which || e.button;
    if (button === 1) {
      _bkmks_panel_menu_js__WEBPACK_IMPORTED_MODULE_1__["toggleBkmksMenuOff"]();
    }
  }
});

function menuItemListener(link, e) {
  var action = link.getAttribute("data-action");
  var bkmk = _bkmks_panel_menu_common_js__WEBPACK_IMPORTED_MODULE_0__["bkmkInContext"];
  currentSrc = bkmk.getAttribute("id");
  chrome.bookmarks.get(currentSrc, function(node) {
    processMenuAction(action, node[0]);
  });

  //-------------------------------------------------
  // context menu for bkmk
  //-------------------------------------------------
  function processMenuAction(action, node) {
    if (action == "Delete") {
      if (_bkmks_panel_menu_common_js__WEBPACK_IMPORTED_MODULE_0__["multiSelectParent"]) {
        deleteCurrentSelection();
      } else {
        let prms = new Promise((resolve, reject) => {
          deleteBkmkObj(node, resolve, reject);
        });
        prms.then((m) => {
          chrome.bookmarks.getTree(function(bkmksTree) {
            updateTree(bkmksTree, true);
            _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["displayInfoBox"](m, _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["BKMKS_INFO"]);
          });
        });
      }
    } else if (action == "View") {
      try {
        e = document.getElementById(node.id);
        var win = window.open(node.url, "_blank");
        win.focus();
      } catch (err) {
        chrome.tabs.create({ url: node.url });
      }
    } else if (action == "Edit...") {
      let prms = new Promise((resolve, reject) => {
        buildEmojiBkmksPanel(resolve, reject);
      });
      prms.then(() => {
        var em = getEmoji(getShortURL(node.url));
        if (em) {
          document.getElementById("bkmk_emoji").value = em;
        }
        document.getElementById("bkmk_name").value = node.title;
        document.getElementById("bkmk_url").value = node.url;
        document.getElementById("bkmk_parent").value = node.parentId;
        document.getElementById("bkmks_edit_url").hidden = false;
        document.getElementById("bkmk_dialog_mode").value = "bkmk";
        document.getElementById("bkmk_em_search").value = "";
        chrome.bookmarks.getTree(function(bkmksTree) {
          listFolders(bkmksTree, -1, null, false);
          buildSelect(node.parentId, "bkmk_folder");
          dialog_f.dialog("option", "title", "Edit Bookmark");
          dialog_f.dialog("open");
          cleanUpEmojis(bkmksTree);
        });
      });
    } else if (action == "Emoji...") {
      let prms = new Promise((resolve, reject) => {
        buildEmojiDialog(resolve, reject);
      });
      prms.then(() => {
        document.getElementById("bkmk_emoji_node").value = node.id;
        document.getElementById("bkmk_em_search_e").value = "";
        document.getElementById("bkmk_emoji_id").value = getShortURL(node.url);
        var emoji = getEmoji(getShortURL(node.url));
        if (emoji) {
          dialog_e.dialog("option", "title", "Current emoji :  " + emoji);
        } else {
          dialog_e.dialog("option", "title", "Emoji for " + node.title);
        }
        dialog_e.dialog("open");
      });
    } else if (action == "Copy") {
      navigator.clipboard.writeText(node.url);
    } else if (action == "Manage") {
      chrome.tabs.create({ url: "chrome://bookmarks/" });
    }
    _bkmks_panel_menu_js__WEBPACK_IMPORTED_MODULE_1__["toggleBkmksMenuOff"]();
  }
}

//-------------------------------------------------
// context menu for folders
//-------------------------------------------------
document.addEventListener("click", function(e) {
  var link = _bkmks_panel_menu_common_js__WEBPACK_IMPORTED_MODULE_0__["clickInsideElement"](e, "bkmks_f_context_menu_link");
  if (link) {
    e.preventDefault();
    menuFolderListener(link, e);
  } else {
    var button = e.which || e.button;
    if (button === 1) {
      _bkmks_panel_menu_f_js__WEBPACK_IMPORTED_MODULE_2__["toggleBkmksFolderMenuOff"]();
    }
  }
});

function menuFolderListener(link, e) {
  var action = link.getAttribute("data-action");
  var folder = _bkmks_panel_menu_common_js__WEBPACK_IMPORTED_MODULE_0__["bkmkFolderInContext"];
  currentSrc = folder.getAttribute("managed_f");
  chrome.bookmarks.get(currentSrc, function(node) {
    processFMenuAction(action, node[0]);
  });

  function processFMenuAction(action, node) {
    if (action == "Manage") {
      chrome.tabs.create({ url: "chrome://bookmarks/" });
    }
    if (action == "Delete") {
      if (node.title == _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["BKMKS_ARCHIVE"] && node.parentId == "2") {
        _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["displayInfoBox"](
          _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["BKMKS_ARCHIVE"] + " Cannot delete",
          _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["BKMKS_ERROR"]
        );
        return;
      }
      if (node.title == _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["BKMKS_WASTE"] && node.parentId == "2") {
        _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["displayInfoBox"](_bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["BKMKS_WASTE"] + " Cannot delete", _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["BKMKS_ERROR"]);
        return;
      }
      chrome.bookmarks.getChildren(node.id, function(cldrn) {
        if (cldrn.length > 0) {
          _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["displayInfoBox"](
            "Folder Not Empty: cannot delete",
            _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["BKMKS_ERROR"]
          );
        } else {
          if (currentFolderId == node.id && singleFolderNav) {
            currentFolderId = "";
            setOpenedFolders([]);
          }
          chrome.bookmarks.remove(node.id, function(v) {
            chrome.bookmarks.getTree(function(bkmksTree) {
              updateTree(bkmksTree, true);
              _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["displayInfoBox"]("Folder deleted", _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["BKMKS_INFO"]);
            });
          });
        }
      });
    }
    if (action == "New Folder") {
      let prms = new Promise((resolve, reject) => {
        buildEmojiBkmksPanel(resolve, reject);
      });
      prms.then(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          clearFilter();
          currentSrc = "";
          document.getElementById("bkmks_edit_url").hidden = true;
          document.getElementById("bkmk_dialog_mode").value = "folder";
          document.getElementById("bkmk_name").value = "";
          document.getElementById("bkmk_emoji").value = "";
          document.getElementById("bkmk_em_search").value = "";
          document.getElementById("bkmk_folder").value = node.id;
          chrome.bookmarks.getTree(function(bkmksTree) {
            listFolders(bkmksTree, -1, null, true);
            buildSelect(node.id, "bkmk_folder");
            dialog_f.dialog("option", "title", "New Folder");
            dialog_f.dialog("open");
          });
        });
      });
    }
    if (action == "Empty") {
      let prms = new Promise((resolve, reject) => {
        emptyFolder(node, resolve, reject);
      });
      prms.then((m) => {
        if (m) {
          removeFromOpenedFolders(node.id);
          chrome.bookmarks.getTree(function(bkmksTree) {
            _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["displayInfoBox"](m, _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["BKMKS_INFO"]);
            updateTree(bkmksTree, true);
          });
        }
      });
    }
    if (action == "Emoji...") {
      let prms = new Promise((resolve, reject) => {
        buildEmojiDialog(resolve, reject);
      });
      prms.then(() => {
        document.getElementById("bkmk_emoji_node").value = node.id;
        var temp = getFolderURL(node.id);
        document.getElementById("bkmk_emoji_id").value = temp;
        var emoji = getEmoji(getFolderURL(node.id));
        if (emoji) {
          dialog_e.dialog("option", "title", "Current emoji : " + emoji);
        } else {
          dialog_e.dialog("option", "title", "Emoji for " + node.title);
        }

        dialog_e.dialog("open");
      });
    }

    if (action == "Edit...") {
      let prms = new Promise((resolve, reject) => {
        buildEmojiBkmksPanel(resolve, reject);
      });
      prms.then(() => {
        if (node.title == _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["BKMKS_ARCHIVE"] && node.parentId == "2") {
          _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["displayInfoBox"](
            _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["BKMKS_ARCHIVE"] + " Cannot modify",
            _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["BKMKS_ERROR"]
          );
          return;
        }
        document.getElementById("bkmks_edit_url").hidden = true;
        document.getElementById("bkmk_name").value = node.title;
        document.getElementById("bkmk_dialog_mode").value = "folder";
        var emoji = getEmoji(getFolderURL(node.id));
        if (emoji) {
          document.getElementById("bkmk_emoji").value = emoji;
        }
        document.getElementById("bkmk_parent").value = node.parentId;
        chrome.bookmarks.getTree(function(bkmksTree) {
          listFolders(bkmksTree, -1, node.id, true);
          buildSelect(node.parentId, "bkmk_folder");
          dialog_f.dialog("open");
        });
      });
    }
    _bkmks_panel_menu_f_js__WEBPACK_IMPORTED_MODULE_2__["toggleBkmksFolderMenuOff"]();
  }
}

//-------------------------------------------------
// list of folders for drop down
// ------------------------------------------------
function listFolders(parent, level, ff_me, folder_mode) {
  if (level == -1) {
    foldersDropDownTree = [];
    level = 0;
  } else {
    level = level + 1;
  }
  var prefix = "";
  for (var x = 0; x < level; x++) {
    if (x == 0) {
    } else {
      prefix = prefix + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }
  }
  if (parent.constructor.name == "Array") {
    for (var i = 0; i < parent.length; i++) {
      var node = parent[i];
      if (node.children) {
        var t = getEmoji(getFolderURL(node.id));
        var title = node.title.substring(0, 20);
        if (!t) {
          title = "📂" + " " + node.title;
        } else {
          title = "📂" + t + " " + node.title;
        }
        if (folder_mode) {
          if (
            ff_me != node.id &&
            node.id != _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["wasteFld"] &&
            node.id != _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["archiveFld"]
          ) {
            if (node.id > 0) {
              foldersDropDownTree.push([node.id, prefix + title]);
            }
            listFolders(node.children, level, ff_me, folder_mode);
          }
        } else {
          if (node.id > 0) {
            foldersDropDownTree.push([node.id, prefix + title]);
          }
          listFolders(node.children, level, ff_me, folder_mode);
        }
      }
    }
  }
}

//-------------------------------------------------
// folders list for a dropdrop down box - options
//-------------------------------------------------
function buildSelect(parentid, item) {
  var select = $("#" + item);
  select.empty();
  var option;
  for (var i = 0; i < foldersDropDownTree.length; i++) {
    var val = foldersDropDownTree[i];
    option = $('<option value="' + val[0] + '">' + val[1] + "</option>");
    if (val[0] == parentid) {
      option.attr("selected", "selected");
    }
    select.append(option);
  }
}

//-------------------------------------------------
// pick emoji dialog
// ------------------------------------------------
var dialog_e = $("#bkmks_dialog_emoji").dialog({
  autoOpen: false,
  modal: true,
  closeOnEscape: true,
  dialogClass: "bkmks_dialog",
  width: 400,
  buttons: {
    "Remove emoji": function() {
      var id = document.getElementById("bkmk_emoji_node").value;
      var emoji_id = document.getElementById("bkmk_emoji_id").value;
      delete myEms[emoji_id];
      var p2 = new Promise((resolve, reject) => {
        saveEmojies(emoji_id, "", resolve, reject);
      });
      p2.then((t) => {
        dialog_e.dialog("close");
        chrome.bookmarks.getTree(function(bkmksTree) {
          updateTree(bkmksTree);
        });
      });
    },
    Cancel: function() {
      dialog_e.dialog("close");
    },
  },
  close: function() {
    form_e[0].reset();
  },
});

//-------------------------------------------------
// edit emoji form - submit
// ------------------------------------------------
var form_e = dialog_e.find("form").on("submit", function(event) {
  event.preventDefault();
  var id = document.getElementById("bkmk_emoji_node").value;
  var em = document.getElementById("bkmk_emoji_selected").value.trim();
  var emoji_id = document.getElementById("bkmk_emoji_id").value;

  if (em) {
    myEms[emoji_id] = em;
  }
  var p2 = new Promise((resolve, reject) => {
    saveEmojies(emoji_id, em, resolve, reject);
  });
  p2.then((t) => {
    dialog_e.dialog("close");
    chrome.bookmarks.getTree(function(bkmksTree) {
      updateTree(bkmksTree);
    });
  });
});

//-------------------------------------------------
// edit dialog for folder
// -----------------------------------------------
var dialog_f = $("#bkmks_dialog_form").dialog({
  autoOpen: false,
  modal: true,
  closeOnEscape: true,
  dialogClass: "bkmks_dialog",
  width: 400,
  buttons: {
    "Remove emoji": function() {
      var v = document.getElementById("bkmk_emoji");
      v.value = "";
    },
    Cancel: function() {
      document.getElementById("bkmrk_all").innerHTML = "";
      dialog_f.dialog("close");
    },
    Submit: function() {
      dialog_f.find("form").submit();
    },
  },
  close: function() {
    form_f[0].reset();
  },
});

//-------------------------------------------------
// edit dialog - submit
// ------------------------------------------------
var form_f = dialog_f.find("form").on("submit", function(event) {
  event.preventDefault();
  var mode = document.getElementById("bkmk_dialog_mode").value;
  if (mode == "folder") {
    // folder mode
    return processFolderDialog(event);
  } else {
    return processBkmksDialog(event);
  }
});

//--------------------------------------------------
// submit in bookmark mode
//--------------------------------------------------
function processBkmksDialog(event) {
  var url = document.getElementById("bkmk_url").value;
  var name = document.getElementById("bkmk_name").value;
  var origParent = document.getElementById("bkmk_parent").value;
  var parent = document.getElementById("bkmk_folder").value;
  if (!url) {
    document.getElementById("bkmrk_all").innerHTML = "URL is required.";
    document.getElementById("bkmk_url").focus();
    return false;
  }
  if (!name) {
    document.getElementById("bkmrk_all").innerHTML = "Name is required.";
    document.getElementById("bkmk_name").focus();
    return false;
  }

  var name = document.getElementById("bkmk_name").value;
  if (name) {
    name = name.trim();
  }

  var em = document.getElementById("bkmk_emoji").value.trim();
  if (em) {
    var ret = isEmoji(em);
    if (ret == false) {
      document.getElementById("bkmrk_all").innerHTML = "Emoji not valid.";
      return false;
    }
  }

  document.getElementById("bkmrk_all").innerHTML = "";
  var changes = {
    url: document.getElementById("bkmk_url").value,
    title: name,
  };
  setOpenedFolders([]);
  addToOpenedFolders(parent);

  if (currentSrc && origParent) {
    //we are saving existing bookmark
    var shortURL = getShortURL(document.getElementById("bkmk_url").value);
    if (em) {
      myEms[shortURL] = em;
    } else {
      delete myEms[shortURL];
    }
    var p2 = new Promise((resolve, reject) => {
      saveEmojies(shortURL, em, resolve, reject);
    });
    p2.then((t) => {
      chrome.bookmarks.update(currentSrc, changes, function(v) {
        if (origParent != parent) {
          chrome.bookmarks.move(
            currentSrc,
            {
              parentId: parent,
            },
            function(v) {
              chrome.bookmarks.getTree(function(bkmksTree) {
                updateTree(bkmksTree);
              });
            }
          );
        } else {
          chrome.bookmarks.getTree(function(bkmksTree) {
            updateTree(bkmksTree);
          });
        }
      });
    });
  }
  dialog_f.dialog("close");
}

//--------------------------------------------------
// submit in folder mode
//--------------------------------------------------
function processFolderDialog(event) {
  var name = document.getElementById("bkmk_name").value;
  var em = document.getElementById("bkmk_emoji").value.trim();
  var origParent = document.getElementById("bkmk_parent").value;
  if (name) {
    name = name.trim();
  }
  if (em) {
    var ret = isEmoji(em);
    if (ret == false) {
      document.getElementById("bkmrk_all").innerHTML = "Emoji not valid.";
      return false;
    }
  }
  document.getElementById("bkmrk_all").innerHTML = "";
  var parent = document.getElementById("bkmk_folder").value;
  if (currentSrc) {
    addToOpenedFolders(currentSrc);
    if (singleFolderNav) {
      currentFolderId = currentSrc;
    }
    var p2 = new Promise((resolve, reject) => {
      saveEmojies(getFolderURL(currentSrc), em, resolve, reject);
    });
    p2.then((t) => {
      chrome.bookmarks.update(
        currentSrc,
        {
          title: name,
          url: "",
        },
        function(v) {
          if (origParent != parent) {
            chrome.bookmarks.move(
              currentSrc,
              {
                parentId: parent,
              },
              function(v) {
                chrome.bookmarks.getTree(function(bkmksTree) {
                  allPrFolders = populateCurrentParentsTree(bkmksTree);
                  myEms[getFolderURL(currentSrc)] = em;
                  updateTree(bkmksTree, true);
                });
              }
            );
          } else {
            chrome.bookmarks.getTree(function(bkmksTree) {
              allPrFolders = populateCurrentParentsTree(bkmksTree);
              myEms[getFolderURL(currentSrc)] = em;
              updateTree(bkmksTree, true);
            });
          }
        }
      );
    });
  } else {
    // new folder
    chrome.bookmarks.create({ parentId: parent, title: name }, function(e) {
      addToOpenedFolders(e.id);
      if (singleFolderNav) {
        currentFolderId = e.id;
      }
      if (em) {
        chrome.bookmarks.getTree(function(bkmksTree) {
          allPrFolders = populateCurrentParentsTree(bkmksTree);
          myEms[getFolderURL(e.id)] = em;
          var p2 = new Promise((resolve, reject) => {
            saveEmojies(getFolderURL(e.id), em, resolve, reject);
          });
          chrome.bookmarks.getTree(function(bkmksTree) {
            updateTree(bkmksTree, true);
          });
        });
      } else {
        chrome.bookmarks.getTree(function(bkmksTree) {
          updateTree(bkmksTree, true);
        });
      }
    });
  }
  dialog_f.dialog("close");
}

// ------------------------------------------------
// empty space in single folder view
//-------------------------------------------------
var main = document.getElementById("bkmks_panel_main_body");
if (!main) {
  main = document.getElementById("bkmks_main_body");
}
main.onclick = function(e) {
  _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["clearMultiSelect"]();
  _bkmks_panel_menu_common_js__WEBPACK_IMPORTED_MODULE_0__["setMultiSelectParent"]("");
  selectorAnc = "";
};

main.ondrop = function(ev) {
  if (singleFolderNav && currentFolderId) {
    var distino = currentFolderId;
    new Promise((resolve, reject) => {
      moveObjToFolder(distino, resolve, reject);
    }).then((ret) => {
      if (ret) {
        chrome.bookmarks.getTree(function(bkmksTree) {
          updateTree(bkmksTree, true);
        });
      }
    });
    event.stopPropagation();
    return true;
  }
};

// ----------------------------------------------------
// Open recycling
//-----------------------------------------------------
document
  .getElementById("bkmks_rec_icon")
  .addEventListener("click", function(ev) {
    changeOpenRec(ev);
    this.blur();
  });

document
  .getElementById("bkmks_rec_icon")
  .addEventListener("drop", function(event) {
    var distino = _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["wasteFld"];
    if (!validateDragToEvent(distino)) {
      event.stopPropagation();
      event.preventDefault();
      return true;
    }
    var count = objecto.length;
    new Promise((resolve, reject) => {
      moveObjToFolder(distino, resolve, reject);
    }).then((ret) => {
      if (ret) {
        chrome.bookmarks.getTree(function(bkmksTree) {
          updateTree(bkmksTree, true);
          _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["displayInfoBox"]("Deleted " + count + ".", _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["BKMKS_INFO"]);
        });
      }
    });
  });

function changeOpenRec(ev) {
  clearSorts();
  currentFolderId = _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["wasteFld"];
  openedFolderIds = [_bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["wasteFld"]];
  chrome.bookmarks.getTree(function(bkmksTree) {
    updateTree(bkmksTree);
  });
}

// ----------------------------------------------------
// font
//-----------------------------------------------------
document
  .getElementById("bkmks_tt_icon")
  .addEventListener("click", function(ev) {
    changeFont(ev);
    this.blur();
  });

function changeFont(ev) {
  largeIcons = !largeIcons;
  saveOptions();
  document.body.style.fontSize = largeIcons ? "120%" : "85%";
}

//-------------------------------------------------
// search
//-------------------------------------------------
document
  .getElementById("bkmks_search_icon")
  .addEventListener("click", function(ev) {
    toggleSearch(ev);
    this.blur();
  });

//----------------------------------------------------
//search box event
//----------------------------------------------------
function toggleSearch(ev) {
  clearSorts();
  var p = document.getElementById("bkmks_search_box");
  var t = document.getElementById("bkmk_search");
  var icon = document.getElementById("bkmks_search_icon");

  t.value = "";
  filter = "";
  if (p.hidden) {
    icon.classList.add("bkmk_t_icon_pressed");
    p.hidden = false;
    $("html, body").animate({ scrollTop: 0 }, 200);
    setTimeout(function() {
      t.focus();
    }, 1000);
  } else {
    icon.classList.remove("bkmk_t_icon_pressed");
    p.hidden = true;
    filter = "";
    chrome.bookmarks.getTree(function(bkmksTree) {
      updateTree(bkmksTree);
    });
  }
  document
    .getElementById("bkmk_search")
    .addEventListener("keydown", function(e) {
      if (e.key == "Enter") {
        e.preventDefault();
      } else if (e.key === "Escape") {
        e.preventDefault();
        this.value = "";
        filter = "";
        chrome.bookmarks.getTree(function(bkmksTree) {
          updateTree(bkmksTree);
          $("#bkmks_search_icon").focus();
        });
      }
    });

  document.getElementById("bkmk_search").addEventListener("input", function(e) {
    var v = this.value.trim();
    if (v.length > 2) {
      currentFolderId = "";
      openedFolderIds = [];
      filter = v.toUpperCase();
      chrome.bookmarks.getTree(function(bkmksTree) {
        updateTree(bkmksTree);
      });
    } else if (v.length == 0) {
      filter = "";
      chrome.bookmarks.getTree(function(bkmksTree) {
        updateTree(bkmksTree);
      });
    }

    e.preventDefault();
  });
}

//-------------------------------------------------
// creating new folder
//-------------------------------------------------
document
  .getElementById("bkmks_wd_icon")
  .addEventListener("click", function(ev) {
    darkModeSwitch(ev);
    this.blur();
  });

function darkModeSwitch(ev) {
  darkMode = !darkMode;
  saveOptions();
  setColorMode();
}

//-------------------------------------------------
// sort by name
//-------------------------------------------------
document
  .getElementById("bkmks_sort_options_icon")
  .addEventListener("click", function(ev) {
    toggleSortByName(ev);
    this.blur();
  });

function toggleSortByName(ev) {
  clearFilter();
  clearSorts();
  sortByName = !sortByName;
  chrome.bookmarks.getTree(function(bkmksTree) {
    updateTree(bkmksTree, true);
  });
}

//-------------------------------------------------
// sort by visit
//-------------------------------------------------
document
  .getElementById("bkmks_sort_visits_options_icon")
  .addEventListener("click", function(ev) {
    sortByVisitsToggle(ev);
    this.blur();
  });

document
  .getElementById("bkmks_sort_visits_options_icon")
  .addEventListener("keydown", function(ev) {
    sortByVisitsToggle(ev);
    this.blur();
  });

function sortByVisitsToggle(ev) {
  clearFilter();
  sortByVisits = !sortByVisits;
  sortByName = false;
  includeCounters = sortByVisits;
  chrome.bookmarks.getTree(function(bkmksTree) {
    updateTree(bkmksTree, true);
  });
}

//-------------------------------------------------
// archive
//-------------------------------------------------
document
  .getElementById("bkmks_archive_icon")
  .addEventListener("click", function(ev) {
    archiveBkmks(ev);
    this.blur();
  });

document
  .getElementById("bkmks_archive_icon")
  .addEventListener("keydown", function(ev) {
    archiveBkmks(ev);
    this.blur();
  });

var dialog_ar = $("#bkmks_dialog_form_ar").dialog({
  autoOpen: false,
  modal: true,
  closeOnEscape: true,
  dialogClass: "bkmks_dialog",
  width: 400,
  buttons: {
    Cancel: function() {
      dialog_ar.dialog("close");
    },
    Submit: function() {
      dialog_ar.find("form").submit();
      dialog_ar.dialog("close");
    },
  },
});

dialog_ar.find("form").on("submit", function(event) {
  document.getElementById("bkmks_loader").hidden = false;
  event.preventDefault();
  event.stopPropagation();
  var id = "";
  chrome.bookmarks.search(
    {
      title: _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["BKMKS_ARCHIVE"],
    },
    function(res) {
      if (res[0]) {
        if (res[0].parentId == 2) {
          id = res[0].id;
        }
      }
      if (!id) {
        chrome.bookmarks.create(
          {
            parentId: "2",
            index: 0,
            title: _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["BKMKS_ARCHIVE"],
          },
          function(e) {
            id = e.id;
            _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["setArchiveFld"](id);
            createArchive(id);
          }
        );
      } else {
        createArchive(id);
      }
    }
  );

  function createArchive(id) {
    setOpenedFolders([]);
    addToOpenedFolders(id);
    chrome.bookmarks.getTree(function(bkmksTree) {
      let prms = new Promise((resolve, reject) => {
        var r = getAllNodes(bkmksTree, true)[1];
        getHistory(r, resolve, reject);
      });
      prms.then((visits) => {
        var lengthOfVisits = Object.keys(siteVisits).length;
        var ctr = 0;
        var proc = 0;
        Object.keys(siteVisits).forEach(function(i) {
          ctr++;
          if (siteVisits[i].n_visits == 0) {
            proc++;
            chrome.bookmarks.move(i, {
              parentId: id,
            });
          }
          if (ctr == lengthOfVisits) {
            chrome.bookmarks.getTree(function(bkmksTree) {
              if (singleFolderNav) currentFolderId = id;
              updateTree(bkmksTree, true);
              _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["displayInfoBox"](proc + " bookmarks processed", _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["BKMKS_INFO"]);
            });
          }
        });
      });
    });
  }
});

function archiveBkmks(ev) {
  clearSorts();
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    dialog_ar.dialog("open");
  });
}

//-------------------------------------------------
// tree view
//-------------------------------------------------
document
  .getElementById("bkmks_tree_icon")
  .addEventListener("click", function(ev) {
    toggleTreeView(ev);
    this.blur();
  });

document
  .getElementById("bkmks_tree_icon")
  .addEventListener("keydown", function(ev) {
    toggleTreeView(ev);
    this.blur();
  });

function toggleTreeView(ev) {
  clearFilter();
  singleFolderNav = !singleFolderNav;
  currentFolderId = singleFolderNav ? "0" : "";
  clearSorts();
  openedFolderIds = [];
  chrome.bookmarks.getTree(function(bkmksTree) {
    updateTree(bkmksTree, true);
  });
}

//-------------------------------------------------
// folders view
//-------------------------------------------------
document
  .getElementById("bkmks_text_icon")
  .addEventListener("click", function(ev) {
    toggleTextView(ev);
    this.blur();
  });

function toggleTextView(ev) {
  clearFilter();
  includeText = !includeText;
  clearSorts();
  chrome.bookmarks.getTree(function(bkmksTree) {
    updateTree(bkmksTree);
    var br = document.getElementById("bkmk_resizable");
    if (br) br.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function createStandAlongFolder(node, lenChildren) {
  // DISPLAYING FOLDERS
  var emoji = getEmoji(getFolderURL(node.id));
  var newText = node.title;
  if (node.id == 0) newText = "All Bookmarks";
  // START NEW FOLDER
  var d1 = $(
    "<div class = 'bkmks_ff_div bkmks_folder_title' tabindex='1' managed_f='" +
      node.id +
      "' parentId='" +
      node.parentId +
      "' name = '" +
      node.title +
      "'id='bkmks_ff_div_" +
      node.id +
      "' />"
  );
  if (node.id < 3) {
    d1.addClass("bkmks_root_folder");
  }
  var h6 = $("<div />");
  if (!emoji) {
    //DISPLAYING DEFAULT FOLDER
    var im = "f2.png";
    if (node.id == 0) {
      im = "f8.png";
    } else if (node.id < 3) {
      im = "f7.png";
    } else if (node.id == _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["wasteFld"] && lenChildren > 0) {
      im = "rec1.png";
    } else if (node.id == _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["wasteFld"]) {
      im = "rec.png";
    }
    var f_icon = $(
      '<img class="bkmk_folder_icon" id="ff_img_' +
        node.id +
        '" parentId="' +
        node.parentId +
        '" managed_f="' +
        node.id +
        '" src="images/' +
        im +
        '">'
    );
    if (node.id < 3) {
      f_icon.addClass("bkmks_root_folder");
    }
    if (largeIcons) {
      f_icon.addClass("bkmk_icon_large");
    }
  } else {
    //THIS IS EMOJI SITUATION
    var f_icon = $(
      '<div class="bkmk_folder_icon" draggable="true" id="ff_img_' +
        node.id +
        "' parentId='" +
        node.parentId +
        '" managed_f="' +
        node.id +
        '">'
    );
    f_icon.append(emoji);
  }
  return [f_icon, h6, d1, newText];
}

// creates folder with icon or emoji and tooltip
function createFolder(node, prefix, lenChildren) {
  prefix = prefix ? prefix : "";
  // DISPLAYING FOLDERS
  var emoji = getEmoji(getFolderURL(node.id));
  var newText = node.title;
  if (!newText) {
    newText = "";
  }
  // START NEW FOLDER
  var d1 = $("<div class ='d1' style='display: inline'/>");
  if (
    node.id > 2 &&
    (!singleFolderNav || (singleFolderNav && currentFolderId != node.id))
  ) {
    //separator for dropping in
    var dsep = $(
      "<div class='bkmks_f_separator' managed_f='" +
        node.parentId +
        "' index = '" +
        node.index +
        "'/>"
    );
    setupSeparator(dsep);
    d1.append(dsep);
  }
  setupHeader(d1);
  var title_bar = $(
    "<div class='bkmks_folder_title bkmks_tree_folder' managed_f='" +
      node.id +
      "' parentId = '" +
      node.parentId +
      "' name = '" +
      node.title +
      "'/>"
  );
  var h6 = $("<div />");
  if (!emoji) {
    //DISPLAYING DEFAULT FOLDER
    var temp_img = "f2";
    if (node.id < 3) {
      temp_img = "f7";
    }
    if (node.id == 0) {
      temp_img = "f8";
    }
    if (node.id == _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["wasteFld"] && node.children.length > 0) {
      temp_img = "rec1";
      if (darkMode) temp_img = "rec1_dark";
    } else if (node.id == _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["wasteFld"]) {
      temp_img = "rec";
      if (darkMode) temp_img = "rec_dark";
    }
    var f_icon = $(
      '<img class="bkmk_folder_icon" id="' +
        prefix +
        "img_" +
        node.id +
        '" parentId = "' +
        node.parentId +
        '" managed_f="' +
        node.id +
        '" src="images/' +
        temp_img +
        '.png">'
    );
    if (largeIcons) {
      f_icon.addClass("bkmk_icon_large");
    }
  } else {
    //THIS IS EMOJI SITUATION
    var f_icon = $(
      '<div class="bkmk_f_icon_emoji" draggable="true" id="' +
        prefix +
        "img_" +
        node.id +
        '" parentId = "' +
        node.parentId +
        '" managed_f="' +
        node.id +
        '">'
    );
    f_icon.append(emoji);
  }
  if (node.id == 0) newText = "All Bookmarks";
  return [f_icon, h6, title_bar, d1, newText];
}

function isEmoji(em) {
  if (!em) return false;
  var em = em.trim();
  if (allEmojis.indexOf(em) < 0 && _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["BKMKS_SPEC"].indexOf(em) < 0) return false;
  return true;
}

function getEmoji(em_id) {
  if (em_id == "bkmks_arch") return _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["BKMKS_ARCHIVE_EM"];
  return myEms[em_id];
}

//-----------------------------------------------------------
// TOP Breadcrumbs BAR
// ----------------------------------------------------------
function creteBreadcrumbs(bkmksTree) {
  var path = [];
  [].forEach.call(allPrFolders[currentFolderId], function(el) {
    path.push(el[0]);
  });
  if (!path) path = [];
  var d = $("<ul id='bkmks_breadcrumb_bar_body' class = 'bkmks_breadcrumb' />");
  for (var i = 0; i < path.length; i++) {
    var node = getSingleNode(path[i], bkmksTree)[0];
    const [f_icon, h6, d1, newText] = createStandAlongFolder(node);
    f_icon.className = "";
    f_icon.attr("id", "brd_" + f_icon.attr("id"));
    if (node.id == _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["wasteFld"]) {
      f_icon.attr("src", getIcon("bkmks_rec_icon_w"));
    }
    d1.removeClass();
    d1.addClass("bkmks_breadcrumb_link");
    setupBreadcrumb(node, d1);
    d1.append(f_icon);
    d1.attr("managed_f", node.id);
    d1.append(newText.substring(0, 20));
    d1.attr("id", "bkmks_bread_div_" + node.id);
    var li = $("<li/>");
    var a = $("<a href='#'>");
    a.append(d1);
    li.append(a);
    d.append(li);
  }
  return d;
}

function setupBreadcrumb(node, d1) {
  d1.click(function(ev) {
    wasPressed(ev);
    this.blur();
  });

  function wasPressed(ev) {
    setOpenedFolders([]);
    addToOpenedFolders(node.id);
    currentFolderId = node.id;
    //get folder to display
    chrome.bookmarks.getTree(function(bkmksTree) {
      updateTree(bkmksTree);
    });
  }
}

// function readJson(file, callback) {
//   var xx = "";
//   var rawFile = new XMLHttpRequest();

//   rawFile.overrideMimeType("application/json");
//   rawFile.open("GET", chrome.extension.getURL("my.json"));
//   rawFile.onreadystatechange = function() {
//     if (rawFile.readyState === 4 && rawFile.status == "200") {
//       console.log("are you working?");
//       var v = rawFile.responseText;
//       var obj = JSON.parse(v)["emojis"];
//       for (var i = 0; i < obj.length; i++) {
//         var x = obj[i];
//         xx +=
//           '<div class="bkmks_em" text="' +
//           x.name +
//           '">' +
//           x["emoji"] +
//           "</div>";
//       }
//       console.log(xx);
//       callback(rawFile.responseText);
//     }
//   };

//   rawFile.send(null);
// }

// //usage:
// readJson("/Users/Documents/workspace/test.json", function(text) {
//   var data = JSON.parse(text);
//   // var obj = JSON.parse(data);
//   // console.log("data", obj);
//   // for (var key in obj) {
//   //   if (obj.hasOwnProperty(key)) {
//   //     console.log(key + " -> " + obj[key]);
//   //   }
//   // }
// });

//--------------------------------------------
// refresh main tree view and folder view
//--------------------------------------------
async function updateTree(bkmksTree) {
  document.getElementById("bkmks_loader").hidden = false;
  _bkmks_panel_menu_common_js__WEBPACK_IMPORTED_MODULE_0__["setMultiSelectParent"]("");
  selectorAnc = "";
  document.getElementById("bkmks_bookmarks").innerHTML = "";
  document.getElementById("bkmks_folders_only").innerHTML = "";
  document.getElementById("bkmks_breadcrumb_bar").innerHTML = "";
  allPrFolders = populateCurrentParentsTree(bkmksTree);
  if (!_bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["wasteFld"]) {
    chrome.bookmarks.create(
      {
        index: 0,
        parentId: "2",
        title: _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["BKMKS_WASTE"],
      },
      function(e) {
        _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["setWasteFld"](e.id);
      }
    );
  }
  // all children is used to properly close all children if folder closes,
  //also, to prevent folder to be moved to a child
  allChFolders = {};
  getChildrenNodes(bkmksTree[0]);
  if (
    singleFolderNav &&
    (!currentFolderId || currentFolderId == 0) &&
    filter.length == 0
  ) {
    currentFolderId = singleFolderNav ? "0" : "1";
  }

  if (!allPrFolders[currentFolderId]) {
    currentFolderId = 0;
  }

  var xtree = bkmksTree;

  if (currentFolderId && filter == "" && currentFolderId != 0) {
    var prms1 = new Promise((resolve, reject) => {
      getCurrentFolder(currentFolderId, resolve, reject);
    });
    prms1.then((xtree) => {
      displayCurrentFolder(xtree);
    });
  } else {
    displayCurrentFolder(xtree);
  }

  function displayCurrentFolder(xtree) {
    var prms = new Promise((resolve, reject) => {
      sortTree(xtree, resolve, reject);
    });

    prms.then(async (visits) => {
      //add nodes for visible folders
      var prnts = getFoldersToOpen();
      var d = null;
      if (!currentFolderId && !singleFolderNav) {
        d = $("<div/>");
      }

      // MAIN PROCESSING OF NODES WITH IMAGES
      var ev = processNodes(prnts, xtree, d, true);
      $("#bkmks_bookmarks").append(ev);
      highlightSelectedFolder();
      highlightSelectedOptions(bkmksTree);
      if (includeCounters) {
        var prms = new Promise((resolve, reject) => {
          displayCounters(xtree, resolve, reject);
        });
        prms.then(() => {
          closeFolders(prnts);
        });
      } else {
        closeFolders(prnts);
      }

      // TOP NAVIGATION BAR
      if (singleFolderNav) {
        var folders = creteBreadcrumbs(bkmksTree);
        $("#bkmks_breadcrumb_bar").append(folders);
        document.getElementById("bkmks_breadcrumb_bar").hidden = false;
        // ALL FOLDERS FOR TOP PANEL
        $("#bkmks_folders_only").append(createFolderPanel(bkmksTree));
      } else {
        document.getElementById("bkmks_breadcrumb_bar").hidden = true;
      }
      saveOptions();
      document.getElementById("bkmks_loader").hidden = true;
    });
  }
}
//--------------------------------------------------
// remove emojis from absolite bookmars and folders
// at the moment binding this function to open edit dialog for bkmks
//---------------------------------------------------
function cleanUpEmojis(bkmksTree) {
  //clean up emojies
  var A = getAllNodeEmIDs(bkmksTree)[1];
  var B = Object.keys(myEms);
  var C = B.filter((n) => !A.includes(n));
  for (var i = 0; i < C.length; i++) {
    var toDel = C[i];
    delete myEms[C[i]];
    var p2 = new Promise((resolve, reject) => {
      saveEmojies(toDel, "", resolve, reject);
    });
    p2.then((t) => {});
  }
}

//-------------------------------------------------
// top folder panel
// ------------------------------------------------
function createFolderPanel(parent, d) {
  if (d == null) var d = $("<div style='display: flex;  flex-wrap: wrap;'/>");
  // must be array, if not nothing to add
  if (parent.constructor.name == "Array") {
    for (var i = 0; i < parent.length; i++) {
      var node = parent[i];
      if (node.children) {
        if (node.id != 0) {
          var lenCh = false;
          if (node.children.length > 0) lenCh = true;
          const [f_icon, h6, d1, newText] = createStandAlongFolder(node, lenCh);
          h6.attr("managed_f", node.id);
          f_icon.attr("data-toggle", "tooltip");
          f_icon.attr("title", newText);
          setupFFolder(node, d1);
          h6.append(f_icon);
          d1.append(h6);
          if (node.id == 2) {
            //insert a break
            var brk = $("<div style='flex-basis: 100%;  height: 0;'/>");
            d.append(brk);
          }
          d.append(d1);
        }
        createFolderPanel(node.children, d);
      }
    }
  }
  return d;
}
//-------------------------------------------------
// top folder panel - continued
// ------------------------------------------------
function setupFFolder(node, d1) {
  d1.click(function() {
    // deal with highlights first
    var elems = document.querySelectorAll(".bkmks_ff_div");
    [].forEach.call(elems, function(el) {
      el.classList.remove("bkmks_folder_active");
    });
    var d = document.getElementById("bkmks_ff_div_" + node.id);
    d.classList.add("bkmks_folder_active");
    //get folder to display
    currentFolderId = node.id;
    chrome.bookmarks.getTree(function(bkmksTree) {
      updateTree(bkmksTree);
    });
  });
  d1[0].ondragstart = function(event) {
    event.stopPropagation();
    event.preventDefault();
    return true;
  };
  d1[0].ondrop = function(event) {
    var distino = this.getAttribute("managed_f");
    if (!validateDragToEvent(distino)) {
      event.stopPropagation();
      event.preventDefault();
      return true;
    }
    new Promise((resolve, reject) => {
      moveObjToFolder(distino, resolve, reject);
    }).then((ret) => {
      if (ret) {
        chrome.bookmarks.getTree(function(bkmksTree) {
          updateTree(bkmksTree, true);
        });
      }
    });
    event.stopPropagation();
    return true;
  };
  d1[0].ondragover = function(event) {
    event.stopPropagation();
    event.preventDefault();
  };
}

//----------------------------------------------------------------
// MAIN TREE DISPLAY FN
//----------------------------------------------------------------
function processNodes(prnts, parent, d, displayFirstFolder) {
  var root = d == null ? true : false;
  if (root) {
    d = $("<div/>");
  }
  // must be array, if not nothing to add
  if (parent.constructor.name == "Array") {
    for (var i = 0; i < parent.length; i++) {
      var node = parent[i];
      if (node.children) {
        // THIS IS A FOLDER WITH CHILDREN
        displayFirstFolder = false;
        const [f_icon, h6, title_bar, d1, newText] = createFolder(node);
        setupHeader(h6);
        setupFolderIcon(f_icon);
        if (node.id > 0) {
          var small_im1 =
            '<div id="s_img1_' +
            node.id +
            '"  class="bkmks_sm_img1" hidden="true">';
          h6.append(small_im1);
          var small_im2 =
            '<div id="s_img2_' +
            node.id +
            '"  class="bkmks_sm_img2" hidden="true">';
          h6.append(small_im2);
        }
        h6.append(f_icon);
        h6.attr("managed_f", node.id);
        h6.append(newText.substring(0, 20));
        f_icon.attr("data-toggle", "tooltip");
        f_icon.attr("title", newText);
        setupTitleBar(title_bar);
        title_bar.append(h6);
        d1.append(title_bar);
        var children_panel = $("<div/>");
        children_panel.attr("class", "bkmks_icon_bar_w_fldrs");
        children_panel.addClass("bkmks_icon_bar");
        children_panel.attr("id", node.id);
        children_panel.attr("managed_f", node.id);
        setupChildrenPanel(children_panel);
        if (
          filter.length != 0 &&
          node.title.toUpperCase().indexOf(filter) > -1
        ) {
          //ADDING FILTERED FOLDERS
          d.append(processNodes(prnts, node.children, d));
          d.append(d1);
        } else if (filter.length == 0) {
          // NO FILTERS, ADDING FOLDERS

          if (
            currentFolderId == node.id ||
            openedFolderIds.indexOf(node.id) > -1 ||
            filter
          ) {
            d1.append(processNodes(prnts, node.children, children_panel));
          }
          d.append(d1);
        } else {
          // FILTER, BUT SKIPPING THIS FOLDER
          d.append(processNodes(prnts, node.children, d));
        }
      } else {
        // SINGLE BKMK
        if (
          singleFolderNav &&
          node.parentId != currentFolderId &&
          filter.length == 0
        ) {
          // not adding, single folder and it is not it
        } else {
          // check if this folder is opened, only in this case add bkmks
          if (
            currentFolderId == node.parentId ||
            openedFolderIds.indexOf(node.parentId) > -1 ||
            filter
          ) {
            var wrapper = getBkmkWIcon(
              node,
              largeIcons,
              currentFolderId,
              prnts
            );
            if (wrapper) {
              d.append(wrapper);
            }
          }
        }
      }
    }
  }
  return d;
}

//-----------------------------------------------
// create icon component
//-----------------------------------------------
function getBkmkWIcon(node, largeIcons, currentFolder, openedFolderIds) {
  var displayText = includeText || filter.length > 0;
  var dispalyIcons = false;
  if (
    currentFolder == node.parentId ||
    openedFolderIds.indexOf(node.parentId) > -1 ||
    filter
  ) {
    dispalyIcons = true;
  }
  if (filter.length > 0 || !node.url) {
    if (
      node.title.toUpperCase().indexOf(filter) < 0 &&
      node.url.toUpperCase().indexOf(filter) < 0
    ) {
      return "";
    }
  }

  var d1 = $(
    '<a class="bkmks_bookmark" draggable="true" target="_parent" id = "' +
      node.id +
      '" parentID ="' +
      node.parentId +
      '" url ="' +
      node.url +
      '">'
  );

  //dates and number filters
  if (displayText) {
    var ctrField = $(
      "<span class = 'bkmks_counter' id='bkmks_cnt_" + node.id + "'/>"
    );
    ctrField.attr("data-toggle", "tooltip");
    ctrField.attr("title", "Numer of times visited");
    d1.append(ctrField);
  }
  if (!includeText && filter.length == 0) {
    d1.addClass("bkmks_icons_only");
  } else {
    d1.addClass("bmks_icons_w_text");
  }

  if (!displayText) {
    d1.addClass("bkmks_wrapper_inline_block");
  } else {
    d1.addClass("icon_wrapper");
  }

  d1.attr("data-toggle", "tooltip");
  if (displayText) {
    d1.attr("title", node.url);
  } else {
    d1.attr("title", node.title + "\n" + node.url);
  }

  //add text
  var emoji = getEmoji(getShortURL(node.url));
  var newText = node.title;

  if (!emoji) {
    //NO EMOJI FOR NODE
    var s = "chrome://favicon/" + node.url;

    var my_icon = new Image();
    if (dispalyIcons) {
      if (images[node.id]) {
        my_icon = images[node.id];
        var v = $("#" + node.id);
      } else {
        if (!includeText) {
          d1.addClass("bkmks_bookmark_bg");
        }
        toLoad[node.id] = s;
        my_icon.onload = function() {
          var v = document.getElementById(node.id);
          if (v) v.style.backgroundImage = "none";
        };
        my_icon.setAttribute("src", s);
        images[node.id] = my_icon;
        my_icon.classList.add("bkmks_icon");
        my_icon.setAttribute("id", "bkmk_img_" + node.id);
      }
      if (largeIcons) {
        my_icon.classList.add("bkmk_icon_large");
      }
    }
  } else {
    // USING EMOJI
    var my_icon = $("<span />");
    my_icon.attr("id", "bkmk_emoji_" + node.id);
    my_icon.append(emoji);
    my_icon.addClass("bkmks_icon");
  }

  setupIcon(d1);
  d1.append(my_icon);

  if (displayText) {
    var text = $("<span class = 'bkmks_icon_text'/>");
    text.append(newText);
    d1.append(text);
    d1.addClass("bkmks_block");
  }

  return d1;
}

//--------------------------------------------------------
// REMOVE PANELS FROM FOLDERS NOT IN USE
//--------------------------------------------------------
function closeFolders(prnts) {
  var all_folders = Object.keys(allPrFolders);
  for (var i = 0; i < all_folders.length; i++) {
    var id = all_folders[i] + "";
    if (id == 0) {
      // root
      continue;
    }
    var closeFolder = prnts.indexOf(id) < 0;
    if (id == currentFolderId) {
      closeFolder = false;
    }
    var e = document.getElementById(id);
    if (e) {
      e.hidden = closeFolder;
    }
    var im = document.getElementById("img_" + id);
    if (im) {
      var i1 = document.getElementById("s_img1_" + id);
      var i2 = document.getElementById("s_img2_" + id);
      if (id == currentFolderId && singleFolderNav) {
        i1.hidden = true;
        i2.hidden = true;
      } else if (closeFolder) {
        i1.hidden = false;
        i2.hidden = true;
      } else {
        i1.hidden = true;
        i2.hidden = false;
      }
    }
  }
}

//---------------------------------------------------------------------
// MAIN SORT FUNCTION
//---------------------------------------------------------------------
function sortTree(x, resolve, reject) {
  if (!x) return resolve(true);
  if (sortByName != true && sortByVisits != true) {
    return resolve(true);
  }
  var r = getAllVisibleNodes(x)[1];

  if (!r) return resolve(true);
  if (r.length == 0) return resolve(true);

  if (sortByName) {
    addSortableName(x);
    sortNodes(x, true);
    return resolve(true);
  } else if (sortByVisits) {
    includeCounters = true;
    let prms = new Promise((resolve, reject) => {
      getHistory(r, resolve, reject);
    });
    prms.then((visits) => {
      addSortableVisits(x);
      sortNodes(x, false);
      return resolve(true);
    });
  }
}

//---------------------------------------------------------
// add xsort by NUMBER OF VISITS
//---------------------------------------------------------
function addSortableVisits(x, visits) {
  for (var i = 0; i < x.length; i++) {
    var node = x[i];
    var newText = node.title;

    newText = newText.toUpperCase();
    newText = newText.trim();
    if (node.children) {
      node["xsort"] = newText;
      addSortableVisits(node.children);
    } else {
      // bkmks node
      var vs = siteVisits[node.id];
      if (!vs) {
        node["xsort"] = "000000" + newText;
      } else {
        node["xsort"] = ("000000" + vs["n_visits"]).substr(-6, 6) + newText;
      }
    }
  }
}

//---------------------------------------------------------
// add xsort by name column
//---------------------------------------------------------
function addSortableName(x) {
  if (x.constructor.name == "Array") {
    for (var i = 0; i < x.length; i++) {
      var node = x[i];
      var newText = "";
      var newText = node.title;
      newText = newText.toUpperCase();
      newText = newText.trim();
      if (node.children) {
        node["xsort"] = "!!!!!!!!!!!!!!!!!!!" + newText;
        if (
          currentFolderId == node.id ||
          openedFolderIds.indexOf(node.id) > -1 ||
          filter
        ) {
          addSortableName(node.children);
        }
      } else {
        node["xsort"] = newText;
      }
    }
  }
}

// ----------------------------------------------------------
// SORTING
//-----------------------------------------------------------
function sortNodes(x, ordr) {
  if (x.constructor.name == "Array") {
    for (var i = 0; i < x.length; i++) {
      var node = x[i];
      if (node.children) {
        if (
          currentFolderId == node.id ||
          openedFolderIds.indexOf(node.id) > -1 ||
          filter
        ) {
          if (ordr) {
            node.children = node.children.sort(cmp1);
          } else {
            node.children = node.children.sort(cmp2);
          }
          sortNodes(node.children, ordr);
        }
      }
    }
  }
}

var cmp1 = function(a, b) {
  if (a.xsort < b.xsort) return -1;
  if (a.xsort > b.xsort) return 1;
  return 0;
};

var cmp2 = function(a, b) {
  if (a.xsort < b.xsort) return 1;
  if (a.xsort > b.xsort) return -1;
  return 0;
};

//--------------------------------------------------------------------
// no folders, just nodes
//---------------------------------------------------------------------
function getAllNodes(x, no_recycling, all_nodes) {
  if (!all_nodes) all_nodes = [];
  if (x.constructor.name == "Array") {
    for (var i = 0; i < x.length; i++) {
      var node = x[i];
      if (node.children) {
        getAllNodes(node.children, no_recycling, all_nodes);
      } else {
        if (
          (node.parentId == _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["wasteFld"] || node.parentId == _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["archiveFld"]) &&
          no_recycling
        ) {
        } else {
          var temp = Object.assign({}, node);
          all_nodes.push(temp);
        }
      }
    }
  }
  return [x, all_nodes];
}

//--------------------------------------------------------------------
// no folders, just nodes
//---------------------------------------------------------------------
function getAllVisibleNodes(x, all_nodes) {
  if (!all_nodes) all_nodes = [];
  if (x.constructor.name == "Array") {
    for (var i = 0; i < x.length; i++) {
      var node = x[i];
      if (node.children) {
        if (
          currentFolderId == node.id ||
          openedFolderIds.indexOf(node.id) > -1 ||
          filter
        ) {
          getAllVisibleNodes(node.children, all_nodes);
        }
      } else {
        var temp = Object.assign({}, node);

        all_nodes.push(temp);
      }
    }
  }
  return [x, all_nodes];
}

//--------------------------------------------------------------------
// no folders, just nodes
//---------------------------------------------------------------------
function getAllNodeEmIDs(x, all_node_ids) {
  if (!all_node_ids) all_node_ids = [];
  if (x.constructor.name == "Array") {
    for (var i = 0; i < x.length; i++) {
      var node = x[i];
      if (node.children) {
        all_node_ids.push(getFolderURL(node.id));
        getAllNodeEmIDs(node.children, all_node_ids);
      } else {
        all_node_ids.push(getShortURL(node.url));
      }
    }
  }
  return [x, all_node_ids];
}

//---------------------------------------------
// gets the history and adds counters to bkmks
// --------------------------------------------
function displayCounters(bkmksTree, resolve, reject) {
  if (filter.length > 0) {
    return resolve(true);
  }

  var x = getAllVisibleNodes(bkmksTree)[1];
  let prms = new Promise((resolve, reject) => {
    getHistory(x, resolve, reject);
  });

  prms.then((visits) => {
    if (x.length == 0) return resolve(true);
    for (var i = 0; i < x.length; i++) {
      var node = x[i];
      if (node.children) {
      } else {
        var d = document.getElementById("bkmks_cnt_" + node.id);
        if (d) {
          var temp = siteVisits[node.id];
          if (temp) {
            d.innerHTML = "";
            d.append("*" + siteVisits[node.id]["n_visits"]);
          }
        }
      }
      if (i + 1 == x.length) {
        return resolve(true);
      }
    }
  });
}

// -----------------------------------------------
// info about visit history for each bookmark
//------------------------------------------------
function getHistory(x, resolve, reject) {
  if (x.length == 0) return resolve(true);
  siteVisits = {};
  var ctr = 0;
  x.forEach(function(node) {
    chrome.history.getVisits({ url: node.url }, function(visitItems) {
      ctr++;
      var vv = 0;
      var dd = "";
      if (visitItems) {
        vv = visitItems.length;
        if (vv > 0) {
          dd = visitItems[0].visitTime;
        }
      }
      siteVisits[node.id] = {
        url: node.url,
        title: node.title,
        n_visits: vv,
        l_date: dd,
      };
      if (ctr >= x.length) {
        return resolve(siteVisits);
      }
    });
  });
}

//-----------------------------------------------------------
// highlight folderers in top bar and side bar
//-----------------------------------------------------------
function highlightSelectedFolder() {
  if (currentFolderId) {
    var elems = document.querySelectorAll(".bkmks_ff_div");

    [].forEach.call(elems, function(el) {
      el.classList.remove("bkmks_folder_active");
    });
    //folder
    var temp = document.getElementById("bkmks_ff_div_" + currentFolderId);
    var temp2 = document.getElementById("bkmks_bar_div_" + currentFolderId);
    if (temp) temp.classList.add("bkmks_folder_active");
    if (temp2) temp2.classList.add("bkmks_folder_active");
  }
}

//------------------------------------------------------
// update display control buttons
// ------------------------------------------------------
function highlightSelectedOptions(bkmksTree) {
  // how many children in recycling?
  var rec = "images/rec.png";
  if (darkMode) rec = "images/rec_dark.png";
  var ch = bkmksTree[0].children[1];
  for (var i = 0; i < ch.children.length; i++) {
    if (ch.children[i].id == _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["wasteFld"]) {
      if (ch.children[i].children.length > 0) {
        rec = "images/rec1.png";
        if (darkMode) rec = "images/rec1_dark.png";
      }
    }
  }
  $("#bkmks_rec_icon").attr("src", rec);

  // includeText,
  $("#bkmks_text_icon").attr("src", getIcon("bkmks_text_icon"));

  $("#bkmks_tree_icon").attr("src", getIcon("bkmks_tree_icon"));

  if (sortByName) {
    document
      .getElementById("bkmks_sort_options_icon")
      .classList.add("bkmk_t_icon_pressed");
  } else {
    document
      .getElementById("bkmks_sort_options_icon")
      .classList.remove("bkmk_t_icon_pressed");
  }

  //sortByVisits
  if (sortByVisits) {
    document
      .getElementById("bkmks_sort_visits_options_icon")
      .classList.add("bkmk_t_icon_pressed");
  } else {
    document
      .getElementById("bkmks_sort_visits_options_icon")
      .classList.remove("bkmk_t_icon_pressed");
  }
}

//--------------------------------------------------
// EVENT VALIDATION
//--------------------------------------------------
function validateFldrDragFromEvent(objecto) {
  var x = objecto.getAttribute("managed_f");
  if (!x) return true;
  if (x == _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["wasteFld"]) {
    _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["displayInfoBox"]("RECYCLING BIN: Cannot move", _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["BKMKS_ERROR"]);
    return false;
  }
  if (x == _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["archiveFld"]) {
    _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["displayInfoBox"]("ARCHIVE: Cannot move", _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["BKMKS_ERROR"]);
    return false;
  }
  if (x < 3) {
    _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["displayInfoBox"]("ROOT FOLDER: Cannot move", _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["BKMKS_ERROR"]);
    return false;
  }
  return true;
}

//--------------------------------------------------
// EVENT VALIDATION
//--------------------------------------------------
function validateDragToEvent(distino) {
  if (distino) {
    if (distino == 0) {
      _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["displayInfoBox"]("Cannot move to ROOT", _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["BKMKS_ERROR"]);
      return false;
    }
  }
  return true;
}

//--------------------------------------------------
// EVENT VALIDATION
//--------------------------------------------------
function validateMoveEvent() {
  if (sortByVisits == true || sortByName == true || filter.length > 0) {
    var temp = "SEARCH MODE: Action not Allowed";
    temp = sortByName || sortByVisits ? "SORT MODE: Action not Allowed" : temp;
    _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["displayInfoBox"](temp, _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["BKMKS_ERROR"]);
    event.stopPropagation();
    event.preventDefault();
    return false;
  }
  return true;
}

//-------------------------------------------------------
// clear filters
//-------------------------------------------------------
function clearFilter() {
  var t = document.getElementById("bkmk_search");
  if (t) t.value = "";
  filter = "";
}

//--------------------------------------------------
// returns subtree without reloading from bkmks
//--------------------------------------------------
function getCurrentFolder(folder, resolve, reject) {
  if (singleFolderNav) {
    // SINGLE FOLDER NAVIGATION
    chrome.bookmarks.getSubTree(currentFolderId, function(ret) {
      return resolve(ret);
    });
  } else {
    var hy = allPrFolders[folder][0][0];
    addArrToOpenedFolders(hy);
    chrome.bookmarks.getSubTree(hy[0][0], function(ret) {
      return resolve(ret);
    });
  }
}

//--------------------------------------------------
// returns one node by traversing the tree, not using api
//--------------------------------------------------
function getSingleNode(id, bkmksTree) {
  if (bkmksTree.constructor.name == "Array") {
    for (var i = 0; i < bkmksTree.length; i++) {
      var node = bkmksTree[i];

      if (node.id == id) {
        return [node];
      }
      if (node.children) {
        var x = getSingleNode(id, node.children);
        if (x) {
          return x;
        }
      }
    }
  }
  return "";
}

//------------------------------------------------------
// save current parents
//------------------------------------------------------
function populateCurrentParentsTree(x, p, r) {
  if (!p) p = [];
  if (!r) r = {};
  if (x.constructor.name == "Array") {
    for (var i = 0; i < x.length; i++) {
      var node = x[i];
      if (node.title == _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["BKMKS_ARCHIVE"] && node.parentId == 2) {
        _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["setArchiveFld"](node.id);
      } else if (node.title == _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["BKMKS_WASTE"] && node.parentId == 2) {
        _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["setWasteFld"](node.id);
      }
      if (node.children) {
        p.push([node.id, node.title]);
        r[node.id] = p.map((x) => x);
        populateCurrentParentsTree(node.children, p, r);
        p.pop([node.id, node.title]);
      }
    }
  }

  return r;
}

//------------------------------------------------------
// save current children
//------------------------------------------------------
function getChildrenNodes(parent, c) {
  var id = parent.id;
  var kids = parent.children;
  if (!c) c = [];
  if (!kids) {
    return [];
  }
  for (var i = 0; i < kids.length; i++) {
    var nc = [];
    c = c.concat(getChildrenNodes(kids[i], nc));
  }
  c = c.concat(getsubs(parent));
  allChFolders[id] = c.map((x) => x);
  return c;
}

function getsubs(node) {
  var x = [];
  if (node.children) {
    for (var i = 0; i < node.children.length; i++) {
      var temp = node.children[i];
      if (temp.children) {
        x.push(temp.id);
      }
    }
  }
  return x;
}

//---------------------------------------------
// LOAD EMOJIES
// --------------------------------------------
function preloadEmoji(resolve, reject) {
  if (emojiLoaded) return resolve(true);

  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", chrome.extension.getURL("ems1.html"));
  rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        allEmojis = rawFile.responseText;
        var tempEm = $("#bkmks_emoji_panel");
        tempEm.append(allEmojis);
        var tempEm2 = $("#bkmks_b_emoji_panel");
        tempEm2.append(allEmojis);
        return resolve(true);
      }
    }
  };
  rawFile.send(null);
  emojiLoaded = true;
}

//---------------------------------------------
// LOAD EMOJI (ONLY) PANEL
// --------------------------------------------
function buildEmojiDialog(resolve1, reject1) {
  if (emojiDialogLoaded) {
    //already set up listenters, but make sure emojies are displayed
    var elems = document.querySelectorAll(".bkmks_em");
    [].forEach.call(elems, function(el) {
      el.classList.remove("bkmks_hide");
    });
    return resolve1(true);
  }
  let prms_em = new Promise((resolve, reject) => {
    preloadEmoji(resolve, reject);
  });
  prms_em.then(() => {
    const divs = document.querySelectorAll("#bkmks_emoji_panel .bkmks_em");
    divs.forEach((el) =>
      el.addEventListener("click", (ev) => {
        document.getElementById("bkmk_emoji_selected").value =
          ev.target.innerHTML;
        dialog_e.find("form").submit();
      })
    );

    const ems_f = document.querySelectorAll("#bkmks_dialog_emoji .bkmks_em");
    const titles = document.querySelectorAll(
      "#bkmks_dialog_emoji .bkmks_em_titles"
    );
    const sear_f = document.getElementById("bkmk_em_search_e");
    sear_f.addEventListener("keyup", (ev) => {
      var filter = sear_f.value.toLowerCase();
      for (var a = 0; a < titles.length; a++) {
        if (filter) {
          titles[a].classList.add("bkmks_hide");
        } else {
          titles[a].classList.remove("bkmks_hide");
        }
      }
      for (var i = 0; i < ems_f.length; i++) {
        var elm = ems_f[i];
        if (
          elm
            .getAttribute("text")
            .toLowerCase()
            .includes(filter) ||
          elm.innerHTML == filter
        ) {
          elm.classList.remove("bkmks_hide");
        } else {
          elm.classList.add("bkmks_hide");
        }
      }
    });

    emojiDialogLoaded = true;
    return resolve1(true);
  });
}

//---------------------------------------------
// LOAD EMOJI (BKMKS) PANEL
// --------------------------------------------
function buildEmojiBkmksPanel(resolve1, reject1) {
  if (emojiPanelLoaded) {
    //already set up listenters, but make sure emojies are displayed
    var elems = document.querySelectorAll(".bkmks_em");
    [].forEach.call(elems, function(el) {
      el.classList.remove("bkmks_hide");
    });
    return resolve1(true);
  }
  let prms_em = new Promise((resolve, reject) => {
    preloadEmoji(resolve, reject);
  });
  prms_em.then(() => {
    const divs = document.querySelectorAll("#bkmks_b_emoji_panel .bkmks_em");
    divs.forEach((el) =>
      el.addEventListener("click", (ev) => {
        document.getElementById("bkmk_emoji").value = ev.target.innerHTML;
      })
    );
    const sear_f = document.getElementById("bkmk_em_search");
    const titles = document.querySelectorAll(
      "#bkmks_dialog_form .bkmks_em_titles"
    );
    sear_f.addEventListener("keyup", (ev) => {
      var filter = sear_f.value.toLowerCase();
      for (var a = 0; a < titles.length; a++) {
        if (filter) {
          titles[a].classList.add("bkmks_hide");
        } else {
          titles[a].classList.remove("bkmks_hide");
        }
      }

      for (var i = 0; i < divs.length; i++) {
        var elm = divs[i];
        if (
          elm
            .getAttribute("text")
            .toLowerCase()
            .includes(filter) ||
          elm.innerHTML == filter
        ) {
          elm.classList.remove("bkmks_hide");
        } else {
          elm.classList.add("bkmks_hide");
        }
      }
    });

    emojiPanelLoaded = true;
    return resolve1(true);
  });
}

//--------------------------------------------------------------
// DELETE all BKMK in the folder
//--------------------------------------------------------------
function emptyFolder(parentNode, resolve, reject) {
  chrome.bookmarks.getSubTree(parentNode.id, function(toD) {
    toD = toD[0].children;
    let prms = new Promise((resolve, reject) => {
      deleteManyObjs(toD, resolve, reject);
    });
    prms.then((m) => {
      return resolve(m);
    });
  });
}

//--------------------------------------------------------------
// DELETE CURRENTLY HIGHLIGHTED BKMKS
//--------------------------------------------------------------
function deleteCurrentSelection() {
  if (!_bkmks_panel_menu_common_js__WEBPACK_IMPORTED_MODULE_0__["multiSelectParent"]) return;

  var elems = document.querySelectorAll(".bkmks_multi");
  var toD = [];
  [].forEach.call(elems, function(el) {
    el.classList.remove("bkmks_multi");
    toD.push(el.getAttribute("id"));
  });

  let prms = new Promise((resolve, reject) => {
    deleteManyByIds(toD, resolve, reject);
  });
  prms.then((m) => {
    if (m) {
      chrome.bookmarks.getTree(function(bkmksTree) {
        _bkmks_panel_menu_common_js__WEBPACK_IMPORTED_MODULE_0__["setMultiSelectParent"]("");
        updateTree(bkmksTree, true);
        _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["displayInfoBox"](m, _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["BKMKS_INFO"]);
      });
    }
  });
}

//--------------------------------------------------------------
// DELETE an array of bkmks
// @param array
//--------------------------------------------------------------
function deleteManyObjs(toD, resolve, reject) {
  if (!toD) return resolve(false);
  if (toD.length == 0) {
    _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["displayInfoBox"]("0 items deleted", _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["BKMKS_INFO"]);
    return resolve(false);
  }
  var currentParent = "";
  var exit = false;

  for (var i = 0; i < toD.length; i++) {
    if (toD[i].children) {
      _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["displayInfoBox"]("ERROR: Folder has sub-folders", _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["BKMKS_ERROR"]);
      exit = true;
      break;
    }
  }
  if (exit) {
    return resolve(false);
  }

  //delete each
  for (var i = 0; i < toD.length; i++) {
    currentParent = toD[i].parentId;
    let prms = new Promise((resolve, reject) => {
      deleteBkmkObj(toD[i], resolve, reject);
    });
    prms.then((m) => {
      if (i == toD.length) {
        if (currentParent == _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["wasteFld"]) {
          return resolve("DELETED: " + i + " bookmarks");
        } else {
          return resolve("Moved to Recycling Bin: " + i + " bookmarks");
        }
      }
    });
  }
}

//--------------------------------------------------------------
// DELETE BKMK
//--------------------------------------------------------------
function deleteBkmkObj(node, resolve, reject) {
  if (_bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["wasteFld"] != "" && node.parentId == _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["wasteFld"]) {
    chrome.bookmarks.remove(node.id, function(v) {
      return resolve("DELETED");
    });
  } else {
    return deleteById(node.id, resolve, reject);
  }
}

//-------------------------------------------------------------
// DELETE MULTIPEL BKMKS BY IDs
//--------------------------------------------------------------
function deleteManyByIds(toD, resolve, reject) {
  if (!toD) return resolve(false);
  if (toD.length == 0) return resolve(false);

  for (var i = 0; i < toD.length; i++) {
    let prms = new Promise((resolve, reject) => {
      deleteById(toD[i], resolve, reject);
    });
    prms.then((m) => {
      if (i == toD.length) {
        if (_bkmks_panel_menu_common_js__WEBPACK_IMPORTED_MODULE_0__["multiSelectParent"] == _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["wasteFld"]) {
          return resolve("DELETED: " + i + " bookmarks");
        } else {
          return resolve("Moved to Recycling Bin: " + i + " bookmarks");
        }
      }
    });
  }
}

//-------------------------------------------------------------
// DELETE SINGLE BKMK BY ID
//--------------------------------------------------------------
function deleteById(id, resolve, reject) {
  if (_bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["wasteFld"] != "" && _bkmks_panel_menu_common_js__WEBPACK_IMPORTED_MODULE_0__["multiSelectParent"] == _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["wasteFld"]) {
    chrome.bookmarks.remove(id, function(v) {
      return resolve("DELETED");
    });
  } else if (!_bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["wasteFld"]) {
    chrome.bookmarks.create(
      {
        index: 0,
        parentId: "2",
        title: _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["BKMKS_WASTE"],
      },
      function(e) {
        _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["setWasteFld"](e.id);
        moveMe();
      }
    );
  } else {
    moveMe();
  }
  function moveMe() {
    chrome.bookmarks.move(
      id,
      {
        parentId: _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["wasteFld"],
      },
      function(v) {
        return resolve("Moved to Recycling Bin");
      }
    );
  }
}

//------------------------------------------------------
// OPENED FOLDERS
//------------------------------------------------------
function setOpenedFolders(o) {
  openedFolderIds = o;
}

function addToOpenedFolders(x) {
  if (singleFolderNav) {
    openedFolderIds = [];
  } else {
    var all = allPrFolders[x];
    if (all) {
      all.forEach(function(i) {
        openedFolderIds.push(i[0]);
      });
    }
  }
  openedFolderIds.push(x);
  openedFolderIds = Array.from(new Set(openedFolderIds));
}

function addArrToOpenedFolders(x) {
  if (!x) return;
  for (var i = 0; i < x.length; i++) {
    openedFolderIds.concat(allPrFolders[x[i][0][0]]);
  }
  openedFolderIds = Array.from(new Set(openedFolderIds));
}

function removeFromOpenedFolders(x) {
  var ix = openedFolderIds.indexOf(x);
  if (ix > -1) {
    openedFolderIds.splice(ix, 1);
  }

  // close all the childrent of this folder too
  var ch = allChFolders[x];
  for (var i = 0; i < ch.length; i++) {
    removeFromOpenedFolders(ch[i]);
  }
}

//------------------------------------------------------
// save in local
//------------------------------------------------------
function saveOptions() {
  var currentdate = new Date();
  chrome.storage.local.set({
    includeText: includeText,
    largeIcons: largeIcons,
    darkMode: darkMode,
    singleFolderNav: singleFolderNav,
    openedFolderIds: openedFolderIds,
    currentFolderId: currentFolderId,
  });
}

function saveEmojies(emoji_id, em, resolve, reject) {
  if (em == "") {
    chrome.storage.sync.remove(emoji_id, function(d) {
      return resolve(true);
    });
  } else {
    chrome.storage.sync.set(
      {
        [emoji_id]: em,
      },
      function(d) {
        return resolve(true);
      }
    );
  }
}

function getEmojies(resolve, reject) {
  chrome.storage.sync.get(null, function(items) {
    myEms = items;
    return resolve(true);
  });
}

function getShortURL(s) {
  if (!s) return "";
  var url = new URL(s);
  var ret = url.hostname + url.pathname;
  ret = ret.replace(/\W/g, "").toLowerCase();
  return ret;
}

function getFolderURL(id) {
  if (id == _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["wasteFld"]) {
    return "bkmks_waste";
  } else if (id == _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["archiveFld"]) {
    return "bkmks_arch";
  }
  var ret = "";
  var v = allPrFolders[id];
  if (!v) return "";
  for (var i = 0; i < v.length; i++) {
    if (i + 2 >= v.length) {
      ret = ret + v[i][1];
    }
  }
  //remove non-alpha chars
  ret = ret.replace(/\W/g, "").toLowerCase();
  return ret;
}

// ---------------------------------------------------------
// FOR NO-SINGLE FOLDER VIEW
//----------------------------------------------------------
function getFoldersToOpen() {
  // if in sigle folder mode, only open current
  if (singleFolderNav) {
    if (currentFolderId) {
      return [currentFolderId];
    } else {
      return [0];
    }
  }
  var toOpen = [];
  if (currentFolderId) {
    var all = allPrFolders[currentFolderId];
    all.forEach(function(i) {
      toOpen.push(openedFolderIds.push(i[0]));
    });
  }
  for (var i = 0; i < openedFolderIds.length; i++) {
    var ix = openedFolderIds[i];
    var all = allPrFolders[ix];
    if (all) {
      all.forEach(function(ii) {
        toOpen.push(ii[0]);
      });
    }
  }
  toOpen = Array.from(new Set(toOpen));

  return toOpen;
}

//------------------------------------------------------
// needed by Chrome, weird
//------------------------------------------------------
document.addEventListener("dragover", function(event) {
  event.preventDefault();
});
// document.addEventListener("drop", function(ev) {
//   event.preventDefault();
// });

//-------------------------------------------------------
// remove all sorts
//-------------------------------------------------------
function clearSorts() {
  sortByVisits = false;
  sortByName = false;
  includeCounters = false;
}

//------------------------------------------------------
// light or dark color schema - step 1
//------------------------------------------------------
function setColorMode(mode) {
  if (mode) darkMode = mode;
  var v = document.getElementsByClassName("bkmks_colored_panel")[0];
  var v1 = document.getElementById("bkmks_breadcrumb_bar");
  var v2 = document.getElementById("bkmks_wd_icon");
  var v3 = document.getElementById("bkmks_controls");
  if (darkMode) {
    v.classList.add("bkmks_body_dark");
    v.classList.remove("bkmks_body_light");
    v1.classList.add("bkmks_breadcrumb_dark");
    v1.classList.remove("bkmks_breadcrumb_light");
  } else {
    v.classList.add("bkmks_body_light");
    v.classList.remove("bkmks_body_dark");
    v1.classList.remove("bkmks_breadcrumb_dark");
    v1.classList.add("bkmks_breadcrumb_light");
  }
  if (darkMode) {
    v2.setAttribute("src", "images/col_sw1.png");
  } else {
    v2.setAttribute("src", "images/col_sw.png");
  }
  document.getElementById("bkmks_text_icon").src = getIcon("bkmks_text_icon");
  document.getElementById("bkmks_tree_icon").src = getIcon("bkmks_tree_icon");
  document.getElementById("bkmks_sort_options_icon").src = getIcon(
    "bkmks_sort_options_icon"
  );
  document.getElementById("bkmks_sort_visits_options_icon").src = getIcon(
    "bkmks_sort_visits_options_icon"
  );
  document.getElementById("bkmks_archive_icon").src = getIcon(
    "bkmks_archive_icon"
  );
  document.getElementById("bkmks_rec_icon").src = getIcon("bkmks_rec_icon");
  document.getElementById("bkmks_wd_icon").src = getIcon("bkmks_wd_icon");
  document.getElementById("bkmks_tt_icon").src = getIcon("bkmks_tt_icon");
  document.getElementById("bkmks_search_icon").src = getIcon(
    "bkmks_search_icon"
  );
  document.getElementById("bkmks_about_icon").src = getIcon("bkmks_about_icon");
  var r_id = "img_" + _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["wasteFld"];
  var r1_id = "brd_ff_img_" + _bkmks_panel_common_js__WEBPACK_IMPORTED_MODULE_3__["wasteFld"];
  var t = document.getElementById(r_id);
  if (t) t.src = getIcon("bkmks_rec_icon");
  var t1 = document.getElementById(r1_id);
  if (t1) t1.src = getIcon("bkmks_rec_icon_w");
}

function getIcon(el) {
  switch (el) {
    case "bkmks_text_icon":
      if (darkMode) {
        if (includeText == true) {
          return "images/o2_dark.png";
        } else {
          return "images/f5_dark.png";
        }
      } else {
        if (includeText == true) {
          return "images/o2.png";
        } else {
          return "images/f5.png";
        }
      }
      break;
    case "bkmks_tree_icon":
      if (darkMode) {
        if (singleFolderNav == true) {
          return "images/x_dark.png";
        } else {
          return "images/nav_dark.png";
        }
      } else {
        if (singleFolderNav == true) {
          return "images/x.png";
        } else {
          return "images/nav.png";
        }
      }
      break;
    case "bkmks_sort_options_icon":
      if (darkMode) {
        return "images/s1_dark.png";
      } else {
        return "images/s1.png";
      }
      break;
    case "bkmks_sort_visits_options_icon":
      if (darkMode) {
        return "images/s3_dark.png";
      } else {
        return "images/s3.png";
      }
      break;
    case "bkmks_archive_icon":
      if (darkMode) {
        return "images/a_dark.png";
      } else {
        return "images/a.png";
      }
      break;
    case "bkmks_rec_icon":
      var scr = document.getElementById("bkmks_rec_icon").src;
      if (darkMode) {
        if (
          scr.indexOf("images/rec.png") > -1 ||
          scr.indexOf("images/rec_dark.png") > -1
        ) {
          return "images/rec_dark.png";
        } else {
          return "images/rec1_dark.png";
        }
      } else {
        if (
          scr.indexOf("images/rec.png") > -1 ||
          scr.indexOf("images/rec_dark.png") > -1
        ) {
          return "images/rec.png";
        } else {
          return "images/rec1.png";
        }
      }
      break;
    case "bkmks_rec_icon_w":
      var scr = document.getElementById("bkmks_rec_icon").src;
      if (
        scr.indexOf("images/rec.png") > -1 ||
        scr.indexOf("images/rec_dark.png") > -1
      ) {
        return "images/rec_dark.png";
      } else {
        return "images/rec1_dark.png";
      }
      break;

    case "bkmks_wd_icon":
      if (darkMode) {
        return "images/col_sw1_dark.png";
      } else {
        return "images/col_sw.png";
      }
      break;
    case "bkmks_tt_icon":
      if (darkMode) {
        return "images/tt_dark.png";
      } else {
        return "images/tt.png";
      }
      break;
    case "bkmks_search_icon":
      if (darkMode) {
        return "images/se_dark.png";
      } else {
        return "images/se.png";
      }
      break;
    case "bkmks_about_icon":
      if (darkMode) {
        return "images/q_dark.png";
      } else {
        return "images/q.png";
      }
      break;
  }
}


/***/ })

/******/ });