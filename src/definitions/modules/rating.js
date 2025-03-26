/*!
 * # Fomantic-UI - Rating
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

    $.fn.rating = function (parameters) {
        let $allModules = $(this);

        let time = Date.now();
        let performance = [];

        let query = arguments[0];
        let methodInvoked = typeof query === 'string';
        let queryArguments = [].slice.call(arguments, 1);
        let returnedValue;
        $allModules.each(function () {
            let settings = $.isPlainObject(parameters)
                ? $.extend(true, {}, $.fn.rating.settings, parameters)
                : $.extend({}, $.fn.rating.settings);

            let namespace = settings.namespace;
            let className = settings.className;
            let error = settings.error;
            let metadata = settings.metadata;
            let selector = settings.selector;
            let cssVars = settings.cssVars;

            let eventNamespace = '.' + namespace;
            let moduleNamespace = 'module-' + namespace;

            let element = this;
            let instance = $(this).data(moduleNamespace);

            let $module = $(this);
            let $icon = $module.find(selector.icon);

            let initialLoad;
            let module;

            module = {

                initialize: function () {
                    module.verbose('Initializing rating module', settings);

                    if ($icon.length === 0) {
                        module.setup.layout();
                    }

                    if (settings.interactive && !module.is.disabled()) {
                        module.enable();
                    } else {
                        module.disable();
                    }
                    module.set.initialLoad();
                    module.set.rating(module.get.initialRating());
                    module.remove.initialLoad();
                    module.instantiate();
                },

                instantiate: function () {
                    module.verbose('Instantiating module', settings);
                    instance = module;
                    $module
                        .data(moduleNamespace, module);
                },

                destroy: function () {
                    module.verbose('Destroying previous instance', instance);
                    module.remove.events();
                    $module
                        .removeData(moduleNamespace);
                },

                refresh: function () {
                    $icon = $module.find(selector.icon);
                },

                setup: {
                    layout: function () {
                        let maxRating = module.get.maxRating();
                        let icon = module.get.icon();
                        let html = $.fn.rating.settings.templates.icon(maxRating, icon);
                        module.debug('Generating icon html dynamically');
                        $module
                            .html(html);
                        module.refresh();
                    },
                },

                event: {
                    mouseenter: function () {
                        let $activeIcon = $(this);
                        $activeIcon
                            .nextAll()
                            .removeClass(className.selected);
                        $module
                            .addClass(className.selected);
                        $activeIcon
                            .addClass(className.selected)
                            .prevAll()
                            .addClass(className.selected);
                    },
                    mouseleave: function () {
                        $module
                            .removeClass(className.selected);
                        $icon
                            .removeClass(className.selected);
                    },
                    click: function () {
                        let $activeIcon = $(this);
                        let currentRating = module.get.rating();
                        let rating = $icon.index($activeIcon) + 1;
                        let canClear = settings.clearable === 'auto'
                            ? $icon.length === 1
                            : settings.clearable;
                        if (canClear && currentRating === rating) {
                            module.clearRating();
                        } else {
                            module.set.rating(rating);
                        }
                    },
                },

                clearRating: function () {
                    module.debug('Clearing current rating');
                    module.set.rating(0);
                },

                bind: {
                    events: function () {
                        module.verbose('Binding events');
                        $module
                            .on('mouseenter' + eventNamespace, selector.icon, module.event.mouseenter)
                            .on('mouseleave' + eventNamespace, selector.icon, module.event.mouseleave)
                            .on('click' + eventNamespace, selector.icon, module.event.click);
                    },
                },

                remove: {
                    events: function () {
                        module.verbose('Removing events');
                        $module
                            .off(eventNamespace);
                    },
                    initialLoad: function () {
                        initialLoad = false;
                    },
                },

                enable: function () {
                    module.debug('Setting rating to interactive mode');
                    module.bind.events();
                    $module
                        .removeClass(className.disabled);
                },

                disable: function () {
                    module.debug('Setting rating to read-only mode');
                    module.remove.events();
                    $module
                        .addClass(className.disabled);
                },

                is: {
                    initialLoad: function () {
                        return initialLoad;
                    },
                    disabled: function () {
                        return $module.hasClass(className.disabled);
                    },
                },

                get: {
                    icon: function () {
                        let icon = $module.data(metadata.icon);
                        if (icon) {
                            $module.removeData(metadata.icon);
                        }

                        return icon || settings.icon;
                    },
                    initialRating: function () {
                        if ($module.data(metadata.rating) !== undefined) {
                            $module.removeData(metadata.rating);

                            return $module.data(metadata.rating);
                        }

                        return settings.initialRating;
                    },
                    maxRating: function () {
                        if ($module.data(metadata.maxRating) !== undefined) {
                            $module.removeData(metadata.maxRating);

                            return $module.data(metadata.maxRating);
                        }

                        return settings.maxRating;
                    },
                    rating: function () {
                        let currentRating = $icon.filter('.' + className.active).length;
                        module.verbose('Current rating retrieved', currentRating);

                        return currentRating;
                    },
                },

                set: {
                    rating: function (rating) {
                        let ratingIndex = Math.floor(
                            rating - 1 >= 0
                                ? rating - 1
                                : 0
                        );
                        let $activeIcon = $icon.eq(ratingIndex);
                        let $partialActiveIcon = rating <= 1
                            ? $activeIcon
                            : $activeIcon.next();
                        let filledPercentage = (rating % 1) * 100;
                        $module
                            .removeClass(className.selected);
                        $icon
                            .removeClass(className.selected)
                            .removeClass(className.active)
                            .removeClass(className.partiallyActive);
                        if (rating > 0) {
                            module.verbose('Setting current rating to', rating);
                            $activeIcon
                                .prevAll()
                                .addBack()
                                .addClass(className.active);
                            if ($activeIcon.next() && rating % 1 !== 0) {
                                $partialActiveIcon
                                    .addClass(className.partiallyActive)
                                    .addClass(className.active);
                                $partialActiveIcon
                                    .css(cssVars.filledCustomPropName, filledPercentage + '%');
                                if ($partialActiveIcon.css('backgroundColor') === 'transparent') {
                                    $partialActiveIcon
                                        .removeClass(className.partiallyActive)
                                        .removeClass(className.active);
                                }
                            }
                        }
                        if (!module.is.initialLoad()) {
                            settings.onRate.call(element, rating);
                        }
                    },
                    initialLoad: function () {
                        initialLoad = true;
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
                        let currentTime;
                        let executionTime;
                        let previousTime;
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
                        module.performance.timer = setTimeout(function () {
                            module.performance.display();
                        }, 500);
                    },
                    display: function () {
                        let title = settings.name + ':';
                        let totalTime = 0;
                        time = false;
                        clearTimeout(module.performance.timer);
                        $.each(performance, function (index, data) {
                            totalTime += data['Execution Time'];
                        });
                        title += ' ' + totalTime + 'ms';
                        if ($allModules.length > 1) {
                            title += ' (' + $allModules.length + ')';
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
                    let object = instance;
                    let maxDepth;
                    let found;
                    let response;
                    passedArguments = passedArguments || queryArguments;
                    context = context || element;
                    if (typeof query === 'string' && object !== undefined) {
                        query = query.split(/[ .]/);
                        maxDepth = query.length - 1;
                        $.each(query, function (depth, value) {
                            let camelCaseValue = depth !== maxDepth
                                ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1)
                                : query;
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

    $.fn.rating.settings = {

        name: 'Rating',
        namespace: 'rating',

        icon: 'star',

        silent: false,
        debug: false,
        verbose: false,
        performance: true,

        initialRating: 0,
        interactive: true,
        maxRating: 4,
        clearable: 'auto',

        fireOnInit: false,

        onRate: function (rating) {},

        error: {
            method: 'The method you called is not defined',
        },

        metadata: {
            rating: 'rating',
            maxRating: 'maxRating',
            icon: 'icon',
        },

        className: {
            active: 'active',
            disabled: 'disabled',
            selected: 'selected',
            loading: 'loading',
            partiallyActive: 'partial',
        },

        cssVars: {
            filledCustomPropName: '--full',
        },

        selector: {
            icon: '.icon',
        },

        templates: {
            escape: function (string) {
                const escapeMap = {
                    '"': '&quot;',
                    '&': '&amp;',
                    "'": '&apos;',
                    '<': '&lt;',
                    '>': '&gt;',
                };

                return String(string).replace(/["&'<>]/g, (chr) => escapeMap[chr]);
            },
            icon: function (maxRating, iconClass) {
                let icon = 1;
                let html = '';
                let escape = $.fn.rating.settings.templates.escape;
                while (icon <= maxRating) {
                    html += '<i class="' + escape(iconClass) + ' icon"></i>';
                    icon++;
                }

                return html;
            },
        },

    };
})(jQuery, window, document);
