'use strict';

function setTheme() {
  if (localStorage.getItem('theme') === 'light-theme') {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
  } else {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
  }
}

window.addEventListener('load', setTheme);