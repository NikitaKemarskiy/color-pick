function copyToClipboard() {
  // var $temp = $("<input>");
  // $("body").append($temp);
  // $temp.val($(element).text()).select();
  // document.execCommand("copy");
  // $temp.remove();


  var x = event.clientX, y = event.clientY;
  var elementMouseIsOver = document.elementFromPoint(x, y);
  var style = window.getComputedStyle(elementMouseIsOver);
  var color = style.getPropertyValue('background-color');
  //alert(color);
  // var dummy = $('<input>').val(color).appendTo('body').select();
  // document.execCommand('copy');
}
