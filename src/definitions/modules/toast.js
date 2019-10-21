/*!
 * # Fomantic-UI - Toast
 * http://github.com/fomantic/Fomantic-UI/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */

;(function ($, window, document, undefined) {

'use strict';

$.isFunction = $.isFunction || function(obj) {
  return typeof obj === "function" && typeof obj.nodeType !== "number";
};

window = (typeof window != 'undefined' && window.Math == Math)
  ? window
  : (typeof self != 'undefined' && self.Math == Math)
    ? self
    : Function('return this')()
;

$.fn.toast = function(parameters) {
  var
    $allModules    = $(this),
    moduleSelector = $allModules.selector || '',

    time           = new Date().getTime(),
    performance    = [],

    query          = arguments[0],
    methodInvoked  = (typeof query == 'string'),
    queryArguments = [].slice.call(arguments, 1),
    returnedValue
  ;
  $allModules
    .each(function() {
      var
        settings          = ( $.isPlainObject(parameters) )
          ? $.extend(true, {}, $.fn.toast.settings, parameters)
          : $.extend({}, $.fn.toast.settings),

        className       = settings.className,
        selector        = settings.selector,
        error           = settings.error,
        namespace       = settings.namespace,

        eventNamespace  = '.' + namespace,
        moduleNamespace = namespace + '-module',

        $module         = $(this),
        $toastBox       = $('<div/>',{'class':settings.className.box}),
        $toast          = $('<div/>'),
        $progress       = $('<div/>',{'class':settings.className.progress+' '+settings.class}),
        $progressBar    = $('<div/>',{'class':'bar'}),
        $animationObject,

        $close          = $('<i/>',{'class':'close icon'}),
        $context        = (settings.context)
          ? $(settings.context)
          : $('body'),

        element         = this,
        instance        = $module.data(moduleNamespace),

        module
      ;
      module = {

        initialize: function() {
          module.verbose('Initializing element');
          if(typeof settings.showProgress !== 'string' || ['top','bottom'].indexOf(settings.showProgress) === -1 ) {
            settings.showProgress = false;
          }
          if (!module.has.container()) {
            module.create.container();
          }

          module.create.toast();
          if(settings.closeOnClick && !settings.closeIcon && $($toast).find(selector.input).length > 0){
              settings.closeOnClick = false;
          }
          module.bind.events();
          module.show();
        },

        destroy: function() {
          module.debug('Removing toast', $toast);
          $toast.remove();
          $toast = undefined;
          settings.onRemove.call($toast, element);
        },

        show: function(callback) {
          callback = callback || function(){};
          module.debug('Showing toast');
          if(settings.onShow.call($toast, element) === false) {
            module.debug('onShow callback returned false, cancelling toast animation');
            return;
          }
          module.animate.show(callback);
        },

        close: function(callback) {
          callback = callback || function(){};
          module.remove.visible();
          module.unbind.events();
          module.animate.close(callback);

        },

        create: {
          container: function() {
            module.verbose('Creating container');
            $context.append('<div class="ui ' + settings.position + ' ' + className.container + '"></div>');
          },
          toast: function() {
            var $content = $('<div/>').addClass(className.content);
            module.verbose('Creating toast');
            if(settings.closeIcon) {
                $toast.append($close);
                $toast.css('cursor','default');
            }

            var iconClass = typeof settings.showIcon === 'string' ? settings.showIcon : settings.showIcon && settings.icons[settings.class] ? settings.icons[settings.class] : '';
            if (iconClass != '') {
               var $icon = $('<i/>').addClass(iconClass + ' ' + className.icon);

              $toast
                .addClass(className.icon)
                .append($icon)
              ;
            }

            if (settings.title !== '') {
              var 
                $title = $('<div/>')
                  .addClass(className.title)
                  .text(settings.title)
                ;

              $content.append($title);
            }

            $content.append($('<div/>').html(settings.message));

            $toast
              .addClass(settings.class + ' ' + className.toast)
              .append($content)
            ;
            $toast.css('opacity', settings.opacity);
            if(settings.compact || $toast.hasClass('compact')) {
                $toastBox.addClass('compact');
            }
            if($toast.hasClass('toast') && !$toast.hasClass('inverted')){
              $progress.addClass('inverted');
            } else {
              $progress.removeClass('inverted');
            }
            if(settings.displayTime === 'auto'){
              settings.displayTime = Math.max(settings.minDisplayTime, $toast.text().split(" ").length / settings.wordsPerMinute * 60000);
            }
            $animationObject = $toast;
            $toast = $toastBox.append($toast);
            if(settings.displayTime > 0) {
              if (!!settings.showProgress) {
                $progress
                    .addClass(settings.showProgress)
                    .append($progressBar);
                if ($progress.hasClass('top')) {
                  $toast.prepend($progress);
                } else {
                  $toast.append($progress);
                }
                $animationObject = $progressBar;
                $animationObject.addClass(settings.progressUp ? 'up' : 'down');
              } else {
                $animationObject.addClass('wait');
              }
              $animationObject.css('animation-duration', settings.displayTime / 1000 + 's');
              if (settings.pauseOnHover) {
                $animationObject.addClass('pausable');
              }
              $animationObject.addClass('progressing');
            } else {
               $animationObject = undefined;
            }
            if (settings.newestOnTop) {
              $toast.prependTo(module.get.container());
            }
            else {
              $toast.appendTo(module.get.container());
            }
          }
        },

        bind: {
          events: function() {
            module.debug('Binding events to toast');
            if(settings.closeOnClick || settings.closeIcon) {
              (settings.closeIcon ? $close : $toast)
                  .on('click' + eventNamespace, module.event.click)
              ;
            }
            if($animationObject) {
              $animationObject.on('animationend' + eventNamespace, module.close);
            }
          }
        },

        unbind: {
          events: function() {
            module.debug('Unbinding events to toast');
            if(settings.closeOnClick || settings.closeIcon) {
              (settings.closeIcon ? $close : $toast)
                  .off('click' + eventNamespace)
              ;
            }
            if($animationObject) {
              $animationObject.off('animationend' + eventNamespace);
            }
          }
        },

        animate: {
          show: function(callback) {
            callback = $.isFunction(callback) ? callback : function(){};
            if(settings.transition && module.can.useElement('transition') && $module.transition('is supported')) {
              module.set.visible();
              $toast
                .transition({
                  animation  : settings.transition.showMethod + ' in',
                  queue      : false,
                  debug      : settings.debug,
                  verbose    : settings.verbose,
                  duration   : settings.transition.showDuration,
                  onComplete : function() {
                    callback.call($toast, element);
                    settings.onVisible.call($toast, element);
                  }
                })
              ;
            }
          },
          close: function(callback) {
            callback = $.isFunction(callback) ? callback : function(){};
            module.debug('Closing toast');
            if(settings.onHide.call($toast, element) === false) {
              module.debug('onHide callback returned false, cancelling toast animation');
              return;
            }
            if(settings.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
              $toast
                .transition({
                  animation  : settings.transition.hideMethod + ' out',
                  queue      : false,
                  duration   : settings.transition.hideDuration,
                  debug      : settings.debug,
                  verbose    : settings.verbose,
                  interval   : 50,

                  onBeforeHide: function(callback){
                      callback = $.isFunction(callback)?callback : function(){};
                      if(settings.transition.closeEasing !== ''){
                          $toast.css('opacity',0);
                          $toast.wrap('<div/>').parent().slideUp(500,settings.transition.closeEasing,function(){
                              $toast.parent().remove();
                              callback.call($toast);
                          });
                      } else {
                        callback.call($toast);
                      }
                  },
                  onComplete : function() {
                    module.destroy();
                    callback.call($toast, element);
                    settings.onHidden.call($toast, element);
                  }
                })
              ;
            }
            else {
              module.error(error.noTransition);
            }
          }
        },

        has: {
          container: function() {
            module.verbose('Determining if there is already a container');
            return ($context.find(module.helpers.toClass(settings.position) + selector.container).length > 0);
          }
        },

        get: {
          container: function() {
            return ($context.find(module.helpers.toClass(settings.position) + selector.container)[0]);
          }
        },

        set: {
          visible: function() {
            $toast.addClass(className.visible);
          }
        },

        remove: {
          visible: function() {
            $toast.removeClass(className.visible);
          }
        },

        event: {
          click: function() {
            settings.onClick.call($toast, element);
            module.close();
          }
        },

        helpers: {
          toClass: function(selector) {
            var
              classes = selector.split(' '),
              result = ''
            ;

            classes.forEach(function (element) {
              result += '.' + element;
            });

            return result;
          }
        },

        can: {
          useElement: function(element){
            if ($.fn[element] !== undefined) {
              return true;
            }
            module.error(error.noElement.replace('{element}',element));
            return false;
          }
        },

        setting: function(name, value) {
          module.debug('Changing setting', name, value);
          if( $.isPlainObject(name) ) {
            $.extend(true, settings, name);
          }
          else if(value !== undefined) {
            if($.isPlainObject(settings[name])) {
              $.extend(true, settings[name], value);
            }
            else {
              settings[name] = value;
            }
          }
          else {
            return settings[name];
          }
        },
        internal: function(name, value) {
          if( $.isPlainObject(name) ) {
            $.extend(true, module, name);
          }
          else if(value !== undefined) {
            module[name] = value;
          }
          else {
            return module[name];
          }
        },
        debug: function() {
          if(!settings.silent && settings.debug) {
            if(settings.performance) {
              module.performance.log(arguments);
            }
            else {
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function() {
          if(!settings.silent && settings.verbose && settings.debug) {
            if(settings.performance) {
              module.performance.log(arguments);
            }
            else {
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function() {
          if(!settings.silent) {
            module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
            module.error.apply(console, arguments);
          }
        },
        performance: {
          log: function(message) {
            var
              currentTime,
              executionTime,
              previousTime
            ;
            if(settings.performance) {
              currentTime   = new Date().getTime();
              previousTime  = time || currentTime;
              executionTime = currentTime - previousTime;
              time          = currentTime;
              performance.push({
                'Name'           : message[0],
                'Arguments'      : [].slice.call(message, 1) || '',
                'Element'        : element,
                'Execution Time' : executionTime
              });
            }
            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
          },
          display: function() {
            var
              title = settings.name + ':',
              totalTime = 0
            ;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function(index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';
            if(moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }
            if( (console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);
              if(console.table) {
                console.table(performance);
              }
              else {
                $.each(performance, function(index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time']+'ms');
                });
              }
              console.groupEnd();
            }
            performance = [];
          }
        },
        invoke: function(query, passedArguments, context) {
          var
            object = instance,
            maxDepth,
            found,
            response
          ;
          passedArguments = passedArguments || queryArguments;
          context         = element         || context;
          if(typeof query == 'string' && object !== undefined) {
            query    = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function(depth, value) {
              var camelCaseValue = (depth != maxDepth)
                ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1)
                : query
              ;
              if( $.isPlainObject( object[camelCaseValue] ) && (depth != maxDepth) ) {
                object = object[camelCaseValue];
              }
              else if( object[camelCaseValue] !== undefined ) {
                found = object[camelCaseValue];
                return false;
              }
              else if( $.isPlainObject( object[value] ) && (depth != maxDepth) ) {
                object = object[value];
              }
              else if( object[value] !== undefined ) {
                found = object[value];
                return false;
              }
              else {
                module.error(error.method, query);
                return false;
              }
            });
          }
          if ( $.isFunction( found ) ) {
            response = found.apply(context, passedArguments);
          }
          else if(found !== undefined) {
            response = found;
          }
          if(Array.isArray(returnedValue)) {
            returnedValue.push(response);
          }
          else if(returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          }
          else if(response !== undefined) {
            returnedValue = response;
          }
          return found;
        }
      };

      if(methodInvoked) {
        if(instance === undefined) {
          module.initialize();
        }
        module.invoke(query);
      }
      else {
        if(instance !== undefined) {
          instance.invoke('destroy');
        }
        module.initialize();
      }
    })
  ;

  return (returnedValue !== undefined)
    ? returnedValue
    : this
  ;
};

$.fn.toast.settings = {

  name           : 'Toast',
  namespace      : 'toast',

  silent         : false,
  debug          : false,
  verbose        : false,
  performance    : true,

  context        : 'body',

  position       : 'top right',
  class          : 'neutral',

  title          : '',
  message        : '',
  displayTime    : 3000, // set to zero to require manually dismissal, otherwise hides on its own
  minDisplayTime : 1000, // minimum displaytime in case displayTime is set to 'auto'
  wordsPerMinute : 120,
  showIcon       : true,
  newestOnTop    : false,
  showProgress   : false,
  pauseOnHover   : true,
  progressUp     : false, //if true, the bar will start at 0% and increase to 100%
  opacity        : 1,
  compact        : true,
  closeIcon      : false,
  closeOnClick   : true,

  // transition settings
  transition     : {
    showMethod   : 'scale',
    showDuration : 500,
    hideMethod   : 'scale',
    hideDuration : 500,
    closeEasing  : 'easeOutCubic'  //Set to empty string to stack the closed toast area immediately (old behaviour)
  },

  error: {
    method       : 'The method you called is not defined.',
    noElement    : 'This module requires ui {element}'
  },

  className      : {
    container    : 'toast-container',
    box          : 'toast-box',
    progress     : 'ui attached active progress',
    toast        : 'ui floating toast',
    icon         : 'centered icon',
    visible      : 'visible',
    content      : 'content',
    title        : 'ui header'
  },

  icons          : {
    info         : 'info',
    success      : 'checkmark',
    warning      : 'warning',
    error        : 'times'
  },

  selector       : {
    container    : '.toast-container',
    box          : '.toast-box',
    toast        : '.ui.toast',
    input        : 'input:not([type="hidden"]), textarea, select, button, .ui.button, ui.dropdown'
  },

  // callbacks
  onShow         : function(){},
  onVisible      : function(){},
  onClick        : function(){},
  onHide         : function(){},
  onHidden       : function(){},
  onRemove       : function(){},
};

$.extend( $.easing, {
    easeOutBounce: function (x, t, b, c, d) {
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
        } else {
            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
        }
    },
    easeOutCubic: function (t) {
      return (--t)*t*t+1;
    }
});


})( jQuery, window, document );
