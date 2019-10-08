document.addEventListener("DOMContentLoaded", function () {

  const canvas = document.getElementById('canvas_picker');
  const img = new Image();
  img.src = document.getElementsByClassName('covered_image')[0].getAttribute('src');
  canvas.height = document.getElementsByClassName('get_fromImage')[0].clientHeight - 40;
  $(img).load(function () {
    // get the scale
    const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    // get the top left position of the image
    const x = (canvas.width / 2) - (img.width / 2) * scale;
    const y = (canvas.height / 2) - (img.height / 2) * scale;
    canvas.width = img.width * scale;
    canvas.getContext('2d').drawImage(img, 0, 0, img.width * scale, img.height * scale);
    document.getElementsByClassName('wrapper')[0].width = img.width * scale;
    document.getElementsByClassName('wrapper')[0].height = img.height * scale;

    document.getElementsByClassName('covered_image')[0].width = img.width * scale;

  });

  $('.covered_image').click(function (event) {
    // получение координат
    const x = event.pageX - this.offsetLeft;
    const y = event.pageY - this.offsetTop;
    // получение цвета пикселя
    const img_data = canvas.getContext('2d').getImageData(x, y, 1, 1).data;
    const R = img_data[0];
    const G = img_data[1];
    const B = img_data[2]; 
    const rgb = 'rgb(' + R + ', ' + G + ', ' + B + ')';
    const our_color = document.getElementsByClassName('color');
    our_color[0].style.backgroundColor = rgb;
    our_color[0].firstElementChild.innerHTML = "" + RGBParser(rgb);
  });
});