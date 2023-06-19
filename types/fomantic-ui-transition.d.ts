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
        (behavior: 'looping'): JQuery;

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

        /**
         * Destroys instance and removes all events.
         */
        (behavior: 'destroy'): JQuery;

        <K extends keyof TransitionSettings>(
            behavior: 'setting',
            name: K,
            value?: undefined,
        ): TransitionSettings._Impl[K];
        <K extends keyof TransitionSettings>(behavior: 'setting', name: K, value: TransitionSettings._Impl[K]): JQuery;
        (behavior: 'setting', value: TransitionSettings): JQuery;
        (settings?: TransitionSettings): JQuery;
    }

    /**
     * @see {@link https://fomantic-ui.com/modules/transition.html#/settings}
     */
    type TransitionSettings = TransitionSettings.Param;

    namespace TransitionSettings {
        type Param = (
            | Pick<_Impl, 'animation'>
            | Pick<_Impl, 'interval'>
            | Pick<_Impl, 'reverse'>
            | Pick<_Impl, 'displayType'>
            | Pick<_Impl, 'duration'>
            | Pick<_Impl, 'useFailSafe'>
            | Pick<_Impl, 'allowRepeats'>
            | Pick<_Impl, 'queue'>
            | Pick<_Impl, 'skipInlineHidden'>
            | Pick<_Impl, 'onShow'>
            | Pick<_Impl, 'onBeforeShow'>
            | Pick<_Impl, 'onVisible'>
            | Pick<_Impl, 'onHide'>
            | Pick<_Impl, 'onBeforeHide'>
            | Pick<_Impl, 'onHidden'>
            | Pick<_Impl, 'onStart'>
            | Pick<_Impl, 'onComplete'>
            | Pick<_Impl, 'className'>
            | Pick<_Impl, 'name'>
            | Pick<_Impl, 'namespace'>
            | Pick<_Impl, 'silent'>
            | Pick<_Impl, 'debug'>
            | Pick<_Impl, 'performance'>
            | Pick<_Impl, 'verbose'>
            | Pick<_Impl, 'errors'>
        ) &
            Partial<Pick<_Impl, keyof _Impl>>;

        interface _Impl {
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
             * Specify the final display type (block, inline-block etc) so that it doesn't have to be calculated.
             * @default '500ms'
             */
            duration: string;

            /**
             * If enabled a 'timeout' will be added to ensure 'animationend' callback occurs even if element is hidden.
             * @default true
             */
            useFailSafe: boolean;

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
            onBeforeShow(this: JQuery, showFunction: Function): void;

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
            onBeforeHide(this: JQuery, hideFunction: Function): void;

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

            errors: Transition.ErrorSettings;

            // endregion
        }

        namespace Transition {
            type ClassNameSettings = ClassNameSettings.Param;

            namespace ClassNameSettings {
                type Param = (
                    | Pick<_Impl, 'animating'>
                    | Pick<_Impl, 'disabled'>
                    | Pick<_Impl, 'hidden'>
                    | Pick<_Impl, 'inward'>
                    | Pick<_Impl, 'loading'>
                    | Pick<_Impl, 'looping'>
                    | Pick<_Impl, 'outward'>
                    | Pick<_Impl, 'transition'>
                    | Pick<_Impl, 'visible'>
                ) &
                    Partial<Pick<_Impl, keyof _Impl>>;

                interface _Impl {
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
            }

            type ErrorSettings = ErrorSettings.Param;

            namespace ErrorSettings {
                type Param = (Pick<_Impl, 'noAnimation'> | Pick<_Impl, 'method'>) & Partial<Pick<_Impl, keyof _Impl>>;

                interface _Impl {
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
}
