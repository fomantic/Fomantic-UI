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

        <K extends keyof APISettings>(behavior: 'setting', name: K, value?: undefined): APISettings._Impl[K];
        <K extends keyof APISettings>(behavior: 'setting', name: K, value: APISettings._Impl[K]): JQuery;
        (behavior: 'setting', value: APISettings): JQuery;
        (settings?: APISettings): JQuery;
    }

    /**
     * @see {@link https://fomantic-ui.com/behaviors/api.html#/settings}
     */
    type APISettings = APISettings.Param;

    namespace APISettings {
        type Param = (
            | Pick<_Impl, 'on'>
            | Pick<_Impl, 'cache'>
            | Pick<_Impl, 'stateContext'>
            | Pick<_Impl, 'encodeParameters'>
            | Pick<_Impl, 'defaultData'>
            | Pick<_Impl, 'serializeForm'>
            | Pick<_Impl, 'throttle'>
            | Pick<_Impl, 'throttleFirstRequest'>
            | Pick<_Impl, 'interruptRequests'>
            | Pick<_Impl, 'loadingDuration'>
            | Pick<_Impl, 'hideError'>
            | Pick<_Impl, 'errorDuration'>
            | Pick<_Impl, 'action'>
            | Pick<_Impl, 'url'>
            | Pick<_Impl, 'base'>
            | Pick<_Impl, 'urlData'>
            | Pick<_Impl, 'response'>
            | Pick<_Impl, 'responseAsync'>
            | Pick<_Impl, 'mockResponse'>
            | Pick<_Impl, 'mockResponseAsync'>
            | Pick<_Impl, 'rawResponse'>
            | Pick<_Impl, 'method'>
            | Pick<_Impl, 'dataType'>
            | Pick<_Impl, 'data'>
            | Pick<_Impl, 'beforeSend'>
            | Pick<_Impl, 'beforeXHR'>
            | Pick<_Impl, 'onRequest'>
            | Pick<_Impl, 'onResponse'>
            | Pick<_Impl, 'successTest'>
            | Pick<_Impl, 'onSuccess'>
            | Pick<_Impl, 'onComplete'>
            | Pick<_Impl, 'onFailure'>
            | Pick<_Impl, 'onError'>
            | Pick<_Impl, 'onAbort'>
            | Pick<_Impl, 'selector'>
            | Pick<_Impl, 'className'>
            | Pick<_Impl, 'regExp'>
            | Pick<_Impl, 'metadata'>
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
            // region API Settings

            /**
             * When API event should occur.
             * @default 'auto'
             */
            on: string;

            /**
             * Can be set to 'local' to cache successful returned AJAX responses when using a JSON API.
             * This helps avoid server roundtrips when API endpoints will return the same results when accessed repeatedly.
             * Setting to 'false', will add cache busting parameters to the URL.
             * @default true
             */
            cache: boolean | 'local';

            /**
             * UI state will be applied to this element, defaults to triggering element.
             * @default this
             */
            stateContext: string | JQuery;

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
             * @default false
             */
            rawResponse: boolean;

            /**
             * Method for transmitting request to server.
             * @default 'get'
             */
            method: 'get' | 'post' | 'put' | 'delete' | 'head' | 'options' | 'patch';

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
             * Debug output to console.
             */
            debug: boolean;

            /**
             * Show 'console.table' output with performance metrics.
             */
            performance: boolean;

            /**
             * Debug output includes all internal behaviors.
             */
            verbose: boolean;

            errors: API.ErrorSettings;

            // endregion
        }

        namespace API {
            type SelectorSettings = SelectorSettings.Param;

            namespace SelectorSettings {
                type Param = (Pick<_Impl, 'disabled'> | Pick<_Impl, 'form'>) & Partial<Pick<_Impl, keyof _Impl>>;

                interface _Impl {
                    /**
                     * @default '.disabled'
                     */
                    disabled: string;

                    /**
                     * @default 'form'
                     */
                    form: string;
                }
            }

            type ClassNameSettings = ClassNameSettings.Param;

            namespace ClassNameSettings {
                type Param = (Pick<_Impl, 'loading'> | Pick<_Impl, 'error'>) & Partial<Pick<_Impl, keyof _Impl>>;

                interface _Impl {
                    /**
                     * @default 'loading'
                     */
                    loading: string;

                    /**
                     * @default 'error'
                     */
                    error: string;
                }
            }

            type RegExpSettings = RegExpSettings.Param;

            namespace RegExpSettings {
                type Param = (Pick<_Impl, 'required'> | Pick<_Impl, 'optional'>) & Partial<Pick<_Impl, keyof _Impl>>;

                interface _Impl {
                    /**
                     * @default /\{\$*[A-z0-9]+\}/g
                     */
                    required: RegExp;

                    /**
                     * @default /\{\/\$*[A-z0-9]+\}/g
                     */
                    optional: RegExp;
                }
            }

            type MetadataSettings = MetadataSettings.Param;

            namespace MetadataSettings {
                type Param = (Pick<_Impl, 'action'> | Pick<_Impl, 'url'>) & Partial<Pick<_Impl, keyof _Impl>>;

                interface _Impl {
                    /**
                     * @default 'action'
                     */
                    action: string;

                    /**
                     * @default 'url'
                     */
                    url: string;
                }
            }

            type ErrorSettings = ErrorSettings.Param;

            namespace ErrorSettings {
                type Param = (
                    | Pick<_Impl, 'beforeSend'>
                    | Pick<_Impl, 'error'>
                    | Pick<_Impl, 'exitConditions'>
                    | Pick<_Impl, 'JSONParse'>
                    | Pick<_Impl, 'legacyParameters'>
                    | Pick<_Impl, 'missingAction'>
                    | Pick<_Impl, 'missingSerialize'>
                    | Pick<_Impl, 'missingURL'>
                    | Pick<_Impl, 'noReturnedValue'>
                    | Pick<_Impl, 'parseError'>
                    | Pick<_Impl, 'requiredParameter'>
                    | Pick<_Impl, 'statusMessage'>
                    | Pick<_Impl, 'timeout'>
                ) &
                    Partial<Pick<_Impl, keyof _Impl>>;

                interface _Impl {
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
                     * @default 'API action used but no url was defined.'
                     */
                    missingAction: string;

                    /**
                     * @default 'Required dependency jquery-serialize-object missing, using basic serialize.'
                     */
                    missingSerialize: string;

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
}
