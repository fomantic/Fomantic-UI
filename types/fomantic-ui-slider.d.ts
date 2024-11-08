declare namespace FomanticUI {
    interface Slider {
        settings: SliderSettings;

        /**
         * Get the current selected value.
         */
        (behavior: 'get value'): number;

        /**
         * Get the selected value of one of the range thumbs.
         * Provide either 'first' or 'second' as a string parameter.
         */
        (behavior: 'get thumbValue', which: 'first' | 'second'): number;

        /**
         * Get the number of rendered label ticks.
         */
        (behavior: 'get numLabels'): number;

        /**
         * Set the current slider value.
         * Pass 'false' to 'fireChange' to skip the 'onChange' and 'onMove' callbacks.
         */
        (behavior: 'set value', value: number, fireChange: boolean): void;

        /**
         * Set the current range slider values.
         * Pass 'false' to 'fireChange' to skip the 'onChange' and 'onMove' callbacks.
         */
        (behavior: 'set rangeValue', fromValue: number, toValue: number, fireChange: boolean): JQuery;

        /**
         * Destroys instance and removes all events.
         */
        (behavior: 'destroy'): JQuery;

        <K extends keyof SliderSettings>(behavior: 'setting', name: K, value?: undefined,): Partial<Pick<SliderSettings, keyof SliderSettings>>;
        <K extends keyof SliderSettings>(behavior: 'setting', name: K, value: SliderSettings[K]): JQuery;
        (behavior: 'setting', value: Partial<Pick<SliderSettings, keyof SliderSettings>>): JQuery;
        (settings?: Partial<Pick<SliderSettings, keyof SliderSettings>>): JQuery;
    }

    /**
     * @see {@link https://fomantic-ui.com/modules/slider.html#/settings}
     */
    interface SliderSettings {
        // region Slider Settings

        /**
         * The lowest value the slider can be.
         * @default 0
         */
        min: number;

        /**
         * The max value the slider can be.
         * @default 20
         */
        max: number;

        /**
         * The slider step.
         * Set to '0' to disable step.
         * @default 1
         */
        step: number;

        /**
         * The value the slider will start at.
         * @default 0
         */
        start: number;

        /**
         * The second value to set in case of a range slider.
         * @default 20
         */
        end: number;

        /**
         * Makes sure that the two thumbs of a range slider always need to have a difference of the given value.
         * @default false
         */
        minRange: false | number;

        /**
         * Makes sure that the two thumbs of a range slider don't exceed a difference of the given value.
         * @default false
         */
        maxRange: false | number;

        /**
         * The type of label to display for a labeled slider.
         * Can be 'number' or 'letter'.
         * @default 'number'
         */
        labelType: 'number' | 'letter';

        /**
         * You can specify a function here which consumes the current label value as parameter and should return a custom label text according to the given value.
         * @default false
         */
        interpretLabel: false | ((value: any) => string);

        /**
         * String or array of strings to be used for labelType 'letter'
         * @default 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
         */
        letters: string | string[],

        /**
         * An array of label values which restrict the displayed labels to only those which are defined
         * @default []
         */
        restrictedLabels: number[];

        /**
         * If the selected range labels should be highlighted
         * @default false
         */
        highlightRange: boolean;

        /**
         * Whether a tooltip should be shown to the thumb(s) on hover. Will contain the current slider value.
         * @default false
         */
        showThumbTooltip: boolean;

        /**
         * Tooltip configuration used when showThumbTooltip is true
         * @default false
         */
        tooltipConfig: object;

        /**
         * Show ticks on a labeled slider.
         * @default false
         */
        showLabelTicks: boolean | 'always';

        /**
         * Define smoothness when the slider is moving.
         * @default false
         */
        smooth: boolean;

        /**
         * Whether labels should auto adjust on window resize.
         * @default true
         */
        autoAdjustLabels: boolean | 'fixed';

        /**
         * The distance between labels.
         * @default 100
         */
        labelDistance: number;

        /**
         * Number of decimals to use with an unstepped slider.
         * @default 2
         */
        decimalPlaces: number;

        /**
         * Page up/down multiplier.
         * Define how many more times the steps to take on page up/down press.
         * @default 2
         */
        pageMultiplier: number;

        /**
         * Prevents the lower thumb to crossover the thumb handle.
         * @default true
         */
        preventCrossover: boolean;

        // endregion

        // region Callbacks

        /**
         * Is called when the slider value is changed.
         */
        onChange(this: JQuery, value: number, thumbVal: number, secondThumbVal: number): void;

        /**
         * Is called when the slider is moving.
         */
        onMove(this: JQuery, value: number, thumbVal: number, secondThumbVal: number): void;

        // endregion

        // region DOM Settings

        /**
         * Class names used to determine element state.
         */
        className: Slider.ClassNameSettings;

        /**
         * DOM metadata used by module.
         */
        metadata: Slider.MetadataSettings;

        /**
         * Keys used by module.
         */
        keys: Slider.KeySettings;

        // endregion

        // region Debug Settings

        /**
         * Name used in log statements
         * @default 'Slider'
         */
        name: string;

        /**
         * Event namespace. Makes sure module teardown does not effect other events attached to an element.
         * @default 'slider'
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

        error: Slider.ErrorSettings;

        // endregion
    }

    namespace Slider {
        type ClassNameSettings = Partial<Pick<Settings.ClassNames, keyof Settings.ClassNames>>;
        type MetadataSettings = Partial<Pick<Settings.Metadatas, keyof Settings.Metadatas>>;
        type KeySettings = Partial<Pick<Settings.Keys, keyof Settings.Keys>>;
        type ErrorSettings = Partial<Pick<Settings.Errors, keyof Settings.Errors>>;

        namespace Settings {
            interface ClassNames {
                /**
                 * @default 'reversed'
                 */
                reversed: string;

                /**
                 * @default 'disabled'
                 */
                disabled: string;

                /**
                 * @default 'labeled'
                 */
                labeled: string;

                /**
                 * @default 'ticked'
                 */
                ticked: string;

                /**
                 * @default 'vertical'
                 */
                vertical: string;

                /**
                 * @default 'range'
                 */
                range: string;

                /**
                 * @default 'smooth'
                 */
                smooth: string;

                /**
                 * @default 'label'
                 */
                label: string;

                /**
                 * @default 'active'
                 */
                active: string;
            }

            interface Metadatas {
                /**
                 * @default 'thumbVal'
                 */
                thumbVal: string;

                /**
                 * @default 'secondThumbVal'
                 */
                secondThumbVal: string;
            }

            interface Keys {
                /**
                 * @default 33
                 */
                pageUp: number;

                /**
                 * @default 34
                 */
                pageDown: number;

                /**
                 * @default 37
                 */
                leftArrow: number;

                /**
                 * @default 38
                 */
                upArrow: number;

                /**
                 * @default 39
                 */
                rightArrow: number;

                /**
                 * @default 40
                 */
                downArrow: number;
            }

            interface Errors {
                /**
                 * @default 'The method you called is not defined.'
                 */
                method: string;

                /**
                 * @default 'This slider is not a range slider.'
                 */
                notrange: string;
            }
        }
    }
}
