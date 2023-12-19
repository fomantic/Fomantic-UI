declare namespace FomanticUI {
    interface Accordion {
        settings: AccordionSettings;

        /**
         * Refreshes all cached selectors and data.
         */
        (behavior: 'refresh'): JQuery;

        /**
         * Opens accordion content at index.
         */
        (behavior: 'open', index: number): JQuery;

        /**
         * Closes accordion content that are not active.
         */
        (behavior: 'close others'): JQuery;

        /**
         * Closes accordion content at index.
         */
        (behavior: 'close', index: number): JQuery;

        /**
         * Toggles accordion content at index.
         */
        (behavior: 'toggle', index: number): JQuery;

        (behavior: 'destroy'): JQuery;
        <K extends keyof AccordionSettings>(behavior: 'setting', name: K, value?: undefined,): Partial<Pick<AccordionSettings, keyof AccordionSettings>>;
        <K extends keyof AccordionSettings>(behavior: 'setting', name: K, value: AccordionSettings[K]): JQuery;
        (behavior: 'setting', value: Partial<Pick<AccordionSettings, keyof AccordionSettings>>): JQuery;
        (settings?: Partial<Pick<AccordionSettings, keyof AccordionSettings>>): JQuery;
    }

    /**
     * @see {@link https://fomantic-ui.com/modules/accordion.html#/settings}
     */
    interface AccordionSettings {
        // region Accordion Settings

        /**
         * Only allow one section open at a time.
         * @default true
         */
        exclusive?: boolean | undefined;

        /**
         * Event on 'title' that will cause accordion to open.
         * @default 'click'
         */
        on: string;

        /**
         * Whether child content opacity should be animated (may cause performance issues with many child elements).
         * @default true
         */
        animateChildren: boolean;

        /**
         * Close open nested accordion content when an element closes.
         * @default false
         */
        closeNested: boolean;

        /**
         * Allow active sections to collapse.
         * @default true
         */
        collapsible: boolean;

        /**
         * Duration in ms of opening animation.
         * @default 350
         */
        duration: number;

        /**
         * Easing of opening animation. EaseInOutQuint is included with accordion, for additional options you must include easing equations.
         * @see {@link http://gsgd.co.uk/sandbox/jquery/easing/}
         * @default 'easeOutQuad'
         */
        easing: string;

        /**
         * Whether accordion should automatically refresh on DOM insertion
         * @default true
         */
        observeChanges: boolean;

        // endregion

        // region Callbacks

        /**
         * Callback before element opens.
         */
        onOpening(this: JQuery): void;

        /**
         * Callback after element is open.
         */
        onOpen(this: JQuery): void;

        /**
         * Callback before element closes.
         */
        onClosing(this: JQuery): void;

        /**
         * Callback after element is closed.
         */
        onClose(this: JQuery): void;

        /**
         * Callback before element opens or closes.
         */
        onChanging(this: JQuery): void;

        /**
         * Callback before element opens or closes.
         */
        onChange(this: JQuery): void;

        // endregion

        // region DOM Settings

        /**
         * DOM Selectors used internally.
         * Selectors used to find parts of a module.
         */
        selector: Accordion.SelectorSettings;

        /**
         * Class names used to determine element state.
         */
        className: Accordion.ClassNameSettings;

        // endregion

        // region Debug Settings

        /**
         * Name used in log statements
         * @default 'Accordion'
         */
        name: string;

        /**
         * Event namespace. Makes sure module teardown does not effect other events attached to an element.
         * @default 'accordion'
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

        error: Accordion.ErrorSettings;

        // endregion
    }

    namespace Accordion {
        type SelectorSettings = Partial<Pick<Settings.Selectors, keyof Settings.Selectors>>;
        type ClassNameSettings = Partial<Pick<Settings.ClassNames, keyof Settings.ClassNames>>;
        type ErrorSettings = Partial<Pick<Settings.Errors, keyof Settings.Errors>>;

        namespace Settings {
            interface Selectors {
                /**
                 * @default '.accordion'
                 */
                accordion: string;

                /**
                 * @default '.title'
                 */
                title: string;

                /**
                 * @default '.title'
                 */
                trigger: string;

                /**
                 * @default '.ui.dropdown'
                 */
                ignore: string;

                /**
                 * @default '.content'
                 */
                content: string;
            }

            interface ClassNames {
                /**
                 * @default 'active'
                 */
                active: string;

                /**
                 * @default 'animating'
                 */
                animating: string;

                /**
                 * @default 'transition'
                 */
                transition: string;
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
