declare namespace FomanticUI {
    interface Nag {
        settings: NagSettings;

        /**
         * Shows the nag, if it isn't dismissed and no expiration date is set in storage.
         */
        (behavior: 'show'): JQuery;

        /**
         * Hides the nag.
         */
        (behavior: 'hide'): JQuery;

        /**
         * Dismisses the nag and sets the expiration date into the given storage to prevent the nag being shown the next time.
         */
        (behavior: 'dismiss'): JQuery;

        /**
         * Deletes an already set expiration date, so the nag gets shown the next time.
         */
        (behavior: 'clear'): JQuery;

        (behavior: 'destroy'): JQuery;
        <K extends keyof NagSettings>(behavior: 'setting', name: K, value?: undefined,): Partial<Pick<NagSettings, keyof NagSettings>>;
        <K extends keyof NagSettings>(behavior: 'setting', name: K, value: NagSettings[K]): JQuery;
        (behavior: 'setting', value: Partial<Pick<NagSettings, keyof NagSettings>>): JQuery;
        (settings?: Partial<Pick<NagSettings, keyof NagSettings>>): JQuery;
    }

    /**
     * @see {@link https://fomantic-ui.com/modules/nag.html#/settings}
     */
    interface NagSettings {
        // region Nag Settings

        /**
         * 'true' will show the nag, even if it is already dismissed, but will keep a set expiration date intact.
         * @default false
         */
        persist: boolean;

        /**
         * Time in milliseconds until nag gets automatically hidden.
         * Zero requires manually dismissal, otherwise hides on its own.
         * @default 0
         */
        displayTime: number;

        /**
         * Selector or jquery object specifying the area to attach the nag to.
         * @default 'body'
         */
        context: string | JQuery;

        /**
         * If set to 'true' will re-attach the nag to the given 'context' node.
         * @default false
         */
        detachable: boolean;

        /**
         * Amount of days or a Date Object until expiration of cookie/localstorage.
         * @default 30
         */
        expires: number;

        /**
         * cookie option.
         * @default false
         */
        domain: false | string;

        /**
         * cookie option.
         * @default '/'
         */
        path: string;

        /**
         * cookie option.
         * @default false
         */
        secure: boolean;

        /**
         * cookie option.
         * @default false
         */
        samesite: boolean;

        /**
         * Storage to store the expiration date when the nag is dismissed.
         * Can be either 'cookie', 'localstorage' or 'sessionstorage'.
         * @default 'cookie'
         */
        storageMethod: 'cookie' | 'localstorage' | 'sessionstorage';

        /**
         * Key to store in dismissed localstorage/cookie.
         * @default 'nag'
         */
        key: string;

        /**
         * Value to store in dismissed localstorage/cookie.
         * @default 'dismiss'
         */
        value: string;

        /**
         * Key suffix to support expiration in localstorage.
         * @default 'ExpirationDate'
         */
        expirationKey: string;

        /**
         * Animation transition style for open/close animation.
         * Can be either 'slide' or 'fade'.
         * @default {}
         */
        animation: object; // TODO

        /**
         * Duration of open/close animation.
         * @default 500
         */
        duration: number;

        /**
         * Easing of open/close animation. EaseOutQuad is included with nag.
         * @see {@link https://gsgd.co.uk/sandbox/jquery/easing/}
         * @default 'easeOutQuad'
         */
        easing: string;

        // endregion

        // region Callbacks

        /**
         * Callback before nag is shown.
         * Returning 'false' from this callback will cancel the nag from showing.
         */
        onShow(this: JQuery): void;

        /**
         * Callback after nag is shown.
         */
        onVisible(this: JQuery): void;

        /**
         * Callback before nag is hidden.
         * Returning 'false' from this callback will cancel the nag from hiding.
         */
        onHide(this: JQuery): void;

        /**
         * Callback after nag is hidden.
         */
        onHidden(this: JQuery): void;

        // endregion

        /**
         * DOM Selectors used internally.
         * Selectors used to find parts of a module.
         */
        selector: Nag.SelectorSettings;

        /**
         * Class names used to determine element state.
         */
        className: Nag.ClassNameSettings;

        // endregion

        // region Debug Settings

        /**
         * Name used in log statements
         * @default 'Nag'
         */
        name: string;

        /**
         * Event namespace. Makes sure module teardown does not effect other events attached to an element.
         * @default 'nag'
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

        error: Nag.ErrorSettings;

        // endregion
    }

    namespace Nag {
        type SelectorSettings = Partial<Pick<Settings.Selectors, keyof Settings.Selectors>>;
        type ClassNameSettings = Partial<Pick<Settings.ClassNames, keyof Settings.ClassNames>>;
        type ErrorSettings = Partial<Pick<Settings.Errors, keyof Settings.Errors>>;

        namespace Settings {
            interface Selectors {
                /**
                 * @default '> .close.icon'
                 */
                close: string;
            }

            interface ClassNames {
                /**
                 * @default 'bottom'
                 */
                bottom: string;

                /**
                 * @default 'fixed'
                 */
                fixed: string;
            }

            interface Errors {
                /**
                 * @default 'Unsupported storage method'
                 */
                noStorage: string;

                /**
                 * @default 'The method you called is not defined.'
                 */
                method: string;

                /**
                 * @default 'Unexpected error while setting value'
                 */
                setItem: string;

                /**
                 * @default '"expires" must be a number of days or a Date Object'
                 */
                expiresFormat: string;
            }
        }
    }
}
