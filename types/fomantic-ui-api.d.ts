declare namespace FomanticUI {
    interface API {
        settings: APISettings;

        /**
         * Execute query using existing API settings.
         */
        (behavior: 'query'): JQuery;

        /**
         * Adds data to existing templated url and returns full url string.
         */
        (behavior: 'add url data', url: string, data: any): JQuery;

        /**
         * Gets promise for current API request.
         */
        (behavior: 'get request'): JQuery;

        /**
         * Aborts current API request.
         */
        (behavior: 'abort'): JQuery;

        /**
         * Returns whether last request was cancelled.
         */
        (behavior: 'was cancelled'): boolean;

        /**
         * Returns whether last request was failure.
         */
        (behavior: 'was failure'): boolean;

        /**
         * Returns whether last request was successful.
         */
        (behavior: 'was successful'): boolean;

        /**
         * Returns whether last request was completed.
         */
        (behavior: 'was complete'): boolean;

        /**
         * Returns whether element is disabled.
         */
        (behavior: 'is disabled'): boolean;

        /**
         * Returns whether element response is mocked.
         */
        (behavior: 'is mocked'): boolean;

        /**
         * Returns whether element is loading.
         */
        (behavior: 'is loading'): boolean;

        /**
         * Sets loading state to element.
         */
        (behavior: 'set loading'): void;

        /**
         * Sets error state to element.
         */
        (behavior: 'set error'): void;

        /**
         * Removes loading state to element.
         */
        (behavior: 'remove loading'): void;

        /**
         * Removes error state to element.
         */
        (behavior: 'remove error'): void;

        /**
         * Gets event that API request will occur on.
         */
        (behavior: 'get event'): string;

        /**
         * Returns 'encodeURIComponent' value only if value passed is not already encoded.
         */
        (behavior: 'get url encoded value', value: any): string;

        /**
         * Reads a locally cached response for a URL.
         */
        (behavior: 'read cached response', url: string): any;

        /**
         * Writes a cached response for a URL.
         */
        (behavior: 'write cached response', url: string, response: any): void;

        /**
         * Creates new cache, removing all locally cached URLs.
         */
        (behavior: 'create cache'): void;

        /**
         * Removes API settings from the page and all events.
         */
        (behavior: 'destroy'): JQuery;

        <K extends keyof APISettings | JQueryAjaxSettings>(behavior: 'setting', name: K, value?: undefined,): Partial<Pick<APISettings, keyof APISettings>> | Partial<Pick<JQueryAjaxSettings, keyof JQueryAjaxSettings>>;
        <K extends keyof APISettings>(behavior: 'setting', name: K, value: APISettings[K]): JQuery;
        (behavior: 'setting', value: Partial<Pick<APISettings, keyof APISettings>> | Partial<Pick<JQueryAjaxSettings, keyof JQueryAjaxSettings>>): JQuery;
        (settings?: Partial<Pick<APISettings, keyof APISettings>> | Partial<Pick<JQueryAjaxSettings, keyof JQueryAjaxSettings>>): JQuery;
    }

    /**
     * @see {@link https://fomantic-ui.com/behaviors/api.html#/settings}
     */
    interface APISettings {
        // region API Settings

        /**
         * When API event should occur.
         * @default 'auto'
         */
        on: string;

        /**
         * Object containing all templates endpoints
         * @default {}
         */
        api: {[key: string]: string};

        /**
         * Can be set to 'local' to cache successful returned AJAX responses when using a JSON API.
         * This helps avoid server roundtrips when API endpoints will return the same results when accessed repeatedly.
         * Setting to 'false', will add cache busting parameters to the URL.
         * @default true
         */
        cache: boolean | 'local';

        /**
         * UI state will be applied to this element, defaults to triggering element.
         * @default false
         */
        stateContext: false | string | JQuery<any>;

        /**
         * Whether to encode parameters with 'encodeURIComponent' before adding into url string.
         * @default true
         */
        encodeParameters: boolean;

        /**
         * Whether to automatically include default data like {value} and {text}.
         * @default true
         */
        defaultData: boolean;

        /**
         * Whether to serialize closest form and include in request.
         * Use `true` to convert complex named keys like `a[b][1][c][]` into a nested object
         * Use `formdata` for formdata web api
         * @default false
         */
        serializeForm: boolean;

        /**
         * How long to wait when a request is made before triggering request, useful for rate limiting 'oninput'.
         * @default 0
         */
        throttle: number;

        /**
         * When set to false will not delay the first request made, when no others are queued.
         * @default true
         */
        throttleFirstRequest: boolean;

        /**
         * Whether an API request can occur while another request is still pending.
         * @default false
         */
        interruptRequests: boolean;

        /**
         * Minimum duration to show loading indication.
         * @default 0
         */
        loadingDuration: number;

        /**
         * The default 'auto' will automatically remove error state after error duration, unless the element is a 'form'.
         * @default 'auto'
         */
        hideError: 'auto' | boolean;

        /**
         * Setting to 'true', will not remove error. Setting to a duration in milliseconds to show error state after request error.
         * @default 2000
         */
        errorDuration: true | number;

        // endregion

        // region API Settings

        /**
         * Named API action for query, originally specified in '$.fn.settings.api'.
         * @default false
         */
        action: string | false;

        /**
         * Templated URL for query, will override specified action.
         * @default false
         */
        url: string | false;

        /**
         * base URL to apply to all endpoints. Will be prepended to each given url.
         * @default ''
         */
        base: string;

        /**
         * Variables to use for replacement.
         * @default false
         */
        urlData: any;

        /**
         * Can be set to a Javascript object which will be returned automatically instead of requesting JSON from server.
         * @default false
         */
        response: any;

        /**
         * When specified, this function can be used to retrieve content from a server and return it asynchronously instead of a standard AJAX call.
         * The callback function should return the server response.
         * @default false
         */
        responseAsync: ((settings: APISettings, callback: (response: any) => void) => void) | false;

        /**
         * Alias of 'response'.
         * @default false
         */
        mockResponse: any;

        /**
         * Alias of 'responseAsync'.
         * @default false
         */
        mockResponseAsync: ((settings: APISettings, callback: (response: any) => void) => void) | false;

        /**
         * If set, the onResponse event handler is able to handle an raw Array Object, which is probably returned by the requested source.
         * Even if the datatype is json, it won't be force converted into an object anymore then.
         * @default true
         */
        rawResponse: boolean;

        /**
         * Method for transmitting request to server.
         * @default 'get'
         */
        method: Uppercase<'get' | 'post' | 'put' | 'delete' | 'head' | 'options' | 'patch'> | Lowercase<'get' | 'post' | 'put' | 'delete' | 'head' | 'options' | 'patch'>;

        /**
         * Expected data type of response.
         * @default 'json'
         */
        dataType: 'xml' | 'json' | 'jsonp' | 'script' | 'html' | 'text';

        /**
         * Expected data type of response.
         * @default {}
         */
        data: any;

        // endregion

        // region Callbacks

        /**
         * Allows modifying settings before request, or cancelling request.
         */
        beforeSend(settings: APISettings): any;

        /**
         * Allows modifying XHR object for request.
         */
        beforeXHR(xhrObject: JQuery.jqXHR): any;

        /**
         * Callback that occurs when request is made. Receives both the API success promise and the XHR request promise.
         */
        onRequest(promise: JQuery.Deferred<any>, xhr: JQuery.jqXHR): void;

        /**
         * Allows modifying the server's response before parsed by other callbacks to determine API event success.
         */
        onResponse(response: any): void;

        /**
         * Determines whether completed JSON response should be treated as successful.
         *
         * @see {@link http://fomantic-ui.com/behaviors/api.html#determining-json-success}
         */
        successTest(response: any): boolean;

        /**
         * Callback after successful response, JSON response must pass 'successTest'.
         */
        onSuccess(response: any, element: JQuery, xhr: JQuery.jqXHR): void;

        /**
         * Callback on request complete regardless of conditions.
         */
        onComplete(response: any, element: JQuery, xhr: JQuery.jqXHR): void;

        /**
         * Callback on failed response, or JSON response that fails 'successTest'.
         */
        onFailure(response: any, element: JQuery): void;

        /**
         * Callback on server error from returned status code, or XHR failure.
         */
        onError(errorMessage: string, element: JQuery, xhr: JQuery.jqXHR): void;

        /**
         * Callback on abort caused by user clicking a link or manually cancelling request.
         */
        onAbort(errorMessage: string, element: JQuery, xhr: JQuery.jqXHR): void;

        // endregion

        // region DOM Settings

        /**
         * Selectors used to find parts of a module.
         */
        selector: API.SelectorSettings;

        /**
         * Class names used to determine element state.
         */
        className: API.ClassNameSettings;

        /**
         * Regular expressions used for template matching.
         */
        regExp: API.RegExpSettings;

        /**
         * Metadata used to store XHR and response promise.
         */
        metadata: API.MetadataSettings;

        // endregion

        // region Debug Settings

        /**
         * Name used in log statements.
         * @default 'API'
         */
        name: string;

        /**
         * Event namespace. Makes sure module teardown does not effect other events attached to an element.
         * @default 'api'
         */
        namespace: string;

        /**
         * Silences all console output including error messages, regardless of other debug settings.
         * @default false
         */
        silent: boolean;

        /**
         * Debug output to console.
         * @default false
         */
        debug: boolean;

        /**
         * Show 'console.table' output with performance metrics.
         * @default true
         */
        performance: boolean;

        /**
         * Debug output includes all internal behaviors.
         * @default false
         */
        verbose: boolean;

        errors: API.ErrorSettings;

        // endregion
    }

    namespace API {
        type SelectorSettings = Partial<Pick<Settings.Selectors, keyof Settings.Selectors>>;
        type ClassNameSettings = Partial<Pick<Settings.ClassNames, keyof Settings.ClassNames>>;
        type RegExpSettings = Partial<Pick<Settings.RegExps, keyof Settings.RegExps>>;
        type MetadataSettings = Partial<Pick<Settings.Metadatas, keyof Settings.Metadatas>>;
        type ErrorSettings = Partial<Pick<Settings.Errors, keyof Settings.Errors>>;

        namespace Settings {
            interface Selectors {
                /**
                 * @default '.disabled'
                 */
                disabled: string;

                /**
                 * @default 'form'
                 */
                form: string;
            }

            interface ClassNames {
                /**
                 * @default 'loading'
                 */
                loading: string;

                /**
                 * @default 'error'
                 */
                error: string;
            }

            interface RegExps {
                /**
                 * @default /{\$*[\da-z]+}/gi
                 */
                required: RegExp;

                /**
                 * @default /{\/\$*[\da-z]+}/gi
                 */
                optional: RegExp;

                /**
                 * @default /^[_a-z][\w-]*(?:\[[\w-]*])*$/i
                 */
                validate: RegExp;

                /**
                 * /[\w-]+|(?=\[])/gi
                 */
                key: RegExp;

                /**
                 * @default /^$/
                 */
                push: RegExp;

                /**
                 * @default /^\d+$/
                 */
                fixed: RegExp;

                /**
                 * @default /^[\w-]+$/i
                 */
                named: RegExp;
            }

            interface Metadatas {
                /**
                 * @default 'action'
                 */
                action: string;

                /**
                 * @default 'url'
                 */
                url: string;
            }

            interface Errors {
                /**
                 * @default 'The before send function has aborted the request.'
                 */
                beforeSend: string;

                /**
                 * @default 'There was an error with your request.'
                 */
                error: string;

                /**
                 * @default 'API Request Aborted. Exit conditions met.'
                 */
                exitConditions: string;

                /**
                 * @default 'JSON could not be parsed during error handling.'
                 */
                JSONParse: string;

                /**
                 * @default 'You are using legacy API success callback names.'
                 */
                legacyParameters: string;

                /**
                 * @default 'The method you called is not defined.'
                 */
                method: string;

                /**
                 * @default 'API action used but no url was defined.'
                 */
                missingAction: string;

                /**
                 * @default 'No URL specified for API event.'
                 */
                missingURL: string;

                /**
                 * @default 'The beforeSend callback must return a settings object, beforeSend ignored.'
                 */
                noReturnedValue: string;

                /**
                 * @default 'There was an error with your request.'
                 */
                parseError: string;

                /**
                 * @default 'Caching responses locally requires session storage.'
                 */
                noStorage: string;

                /**
                 * @default 'Missing a required URL parameter: '
                 */
                requiredParameter: string;

                /**
                 * @default 'Server gave an error: '
                 */
                statusMessage: string;

                /**
                 * @default 'Your request timed out.'
                 */
                timeout: string;
            }
        }
    }
}
