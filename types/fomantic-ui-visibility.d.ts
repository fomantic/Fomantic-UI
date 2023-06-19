declare namespace FomanticUI {
    interface Visibility {
        settings: VisibilitySettings;

        /**
         * Disable callbacks temporarily.
         * This is useful if you need to adjust scroll position and do not want to trigger callbacks during the position change.
         */
        (behavior: 'disable callbacks'): JQuery;

        /**
         * Re-enable callbacks.
         */
        (behavior: 'enable callbacks'): JQuery;

        /**
         * Returns whether element is on screen.
         */
        (behavior: 'is on screen'): boolean;

        /**
         * Returns whether element is off screen.
         */
        (behavior: 'is off screen'): boolean;

        /**
         * Returns number of pixels passed in current element from top of element.
         */
        (behavior: 'get pixels passed'): number;

        /**
         * Returns element calculations as object.
         */
        (behavior: 'get element calculations'): object;

        /**
         * Returns screen calculations as object.
         */
        (behavior: 'get screen calculations'): object;

        /**
         * Returns screen size as object.
         */
        (behavior: 'get screen size'): object;

        (behavior: 'destroy'): JQuery;
        <K extends keyof VisibilitySettings>(
            behavior: 'setting',
            name: K,
            value?: undefined,
        ): VisibilitySettings._Impl[K];
        <K extends keyof VisibilitySettings>(behavior: 'setting', name: K, value: VisibilitySettings._Impl[K]): JQuery;
        (behavior: 'setting', value: VisibilitySettings): JQuery;
        (settings?: VisibilitySettings): JQuery;
    }

    /**
     * @see {@link https://fomantic-ui.com/behaviors/visibility.html#/settings}
     */
    type VisibilitySettings = VisibilitySettings.Param;

    namespace VisibilitySettings {
        type Param = (
            | Pick<_Impl, 'observeChanges'>
            | Pick<_Impl, 'initialCheck'>
            | Pick<_Impl, 'refreshOnLoad'>
            | Pick<_Impl, 'refreshOnResize'>
            | Pick<_Impl, 'checkOnRefresh'>
            | Pick<_Impl, 'once'>
            | Pick<_Impl, 'continuous'>
            | Pick<_Impl, 'offset'>
            | Pick<_Impl, 'includeMargin'>
            | Pick<_Impl, 'context'>
            | Pick<_Impl, 'throttle'>
            | Pick<_Impl, 'type'>
            | Pick<_Impl, 'zIndex'>
            | Pick<_Impl, 'transition'>
            | Pick<_Impl, 'duration'>
            | Pick<_Impl, 'onOnScreen'>
            | Pick<_Impl, 'onOffScreen'>
            | Pick<_Impl, 'onPassing'>
            | Pick<_Impl, 'onTopVisible'>
            | Pick<_Impl, 'onBottomVisible'>
            | Pick<_Impl, 'onTopPassed'>
            | Pick<_Impl, 'onBottomPassed'>
            | Pick<_Impl, 'onPassingReverse'>
            | Pick<_Impl, 'onTopVisibleReverse'>
            | Pick<_Impl, 'onBottomVisibleReverse'>
            | Pick<_Impl, 'onTopPassedReverse'>
            | Pick<_Impl, 'onBottomPassedReverse'>
            | Pick<_Impl, 'onLoad'>
            | Pick<_Impl, 'onAllLoaded'>
            | Pick<_Impl, 'onFixed'>
            | Pick<_Impl, 'onUnfixed'>
            | Pick<_Impl, 'onUpdate'>
            | Pick<_Impl, 'onRefresh'>
            | Pick<_Impl, 'metadata'>
            | Pick<_Impl, 'className'>
            | Pick<_Impl, 'name'>
            | Pick<_Impl, 'namespace'>
            | Pick<_Impl, 'silent'>
            | Pick<_Impl, 'debug'>
            | Pick<_Impl, 'performance'>
            | Pick<_Impl, 'verbose'>
            | Pick<_Impl, 'error'>
        ) &
            Partial<Pick<_Impl, keyof _Impl>>;

        interface _Impl {
            // region Visibility Settings

            /**
             * When set to 'false' a callback will occur each time an element passes the threshold for a condition.
             * @default true
             */
            once: boolean;

            /**
             * When set to 'true' a callback will occur anytime an element passes a condition not just immediately after the threshold is met.
             * @default false
             */
            continuous: boolean;

            /**
             * Set to 'image' to load images when on screen. Set to 'fixed' to add class name 'fixed' when passed.
             * @default false
             */
            type: false | 'image' | 'fixed';

            /**
             * Whether visibility conditions should be checked immediately on init.
             * @default true
             */
            initialCheck: boolean;

            /**
             * The scroll context visibility should use.
             * @default window
             */
            context: Window | string | JQuery;

            /**
             * Whether visibility conditions should be checked on window load.
             * This ensures that after images load content positions will be updated correctly.
             * @default true
             */
            refreshOnLoad: boolean;

            /**
             * Whether visibility conditions should be checked on window resize.
             * Useful when content resizes causes continuous changes in position.
             * @default true
             */
            refreshOnResize: boolean;

            /**
             * Whether visibility conditions should be checked on calls to refresh.
             * These calls can be triggered from either resize, load or manually calling.
             * @default true
             */
            checkOnRefresh: boolean;

            /**
             * Specify a z-index when using type: 'fixed'.
             * @default 10
             */
            zIndex: number;

            /**
             * Value that context 'scrollTop' should be adjusted in pixels.
             * Useful for making content appear below content fixed to the page.
             * @default 0
             */
            offset: number;

            /**
             * Whether element calculations should include its margin.
             * @default false
             */
            includeMargin: boolean;

            /**
             * When set to an 'integer', scroll position will be debounced using this ms value.
             * 'false' will debounce with requestAnimationFrame.
             * @default false
             */
            throttle: boolean | number;

            /**
             * Whether to automatically refresh content when changes are made to the element's DOM subtree.
             * @default true
             */
            observeChanges: boolean;

            /**
             * When using type: image allows you to specify transition when showing a loaded image.
             * @default false
             */
            transition: false | string;

            /**
             * When using type: image allows you to specify transition duration.
             * @default 1000
             */
            duration: number;

            // endregion

            // region Callbacks

            /**
             * Any part of element is in current scroll viewport.
             */
            onOnScreen(this: JQuery): void;

            /**
             * No part of element is in current scroll viewport.
             */
            onOffScreen(this: JQuery): void;

            /**
             * No part of element is in current scroll viewport.
             */
            onOffScreen(this: JQuery): void;

            /**
             * Element's top edge has passed bottom of screen.
             */
            onTopVisible(this: JQuery): void;

            /**
             * Element's top edge has passed top of the screen.
             */
            onTopPassed(this: JQuery): void;

            /**
             * Element's bottom edge has passed bottom of screen.
             */
            onBottomVisible(this: JQuery): void;

            /**
             * Any part of an element is visible on screen.
             */
            onPassing(this: JQuery): void;

            /**
             * Element's bottom edge has passed top of screen.
             */
            onBottomPassed(this: JQuery): void;

            /**
             * Element's top edge has not passed bottom of screen.
             */
            onTopVisibleReverse(this: JQuery): void;

            /**
             * Element's top edge has not passed top of the screen.
             */
            onTopPassedReverse(this: JQuery): void;

            /**
             * Element's bottom edge has not passed bottom of screen.
             */
            onBottomVisibleReverse(this: JQuery): void;

            /**
             * Element's top has not passed top of screen but bottom has.
             */
            onPassingReverse(this: JQuery): void;

            /**
             * Element's bottom edge has not passed top of screen.
             */
            onBottomPassedReverse(this: JQuery): void;

            /**
             * Occurs after an image has completed loading.
             */
            onLoad(this: JQuery): void;

            /**
             * Occurs after all 'img' initialized at the same time have loaded.
             */
            onAllLoaded(this: JQuery): void;

            /**
             * Occurs after element has been assigned position fixed.
             */
            onFixed(this: JQuery): void;

            /**
             * Occurs after element has been removed from fixed position.
             */
            onUnfixed(this: JQuery): void;

            /**
             * Occurs each time an elements calculations are updated.
             */
            onUpdate(this: JQuery, calculations: object): void;

            /**
             * Occurs whenever element's visibility is refreshed.
             */
            onRefresh(this: JQuery, calculations: object): void;

            // endregion

            // region DOM Settings

            /**
             * Metadata used internally.
             */
            metadata: Visibility.MetadataSettings;

            /**
             * Class names used to determine element state.
             */
            className: Visibility.ClassNameSettings;

            // endregion

            // region Debug Settings

            /**
             * Name used in log statements
             * @default 'Visibility'
             */
            name: string;

            /**
             * Event namespace. Makes sure module teardown does not effect other events attached to an element.
             * @default 'visibility'
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

            error: Visibility.ErrorSettings;

            // endregion
        }

        namespace Visibility {
            type MetadataSettings = MetadataSettings.Param;

            namespace MetadataSettings {
                type Param = Pick<_Impl, 'src'> & Partial<Pick<_Impl, keyof _Impl>>;

                interface _Impl {
                    /**
                     * @default 'src'
                     */
                    src: string;
                }
            }

            type ClassNameSettings = ClassNameSettings.Param;

            namespace ClassNameSettings {
                type Param = (Pick<_Impl, 'fixed'> | Pick<_Impl, 'placeholder'> | Pick<_Impl, 'visible'>) &
                    Partial<Pick<_Impl, keyof _Impl>>;

                interface _Impl {
                    /**
                     * @default 'fixed'
                     */
                    fixed: string;

                    /**
                     * @default 'constraint'
                     */
                    placeholder: string;

                    /**
                     * @default 'visible'
                     */
                    visible: string;
                }
            }

            type ErrorSettings = ErrorSettings.Param;

            namespace ErrorSettings {
                type Param = (Pick<_Impl, 'method'> | Pick<_Impl, 'visible'>) & Partial<Pick<_Impl, keyof _Impl>>;

                interface _Impl {
                    /**
                     * @default 'The method you called is not defined.'
                     */
                    method: string;

                    /**
                     * @default 'Element is hidden, you must call refresh after element becomes visible'
                     */
                    visible: string;
                }
            }
        }
    }
}
