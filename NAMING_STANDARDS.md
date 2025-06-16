# Naming Standards

This document outlines the naming conventions to be followed for SCSS/CSS files, class names, variables, and mixins within this project. Adhering to these standards is crucial for maintaining a clean, readable, and maintainable codebase.

## File Naming Conventions

### SCSS Partials

Files intended for import (partials) within the `src/` directory and its subdirectories (e.g., `src/icons/`) **must** start with an underscore (`_`).

*   Example: `_buttons.scss`
*   Example: `src/icons/_icons-core.scss`

### Main SCSS Files

Main SCSS files that bundle partials and are intended for direct compilation **should not** start with an underscore.

*   Example: `spectre.scss`

### General Case (SCSS Filenames)

All SCSS filenames in the `src/` directory and its subdirectories **must** use `kebab-case` (lowercase with words separated by hyphens).

*   Example: `_cards.scss`
*   Example: `spectre-exp.scss`
*   Example: `_variables.scss`
*   Example: `_mixins.scss`

## SCSS/CSS Naming Conventions

### General Case

CSS class names, SCSS variable names, and SCSS mixin names **should** use `kebab-case`.

### CSS Classes

#### Base Components

Component names form the base of their primary class name.

*   Example: `.btn` (for buttons)
*   Example: `.card` (for cards)
*   Example: `.menu` (for menus)

#### Component Sub-elements

Classes for sub-elements or distinct sections within a component **should** use the base component name followed by a hyphen and the sub-element's name.

*   Example: `.card-header`
*   Example: `.card-body`
*   Example: `.menu-item`

#### Component Modifiers

Modifier classes that alter the style or behavior of a base component **should** also use the base component name followed by a hyphen and the modifier's name.

*   Example: `.btn-primary`
*   Example: `.btn-sm`
*   Example: `.table-striped`
*   Example: `.modal-lg`

The `.primary` suffix (e.g., `.btn-primary`) is used to denote the main or default style for a component, often tied to the project's primary theme color.

#### Layout and Grid

*   The class `.container` is used as a top-level wrapper for page content, managing width and padding. It can be modified with grid-specific size classes like `.grid-xl`, `.grid-lg`, etc.
*   Grid systems use classes like `.columns` (or `.cols`) for flex containers and `.column` (or `.col-<size>`, e.g., `.col-6`, `.col-gapless`) for grid items.
*   Responsive utility classes for showing/hiding elements at different breakpoints use prefixes like `show-` and `hide-` followed by the breakpoint size (e.g., `.show-lg`, `.hide-sm`).

### SCSS Variables

*   All variables **must** start with a `$` prefix.
    *   Example: `$primary-color`
    *   Example: `$border-radius`
*   It's good practice to include the property type or context in the variable name for clarity.
    *   Example: `$bg-color-light`
    *   Example: `$font-size-sm`
    *   Example: `$control-padding-x`

### SCSS Mixins

*   Mixin names **should** be in `kebab-case`.
    *   Example: `@mixin button-variant($color)`
    *   Example: `@mixin control-shadow()`
*   If a mixin is general purpose, its name should reflect its action (e.g., `clearfix`). If it's for a specific component, it can be prefixed with the component name (e.g., `button-variant`).

## General Best Practices

*   **Consistency:** Adhere to these naming conventions strictly to maintain readability and predictability across the codebase.
*   **Clarity:** Choose names that are descriptive and easy to understand. Avoid overly generic or excessively abbreviated names.
*   **Lowercase:** All SCSS filenames, class names, variable names, and mixin names should be in lowercase (enforced by `kebab-case`).
