declare namespace FomanticUI {
    interface Flyout {
        settings?: FlyoutSettings;

        /**
         * Attaches flyout action to given selector.
         * Default event if none specified is toggle.
         */
        (behavior: 'attach events', selector: JQuery, event: Function): JQuery;

        /**
         * Shows the flyout.
         */
        (behavior: 'show'): JQuery;

        /**
         * Hides the flyout.
         */
        (behavior: 'hide'): JQuery;

        /**
         * Hides the flyout.
         */
        (behavior: 'hide', value: Function): JQuery;

        /**
         * Toggles the flyout.
         */
        (behavior: 'toggle'): JQuery;

        /**
         * Hides all other displayed flyouts.
         */
        (behavior: 'hide others'): JQuery;

        /**
         * Returns whether the flyout is visible.
         */
        (behavior: 'is visible'): boolean;

        /**
         * Returns whether the flyout is hidden.
         */
        (behavior: 'is hidden'): boolean;

        /**
         * Returns direction of current flyout.
         */
        (behavior: 'get direction'): string;

        /**
         * Returns current flyout's settings.
         */
        (behavior: 'get settings'): FlyoutSettings;

        (behavior: 'destroy'): JQuery;
        <K extends keyof FlyoutSettings>(behavior: 'setting', name: K, value?: undefined): FlyoutSettings._Impl[K];
        <K extends keyof FlyoutSettings>(behavior: 'setting', name: K, value: FlyoutSettings._Impl[K]): JQuery;
        (behavior: 'setting', value: FlyoutSettings): JQuery;
        (settings?: FlyoutSettings): JQuery;
    }

    /**
     * @see {@link https://fomantic-ui.com/modules/flyout.html#/settings}
     */
    type FlyoutSettings = FlyoutSettings.Param;

    namespace FlyoutSettings {
        type Param = (
            | Pick<_Impl, 'context'>
            | Pick<_Impl, 'exclusive'>
            | Pick<_Impl, 'closable'>
            | Pick<_Impl, 'dimPage'>
            | Pick<_Impl, 'blurring'>
            | Pick<_Impl, 'autofocus'>
            | Pick<_Impl, 'restoreFocus'>
            | Pick<_Impl, 'keyboardShortcuts'>
            | Pick<_Impl, 'title'>
            | Pick<_Impl, 'content'>
            | Pick<_Impl, 'class'>
            | Pick<_Impl, 'classTitle'>
            | Pick<_Impl, 'classContent'>
            | Pick<_Impl, 'classActions'>
            | Pick<_Impl, 'closeIcon'>
            | Pick<_Impl, 'actions'>
            | Pick<_Impl, 'preserveHTML'>
            | Pick<_Impl, 'scrollLock'>
            | Pick<_Impl, 'returnScroll'>
            | Pick<_Impl, 'delaySetup'>
            | Pick<_Impl, 'autoShow'>
            | Pick<_Impl, 'onChange'>
            | Pick<_Impl, 'onShow'>
            | Pick<_Impl, 'onHide'>
            | Pick<_Impl, 'onVisible'>
            | Pick<_Impl, 'onHidden'>
            | Pick<_Impl, 'onApprove'>
            | Pick<_Impl, 'onDeny'>
            | Pick<_Impl, 'fields'>
            | Pick<_Impl, 'keys'>
            | Pick<_Impl, 'selector'>
            | Pick<_Impl, 'text'>
            | Pick<_Impl, 'className'>
            | Pick<_Impl, 'regExp'>
            | Pick<_Impl, 'templates'>
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
             * Selector or jquery object specifying the area to dim.
             * @default 'body'
             */
            context: string | JQuery;

            /**
             * Opening another flyout will dismiss the one displayed.
             * Set to 'true' to allow multiple flyout at the same time.
             * @default false
             */
            exclusive: boolean;

            /**
             * Setting to 'false' will not allow you to close the flyout by clicking on the dimmer.
             * @default true
             */
            closable: boolean;

            /**
             * Whether to dim 'context' contents when flyout is visible.
             * @default true
             */
            dimPage: boolean;

            /**
             * If dimmer should blur background.
             * @default false
             */
            blurring: boolean;

            /**
             * When 'true', the first form input inside the flyout will receive focus when shown.
             * Set this to 'false' to prevent this behavior.
             * @default true
             */
            autofocus: boolean;

            /**
             * When 'false', the last focused element, before the flyout was shown, will not get refocused again when the flyout hides.
             * This could prevent unwanted scrolling behaviors after closing a flyout.
             * @default true
             */
            keyboardShortcuts: boolean;

            /**
             * @default ''
             */
            title: string;

            /**
             * @default ''
             */
            content: string;

            /**
             * @default ''
             */
            class: string;

            /**
             * @default ''
             */
            classTitle: string;

            /**
             * @default ''
             */
            classContent: string;

            /**
             * @default false
             */
            closeIcon: boolean | string;

            /**
             * @default ''
             */
            classActions: boolean | string;

            /**
             * @default false
             */
            actions: any;
            
            /**
             * @default true
             */
            preserveHTML: boolean;

            /**
             * Whether to automatically bind keyboard shortcuts.
             * This will close the flyout when the 'ESC-key' is pressed.
             * @default true
             */
            restoreFocus: boolean;

            /**
             * Whether to lock page scroll when flyout is visible.
             * @default false
             */
            scrollLock: boolean;

            /**
             * Whether to return to original scroll position when flyout is hidden.
             * @default false
             */
            returnScroll: boolean;

            /**
             * When flyout is initialized without the proper HTML, using this option will defer creation of DOM to use 'requestAnimationFrame'.
             * @default false
             */
            delaySetup: boolean;

            /**
             * When 'true', immediately shows the flyout at instantiation time.
             * @default false
             */
            autoShow: boolean;

            // endregion

            // region Callbacks

            /**
             * Is called when a flyout is either shown or hidden.
             */
            onChange(this: JQuery): void;

            /**
             * Is called when a flyout starts to show.
             */
            onShow(this: JQuery): void;

            /**
             * Is called after a flyout starts to hide.
             */
            onHide(this: JQuery): void;

            /**
             * Is called after a flyout has finished showing animating.
             */
            onVisible(this: JQuery): void;

            /**
             * Is called after a flyout has finished hiding animation.
             */
            onHidden: void | boolean;

            /**
             * Is called after a positive, approve or ok button is pressed.
             * If the function returns 'false', the flyout will not hide.
             */
            onApprove(this: JQuery): void;

            /**
             * Is called after a negative, deny or cancel button is pressed.
             * If the function 'returns' false, the flyout will not hide.
             */
            onDeny(this: JQuery): void;

            // endregion

            // region DOM Settings

            /**
             * DOM Selectors used internally.
             * Selectors used to find parts of a module.
             */
            selector: Flyout.SelectorSettings;

            /**
             * Class names used to determine element state.
             */
            className: Flyout.ClassNameSettings;

            /**
             *
             */
            fields: Flyout.FieldsSettings;

            keys: Flyout.KeysSettings;

            text: Flyout.TextSettings;

            regExp: Flyout.RegExpSettings;

            templates: Flyout.TemplatesSettings;

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

            error: Flyout.ErrorSettings;

            // endregion
        }
    }

    namespace Flyout {
        type FieldsSettings = FieldsSettings.Param;

        namespace FieldsSettings {
            type Param = (
                | Pick<_Impl, 'class'>
                | Pick<_Impl, 'text'>
                | Pick<_Impl, 'icon'>
                | Pick<_Impl, 'click'>
            ) &
                Partial<Pick<_Impl, keyof _Impl>>;

            interface _Impl {
                /**
                 * @default 'class'
                 */
                class: string;

                /**
                 * @default 'text'
                 */
                text: string;

                /**
                 * @default 'icon'
                 */
                icon: string;

                /**
                 * @default 'click'
                 */
                click: string;
            }
        }

        type KeysSettings = KeysSettings.Param;

        namespace KeysSettings {
            type Param = (
                | Pick<_Impl, 'space'>
                | Pick<_Impl, 'enter'>
                | Pick<_Impl, 'escape'>
                | Pick<_Impl, 'tab'>
            ) &
                Partial<Pick<_Impl, keyof _Impl>>;

            interface _Impl {
                /**
                 * @default 32
                 */
                space: number;

                /**
                 * @default 13
                 */
                enter: number;

                /**
                 * @default 27
                 */
                escape: number;

                /**
                 * @default 9
                 */
                tab: number;
            }
        }

        type TextSettings = TextSettings.Param;

        namespace TextSettings {
            type Param = (
                | Pick<_Impl, 'ok'>
                | Pick<_Impl, 'cancel'>
                | Pick<_Impl, 'close'>
            ) &
                Partial<Pick<_Impl, keyof _Impl>>;

            interface _Impl {
                /**
                 * @default 'Ok'
                 */
                ok: string;

                /**
                 * @default 'Cancel'
                 */
                cancel: string;

                /**
                 * @default 'Close'
                 */
                close: string;
            }
        }

        type SelectorSettings = SelectorSettings.Param;

        namespace SelectorSettings {
            type Param = (
                | Pick<_Impl, 'bodyFixed'>
                | Pick<_Impl, 'fixed'>
                | Pick<_Impl, 'omitted'>
                | Pick<_Impl, 'pusher'>
                | Pick<_Impl, 'flyout'>
                | Pick<_Impl, 'header'>
                | Pick<_Impl, 'content'>
                | Pick<_Impl, 'actions'>
                | Pick<_Impl, 'close'>
                | Pick<_Impl, 'approve'>
                | Pick<_Impl, 'deny'>
            ) &
                Partial<Pick<_Impl, keyof _Impl>>;

            interface _Impl {
                /**
                 * @default '> .ui.fixed.menu, > .ui.right.toast-container, > .ui.right.sidebar, > .ui.right.flyout, > .ui.fixed.nag, > .ui.fixed.nag > .close'
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
                 * @default '.ui.flyout'
                 */
                flyout: string;

                /**
                 * @default '.ui.header'
                 */
                header: string;

                /**
                 * @default '.content'
                 */
                content: string;

                /**
                 * @default '.actions'
                 */
                actions: string;

                /**
                 * @default '.close'
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
            }
        }

        type ClassNameSettings = ClassNameSettings.Param;

        namespace ClassNameSettings {
            type Param = (
                | Pick<_Impl, 'flyout'>
                | Pick<_Impl, 'close'>
                | Pick<_Impl, 'header'>
                | Pick<_Impl, 'content'>
                | Pick<_Impl, 'actions'>
                | Pick<_Impl, 'active'>
                | Pick<_Impl, 'animating'>
                | Pick<_Impl, 'blurring'>
                | Pick<_Impl, 'closing'>
                | Pick<_Impl, 'dimmed'>
                | Pick<_Impl, 'ios'>
                | Pick<_Impl, 'locked'>
                | Pick<_Impl, 'pushable'>
                | Pick<_Impl, 'pushed'>
                | Pick<_Impl, 'right'>
                | Pick<_Impl, 'top'>
                | Pick<_Impl, 'left'>
                | Pick<_Impl, 'bottom'>
                | Pick<_Impl, 'visible'>
                | Pick<_Impl, 'overlay'>
                | Pick<_Impl, 'fullscreen'>
                | Pick<_Impl, 'template'>
                | Pick<_Impl, 'button'>
                | Pick<_Impl, 'ok'>
                | Pick<_Impl, 'cancel'>
                | Pick<_Impl, 'prompt'>
            ) &
                Partial<Pick<_Impl, keyof _Impl>>;

            interface _Impl {
                /**
                 * @default 'ui flyout'
                 */
                flyout: string;

                /**
                 * @default 'close icon'
                 */
                close: string;

                /**
                 * @default 'ui header'
                 */
                header: string;

                /**
                 * @default 'content'
                 */
                content: string;

                /**
                 * @default 'actions'
                 */
                actions: string;

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

                /**
                 * @default 'overlay'
                 */
                overlay: string;

                /**
                 * @default 'fullscreen'
                 */
                fullscreen: string;

                /**
                 * @default 'ui flyout'
                 */
                template: string;

                /**
                 * @default 'ui button'
                 */
                button: string;

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
            }
        }

        type RegExpSettings = RegExpSettings.Param;

        namespace RegExpSettings {
            type Param = (Pick<_Impl, 'ios'> | Pick<_Impl, 'mobileChrome'> | Pick<_Impl, 'mobile'>) &
                Partial<Pick<_Impl, keyof _Impl>>;

            interface _Impl {
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
        }

        type TemplatesSettings = TemplatesSettings.Param;

        namespace TemplatesSettings {
            type Param = (
                | Pick<_Impl, 'getArguments'>
                | Pick<_Impl, 'alert'>
                | Pick<_Impl, 'confirm'>
                | Pick<_Impl, 'prompt'>
            ) &
                Partial<Pick<_Impl, keyof _Impl>>;

            interface _Impl {
                /**
                 * 
                 */
                getArguments: object;

                /**
                 * 
                 */
                alert: object;

                /**
                 * 
                 */
                confirm: object;

                /**
                 * 
                 */
                prompt: object;
            }
        }

        type ErrorSettings = ErrorSettings.Param;

        namespace ErrorSettings {
            type Param = (
                | Pick<_Impl, 'method'>
                | Pick<_Impl, 'pusher'>
                | Pick<_Impl, 'movedFlyout'>
                | Pick<_Impl, 'notFound'>
            ) &
                Partial<Pick<_Impl, keyof _Impl>>;

            interface _Impl {
                /**
                 * @default 'The method you called is not defined.'
                 */
                method: string;

                /**
                 * @default 'Had to add pusher element. For optimal performance make sure body content is inside a pusher element'
                 */
                pusher: string;

                /**
                 * @default 'Had to move flyout. For optimal performance make sure flyout and pusher are direct children of your body tag'
                 */
                movedFlyout: string;

                /**
                 * @default 'There were no elements that matched the specified selector'
                 */
                notFound: string;
            }
        }
    }
}
