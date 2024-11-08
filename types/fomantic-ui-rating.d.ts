declare namespace FomanticUI {
    interface Rating {
        settings: RatingSettings;

        /**
         * Sets rating programmatically.
         */
        (behavior: 'set rating', rating: number): JQuery;

        /**
         * Gets current rating.
         */
        (behavior: 'get rating'): number;

        /**
         * Disables interactive rating mode.
         */
        (behavior: 'disable'): JQuery;

        /**
         * Enables interactive rating mode.
         */
        (behavior: 'enable'): JQuery;

        /**
         * Clears current rating.
         */
        (behavior: 'clear rating'): JQuery;

        (behavior: 'destroy'): JQuery;
        <K extends keyof RatingSettings>(behavior: 'setting', name: K, value?: undefined,): Partial<Pick<RatingSettings, keyof RatingSettings>>;
        <K extends keyof RatingSettings>(behavior: 'setting', name: K, value: RatingSettings[K]): JQuery;
        (behavior: 'setting', value: Partial<Pick<RatingSettings, keyof RatingSettings>>): JQuery;
        (settings?: Partial<Pick<RatingSettings, keyof RatingSettings>>): JQuery;
    }

    /**
     * @see {@link https://fomantic-ui.com/modules/rating.html#/settings}
     */
    interface RatingSettings {
        // region Accordion Settings

        /**
         * The icon classname.
         * @default 'star'
         */
        icon: string;

        /**
         * A number representing the default rating to apply.
         * @default 0
         */
        initialRating: number;

        /**
         * The maximum rating value.
         * @default 4
         */
        maxRating: number;

        /**
         * Whether callbacks like 'onRate' should fire immediately after initializing with the current value.
         * @default false
         */
        fireOnInit: boolean;

        /**
         * By default a rating will be only clearable if there is 1 icon.
         * Setting to 'true'/'false' will allow or disallow a user to clear their rating.
         * @default 'auto'
         */
        clearable: 'auto' | boolean;

        /**
         * Whether to enable user's ability to rate.
         * @default true
         */
        interactive: boolean;

        // endregion

        // region Callbacks

        /**
         * Is called after user selects a new rating.
         */
        onRate(this: JQuery, value: number): void;

        // endregion

        // region DOM Settings

        /**
         * DOM Selectors used internally.
         * Selectors used to find parts of a module.
         */
        selector: Rating.SelectorSettings;

        /**
         * Class names used to determine element state.
         */
        className: Rating.ClassNameSettings;

        // endregion

        // region Debug Settings

        /**
         * Name used in log statements
         * @default 'Rating'
         */
        name: string;

        /**
         * Event namespace. Makes sure module teardown does not effect other events attached to an element.
         * @default 'rating'
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

        error: Rating.ErrorSettings;

        // endregion
    }

    namespace Rating {
        type SelectorSettings = Partial<Pick<Settings.Selectors, keyof Settings.Selectors>>;
        type ClassNameSettings = Partial<Pick<Settings.ClassNames, keyof Settings.ClassNames>>;
        type ErrorSettings = Partial<Pick<Settings.Errors, keyof Settings.Errors>>;

        namespace Settings {
            interface Selectors {
                /**
                 * @default '.icon'
                 */
                icon: string;
            }

            interface ClassNames {
                /**
                 * @default 'active'
                 */
                active: string;

                /**
                 * @default 'hover'
                 */
                hover: string;

                /**
                 * @default 'loading'
                 */
                loading: string;
            }

            interface Errors {
                /**
                 * @default 'You called a rating action that was not defined'
                 */
                action: string;
            }
        }
    }
}
