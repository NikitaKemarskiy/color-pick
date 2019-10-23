function checker(){
  let isLight = document.getElementById('theme');
  isLight.checked ? isLight.checked = false : isLight.checked = true;  
  isLight.checked ? setLight(isLight) : setDark(isLight);  
  console.log(isLight);
}

function setDark(isLight) {
  isLight.checked = false;
  console.log('turn to dark');
}

function setLight(isLight) {
  isLight.checked = true;
  console.log('turn to light');
}