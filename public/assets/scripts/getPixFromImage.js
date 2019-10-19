function getPixes() {

  const canvas = document.getElementById('canvas_picker');
  const img = new Image();
  img.src = document.getElementsByClassName('covered_image')[0].getAttribute('src');
  canvas.height = document.getElementsByClassName('get_fromImage')[0].clientHeight - 40;
  $(img).load(function () {
    // get the scale
    const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    // get the top left position of the image
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
  $('.covered_image').contextmenu(function(e) {
    // получение координат
    const x = event.pageX - this.offsetLeft;
    const y = event.pageY - this.offsetTop;
    // получение цвета пикселя
    const img_data = canvas.getContext('2d').getImageData(x, y, 1, 1).data;
    const R = img_data[0];
    const G = img_data[1];
    const B = img_data[2];
    const rgb = 'rgb(' + R + ', ' + G + ', ' + B + ')';
    const our_colors = document.getElementsByClassName('color');
    const allclrs = document.getElementById('colors');

    const Child = document.createElement('div');
    Child.className = 'color';
    const ChildText = document.createElement('div');
    ChildText.className = 'color_text';
    ChildText.innerHTML = RGBParser(Child.style.backgroundColor);
    Child.appendChild(ChildText);
    allclrs.appendChild(Child);
    for (let index = our_colors.length - 1; index > 0 ; index--) {
      our_colors[index].style.backgroundColor = our_colors[index - 1].style.backgroundColor;
    }
    our_colors[1].style.backgroundColor = rgb;
    our_colors[1].firstElementChild.innerHTML = "" + RGBParser(rgb);
    setColorInBlock();
    e.preventDefault();
    e.stopPropagation();
  })

};
