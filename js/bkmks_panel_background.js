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
