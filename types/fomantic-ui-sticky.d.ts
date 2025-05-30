declare namespace FomanticUI {
    interface Sticky {
        settings: StickySettings;

        (behavior: 'destroy'): JQuery;
        <K extends keyof StickySettings>(behavior: 'setting', name: K, value?: undefined,): Partial<Pick<StickySettings, keyof StickySettings>>;
        <K extends keyof StickySettings>(behavior: 'setting', name: K, value: StickySettings[K]): JQuery;
        (behavior: 'setting', value: Partial<Pick<StickySettings, keyof StickySettings>>): JQuery;
        (settings?: Partial<Pick<StickySettings, keyof StickySettings>>): JQuery;
    }

    /**
     * @see {@link https://fomantic-ui.com/modules/sticky.html#/settings}
     */
    interface StickySettings {
        // region Sticky Settings

        /**
         * Whether element should be "pushed" by the viewport, attaching to the bottom of the screen when scrolling up.
         * @default false
         */
        pushing: boolean;

        /**
         * Sets size of fixed content to match its width before fixing to screen dynamically.
         * This is used because fixed may display block or 100% width content differently than it appears before sticking.
         * @default true
         */
        setSize: boolean;

        /**
         * Sticky container height will only be set if the difference between heights of container and context is larger than this jitter value.
         * @default 5
         */
        jitter: number;

        /**
         * Whether any change in 'context' DOM should automatically refresh cached sticky positions.
         * @default false
         */
        observeChanges: boolean;

        /**
         * Context which sticky element should stick to.
         * @default false
         */
        context: boolean | string;

        /**
         * Context which sticky should attach 'onscroll' events.
         * @default window
         */
        scrollContext: Window | string;

        /**
         * Offset in pixels from the top of the screen when fixing element to viewport.
         * @default 0
         */
        offset: number;

        /**
         * Offset in pixels from the bottom of the screen when fixing element to viewport.
         * @default 0
         */
        bottomOffset: number;

        // endregion

        // region Callbacks

        /**
         * Callback when element is repositioned from layout change.
         */
        onReposition(this: JQuery): void;

        /**
         * Callback when 'requestAnimationFrame' fires from scroll handler.
         */
        onScroll(this: JQuery): void;

        /**
         * Callback when element is fixed to page.
         */
        onStick(this: JQuery): void;

        /**
         * Callback when element is unfixed from page.
         */
        onUnstick(this: JQuery): void;

        /**
         * Callback when element is bound to top of parent container.
         */
        onTop(this: JQuery): void;

        /**
         * Callback when element is bound to bottom of parent container.
         */
        onBottom(this: JQuery): void;

        // endregion

        // region DOM Settings

        /**
         * Class names used to determine element state.
         */
        className: Sticky.ClassNameSettings;

        // endregion

        // region Debug Settings

        /**
         * Name used in log statements
         * @default 'Sticky'
         */
        name: string;

        /**
         * Event namespace. Makes sure module teardown does not effect other events attached to an element.
         * @default 'sticky'
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

        error: Sticky.ErrorSettings;

        // endregion
    }

    namespace Sticky {
        type ClassNameSettings = Partial<Pick<Settings.ClassNames, keyof Settings.ClassNames>>;
        type ErrorSettings = Partial<Pick<Settings.Errors, keyof Settings.Errors>>;

        namespace Settings {
            interface ClassNames {
                /**
                 * @default 'bound'
                 */
                bound: string;

                /**
                 * @default 'fixed'
                 */
                fixed: string;

                /**
                 * @default 'native'
                 */
                supported: string;

                /**
                 * @default 'top'
                 */
                top: string;

                /**
                 * @default 'bottom'
                 */
                bottom: string;
            }

            interface Errors {
                /**
                 * @default 'Sticky element must be inside a relative container'
                 */
                container: string;

                /**
                 * @default 'Element is hidden, you must call refresh after element becomes visible'
                 */
                visible: string;

                /**
                 * @default 'The method you called is not defined.'
                 */
                method: string;

                /**
                 * @default 'Context specified does not exist'
                 */
                invalidContext: string;

                /**
                 * @default 'Sticky element is larger than its container, cannot create sticky.'
                 */
                elementSize: string;
            }
        }
    }
}
