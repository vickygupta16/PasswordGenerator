$(document).ready(function () {
  //67-c, 86-v, 85-u, 73-i, 83-s, 80-p
  $(document).keydown = function (e) {
    if (
      e.ctrlKey &&
      (e.keyCode === 67 ||
        e.keyCode === 86 ||
        e.keyCode === 85 ||
        e.keyCode === 73 ||
        e.keyCode === 83 ||
        e.keyCode === 80)
    ) {
      return false;
    } else {
      return true;
    }
  };
  //disable source code
  $(document).keydown("u", function (e) {
    if (e.ctrlKey) {
      return false;
    } else {
      return true;
    }
  });
  //disable f12 button
  $(document).keydown(function (event) {
    if (event.keyCode == 123) {
      return false;
    }
  });
  $("#copybtn").click(function () {
    $("#copybtn").addClass("animate-cp-logo");
    setTimeout(function () {
      $("#copybtn").removeClass("animate-cp-logo");
    }, 600);
  });
  $("#showpassword").click(function () {
    $(".common").addClass("animate-shpw-logo");
    // $("#showpassword").addClass("animate-shpw-logo");
    // setTimeout(function () {
    //   $("#showpassword").removeClass("animate-shpw-logo");
    // }, 600);
  });
  $(".info-contact").click(function () {
    if (
      $(".code-logo").hasClass("animate-code-logo") &&
      $(".dev-logo").hasClass("animate-dev-logo")
    ) {
      classing();
    } else {
      $(".code-logo").addClass("animate-code-logo");
      $(".dev-logo").addClass("animate-dev-logo");
      $(".code-logo").removeClass("hide-code-logo");
      $(".dev-logo").removeClass("hide-dev-logo");
    }
  });
  $(".code-logo").click(function () {
    classing();
  });
  $(".dev-logo").click(function () {
    classing();
  });
  function classing() {
    $(".code-logo").addClass("hide-code-logo");
    $(".dev-logo").addClass("hide-dev-logo");
    setTimeout(function () {
      $(".code-logo").removeClass("animate-code-logo");
      $(".dev-logo").removeClass("animate-dev-logo");
    }, 500);
  }
  $("#ll").on("change", function () {
    $("#ul").find("option").remove();
    for (var i = Number.parseInt(this.value) + 1; i <= 9; ++i) {
      $("#ul").append("<option value=" + i + ">" + i + "</option>");
    }
  });
  $(".toggle-div").text("Check Password");
  var temp = 0;
  $(".toggle-div").click(function () {
    if (temp) {
      $(".toggle-div")
        .fadeOut(200)
        .promise()
        .done(function () {
          $(".toggle-div").text("Check Password");
          $("#check-pw")
            .slideUp(1000)
            .promise()
            .done(function () {
              $("#generate-pw")
                .slideDown(1000)
                .promise()
                .done(function () {
                  $(".toggle-div").fadeIn(200);
                });
            });
        });
      temp = 0;
    } else {
      $(".toggle-div")
        .fadeOut(200)
        .promise()
        .done(function () {
          $(".toggle-div").text("Generate Password");
          $("#generate-pw")
            .slideUp(1000)
            .promise()
            .done(function () {
              $("#check-pw")
                .slideDown(1000)
                .promise()
                .done(function () {
                  $(".toggle-div").fadeIn(200);
                });
            });
        });
      temp = 1;
    }
  });
});

export function displayModal() {
  $("#passwordResultModal").modal("toggle");
}
