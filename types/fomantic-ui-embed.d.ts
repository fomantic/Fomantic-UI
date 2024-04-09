declare namespace FomanticUI {
    interface Embed {
        settings: EmbedSettings;

        /**
         * Changes iframe to a new content source.
         */
        (behavior: 'change', source: string, id: string, url: string): JQuery;

        /**
         * Removes embed and shows placeholder content if available.
         */
        (behavior: 'reset'): JQuery;

        /**
         * Shows embed content.
         */
        (behavior: 'show'): JQuery;

        /**
         * Hides embed content and shows placeholder content.
         */
        (behavior: 'hide'): JQuery;

        /**
         * Returns current content id.
         */
        (behavior: 'get id'): string;

        /**
         * Returns placeholder image url.
         */
        (behavior: 'get placeholder'): string;

        /**
         * Returns source name.
         */
        (behavior: 'get sources'): string;

        /**
         * Returns source type.
         */
        (behavior: 'get sources'): string;

        /**
         * Returns URL with all parameters added.
         */
        (behavior: 'get url'): string;

        /**
         * Returns whether embed content has placeholder.
         */
        (behavior: 'has placeholder'): boolean;

        /**
         * Destroys instance and removes all events.
         */
        (behavior: 'destroy'): JQuery;

        <K extends keyof EmbedSettings>(behavior: 'setting', name: K, value?: undefined,): Partial<Pick<EmbedSettings, keyof EmbedSettings>>;
        <K extends keyof EmbedSettings>(behavior: 'setting', name: K, value: EmbedSettings[K]): JQuery;
        (behavior: 'setting', value: Partial<Pick<EmbedSettings, keyof EmbedSettings>>): JQuery;
        (settings?: Partial<Pick<EmbedSettings, keyof EmbedSettings>>): JQuery;
    }

    /**
     * @see {@link https://fomantic-ui.com/modules/embed.html#/settings}
     */
    interface EmbedSettings {
        // region Embed Settings

        /**
         * Specifies an icon to use with placeholder content.
         * @default false
         */
        icon: false | string;

        /**
         * Specifies a source to use, if no source is provided it will be determined from the domain of a specified url.
         * @default false
         */
        source: false | string;

        /**
         * Specifies a url to use for embed.
         * @default false
         */
        url: false | string;

        /**
         * Specifies an id value to replace with the '{id}' value found in templated urls.
         * @default false
         */
        id: false | string;

        /**
         * Specifies a path for a placeholder image.
         * @default false
         */
        placeholder: false | string;

        /**
         * Specifies an alt text for a given placeholder image.
         * @default false
         */
        alt: false | string;

        /**
         * Specify an object containing key/value pairs to add to the iframes GET parameters.
         * @default false
         */
        parameters: false | object;

        // endregion

        // region Video Settings

        /**
         * Default setting 'auto' will only autoplay content when a placeholder is specified.
         * Setting to 'true' or 'false' will force autoplay.
         * @default 'auto'
         */
        autoplay: 'auto' | boolean;

        /**
         * Default setting 'auto' will only autoplay content when a placeholder is specified.
         * Setting to 'true' or 'false' will force autoplay.
         * @default '#444'
         */
        color: string;

        /**
         * Whether to prefer HD content.
         * @default true
         */
        hd: boolean;

        /**
         * Whether to show networks branded UI like title cards, or after video calls to action.
         * @default false
         */
        brandedUI: boolean;

        // endregion

        // region Callbacks

        /**
         * Callback when iframe is generated.
         */
        onCreate(this: JQuery, url: string): void;

        /**
         * Whenever an iframe contents is shown.
         */
        onDisplay(this: JQuery): void;

        /**
         * Whenever the module is cleared.
         */
        onReset(this: JQuery): void;

        /**
         * Callback immediately before Embed is removed from DOM.
         */
        onPlaceholderDisplay(this: JQuery): void;

        /**
         * Callback when module parameters are determined.
         * Allows you to adjust parameters at run time by returning a new parameters object.
         */
        onEmbed(this: JQuery, parameters: object): void;

        // endregion

        // region DOM Settings

        /**
         * DOM Selectors used internally.
         * Selectors used to find parts of a module.
         */
        selector: Embed.SelectorSettings;

        /**
         * HTML Data attributes used to store data.
         */
        metadata: Embed.MetadataSettings;

        /**
         * Class names used to determine element state.
         */
        className: Embed.ClassNameSettings;

        /**
         *
         */
        templates: Embed.TemplateSettings;

        // endregion

        // region Debug Settings

        /**
         * Name used in log statements
         * @default 'Embed''
         */
        name: string;

        /**
         * Event namespace. Makes sure module teardown does not effect other events attached to an element.
         * @default 'embed''
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

        error: Embed.ErrorSettings;

        // endregion
    }

    namespace Embed {
        type SelectorSettings = Partial<Pick<Settings.Selectors, keyof Settings.Selectors>>;
        type MetadataSettings = Partial<Pick<Settings.Metadatas, keyof Settings.Metadatas>>;
        type ClassNameSettings = Partial<Pick<Settings.ClassNames, keyof Settings.ClassNames>>;
        type TemplateSettings = Partial<Pick<Settings.Templates, keyof Settings.Templates>>;
        type ErrorSettings = Partial<Pick<Settings.Errors, keyof Settings.Errors>>;

        namespace Settings {
            interface Selectors {
                /**
                 * @default '.embed'
                 */
                embed: string;

                /**
                 * @default '.placeholder'
                 */
                placeholder: string;

                /**
                 * @default '.icon'
                 */
                icon: string;
            }

            interface Metadatas {
                /**
                 * @default 'id'
                 */
                id: string;

                /**
                 * @default 'icon'
                 */
                icon: string;

                /**
                 * @default 'placeholder'
                 */
                placeholder: string;

                /**
                 * @default 'alt'
                 */
                alt: string;

                /**
                 * @default 'source'
                 */
                source: string;

                /**
                 * @default 'url'
                 */
                url: string;
            }

            interface ClassNames {
                /**
                 * @default 'active'
                 */
                active: string;

                /**
                 * @default 'embed'
                 */
                embed: string;
            }

            interface Templates {
                /**
                 * @default function
                 */
                deQuote(string: string, encode: boolean): string;

                /**
                 * @default function
                 */
                iframe(url: string, parameters: any): string;

                /**
                 * @default function
                 */
                placeholder(image: string, icon: string, alt: string | false | undefined): string;
            }

            interface Errors {
                /**
                 * @default 'No URL specified'
                 */
                noURL: string;

                /**
                 * @default 'The method you called is not defined'
                 */
                method: string;
            }
        }
    }
}
