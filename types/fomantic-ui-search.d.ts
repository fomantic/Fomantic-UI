declare namespace FomanticUI {
    interface Search {
        settings: SearchSettings;

        /**
         * Search for value currently set in search input.
         */
        (behavior: 'query', callback?: () => void): JQuery;

        /**
         * Displays message in search results with text, using template matching type.
         */
        (behavior: 'display message', text: string, type?: string): JQuery;

        /**
         * Cancels current remote search query.
         */
        (behavior: 'cancel query'): JQuery;

        /**
         * Search local object for specified query and display results.
         */
        (behavior: 'search local', query: string): JQuery;

        /**
         * Whether has minimum characters.
         */
        (behavior: 'has minimum characters'): boolean;

        /**
         * Search remote endpoint for specified query and display results.
         */
        (behavior: 'search remote', query: string, callback?: () => void): JQuery;

        /**
         * Search object for specified query and return results.
         */
        (behavior: 'search object', query: string, object: string, searchFields: string): JQuery;

        /**
         * Whether search is currently focused.
         */
        (behavior: 'is focused'): boolean;

        /**
         * Whether search results are visible.
         */
        (behavior: 'is visible'): boolean;

        /**
         * Whether search results are empty.
         */
        (behavior: 'is empty'): boolean;

        /**
         * Returns current search value.
         */
        (behavior: 'get value'): string;

        /**
         * Returns JSON object matching searched title or id.
         */
        (behavior: 'get result', value: string): object;

        /**
         * Sets search input to value.
         */
        (behavior: 'set value', value: string): JQuery;

        /**
         * Reads cached results for query.
         */
        (behavior: 'read cache', query: string): JQuery;

        /**
         * Clears value from cache, if no parameter passed clears all cache.
         */
        (behavior: 'clear cache', query?: string): JQuery;

        /**
         * Writes cached results for query.
         */
        (behavior: 'write cache', query: string): JQuery;

        /**
         * Adds HTML to results and displays.
         */
        (behavior: 'add results', html: string): JQuery;

        /**
         * Shows results container.
         */
        (behavior: 'show results', callback?: () => void): JQuery;

        /**
         * Hide results container.
         */
        (behavior: 'hide results', callback?: () => void): JQuery;

        /**
         * Generates results using parser specified by 'settings.template'.
         */
        (behavior: 'generate results', response: object): JQuery;

        /**
         * Removes all events.
         */
        (behavior: 'destroy'): JQuery;

        <K extends keyof SearchSettings>(behavior: 'setting', name: K, value?: undefined,): Partial<Pick<SearchSettings, keyof SearchSettings>>;
        <K extends keyof SearchSettings>(behavior: 'setting', name: K, value: SearchSettings[K]): JQuery;
        (behavior: 'setting', value: Partial<Pick<SearchSettings, keyof SearchSettings>>): JQuery;
        (settings?: Partial<Pick<SearchSettings, keyof SearchSettings>>): JQuery;
    }

    /**
     * @see {@link https://fomantic-ui.com/modules/search.html#/settings}
     */
    interface SearchSettings {
        // region Search Settings

        /**
         * Settings for API call.
         * @see {@link https://fomantic-ui.com/behaviors/api.html#/settings}
         * @default {}
         */
        apiSettings: Partial<Pick<APISettings, keyof APISettings>> | JQueryAjaxSettings;

        /**
         * Minimum characters to query for results.
         * @default 1
         */
        minCharacters: number;

        /**
         * Whether search should show results on focus (must also match min character length).
         * @default true
         */
        searchOnFocus: boolean;

        /**
         * Named transition to use when animating menu in and out.
         * Fade and slide down are available without including ui transitions.
         * @see {@link https://fomantic-ui.com/modules/transition.html}
         * @default 'fade'
         */
        transition: string;

        /**
         * Duration of animation events.
         * @default 300
         */
        duration: number;

        /**
         * Maximum results to display when using local and simple search, maximum category count for category search.
         * @default 7
         */
        maxResults: number;

        /**
         * Caches results locally to avoid requerying server.
         * @default true
         */
        cache: boolean;

        /**
         * Specify a Javascript object which will be searched locally.
         * @default false
         */
        source: boolean | object;

        /**
         * Whether the search should automatically select the first search result after searching.
         * @default false
         */
        selectFirstResult: boolean;

        /**
         * Whether a "no results" message should be shown if no results are found.
         * @default false
         */
        showNoResults: boolean;

        /**
         * Possible values
         * * `exact` will force the exact search to be matched somewhere in the string.
         * * `some` Will do the same as exact but supports multiple search values separated by whitespace. At least one word must match. (New in v2.9.1)
         * * `all` is same as some but all words have to match in all given search fields of each record altogether. (New in v2.9.1)
         * * `true` will use a fuzzy full text search.
         * * `false` will only match to start of string.
         * @default 'exact'
         */
        fullTextSearch: 'exact' | 'some' | 'all' | boolean;

        /**
         * List mapping display content to JSON property, either with API or 'source'.
         * @default {}
         */
        fields: Search.FieldsSettings;

        /**
         * Specify object properties inside local source object which will be searched.
         * @default ['title', 'description']
         */
        searchFields: string[];

        /**
         * Delay before hiding results after search blur.
         * @default 0
         */
        hideDelay: number;

        /**
         * Delay before querying results on inputchange.
         * @default 100
         */
        searchDelay: number;

        /**
         * Easing equation when using fallback Javascript animation.
         * EaseOutExpo is included with search, for additional options you must include `easing equations`.
         * @see {@link https://gsgd.co.uk/sandbox/jquery/easing/}
         * @default 'easeOutExpo'
         */
        easing: string;

        /**
         * When activated, searches will also match results for base diacritic letters.
         * For example when searching for 'a', it will also match 'á' or 'â' or 'å' and so on...
         * It will also ignore diacritics for the searchterm, so if searching for 'ó', it will match 'ó', but also 'o', 'ô' or 'õ' and so on...
         * @default false
         */
        ignoreDiacritics: boolean;

        /**
         * Whether to consider case sensitivity on local searching
         * @default true
         */
        ignoreSearchCase: boolean;

        /**
         * Whether search result should highlight matching strings
         * @default false
         */
        highlightMatches: boolean;

        /**
         * Template to use (specified in settings.templates)
         * @default 'standard'
         */
        type: 'escape' | 'message' | 'category' | 'standard';

        /**
         * Field to display in standard results template
         * @default ''
         */
        displayField: string;

        /**
         * Whether to add events to prompt automatically
         * @default true
         */
        automatic: boolean;

        // endregion

        // region Callbacks

        /**
         * Callback on element selection by user.
         * The first parameter includes the filtered response results for that element.
         * The function should return 'false' to prevent default action (closing search results and selecting value).
         */
        onSelect(this: JQuery, result: object, response: object): any;

        /**
         * Callback after processing element template to add HTML to results.
         * Function should return 'false' to prevent default actions.
         */
        onResultsAdd(this: JQuery, html: string): void | boolean;

        /**
         * Callback on search query.
         */
        onSearchQuery(this: JQuery, query: string): void;

        /**
         * Callback on server response.
         */
        onResults(this: JQuery, response: object): void;

        /**
         * Callback when results are opened.
         */
        onResultsOpen(this: JQuery): void;

        /**
         * Callback when results are closed.
         */
        onResultsClose(this: JQuery): void;

        // endregion

        // region Template Settings

        templates: Search.TemplateSettings;

        // endregion

        // region DOM Settings

        /**
         * DOM Selectors used internally.
         * Selectors used to find parts of a module.
         */
        selector: Search.SelectorSettings;

        /**
         * Regular expressions used for matching.
         */
        regExp: Search.RegExpSettings;

        /**
         * Class names used to determine element state.
         */
        className: Search.ClassNameSettings;

        /**
         * HTML5 metadata attributes used internally.
         */
        metadata: Search.MetadataSettings;

        // endregion

        // region Debug Settings

        /**
         * Name used in log statements
         * @default 'Search'
         */
        name: string;

        /**
         * Event namespace. Makes sure module teardown does not effect other events attached to an element.
         * @default 'search'
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

        error: Search.ErrorSettings;

        // endregion
    }

    namespace Search {
        type TemplateSettings = Partial<Pick<Settings.Templates, keyof Settings.Templates>>;
        type SelectorSettings = Partial<Pick<Settings.Selectors, keyof Settings.Selectors>>;
        type RegExpSettings = Partial<Pick<Settings.RegExps, keyof Settings.RegExps>>;
        type ClassNameSettings = Partial<Pick<Settings.ClassNames, keyof Settings.ClassNames>>;
        type MetadataSettings = Partial<Pick<Settings.Metadatas, keyof Settings.Metadatas>>;
        type FieldsSettings = Partial<Pick<Settings.Fields, keyof Settings.Fields>>;
        type ErrorSettings = Partial<Pick<Settings.Errors, keyof Settings.Errors>>;

        namespace Settings {
            interface Templates {
                /**
                 * @default function(string, preserveHTML)
                 */
                escape: (string: string, preserveHTML?: boolean) => string;

                /**
                 * @default function(message, type, header)
                 */
                message: (message: string, type?: string, header?: string) => string;

                /**
                 * @default function(response, fields, preserveHTML)
                 */
                category: (response: unknown, fields: {[key: string]: string}, preserveHTML?: boolean) => string;

                /**
                 * @default function(response, fields, preserveHTML)
                 */
                standard: (response: unknown, fields: {[key: string]: string}, preserveHTML?: boolean) => string;
            }

            interface Selectors {
                /**
                 * @default '.prompt'
                 */
                prompt: string;

                /**
                 * @default '.search.button'
                 */
                searchButton: string;

                /**
                 * @default '.results'
                 */
                results: string;

                /**
                 * @default '.category'
                 */
                category: string;

                /**
                 * @default '.result'
                 */
                result: string;
            }

            interface RegExps {
                /**
                 * @default /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g
                 */
                escape: RegExp;

                /**
                 * @default '(?:\s|^)'
                 */
                beginsWith: RegExp;
            }

            interface ClassNames {
                /**
                 * @default 'active'
                 */
                active: string;

                /**
                 * @default 'empty'
                 */
                empty: string;

                /**
                 * @default 'focus'
                 */
                focus: string;

                /**
                 * @default 'loading'
                 */
                loading: string;

                /**
                 * @default 'down'
                 */
                pressed: string;
            }

            interface Metadatas {
                /**
                 * @default 'cache'
                 */
                cache: string;

                /**
                 * @default 'results'
                 */
                results: string;
            }

            interface Fields {
                /**
                 * Array of categories (category view)
                 * @default 'results'
                 */
                categories: string;

                /**
                 * Name of category (category view)
                 * @default 'name'
                 */
                categoryName: string;

                /**
                 * Array of results (category view)
                 * @default 'results'
                 */
                categoryResults: string;

                /**
                 * Sesult description
                 * @default ' description'
                 */
                description: string;

                /**
                 * Result image
                 * @default 'image'
                 */
                image: string;

                /**
                 * Result alt text for image
                 * @default 'alt'
                 */
                alt: string;

                /**
                 * Result price
                 * @default 'price'
                 */
                price: string;

                /**
                 * Array of results (standard)
                 * @default 'results'
                 */
                results: string;

                /**
                 * Result title
                 * @default 'title'
                 */
                title: string;

                /**
                 * Result url
                 * @default 'url'
                 */
                url: string;

                /**
                 * "view more" object name
                 * @default 'action'
                 */
                action: string;

                /**
                 * "view more" text
                 * @default 'text'
                 */
                actionText: string;

                /**
                 * "view more" url
                 * @default 'url'
                 */
                actionURL: string;
            }

            interface Errors {
                /**
                 * @default 'Cannot search. No source used, and Fomantic API module was not included'
                 */
                source: string;

                /**
                 * @default 'No Results'
                 */
                noResultsHeader: string;

                /**
                 * @default 'Your search returned no results'
                 */
                noResults: string;

                /**
                 * @default 'Error in debug logging, exiting.'
                 */
                logging: string;

                /**
                 * @default 'A valid template name was not specified.'
                 */
                noTemplate: string;

                /**
                 * @default 'There was an issue with querying the server.'
                 */
                serverError: string;

                /**
                 * @default 'Results must be an array to use maxResults setting'
                 */
                maxResults: string;

                /**
                 * @default 'The method you called is not defined.'
                 */
                method: string;
            }
        }
    }
}
