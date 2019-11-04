 function setColorInBlock() {
  const colors = document.getElementsByClassName('color');
  for (let index = 0; index < colors.length; index++) {
    colors[index].firstElementChild.innerHTML = "" + RGBParser(window.getComputedStyle(colors[index]).getPropertyValue('background-color'));
  }
}