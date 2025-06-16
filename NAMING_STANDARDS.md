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

## Project-Specific Class Suffixes

In addition to the general naming conventions, many CSS classes in this project use suffixes to denote specific variations, states, or structural parts of a base component. A suffix is the part of a class name that follows the last hyphen (e.g., `primary` in `.btn-primary`, `header` in `.card-header`). Understanding these common suffix patterns can help in using and extending the styles effectively.

Below are categories of commonly observed suffixes, with examples:

### Structural Parts
Suffixes that denote a sub-component or distinct section of a larger UI element. These help in styling different parts of a complex component.
*   Examples: `-header`, `-body`, `-footer`, `-item`, `-content`, `-nav`, `-title`, `-subtitle`, `-brand`, `-section`, `-caption`, `-addon` (e.g., `.input-group-addon`), `-sidebar` (e.g., `.off-canvas-sidebar`), `-overlay` (e.g., `.modal-overlay`), `-container` (e.g., `.popover-container`)

### State Modifiers
Suffixes that indicate a specific state or condition of a component, often applied dynamically.
*   Examples: `-error`, `-success`, `-warning`, `-busy`, `-online`, `-indeterminate` (e.g., for checkboxes), `-focused` (e.g., `.is-focused`), `-required`

### Size/Responsive Modifiers
Suffixes used to apply different sizing variations to components or to control visibility/layout across responsive breakpoints.
*   Examples: `-sm` (small), `-md` (medium), `-lg` (large), `-xl` (extra-large), `-xs` (extra-small), `-2x`, `-3x`, `-4x` (multiplier for base size, e.g., for icons), `-360` (e.g., `.viewer-360`)

### Stylistic/Variant Modifiers
Suffixes that apply a specific visual style, theme, or variant to a component, distinguishing it from its default appearance.
*   Examples: `-primary`, `-secondary`, `-link` (e.g., for buttons), `-dark`, `-light`, `-striped` (e.g., for tables), `-rounded` (e.g., for labels or cards), `-cjk`, `-hans`, `-hant`, `-ja`, `-ko` (for language-specific typography)

### Action/Behavioral Modifiers
Suffixes that suggest an action the component performs or a behavior it exhibits.
*   Examples: `-action` (e.g., `.btn-action`), `-toggle` (e.g., `.dropdown-toggle`), `-clear` (e.g., `.btn-clear`), `-next`, `-prev`, `-up`, `-down`, `-left`, `-right`, `-dropdown`, `-slider`, `-scroll`

### Positional/Alignment Utilities
Suffixes found in utility classes to control the positioning, alignment, or display of elements.
*   Examples: `-left` (e.g., `.text-left`, `.float-left`), `-right`, `-top`, `-bottom`, `-center` (e.g., `.text-center`), `-horiz`, `-vert`, `-auto` (e.g., `.ml-auto`), `-block` (e.g., `.d-block`), `-inline` (e.g., `.d-inline`), `-flex` (e.g., `.d-flex`), `-fixed`, `-absolute`, `-relative`, `-sticky`, `-centered`

### Numeric/Grid System
Suffixes that are numeric, commonly used in grid systems for column sizing or for ordered/utility spacing units.
*   Examples: `-1`, `-2`, ... `-12` (e.g., `.col-6`), `-4-3` (e.g., `.video-responsive-4-3`), `-1-1` (e.g., `.video-responsive-1-1`)

### Component-Specific Identifiers
In some cases, a generic base class might be followed by a suffix that is essentially a more specific component or entity name. This is particularly common with icon systems.
*   Examples:
    *   For icons (`.icon-*`): `-arrow-down`, `-edit`, `-mail`, `-plus`, `-search`, `-user`, `-home`
    *   For language utilities (`.lang-*`): `-zh`, `-ja`, `-ko`
    *   For column utilities (`.col-*`): `-gapless`, `-oneline`
    *   For form elements (`.form-*`): `-autocomplete`, `-checkbox`, `-radio`, `-switch`
    *   For specialized components: `-slider` (e.g., `.viewer-slider`), `-image` (e.g., `.viewer-image`), `-before` (e.g., `.comparison-before`), `-after` (e.g., `.comparison-after`), `-label` (e.g., `.comparison-label`), `-resizer` (e.g., `.comparison-resizer`)

### Browser/Vendor Specific
These suffixes are typically related to styling specific parts of browser-native elements or using vendor prefixes. They are generally not intended for manual application to custom components but are part of the low-level styling of default elements.
*   Examples: `-webkit-details-marker`, `-webkit-inner-spin-button`, `-webkit-meter-bar`, `-webkit-progress-bar`, `-webkit-slider-thumb`, `-runnable-track` (for range inputs)

This categorization helps in understanding the purpose of various class suffixes within the project and promotes consistent usage when creating new styles or modifying existing ones.

## General CSS/Sass Naming Patterns & Methodologies

Structured and consistent naming in CSS and Sass is paramount for creating scalable, maintainable, and understandable stylesheets. While this project adheres to specific `kebab-case` conventions (detailed elsewhere in this document), familiarity with broader naming methodologies can provide valuable context, improve collaboration, and inspire solutions for complex styling challenges.

### General Principles

Regardless of the specific methodology, some core principles underpin effective CSS naming:

*   **Clarity and Readability:** Class names should be intuitive, making it easy to understand their purpose and relationship to HTML structure or component function. Avoid overly cryptic or abbreviated names.
*   **Consistency:** Adhering strictly to the chosen naming convention (and the project's specific rules) across the entire codebase is crucial for predictability and ease of maintenance.
*   **Specificity Management:** Aim for selectors that are specific enough to reliably target the intended elements without being overly specific. High specificity can lead to difficulties in overriding styles and increases the risk of style conflicts. Strive for a balance that ensures reusability.
*   **Separation of Concerns:** Where possible, distinguish between classes that define structure (layout), skin (visual appearance like colors, borders, fonts), and behavior (JavaScript hooks, states). While this project is primarily class-based for styling, this conceptual separation is beneficial.

### Common Naming Methodologies

Several methodologies have been developed by the community to address the challenges of CSS at scale. Here's a brief overview:

*   **BEM (Block, Element, Modifier):**
    *   **Structure:** `block__element--modifier`
        *   `block`: A standalone entity that is meaningful on its own (e.g., a card, button, menu).
        *   `element`: A part of a block that has no standalone meaning and is semantically tied to its block (e.g., card header, menu item). Denoted by double underscores (`__`).
        *   `modifier`: A flag on a block or element used to change appearance, behavior, or state (e.g., a large button, a primary button). Denoted by double hyphens (`--`).
    *   **Examples:** `.card`, `.card__header`, `.card__header--large`, `.button`, `.button--primary`, `.menu__item--disabled`.
    *   **Benefits:** BEM promotes modularity, creates a clear relationship between CSS and HTML structure, and helps avoid style collisions due to its explicit naming.

*   **SMACSS (Scalable and Modular Architecture for CSS):**
    *   **Concept:** SMACSS is less a strict naming convention and more a methodology for categorizing CSS rules to structure a project.
    *   **Categories:**
        *   **Base:** Default styles for HTML elements (e.g., `body`, `a`, `input`).
        *   **Layout:** Classes that divide the page into major sections (e.g., `.l-grid`, `.l-sidebar`). Often prefixed with `l-`.
        *   **Module:** Reusable, modular parts of the design (e.g., `.card`, `.profile-box`, `.nav`).
        *   **State:** Classes that describe how modules or layouts look in a particular state (e.g., `.is-active`, `.is-hidden`, `.has-error`). Often prefixed with `is-` or `has-`.
        *   **Theme:** Styles that define the visual appearance (skin) of modules or layouts, allowing for different themes.
    *   **Influence on Naming:** Naming often reflects the category, such as using prefixes for layout (`.l-`) or state (`.is-`).

*   **OOCSS (Object-Oriented CSS):**
    *   **Principles:** OOCSS focuses on treating page elements as "objects" and encourages two main principles:
        1.  **Separation of Structure from Skin:** Structure (e.g., width, padding, layout) should be defined separately from skin (e.g., colors, fonts, borders), allowing skins to be mixed and matched with different structures.
        2.  **Separation of Container from Content:** Child elements should not be styled based on their specific container, promoting reusability of modules in different contexts.
    *   **Example:** A `.media` object might define basic layout. `.media-image` and `.media-body` define structural parts. A separate class like `.skin-highlight` or `.border-blue` could apply visual styling.
    *   **Benefits:** Enhances reusability and reduces redundancy.

*   **Utility-First CSS (e.g., Tailwind CSS, Tachyons):**
    *   **Concept:** This approach involves composing interfaces from many small, single-purpose utility classes directly in the HTML. Each class applies a specific, immutable style property (e.g., a specific margin, padding, color, font size).
    *   **Examples:** `.text-center`, `.p-4` (padding of 4 units), `.bg-blue-500` (background color), `.font-bold`, `.flex`, `.items-center`.
    *   **Note:** While this project utilizes some utility classes (e.g., for text alignment, margins, display properties), it is not strictly utility-first. Components are generally styled with dedicated component classes.

### Relation to This Project

This project primarily uses `kebab-case` for its CSS class names, variable names, and mixin names, as documented in the "SCSS/CSS Naming Conventions" section. These conventions establish a clear and consistent pattern for the library.

While the project does not strictly enforce BEM, SMACSS, OOCSS, or a utility-first approach in their entirety, understanding these methodologies provides valuable context:

*   The project's use of base component classes (e.g., `.card`, `.btn`) with hyphenated modifiers (e.g., `.btn-primary`, `.card-header`, `.modal-lg`) shares conceptual similarities with **BEM's** block and modifier concepts and **OOCSS's** principle of skinning, albeit in a simpler, more direct form. For instance, `.btn` is a "block," and `-primary` or `-sm` act as "modifiers." Sub-elements like `.card-header` are akin to BEM "elements" but use a single hyphen.
*   The presence of state-like classes (e.g., `.is-active` used in JavaScript, or functional classes like `.has-error`) aligns with **SMACSS's** state rules.
*   The various utility classes for spacing, display, text manipulation (e.g., `.text-center`, `.d-block`, `.m-1`) are inspired by the ideas popularized by **Utility-First CSS**, offering quick ways to apply common styles.

By understanding these broader patterns, developers can better appreciate the existing structure and make more informed decisions when extending the library or developing new components, ensuring that new styles remain consistent and maintainable.
