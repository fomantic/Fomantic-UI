declare namespace FomanticUI {
    interface Checkbox {
        settings: CheckboxSettings;

        /**
         * Switches a checkbox from current state.
         */
        (behavior: 'toggle'): JQuery;

        /**
         * Set a checkbox state to checked.
         */
        (behavior: 'check'): JQuery;

        /**
         * Set a checkbox state to unchecked.
         */
        (behavior: 'uncheck'): JQuery;

        /**
         * Set as indeterminate checkbox.
         */
        (behavior: 'indeterminate'): JQuery;

        /**
         * Set as determinate checkbox.
         */
        (behavior: 'determinate'): JQuery;

        /**
         * Enable interaction with a checkbox.
         */
        (behavior: 'enable'): JQuery;

        /**
         * Set a checkbox state to checked without callbacks.
         */
        (behavior: 'set checked'): JQuery;

        /**
         * Set a checkbox state to unchecked without callbacks.
         */
        (behavior: 'set unchecked'): JQuery;

        /**
         * Set as indeterminate checkbox without callbacks.
         */
        (behavior: 'set indeterminate'): JQuery;

        /**
         * Set as determinate checkbox without callbacks.
         */
        (behavior: 'set determinate'): JQuery;

        /**
         * Enable interaction with a checkbox without callbacks.
         */
        (behavior: 'set enabled'): JQuery;

        /**
         * Disable interaction with a checkbox without callbacks.
         */
        (behavior: 'set disabled'): JQuery;

        /**
         * Attach checkbox events to another element.
         */
        (behavior: 'attach events', selector: string | JQuery, event?: string): JQuery;

        /**
         * Returns whether element is radio selection.
         */
        (behavior: 'is radio'): boolean;

        /**
         * Returns whether element is currently checked.
         */
        (behavior: 'is checked'): boolean;

        /**
         * Returns whether element is not checked.
         */
        (behavior: 'is unchecked'): boolean;

        /**
         * Returns whether element is able to be changed.
         */
        (behavior: 'can change'): boolean;

        /**
         * Returns whether element is able to be unchecked.
         */
        (behavior: 'can uncheck'): boolean;

        /**
         * Returns whether element can be checked (checking if already checked or `beforeChecked` would cancel).
         */
        (behavior: 'should allow check'): boolean;

        /**
         * Returns whether element can be unchecked (checking if already unchecked or `beforeUnchecked` would cancel).
         */
        (behavior: 'should allow uncheck'): boolean;

        /**
         * Returns whether element can be determinate (checking if already determinate or `beforeDeterminate` would cancel).
         */
        (behavior: 'should allow determinate'): boolean;

        /**
         * Returns whether element can be indeterminate (checking if already indeterminate or `beforeIndeterminate` would cancel).
         */
        (behavior: 'should allow indeterminate'): boolean;

        (behavior: 'destroy'): JQuery;
        <K extends keyof CheckboxSettings>(behavior: 'setting', name: K, value?: undefined): CheckboxSettings._Impl[K];
        <K extends keyof CheckboxSettings>(behavior: 'setting', name: K, value: CheckboxSettings._Impl[K]): JQuery;
        (behavior: 'setting', value: CheckboxSettings): JQuery;
        (settings?: CheckboxSettings): JQuery;
    }

    /**
     * @see {@link https://fomantic-ui.com/modules/checkbox.html#/settings}
     */
    type CheckboxSettings = CheckboxSettings.Param;

    namespace CheckboxSettings {
        type Param = (
            | Pick<_Impl, 'uncheckable'>
            | Pick<_Impl, 'fireOnInit'>
            | Pick<_Impl, 'enableEnterKey'>
            | Pick<_Impl, 'onChange'>
            | Pick<_Impl, 'onChecked'>
            | Pick<_Impl, 'onIndeterminate'>
            | Pick<_Impl, 'onDeterminate'>
            | Pick<_Impl, 'onUnchecked'>
            | Pick<_Impl, 'beforeChecked'>
            | Pick<_Impl, 'beforeIndeterminate'>
            | Pick<_Impl, 'beforeDeterminate'>
            | Pick<_Impl, 'beforeUnchecked'>
            | Pick<_Impl, 'onEnable'>
            | Pick<_Impl, 'onDisable'>
            | Pick<_Impl, 'selector'>
            | Pick<_Impl, 'className'>
            | Pick<_Impl, 'name'>
            | Pick<_Impl, 'namespace'>
            | Pick<_Impl, 'silent'>
            | Pick<_Impl, 'debug'>
            | Pick<_Impl, 'performance'>
            | Pick<_Impl, 'verbose'>
            | Pick<_Impl, 'errors'>
        ) &
            Partial<Pick<_Impl, keyof _Impl>>;

        interface _Impl {
            // region Checkbox Settings

            /**
             * Setting to 'true'/'false' will determine whether an input will allow no selection. 'auto' will set disallow this behavior only for radio boxes.
             * @default 'auto'
             */
            uncheckable: 'auto' | boolean;

            /**
             * Whether callbacks for checked status should be fired on init as well as change.
             * @default false
             */
            fireOnInit: boolean;

            /**
             * Whether pressing the 'ENTER' Key on a focused checkbox should also toggle it.
             * @default true
             */
            enableEnterKey: boolean;

            // endregion

            // region Callbacks

            /**
             * Callback after a checkbox is either checked or unchecked.
             */
            onChange(this: JQuery): void;

            /**
             * Callback after a checkbox is checked.
             */
            onChecked(this: JQuery): void;

            /**
             * Callback after a checkbox is set to indeterminate.
             */
            onIndeterminate(this: JQuery): void;

            /**
             * Callback after a checkbox is set to determinate.
             */
            onDeterminate(this: JQuery): void;

            /**
             * Callback after a checkbox is unchecked.
             */
            onUnchecked(this: JQuery): void;

            /**
             * Callback before a checkbox is checked. Can cancel change by returning 'false'.
             */
            beforeChecked(this: JQuery): void | false;

            /**
             * Callback before a checkbox is set to indeterminate. Can cancel change by returning 'false'.
             */
            beforeIndeterminate(this: JQuery): void | false;

            /**
             * Callback before a checkbox is set to determinate. Can cancel change by returning 'false'.
             */
            beforeDeterminate(this: JQuery): void | false;

            /**
             * Callback before a checkbox is unchecked. Can cancel change by returning 'false'.
             */
            beforeUnchecked(this: JQuery): void | false;

            /**
             * Callback after a checkbox is enabled.
             */
            onEnable(this: JQuery): void;

            /**
             * Callback after a checkbox is disabled.
             */
            onDisable(this: JQuery): void;

            // endregion

            // region DOM Settings

            /**
             * Selectors used to find parts of a module.
             */
            selector: Checkbox.SelectorSettings;

            /**
             * Class names used to determine element state.
             */
            className: Checkbox.ClassNameSettings;

            // endregion

            // region Debug Settings

            /**
             * Name used in log statements
             * @default 'Checkbox'
             */
            name: string;

            /**
             * Event namespace. Makes sure module teardown does not effect other events attached to an element.
             * @default 'checkbox'
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

            errors: Checkbox.ErrorSettings;

            // endregion
        }
    }

    namespace Checkbox {
        type SelectorSettings = SelectorSettings.Param;

        namespace SelectorSettings {
            type Param = (Pick<_Impl, 'checkbox'> | Pick<_Impl, 'label'> | Pick<_Impl, 'input'> | Pick<_Impl, 'link'>) &
                Partial<Pick<_Impl, keyof _Impl>>;

            interface _Impl {
                /**
                 * @default '.ui.checkbox'
                 */
                checkbox: string;

                /**
                 * @default 'label'
                 */
                label: string;

                /**
                 * @default 'input[type="checkbox"], input[type="radio"]'
                 */
                input: string;

                /**
                 * @default 'a[href]'
                 */
                link: string;
            }
        }

        type ClassNameSettings = ClassNameSettings.Param;

        namespace ClassNameSettings {
            type Param = (
                | Pick<_Impl, 'checked'>
                | Pick<_Impl, 'indeterminate'>
                | Pick<_Impl, 'disabled'>
                | Pick<_Impl, 'hidden'>
                | Pick<_Impl, 'radio'>
                | Pick<_Impl, 'readOnly'>
            ) &
                Partial<Pick<_Impl, keyof _Impl>>;

            interface _Impl {
                /**
                 * @default 'checked'
                 */
                checked: string;

                /**
                 * @default 'indeterminate'
                 */
                indeterminate: string;

                /**
                 * @default 'disabled'
                 */
                disabled: string;

                /**
                 * @default 'hidden'
                 */
                hidden: string;

                /**
                 * @default 'radio'
                 */
                radio: string;

                /**
                 * @default 'readOnly'
                 */
                readOnly: string;
            }
        }

        type ErrorSettings = ErrorSettings.Param;

        namespace ErrorSettings {
            type Param = Pick<_Impl, 'method'> & Partial<Pick<_Impl, keyof _Impl>>;

            interface _Impl {
                /**
                 * @default 'The method you called is not defined.'
                 */
                method: string;
            }
        }
    }
}
