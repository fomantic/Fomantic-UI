declare namespace FomanticUI {
    interface Calendar {
        settings: CalendarSettings;

        /**
         * Refresh the calendar
         */
        (behavior: 'refresh'): JQuery;

        /**
         * Call the popup module (e.g. passing show will show the calendar popup)
         */
        (behavior: 'popup', arguments: any): JQuery;

        /**
         * Focus the calendar input
         */
        (behavior: 'focus'): JQuery;

        /**
         * Blur the calendar input
         */
        (behavior: 'blur'): JQuery;

        /**
         * Clear the selected date
         */
        (behavior: 'clear'): JQuery;

        /**
         * Get the selected date
         */
        (behavior: 'get date', format?: string): Date | string;

        /**
         * Set the selected date.
         * Pass false to updateInput to disable updating the input.
         * Pass false to fireChange to disable the onBeforeChange and onChange callbacks for this change
         */
        (behavior: 'set date', date: Date | string | null, updateInput?: boolean, fireChange?: boolean): JQuery;

        /**
         * Get the current selection mode (year, month, day, hour, minute)
         */
        (behavior: 'get mode'): 'year' | 'month' | 'day' | 'hour' | 'minute';

        /**
         * Set the current selection mode (year, month, day, hour, minute)
         */
        (behavior: 'set mode', mode: 'year' | 'month' | 'day' | 'hour' | 'minute'): JQuery;

        /**
         * Get the start date for range selection
         */
        (behavior: 'get startDate', format?: string): Date | string;

        /**
         * Set the start date for range selection
         */
        (behavior: 'set startDate', date: Date | string): JQuery;

        /**
         * Get the end date for range selection
         */
        (behavior: 'get endDate', format?: string): Date | string;

        /**
         * Set the end date for range selection
         */
        (behavior: 'set endDate', date: Date | string): JQuery;

        /**
         * Get the currently focused date
         */
        (behavior: 'get focusDate', format?: string): Date | string;

        /**
         * Set the currently focused date
         */
        (behavior: 'set focusDate', date: Date | string): JQuery;

        /**
         * Set the minimal selectable date
         */
        (behavior: 'set minDate', date: Date | string | null): JQuery;

        /**
         * Set the maximal selectable date
         */
        (behavior: 'set maxDate', date: Date | string | null): JQuery;

        (behavior: 'destroy'): JQuery;

        <K extends keyof CalendarSettings>(behavior: 'setting', name: K, value?: undefined): Partial<Pick<CalendarSettings, keyof CalendarSettings>>;
        <K extends keyof CalendarSettings>(behavior: 'setting', name: K, value: CalendarSettings[K]): JQuery;
        (behavior: 'setting', value: Partial<Pick<CalendarSettings, keyof CalendarSettings>>): JQuery;
        (settings?: Partial<Pick<CalendarSettings, keyof CalendarSettings>>): JQuery;
    }

    /**
     * @see {@link https://fomantic-ui.com/modules/calendar.html#/settings}
     */
    interface CalendarSettings {
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
        initialDate: Date | string | null;

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
        selectAdjacentDays: boolean;

        popupOptions: Calendar.PopupSettings;

        text: Calendar.TextSettings;

        formatter: Calendar.FormatterSettings;

        /**
         * Customizable methods to parse a given date
         * Has to return a date object
         */
        parser: {
            date: (text: string, settings: CalendarSettings) => Date;
        }

        /**
         * DOM selector where the calendar popup should be attached to. By default (false) the calendar popup
         * is attached as direct child of the triggering element.
         *
         * @default false
         */
        context: string | JQuery | false

        // end region

        // region Callbacks

        /**
         * Is called before a calendar date changes. 'return false;' will cancel the change.
         * @since 2.8.0
         */
        onBeforeChange(this: JQuery, date?: Date, text?: string, mode?: string): void;

        /**
         * Is called after a calendar date has changed.
         */
        onChange(this: JQuery, date?: Date): void;

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
        onSelect(this: JQuery, date?: Date, mode?: string): void;

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
         * @default 'Calendar'
         */
        name: string;

        /**
         * Event namespace. Makes sure module teardown does not effect other events attached to an element.
         * @default 'calendar'
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

        error: Calendar.ErrorSettings;

        // endregion
    }

    namespace Calendar {
        type PopupSettings = Partial<Pick<Settings.Popup, keyof Settings.Popup>>;
        type TextSettings = Partial<Pick<Settings.Texts, keyof Settings.Texts>>;
        type FormatterSettings = Partial<Pick<Settings.Formatters, keyof Settings.Formatters>>;
        type SelectorSettings = Partial<Pick<Settings.Selectors, keyof Settings.Selectors>>;
        type ClassNameSettings = Partial<Pick<Settings.ClassNames, keyof Settings.ClassNames>>;
        type RegExpSettings = Partial<Pick<Settings.RegExps, keyof Settings.RegExps>>;
        type MetadataSettings = Partial<Pick<Settings.Metadatas, keyof Settings.Metadatas>>;
        type ErrorSettings = Partial<Pick<Settings.Errors, keyof Settings.Errors>>;

        namespace Settings {
            interface Popup {
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

            interface Texts {
                /**
                 * @default ['S', 'M', 'T', 'W', 'T', 'F', 'S']
                 */
                days: string[];

                /**
                 * @default ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
                 */
                dayNamesShort: string[];

                /**
                 * @default ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
                 */
                dayNames: string[];

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
                pm: string;

                /**
                 * @default 'Week'
                 */
                weekNo: string;
            }

            interface Formatters {
                /**
                 *
                 */
                yearHeader(date: Date, settings?: CalendarSettings): string;

                /**
                 * @default 'YYYY'
                 */
                monthHeader: string;

                /**
                 * @default 'MMMM YYYY'
                 */
                dayHeader: string;

                /**
                 * @default 'MMMM D, YYYY'
                 */
                hourHeader: string;

                /**
                 * @default 'MMMM D, YYYY'
                 */
                minuteHeader: string;

                /**
                 * @default 'MMMM D, YYYY'
                 */
                dayColumnHeader(day: number, settings: CalendarSettings): string;

                /**
                 * @default 'MMMM D, YYYY h:mm A'
                 */
                datetime: string;

                /**
                 * @default 'MMMM D, YYYY'
                 */
                date: string;

                /**
                 * @default 'h:mm A'
                 */
                time: string;

                /**
                 * @default 'h:mm A'
                 */
                cellTime: string;

                /**
                 * @default 'MMMM YYYY'
                 */
                month: string;

                /**
                 * @default 'YYYY'
                 */
                year: string;

                /**
                 *
                 */
                today(settings: CalendarSettings): string;

                /**
                 *
                 */
                cell(cell: string, date: Date, cellOptions: any): any
            }

            interface Selectors {
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

            interface ClassNames {
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
                 * @default 'inverted'
                 */
                inverted: string;

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

                /**
                 * @default 'disabled'
                 */
                disabled: string;
            }

            interface RegExps {
                /**
                 * @default /[^A-Za-z\u00C0-\u024F]+/g
                 */
                dateWords: RegExp;

                /**
                 * @default /[^\d:]+/g
                 */
                dateNumbers: RegExp;

                /**
                 * @default /d{1,4}|D{1,2}|M{1,4}|YY(?:YY)?|([Hhmsw])\1?|[ASYa]|"[^"]*"|'[^']*'/g
                 */
                token: RegExp;
            }

            interface Metadatas {
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
                 * @default 'minDate'
                 */
                minDate: string;

                /**
                 * @default 'maxDate'
                 */
                maxDate: string;

                /**
                 * @default 'mode'
                 */
                mode: string;

                /**
                 * @default 'type'
                 */
                type: string;

                /**
                 * @default 'monthOffset'
                 */
                monthOffset: string;

                /**
                 * @default 'message'
                 */
                message: string;

                /**
                 * @default 'class'
                 */
                class: string;

                /**
                 * @default 'inverted'
                 */
                inverted: string;

                /**
                 * @default 'variation'
                 */
                variation: string;

                /**
                 * @default 'position'
                 */
                position: string;

                /**
                 * @default 'month'
                 */
                month: string;

                /**
                 * @default 'year'
                 */
                year: string;

                /**
                 * @default 'hours'
                 */
                hours: string;

                /**
                 * @default 'days'
                 */
                days: string;
            }

            interface Errors {
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
