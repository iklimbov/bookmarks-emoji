"use strict";
import * as glb from "./bkmks_panel_common.js";

export var bkmkInContext; //used in popup as a link to current item
export var bkmkFolderInContext; //used in popup as a link to current item
export var multiSelectParent; // multile items

export function setFolderInContext(x) {
  bkmkFolderInContext = x;
}
export function setBkmkInContext(x) {
  bkmkInContext = x;
}

export function setMultiSelectParent(x) {
  multiSelectParent = x;
}

export function clickInsideElement(e, className) {
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

export function positionMenu(e, menu) {
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
        if (m == glb.archiveFld || m == glb.wasteFld || m < 3) {
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
