function copyToClip() {
  const x = event.clientX, y = event.clientY;
  const elementMouseIsOver = document.elementFromPoint(x, y);
  let style;
  if (elementMouseIsOver.className == 'color') {
    style = window.getComputedStyle(elementMouseIsOver);
  }
  else if (elementMouseIsOver.className == 'color_text') {
    style = window.getComputedStyle(elementMouseIsOver.parentNode);
  }
  else if (elementMouseIsOver.className == 'colors') {
    return;
  } 
    const color = style.getPropertyValue('background-color');
    const hexColor = RGBParser(color);
    let dummy = $('<input>').val(hexColor).appendTo('body').select();
    document.execCommand('copy');
    dummy.remove();
    alert(color + " copied in HEX!");
  
}
  

function rgbElementToHex(c) {
  var hex = c.toString(16);
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  return hex;
}

function RGBtoHEX(Array) {
  return "" + rgbElementToHex(Array[0]) + rgbElementToHex(Array[1]) + rgbElementToHex(Array[2]);
}

function RGBParser(rgb) {
  const parts = rgb.slice(4, rgb.length - 1);
  const colorsArray = parts.split(', ');
  const colorsNums = [parseInt(colorsArray[0]), parseInt(colorsArray[1]), parseInt(colorsArray[2])]
  return RGBtoHEX(colorsNums);
}

