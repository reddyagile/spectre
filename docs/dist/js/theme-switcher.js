document.addEventListener('DOMContentLoaded', function () {
  const themeStylesheet = document.getElementById('theme-stylesheet');
  const themeSwitcher = document.getElementById('theme-switcher');
  const storedTheme = localStorage.getItem('spectre-theme');

  // Function to apply a theme
  function applyTheme(themeName) {
    if (!themeStylesheet) {
      console.error('Theme stylesheet link not found (expected #theme-stylesheet)');
      return;
    }
    // Assuming docs are in root, and dist is at the same level or one up.
    // Adjust path if docs structure is deeper.
    // Current path for docs CSS seems to be 'dist/spectre.min.css' relative to docs pages.
    // So, if docs pages are like docs/components/X.html, then 'dist/' is '../dist/'
    // Let's assume the CSS files are located in a way that `dist/${themeName}.min.css` is accessible
    // from the document root, or adjust the path.
    // The current docs build puts spectre.min.css in docs/dist/.
    // So, the path should be relative from where the HTML file is.
    // If docs/index.html loads docs/dist/spectre.min.css, then new themes should be
    // docs/dist/fluent.min.css etc.
    // The main build puts themes in `dist/`, docs CSS in `docs/dist/`.
    // For the documentation pages, we should probably link to the main `dist/` files.
    // Let's assume the stylesheet link in _layout.pug will be updated to point to `../dist/spectre.min.css` (or similar)
    // from a page like `docs/getting-started/custom.html`.

    let cssPath = `../dist/${themeName}.min.css`; // Path relative to HTML files in subdirectories of /docs

    // If the current page is index.html at the root of /docs, the path is different
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/docs/' || window.location.pathname === '/docs') {
        // This check might need refinement based on actual deployment structure
        // For now, let's assume a flat structure for simplicity or that paths are handled by a base tag.
        // Given the existing docs link to 'dist/spectre.min.css', it implies docs pages are at root or paths are relative.
        // The actual link in docs/_layout/_layout.pug is <link rel="stylesheet" href="dist/spectre.min.css">
        // This is problematic for nested pages. This should be `../dist/spectre.min.css` for pages in subdirs,
        // or `/dist/spectre.min.css` if served from a webserver root.
        // Let's assume the link will be like `../dist/spectre.min.css` for pages like `docs/getting-started/custom.html`
        // and `dist/spectre.min.css` for `docs/index.html`.
        // The most robust way is to calculate path based on current page depth.
        // Or, simpler: ensure the link in the pug file uses a path relative from root like `/dist/` if possible.
        // For now, I'll use a path that works if the JS can get the base path of the current stylesheet.

    const currentStylesheetPath = themeStylesheet.getAttribute('href');
    const pathParts = currentStylesheetPath.split('/');
    pathParts.pop(); // Remove the old filename
    cssPath = pathParts.join('/') + `/${themeName}.min.css`;

    themeStylesheet.setAttribute('href', cssPath);
    if (themeSwitcher) {
        themeSwitcher.value = themeName;
    }
    localStorage.setItem('spectre-theme', themeName);
    console.log(`Applied theme: ${themeName}, path: ${cssPath}`);
  }
  }
  if (themeSwitcher) {
    themeSwitcher.addEventListener('change', function () {
      applyTheme(this.value);
    });
  }

  // Apply stored theme on page load
  if (storedTheme) {
    applyTheme(storedTheme);
  } else {
    // Ensure default is set if no stored theme (or if stored theme is invalid)
    // This will also set the dropdown correctly if it was on a non-default value
    // and then local storage was cleared.
    if (themeSwitcher && themeSwitcher.value !== 'spectre') {
       applyTheme('spectre'); // Default to spectre
    } else if (!themeSwitcher) {
        // If no switcher on page, but we have a stylesheet link, ensure it's set to default or stored.
        // This case is less likely if the script is loaded only on pages with the switcher.
         applyTheme(storedTheme || 'spectre');
    }
  }
});
