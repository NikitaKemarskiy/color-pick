function copyToClip() {
  const x = event.clientX, y = event.clientY;
  const elementMouseIsOver = document.elementFromPoint(x, y);
  
  if (elementMouseIsOver.className == 'color') {
    const style = window.getComputedStyle(elementMouseIsOver);
    const color = style.getPropertyValue('background-color');
    alert(color);
  }
  else if (elementMouseIsOver.className == 'color_text') {
    const realcolor = elementMouseIsOver.parentNode;
    const style = window.getComputedStyle(realcolor);
    const color = style.getPropertyValue('background-color');
    alert(color);
  }
  else if (elementMouseIsOver.className == 'colors') {
    return;
  }  
}
  
