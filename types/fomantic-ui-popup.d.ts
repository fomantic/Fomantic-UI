declare namespace FomanticUI {
    interface Popup {
        settings: PopupSettings;

        /**
         * Shows popup.
         */
        (behavior: 'show'): JQuery;

        /**
         * Hides popup.
         */
        (behavior: 'hide'): JQuery;

        /**
         * Hides all visible pop ups on the page.
         */
        (behavior: 'hide all'): JQuery;

        /**
         * Returns current popup dom element.
         */
        (behavior: 'get popup'): JQuery;

        /**
         * Changes current popup content.
         */
        (behavior: 'change content', html: string): JQuery;

        /**
         * Toggles visibility of popup.
         */
        (behavior: 'toggle'): JQuery;

        /**
         * Returns whether popup is visible.
         */
        (behavior: 'is visible'): boolean;

        /**
         * Returns whether popup is hidden.
         */
        (behavior: 'is hidden'): boolean;

        /**
         * Returns whether popup is created and inserted into the page.
         */
        (behavior: 'exists'): boolean;

        /**
         * Adjusts popup when content size changes (only necessary for centered popups).
         */
        (behavior: 'reposition'): JQuery;

        /**
         * Repositions a popup.
         */
        (behavior: 'set position', position: number): JQuery;

        /**
         * Removes popup from the page.
         */
        (behavior: 'remove popup'): JQuery;

        /**
         * Removes popup from the page and removes all events.
         */
        (behavior: 'destroy'): JQuery;

        <K extends keyof PopupSettings>(behavior: 'setting', name: K, value?: undefined,): Partial<Pick<PopupSettings, keyof PopupSettings>>;
        <K extends keyof PopupSettings>(behavior: 'setting', name: K, value: PopupSettings[K]): JQuery;
        (behavior: 'setting', value: Partial<Pick<PopupSettings, keyof PopupSettings>>): JQuery;
        (settings?: Partial<Pick<PopupSettings, keyof PopupSettings>>): JQuery;
    }

    /**
     * @see {@link https://fomantic-ui.com/modules/popup.html#/settings}
     */
    interface PopupSettings {
        // region Popup Settings

        /**
         * Can specify a DOM element that should be used as the popup.
         * This is useful for including a pre-formatted popup.
         * @default false
         */
        popup: false | string | JQuery;

        /**
         * Whether all other popups should be hidden when this popup is opened.
         * @default false
         */
        exclusive: boolean;

        /**
         * Whether to move popup to same offset container as target element when popup already exists on the page.
         * Using a popup inside of an element without 'overflow:visible', like a sidebar, may require you to set this to 'false'.
         * @default true
         */
        movePopup: boolean;

        /**
         * Whether popup should attach 'mutationObservers' to automatically run destroy when the element is removed from the page's DOM.
         * @default true
         */
        observeChanges: boolean;

        /**
         * When the popup surpasses the boundary of this element, it will attempt to find another display position.
         * @default window
         */
        boundary: Window | string;

        /**
         * Selector or jquery object specifying where the popup should be created.
         * @default 'body'
         */
        context: string | JQuery;

        /**
         * Will automatically hide a popup on scroll event in this context.
         * @default window
         */
        scrollContext: Window | string;

        /**
         * Number of pixels that a popup is allowed to appear outside the boundaries of its context.
         * This allows for permissible rounding errors when an element is against the edge of its 'context'.
         * @default 2
         */
        jitter: number;

        /**
         * Position that the popup should appear.
         * @default 'top left'
         */
        position: string;

        /**
         * If given position should be used, regardless if popup fits.
         * @default false
         */
        forcePosition: boolean;

        /**
         * If a popup is inline it will be created next to current element, allowing for local css rules to apply.
         * It will not be removed from the DOM after being hidden.
         * Otherwise popups will appended to body and removed after being hidden.
         * @default false
         */
        inline: boolean;

        /**
         * Whether popup contents should be preserved in the page after being hidden, allowing it to re-appear slightly faster on subsequent loads.
         * @default false
         */
        preserve: boolean;

        /**
         * Can be set to 'adjacent' or 'opposite' to prefer adjacent or opposite position if popup cannot fit on screen.
         * @default 'opposite'
         */
        prefer: 'opposite' | 'adjacent';

        /**
         * When set to 'false', a popup will not appear and produce an error message if it cannot entirely fit on page.
         * Setting this to a position like, 'right center' forces the popup to use this position as a last resort even if it is partially offstage.
         * Setting this to 'true' will use the last attempted position.
         * @default false
         */
        lastResort: boolean | string;

        /**
         * Event used to trigger popup.
         * Can be either 'focus', 'click', 'hover', or 'manual'.
         * Manual popups must be triggered with '$('.element').popup('show');'.
         * @default 'hover'
         */
        on: 'hover' | 'focus' | 'click' | 'manual';

        /**
         * Delay in milliseconds before showing or hiding a popup on hover or focus.
         * @default {}
         */
        delay: object; // TODO

        /**
         * Named transition to use when animating menu in and out.
         * Alternatively you can provide an object to set individual values for hide/show transitions as well as hide/show duration.
         * @default 'scale'
         */
        transition: string | Popup.TransitionSettings;

        /**
         * Duration of animation events.
         * The value will be ignored when individual hide/show duration values are provided via the 'transition' setting.
         * @default 200
         */
        duration: number;

        /**
         * When a target element is less than 2x this amount, the popup will appear with the arrow centered on the target element, instead of with the popup edge matching the target's edge.
         * @default 20
         */
        arrowPixelsFromEdge: number;

        /**
         * Whether popup should set fluid popup variation width on load to avoid 'width: 100%' including padding.
         * @default true
         */
        setFluidWidth: boolean;

        /**
         * Whether popup should not close on hover (useful for popup navigation menus).
         * @default false
         */
        hoverable: boolean;

        /**
         * Whether popup should hide when clicking on the page, 'auto' only hides for popups without on: 'hover'.
         * @default true
         */
        closable: boolean | 'auto';

        /**
         * When using on: 'hover' whether 'touchstart' events should be added to allow the popup to be triggered.
         * @default true
         */
        addTouchEvents: boolean;

        /**
         * Whether popup should hide on scroll or touchmove, 'auto' only hides for popups without on: 'click'.
         * Set this to 'false' to prevent mobile browsers from closing popups when you tap inside input fields.
         * @default 'auto'
         */
        hideOnScroll: 'auto' | boolean;

        /**
         * If a selector or jQuery object is specified this allows the popup to be positioned relative to that element.
         * @default false
         */
        target: false | string | JQuery;

        /**
         * Offset for distance of popup from element.
         * @default 0
         */
        distanceAway: number;

        /**
         * Offset in pixels from calculated position.
         * @default 0
         */
        offset: number;

        /**
         * Number of iterations before giving up search for popup position when a popup cannot fit on screen.
         * @default 15
         */
        maxSearchDepth: number;

        // endregion

        // region Callbacks

        /**
         * Callback on popup element creation, with created popup.
         */
        onCreate(this: JQuery, element?: JQuery<HTMLElement>): void;

        /**
         * Callback immediately before Popup is removed from DOM.
         */
        onRemove(this: JQuery, element?: JQuery<HTMLElement>): void;

        /**
         * Callback before popup is shown.
         * Returning 'false' from this callback will cancel the popup from showing.
         */
        onShow(this: JQuery, element?: JQuery<HTMLElement>): any;

        /**
         * Callback after popup is shown.
         */
        onVisible(this: JQuery, element?: JQuery<HTMLElement>): void;

        /**
         * Callback before popup is hidden.
         * Returning 'false' from this callback will cancel the popup from hiding.
         */
        onHide(this: JQuery, element?: JQuery<HTMLElement>): any;

        /**
         * Callback after popup is hidden.
         */
        onHidden(this: JQuery, element?: JQuery<HTMLElement>): void;

        /**
         * Callback after popup cannot be placed on screen.
         */
        onUnplaceable(this: JQuery, element?: JQuery<HTMLElement>): void;

        // endregion

        // region Content Settings

        /**
         * Popup variation to use, can use multiple variations with a space delimiter.
         */
        variation: string;

        /**
         * Content to display.
         */
        content: string;

        /**
         * Title to display alongside content.
         */
        title: string;

        /**
         * HTML content to display instead of preformatted title and content.
         */
        html: string;

        // endregion

        // region DOM Settings

        /**
         * DOM Selectors used internally.
         * Selectors used to find parts of a module.
         */
        selector: Popup.SelectorSettings;

        /**
         * Class names used to determine element state.
         */
        metadata: Popup.MetadataSettings;

        /**
         * Class names used to determine element state.
         */
        className: Popup.ClassNameSettings;

        // endregion

        // region Debug Settings

        /**
         * Name used in log statements
         * @default 'Popup'
         */
        name: string;

        /**
         * Event namespace. Makes sure module teardown does not effect other events attached to an element.
         * @default 'popup'
         */
        namespace: string;

        /**
         * Silences all console output including error messages, regardless of other debug settings.
         * @default false
         */
        silent: boolean;

        /**
         * Debug output to console
         * @default false
         */
        debug: boolean;

        /**
         * Show console.table output with performance metrics
         * @default true
         */
        performance: boolean;

        /**
         * Debug output includes all internal behaviors
         * @default false
         */
        verbose: boolean;

        error: Popup.ErrorSettings;

        // endregion
    }

    namespace Popup {
        type TransitionSettings = Partial<Pick<Settings.Transition, keyof Settings.Transition>>;
        type SelectorSettings = Partial<Pick<Settings.Selectors, keyof Settings.Selectors>>;
        type MetadataSettings = Partial<Pick<Settings.Metadatas, keyof Settings.Metadatas>>;
        type ClassNameSettings = Partial<Pick<Settings.ClassNames, keyof Settings.ClassNames>>;
        type ErrorSettings = Partial<Pick<Settings.Errors, keyof Settings.Errors>>;

        namespace Settings {
            interface Transition {

                /**
                 * Named animation show event to used.
                 * Must be defined in CSS.
                 */
                showMethod: string;

                /**
                 * Duration of the CSS show transition animation
                 */
                showDuration: number;

                /**
                 * Named animation hide event to used.
                 * Must be defined in CSS.
                 */
                hideMethod: string;

                /**
                 * Duration of the CSS hide transition animation
                 */
                hideDuration: number;
            }

            interface Selectors {
                /**
                 * @default '.ui.popup'
                 */
                popup: string;
            }

            interface Metadatas {
                /**
                 * @default 'activator'
                 */
                activator: string;

                /**
                 * @default 'content'
                 */
                content: string;

                /**
                 * @default 'html'
                 */
                html: string;

                /**
                 * @default 'offset'
                 */
                offset: string;

                /**
                 * @default 'position'
                 */
                position: string;

                /**
                 * @default 'title'
                 */
                title: string;

                /**
                 * @default 'variation'
                 */
                variation: string;
            }

            interface ClassNames {
                /**
                 * @default 'active'
                 */
                active: string;

                /**
                 * @default 'basic'
                 */
                basic: string;

                /**
                 * @default 'animating'
                 */
                animating: string;

                /**
                 * @default 'dropdown'
                 */
                dropdown: string;

                /**
                 * @default 'fluid'
                 */
                fluid: string;

                /**
                 * @default 'loading'
                 */
                loading: string;

                /**
                 * @default 'ui popup'
                 */
                popup: string;

                /**
                 * @default 'top left center bottom right'
                 */
                position: string;

                /**
                 * @default 'visible'
                 */
                visible: string;

                /**
                 * @default 'visible'
                 */
                popupVisible: string;
            }

            interface Errors {
                /**
                 * @default 'The position you specified is not a valid position'
                 */
                invalidPosition: string;

                /**
                 * @default 'Popup does not fit within the boundaries of the viewport'
                 */
                cannotPlace: string;

                /**
                 * @default 'The method you called is not defined.'
                 */
                method: string;

                /**
                 * @default 'This module requires ui transitions'
                 */
                noTransition: string;

                /**
                 * @default 'The target or popup you specified does not exist on the page'
                 */
                notFound: string;
            }
        }
    }
}
