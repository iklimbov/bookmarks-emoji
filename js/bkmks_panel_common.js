export const BKMKS_INFO = 1,
  BKMKS_ERROR = 2,
  BKMKS_ARCHIVE = "Bookmarks Archive",
  BKMKS_WASTE = "Recycling Bin",
  BKMKS_SPEC = ["🅰️", "📂"];

export var archiveFld = "",
  wasteFld = "";

export function setArchiveFld(x) {
  archiveFld = x;
}
export function setWasteFld(x) {
  wasteFld = x;
}

//-------------------------------------------------
// red alert box
//-------------------------------------------------
export function displayInfoBox(alrt, msg_type, seconds, emj) {
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
