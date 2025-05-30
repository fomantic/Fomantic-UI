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
         * Disable interaction with a checkbox.
         */
        (behavior: 'disable'): JQuery;

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
         * Returns whether element is not determinate.
         */
        (behavior: 'is indeterminate'): boolean;

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
        <K extends keyof CheckboxSettings>(behavior: 'setting', name: K, value?: undefined): Partial<Pick<CheckboxSettings, keyof CheckboxSettings>>;
        <K extends keyof CheckboxSettings>(behavior: 'setting', name: K, value: CheckboxSettings[K]): JQuery;
        (behavior: 'setting', value: Partial<Pick<CheckboxSettings, keyof CheckboxSettings>>): JQuery;
        (settings?: Partial<Pick<CheckboxSettings, keyof CheckboxSettings>>): JQuery;
    }

    /**
     * @see {@link https://fomantic-ui.com/modules/checkbox.html#/settings}
     */
    interface CheckboxSettings {
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
        beforeChecked(this: JQuery): void | Promise<void> | boolean;

        /**
         * Callback before a checkbox is set to indeterminate. Can cancel change by returning 'false'.
         */
        beforeIndeterminate(this: JQuery): void | Promise<void> | false;

        /**
         * Callback before a checkbox is set to determinate. Can cancel change by returning 'false'.
         */
        beforeDeterminate(this: JQuery): void | Promise<void> | false;

        /**
         * Callback before a checkbox is unchecked. Can cancel change by returning 'false'.
         */
        beforeUnchecked(this: JQuery): void | Promise<void> | false;

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

    namespace Checkbox {
        type SelectorSettings = Partial<Pick<Settings.Selectors, keyof Settings.Selectors>>;
        type ClassNameSettings = Partial<Pick<Settings.ClassNames, keyof Settings.ClassNames>>;
        type ErrorSettings = Partial<Pick<Settings.Errors, keyof Settings.Errors>>;

        namespace Settings {
            interface Selectors {
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

            interface ClassNames {
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

            interface Errors {
                /**
                 * @default 'The method you called is not defined.'
                 */
                method: string;
            }
        }
    }
}
