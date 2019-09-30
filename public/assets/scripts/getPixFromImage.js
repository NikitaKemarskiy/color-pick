document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById('canvas_picker').getContext('2d');
  var img = new Image();
  img.src = '/assets/images/audismall.jpg';
  $(img).load(function () {
    canvas.drawImage(img, 0, 0);
  });

  $('.covered_image').click(function (event) {
    // получение координат
    var x = event.pageX - this.offsetLeft;
    var y = event.pageY - this.offsetTop;
    // получение цвета пикселя
    var img_data = canvas.getImageData(x, y, 1, 1).data;
    var R = img_data[0];
    var G = img_data[1];
    var B = img_data[2]; 
    var rgb = 'rgb(' + R + ', ' + G + ', ' + B + ')';
    const our_color = document.getElementsByClassName('color');
    our_color[0].style.backgroundColor = rgb;
    our_color[0].firstElementChild.innerHTML = "" + RGBParser(rgb);
  });
});