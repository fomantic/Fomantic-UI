# v3.0 Road Map

If you want to find out more about v3 we recommend you read the following issues
 - [The future of FUI in 2019 and v3.0](https://github.com/fomantic/Fomantic-UI/issues/319)
 - [v3 theming proposal](https://github.com/fomantic/Fomantic-UI/issues/441)
 - [The discussion of jQuery & it's relevance to v3](https://github.com/fomantic/Fomantic-UI/issues/374)

> NOTE: Not all of these features/changes will be shipped with v3 but are on our roadmap unless specified otherwise.

---

### Key:

| Key |                                                            |
|-----|------------------------------------------------------------|
| 💡  | Proposal                                                   |
| ✏  | In planning/prototyping phase                              |
| 🛠  | Currently being implemented                                |
| 🚫  | Blocked (progress can't continue until something is done) |
| ✅  | Implemented and ready to ship                             |
| ❌  | Canceled                                                  |
| 🛳  | Will ship with initial v3 release                          |

---

### Major Changes:

- New documentation website ✏🛳
- New build system ✏🛳
- Visual component tests ✏
- CI/CD process ✏
- Rewrite modules into ES6 with classes ✏🛳
- Move to a [monorepo](https://en.wikipedia.org/wiki/Monorepo) with separate packages ✏🛳
- CLI tool ✏
- Theme builder website 💡
- Theme/plugin package sharing website 💡
- Changing icon implementation from class based to HTML attribute based (`data-icon="user"`) ✏🛳
- Theming implementation rewrite (behaviour will stay the same) ✏🛳
- Move from LESS to SASS ✏🛳
- v3 to v2 JavaScript polyfill package 💡
- Browser support for all major browsers and IE11 ✏
- Move SASS variables to CSS variables so they can be easily changed without compiling.

### Library Implementations:

This is a list of libraries we are wanting and proposing to create implementations for.

- DOM (Standard JavaScript DOM) 🛳
- React 🛳
- Vue 🛳
- Angular 💡
- Meteor 💡
- Stencil 💡
- Mithril 💡
- Web Components (Shadow DOM) 💡

### New Components:

This is a list of components which will be added or are proposed to be added.

- DataTable 💡
  - Sorting
  - Filtering
  - Pagination
  - Search
- Utility helpers (these will work on any component) ✏
  - Margin (top, right, bottom, left)
  - Padding (top, right, bottom, left)
  - Visibility modifiers
    - `only show on x`
    - `only show on x and y`
    - `dont show on x`
    - `dont show on x or y`
- Carousel 💡🛳
- Grid (rewrite grid with CSS Grid) ✏
- More colors (tones, shades, gradients?) 💡
- File Upload (Dropzone and standard input) ✏🛳
- Color Picker 💡
- Statistics Donuts 💡
- Input Masks ✏
- Draggable  💡
- Sheets (left, right, bottom) 💡
- Toast (reimplement) ✏
- Timeline 💡

---

> If you think anything is missing please open a pull request and add it.
