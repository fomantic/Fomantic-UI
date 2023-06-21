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
        (behavior: 'add rule', field: string, rules: object[]): void;

        /**
         * Adds fields object to existing fields.
         */
        (behavior: 'add fields', fields: object[]): void;

        /**
         * Removes specific rule from field leaving other rules.
         */
        (behavior: 'remove rule', field: string, rules: object[]): void;

        /**
         * Remove all validation for a field.
         */
        (behavior: 'remove field', field: string): void;

        /**
         * Returns 'true'/'false' whether a field passes its validation rules.
         * If you add 'true' as the second parameter, any failed rule will update the UI.
         */
        (behavior: 'is valid', fieldName: string, showErrors: boolean): boolean;

        /**
         * Validates form, updates UI, and calls 'onSuccess' or 'onFailure'.
         */
        (behavior: 'validate form'): void;

        /**
         * Validates field, updates UI, and calls 'onSuccess' or 'onFailure'.
         */
        (behavior: 'validate field', fieldName: string): void;

        /**
         * Returns element with matching name, id, or data-validate metadata to identifier.
         */
        (behavior: 'get field', identifier: string): string;

        /**
         * Returns value of element with id.
         */
        (behavior: 'get value', identifier: string): string;

        /**
         * Returns object of element values that match array of identifiers.
         * If no IDS are passed will return all fields.
         */
        (behavior: 'get values', identifiers?: string[]): object;

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
        (behavior: 'has field', identifier: string): boolean;

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
        (behavior: 'add prompt', identifier: string, errors: object[]): void;

        /**
         * Empty all fields and remove possible errors.
         */
        (behavior: 'clear'): void;

        /**
         * Set all fields to their initial value and remove possible errors.
         */
        (behavior: 'reset'): void;

        /**
         * Set fields actual values as default values.
         */
        (behavior: 'set defaults'): void;

        /**
         * Return elements which have been modified since form state was changed to 'dirty'.
         */
        (behavior: 'get dirty fields'): string[];

        /**
         * Set the state of the form to 'clean' and set new values as default.
         */
        (behavior: 'set as clean'): void;

        /**
         * Automatically adds the "empty" rule or automatically checks a checkbox for all fields with classname or attribute 'required'.
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

        <K extends keyof FormSettings>(behavior: 'setting', name: K, value?: undefined): FormSettings._Impl[K];
        <K extends keyof FormSettings>(behavior: 'setting', name: K, value: FormSettings._Impl[K]): JQuery;
        (behavior: 'setting', value: FormSettings): JQuery;
        (settings?: FormSettings): JQuery;
    }

    /**
     * @see {@link https://fomantic-ui.com/behaviors/form.html#/settings}
     */
    type FormSettings = FormSettings.Param;

    namespace FormSettings {
        type Param = (
            | Pick<_Impl, 'keyboardShortcuts'>
            | Pick<_Impl, 'on'>
            | Pick<_Impl, 'revalidate'>
            | Pick<_Impl, 'delay'>
            | Pick<_Impl, 'inline'>
            | Pick<_Impl, 'shouldTrim'>
            | Pick<_Impl, 'dateHandling'>
            | Pick<_Impl, 'transition'>
            | Pick<_Impl, 'duration'>
            | Pick<_Impl, 'preventLeaving'>
            | Pick<_Impl, 'autoCheckRequired'>
            | Pick<_Impl, 'errorFocus'>
            | Pick<_Impl, 'text'>
            | Pick<_Impl, 'prompt'>
            | Pick<_Impl, 'formatter'>
            | Pick<_Impl, 'onValid'>
            | Pick<_Impl, 'onInvalid'>
            | Pick<_Impl, 'onSuccess'>
            | Pick<_Impl, 'onFailure'>
            | Pick<_Impl, 'onDirty'>
            | Pick<_Impl, 'onClean'>
            | Pick<_Impl, 'selector'>
            | Pick<_Impl, 'metadata'>
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
            // region Form Settings

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
             * Whether fields with classname or attribute 'required' should automatically add the "empty" rule or automatically checks checkbox fields.
             * @default false
             */
            autoCheckRequired: boolean;

            /**
             * Whether, on an invalid form validation, it should automatically focus either the first error field ('true') or a specific dom node (Use a unique selector string such as '.ui.error.message' or '#myelement') or nothing ('false').
             * @default false
             */
            errorFocus: boolean | string;

            // endregion

            // region Form Prompts

            text: Form.TextSettings;

            prompt: Form.PromptSettings;

            // endregion

            // region Formatters

            formatter: Form.FormatterSettings;

            // endregion

            // region Callbacks

            /**
             * Callback on each valid field.
             */
            onValid(this: JQuery): void;

            /**
             * Callback on each invalid field.
             */
            onInvalid(this: JQuery): void;

            /**
             * Callback if a form is all valid.
             */
            onSuccess(this: JQuery, event: Event, fields: object[]): void;

            /**
             * Callback if any form field is invalid.
             */
            onFailure(this: JQuery, formErrors: object[], fields: object[]): void;

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

            errors: Form.ErrorSettings;

            // endregion
        }

        namespace Form {
            type TextSettings = TextSettings.Param;

            namespace TextSettings {
                type Param = (
                    | Pick<_Impl, 'unspecifiedRule'>
                    | Pick<_Impl, 'unspecifiedField'>
                    | Pick<_Impl, 'leavingMessage'>
                ) &
                    Partial<Pick<_Impl, keyof _Impl>>;

                interface _Impl {
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
            }

            type PromptSettings = PromptSettings.Param;

            namespace PromptSettings {
                type Param = (
                    | Pick<_Impl, 'empty'>
                    | Pick<_Impl, 'checked'>
                    | Pick<_Impl, 'email'>
                    | Pick<_Impl, 'url'>
                    | Pick<_Impl, 'regExp'>
                    | Pick<_Impl, 'integer'>
                    | Pick<_Impl, 'decimal'>
                    | Pick<_Impl, 'number'>
                    | Pick<_Impl, 'is'>
                    | Pick<_Impl, 'isExactly'>
                    | Pick<_Impl, 'not'>
                    | Pick<_Impl, 'notExactly'>
                    | Pick<_Impl, 'contain'>
                    | Pick<_Impl, 'containExactly'>
                    | Pick<_Impl, 'doesntContain'>
                    | Pick<_Impl, 'doesntContainExactly'>
                    | Pick<_Impl, 'minLength'>
                    | Pick<_Impl, 'exactLength'>
                    | Pick<_Impl, 'maxLength'>
                    | Pick<_Impl, 'match'>
                    | Pick<_Impl, 'different'>
                    | Pick<_Impl, 'creditCard'>
                    | Pick<_Impl, 'minCount'>
                    | Pick<_Impl, 'exactCount'>
                    | Pick<_Impl, 'maxCount'>
                ) &
                    Partial<Pick<_Impl, keyof _Impl>>;

                interface _Impl {
                    /**
                     * @default '{name} must have a value'
                     */
                    empty: string;

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
            }

            type FormatterSettings = FormatterSettings.Param;

            namespace FormatterSettings {
                type Param = (
                    | Pick<_Impl, 'date'>
                    | Pick<_Impl, 'datetime'>
                    | Pick<_Impl, 'time'>
                    | Pick<_Impl, 'month'>
                    | Pick<_Impl, 'year'>
                ) &
                    Partial<Pick<_Impl, keyof _Impl>>;

                interface _Impl {
                    date(date: string): string;
                    datetime(date: string): string;
                    time(date: string): string;
                    month(date: string): string;
                    year(date: string): string;
                }
            }

            type SelectorSettings = SelectorSettings.Param;

            namespace SelectorSettings {
                type Param = (
                    | Pick<_Impl, 'checkbox'>
                    | Pick<_Impl, 'clear'>
                    | Pick<_Impl, 'field'>
                    | Pick<_Impl, 'group'>
                    | Pick<_Impl, 'input'>
                    | Pick<_Impl, 'message'>
                    | Pick<_Impl, 'prompt'>
                    | Pick<_Impl, 'radio'>
                    | Pick<_Impl, 'reset'>
                    | Pick<_Impl, 'submit'>
                    | Pick<_Impl, 'uiCheckbox'>
                    | Pick<_Impl, 'uiDropdown'>
                    | Pick<_Impl, 'uiCalendar'>
                ) &
                    Partial<Pick<_Impl, keyof _Impl>>;

                interface _Impl {
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
            }

            type MetadataSettings = MetadataSettings.Param;

            namespace MetadataSettings {
                type Param = (Pick<_Impl, 'defaultValue'> | Pick<_Impl, 'validate'> | Pick<_Impl, 'isDirty'>) &
                    Partial<Pick<_Impl, keyof _Impl>>;

                interface _Impl {
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
            }

            type ClassNameSettings = ClassNameSettings.Param;

            namespace ClassNameSettings {
                type Param = (
                    | Pick<_Impl, 'error'>
                    | Pick<_Impl, 'label'>
                    | Pick<_Impl, 'pressed'>
                    | Pick<_Impl, 'success'>
                ) &
                    Partial<Pick<_Impl, keyof _Impl>>;

                interface _Impl {
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
            }

            type ErrorSettings = ErrorSettings.Param;

            namespace ErrorSettings {
                type Param = (
                    | Pick<_Impl, 'identifier'>
                    | Pick<_Impl, 'method'>
                    | Pick<_Impl, 'noRule'>
                    | Pick<_Impl, 'oldSyntax'>
                    | Pick<_Impl, 'noField'>
                    | Pick<_Impl, 'noElement'>
                ) &
                    Partial<Pick<_Impl, keyof _Impl>>;

                interface _Impl {
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
}
