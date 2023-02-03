/*!
 * # Fomantic-UI 2.9.2 - Calendar
 * https://github.com/fomantic/Fomantic-UI/
 *
 *
 * Released under the MIT license
 * https://opensource.org/licenses/MIT
 *
 */

(function ($, window, document) {
    'use strict';

    function isFunction(obj) {
        return typeof obj === 'function' && typeof obj.nodeType !== 'number';
    }

    window = window !== undefined && window.Math === Math
        ? window
        : globalThis;

    $.fn.calendar = function (parameters) {
        var
            $allModules    = $(this),
            $document      = $(document),

            moduleSelector = $allModules.selector || '',

            time           = Date.now(),
            performance    = [],

            query          = arguments[0],
            methodInvoked  = typeof query === 'string',
            queryArguments = [].slice.call(arguments, 1),
            returnedValue,
            timeGapTable = {
                5: { row: 4, column: 3 },
                10: { row: 3, column: 2 },
                15: { row: 2, column: 2 },
                20: { row: 3, column: 1 },
                30: { row: 2, column: 1 },
            },
            numberText = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight']
        ;

        $allModules.each(function () {
            var
                settings = $.isPlainObject(parameters)
                    ? $.extend(true, {}, $.fn.calendar.settings, parameters)
                    : $.extend({}, $.fn.calendar.settings),

                className = settings.className,
                namespace = settings.namespace,
                selector = settings.selector,
                formatter = settings.formatter,
                parser = settings.parser,
                metadata = settings.metadata,
                timeGap = timeGapTable[settings.minTimeGap],
                error = settings.error,

                eventNamespace = '.' + namespace,
                moduleNamespace = 'module-' + namespace,

                $module = $(this),
                $input = $module.find(selector.input),
                $activator = $module.find(selector.activator),

                element = this,
                instance = $module.data(moduleNamespace),
                $container = instance && instance.popupId ? $document.find('#' + instance.popupId) : $module.find(selector.popup),

                isTouch,
                isTouchDown = false,
                isInverted = $module.hasClass(className.inverted),
                focusDateUsedForRange = false,
                selectionComplete = false,
                classObserver,
                module
            ;

            module = {

                initialize: function () {
                    module.debug('Initializing calendar for', element, $module);

                    isTouch = module.get.isTouch();
                    module.setup.config();
                    module.setup.popup();
                    module.setup.inline();
                    module.setup.input();
                    module.setup.date();
                    module.create.calendar();

                    module.bind.events();
                    module.observeChanges();
                    module.instantiate();
                },

                instantiate: function () {
                    module.verbose('Storing instance of calendar');
                    instance = module;
                    $module.data(moduleNamespace, instance);
                },

                destroy: function () {
                    module.verbose('Destroying previous calendar for', element);
                    $module.removeData(moduleNamespace);
                    module.unbind.events();
                    module.disconnect.classObserver();
                },

                setup: {
                    config: function () {
                        if (module.get.minDate() !== null) {
                            module.set.minDate($module.data(metadata.minDate));
                        }
                        if (module.get.maxDate() !== null) {
                            module.set.maxDate($module.data(metadata.maxDate));
                        }
                        module.setting('type', module.get.type());
                        module.setting('on', settings.on || 'click');
                    },
                    popup: function () {
                        if (settings.inline) {
                            return;
                        }
                        if ($activator.length === 0) {
                            $activator = $module.children().first();
                            if ($activator.length === 0) {
                                return;
                            }
                        }
                        if ($.fn.popup === undefined) {
                            module.error(error.popup);

                            return;
                        }
                        if ($container.length === 0) {
                            if (settings.context) {
                                module.popupId = namespace + '_popup_' + (Math.random().toString(16) + '000000000').slice(2, 10);
                                $container = $('<div/>', { id: module.popupId }).addClass(className.popup).appendTo($document.find(settings.context));
                            } else {
                                // prepend the popup element to the activator's parent so that it has less chance of messing with
                                // the styling (eg input action button needs to be the last child to have correct border radius)
                                var
                                    $activatorParent = $activator.parent(),
                                    domPositionFunction = $activatorParent.closest(selector.append).length > 0 ? 'appendTo' : 'prependTo'
                                ;
                                $container = $('<div/>').addClass(className.popup)[domPositionFunction]($activatorParent);
                            }
                        }
                        $container.addClass(className.calendar);
                        if (isInverted) {
                            $container.addClass(className.inverted);
                        }
                        var onVisible = function () {
                            module.refreshTooltips();

                            return settings.onVisible.apply($container, arguments);
                        };
                        var onHidden = function () {
                            module.blur();

                            return settings.onHidden.apply($container, arguments);
                        };
                        if ($input.length === 0) {
                            // no input, $container has to handle focus/blur
                            $container.attr('tabindex', '0');
                            onVisible = function () {
                                module.refreshTooltips();
                                module.focus();

                                return settings.onVisible.apply($container, arguments);
                            };
                        }
                        var onShow = function () {
                            // reset the focus date onShow
                            module.set.focusDate(module.get.date());
                            module.set.mode(module.get.validatedMode(settings.startMode));

                            return settings.onShow.apply($container, arguments);
                        };
                        var on = module.setting('on');
                        var options = $.extend({}, settings.popupOptions, {
                            popup: $container,
                            movePopup: !settings.context,
                            on: on,
                            hoverable: on === 'hover',
                            closable: on === 'click',
                            onShow: onShow,
                            onVisible: onVisible,
                            onHide: settings.onHide,
                            onHidden: onHidden,
                        });
                        module.popup(options);
                    },
                    inline: function () {
                        if ($activator.length > 0 && !settings.inline) {
                            return;
                        }
                        settings.inline = true;
                        $container = $('<div/>').addClass(className.calendar).appendTo($module);
                        if ($input.length === 0) {
                            $container.attr('tabindex', '0');
                        }
                    },
                    input: function () {
                        if (settings.touchReadonly && $input.length > 0 && isTouch) {
                            $input.prop('readonly', true);
                        }
                        module.check.disabled();
                    },
                    date: function () {
                        var date;
                        if (settings.initialDate) {
                            date = parser.date(settings.initialDate, settings);
                        } else if ($module.data(metadata.date) !== undefined) {
                            date = parser.date($module.data(metadata.date), settings);
                        } else if ($input.length > 0) {
                            date = parser.date($input.val(), settings);
                        }
                        module.set.date(date, settings.formatInput, false);
                        module.set.mode(module.get.mode(), false);
                    },
                },

                trigger: {
                    change: function () {
                        var
                            inputElement = $input[0]
                        ;
                        if (inputElement) {
                            var events = document.createEvent('HTMLEvents');
                            module.verbose('Triggering native change event');
                            events.initEvent('change', true, false);
                            inputElement.dispatchEvent(events);
                        }
                    },
                },

                create: {
                    calendar: function () {
                        var
                            i,
                            r,
                            c,
                            p,
                            row,
                            cell,
                            pageGrid
                        ;

                        var
                            mode = module.get.mode(),
                            today = new Date(),
                            date = module.get.date(),
                            focusDate = module.get.focusDate(),
                            display = module.helper.dateInRange(focusDate || date || parser.date(settings.initialDate, settings) || today)
                        ;

                        if (!focusDate) {
                            focusDate = display;
                            module.set.focusDate(focusDate, false, false);
                        }

                        var
                            isYear = mode === 'year',
                            isMonth = mode === 'month',
                            isDay = mode === 'day',
                            isHour = mode === 'hour',
                            isMinute = mode === 'minute',
                            isTimeOnly = settings.type === 'time'
                        ;

                        var multiMonth = Math.max(settings.multiMonth, 1);
                        var monthOffset = !isDay ? 0 : module.get.monthOffset();

                        var
                            minute = display.getMinutes(),
                            hour = display.getHours(),
                            day = display.getDate(),
                            startMonth = display.getMonth() + monthOffset,
                            year = display.getFullYear()
                        ;

                        var columns = isDay
                            ? (settings.showWeekNumbers ? 8 : 7)
                            : (isHour ? 4 : timeGap.column);
                        var rows = isDay || isHour ? 6 : timeGap.row;
                        var pages = isDay ? multiMonth : 1;

                        var container = $container;
                        var tooltipPosition = container.hasClass('left') ? 'right center' : 'left center';
                        container.empty();
                        if (pages > 1) {
                            pageGrid = $('<div/>').addClass(className.grid).appendTo(container);
                        }

                        for (p = 0; p < pages; p++) {
                            if (pages > 1) {
                                var pageColumn = $('<div/>').addClass(className.column).appendTo(pageGrid);
                                container = pageColumn;
                            }

                            var month = startMonth + p;
                            var firstMonthDayColumn = (new Date(year, month, 1).getDay() - (settings.firstDayOfWeek % 7) + 7) % 7;
                            if (!settings.constantHeight && isDay) {
                                var requiredCells = new Date(year, month + 1, 0).getDate() + firstMonthDayColumn;
                                rows = Math.ceil(requiredCells / 7);
                            }

                            var
                                yearChange = isYear ? 10 : (isMonth ? 1 : 0),
                                monthChange = isDay ? 1 : 0,
                                dayChange = isHour || isMinute ? 1 : 0,
                                prevNextDay = isHour || isMinute ? day : 1,
                                prevDate = new Date(year - yearChange, month - monthChange, prevNextDay - dayChange, hour),
                                nextDate = new Date(year + yearChange, month + monthChange, prevNextDay + dayChange, hour),
                                prevLast = isYear
                                    ? new Date(Math.ceil(year / 10) * 10 - 9, 0, 0)
                                    : (isMonth
                                        ? new Date(year, 0, 0)
                                        : (isDay // eslint-disable-line unicorn/no-nested-ternary
                                            ? new Date(year, month, 0)
                                            : new Date(year, month, day, -1))),
                                nextFirst = isYear
                                    ? new Date(Math.ceil(year / 10) * 10 + 1, 0, 1)
                                    : (isMonth
                                        ? new Date(year + 1, 0, 1)
                                        : (isDay // eslint-disable-line unicorn/no-nested-ternary
                                            ? new Date(year, month + 1, 1)
                                            : new Date(year, month, day + 1)))
                            ;

                            var tempMode = mode;
                            if (isDay && settings.showWeekNumbers) {
                                tempMode += ' andweek';
                            }
                            var table = $('<table/>').addClass(className.table).addClass(tempMode).addClass(numberText[columns] + ' column')
                                .appendTo(container);
                            if (isInverted) {
                                table.addClass(className.inverted);
                            }
                            var textColumns = columns;
                            // no header for time-only mode
                            if (!isTimeOnly) {
                                var thead = $('<thead/>').appendTo(table);

                                row = $('<tr/>').appendTo(thead);
                                cell = $('<th/>').attr('colspan', '' + columns).appendTo(row);

                                var headerDate = isYear || isMonth
                                    ? new Date(year, 0, 1)
                                    : (isDay
                                        ? new Date(year, month, 1)
                                        : new Date(year, month, day, hour, minute));
                                var headerText = $('<span/>').addClass(className.link).appendTo(cell);
                                headerText.text(module.helper.dateFormat(formatter[mode + 'Header'], headerDate));
                                var newMode = isMonth
                                    ? (settings.disableYear ? 'day' : 'year')
                                    : (isDay
                                        ? (settings.disableMonth ? 'year' : 'month') // eslint-disable-line unicorn/no-nested-ternary
                                        : 'day');
                                headerText.data(metadata.mode, newMode);

                                if (p === 0) {
                                    var prev = $('<span/>').addClass(className.prev).appendTo(cell);
                                    prev.data(metadata.focusDate, prevDate);
                                    prev.toggleClass(className.disabledCell, !module.helper.isDateInRange(prevLast, mode));
                                    $('<i/>').addClass(className.prevIcon).appendTo(prev);
                                }

                                if (p === pages - 1) {
                                    var next = $('<span/>').addClass(className.next).appendTo(cell);
                                    next.data(metadata.focusDate, nextDate);
                                    next.toggleClass(className.disabledCell, !module.helper.isDateInRange(nextFirst, mode));
                                    $('<i/>').addClass(className.nextIcon).appendTo(next);
                                }
                                if (isDay) {
                                    row = $('<tr/>').appendTo(thead);
                                    if (settings.showWeekNumbers) {
                                        cell = $('<th/>').appendTo(row);
                                        cell.text(settings.text.weekNo);
                                        cell.addClass(className.weekCell);
                                        textColumns--;
                                    }
                                    for (i = 0; i < textColumns; i++) {
                                        cell = $('<th/>').appendTo(row);
                                        cell.text(formatter.dayColumnHeader((i + settings.firstDayOfWeek) % 7, settings));
                                    }
                                }
                            }

                            var tbody = $('<tbody/>').appendTo(table);
                            i = isYear
                                ? Math.ceil(year / 10) * 10 - 9
                                : (isDay ? 1 - firstMonthDayColumn : 0);
                            for (r = 0; r < rows; r++) {
                                row = $('<tr/>').appendTo(tbody);
                                if (isDay && settings.showWeekNumbers) {
                                    cell = $('<th/>').appendTo(row);
                                    cell.text(module.get.weekOfYear(year, month, i + 1 - settings.firstDayOfWeek));
                                    cell.addClass(className.weekCell);
                                }
                                for (c = 0; c < textColumns; c++, i++) {
                                    var cellDate = isYear
                                        ? new Date(i, month, 1, hour, minute)
                                        : (isMonth
                                            ? new Date(year, i, 1, hour, minute)
                                            : (isDay // eslint-disable-line unicorn/no-nested-ternary
                                                ? new Date(year, month, i, hour, minute)
                                                : (isHour
                                                    ? new Date(year, month, day, i)
                                                    : new Date(year, month, day, hour, i * settings.minTimeGap))));
                                    var cellText = isYear
                                        ? i
                                        : (isMonth
                                            ? settings.text.monthsShort[i]
                                            : (isDay // eslint-disable-line unicorn/no-nested-ternary
                                                ? cellDate.getDate()
                                                : module.helper.dateFormat(formatter.cellTime, cellDate)));
                                    cell = $('<td/>').addClass(className.cell).appendTo(row);
                                    cell.text(cellText);
                                    cell.data(metadata.date, cellDate);
                                    var adjacent = isDay && cellDate.getMonth() !== ((month + 12) % 12);
                                    var disabled = (!settings.selectAdjacentDays && adjacent) || !module.helper.isDateInRange(cellDate, mode) || settings.isDisabled(cellDate, mode) || module.helper.isDisabled(cellDate, mode) || !module.helper.isEnabled(cellDate, mode);
                                    var eventDate;
                                    if (disabled) {
                                        var disabledDate = module.helper.findDayAsObject(cellDate, mode, settings.disabledDates);
                                        if (disabledDate !== null && disabledDate[metadata.message]) {
                                            cell.attr('data-tooltip', disabledDate[metadata.message]);
                                            cell.attr('data-position', disabledDate[metadata.position] || tooltipPosition);
                                            if (disabledDate[metadata.inverted] || (isInverted && disabledDate[metadata.inverted] === undefined)) {
                                                cell.attr('data-inverted', '');
                                            }
                                            if (disabledDate[metadata.variation]) {
                                                cell.attr('data-variation', disabledDate[metadata.variation]);
                                            }
                                        }
                                        if (mode === 'hour') {
                                            var disabledHour = module.helper.findHourAsObject(cellDate, mode, settings.disabledHours);
                                            if (disabledHour !== null && disabledHour[metadata.message]) {
                                                cell.attr('data-tooltip', disabledHour[metadata.message]);
                                                cell.attr('data-position', disabledHour[metadata.position] || tooltipPosition);
                                                if (disabledHour[metadata.inverted] || (isInverted && disabledHour[metadata.inverted] === undefined)) {
                                                    cell.attr('data-inverted', '');
                                                }
                                                if (disabledHour[metadata.variation]) {
                                                    cell.attr('data-variation', disabledHour[metadata.variation]);
                                                }
                                            }
                                        }
                                    } else {
                                        eventDate = module.helper.findDayAsObject(cellDate, mode, settings.eventDates);
                                        if (eventDate !== null) {
                                            cell.addClass(eventDate[metadata.class] || settings.eventClass);
                                            if (eventDate[metadata.message]) {
                                                cell.attr('data-tooltip', eventDate[metadata.message]);
                                                cell.attr('data-position', eventDate[metadata.position] || tooltipPosition);
                                                if (eventDate[metadata.inverted] || (isInverted && eventDate[metadata.inverted] === undefined)) {
                                                    cell.attr('data-inverted', '');
                                                }
                                                if (eventDate[metadata.variation]) {
                                                    cell.attr('data-variation', eventDate[metadata.variation]);
                                                }
                                            }
                                        }
                                    }
                                    var active = module.helper.dateEqual(cellDate, date, mode);
                                    var isToday = module.helper.dateEqual(cellDate, today, mode);
                                    cell.toggleClass(className.adjacentCell, adjacent && !eventDate);
                                    cell.toggleClass(className.disabledCell, disabled);
                                    cell.toggleClass(className.activeCell, active && !(adjacent && disabled));
                                    if (!isHour && !isMinute) {
                                        cell.toggleClass(className.todayCell, !adjacent && isToday);
                                    }

                                    // Allow for external modifications of each cell
                                    var cellOptions = {
                                        mode: mode,
                                        adjacent: adjacent,
                                        disabled: disabled,
                                        active: active,
                                        today: isToday,
                                    };
                                    formatter.cell(cell, cellDate, cellOptions);

                                    if (module.helper.dateEqual(cellDate, focusDate, mode)) {
                                        // ensure that the focus date is exactly equal to the cell date
                                        // so that, if selected, the correct value is set
                                        module.set.focusDate(cellDate, false, false);
                                    }
                                }
                            }

                            if (settings.today) {
                                var todayRow = $('<tr/>').appendTo(tbody);
                                var todayButton = $('<td/>').attr('colspan', '' + columns).addClass(className.today).appendTo(todayRow);
                                todayButton.text(formatter.today(settings));
                                todayButton.data(metadata.date, today);
                            }

                            module.update.focus(false, table);

                            if (settings.inline) {
                                module.refreshTooltips();
                            }
                        }
                    },
                },

                update: {
                    focus: function (updateRange, container) {
                        container = container || $container;
                        var mode = module.get.mode();
                        var date = module.get.date();
                        var focusDate = module.get.focusDate();
                        var startDate = module.get.startDate();
                        var endDate = module.get.endDate();
                        var rangeDate = (updateRange ? focusDate : null) || date || (!isTouch ? focusDate : null);

                        container.find('td').each(function () {
                            var $cell = $(this);
                            var cellDate = $cell.data(metadata.date);
                            if (!cellDate) {
                                return;
                            }
                            var disabled = $cell.hasClass(className.disabledCell);
                            var active = $cell.hasClass(className.activeCell);
                            var adjacent = $cell.hasClass(className.adjacentCell);
                            var focused = module.helper.dateEqual(cellDate, focusDate, mode);
                            var inRange = !rangeDate
                                ? false
                                : (!!startDate && module.helper.isDateInRange(cellDate, mode, startDate, rangeDate))
                                    || (!!endDate && module.helper.isDateInRange(cellDate, mode, rangeDate, endDate));
                            $cell.toggleClass(className.focusCell, focused && (!isTouch || isTouchDown) && (!adjacent || (settings.selectAdjacentDays && adjacent)) && !disabled);

                            if (module.helper.isTodayButton($cell)) {
                                return;
                            }
                            $cell.toggleClass(className.rangeCell, inRange && !active && !disabled);
                        });
                    },
                },

                refresh: function () {
                    module.create.calendar();
                },

                refreshTooltips: function () {
                    var winWidth = $(window).width();
                    $container.find('td[data-position]').each(function () {
                        var $cell = $(this);
                        var tooltipWidth = window.getComputedStyle($cell[0], '::after').width.replace(/[^\d.]/g, '');
                        var tooltipPosition = $cell.attr('data-position');
                        // use a fallback width of 250 (calendar width) for IE/Edge (which return "auto")
                        var calcPosition = (winWidth - $cell.width() - (parseInt(tooltipWidth, 10) || 250)) > $cell.offset().left ? 'right' : 'left';
                        if (tooltipPosition.indexOf(calcPosition) === -1) {
                            $cell.attr('data-position', tooltipPosition.replace(/(left|right)/, calcPosition));
                        }
                    });
                },

                bind: {
                    events: function () {
                        module.debug('Binding events');
                        $container.on('mousedown' + eventNamespace, module.event.mousedown);
                        $container.on('touchstart' + eventNamespace, module.event.mousedown);
                        $container.on('mouseup' + eventNamespace, module.event.mouseup);
                        $container.on('touchend' + eventNamespace, module.event.mouseup);
                        $container.on('mouseover' + eventNamespace, module.event.mouseover);
                        if ($input.length > 0) {
                            $input.on('input' + eventNamespace, module.event.inputChange);
                            $input.on('focus' + eventNamespace, module.event.inputFocus);
                            $input.on('blur' + eventNamespace, module.event.inputBlur);
                            $input.on('keydown' + eventNamespace, module.event.keydown);
                        } else {
                            $container.on('keydown' + eventNamespace, module.event.keydown);
                        }
                    },
                },

                unbind: {
                    events: function () {
                        module.debug('Unbinding events');
                        $container.off(eventNamespace);
                        if ($input.length > 0) {
                            $input.off(eventNamespace);
                        }
                    },
                },

                event: {
                    mouseover: function (event) {
                        var target = $(event.target);
                        var date = target.data(metadata.date);
                        var mousedown = event.buttons === 1;
                        if (date) {
                            module.set.focusDate(date, false, true, mousedown);
                        }
                    },
                    mousedown: function (event) {
                        if ($input.length > 0) {
                            // prevent the mousedown on the calendar causing the input to lose focus
                            event.preventDefault();
                        }
                        isTouchDown = event.type.indexOf('touch') >= 0;
                        var target = $(event.target);
                        var date = target.data(metadata.date);
                        if (date) {
                            module.set.focusDate(date, false, true, true);
                        }
                    },
                    mouseup: function (event) {
                        // ensure input has focus so that it receives keydown events for calendar navigation
                        module.focus();
                        event.preventDefault();
                        event.stopPropagation();
                        isTouchDown = false;
                        var target = $(event.target);
                        if (target.hasClass('disabled')) {
                            return;
                        }
                        var parent = target.parent();
                        if (parent.data(metadata.date) || parent.data(metadata.focusDate) || parent.data(metadata.mode)) {
                            // clicked on a child element, switch to parent (used when clicking directly on prev/next <i> icon element)
                            target = parent;
                        }
                        var date = target.data(metadata.date);
                        var focusDate = target.data(metadata.focusDate);
                        var mode = target.data(metadata.mode);
                        if (date && settings.onSelect.call(element, date, module.get.mode()) !== false) {
                            var forceSet = target.hasClass(className.today);
                            module.selectDate(date, forceSet);
                        } else if (focusDate) {
                            module.set.focusDate(focusDate);
                        } else if (mode) {
                            module.set.mode(mode);
                        }
                    },
                    keydown: function (event) {
                        var keyCode = event.which;
                        if (keyCode === 9) {
                            // tab
                            module.popup('hide');
                        }

                        if (module.popup('is visible')) {
                            var mode = module.get.mode();
                            switch (keyCode) {
                                // arrow keys
                                case 37:
                                case 38:
                                case 39:
                                case 40: {
                                    var bigIncrement = mode === 'day'
                                        ? 7
                                        : (mode === 'hour'
                                            ? 4
                                            : (mode === 'minute' ? timeGap.column : 3)); // eslint-disable-line unicorn/no-nested-ternary
                                    var increment = keyCode === 37
                                        ? -1
                                        : (keyCode === 38
                                            ? -bigIncrement
                                            : (keyCode === 39 ? 1 : bigIncrement)); // eslint-disable-line unicorn/no-nested-ternary
                                    increment *= mode === 'minute' ? settings.minTimeGap : 1;
                                    var focusDate = module.get.focusDate() || module.get.date() || new Date();
                                    var year = focusDate.getFullYear() + (mode === 'year' ? increment : 0);
                                    var month = focusDate.getMonth() + (mode === 'month' ? increment : 0);
                                    var day = focusDate.getDate() + (mode === 'day' ? increment : 0);
                                    var hour = focusDate.getHours() + (mode === 'hour' ? increment : 0);
                                    var minute = focusDate.getMinutes() + (mode === 'minute' ? increment : 0);
                                    var newFocusDate = new Date(year, month, day, hour, minute);
                                    if (settings.type === 'time') {
                                        newFocusDate = module.helper.mergeDateTime(focusDate, newFocusDate);
                                    }
                                    if (module.helper.isDateInRange(newFocusDate, mode)) {
                                        module.set.focusDate(newFocusDate);
                                    }

                                    break;
                                }
                                // enter key
                                case 13: {
                                    var date = module.get.focusDate();
                                    if (date && !settings.isDisabled(date, mode) && !module.helper.isDisabled(date, mode) && module.helper.isEnabled(date, mode)) {
                                        if (settings.onSelect.call(element, date, module.get.mode()) !== false) {
                                            module.selectDate(date);
                                        }
                                    }
                                    // disable form submission:
                                    event.preventDefault();
                                    event.stopPropagation();

                                    break;
                                }
                                // escape key
                                case 27: {
                                    module.popup('hide');
                                    event.stopPropagation();

                                    break;
                                }
                            }
                        }

                        if (keyCode === 38 || keyCode === 40) {
                            // arrow-up || arrow-down
                            event.preventDefault(); // don't scroll
                            module.popup('show');
                        }
                    },
                    inputChange: function () {
                        var val = $input.val();
                        var date = parser.date(val, settings);
                        module.set.date(date, false);
                    },
                    inputFocus: function () {
                        $container.addClass(className.active);
                    },
                    inputBlur: function () {
                        $container.removeClass(className.active);
                        if (settings.formatInput) {
                            var date = module.get.date();
                            var text = module.helper.dateFormat(formatter[settings.type], date);
                            $input.val(text);
                        }
                        if (selectionComplete) {
                            module.trigger.change();
                            selectionComplete = false;
                        }
                    },
                    class: {
                        mutation: function (mutations) {
                            mutations.forEach(function (mutation) {
                                if (mutation.attributeName === 'class') {
                                    module.check.disabled();
                                }
                            });
                        },
                    },
                },

                observeChanges: function () {
                    if ('MutationObserver' in window) {
                        classObserver = new MutationObserver(module.event.class.mutation);
                        module.debug('Setting up mutation observer', classObserver);
                        module.observe.class();
                    }
                },

                disconnect: {
                    classObserver: function () {
                        if ($input.length > 0 && classObserver) {
                            classObserver.disconnect();
                        }
                    },
                },

                observe: {
                    class: function () {
                        if ($input.length > 0 && classObserver) {
                            classObserver.observe($module[0], {
                                attributes: true,
                            });
                        }
                    },
                },

                is: {
                    disabled: function () {
                        return $module.hasClass(className.disabled);
                    },
                },

                check: {
                    disabled: function () {
                        $input.attr('tabindex', module.is.disabled() ? -1 : 0);
                    },
                },

                get: {
                    weekOfYear: function (weekYear, weekMonth, weekDay) {
                        // adapted from http://www.merlyn.demon.co.uk/weekcalc.htm
                        var ms1d = 24 * 3600 * 1000,
                            ms7d = 7 * ms1d,
                            DC3 = Date.UTC(weekYear, weekMonth, weekDay + 3) / ms1d, // an absolute day number
                            AWN = Math.floor(DC3 / 7), // an absolute week number
                            Wyr = new Date(AWN * ms7d).getUTCFullYear()
                        ;

                        return AWN - Math.floor(Date.UTC(Wyr, 0, 7) / ms7d) + 1;
                    },
                    formattedDate: function (format, date) {
                        return module.helper.dateFormat(format || formatter[settings.type], date || module.get.date());
                    },
                    date: function () {
                        return module.helper.sanitiseDate($module.data(metadata.date)) || null;
                    },
                    inputDate: function () {
                        return $input.val();
                    },
                    focusDate: function () {
                        return $module.data(metadata.focusDate) || null;
                    },
                    startDate: function () {
                        var startModule = module.get.calendarModule(settings.startCalendar);

                        return (startModule ? startModule.get.date() : $module.data(metadata.startDate)) || null;
                    },
                    endDate: function () {
                        var endModule = module.get.calendarModule(settings.endCalendar);

                        return (endModule ? endModule.get.date() : $module.data(metadata.endDate)) || null;
                    },
                    minDate: function () {
                        return $module.data(metadata.minDate) || null;
                    },
                    maxDate: function () {
                        return $module.data(metadata.maxDate) || null;
                    },
                    monthOffset: function () {
                        return $module.data(metadata.monthOffset) || settings.monthOffset || 0;
                    },
                    mode: function () {
                        // only returns valid modes for the current settings
                        var mode = $module.data(metadata.mode) || settings.startMode;

                        return module.get.validatedMode(mode);
                    },
                    validatedMode: function (mode) {
                        var validModes = module.get.validModes();
                        if ($.inArray(mode, validModes) >= 0) {
                            return mode;
                        }

                        return settings.type === 'time'
                            ? 'hour'
                            : (settings.type === 'month'
                                ? 'month'
                                : (settings.type === 'year' ? 'year' : 'day')); // eslint-disable-line unicorn/no-nested-ternary
                    },
                    type: function () {
                        return $module.data(metadata.type) || settings.type;
                    },
                    validModes: function () {
                        var validModes = [];
                        if (settings.type !== 'time') {
                            if (!settings.disableYear || settings.type === 'year') {
                                validModes.push('year');
                            }
                            if (!(settings.disableMonth || settings.type === 'year') || settings.type === 'month') {
                                validModes.push('month');
                            }
                            if (settings.type.indexOf('date') >= 0) {
                                validModes.push('day');
                            }
                        }
                        if (settings.type.indexOf('time') >= 0) {
                            validModes.push('hour');
                            if (!settings.disableMinute) {
                                validModes.push('minute');
                            }
                        }

                        return validModes;
                    },
                    isTouch: function () {
                        try {
                            document.createEvent('TouchEvent');

                            return true;
                        } catch (e) {
                            return false;
                        }
                    },
                    calendarModule: function (selector) {
                        if (!selector) {
                            return null;
                        }
                        if (!(selector instanceof $)) {
                            selector = $document.find(selector).first();
                        }

                        // assume range related calendars are using the same namespace
                        return selector.data(moduleNamespace);
                    },
                },

                set: {
                    date: function (date, updateInput, fireChange) {
                        updateInput = updateInput !== false;
                        fireChange = fireChange !== false;
                        date = module.helper.sanitiseDate(date);
                        date = module.helper.dateInRange(date);

                        var mode = module.get.mode();
                        var text = module.helper.dateFormat(formatter[settings.type], date);

                        if (fireChange && settings.onBeforeChange.call(element, date, text, mode) === false) {
                            return false;
                        }

                        module.set.focusDate(date);

                        if (settings.isDisabled(date, mode)) {
                            return false;
                        }

                        var endDate = module.get.endDate();
                        if (!!endDate && !!date && date > endDate) {
                            // selected date is greater than end date in range, so clear end date
                            module.set.endDate();
                        }
                        module.set.dataKeyValue(metadata.date, date);

                        if (updateInput && $input.length > 0) {
                            $input.val(text);
                        }

                        if (fireChange) {
                            settings.onChange.call(element, date, text, mode);
                        }
                    },
                    startDate: function (date, refreshCalendar) {
                        date = module.helper.sanitiseDate(date);
                        var startModule = module.get.calendarModule(settings.startCalendar);
                        if (startModule) {
                            startModule.set.date(date);
                        }
                        module.set.dataKeyValue(metadata.startDate, date, refreshCalendar);
                    },
                    endDate: function (date, refreshCalendar) {
                        date = module.helper.sanitiseDate(date);
                        var endModule = module.get.calendarModule(settings.endCalendar);
                        if (endModule) {
                            endModule.set.date(date);
                        }
                        module.set.dataKeyValue(metadata.endDate, date, refreshCalendar);
                    },
                    focusDate: function (date, refreshCalendar, updateFocus, updateRange) {
                        date = module.helper.sanitiseDate(date);
                        date = module.helper.dateInRange(date);
                        var isDay = module.get.mode() === 'day';
                        var oldFocusDate = module.get.focusDate();
                        if (isDay && date && oldFocusDate) {
                            var yearDelta = date.getFullYear() - oldFocusDate.getFullYear();
                            var monthDelta = yearDelta * 12 + date.getMonth() - oldFocusDate.getMonth();
                            if (monthDelta) {
                                var monthOffset = module.get.monthOffset() - monthDelta;
                                module.set.monthOffset(monthOffset, false);
                            }
                        }
                        var changed = module.set.dataKeyValue(metadata.focusDate, date, !!date && refreshCalendar);
                        updateFocus = (updateFocus !== false && changed && refreshCalendar === false) || focusDateUsedForRange != updateRange;
                        focusDateUsedForRange = updateRange;
                        if (updateFocus) {
                            module.update.focus(updateRange);
                        }
                    },
                    minDate: function (date) {
                        date = module.helper.sanitiseDate(date);
                        if (settings.maxDate !== null && settings.maxDate <= date) {
                            module.verbose('Unable to set minDate variable bigger that maxDate variable', date, settings.maxDate);
                        } else {
                            module.setting('minDate', date);
                            module.set.dataKeyValue(metadata.minDate, date);
                        }
                    },
                    maxDate: function (date) {
                        date = module.helper.sanitiseDate(date);
                        if (settings.minDate !== null && settings.minDate >= date) {
                            module.verbose('Unable to set maxDate variable lower that minDate variable', date, settings.minDate);
                        } else {
                            module.setting('maxDate', date);
                            module.set.dataKeyValue(metadata.maxDate, date);
                        }
                    },
                    monthOffset: function (monthOffset, refreshCalendar) {
                        var multiMonth = Math.max(settings.multiMonth, 1);
                        monthOffset = Math.max(1 - multiMonth, Math.min(0, monthOffset));
                        module.set.dataKeyValue(metadata.monthOffset, monthOffset, refreshCalendar);
                    },
                    mode: function (mode, refreshCalendar) {
                        module.set.dataKeyValue(metadata.mode, mode, refreshCalendar);
                    },
                    dataKeyValue: function (key, value, refreshCalendar) {
                        var oldValue = $module.data(key);
                        var equal = oldValue === value || (oldValue <= value && oldValue >= value); // equality test for dates and string objects
                        if (value) {
                            $module.data(key, value);
                        } else {
                            $module.removeData(key);
                        }
                        refreshCalendar = refreshCalendar !== false && !equal;
                        if (refreshCalendar) {
                            module.refresh();
                        }

                        return !equal;
                    },
                },

                selectDate: function (date, forceSet) {
                    module.verbose('New date selection', date);
                    var mode = module.get.mode();
                    var complete = forceSet || mode === 'minute'
                        || (settings.disableMinute && mode === 'hour')
                        || (settings.type === 'date' && mode === 'day')
                        || (settings.type === 'month' && mode === 'month')
                        || (settings.type === 'year' && mode === 'year');
                    if (complete) {
                        var canceled = module.set.date(date) === false;
                        if (!canceled) {
                            selectionComplete = true;
                            if (settings.closable) {
                                module.popup('hide');
                                // if this is a range calendar, focus the container or input. This will open the popup from its event listeners.
                                var endModule = module.get.calendarModule(settings.endCalendar);
                                if (endModule) {
                                    endModule.refresh();
                                    if (endModule.setting('on') !== 'focus') {
                                        endModule.popup('show');
                                    }
                                    endModule.focus();
                                }
                            }
                        }
                    } else {
                        var newMode = mode === 'year'
                            ? (!settings.disableMonth ? 'month' : 'day')
                            : (mode === 'month'
                                ? 'day'
                                : (mode === 'day' ? 'hour' : 'minute')); // eslint-disable-line unicorn/no-nested-ternary
                        module.set.mode(newMode);
                        if (mode === 'hour' || (mode === 'day' && module.get.date())) {
                            // the user has chosen enough to consider a valid date/time has been chosen
                            module.set.date(date, true, false);
                        } else {
                            module.set.focusDate(date);
                        }
                    }
                },

                changeDate: function (date) {
                    module.set.date(date);
                },

                clear: function () {
                    module.set.date();
                },

                popup: function () {
                    return $activator.popup.apply($activator, arguments);
                },

                focus: function () {
                    if ($input.length > 0) {
                        $input.trigger('focus');
                    } else {
                        $container.trigger('focus');
                    }
                },
                blur: function () {
                    if ($input.length > 0) {
                        $input.trigger('blur');
                    } else {
                        $container.trigger('blur');
                    }
                },

                helper: {
                    dateFormat: function (format, date) {
                        if (!(date instanceof Date)) {
                            return '';
                        }
                        if (typeof format === 'function') {
                            return format.call(module, date, settings);
                        }

                        var
                            D = date.getDate(),
                            M = date.getMonth(),
                            Y = date.getFullYear(),
                            d = date.getDay(),
                            H = date.getHours(),
                            m = date.getMinutes(),
                            s = date.getSeconds(),
                            w = module.get.weekOfYear(Y, M, D + 1 - settings.firstDayOfWeek),
                            h = H % 12 || 12,
                            a = H < 12 ? settings.text.am.toLowerCase() : settings.text.pm.toLowerCase(),
                            tokens = {
                                D: D,
                                DD: ('0' + D).slice(-2),
                                M: M + 1,
                                MM: ('0' + (M + 1)).slice(-2),
                                MMM: settings.text.monthsShort[M],
                                MMMM: settings.text.months[M],
                                Y: Y,
                                YY: String(Y).slice(2),
                                YYYY: Y,
                                d: d,
                                dd: settings.text.dayNamesShort[d].slice(0, 2),
                                ddd: settings.text.dayNamesShort[d],
                                dddd: settings.text.dayNames[d],
                                h: h,
                                hh: ('0' + h).slice(-2),
                                H: H,
                                HH: ('0' + H).slice(-2),
                                m: m,
                                mm: ('0' + m).slice(-2),
                                s: s,
                                ss: ('0' + s).slice(-2),
                                a: a,
                                A: a.toUpperCase(),
                                S: ['th', 'st', 'nd', 'rd'][(D % 10) > 3 ? 0 : ((D % 100) - (D % 10) === 10 ? 0 : D % 10)],
                                w: w,
                                ww: ('0' + w).slice(-2),
                            }
                        ;

                        return format.replace(settings.regExp.token, function (match) {
                            if (match in tokens) {
                                return tokens[match];
                            }

                            return match.slice(1, -1);
                        });
                    },
                    isDisabled: function (date, mode) {
                        return (mode === 'day' || mode === 'month' || mode === 'year' || mode === 'hour') && (((mode === 'day' && settings.disabledDaysOfWeek.indexOf(date.getDay()) !== -1) || settings.disabledDates.some(function (d) {
                            var blocked = false;

                            if (typeof d === 'string') {
                                d = module.helper.sanitiseDate(d);
                            }
                            if (d instanceof Date) {
                                blocked = module.helper.dateEqual(date, d, mode);
                            } else if (d !== null && typeof d === 'object') {
                                if (d[metadata.year]) {
                                    if (typeof d[metadata.year] === 'number') {
                                        blocked = date.getFullYear() === d[metadata.year];
                                    } else if (Array.isArray(d[metadata.year])) {
                                        blocked = d[metadata.year].indexOf(date.getFullYear()) > -1;
                                    }
                                } else if (d[metadata.month]) {
                                    if (typeof d[metadata.month] === 'number') {
                                        blocked = date.getMonth() === d[metadata.month];
                                    } else if (Array.isArray(d[metadata.month])) {
                                        blocked = d[metadata.month].indexOf(date.getMonth()) > -1;
                                    } else if (d[metadata.month] instanceof Date) {
                                        var sdate = module.helper.sanitiseDate(d[metadata.month]);

                                        blocked = (date.getMonth() === sdate.getMonth()) && (date.getFullYear() === sdate.getFullYear());
                                    }
                                } else if (d[metadata.date] && mode === 'day') {
                                    if (d[metadata.date] instanceof Date) {
                                        blocked = module.helper.dateEqual(date, module.helper.sanitiseDate(d[metadata.date]), mode);
                                    } else if (Array.isArray(d[metadata.date])) {
                                        blocked = d[metadata.date].some(function (idate) {
                                            return module.helper.dateEqual(date, idate, mode);
                                        });
                                    }
                                }
                            }

                            return blocked;
                        })) || (mode === 'hour' && settings.disabledHours.some(function (d) {
                            var blocked = false;

                            if (typeof d === 'string') {
                                d = module.helper.sanitiseDate(d);
                            }
                            if (d instanceof Date) {
                                blocked = module.helper.dateEqual(date, d, mode);
                            } else if (typeof d === 'number') {
                                blocked = date.getHours() === d;
                            } else if (d !== null && typeof d === 'object') {
                                if (d[metadata.date]) {
                                    if (d[metadata.date] instanceof Date) {
                                        blocked = module.helper.dateEqual(date, module.helper.sanitiseDate(d[metadata.date]));
                                    } else if (Array.isArray(d[metadata.date])) {
                                        blocked = d[metadata.date].some(function (idate) {
                                            return module.helper.dateEqual(date, idate, mode);
                                        });
                                    }
                                }

                                if (d[metadata.days]) {
                                    if (typeof d[metadata.days] === 'number') {
                                        blocked = date.getDay() === d[metadata.days];
                                    } else if (Array.isArray(d[metadata.days])) {
                                        blocked = d[metadata.days].indexOf(date.getDay()) > -1;
                                    }
                                }

                                if (d[metadata.hours]) {
                                    if (typeof d[metadata.hours] === 'number') {
                                        blocked = blocked && date.getHours() === d[metadata.hours];
                                    } else if (Array.isArray(d[metadata.hours])) {
                                        blocked = blocked && d[metadata.hours].indexOf(date.getHours()) > -1;
                                    }
                                }
                            }

                            return blocked;
                        })));
                    },
                    isEnabled: function (date, mode) {
                        if (mode === 'day') {
                            return settings.enabledDates.length === 0 || settings.enabledDates.some(function (d) {
                                var enabled = false;

                                if (typeof d === 'string') {
                                    d = module.helper.sanitiseDate(d);
                                }
                                if (d instanceof Date) {
                                    enabled = module.helper.dateEqual(date, d, mode);
                                } else if (d !== null && typeof d === 'object' && d[metadata.date]) {
                                    enabled = module.helper.dateEqual(date, module.helper.sanitiseDate(d[metadata.date]), mode);
                                }

                                return enabled;
                            });
                        }

                        return true;
                    },
                    findDayAsObject: function (date, mode, dates) {
                        if (mode === 'day' || mode === 'month' || mode === 'year') {
                            var d;
                            for (var i = 0; i < dates.length; i++) {
                                d = dates[i];
                                if (typeof d === 'string') {
                                    d = module.helper.sanitiseDate(d);
                                }
                                if (d instanceof Date && module.helper.dateEqual(date, d, mode)) {
                                    var dateObject = {};
                                    dateObject[metadata.date] = d;

                                    return dateObject;
                                }
                                if (d !== null && typeof d === 'object') {
                                    if (d[metadata.year]) {
                                        if (typeof d[metadata.year] === 'number' && date.getFullYear() === d[metadata.year]) {
                                            return d;
                                        }
                                        if (Array.isArray(d[metadata.year])) {
                                            if (d[metadata.year].indexOf(date.getFullYear()) > -1) {
                                                return d;
                                            }
                                        }
                                    } else if (d[metadata.month]) {
                                        if (typeof d[metadata.month] === 'number' && date.getMonth() === d[metadata.month]) {
                                            return d;
                                        }
                                        if (Array.isArray(d[metadata.month])) {
                                            if (d[metadata.month].indexOf(date.getMonth()) > -1) {
                                                return d;
                                            }
                                        } else if (d[metadata.month] instanceof Date) {
                                            var sdate = module.helper.sanitiseDate(d[metadata.month]);
                                            if ((date.getMonth() === sdate.getMonth()) && (date.getFullYear() === sdate.getFullYear())) {
                                                return d;
                                            }
                                        }
                                    } else if (d[metadata.date] && mode === 'day') {
                                        if (d[metadata.date] instanceof Date && module.helper.dateEqual(date, module.helper.sanitiseDate(d[metadata.date]), mode)) {
                                            return d;
                                        }
                                        if (Array.isArray(d[metadata.date])) {
                                            if (d[metadata.date].some(function (idate) {
                                                return module.helper.dateEqual(date, idate, mode);
                                            })) {
                                                return d;
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        return null;
                    },
                    findHourAsObject: function (date, mode, hours) {
                        if (mode === 'hour') {
                            var d;
                            var hourCheck = function (date, d) {
                                if (d[metadata.hours]) {
                                    if (typeof d[metadata.hours] === 'number' && date.getHours() === d[metadata.hours]) {
                                        return d;
                                    }
                                    if (Array.isArray(d[metadata.hours])) {
                                        if (d[metadata.hours].indexOf(date.getHours()) > -1) {
                                            return d;
                                        }
                                    }
                                }
                            };
                            for (var i = 0; i < hours.length; i++) {
                                d = hours[i];
                                if (typeof d === 'number' && date.getHours() === d) {
                                    return null;
                                }
                                if (d !== null && typeof d === 'object') {
                                    if (d[metadata.days] && hourCheck(date, d)) {
                                        if (typeof d[metadata.days] === 'number' && date.getDay() === d[metadata.days]) {
                                            return d;
                                        }
                                        if (Array.isArray(d[metadata.days])) {
                                            if (d[metadata.days].indexOf(date.getDay()) > -1) {
                                                return d;
                                            }
                                        }
                                    } else if (d[metadata.date] && hourCheck(date, d)) {
                                        if (d[metadata.date] instanceof Date && module.helper.dateEqual(date, module.helper.sanitiseDate(d[metadata.date]))) {
                                            return d;
                                        }
                                        if (Array.isArray(d[metadata.date])) {
                                            if (d[metadata.date].some(function (idate) {
                                                return module.helper.dateEqual(date, idate, mode);
                                            })) {
                                                return d;
                                            }
                                        }
                                    } else if (hourCheck(date, d)) {
                                        return d;
                                    }
                                }
                            }
                        }

                        return null;
                    },
                    sanitiseDate: function (date) {
                        if (!(date instanceof Date)) {
                            date = parser.date('' + date, settings);
                        }
                        if (!date || isNaN(date.getTime())) {
                            return null;
                        }

                        return date;
                    },
                    dateDiff: function (date1, date2, mode) {
                        if (!mode) {
                            mode = 'day';
                        }

                        var isTimeOnly = settings.type === 'time';
                        var isYear = mode === 'year';
                        var isYearOrMonth = isYear || mode === 'month';
                        var isMinute = mode === 'minute';
                        var isHourOrMinute = isMinute || mode === 'hour';
                        // only care about a minute accuracy of settings.minTimeGap
                        date1 = new Date(
                            isTimeOnly ? 2000 : date1.getFullYear(),
                            isTimeOnly ? 0 : (isYear ? 0 : date1.getMonth()),
                            isTimeOnly ? 1 : (isYearOrMonth ? 1 : date1.getDate()),
                            !isHourOrMinute ? 0 : date1.getHours(),
                            !isMinute ? 0 : settings.minTimeGap * Math.floor(date1.getMinutes() / settings.minTimeGap)
                        );
                        date2 = new Date(
                            isTimeOnly ? 2000 : date2.getFullYear(),
                            isTimeOnly ? 0 : (isYear ? 0 : date2.getMonth()),
                            isTimeOnly ? 1 : (isYearOrMonth ? 1 : date2.getDate()),
                            !isHourOrMinute ? 0 : date2.getHours(),
                            !isMinute ? 0 : settings.minTimeGap * Math.floor(date2.getMinutes() / settings.minTimeGap)
                        );

                        return date2.getTime() - date1.getTime();
                    },
                    dateEqual: function (date1, date2, mode) {
                        return !!date1 && !!date2 && module.helper.dateDiff(date1, date2, mode) === 0;
                    },
                    isDateInRange: function (date, mode, minDate, maxDate) {
                        if (!minDate && !maxDate) {
                            var startDate = module.get.startDate();
                            minDate = startDate && settings.minDate ? new Date(Math.max(startDate, settings.minDate)) : startDate || settings.minDate;
                            maxDate = settings.maxDate;
                        }
                        minDate = minDate && new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate(), minDate.getHours(), settings.minTimeGap * Math.ceil(minDate.getMinutes() / settings.minTimeGap));

                        return !(!date
                            || (minDate && module.helper.dateDiff(date, minDate, mode) > 0)
                            || (maxDate && module.helper.dateDiff(maxDate, date, mode) > 0));
                    },
                    dateInRange: function (date, minDate, maxDate) {
                        if (!minDate && !maxDate) {
                            var startDate = module.get.startDate();
                            minDate = startDate && settings.minDate ? new Date(Math.max(startDate, settings.minDate)) : startDate || settings.minDate;
                            maxDate = settings.maxDate;
                        }
                        minDate = minDate && new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate(), minDate.getHours(), settings.minTimeGap * Math.ceil(minDate.getMinutes() / settings.minTimeGap));
                        var isTimeOnly = settings.type === 'time';

                        return !date
                            ? date
                            : (minDate && module.helper.dateDiff(date, minDate, 'minute') > 0
                                ? (isTimeOnly ? module.helper.mergeDateTime(date, minDate) : minDate) // eslint-disable-line unicorn/no-nested-ternary
                                : (maxDate && module.helper.dateDiff(maxDate, date, 'minute') > 0 // eslint-disable-line unicorn/no-nested-ternary
                                    ? (isTimeOnly ? module.helper.mergeDateTime(date, maxDate) : maxDate)
                                    : date));
                    },
                    mergeDateTime: function (date, time) {
                        return !date || !time
                            ? time
                            : new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes());
                    },
                    isTodayButton: function (element) {
                        return element.text() === settings.text.today;
                    },
                },

                setting: function (name, value) {
                    module.debug('Changing setting', name, value);
                    if ($.isPlainObject(name)) {
                        $.extend(true, settings, name);
                    } else if (value !== undefined) {
                        if ($.isPlainObject(settings[name])) {
                            $.extend(true, settings[name], value);
                        } else {
                            settings[name] = value;
                        }
                    } else {
                        return settings[name];
                    }
                },
                internal: function (name, value) {
                    if ($.isPlainObject(name)) {
                        $.extend(true, module, name);
                    } else if (value !== undefined) {
                        module[name] = value;
                    } else {
                        return module[name];
                    }
                },
                debug: function () {
                    if (!settings.silent && settings.debug) {
                        if (settings.performance) {
                            module.performance.log(arguments);
                        } else {
                            module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
                            module.debug.apply(console, arguments);
                        }
                    }
                },
                verbose: function () {
                    if (!settings.silent && settings.verbose && settings.debug) {
                        if (settings.performance) {
                            module.performance.log(arguments);
                        } else {
                            module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
                            module.verbose.apply(console, arguments);
                        }
                    }
                },
                error: function () {
                    if (!settings.silent) {
                        module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
                        module.error.apply(console, arguments);
                    }
                },
                performance: {
                    log: function (message) {
                        var
                            currentTime,
                            executionTime,
                            previousTime
                        ;
                        if (settings.performance) {
                            currentTime = Date.now();
                            previousTime = time || currentTime;
                            executionTime = currentTime - previousTime;
                            time = currentTime;
                            performance.push({
                                Name: message[0],
                                Arguments: [].slice.call(message, 1) || '',
                                Element: element,
                                'Execution Time': executionTime,
                            });
                        }
                        clearTimeout(module.performance.timer);
                        module.performance.timer = setTimeout(module.performance.display, 500);
                    },
                    display: function () {
                        var
                            title = settings.name + ':',
                            totalTime = 0
                        ;
                        time = false;
                        clearTimeout(module.performance.timer);
                        $.each(performance, function (index, data) {
                            totalTime += data['Execution Time'];
                        });
                        title += ' ' + totalTime + 'ms';
                        if (moduleSelector) {
                            title += ' \'' + moduleSelector + '\'';
                        }
                        if (performance.length > 0) {
                            console.groupCollapsed(title);
                            if (console.table) {
                                console.table(performance);
                            } else {
                                $.each(performance, function (index, data) {
                                    console.log(data.Name + ': ' + data['Execution Time'] + 'ms');
                                });
                            }
                            console.groupEnd();
                        }
                        performance = [];
                    },
                },
                invoke: function (query, passedArguments, context) {
                    var
                        object = instance,
                        maxDepth,
                        found,
                        response
                    ;
                    passedArguments = passedArguments || queryArguments;
                    context = context || element;
                    if (typeof query === 'string' && object !== undefined) {
                        query = query.split(/[ .]/);
                        maxDepth = query.length - 1;
                        $.each(query, function (depth, value) {
                            var camelCaseValue = depth !== maxDepth
                                ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1)
                                : query
                            ;
                            if ($.isPlainObject(object[camelCaseValue]) && (depth !== maxDepth)) {
                                object = object[camelCaseValue];
                            } else if (object[camelCaseValue] !== undefined) {
                                found = object[camelCaseValue];

                                return false;
                            } else if ($.isPlainObject(object[value]) && (depth !== maxDepth)) {
                                object = object[value];
                            } else if (object[value] !== undefined) {
                                found = object[value];

                                return false;
                            } else {
                                module.error(error.method, query);

                                return false;
                            }
                        });
                    }
                    if (isFunction(found)) {
                        response = found.apply(context, passedArguments);
                    } else if (found !== undefined) {
                        response = found;
                    }
                    if (Array.isArray(returnedValue)) {
                        returnedValue.push(response);
                    } else if (returnedValue !== undefined) {
                        returnedValue = [returnedValue, response];
                    } else if (response !== undefined) {
                        returnedValue = response;
                    }

                    return found;
                },
            };

            if (methodInvoked) {
                if (instance === undefined) {
                    module.initialize();
                }
                module.invoke(query);
            } else {
                if (instance !== undefined) {
                    instance.invoke('destroy');
                }
                module.initialize();
            }
        });

        return returnedValue !== undefined
            ? returnedValue
            : this;
    };

    $.fn.calendar.settings = {

        name: 'Calendar',
        namespace: 'calendar',

        silent: false,
        debug: false,
        verbose: false,
        performance: true,

        context: false,

        type: 'datetime', // picker type, can be 'datetime', 'date', 'time', 'month', or 'year'
        firstDayOfWeek: 0, // day for first day column (0 = Sunday)
        constantHeight: true, // add rows to shorter months to keep day calendar height consistent (6 rows)
        today: false, // show a 'today/now' button at the bottom of the calendar
        closable: true, // close the popup after selecting a date/time
        monthFirst: true, // month before day when parsing date from text
        touchReadonly: true, // set input to readonly on touch devices
        inline: false, // create the calendar inline instead of inside a popup
        on: null, // when to show the popup (defaults to 'focus' for input, 'click' for others)
        initialDate: null, // date to display initially when no date is selected (null = now)
        startMode: false, // display mode to start in, can be 'year', 'month', 'day', 'hour', 'minute' (false = 'day')
        minDate: null, // minimum date/time that can be selected, dates/times before are disabled
        maxDate: null, // maximum date/time that can be selected, dates/times after are disabled
        disableYear: false, // disable year selection mode
        disableMonth: false, // disable month selection mode
        disableMinute: false, // disable minute selection mode
        formatInput: true, // format the input text upon input blur and module creation
        startCalendar: null, // jquery object or selector for another calendar that represents the start date of a date range
        endCalendar: null, // jquery object or selector for another calendar that represents the end date of a date range
        multiMonth: 1, // show multiple months when in 'day' mode
        monthOffset: 0, // position current month by offset when multimonth > 1
        minTimeGap: 5,
        showWeekNumbers: false, // show Number of Week at the very first column of a dayView
        disabledHours: [], // specific hour(s) which won't be selectable and contain additional information.
        disabledDates: [], // specific day(s) which won't be selectable and contain additional information.
        disabledDaysOfWeek: [], // day(s) which won't be selectable(s) (0 = Sunday)
        enabledDates: [], // specific day(s) which will be selectable, all other days will be disabled
        eventDates: [], // specific day(s) which will be shown in a different color and using tooltips
        centuryBreak: 60, // starting short year until 99 where it will be assumed to belong to the last century
        currentCentury: 2000, // century to be added to 2-digit years (00 to {centuryBreak}-1)
        selectAdjacentDays: false, // The calendar can show dates from adjacent month. These adjacent month dates can also be made selectable.
        // popup options ('popup', 'on', 'hoverable', and show/hide callbacks are overridden)
        popupOptions: {
            position: 'bottom left',
            lastResort: 'bottom left',
            prefer: 'opposite',
            observeChanges: false,
            hideOnScroll: false,
        },

        text: {
            days: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            today: 'Today',
            now: 'Now',
            am: 'AM',
            pm: 'PM',
            weekNo: 'Week',
        },

        formatter: {
            yearHeader: function (date, settings) {
                var decadeYear = Math.ceil(date.getFullYear() / 10) * 10;

                return (decadeYear - 9) + ' - ' + (decadeYear + 2);
            },
            monthHeader: 'YYYY',
            dayHeader: 'MMMM YYYY',
            hourHeader: 'MMMM D, YYYY',
            minuteHeader: 'MMMM D, YYYY',
            dayColumnHeader: function (day, settings) {
                return settings.text.days[day];
            },
            datetime: 'MMMM D, YYYY h:mm A',
            date: 'MMMM D, YYYY',
            time: 'h:mm A',
            cellTime: 'h:mm A',
            month: 'MMMM YYYY',
            year: 'YYYY',
            today: function (settings) {
                return settings.type === 'date' ? settings.text.today : settings.text.now;
            },
            cell: function (cell, date, cellOptions) {},
        },

        parser: {
            date: function (text, settings) {
                if (text instanceof Date) {
                    return text;
                }
                if (!text) {
                    return null;
                }
                text = String(text).trim().replace(/([./:-])\s+/g, '$1').replace(/\s+([./:-])/g, '$1')
                    .replace(/\s+/g, ' ');
                if (text.length === 0) {
                    return null;
                }
                if (/^\d{4}(?:[./-]\d{1,2}){2}$/.test(text)) {
                    text = text.replace(/[./-]/g, '/') + ' 00:00:00';
                }
                // Reverse date and month in some cases
                text = settings.monthFirst || !/^\d{1,2}[./-]/.test(text) ? text : text.replace(/[./-]/g, '/').replace(/(\d+)\/(\d+)/, '$2/$1');
                var textDate = new Date(text);
                var numberOnly = text.match(/^\d+$/) !== null;
                if (!numberOnly && !isNaN(textDate.getDate())) {
                    return textDate;
                }
                text = text.toLowerCase();

                var
                    i,
                    j,
                    k
                ;
                var
                    minute = -1,
                    hour = -1,
                    day = -1,
                    month = -1,
                    year = -1
                ;
                var isAm;

                var isTimeOnly = settings.type === 'time';
                var isDateOnly = settings.type.indexOf('time') < 0;

                var
                    words = text.split(settings.regExp.dateWords),
                    word
                ;
                var
                    numbers = text.split(settings.regExp.dateNumbers),
                    number
                ;

                var parts;
                var monthString;

                if (!isDateOnly) {
                    // am/pm
                    isAm = $.inArray(settings.text.am.toLowerCase(), words) >= 0
                        ? true
                        : ($.inArray(settings.text.pm.toLowerCase(), words) >= 0 ? false : undefined);

                    // time with ':'
                    for (i = 0; i < numbers.length; i++) {
                        number = numbers[i];
                        if (number.indexOf(':') >= 0) {
                            if (hour < 0 || minute < 0) {
                                parts = number.split(':');
                                for (k = 0; k < Math.min(2, parts.length); k++) {
                                    j = parseInt(parts[k], 10);
                                    if (isNaN(j)) {
                                        j = 0;
                                    }
                                    if (k === 0) {
                                        hour = j % 24;
                                    } else {
                                        minute = j % 60;
                                    }
                                }
                            }
                            numbers.splice(i, 1);
                        }
                    }
                }

                if (!isTimeOnly) {
                    // textual month
                    for (i = 0; i < words.length; i++) {
                        word = words[i];
                        if (word.length <= 0) {
                            continue;
                        }
                        for (j = 0; j < settings.text.months.length; j++) {
                            monthString = settings.text.months[j];
                            monthString = monthString.slice(0, word.length).toLowerCase();
                            if (monthString === word) {
                                month = j + 1;

                                break;
                            }
                        }
                        if (month >= 0) {
                            break;
                        }
                    }

                    // year > settings.centuryBreak
                    for (i = 0; i < numbers.length; i++) {
                        j = parseInt(numbers[i], 10);
                        if (isNaN(j)) {
                            continue;
                        }
                        if (j >= settings.centuryBreak && i === numbers.length - 1) {
                            if (j <= 99) {
                                j += settings.currentCentury - 100;
                            }
                            year = j;
                            numbers.splice(i, 1);

                            break;
                        }
                    }

                    // numeric month
                    if (month < 0) {
                        for (i = 0; i < numbers.length; i++) {
                            k = i > 1 || settings.monthFirst
                                ? i
                                : (i === 1 ? 0 : 1);
                            j = parseInt(numbers[k], 10);
                            if (isNaN(j)) {
                                continue;
                            }
                            if (j >= 1 && j <= 12) {
                                month = j;
                                numbers.splice(k, 1);

                                break;
                            }
                        }
                    }

                    // day
                    for (i = 0; i < numbers.length; i++) {
                        j = parseInt(numbers[i], 10);
                        if (isNaN(j)) {
                            continue;
                        }
                        if (j >= 1 && j <= 31) {
                            day = j;
                            numbers.splice(i, 1);

                            break;
                        }
                    }

                    // year <= settings.centuryBreak
                    if (year < 0) {
                        for (i = numbers.length - 1; i >= 0; i--) {
                            j = parseInt(numbers[i], 10);
                            if (isNaN(j)) {
                                continue;
                            }
                            if (j <= 99) {
                                j += settings.currentCentury;
                            }
                            year = j;
                            numbers.splice(i, 1);

                            break;
                        }
                    }
                }

                if (!isDateOnly) {
                    // hour
                    if (hour < 0) {
                        for (i = 0; i < numbers.length; i++) {
                            j = parseInt(numbers[i], 10);
                            if (isNaN(j)) {
                                continue;
                            }
                            if (j >= 0 && j <= 23) {
                                hour = j;
                                numbers.splice(i, 1);

                                break;
                            }
                        }
                    }

                    // minute
                    if (minute < 0) {
                        for (i = 0; i < numbers.length; i++) {
                            j = parseInt(numbers[i], 10);
                            if (isNaN(j)) {
                                continue;
                            }
                            if (j >= 0 && j <= 59) {
                                minute = j;
                                numbers.splice(i, 1);

                                break;
                            }
                        }
                    }
                }

                if (minute < 0 && hour < 0 && day < 0 && month < 0 && year < 0) {
                    return null;
                }

                if (minute < 0) {
                    minute = 0;
                }
                if (hour < 0) {
                    hour = 0;
                }
                if (day < 0) {
                    day = 1;
                }
                if (month < 0) {
                    month = 1;
                }
                if (year < 0) {
                    year = new Date().getFullYear();
                }

                if (isAm !== undefined) {
                    if (isAm) {
                        if (hour === 12) {
                            hour = 0;
                        }
                    } else if (hour < 12) {
                        hour += 12;
                    }
                }

                var date = new Date(year, month - 1, day, hour, minute);
                if (date.getMonth() !== month - 1 || date.getFullYear() !== year) {
                    // month or year don't match up, switch to last day of the month
                    date = new Date(year, month, 0, hour, minute);
                }

                return isNaN(date.getTime()) ? null : date;
            },
        },

        // callback before date is changed, return false to cancel the change
        onBeforeChange: function (date, text, mode) {
            return true;
        },

        // callback when date changes
        onChange: function (date, text, mode) {},

        // callback before show animation, return false to prevent show
        onShow: function () {},

        // callback after show animation
        onVisible: function () {},

        // callback before hide animation, return false to prevent hide
        onHide: function () {},

        // callback after hide animation
        onHidden: function () {},

        // callback before item is selected, return false to prevent selection
        onSelect: function (date, mode) {},

        // is the given date disabled?
        isDisabled: function (date, mode) {
            return false;
        },

        selector: {
            popup: '.ui.popup',
            input: 'input',
            activator: 'input',
            append: '.inline.field,.inline.fields',
        },

        regExp: {
            dateWords: /[^A-Za-z\u00C0-\u024F]+/g,
            dateNumbers: /[^\d:]+/g,
            token: /d{1,4}|D{1,2}|M{1,4}|YY(?:YY)?|([Hhmsw])\1?|[ASYa]|"[^"]*"|'[^']*'/g,
        },

        error: {
            popup: 'UI Popup, a required component is not included in this page',
            method: 'The method you called is not defined.',
        },

        className: {
            calendar: 'calendar',
            active: 'active',
            popup: 'ui popup',
            grid: 'ui equal width grid',
            column: 'column',
            table: 'ui celled center aligned unstackable table',
            inverted: 'inverted',
            prev: 'prev link',
            next: 'next link',
            prevIcon: 'chevron left icon',
            nextIcon: 'chevron right icon',
            link: 'link',
            cell: 'link',
            disabledCell: 'disabled',
            weekCell: 'disabled',
            adjacentCell: 'adjacent',
            activeCell: 'active',
            rangeCell: 'range',
            focusCell: 'focus',
            todayCell: 'today',
            today: 'today link',
            disabled: 'disabled',
        },

        metadata: {
            date: 'date',
            focusDate: 'focusDate',
            startDate: 'startDate',
            endDate: 'endDate',
            minDate: 'minDate',
            maxDate: 'maxDate',
            mode: 'mode',
            type: 'type',
            monthOffset: 'monthOffset',
            message: 'message',
            class: 'class',
            inverted: 'inverted',
            variation: 'variation',
            position: 'position',
            month: 'month',
            year: 'year',
            hours: 'hours',
            days: 'days',
        },

        eventClass: 'blue',
    };
})(jQuery, window, document);
