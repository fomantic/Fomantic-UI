declare namespace FomanticUI {
    interface Transition {
        settings: TransitionSettings;

        /**
         * Stop current animation and preserve queue.
         */
        (behavior: 'stop'): JQuery;

        /**
         * Stop current animation and queued animations.
         */
        (behavior: 'stop all'): JQuery;

        /**
         * Clears all queued animations.
         */
        (behavior: 'clear queue'): JQuery;

        /**
         * Stop current animation and show element.
         */
        (behavior: 'show'): JQuery;

        /**
         * Stop current animation and hide element.
         */
        (behavior: 'hide'): JQuery;

        /**
         * Toggles between hide and show.
         */
        (behavior: 'toggle'): JQuery;

        /**
         * Forces reflow using a more expensive but stable method.
         */
        (behavior: 'force repaint'): JQuery;

        /**
         * Triggers reflow on element.
         */
        (behavior: 'repaint'): JQuery;

        /**
         * Resets all conditions changes during transition.
         */
        (behavior: 'reset'): JQuery;

        /**
         * Enables animation looping.
         */
        (behavior: 'set looping'): JQuery;

        /**
         * Removes looping state from element.
         */
        (behavior: 'remove looping'): JQuery;

        /**
         * Adds disabled state (stops ability to animate).
         */
        (behavior: 'disable'): JQuery;

        /**
         * Removes disabled state.
         */
        (behavior: 'enable'): JQuery;

        /**
         * Modifies element animation duration.
         */
        (behavior: 'set duration', duration: number): JQuery;

        /**
         * Saves all class names and styles to cache to be retrieved after animation.
         */
        (behavior: 'save conditions'): JQuery;

        /**
         * Adds back cached names and styles to element.
         */
        (behavior: 'restore conditions'): JQuery;

        /**
         * Returns vendor prefixed animation property for animationname.
         */
        (behavior: 'get animation name'): string;

        /**
         * Returns vendor prefixed animation property for animationend.
         */
        (behavior: 'get animation event'): string;

        /**
         * Returns whether element is currently visible.
         */
        (behavior: 'is visible'): boolean;

        /**
         * Returns whether transition is currently occurring.
         */
        (behavior: 'is animating'): boolean;

        /**
         * Returns whether animation looping is set.
         */
        (behavior: 'is looping'): boolean;

        /**
         * Returns whether animations are supported.
         */
        (behavior: 'is supported'): boolean;

        (behavior: 'scale', duration?: any, onComplete?: () => any): JQuery;

        (behavior: 'zoom', duration?: any, onComplete?: () => any): JQuery;

        (behavior: 'fade' | 'fade up' | 'fade down' | 'fade left' | 'fade right', duration?: any, onComplete?: () => any): JQuery;

        (behavior: 'horizontal flip' | 'vertical flip', duration?: any, onComplete?: () => any): JQuery;

        (behavior: 'drop', duration?: any, onComplete?: () => any): JQuery;

        (behavior: 'fly up' | 'fly down' | 'fly left' | 'fly right', duration?: any, onComplete?: () => any): JQuery;

        (behavior: 'swing up' | 'swing down' | 'swing left' | 'swing right', duration?: any, onComplete?: () => any): JQuery;

        (behavior: 'browse' | 'browse up' | 'browse down' | 'browse left' | 'browse right', duration?: any, onComplete?: () => any): JQuery;

        (behavior: 'slide up' | 'slide down' | 'slide left' | 'slide right', duration?: any, onComplete?: () => any): JQuery;

        // Static animations
        (behavior: 'pulsating', duration?: any, onComplete?: () => any): JQuery;
        (behavior: 'jiggle', duration?: any, onComplete?: () => any): JQuery;
        (behavior: 'flash', duration?: any, onComplete?: () => any): JQuery;
        (behavior: 'shake', duration?: any, onComplete?: () => any): JQuery;
        (behavior: 'pulse', duration?: any, onComplete?: () => any): JQuery;
        (behavior: 'tada', duration?: any, onComplete?: () => any): JQuery;
        (behavior: 'bounce', duration?: any, onComplete?: () => any): JQuery;
        (behavior: 'glow', duration?: any, onComplete?: () => any): JQuery;

        /**
         * Destroys instance and removes all events.
         */
        (behavior: 'destroy'): JQuery;
        <K extends keyof TransitionSettings>(behavior: 'setting', name: K, value?: undefined,): Partial<Pick<TransitionSettings, keyof TransitionSettings>>;
        <K extends keyof TransitionSettings>(behavior: 'setting', name: K, value: TransitionSettings[K]): JQuery;
        (behavior: 'setting', value: Partial<Pick<TransitionSettings, keyof TransitionSettings>>): JQuery;
        (settings?: Partial<Pick<TransitionSettings, keyof TransitionSettings>>): JQuery;
    }

    /**
     * @see {@link https://fomantic-ui.com/modules/transition.html#/settings}
     */
    interface TransitionSettings {
        // region Transition Settings

        /**
         * Named animation event to used.
         * Must be defined in CSS.
         * @default 'fade'
         */
        animation: string;

        /**
         * Interval in MS between each elements transition.
         * @default 0
         */
        interval: number;

        /**
         * When an interval is specified, sets order of animations. 'auto' reverses only animations that are hiding.
         * @default 'auto'
         */
        reverse: string | boolean;

        /**
         * Specify the final display type (block, inline-block etc) so that it doesn't have to be calculated.
         * @default false
         */
        displayType: false | string;

        /**
         * Duration of the CSS transition animation
         * @default false
         */
        duration: string | number | false;

        /**
         * If enabled a 'timeout' will be added to ensure 'animationend' callback occurs even if element is hidden.
         * @default true
         */
        useFailSafe: boolean;

        /**
         * Delay in ms for fail safe
         * @default 100
         */
        failSafeDelay: number;

        /**
         * If enabled will allow same animation to be queued while it is already occurring.
         * @default false
         */
        allowRepeats: boolean;

        /**
         * Whether to automatically queue animation if another is occurring.
         * @default true
         */
        queue: boolean;

        /**
         * Whether initially inline hidden objects should be skipped for transition.
         * Useful, if you do the transition for child objects also, but want to have inline hidden children (defined by style="display:none;") still kept hidden while the parent gets animated.
         * Accordion uses this.
         * @default false
         */
        skipInlineHidden: boolean;

        // endregion

        // region Callbacks

        /**
         * Callback on each transition that changes visibility to shown.
         * Returning 'false' from this callback will cancel the transition from showing.
         */
        onShow(this: JQuery): boolean;

        /**
         * Callback right before the show transition should start.
         * The 'showFunction' parameter has to be called inside the callback to trigger the transition show
         */
        onBeforeShow(this: JQuery, showFunction: () => void): void;

        /**
         * Callback once the show transition has finished.
         */
        onVisible(this: JQuery): void;

        /**
         * Callback on each transition that changes visibility to hidden.
         * Returning 'false' from this callback will cancel the transition from hiding.
         */
        onHide(this: JQuery): boolean;

        /**
         * Callback right before the hide transition should start.
         * The 'hideFunction' parameter has to be called inside the callback to trigger the transition hide.
         */
        onBeforeHide(this: JQuery, hideFunction: () => void): void;

        /**
         * Callback once the transition hide has finished.
         */
        onHidden(this: JQuery): void;

        /**
         * Callback on animation start, useful for queued animations.
         */
        onStart(this: JQuery): void;

        /**
         * Callback on each transition complete.
         */
        onComplete(this: JQuery): void;

        // endregion

        // region DOM Settings

        /**
         * Class names used to determine element state.
         */
        className: Transition.ClassNameSettings;

        // endregion

        // region Debug Settings

        /**
         * Name used in log statements
         * @default 'Transition'
         */
        name: string;

        /**
         * Event namespace. Makes sure module teardown does not effect other events attached to an element.
         * @default 'transition'
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

        errors: Transition.ErrorSettings;

        // endregion
    }

    namespace Transition {
        type ClassNameSettings = Partial<Pick<Settings.ClassNames, keyof Settings.ClassNames>>;
        type ErrorSettings = Partial<Pick<Settings.Errors, keyof Settings.Errors>>;

        namespace Settings {
            interface ClassNames {
                /**
                 * @default 'animating'
                 */
                animating: string;

                /**
                 * @default 'disabled'
                 */
                disabled: string;

                /**
                 * @default 'hidden'
                 */
                hidden: string;

                /**
                 * @default 'in'
                 */
                inward: string;

                /**
                 * @default 'loading'
                 */
                loading: string;

                /**
                 * @default 'looping'
                 */
                looping: string;

                /**
                 * @default 'out'
                 */
                outward: string;

                /**
                 * @default 'transition'
                 */
                transition: string;

                /**
                 * @default 'visible'
                 */
                visible: string;
            }

            interface Errors {
                /**
                 * @default 'You called a rating action that was not defined'
                 */
                noAnimation: string;

                /**
                 * @default 'The method you called is not defined'
                 */
                method: string;
            }
        }
    }
}
