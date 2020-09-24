/*! jQuery UI - v1.12.1 - 2016-09-14
 * http://jqueryui.com
 * Copyright jQuery Foundation and other contributors; Licensed MIT */

(function(factory) {
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(["jquery"], factory);
  } else {
    // Browser globals
    factory(jQuery);
  }
})(function($) {
  $.ui = $.ui || {};

  var version = ($.ui.version = "1.12.1");

  /*!
   * jQuery UI Widget 1.12.1
   * http://jqueryui.com
   *
   */

  var widgetUuid = 0;
  var widgetSlice = Array.prototype.slice;

  $.cleanData = (function(orig) {
    return function(elems) {
      var events, elem, i;
      for (i = 0; (elem = elems[i]) != null; i++) {
        try {
          // Only trigger remove when necessary to save time
          events = $._data(elem, "events");
          if (events && events.remove) {
            $(elem).triggerHandler("remove");
          }

          // Http://bugs.jquery.com/ticket/8235
        } catch (e) {}
      }
      orig(elems);
    };
  })($.cleanData);

  $.widget = function(name, base, prototype) {
    var existingConstructor, constructor, basePrototype;

    // ProxiedPrototype allows the provided prototype to remain unmodified
    // so that it can be used as a mixin for multiple widgets (#8876)
    var proxiedPrototype = {};

    var namespace = name.split(".")[0];
    name = name.split(".")[1];
    var fullName = namespace + "-" + name;

    if (!prototype) {
      prototype = base;
      base = $.Widget;
    }

    if ($.isArray(prototype)) {
      prototype = $.extend.apply(null, [{}].concat(prototype));
    }

    // Create selector for plugin
    $.expr[":"][fullName.toLowerCase()] = function(elem) {
      return !!$.data(elem, fullName);
    };

    $[namespace] = $[namespace] || {};
    existingConstructor = $[namespace][name];
    constructor = $[namespace][name] = function(options, element) {
      // Allow instantiation without "new" keyword
      if (!this._createWidget) {
        return new constructor(options, element);
      }

      // Allow instantiation without initializing for simple inheritance
      // must use "new" keyword (the code above always passes args)
      if (arguments.length) {
        this._createWidget(options, element);
      }
    };

    // Extend with the existing constructor to carry over any static properties
    $.extend(constructor, existingConstructor, {
      version: prototype.version,

      _proto: $.extend({}, prototype),

      _childConstructors: [],
    });

    basePrototype = new base();

    basePrototype.options = $.widget.extend({}, basePrototype.options);
    $.each(prototype, function(prop, value) {
      if (!$.isFunction(value)) {
        proxiedPrototype[prop] = value;
        return;
      }
      proxiedPrototype[prop] = (function() {
        function _super() {
          return base.prototype[prop].apply(this, arguments);
        }

        function _superApply(args) {
          return base.prototype[prop].apply(this, args);
        }

        return function() {
          var __super = this._super;
          var __superApply = this._superApply;
          var returnValue;

          this._super = _super;
          this._superApply = _superApply;

          returnValue = value.apply(this, arguments);

          this._super = __super;
          this._superApply = __superApply;

          return returnValue;
        };
      })();
    });
    constructor.prototype = $.widget.extend(
      basePrototype,
      {
        widgetEventPrefix: existingConstructor
          ? basePrototype.widgetEventPrefix || name
          : name,
      },
      proxiedPrototype,
      {
        constructor: constructor,
        namespace: namespace,
        widgetName: name,
        widgetFullName: fullName,
      }
    );
    if (existingConstructor) {
      $.each(existingConstructor._childConstructors, function(i, child) {
        var childPrototype = child.prototype;
        $.widget(
          childPrototype.namespace + "." + childPrototype.widgetName,
          constructor,
          child._proto
        );
      });

      delete existingConstructor._childConstructors;
    } else {
      base._childConstructors.push(constructor);
    }

    $.widget.bridge(name, constructor);

    return constructor;
  };

  $.widget.extend = function(target) {
    var input = widgetSlice.call(arguments, 1);
    var inputIndex = 0;
    var inputLength = input.length;
    var key;
    var value;

    for (; inputIndex < inputLength; inputIndex++) {
      for (key in input[inputIndex]) {
        value = input[inputIndex][key];
        if (input[inputIndex].hasOwnProperty(key) && value !== undefined) {
          // Clone objects
          if ($.isPlainObject(value)) {
            target[key] = $.isPlainObject(target[key])
              ? $.widget.extend({}, target[key], value)
              : // Don't extend strings, arrays, etc. with objects
                $.widget.extend({}, value);

            // Copy everything else by reference
          } else {
            target[key] = value;
          }
        }
      }
    }
    return target;
  };

  $.widget.bridge = function(name, object) {
    var fullName = object.prototype.widgetFullName || name;
    $.fn[name] = function(options) {
      var isMethodCall = typeof options === "string";
      var args = widgetSlice.call(arguments, 1);
      var returnValue = this;

      if (isMethodCall) {
        if (!this.length && options === "instance") {
          returnValue = undefined;
        } else {
          this.each(function() {
            var methodValue;
            var instance = $.data(this, fullName);

            if (options === "instance") {
              returnValue = instance;
              return false;
            }

            if (!instance) {
              return $.error(
                "cannot call methods on " +
                  name +
                  " prior to initialization; " +
                  "attempted to call method '" +
                  options +
                  "'"
              );
            }

            if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
              return $.error(
                "no such method '" +
                  options +
                  "' for " +
                  name +
                  " widget instance"
              );
            }

            methodValue = instance[options].apply(instance, args);

            if (methodValue !== instance && methodValue !== undefined) {
              returnValue =
                methodValue && methodValue.jquery
                  ? returnValue.pushStack(methodValue.get())
                  : methodValue;
              return false;
            }
          });
        }
      } else {
        // Allow multiple hashes to be passed on init
        if (args.length) {
          options = $.widget.extend.apply(null, [options].concat(args));
        }

        this.each(function() {
          var instance = $.data(this, fullName);
          if (instance) {
            instance.option(options || {});
            if (instance._init) {
              instance._init();
            }
          } else {
            $.data(this, fullName, new object(options, this));
          }
        });
      }

      return returnValue;
    };
  };

  $.Widget = function(/* options, element */) {};
  $.Widget._childConstructors = [];

  $.Widget.prototype = {
    widgetName: "widget",
    widgetEventPrefix: "",
    defaultElement: "<div>",

    options: {
      classes: {},
      disabled: false,

      // Callbacks
      create: null,
    },

    _createWidget: function(options, element) {
      element = $(element || this.defaultElement || this)[0];
      this.element = $(element);
      this.uuid = widgetUuid++;
      this.eventNamespace = "." + this.widgetName + this.uuid;

      this.bindings = $();
      this.hoverable = $();
      this.focusable = $();
      this.classesElementLookup = {};

      if (element !== this) {
        $.data(element, this.widgetFullName, this);
        this._on(true, this.element, {
          remove: function(event) {
            if (event.target === element) {
              this.destroy();
            }
          },
        });
        this.document = $(
          element.style
            ? // Element within the document
              element.ownerDocument
            : // Element is window or document
              element.document || element
        );
        this.window = $(
          this.document[0].defaultView || this.document[0].parentWindow
        );
      }

      this.options = $.widget.extend(
        {},
        this.options,
        this._getCreateOptions(),
        options
      );

      this._create();

      if (this.options.disabled) {
        this._setOptionDisabled(this.options.disabled);
      }

      this._trigger("create", null, this._getCreateEventData());
      this._init();
    },

    _getCreateOptions: function() {
      return {};
    },

    _getCreateEventData: $.noop,
    _create: $.noop,
    _init: $.noop,

    destroy: function() {
      var that = this;

      this._destroy();
      $.each(this.classesElementLookup, function(key, value) {
        that._removeClass(value, key);
      });
      this.element.off(this.eventNamespace).removeData(this.widgetFullName);
      this.widget()
        .off(this.eventNamespace)
        .removeAttr("aria-disabled");

      // Clean up events and states
      this.bindings.off(this.eventNamespace);
    },

    _destroy: $.noop,

    widget: function() {
      return this.element;
    },

    option: function(key, value) {
      var options = key;
      var parts;
      var curOption;
      var i;

      if (arguments.length === 0) {
        // Don't return a reference to the internal hash
        return $.widget.extend({}, this.options);
      }

      if (typeof key === "string") {
        options = {};
        parts = key.split(".");
        key = parts.shift();
        if (parts.length) {
          curOption = options[key] = $.widget.extend({}, this.options[key]);
          for (i = 0; i < parts.length - 1; i++) {
            curOption[parts[i]] = curOption[parts[i]] || {};
            curOption = curOption[parts[i]];
          }
          key = parts.pop();
          if (arguments.length === 1) {
            return curOption[key] === undefined ? null : curOption[key];
          }
          curOption[key] = value;
        } else {
          if (arguments.length === 1) {
            return this.options[key] === undefined ? null : this.options[key];
          }
          options[key] = value;
        }
      }

      this._setOptions(options);

      return this;
    },

    _setOptions: function(options) {
      var key;

      for (key in options) {
        this._setOption(key, options[key]);
      }

      return this;
    },

    _setOption: function(key, value) {
      if (key === "classes") {
        this._setOptionClasses(value);
      }

      this.options[key] = value;

      if (key === "disabled") {
        this._setOptionDisabled(value);
      }

      return this;
    },

    _setOptionClasses: function(value) {
      var classKey, elements, currentElements;

      for (classKey in value) {
        currentElements = this.classesElementLookup[classKey];
        if (
          value[classKey] === this.options.classes[classKey] ||
          !currentElements ||
          !currentElements.length
        ) {
          continue;
        }
        elements = $(currentElements.get());
        this._removeClass(currentElements, classKey);
        elements.addClass(
          this._classes({
            element: elements,
            keys: classKey,
            classes: value,
            add: true,
          })
        );
      }
    },

    _setOptionDisabled: function(value) {
      this._toggleClass(
        this.widget(),
        this.widgetFullName + "-disabled",
        null,
        !!value
      );
      if (value) {
        this._removeClass(this.hoverable, null, "ui-state-hover");
        this._removeClass(this.focusable, null, "ui-state-focus");
      }
    },

    enable: function() {
      return this._setOptions({ disabled: false });
    },

    disable: function() {
      return this._setOptions({ disabled: true });
    },

    _classes: function(options) {
      var full = [];
      var that = this;

      options = $.extend(
        {
          element: this.element,
          classes: this.options.classes || {},
        },
        options
      );

      function processClassString(classes, checkOption) {
        var current, i;
        for (i = 0; i < classes.length; i++) {
          current = that.classesElementLookup[classes[i]] || $();
          if (options.add) {
            current = $($.unique(current.get().concat(options.element.get())));
          } else {
            current = $(current.not(options.element).get());
          }
          that.classesElementLookup[classes[i]] = current;
          full.push(classes[i]);
          if (checkOption && options.classes[classes[i]]) {
            full.push(options.classes[classes[i]]);
          }
        }
      }

      this._on(options.element, {
        remove: "_untrackClassesElement",
      });

      if (options.keys) {
        processClassString(options.keys.match(/\S+/g) || [], true);
      }
      if (options.extra) {
        processClassString(options.extra.match(/\S+/g) || []);
      }

      return full.join(" ");
    },

    _untrackClassesElement: function(event) {
      var that = this;
      $.each(that.classesElementLookup, function(key, value) {
        if ($.inArray(event.target, value) !== -1) {
          that.classesElementLookup[key] = $(value.not(event.target).get());
        }
      });
    },

    _removeClass: function(element, keys, extra) {
      return this._toggleClass(element, keys, extra, false);
    },

    _addClass: function(element, keys, extra) {
      return this._toggleClass(element, keys, extra, true);
    },

    _toggleClass: function(element, keys, extra, add) {
      add = typeof add === "boolean" ? add : extra;
      var shift = typeof element === "string" || element === null,
        options = {
          extra: shift ? keys : extra,
          keys: shift ? element : keys,
          element: shift ? this.element : element,
          add: add,
        };
      options.element.toggleClass(this._classes(options), add);
      return this;
    },

    _on: function(suppressDisabledCheck, element, handlers) {
      var delegateElement;
      var instance = this;

      // No suppressDisabledCheck flag, shuffle arguments
      if (typeof suppressDisabledCheck !== "boolean") {
        handlers = element;
        element = suppressDisabledCheck;
        suppressDisabledCheck = false;
      }

      // No element argument, shuffle and use this.element
      if (!handlers) {
        handlers = element;
        element = this.element;
        delegateElement = this.widget();
      } else {
        element = delegateElement = $(element);
        this.bindings = this.bindings.add(element);
      }

      $.each(handlers, function(event, handler) {
        function handlerProxy() {
          if (
            !suppressDisabledCheck &&
            (instance.options.disabled === true ||
              $(this).hasClass("ui-state-disabled"))
          ) {
            return;
          }
          return (typeof handler === "string"
            ? instance[handler]
            : handler
          ).apply(instance, arguments);
        }
        if (typeof handler !== "string") {
          handlerProxy.guid = handler.guid =
            handler.guid || handlerProxy.guid || $.guid++;
        }

        var match = event.match(/^([\w:-]*)\s*(.*)$/);
        var eventName = match[1] + instance.eventNamespace;
        var selector = match[2];

        if (selector) {
          delegateElement.on(eventName, selector, handlerProxy);
        } else {
          element.on(eventName, handlerProxy);
        }
      });
    },

    _off: function(element, eventName) {
      eventName =
        (eventName || "").split(" ").join(this.eventNamespace + " ") +
        this.eventNamespace;
      element.off(eventName).off(eventName);
      this.bindings = $(this.bindings.not(element).get());
      this.focusable = $(this.focusable.not(element).get());
      this.hoverable = $(this.hoverable.not(element).get());
    },

    _delay: function(handler, delay) {
      function handlerProxy() {
        return (typeof handler === "string"
          ? instance[handler]
          : handler
        ).apply(instance, arguments);
      }
      var instance = this;
      return setTimeout(handlerProxy, delay || 0);
    },

    _hoverable: function(element) {
      this.hoverable = this.hoverable.add(element);
      this._on(element, {
        mouseenter: function(event) {
          this._addClass($(event.currentTarget), null, "ui-state-hover");
        },
        mouseleave: function(event) {
          this._removeClass($(event.currentTarget), null, "ui-state-hover");
        },
      });
    },

    _focusable: function(element) {
      this.focusable = this.focusable.add(element);
      this._on(element, {
        focusin: function(event) {
          this._addClass($(event.currentTarget), null, "ui-state-focus");
        },
        focusout: function(event) {
          this._removeClass($(event.currentTarget), null, "ui-state-focus");
        },
      });
    },

    _trigger: function(type, event, data) {
      var prop, orig;
      var callback = this.options[type];

      data = data || {};
      event = $.Event(event);
      event.type = (type === this.widgetEventPrefix
        ? type
        : this.widgetEventPrefix + type
      ).toLowerCase();
      event.target = this.element[0];
      orig = event.originalEvent;
      if (orig) {
        for (prop in orig) {
          if (!(prop in event)) {
            event[prop] = orig[prop];
          }
        }
      }

      this.element.trigger(event, data);
      return !(
        ($.isFunction(callback) &&
          callback.apply(this.element[0], [event].concat(data)) === false) ||
        event.isDefaultPrevented()
      );
    },
  };

  $.each({ show: "fadeIn", hide: "fadeOut" }, function(method, defaultEffect) {
    $.Widget.prototype["_" + method] = function(element, options, callback) {
      if (typeof options === "string") {
        options = { effect: options };
      }

      var hasOptions;
      var effectName = !options
        ? method
        : options === true || typeof options === "number"
        ? defaultEffect
        : options.effect || defaultEffect;

      options = options || {};
      if (typeof options === "number") {
        options = { duration: options };
      }

      hasOptions = !$.isEmptyObject(options);
      options.complete = callback;

      if (options.delay) {
        element.delay(options.delay);
      }

      if (hasOptions && $.effects && $.effects.effect[effectName]) {
        element[method](options);
      } else if (effectName !== method && element[effectName]) {
        element[effectName](options.duration, options.easing, callback);
      } else {
        element.queue(function(next) {
          $(this)[method]();
          if (callback) {
            callback.call(element[0]);
          }
          next();
        });
      }
    };
  });

  var widget = $.widget;

  /*!
   * jQuery UI Position 1.12.1
   * http://jqueryui.com
   */

  (function() {
    var cachedScrollbarWidth,
      max = Math.max,
      abs = Math.abs,
      rhorizontal = /left|center|right/,
      rvertical = /top|center|bottom/,
      roffset = /[\+\-]\d+(\.[\d]+)?%?/,
      rposition = /^\w+/,
      rpercent = /%$/,
      _position = $.fn.position;

    function getOffsets(offsets, width, height) {
      return [
        parseFloat(offsets[0]) * (rpercent.test(offsets[0]) ? width / 100 : 1),
        parseFloat(offsets[1]) * (rpercent.test(offsets[1]) ? height / 100 : 1),
      ];
    }

    function parseCss(element, property) {
      return parseInt($.css(element, property), 10) || 0;
    }

    function getDimensions(elem) {
      var raw = elem[0];
      if (raw.nodeType === 9) {
        return {
          width: elem.width(),
          height: elem.height(),
          offset: { top: 0, left: 0 },
        };
      }
      if ($.isWindow(raw)) {
        return {
          width: elem.width(),
          height: elem.height(),
          offset: { top: elem.scrollTop(), left: elem.scrollLeft() },
        };
      }
      if (raw.preventDefault) {
        return {
          width: 0,
          height: 0,
          offset: { top: raw.pageY, left: raw.pageX },
        };
      }
      return {
        width: elem.outerWidth(),
        height: elem.outerHeight(),
        offset: elem.offset(),
      };
    }

    $.position = {
      scrollbarWidth: function() {
        if (cachedScrollbarWidth !== undefined) {
          return cachedScrollbarWidth;
        }
        var w1,
          w2,
          div = $(
            "<div " +
              "style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'>" +
              "<div style='height:100px;width:auto;'></div></div>"
          ),
          innerDiv = div.children()[0];

        $("body").append(div);
        w1 = innerDiv.offsetWidth;
        div.css("overflow", "scroll");

        w2 = innerDiv.offsetWidth;

        if (w1 === w2) {
          w2 = div[0].clientWidth;
        }

        div.remove();

        return (cachedScrollbarWidth = w1 - w2);
      },
      getScrollInfo: function(within) {
        var overflowX =
            within.isWindow || within.isDocument
              ? ""
              : within.element.css("overflow-x"),
          overflowY =
            within.isWindow || within.isDocument
              ? ""
              : within.element.css("overflow-y"),
          hasOverflowX =
            overflowX === "scroll" ||
            (overflowX === "auto" &&
              within.width < within.element[0].scrollWidth),
          hasOverflowY =
            overflowY === "scroll" ||
            (overflowY === "auto" &&
              within.height < within.element[0].scrollHeight);
        return {
          width: hasOverflowY ? $.position.scrollbarWidth() : 0,
          height: hasOverflowX ? $.position.scrollbarWidth() : 0,
        };
      },
      getWithinInfo: function(element) {
        var withinElement = $(element || window),
          isWindow = $.isWindow(withinElement[0]),
          isDocument = !!withinElement[0] && withinElement[0].nodeType === 9,
          hasOffset = !isWindow && !isDocument;
        return {
          element: withinElement,
          isWindow: isWindow,
          isDocument: isDocument,
          offset: hasOffset ? $(element).offset() : { left: 0, top: 0 },
          scrollLeft: withinElement.scrollLeft(),
          scrollTop: withinElement.scrollTop(),
          width: withinElement.outerWidth(),
          height: withinElement.outerHeight(),
        };
      },
    };

    $.fn.position = function(options) {
      if (!options || !options.of) {
        return _position.apply(this, arguments);
      }
      options = $.extend({}, options);

      var atOffset,
        targetWidth,
        targetHeight,
        targetOffset,
        basePosition,
        dimensions,
        target = $(options.of),
        within = $.position.getWithinInfo(options.within),
        scrollInfo = $.position.getScrollInfo(within),
        collision = (options.collision || "flip").split(" "),
        offsets = {};

      dimensions = getDimensions(target);
      if (target[0].preventDefault) {
        options.at = "left top";
      }
      targetWidth = dimensions.width;
      targetHeight = dimensions.height;
      targetOffset = dimensions.offset;
      basePosition = $.extend({}, targetOffset);
      $.each(["my", "at"], function() {
        var pos = (options[this] || "").split(" "),
          horizontalOffset,
          verticalOffset;

        if (pos.length === 1) {
          pos = rhorizontal.test(pos[0])
            ? pos.concat(["center"])
            : rvertical.test(pos[0])
            ? ["center"].concat(pos)
            : ["center", "center"];
        }
        pos[0] = rhorizontal.test(pos[0]) ? pos[0] : "center";
        pos[1] = rvertical.test(pos[1]) ? pos[1] : "center";

        // Calculate offsets
        horizontalOffset = roffset.exec(pos[0]);
        verticalOffset = roffset.exec(pos[1]);
        offsets[this] = [
          horizontalOffset ? horizontalOffset[0] : 0,
          verticalOffset ? verticalOffset[0] : 0,
        ];
        options[this] = [rposition.exec(pos[0])[0], rposition.exec(pos[1])[0]];
      });
      if (collision.length === 1) {
        collision[1] = collision[0];
      }

      if (options.at[0] === "right") {
        basePosition.left += targetWidth;
      } else if (options.at[0] === "center") {
        basePosition.left += targetWidth / 2;
      }

      if (options.at[1] === "bottom") {
        basePosition.top += targetHeight;
      } else if (options.at[1] === "center") {
        basePosition.top += targetHeight / 2;
      }

      atOffset = getOffsets(offsets.at, targetWidth, targetHeight);
      basePosition.left += atOffset[0];
      basePosition.top += atOffset[1];

      return this.each(function() {
        var collisionPosition,
          using,
          elem = $(this),
          elemWidth = elem.outerWidth(),
          elemHeight = elem.outerHeight(),
          marginLeft = parseCss(this, "marginLeft"),
          marginTop = parseCss(this, "marginTop"),
          collisionWidth =
            elemWidth +
            marginLeft +
            parseCss(this, "marginRight") +
            scrollInfo.width,
          collisionHeight =
            elemHeight +
            marginTop +
            parseCss(this, "marginBottom") +
            scrollInfo.height,
          position = $.extend({}, basePosition),
          myOffset = getOffsets(
            offsets.my,
            elem.outerWidth(),
            elem.outerHeight()
          );

        if (options.my[0] === "right") {
          position.left -= elemWidth;
        } else if (options.my[0] === "center") {
          position.left -= elemWidth / 2;
        }

        if (options.my[1] === "bottom") {
          position.top -= elemHeight;
        } else if (options.my[1] === "center") {
          position.top -= elemHeight / 2;
        }

        position.left += myOffset[0];
        position.top += myOffset[1];

        collisionPosition = {
          marginLeft: marginLeft,
          marginTop: marginTop,
        };

        $.each(["left", "top"], function(i, dir) {
          if ($.ui.position[collision[i]]) {
            $.ui.position[collision[i]][dir](position, {
              targetWidth: targetWidth,
              targetHeight: targetHeight,
              elemWidth: elemWidth,
              elemHeight: elemHeight,
              collisionPosition: collisionPosition,
              collisionWidth: collisionWidth,
              collisionHeight: collisionHeight,
              offset: [atOffset[0] + myOffset[0], atOffset[1] + myOffset[1]],
              my: options.my,
              at: options.at,
              within: within,
              elem: elem,
            });
          }
        });

        if (options.using) {
          using = function(props) {
            var left = targetOffset.left - position.left,
              right = left + targetWidth - elemWidth,
              top = targetOffset.top - position.top,
              bottom = top + targetHeight - elemHeight,
              feedback = {
                target: {
                  element: target,
                  left: targetOffset.left,
                  top: targetOffset.top,
                  width: targetWidth,
                  height: targetHeight,
                },
                element: {
                  element: elem,
                  left: position.left,
                  top: position.top,
                  width: elemWidth,
                  height: elemHeight,
                },
                horizontal: right < 0 ? "left" : left > 0 ? "right" : "center",
                vertical: bottom < 0 ? "top" : top > 0 ? "bottom" : "middle",
              };
            if (targetWidth < elemWidth && abs(left + right) < targetWidth) {
              feedback.horizontal = "center";
            }
            if (targetHeight < elemHeight && abs(top + bottom) < targetHeight) {
              feedback.vertical = "middle";
            }
            if (max(abs(left), abs(right)) > max(abs(top), abs(bottom))) {
              feedback.important = "horizontal";
            } else {
              feedback.important = "vertical";
            }
            options.using.call(this, props, feedback);
          };
        }

        elem.offset($.extend(position, { using: using }));
      });
    };

    $.ui.position = {
      fit: {
        left: function(position, data) {
          var within = data.within,
            withinOffset = within.isWindow
              ? within.scrollLeft
              : within.offset.left,
            outerWidth = within.width,
            collisionPosLeft =
              position.left - data.collisionPosition.marginLeft,
            overLeft = withinOffset - collisionPosLeft,
            overRight =
              collisionPosLeft +
              data.collisionWidth -
              outerWidth -
              withinOffset,
            newOverRight;

          // Element is wider than within
          if (data.collisionWidth > outerWidth) {
            // Element is initially over the left side of within
            if (overLeft > 0 && overRight <= 0) {
              newOverRight =
                position.left +
                overLeft +
                data.collisionWidth -
                outerWidth -
                withinOffset;
              position.left += overLeft - newOverRight;

              // Element is initially over right side of within
            } else if (overRight > 0 && overLeft <= 0) {
              position.left = withinOffset;

              // Element is initially over both left and right sides of within
            } else {
              if (overLeft > overRight) {
                position.left = withinOffset + outerWidth - data.collisionWidth;
              } else {
                position.left = withinOffset;
              }
            }
          } else if (overLeft > 0) {
            position.left += overLeft;
          } else if (overRight > 0) {
            position.left -= overRight;
          } else {
            position.left = max(
              position.left - collisionPosLeft,
              position.left
            );
          }
        },
        top: function(position, data) {
          var within = data.within,
            withinOffset = within.isWindow
              ? within.scrollTop
              : within.offset.top,
            outerHeight = data.within.height,
            collisionPosTop = position.top - data.collisionPosition.marginTop,
            overTop = withinOffset - collisionPosTop,
            overBottom =
              collisionPosTop +
              data.collisionHeight -
              outerHeight -
              withinOffset,
            newOverBottom;

          // Element is taller than within
          if (data.collisionHeight > outerHeight) {
            // Element is initially over the top of within
            if (overTop > 0 && overBottom <= 0) {
              newOverBottom =
                position.top +
                overTop +
                data.collisionHeight -
                outerHeight -
                withinOffset;
              position.top += overTop - newOverBottom;
            } else if (overBottom > 0 && overTop <= 0) {
              position.top = withinOffset;
            } else {
              if (overTop > overBottom) {
                position.top =
                  withinOffset + outerHeight - data.collisionHeight;
              } else {
                position.top = withinOffset;
              }
            }
          } else if (overTop > 0) {
            position.top += overTop;
          } else if (overBottom > 0) {
            position.top -= overBottom;
          } else {
            position.top = max(position.top - collisionPosTop, position.top);
          }
        },
      },
      flip: {
        left: function(position, data) {
          var within = data.within,
            withinOffset = within.offset.left + within.scrollLeft,
            outerWidth = within.width,
            offsetLeft = within.isWindow
              ? within.scrollLeft
              : within.offset.left,
            collisionPosLeft =
              position.left - data.collisionPosition.marginLeft,
            overLeft = collisionPosLeft - offsetLeft,
            overRight =
              collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,
            myOffset =
              data.my[0] === "left"
                ? -data.elemWidth
                : data.my[0] === "right"
                ? data.elemWidth
                : 0,
            atOffset =
              data.at[0] === "left"
                ? data.targetWidth
                : data.at[0] === "right"
                ? -data.targetWidth
                : 0,
            offset = -2 * data.offset[0],
            newOverRight,
            newOverLeft;

          if (overLeft < 0) {
            newOverRight =
              position.left +
              myOffset +
              atOffset +
              offset +
              data.collisionWidth -
              outerWidth -
              withinOffset;
            if (newOverRight < 0 || newOverRight < abs(overLeft)) {
              position.left += myOffset + atOffset + offset;
            }
          } else if (overRight > 0) {
            newOverLeft =
              position.left -
              data.collisionPosition.marginLeft +
              myOffset +
              atOffset +
              offset -
              offsetLeft;
            if (newOverLeft > 0 || abs(newOverLeft) < overRight) {
              position.left += myOffset + atOffset + offset;
            }
          }
        },
        top: function(position, data) {
          var within = data.within,
            withinOffset = within.offset.top + within.scrollTop,
            outerHeight = within.height,
            offsetTop = within.isWindow ? within.scrollTop : within.offset.top,
            collisionPosTop = position.top - data.collisionPosition.marginTop,
            overTop = collisionPosTop - offsetTop,
            overBottom =
              collisionPosTop + data.collisionHeight - outerHeight - offsetTop,
            top = data.my[1] === "top",
            myOffset = top
              ? -data.elemHeight
              : data.my[1] === "bottom"
              ? data.elemHeight
              : 0,
            atOffset =
              data.at[1] === "top"
                ? data.targetHeight
                : data.at[1] === "bottom"
                ? -data.targetHeight
                : 0,
            offset = -2 * data.offset[1],
            newOverTop,
            newOverBottom;
          if (overTop < 0) {
            newOverBottom =
              position.top +
              myOffset +
              atOffset +
              offset +
              data.collisionHeight -
              outerHeight -
              withinOffset;
            if (newOverBottom < 0 || newOverBottom < abs(overTop)) {
              position.top += myOffset + atOffset + offset;
            }
          } else if (overBottom > 0) {
            newOverTop =
              position.top -
              data.collisionPosition.marginTop +
              myOffset +
              atOffset +
              offset -
              offsetTop;
            if (newOverTop > 0 || abs(newOverTop) < overBottom) {
              position.top += myOffset + atOffset + offset;
            }
          }
        },
      },
      flipfit: {
        left: function() {
          $.ui.position.flip.left.apply(this, arguments);
          $.ui.position.fit.left.apply(this, arguments);
        },
        top: function() {
          $.ui.position.flip.top.apply(this, arguments);
          $.ui.position.fit.top.apply(this, arguments);
        },
      },
    };
  })();

  var position = $.ui.position;

  /*!
   * jQuery UI :data 1.12.1
   * http://jqueryui.com
   *
   */
  var data = $.extend($.expr[":"], {
    data: $.expr.createPseudo
      ? $.expr.createPseudo(function(dataName) {
          return function(elem) {
            return !!$.data(elem, dataName);
          };
        })
      : // Support: jQuery <1.8
        function(elem, i, match) {
          return !!$.data(elem, match[3]);
        },
  });

  /*!
   * jQuery UI Disable Selection 1.12.1
   * http://jqueryui.com
   */

  var disableSelection = $.fn.extend({
    disableSelection: (function() {
      var eventType =
        "onselectstart" in document.createElement("div")
          ? "selectstart"
          : "mousedown";

      return function() {
        return this.on(eventType + ".ui-disableSelection", function(event) {
          event.preventDefault();
        });
      };
    })(),

    enableSelection: function() {
      return this.off(".ui-disableSelection");
    },
  });

  /*!
   * jQuery UI Effects 1.12.1
   * http://jqueryui.com
   *
   */

  var dataSpace = "ui-effects-",
    dataSpaceStyle = "ui-effects-style",
    dataSpaceAnimated = "ui-effects-animated",
    jQuery = $;

  $.effects = {
    effect: {},
  };

  /*!
   * jQuery UI Focusable 1.12.1
   * http://jqueryui.com
   */
  $.ui.focusable = function(element, hasTabindex) {
    var map,
      mapName,
      img,
      focusableIfVisible,
      fieldset,
      nodeName = element.nodeName.toLowerCase();

    if ("area" === nodeName) {
      map = element.parentNode;
      mapName = map.name;
      if (!element.href || !mapName || map.nodeName.toLowerCase() !== "map") {
        return false;
      }
      img = $("img[usemap='#" + mapName + "']");
      return img.length > 0 && img.is(":visible");
    }

    if (/^(input|select|textarea|button|object)$/.test(nodeName)) {
      focusableIfVisible = !element.disabled;

      if (focusableIfVisible) {
        fieldset = $(element).closest("fieldset")[0];
        if (fieldset) {
          focusableIfVisible = !fieldset.disabled;
        }
      }
    } else if ("a" === nodeName) {
      focusableIfVisible = element.href || hasTabindex;
    } else {
      focusableIfVisible = hasTabindex;
    }

    return (
      focusableIfVisible && $(element).is(":visible") && visible($(element))
    );
  };
  function visible(element) {
    var visibility = element.css("visibility");
    while (visibility === "inherit") {
      element = element.parent();
      visibility = element.css("visibility");
    }
    return visibility !== "hidden";
  }

  $.extend($.expr[":"], {
    focusable: function(element) {
      return $.ui.focusable(element, $.attr(element, "tabindex") != null);
    },
  });

  var focusable = $.ui.focusable;

  var form = ($.fn.form = function() {
    return typeof this[0].form === "string"
      ? this.closest("form")
      : $(this[0].form);
  });

  /*!
   * jQuery UI Form Reset Mixin 1.12.1
   * http://jqueryui.com
   */

  var formResetMixin = ($.ui.formResetMixin = {
    _formResetHandler: function() {
      var form = $(this);
      setTimeout(function() {
        var instances = form.data("ui-form-reset-instances");
        $.each(instances, function() {
          this.refresh();
        });
      });
    },

    _bindFormResetHandler: function() {
      this.form = this.element.form();
      if (!this.form.length) {
        return;
      }

      var instances = this.form.data("ui-form-reset-instances") || [];
      if (!instances.length) {
        this.form.on("reset.ui-form-reset", this._formResetHandler);
      }
      instances.push(this);
      this.form.data("ui-form-reset-instances", instances);
    },

    _unbindFormResetHandler: function() {
      if (!this.form.length) {
        return;
      }

      var instances = this.form.data("ui-form-reset-instances");
      instances.splice($.inArray(this, instances), 1);
      if (instances.length) {
        this.form.data("ui-form-reset-instances", instances);
      } else {
        this.form
          .removeData("ui-form-reset-instances")
          .off("reset.ui-form-reset");
      }
    },
  });

  /*!
   * jQuery UI Support for jQuery core 1.7.x 1.12.1
   * http://jqueryui.com
   *
   */

  if ($.fn.jquery.substring(0, 3) === "1.7") {
    $.each(["Width", "Height"], function(i, name) {
      var side = name === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
        type = name.toLowerCase(),
        orig = {
          innerWidth: $.fn.innerWidth,
          innerHeight: $.fn.innerHeight,
          outerWidth: $.fn.outerWidth,
          outerHeight: $.fn.outerHeight,
        };

      function reduce(elem, size, border, margin) {
        $.each(side, function() {
          size -= parseFloat($.css(elem, "padding" + this)) || 0;
          if (border) {
            size -= parseFloat($.css(elem, "border" + this + "Width")) || 0;
          }
          if (margin) {
            size -= parseFloat($.css(elem, "margin" + this)) || 0;
          }
        });
        return size;
      }

      $.fn["inner" + name] = function(size) {
        if (size === undefined) {
          return orig["inner" + name].call(this);
        }

        return this.each(function() {
          $(this).css(type, reduce(this, size) + "px");
        });
      };

      $.fn["outer" + name] = function(size, margin) {
        if (typeof size !== "number") {
          return orig["outer" + name].call(this, size);
        }

        return this.each(function() {
          $(this).css(type, reduce(this, size, true, margin) + "px");
        });
      };
    });

    $.fn.addBack = function(selector) {
      return this.add(
        selector == null ? this.prevObject : this.prevObject.filter(selector)
      );
    };
  }

  /*!
   * jQuery UI Keycode 1.12.1
   * http://jqueryui.com
   *
   */

  var keycode = ($.ui.keyCode = {
    BACKSPACE: 8,
    COMMA: 188,
    DELETE: 46,
    DOWN: 40,
    END: 35,
    ENTER: 13,
    ESCAPE: 27,
    HOME: 36,
    LEFT: 37,
    PAGE_DOWN: 34,
    PAGE_UP: 33,
    PERIOD: 190,
    RIGHT: 39,
    SPACE: 32,
    TAB: 9,
    UP: 38,
  });

  // Internal use only
  var escapeSelector = ($.ui.escapeSelector = (function() {
    var selectorEscape = /([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g;
    return function(selector) {
      return selector.replace(selectorEscape, "\\$1");
    };
  })());

  /*!
   * jQuery UI Labels 1.12.1
   * http://jqueryui.com
   */

  /*!
   * jQuery UI Scroll Parent 1.12.1
   * http://jqueryui.com
   *
   */

  var scrollParent = ($.fn.scrollParent = function(includeHidden) {
    var position = this.css("position"),
      excludeStaticParent = position === "absolute",
      overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
      scrollParent = this.parents()
        .filter(function() {
          var parent = $(this);
          if (excludeStaticParent && parent.css("position") === "static") {
            return false;
          }
          return overflowRegex.test(
            parent.css("overflow") +
              parent.css("overflow-y") +
              parent.css("overflow-x")
          );
        })
        .eq(0);

    return position === "fixed" || !scrollParent.length
      ? $(this[0].ownerDocument || document)
      : scrollParent;
  });

  /*!
   * jQuery UI Tabbable 1.12.1
   * http://jqueryui.com
   */

  var tabbable = $.extend($.expr[":"], {
    tabbable: function(element) {
      var tabIndex = $.attr(element, "tabindex"),
        hasTabindex = tabIndex != null;
      return (
        (!hasTabindex || tabIndex >= 0) && $.ui.focusable(element, hasTabindex)
      );
    },
  });

  /*!
   * jQuery UI Unique ID 1.12.1
   * http://jqueryui.com
   */

  var uniqueId = $.fn.extend({
    uniqueId: (function() {
      var uuid = 0;

      return function() {
        return this.each(function() {
          if (!this.id) {
            this.id = "ui-id-" + ++uuid;
          }
        });
      };
    })(),

    removeUniqueId: function() {
      return this.each(function() {
        if (/^ui-id-\d+$/.test(this.id)) {
          $(this).removeAttr("id");
        }
      });
    },
  });

  var safeActiveElement = ($.ui.safeActiveElement = function(document) {
    var activeElement;
    try {
      activeElement = document.activeElement;
    } catch (error) {
      activeElement = document.body;
    }
    if (!activeElement) {
      activeElement = document.body;
    }
    if (!activeElement.nodeName) {
      activeElement = document.body;
    }

    return activeElement;
  });

  /*!
   * jQuery UI Button 1.12.1
   * http://jqueryui.com
   */

  $.widget("ui.button", {
    version: "1.12.1",
    defaultElement: "<button>",
    options: {
      classes: {
        "ui-button": "ui-corner-all",
      },
      disabled: null,
      icon: null,
      iconPosition: "beginning",
      label: null,
      showLabel: true,
    },

    _getCreateOptions: function() {
      var disabled,
        options = this._super() || {};

      this.isInput = this.element.is("input");

      disabled = this.element[0].disabled;
      if (disabled != null) {
        options.disabled = disabled;
      }

      this.originalLabel = this.isInput
        ? this.element.val()
        : this.element.html();
      if (this.originalLabel) {
        options.label = this.originalLabel;
      }

      return options;
    },

    _create: function() {
      if (!this.option.showLabel & !this.options.icon) {
        this.options.showLabel = true;
      }
      if (this.options.disabled == null) {
        this.options.disabled = this.element[0].disabled || false;
      }

      this.hasTitle = !!this.element.attr("title");
      if (this.options.label && this.options.label !== this.originalLabel) {
        if (this.isInput) {
          this.element.val(this.options.label);
        } else {
          this.element.html(this.options.label);
        }
      }
      this._addClass("ui-button", "ui-widget");
      this._setOption("disabled", this.options.disabled);
      this._enhance();

      if (this.element.is("a")) {
        this._on({
          keyup: function(event) {
            if (event.keyCode === $.ui.keyCode.SPACE) {
              event.preventDefault();
              if (this.element[0].click) {
                this.element[0].click();
              } else {
                this.element.trigger("click");
              }
            }
          },
        });
      }
    },

    _enhance: function() {
      if (!this.element.is("button")) {
        this.element.attr("role", "button");
      }

      if (this.options.icon) {
        this._updateIcon("icon", this.options.icon);
        this._updateTooltip();
      }
    },

    _updateTooltip: function() {
      this.title = this.element.attr("title");

      if (!this.options.showLabel && !this.title) {
        this.element.attr("title", this.options.label);
      }
    },

    _updateIcon: function(option, value) {
      var icon = option !== "iconPosition",
        position = icon ? this.options.iconPosition : value,
        displayBlock = position === "top" || position === "bottom";

      // Create icon
      if (!this.icon) {
        this.icon = $("<span>");

        this._addClass(this.icon, "ui-button-icon", "ui-icon");

        if (!this.options.showLabel) {
          this._addClass("ui-button-icon-only");
        }
      } else if (icon) {
        this._removeClass(this.icon, null, this.options.icon);
      }

      if (icon) {
        this._addClass(this.icon, null, value);
      }

      this._attachIcon(position);
      if (displayBlock) {
        this._addClass(this.icon, null, "ui-widget-icon-block");
        if (this.iconSpace) {
          this.iconSpace.remove();
        }
      } else {
        if (!this.iconSpace) {
          this.iconSpace = $("<span> </span>");
          this._addClass(this.iconSpace, "ui-button-icon-space");
        }
        this._removeClass(this.icon, null, "ui-wiget-icon-block");
        this._attachIconSpace(position);
      }
    },

    _destroy: function() {
      this.element.removeAttr("role");

      if (this.icon) {
        this.icon.remove();
      }
      if (this.iconSpace) {
        this.iconSpace.remove();
      }
      if (!this.hasTitle) {
        this.element.removeAttr("title");
      }
    },

    _attachIconSpace: function(iconPosition) {
      this.icon[/^(?:end|bottom)/.test(iconPosition) ? "before" : "after"](
        this.iconSpace
      );
    },

    _attachIcon: function(iconPosition) {
      this.element[/^(?:end|bottom)/.test(iconPosition) ? "append" : "prepend"](
        this.icon
      );
    },

    _setOptions: function(options) {
      var newShowLabel =
          options.showLabel === undefined
            ? this.options.showLabel
            : options.showLabel,
        newIcon = options.icon === undefined ? this.options.icon : options.icon;

      if (!newShowLabel && !newIcon) {
        options.showLabel = true;
      }
      this._super(options);
    },

    _setOption: function(key, value) {
      if (key === "icon") {
        if (value) {
          this._updateIcon(key, value);
        } else if (this.icon) {
          this.icon.remove();
          if (this.iconSpace) {
            this.iconSpace.remove();
          }
        }
      }

      if (key === "iconPosition") {
        this._updateIcon(key, value);
      }

      if (key === "showLabel") {
        this._toggleClass("ui-button-icon-only", null, !value);
        this._updateTooltip();
      }

      if (key === "label") {
        if (this.isInput) {
          this.element.val(value);
        } else {
          this.element.html(value);
          if (this.icon) {
            this._attachIcon(this.options.iconPosition);
            this._attachIconSpace(this.options.iconPosition);
          }
        }
      }

      this._super(key, value);

      if (key === "disabled") {
        this._toggleClass(null, "ui-state-disabled", value);
        this.element[0].disabled = value;
        if (value) {
          this.element.blur();
        }
      }
    },

    refresh: function() {
      var isDisabled = this.element.is("input, button")
        ? this.element[0].disabled
        : this.element.hasClass("ui-button-disabled");

      if (isDisabled !== this.options.disabled) {
        this._setOptions({ disabled: isDisabled });
      }

      this._updateTooltip();
    },
  });

  // DEPRECATED
  if ($.uiBackCompat !== false) {
    // Text and Icons options
    $.widget("ui.button", $.ui.button, {
      options: {
        text: true,
        icons: {
          primary: null,
          secondary: null,
        },
      },

      _create: function() {
        if (this.options.showLabel && !this.options.text) {
          this.options.showLabel = this.options.text;
        }
        if (!this.options.showLabel && this.options.text) {
          this.options.text = this.options.showLabel;
        }
        if (
          !this.options.icon &&
          (this.options.icons.primary || this.options.icons.secondary)
        ) {
          if (this.options.icons.primary) {
            this.options.icon = this.options.icons.primary;
          } else {
            this.options.icon = this.options.icons.secondary;
            this.options.iconPosition = "end";
          }
        } else if (this.options.icon) {
          this.options.icons.primary = this.options.icon;
        }
        this._super();
      },

      _setOption: function(key, value) {
        if (key === "text") {
          this._super("showLabel", value);
          return;
        }
        if (key === "showLabel") {
          this.options.text = value;
        }
        if (key === "icon") {
          this.options.icons.primary = value;
        }
        if (key === "icons") {
          if (value.primary) {
            this._super("icon", value.primary);
            this._super("iconPosition", "beginning");
          } else if (value.secondary) {
            this._super("icon", value.secondary);
            this._super("iconPosition", "end");
          }
        }
        this._superApply(arguments);
      },
    });

    $.fn.button = (function(orig) {
      return function() {
        if (
          !this.length ||
          (this.length && this[0].tagName !== "INPUT") ||
          (this.length &&
            this[0].tagName === "INPUT" &&
            this.attr("type") !== "checkbox" &&
            this.attr("type") !== "radio")
        ) {
          return orig.apply(this, arguments);
        }
        if (!$.ui.checkboxradio) {
          $.error("Checkboxradio widget missing");
        }
        if (arguments.length === 0) {
          return this.checkboxradio({
            icon: false,
          });
        }
        return this.checkboxradio.apply(this, arguments);
      };
    })($.fn.button);

    $.fn.buttonset = function() {
      if (!$.ui.controlgroup) {
        $.error("Controlgroup widget missing");
      }
      if (
        arguments[0] === "option" &&
        arguments[1] === "items" &&
        arguments[2]
      ) {
        return this.controlgroup.apply(this, [
          arguments[0],
          "items.button",
          arguments[2],
        ]);
      }
      if (arguments[0] === "option" && arguments[1] === "items") {
        return this.controlgroup.apply(this, [arguments[0], "items.button"]);
      }
      if (typeof arguments[0] === "object" && arguments[0].items) {
        arguments[0].items = {
          button: arguments[0].items,
        };
      }
      return this.controlgroup.apply(this, arguments);
    };
  }

  var widgetsButton = $.ui.button;

  // This file is deprecated
  var ie = ($.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()));

  /*!
   * jQuery UI Mouse 1.12.1
   * http://jqueryui.com
   *
   */

  var mouseHandled = false;
  $(document).on("mouseup", function() {
    mouseHandled = false;
  });

  var widgetsMouse = $.widget("ui.mouse", {
    version: "1.12.1",
    options: {
      cancel: "input, textarea, button, select, option",
      distance: 1,
      delay: 0,
    },
    _mouseInit: function() {
      var that = this;

      this.element
        .on("mousedown." + this.widgetName, function(event) {
          return that._mouseDown(event);
        })
        .on("click." + this.widgetName, function(event) {
          if (
            true ===
            $.data(event.target, that.widgetName + ".preventClickEvent")
          ) {
            $.removeData(event.target, that.widgetName + ".preventClickEvent");
            event.stopImmediatePropagation();
            return false;
          }
        });

      this.started = false;
    },

    _mouseDestroy: function() {
      this.element.off("." + this.widgetName);
      if (this._mouseMoveDelegate) {
        this.document
          .off("mousemove." + this.widgetName, this._mouseMoveDelegate)
          .off("mouseup." + this.widgetName, this._mouseUpDelegate);
      }
    },

    _mouseDown: function(event) {
      if (mouseHandled) {
        return;
      }

      this._mouseMoved = false;
      this._mouseStarted && this._mouseUp(event);

      this._mouseDownEvent = event;

      var that = this,
        btnIsLeft = event.which === 1,
        elIsCancel =
          typeof this.options.cancel === "string" && event.target.nodeName
            ? $(event.target).closest(this.options.cancel).length
            : false;
      if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
        return true;
      }

      this.mouseDelayMet = !this.options.delay;
      if (!this.mouseDelayMet) {
        this._mouseDelayTimer = setTimeout(function() {
          that.mouseDelayMet = true;
        }, this.options.delay);
      }

      if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
        this._mouseStarted = this._mouseStart(event) !== false;
        if (!this._mouseStarted) {
          event.preventDefault();
          return true;
        }
      }

      if (
        true === $.data(event.target, this.widgetName + ".preventClickEvent")
      ) {
        $.removeData(event.target, this.widgetName + ".preventClickEvent");
      }
      this._mouseMoveDelegate = function(event) {
        return that._mouseMove(event);
      };
      this._mouseUpDelegate = function(event) {
        return that._mouseUp(event);
      };

      this.document
        .on("mousemove." + this.widgetName, this._mouseMoveDelegate)
        .on("mouseup." + this.widgetName, this._mouseUpDelegate);

      event.preventDefault();

      mouseHandled = true;
      return true;
    },

    _mouseMove: function(event) {
      if (this._mouseMoved) {
        if (
          $.ui.ie &&
          (!document.documentMode || document.documentMode < 9) &&
          !event.button
        ) {
          return this._mouseUp(event);
        } else if (!event.which) {
          if (
            event.originalEvent.altKey ||
            event.originalEvent.ctrlKey ||
            event.originalEvent.metaKey ||
            event.originalEvent.shiftKey
          ) {
            this.ignoreMissingWhich = true;
          } else if (!this.ignoreMissingWhich) {
            return this._mouseUp(event);
          }
        }
      }

      if (event.which || event.button) {
        this._mouseMoved = true;
      }

      if (this._mouseStarted) {
        this._mouseDrag(event);
        return event.preventDefault();
      }

      if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
        this._mouseStarted =
          this._mouseStart(this._mouseDownEvent, event) !== false;
        this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event);
      }

      return !this._mouseStarted;
    },

    _mouseUp: function(event) {
      this.document
        .off("mousemove." + this.widgetName, this._mouseMoveDelegate)
        .off("mouseup." + this.widgetName, this._mouseUpDelegate);

      if (this._mouseStarted) {
        this._mouseStarted = false;

        if (event.target === this._mouseDownEvent.target) {
          $.data(event.target, this.widgetName + ".preventClickEvent", true);
        }

        this._mouseStop(event);
      }

      if (this._mouseDelayTimer) {
        clearTimeout(this._mouseDelayTimer);
        delete this._mouseDelayTimer;
      }

      this.ignoreMissingWhich = false;
      mouseHandled = false;
      event.preventDefault();
    },

    _mouseDistanceMet: function(event) {
      return (
        Math.max(
          Math.abs(this._mouseDownEvent.pageX - event.pageX),
          Math.abs(this._mouseDownEvent.pageY - event.pageY)
        ) >= this.options.distance
      );
    },

    _mouseDelayMet: function(/* event */) {
      return this.mouseDelayMet;
    },

    // These are placeholder methods, to be overriden by extending plugin
    _mouseStart: function(/* event */) {},
    _mouseDrag: function(/* event */) {},
    _mouseStop: function(/* event */) {},
    _mouseCapture: function(/* event */) {
      return true;
    },
  });

  // $.ui.plugin is deprecated. Use $.widget() extensions instead.
  var plugin = ($.ui.plugin = {
    add: function(module, option, set) {
      var i,
        proto = $.ui[module].prototype;
      for (i in set) {
        proto.plugins[i] = proto.plugins[i] || [];
        proto.plugins[i].push([option, set[i]]);
      }
    },
    call: function(instance, name, args, allowDisconnected) {
      var i,
        set = instance.plugins[name];

      if (!set) {
        return;
      }

      if (
        !allowDisconnected &&
        (!instance.element[0].parentNode ||
          instance.element[0].parentNode.nodeType === 11)
      ) {
        return;
      }

      for (i = 0; i < set.length; i++) {
        if (instance.options[set[i][0]]) {
          set[i][1].apply(instance.element, args);
        }
      }
    },
  });

  var safeBlur = ($.ui.safeBlur = function(element) {
    // Support: IE9 - 10 only
    // If the <body> is blurred, IE will switch windows, see #9420
    if (element && element.nodeName.toLowerCase() !== "body") {
      $(element).trigger("blur");
    }
  });

  /*!
   * jQuery UI Draggable 1.12.1
   * http://jqueryui.com
   *
   * Copyright jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   */

  //>>label: Draggable
  //>>group: Interactions
  //>>description: Enables dragging functionality for any element.
  //>>docs: http://api.jqueryui.com/draggable/
  //>>demos: http://jqueryui.com/draggable/
  //>>css.structure: ../../themes/base/draggable.css

  $.widget("ui.draggable", $.ui.mouse, {
    version: "1.12.1",
    widgetEventPrefix: "drag",
    options: {
      addClasses: true,
      appendTo: "parent",
      axis: false,
      connectToSortable: false,
      containment: false,
      cursor: "auto",
      cursorAt: false,
      grid: false,
      handle: false,
      helper: "original",
      iframeFix: false,
      opacity: false,
      refreshPositions: false,
      revert: false,
      revertDuration: 500,
      scope: "default",
      scroll: true,
      scrollSensitivity: 20,
      scrollSpeed: 20,
      snap: false,
      snapMode: "both",
      snapTolerance: 20,
      stack: false,
      zIndex: false,

      // Callbacks
      drag: null,
      start: null,
      stop: null,
    },
    _create: function() {
      if (this.options.helper === "original") {
        this._setPositionRelative();
      }
      if (this.options.addClasses) {
        this._addClass("ui-draggable");
      }
      this._setHandleClassName();

      this._mouseInit();
    },

    _setOption: function(key, value) {
      this._super(key, value);
      if (key === "handle") {
        this._removeHandleClassName();
        this._setHandleClassName();
      }
    },

    _destroy: function() {
      if ((this.helper || this.element).is(".ui-draggable-dragging")) {
        this.destroyOnClear = true;
        return;
      }
      this._removeHandleClassName();
      this._mouseDestroy();
    },

    _mouseCapture: function(event) {
      var o = this.options;

      // Among others, prevent a drag on a resizable-handle
      if (
        this.helper ||
        o.disabled ||
        $(event.target).closest(".ui-resizable-handle").length > 0
      ) {
        return false;
      }

      //Quit if we're not on a valid handle
      this.handle = this._getHandle(event);
      if (!this.handle) {
        return false;
      }

      this._blurActiveElement(event);

      this._blockFrames(o.iframeFix === true ? "iframe" : o.iframeFix);

      return true;
    },

    _blockFrames: function(selector) {
      this.iframeBlocks = this.document.find(selector).map(function() {
        var iframe = $(this);

        return $("<div>")
          .css("position", "absolute")
          .appendTo(iframe.parent())
          .outerWidth(iframe.outerWidth())
          .outerHeight(iframe.outerHeight())
          .offset(iframe.offset())[0];
      });
    },

    _unblockFrames: function() {
      if (this.iframeBlocks) {
        this.iframeBlocks.remove();
        delete this.iframeBlocks;
      }
    },

    _blurActiveElement: function(event) {
      var activeElement = $.ui.safeActiveElement(this.document[0]),
        target = $(event.target);

      // Don't blur if the event occurred on an element that is within
      // the currently focused element
      // See #10527, #12472
      if (target.closest(activeElement).length) {
        return;
      }

      // Blur any element that currently has focus, see #4261
      $.ui.safeBlur(activeElement);
    },

    _mouseStart: function(event) {
      var o = this.options;

      //Create and append the visible helper
      this.helper = this._createHelper(event);

      this._addClass(this.helper, "ui-draggable-dragging");

      //Cache the helper size
      this._cacheHelperProportions();

      //If ddmanager is used for droppables, set the global draggable
      if ($.ui.ddmanager) {
        $.ui.ddmanager.current = this;
      }

      /*
       * - Position generation -
       * This block generates everything position related - it's the core of draggables.
       */

      //Cache the margins of the original element
      this._cacheMargins();

      //Store the helper's css position
      this.cssPosition = this.helper.css("position");
      this.scrollParent = this.helper.scrollParent(true);
      this.offsetParent = this.helper.offsetParent();
      this.hasFixedAncestor =
        this.helper.parents().filter(function() {
          return $(this).css("position") === "fixed";
        }).length > 0;

      //The element's absolute position on the page minus margins
      this.positionAbs = this.element.offset();
      this._refreshOffsets(event);

      //Generate the original position
      this.originalPosition = this.position = this._generatePosition(
        event,
        false
      );
      this.originalPageX = event.pageX;
      this.originalPageY = event.pageY;

      //Adjust the mouse offset relative to the helper if "cursorAt" is supplied
      o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt);

      //Set a containment if given in the options
      this._setContainment();

      //Trigger event + callbacks
      if (this._trigger("start", event) === false) {
        this._clear();
        return false;
      }

      //Recache the helper size
      this._cacheHelperProportions();

      //Prepare the droppable offsets
      if ($.ui.ddmanager && !o.dropBehaviour) {
        $.ui.ddmanager.prepareOffsets(this, event);
      }

      // Execute the drag once - this causes the helper not to be visible before getting its
      // correct position
      this._mouseDrag(event, true);

      // If the ddmanager is used for droppables, inform the manager that dragging has started
      // (see #5003)
      if ($.ui.ddmanager) {
        $.ui.ddmanager.dragStart(this, event);
      }

      return true;
    },

    _refreshOffsets: function(event) {
      this.offset = {
        top: this.positionAbs.top - this.margins.top,
        left: this.positionAbs.left - this.margins.left,
        scroll: false,
        parent: this._getParentOffset(),
        relative: this._getRelativeOffset(),
      };

      this.offset.click = {
        left: event.pageX - this.offset.left,
        top: event.pageY - this.offset.top,
      };
    },

    _mouseDrag: function(event, noPropagation) {
      // reset any necessary cached properties (see #5009)
      if (this.hasFixedAncestor) {
        this.offset.parent = this._getParentOffset();
      }

      //Compute the helpers position
      this.position = this._generatePosition(event, true);
      this.positionAbs = this._convertPositionTo("absolute");

      //Call plugins and callbacks and use the resulting position if something is returned
      if (!noPropagation) {
        var ui = this._uiHash();
        if (this._trigger("drag", event, ui) === false) {
          this._mouseUp(new $.Event("mouseup", event));
          return false;
        }
        this.position = ui.position;
      }

      this.helper[0].style.left = this.position.left + "px";
      this.helper[0].style.top = this.position.top + "px";

      if ($.ui.ddmanager) {
        $.ui.ddmanager.drag(this, event);
      }

      return false;
    },

    _mouseStop: function(event) {
      //If we are using droppables, inform the manager about the drop
      var that = this,
        dropped = false;
      if ($.ui.ddmanager && !this.options.dropBehaviour) {
        dropped = $.ui.ddmanager.drop(this, event);
      }

      //if a drop comes from outside (a sortable)
      if (this.dropped) {
        dropped = this.dropped;
        this.dropped = false;
      }

      if (
        (this.options.revert === "invalid" && !dropped) ||
        (this.options.revert === "valid" && dropped) ||
        this.options.revert === true ||
        ($.isFunction(this.options.revert) &&
          this.options.revert.call(this.element, dropped))
      ) {
        $(this.helper).animate(
          this.originalPosition,
          parseInt(this.options.revertDuration, 10),
          function() {
            if (that._trigger("stop", event) !== false) {
              that._clear();
            }
          }
        );
      } else {
        if (this._trigger("stop", event) !== false) {
          this._clear();
        }
      }

      return false;
    },

    _mouseUp: function(event) {
      this._unblockFrames();

      // If the ddmanager is used for droppables, inform the manager that dragging has stopped
      // (see #5003)
      if ($.ui.ddmanager) {
        $.ui.ddmanager.dragStop(this, event);
      }

      // Only need to focus if the event occurred on the draggable itself, see #10527
      if (this.handleElement.is(event.target)) {
        // The interaction is over; whether or not the click resulted in a drag,
        // focus the element
        this.element.trigger("focus");
      }

      return $.ui.mouse.prototype._mouseUp.call(this, event);
    },

    cancel: function() {
      if (this.helper.is(".ui-draggable-dragging")) {
        this._mouseUp(new $.Event("mouseup", { target: this.element[0] }));
      } else {
        this._clear();
      }

      return this;
    },

    _getHandle: function(event) {
      return this.options.handle
        ? !!$(event.target).closest(this.element.find(this.options.handle))
            .length
        : true;
    },

    _setHandleClassName: function() {
      this.handleElement = this.options.handle
        ? this.element.find(this.options.handle)
        : this.element;
      this._addClass(this.handleElement, "ui-draggable-handle");
    },

    _removeHandleClassName: function() {
      this._removeClass(this.handleElement, "ui-draggable-handle");
    },

    _createHelper: function(event) {
      var o = this.options,
        helperIsFunction = $.isFunction(o.helper),
        helper = helperIsFunction
          ? $(o.helper.apply(this.element[0], [event]))
          : o.helper === "clone"
          ? this.element.clone().removeAttr("id")
          : this.element;

      if (!helper.parents("body").length) {
        helper.appendTo(
          o.appendTo === "parent" ? this.element[0].parentNode : o.appendTo
        );
      }

      // Http://bugs.jqueryui.com/ticket/9446
      // a helper function can return the original element
      // which wouldn't have been set to relative in _create
      if (helperIsFunction && helper[0] === this.element[0]) {
        this._setPositionRelative();
      }

      if (
        helper[0] !== this.element[0] &&
        !/(fixed|absolute)/.test(helper.css("position"))
      ) {
        helper.css("position", "absolute");
      }

      return helper;
    },

    _setPositionRelative: function() {
      if (!/^(?:r|a|f)/.test(this.element.css("position"))) {
        this.element[0].style.position = "relative";
      }
    },

    _adjustOffsetFromHelper: function(obj) {
      if (typeof obj === "string") {
        obj = obj.split(" ");
      }
      if ($.isArray(obj)) {
        obj = { left: +obj[0], top: +obj[1] || 0 };
      }
      if ("left" in obj) {
        this.offset.click.left = obj.left + this.margins.left;
      }
      if ("right" in obj) {
        this.offset.click.left =
          this.helperProportions.width - obj.right + this.margins.left;
      }
      if ("top" in obj) {
        this.offset.click.top = obj.top + this.margins.top;
      }
      if ("bottom" in obj) {
        this.offset.click.top =
          this.helperProportions.height - obj.bottom + this.margins.top;
      }
    },

    _isRootNode: function(element) {
      return (
        /(html|body)/i.test(element.tagName) || element === this.document[0]
      );
    },

    _getParentOffset: function() {
      //Get the offsetParent and cache its position
      var po = this.offsetParent.offset(),
        document = this.document[0];

      // This is a special case where we need to modify a offset calculated on start, since the
      // following happened:
      // 1. The position of the helper is absolute, so it's position is calculated based on the
      // next positioned parent
      // 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't
      // the document, which means that the scroll is included in the initial calculation of the
      // offset of the parent, and never recalculated upon drag
      if (
        this.cssPosition === "absolute" &&
        this.scrollParent[0] !== document &&
        $.contains(this.scrollParent[0], this.offsetParent[0])
      ) {
        po.left += this.scrollParent.scrollLeft();
        po.top += this.scrollParent.scrollTop();
      }

      if (this._isRootNode(this.offsetParent[0])) {
        po = { top: 0, left: 0 };
      }

      return {
        top:
          po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
        left:
          po.left +
          (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0),
      };
    },

    _getRelativeOffset: function() {
      if (this.cssPosition !== "relative") {
        return { top: 0, left: 0 };
      }

      var p = this.element.position(),
        scrollIsRootNode = this._isRootNode(this.scrollParent[0]);

      return {
        top:
          p.top -
          (parseInt(this.helper.css("top"), 10) || 0) +
          (!scrollIsRootNode ? this.scrollParent.scrollTop() : 0),
        left:
          p.left -
          (parseInt(this.helper.css("left"), 10) || 0) +
          (!scrollIsRootNode ? this.scrollParent.scrollLeft() : 0),
      };
    },

    _cacheMargins: function() {
      this.margins = {
        left: parseInt(this.element.css("marginLeft"), 10) || 0,
        top: parseInt(this.element.css("marginTop"), 10) || 0,
        right: parseInt(this.element.css("marginRight"), 10) || 0,
        bottom: parseInt(this.element.css("marginBottom"), 10) || 0,
      };
    },

    _cacheHelperProportions: function() {
      this.helperProportions = {
        width: this.helper.outerWidth(),
        height: this.helper.outerHeight(),
      };
    },

    _setContainment: function() {
      var isUserScrollable,
        c,
        ce,
        o = this.options,
        document = this.document[0];

      this.relativeContainer = null;

      if (!o.containment) {
        this.containment = null;
        return;
      }

      if (o.containment === "window") {
        this.containment = [
          $(window).scrollLeft() -
            this.offset.relative.left -
            this.offset.parent.left,
          $(window).scrollTop() -
            this.offset.relative.top -
            this.offset.parent.top,
          $(window).scrollLeft() +
            $(window).width() -
            this.helperProportions.width -
            this.margins.left,
          $(window).scrollTop() +
            ($(window).height() || document.body.parentNode.scrollHeight) -
            this.helperProportions.height -
            this.margins.top,
        ];
        return;
      }

      if (o.containment === "document") {
        this.containment = [
          0,
          0,
          $(document).width() -
            this.helperProportions.width -
            this.margins.left,
          ($(document).height() || document.body.parentNode.scrollHeight) -
            this.helperProportions.height -
            this.margins.top,
        ];
        return;
      }

      if (o.containment.constructor === Array) {
        this.containment = o.containment;
        return;
      }

      if (o.containment === "parent") {
        o.containment = this.helper[0].parentNode;
      }

      c = $(o.containment);
      ce = c[0];

      if (!ce) {
        return;
      }

      isUserScrollable = /(scroll|auto)/.test(c.css("overflow"));

      this.containment = [
        (parseInt(c.css("borderLeftWidth"), 10) || 0) +
          (parseInt(c.css("paddingLeft"), 10) || 0),
        (parseInt(c.css("borderTopWidth"), 10) || 0) +
          (parseInt(c.css("paddingTop"), 10) || 0),
        (isUserScrollable
          ? Math.max(ce.scrollWidth, ce.offsetWidth)
          : ce.offsetWidth) -
          (parseInt(c.css("borderRightWidth"), 10) || 0) -
          (parseInt(c.css("paddingRight"), 10) || 0) -
          this.helperProportions.width -
          this.margins.left -
          this.margins.right,
        (isUserScrollable
          ? Math.max(ce.scrollHeight, ce.offsetHeight)
          : ce.offsetHeight) -
          (parseInt(c.css("borderBottomWidth"), 10) || 0) -
          (parseInt(c.css("paddingBottom"), 10) || 0) -
          this.helperProportions.height -
          this.margins.top -
          this.margins.bottom,
      ];
      this.relativeContainer = c;
    },

    _convertPositionTo: function(d, pos) {
      if (!pos) {
        pos = this.position;
      }

      var mod = d === "absolute" ? 1 : -1,
        scrollIsRootNode = this._isRootNode(this.scrollParent[0]);

      return {
        top:
          // The absolute mouse position
          pos.top +
          // Only for relative positioned nodes: Relative offset from element to offset parent
          this.offset.relative.top * mod +
          // The offsetParent's offset without borders (offset + border)
          this.offset.parent.top * mod -
          (this.cssPosition === "fixed"
            ? -this.offset.scroll.top
            : scrollIsRootNode
            ? 0
            : this.offset.scroll.top) *
            mod,
        left:
          // The absolute mouse position
          pos.left +
          // Only for relative positioned nodes: Relative offset from element to offset parent
          this.offset.relative.left * mod +
          // The offsetParent's offset without borders (offset + border)
          this.offset.parent.left * mod -
          (this.cssPosition === "fixed"
            ? -this.offset.scroll.left
            : scrollIsRootNode
            ? 0
            : this.offset.scroll.left) *
            mod,
      };
    },

    _generatePosition: function(event, constrainPosition) {
      var containment,
        co,
        top,
        left,
        o = this.options,
        scrollIsRootNode = this._isRootNode(this.scrollParent[0]),
        pageX = event.pageX,
        pageY = event.pageY;

      // Cache the scroll
      if (!scrollIsRootNode || !this.offset.scroll) {
        this.offset.scroll = {
          top: this.scrollParent.scrollTop(),
          left: this.scrollParent.scrollLeft(),
        };
      }

      /*
       * - Position constraining -
       * Constrain the position to a mix of grid, containment.
       */

      // If we are not dragging yet, we won't check for options
      if (constrainPosition) {
        if (this.containment) {
          if (this.relativeContainer) {
            co = this.relativeContainer.offset();
            containment = [
              this.containment[0] + co.left,
              this.containment[1] + co.top,
              this.containment[2] + co.left,
              this.containment[3] + co.top,
            ];
          } else {
            containment = this.containment;
          }

          if (event.pageX - this.offset.click.left < containment[0]) {
            pageX = containment[0] + this.offset.click.left;
          }
          if (event.pageY - this.offset.click.top < containment[1]) {
            pageY = containment[1] + this.offset.click.top;
          }
          if (event.pageX - this.offset.click.left > containment[2]) {
            pageX = containment[2] + this.offset.click.left;
          }
          if (event.pageY - this.offset.click.top > containment[3]) {
            pageY = containment[3] + this.offset.click.top;
          }
        }

        if (o.grid) {
          //Check for grid elements set to 0 to prevent divide by 0 error causing invalid
          // argument errors in IE (see ticket #6950)
          top = o.grid[1]
            ? this.originalPageY +
              Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1]
            : this.originalPageY;
          pageY = containment
            ? top - this.offset.click.top >= containment[1] ||
              top - this.offset.click.top > containment[3]
              ? top
              : top - this.offset.click.top >= containment[1]
              ? top - o.grid[1]
              : top + o.grid[1]
            : top;

          left = o.grid[0]
            ? this.originalPageX +
              Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0]
            : this.originalPageX;
          pageX = containment
            ? left - this.offset.click.left >= containment[0] ||
              left - this.offset.click.left > containment[2]
              ? left
              : left - this.offset.click.left >= containment[0]
              ? left - o.grid[0]
              : left + o.grid[0]
            : left;
        }

        if (o.axis === "y") {
          pageX = this.originalPageX;
        }

        if (o.axis === "x") {
          pageY = this.originalPageY;
        }
      }

      return {
        top:
          // The absolute mouse position
          pageY -
          // Click offset (relative to the element)
          this.offset.click.top -
          // Only for relative positioned nodes: Relative offset from element to offset parent
          this.offset.relative.top -
          // The offsetParent's offset without borders (offset + border)
          this.offset.parent.top +
          (this.cssPosition === "fixed"
            ? -this.offset.scroll.top
            : scrollIsRootNode
            ? 0
            : this.offset.scroll.top),
        left:
          // The absolute mouse position
          pageX -
          // Click offset (relative to the element)
          this.offset.click.left -
          // Only for relative positioned nodes: Relative offset from element to offset parent
          this.offset.relative.left -
          // The offsetParent's offset without borders (offset + border)
          this.offset.parent.left +
          (this.cssPosition === "fixed"
            ? -this.offset.scroll.left
            : scrollIsRootNode
            ? 0
            : this.offset.scroll.left),
      };
    },

    _clear: function() {
      this._removeClass(this.helper, "ui-draggable-dragging");
      if (this.helper[0] !== this.element[0] && !this.cancelHelperRemoval) {
        this.helper.remove();
      }
      this.helper = null;
      this.cancelHelperRemoval = false;
      if (this.destroyOnClear) {
        this.destroy();
      }
    },

    // From now on bulk stuff - mainly helpers

    _trigger: function(type, event, ui) {
      ui = ui || this._uiHash();
      $.ui.plugin.call(this, type, [event, ui, this], true);

      // Absolute position and offset (see #6884 ) have to be recalculated after plugins
      if (/^(drag|start|stop)/.test(type)) {
        this.positionAbs = this._convertPositionTo("absolute");
        ui.offset = this.positionAbs;
      }
      return $.Widget.prototype._trigger.call(this, type, event, ui);
    },

    plugins: {},

    _uiHash: function() {
      return {
        helper: this.helper,
        position: this.position,
        originalPosition: this.originalPosition,
        offset: this.positionAbs,
      };
    },
  });

  $.ui.plugin.add("draggable", "connectToSortable", {
    start: function(event, ui, draggable) {
      var uiSortable = $.extend({}, ui, {
        item: draggable.element,
      });

      draggable.sortables = [];
      $(draggable.options.connectToSortable).each(function() {
        var sortable = $(this).sortable("instance");

        if (sortable && !sortable.options.disabled) {
          draggable.sortables.push(sortable);

          // RefreshPositions is called at drag start to refresh the containerCache
          // which is used in drag. This ensures it's initialized and synchronized
          // with any changes that might have happened on the page since initialization.
          sortable.refreshPositions();
          sortable._trigger("activate", event, uiSortable);
        }
      });
    },
    stop: function(event, ui, draggable) {
      var uiSortable = $.extend({}, ui, {
        item: draggable.element,
      });

      draggable.cancelHelperRemoval = false;

      $.each(draggable.sortables, function() {
        var sortable = this;

        if (sortable.isOver) {
          sortable.isOver = 0;

          // Allow this sortable to handle removing the helper
          draggable.cancelHelperRemoval = true;
          sortable.cancelHelperRemoval = false;

          // Use _storedCSS To restore properties in the sortable,
          // as this also handles revert (#9675) since the draggable
          // may have modified them in unexpected ways (#8809)
          sortable._storedCSS = {
            position: sortable.placeholder.css("position"),
            top: sortable.placeholder.css("top"),
            left: sortable.placeholder.css("left"),
          };

          sortable._mouseStop(event);

          // Once drag has ended, the sortable should return to using
          // its original helper, not the shared helper from draggable
          sortable.options.helper = sortable.options._helper;
        } else {
          // Prevent this Sortable from removing the helper.
          // However, don't set the draggable to remove the helper
          // either as another connected Sortable may yet handle the removal.
          sortable.cancelHelperRemoval = true;

          sortable._trigger("deactivate", event, uiSortable);
        }
      });
    },
    drag: function(event, ui, draggable) {
      $.each(draggable.sortables, function() {
        var innermostIntersecting = false,
          sortable = this;

        // Copy over variables that sortable's _intersectsWith uses
        sortable.positionAbs = draggable.positionAbs;
        sortable.helperProportions = draggable.helperProportions;
        sortable.offset.click = draggable.offset.click;

        if (sortable._intersectsWith(sortable.containerCache)) {
          innermostIntersecting = true;

          $.each(draggable.sortables, function() {
            // Copy over variables that sortable's _intersectsWith uses
            this.positionAbs = draggable.positionAbs;
            this.helperProportions = draggable.helperProportions;
            this.offset.click = draggable.offset.click;

            if (
              this !== sortable &&
              this._intersectsWith(this.containerCache) &&
              $.contains(sortable.element[0], this.element[0])
            ) {
              innermostIntersecting = false;
            }

            return innermostIntersecting;
          });
        }

        if (innermostIntersecting) {
          // If it intersects, we use a little isOver variable and set it once,
          // so that the move-in stuff gets fired only once.
          if (!sortable.isOver) {
            sortable.isOver = 1;

            // Store draggable's parent in case we need to reappend to it later.
            draggable._parent = ui.helper.parent();

            sortable.currentItem = ui.helper
              .appendTo(sortable.element)
              .data("ui-sortable-item", true);

            // Store helper option to later restore it
            sortable.options._helper = sortable.options.helper;

            sortable.options.helper = function() {
              return ui.helper[0];
            };

            // Fire the start events of the sortable with our passed browser event,
            // and our own helper (so it doesn't create a new one)
            event.target = sortable.currentItem[0];
            sortable._mouseCapture(event, true);
            sortable._mouseStart(event, true, true);

            // Because the browser event is way off the new appended portlet,
            // modify necessary variables to reflect the changes
            sortable.offset.click.top = draggable.offset.click.top;
            sortable.offset.click.left = draggable.offset.click.left;
            sortable.offset.parent.left -=
              draggable.offset.parent.left - sortable.offset.parent.left;
            sortable.offset.parent.top -=
              draggable.offset.parent.top - sortable.offset.parent.top;

            draggable._trigger("toSortable", event);

            // Inform draggable that the helper is in a valid drop zone,
            // used solely in the revert option to handle "valid/invalid".
            draggable.dropped = sortable.element;

            // Need to refreshPositions of all sortables in the case that
            // adding to one sortable changes the location of the other sortables (#9675)
            $.each(draggable.sortables, function() {
              this.refreshPositions();
            });

            // Hack so receive/update callbacks work (mostly)
            draggable.currentItem = draggable.element;
            sortable.fromOutside = draggable;
          }

          if (sortable.currentItem) {
            sortable._mouseDrag(event);

            // Copy the sortable's position because the draggable's can potentially reflect
            // a relative position, while sortable is always absolute, which the dragged
            // element has now become. (#8809)
            ui.position = sortable.position;
          }
        } else {
          // If it doesn't intersect with the sortable, and it intersected before,
          // we fake the drag stop of the sortable, but make sure it doesn't remove
          // the helper by using cancelHelperRemoval.
          if (sortable.isOver) {
            sortable.isOver = 0;
            sortable.cancelHelperRemoval = true;

            // Calling sortable's mouseStop would trigger a revert,
            // so revert must be temporarily false until after mouseStop is called.
            sortable.options._revert = sortable.options.revert;
            sortable.options.revert = false;

            sortable._trigger("out", event, sortable._uiHash(sortable));
            sortable._mouseStop(event, true);

            // Restore sortable behaviors that were modfied
            // when the draggable entered the sortable area (#9481)
            sortable.options.revert = sortable.options._revert;
            sortable.options.helper = sortable.options._helper;

            if (sortable.placeholder) {
              sortable.placeholder.remove();
            }

            // Restore and recalculate the draggable's offset considering the sortable
            // may have modified them in unexpected ways. (#8809, #10669)
            ui.helper.appendTo(draggable._parent);
            draggable._refreshOffsets(event);
            ui.position = draggable._generatePosition(event, true);

            draggable._trigger("fromSortable", event);

            // Inform draggable that the helper is no longer in a valid drop zone
            draggable.dropped = false;

            // Need to refreshPositions of all sortables just in case removing
            // from one sortable changes the location of other sortables (#9675)
            $.each(draggable.sortables, function() {
              this.refreshPositions();
            });
          }
        }
      });
    },
  });

  $.ui.plugin.add("draggable", "cursor", {
    start: function(event, ui, instance) {
      var t = $("body"),
        o = instance.options;

      if (t.css("cursor")) {
        o._cursor = t.css("cursor");
      }
      t.css("cursor", o.cursor);
    },
    stop: function(event, ui, instance) {
      var o = instance.options;
      if (o._cursor) {
        $("body").css("cursor", o._cursor);
      }
    },
  });

  $.ui.plugin.add("draggable", "opacity", {
    start: function(event, ui, instance) {
      var t = $(ui.helper),
        o = instance.options;
      if (t.css("opacity")) {
        o._opacity = t.css("opacity");
      }
      t.css("opacity", o.opacity);
    },
    stop: function(event, ui, instance) {
      var o = instance.options;
      if (o._opacity) {
        $(ui.helper).css("opacity", o._opacity);
      }
    },
  });

  $.ui.plugin.add("draggable", "scroll", {
    start: function(event, ui, i) {
      if (!i.scrollParentNotHidden) {
        i.scrollParentNotHidden = i.helper.scrollParent(false);
      }

      if (
        i.scrollParentNotHidden[0] !== i.document[0] &&
        i.scrollParentNotHidden[0].tagName !== "HTML"
      ) {
        i.overflowOffset = i.scrollParentNotHidden.offset();
      }
    },
    drag: function(event, ui, i) {
      var o = i.options,
        scrolled = false,
        scrollParent = i.scrollParentNotHidden[0],
        document = i.document[0];

      if (scrollParent !== document && scrollParent.tagName !== "HTML") {
        if (!o.axis || o.axis !== "x") {
          if (
            i.overflowOffset.top + scrollParent.offsetHeight - event.pageY <
            o.scrollSensitivity
          ) {
            scrollParent.scrollTop = scrolled =
              scrollParent.scrollTop + o.scrollSpeed;
          } else if (event.pageY - i.overflowOffset.top < o.scrollSensitivity) {
            scrollParent.scrollTop = scrolled =
              scrollParent.scrollTop - o.scrollSpeed;
          }
        }

        if (!o.axis || o.axis !== "y") {
          if (
            i.overflowOffset.left + scrollParent.offsetWidth - event.pageX <
            o.scrollSensitivity
          ) {
            scrollParent.scrollLeft = scrolled =
              scrollParent.scrollLeft + o.scrollSpeed;
          } else if (
            event.pageX - i.overflowOffset.left <
            o.scrollSensitivity
          ) {
            scrollParent.scrollLeft = scrolled =
              scrollParent.scrollLeft - o.scrollSpeed;
          }
        }
      } else {
        if (!o.axis || o.axis !== "x") {
          if (event.pageY - $(document).scrollTop() < o.scrollSensitivity) {
            scrolled = $(document).scrollTop(
              $(document).scrollTop() - o.scrollSpeed
            );
          } else if (
            $(window).height() - (event.pageY - $(document).scrollTop()) <
            o.scrollSensitivity
          ) {
            scrolled = $(document).scrollTop(
              $(document).scrollTop() + o.scrollSpeed
            );
          }
        }

        if (!o.axis || o.axis !== "y") {
          if (event.pageX - $(document).scrollLeft() < o.scrollSensitivity) {
            scrolled = $(document).scrollLeft(
              $(document).scrollLeft() - o.scrollSpeed
            );
          } else if (
            $(window).width() - (event.pageX - $(document).scrollLeft()) <
            o.scrollSensitivity
          ) {
            scrolled = $(document).scrollLeft(
              $(document).scrollLeft() + o.scrollSpeed
            );
          }
        }
      }

      if (scrolled !== false && $.ui.ddmanager && !o.dropBehaviour) {
        $.ui.ddmanager.prepareOffsets(i, event);
      }
    },
  });

  $.ui.plugin.add("draggable", "snap", {
    start: function(event, ui, i) {
      var o = i.options;

      i.snapElements = [];

      $(
        o.snap.constructor !== String
          ? o.snap.items || ":data(ui-draggable)"
          : o.snap
      ).each(function() {
        var $t = $(this),
          $o = $t.offset();
        if (this !== i.element[0]) {
          i.snapElements.push({
            item: this,
            width: $t.outerWidth(),
            height: $t.outerHeight(),
            top: $o.top,
            left: $o.left,
          });
        }
      });
    },
    drag: function(event, ui, inst) {
      var ts,
        bs,
        ls,
        rs,
        l,
        r,
        t,
        b,
        i,
        first,
        o = inst.options,
        d = o.snapTolerance,
        x1 = ui.offset.left,
        x2 = x1 + inst.helperProportions.width,
        y1 = ui.offset.top,
        y2 = y1 + inst.helperProportions.height;

      for (i = inst.snapElements.length - 1; i >= 0; i--) {
        l = inst.snapElements[i].left - inst.margins.left;
        r = l + inst.snapElements[i].width;
        t = inst.snapElements[i].top - inst.margins.top;
        b = t + inst.snapElements[i].height;

        if (
          x2 < l - d ||
          x1 > r + d ||
          y2 < t - d ||
          y1 > b + d ||
          !$.contains(
            inst.snapElements[i].item.ownerDocument,
            inst.snapElements[i].item
          )
        ) {
          if (inst.snapElements[i].snapping) {
            inst.options.snap.release &&
              inst.options.snap.release.call(
                inst.element,
                event,
                $.extend(inst._uiHash(), {
                  snapItem: inst.snapElements[i].item,
                })
              );
          }
          inst.snapElements[i].snapping = false;
          continue;
        }

        if (o.snapMode !== "inner") {
          ts = Math.abs(t - y2) <= d;
          bs = Math.abs(b - y1) <= d;
          ls = Math.abs(l - x2) <= d;
          rs = Math.abs(r - x1) <= d;
          if (ts) {
            ui.position.top = inst._convertPositionTo("relative", {
              top: t - inst.helperProportions.height,
              left: 0,
            }).top;
          }
          if (bs) {
            ui.position.top = inst._convertPositionTo("relative", {
              top: b,
              left: 0,
            }).top;
          }
          if (ls) {
            ui.position.left = inst._convertPositionTo("relative", {
              top: 0,
              left: l - inst.helperProportions.width,
            }).left;
          }
          if (rs) {
            ui.position.left = inst._convertPositionTo("relative", {
              top: 0,
              left: r,
            }).left;
          }
        }

        first = ts || bs || ls || rs;

        if (o.snapMode !== "outer") {
          ts = Math.abs(t - y1) <= d;
          bs = Math.abs(b - y2) <= d;
          ls = Math.abs(l - x1) <= d;
          rs = Math.abs(r - x2) <= d;
          if (ts) {
            ui.position.top = inst._convertPositionTo("relative", {
              top: t,
              left: 0,
            }).top;
          }
          if (bs) {
            ui.position.top = inst._convertPositionTo("relative", {
              top: b - inst.helperProportions.height,
              left: 0,
            }).top;
          }
          if (ls) {
            ui.position.left = inst._convertPositionTo("relative", {
              top: 0,
              left: l,
            }).left;
          }
          if (rs) {
            ui.position.left = inst._convertPositionTo("relative", {
              top: 0,
              left: r - inst.helperProportions.width,
            }).left;
          }
        }

        if (!inst.snapElements[i].snapping && (ts || bs || ls || rs || first)) {
          inst.options.snap.snap &&
            inst.options.snap.snap.call(
              inst.element,
              event,
              $.extend(inst._uiHash(), {
                snapItem: inst.snapElements[i].item,
              })
            );
        }
        inst.snapElements[i].snapping = ts || bs || ls || rs || first;
      }
    },
  });

  $.ui.plugin.add("draggable", "stack", {
    start: function(event, ui, instance) {
      var min,
        o = instance.options,
        group = $.makeArray($(o.stack)).sort(function(a, b) {
          return (
            (parseInt($(a).css("zIndex"), 10) || 0) -
            (parseInt($(b).css("zIndex"), 10) || 0)
          );
        });

      if (!group.length) {
        return;
      }

      min = parseInt($(group[0]).css("zIndex"), 10) || 0;
      $(group).each(function(i) {
        $(this).css("zIndex", min + i);
      });
      this.css("zIndex", min + group.length);
    },
  });

  $.ui.plugin.add("draggable", "zIndex", {
    start: function(event, ui, instance) {
      var t = $(ui.helper),
        o = instance.options;

      if (t.css("zIndex")) {
        o._zIndex = t.css("zIndex");
      }
      t.css("zIndex", o.zIndex);
    },
    stop: function(event, ui, instance) {
      var o = instance.options;

      if (o._zIndex) {
        $(ui.helper).css("zIndex", o._zIndex);
      }
    },
  });

  var widgetsDraggable = $.ui.draggable;

  /*!
   * jQuery UI Resizable 1.12.1
   * http://jqueryui.com
   *
   * Copyright jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   */

  $.widget("ui.resizable", $.ui.mouse, {
    version: "1.12.1",
    widgetEventPrefix: "resize",
    options: {
      alsoResize: false,
      animate: false,
      animateDuration: "slow",
      animateEasing: "swing",
      aspectRatio: false,
      autoHide: false,
      classes: {
        "ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se",
      },
      containment: false,
      ghost: false,
      grid: false,
      handles: "e,s,se",
      helper: false,
      maxHeight: null,
      maxWidth: null,
      minHeight: 10,
      minWidth: 10,

      // See #7960
      zIndex: 90,

      // Callbacks
      resize: null,
      start: null,
      stop: null,
    },

    _num: function(value) {
      return parseFloat(value) || 0;
    },

    _isNumber: function(value) {
      return !isNaN(parseFloat(value));
    },

    _hasScroll: function(el, a) {
      if ($(el).css("overflow") === "hidden") {
        return false;
      }

      var scroll = a && a === "left" ? "scrollLeft" : "scrollTop",
        has = false;

      if (el[scroll] > 0) {
        return true;
      }

      // TODO: determine which cases actually cause this to happen
      // if the element doesn't have the scroll set, see if it's possible to
      // set the scroll
      el[scroll] = 1;
      has = el[scroll] > 0;
      el[scroll] = 0;
      return has;
    },

    _create: function() {
      var margins,
        o = this.options,
        that = this;
      this._addClass("ui-resizable");

      $.extend(this, {
        _aspectRatio: !!o.aspectRatio,
        aspectRatio: o.aspectRatio,
        originalElement: this.element,
        _proportionallyResizeElements: [],
        _helper:
          o.helper || o.ghost || o.animate
            ? o.helper || "ui-resizable-helper"
            : null,
      });

      // Wrap the element if it cannot hold child nodes
      if (
        this.element[0].nodeName.match(
          /^(canvas|textarea|input|select|button|img)$/i
        )
      ) {
        this.element.wrap(
          $("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
            position: this.element.css("position"),
            width: this.element.outerWidth(),
            height: this.element.outerHeight(),
            top: this.element.css("top"),
            left: this.element.css("left"),
          })
        );

        this.element = this.element
          .parent()
          .data("ui-resizable", this.element.resizable("instance"));

        this.elementIsWrapper = true;

        margins = {
          marginTop: this.originalElement.css("marginTop"),
          marginRight: this.originalElement.css("marginRight"),
          marginBottom: this.originalElement.css("marginBottom"),
          marginLeft: this.originalElement.css("marginLeft"),
        };

        this.element.css(margins);
        this.originalElement.css("margin", 0);

        // support: Safari
        // Prevent Safari textarea resize
        this.originalResizeStyle = this.originalElement.css("resize");
        this.originalElement.css("resize", "none");

        this._proportionallyResizeElements.push(
          this.originalElement.css({
            position: "static",
            zoom: 1,
            display: "block",
          })
        );

        // Support: IE9
        // avoid IE jump (hard set the margin)
        this.originalElement.css(margins);

        this._proportionallyResize();
      }

      this._setupHandles();

      if (o.autoHide) {
        $(this.element)
          .on("mouseenter", function() {
            if (o.disabled) {
              return;
            }
            that._removeClass("ui-resizable-autohide");
            that._handles.show();
          })
          .on("mouseleave", function() {
            if (o.disabled) {
              return;
            }
            if (!that.resizing) {
              that._addClass("ui-resizable-autohide");
              that._handles.hide();
            }
          });
      }

      this._mouseInit();
    },

    _destroy: function() {
      this._mouseDestroy();

      var wrapper,
        _destroy = function(exp) {
          $(exp)
            .removeData("resizable")
            .removeData("ui-resizable")
            .off(".resizable")
            .find(".ui-resizable-handle")
            .remove();
        };

      // TODO: Unwrap at same DOM position
      if (this.elementIsWrapper) {
        _destroy(this.element);
        wrapper = this.element;
        this.originalElement
          .css({
            position: wrapper.css("position"),
            width: wrapper.outerWidth(),
            height: wrapper.outerHeight(),
            top: wrapper.css("top"),
            left: wrapper.css("left"),
          })
          .insertAfter(wrapper);
        wrapper.remove();
      }

      this.originalElement.css("resize", this.originalResizeStyle);
      _destroy(this.originalElement);

      return this;
    },

    _setOption: function(key, value) {
      this._super(key, value);

      switch (key) {
        case "handles":
          this._removeHandles();
          this._setupHandles();
          break;
        default:
          break;
      }
    },

    _setupHandles: function() {
      var o = this.options,
        handle,
        i,
        n,
        hname,
        axis,
        that = this;
      this.handles =
        o.handles ||
        (!$(".ui-resizable-handle", this.element).length
          ? "e,s,se"
          : {
              n: ".ui-resizable-n",
              e: ".ui-resizable-e",
              s: ".ui-resizable-s",
              w: ".ui-resizable-w",
              se: ".ui-resizable-se",
              sw: ".ui-resizable-sw",
              ne: ".ui-resizable-ne",
              nw: ".ui-resizable-nw",
            });

      this._handles = $();
      if (this.handles.constructor === String) {
        if (this.handles === "all") {
          this.handles = "n,e,s,w,se,sw,ne,nw";
        }

        n = this.handles.split(",");
        this.handles = {};

        for (i = 0; i < n.length; i++) {
          handle = $.trim(n[i]);
          hname = "ui-resizable-" + handle;
          axis = $("<div>");
          this._addClass(axis, "ui-resizable-handle " + hname);

          axis.css({ zIndex: o.zIndex });

          this.handles[handle] = ".ui-resizable-" + handle;
          this.element.append(axis);
        }
      }

      this._renderAxis = function(target) {
        var i, axis, padPos, padWrapper;

        target = target || this.element;

        for (i in this.handles) {
          if (this.handles[i].constructor === String) {
            this.handles[i] = this.element
              .children(this.handles[i])
              .first()
              .show();
          } else if (this.handles[i].jquery || this.handles[i].nodeType) {
            this.handles[i] = $(this.handles[i]);
            this._on(this.handles[i], { mousedown: that._mouseDown });
          }

          if (
            this.elementIsWrapper &&
            this.originalElement[0].nodeName.match(
              /^(textarea|input|select|button)$/i
            )
          ) {
            axis = $(this.handles[i], this.element);

            padWrapper = /sw|ne|nw|se|n|s/.test(i)
              ? axis.outerHeight()
              : axis.outerWidth();

            padPos = [
              "padding",
              /ne|nw|n/.test(i)
                ? "Top"
                : /se|sw|s/.test(i)
                ? "Bottom"
                : /^e$/.test(i)
                ? "Right"
                : "Left",
            ].join("");

            target.css(padPos, padWrapper);

            this._proportionallyResize();
          }

          this._handles = this._handles.add(this.handles[i]);
        }
      };

      // TODO: make renderAxis a prototype function
      this._renderAxis(this.element);

      this._handles = this._handles.add(
        this.element.find(".ui-resizable-handle")
      );
      this._handles.disableSelection();

      this._handles.on("mouseover", function() {
        if (!that.resizing) {
          if (this.className) {
            axis = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
          }
          that.axis = axis && axis[1] ? axis[1] : "se";
        }
      });

      if (o.autoHide) {
        this._handles.hide();
        this._addClass("ui-resizable-autohide");
      }
    },

    _removeHandles: function() {
      this._handles.remove();
    },

    _mouseCapture: function(event) {
      var i,
        handle,
        capture = false;

      for (i in this.handles) {
        handle = $(this.handles[i])[0];
        if (handle === event.target || $.contains(handle, event.target)) {
          capture = true;
        }
      }

      return !this.options.disabled && capture;
    },

    _mouseStart: function(event) {
      var curleft,
        curtop,
        cursor,
        o = this.options,
        el = this.element;

      this.resizing = true;

      this._renderProxy();

      curleft = this._num(this.helper.css("left"));
      curtop = this._num(this.helper.css("top"));

      if (o.containment) {
        curleft += $(o.containment).scrollLeft() || 0;
        curtop += $(o.containment).scrollTop() || 0;
      }

      this.offset = this.helper.offset();
      this.position = { left: curleft, top: curtop };

      this.size = this._helper
        ? {
            width: this.helper.width(),
            height: this.helper.height(),
          }
        : {
            width: el.width(),
            height: el.height(),
          };

      this.originalSize = this._helper
        ? {
            width: el.outerWidth(),
            height: el.outerHeight(),
          }
        : {
            width: el.width(),
            height: el.height(),
          };

      this.sizeDiff = {
        width: el.outerWidth() - el.width(),
        height: el.outerHeight() - el.height(),
      };

      this.originalPosition = { left: curleft, top: curtop };
      this.originalMousePosition = { left: event.pageX, top: event.pageY };

      this.aspectRatio =
        typeof o.aspectRatio === "number"
          ? o.aspectRatio
          : this.originalSize.width / this.originalSize.height || 1;

      cursor = $(".ui-resizable-" + this.axis).css("cursor");
      $("body").css(
        "cursor",
        cursor === "auto" ? this.axis + "-resize" : cursor
      );

      this._addClass("ui-resizable-resizing");
      this._propagate("start", event);
      return true;
    },

    _mouseDrag: function(event) {
      var data,
        props,
        smp = this.originalMousePosition,
        a = this.axis,
        dx = event.pageX - smp.left || 0,
        dy = event.pageY - smp.top || 0,
        trigger = this._change[a];

      this._updatePrevProperties();

      if (!trigger) {
        return false;
      }

      data = trigger.apply(this, [event, dx, dy]);

      this._updateVirtualBoundaries(event.shiftKey);
      if (this._aspectRatio || event.shiftKey) {
        data = this._updateRatio(data, event);
      }

      data = this._respectSize(data, event);

      this._updateCache(data);

      this._propagate("resize", event);

      props = this._applyChanges();

      if (!this._helper && this._proportionallyResizeElements.length) {
        this._proportionallyResize();
      }

      if (!$.isEmptyObject(props)) {
        this._updatePrevProperties();
        this._trigger("resize", event, this.ui());
        this._applyChanges();
      }

      return false;
    },

    _mouseStop: function(event) {
      this.resizing = false;
      var pr,
        ista,
        soffseth,
        soffsetw,
        s,
        left,
        top,
        o = this.options,
        that = this;

      if (this._helper) {
        pr = this._proportionallyResizeElements;
        ista = pr.length && /textarea/i.test(pr[0].nodeName);
        soffseth =
          ista && this._hasScroll(pr[0], "left") ? 0 : that.sizeDiff.height;
        soffsetw = ista ? 0 : that.sizeDiff.width;

        s = {
          width: that.helper.width() - soffsetw,
          height: that.helper.height() - soffseth,
        };
        left =
          parseFloat(that.element.css("left")) +
            (that.position.left - that.originalPosition.left) || null;
        top =
          parseFloat(that.element.css("top")) +
            (that.position.top - that.originalPosition.top) || null;

        if (!o.animate) {
          this.element.css($.extend(s, { top: top, left: left }));
        }

        that.helper.height(that.size.height);
        that.helper.width(that.size.width);

        if (this._helper && !o.animate) {
          this._proportionallyResize();
        }
      }

      $("body").css("cursor", "auto");

      this._removeClass("ui-resizable-resizing");

      this._propagate("stop", event);

      if (this._helper) {
        this.helper.remove();
      }

      return false;
    },

    _updatePrevProperties: function() {
      this.prevPosition = {
        top: this.position.top,
        left: this.position.left,
      };
      this.prevSize = {
        width: this.size.width,
        height: this.size.height,
      };
    },

    _applyChanges: function() {
      var props = {};

      if (this.position.top !== this.prevPosition.top) {
        props.top = this.position.top + "px";
      }
      if (this.position.left !== this.prevPosition.left) {
        props.left = this.position.left + "px";
      }
      if (this.size.width !== this.prevSize.width) {
        props.width = this.size.width + "px";
      }
      if (this.size.height !== this.prevSize.height) {
        props.height = this.size.height + "px";
      }

      this.helper.css(props);

      return props;
    },

    _updateVirtualBoundaries: function(forceAspectRatio) {
      var pMinWidth,
        pMaxWidth,
        pMinHeight,
        pMaxHeight,
        b,
        o = this.options;

      b = {
        minWidth: this._isNumber(o.minWidth) ? o.minWidth : 0,
        maxWidth: this._isNumber(o.maxWidth) ? o.maxWidth : Infinity,
        minHeight: this._isNumber(o.minHeight) ? o.minHeight : 0,
        maxHeight: this._isNumber(o.maxHeight) ? o.maxHeight : Infinity,
      };

      if (this._aspectRatio || forceAspectRatio) {
        pMinWidth = b.minHeight * this.aspectRatio;
        pMinHeight = b.minWidth / this.aspectRatio;
        pMaxWidth = b.maxHeight * this.aspectRatio;
        pMaxHeight = b.maxWidth / this.aspectRatio;

        if (pMinWidth > b.minWidth) {
          b.minWidth = pMinWidth;
        }
        if (pMinHeight > b.minHeight) {
          b.minHeight = pMinHeight;
        }
        if (pMaxWidth < b.maxWidth) {
          b.maxWidth = pMaxWidth;
        }
        if (pMaxHeight < b.maxHeight) {
          b.maxHeight = pMaxHeight;
        }
      }
      this._vBoundaries = b;
    },

    _updateCache: function(data) {
      this.offset = this.helper.offset();
      if (this._isNumber(data.left)) {
        this.position.left = data.left;
      }
      if (this._isNumber(data.top)) {
        this.position.top = data.top;
      }
      if (this._isNumber(data.height)) {
        this.size.height = data.height;
      }
      if (this._isNumber(data.width)) {
        this.size.width = data.width;
      }
    },

    _updateRatio: function(data) {
      var cpos = this.position,
        csize = this.size,
        a = this.axis;

      if (this._isNumber(data.height)) {
        data.width = data.height * this.aspectRatio;
      } else if (this._isNumber(data.width)) {
        data.height = data.width / this.aspectRatio;
      }

      if (a === "sw") {
        data.left = cpos.left + (csize.width - data.width);
        data.top = null;
      }
      if (a === "nw") {
        data.top = cpos.top + (csize.height - data.height);
        data.left = cpos.left + (csize.width - data.width);
      }

      return data;
    },

    _respectSize: function(data) {
      var o = this._vBoundaries,
        a = this.axis,
        ismaxw =
          this._isNumber(data.width) && o.maxWidth && o.maxWidth < data.width,
        ismaxh =
          this._isNumber(data.height) &&
          o.maxHeight &&
          o.maxHeight < data.height,
        isminw =
          this._isNumber(data.width) && o.minWidth && o.minWidth > data.width,
        isminh =
          this._isNumber(data.height) &&
          o.minHeight &&
          o.minHeight > data.height,
        dw = this.originalPosition.left + this.originalSize.width,
        dh = this.originalPosition.top + this.originalSize.height,
        cw = /sw|nw|w/.test(a),
        ch = /nw|ne|n/.test(a);
      if (isminw) {
        data.width = o.minWidth;
      }
      if (isminh) {
        data.height = o.minHeight;
      }
      if (ismaxw) {
        data.width = o.maxWidth;
      }
      if (ismaxh) {
        data.height = o.maxHeight;
      }

      if (isminw && cw) {
        data.left = dw - o.minWidth;
      }
      if (ismaxw && cw) {
        data.left = dw - o.maxWidth;
      }
      if (isminh && ch) {
        data.top = dh - o.minHeight;
      }
      if (ismaxh && ch) {
        data.top = dh - o.maxHeight;
      }

      // Fixing jump error on top/left - bug #2330
      if (!data.width && !data.height && !data.left && data.top) {
        data.top = null;
      } else if (!data.width && !data.height && !data.top && data.left) {
        data.left = null;
      }

      return data;
    },

    _getPaddingPlusBorderDimensions: function(element) {
      var i = 0,
        widths = [],
        borders = [
          element.css("borderTopWidth"),
          element.css("borderRightWidth"),
          element.css("borderBottomWidth"),
          element.css("borderLeftWidth"),
        ],
        paddings = [
          element.css("paddingTop"),
          element.css("paddingRight"),
          element.css("paddingBottom"),
          element.css("paddingLeft"),
        ];

      for (; i < 4; i++) {
        widths[i] = parseFloat(borders[i]) || 0;
        widths[i] += parseFloat(paddings[i]) || 0;
      }

      return {
        height: widths[0] + widths[2],
        width: widths[1] + widths[3],
      };
    },

    _proportionallyResize: function() {
      if (!this._proportionallyResizeElements.length) {
        return;
      }

      var prel,
        i = 0,
        element = this.helper || this.element;

      for (; i < this._proportionallyResizeElements.length; i++) {
        prel = this._proportionallyResizeElements[i];

        // TODO: Seems like a bug to cache this.outerDimensions
        // considering that we are in a loop.
        if (!this.outerDimensions) {
          this.outerDimensions = this._getPaddingPlusBorderDimensions(prel);
        }

        prel.css({
          height: element.height() - this.outerDimensions.height || 0,
          width: element.width() - this.outerDimensions.width || 0,
        });
      }
    },

    _renderProxy: function() {
      var el = this.element,
        o = this.options;
      this.elementOffset = el.offset();

      if (this._helper) {
        this.helper = this.helper || $("<div style='overflow:hidden;'></div>");

        this._addClass(this.helper, this._helper);
        this.helper.css({
          width: this.element.outerWidth(),
          height: this.element.outerHeight(),
          position: "absolute",
          left: this.elementOffset.left + "px",
          top: this.elementOffset.top + "px",
          zIndex: ++o.zIndex, //TODO: Don't modify option
        });

        this.helper.appendTo("body").disableSelection();
      } else {
        this.helper = this.element;
      }
    },

    _change: {
      e: function(event, dx) {
        return { width: this.originalSize.width + dx };
      },
      w: function(event, dx) {
        var cs = this.originalSize,
          sp = this.originalPosition;
        return { left: sp.left + dx, width: cs.width - dx };
      },
      n: function(event, dx, dy) {
        var cs = this.originalSize,
          sp = this.originalPosition;
        return { top: sp.top + dy, height: cs.height - dy };
      },
      s: function(event, dx, dy) {
        return { height: this.originalSize.height + dy };
      },
      se: function(event, dx, dy) {
        return $.extend(
          this._change.s.apply(this, arguments),
          this._change.e.apply(this, [event, dx, dy])
        );
      },
      sw: function(event, dx, dy) {
        return $.extend(
          this._change.s.apply(this, arguments),
          this._change.w.apply(this, [event, dx, dy])
        );
      },
      ne: function(event, dx, dy) {
        return $.extend(
          this._change.n.apply(this, arguments),
          this._change.e.apply(this, [event, dx, dy])
        );
      },
      nw: function(event, dx, dy) {
        return $.extend(
          this._change.n.apply(this, arguments),
          this._change.w.apply(this, [event, dx, dy])
        );
      },
    },

    _propagate: function(n, event) {
      $.ui.plugin.call(this, n, [event, this.ui()]);
      n !== "resize" && this._trigger(n, event, this.ui());
    },

    plugins: {},

    ui: function() {
      return {
        originalElement: this.originalElement,
        element: this.element,
        helper: this.helper,
        position: this.position,
        size: this.size,
        originalSize: this.originalSize,
        originalPosition: this.originalPosition,
      };
    },
  });
  ///---------------------------------------------------
  /*
   * Resizable Extensions
   */

  $.ui.plugin.add("resizable", "animate", {
    stop: function(event) {
      var that = $(this).resizable("instance"),
        o = that.options,
        pr = that._proportionallyResizeElements,
        ista = pr.length && /textarea/i.test(pr[0].nodeName),
        soffseth =
          ista && that._hasScroll(pr[0], "left") ? 0 : that.sizeDiff.height,
        soffsetw = ista ? 0 : that.sizeDiff.width,
        style = {
          width: that.size.width - soffsetw,
          height: that.size.height - soffseth,
        },
        left =
          parseFloat(that.element.css("left")) +
            (that.position.left - that.originalPosition.left) || null,
        top =
          parseFloat(that.element.css("top")) +
            (that.position.top - that.originalPosition.top) || null;

      that.element.animate(
        $.extend(style, top && left ? { top: top, left: left } : {}),
        {
          duration: o.animateDuration,
          easing: o.animateEasing,
          step: function() {
            var data = {
              width: parseFloat(that.element.css("width")),
              height: parseFloat(that.element.css("height")),
              top: parseFloat(that.element.css("top")),
              left: parseFloat(that.element.css("left")),
            };

            if (pr && pr.length) {
              $(pr[0]).css({ width: data.width, height: data.height });
            }

            // Propagating resize, and updating values for each animation step
            that._updateCache(data);
            that._propagate("resize", event);
          },
        }
      );
    },
  });

  $.ui.plugin.add("resizable", "containment", {
    start: function() {
      var element,
        p,
        co,
        ch,
        cw,
        width,
        height,
        that = $(this).resizable("instance"),
        o = that.options,
        el = that.element,
        oc = o.containment,
        ce =
          oc instanceof $
            ? oc.get(0)
            : /parent/.test(oc)
            ? el.parent().get(0)
            : oc;

      if (!ce) {
        return;
      }

      that.containerElement = $(ce);

      if (/document/.test(oc) || oc === document) {
        that.containerOffset = {
          left: 0,
          top: 0,
        };
        that.containerPosition = {
          left: 0,
          top: 0,
        };

        that.parentData = {
          element: $(document),
          left: 0,
          top: 0,
          width: $(document).width(),
          height: $(document).height() || document.body.parentNode.scrollHeight,
        };
      } else {
        element = $(ce);
        p = [];
        $(["Top", "Right", "Left", "Bottom"]).each(function(i, name) {
          p[i] = that._num(element.css("padding" + name));
        });

        that.containerOffset = element.offset();
        that.containerPosition = element.position();
        that.containerSize = {
          height: element.innerHeight() - p[3],
          width: element.innerWidth() - p[1],
        };

        co = that.containerOffset;
        ch = that.containerSize.height;
        cw = that.containerSize.width;
        width = that._hasScroll(ce, "left") ? ce.scrollWidth : cw;
        height = that._hasScroll(ce) ? ce.scrollHeight : ch;

        that.parentData = {
          element: ce,
          left: co.left,
          top: co.top,
          width: width,
          height: height,
        };
      }
    },

    resize: function(event) {
      var woset,
        hoset,
        isParent,
        isOffsetRelative,
        that = $(this).resizable("instance"),
        o = that.options,
        co = that.containerOffset,
        cp = that.position,
        pRatio = that._aspectRatio || event.shiftKey,
        cop = {
          top: 0,
          left: 0,
        },
        ce = that.containerElement,
        continueResize = true;

      if (ce[0] !== document && /static/.test(ce.css("position"))) {
        cop = co;
      }

      if (cp.left < (that._helper ? co.left : 0)) {
        that.size.width =
          that.size.width +
          (that._helper
            ? that.position.left - co.left
            : that.position.left - cop.left);

        if (pRatio) {
          that.size.height = that.size.width / that.aspectRatio;
          continueResize = false;
        }
        that.position.left = o.helper ? co.left : 0;
      }

      if (cp.top < (that._helper ? co.top : 0)) {
        that.size.height =
          that.size.height +
          (that._helper ? that.position.top - co.top : that.position.top);

        if (pRatio) {
          that.size.width = that.size.height * that.aspectRatio;
          continueResize = false;
        }
        that.position.top = that._helper ? co.top : 0;
      }

      isParent = that.containerElement.get(0) === that.element.parent().get(0);
      isOffsetRelative = /relative|absolute/.test(
        that.containerElement.css("position")
      );

      if (isParent && isOffsetRelative) {
        that.offset.left = that.parentData.left + that.position.left;
        that.offset.top = that.parentData.top + that.position.top;
      } else {
        that.offset.left = that.element.offset().left;
        that.offset.top = that.element.offset().top;
      }

      woset = Math.abs(
        that.sizeDiff.width +
          (that._helper
            ? that.offset.left - cop.left
            : that.offset.left - co.left)
      );

      hoset = Math.abs(
        that.sizeDiff.height +
          (that._helper ? that.offset.top - cop.top : that.offset.top - co.top)
      );

      if (woset + that.size.width >= that.parentData.width) {
        that.size.width = that.parentData.width - woset;
        if (pRatio) {
          that.size.height = that.size.width / that.aspectRatio;
          continueResize = false;
        }
      }

      if (hoset + that.size.height >= that.parentData.height) {
        that.size.height = that.parentData.height - hoset;
        if (pRatio) {
          that.size.width = that.size.height * that.aspectRatio;
          continueResize = false;
        }
      }

      if (!continueResize) {
        that.position.left = that.prevPosition.left;
        that.position.top = that.prevPosition.top;
        that.size.width = that.prevSize.width;
        that.size.height = that.prevSize.height;
      }
    },

    stop: function() {
      var that = $(this).resizable("instance"),
        o = that.options,
        co = that.containerOffset,
        cop = that.containerPosition,
        ce = that.containerElement,
        helper = $(that.helper),
        ho = helper.offset(),
        w = helper.outerWidth() - that.sizeDiff.width,
        h = helper.outerHeight() - that.sizeDiff.height;

      if (that._helper && !o.animate && /relative/.test(ce.css("position"))) {
        $(this).css({
          left: ho.left - cop.left - co.left,
          width: w,
          height: h,
        });
      }

      if (that._helper && !o.animate && /static/.test(ce.css("position"))) {
        $(this).css({
          left: ho.left - cop.left - co.left,
          width: w,
          height: h,
        });
      }
    },
  });

  $.widget("ui.dialog", {
    version: "1.12.1",
    options: {
      appendTo: "body",
      autoOpen: true,
      buttons: [],
      classes: {
        "ui-dialog": "ui-corner-all",
        "ui-dialog-titlebar": "ui-corner-all",
      },
      closeOnEscape: true,
      closeText: "Close",
      draggable: true,
      hide: null,
      height: "auto",
      maxHeight: null,
      maxWidth: null,
      minHeight: 150,
      minWidth: 150,
      modal: false,
      position: {
        my: "center",
        at: "center",
        of: window,
        collision: "fit",

        // Ensure the titlebar is always visible
        using: function(pos) {
          var topOffset = $(this)
            .css(pos)
            .offset().top;
          if (topOffset < 0) {
            $(this).css("top", pos.top - topOffset);
          }
        },
      },
      resizable: true,
      show: null,
      title: null,
      width: 300,

      // Callbacks
      beforeClose: null,
      close: null,
      drag: null,
      dragStart: null,
      dragStop: null,
      focus: null,
      open: null,
      resize: null,
      resizeStart: null,
      resizeStop: null,
    },

    sizeRelatedOptions: {
      buttons: true,
      height: true,
      maxHeight: true,
      maxWidth: true,
      minHeight: true,
      minWidth: true,
      width: true,
    },

    resizableRelatedOptions: {
      maxHeight: true,
      maxWidth: true,
      minHeight: true,
      minWidth: true,
    },

    _create: function() {
      this.originalCss = {
        display: this.element[0].style.display,
        width: this.element[0].style.width,
        minHeight: this.element[0].style.minHeight,
        maxHeight: this.element[0].style.maxHeight,
        height: this.element[0].style.height,
      };
      this.originalPosition = {
        parent: this.element.parent(),
        index: this.element
          .parent()
          .children()
          .index(this.element),
      };
      this.originalTitle = this.element.attr("title");
      if (this.options.title == null && this.originalTitle != null) {
        this.options.title = this.originalTitle;
      }

      // Dialogs can't be disabled
      if (this.options.disabled) {
        this.options.disabled = false;
      }

      this._createWrapper();

      this.element
        .show()
        .removeAttr("title")
        .appendTo(this.uiDialog);

      this._addClass("ui-dialog-content", "ui-widget-content");

      this._createTitlebar();
      this._createButtonPane();

      if (this.options.draggable && $.fn.draggable) {
        this._makeDraggable();
      }
      if (this.options.resizable && $.fn.resizable) {
        this._makeResizable();
      }

      this._isOpen = false;

      this._trackFocus();
    },

    _init: function() {
      if (this.options.autoOpen) {
        this.open();
      }
    },

    _appendTo: function() {
      var element = this.options.appendTo;
      if (element && (element.jquery || element.nodeType)) {
        return $(element);
      }
      return this.document.find(element || "body").eq(0);
    },

    _destroy: function() {
      var next,
        originalPosition = this.originalPosition;

      this._untrackInstance();
      this._destroyOverlay();

      this.element
        .removeUniqueId()
        .css(this.originalCss)

        // Without detaching first, the following becomes really slow
        .detach();

      this.uiDialog.remove();

      if (this.originalTitle) {
        this.element.attr("title", this.originalTitle);
      }

      next = originalPosition.parent.children().eq(originalPosition.index);

      // Don't try to place the dialog next to itself (#8613)
      if (next.length && next[0] !== this.element[0]) {
        next.before(this.element);
      } else {
        originalPosition.parent.append(this.element);
      }
    },

    widget: function() {
      return this.uiDialog;
    },

    disable: $.noop,
    enable: $.noop,

    close: function(event) {
      var that = this;

      if (!this._isOpen || this._trigger("beforeClose", event) === false) {
        return;
      }

      this._isOpen = false;
      this._focusedElement = null;
      this._destroyOverlay();
      this._untrackInstance();

      if (!this.opener.filter(":focusable").trigger("focus").length) {
        // Hiding a focused element doesn't trigger blur in WebKit
        // so in case we have nothing to focus on, explicitly blur the active element
        // https://bugs.webkit.org/show_bug.cgi?id=47182
        $.ui.safeBlur($.ui.safeActiveElement(this.document[0]));
      }

      this._hide(this.uiDialog, this.options.hide, function() {
        that._trigger("close", event);
      });
    },

    isOpen: function() {
      return this._isOpen;
    },

    moveToTop: function() {
      this._moveToTop();
    },

    _moveToTop: function(event, silent) {
      var moved = false,
        zIndices = this.uiDialog
          .siblings(".ui-front:visible")
          .map(function() {
            return +$(this).css("z-index");
          })
          .get(),
        zIndexMax = Math.max.apply(null, zIndices);

      if (zIndexMax >= +this.uiDialog.css("z-index")) {
        this.uiDialog.css("z-index", zIndexMax + 1);
        moved = true;
      }

      if (moved && !silent) {
        this._trigger("focus", event);
      }
      return moved;
    },

    open: function() {
      var that = this;
      if (this._isOpen) {
        if (this._moveToTop()) {
          this._focusTabbable();
        }
        return;
      }

      this._isOpen = true;
      this.opener = $($.ui.safeActiveElement(this.document[0]));

      this._size();
      this._position();
      this._createOverlay();
      this._moveToTop(null, true);

      // Ensure the overlay is moved to the top with the dialog, but only when
      // opening. The overlay shouldn't move after the dialog is open so that
      // modeless dialogs opened after the modal dialog stack properly.
      if (this.overlay) {
        this.overlay.css("z-index", this.uiDialog.css("z-index") - 1);
      }

      this._show(this.uiDialog, this.options.show, function() {
        that._focusTabbable();
        that._trigger("focus");
      });

      // Track the dialog immediately upon openening in case a focus event
      // somehow occurs outside of the dialog before an element inside the
      // dialog is focused (#10152)
      this._makeFocusTarget();

      this._trigger("open");
    },

    _focusTabbable: function() {
      // Set focus to the first match:
      // 1. An element that was focused previously
      // 2. First element inside the dialog matching [autofocus]
      // 3. Tabbable element inside the content element
      // 4. Tabbable element inside the buttonpane
      // 5. The close button
      // 6. The dialog itself
      var hasFocus = this._focusedElement;
      if (!hasFocus) {
        hasFocus = this.element.find("[autofocus]");
      }
      if (!hasFocus.length) {
        hasFocus = this.element.find(":tabbable");
      }
      if (!hasFocus.length) {
        hasFocus = this.uiDialogButtonPane.find(":tabbable");
      }
      if (!hasFocus.length) {
        hasFocus = this.uiDialogTitlebarClose.filter(":tabbable");
      }
      if (!hasFocus.length) {
        hasFocus = this.uiDialog;
      }
      hasFocus.eq(0).trigger("focus");
    },

    _keepFocus: function(event) {
      function checkFocus() {
        var activeElement = $.ui.safeActiveElement(this.document[0]),
          isActive =
            this.uiDialog[0] === activeElement ||
            $.contains(this.uiDialog[0], activeElement);
        if (!isActive) {
          this._focusTabbable();
        }
      }
      event.preventDefault();
      checkFocus.call(this);

      // support: IE
      // IE <= 8 doesn't prevent moving focus even with event.preventDefault()
      // so we check again later
      this._delay(checkFocus);
    },

    _createWrapper: function() {
      this.uiDialog = $("<div>")
        .hide()
        .attr({
          // Setting tabIndex makes the div focusable
          tabIndex: -1,
          role: "dialog",
        })
        .appendTo(this._appendTo());

      this._addClass(
        this.uiDialog,
        "ui-dialog",
        "ui-widget ui-widget-content ui-front"
      );
      this._on(this.uiDialog, {
        keydown: function(event) {
          if (
            this.options.closeOnEscape &&
            !event.isDefaultPrevented() &&
            event.keyCode &&
            event.keyCode === $.ui.keyCode.ESCAPE
          ) {
            event.preventDefault();
            this.close(event);
            return;
          }

          // Prevent tabbing out of dialogs
          if (
            event.keyCode !== $.ui.keyCode.TAB ||
            event.isDefaultPrevented()
          ) {
            return;
          }
          var tabbables = this.uiDialog.find(":tabbable"),
            first = tabbables.filter(":first"),
            last = tabbables.filter(":last");

          if (
            (event.target === last[0] || event.target === this.uiDialog[0]) &&
            !event.shiftKey
          ) {
            this._delay(function() {
              first.trigger("focus");
            });
            event.preventDefault();
          } else if (
            (event.target === first[0] || event.target === this.uiDialog[0]) &&
            event.shiftKey
          ) {
            this._delay(function() {
              last.trigger("focus");
            });
            event.preventDefault();
          }
        },
        mousedown: function(event) {
          if (this._moveToTop(event)) {
            this._focusTabbable();
          }
        },
      });

      // We assume that any existing aria-describedby attribute means
      // that the dialog content is marked up properly
      // otherwise we brute force the content as the description
      if (!this.element.find("[aria-describedby]").length) {
        this.uiDialog.attr({
          "aria-describedby": this.element.uniqueId().attr("id"),
        });
      }
    },

    _createTitlebar: function() {
      var uiDialogTitle;

      this.uiDialogTitlebar = $("<div>");
      this._addClass(
        this.uiDialogTitlebar,
        "ui-dialog-titlebar",
        "ui-widget-header ui-helper-clearfix"
      );
      this._on(this.uiDialogTitlebar, {
        mousedown: function(event) {
          // Don't prevent click on close button (#8838)
          // Focusing a dialog that is partially scrolled out of view
          // causes the browser to scroll it into view, preventing the click event
          if (!$(event.target).closest(".ui-dialog-titlebar-close")) {
            // Dialog isn't getting focus when dragging (#8063)
            this.uiDialog.trigger("focus");
          }
        },
      });

      // Support: IE
      // Use type="button" to prevent enter keypresses in textboxes from closing the
      // dialog in IE (#9312)
      this.uiDialogTitlebarClose = $("<button type='button'></button>")
        .button({
          label: $("<a>")
            .text(this.options.closeText)
            .html(),
          icon: "ui-icon-closethick",
          showLabel: false,
        })
        .appendTo(this.uiDialogTitlebar);

      this._addClass(this.uiDialogTitlebarClose, "ui-dialog-titlebar-close");
      this._on(this.uiDialogTitlebarClose, {
        click: function(event) {
          event.preventDefault();
          this.close(event);
        },
      });

      uiDialogTitle = $("<span>")
        .uniqueId()
        .prependTo(this.uiDialogTitlebar);
      this._addClass(uiDialogTitle, "ui-dialog-title");
      this._title(uiDialogTitle);

      this.uiDialogTitlebar.prependTo(this.uiDialog);

      this.uiDialog.attr({
        "aria-labelledby": uiDialogTitle.attr("id"),
      });
    },

    _title: function(title) {
      if (this.options.title) {
        title.text(this.options.title);
      } else {
        title.html("&#160;");
      }
    },

    _createButtonPane: function() {
      this.uiDialogButtonPane = $("<div>");
      this._addClass(
        this.uiDialogButtonPane,
        "ui-dialog-buttonpane",
        "ui-widget-content ui-helper-clearfix"
      );

      this.uiButtonSet = $("<div>").appendTo(this.uiDialogButtonPane);
      this._addClass(this.uiButtonSet, "ui-dialog-buttonset");

      this._createButtons();
    },

    _createButtons: function() {
      var that = this,
        buttons = this.options.buttons;

      // If we already have a button pane, remove it
      this.uiDialogButtonPane.remove();
      this.uiButtonSet.empty();

      if ($.isEmptyObject(buttons) || ($.isArray(buttons) && !buttons.length)) {
        this._removeClass(this.uiDialog, "ui-dialog-buttons");
        return;
      }

      $.each(buttons, function(name, props) {
        var click, buttonOptions;
        props = $.isFunction(props) ? { click: props, text: name } : props;

        // Default to a non-submitting button
        props = $.extend({ type: "button" }, props);

        // Change the context for the click callback to be the main element
        click = props.click;
        buttonOptions = {
          icon: props.icon,
          iconPosition: props.iconPosition,
          showLabel: props.showLabel,

          // Deprecated options
          icons: props.icons,
          text: props.text,
        };

        delete props.click;
        delete props.icon;
        delete props.iconPosition;
        delete props.showLabel;

        // Deprecated options
        delete props.icons;
        if (typeof props.text === "boolean") {
          delete props.text;
        }

        $("<button></button>", props)
          .button(buttonOptions)
          .appendTo(that.uiButtonSet)
          .on("click", function() {
            click.apply(that.element[0], arguments);
          });
      });
      this._addClass(this.uiDialog, "ui-dialog-buttons");
      this.uiDialogButtonPane.appendTo(this.uiDialog);
    },

    _makeDraggable: function() {
      var that = this,
        options = this.options;

      function filteredUi(ui) {
        return {
          position: ui.position,
          offset: ui.offset,
        };
      }

      this.uiDialog.draggable({
        cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
        handle: ".ui-dialog-titlebar",
        containment: "document",
        start: function(event, ui) {
          that._addClass($(this), "ui-dialog-dragging");
          that._blockFrames();
          that._trigger("dragStart", event, filteredUi(ui));
        },
        drag: function(event, ui) {
          that._trigger("drag", event, filteredUi(ui));
        },
        stop: function(event, ui) {
          var left = ui.offset.left - that.document.scrollLeft(),
            top = ui.offset.top - that.document.scrollTop();

          options.position = {
            my: "left top",
            at:
              "left" +
              (left >= 0 ? "+" : "") +
              left +
              " " +
              "top" +
              (top >= 0 ? "+" : "") +
              top,
            of: that.window,
          };
          that._removeClass($(this), "ui-dialog-dragging");
          that._unblockFrames();
          that._trigger("dragStop", event, filteredUi(ui));
        },
      });
    },

    _makeResizable: function() {
      var that = this,
        options = this.options,
        handles = options.resizable,
        // .ui-resizable has position: relative defined in the stylesheet
        // but dialogs have to use absolute or fixed positioning
        position = this.uiDialog.css("position"),
        resizeHandles =
          typeof handles === "string" ? handles : "n,e,s,w,se,sw,ne,nw";

      function filteredUi(ui) {
        return {
          originalPosition: ui.originalPosition,
          originalSize: ui.originalSize,
          position: ui.position,
          size: ui.size,
        };
      }

      this.uiDialog
        .resizable({
          cancel: ".ui-dialog-content",
          containment: "document",
          alsoResize: this.element,
          maxWidth: options.maxWidth,
          maxHeight: options.maxHeight,
          minWidth: options.minWidth,
          minHeight: this._minHeight(),
          handles: resizeHandles,
          start: function(event, ui) {
            that._addClass($(this), "ui-dialog-resizing");
            that._blockFrames();
            that._trigger("resizeStart", event, filteredUi(ui));
          },
          resize: function(event, ui) {
            that._trigger("resize", event, filteredUi(ui));
          },
          stop: function(event, ui) {
            var offset = that.uiDialog.offset(),
              left = offset.left - that.document.scrollLeft(),
              top = offset.top - that.document.scrollTop();

            options.height = that.uiDialog.height();
            options.width = that.uiDialog.width();
            options.position = {
              my: "left top",
              at:
                "left" +
                (left >= 0 ? "+" : "") +
                left +
                " " +
                "top" +
                (top >= 0 ? "+" : "") +
                top,
              of: that.window,
            };
            that._removeClass($(this), "ui-dialog-resizing");
            that._unblockFrames();
            that._trigger("resizeStop", event, filteredUi(ui));
          },
        })
        .css("position", position);
    },

    _trackFocus: function() {
      this._on(this.widget(), {
        focusin: function(event) {
          this._makeFocusTarget();
          this._focusedElement = $(event.target);
        },
      });
    },

    _makeFocusTarget: function() {
      this._untrackInstance();
      this._trackingInstances().unshift(this);
    },

    _untrackInstance: function() {
      var instances = this._trackingInstances(),
        exists = $.inArray(this, instances);
      if (exists !== -1) {
        instances.splice(exists, 1);
      }
    },

    _trackingInstances: function() {
      var instances = this.document.data("ui-dialog-instances");
      if (!instances) {
        instances = [];
        this.document.data("ui-dialog-instances", instances);
      }
      return instances;
    },

    _minHeight: function() {
      var options = this.options;

      return options.height === "auto"
        ? options.minHeight
        : Math.min(options.minHeight, options.height);
    },

    _position: function() {
      // Need to show the dialog to get the actual offset in the position plugin
      var isVisible = this.uiDialog.is(":visible");
      if (!isVisible) {
        this.uiDialog.show();
      }
      this.uiDialog.position(this.options.position);
      if (!isVisible) {
        this.uiDialog.hide();
      }
    },

    _setOptions: function(options) {
      var that = this,
        resize = false,
        resizableOptions = {};

      $.each(options, function(key, value) {
        that._setOption(key, value);

        if (key in that.sizeRelatedOptions) {
          resize = true;
        }
        if (key in that.resizableRelatedOptions) {
          resizableOptions[key] = value;
        }
      });

      if (resize) {
        this._size();
        this._position();
      }
      if (this.uiDialog.is(":data(ui-resizable)")) {
        this.uiDialog.resizable("option", resizableOptions);
      }
    },

    _setOption: function(key, value) {
      var isDraggable,
        isResizable,
        uiDialog = this.uiDialog;

      if (key === "disabled") {
        return;
      }

      this._super(key, value);

      if (key === "appendTo") {
        this.uiDialog.appendTo(this._appendTo());
      }

      if (key === "buttons") {
        this._createButtons();
      }

      if (key === "closeText") {
        this.uiDialogTitlebarClose.button({
          // Ensure that we always pass a string
          label: $("<a>")
            .text("" + this.options.closeText)
            .html(),
        });
      }

      if (key === "draggable") {
        isDraggable = uiDialog.is(":data(ui-draggable)");
        if (isDraggable && !value) {
          uiDialog.draggable("destroy");
        }

        if (!isDraggable && value) {
          this._makeDraggable();
        }
      }

      if (key === "position") {
        this._position();
      }

      if (key === "resizable") {
        // currently resizable, becoming non-resizable
        isResizable = uiDialog.is(":data(ui-resizable)");
        if (isResizable && !value) {
          uiDialog.resizable("destroy");
        }

        // Currently resizable, changing handles
        if (isResizable && typeof value === "string") {
          uiDialog.resizable("option", "handles", value);
        }

        // Currently non-resizable, becoming resizable
        if (!isResizable && value !== false) {
          this._makeResizable();
        }
      }

      if (key === "title") {
        this._title(this.uiDialogTitlebar.find(".ui-dialog-title"));
      }
    },

    _size: function() {
      // If the user has resized the dialog, the .ui-dialog and .ui-dialog-content
      // divs will both have width and height set, so we need to reset them
      var nonContentHeight,
        minContentHeight,
        maxContentHeight,
        options = this.options;

      // Reset content sizing
      this.element.show().css({
        width: "auto",
        minHeight: 0,
        maxHeight: "none",
        height: 0,
      });

      if (options.minWidth > options.width) {
        options.width = options.minWidth;
      }

      // Reset wrapper sizing
      // determine the height of all the non-content elements
      nonContentHeight = this.uiDialog
        .css({
          height: "auto",
          width: options.width,
        })
        .outerHeight();
      minContentHeight = Math.max(0, options.minHeight - nonContentHeight);
      maxContentHeight =
        typeof options.maxHeight === "number"
          ? Math.max(0, options.maxHeight - nonContentHeight)
          : "none";

      if (options.height === "auto") {
        this.element.css({
          minHeight: minContentHeight,
          maxHeight: maxContentHeight,
          height: "auto",
        });
      } else {
        this.element.height(Math.max(0, options.height - nonContentHeight));
      }

      if (this.uiDialog.is(":data(ui-resizable)")) {
        this.uiDialog.resizable("option", "minHeight", this._minHeight());
      }
    },

    _blockFrames: function() {
      this.iframeBlocks = this.document.find("iframe").map(function() {
        var iframe = $(this);

        return $("<div>")
          .css({
            position: "absolute",
            width: iframe.outerWidth(),
            height: iframe.outerHeight(),
          })
          .appendTo(iframe.parent())
          .offset(iframe.offset())[0];
      });
    },

    _unblockFrames: function() {
      if (this.iframeBlocks) {
        this.iframeBlocks.remove();
        delete this.iframeBlocks;
      }
    },

    _allowInteraction: function(event) {
      if ($(event.target).closest(".ui-dialog").length) {
        return true;
      }

      // TODO: Remove hack when datepicker implements
      // the .ui-front logic (#8989)
      return !!$(event.target).closest(".ui-datepicker").length;
    },

    _createOverlay: function() {
      if (!this.options.modal) {
        return;
      }

      // We use a delay in case the overlay is created from an
      // event that we're going to be cancelling (#2804)
      var isOpening = true;
      this._delay(function() {
        isOpening = false;
      });

      if (!this.document.data("ui-dialog-overlays")) {
        // Prevent use of anchors and inputs
        // Using _on() for an event handler shared across many instances is
        // safe because the dialogs stack and must be closed in reverse order
        this._on(this.document, {
          focusin: function(event) {
            if (isOpening) {
              return;
            }

            if (!this._allowInteraction(event)) {
              event.preventDefault();
              this._trackingInstances()[0]._focusTabbable();
            }
          },
        });
      }

      this.overlay = $("<div>").appendTo(this._appendTo());

      this._addClass(this.overlay, null, "ui-widget-overlay ui-front");
      this._on(this.overlay, {
        mousedown: "_keepFocus",
      });
      this.document.data(
        "ui-dialog-overlays",
        (this.document.data("ui-dialog-overlays") || 0) + 1
      );
    },

    _destroyOverlay: function() {
      if (!this.options.modal) {
        return;
      }

      if (this.overlay) {
        var overlays = this.document.data("ui-dialog-overlays") - 1;

        if (!overlays) {
          this._off(this.document, "focusin");
          this.document.removeData("ui-dialog-overlays");
        } else {
          this.document.data("ui-dialog-overlays", overlays);
        }

        this.overlay.remove();
        this.overlay = null;
      }
    },
  });

  // DEPRECATED
  // TODO: switch return back to widget declaration at top of file when this is removed
  if ($.uiBackCompat !== false) {
    // Backcompat for dialogClass option
    $.widget("ui.dialog", $.ui.dialog, {
      options: {
        dialogClass: "",
      },
      _createWrapper: function() {
        this._super();
        this.uiDialog.addClass(this.options.dialogClass);
      },
      _setOption: function(key, value) {
        if (key === "dialogClass") {
          this.uiDialog.removeClass(this.options.dialogClass).addClass(value);
        }
        this._superApply(arguments);
      },
    });
  }
  var widgetsDialog = $.ui.dialog;
});
