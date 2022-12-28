declare namespace FomanticUI {
    interface Dropdown {
        settings: DropdownSettings;

        (behavior: 'destroy'): JQuery;
        <K extends keyof DropdownSettings>(behavior: 'setting', name: K, value?: undefined): DropdownSettings._Impl[K];
        <K extends keyof DropdownSettings>(behavior: 'setting', name: K, value: DropdownSettings._Impl[K]): JQuery;
        (behavior: 'setting', value: DropdownSettings): JQuery;
        (settings?: DropdownSettings): JQuery;
    }

    /**
     * @see {@link http://fomantic-ui.com/modules/dropdown.html#/settings}
     */
    type DropdownSettings = DropdownSettings.Param;

    namespace DropdownSettings {
        type Param = (
            | Pick<_Impl, 'on'>
            | Pick<_Impl, 'action'>
            | Pick<_Impl, 'values'>
            | Pick<_Impl, 'clearable'>
            | Pick<_Impl, 'apiSettings'>
            | Pick<_Impl, 'selectOnKeydown'>
            | Pick<_Impl, 'minCharacters'>
            | Pick<_Impl, 'filterRemoteData'>
            | Pick<_Impl, 'saveRemoteData'>
            | Pick<_Impl, 'throttle'>
            | Pick<_Impl, 'context'>
            | Pick<_Impl, 'direction'>
            | Pick<_Impl, 'keepOnScreen'>
            | Pick<_Impl, 'match'>
            | Pick<_Impl, 'fullTextSearch'>
            | Pick<_Impl, 'ignoreDiacritics'>
            | Pick<_Impl, 'hideDividers'>
            | Pick<_Impl, 'placeholder'>
            | Pick<_Impl, 'preserveHTML'>
            | Pick<_Impl, 'sortSelect'>
            | Pick<_Impl, 'forceSelection'>
            | Pick<_Impl, 'allowAdditions'>
            | Pick<_Impl, 'ignoreCase'>
            | Pick<_Impl, 'ignoreSearchCase'>
            | Pick<_Impl, 'hideAdditions'>
            | Pick<_Impl, 'maxSelections'>
            | Pick<_Impl, 'useLabels'>
            | Pick<_Impl, 'delimiter'>
            | Pick<_Impl, 'showOnFocus'>
            | Pick<_Impl, 'allowReselection'>
            | Pick<_Impl, 'allowTab'>
            | Pick<_Impl, 'allowCategorySelection'>
            | Pick<_Impl, 'fireOnInit'>
            | Pick<_Impl, 'transition'>
            | Pick<_Impl, 'duration'>
            | Pick<_Impl, 'displayType'>
            | Pick<_Impl, 'glyphWidth'>
            | Pick<_Impl, 'headerDivider'>
            | Pick<_Impl, 'collapseOnActionable'>
            | Pick<_Impl, 'label'>
            | Pick<_Impl, 'delay'>
            | Pick<_Impl, 'onChange'>
            | Pick<_Impl, 'onAdd'>
            | Pick<_Impl, 'onRemove'>
            | Pick<_Impl, 'onActionable'>
            | Pick<_Impl, 'onSearch'>
            | Pick<_Impl, 'onLabelSelect'>
            | Pick<_Impl, 'onLabelCreate'>
            | Pick<_Impl, 'onLabelRemove'>
            | Pick<_Impl, 'onNoResults'>
            | Pick<_Impl, 'onShow'>
            | Pick<_Impl, 'onHide'>
            | Pick<_Impl, 'message'>
            | Pick<_Impl, 'regExp'>
            | Pick<_Impl, 'metadata'>
            | Pick<_Impl, 'fields'>
            | Pick<_Impl, 'keys'>
            | Pick<_Impl, 'selector'>
            | Pick<_Impl, 'className'>
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
            apiSettings: false | ApiSettings;

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
            placeholder: 'auto' | String | false;

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
            sortSelect: boolean | 'natural' | Function;

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
            transition: boolean | object;

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
             * Maximum glyph width, used to calculate search size.
             * This is usually size of a "W" in your font in 'em'.
             * @default 1.037
             */
            glyphWidth: number;

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
            onChange(value: string, text: string, $choice: JQuery): void;

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

            errors: Dropdown.ErrorSettings;

            // endregion
        }
    }

    namespace Dropdown {
        type SelectorSettings = SelectorSettings.Param;

        namespace SelectorSettings {
            type Param = (
                | Pick<_Impl, 'addition'>
                | Pick<_Impl, 'divider'>
                | Pick<_Impl, 'dropdown'>
                | Pick<_Impl, 'icon'>
                | Pick<_Impl, 'input'>
                | Pick<_Impl, 'item'>
                | Pick<_Impl, 'label'>
                | Pick<_Impl, 'remove'>
                | Pick<_Impl, 'siblingLabel'>
                | Pick<_Impl, 'menu'>
                | Pick<_Impl, 'message'>
                | Pick<_Impl, 'menuIcon'>
                | Pick<_Impl, 'search'>
                | Pick<_Impl, 'sizer'>
                | Pick<_Impl, 'text'>
                | Pick<_Impl, 'unselectable'>
                | Pick<_Impl, 'clearIcon'>
            ) &
                Partial<Pick<_Impl, keyof _Impl>>;

            interface _Impl {
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
        }

        type ClassNameSettings = ClassNameSettings.Param;

        namespace ClassNameSettings {
            type Param = (
                | Pick<_Impl, 'active'>
                | Pick<_Impl, 'addition'>
                | Pick<_Impl, 'animating'>
                | Pick<_Impl, 'description'>
                | Pick<_Impl, 'descriptionVertical'>
                | Pick<_Impl, 'disabled'>
                | Pick<_Impl, 'empty'>
                | Pick<_Impl, 'dropdown'>
                | Pick<_Impl, 'filtered'>
                | Pick<_Impl, 'hidden'>
                | Pick<_Impl, 'icon'>
                | Pick<_Impl, 'image'>
                | Pick<_Impl, 'item'>
                | Pick<_Impl, 'label'>
                | Pick<_Impl, 'loading'>
                | Pick<_Impl, 'menu'>
                | Pick<_Impl, 'message'>
                | Pick<_Impl, 'multiple'>
                | Pick<_Impl, 'placeholder'>
                | Pick<_Impl, 'sizer'>
                | Pick<_Impl, 'search'>
                | Pick<_Impl, 'selected'>
                | Pick<_Impl, 'selection'>
                | Pick<_Impl, 'text'>
                | Pick<_Impl, 'upward'>
                | Pick<_Impl, 'leftward'>
                | Pick<_Impl, 'visible'>
                | Pick<_Impl, 'clearable'>
                | Pick<_Impl, 'noselection'>
                | Pick<_Impl, 'delete'>
                | Pick<_Impl, 'header'>
                | Pick<_Impl, 'divider'>
                | Pick<_Impl, 'groupIcon'>
                | Pick<_Impl, 'unfilterable'>
                | Pick<_Impl, 'actionable'>
            ) &
                Partial<Pick<_Impl, keyof _Impl>>;

            interface _Impl {
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
        }

        type ErrorSettings = ErrorSettings.Param;

        namespace ErrorSettings {
            type Param = (
                | Pick<_Impl, 'action'>
                | Pick<_Impl, 'alreadySetup'>
                | Pick<_Impl, 'labels'>
                | Pick<_Impl, 'missingMultiple'>
                | Pick<_Impl, 'method'>
                | Pick<_Impl, 'noAPI'>
                | Pick<_Impl, 'noStorage'>
                | Pick<_Impl, 'noTransition'>
                | Pick<_Impl, 'noNormalize'>
            ) &
                Partial<Pick<_Impl, keyof _Impl>>;

            interface _Impl {
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
