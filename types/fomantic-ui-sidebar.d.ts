declare namespace FomanticUI {
    interface Sidebar {
        settings: SidebarSettings;

        /**
         * Attaches sidebar action to given selector.
         * Default event if none specified is 'toggle'.
         */
        (behavior: 'attach events', selector: string, event: string): JQuery;

        /**
         * Shows sidebar.
         */
        (behavior: 'show'): JQuery;

        /**
         * Hides sidebar.
         */
        (behavior: 'hide'): JQuery;

        /**
         * Toggles visibility of sidebar.
         */
        (behavior: 'toggle'): JQuery;

        /**
         * Returns whether sidebar is visible.
         */
        (behavior: 'is visible'): boolean;

        /**
         * Returns whether sidebar is hidden.
         */
        (behavior: 'is hidden'): boolean;

        /**
         * Pushes page content to be visible alongside sidebar.
         */
        (behavior: 'push page'): JQuery;

        /**
         * Returns direction of current sidebar.
         */
        (behavior: 'get direction'): string;

        /**
         * Returns page content to original position.
         */
        (behavior: 'pull page'): JQuery;

        /**
         * Adds stylesheet to page head to trigger sidebar animations.
         */
        (behavior: 'add body CSS'): JQuery;

        /**
         * Removes any inline stylesheets for sidebar animation.
         */
        (behavior: 'remove body CSS'): JQuery;

        /**
         * Returns vendor prefixed transition end event.
         */
        (behavior: 'get transition event'): string;

        /**
         * Destroys instance and removes all events.
         */
        (behavior: 'destroy'): JQuery;

        <K extends keyof SidebarSettings>(behavior: 'setting', name: K, value?: undefined,): Partial<Pick<SidebarSettings, keyof SidebarSettings>>;
        <K extends keyof SidebarSettings>(behavior: 'setting', name: K, value: SidebarSettings[K]): JQuery;
        (behavior: 'setting', value: Partial<Pick<SidebarSettings, keyof SidebarSettings>>): JQuery;
        (settings?: Partial<Pick<SidebarSettings, keyof SidebarSettings>>): JQuery;
    }

    /**
     * @see {@link https://fomantic-ui.com/modules/sidebar.html#/settings}
     */
    interface SidebarSettings {
        // region Sidebar Settings

        /**
         * Context which sidebar will appear inside.
         * @default 'body'
         */
        context: string | JQuery;

        /**
         * Whether multiple sidebars can be open at once.
         * @default false
         */
        exclusive: boolean;

        /**
         * Whether sidebar can be closed by clicking on page.
         * @default true
         */
        closable: boolean;

        /**
         * Whether to dim page contents when sidebar is visible.
         * @default true
         */
        dimPage: boolean;

        /**
         * Whether dimmer should blur background.
         * @default false
         */
        blurring: boolean;

        /**
         * Whether to lock page scroll when sidebar is visible.
         * @default false
         */
        scrollLock: boolean;

        /**
         * Whether to return to original scroll position when sidebar is hidden, automatically occurs with 'transition: scale'.
         * @default false
         */
        returnScroll: boolean;

        /**
         * When sidebar is initialized without the proper HTML, using this option will defer creation of DOM to use 'requestAnimationFrame'.
         * @default false
         */
        delaySetup: boolean;

        // endregion

        // region Animation Settings

        /**
         * Named transition to use when animating sidebar.
         * Defaults to 'auto' which selects transition from 'defaultTransition' based on direction.
         * @default 'auto'
         */
        transition: string;

        /**
         * Named transition to use when animating when detecting mobile device.
         * Defaults to 'auto' which selects transition from 'defaultTransition' based on direction.
         * @default 'auto'
         */
        mobileTransition: string;

        /**
         * Default transitions for each direction and screen size, used with 'transition: auto'.
         * @default {}
         */
        defaultTransition: object;

        // endregion

        // region Callbacks

        /**
         * Is called when a sidebar has finished animating in.
         */
        onVisible(this: JQuery): void;

        /**
         * Is called when a sidebar begins animating in.
         * Returning 'false' from this callback will cancel the sidebar from showing.
         */
        onShow(this: JQuery): boolean;

        /**
         * Is called when a sidebar begins to hide or show.
         */
        onChange(this: JQuery): void;

        /**
         * Is called before a sidebar begins to animate out.
         * Returning 'false' from this callback will cancel the sidebar from hiding.
         */
        onHide(this: JQuery): boolean;

        /**
         * Is called after a sidebar has finished animating out.
         */
        onHidden(this: JQuery): void;

        // endregion

        // region DOM Settings

        /**
         * DOM Selectors used internally.
         * Selectors used to find parts of a module.
         */
        selector: Sidebar.SelectorSettings;

        /**
         * Regular expressions used in the module.
         */
        regExp: Sidebar.RegExpSettings;

        /**
         * Class names used to determine element state.
         */
        className: Sidebar.ClassNameSettings;

        // endregion

        // region Debug Settings

        /**
         * Name used in log statements
         * @default 'Sidebar'
         */
        name: string;

        /**
         * Event namespace. Makes sure module teardown does not effect other events attached to an element.
         * @default 'sidebar'
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

        error: Sidebar.ErrorSettings;

        // endregion
    }

    namespace Sidebar {
        type SelectorSettings = Partial<Pick<Settings.Selectors, keyof Settings.Selectors>>;
        type RegExpSettings = Partial<Pick<Settings.RegExps, keyof Settings.RegExps>>;
        type ClassNameSettings = Partial<Pick<Settings.ClassNames, keyof Settings.ClassNames>>;
        type ErrorSettings = Partial<Pick<Settings.Errors, keyof Settings.Errors>>;

        namespace Settings {
            interface Selectors {
                /**
                 * @default '> .ui.fixed.menu, > .ui.right.toast-container, > .ui.right.sidebar, > .ui.fixed.nag, > .ui.fixed.nag > .close'
                 */
                bodyFixed: string;

                /**
                 * @default '.fixed'
                 */
                fixed: string;

                /**
                 * @default 'script, link, style, .ui.modal, .ui.dimmer, .ui.nag, .ui.fixed'
                 */
                omitted: string;

                /**
                 * @default '.pusher'
                 */
                pusher: string;

                /**
                 * @default '.ui.sidebar'
                 */
                sidebar: string;
            }

            interface RegExps {
                /**
                 * @default /(iPad|iPhone|iPod)/g
                 */
                ios: RegExp;

                /**
                 * @default /(CriOS)/g
                 */
                mobileChrome: RegExp;

                /**
                 * @default /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/g
                 */
                mobile: RegExp;
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
                 * @default 'blurring'
                 */
                blurring: string;

                /**
                 * @default 'closing'
                 */
                closing: string;

                /**
                 * @default 'dimmed'
                 */
                dimmed: string;

                /**
                 * @default 'ios'
                 */
                ios: string;

                /**
                 * @default 'locked'
                 */
                locked: string;

                /**
                 * @default 'pushable'
                 */
                pushable: string;

                /**
                 * @default 'pushed'
                 */
                pushed: string;

                /**
                 * @default 'right'
                 */
                right: string;

                /**
                 * @default 'top'
                 */
                top: string;

                /**
                 * @default 'left'
                 */
                left: string;

                /**
                 * @default 'bottom'
                 */
                bottom: string;

                /**
                 * @default 'visible'
                 */
                visible: string;
            }

            interface Errors {
                /**
                 * @default 'The method you called is not defined.'
                 */
                method: string;

                /**
                 * @default 'Had to add pusher element. For optimal performance make sure body content is inside a pusher element'
                 */
                pusher: string;

                /**
                 * @default 'Had to move sidebar. For optimal performance make sure sidebar and pusher are direct children of your body tag'
                 */
                movedSidebar: string;

                /**
                 * @default 'The overlay setting is no longer supported, use animation: overlay'
                 */
                overlay: string;

                /**
                 * @default 'There were no elements that matched the specified selector'
                 */
                notFound: string;
            }
        }
    }
}
