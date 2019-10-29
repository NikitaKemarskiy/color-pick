function checker(){
  let isLight = document.getElementById('theme');
  isLight.checked ? setLight(isLight) : setDark(isLight);  
}


function setLight(isLight) {
  isLight.checked = true;
  document.getElementById('worksheet').setAttribute('href', 'assets/styles/worksheet_style_light.css');
  document.getElementById('form').setAttribute('href', 'assets/styles/form_style_light.css');
  document.getElementById('submenu').setAttribute('href', 'assets/styles/submenu_light.css');

}

function setDark(isLight) {
  isLight.checked = false;
  document.getElementById('worksheet').setAttribute('href', 'assets/styles/worksheet_style.css');
  document.getElementById('form').setAttribute('href', 'assets/styles/form_style.css');
  document.getElementById('submenu').setAttribute('href', 'assets/styles/submenu.css');
}
