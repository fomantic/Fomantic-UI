// Type definitions for fomantic-ui 2.9
// Project: https://github.com/fomantic/Fomantic-UI
// Definitions by: Fomantic Team <https://github.com/fomantic>

/// <reference types="jquery" />

/// <reference path="fomantic-ui-accordion.d.ts" />
/// <reference path="fomantic-ui-api.d.ts" />
/// <reference path="fomantic-ui-calendar.d.ts" />
/// <reference path="fomantic-ui-checkbox.d.ts" />
/// <reference path="fomantic-ui-dimmer.d.ts" />
/// <reference path="fomantic-ui-dimmer.d.ts" />
/// <reference path="fomantic-ui-dropdown.d.ts" />
/// <reference path="fomantic-ui-embed.d.ts" />
/// <reference path="fomantic-ui-flyout.d.ts" />
/// <reference path="fomantic-ui-form.d.ts" />
/// <reference path="fomantic-ui-modal.d.ts" />
/// <reference path="fomantic-ui-nag.d.ts" />
/// <reference path="fomantic-ui-popup.d.ts" />
/// <reference path="fomantic-ui-progress.d.ts" />
/// <reference path="fomantic-ui-rating.d.ts" />
/// <reference path="fomantic-ui-search.d.ts" />
/// <reference path="fomantic-ui-shape.d.ts" />
/// <reference path="fomantic-ui-sidebar.d.ts" />
/// <reference path="fomantic-ui-slider.d.ts" />
/// <reference path="fomantic-ui-sticky.d.ts" />
/// <reference path="fomantic-ui-tab.d.ts" />
/// <reference path="fomantic-ui-toast.d.ts" />
/// <reference path="fomantic-ui-transition.d.ts" />
/// <reference path="fomantic-ui-visibility.d.ts" />

interface JQuery {
    accordion: FomanticUI.Accordion;
    api: FomanticUI.API;
    calendar: FomanticUI.Calendar;
    checkbox: FomanticUI.Checkbox;
    dimmer: FomanticUI.Dimmer;
    dropdown: FomanticUI.Dropdown;
    embed: FomanticUI.Embed;
    flyout: FomanticUI.Flyout;
    form: FomanticUI.Form;
    modal: FomanticUI.Modal;
    nag: FomanticUI.Nag;
    popup: FomanticUI.Popup;
    progress: FomanticUI.Progress;
    rating: FomanticUI.Rating;
    search: FomanticUI.Search;
    shape: FomanticUI.Shape;
    sidebar: FomanticUI.Sidebar;
    slider: FomanticUI.Slider;
    sticky: FomanticUI.Sticky;
    tab: FomanticUI.Tab;
    toast: FomanticUI.Toast;
    transition: FomanticUI.Transition;
    visibility: FomanticUI.Visibility;
}

interface JQueryStatic {
    api: FomanticUI.API;
    flyout: FomanticUI.Flyout;
    modal: FomanticUI.Modal;
    toast: FomanticUI.Toast;
}
