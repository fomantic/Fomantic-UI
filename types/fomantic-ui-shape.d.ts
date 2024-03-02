declare namespace FomanticUI {
    interface Shape {
        settings: ShapeSettings;

        /**
         * Flips the shape upward.
         */
        (behavior: 'flip up'): JQuery;

        /**
         * Flips the shape downward.
         */
        (behavior: 'flip down'): JQuery;

        /**
         * Flips the shape right.
         */
        (behavior: 'flip right'): JQuery;

        /**
         * Flips the shape left.
         */
        (behavior: 'flip left'): JQuery;

        /**
         * Flips the shape over clock-wise.
         */
        (behavior: 'flip over'): JQuery;

        /**
         * Flips the shape over counter-clockwise.
         */
        (behavior: 'flip back'): JQuery;

        /**
         * Set the next side to a specific selector.
         */
        (behavior: 'set next side', selector: string): JQuery;

        /**
         * Returns whether shape is currently animating.
         */
        (behavior: 'is animating'): boolean;

        /**
         * Removes all inline styles.
         */
        (behavior: 'reset'): JQuery;

        /**
         * Queues an animation after current animation.
         */
        (behavior: 'queue', animation: string): JQuery;

        /**
         * Forces a reflow on element.
         */
        (behavior: 'repaint', animation: string): JQuery;

        /**
         * Set the next side to next sibling to active element.
         */
        (behavior: 'set default side'): JQuery;

        /**
         * Sets shape to the content size of the next side.
         */
        (behavior: 'set stage size'): JQuery;

        /**
         * Refreshes the selector cache for element sides.
         */
        (behavior: 'refresh'): JQuery;

        /**
         * Returns translation for next side staged below.
         */
        (behavior: 'get transform down'): object;

        /**
         * Returns translation for next side staged left.
         */
        (behavior: 'get transform left'): object;

        /**
         * Returns translation for next side staged right.
         */
        (behavior: 'get transform right'): object;

        /**
         * Returns translation for next side staged up.
         */
        (behavior: 'get transform up'): object;

        /**
         * Returns translation for next side staged down.
         */
        (behavior: 'get transform down'): object;

        /**
         * Destroys instance and removes all events.
         */
        (behavior: 'destroy'): JQuery;

        <K extends keyof ShapeSettings>(behavior: 'setting', name: K, value?: undefined,): Partial<Pick<ShapeSettings, keyof ShapeSettings>>;
        <K extends keyof ShapeSettings>(behavior: 'setting', name: K, value: ShapeSettings[K]): JQuery;
        (behavior: 'setting', value: Partial<Pick<ShapeSettings, keyof ShapeSettings>>): JQuery;
        (settings?: Partial<Pick<ShapeSettings, keyof ShapeSettings>>): JQuery;
    }

    /**
     * @see {@link https://fomantic-ui.com/modules/shape.html#/settings}
     */
    interface ShapeSettings {
        // region Shape Settings

        /**
         * Duration of side change animation.
         * @default false
         */
        duration: false | string;

        /**
         * Width during animation, can be set to 'auto', 'initial', 'next' or pixel amount.
         * @default 'initial'
         */
        width: 'auto' | 'initial' | 'next' | number;

        /**
         * Height during animation, can be set to 'auto', 'initial', 'next' or pixel amount.
         * @default 'initial'
         */
        height: 'auto' | 'initial' | 'next' | number;

        /**
         * Fudge factor in pixels when swapping from 2d to 3d (can be useful to correct rounding errors).
         * @default 0
         */
        jitter: number;

        /**
         * Allow animation to same side.
         * @default false
         */
        allowRepeats: boolean;

        // endregion

        // region Callbacks

        /**
         * Is called before side change.
         */
        onBeforeChange(this: JQuery): void;

        /**
         * Is called after visible side change.
         */
        onChange(this: JQuery): void;

        // endregion

        // region DOM Settings

        /**
         * DOM Selectors used internally.
         * Selectors used to find parts of a module.
         */
        selector: Shape.SelectorSettings;

        /**
         * Class names used to determine element state.
         */
        className: Shape.ClassNameSettings;

        // endregion

        // region Debug Settings

        /**
         * Name used in log statements
         * @default 'Shape'
         */
        name: string;

        /**
         * Event namespace. Makes sure module teardown does not effect other events attached to an element.
         * @default 'shape'
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

        error: Shape.ErrorSettings;

        // endregion
    }

    namespace Shape {
        type SelectorSettings = Partial<Pick<Settings.Selectors, keyof Settings.Selectors>>;
        type ClassNameSettings = Partial<Pick<Settings.ClassNames, keyof Settings.ClassNames>>;
        type ErrorSettings = Partial<Pick<Settings.Errors, keyof Settings.Errors>>;

        namespace Settings {
            interface Selectors {
                /**
                 * @default '.sides'
                 */
                sides: string;

                /**
                 * @default '.side'
                 */
                side: string;
            }

            interface ClassNames {
                /**
                 * @default 'animating'
                 */
                animating: string;

                /**
                 * @default 'hidden'
                 */
                hidden: string;

                /**
                 * @default 'loading'
                 */
                loading: string;

                /**
                 * @default 'active'
                 */
                active: string;
            }

            interface Errors {
                /**
                 * @default 'You tried to switch to a side that does not exist.'
                 */
                side: string;

                /**
                 * @default 'The method you called is not defined'
                 */
                method: string;
            }
        }
    }
}
