/*!
 * # Fomantic-UI - Shape
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

    $.fn.shape = function (parameters) {
        let $allModules = $(this);

        let time = Date.now();
        let performance = [];

        let query = arguments[0];
        let methodInvoked = typeof query === 'string';
        let queryArguments = [].slice.call(arguments, 1);

        let returnedValue;

        $allModules.each(function () {
            let settings = $.isPlainObject(parameters)
                ? $.extend(true, {}, $.fn.shape.settings, parameters)
                : $.extend({}, $.fn.shape.settings);

            // internal aliases
            let namespace = settings.namespace;
            let selector = settings.selector;
            let error = settings.error;
            let className = settings.className;

            // define namespaces for modules
            let eventNamespace = '.' + namespace;
            let moduleNamespace = 'module-' + namespace;

            // selector cache
            let $module = $(this);
            let $sides = $module.find('>' + selector.sides);
            let $side = $sides.find('>' + selector.side);

            // private variables
            let nextIndex = false;
            let $activeSide;
            let $nextSide;

            // standard module
            let element = this;
            let instance = $module.data(moduleNamespace);
            let module;

            module = {

                initialize: function () {
                    module.verbose('Initializing module for', element);
                    module.set.defaultSide();
                    module.instantiate();
                },

                instantiate: function () {
                    module.verbose('Storing instance of module', module);
                    instance = module;
                    $module
                        .data(moduleNamespace, instance);
                },

                destroy: function () {
                    module.verbose('Destroying previous module for', element);
                    $module
                        .removeData(moduleNamespace)
                        .off(eventNamespace);
                },

                refresh: function () {
                    module.verbose('Refreshing selector cache for', element);
                    $module = $(element);
                    $sides = $(this).find(selector.sides);
                    $side = $(this).find(selector.side);
                },

                repaint: function () {
                    module.verbose('Forcing repaint event');
                    let shape = $sides[0] || document.createElement('div');
                    let fakeAssignment = shape.offsetWidth;
                },

                animate: function (propertyObject, callback) {
                    module.verbose('Animating box with properties', propertyObject);
                    callback = callback || function (event) {
                        module.verbose('Executing animation callback');
                        if (event !== undefined) {
                            event.stopPropagation();
                        }
                        module.reset();
                        module.set.active();
                    };
                    settings.onBeforeChange.call($nextSide[0]);
                    module.verbose('Starting CSS animation');
                    $module
                        .addClass(className.animating);
                    $sides
                        .css(propertyObject)
                        .one('transitionend', callback);
                    module.set.duration(settings.duration);
                    requestAnimationFrame(function () {
                        $module
                            .addClass(className.animating);
                        $activeSide
                            .addClass(className.hidden);
                    });
                },

                queue: function (method) {
                    module.debug('Queueing animation of', method);
                    $sides
                        .one('transitionend', function () {
                            module.debug('Executing queued animation');
                            setTimeout(function () {
                                $module.shape(method);
                            }, 0);
                        });
                },

                reset: function () {
                    module.verbose('Animating states reset');
                    $module
                        .removeClass(className.animating)
                        .attr('style', '')
                        .removeAttr('style');
                    // removeAttr style does not consistently work in safari
                    $sides
                        .attr('style', '')
                        .removeAttr('style');
                    $side
                        .attr('style', '')
                        .removeAttr('style')
                        .removeClass(className.hidden);
                    $nextSide
                        .removeClass(className.animating)
                        .attr('style', '')
                        .removeAttr('style');
                },

                is: {
                    complete: function () {
                        return $side.filter('.' + className.active)[0] === $nextSide[0];
                    },
                    animating: function () {
                        return $module.hasClass(className.animating);
                    },
                    hidden: function () {
                        return $module.closest(':hidden').length > 0;
                    },
                },

                set: {

                    defaultSide: function () {
                        $activeSide = $side.filter('.' + className.active);
                        $nextSide = $activeSide.next(selector.side).length > 0
                            ? $activeSide.next(selector.side)
                            : $side.first();
                        nextIndex = false;
                        module.verbose('Active side set to', $activeSide);
                        module.verbose('Next side set to', $nextSide);
                    },

                    duration: function (duration) {
                        duration = duration || settings.duration;
                        duration = typeof duration === 'number'
                            ? duration + 'ms'
                            : duration;
                        module.verbose('Setting animation duration', duration);
                        if (settings.duration || settings.duration === 0) {
                            $sides.add($side)
                                .css({
                                    'transition-duration': duration,
                                });
                        }
                    },

                    currentStageSize: function () {
                        let $activeSide = $side.filter('.' + className.active);
                        let width = $activeSide.outerWidth(true);
                        let height = $activeSide.outerHeight(true);
                        $module
                            .css({
                                width: width,
                                height: height,
                            });
                    },

                    stageSize: function () {
                        let $clone = $module.clone().addClass(className.loading);
                        let $side = $clone.find('>' + selector.sides + '>' + selector.side);
                        let $activeSide = $side.filter('.' + className.active);
                        let $nextSide = nextIndex
                            ? $side.eq(nextIndex)
                            : ($activeSide.next(selector.side).length > 0
                                ? $activeSide.next(selector.side)
                                : $side.first());
                        let newWidth = settings.width === 'next'
                            ? $nextSide.outerWidth(true)
                            : (settings.width === 'initial'
                                ? $module.width()
                                : settings.width);
                        let newHeight = settings.height === 'next'
                            ? $nextSide.outerHeight(true)
                            : (settings.height === 'initial'
                                ? $module.height()
                                : settings.height);
                        $activeSide.removeClass(className.active);
                        $nextSide.addClass(className.active);
                        $clone.insertAfter($module);
                        $clone.remove();
                        if (settings.width !== 'auto') {
                            $module.css('width', newWidth + settings.jitter);
                            module.verbose('Specifying width during animation', newWidth);
                        }
                        if (settings.height !== 'auto') {
                            $module.css('height', newHeight + settings.jitter);
                            module.verbose('Specifying height during animation', newHeight);
                        }
                    },

                    nextSide: function (selector) {
                        nextIndex = selector;
                        $nextSide = $side.filter(selector);
                        nextIndex = $side.index($nextSide);
                        if ($nextSide.length === 0) {
                            module.set.defaultSide();
                            module.error(error.side);
                        }
                        module.verbose('Next side manually set to', $nextSide);
                    },

                    active: function () {
                        module.verbose('Setting new side to active', $nextSide);
                        $side
                            .removeClass(className.active);
                        $nextSide
                            .addClass(className.active);
                        settings.onChange.call($nextSide[0]);
                        module.set.defaultSide();
                    },
                },

                flip: {
                    to: function (type, stage) {
                        if (module.is.hidden()) {
                            module.debug('Module not visible', $nextSide);

                            return;
                        }
                        if (module.is.complete() && !module.is.animating() && !settings.allowRepeats) {
                            module.debug('Side already visible', $nextSide);

                            return;
                        }
                        let transform = module.get.transform[type]();
                        if (!module.is.animating()) {
                            module.debug('Flipping ' + type, $nextSide);
                            module.set.stageSize();
                            module.stage[stage]();
                            module.animate(transform);
                        } else {
                            module.queue('flip ' + type);
                        }
                    },

                    up: function () {
                        module.flip.to('up', 'above');
                    },

                    down: function () {
                        module.flip.to('down', 'below');
                    },

                    left: function () {
                        module.flip.to('left', 'left');
                    },

                    right: function () {
                        module.flip.to('right', 'right');
                    },

                    over: function () {
                        module.flip.to('over', 'behind');
                    },

                    back: function () {
                        module.flip.to('back', 'behind');
                    },

                },

                get: {

                    transform: {
                        up: function () {
                            let translateZ = $activeSide.outerHeight(true) / 2;
                            let translateY = $nextSide.outerHeight(true) - translateZ;

                            return {
                                transform: 'translateY(' + translateY + 'px) translateZ(-' + translateZ + 'px) rotateX(-90deg)',
                            };
                        },

                        down: function () {
                            let translate = {
                                z: $activeSide.outerHeight(true) / 2,
                            };

                            return {
                                transform: 'translateY(-' + translate.z + 'px) translateZ(-' + translate.z + 'px) rotateX(90deg)',
                            };
                        },

                        left: function () {
                            let translateZ = $activeSide.outerWidth(true) / 2;
                            let translateX = $nextSide.outerWidth(true) - translateZ;

                            return {
                                transform: 'translateX(' + translateX + 'px) translateZ(-' + translateZ + 'px) rotateY(90deg)',
                            };
                        },

                        right: function () {
                            let translate = {
                                z: $activeSide.outerWidth(true) / 2,
                            };

                            return {
                                transform: 'translateX(-' + translate.z + 'px) translateZ(-' + translate.z + 'px) rotateY(-90deg)',
                            };
                        },

                        over: function () {
                            let translate = {
                                x: -(($activeSide.outerWidth(true) - $nextSide.outerWidth(true)) / 2),
                            };

                            return {
                                transform: 'translateX(' + translate.x + 'px) rotateY(180deg)',
                            };
                        },

                        back: function () {
                            let translate = {
                                x: -(($activeSide.outerWidth(true) - $nextSide.outerWidth(true)) / 2),
                            };

                            return {
                                transform: 'translateX(' + translate.x + 'px) rotateY(-180deg)',
                            };
                        },
                    },

                    nextSide: function () {
                        return $activeSide.next(selector.side).length > 0
                            ? $activeSide.next(selector.side)
                            : $side.first();
                    },

                },

                stage: {

                    above: function () {
                        let box = {
                            origin: ($activeSide.outerHeight(true) - $nextSide.outerHeight(true)) / 2,
                            depth: {
                                active: $nextSide.outerHeight(true) / 2,
                                next: $activeSide.outerHeight(true) / 2,
                            },
                        };
                        module.verbose('Setting the initial animation position as above', $nextSide, box);
                        $activeSide
                            .css({
                                transform: 'rotateX(0deg)',
                            });
                        $nextSide
                            .addClass(className.animating)
                            .css({
                                top: box.origin + 'px',
                                transform: 'rotateX(90deg) translateZ(' + box.depth.next + 'px) translateY(-' + box.depth.active + 'px)',
                            });
                    },

                    below: function () {
                        let box = {
                            origin: ($activeSide.outerHeight(true) - $nextSide.outerHeight(true)) / 2,
                            depth: {
                                active: $nextSide.outerHeight(true) / 2,
                                next: $activeSide.outerHeight(true) / 2,
                            },
                        };
                        module.verbose('Setting the initial animation position as below', $nextSide, box);
                        $activeSide
                            .css({
                                transform: 'rotateX(0deg)',
                            });
                        $nextSide
                            .addClass(className.animating)
                            .css({
                                top: box.origin + 'px',
                                transform: 'rotateX(-90deg) translateZ(' + box.depth.next + 'px) translateY(' + box.depth.active + 'px)',
                            });
                    },

                    left: function () {
                        let height = {
                            active: $activeSide.outerWidth(true),
                            next: $nextSide.outerWidth(true),
                        };
                        let box = {
                            origin: (height.active - height.next) / 2,
                            depth: {
                                active: height.next / 2,
                                next: height.active / 2,
                            },
                        };
                        module.verbose('Setting the initial animation position as left', $nextSide, box);
                        $activeSide
                            .css({
                                transform: 'rotateY(0deg)',
                            });
                        $nextSide
                            .addClass(className.animating)
                            .css({
                                left: box.origin + 'px',
                                transform: 'rotateY(-90deg) translateZ(' + box.depth.next + 'px) translateX(-' + box.depth.active + 'px)',
                            });
                    },

                    right: function () {
                        let height = {
                            active: $activeSide.outerWidth(true),
                            next: $nextSide.outerWidth(true),
                        };
                        let box = {
                            origin: (height.active - height.next) / 2,
                            depth: {
                                active: height.next / 2,
                                next: height.active / 2,
                            },
                        };
                        module.verbose('Setting the initial animation position as right', $nextSide, box);
                        $activeSide
                            .css({
                                transform: 'rotateY(0deg)',
                            });
                        $nextSide
                            .addClass(className.animating)
                            .css({
                                left: box.origin + 'px',
                                transform: 'rotateY(90deg) translateZ(' + box.depth.next + 'px) translateX(' + box.depth.active + 'px)',
                            });
                    },

                    behind: function () {
                        let height = {
                            active: $activeSide.outerWidth(true),
                            next: $nextSide.outerWidth(true),
                        };
                        let box = {
                            origin: (height.active - height.next) / 2,
                            depth: {
                                active: height.next / 2,
                                next: height.active / 2,
                            },
                        };
                        module.verbose('Setting the initial animation position as behind', $nextSide, box);
                        $activeSide
                            .css({
                                transform: 'rotateY(0deg)',
                            });
                        $nextSide
                            .addClass(className.animating)
                            .css({
                                left: box.origin + 'px',
                                transform: 'rotateY(-180deg)',
                            });
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
                let $inputs = $module.find('input');
                if ($inputs.length > 0) {
                    $inputs.trigger('blur');
                    setTimeout(function () {
                        module.invoke(query);
                    }, 150);
                } else {
                    module.invoke(query);
                }
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

    $.fn.shape.settings = {

        // module info
        name: 'Shape',

        // hide all debug content
        silent: false,

        // debug content outputted to console
        debug: false,

        // verbose debug output
        verbose: false,

        // fudge factor in pixels when swapping from 2d to 3d (can be useful to correct rounding errors)
        jitter: 0,

        // performance data output
        performance: true,

        // event namespace
        namespace: 'shape',

        // width during animation, can be set to 'auto', initial', 'next' or pixel amount
        width: 'initial',

        // height during animation, can be set to 'auto', 'initial', 'next' or pixel amount
        height: 'initial',

        // callback occurs on side change
        onBeforeChange: function () {},
        onChange: function () {},

        // allow animation to the same side
        allowRepeats: false,

        // animation duration
        duration: false,

        // possible errors
        error: {
            side: 'You tried to switch to a side that does not exist.',
            method: 'The method you called is not defined',
        },

        // classnames used
        className: {
            animating: 'animating',
            hidden: 'hidden',
            loading: 'loading',
            active: 'active',
        },

        // selectors used
        selector: {
            sides: '.sides',
            side: '.side',
        },

    };
})(jQuery, window, document);
