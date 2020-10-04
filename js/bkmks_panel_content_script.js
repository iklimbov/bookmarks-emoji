"use strict";
export var bkmksMainIframe;

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

export function init() {
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

export function bkmksToggleInj(sender) {
  if (bkmksMainIframe.style.width == "0px") {
    chrome.runtime.sendMessage(sender.id, "bkmks_open_panel");
    bkmksMainIframe.style.setProperty("width", "calc(100%)", "important");
  } else {
    chrome.runtime.sendMessage(sender.id, "bkmks_close_panel");
    bkmksMainIframe.style.setProperty("width", "0px", "important");
  }
}

init();
