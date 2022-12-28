declare namespace FomanticUI {
    interface Calendar {
        settings: CalendarSettings;

        (behavior: 'refresh' | 'destroy'): JQuery;
        <K extends keyof CalendarSettings>(behavior: 'setting', name: K, value?: undefined): CalendarSettings._Impl[K];
        <K extends keyof CalendarSettings>(behavior: 'setting', name: K, value: CalendarSettings._Impl[K]): JQuery;
        (behavior: 'setting', value: CalendarSettings): JQuery;
        (settings?: CalendarSettings): JQuery;
    }

    /**
     * @see {@link https://fomantic-ui.com/modules/calendar.html#/settings}
     */
    type CalendarSettings = CalendarSettings.Param;

    namespace CalendarSettings {
        type Param = (
            | Pick<_Impl, 'type'>
            | Pick<_Impl, 'firstDayOfWeek'>
            | Pick<_Impl, 'constantHeight'>
            | Pick<_Impl, 'today'>
            | Pick<_Impl, 'closable'>
            | Pick<_Impl, 'monthFirst'>
            | Pick<_Impl, 'touchReadonly'>
            | Pick<_Impl, 'inline'>
            | Pick<_Impl, 'showWeekNumbers'>
            | Pick<_Impl, 'disabledDaysOfWeek'>
            | Pick<_Impl, 'disabledDates'>
            | Pick<_Impl, 'enabledDates'>
            | Pick<_Impl, 'eventDates'>
            | Pick<_Impl, 'eventClass'>
            | Pick<_Impl, 'on'>
            | Pick<_Impl, 'initialDate'>
            | Pick<_Impl, 'startMode'>
            | Pick<_Impl, 'minDate'>
            | Pick<_Impl, 'maxDate'>
            | Pick<_Impl, 'ampm'>
            | Pick<_Impl, 'disableYear'>
            | Pick<_Impl, 'disableMonth'>
            | Pick<_Impl, 'disableMinute'>
            | Pick<_Impl, 'formatInput'>
            | Pick<_Impl, 'startCalendar'>
            | Pick<_Impl, 'endCalendar'>
            | Pick<_Impl, 'multiMonth'>
            | Pick<_Impl, 'minTimeGap'>
            | Pick<_Impl, 'centuryBreak'>
            | Pick<_Impl, 'currentCentury'>
            | Pick<_Impl, 'selectAdjacentDays'>
            | Pick<_Impl, 'popupOptions'>
            | Pick<_Impl, 'onBeforeChange'>
            | Pick<_Impl, 'onChange'>
            | Pick<_Impl, 'onShow'>
            | Pick<_Impl, 'onVisible'>
            | Pick<_Impl, 'onHide'>
            | Pick<_Impl, 'onHidden'>
            | Pick<_Impl, 'onSelect'>
            | Pick<_Impl, 'selector'>
            | Pick<_Impl, 'className'>
            | Pick<_Impl, 'regExp'>
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
            // region Toast Settings

            /**
             * Picker type, can be 'datetime', 'date', 'time', 'month', or 'year'.
             *
             * @default 'datetime'
             */
            type: 'datetime' | 'date' | 'time' | 'month' | 'year';

            /**
             * Day for first day column (0 = Sunday).
             *
             * @default 0
             */
            firstDayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

            /**
             * Add row(s) to shorter months to keep day calendar height consistent (6 rows).
             *
             * @default 'true'
             */
            constantHeight: boolean;

            /**
             * Show a 'today/now' button at the bottom of the calendar.
             *
             * @default false
             */
            today: boolean;

            /**
             * Close the popup after selecting a date/time.
             *
             * @default false
             */
            closable: true;

            /**
             * Month before day when parsing/converting date from/to text.
             *
             * @default true
             */
            monthFirst: boolean;

            /**
             * Set input to readonly on touch devices.
             *
             * @default true
             */
            touchReadonly: boolean;

            /**
             * Create the calendar inline instead of inside a popup.
             *
             * @default false
             */
            inline: boolean;

            /**
             * Display the week number on the left.
             *
             * @default false
             */
            showWeekNumbers: boolean;

            /**
             * Disable some days of the week from selection (0= Sunday, 1=Monday, ...).
             *
             * @default []
             */
            disabledDaysOfWeek: number[];

            /**
             * An array of Date-Objects or Objects with given message to show in a popup when hovering over the appropriate date '{date: Date, message: string}'.
             *
             * @default []
             */
            disabledDates: object[];

            /**
             * An array of Date-Objects to be enabled for selection. All other dates are disabled.
             *
             * @default []
             */
            enabledDates: object[];

            /**
             * An array of Date-Objects or Objects with given message to show in a popup when hovering over the appropriate date
             * and an individual class for the cell '{date: Date, message: string, class: string}'.
             *
             * @default []
             */
            eventDates: object[];

            /**
             * Default class to be added to each cell of an eventDate date element when no specific class is given to the eventDate element.
             *
             * @default 'blue'
             */
            eventClass: string;

            /**
             * Choose when to show the popup (defaults to 'focus' for input, 'click' for others).
             *
             * @default null
             */
            on: null | 'focus' | 'click';

            /**
             * Date to display initially when no date is selected (null = now).
             *
             * @default null
             */
            initialDate: null | Date;

            /**
             * Display mode to start in, can be 'year', 'month', 'day', 'hour', 'minute' (false = 'day').
             *
             * @default false
             */
            startMode: false | 'year' | 'month' | 'day' | 'hour' | 'minute';

            /**
             * Minimum date/time that can be selected, dates/times before are disabled.
             *
             * @default null
             */
            minDate: null | Date;

            /**
             * Maximum date/time that can be selected, dates/times after are disabled.
             *
             * @default null
             */
            maxDate: null | Date;

            /**
             * Show am/pm in time mode.
             *
             * @default true
             */
            ampm: boolean;

            /**
             * Disable year selection mode.
             *
             * @default false
             */
            disableYear: boolean;

            /**
             * Disable month selection mode.
             *
             * @default false
             */
            disableMonth: boolean;

            /**
             * Disable minute selection mode.
             *
             * @default false
             */
            disableMinute: boolean;

            /**
             * Format the input text upon input blur and module creation.
             *
             * @default true
             */
            formatInput: boolean;

            /**
             * jQuery object or selector for another calendar that represents the start date of a date range.
             *
             * @default null
             */
            startCalendar: null | JQuery | string;

            /**
             * jQuery object or selector for another calendar that represents the end date of a date range.
             *
             * @default null
             */
            endCalendar: null | JQuery | string;

            /**
             * Show multiple months when in 'day' mode.
             *
             * @default 1
             */
            multiMonth: number;

            /**
             * Minimum time gap, can only be 5, 10, 15, 20, 30.
             *
             * @default 5
             */
            minTimeGap: 5 | 10 | 15 | 20 | 30;

            /**
             * Starting short year until 99 where it will be assumed to belong to the last century.
             *
             * @default 60
             */
            centuryBreak: number;

            /**
             * Century to be added to 2-digit years (00 to 'centuryBreak' -1).
             *
             * @default 2000
             */
            currentCentury: number;

            /**
             * Make adjacent days from previous and next month also selectable.
             *
             * @default false
             */
            selectAdjacentDays: 5 | 10 | 15 | 20 | 30;

            popupOptions: Calendar.PopupSettings;

            text: Calendar.TextSettings;

            // endregion

            // region Callbacks

            /**
             * Is called before a calendar date changes. 'return false;' will cancel the change.
             * @since 2.8.0
             */
            onBeforeChange(this: JQuery): void;

            /**
             * Is called after a calendar date has changed.
             */
            onChange(this: JQuery): void;

            /**
             * Is called before a calendar is shown. 'return false;' will prevent the calendar to be shown.
             */
            onShow(this: JQuery): void;

            /**
             * Is called when the calendar is shown.
             */
            onVisible(this: JQuery): void;

            /**
             * Is called before a calendar is hidden. 'return false;' will prevent the calendar to be hidden.
             */
            onHide(this: JQuery): void;

            /**
             * Is called when the calendar is hidden.
             */
            onHidden(this: JQuery): void;

            /**
             * Is called when a cell of the calendar is selected providing its value and current mode.
             * 'return false;' will prevent the selection.
             */
            onSelect(this: JQuery, date: Date, mode: string): void;

            // endregion

            // region DOM Settings

            /**
             * DOM Selectors used internally.
             * If the calendars parent node matches the append selector, the calendar is appended to the input field instead of prepended.
             */
            selector: Calendar.SelectorSettings;

            /**
             * Class names used to attach style to state.
             */
            className: Calendar.ClassNameSettings;

            /**
             * Icon names used internally.
             */
            regExp: Calendar.RegExpSettings;

            metadata: Calendar.MetadataSettings;

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

            error: Calendar.ErrorSettings;

            // endregion
        }
    }

    namespace Calendar {
        type PopupSettings = PopupSettings.Param;

        namespace PopupSettings {
            type Param = (
                | Pick<_Impl, 'position'>
                | Pick<_Impl, 'lastResort'>
                | Pick<_Impl, 'prefer'>
                | Pick<_Impl, 'hideOnScroll'>
            ) &
                Partial<Pick<_Impl, keyof _Impl>>;

            interface _Impl {
                /**
                 * @default 'bottom left'
                 */
                position: string;

                /**
                 * @default 'bottom left'
                 */
                lastResort: string;

                /**
                 * @default 'opposite'
                 */
                prefer: string;

                /**
                 * @default false
                 */
                hideOnScroll: boolean;
            }
        }

        type TextSettings = TextSettings.Param;

        namespace TextSettings {
            type Param = (
                | Pick<_Impl, 'days'>
                | Pick<_Impl, 'months'>
                | Pick<_Impl, 'monthsShort'>
                | Pick<_Impl, 'today'>
                | Pick<_Impl, 'now'>
                | Pick<_Impl, 'am'>
                | Pick<_Impl, 'pm'>
            ) &
                Partial<Pick<_Impl, keyof _Impl>>;

            interface _Impl {
                /**
                 * @default ['S', 'M', 'T', 'W', 'T', 'F', 'S']
                 */
                days: string[];

                /**
                 * @default ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                 */
                months: string[];

                /**
                 * @default ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                 */
                monthsShort: string[];

                /**
                 * @default 'Today'
                 */
                today: string;

                /**
                 * @default 'Now'
                 */
                now: string;

                /**
                 * @default 'AM'
                 */
                am: string;

                /**
                 * @default 'PM'
                 */
                pm: boolean;
            }
        }

        type SelectorSettings = SelectorSettings.Param;

        namespace SelectorSettings {
            type Param = (
                | Pick<_Impl, 'popup'>
                | Pick<_Impl, 'input'>
                | Pick<_Impl, 'activator'>
                | Pick<_Impl, 'append'>
            ) &
                Partial<Pick<_Impl, keyof _Impl>>;

            interface _Impl {
                /**
                 * @default '.ui.popup'
                 */
                popup: string;

                /**
                 * @default 'input'
                 */
                input: string;

                /**
                 * @default 'input'
                 */
                activator: string;

                /**
                 * @default '.inline.field,.inline.fields'
                 */
                append: string;
            }
        }

        type ClassNameSettings = ClassNameSettings.Param;

        namespace ClassNameSettings {
            type Param = (
                | Pick<_Impl, 'calendar'>
                | Pick<_Impl, 'active'>
                | Pick<_Impl, 'popup'>
                | Pick<_Impl, 'grid'>
                | Pick<_Impl, 'column'>
                | Pick<_Impl, 'table'>
                | Pick<_Impl, 'prev'>
                | Pick<_Impl, 'next'>
                | Pick<_Impl, 'prevIcon'>
                | Pick<_Impl, 'nextIcon'>
                | Pick<_Impl, 'link'>
                | Pick<_Impl, 'cell'>
                | Pick<_Impl, 'disabledCell'>
                | Pick<_Impl, 'weekCell'>
                | Pick<_Impl, 'adjacentCell'>
                | Pick<_Impl, 'activeCell'>
                | Pick<_Impl, 'rangeCell'>
                | Pick<_Impl, 'focusCell'>
                | Pick<_Impl, 'todayCell'>
                | Pick<_Impl, 'today'>
            ) &
                Partial<Pick<_Impl, keyof _Impl>>;

            interface _Impl {
                /**
                 * @default 'calendar'
                 */
                calendar: string;

                /**
                 * @default 'active'
                 */
                active: string;

                /**
                 * @default 'ui popup'
                 */
                popup: string;

                /**
                 * @default 'ui equal width grid'
                 */
                grid: string;

                /**
                 * @default 'column'
                 */
                column: string;

                /**
                 * @default 'ui celled center aligned unstackable table'
                 */
                table: string;

                /**
                 * @default 'prev link'
                 */
                prev: string;

                /**
                 * @default 'next link'
                 */
                next: string;

                /**
                 * @default 'chevron left icon'
                 */
                prevIcon: string;

                /**
                 * @default 'chevron right icon'
                 */
                nextIcon: string;

                /**
                 * @default 'link'
                 */
                link: string;

                /**
                 * @default 'link'
                 */
                cell: string;

                /**
                 * @default 'disabled'
                 */
                disabledCell: string;

                /**
                 * @default 'disabled'
                 */
                weekCell: string;

                /**
                 * @default 'adjacent'
                 */
                adjacentCell: string;

                /**
                 * @default 'active'
                 */
                activeCell: string;

                /**
                 * @default 'range'
                 */
                rangeCell: string;

                /**
                 * @default 'focus'
                 */
                focusCell: string;

                /**
                 * @default 'today'
                 */
                todayCell: string;

                /**
                 * @default 'today link'
                 */
                today: string;
            }
        }

        type RegExpSettings = RegExpSettings.Param;

        namespace RegExpSettings {
            type Param = (Pick<_Impl, 'dateWords'> | Pick<_Impl, 'dateNumbers'>) & Partial<Pick<_Impl, keyof _Impl>>;

            interface _Impl {
                /**
                 * @default /[^A-Za-z\u00C0-\u024F]+/g
                 */
                dateWords: RegExp;

                /**
                 * @default /[^\d:]+/g
                 */
                dateNumbers: RegExp;
            }
        }

        type MetadataSettings = MetadataSettings.Param;

        namespace MetadataSettings {
            type Param = (
                | Pick<_Impl, 'date'>
                | Pick<_Impl, 'focusDate'>
                | Pick<_Impl, 'startDate'>
                | Pick<_Impl, 'endDate'>
                | Pick<_Impl, 'mode'>
                | Pick<_Impl, 'monthOffset'>
            ) &
                Partial<Pick<_Impl, keyof _Impl>>;

            interface _Impl {
                /**
                 * @default 'date'
                 */
                date: string;

                /**
                 * @default 'focusDate'
                 */
                focusDate: string;

                /**
                 * @default 'startDate'
                 */
                startDate: string;

                /**
                 * @default 'endDate'
                 */
                endDate: string;

                /**
                 * @default 'mode'
                 */
                mode: string;

                /**
                 * @default 'monthOffset'
                 */
                monthOffset: string;
            }
        }

        type ErrorSettings = ErrorSettings.Param;

        namespace ErrorSettings {
            type Param = (Pick<_Impl, 'popup'> | Pick<_Impl, 'method'>) & Partial<Pick<_Impl, keyof _Impl>>;

            interface _Impl {
                /**
                 * @default 'UI Popup, a required component is not included in this page.'
                 */
                popup: string;

                /**
                 * @default 'The method you called is not defined.'
                 */
                method: string;
            }
        }
    }
}
