import * as popW from "./bkmks_panel_popup.js";

document.addEventListener("DOMContentLoaded", function() {
  chrome.storage.local.get(
    {
      includeText: true,
      largeIcons: false,
      darkMode: false,
      singleFolderNav: false,
      openedFolderIds: ["0", "1"],
      currentFolderId: "",
    },
    function(items) {
      chrome.storage.sync.get(null, function(items1) {
        popW.setOptions(
          items.largeIcons,
          items.includeText,
          items.singleFolderNav,
          items.currentFolderId,
          items.darkMode,
          items.openedFolderIds,
          items1
        );
        document.body.style.fontSize = items.largeIcons ? "120%" : "85%";
        document.getElementById("bkmks_text_icon").focus();
        chrome.bookmarks.getTree(function(bkmksTree) {
          popW.updateTree(bkmksTree, true);
          popW.setColorMode();
        });
      });
    }
  );
});
