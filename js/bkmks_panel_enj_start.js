import * as popW from "./bkmks_panel_popup.js";
import * as slider from "./bkmks_enj_slider.js";
import * as glb from "./bkmks_panel_common.js";
function time() {
  var today = new Date();
  console.log(today.getMinutes() + ":" + today.getSeconds());
}

chrome.runtime.onMessage.addListener(function(msg, sender) {
  if (msg == "bkmks_open_panel") {
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
        popW.setColorMode(items.darkMode);
        if (items.includeText) {
          document.getElementById("bkmk_resizable").classList.add("bkmks_400");
        } else {
          document.getElementById("bkmk_resizable").classList.add("bkmks_200");
        }
        document.body.style.fontSize = items.largeIcons ? "120%" : "85%";
        popW.clearFilter();
        chrome.storage.sync.get(null, function(items2) {
          popW.setOptions(
            items.largeIcons,
            items.includeText,
            items.singleFolderNav,
            items.currentFolderId,
            items.darkMode,
            items.openedFolderIds,
            items2
          );
          chrome.bookmarks.getTree(function(bkmksTree) {
            popW.updateTree(bkmksTree, true);
            document.getElementById("bkmks_text_icon").focus();
          });
        });
      }
    );
  } else if (msg == "bkmks_close_panel") {
    popW.clearFilter();
    glb.clearMultiSelect();
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

slider.sliderSetUp();
