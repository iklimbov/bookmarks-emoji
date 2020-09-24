import * as glb from "./bkmks_panel_common.js";

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
      glb.displayInfoBox(
        "Message is on its way, thank you!",
        glb.BKMKS_INFO,
        3000
      );
      document.body.style.backgroundImage = "url('../images/water3.jpg')";
      var elements = document.getElementsByClassName("form_input");
      for (var ii = 0; ii < elements.length; ii++) {
        elements[ii].value = "";
      }
    },
    error: function(xhr, status, error) {
      glb.displayInfoBox(
        "Error sending.  Please try again later.",
        glb.BKMKS_ERROR,
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
