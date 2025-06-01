document.addEventListener('DOMContentLoaded', function () {
  const themeStylesheet = document.getElementById('theme-stylesheet');
  const themeSwitcher = document.getElementById('theme-switcher');
  const storedTheme = localStorage.getItem('spectre-theme');

  function applyTheme(themeName) {
    if (!themeStylesheet) {
      console.error('Theme stylesheet link not found (expected #theme-stylesheet)');
      return;
    }

    const currentStylesheetPath = themeStylesheet.getAttribute('href');
    if (!currentStylesheetPath) {
      console.error('Current stylesheet path is empty or null.');
      return;
    }
    const pathParts = currentStylesheetPath.split('/');
    pathParts.pop(); // Remove the old filename
    const cssPath = pathParts.join('/') + '/' + themeName + '.min.css';

    themeStylesheet.setAttribute('href', cssPath);

    if (themeSwitcher) {
        themeSwitcher.value = themeName; // Restore this
    }
    localStorage.setItem('spectre-theme', themeName); // Restore this
    console.log('Applied theme: ' + themeName + ', path: ' + cssPath);
  }

  if (themeSwitcher) {
    themeSwitcher.addEventListener('change', function () {
      applyTheme(this.value);
    });
  }

  // Initial load logic (fully restored with the small simplification)
  if (storedTheme) {
    applyTheme(storedTheme);
  } else {
    if (themeSwitcher && themeSwitcher.value !== 'spectre') {
       applyTheme('spectre');
    } else if (!themeSwitcher && themeStylesheet) {
       // If no switcher, but stylesheet exists, apply default.
       // This ensures if a page doesn't have a switcher, it still defaults correctly if no theme is stored.
       // Or, if it has a switcher but it's already on 'spectre', this branch isn't hit.
       // The initial HTML default is spectre, so this effectively re-applies it or applies if HTML was different.
       applyTheme('spectre'); // Simplified from "storedTheme || 'spectre'"
    }
    // If themeSwitcher exists and IS 'spectre', and no storedTheme, we do nothing, respecting the HTML default.
  }
});
