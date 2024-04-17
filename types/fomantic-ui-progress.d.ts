declare namespace FomanticUI {
    interface Progress {
        settings: ProgressSettings;

        /**
         * Sets current percent of progress to value.
         * If using a total will convert from percent to estimated value.
         * 'percent' can be array of percent like '[20,30,50]', comma-separated string like '20,30,50' for `.ui.multiple.progress`.
         */
        (behavior: 'set percent', percent: number | [] | string): JQuery;

        /**
         * Sets progress to specified value.
         * Will automatically calculate percent from total.
         * value can be array of values like '[5,3,10]', comma-separated string like '5,3,10' for `.ui.multiple.progress`.
         */
        (behavior: 'set progress', value: number | [] | string): JQuery;

        /**
         * Increments progress by increment value, if not passed a value will use random amount specified in settings.
         */
        (behavior: 'increment', incrementValue: number): JQuery;

        /**
         * Decrements progress by decrement value, if not passed a value will use random amount specified in settings.
         */
        (behavior: 'decrement', decrementValue: number): JQuery;

        /**
         * Immediately updates progress to value, ignoring progress animation interval delays.
         * 'value' can be array of values like '[5,3,10]', comma-separated string like '5,3,10' for `.ui.multiple.progress`.
         */
        (behavior: 'update progress', value: number | [] | string): JQuery;

        /**
         * Finishes progress and sets loaded to 100%.
         * Set 'keepState' to 'true' (default 'false') to stop the active animation only without setting the progress to 100%.
         */
        (behavior: 'complete', keepState: boolean): JQuery;

        /**
         * Resets progress to zero.
         */
        (behavior: 'reset'): JQuery;

        /**
         * Set total to a new value.
         */
        (behavior: 'set total', total: number): JQuery;

        /**
         * Replaces templated string with value, total, percent left and percent.
         */
        (behavior: 'get text', text: string): JQuery;

        /**
         * Returns normalized value inside acceptable range specified by total.
         */
        (behavior: 'get normalized value', value: number): JQuery;

        /**
         * Returns percent as last specified.
         */
        (behavior: 'get percent'): number;

        /**
         * Returns current progress value.
         */
        (behavior: 'get value'): number;

        /**
         * Returns total.
         */
        (behavior: 'get total'): number;

        /**
         * Returns whether progress is completed.
         */
        (behavior: 'is complete'): boolean;

        /**
         * Returns whether progress was a success.
         */
        (behavior: 'is success'): boolean;

        /**
         * Returns whether progress is in warning state.
         */
        (behavior: 'is warning'): boolean;

        /**
         * Returns whether progress is in error state.
         */
        (behavior: 'is error'): boolean;

        /**
         * Returns whether progress is in active state.
         */
        (behavior: 'is active'): boolean;

        /**
         * Sets progress to active state.
         */
        (behavior: 'set active'): JQuery;

        /**
         * Sets progress to warning state. Set 'keepState' to 'true' (default 'false') to keep the progressbar state and the current percentage without raising it up to 100%.
         */
        (behavior: 'set warning', text: string, keepState: boolean): JQuery;

        /**
         * Sets progress to success state. Set 'keepState' to 'true' (default 'false') to keep the progressbar state and the current percentage without raising it up to 100%.
         */
        (behavior: 'set success', text: string, keepState: boolean): JQuery;

        /**
         * Sets progress to error state. Set 'keepState' to 'true' (default 'false') to keep the progressbar state and the current percentage without raising it up to 100%.
         */
        (behavior: 'set error', text: string, keepState: boolean): JQuery;

        /**
         * Changes progress animation speed.
         */
        (behavior: 'set duration', value: number): JQuery;

        /**
         * Sets progress exterior label to text.
         */
        (behavior: 'set label', text: string): JQuery;

        /**
         * Sets progress bar label to text.
         */
        (behavior: 'set bar label', text: string): JQuery;

        /**
         * Removes progress to active state.
         */
        (behavior: 'remove active'): JQuery;

        /**
         * Removes progress to warning state.
         */
        (behavior: 'remove warning'): JQuery;

        /**
         * Removes progress to success state.
         */
        (behavior: 'remove success'): JQuery;

        /**
         * Removes progress to error state.
         */
        (behavior: 'remove error'): JQuery;

        /**
         * Destroys instance and removes all events.
         */
        (behavior: 'destroy'): JQuery;

        <K extends keyof ProgressSettings>(behavior: 'setting', name: K, value?: undefined,): Partial<Pick<ProgressSettings, keyof ProgressSettings>>;
        <K extends keyof ProgressSettings>(behavior: 'setting', name: K, value: ProgressSettings[K]): JQuery;
        (behavior: 'setting', value: Partial<Pick<ProgressSettings, keyof ProgressSettings>>): JQuery;
        (settings?: Partial<Pick<ProgressSettings, keyof ProgressSettings>>): JQuery;
    }

    /**
     * @see {@link https://fomantic-ui.com/modules/progress.html#/settings}
     */
    interface ProgressSettings {
        // region Progress Settings

        /**
         * Whether success state should automatically trigger when progress completes.
         * @default true
         */
        autoSuccess: boolean;

        /**
         * Whether progress should automatically show activity when incremented.
         * @default true
         */
        showActivity: boolean;

        /**
         * When set to 'true', values that calculate to above 100% or below 0% will be adjusted.
         * When set to 'false', inappropriate values will produce an error.
         * @default true
         */
        limitValues: boolean;

        /**
         * Can be set to either to display progress as 'percent' or 'ratio'.
         * Matches up to corresponding text template with the same name.
         * @default 'percent'
         */
        label: 'percent' | 'ratio';

        /**
         * When incrementing without value, sets range for random increment value.
         * @default {}
         */
        random: object;

        /**
         * Decimal point precision for calculated progress.
         * @default 0
         */
        precision: number;

        /**
         * Sets current overall percent.
         * @default false
         */
        percent: false | number;

        /**
         * Setting a total value will make each call to increment get closer to this total (i.e. 1/20, 2/20 etc).
         * @default false
         */
        total: false | number;

        /**
         * Sets current value, when total is specified, this is used to calculate a ratio of the total, with percent this should be the overall percent.
         * @default false
         */
        value: false | number;

        // endregion

        // region Callbacks

        /**
         * Callback on percentage change.
         */
        onChange(this: JQuery, percent: number, value: number, total: number): void;

        /**
         * Callback on success state.
         */
        onSuccess(this: JQuery, total: number): void;

        /**
         * Callback on active state.
         */
        onActive(this: JQuery, value: number, total: number): void;

        /**
         * Callback on error state.
         */
        onError(this: JQuery, value: number, total: number): void;

        /**
         * Callback on warning state.
         */
        onWarning(this: JQuery, value: number, total: number): void;

        // endregion

        // region DOM Settings

        /**
         * DOM Selectors used internally.
         * Selectors used to find parts of a module.
         */
        selector: Progress.SelectorSettings;

        /**
         * Class names used to determine element state.
         */
        className: Progress.ClassNameSettings;

        /**
         *
         */
        text: Progress.TextSettings;

        /**
         * Regular expressions used by module
         */
        regExp: Progress.RegExpSettings;

        /**
         * Regular expressions used by module
         */
        metadata: Progress.MetadataSettings;

        // endregion

        // region Debug Settings

        /**
         * Name used in log statements
         * @default 'Progress'
         */
        name: string;

        /**
         * Event namespace. Makes sure module teardown does not effect other events attached to an element.
         * @default 'progress'
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

        error: Progress.ErrorSettings;

        // endregion
    }

    namespace Progress {
        type SelectorSettings = Partial<Pick<Settings.Selectors, keyof Settings.Selectors>>;
        type ClassNameSettings = Partial<Pick<Settings.ClassNames, keyof Settings.ClassNames>>;
        type TextSettings = Partial<Pick<Settings.Texts, keyof Settings.Texts>>;
        type RegExpSettings = Partial<Pick<Settings.RegExps, keyof Settings.RegExps>>;
        type MetadataSettings = Partial<Pick<Settings.Metadatas, keyof Settings.Metadatas>>;
        type ErrorSettings = Partial<Pick<Settings.Errors, keyof Settings.Errors>>;

        namespace Settings {
            interface Selectors {
                /**
                 * @default '> .bar'
                 */
                bar: string;

                /**
                 * @default '> .label'
                 */
                label: string;

                /**
                 * @default '.bar > .progress'
                 */
                progress: string;
            }

            interface ClassNames {
                /**
                 * @default 'active'
                 */
                active: string;

                /**
                 * @default 'error'
                 */
                error: string;

                /**
                 * @default 'success'
                 */
                success: string;

                /**
                 * @default 'warning'
                 */
                warning: string;
            }

            interface Texts {
                /**
                 * @default false
                 */
                active: boolean | string;

                /**
                 * @default false
                 */
                error: boolean | string;

                /**
                 * @default false
                 */
                success: boolean | string;

                /**
                 * @default false
                 */
                warning: boolean | string;

                /**
                 * @default '{percent}%''
                 */
                percent: string;

                /**
                 * @default '{value} of {total}'
                 */
                ratio: string;

                /**
                 * @default []
                 */
                bars: string[];
            }

            interface RegExps {
                /**
                 * @default /\{\$*[A-z0-9]+\}/g
                 */
                variable: RegExp;
            }

            interface Metadatas {
                /**
                 * @default 'percent'
                 */
                percent: string;

                /**
                 * @default 'total'
                 */
                total: string;

                /**
                 * @default 'value'
                 */
                value: string;
            }

            interface Errors {
                /**
                 * @default 'The method you called is not defined.'
                 */
                method: string;

                /**
                 * @default 'Progress value is non numeric'
                 */
                nonNumeric: string;

                /**
                 * @default 'Value specified is above 100%'
                 */
                tooHigh: string;

                /**
                 * @default 'Value specified is below 0%'
                 */
                tooLow: string;
            }
        }
    }
}
