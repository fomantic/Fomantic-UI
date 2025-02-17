declare namespace FomanticUI {
    interface Form {
        settings: FormSettings;

        /**
         * Submits selected form.
         */
        (behavior: 'submit'): void;

        /**
         * Returns 'true'/'false' whether a form passes its validation rules.
         */
        (behavior: 'is valid'): boolean;

        /**
         * Adds rule to existing rules for field, also aliased as 'add field'.
         */
        (behavior: 'add rule', field: string, rules: string | string[] | FormField[]): void;

        /**
         * Adds field object to existing fields.
         */
        (behavior: 'add field', name: string, rules: string | string[] | FormRule[]): void;

        /**
         * Adds fields object to existing fields.
         */
        (behavior: 'add fields', fields: object[]): void;

        /**
         * Removes specific rule from field leaving other rules.
         */
        (behavior: 'remove rule', field: string, rules?: object[]): void;

        /**
         * Remove all validation for a field.
         */
        (behavior: 'remove field', field: string): void;

        /**
         * Remove all validation for an array of fields.
         */
        (behavior: 'remove fields', field: string[]): void;

        /**
         * Returns 'true'/'false' whether a field passes its validation rules.
         * If you add 'true' as the second parameter, any failed rule will update the UI.
         */
        (behavior: 'is valid', fieldName: string, showErrors: boolean): boolean;

        /**
         * Validates form, updates UI, and calls 'onSuccess' or 'onFailure'.
         */
        (behavior: 'validate form'): boolean;

        /**
         * Validates field, updates UI, and calls 'onSuccess' or 'onFailure'.
         */
        (behavior: 'validate field', fieldName: string): void;

        /**
         * Returns element with matching name, id, or data-validate metadata to identifier.
         */
        (behavior: 'get field', identifier: string, strict?: boolean, ignoreMissing?: boolean): string;

        /**
         * Returns value of element with id.
         */
        (behavior: 'get value', identifier: string): string;

        /**
         * Returns object of element values that match array of identifiers.
         * If no IDS are passed will return all fields.
         */
        (behavior: 'get values', identifiers?: string[]): Record<string, string>;

        /**
         * Sets value of element with id.
         */
        (behavior: 'set value', identifier: string, value: string): void;

        /**
         * Sets key/value pairs from passed values object to matching identifiers.
         */
        (behavior: 'set values', values: object[]): JQuery;

        /**
         * Returns validation rules for a given jQuery-referenced input field.
         */
        (behavior: 'get validation', element: JQuery): object;

        /**
         * Returns whether a field exists.
         */
        (behavior: 'has field', identifier: string, ignoreMissing?: boolean): boolean;

        /**
         * Manually add errors to form, given an array errors.
         */
        (behavior: 'add errors', errors: object[]): void;

        /**
         * Removes all current errors from the error message box.
         */
        (behavior: 'remove errors'): void;

        /**
         * Adds a custom user prompt for a given element with identifier.
         */
        (behavior: 'add prompt', identifier: string, errors: string | object[]): void;

        /**
         * Empty all fields and remove possible errors.
         */
        (behavior: 'clear'): JQuery;

        /**
         * Set all fields to their initial value and remove possible errors.
         */
        (behavior: 'reset'): JQuery;

        /**
         * Set fields actual values as default values.
         */
        (behavior: 'set defaults'): void;

        /**
         * Returns 'true'/'false' whether a form is dirty.
         */
        (behavior: 'is dirty'): boolean;

        /**
         * Returns 'true'/'false' whether a form is clean.
         */
        (behavior: 'is clean'): boolean;

        /**
         * Return elements which have been modified since form state was changed to 'dirty'.
         */
        (behavior: 'get dirty fields'): string[];

        /**
         * Set the state of the form to 'clean' and set new values as default.
         */
        (behavior: 'set as clean'): JQuery;

        /**
         * Automatically adds the "notEmpty" rule or automatically checks a checkbox for all fields with classname or attribute 'required'.
         */
        (behavior: 'set auto check'): void;

        /**
         * Set or unset matching fields as optional.
         */
        (behavior: 'set optional', identifier: string, bool: boolean): void;

        /**
         * Destroys instance and removes all events.
         */
        (behavior: 'destroy'): JQuery;
        <K extends keyof FormSettings>(behavior: 'setting', name: K, value?: undefined,): Partial<Pick<FormSettings, keyof FormSettings>>;
        <K extends keyof FormSettings>(behavior: 'setting', name: K, value: FormSettings[K]): JQuery;
        (behavior: 'setting', value: Partial<Pick<FormSettings, keyof FormSettings>>): JQuery;
        (settings?: Partial<Pick<FormSettings, keyof FormSettings>>): JQuery;
    }

    type FormFields = Record<string, FormField | string[] | string | object>;

    interface FormRule {
        type: string;
        prompt?: string | ((value: string) => void);
        value?: string | RegExp;
    }

    interface FormField {
        identifier?: string;
        depends?: string;
        optional?: boolean;
        rules: FormRule[];
    }

    /**
     * @see {@link https://fomantic-ui.com/behaviors/form.html#/settings}
     */
    interface FormSettings {
        // region Form Settings

        /**
         * Adds keyboard shortcuts for enter and escape keys to submit form and blur fields respectively.
         * @default false
         */
        fields: false | FormFields;

        /**
         * Adds keyboard shortcuts for enter and escape keys to submit form and blur fields respectively.
         * @default true
         */
        keyboardShortcuts: boolean;

        /**
         * Event used to trigger validation.
         * Can be either 'submit', 'blur' or 'change'.
         * @default 'submit'
         */
        on: 'submit' | 'blur' | 'change';

        /**
         * If set to true will revalidate fields with errors on input change.
         * @default true
         */
        revalidate: boolean;

        /**
         * Delay from last typed letter to validate a field when using 'on: change' or when revalidating a field.
         * @default true
         */
        delay: boolean;

        /**
         * Adds inline error on field validation error.
         * @default false
         */
        inline: boolean;

        /**
         * Whether or not the form should trim the value before validating.
         * @default false
         */
        shouldTrim: boolean;

        /**
         * Define how calendar values will be returned.
         * Can be either 'date', 'input' or 'formatter'.
         * @default 'date'
         */
        dateHandling: 'date' | 'input' | 'formatter';

        /**
         * Named transition to use when animating validation errors.
         * Fade and slide down are available without including 'ui transitions'.
         * @see {@link https://fomantic-ui.com/modules/transition.html}
         * @default 'scale'
         */
        transition: string;

        /**
         * Animation speed for inline prompt.
         * @default 150
         */
        duration: number;

        /**
         * Prevent user from leaving the page if the form has a 'dirty' state by displaying a prompt.
         * @default false
         */
        preventLeaving: boolean;

        /**
         * Whether fields with classname or attribute 'required' should automatically add the "notEmpty" rule or automatically checks checkbox fields.
         * @default false
         */
        autoCheckRequired: boolean;

        /**
         * Whether, on an invalid form validation, it should automatically focus either the first error field ('true') or a specific dom node (Use a unique selector string such as '.ui.error.message' or '#myelement') or nothing ('false').
         * @default false
         */
        errorFocus: boolean | string;

        /**
         *
         * @default 0
         */
        errorLimit: number;

        /**
         *
         * @default false
         */
        noNativeValidation: boolean;

        // endregion

        // region Form Prompts

        text: Form.TextSettings;

        prompt: Form.PromptSettings;

        // endregion

        // region Formatters

        formatter: Form.FormatterSettings;

        // endregion

        // region Formatters

        rules: Form.RulesSettings;

        // endregion

        // region Callbacks

        /**
         * Callback on each valid field.
         */
        onValid(this: JQuery): void;

        /**
         * Callback on each invalid field.
         */
        onInvalid(this: JQuery, fieldErrors: string | string[]): void;

        /**
         * Callback if a form is all valid.
         */
        onSuccess(this: JQuery, event: Event, fields: {[key: string]: any}): void;

        /**
         * Callback if any form field is invalid.
         */
        onFailure(this: JQuery, formErrors: {[key: string]: any}, fields: {[key: string]: any}): void;

        /**
         * Callback if form state is modified to 'dirty'.
         * Triggered when at least on field has been modified.
         */
        onDirty(this: JQuery): void;

        /**
         * Callback if form state is modified to 'clean'.
         * Triggered when all fields are set to default values.
         */
        onClean(this: JQuery): void;

        // endregion

        // region DOM Settings

        /**
         * DOM Selectors used internally.
         * Selectors used to find parts of a module.
         */
        selector: Form.SelectorSettings;

        /**
         * Class names used to determine element state.
         */
        metadata: Form.MetadataSettings;

        /**
         * Class names used to determine element state.
         */
        className: Form.ClassNameSettings;

        // endregion

        // region Debug Settings

        /**
         * Name used in log statements
         * @default 'Form'
         */
        name: string;

        /**
         * Event namespace. Makes sure module teardown does not effect other events attached to an element.
         * @default 'form'
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

        errors: Form.ErrorSettings;

        // endregion
    }

    namespace Form {
        type TextSettings = Partial<Pick<Settings.Texts, keyof Settings.Texts>>;
        type PromptSettings = Partial<Pick<Settings.Prompts, keyof Settings.Prompts>> & {[key: string]: string | undefined};
        type FormatterSettings = Partial<Pick<Settings.Formatters, keyof Settings.Formatters>>;
        type RulesSettings = Partial<Pick<Settings.Rules, keyof Settings.Rules>> & {[key: string]: (value?: any, identifier?: string, module?: any) => boolean};
        type SelectorSettings = Partial<Pick<Settings.Selectors, keyof Settings.Selectors>>;
        type MetadataSettings = Partial<Pick<Settings.Metadatas, keyof Settings.Metadatas>>;
        type ClassNameSettings = Partial<Pick<Settings.ClassNames, keyof Settings.ClassNames>>;
        type ErrorSettings = Partial<Pick<Settings.Errors, keyof Settings.Errors>>;

        namespace Settings {
            interface Texts {
                /**
                 * @default 'Please enter a valid value'
                 */
                unspecifiedRule: string;

                /**
                 * @default 'This field'
                 */
                unspecifiedField: string;

                /**
                 * @default 'There are unsaved changes on this page which will be discarded if you continue.'
                 */
                leavingMessage: string;
            }

            interface Prompts {
                /**
                 * @default '{name} must be in a range from {min} to {max}'
                 */
                range: string;

                /**
                 * @default '{name} must have a maximum value of {ruleValue}'
                 */
                maxValue: string;

                /**
                 * @default '{name} must have a minimum value of {ruleValue}'
                 */
                minValue: string;

                /**
                 * @default '{name} must have a value'
                 * @deprecated Use notEmpty instead
                 */
                empty: string;

                /**
                 * @default '{name} must have a value'
                 */
                notEmpty: string;

                /**
                 * @default '{name} must be checked'
                 */
                checked: string;

                /**
                 * @default '{name} must be a valid e-mail'
                 */
                email: string;

                /**
                 * @default '{name} must be a valid url'
                 */
                url: string;

                /**
                 * @default '{name} is not formatted correctly'
                 */
                regExp: string;

                /**
                 * @default '{name} must be an integer'
                 */
                integer: string;

                /**
                 * @default '{name} must be a decimal number'
                 */
                decimal: string;

                /**
                 * @default '{name} must be set to a number'
                 */
                number: string;

                /**
                 * @default "{name} must be '{ruleValue}'"
                 */
                is: string;

                /**
                 * @default "{name} must be exactly '{ruleValue}'"
                 */
                isExactly: string;

                /**
                 * @default "{name} cannot be set to '{ruleValue}'"
                 */
                not: string;

                /**
                 * @default "{name} cannot be set to exactly '{ruleValue}'"
                 */
                notExactly: string;

                /**
                 * @default "{name} cannot contain '{ruleValue}'"
                 */
                contain: string;

                /**
                 * @default "{name} cannot contain exactly '{ruleValue}'"
                 */
                containExactly: string;

                /**
                 * @default "{name} must contain '{ruleValue}'"
                 */
                doesntContain: string;

                /**
                 * @default "{name} must contain exactly '{ruleValue}'"
                 */
                doesntContainExactly: string;

                /**
                 * @default '{name} must be at least {ruleValue} characters'
                 */
                minLength: string;

                /**
                 * @default '{name} must be exactly {ruleValue} characters'
                 */
                exactLength: string;

                /**
                 * @default '{name} cannot be longer than {ruleValue} characters'
                 */
                maxLength: string;

                /**
                 * @default '{name} must match {ruleValue} field'
                 */
                match: string;

                /**
                 * @default '{name} must have a different value than {ruleValue} field'
                 */
                different: string;

                /**
                 * @default '{name} must be a valid credit card number'
                 */
                creditCard: string;

                /**
                 * @default '{name} must have at least {ruleValue} choices'
                 */
                minCount: string;

                /**
                 * @default '{name} must have exactly {ruleValue} choices'
                 */
                exactCount: string;

                /**
                 * @default '{name} must have {ruleValue} or less choices'
                 */
                maxCount: string;
            }

            interface Formatters {
                date(date: string): string;
                datetime(date: string): string;
                time(date: string): string;
                month(date: string): string;
                year(date: string): string;
            }

            interface Rules {
                empty(value: unknown): boolean;
                notEmpty(value: unknown): boolean;
                checked(): boolean;
                email(value: unknown): boolean;
                url(value: unknown): boolean;
                regExp(value: unknown, regExp: RegExp): boolean;
                minValue(value: unknown, range: string): boolean;
                maxValue(value: unknown, range: string): boolean;
                integer(value: unknown, range: string): boolean;
                range(value: unknown, range: string, regExp: RegExp, testLength: boolean): boolean;
                decimal(value: unknown, range: string): boolean;
                number(value: unknown, range: string): boolean;
                is(value: unknown, text: string): boolean;
                isExactly(value: unknown, text: string): boolean;
                not(value: unknown, notValue: unknown): boolean;
                notExactly(value: unknown, notValue: unknown): boolean;
                contains(value: unknown, text: string): boolean;
                containsExactly(value: unknown, text: string): boolean;
                doesntContain(value: unknown, text: string): boolean;
                doesntContainExactly(value: unknown, text: string): boolean;
                minLength(value: unknown, minLength: number): boolean;
                exactLength(value: unknown, requiredLength: number): boolean;
                maxLength(value: unknown, maxLength: number): boolean;
                size(value: unknown, range: string): boolean;
                match(value: unknown, identifier: string, module: unknown): boolean;
                different(value: unknown, identifier: string, module: unknown): boolean;
                creditCard(cardNumber: unknown, cardTypes: string): boolean;
                minCount(value: unknown, minCount: number): boolean;
                exactCount(value: unknown, exactCount: number): boolean;
                maxCount(value: unknown, maxCount: number): boolean;
            }

            interface Selectors {
                /**
                 * @default 'input[type="checkbox"], input[type="radio"]'
                 */
                checkbox: string;

                /**
                 * @default '.clear'
                 */
                clear: string;

                /**
                 * @default 'input, textarea, select'
                 */
                field: string;

                /**
                 * @default '.field'
                 */
                group: string;

                /**
                 * @default 'input'
                 */
                input: string;

                /**
                 * @default '.error.message'
                 */
                message: string;

                /**
                 * @default '.prompt.label'
                 */
                prompt: string;

                /**
                 * @default 'input[type="radio"]'
                 */
                radio: string;

                /**
                 * @default '.reset:not([type="reset"])'
                 */
                reset: string;

                /**
                 * @default '.submit:not([type="submit"])'
                 */
                submit: string;

                /**
                 * @default '.ui.checkbox'
                 */
                uiCheckbox: string;

                /**
                 * @default '.ui.dropdown'
                 */
                uiDropdown: string;

                /**
                 * @default '.ui.calendar'
                 */
                uiCalendar: string;
            }

            interface Metadatas {
                /**
                 * @default 'default'
                 */
                defaultValue: string;

                /**
                 * @default 'validate'
                 */
                validate: string;

                /**
                 * @default 'isDirty'
                 */
                isDirty: string;
            }

            interface ClassNames {
                /**
                 * @default 'error'
                 */
                error: string;

                /**
                 * @default 'ui basic red pointing prompt label'
                 */
                label: string;

                /**
                 * @default 'down'
                 */
                pressed: string;

                /**
                 * @default 'success'
                 */
                success: string;
            }

            interface Errors {
                /**
                 * @default 'You must specify a string identifier for each field'
                 */
                identifier: string;

                /**
                 * @default 'The method you called is not defined'
                 */
                method: string;

                /**
                 * @default 'There is no rule matching the one you specified'
                 */
                noRule: string;

                /**
                 * @default 'Starting in 2.0 forms now only take a single settings object. Validation settings converted to new syntax automatically.'
                 */
                oldSyntax: string;

                /**
                 * @default 'Field identifier {identifier} not found'
                 */
                noField: string;

                /**
                 * @default 'This module requires ui {element}'
                 */
                noElement: string;
            }
        }
    }
}
