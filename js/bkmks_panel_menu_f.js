"use strict";

import * as menu from "./bkmks_panel_menu_common.js";
import * as glb from "./bkmks_panel_common.js";

var menu_bkmks_f = document.querySelector("#bkmks_context_menu_f");
var bkmks_menu_f_state = 0;

function init() {
  bkmksFolderContextListener();
  bkmksFolderKeyupListener();
}

function bkmksFolderContextListener() {
  document.addEventListener("contextmenu", function(e) {
    menu.setFolderInContext(menu.clickInsideElement(e, "bkmks_folder_title"));
    if (menu.bkmkFolderInContext) {
      e.preventDefault();
      // remove menues for non-editable
      if (!removeExtraF()) {
        return;
      }
      toggleBkmksFolderMenuOn();
      menu.positionMenu(e, menu_bkmks_f, 50);
    } else {
      menu.setFolderInContext(null);
      toggleBkmksFolderMenuOff();
    }
  });
}

function removeExtraF() {
  var m = menu.bkmkFolderInContext.getAttribute("managed_f");
  if (m < 1) {
    return false;
  }
  if (m < 3) {
    document.getElementById("bkmks_edit_f").hidden = true;
    document.getElementById("bkmks_emoji_f").hidden = true;
    document.getElementById("bkmks_delete_f").hidden = true;
    document.getElementById("bkmks_newfolder_f").hidden = false;
  } else if (m == glb.wasteFld || m == glb.archiveFld) {
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
  if (m == glb.wasteFld) {
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

export function toggleBkmksFolderMenuOff() {
  if (bkmks_menu_f_state !== 0) {
    bkmks_menu_f_state = 0;
    menu_bkmks_f.classList.remove("bkmks_context_menu_f--active");
  }
}
init();
