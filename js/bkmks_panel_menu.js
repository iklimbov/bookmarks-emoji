"use strict";

import * as menu from "./bkmks_panel_menu_common.js";
import * as glb from "./bkmks_panel_common.js";
var menu_bkmks = document.querySelector("#bkmks_context_menu");
var bkmks_menu_state = 0;

function init() {
  bkmksContextListener();
  bkmksKeyupListener();
}

function bkmksContextListener() {
  document.addEventListener("contextmenu", function(e) {
    menu.setBkmkInContext(menu.clickInsideElement(e, "bkmks_bookmark"));
    if (menu.bkmkInContext) {
      removeExtra();

      e.preventDefault();
      e.stopPropagation();
      toggleBkmksMenuOn();
      menu.positionMenu(e, menu_bkmks);
    } else {
      menu.setBkmkInContext(null);
      toggleBkmksMenuOff();
    }
  });
}

function removeExtra() {
  if (menu.multiSelectParent) {
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

export function toggleBkmksMenuOff() {
  if (bkmks_menu_state !== 0) {
    bkmks_menu_state = 0;
    menu_bkmks.classList.remove("bkmks_context_menu--active");
    glb.clearMultiSelect();
  }
}
init();
