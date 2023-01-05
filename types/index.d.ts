/// <reference types="jquery" />

/// <reference path="flyout.d.ts" />
/// <reference path="rating.d.ts" />
/// <reference path="slider.d.ts" />

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
    flyout: FomanticUI.Flyout;
    rating: FomanticUI.Rating;
    slider: FomanticUI.Slider;
}
