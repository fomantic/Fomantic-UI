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

        <K extends keyof SliderSettings>(behavior: 'setting', name: K, value?: undefined): SliderSettings._Impl[K];
        <K extends keyof SliderSettings>(behavior: 'setting', name: K, value: SliderSettings._Impl[K]): JQuery;
        (behavior: 'setting', value: SliderSettings): JQuery;
        (settings?: SliderSettings): JQuery;
    }

    /**
     * @see {@link https://fomantic-ui.com/modules/slider.html#/settings}
     */
    type SliderSettings = SliderSettings.Param;

    namespace SliderSettings {
        type Param = (
            | Pick<_Impl, 'min'>
            | Pick<_Impl, 'max'>
            | Pick<_Impl, 'step'>
            | Pick<_Impl, 'start'>
            | Pick<_Impl, 'end'>
            | Pick<_Impl, 'labelType'>
            | Pick<_Impl, 'interpretLabel'>
            | Pick<_Impl, 'showLabelTicks'>
            | Pick<_Impl, 'smooth'>
            | Pick<_Impl, 'autoAdjustLabels'>
            | Pick<_Impl, 'labelDistance'>
            | Pick<_Impl, 'decimalPlaces'>
            | Pick<_Impl, 'pageMultiplier'>
            | Pick<_Impl, 'preventCrossover'>
            | Pick<_Impl, 'onChange'>
            | Pick<_Impl, 'onMove'>
            | Pick<_Impl, 'className'>
            | Pick<_Impl, 'metadata'>
            | Pick<_Impl, 'keys'>
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
             * The type of label to display for a labeled slider.
             * Can be 'number' or 'letter'.
             * @default 'number'
             */
            labelType: 'number' | 'letter';

            /**
             * You can specify a function here which consumes the current label value as parameter and should return a custom label text according to the given value.
             * @default false
             */
            interpretLabel: false | Function;

            /**
             * Show ticks on a labeled slider.
             * @default false
             */
            showLabelTicks: boolean;

            /**
             * Define smoothness when the slider is moving.
             * @default false
             */
            smooth: boolean;

            /**
             * Whether labels should auto adjust on window resize.
             * @default true
             */
            autoAdjustLabels: boolean;

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
             */
            name: string;

            /**
             * Event namespace. Makes sure module teardown does not effect other events attached to an element.
             */
            namespace: string;

            /**
             * Silences all console output including error messages, regardless of other debug settings.
             */
            silent: boolean;

            /**
             * Debug output to console
             */
            debug: boolean;

            /**
             * Show console.table output with performance metrics
             */
            performance: boolean;

            /**
             * Debug output includes all internal behaviors
             */
            verbose: boolean;

            error: Slider.ErrorSettings;

            // endregion
        }

        namespace Slider {
            type ClassNameSettings = ClassNameSettings.Param;

            namespace ClassNameSettings {
                type Param = (
                    | Pick<_Impl, 'reversed'>
                    | Pick<_Impl, 'disabled'>
                    | Pick<_Impl, 'labeled'>
                    | Pick<_Impl, 'ticked'>
                    | Pick<_Impl, 'vertical'>
                    | Pick<_Impl, 'range'>
                    | Pick<_Impl, 'smooth'>
                ) &
                    Partial<Pick<_Impl, keyof _Impl>>;

                interface _Impl {
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
                }
            }

            type MetadataSettings = MetadataSettings.Param;

            namespace MetadataSettings {
                type Param = (Pick<_Impl, 'thumbVal'> | Pick<_Impl, 'secondThumbVal'>) &
                    Partial<Pick<_Impl, keyof _Impl>>;

                interface _Impl {
                    /**
                     * @default 'thumbVal'
                     */
                    thumbVal: string;

                    /**
                     * @default 'secondThumbVal'
                     */
                    secondThumbVal: string;
                }
            }

            type KeySettings = KeySettings.Param;

            namespace KeySettings {
                type Param = (
                    | Pick<_Impl, 'pageUp'>
                    | Pick<_Impl, 'pageDown'>
                    | Pick<_Impl, 'leftArrow'>
                    | Pick<_Impl, 'upArrow'>
                    | Pick<_Impl, 'rightArrow'>
                    | Pick<_Impl, 'downArrow'>
                ) &
                    Partial<Pick<_Impl, keyof _Impl>>;

                interface _Impl {
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
            }

            type ErrorSettings = ErrorSettings.Param;

            namespace ErrorSettings {
                type Param = (Pick<_Impl, 'method'> | Pick<_Impl, 'notrange'>) & Partial<Pick<_Impl, keyof _Impl>>;

                interface _Impl {
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
}
