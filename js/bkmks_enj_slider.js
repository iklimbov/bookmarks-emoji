export function sliderSetUp() {
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
