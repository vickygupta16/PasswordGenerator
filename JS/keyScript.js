//67-c, 86-v, 85-u, 73-i, 83-s, 80-p
$(document).onkeydown = function (e) {
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
$(document).keypress("u", function (e) {
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
