declare namespace FomanticUI {
    interface Dropdown {
        settings: DropdownSettings;

        /**
         * Recreates dropdown menu from passed values.
         * values should be an object with the following structure: { values: [ {value, text, name} ] }.
         */
        (behavior: 'setup menu', values: object): JQuery;

        /**
         * Changes dropdown to use new values.
         * values structure: [ {value, text, name} ].
         */
        (behavior: 'change values', values: object): void;

        /**
         * Refreshes all cached selectors and data
         */
        (behavior: 'refresh'): JQuery;

        /**
         * Toggles current visibility of dropdown
         */
        (behavior: 'toggle'): void;

        /**
         * Shows dropdown.
         * If a function is provided to callback, it's called after the dropdown-menu is shown.
         * Set preventFocus to true if you don't want the dropdown field to focus after the menu is shown
         */
        (behavior: 'show', callback?: () => void, preventFocus?: boolean): void;

        /**
         * Hides dropdown.
         * If a function is provided to callback, it's called after the dropdown-menu is hidden.
         * Set preventBlur to true if you don't want the dropdown field to blur after the menu is hidden
         */
        (behavior: 'hide', callback?: () => void, preventBlur?: boolean): void;

        /**
         * Clears dropdown of selection.
         * Set preventChangeTrigger to true to omit the change event (default: false).
         */
        (behavior: 'clear', preventChangeTrigger?: boolean): JQuery;

        /**
         * Hides all other dropdowns that is not current dropdown
         */
        (behavior: 'hide others'): void;

        /**
         * Restores dropdown text and value to its value on page load.
         * Set preventChangeTrigger to true to omit the change event (default: false).
         */
        (behavior: 'restore defaults', preventChangeTrigger?: boolean): void;

        /**
         * Restores dropdown text to its value on page load
         */
        (behavior: 'restore default text'): void;

        /**
         * Restores dropdown text to its prompt, placeholder text
         */
        (behavior: 'restore placeholder text'): void;

        /**
         * Restores dropdown value to its value on page load
         */
        (behavior: 'restore default value'): void;

        /**
         * Saves current text and value as new defaults (for use with restore)
         */
        (behavior: 'save defaults'): void;

        /**
         * Sets value as selected.
         * Set preventChangeTrigger to true to omit the change event (default: false).
         */
        (behavior: 'set selected', value: string | string[], preventChangeTrigger?: boolean, keepSearchTerm?: boolean): JQuery;

        /**
         * Remove value from selected
         */
        (behavior: 'remove selected', value: string): void;

        /**
         * Sets selected values to exactly specified values, removing current selection
         */
        (behavior: 'set exactly', values: string[]): JQuery;

        /**
         * Sets dropdown text to a value
         */
        (behavior: 'set text', text: string): JQuery;

        /**
         * Sets dropdown input to value (does not update display state).
         * Set preventChangeTrigger to true to omit the change event (default: false).
         */
        (behavior: 'set value', value: string, preventChangeTrigger?: boolean): JQuery;

        /**
         * Returns current dropdown text
         */
        (behavior: 'get text'): string;

        /**
         * Returns current dropdown input value.
         * When the dropdown was created out of a select tag, the value will always be an array, otherwise a string (delimited when multiple)
         */
        (behavior: 'get value'): string | string[];

        /**
         * Returns current dropdown input values as array.
         * Useful for multiple selection dropdowns regardless if made out of a div or select
         */
        (behavior: 'get values'): string[];

        /**
         * Returns DOM element that matches a given input value
         */
        (behavior: 'get item', value: string): HTMLElement;

        /**
         * Returns current search term entered
         */
        (behavior: 'get query'): string;

        /**
         * Adds touch events to element
         */
        (behavior: 'bind touch events'): void;

        /**
         * Adds mouse events to element
         */
        (behavior: 'bind mouse events'): void;

        /**
         * Binds a click to document to determine if you click away from a dropdown
         */
        (behavior: 'bind intent'): void;

        /**
         * Unbinds document intent click
         */
        (behavior: 'unbind intent'): void;

        /**
         * Returns whether event occurred inside dropdown
         */
        (behavior: 'determine eventInModule'): boolean;

        /**
         * Triggers preset item selection action based on settings passing text/value
         */
        (behavior: 'determine select action', text: string, value: string): void;

        /**
         * Sets dropdown to active state
         */
        (behavior: 'set active'): void;

        /**
         * Sets dropdown to visible state
         */
        (behavior: 'set visible'): void;

        /**
         * Removes dropdown active state
         */
        (behavior: 'remove active'): void;

        /**
         * Removes dropdown visible state
         */
        (behavior: 'remove visible'): void;

        /**
         * Returns whether dropdown is a selection dropdown
         */
        (behavior: 'is selection'): boolean;

        /**
         * Returns whether dropdown is animated
         */
        (behavior: 'is animated'): boolean;

        /**
         * Returns whether dropdown is visible
         */
        (behavior: 'is visible'): boolean;

        /**
         * Returns whether dropdown is hidden
         */
        (behavior: 'is hidden'): boolean;

        /**
         * Returns dropdown value as set on page load
         */
        (behavior: 'get default text'): string;

        /**
         * Returns placeholder text
         */
        (behavior: 'get placeholder text'): string;

        (behavior: 'destroy'): JQuery;
        <K extends keyof DropdownSettings>(behavior: 'setting', name: K, value?: undefined,): Partial<Pick<DropdownSettings, keyof DropdownSettings>>;
        <K extends keyof DropdownSettings>(behavior: 'setting', name: K, value: DropdownSettings[K]): JQuery;
        (behavior: 'setting', value: Partial<Pick<DropdownSettings, keyof DropdownSettings>>): JQuery;
        (settings?: Partial<Pick<DropdownSettings, keyof DropdownSettings>>): JQuery;
    }

    /**
     * @see {@link http://fomantic-ui.com/modules/dropdown.html#/settings}
     */
    interface DropdownSettings {
        // region Dropdown Settings

        /**
         * Event used to trigger dropdown (can be 'hover', 'click' or a custom event).
         * @default 'click'
         */
        on: string;

        /**
         * Sets a default action to occur.
         * @see {@link https://fomantic-ui.com/modules/dropdown.html#/usage}
         * @default 'auto'
         */
        action:
            | 'auto'
            | 'activate'
            | 'select'
            | 'combo'
            | 'nothing'
            | 'hide'
            | ((this: JQuery, text: string, value: string | false, element: JQuery) => void);

        /**
         * When specified allows you to initialize dropdown with specific values.
         * @see {@link https://fomantic-ui.com/modules/dropdown.html#/usage}
         * @default false
         */
        values: any;

        /**
         * Whether the dropdown value can be cleared by the user after being selected.
         * @default false
         */
        clearable: boolean;

        /**
         * Can be set to an object to specify API settings for retrieving remote selection menu content from an API endpoint.
         * @see {@link https://fomantic-ui.com/behaviors/api.html#/settings}
         * @default false
         */
        apiSettings: false | Partial<Pick<APISettings, keyof APISettings>> | Partial<Pick<JQueryAjaxSettings, keyof JQueryAjaxSettings>>;

        /**
         * Whether dropdown should select new option when using keyboard shortcuts.
         * Setting to 'false' will require 'enter' or left click to confirm a choice.
         * @default true
         */
        selectOnKeydown: boolean;

        /**
         * The minimum characters for a search to begin showing results.
         * @default 0
         */
        minCharacters: number;

        /**
         * Whether results returned from API should be filtered by query before being displayed.
         * @default false
         */
        filterRemoteData: boolean;

        /**
         * When enabled, will automatically store selected name/value pairs in 'sessionStorage' to preserve user selection on page refresh.
         * Disabling will clear remote dropdown values on refresh.
         * @default true
         */
        saveRemoteData: boolean;

        /**
         * How long to wait after last user input to search remotely.
         * @default 200
         */
        throttle: number;

        /**
         * Element context to use when checking whether can show when 'keepOnScreen: true'.
         * @default 'window'
         */
        context: string | JQuery;

        /**
         * When set to 'auto' determines direction based on whether dropdown can fit on screen.
         * Set to 'upward' or 'downward' to always force a direction.
         * @default 'auto'
         */
        direction: 'auto' | 'upward' | 'downward';

        /**
         * Whether dropdown should try to keep itself on screen by checking whether menus display position in its 'context' (Default context is page).
         * @default true
         */
        keepOnScreen: boolean;

        /**
         * When using 'search selection' specifies how to match values.
         * @default 'both'
         */
        match: 'both' | 'value' | 'text';

        /**
         * Specifying to "true" will use a fuzzy full text search, setting to "exact" will force the exact search to be matched somewhere in the string, setting to "false" will only match start of string.
         * @default 'exact'
         */
        fullTextSearch: boolean | 'exact';

        /**
         * When activated, searches will also match results for base diacritic letters.
         * For example when searching for 'a', it will also match 'á' or 'â' or 'å' and so on...
         * It will also ignore diacritics for the searchterm, so if searching for 'ó', it will match 'ó', but also 'o', 'ô' or 'õ' and so on...
         * @default false
         */
        ignoreDiacritics: boolean;

        /**
         * How to handle dividers in the dropdown while searching.
         * Dividers are defined as all siblings of items that match the 'divider selector'.
         * @see {@link https://fomantic-ui.com/modules/dropdown.html#dom-settings}
         * @default false
         */
        hideDividers: boolean | 'empty';

        /**
         *
         * @default 'auto'
         */
        placeholder: 'auto' | string | false;

        /**
         * Whether HTML included in dropdown values should be preserved.
         * Allows icons to show up in selected value.
         * @default true
         */
        preserveHTML: boolean;

        /**
         * Whether to sort values when creating a dropdown automatically from a select element.
         * @default false
         */
        sortSelect: boolean | 'natural' | ((a: any, b: any) => number);

        /**
         * Whether search selection will force currently selected choice when element is blurred.
         * If a 'select' tag with a required attribute was used, the 'forceSelection' setting will be set to 'true' automatically.
         * @default false
         */
        forceSelection: boolean;

        /**
         * Whether search selection should allow users to add their own selections, works for single or multiselect.
         * @default false
         */
        allowAdditions: boolean;

        /**
         * Whether values with non matching cases should be treated as identical when adding them to a dropdown.
         * @default false
         */
        ignoreCase: boolean;

        /**
         * Whether values with non matching cases should be treated as identical when filtering the items.
         * @default true
         */
        ignoreSearchCase: boolean;

        /**
         * Whether search result should highlight matching strings
         * @default false
         */
        highlightMatches: boolean;

        /**
         * If disabled user additions will appear in the dropdown's menu using a specially formatted selection item formatted by 'templates.addition'.
         * @default true
         */
        hideAdditions: boolean;

        /**
         * When set to a number, sets the maximum number of selections.
         * @default false
         */
        maxSelections: false | number;

        /**
         * Whether multiselect should use labels. Must be set to 'true' when 'allowAdditions' is 'true'.
         * @default true
         */
        useLabels: boolean;

        /**
         * When multiselect uses normal input tag, the values will be delimited with this character.
         * Also used as the keyboard shortcut while entering multiple values.
         * @default ','
         */
        delimiter: string;

        /**
         * Whether to show dropdown menu automatically on element focus.
         * @default false
         */
        showOnFocus: boolean;

        /**
         * When set to 'true' will fire 'onChange' even when the value a user select matches the currently selected value.
         * @default false
         */
        allowReselection: boolean;

        /**
         * Whether to allow the element to be navigable by keyboard, by automatically creating a 'tabindex'.
         * @default true
         */
        allowTab: boolean;

        /**
         * Whether menu items with sub-menus (categories) should be selectable.
         * @default false
         */
        allowCategorySelection: boolean;

        /**
         * Whether callbacks should fire when initializing dropdown values.
         * @default false
         */
        fireOnInit: boolean;

        /**
         * Named transition to use when animating menu in and out.
         * Defaults to 'slide down' or 'slide up' depending on dropdown direction. Fade and slide down are available without including 'ui transitions'.
         *
         * Alternatively you can provide an 'object' to set individual values for hide/show transitions as well as hide/show duration.
         * @default 'auto'
         */
        transition: string | Dropdown.TransitionSettings;

        /**
         * Duration of animation events.
         * The value will be ignored when individual hide/show duration values are provided via the 'transition' setting.
         * @default 200
         */
        duration: number;

        /**
         * Specify the final transition display type ('block', 'inline-block' etc) so that it doesn't have to be calculated.
         * @default false
         */
        displayType: false | string;

        /**
         * Whether option headers should have an additional divider line underneath when converted from '<select><optgroup>'.
         * @default true
         */
        headerDivider: boolean;

        /**
         * Whether the dropdown should collapse upon selection of an actionable item.
         * @default true
         */
        collapseOnActionable: boolean;

        /**
         * Whether the dropdown should collapse upon clicking the clearable icon.
         * @default false
         */
        collapseOnClearable: boolean;

        /**
         * Allows customization of multi-select labels.
         * @default true
         */
        label: object;

        /**
         * Time in milliseconds to debounce show or hide behavior when 'on: hover' is used, or when 'touch' is used..
         * @default true
         */
        delay: object;

        // endregion

        // region Callbacks

        /**
         * Is called after a dropdown value changes.
         * Receives the name and value of selection and the active menu element.
         */
        onChange(value?: string, text?: string, $choice?: JQuery): void;

        /**
         * Is called after a dropdown selection is added using a multiple select dropdown, only receives the added value.
         */
        onAdd(addedValue: string, addedText: string, $addedChoice: JQuery): void;

        /**
         * Is called after a dropdown selection is removed using a multiple select dropdown, only receives the removed value.
         */
        onRemove(removedValue: string, removedText: string, $removedChoice: JQuery): void;

        /**
         * Is called after an actionable item has been selected.
         */
        onActionable(value: string, text: string, $choice: JQuery): void;

        /**
         * Is called before a search takes place to filter the items list.
         * If 'false' is returned, the search and item filtering is cancelled.
         */
        onSearch(): void;

        /**
         * Is called after a label is selected by a user.
         */
        onLabelSelect($selectedLabels: JQuery): void;

        /**
         * Allows you to modify a label before it is added.
         * Expects the jQ DOM element for a label to be returned.
         */
        onLabelCreate(value: string, text: string): void;

        /**
         * Called when a label is remove, 'return false;' will prevent the label from being removed.
         */
        onLabelRemove(value: string): void;

        /**
         * Is called after a dropdown is searched with no matching values.
         */
        onNoResults(searchValue: string): void;

        /**
         * Is called before a dropdown is shown.
         * If 'false' is returned, dropdown will not be shown.
         */
        onShow(searchValue: string): void;

        /**
         * Is called before a dropdown is hidden.
         * If 'false' is returned, dropdown will not be hidden.
         */
        onHide(): void;

        // endregion

        // region DOM Settings

        /**
         * Selectors used to find parts of a module.
         */
        selector: Dropdown.SelectorSettings;

        /**
         * Class names used to determine element state.
         */
        className: Dropdown.ClassNameSettings;

        /**
         * Class names used to determine element messages.
         */
        message: Dropdown.MessageSettings;

        /**
         *
         */
        regExp: Dropdown.RegExpSettings;

        /**
         *
         */
        metadata: Dropdown.MetadataSettings;

        /**
         *
         */
        fields: Dropdown.FieldsSettings;

        /**
         *
         */
        keys: Dropdown.KeysSettings;

        // endregion

        // region Debug Settings

        /**
         * Name used in log statements
         * @default 'Dropdown'
         */
        name: string;

        /**
         * Event namespace. Makes sure module teardown does not effect other events attached to an element.
         * @default 'dropdown'
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

        error: Dropdown.ErrorSettings;

        // endregion
    }

    namespace Dropdown {
        type TransitionSettings = Partial<Pick<Settings.Transition, keyof Settings.Transition>>;
        type SelectorSettings = Partial<Pick<Settings.Selectors, keyof Settings.Selectors>>;
        type ClassNameSettings = Partial<Pick<Settings.ClassNames, keyof Settings.ClassNames>>;
        type MessageSettings = Partial<Pick<Settings.Messages, keyof Settings.Messages>>;
        type RegExpSettings = Partial<Pick<Settings.RegExps, keyof Settings.RegExps>>;
        type MetadataSettings = Partial<Pick<Settings.Metadatas, keyof Settings.Metadatas>>;
        type FieldsSettings = Partial<Pick<Settings.Fields, keyof Settings.Fields>>;
        type KeysSettings = Partial<Pick<Settings.Keys, keyof Settings.Keys>>;
        type ErrorSettings = Partial<Pick<Settings.Errors, keyof Settings.Errors>>;

        namespace Settings {
            interface Transition {

                /**
                 * Named animation show event to used.
                 * Must be defined in CSS.
                 */
                showMethod: string;

                /**
                 * Duration of the CSS show transition animation
                 */
                showDuration: number;

                /**
                 * Named animation hide event to used.
                 * Must be defined in CSS.
                 */
                hideMethod: string;

                /**
                 * Duration of the CSS hide transition animation
                 */
                hideDuration: number;
            }

            interface Selectors {
                /**
                 * @default '.addition'
                 */
                addition: string;

                /**
                 * @default '.divider, .header'
                 */
                divider: string;

                /**
                 * @default '.ui.dropdown'
                 */
                dropdown: string;

                /**
                 * @default '> .dropdown.icon'
                 */
                icon: string;

                /**
                 * @default '> input[type="hidden"], > select'
                 */
                input: string;

                /**
                 * @default '.item'
                 */
                item: string;

                /**
                 * @default '> .label'
                 */
                label: string;

                /**
                 * @default '> .label > .delete.icon'
                 */
                remove: string;

                /**
                 * @default '.label'
                 */
                siblingLabel: string;

                /**
                 * @default '.menu'
                 */
                menu: string;

                /**
                 * @default '.message'
                 */
                message: string;

                /**
                 * @default '.dropdown.icon'
                 */
                menuIcon: string;

                /**
                 * @default 'input.search, .menu > .search > input'
                 */
                search: string;

                /**
                 * @default '> span.sizer'
                 */
                sizer: string;

                /**
                 * @default '> .text:not(.icon)'
                 */
                text: string;

                /**
                 * @default '.disabled, .filtered'
                 */
                unselectable: string;

                /**
                 * @default '> .remove.icon'
                 */
                clearIcon: string;
            }

            interface ClassNames {
                /**
                 * @default 'active'
                 */
                active: string;

                /**
                 * @default 'addition'
                 */
                addition: string;

                /**
                 * @default 'animating'
                 */
                animating: string;

                /**
                 * @default 'description'
                 */
                description: string;

                /**
                 * @default 'vertical'
                 */
                descriptionVertical: string;

                /**
                 * @default 'disabled'
                 */
                disabled: string;

                /**
                 * @default 'empty'
                 */
                empty: string;

                /**
                 * @default 'ui dropdown'
                 */
                dropdown: string;

                /**
                 * @default 'filtered'
                 */
                filtered: string;

                /**
                 * @default 'hidden transition'
                 */
                hidden: string;

                /**
                 * @default 'icon'
                 */
                icon: string;

                /**
                 * @default 'image'
                 */
                image: string;

                /**
                 * @default 'item'
                 */
                item: string;

                /**
                 * @default 'ui label'
                 */
                label: string;

                /**
                 * @default 'loading'
                 */
                loading: string;

                /**
                 * @default 'menu'
                 */
                menu: string;

                /**
                 * @default 'message'
                 */
                message: string;

                /**
                 * @default 'multiple'
                 */
                multiple: string;

                /**
                 * @default 'default'
                 */
                placeholder: string;

                /**
                 * @default 'sizer'
                 */
                sizer: string;

                /**
                 * @default 'search'
                 */
                search: string;

                /**
                 * @default 'selected'
                 */
                selected: string;

                /**
                 * @default 'selection'
                 */
                selection: string;

                /**
                 * @default 'text'
                 */
                text: string;

                /**
                 * @default 'upward'
                 */
                upward: string;

                /**
                 * @default 'left'
                 */
                leftward: string;

                /**
                 * @default 'visible'
                 */
                visible: string;

                /**
                 * @default 'clearable'
                 */
                clearable: string;

                /**
                 * @default 'noselection'
                 */
                noselection: string;

                /**
                 * @default 'delete'
                 */
                delete: string;

                /**
                 * @default 'header'
                 */
                header: string;

                /**
                 * @default 'divider'
                 */
                divider: string;

                /**
                 * @default ''
                 */
                groupIcon: string;

                /**
                 * @default 'unfilterable'
                 */
                unfilterable: string;

                /**
                 * @default 'actionable'
                 */
                actionable: string;
            }

            interface Messages {
                /**
                 * @default 'Add <b>{term}</b>'
                 */
                addResult: string;

                /**
                 * @default '{count} selected'
                 */
                count: string;

                /**
                 * @default 'Max {maxCount} selections'
                 */
                maxSelections: string;

                /**
                 * @default 'No results found.'
                 */
                noResults: string;

                /**
                 * @default 'There was an error contacting the server'
                 */
                serverError: string;
            }

            interface RegExps {
                /**
                 * @default '/[-[\]{}()*+?.,\\^$|#\s]/g'
                 */
                escape: string;
            }

            interface Metadatas {
                /**
                 * @default 'defaultText'
                 */
                defaultText: string;

                /**
                 * @default 'defaultValue'
                 */
                defaultValue: string;

                /**
                 * @default 'placeholderText'
                 */
                placeholderText: string;

                /**
                 * @default 'text'
                 */
                text: string;

                /**
                 * @default 'value'
                 */
                value: string;
            }

            interface Fields {
                /**
                 * Grouping for api results
                 * @default 'results'
                 */
                remoteValues: string;

                /**
                 * Grouping for all dropdown values
                 * @default 'values'
                 */
                values: string;

                /**
                 * Whether value should be disabled
                 * @default 'disabled'
                 */
                disabled: string;

                /**
                 * Displayed dropdown text
                 * @default 'name'
                 */
                name: string;

                /**
                 * Displayed dropdown description
                 * @default 'description'
                 */
                description: string;

                /**
                 * Whether description should be vertical
                 * @default 'descriptionVertical'
                 */
                descriptionVertical: string;

                /**
                 * Actual dropdown value
                 * @default 'value'
                 */
                value: string;

                /**
                 * Displayed text when selected
                 * @default 'text'
                 */
                text: string;

                /**
                 * custom data atttributes
                 * @default 'data'
                 */
                data: string;

                /**
                 * Type of dropdown element
                 * @default 'type'
                 */
                type: string;

                /**
                 * Optional image path
                 * @default 'image'
                 */
                image: string;

                /**
                 * Optional individual class for image
                 * @default 'imageClass'
                 */
                imageClass: string;

                /**
                 * Optional alt text for image
                 * @default 'alt'
                 */
                alt: string;

                /**
                 * Optional icon name
                 * @default 'icon'
                 */
                icon: string;

                /**
                 * Optional individual class for icon (for example to use flag instead)
                 * @default 'iconClass'
                 */
                iconClass: string;

                /**
                 * Optional individual class for item/header
                 * @default 'class'
                 */
                class: string;

                /**
                 * Optional divider append for group headers
                 * @default 'divider'
                 */
                divider: string;

                /**
                 * Optional actionable item
                 * @default 'actionable'
                 */
                actionable: string;
            }

            interface Keys {
                /**
                 * @default 8
                 */
                backspace: number;

                /**
                 * @default 46
                 */
                deleteKey: number;

                /**
                 * @default 13
                 */
                enter: number;

                /**
                 * @default 27
                 */
                escape: number;

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
                 * @default 'You called a dropdown action that was not defined'
                 */
                action: string;

                /**
                 * @default 'Once a select has been initialized behaviors must be called on the created ui dropdown'
                 */
                alreadySetup: string;

                /**
                 * @default 'Allowing user additions currently requires the use of labels.'
                 */
                labels: string;

                /**
                 * @default '<select> requires multiple property to be set to correctly preserve multiple values'
                 */
                missingMultiple: string;

                /**
                 * @default 'The method you called is not defined.'
                 */
                method: string;

                /**
                 * @default 'The API module is required to load resources remotely'
                 */
                noAPI: string;

                /**
                 * @default 'Saving remote data requires session storage'
                 */
                noStorage: string;

                /**
                 * @default 'This module requires ui transitions'
                 */
                noTransition: string;

                /**
                 * @default '"ignoreDiacritics" setting will be ignored. Browser does not support String().normalize(). You may consider including  as a polyfill.'
                 */
                noNormalize: string;
            }
        }
    }
}
