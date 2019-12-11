$(document).ready(function () {
  const themeSwitch = document.getElementById('theme');
    initTheme(); // on page load, if user has already selected a specific theme -> apply it
    themeSwitch.addEventListener('change', function (event) {
      checker(themeSwitch); // update color theme
    });
  function initTheme() {
    var darkThemeSelected;
    switch (localStorage.getItem('themeSwitch')) {
      case null:
        darkThemeSelected = true;
        themeSwitch.checked = false;
        break;
      case 'dark':
        darkThemeSelected = true;
        themeSwitch.checked = false;
        break;
      case 'light':
        darkThemeSelected = false;
        themeSwitch.checked = true;
        break;
      default:
        break;
    }
    // update body data-theme attribute
    darkThemeSelected === true ? setDark(themeSwitch) : setLight(themeSwitch);
  };
});

function checker(themeSwitch) {
  themeSwitch.checked ? setLight(themeSwitch) : setDark(themeSwitch);
}


function setLight(themeSwitch) {
  themeSwitch.checked = true;
  document.getElementById('theme_stylesheet').setAttribute('href', 'assets/styles/light_colors_theme.css');
  localStorage.setItem('themeSwitch', 'light');
}

function setDark(themeSwitch) {
  themeSwitch.checked = false;
  document.getElementById('theme_stylesheet').setAttribute('href', 'assets/styles/dark_colors_theme.css');
  localStorage.setItem('themeSwitch', 'dark');
}