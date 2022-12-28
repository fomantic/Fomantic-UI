declare namespace FomanticUI {
    interface Modal {
        settings: ModalSettings;

        /**
         * Shows the modal.
         */
        (behavior: 'show'): JQuery;

        /**
         * Hides the modal.
         */
        (behavior: 'hide'): JQuery;

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

        (behavior: 'destroy'): JQuery;
        <K extends keyof ModalSettings>(behavior: 'setting', name: K, value?: undefined): ModalSettings._Impl[K];
        <K extends keyof ModalSettings>(behavior: 'setting', name: K, value: ModalSettings._Impl[K]): JQuery;
        (behavior: 'setting', value: ModalSettings): JQuery;
        (settings?: ModalSettings): JQuery;
    }

    /**
     * @see {@link https://fomantic-ui.com/modules/modal.html#/settings}
     */
    type ModalSettings = ModalSettings.Param;

    namespace ModalSettings {
        type Param = (
            | Pick<_Impl, 'detachable'>
            | Pick<_Impl, 'useFlex'>
            | Pick<_Impl, 'autofocus'>
            | Pick<_Impl, 'restoreFocus'>
            | Pick<_Impl, 'autoShow'>
            | Pick<_Impl, 'observeChanges'>
            | Pick<_Impl, 'allowMultiple'>
            | Pick<_Impl, 'inverted'>
            | Pick<_Impl, 'blurring'>
            | Pick<_Impl, 'centered'>
            | Pick<_Impl, 'keyboardShortcuts'>
            | Pick<_Impl, 'offset'>
            | Pick<_Impl, 'context'>
            | Pick<_Impl, 'closable'>
            | Pick<_Impl, 'dimmerSettings'>
            | Pick<_Impl, 'transition'>
            | Pick<_Impl, 'duration'>
            | Pick<_Impl, 'queue'>
            | Pick<_Impl, 'scrollbarWidth'>
            | Pick<_Impl, 'onShow'>
            | Pick<_Impl, 'onVisible'>
            | Pick<_Impl, 'onHide'>
            | Pick<_Impl, 'onHidden'>
            | Pick<_Impl, 'onApprove'>
            | Pick<_Impl, 'onDeny'>
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

            error: Modal.ErrorSettings;

            // endregion
        }

        namespace Modal {
            type SelectorSettings = SelectorSettings.Param;

            namespace SelectorSettings {
                type Param = (
                    | Pick<_Impl, 'title'>
                    | Pick<_Impl, 'content'>
                    | Pick<_Impl, 'actions'>
                    | Pick<_Impl, 'close'>
                    | Pick<_Impl, 'approve'>
                    | Pick<_Impl, 'deny'>
                    | Pick<_Impl, 'dimmer'>
                    | Pick<_Impl, 'bodyFixed'>
                    | Pick<_Impl, 'prompt'>
                ) &
                    Partial<Pick<_Impl, keyof _Impl>>;

                interface _Impl {
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
            }

            type ClassNameSettings = ClassNameSettings.Param;

            namespace ClassNameSettings {
                type Param = (
                    | Pick<_Impl, 'active'>
                    | Pick<_Impl, 'animating'>
                    | Pick<_Impl, 'blurring'>
                    | Pick<_Impl, 'inverted'>
                    | Pick<_Impl, 'legacy'>
                    | Pick<_Impl, 'loading'>
                    | Pick<_Impl, 'scrolling'>
                    | Pick<_Impl, 'undetached'>
                    | Pick<_Impl, 'front'>
                    | Pick<_Impl, 'close'>
                    | Pick<_Impl, 'button'>
                    | Pick<_Impl, 'modal'>
                    | Pick<_Impl, 'title'>
                    | Pick<_Impl, 'content'>
                    | Pick<_Impl, 'actions'>
                    | Pick<_Impl, 'template'>
                    | Pick<_Impl, 'ok'>
                    | Pick<_Impl, 'cancel'>
                    | Pick<_Impl, 'prompt'>
                    | Pick<_Impl, 'innerDimmer'>
                ) &
                    Partial<Pick<_Impl, keyof _Impl>>;

                interface _Impl {
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
            }

            type ErrorSettings = ErrorSettings.Param;

            namespace ErrorSettings {
                type Param = (Pick<_Impl, 'dimmer'> | Pick<_Impl, 'method'> | Pick<_Impl, 'notFound'>) &
                    Partial<Pick<_Impl, keyof _Impl>>;

                interface _Impl {
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
            }
        }
    }
}
