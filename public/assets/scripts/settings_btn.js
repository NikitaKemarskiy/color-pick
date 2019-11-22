function set_window() {
  console.log('i work');
  const setting_menu = document.querySelector('#menu_from_button');
  const computed_style = window.getComputedStyle(setting_menu);
  if (computed_style.visibility == 'hidden') {
    set_window_open(setting_menu);
  }
  else if (computed_style.visibility == "visible"){
    set_window_close(setting_menu);
  }
}

function set_window_open(menu) {
  menu.style.width = "220px";
  menu.style.opacity = 1;
  menu.style.visibility = 'visible';
  menu.childNodes[1].style.opacity = 1;
  document.querySelector('.menu_button.settings_button').querySelector('svg').style.webkitAnimation = "rotating 2s linear infinite";
  document.querySelector('.menu_button.settings_button').querySelector('svg').style.animation = "rotating 2s linear infinite";
}

function set_window_close(menu) {
  menu.style.width = '48px';
  menu.style.opacity = 0;
  menu.style.visibility = 'hidden';
  menu.childNodes[1].style.opacity = 0;
  document.querySelector('.menu_button.settings_button').querySelector('svg').style.webkitAnimation = "";
  document.querySelector('.menu_button.settings_button').querySelector('svg').style.animation = "";

}