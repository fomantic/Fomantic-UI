declare namespace FomanticUI {
    interface Toast {
        settings: ToastSettings;

        (behavior: 'refresh' | 'destroy'): JQuery;
        <K extends keyof ToastSettings>(behavior: 'setting', name: K, value?: undefined): ToastSettings._Impl[K];
        <K extends keyof ToastSettings>(behavior: 'setting', name: K, value: ToastSettings._Impl[K]): JQuery;
        (behavior: 'setting', value: ToastSettings): JQuery;
        (settings?: ToastSettings): JQuery;
    }

    /**
     * @see {@link https://fomantic-ui.com/modules/toast.html#/settings}
     */
    type ToastSettings = ToastSettings.Param;

    namespace ToastSettings {
        type Param = (
            | Pick<_Impl, 'position'>
            | Pick<_Impl, 'horizontal'>
            | Pick<_Impl, 'class'>
            | Pick<_Impl, 'classProgress'>
            | Pick<_Impl, 'classActions'>
            | Pick<_Impl, 'classImage'>
            | Pick<_Impl, 'context'>
            | Pick<_Impl, 'displayTime'>
            | Pick<_Impl, 'minDisplayTime'>
            | Pick<_Impl, 'wordsPerMinute'>
            | Pick<_Impl, 'showImage'>
            | Pick<_Impl, 'showIcon'>
            | Pick<_Impl, 'closeIcon'>
            | Pick<_Impl, 'closeOnClick'>
            | Pick<_Impl, 'cloneModule'>
            | Pick<_Impl, 'showProgress'>
            | Pick<_Impl, 'progressUp'>
            | Pick<_Impl, 'pauseOnHover'>
            | Pick<_Impl, 'compact'>
            | Pick<_Impl, 'opacity'>
            | Pick<_Impl, 'newestOnTop'>
            | Pick<_Impl, 'preserveHTML'>
            | Pick<_Impl, 'transition'>
            | Pick<_Impl, 'onShow'>
            | Pick<_Impl, 'onVisible'>
            | Pick<_Impl, 'onClick'>
            | Pick<_Impl, 'onHide'>
            | Pick<_Impl, 'onHidden'>
            | Pick<_Impl, 'onRemove'>
            | Pick<_Impl, 'onApprove'>
            | Pick<_Impl, 'onDeny'>
            | Pick<_Impl, 'title'>
            | Pick<_Impl, 'message'>
            | Pick<_Impl, 'actions'>
            | Pick<_Impl, 'namespace'>
            | Pick<_Impl, 'selector'>
            | Pick<_Impl, 'className'>
            | Pick<_Impl, 'icons'>
            | Pick<_Impl, 'name'>
            | Pick<_Impl, 'silent'>
            | Pick<_Impl, 'debug'>
            | Pick<_Impl, 'performance'>
            | Pick<_Impl, 'verbose'>
            | Pick<_Impl, 'error'>
        ) &
            Partial<Pick<_Impl, keyof _Impl>>;

        interface _Impl {
            // region Toast Settings

            /**
             * Sets where the toast can be displayed. Can be 'top right', 'top center', 'top left', 'bottom right', 'bottom center' and 'bottom left'.
             *
             * @default 'top right'
             */
            position: string;

            /**
             * If the toasts should stack horizontal instead of vertical.
             *
             * @default false
             */
            horizontal: boolean;

            /**
             * Define the class of notification. Can be any existing color definition or 'info', 'success', 'warning' and 'error'.
             * If ui message is used in className.toast option (see below), this option can hold any supported class of the message component.
             *
             * @default 'neutral'
             */
            class: string;

            /**
             * Can hold a string to be added to the progress bar class, for example a separate color
             *
             * @default false
             */
            classProgress: false | string;

            /**
             * Can hold a string to be added to the actions class to control its appearance.
             * Usually a combination of 'basic', 'left', 'top', 'bottom', 'vertical' and 'attached'.
             *
             * @default false
             */
            classActions: false | string;

            /**
             * Can hold a string to be added to the image class. 'mini', 'tiny', 'small' and 'avatar' are supported out of the box.
             *
             * @default 'mini'
             */
            classImage: string;

            /**
             * Selector or jquery object specifying the area to attach the toast container to.
             *
             * @default 'body'
             */
            context: string | JQuery;

            /**
             * Set the time (in ms) of the toast appearance. Set '0' to disable the automatic dismissal.
             * Set 'auto' to calculate the time by the given amount of words within the toast.
             *
             * @default 3000
             */
            displayTime: number | 'auto';

            /**
             * Minimum display time in case displayTime is set to 'auto'.
             *
             * @default 1000
             */
            minDisplayTime: number;

            /**
             * Base to calculate display time in case displayTime is set to 'auto'.
             *
             * @default 120
             */
            wordsPerMinute: number;

            /**
             * If an URL to an image is given, that image will be shown to the left of the toast.
             *
             * @default false
             */
            showImage: false | string;

            /**
             * Define if the toast should display an icon which matches to a given class.
             * If a string is given, this will be used as icon classname.
             *
             * @default true
             */
            showIcon: boolean | string;

            /**
             * This will make the toast closable by the top right corner icon instead of clicking anywhere on the toast when set to 'true'.
             * When set to 'left' the closeIcon is shown to the left instead of right.
             *
             * @default false
             */
            closeIcon: boolean | 'left';

            /**
             * Set to 'false' to avoid closing the toast when it is clicked.
             *
             * @default true
             */
            closeOnClick: boolean;

            /**
             * If a given DOM-Node should stay reusable by using a clone of it as toast.
             * If set to false the original DOM-Node will be detached and removed from the DOM then the toast is closed.
             *
             * @default true
             */
            cloneModule: boolean;

            /**
             * Displays a progress bar on 'top' or 'bottom' increasing until 'displayTime' is reached.
             * 'false' won't display any progress bar. If 'displayTime' option is '0', this option is ignored.
             *
             * @default false
             */
            showProgress: boolean | 'top' | 'bottom';

            /**
             * 'true' Increases the progress bar from 0% to 100%.
             * 'false' Decreases the progress bar from 100% to 0%.
             *
             * @default false
             */
            progressUp: boolean;

            /**
             * Set to 'false' if the display timer should not pause when the toast is hovered.
             *
             * @default true
             */
            pauseOnHover: boolean;

            /**
             * 'true' will display the toast in a fixed width, 'false' displays the toast responsively with dynamic width.
             *
             * @default true
             */
            compact: boolean;

            /**
             * Opacity value of the toast after the show-transition.
             *
             * @default 1
             */
            opacity: number;

            /**
             * Define if new toasts should be displayed above the others.
             *
             * @default false
             */
            newestOnTop: boolean;

            /**
             * Whether HTML included in given title, message or actions should be preserved.
             * Set to 'false' in case you work with untrusted 3rd party content.
             *
             * @default true
             */
            preserveHTML: boolean;

            /**
             * Settings to set the transitions and durations during the show or the hide of a toast.
             */
            transition: Toast.TransitionSettings;

            // endregion

            // region Callbacks

            /**
             * Callback before toast is shown. Returning 'false' from this callback will cancel the toast from showing.
             */
            onShow(this: JQuery): void;

            /**
             * Callback before toast is shown. Returning false from this callback will cancel the toast from showing..
             */
            onVisible(this: JQuery): void;

            /**
             * Callback after popup is clicked in
             */
            onClick(this: JQuery): void;

            /**
             * Callback before toast is hidden. Returning 'false' from this callback will cancel the toast from hiding.
             */
            onHide(this: JQuery): void;

            /**
             * Callback after toast is hidden.
             */
            onHidden(this: JQuery): void;

            /**
             * Callback before toast is destroyed.
             */
            onRemove(this: JQuery): void;

            /**
             * Callback when an existing button with class 'positive' or 'ok' or 'approve' is clicked. Return 'false' to avoid closing the toast.
             */
            onApprove(this: JQuery): void;

            /**
             * Callback when an existing button with class 'negative' or 'cancel' or 'deny' is clicked. Return 'false' to avoid closing the toast.
             */
            onDeny(this: JQuery): void;

            // endregion

            // region Content Settings

            /**
             * A title for the toast. Leave empty to not display it.
             *
             * @default ''
             */
            title: string;

            /**
             * Message to display.
             *
             * @default ''
             */
            message: string;

            /**
             * An array of objects. Each object defines an action with 'properties' 'text', 'class', 'icon' and 'click'.
             */
            actions: Toast.ActionsSettings;

            // endregion

            // region DOM Settings

            /**
             * Event namespace. Makes sure module teardown does not effect other events attached to an element.
             */
            namespace: string;

            /**
             * DOM Selectors used internally.
             */
            selector: Toast.SelectorSettings;

            /**
             * Class names used to attach style to state.
             */
            className: Toast.ClassNameSettings;

            /**
             * Icon names used internally.
             */
            icons: Toast.IconSettings;

            // endregion

            // region Debug Settings

            /**
             * Name used in log statements
             */
            name: string;

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

            error: Toast.ErrorSettings;

            // endregion
        }
    }

    namespace Toast {
        type TransitionSettings = TransitionSettings.Param;

        namespace TransitionSettings {
            type Param = (
                | Pick<_Impl, 'showMethod'>
                | Pick<_Impl, 'showDuration'>
                | Pick<_Impl, 'hideMethod'>
                | Pick<_Impl, 'hideDuration'>
                | Pick<_Impl, 'closeEasing'>
            ) &
                Partial<Pick<_Impl, keyof _Impl>>;

            interface _Impl {
                /**
                 * @default 'scale'
                 */
                showMethod: string;

                /**
                 * @default 500
                 */
                showDuration: number;

                /**
                 * @default 'scale'
                 */
                hideMethod: string;

                /**
                 * @default 500
                 */
                hideDuration: number;

                /**
                 * @default 'closeEasing'
                 */
                closeEasing: string;
            }
        }

        type ActionsSettings = ActionsSettings.Param;

        namespace ActionsSettings {
            type Param = (Pick<_Impl, 'text'> | Pick<_Impl, 'class'> | Pick<_Impl, 'icon'> | Pick<_Impl, 'click'>) &
                Partial<Pick<_Impl, keyof _Impl>>;

            interface _Impl {
                /**
                 * @default 'Wait'
                 */
                text: string;

                /**
                 * @default 'red'
                 */
                class: string;

                /**
                 * @default 'exclamation'
                 */
                icon: string;

                /**
                 * @default function() {}
                 */
                click: () => void;
            }
        }

        type SelectorSettings = SelectorSettings.Param;

        namespace SelectorSettings {
            type Param = (
                | Pick<_Impl, 'container'>
                | Pick<_Impl, 'box'>
                | Pick<_Impl, 'toast'>
                | Pick<_Impl, 'input'>
                | Pick<_Impl, 'approve'>
                | Pick<_Impl, 'deny'>
            ) &
                Partial<Pick<_Impl, keyof _Impl>>;

            interface _Impl {
                /**
                 * @default '.ui.toast-container'
                 */
                container: string;

                /**
                 * @default '.toast-box'
                 */
                box: string;

                /**
                 * @default '.ui.toast'
                 */
                toast: string;

                /**
                 * @default 'input:not([type="hidden"]), textarea, select, button, .ui.button, ui.dropdown'
                 */
                input: string;

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
                | Pick<_Impl, 'container'>
                | Pick<_Impl, 'box'>
                | Pick<_Impl, 'progress'>
                | Pick<_Impl, 'toast'>
                | Pick<_Impl, 'icon'>
                | Pick<_Impl, 'visible'>
                | Pick<_Impl, 'content'>
                | Pick<_Impl, 'title'>
            ) &
                Partial<Pick<_Impl, keyof _Impl>>;

            interface _Impl {
                /**
                 * @default 'toast-container'
                 */
                container: string;

                /**
                 * @default 'toast-box'
                 */
                box: string;

                /**
                 * @default 'ui attached active progress'
                 */
                progress: string;

                /**
                 * @default 'ui toast'
                 */
                toast: string;

                /**
                 * @default 'icon'
                 */
                icon: string;

                /**
                 * @default 'visible'
                 */
                visible: string;

                /**
                 * @default 'content'
                 */
                content: string;

                /**
                 * @default 'header'
                 */
                title: string;
            }
        }

        type IconSettings = IconSettings.Param;

        namespace IconSettings {
            type Param = (
                | Pick<_Impl, 'info'>
                | Pick<_Impl, 'success'>
                | Pick<_Impl, 'warning'>
                | Pick<_Impl, 'error'>
            ) &
                Partial<Pick<_Impl, keyof _Impl>>;

            interface _Impl {
                /**
                 * @default 'info'
                 */
                info: string;

                /**
                 * @default 'checkmark'
                 */
                success: string;

                /**
                 * @default 'warning'
                 */
                warning: string;

                /**
                 * @default 'times'
                 */
                error: string;
            }
        }

        type ErrorSettings = ErrorSettings.Param;

        namespace ErrorSettings {
            type Param = (Pick<_Impl, 'method'> | Pick<_Impl, 'noElement'> | Pick<_Impl, 'verticalCard'>) &
                Partial<Pick<_Impl, keyof _Impl>>;

            interface _Impl {
                /**
                 * @default 'The method you called is not defined.'
                 */
                method: string;

                /**
                 * @default 'This module requires ui transitions.'
                 */
                noElement: string;

                /**
                 * @default 'Vertical but not attached actions are not supported for card layout.'
                 */
                verticalCard: string;
            }
        }
    }
}
