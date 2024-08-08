declare namespace FomanticUI {
    interface Modal {
        settings: ModalSettings;

        /**
         * Shows the modal.
         */
        (behavior: 'show', callback?: () => void): JQuery;

        /**
         * Hides the modal.
         */
        (behavior: 'hide', callback?: () => void): JQuery;

        /**
         * Toggles the modal.
         */
        (behavior: 'toggle'): JQuery;

        /**
         * Refreshes centering of modal on page.
         */
        (behavior: 'refresh'): JQuery;

        /**
         * Shows associated page dimmer.
         */
        (behavior: 'show dimmer'): JQuery;

        /**
         * Hides associated page dimmer.
         */
        (behavior: 'hide dimmer'): JQuery;

        /**
         * Hides all modals not selected modal in a dimmer.
         */
        (behavior: 'hide others'): JQuery;

        /**
         * Hides all visible modals in the same dimmer.
         */
        (behavior: 'hide all'): JQuery;

        /**
         * Caches current modal size.
         */
        (behavior: 'cache sizes'): JQuery;

        /**
         * Returns whether the modal can fit on the page.
         */
        (behavior: 'can fit'): boolean;

        /**
         * Returns whether the modal is active.
         */
        (behavior: 'is active'): boolean;

        /**
         * Sets modal to active.
         */
        (behavior: 'set active'): JQuery;

        /**
         * Templates handling
         */
        (behavior: keyof Modal.TemplatesSettings, ...args: any): Partial<Pick<ModalSettings, keyof ModalSettings>>;

        (behavior: 'destroy'): JQuery;
        <K extends keyof ModalSettings>(behavior: 'setting', name: K, value?: undefined,): Partial<Pick<ModalSettings, keyof ModalSettings>>;
        <K extends keyof ModalSettings>(behavior: 'setting', name: K, value: ModalSettings[K]): JQuery;
        (behavior: 'setting', value: Partial<Pick<ModalSettings, keyof ModalSettings>>): JQuery;
        (settings?: Partial<Pick<ModalSettings, keyof ModalSettings>>): JQuery;
    }

    /**
     * @see {@link https://fomantic-ui.com/modules/modal.html#/settings}
     */
    interface ModalSettings {
        // region Accordion Settings

        /**
         * If set to 'false' will prevent the modal from being moved to inside the dimmer.
         * @default true
         */
        detachable: boolean;

        /**
         * Auto will automatically use flex in browsers that support absolutely positioned elements inside flex containers.
         * Setting to 'true'/'false' will force this setting for all browsers.
         * @default 'auto'
         */
        useFlex: 'auto' | boolean;

        /**
         * When 'true', the first form input inside the modal will receive focus when shown.
         * Set this to 'false' to prevent this behavior.
         * @default true
         */
        autofocus: boolean;

        /**
         * When 'false', the last focused element, before the modal was shown, will not get refocused again when the modal hides.
         * This could prevent unwanted scrolling behaviors after closing a modal.
         * @default true
         */
        restoreFocus: boolean;

        /**
         * When 'true', immediately shows the modal at instantiation time.
         * @default false
         */
        autoShow: boolean;

        /**
         * Whether any change in modal DOM should automatically refresh cached positions.
         * @default false
         */
        observeChanges: boolean;

        /**
         * If set to 'true' will not close other visible modals when opening a new one.
         * @default false
         */
        allowMultiple: boolean;

        /**
         * If inverted dimmer should be used.
         * @default false
         */
        inverted: boolean;

        /**
         * If dimmer should blur background.
         * @default false
         */
        blurring: boolean;

        /**
         * If modal should be center aligned.
         * @default true
         */
        centered: boolean;

        /**
         * Whether to automatically bind keyboard shortcuts.
         * This will close the modal when the 'ESC-Key' is pressed.
         * @default true
         */
        keyboardShortcuts: boolean;

        /**
         * A vertical offset to allow for content outside of modal, for example a close button, to be centered.
         * @default 0
         */
        offset: number;

        /**
         * Selector or jquery object specifying the area to dim.
         * @default 'body'
         */
        context: string | JQuery;

        /**
         * Setting to 'false' will not allow you to close the modal by clicking on the dimmer.
         * @default true
         */
        closable: boolean;

        /**
         * Custom settings to extend UI dimmer.
         */
        dimmerSettings: Partial<Pick<DimmerSettings, keyof DimmerSettings>>;

        /**
         * Custom settings to extend UI dimmer.
         * @default 'scale'
         */
        transition: string | Modal.TransitionSettings;

        /**
         * Duration of animation.
         * The value will be ignored when individual hide/show duration values are provided via the 'transition' setting.
         * @default 400
         */
        duration: number;

        /**
         * Whether additional animations should queue.
         * @default false
         */
        queue: boolean;

        /**
         * Used internally to determine if the webkit custom scrollbar was clicked to prevent hiding the dimmer.
         * This should be set to the same (numeric) value as defined for '@customScrollbarWidth' in 'site.less' in case you are using a different theme.
         * @default 10
         */
        scrollbarWidth: number;

        // dynamic content

        /**
         * Title of dynamicly created modal.
         * @default ''
         */
        title: string;

        /**
         * HTML content of dynamicly created modal.
         * @default ''
         */
        content: string;

        /**
         * CSS classname(s) of dynamicly created modal.
         * @default ''
         */
        class: string;

        /**
         * CSS classname(s) of dynamicly created modal's title.
         * @default ''
         */
        classTitle: string;

        /**
         * CSS classname(s) of dynamicly created modal's content.
         * @default ''
         */
        classContent: string;

        /**
         * CSS classname(s) of dynamicly created modal's actions.
         * @default ''
         */
        classActions: string;

        /**
         * Determine if a close icon shoud be displayed on dynamicly created modal.
         * @default false
         */
        closeIcon: boolean;

        /**
         *
         * @default false
         */
        actions: any;

        /**
         *
         * @default true
         */
        preserveHTML: boolean;

        // endregion

        // region Callbacks

        /**
         * Is called when a modal starts to show.
         * If the function returns 'false', the modal will not be shown.
         */
        onShow(this: JQuery): void;

        /**
         * Is called after a modal has finished showing animating.
         */
        onVisible(this: JQuery): void;

        /**
         * Is called after a modal starts to hide.
         * If the function returns 'false', the modal will not hide.
         */
        onHide(this: JQuery, $element: JQuery): void;

        /**
         * Is called after a modal has finished hiding animation.
         */
        onHidden(this: JQuery): void;

        /**
         * Is called after a positive, approve or ok button is pressed.
         * If the function returns 'false', the modal will not hide.
         */
        onApprove(this: JQuery, $element: JQuery): void;

        /**
         * Is called after a negative, deny or cancel button is pressed. If the function returns 'false' the modal will not hide.
         */
        onDeny(this: JQuery, $element: JQuery): void;

        // endregion

        // region DOM Settings

        /**
         * DOM Selectors used internally.
         * Selectors used to find parts of a module.
         */
        selector: Modal.SelectorSettings;

        /**
         * Class names used to determine element state.
         */
        className: Modal.ClassNameSettings;

        // endregion

        // region Config Template Settings

        templates: Modal.TemplatesSettings;

        // endregion

        // region Debug Settings

        /**
         * Name used in log statements
         * @default 'Modal'
         */
        name: string;

        /**
         * Event namespace. Makes sure module teardown does not effect other events attached to an element.
         * @default 'modal'
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

        error: Modal.ErrorSettings;

        // endregion
    }

    namespace Modal {
        type TransitionSettings = Partial<Pick<Settings.Transition, keyof Settings.Transition>>;
        type SelectorSettings = Partial<Pick<Settings.Selectors, keyof Settings.Selectors>>;
        type ClassNameSettings = Partial<Pick<Settings.ClassNames, keyof Settings.ClassNames>>;
        type ErrorSettings = Partial<Pick<Settings.Errors, keyof Settings.Errors>>;
        type TemplatesSettings = Partial<Pick<Settings.Templates, keyof Settings.Templates>> & {[key: string]: (...args: any) => Partial<Pick<ModalSettings, keyof ModalSettings>>};

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
                 * @default '> .header'
                 */
                title: string;

                /**
                 * @default '> .content'
                 */
                content: string;

                /**
                 * @default '> .actions'
                 */
                actions: string;

                /**
                 * @default '> .close'
                 */
                close: string;

                /**
                 * @default '.actions .positive, .actions .approve, .actions .ok'
                 */
                approve: string;

                /**
                 * @default '.actions .negative, .actions .deny, .actions .cancel'
                 */
                deny: string;

                /**
                 * @default '> .ui.dimmer'
                 */
                dimmer: string;

                /**
                 * @default '> .ui.fixed.menu, > .ui.right.toast-container, > .ui.right.sidebar, > .ui.fixed.nag, > .ui.fixed.nag > .close'
                 */
                bodyFixed: string;

                /**
                 * @default '.ui.input > input'
                 */
                prompt: string;
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
                 * @default 'inverted'
                 */
                inverted: string;

                /**
                 * @default 'legacy'
                 */
                legacy: string;

                /**
                 * @default 'loading'
                 */
                loading: string;

                /**
                 * @default 'scrolling'
                 */
                scrolling: string;

                /**
                 * @default 'undetached'
                 */
                undetached: string;

                /**
                 * @default 'front'
                 */
                front: string;

                /**
                 * @default 'close icon'
                 */
                close: string;

                /**
                 * @default 'ui button'
                 */
                button: string;

                /**
                 * @default 'ui modal'
                 */
                modal: string;

                /**
                 * @default 'header'
                 */
                title: string;

                /**
                 * @default 'content'
                 */
                content: string;

                /**
                 * @default 'actions'
                 */
                actions: string;

                /**
                 * @default 'ui tiny modal'
                 */
                template: string;

                /**
                 * @default 'positive'
                 */
                ok: string;

                /**
                 * @default 'negative'
                 */
                cancel: string;

                /**
                 * @default 'ui fluid input'
                 */
                prompt: string;

                /**
                 * @default 'ui inverted dimmer'
                 */
                innerDimmer: string;
            }

            interface Errors {
                /**
                 * @default 'UI Dimmer, a required component is not included in this page'
                 */
                dimmer: string;

                /**
                 * @default 'The method you called is not defined.'
                 */
                method: string;

                /**
                 * @default 'The element you specified could not be found'
                 */
                notFound: string;
            }

            interface Templates {
                alert(): Partial<Pick<ModalSettings, keyof ModalSettings>>;
                confirm(): Partial<Pick<ModalSettings, keyof ModalSettings>>;
                prompt(): Partial<Pick<ModalSettings, keyof ModalSettings>>;
            }
        }
    }
}
