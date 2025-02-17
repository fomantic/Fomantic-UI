declare namespace FomanticUI {
    interface Tab {
        settings: TabSettings;

        /**
         * Attaches tab action to given selector.
         * Default event if none specified is 'toggle'.
         */
        (behavior: 'attach events', selector: string, event?: string): JQuery;

        /**
         * Changes tab to path.
         */
        (behavior: 'change tab', path: string): JQuery;

        /**
         * Sets current path to state.
         */
        (behavior: 'set state', path: string): JQuery;

        /**
         * Returns current path.
         */
        (behavior: 'get path'): string;

        /**
         * Returns whether tab exists.
         */
        (behavior: 'is tab'): boolean;

        /**
         * Returns cached HTML for path.
         */
        (behavior: 'cache read', path: string): string;

        /**
         * Sets cached HTML for path.
         */
        (behavior: 'cache add', path: string, html: string): JQuery;

        /**
         * Removes cached HTML for path.
         */
        (behavior: 'cache remove', path: string): JQuery;

        /**
         * Destroys instance and removes all events.
         */
        (behavior: 'destroy'): JQuery;

        <K extends keyof TabSettings>(behavior: 'setting', name: K, value?: undefined,): Partial<Pick<TabSettings, keyof TabSettings>>;
        <K extends keyof TabSettings>(behavior: 'setting', name: K, value: TabSettings[K]): JQuery;
        (behavior: 'setting', value: Partial<Pick<TabSettings, keyof TabSettings>>): JQuery;
        (settings?: Partial<Pick<TabSettings, keyof TabSettings>>): JQuery;
    }

    /**
     * @see {@link https://fomantic-ui.com/modules/tab.html#/settings}
     */
    interface TabSettings {
        // region Tab Settings

        /**
         * Whether tab should load remote content as same url as history.
         * @default false
         */
        auto: boolean;

        /**
         * When set to 'siblings' will only deactivate elements that are DOM siblings with the activated element.
         * When set to 'all' the component will deactivate all other elements initialized at the same time.
         * @default 'siblings'
         */
        deactivate: 'siblings' | 'all';

        /**
         * Whether to record history events for tab changes.
         * @default false
         */
        history: boolean;

        /**
         * Do not load content remotely on first tab load.
         * Useful when open tab is rendered on server.
         * @default false
         */
        ignoreFirstLoad: boolean;

        /**
         * Whether inline scripts in tab HTML should be parsed on tab load.
         * Defaults to 'once', parsing only on first load.
         * Can also be set to 'true' or 'false' to always parse or never parse inline scripts.
         * @default 'once'
         */
        evaluateScripts: 'once' | boolean;

        /**
         * When 'true' and no active tab exists, the first available tab will be activated.
         * When a string is given and no active tab exists, the tab those named path matches the string will be activated.
         * When 'false' no active tab detection will happen.
         * @default true
         */
        autoTabActivation: boolean | string;

        /**
         * Tab should reload content every time it is opened.
         * @default false
         */
        alwaysRefresh: boolean;

        /**
         * Can be set to either 'response', 'DOM' or 'html'.
         * Using 'DOM' will cache the a clone of the DOM tree, preserving all events as they existed on render.
         * 'response' will cache the original response on load, this way callbacks always receive the same content.
         * Using 'html' will cache the resulting html after all callbacks, making sure any changes to content are preserved.
         * @default 'response'
         */
        cacheType: 'response' | 'DOM' | 'html';

        /**
         * Tab should cache content after loading locally to avoid server trip on second load.
         * @default true
         */
        cache: boolean;

        /**
         * Settings object for '$.api' call.
         * @see {@link https://fomantic-ui.com/behaviors/api.html#/settings}
         * @default false
         */
        apiSettings: false | FomanticUI.APISettings | JQueryAjaxSettings;

        /**
         * Can be set to 'hash' or 'state'.
         * 'hash' will use an in-page link to create history events.
         * 'state' will use DOM History and load pages from server on refresh.
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history}
         * @default 'hash'
         */
        historyType: 'hash' | 'state';

        /**
         * When using historyType 'state' you must specify the base URL for all internal links.
         * @default false
         */
        path: boolean;

        /**
         * Tabs are limited to those found inside this context.
         * @default false
         */
        context: JQuery | string | false;

        /**
         * If enabled limits tabs to children of passed context.
         * @default false
         */
        childrenOnly: boolean;

        /**
         * Maximum amount of nested tabs allowed (avoids recursion).
         * @default 25
         */
        maxDepth: boolean;

        // endregion

        // region Callbacks

        /**
         * Callback only the first time a tab is loaded.
         */
        onFirstLoad(this: JQuery, tabPath: string, parameterArray: string, historyEvent: string): void;

        /**
         * Callback every time a tab is loaded.
         */
        onLoad(this: JQuery, tabPath: string, parameterArray: string, historyEvent: string): void;

        /**
         * Called when a tab begins loading remote content.
         */
        onRequest(this: JQuery, tabPath: string): void;

        /**
         * Called after a tab becomes visible.
         */
        onVisible(this: JQuery, tabPath: string): void;

        /**
         * Called before a tab is about to be changed.
         * Returning 'false' will cancel the tab change.
         */
        onBeforeChange(this: JQuery, tabPath: string): boolean;

        // endregion

        // region DOM Settings

        /**
         * Functions used to return content.
         */
        templates: Tab.TemplateSettings;

        /**
         * DOM Selectors used internally.
         * Selectors used to find parts of a module.
         */
        selector: Tab.SelectorSettings;

        /**
         * DOM metadata used by module.
         */
        metadata: Tab.MetadataSettings;

        /**
         * Class names used to determine element state.
         */
        className: Tab.ClassNameSettings;

        // endregion

        // region Debug Settings

        /**
         * Name used in log statements
         * @default 'Tab'
         */
        name: string;

        /**
         * Event namespace. Makes sure module teardown does not effect other events attached to an element.
         * @default 'tab'
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

        error: Tab.ErrorSettings;

        // endregion
    }

    namespace Tab {
        type TemplateSettings = Partial<Pick<Settings.Templates, keyof Settings.Templates>>;
        type SelectorSettings = Partial<Pick<Settings.Selectors, keyof Settings.Selectors>>;
        type MetadataSettings = Partial<Pick<Settings.Metadatas, keyof Settings.Metadatas>>;
        type ClassNameSettings = Partial<Pick<Settings.ClassNames, keyof Settings.ClassNames>>;
        type ErrorSettings = Partial<Pick<Settings.Errors, keyof Settings.Errors>>;

        namespace Settings {
            interface Templates {
                /**
                 * Returns page title
                 * @default Function
                 */
                determineTitle: (tabPath: string) => string | void;
            }

            interface Selectors {
                /**
                 * @default '.ui.tab'
                 */
                tabs: string;

                /**
                 * @default '.ui:not(.menu)'
                 */
                parent: string;
            }

            interface Metadatas {
                /**
                 * @default 'tab'
                 */
                tab: string;

                /**
                 * @default 'loaded'
                 */
                loaded: string;

                /**
                 * @default 'promise'
                 */
                promise: string;
            }

            interface ClassNames {
                /**
                 * @default 'loading'
                 */
                loading: string;

                /**
                 * @default 'active'
                 */
                active: string;
            }

            interface Errors {
                /**
                 * @default 'You attempted to load content without API module'
                 */
                api: string;

                /**
                 * @default 'The method you called is not defined'
                 */
                method: string;

                /**
                 * @default 'Activated tab cannot be found for this context.'
                 */
                missingTab: string;

                /**
                 * @default 'The tab you specified is missing a content url.'
                 */
                noContent: string;

                /**
                 * @default 'History enabled, but no path was specified'
                 */
                path: string;

                /**
                 * @default 'Max recursive depth reached'
                 */
                recursion: string;

                /**
                 * @default 'The state library has not been initialized'
                 */
                state: string;
            }
        }
    }
}
