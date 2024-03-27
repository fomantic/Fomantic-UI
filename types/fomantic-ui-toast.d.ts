declare namespace FomanticUI {
    interface Toast {
        settings: ToastSettings;

        /**
         * Pauses the display time decrease (and possible progress bar animation)
         */
        (behavior: 'animate pause'): JQuery;

        /**
         * Continues decreasing display time (and possible progress bar animation)
         */
        (behavior: 'animate continue'): JQuery;

        /**
         * Show the toast
         */
        (behavior: 'show'): JQuery;

        /**
         * Closes the toast
         */
        (behavior: 'close'): JQuery;

        /**
         * Returns all toasts as an array of objects which are visible within the current toast-container
         */
        (behavior: 'get toasts'): object[];

        /**
         * Returns the remaining time in milliseconds
         */
        (behavior: 'get remainingTime'): number;

        (behavior: 'refresh' | 'destroy'): JQuery;
        <K extends keyof ToastSettings>(behavior: 'setting', name: K, value?: undefined,): Partial<Pick<ToastSettings, keyof ToastSettings>>;
        <K extends keyof ToastSettings>(behavior: 'setting', name: K, value: ToastSettings[K]): JQuery;
        (behavior: 'setting', value: Partial<Pick<ToastSettings, keyof ToastSettings>>): JQuery;
        (settings?: Partial<Pick<ToastSettings, keyof ToastSettings>>): JQuery;
    }

    /**
     * @see {@link https://fomantic-ui.com/modules/toast.html#/settings}
     */
    interface ToastSettings {
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
         * Alt text for a given showImage.
         *
         * @default false
         */
        alt: false | string;

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
        actions: Toast.ActionsSettings[];

        // endregion

        // region DOM Settings

        /**
         * Event namespace. Makes sure module teardown does not effect other events attached to an element.
         * @default 'toast'
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
         * @default 'Toast'
         */
        name: string;

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

        error: Toast.ErrorSettings;

        // endregion
    }

    namespace Toast {
        type TransitionSettings = Partial<Pick<Settings.Transition, keyof Settings.Transition>>;
        type ActionsSettings = Partial<Pick<Settings.Actions, keyof Settings.Actions>>;
        type SelectorSettings = Partial<Pick<Settings.Selectors, keyof Settings.Selectors>>;
        type ClassNameSettings = Partial<Pick<Settings.ClassNames, keyof Settings.ClassNames>>;
        type IconSettings = Partial<Pick<Settings.Icons, keyof Settings.Icons>>;
        type ErrorSettings = Partial<Pick<Settings.Errors, keyof Settings.Errors>>;

        namespace Settings {
            interface Transition {
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

            interface Actions {
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

            interface Selectors {
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

            interface ClassNames {
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

            interface Icons {
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

            interface Errors {
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
