
/**
 * Owl Carousel v2.2.1
 * Copyright 2013-2017 David Deutsch
 * Licensed under  ()
 */
! function (a, b, c, d) {
    function e(b, c) {
        this.settings = null, this.options = a.extend({}, e.Defaults, c), this.$element = a(b), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
            time: null,
            target: null,
            pointer: null,
            stage: {
                start: null,
                current: null
            },
            direction: null
        }, this._states = {
            current: {},
            tags: {
                initializing: ["busy"],
                animating: ["busy"],
                dragging: ["interacting"]
            }
        }, a.each(["onResize", "onThrottledResize"], a.proxy(function (b, c) {
            this._handlers[c] = a.proxy(this[c], this)
        }, this)), a.each(e.Plugins, a.proxy(function (a, b) {
            this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this)
        }, this)), a.each(e.Workers, a.proxy(function (b, c) {
            this._pipe.push({
                filter: c.filter,
                run: a.proxy(c.run, this)
            })
        }, this)), this.setup(), this.initialize()
    }
    e.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        rewind: !1,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: b,
        fallbackEasing: "swing",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        refreshClass: "owl-refresh",
        loadedClass: "owl-loaded",
        loadingClass: "owl-loading",
        rtlClass: "owl-rtl",
        responsiveClass: "owl-responsive",
        dragClass: "owl-drag",
        itemClass: "owl-item",
        stageClass: "owl-stage",
        stageOuterClass: "owl-stage-outer",
        grabClass: "owl-grab"
    }, e.Width = {
        Default: "default",
        Inner: "inner",
        Outer: "outer"
    }, e.Type = {
        Event: "event",
        State: "state"
    }, e.Plugins = {}, e.Workers = [{
        filter: ["width", "settings"],
        run: function () {
            this._width = this.$element.width()
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function (a) {
            a.current = this._items && this._items[this.relative(this._current)]
        }
    }, {
        filter: ["items", "settings"],
        run: function () {
            this.$stage.children(".cloned").remove()
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function (a) {
            var b = this.settings.margin || "",
                c = !this.settings.autoWidth,
                d = this.settings.rtl,
                e = {
                    width: "auto",
                    "margin-left": d ? b : "",
                    "margin-right": d ? "" : b
                };
            !c && this.$stage.children().css(e), a.css = e
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function (a) {
            var b = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
                c = null,
                d = this._items.length,
                e = !this.settings.autoWidth,
                f = [];
            for (a.items = {
                    merge: !1,
                    width: b
                }; d--;) c = this._mergers[d], c = this.settings.mergeFit && Math.min(c, this.settings.items) || c, a.items.merge = c > 1 || a.items.merge, f[d] = e ? b * c : this._items[d].width();
            this._widths = f
        }
    }, {
        filter: ["items", "settings"],
        run: function () {
            var b = [],
                c = this._items,
                d = this.settings,
                e = Math.max(2 * d.items, 4),
                f = 2 * Math.ceil(c.length / 2),
                g = d.loop && c.length ? d.rewind ? e : Math.max(e, f) : 0,
                h = "",
                i = "";
            for (g /= 2; g--;) b.push(this.normalize(b.length / 2, !0)), h += c[b[b.length - 1]][0].outerHTML, b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)), i = c[b[b.length - 1]][0].outerHTML + i;
            this._clones = b, a(h).addClass("cloned").appendTo(this.$stage), a(i).addClass("cloned").prependTo(this.$stage)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function () {
            for (var a = this.settings.rtl ? 1 : -1, b = this._clones.length + this._items.length, c = -1, d = 0, e = 0, f = []; ++c < b;) d = f[c - 1] || 0, e = this._widths[this.relative(c)] + this.settings.margin, f.push(d + e * a);
            this._coordinates = f
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function () {
            var a = this.settings.stagePadding,
                b = this._coordinates,
                c = {
                    width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a,
                    "padding-left": a || "",
                    "padding-right": a || ""
                };
            this.$stage.css(c)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function (a) {
            var b = this._coordinates.length,
                c = !this.settings.autoWidth,
                d = this.$stage.children();
            if (c && a.items.merge)
                for (; b--;) a.css.width = this._widths[this.relative(b)], d.eq(b).css(a.css);
            else c && (a.css.width = a.items.width, d.css(a.css))
        }
    }, {
        filter: ["items"],
        run: function () {
            this._coordinates.length < 1 && this.$stage.removeAttr("style")
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function (a) {
            a.current = a.current ? this.$stage.children().index(a.current) : 0, a.current = Math.max(this.minimum(), Math.min(this.maximum(), a.current)), this.reset(a.current)
        }
    }, {
        filter: ["position"],
        run: function () {
            this.animate(this.coordinates(this._current))
        }
    }, {
        filter: ["width", "position", "items", "settings"],
        run: function () {
            var a, b, c, d, e = this.settings.rtl ? 1 : -1,
                f = 2 * this.settings.stagePadding,
                g = this.coordinates(this.current()) + f,
                h = g + this.width() * e,
                i = [];
            for (c = 0, d = this._coordinates.length; c < d; c++) a = this._coordinates[c - 1] || 0, b = Math.abs(this._coordinates[c]) + f * e, (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
            this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass("active"), this.settings.center && (this.$stage.children(".center").removeClass("center"), this.$stage.children().eq(this.current()).addClass("center"))
        }
    }], e.prototype.initialize = function () {
        if (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) {
            var b, c, e;
            b = this.$element.find("img"), c = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d, e = this.$element.children(c).width(), b.length && e <= 0 && this.preloadAutoWidthImages(b)
        }
        this.$element.addClass(this.options.loadingClass), this.$stage = a("<" + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>').wrap('<div class="' + this.settings.stageOuterClass + '"/>'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this.$element.is(":visible") ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized")
    }, e.prototype.setup = function () {
        var b = this.viewport(),
            c = this.options.responsive,
            d = -1,
            e = null;
        c ? (a.each(c, function (a) {
            a <= b && a > d && (d = Number(a))
        }), e = a.extend({}, this.options, c[d]), "function" == typeof e.stagePadding && (e.stagePadding = e.stagePadding()), delete e.responsive, e.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + d))) : e = a.extend({}, this.options), this.trigger("change", {
            property: {
                name: "settings",
                value: e
            }
        }), this._breakpoint = d, this.settings = e, this.invalidate("settings"), this.trigger("changed", {
            property: {
                name: "settings",
                value: this.settings
            }
        })
    }, e.prototype.optionsLogic = function () {
        this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
    }, e.prototype.prepare = function (b) {
        var c = this.trigger("prepare", {
            content: b
        });
        return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(b)), this.trigger("prepared", {
            content: c.data
        }), c.data
    }, e.prototype.update = function () {
        for (var b = 0, c = this._pipe.length, d = a.proxy(function (a) {
                return this[a]
            }, this._invalidated), e = {}; b < c;)(this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e), b++;
        this._invalidated = {}, !this.is("valid") && this.enter("valid")
    }, e.prototype.width = function (a) {
        switch (a = a || e.Width.Default) {
            case e.Width.Inner:
            case e.Width.Outer:
                return this._width;
            default:
                return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
    }, e.prototype.refresh = function () {
        this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed")
    }, e.prototype.onThrottledResize = function () {
        b.clearTimeout(this.resizeTimer), this.resizeTimer = b.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
    }, e.prototype.onResize = function () {
        return !!this._items.length && (this._width !== this.$element.width() && (!!this.$element.is(":visible") && (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))))
    }, e.prototype.registerEventHandlers = function () {
        a.support.transition && this.$stage.on(a.support.transition.end + ".owl.core", a.proxy(this.onTransitionEnd, this)), this.settings.responsive !== !1 && this.on(b, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function () {
            return !1
        })), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", a.proxy(this.onDragEnd, this)))
    }, e.prototype.onDragStart = function (b) {
        var d = null;
        3 !== b.which && (a.support.transform ? (d = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","), d = {
            x: d[16 === d.length ? 12 : 4],
            y: d[16 === d.length ? 13 : 5]
        }) : (d = this.$stage.position(), d = {
            x: this.settings.rtl ? d.left + this.$stage.width() - this.width() + this.settings.margin : d.left,
            y: d.top
        }), this.is("animating") && (a.support.transform ? this.animate(d.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === b.type), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = a(b.target), this._drag.stage.start = d, this._drag.stage.current = d, this._drag.pointer = this.pointer(b), a(c).on("mouseup.owl.core touchend.owl.core", a.proxy(this.onDragEnd, this)), a(c).one("mousemove.owl.core touchmove.owl.core", a.proxy(function (b) {
            var d = this.difference(this._drag.pointer, this.pointer(b));
            a(c).on("mousemove.owl.core touchmove.owl.core", a.proxy(this.onDragMove, this)), Math.abs(d.x) < Math.abs(d.y) && this.is("valid") || (b.preventDefault(), this.enter("dragging"), this.trigger("drag"))
        }, this)))
    }, e.prototype.onDragMove = function (a) {
        var b = null,
            c = null,
            d = null,
            e = this.difference(this._drag.pointer, this.pointer(a)),
            f = this.difference(this._drag.stage.start, e);
        this.is("dragging") && (a.preventDefault(), this.settings.loop ? (b = this.coordinates(this.minimum()), c = this.coordinates(this.maximum() + 1) - b, f.x = ((f.x - b) % c + c) % c + b) : (b = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), c = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), d = this.settings.pullDrag ? -1 * e.x / 5 : 0, f.x = Math.max(Math.min(f.x, b + d), c + d)), this._drag.stage.current = f, this.animate(f.x))
    }, e.prototype.onDragEnd = function (b) {
        var d = this.difference(this._drag.pointer, this.pointer(b)),
            e = this._drag.stage.current,
            f = d.x > 0 ^ this.settings.rtl ? "left" : "right";
        a(c).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== d.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(e.x, 0 !== d.x ? f : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = f, (Math.abs(d.x) > 3 || (new Date).getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function () {
            return !1
        })), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
    }, e.prototype.closest = function (b, c) {
        var d = -1,
            e = 30,
            f = this.width(),
            g = this.coordinates();
        return this.settings.freeDrag || a.each(g, a.proxy(function (a, h) {
            return "left" === c && b > h - e && b < h + e ? d = a : "right" === c && b > h - f - e && b < h - f + e ? d = a + 1 : this.op(b, "<", h) && this.op(b, ">", g[a + 1] || h - f) && (d = "left" === c ? a + 1 : a), d === -1
        }, this)), this.settings.loop || (this.op(b, ">", g[this.minimum()]) ? d = b = this.minimum() : this.op(b, "<", g[this.maximum()]) && (d = b = this.maximum())), d
    }, e.prototype.animate = function (b) {
        var c = this.speed() > 0;
        this.is("animating") && this.onTransitionEnd(), c && (this.enter("animating"), this.trigger("translate")), a.support.transform3d && a.support.transition ? this.$stage.css({
            transform: "translate3d(" + b + "px,0px,0px)",
            transition: this.speed() / 1e3 + "s"
        }) : c ? this.$stage.animate({
            left: b + "px"
        }, this.speed(), this.settings.fallbackEasing, a.proxy(this.onTransitionEnd, this)) : this.$stage.css({
            left: b + "px"
        })
    }, e.prototype.is = function (a) {
        return this._states.current[a] && this._states.current[a] > 0
    }, e.prototype.current = function (a) {
        if (a === d) return this._current;
        if (0 === this._items.length) return d;
        if (a = this.normalize(a), this._current !== a) {
            var b = this.trigger("change", {
                property: {
                    name: "position",
                    value: a
                }
            });
            b.data !== d && (a = this.normalize(b.data)), this._current = a, this.invalidate("position"), this.trigger("changed", {
                property: {
                    name: "position",
                    value: this._current
                }
            })
        }
        return this._current
    }, e.prototype.invalidate = function (b) {
        return "string" === a.type(b) && (this._invalidated[b] = !0, this.is("valid") && this.leave("valid")), a.map(this._invalidated, function (a, b) {
            return b
        })
    }, e.prototype.reset = function (a) {
        a = this.normalize(a), a !== d && (this._speed = 0, this._current = a, this.suppress(["translate", "translated"]), this.animate(this.coordinates(a)), this.release(["translate", "translated"]))
    }, e.prototype.normalize = function (a, b) {
        var c = this._items.length,
            e = b ? 0 : this._clones.length;
        return !this.isNumeric(a) || c < 1 ? a = d : (a < 0 || a >= c + e) && (a = ((a - e / 2) % c + c) % c + e / 2), a
    }, e.prototype.relative = function (a) {
        return a -= this._clones.length / 2, this.normalize(a, !0)
    }, e.prototype.maximum = function (a) {
        var b, c, d, e = this.settings,
            f = this._coordinates.length;
        if (e.loop) f = this._clones.length / 2 + this._items.length - 1;
        else if (e.autoWidth || e.merge) {
            for (b = this._items.length, c = this._items[--b].width(), d = this.$element.width(); b-- && (c += this._items[b].width() + this.settings.margin, !(c > d)););
            f = b + 1
        } else f = e.center ? this._items.length - 1 : this._items.length - e.items;
        return a && (f -= this._clones.length / 2), Math.max(f, 0)
    }, e.prototype.minimum = function (a) {
        return a ? 0 : this._clones.length / 2
    }, e.prototype.items = function (a) {
        return a === d ? this._items.slice() : (a = this.normalize(a, !0), this._items[a])
    }, e.prototype.mergers = function (a) {
        return a === d ? this._mergers.slice() : (a = this.normalize(a, !0), this._mergers[a])
    }, e.prototype.clones = function (b) {
        var c = this._clones.length / 2,
            e = c + this._items.length,
            f = function (a) {
                return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2
            };
        return b === d ? a.map(this._clones, function (a, b) {
            return f(b)
        }) : a.map(this._clones, function (a, c) {
            return a === b ? f(c) : null
        })
    }, e.prototype.speed = function (a) {
        return a !== d && (this._speed = a), this._speed
    }, e.prototype.coordinates = function (b) {
        var c, e = 1,
            f = b - 1;
        return b === d ? a.map(this._coordinates, a.proxy(function (a, b) {
            return this.coordinates(b)
        }, this)) : (this.settings.center ? (this.settings.rtl && (e = -1, f = b + 1), c = this._coordinates[b], c += (this.width() - c + (this._coordinates[f] || 0)) / 2 * e) : c = this._coordinates[f] || 0, c = Math.ceil(c))
    }, e.prototype.duration = function (a, b, c) {
        return 0 === c ? 0 : Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed)
    }, e.prototype.to = function (a, b) {
        var c = this.current(),
            d = null,
            e = a - this.relative(c),
            f = (e > 0) - (e < 0),
            g = this._items.length,
            h = this.minimum(),
            i = this.maximum();
        this.settings.loop ? (!this.settings.rewind && Math.abs(e) > g / 2 && (e += f * -1 * g), a = c + e, d = ((a - h) % g + g) % g + h, d !== a && d - e <= i && d - e > 0 && (c = d - e, a = d, this.reset(c))) : this.settings.rewind ? (i += 1, a = (a % i + i) % i) : a = Math.max(h, Math.min(i, a)), this.speed(this.duration(c, a, b)), this.current(a), this.$element.is(":visible") && this.update()
    }, e.prototype.next = function (a) {
        a = a || !1, this.to(this.relative(this.current()) + 1, a)
    }, e.prototype.prev = function (a) {
        a = a || !1, this.to(this.relative(this.current()) - 1, a)
    }, e.prototype.onTransitionEnd = function (a) {
        if (a !== d && (a.stopPropagation(), (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0))) return !1;
        this.leave("animating"), this.trigger("translated")
    }, e.prototype.viewport = function () {
        var d;
        return this.options.responsiveBaseElement !== b ? d = a(this.options.responsiveBaseElement).width() : b.innerWidth ? d = b.innerWidth : c.documentElement && c.documentElement.clientWidth ? d = c.documentElement.clientWidth : console.warn("Can not detect viewport width."), d
    }, e.prototype.replace = function (b) {
        this.$stage.empty(), this._items = [], b && (b = b instanceof jQuery ? b : a(b)), this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)), b.filter(function () {
            return 1 === this.nodeType
        }).each(a.proxy(function (a, b) {
            b = this.prepare(b), this.$stage.append(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)
        }, this)), this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
    }, e.prototype.add = function (b, c) {
        var e = this.relative(this._current);
        c = c === d ? this._items.length : this.normalize(c, !0), b = b instanceof jQuery ? b : a(b), this.trigger("add", {
            content: b,
            position: c
        }), b = this.prepare(b), 0 === this._items.length || c === this._items.length ? (0 === this._items.length && this.$stage.append(b), 0 !== this._items.length && this._items[c - 1].after(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[c].before(b), this._items.splice(c, 0, b), this._mergers.splice(c, 0, 1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)), this._items[e] && this.reset(this._items[e].index()), this.invalidate("items"), this.trigger("added", {
            content: b,
            position: c
        })
    }, e.prototype.remove = function (a) {
        a = this.normalize(a, !0), a !== d && (this.trigger("remove", {
            content: this._items[a],
            position: a
        }), this._items[a].remove(), this._items.splice(a, 1), this._mergers.splice(a, 1), this.invalidate("items"), this.trigger("removed", {
            content: null,
            position: a
        }))
    }, e.prototype.preloadAutoWidthImages = function (b) {
        b.each(a.proxy(function (b, c) {
            this.enter("pre-loading"), c = a(c), a(new Image).one("load", a.proxy(function (a) {
                c.attr("src", a.target.src), c.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh()
            }, this)).attr("src", c.attr("src") || c.attr("data-src") || c.attr("data-src-retina"))
        }, this))
    }, e.prototype.destroy = function () {
        this.$element.off(".owl.core"), this.$stage.off(".owl.core"), a(c).off(".owl.core"), this.settings.responsive !== !1 && (b.clearTimeout(this.resizeTimer), this.off(b, "resize", this._handlers.onThrottledResize));
        for (var d in this._plugins) this._plugins[d].destroy();
        this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel")
    }, e.prototype.op = function (a, b, c) {
        var d = this.settings.rtl;
        switch (b) {
            case "<":
                return d ? a > c : a < c;
            case ">":
                return d ? a < c : a > c;
            case ">=":
                return d ? a <= c : a >= c;
            case "<=":
                return d ? a >= c : a <= c
        }
    }, e.prototype.on = function (a, b, c, d) {
        a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c)
    }, e.prototype.off = function (a, b, c, d) {
        a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c)
    }, e.prototype.trigger = function (b, c, d, f, g) {
        var h = {
                item: {
                    count: this._items.length,
                    index: this.current()
                }
            },
            i = a.camelCase(a.grep(["on", b, d], function (a) {
                return a
            }).join("-").toLowerCase()),
            j = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({
                relatedTarget: this
            }, h, c));
        return this._supress[b] || (a.each(this._plugins, function (a, b) {
            b.onTrigger && b.onTrigger(j)
        }), this.register({
            type: e.Type.Event,
            name: b
        }), this.$element.trigger(j), this.settings && "function" == typeof this.settings[i] && this.settings[i].call(this, j)), j
    }, e.prototype.enter = function (b) {
        a.each([b].concat(this._states.tags[b] || []), a.proxy(function (a, b) {
            this._states.current[b] === d && (this._states.current[b] = 0), this._states.current[b]++
        }, this))
    }, e.prototype.leave = function (b) {
        a.each([b].concat(this._states.tags[b] || []), a.proxy(function (a, b) {
            this._states.current[b]--
        }, this))
    }, e.prototype.register = function (b) {
        if (b.type === e.Type.Event) {
            if (a.event.special[b.name] || (a.event.special[b.name] = {}), !a.event.special[b.name].owl) {
                var c = a.event.special[b.name]._default;
                a.event.special[b.name]._default = function (a) {
                    return !c || !c.apply || a.namespace && a.namespace.indexOf("owl") !== -1 ? a.namespace && a.namespace.indexOf("owl") > -1 : c.apply(this, arguments)
                }, a.event.special[b.name].owl = !0
            }
        } else b.type === e.Type.State && (this._states.tags[b.name] ? this._states.tags[b.name] = this._states.tags[b.name].concat(b.tags) : this._states.tags[b.name] = b.tags, this._states.tags[b.name] = a.grep(this._states.tags[b.name], a.proxy(function (c, d) {
            return a.inArray(c, this._states.tags[b.name]) === d
        }, this)))
    }, e.prototype.suppress = function (b) {
        a.each(b, a.proxy(function (a, b) {
            this._supress[b] = !0
        }, this))
    }, e.prototype.release = function (b) {
        a.each(b, a.proxy(function (a, b) {
            delete this._supress[b]
        }, this))
    }, e.prototype.pointer = function (a) {
        var c = {
            x: null,
            y: null
        };
        return a = a.originalEvent || a || b.event, a = a.touches && a.touches.length ? a.touches[0] : a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : a, a.pageX ? (c.x = a.pageX, c.y = a.pageY) : (c.x = a.clientX, c.y = a.clientY), c
    }, e.prototype.isNumeric = function (a) {
        return !isNaN(parseFloat(a))
    }, e.prototype.difference = function (a, b) {
        return {
            x: a.x - b.x,
            y: a.y - b.y
        }
    }, a.fn.owlCarousel = function (b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return this.each(function () {
            var d = a(this),
                f = d.data("owl.carousel");
            f || (f = new e(this, "object" == typeof b && b), d.data("owl.carousel", f), a.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function (b, c) {
                f.register({
                    type: e.Type.Event,
                    name: c
                }), f.$element.on(c + ".owl.carousel.core", a.proxy(function (a) {
                    a.namespace && a.relatedTarget !== this && (this.suppress([c]), f[c].apply(this, [].slice.call(arguments, 1)), this.release([c]))
                }, f))
            })), "string" == typeof b && "_" !== b.charAt(0) && f[b].apply(f, c)
        })
    }, a.fn.owlCarousel.Constructor = e
}(window.Zepto || window.jQuery, window, document),
function (a, b, c, d) {
    var e = function (b) {
        this._core = b, this._interval = null, this._visible = null, this._handlers = {
            "initialized.owl.carousel": a.proxy(function (a) {
                a.namespace && this._core.settings.autoRefresh && this.watch()
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    e.Defaults = {
        autoRefresh: !0,
        autoRefreshInterval: 500
    }, e.prototype.watch = function () {
        this._interval || (this._visible = this._core.$element.is(":visible"), this._interval = b.setInterval(a.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
    }, e.prototype.refresh = function () {
        this._core.$element.is(":visible") !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
    }, e.prototype.destroy = function () {
        var a, c;
        b.clearInterval(this._interval);
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e
}(window.Zepto || window.jQuery, window, document),
function (a, b, c, d) {
    var e = function (b) {
        this._core = b, this._loaded = [], this._handlers = {
            "initialized.owl.carousel change.owl.carousel resized.owl.carousel": a.proxy(function (b) {
                if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type))
                    for (var c = this._core.settings, e = c.center && Math.ceil(c.items / 2) || c.items, f = c.center && e * -1 || 0, g = (b.property && b.property.value !== d ? b.property.value : this._core.current()) + f, h = this._core.clones().length, i = a.proxy(function (a, b) {
                            this.load(b)
                        }, this); f++ < e;) this.load(h / 2 + this._core.relative(g)), h && a.each(this._core.clones(this._core.relative(g)), i), g++
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    e.Defaults = {
        lazyLoad: !1
    }, e.prototype.load = function (c) {
        var d = this._core.$stage.children().eq(c),
            e = d && d.find(".owl-lazy");
        !e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function (c, d) {
            var e, f = a(d),
                g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src");
            this._core.trigger("load", {
                element: f,
                url: g
            }, "lazy"), f.is("img") ? f.one("load.owl.lazy", a.proxy(function () {
                f.css("opacity", 1), this._core.trigger("loaded", {
                    element: f,
                    url: g
                }, "lazy")
            }, this)).attr("src", g) : (e = new Image, e.onload = a.proxy(function () {
                f.css({
                    "background-image": 'url("' + g + '")',
                    opacity: "1"
                }), this._core.trigger("loaded", {
                    element: f,
                    url: g
                }, "lazy")
            }, this), e.src = g)
        }, this)), this._loaded.push(d.get(0)))
    }, e.prototype.destroy = function () {
        var a, b;
        for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Lazy = e
}(window.Zepto || window.jQuery, window, document),
function (a, b, c, d) {
    var e = function (b) {
        this._core = b, this._handlers = {
            "initialized.owl.carousel refreshed.owl.carousel": a.proxy(function (a) {
                a.namespace && this._core.settings.autoHeight && this.update()
            }, this),
            "changed.owl.carousel": a.proxy(function (a) {
                a.namespace && this._core.settings.autoHeight && "position" == a.property.name && this.update()
            }, this),
            "loaded.owl.lazy": a.proxy(function (a) {
                a.namespace && this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    e.Defaults = {
        autoHeight: !1,
        autoHeightClass: "owl-height"
    }, e.prototype.update = function () {
        var b = this._core._current,
            c = b + this._core.settings.items,
            d = this._core.$stage.children().toArray().slice(b, c),
            e = [],
            f = 0;
        a.each(d, function (b, c) {
            e.push(a(c).height())
        }), f = Math.max.apply(null, e), this._core.$stage.parent().height(f).addClass(this._core.settings.autoHeightClass)
    }, e.prototype.destroy = function () {
        var a, b;
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e
}(window.Zepto || window.jQuery, window, document),
function (a, b, c, d) {
    var e = function (b) {
        this._core = b, this._videos = {}, this._playing = null, this._handlers = {
            "initialized.owl.carousel": a.proxy(function (a) {
                a.namespace && this._core.register({
                    type: "state",
                    name: "playing",
                    tags: ["interacting"]
                })
            }, this),
            "resize.owl.carousel": a.proxy(function (a) {
                a.namespace && this._core.settings.video && this.isInFullScreen() && a.preventDefault()
            }, this),
            "refreshed.owl.carousel": a.proxy(function (a) {
                a.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
            }, this),
            "changed.owl.carousel": a.proxy(function (a) {
                a.namespace && "position" === a.property.name && this._playing && this.stop()
            }, this),
            "prepared.owl.carousel": a.proxy(function (b) {
                if (b.namespace) {
                    var c = a(b.content).find(".owl-video");
                    c.length && (c.css("display", "none"), this.fetch(c, a(b.content)))
                }
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function (a) {
            this.play(a)
        }, this))
    };
    e.Defaults = {
        video: !1,
        videoHeight: !1,
        videoWidth: !1
    }, e.prototype.fetch = function (a, b) {
        var c = function () {
                return a.attr("data-vimeo-id") ? "vimeo" : a.attr("data-vzaar-id") ? "vzaar" : "youtube"
            }(),
            d = a.attr("data-vimeo-id") || a.attr("data-youtube-id") || a.attr("data-vzaar-id"),
            e = a.attr("data-width") || this._core.settings.videoWidth,
            f = a.attr("data-height") || this._core.settings.videoHeight,
            g = a.attr("href");
        if (!g) throw new Error("Missing video URL.");
        if (d = g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), d[3].indexOf("youtu") > -1) c = "youtube";
        else if (d[3].indexOf("vimeo") > -1) c = "vimeo";
        else {
            if (!(d[3].indexOf("vzaar") > -1)) throw new Error("Video URL not supported.");
            c = "vzaar"
        }
        d = d[6], this._videos[g] = {
            type: c,
            id: d,
            width: e,
            height: f
        }, b.attr("data-video", g), this.thumbnail(a, this._videos[g])
    }, e.prototype.thumbnail = function (b, c) {
        var d, e, f, g = c.width && c.height ? 'style="width:' + c.width + "px;height:" + c.height + 'px;"' : "",
            h = b.find("img"),
            i = "src",
            j = "",
            k = this._core.settings,
            l = function (a) {
                e = '<div class="owl-video-play-icon"></div>', d = k.lazyLoad ? '<div class="owl-video-tn ' + j + '" ' + i + '="' + a + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + a + ')"></div>', b.after(d), b.after(e)
            };
        if (b.wrap('<div class="owl-video-wrapper"' + g + "></div>"), this._core.settings.lazyLoad && (i = "data-src", j = "owl-lazy"), h.length) return l(h.attr(i)), h.remove(), !1;
        "youtube" === c.type ? (f = "//img.youtube.com/vi/" + c.id + "/hqdefault.jpg", l(f)) : "vimeo" === c.type ? a.ajax({
            type: "GET",
            url: "//vimeo.com/api/v2/video/" + c.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function (a) {
                f = a[0].thumbnail_large, l(f)
            }
        }) : "vzaar" === c.type && a.ajax({
            type: "GET",
            url: "//vzaar.com/api/videos/" + c.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function (a) {
                f = a.framegrab_url, l(f)
            }
        })
    }, e.prototype.stop = function () {
        this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video")
    }, e.prototype.play = function (b) {
        var c, d = a(b.target),
            e = d.closest("." + this._core.settings.itemClass),
            f = this._videos[e.attr("data-video")],
            g = f.width || "100%",
            h = f.height || this._core.$stage.height();
        this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), e = this._core.items(this._core.relative(e.index())), this._core.reset(e.index()), "youtube" === f.type ? c = '<iframe width="' + g + '" height="' + h + '" src="//www.youtube.com/embed/' + f.id + "?autoplay=1&rel=0&v=" + f.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === f.type ? c = '<iframe src="//player.vimeo.com/video/' + f.id + '?autoplay=1" width="' + g + '" height="' + h + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' : "vzaar" === f.type && (c = '<iframe frameborder="0"height="' + h + '"width="' + g + '" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' + f.id + '/player?autoplay=true"></iframe>'), a('<div class="owl-video-frame">' + c + "</div>").insertAfter(e.find(".owl-video")), this._playing = e.addClass("owl-video-playing"))
    }, e.prototype.isInFullScreen = function () {
        var b = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
        return b && a(b).parent().hasClass("owl-video-frame")
    }, e.prototype.destroy = function () {
        var a, b;
        this._core.$element.off("click.owl.video");
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Video = e
}(window.Zepto || window.jQuery, window, document),
function (a, b, c, d) {
    var e = function (b) {
        this.core = b, this.core.options = a.extend({}, e.Defaults, this.core.options), this.swapping = !0, this.previous = d, this.next = d, this.handlers = {
            "change.owl.carousel": a.proxy(function (a) {
                a.namespace && "position" == a.property.name && (this.previous = this.core.current(), this.next = a.property.value)
            }, this),
            "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function (a) {
                a.namespace && (this.swapping = "translated" == a.type)
            }, this),
            "translate.owl.carousel": a.proxy(function (a) {
                a.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
            }, this)
        }, this.core.$element.on(this.handlers)
    };
    e.Defaults = {
            animateOut: !1,
            animateIn: !1
        }, e.prototype.swap = function () {
            if (1 === this.core.settings.items && a.support.animation && a.support.transition) {
                this.core.speed(0);
                var b, c = a.proxy(this.clear, this),
                    d = this.core.$stage.children().eq(this.previous),
                    e = this.core.$stage.children().eq(this.next),
                    f = this.core.settings.animateIn,
                    g = this.core.settings.animateOut;
                this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next), d.one(a.support.animation.end, c).css({
                    left: b + "px"
                }).addClass("animated owl-animated-out").addClass(g)), f && e.one(a.support.animation.end, c).addClass("animated owl-animated-in").addClass(f))
            }
        }, e.prototype.clear = function (b) {
            a(b.target).css({
                left: ""
            }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd()
        }, e.prototype.destroy = function () {
            var a, b;
            for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
            for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
        },
        a.fn.owlCarousel.Constructor.Plugins.Animate = e
}(window.Zepto || window.jQuery, window, document),
function (a, b, c, d) {
    var e = function (b) {
        this._core = b, this._timeout = null, this._paused = !1, this._handlers = {
            "changed.owl.carousel": a.proxy(function (a) {
                a.namespace && "settings" === a.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : a.namespace && "position" === a.property.name && this._core.settings.autoplay && this._setAutoPlayInterval()
            }, this),
            "initialized.owl.carousel": a.proxy(function (a) {
                a.namespace && this._core.settings.autoplay && this.play()
            }, this),
            "play.owl.autoplay": a.proxy(function (a, b, c) {
                a.namespace && this.play(b, c)
            }, this),
            "stop.owl.autoplay": a.proxy(function (a) {
                a.namespace && this.stop()
            }, this),
            "mouseover.owl.autoplay": a.proxy(function () {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            }, this),
            "mouseleave.owl.autoplay": a.proxy(function () {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
            }, this),
            "touchstart.owl.core": a.proxy(function () {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            }, this),
            "touchend.owl.core": a.proxy(function () {
                this._core.settings.autoplayHoverPause && this.play()
            }, this)
        }, this._core.$element.on(this._handlers), this._core.options = a.extend({}, e.Defaults, this._core.options)
    };
    e.Defaults = {
        autoplay: !1,
        autoplayTimeout: 5e3,
        autoplayHoverPause: !1,
        autoplaySpeed: !1
    }, e.prototype.play = function (a, b) {
        this._paused = !1, this._core.is("rotating") || (this._core.enter("rotating"), this._setAutoPlayInterval())
    }, e.prototype._getNextTimeout = function (d, e) {
        return this._timeout && b.clearTimeout(this._timeout), b.setTimeout(a.proxy(function () {
            this._paused || this._core.is("busy") || this._core.is("interacting") || c.hidden || this._core.next(e || this._core.settings.autoplaySpeed)
        }, this), d || this._core.settings.autoplayTimeout)
    }, e.prototype._setAutoPlayInterval = function () {
        this._timeout = this._getNextTimeout()
    }, e.prototype.stop = function () {
        this._core.is("rotating") && (b.clearTimeout(this._timeout), this._core.leave("rotating"))
    }, e.prototype.pause = function () {
        this._core.is("rotating") && (this._paused = !0)
    }, e.prototype.destroy = function () {
        var a, b;
        this.stop();
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.autoplay = e
}(window.Zepto || window.jQuery, window, document),
function (a, b, c, d) {
    "use strict";
    var e = function (b) {
        this._core = b, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to
        }, this._handlers = {
            "prepared.owl.carousel": a.proxy(function (b) {
                b.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>")
            }, this),
            "added.owl.carousel": a.proxy(function (a) {
                a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 0, this._templates.pop())
            }, this),
            "remove.owl.carousel": a.proxy(function (a) {
                a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 1)
            }, this),
            "changed.owl.carousel": a.proxy(function (a) {
                a.namespace && "position" == a.property.name && this.draw()
            }, this),
            "initialized.owl.carousel": a.proxy(function (a) {
                a.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"))
            }, this),
            "refreshed.owl.carousel": a.proxy(function (a) {
                a.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers)
    };
    e.Defaults = {
        nav: !1,
        navText: ["prev", "next"],
        navSpeed: !1,
        navElement: "div",
        navContainer: !1,
        navContainerClass: "owl-nav",
        navClass: ["owl-prev", "owl-next"],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: !0,
        dotsEach: !1,
        dotsData: !1,
        dotsSpeed: !1,
        dotsContainer: !1
    }, e.prototype.initialize = function () {
        var b, c = this._core.settings;
        this._controls.$relative = (c.navContainer ? a(c.navContainer) : a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = a("<" + c.navElement + ">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click", a.proxy(function (a) {
            this.prev(c.navSpeed)
        }, this)), this._controls.$next = a("<" + c.navElement + ">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click", a.proxy(function (a) {
            this.next(c.navSpeed)
        }, this)), c.dotsData || (this._templates = [a("<div>").addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]), this._controls.$absolute = (c.dotsContainer ? a(c.dotsContainer) : a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "div", a.proxy(function (b) {
            var d = a(b.target).parent().is(this._controls.$absolute) ? a(b.target).index() : a(b.target).parent().index();
            b.preventDefault(), this.to(d, c.dotsSpeed)
        }, this));
        for (b in this._overrides) this._core[b] = a.proxy(this[b], this)
    }, e.prototype.destroy = function () {
        var a, b, c, d;
        for (a in this._handlers) this.$element.off(a, this._handlers[a]);
        for (b in this._controls) this._controls[b].remove();
        for (d in this.overides) this._core[d] = this._overrides[d];
        for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
    }, e.prototype.update = function () {
        var a, b, c, d = this._core.clones().length / 2,
            e = d + this._core.items().length,
            f = this._core.maximum(!0),
            g = this._core.settings,
            h = g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items;
        if ("page" !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)), g.dots || "page" == g.slideBy)
            for (this._pages = [], a = d, b = 0, c = 0; a < e; a++) {
                if (b >= h || 0 === b) {
                    if (this._pages.push({
                            start: Math.min(f, a - d),
                            end: a - d + h - 1
                        }), Math.min(f, a - d) === f) break;
                    b = 0, ++c
                }
                b += this._core.mergers(this._core.relative(a))
            }
    }, e.prototype.draw = function () {
        var b, c = this._core.settings,
            d = this._core.items().length <= c.items,
            e = this._core.relative(this._core.current()),
            f = c.loop || c.rewind;
        this._controls.$relative.toggleClass("disabled", !c.nav || d), c.nav && (this._controls.$previous.toggleClass("disabled", !f && e <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !f && e >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !c.dots || d), c.dots && (b = this._pages.length - this._controls.$absolute.children().length, c.dotsData && 0 !== b ? this._controls.$absolute.html(this._templates.join("")) : b > 0 ? this._controls.$absolute.append(new Array(b + 1).join(this._templates[0])) : b < 0 && this._controls.$absolute.children().slice(b).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(a.inArray(this.current(), this._pages)).addClass("active"))
    }, e.prototype.onTrigger = function (b) {
        var c = this._core.settings;
        b.page = {
            index: a.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: c && (c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items)
        }
    }, e.prototype.current = function () {
        var b = this._core.relative(this._core.current());
        return a.grep(this._pages, a.proxy(function (a, c) {
            return a.start <= b && a.end >= b
        }, this)).pop()
    }, e.prototype.getPosition = function (b) {
        var c, d, e = this._core.settings;
        return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages), d = this._pages.length, b ? ++c : --c, c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()), d = this._core.items().length, b ? c += e.slideBy : c -= e.slideBy), c
    }, e.prototype.next = function (b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b)
    }, e.prototype.prev = function (b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b)
    }, e.prototype.to = function (b, c, d) {
        var e;
        !d && this._pages.length ? (e = this._pages.length, a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c)) : a.proxy(this._overrides.to, this._core)(b, c)
    }, a.fn.owlCarousel.Constructor.Plugins.Navigation = e
}(window.Zepto || window.jQuery, window, document),
function (a, b, c, d) {
    "use strict";
    var e = function (c) {
        this._core = c, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
            "initialized.owl.carousel": a.proxy(function (c) {
                c.namespace && "URLHash" === this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation")
            }, this),
            "prepared.owl.carousel": a.proxy(function (b) {
                if (b.namespace) {
                    var c = a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
                    if (!c) return;
                    this._hashes[c] = b.content
                }
            }, this),
            "changed.owl.carousel": a.proxy(function (c) {
                if (c.namespace && "position" === c.property.name) {
                    var d = this._core.items(this._core.relative(this._core.current())),
                        e = a.map(this._hashes, function (a, b) {
                            return a === d ? b : null
                        }).join();
                    if (!e || b.location.hash.slice(1) === e) return;
                    b.location.hash = e
                }
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers), a(b).on("hashchange.owl.navigation", a.proxy(function (a) {
            var c = b.location.hash.substring(1),
                e = this._core.$stage.children(),
                f = this._hashes[c] && e.index(this._hashes[c]);
            f !== d && f !== this._core.current() && this._core.to(this._core.relative(f), !1, !0)
        }, this))
    };
    e.Defaults = {
        URLhashListener: !1
    }, e.prototype.destroy = function () {
        var c, d;
        a(b).off("hashchange.owl.navigation");
        for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
        for (d in Object.getOwnPropertyNames(this)) "function" != typeof this[d] && (this[d] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Hash = e
}(window.Zepto || window.jQuery, window, document),
function (a, b, c, d) {
    function e(b, c) {
        var e = !1,
            f = b.charAt(0).toUpperCase() + b.slice(1);
        return a.each((b + " " + h.join(f + " ") + f).split(" "), function (a, b) {
            if (g[b] !== d) return e = !c || b, !1
        }), e
    }

    function f(a) {
        return e(a, !0)
    }
    var g = a("<support>").get(0).style,
        h = "Webkit Moz O ms".split(" "),
        i = {
            transition: {
                end: {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd",
                    transition: "transitionend"
                }
            },
            animation: {
                end: {
                    WebkitAnimation: "webkitAnimationEnd",
                    MozAnimation: "animationend",
                    OAnimation: "oAnimationEnd",
                    animation: "animationend"
                }
            }
        },
        j = {
            csstransforms: function () {
                return !!e("transform")
            },
            csstransforms3d: function () {
                return !!e("perspective")
            },
            csstransitions: function () {
                return !!e("transition")
            },
            cssanimations: function () {
                return !!e("animation")
            }
        };
    j.csstransitions() && (a.support.transition = new String(f("transition")), a.support.transition.end = i.transition.end[a.support.transition]), j.cssanimations() && (a.support.animation = new String(f("animation")), a.support.animation.end = i.animation.end[a.support.animation]), j.csstransforms() && (a.support.transform = new String(f("transform")), a.support.transform3d = j.csstransforms3d())
}(window.Zepto || window.jQuery, window, document);


/**
RESIZESENSOR.JS
 * Copyright Marc J. Schmidt. See the LICENSE file at the top-level
 * directory of this distribution and at
 * https://github.com/marcj/css-element-queries/blob/master/LICENSE.
 */
! function () {
    var e = function (t, i) {
        function s() {
            this.q = [], this.add = function (e) {
                this.q.push(e)
            };
            var e, t;
            this.call = function () {
                for (e = 0, t = this.q.length; e < t; e++) this.q[e].call()
            }
        }

        function o(e, t) {
            return e.currentStyle ? e.currentStyle[t] : window.getComputedStyle ? window.getComputedStyle(e, null).getPropertyValue(t) : e.style[t]
        }

        function n(e, t) {
            if (e.resizedAttached) {
                if (e.resizedAttached) return void e.resizedAttached.add(t)
            } else e.resizedAttached = new s, e.resizedAttached.add(t);
            e.resizeSensor = document.createElement("div"), e.resizeSensor.className = "resize-sensor";
            var i = "position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;",
                n = "position: absolute; left: 0; top: 0; transition: 0s;";
            e.resizeSensor.style.cssText = i, e.resizeSensor.innerHTML = '<div class="resize-sensor-expand" style="' + i + '"><div style="' + n + '"></div></div><div class="resize-sensor-shrink" style="' + i + '"><div style="' + n + ' width: 200%; height: 200%"></div></div>', e.appendChild(e.resizeSensor), {
                fixed: 1,
                absolute: 1
            } [o(e, "position")] || (e.style.position = "relative");
            var d, r, l = e.resizeSensor.childNodes[0],
                c = l.childNodes[0],
                h = e.resizeSensor.childNodes[1],
                a = (h.childNodes[0], function () {
                    c.style.width = l.offsetWidth + 10 + "px", c.style.height = l.offsetHeight + 10 + "px", l.scrollLeft = l.scrollWidth, l.scrollTop = l.scrollHeight, h.scrollLeft = h.scrollWidth, h.scrollTop = h.scrollHeight, d = e.offsetWidth, r = e.offsetHeight
                });
            a();
            var f = function () {
                    e.resizedAttached && e.resizedAttached.call()
                },
                u = function (e, t, i) {
                    e.attachEvent ? e.attachEvent("on" + t, i) : e.addEventListener(t, i)
                },
                p = function () {
                    e.offsetWidth == d && e.offsetHeight == r || f(), a()
                };
            u(l, "scroll", p), u(h, "scroll", p)
        }
        var d = Object.prototype.toString.call(t),
            r = "[object Array]" === d || "[object NodeList]" === d || "[object HTMLCollection]" === d || "undefined" != typeof jQuery && t instanceof jQuery || "undefined" != typeof Elements && t instanceof Elements;
        if (r)
            for (var l = 0, c = t.length; l < c; l++) n(t[l], i);
        else n(t, i);
        this.detach = function () {
            if (r)
                for (var i = 0, s = t.length; i < s; i++) e.detach(t[i]);
            else e.detach(t)
        }
    };
    e.detach = function (e) {
        e.resizeSensor && (e.removeChild(e.resizeSensor), delete e.resizeSensor, delete e.resizedAttached)
    }, "undefined" != typeof module && "undefined" != typeof module.exports ? module.exports = e : window.ResizeSensor = e
}();
//# sourceMappingURL=maps/ResizeSensor.min.js.map

/*!
 * Theia Sticky Sidebar v1.7.0
 * https://github.com/WeCodePixels/theia-sticky-sidebar
 *
 * Glues your website's sidebars, making them permanently visible while scrolling.
 *
 * Copyright 2013-2016 WeCodePixels and other contributors
 * Released under the MIT license
 */
/*!
 * Theia Sticky Sidebar v1.7.0
 * https://github.com/WeCodePixels/theia-sticky-sidebar
 *
 * Glues your website's sidebars, making them permanently visible while scrolling.
 *
 * Copyright 2013-2016 WeCodePixels and other contributors
 * Released under the MIT license
 */

! function (i) {
    i.fn.theiaStickySidebar = function (t) {
        function e(t, e) {
            return !0 === t.initialized || !(i("body").width() < t.minWidth) && (o(t, e), !0)
        }

        function o(t, e) {
            t.initialized = !0, 0 === i("#theia-sticky-sidebar-stylesheet-" + t.namespace).length && i("head").append(i('<style id="theia-sticky-sidebar-stylesheet-' + t.namespace + '">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>')), e.each(function () {
                function e() {
                    n.fixedScrollTop = 0, n.sidebar.css({
                        "min-height": "1px"
                    }), n.stickySidebar.css({
                        position: "static",
                        width: "",
                        transform: "none"
                    })
                }

                function o(t) {
                    var e = t.height();
                    return t.children().each(function () {
                        e = Math.max(e, i(this).height())
                    }), e
                }
                var n = {};
                if (n.sidebar = i(this), n.options = t || {}, n.container = i(n.options.containerSelector), 0 == n.container.length && (n.container = n.sidebar.parent()), n.sidebar.parents(":not(.theia-exception)").css("-webkit-transform", "none"), n.sidebar.css({
                        position: n.options.defaultPosition,
                        overflow: "visible",
                        "-webkit-box-sizing": "border-box",
                        "-moz-box-sizing": "border-box",
                        "box-sizing": "border-box"
                    }), n.stickySidebar = n.sidebar.find(".theiaStickySidebar"), 0 == n.stickySidebar.length) {
                    var s = /(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;
                    n.sidebar.find("script").filter(function (i, t) {
                        return 0 === t.type.length || t.type.match(s)
                    }).remove(), n.stickySidebar = i("<div>").addClass("theiaStickySidebar").append(n.sidebar.children()), n.sidebar.append(n.stickySidebar)
                }
                n.marginBottom = parseInt(n.sidebar.css("margin-bottom")), n.paddingTop = parseInt(n.sidebar.css("padding-top")), n.paddingBottom = parseInt(n.sidebar.css("padding-bottom"));
                var d = n.stickySidebar.offset().top,
                    r = n.stickySidebar.outerHeight();
                n.stickySidebar.css("padding-top", 1), n.stickySidebar.css("padding-bottom", 1), d -= n.stickySidebar.offset().top, r = n.stickySidebar.outerHeight() - r - d, 0 == d ? (n.stickySidebar.css("padding-top", 0), n.stickySidebarPaddingTop = 0) : n.stickySidebarPaddingTop = 1, 0 == r ? (n.stickySidebar.css("padding-bottom", 0), n.stickySidebarPaddingBottom = 0) : n.stickySidebarPaddingBottom = 1, n.previousScrollTop = null, n.fixedScrollTop = 0, e(), n.onScroll = function (n) {
                    if (n.stickySidebar.is(":visible"))
                        if (i("body").width() < n.options.minWidth) e();
                        else if (n.options.disableOnResponsiveLayouts && n.sidebar.outerWidth("none" == n.sidebar.css("float")) + 50 > n.container.width()) e();
                    else {
                        var s = i(document).scrollTop(),
                            d = "static";
                        if (s >= n.sidebar.offset().top + (n.paddingTop - n.options.additionalMarginTop)) {
                            var r, c = n.paddingTop + t.additionalMarginTop,
                                p = n.paddingBottom + n.marginBottom + t.additionalMarginBottom,
                                b = n.sidebar.offset().top,
                                l = n.sidebar.offset().top + o(n.container),
                                f = 0 + t.additionalMarginTop;
                            r = n.stickySidebar.outerHeight() + c + p < i(window).height() ? f + n.stickySidebar.outerHeight() : i(window).height() - n.marginBottom - n.paddingBottom - t.additionalMarginBottom;
                            var h = b - s + n.paddingTop,
                                g = l - s - n.paddingBottom - n.marginBottom,
                                u = n.stickySidebar.offset().top - s,
                                S = n.previousScrollTop - s;
                            "fixed" == n.stickySidebar.css("position") && "modern" == n.options.sidebarBehavior && (u += S), "stick-to-top" == n.options.sidebarBehavior && (u = t.additionalMarginTop), "stick-to-bottom" == n.options.sidebarBehavior && (u = r - n.stickySidebar.outerHeight()), u = S > 0 ? Math.min(u, f) : Math.max(u, r - n.stickySidebar.outerHeight()), u = Math.max(u, h), u = Math.min(u, g - n.stickySidebar.outerHeight());
                            var m = n.container.height() == n.stickySidebar.outerHeight();
                            d = (m || u != f) && (m || u != r - n.stickySidebar.outerHeight()) ? s + u - n.sidebar.offset().top - n.paddingTop <= t.additionalMarginTop ? "static" : "absolute" : "fixed"
                        }
                        if ("fixed" == d) {
                            var y = i(document).scrollLeft();
                            n.stickySidebar.css({
                                position: "fixed",
                                width: a(n.stickySidebar) + "px",
                                transform: "translateY(" + u + "px)",
                                left: n.sidebar.offset().left + parseInt(n.sidebar.css("padding-left")) - y + "px",
                                top: "0px"
                            })
                        } else if ("absolute" == d) {
                            var k = {};
                            "absolute" != n.stickySidebar.css("position") && (k.position = "absolute", k.transform = "translateY(" + (s + u - n.sidebar.offset().top - n.stickySidebarPaddingTop - n.stickySidebarPaddingBottom) + "px)", k.top = "0px"), k.width = a(n.stickySidebar) + "px", k.left = "", n.stickySidebar.css(k)
                        } else "static" == d && e();
                        "static" != d && 1 == n.options.updateSidebarHeight && n.sidebar.css({
                            "min-height": n.stickySidebar.outerHeight() + n.stickySidebar.offset().top - n.sidebar.offset().top + n.paddingBottom
                        }), n.previousScrollTop = s
                    }
                }, n.onScroll(n), i(document).on("scroll." + n.options.namespace, function (i) {
                    return function () {
                        i.onScroll(i)
                    }
                }(n)), i(window).on("resize." + n.options.namespace, function (i) {
                    return function () {
                        i.stickySidebar.css({
                            position: "static"
                        }), i.onScroll(i)
                    }
                }(n)), "undefined" != typeof ResizeSensor && new ResizeSensor(n.stickySidebar[0], function (i) {
                    return function () {
                        i.onScroll(i)
                    }
                }(n))
            })
        }

        function a(i) {
            var t;
            try {
                t = i[0].getBoundingClientRect().width
            } catch (i) {}
            return void 0 === t && (t = i.width()), t
        }
        var n = {
            containerSelector: "",
            additionalMarginTop: 0,
            additionalMarginBottom: 0,
            updateSidebarHeight: !0,
            minWidth: 0,
            disableOnResponsiveLayouts: !0,
            sidebarBehavior: "modern",
            defaultPosition: "relative",
            namespace: "TSS"
        };
        return t = i.extend(n, t), t.additionalMarginTop = parseInt(t.additionalMarginTop) || 0, t.additionalMarginBottom = parseInt(t.additionalMarginBottom) || 0,
            function (t, o) {
                e(t, o) || (console.log("TSS: Body width smaller than options.minWidth. Init is delayed."), i(document).on("scroll." + t.namespace, function (t, o) {
                    return function (a) {
                        e(t, o) && i(this).unbind(a)
                    }
                }(t, o)), i(window).on("resize." + t.namespace, function (t, o) {
                    return function (a) {
                        e(t, o) && i(this).unbind(a)
                    }
                }(t, o)))
            }(t, this), this
    }
}(jQuery);
//# sourceMappingURL=maps/theia-sticky-sidebar.min.js.map

/*
 Sticky-kit v1.1.3 | MIT | Leaf Corcoran 2015 | http://leafo.net
*/
(function () {
    var c, f;
    c = window.jQuery;
    f = c(window);
    c.fn.stick_in_parent = function (b) {
        var A, w, J, n, B, K, p, q, L, k, E, t;
        null == b && (b = {});
        t = b.sticky_class;
        B = b.inner_scrolling;
        E = b.recalc_every;
        k = b.parent;
        q = b.offset_top;
        p = b.spacer;
        w = b.bottoming;
        null == q && (q = 0);
        null == k && (k = void 0);
        null == B && (B = !0);
        null == t && (t = "is_stuck");
        A = c(document);
        null == w && (w = !0);
        L = function (a) {
            var b;
            return window.getComputedStyle ? (a = window.getComputedStyle(a[0]), b = parseFloat(a.getPropertyValue("width")) + parseFloat(a.getPropertyValue("margin-left")) +
                parseFloat(a.getPropertyValue("margin-right")), "border-box" !== a.getPropertyValue("box-sizing") && (b += parseFloat(a.getPropertyValue("border-left-width")) + parseFloat(a.getPropertyValue("border-right-width")) + parseFloat(a.getPropertyValue("padding-left")) + parseFloat(a.getPropertyValue("padding-right"))), b) : a.outerWidth(!0)
        };
        J = function (a, b, n, C, F, u, r, G) {
            var v, H, m, D, I, d, g, x, y, z, h, l;
            if (!a.data("sticky_kit")) {
                a.data("sticky_kit", !0);
                I = A.height();
                g = a.parent();
                null != k && (g = g.closest(k));
                if (!g.length) throw "failed to find stick parent";
                v = m = !1;
                (h = null != p ? p && a.closest(p) : c("<div />")) && h.css("position", a.css("position"));
                x = function () {
                    var d, f, e;
                    if (!G && (I = A.height(), d = parseInt(g.css("border-top-width"), 10), f = parseInt(g.css("padding-top"), 10), b = parseInt(g.css("padding-bottom"), 10), n = g.offset().top + d + f, C = g.height(), m && (v = m = !1, null == p && (a.insertAfter(h), h.detach()), a.css({
                            position: "",
                            top: "",
                            width: "",
                            bottom: ""
                        }).removeClass(t), e = !0), F = a.offset().top - (parseInt(a.css("margin-top"), 10) || 0) - q, u = a.outerHeight(!0), r = a.css("float"), h && h.css({
                            width: L(a),
                            height: u,
                            display: a.css("display"),
                            "vertical-align": a.css("vertical-align"),
                            "float": r
                        }), e)) return l()
                };
                x();
                if (u !== C) return D = void 0, d = q, z = E, l = function () {
                        var c, l, e, k;
                        if (!G && (e = !1, null != z && (--z, 0 >= z && (z = E, x(), e = !0)), e || A.height() === I || x(), e = f.scrollTop(), null != D && (l = e - D), D = e, m ? (w && (k = e + u + d > C + n, v && !k && (v = !1, a.css({
                                    position: "fixed",
                                    bottom: "",
                                    top: d
                                }).trigger("sticky_kit:unbottom"))), e < F && (m = !1, d = q, null == p && ("left" !== r && "right" !== r || a.insertAfter(h), h.detach()), c = {
                                    position: "",
                                    width: "",
                                    top: ""
                                }, a.css(c).removeClass(t).trigger("sticky_kit:unstick")),
                                B && (c = f.height(), u + q > c && !v && (d -= l, d = Math.max(c - u, d), d = Math.min(q, d), m && a.css({
                                    top: d + "px"
                                })))) : e > F && (m = !0, c = {
                                position: "fixed",
                                top: d
                            }, c.width = "border-box" === a.css("box-sizing") ? a.outerWidth() + "px" : a.width() + "px", a.css(c).addClass(t), null == p && (a.after(h), "left" !== r && "right" !== r || h.append(a)), a.trigger("sticky_kit:stick")), m && w && (null == k && (k = e + u + d > C + n), !v && k))) return v = !0, "static" === g.css("position") && g.css({
                            position: "relative"
                        }), a.css({
                            position: "absolute",
                            bottom: b,
                            top: "auto"
                        }).trigger("sticky_kit:bottom")
                    },
                    y = function () {
                        x();
                        return l()
                    }, H = function () {
                        G = !0;
                        f.off("touchmove", l);
                        f.off("scroll", l);
                        f.off("resize", y);
                        c(document.body).off("sticky_kit:recalc", y);
                        a.off("sticky_kit:detach", H);
                        a.removeData("sticky_kit");
                        a.css({
                            position: "",
                            bottom: "",
                            top: "",
                            width: ""
                        });
                        g.position("position", "");
                        if (m) return null == p && ("left" !== r && "right" !== r || a.insertAfter(h), h.remove()), a.removeClass(t)
                    }, f.on("touchmove", l), f.on("scroll", l), f.on("resize", y), c(document.body).on("sticky_kit:recalc", y), a.on("sticky_kit:detach", H), setTimeout(l,
                        0)
            }
        };
        n = 0;
        for (K = this.length; n < K; n++) b = this[n], J(c(b));
        return this
    }
}).call(this);
/*
 * jQuery mmenu v6.1.8
 * @requires jQuery 1.7.0 or later
 *
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 *
 * License: CC-BY-NC-4.0
 * http://creativecommons.org/licenses/by-nc/4.0/
 */
;
(function (root, factory) {

}(this, function (jQuery) {

    ! function (e) {
        function t() {
            e[n].glbl || (r = {
                $wndw: e(window),
                $docu: e(document),
                $html: e("html"),
                $body: e("body")
            }, s = {}, a = {}, o = {}, e.each([s, a, o], function (e, t) {
                t.add = function (e) {
                    e = e.split(" ");
                    for (var n = 0, i = e.length; n < i; n++) t[e[n]] = t.mm(e[n])
                }
            }), s.mm = function (e) {
                return "mm-" + e
            }, s.add("wrapper menu panels panel nopanel highest opened subopened navbar hasnavbar title btn prev next listview nolistview inset vertical selected divider spacer hidden fullsubopen noanimation"), s.umm = function (e) {
                return "mm-" == e.slice(0, 3) && (e = e.slice(3)), e
            }, a.mm = function (e) {
                return "mm-" + e
            }, a.add("parent child"), o.mm = function (e) {
                return e + ".mm"
            }, o.add("transitionend webkitTransitionEnd click scroll resize keydown mousedown mouseup touchstart touchmove touchend orientationchange"), e[n]._c = s, e[n]._d = a, e[n]._e = o, e[n].glbl = r)
        }
        var n = "mmenu",
            i = "6.1.8";
        if (!(e[n] && e[n].version > i)) {
            e[n] = function (e, t, n) {
                return this.$menu = e, this._api = ["bind", "getInstance", "initPanels", "openPanel", "closePanel", "closeAllPanels", "setSelected"], this.opts = t, this.conf = n, this.vars = {}, this.cbck = {}, this.mtch = {}, "function" == typeof this.___deprecated && this.___deprecated(), this._initAddons(), this._initExtensions(), this._initMenu(), this._initPanels(), this._initOpened(), this._initAnchors(), this._initMatchMedia(), "function" == typeof this.___debug && this.___debug(), this
            }, e[n].version = i, e[n].addons = {}, e[n].uniqueId = 0, e[n].defaults = {
                extensions: [],
                initMenu: function () {},
                initPanels: function () {},
                navbar: {
                    add: !0,
                    title: "Menu",
                    titleLink: "parent"
                },
                onClick: {
                    setSelected: !0
                },
                slidingSubmenus: !0
            }, e[n].configuration = {
                classNames: {
                    divider: "Divider",
                    inset: "Inset",
                    nolistview: "NoListview",
                    nopanel: "NoPanel",
                    panel: "Panel",
                    selected: "Selected",
                    spacer: "Spacer",
                    vertical: "Vertical"
                },
                clone: !1,
                openingInterval: 25,
                panelNodetype: "ul, ol, div",
                transitionDuration: 400
            }, e[n].prototype = {
                getInstance: function () {
                    return this
                },
                initPanels: function (e) {
                    this._initPanels(e)
                },
                openPanel: function (t, i) {
                    if (this.trigger("openPanel:before", t), t && t.length && (t.is("." + s.panel) || (t = t.closest("." + s.panel)), t.is("." + s.panel))) {
                        var o = this;
                        if ("boolean" != typeof i && (i = !0), t.hasClass(s.vertical)) t.add(t.parents("." + s.vertical)).removeClass(s.hidden).parent("li").addClass(s.opened), this.openPanel(t.parents("." + s.panel).not("." + s.vertical).first()), this.trigger("openPanel:start", t), this.trigger("openPanel:finish", t);
                        else {
                            if (t.hasClass(s.opened)) return;
                            var r = this.$pnls.children("." + s.panel),
                                l = r.filter("." + s.opened);
                            if (!e[n].support.csstransitions) return l.addClass(s.hidden).removeClass(s.opened), t.removeClass(s.hidden).addClass(s.opened), this.trigger("openPanel:start", t), void this.trigger("openPanel:finish", t);
                            r.not(t).removeClass(s.subopened);
                            for (var d = t.data(a.parent); d;) d = d.closest("." + s.panel), d.is("." + s.vertical) || d.addClass(s.subopened), d = d.data(a.parent);
                            r.removeClass(s.highest).not(l).not(t).addClass(s.hidden), t.removeClass(s.hidden), this.openPanelStart = function () {
                                l.removeClass(s.opened), t.addClass(s.opened), t.hasClass(s.subopened) ? (l.addClass(s.highest), t.removeClass(s.subopened)) : (l.addClass(s.subopened), t.addClass(s.highest)), this.trigger("openPanel:start", t)
                            }, this.openPanelFinish = function () {
                                l.removeClass(s.highest).addClass(s.hidden), t.removeClass(s.highest), this.trigger("openPanel:finish", t)
                            }, i && !t.hasClass(s.noanimation) ? setTimeout(function () {
                                o.__transitionend(t, function () {
                                    o.openPanelFinish.call(o)
                                }, o.conf.transitionDuration), o.openPanelStart.call(o)
                            }, o.conf.openingInterval) : (this.openPanelStart.call(this), this.openPanelFinish.call(this))
                        }
                        this.trigger("openPanel:after", t)
                    }
                },
                closePanel: function (e) {
                    this.trigger("closePanel:before", e);
                    var t = e.parent();
                    t.hasClass(s.vertical) && (t.removeClass(s.opened), this.trigger("closePanel", e)), this.trigger("closePanel:after", e)
                },
                closeAllPanels: function (e) {
                    this.trigger("closeAllPanels:before"), this.$pnls.find("." + s.listview).children().removeClass(s.selected).filter("." + s.vertical).removeClass(s.opened);
                    var t = this.$pnls.children("." + s.panel),
                        n = e && e.length ? e : t.first();
                    this.$pnls.children("." + s.panel).not(n).removeClass(s.subopened).removeClass(s.opened).removeClass(s.highest).addClass(s.hidden), this.openPanel(n, !1), this.trigger("closeAllPanels:after")
                },
                togglePanel: function (e) {
                    var t = e.parent();
                    t.hasClass(s.vertical) && this[t.hasClass(s.opened) ? "closePanel" : "openPanel"](e)
                },
                setSelected: function (e) {
                    this.trigger("setSelected:before", e), this.$menu.find("." + s.listview).children("." + s.selected).removeClass(s.selected), e.addClass(s.selected), this.trigger("setSelected:after", e)
                },
                bind: function (e, t) {
                    this.cbck[e] = this.cbck[e] || [], this.cbck[e].push(t)
                },
                trigger: function () {
                    var e = this,
                        t = Array.prototype.slice.call(arguments),
                        n = t.shift();
                    if (this.cbck[n])
                        for (var i = 0, s = this.cbck[n].length; i < s; i++) this.cbck[n][i].apply(e, t)
                },
                matchMedia: function (e, t, n) {
                    var i = {
                        yes: t,
                        no: n
                    };
                    this.mtch[e] = this.mtch[e] || [], this.mtch[e].push(i)
                },
                _initAddons: function () {
                    this.trigger("initAddons:before");
                    var t;
                    for (t in e[n].addons) e[n].addons[t].add.call(this), e[n].addons[t].add = function () {};
                    for (t in e[n].addons) e[n].addons[t].setup.call(this);
                    this.trigger("initAddons:after")
                },
                _initExtensions: function () {
                    this.trigger("initExtensions:before");
                    var e = this;
                    this.opts.extensions.constructor === Array && (this.opts.extensions = {
                        all: this.opts.extensions
                    });
                    for (var t in this.opts.extensions) this.opts.extensions[t] = this.opts.extensions[t].length ? "mm-" + this.opts.extensions[t].join(" mm-") : "", this.opts.extensions[t] && ! function (t) {
                        e.matchMedia(t, function () {
                            this.$menu.addClass(this.opts.extensions[t])
                        }, function () {
                            this.$menu.removeClass(this.opts.extensions[t])
                        })
                    }(t);
                    this.trigger("initExtensions:after")
                },
                _initMenu: function () {
                    this.trigger("initMenu:before");
                    this.conf.clone && (this.$orig = this.$menu, this.$menu = this.$orig.clone(), this.$menu.add(this.$menu.find("[id]")).filter("[id]").each(function () {
                        e(this).attr("id", s.mm(e(this).attr("id")))
                    })), this.opts.initMenu.call(this, this.$menu, this.$orig), this.$menu.attr("id", this.$menu.attr("id") || this.__getUniqueId()), this.$pnls = e('<div class="' + s.panels + '" />').append(this.$menu.children(this.conf.panelNodetype)).prependTo(this.$menu);
                    var t = [s.menu];
                    this.opts.slidingSubmenus || t.push(s.vertical), this.$menu.addClass(t.join(" ")).parent().addClass(s.wrapper), this.trigger("initMenu:after")
                },
                _initPanels: function (t) {
                    this.trigger("initPanels:before", t), t = t || this.$pnls.children(this.conf.panelNodetype);
                    var n = e(),
                        i = this,
                        a = function (t) {
                            t.filter(this.conf.panelNodetype).each(function () {
                                var t = i._initPanel(e(this));
                                if (t) {
                                    i._initNavbar(t), i._initListview(t), n = n.add(t);
                                    var o = t.children("." + s.listview).children("li").children(i.conf.panelNodeType).add(t.children("." + i.conf.classNames.panel));
                                    o.length && a.call(i, o)
                                }
                            })
                        };
                    a.call(this, t), this.opts.initPanels.call(this, n), this.trigger("initPanels:after", n)
                },
                _initPanel: function (e) {
                    this.trigger("initPanel:before", e);
                    if (e.hasClass(s.panel)) return e;
                    if (this.__refactorClass(e, this.conf.classNames.panel, "panel"), this.__refactorClass(e, this.conf.classNames.nopanel, "nopanel"), this.__refactorClass(e, this.conf.classNames.vertical, "vertical"), this.__refactorClass(e, this.conf.classNames.inset, "inset"), e.filter("." + s.inset).addClass(s.nopanel), e.hasClass(s.nopanel)) return !1;
                    var t = e.hasClass(s.vertical) || !this.opts.slidingSubmenus;
                    e.removeClass(s.vertical);
                    var n = e.attr("id") || this.__getUniqueId();
                    e.removeAttr("id"), e.is("ul, ol") && (e.wrap("<div />"), e = e.parent()), e.addClass(s.panel + " " + s.hidden).attr("id", n);
                    var i = e.parent("li");
                    return t ? e.add(i).addClass(s.vertical) : e.appendTo(this.$pnls), i.length && (i.data(a.child, e), e.data(a.parent, i)), this.trigger("initPanel:after", e), e
                },
                _initNavbar: function (t) {
                    if (this.trigger("initNavbar:before", t), !t.children("." + s.navbar).length) {
                        var i = t.data(a.parent),
                            o = e('<div class="' + s.navbar + '" />'),
                            r = e[n].i18n(this.opts.navbar.title),
                            l = "";
                        if (i && i.length) {
                            if (i.hasClass(s.vertical)) return;
                            if (i.parent().is("." + s.listview)) var d = i.children("a, span").not("." + s.next);
                            else var d = i.closest("." + s.panel).find('a[href="#' + t.attr("id") + '"]');
                            d = d.first(), i = d.closest("." + s.panel);
                            var c = i.attr("id");
                            switch (r = d.text(), this.opts.navbar.titleLink) {
                                case "anchor":
                                    l = d.attr("href");
                                    break;
                                case "parent":
                                    l = "#" + c
                            }
                            o.append('<a class="' + s.btn + " " + s.prev + '" href="#' + c + '" />')
                        } else if (!this.opts.navbar.title) return;
                        this.opts.navbar.add && t.addClass(s.hasnavbar), o.append('<a class="' + s.title + '"' + (l.length ? ' href="' + l + '"' : "") + ">" + r + "</a>").prependTo(t), this.trigger("initNavbar:after", t)
                    }
                },
                _initListview: function (t) {
                    this.trigger("initListview:before", t);
                    var n = this.__childAddBack(t, "ul, ol");
                    this.__refactorClass(n, this.conf.classNames.nolistview, "nolistview"), n.filter("." + this.conf.classNames.inset).addClass(s.nolistview);
                    var i = n.not("." + s.nolistview).addClass(s.listview).children();
                    this.__refactorClass(i, this.conf.classNames.selected, "selected"), this.__refactorClass(i, this.conf.classNames.divider, "divider"), this.__refactorClass(i, this.conf.classNames.spacer, "spacer");
                    var o = t.data(a.parent);
                    if (o && o.parent().is("." + s.listview) && !o.children("." + s.next).length) {
                        var r = o.children("a, span").first(),
                            l = e('<a class="' + s.next + '" href="#' + t.attr("id") + '" />').insertBefore(r);
                        r.is("span") && l.addClass(s.fullsubopen)
                    }
                    this.trigger("initListview:after", t)
                },
                _initOpened: function () {
                    this.trigger("initOpened:before");
                    var e = this.$pnls.find("." + s.listview).children("." + s.selected).removeClass(s.selected).last().addClass(s.selected),
                        t = e.length ? e.closest("." + s.panel) : this.$pnls.children("." + s.panel).first();
                    this.openPanel(t, !1), this.trigger("initOpened:after")
                },
                _initAnchors: function () {
                    var t = this;
                    r.$body.on(o.click + "-oncanvas", "a[href]", function (i) {
                        var a = e(this),
                            o = !1,
                            r = t.$menu.find(a).length;
                        for (var l in e[n].addons)
                            if (e[n].addons[l].clickAnchor.call(t, a, r)) {
                                o = !0;
                                break
                            } var d = a.attr("href");
                        if (!o && r && d.length > 1 && "#" == d.slice(0, 1)) try {
                            var c = e(d, t.$menu);
                            c.is("." + s.panel) && (o = !0, t[a.parent().hasClass(s.vertical) ? "togglePanel" : "openPanel"](c))
                        } catch (h) {}
                        if (o && i.preventDefault(), !o && r && a.is("." + s.listview + " > li > a") && !a.is('[rel="external"]') && !a.is('[target="_blank"]')) {
                            t.__valueOrFn(t.opts.onClick.setSelected, a) && t.setSelected(e(i.target).parent());
                            var f = t.__valueOrFn(t.opts.onClick.preventDefault, a, "#" == d.slice(0, 1));
                            f && i.preventDefault(), t.__valueOrFn(t.opts.onClick.close, a, f) && t.opts.offCanvas && "function" == typeof t.close && t.close()
                        }
                    })
                },
                _initMatchMedia: function () {
                    var e = this;
                    this._fireMatchMedia(), r.$wndw.on(o.resize, function (t) {
                        e._fireMatchMedia()
                    })
                },
                _fireMatchMedia: function () {
                    for (var e in this.mtch)
                        for (var t = window.matchMedia && window.matchMedia(e).matches ? "yes" : "no", n = 0; n < this.mtch[e].length; n++) this.mtch[e][n][t].call(this)
                },
                _getOriginalMenuId: function () {
                    var e = this.$menu.attr("id");
                    return this.conf.clone && e && e.length && (e = s.umm(e)), e
                },
                __api: function () {
                    var t = this,
                        n = {};
                    return e.each(this._api, function (e) {
                        var i = this;
                        n[i] = function () {
                            var e = t[i].apply(t, arguments);
                            return "undefined" == typeof e ? n : e
                        }
                    }), n
                },
                __valueOrFn: function (e, t, n) {
                    return "function" == typeof e ? e.call(t[0]) : "undefined" == typeof e && "undefined" != typeof n ? n : e
                },
                __refactorClass: function (e, t, n) {
                    return e.filter("." + t).removeClass(t).addClass(s[n])
                },
                __findAddBack: function (e, t) {
                    return e.find(t).add(e.filter(t))
                },
                __childAddBack: function (e, t) {
                    return e.children(t).add(e.filter(t))
                },
                __filterListItems: function (e) {
                    return e.not("." + s.divider).not("." + s.hidden)
                },
                __filterListItemAnchors: function (e) {
                    return this.__filterListItems(e).children("a").not("." + s.next)
                },
                __transitionend: function (e, t, n) {
                    var i = !1,
                        s = function (n) {
                            "undefined" != typeof n && n.target != e[0] || (i || (e.off(o.transitionend), e.off(o.webkitTransitionEnd), t.call(e[0])), i = !0)
                        };
                    e.on(o.transitionend, s), e.on(o.webkitTransitionEnd, s), setTimeout(s, 1.1 * n)
                },
                __getUniqueId: function () {
                    return s.mm(e[n].uniqueId++)
                }
            }, e.fn[n] = function (i, s) {
                t(), i = e.extend(!0, {}, e[n].defaults, i), s = e.extend(!0, {}, e[n].configuration, s);
                var a = e();
                return this.each(function () {
                    var t = e(this);
                    if (!t.data(n)) {
                        var o = new e[n](t, i, s);
                        o.$menu.data(n, o.__api()), a = a.add(o.$menu)
                    }
                }), a
            }, e[n].i18n = function () {
                var t = {};
                return function (n) {
                    switch (typeof n) {
                        case "object":
                            return e.extend(t, n), t;
                        case "string":
                            return t[n] || n;
                        case "undefined":
                        default:
                            return t
                    }
                }
            }(), e[n].support = {
                touch: "ontouchstart" in window || navigator.msMaxTouchPoints || !1,
                csstransitions: function () {
                    return "undefined" == typeof Modernizr || "undefined" == typeof Modernizr.csstransitions || Modernizr.csstransitions
                }(),
                csstransforms: function () {
                    return "undefined" == typeof Modernizr || "undefined" == typeof Modernizr.csstransforms || Modernizr.csstransforms
                }(),
                csstransforms3d: function () {
                    return "undefined" == typeof Modernizr || "undefined" == typeof Modernizr.csstransforms3d || Modernizr.csstransforms3d
                }()
            };
            var s, a, o, r
        }
    }(jQuery),
    /*
     * jQuery mmenu offCanvas add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    function (e) {
        var t = "mmenu",
            n = "offCanvas";
        e[t].addons[n] = {
            setup: function () {
                if (this.opts[n]) {
                    var s = this,
                        a = this.opts[n],
                        r = this.conf[n];
                    o = e[t].glbl, this._api = e.merge(this._api, ["open", "close", "setPage"]), "object" != typeof a && (a = {}), "top" != a.position && "bottom" != a.position || (a.zposition = "front"), a = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], a), "string" != typeof r.pageSelector && (r.pageSelector = "> " + r.pageNodetype), this.vars.opened = !1;
                    var l = [i.offcanvas];
                    "left" != a.position && l.push(i.mm(a.position)), "back" != a.zposition && l.push(i.mm(a.zposition)), e[t].support.csstransforms || l.push(i["no-csstransforms"]), e[t].support.csstransforms3d || l.push(i["no-csstransforms3d"]), this.bind("initMenu:after", function () {
                        var e = this;
                        this.setPage(o.$page), this._initBlocker(), this["_initWindow_" + n](), this.$menu.addClass(l.join(" ")).parent("." + i.wrapper).removeClass(i.wrapper), this.$menu[r.menuInsertMethod](r.menuInsertSelector);
                        var t = window.location.hash;
                        if (t) {
                            var s = this._getOriginalMenuId();
                            s && s == t.slice(1) && setTimeout(function () {
                                e.open()
                            }, 1e3)
                        }
                    }), this.bind("initExtensions:after", function () {
                        for (var e = [i.mm("widescreen"), i.mm("iconbar")], t = 0; t < e.length; t++)
                            for (var n in this.opts.extensions)
                                if (this.opts.extensions[n].indexOf(e[t]) > -1) {
                                    ! function (t, n) {
                                        s.matchMedia(t, function () {
                                            o.$html.addClass(e[n])
                                        }, function () {
                                            o.$html.removeClass(e[n])
                                        })
                                    }(n, t);
                                    break
                                }
                    }), this.bind("open:start:sr-aria", function () {
                        this.__sr_aria(this.$menu, "hidden", !1)
                    }), this.bind("close:finish:sr-aria", function () {
                        this.__sr_aria(this.$menu, "hidden", !0)
                    }), this.bind("initMenu:after:sr-aria", function () {
                        this.__sr_aria(this.$menu, "hidden", !0)
                    })
                }
            },
            add: function () {
                i = e[t]._c, s = e[t]._d, a = e[t]._e, i.add("offcanvas slideout blocking modal background opening blocker page no-csstransforms3d"), s.add("style")
            },
            clickAnchor: function (e, t) {
                var s = this;
                if (this.opts[n]) {
                    var a = this._getOriginalMenuId();
                    if (a && e.is('[href="#' + a + '"]')) {
                        if (t) return !0;
                        var r = e.closest("." + i.menu);
                        if (r.length) {
                            var l = r.data("mmenu");
                            if (l && l.close) return l.close(), s.__transitionend(r, function () {
                                s.open()
                            }, s.conf.transitionDuration), !0
                        }
                        return this.open(), !0
                    }
                    if (o.$page) return a = o.$page.first().attr("id"), a && e.is('[href="#' + a + '"]') ? (this.close(), !0) : void 0
                }
            }
        }, e[t].defaults[n] = {
            position: "left",
            zposition: "back",
            blockUI: !0,
            moveBackground: !0
        }, e[t].configuration[n] = {
            pageNodetype: "div",
            pageSelector: null,
            noPageSelector: [],
            wrapPageIfNeeded: !0,
            menuInsertMethod: "prependTo",
            menuInsertSelector: "body"
        }, e[t].prototype.open = function () {
            if (this.trigger("open:before"), !this.vars.opened) {
                var e = this;
                this._openSetup(), setTimeout(function () {
                    e._openFinish()
                }, this.conf.openingInterval), this.trigger("open:after")
            }
        }, e[t].prototype._openSetup = function () {
            var t = this,
                r = this.opts[n];
            this.closeAllOthers(), o.$page.each(function () {
                e(this).data(s.style, e(this).attr("style") || "")
            }), o.$wndw.trigger(a.resize + "-" + n, [!0]);
            var l = [i.opened];
            r.blockUI && l.push(i.blocking), "modal" == r.blockUI && l.push(i.modal), r.moveBackground && l.push(i.background), "left" != r.position && l.push(i.mm(this.opts[n].position)), "back" != r.zposition && l.push(i.mm(this.opts[n].zposition)), o.$html.addClass(l.join(" ")), setTimeout(function () {
                t.vars.opened = !0
            }, this.conf.openingInterval), this.$menu.addClass(i.opened)
        }, e[t].prototype._openFinish = function () {
            var e = this;
            this.__transitionend(o.$page.first(), function () {
                e.trigger("open:finish")
            }, this.conf.transitionDuration), this.trigger("open:start"), o.$html.addClass(i.opening)
        }, e[t].prototype.close = function () {
            if (this.trigger("close:before"), this.vars.opened) {
                var t = this;
                this.__transitionend(o.$page.first(), function () {
                    t.$menu.removeClass(i.opened);
                    var a = [i.opened, i.blocking, i.modal, i.background, i.mm(t.opts[n].position), i.mm(t.opts[n].zposition)];
                    o.$html.removeClass(a.join(" ")), o.$page.each(function () {
                        e(this).attr("style", e(this).data(s.style))
                    }), t.vars.opened = !1, t.trigger("close:finish")
                }, this.conf.transitionDuration), this.trigger("close:start"), o.$html.removeClass(i.opening), this.trigger("close:after")
            }
        }, e[t].prototype.closeAllOthers = function () {
            o.$body.find("." + i.menu + "." + i.offcanvas).not(this.$menu).each(function () {
                var n = e(this).data(t);
                n && n.close && n.close()
            })
        }, e[t].prototype.setPage = function (t) {
            this.trigger("setPage:before", t);
            var s = this,
                a = this.conf[n];
            t && t.length || (t = o.$body.find(a.pageSelector), a.noPageSelector.length && (t = t.not(a.noPageSelector.join(", "))), t.length > 1 && a.wrapPageIfNeeded && (t = t.wrapAll("<" + this.conf[n].pageNodetype + " />").parent())), t.each(function () {
                e(this).attr("id", e(this).attr("id") || s.__getUniqueId())
            }), t.addClass(i.page + " " + i.slideout), o.$page = t, this.trigger("setPage:after", t)
        }, e[t].prototype["_initWindow_" + n] = function () {
            o.$wndw.off(a.keydown + "-" + n).on(a.keydown + "-" + n, function (e) {
                if (o.$html.hasClass(i.opened) && 9 == e.keyCode) return e.preventDefault(), !1
            });
            var e = 0;
            o.$wndw.off(a.resize + "-" + n).on(a.resize + "-" + n, function (t, n) {
                if (1 == o.$page.length && (n || o.$html.hasClass(i.opened))) {
                    var s = o.$wndw.height();
                    (n || s != e) && (e = s, o.$page.css("minHeight", s))
                }
            })
        }, e[t].prototype._initBlocker = function () {
            var t = this;
            this.opts[n].blockUI && (o.$blck || (o.$blck = e('<div id="' + i.blocker + '" class="' + i.slideout + '" />')), o.$blck.appendTo(o.$body).off(a.touchstart + "-" + n + " " + a.touchmove + "-" + n).on(a.touchstart + "-" + n + " " + a.touchmove + "-" + n, function (e) {
                e.preventDefault(), e.stopPropagation(), o.$blck.trigger(a.mousedown + "-" + n)
            }).off(a.mousedown + "-" + n).on(a.mousedown + "-" + n, function (e) {
                e.preventDefault(), o.$html.hasClass(i.modal) || (t.closeAllOthers(), t.close())
            }))
        };
        var i, s, a, o
    }(jQuery),
    /*
     * jQuery mmenu scrollBugFix add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    function (e) {
        var t = "mmenu",
            n = "scrollBugFix";
        e[t].addons[n] = {
            setup: function () {
                var s = this.opts[n];
                this.conf[n];
                o = e[t].glbl, e[t].support.touch && this.opts.offCanvas && this.opts.offCanvas.blockUI && ("boolean" == typeof s && (s = {
                    fix: s
                }), "object" != typeof s && (s = {}), s = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], s), s.fix && (this.bind("open:start", function () {
                    this.$pnls.children("." + i.opened).scrollTop(0)
                }), this.bind("initMenu:after", function () {
                    this["_initWindow_" + n]()
                })))
            },
            add: function () {
                i = e[t]._c, s = e[t]._d, a = e[t]._e
            },
            clickAnchor: function (e, t) {}
        }, e[t].defaults[n] = {
            fix: !0
        }, e[t].prototype["_initWindow_" + n] = function () {
            var t = this;
            o.$docu.off(a.touchmove + "-" + n).on(a.touchmove + "-" + n, function (e) {
                o.$html.hasClass(i.opened) && e.preventDefault()
            });
            var s = !1;
            o.$body.off(a.touchstart + "-" + n).on(a.touchstart + "-" + n, "." + i.panels + "> ." + i.panel, function (e) {
                o.$html.hasClass(i.opened) && (s || (s = !0, 0 === e.currentTarget.scrollTop ? e.currentTarget.scrollTop = 1 : e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight && (e.currentTarget.scrollTop -= 1), s = !1))
            }).off(a.touchmove + "-" + n).on(a.touchmove + "-" + n, "." + i.panels + "> ." + i.panel, function (t) {
                o.$html.hasClass(i.opened) && e(this)[0].scrollHeight > e(this).innerHeight() && t.stopPropagation()
            }), o.$wndw.off(a.orientationchange + "-" + n).on(a.orientationchange + "-" + n, function () {
                t.$pnls.children("." + i.opened).scrollTop(0).css({
                    "-webkit-overflow-scrolling": "auto"
                }).css({
                    "-webkit-overflow-scrolling": "touch"
                })
            })
        };
        var i, s, a, o
    }(jQuery),
    /*
     * jQuery mmenu screenReader add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    function (e) {
        var t = "mmenu",
            n = "screenReader";
        e[t].addons[n] = {
            setup: function () {
                var a = this,
                    r = this.opts[n],
                    l = this.conf[n];
                o = e[t].glbl, "boolean" == typeof r && (r = {
                    aria: r,
                    text: r
                }), "object" != typeof r && (r = {}), r = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], r), r.aria && (this.bind("initAddons:after", function () {
                    this.bind("initMenu:after", function () {
                        this.trigger("initMenu:after:sr-aria")
                    }), this.bind("initNavbar:after", function () {
                        this.trigger("initNavbar:after:sr-aria", arguments[0])
                    }), this.bind("openPanel:start", function () {
                        this.trigger("openPanel:start:sr-aria", arguments[0])
                    }), this.bind("close:start", function () {
                        this.trigger("close:start:sr-aria")
                    }), this.bind("close:finish", function () {
                        this.trigger("close:finish:sr-aria")
                    }), this.bind("open:start", function () {
                        this.trigger("open:start:sr-aria")
                    }), this.bind("open:finish", function () {
                        this.trigger("open:finish:sr-aria")
                    })
                }), this.bind("updateListview", function () {
                    this.$pnls.find("." + i.listview).children().each(function () {
                        a.__sr_aria(e(this), "hidden", e(this).is("." + i.hidden))
                    })
                }), this.bind("openPanel:start", function (e) {
                    var t = this.$menu.find("." + i.panel).not(e).not(e.parents("." + i.panel)),
                        n = e.add(e.find("." + i.vertical + "." + i.opened).children("." + i.panel));
                    this.__sr_aria(t, "hidden", !0), this.__sr_aria(n, "hidden", !1)
                }), this.bind("closePanel", function (e) {
                    this.__sr_aria(e, "hidden", !0)
                }), this.bind("initPanels:after", function (t) {
                    var n = t.find("." + i.prev + ", ." + i.next).each(function () {
                        a.__sr_aria(e(this), "owns", e(this).attr("href").replace("#", ""))
                    });
                    this.__sr_aria(n, "haspopup", !0)
                }), this.bind("initNavbar:after", function (e) {
                    var t = e.children("." + i.navbar);
                    this.__sr_aria(t, "hidden", !e.hasClass(i.hasnavbar))
                }), r.text && (this.bind("initlistview:after", function (e) {
                    var t = e.find("." + i.listview).find("." + i.fullsubopen).parent().children("span");
                    this.__sr_aria(t, "hidden", !0)
                }), "parent" == this.opts.navbar.titleLink && this.bind("initNavbar:after", function (e) {
                    var t = e.children("." + i.navbar),
                        n = !!t.children("." + i.prev).length;
                    this.__sr_aria(t.children("." + i.title), "hidden", n)
                }))), r.text && (this.bind("initAddons:after", function () {
                    this.bind("setPage:after", function () {
                        this.trigger("setPage:after:sr-text", arguments[0])
                    })
                }), this.bind("initNavbar:after", function (n) {
                    var s = n.children("." + i.navbar),
                        a = s.children("." + i.title).text(),
                        o = e[t].i18n(l.text.closeSubmenu);
                    a && (o += " (" + a + ")"), s.children("." + i.prev).html(this.__sr_text(o))
                }), this.bind("initListview:after", function (n) {
                    var o = n.data(s.parent);
                    if (o && o.length) {
                        var r = o.children("." + i.next),
                            d = r.nextAll("span, a").first().text(),
                            c = e[t].i18n(l.text[r.parent().is("." + i.vertical) ? "toggleSubmenu" : "openSubmenu"]);
                        d && (c += " (" + d + ")"), r.html(a.__sr_text(c))
                    }
                }))
            },
            add: function () {
                i = e[t]._c, s = e[t]._d, a = e[t]._e, i.add("sronly")
            },
            clickAnchor: function (e, t) {}
        }, e[t].defaults[n] = {
            aria: !0,
            text: !0
        }, e[t].configuration[n] = {
            text: {
                closeMenu: "Close menu",
                closeSubmenu: "Close submenu",
                openSubmenu: "Open submenu",
                toggleSubmenu: "Toggle submenu"
            }
        }, e[t].prototype.__sr_aria = function (e, t, n) {
            e.prop("aria-" + t, n)[n ? "attr" : "removeAttr"]("aria-" + t, n)
        }, e[t].prototype.__sr_text = function (e) {
            return '<span class="' + i.sronly + '">' + e + "</span>"
        };
        var i, s, a, o
    }(jQuery),
    /*
     * jQuery mmenu autoHeight add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    function (e) {
        var t = "mmenu",
            n = "autoHeight";
        e[t].addons[n] = {
            setup: function () {
                var s = this.opts[n];
                this.conf[n];
                if (o = e[t].glbl, "boolean" == typeof s && s && (s = {
                        height: "auto"
                    }), "string" == typeof s && (s = {
                        height: s
                    }), "object" != typeof s && (s = {}), s = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], s), "auto" == s.height || "highest" == s.height) {
                    this.bind("initMenu:after", function () {
                        this.$menu.addClass(i.autoheight)
                    });
                    var a = function (t) {
                        if (!this.opts.offCanvas || this.vars.opened) {
                            var n = Math.max(parseInt(this.$pnls.css("top"), 10), 0) || 0,
                                a = Math.max(parseInt(this.$pnls.css("bottom"), 10), 0) || 0,
                                o = 0;
                            this.$menu.addClass(i.measureheight), "auto" == s.height ? (t = t || this.$pnls.children("." + i.opened), t.is("." + i.vertical) && (t = t.parents("." + i.panel).not("." + i.vertical)), t.length || (t = this.$pnls.children("." + i.panel)), o = t.first().outerHeight()) : "highest" == s.height && this.$pnls.children().each(function () {
                                var t = e(this);
                                t.is("." + i.vertical) && (t = t.parents("." + i.panel).not("." + i.vertical).first()), o = Math.max(o, t.outerHeight())
                            }), this.$menu.height(o + n + a).removeClass(i.measureheight)
                        }
                    };
                    this.opts.offCanvas && this.bind("open:start", a), "highest" == s.height && this.bind("initPanels:after", a), "auto" == s.height && (this.bind("updateListview", a), this.bind("openPanel:start", a), this.bind("closePanel", a))
                }
            },
            add: function () {
                i = e[t]._c, s = e[t]._d, a = e[t]._e, i.add("autoheight measureheight"), a.add("resize")
            },
            clickAnchor: function (e, t) {}
        }, e[t].defaults[n] = {
            height: "default"
        };
        var i, s, a, o
    }(jQuery),
    /*
     * jQuery mmenu counters add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    function (e) {
        var t = "mmenu",
            n = "counters";
        e[t].addons[n] = {
            setup: function () {
                var a = this,
                    r = this.opts[n];
                this.conf[n];
                if (o = e[t].glbl, "boolean" == typeof r && (r = {
                        add: r,
                        update: r
                    }), "object" != typeof r && (r = {}), r = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], r), this.bind("initListview:after", function (t) {
                        this.__refactorClass(e("em", t), this.conf.classNames[n].counter, "counter")
                    }), r.add && this.bind("initListview:after", function (t) {
                        var n;
                        switch (r.addTo) {
                            case "panels":
                                n = t;
                                break;
                            default:
                                n = t.filter(r.addTo)
                        }
                        n.each(function () {
                            var t = e(this).data(s.parent);
                            t && (t.children("em." + i.counter).length || t.prepend(e('<em class="' + i.counter + '" />')))
                        })
                    }), r.update) {
                    var l = function (t) {
                        t = t || this.$pnls.children("." + i.panel), t.each(function () {
                            var t = e(this),
                                n = t.data(s.parent);
                            if (n) {
                                var o = n.children("em." + i.counter);
                                o.length && (t = t.children("." + i.listview), t.length && o.html(a.__filterListItems(t.children()).length))
                            }
                        })
                    };
                    this.bind("initListview:after", l), this.bind("updateListview", l)
                }
            },
            add: function () {
                i = e[t]._c, s = e[t]._d, a = e[t]._e, i.add("counter search noresultsmsg")
            },
            clickAnchor: function (e, t) {}
        }, e[t].defaults[n] = {
            add: !1,
            addTo: "panels",
            count: !1
        }, e[t].configuration.classNames[n] = {
            counter: "Counter"
        };
        var i, s, a, o
    }(jQuery),
    /*

     * jQuery mmenu fixedElements add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    function (e) {
        var t = "mmenu",
            n = "fixedElements";
        e[t].addons[n] = {
            setup: function () {
                if (this.opts.offCanvas) {
                    var s = (this.opts[n], this.conf[n]);
                    o = e[t].glbl;
                    var a = function (t) {
                        var a = this.conf.classNames[n].fixed,
                            r = t.find("." + a);
                        this.__refactorClass(r, a, "slideout"), r[s.elemInsertMethod](s.elemInsertSelector);
                        var l = this.conf.classNames[n].sticky,
                            d = t.find("." + l);
                        this.__refactorClass(d, l, "sticky"), d = t.find("." + i.sticky), d.length && (this.bind("open:before", function () {
                            var t = o.$wndw.scrollTop() + s.sticky.offset;
                            d.each(function () {
                                e(this).css("top", parseInt(e(this).css("top"), 10) + t)
                            })
                        }), this.bind("close:finish", function () {
                            d.css("top", "")
                        }))
                    };
                    this.bind("setPage:after", a)
                }
            },
            add: function () {
                i = e[t]._c, s = e[t]._d, a = e[t]._e, i.add("sticky")
            },
            clickAnchor: function (e, t) {}
        }, e[t].configuration[n] = {
            sticky: {
                offset: 0
            },
            elemInsertMethod: "appendTo",
            elemInsertSelector: "body"
        }, e[t].configuration.classNames[n] = {
            fixed: "Fixed",
            sticky: "Sticky"
        };
        var i, s, a, o
    }(jQuery),
    /*
     
     * jQuery mmenu lazySubmenus add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    function (e) {
        var t = "mmenu",
            n = "lazySubmenus";
        e[t].addons[n] = {
            setup: function () {
                var s = this.opts[n];
                this.conf[n];
                o = e[t].glbl, "boolean" == typeof s && (s = {
                    load: s
                }), "object" != typeof s && (s = {}), s = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], s), s.load && (this.bind("initMenu:after", function () {
                    this.$pnls.find("li").children(this.conf.panelNodetype).not("." + i.inset).not("." + i.nolistview).not("." + i.nopanel).addClass(i.lazysubmenu + " " + i.nolistview + " " + i.nopanel)
                }), this.bind("initPanels:before", function (e) {
                    e = e || this.$pnls.children(this.conf.panelNodetype), this.__findAddBack(e, "." + i.lazysubmenu).not("." + i.lazysubmenu + " ." + i.lazysubmenu).removeClass(i.lazysubmenu + " " + i.nolistview + " " + i.nopanel)
                }), this.bind("initOpened:before", function () {
                    var e = this.$pnls.find("." + this.conf.classNames.selected).parents("." + i.lazysubmenu);
                    e.length && (e.removeClass(i.lazysubmenu + " " + i.nolistview + " " + i.nopanel), this.initPanels(e.last()))
                }), this.bind("openPanel:before", function (e) {
                    var t = this.__findAddBack(e, "." + i.lazysubmenu).not("." + i.lazysubmenu + " ." + i.lazysubmenu);
                    t.length && this.initPanels(t)
                }))
            },
            add: function () {
                i = e[t]._c, s = e[t]._d, a = e[t]._e, i.add("lazysubmenu"), s.add("lazysubmenu")
            },
            clickAnchor: function (e, t) {}
        }, e[t].defaults[n] = {
            load: !1
        }, e[t].configuration[n] = {};
        var i, s, a, o
    }(jQuery),
    /*
     * jQuery mmenu navbar add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    function (e) {
        var t = "mmenu",
            n = "navbars";
        e[t].addons[n] = {
            setup: function () {
                var s = this,
                    a = this.opts[n],
                    r = this.conf[n];
                if (o = e[t].glbl, "undefined" != typeof a) {
                    a instanceof Array || (a = [a]);
                    var l = {},
                        d = {};
                    a.length && (e.each(a, function (o) {
                        var c = a[o];
                        "boolean" == typeof c && c && (c = {}), "object" != typeof c && (c = {}), "undefined" == typeof c.content && (c.content = ["prev", "title"]), c.content instanceof Array || (c.content = [c.content]), c = e.extend(!0, {}, s.opts.navbar, c);
                        var h = e('<div class="' + i.navbar + '" />'),
                            f = c.height;
                        "number" != typeof f && (f = 1), f = Math.min(4, Math.max(1, f)), h.addClass(i.navbar + "-size-" + f);
                        var u = c.position;
                        "bottom" != u && (u = "top"), l[u] || (l[u] = 0), l[u] += f, d[u] || (d[u] = e('<div class="' + i.navbars + "-" + u + '" />')), d[u].append(h);
                        for (var p = 0, v = 0, m = c.content.length; v < m; v++) {
                            var b = e[t].addons[n][c.content[v]] || !1;
                            b ? p += b.call(s, h, c, r) : (b = c.content[v], b instanceof e || (b = e(c.content[v])), h.append(b))
                        }
                        p += Math.ceil(h.children().not("." + i.btn).length / f), p > 1 && h.addClass(i.navbar + "-content-" + p), h.children("." + i.btn).length && h.addClass(i.hasbtns)
                    }), this.bind("initMenu:after", function () {
                        for (var e in l) this.$menu.addClass(i.hasnavbar + "-" + e + "-" + l[e]), this.$menu["bottom" == e ? "append" : "prepend"](d[e])
                    }))
                }
            },
            add: function () {
                i = e[t]._c, s = e[t]._d, a = e[t]._e, i.add("navbars close hasbtns")
            },
            clickAnchor: function (e, t) {}
        }, e[t].configuration[n] = {
            breadcrumbSeparator: "/"
        }, e[t].configuration.classNames[n] = {};
        var i, s, a, o
    }(jQuery),
    /*

     * jQuery mmenu toggles add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    function (e) {
        var t = "mmenu",
            n = "toggles";
        e[t].addons[n] = {
            setup: function () {
                var s = this;
                this.opts[n], this.conf[n];
                o = e[t].glbl, this.bind("initListview:after", function (t) {
                    this.__refactorClass(t.find("input"), this.conf.classNames[n].toggle, "toggle"), this.__refactorClass(t.find("input"), this.conf.classNames[n].check, "check"), t.find("input." + i.toggle + ", input." + i.check).each(function () {
                        var t = e(this),
                            n = t.closest("li"),
                            a = t.hasClass(i.toggle) ? "toggle" : "check",
                            o = t.attr("id") || s.__getUniqueId();
                        n.children('label[for="' + o + '"]').length || (t.attr("id", o), n.prepend(t), e('<label for="' + o + '" class="' + i[a] + '"></label>').insertBefore(n.children("a, span").last()))
                    })
                })
            },
            add: function () {
                i = e[t]._c, s = e[t]._d, a = e[t]._e, i.add("toggle check")
            },
            clickAnchor: function (e, t) {}
        }, e[t].configuration.classNames[n] = {
            toggle: "Toggle",
            check: "Check"
        };
        var i, s, a, o
    }(jQuery);
    return true;
}));

/*
 * jQuery Show hide passoword
 */
(function (factory) {

})(function ($, undef) {
    var dataKey = "plugin_hideShowPassword",
        shorthandArgs = ["show", "innerToggle"],
        SPACE = 32,
        ENTER = 13;
    var canSetInputAttribute = function () {
        var body = document.body,
            input = document.createElement("input"),
            result = true;
        if (!body) {
            body = document.createElement("body")
        }
        input = body.appendChild(input);
        try {
            input.setAttribute("type", "text")
        } catch (e) {
            result = false
        }
        body.removeChild(input);
        return result
    }();
    var defaults = {
        show: "infer",
        innerToggle: false,
        enable: canSetInputAttribute,
        triggerOnToggle: false,
        className: "hideShowPassword-field",
        initEvent: "hideShowPasswordInit",
        changeEvent: "passwordVisibilityChange",
        props: {
            autocapitalize: "off",
            autocomplete: "off",
            autocorrect: "off",
            spellcheck: "false"
        },
        toggle: {
            element: '<button type="button">',
            className: "hideShowPassword-toggle",
            touchSupport: typeof Modernizr === "undefined" ? false : Modernizr.touchevents,
            attachToEvent: "click.hideShowPassword",
            attachToTouchEvent: "touchstart.hideShowPassword mousedown.hideShowPassword",
            attachToKeyEvent: "keyup",
            attachToKeyCodes: true,
            styles: {
                position: "absolute"
            },
            touchStyles: {
                pointerEvents: "none"
            },
            position: "infer",
            verticalAlign: "middle",
            offset: 0,
            attr: {
                role: "button",
                "aria-label": "Show Password",
                title: "Show Password",
                tabIndex: 0
            }
        },
        wrapper: {
            element: "<div>",
            className: "hideShowPassword-wrapper",
            enforceWidth: true,
            styles: {
                position: "relative"
            },
            inheritStyles: ["display", "verticalAlign", "marginTop", "marginRight", "marginBottom", "marginLeft"],
            innerElementStyles: {
                marginTop: 0,
                marginRight: 0,
                marginBottom: 0,
                marginLeft: 0
            }
        },
        states: {
            shown: {
                className: "hideShowPassword-shown",
                changeEvent: "passwordShown",
                props: {
                    type: "text"
                },
                toggle: {
                    className: "hideShowPassword-toggle-hide",
                    content: "Hide",
                    attr: {
                        "aria-pressed": "true",
                        title: "Hide Password"
                    }
                }
            },
            hidden: {
                className: "hideShowPassword-hidden",
                changeEvent: "passwordHidden",
                props: {
                    type: "password"
                },
                toggle: {
                    className: "hideShowPassword-toggle-show",
                    content: "Show",
                    attr: {
                        "aria-pressed": "false",
                        title: "Show Password"
                    }
                }
            }
        }
    };

    function HideShowPassword(element, options) {
        this.element = $(element);
        this.wrapperElement = $();
        this.toggleElement = $();
        this.init(options)
    }
    HideShowPassword.prototype = {
        init: function (options) {
            if (this.update(options, defaults)) {
                this.element.addClass(this.options.className);
                if (this.options.innerToggle) {
                    this.wrapElement(this.options.wrapper);
                    this.initToggle(this.options.toggle);
                    if (typeof this.options.innerToggle === "string") {
                        this.toggleElement.hide();
                        this.element.one(this.options.innerToggle, $.proxy(function () {
                            this.toggleElement.show()
                        }, this))
                    }
                }
                this.element.trigger(this.options.initEvent, [this])
            }
        },
        update: function (options, base) {
            this.options = this.prepareOptions(options, base);
            if (this.updateElement()) {
                this.element.trigger(this.options.changeEvent, [this]).trigger(this.state().changeEvent, [this])
            }
            return this.options.enable
        },
        toggle: function (showVal) {
            showVal = showVal || "toggle";
            return this.update({
                show: showVal
            })
        },
        prepareOptions: function (options, base) {
            var original = options || {},
                keyCodes = [],
                testElement;
            base = base || this.options;
            options = $.extend(true, {}, base, options);
            if (original.hasOwnProperty("wrapper") && original.wrapper.hasOwnProperty("inheritStyles")) {
                options.wrapper.inheritStyles = original.wrapper.inheritStyles
            }
            if (options.enable) {
                if (options.show === "toggle") {
                    options.show = this.isType("hidden", options.states)
                } else if (options.show === "infer") {
                    options.show = this.isType("shown", options.states)
                }
                if (options.toggle.position === "infer") {
                    options.toggle.position = this.element.css("text-direction") === "rtl" ? "left" : "right"
                }
                if (!$.isArray(options.toggle.attachToKeyCodes)) {
                    if (options.toggle.attachToKeyCodes === true) {
                        testElement = $(options.toggle.element);
                        switch (testElement.prop("tagName").toLowerCase()) {
                            case "button":
                            case "input":
                                break;
                            case "a":
                                if (testElement.filter("[href]").length) {
                                    keyCodes.push(SPACE);
                                    break
                                }
                                default:
                                    keyCodes.push(SPACE, ENTER);
                                    break
                        }
                    }
                    options.toggle.attachToKeyCodes = keyCodes
                }
            }
            return options
        },
        updateElement: function () {
            if (!this.options.enable || this.isType()) return false;
            this.element.prop($.extend({}, this.options.props, this.state().props)).addClass(this.state().className).removeClass(this.otherState().className);
            if (this.options.triggerOnToggle) {
                this.element.trigger(this.options.triggerOnToggle, [this])
            }
            this.updateToggle();
            return true
        },
        isType: function (comparison, states) {
            states = states || this.options.states;
            comparison = comparison || this.state(undef, undef, states).props.type;
            if (states[comparison]) {
                comparison = states[comparison].props.type
            }
            return this.element.prop("type") === comparison
        },
        state: function (key, invert, states) {
            states = states || this.options.states;
            if (key === undef) {
                key = this.options.show
            }
            if (typeof key === "boolean") {
                key = key ? "shown" : "hidden"
            }
            if (invert) {
                key = key === "shown" ? "hidden" : "shown"
            }
            return states[key]
        },
        otherState: function (key) {
            return this.state(key, true)
        },
        wrapElement: function (options) {
            var enforceWidth = options.enforceWidth,
                targetWidth;
            if (!this.wrapperElement.length) {
                targetWidth = this.element.outerWidth();
                $.each(options.inheritStyles, $.proxy(function (index, prop) {
                    options.styles[prop] = this.element.css(prop)
                }, this));
                this.element.css(options.innerElementStyles).wrap($(options.element).addClass(options.className).css(options.styles));
                this.wrapperElement = this.element.parent();
                if (enforceWidth === true) {
                    enforceWidth = this.wrapperElement.outerWidth() === targetWidth ? false : targetWidth
                }
                if (enforceWidth !== false) {
                    this.wrapperElement.css("width", enforceWidth)
                }
            }
            return this.wrapperElement
        },
        initToggle: function (options) {
            if (!this.toggleElement.length) {
                this.toggleElement = $(options.element).attr(options.attr).addClass(options.className).css(options.styles).appendTo(this.wrapperElement);
                this.updateToggle();
                this.positionToggle(options.position, options.verticalAlign, options.offset);
                if (options.touchSupport) {
                    this.toggleElement.css(options.touchStyles);
                    this.element.on(options.attachToTouchEvent, $.proxy(this.toggleTouchEvent, this))
                } else {
                    this.toggleElement.on(options.attachToEvent, $.proxy(this.toggleEvent, this))
                }
                if (options.attachToKeyCodes.length) {
                    this.toggleElement.on(options.attachToKeyEvent, $.proxy(this.toggleKeyEvent, this))
                }
            }
            return this.toggleElement
        },
        positionToggle: function (position, verticalAlign, offset) {
            var styles = {};
            styles[position] = offset;
            switch (verticalAlign) {
                case "top":
                case "bottom":
                    styles[verticalAlign] = offset;
                    break;
                case "middle":
                    styles.top = "50%";
                    styles.marginTop = this.toggleElement.outerHeight() / -2;
                    break
            }
            return this.toggleElement.css(styles)
        },
        updateToggle: function (state, otherState) {
            var paddingProp, targetPadding;
            if (this.toggleElement.length) {
                paddingProp = "padding-" + this.options.toggle.position;
                state = state || this.state().toggle;
                otherState = otherState || this.otherState().toggle;
                this.toggleElement.attr(state.attr).addClass(state.className).removeClass(otherState.className).html(state.content);
                targetPadding = this.toggleElement.outerWidth() + this.options.toggle.offset * 2;
                if (this.element.css(paddingProp) !== targetPadding) {
                    this.element.css(paddingProp, targetPadding)
                }
            }
            return this.toggleElement
        },
        toggleEvent: function (event) {
            event.preventDefault();
            this.toggle()
        },
        toggleKeyEvent: function (event) {
            $.each(this.options.toggle.attachToKeyCodes, $.proxy(function (index, keyCode) {
                if (event.which === keyCode) {
                    this.toggleEvent(event);
                    return false
                }
            }, this))
        },
        toggleTouchEvent: function (event) {
            var toggleX = this.toggleElement.offset().left,
                eventX, lesser, greater;
            if (toggleX) {
                eventX = event.pageX || event.originalEvent.pageX;
                if (this.options.toggle.position === "left") {
                    toggleX += this.toggleElement.outerWidth();
                    lesser = eventX;
                    greater = toggleX
                } else {
                    lesser = toggleX;
                    greater = eventX
                }
                if (greater >= lesser) {
                    this.toggleEvent(event)
                }
            }
        }
    };
    $.fn.hideShowPassword = function () {
        var options = {};
        $.each(arguments, function (index, value) {
            var newOptions = {};
            if (typeof value === "object") {
                newOptions = value
            } else if (shorthandArgs[index]) {
                newOptions[shorthandArgs[index]] = value
            } else {
                return false
            }
            $.extend(true, options, newOptions)
        });
        return this.each(function () {
            var $this = $(this),
                data = $this.data(dataKey);
            if (data) {
                data.update(options)
            } else {
                $this.data(dataKey, new HideShowPassword(this, options))
            }
        })
    };
    $.each({
        show: true,
        hide: false,
        toggle: "toggle"
    }, function (verb, showVal) {
        $.fn[verb + "Password"] = function (innerToggle, options) {
            return this.hideShowPassword(showVal, innerToggle, options)
        }
    })
});
/*  jQuery Nice Select - v1.0
    https://github.com/hernansartorio/jquery-nice-select
    Made by Hernán Sartorio  */
! function (e) {
    e.fn.niceSelect = function (t) {
        function s(t) {
            t.after(e("<div></div>").addClass("nice-select").addClass(t.attr("class") || "").addClass(t.attr("disabled") ? "disabled" : "").attr("tabindex", t.attr("disabled") ? null : "0").html('<span class="current"></span><ul class="list"></ul>'));
            var s = t.next(),
                n = t.find("option"),
                i = t.find("option:selected");
            s.find(".current").html(i.data("display") || i.text()), n.each(function (t) {
                var n = e(this),
                    i = n.data("display");
                s.find("ul").append(e("<li></li>").attr("data-value", n.val()).attr("data-display", i || null).addClass("option" + (n.is(":selected") ? " selected" : "") + (n.is(":disabled") ? " disabled" : "")).html(n.text()))
            })
        }
        if ("string" == typeof t) return "update" == t ? this.each(function () {
            var t = e(this),
                n = e(this).next(".nice-select"),
                i = n.hasClass("open");
            n.length && (n.remove(), s(t), i && t.next().trigger("click"))
        }) : "destroy" == t ? (this.each(function () {
            var t = e(this),
                s = e(this).next(".nice-select");
            s.length && (s.remove(), t.css("display", ""))
        }), 0 == e(".nice-select").length && e(document).off(".nice_select")) : console.log('Method "' + t + '" does not exist.'), this;
        this.hide(), this.each(function () {
            var t = e(this);
            t.next().hasClass("nice-select") || s(t)
        }), e(document).off(".nice_select"), e(document).on("click.nice_select", ".nice-select", function (t) {
            var s = e(this);
            e(".nice-select").not(s).removeClass("open"), s.toggleClass("open"), s.hasClass("open") ? (s.find(".option"), s.find(".focus").removeClass("focus"), s.find(".selected").addClass("focus")) : s.focus()
        }), e(document).on("click.nice_select", function (t) {
            0 === e(t.target).closest(".nice-select").length && e(".nice-select").removeClass("open").find(".option")
        }), e(document).on("click.nice_select", ".nice-select .option:not(.disabled)", function (t) {
            var s = e(this),
                n = s.closest(".nice-select");
            n.find(".selected").removeClass("selected"), s.addClass("selected");
            var i = s.data("display") || s.text();
            n.find(".current").text(i), n.prev("select").val(s.data("value")).trigger("change")
        }), e(document).on("keydown.nice_select", ".nice-select", function (t) {
            var s = e(this),
                n = e(s.find(".focus") || s.find(".list .option.selected"));
            if (32 == t.keyCode || 13 == t.keyCode) return s.hasClass("open") ? n.trigger("click") : s.trigger("click"), !1;
            if (40 == t.keyCode) {
                if (s.hasClass("open")) {
                    var i = n.nextAll(".option:not(.disabled)").first();
                    i.length > 0 && (s.find(".focus").removeClass("focus"), i.addClass("focus"))
                } else s.trigger("click");
                return !1
            }
            if (38 == t.keyCode) {
                if (s.hasClass("open")) {
                    var l = n.prevAll(".option:not(.disabled)").first();
                    l.length > 0 && (s.find(".focus").removeClass("focus"), l.addClass("focus"))
                } else s.trigger("click");
                return !1
            }
            if (27 == t.keyCode) s.hasClass("open") && s.trigger("click");
            else if (9 == t.keyCode && s.hasClass("open")) return !1
        });
        var n = document.createElement("a").style;
        return n.cssText = "pointer-events:auto", "auto" !== n.pointerEvents && e("html").addClass("no-csspointerevents"), this
    }
}(jQuery);


/*! rangeslider.js - v2.3.0 | (c) 2016 @andreruffert | MIT license | https://github.com/andreruffert/rangeslider.js */
! function (a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a(require("jquery")) : a(jQuery)
}(function (a) {
    "use strict";

    function b() {
        var a = document.createElement("input");
        return a.setAttribute("type", "range"), "text" !== a.type
    }

    function c(a, b) {
        var c = Array.prototype.slice.call(arguments, 2);
        return setTimeout(function () {
            return a.apply(null, c)
        }, b)
    }

    function d(a, b) {
        return b = b || 100,
            function () {
                if (!a.debouncing) {
                    var c = Array.prototype.slice.apply(arguments);
                    a.lastReturnVal = a.apply(window, c), a.debouncing = !0
                }
                return clearTimeout(a.debounceTimeout), a.debounceTimeout = setTimeout(function () {
                    a.debouncing = !1
                }, b), a.lastReturnVal
            }
    }

    function e(a) {
        return a && (0 === a.offsetWidth || 0 === a.offsetHeight || a.open === !1)
    }

    function f(a) {
        for (var b = [], c = a.parentNode; e(c);) b.push(c), c = c.parentNode;
        return b
    }

    function g(a, b) {
        function c(a) {
            "undefined" != typeof a.open && (a.open = !a.open)
        }
        var d = f(a),
            e = d.length,
            g = [],
            h = a[b];
        if (e) {
            for (var i = 0; i < e; i++) g[i] = d[i].style.cssText, d[i].style.setProperty ? d[i].style.setProperty("display", "block", "important") : d[i].style.cssText += ";display: block !important", d[i].style.height = "0", d[i].style.overflow = "hidden", d[i].style.visibility = "hidden", c(d[i]);
            h = a[b];
            for (var j = 0; j < e; j++) d[j].style.cssText = g[j], c(d[j])
        }
        return h
    }

    function h(a, b) {
        var c = parseFloat(a);
        return Number.isNaN(c) ? b : c
    }

    function i(a) {
        return a.charAt(0).toUpperCase() + a.substr(1)
    }

    function j(b, e) {
        if (this.$window = a(window), this.$document = a(document), this.$element = a(b), this.options = a.extend({}, n, e), this.polyfill = this.options.polyfill, this.orientation = this.$element[0].getAttribute("data-orientation") || this.options.orientation, this.onInit = this.options.onInit, this.onSlide = this.options.onSlide, this.onSlideEnd = this.options.onSlideEnd, this.DIMENSION = o.orientation[this.orientation].dimension, this.DIRECTION = o.orientation[this.orientation].direction, this.DIRECTION_STYLE = o.orientation[this.orientation].directionStyle, this.COORDINATE = o.orientation[this.orientation].coordinate, this.polyfill && m) return !1;
        this.identifier = "js-" + k + "-" + l++, this.startEvent = this.options.startEvent.join("." + this.identifier + " ") + "." + this.identifier, this.moveEvent = this.options.moveEvent.join("." + this.identifier + " ") + "." + this.identifier, this.endEvent = this.options.endEvent.join("." + this.identifier + " ") + "." + this.identifier, this.toFixed = (this.step + "").replace(".", "").length - 1, this.$fill = a('<div class="' + this.options.fillClass + '" />'), this.$handle = a('<div class="' + this.options.handleClass + '" />'), this.$range = a('<div class="' + this.options.rangeClass + " " + this.options[this.orientation + "Class"] + '" id="' + this.identifier + '" />').insertAfter(this.$element).prepend(this.$fill, this.$handle), this.$element.css({
            position: "absolute",
            width: "1px",
            height: "1px",
            overflow: "hidden",
            opacity: "0"
        }), this.handleDown = a.proxy(this.handleDown, this), this.handleMove = a.proxy(this.handleMove, this), this.handleEnd = a.proxy(this.handleEnd, this), this.init();
        var f = this;
        this.$window.on("resize." + this.identifier, d(function () {
            c(function () {
                f.update(!1, !1)
            }, 300)
        }, 20)), this.$document.on(this.startEvent, "#" + this.identifier + ":not(." + this.options.disabledClass + ")", this.handleDown), this.$element.on("change." + this.identifier, function (a, b) {
            if (!b || b.origin !== f.identifier) {
                var c = a.target.value,
                    d = f.getPositionFromValue(c);
                f.setPosition(d)
            }
        })
    }
    Number.isNaN = Number.isNaN || function (a) {
        return "number" == typeof a && a !== a
    };
    var k = "rangeslider",
        l = 0,
        m = b(),
        n = {
            polyfill: !0,
            orientation: "horizontal",
            rangeClass: "rangeslider",
            disabledClass: "rangeslider--disabled",
            activeClass: "rangeslider--active",
            horizontalClass: "rangeslider--horizontal",
            verticalClass: "rangeslider--vertical",
            fillClass: "rangeslider__fill",
            handleClass: "rangeslider__handle",
            startEvent: ["mousedown", "touchstart", "pointerdown"],
            moveEvent: ["mousemove", "touchmove", "pointermove"],
            endEvent: ["mouseup", "touchend", "pointerup"]
        },
        o = {
            orientation: {
                horizontal: {
                    dimension: "width",
                    direction: "left",
                    directionStyle: "left",
                    coordinate: "x"
                },
                vertical: {
                    dimension: "height",
                    direction: "top",
                    directionStyle: "bottom",
                    coordinate: "y"
                }
            }
        };
    return j.prototype.init = function () {
        this.update(!0, !1), this.onInit && "function" == typeof this.onInit && this.onInit()
    }, j.prototype.update = function (a, b) {
        a = a || !1, a && (this.min = h(this.$element[0].getAttribute("min"), 0), this.max = h(this.$element[0].getAttribute("max"), 100), this.value = h(this.$element[0].value, Math.round(this.min + (this.max - this.min) / 2)), this.step = h(this.$element[0].getAttribute("step"), 1)), this.handleDimension = g(this.$handle[0], "offset" + i(this.DIMENSION)), this.rangeDimension = g(this.$range[0], "offset" + i(this.DIMENSION)), this.maxHandlePos = this.rangeDimension - this.handleDimension, this.grabPos = this.handleDimension / 2, this.position = this.getPositionFromValue(this.value), this.$element[0].disabled ? this.$range.addClass(this.options.disabledClass) : this.$range.removeClass(this.options.disabledClass), this.setPosition(this.position, b)
    }, j.prototype.handleDown = function (a) {
        if (a.preventDefault(), this.$document.on(this.moveEvent, this.handleMove), this.$document.on(this.endEvent, this.handleEnd), this.$range.addClass(this.options.activeClass), !((" " + a.target.className + " ").replace(/[\n\t]/g, " ").indexOf(this.options.handleClass) > -1)) {
            var b = this.getRelativePosition(a),
                c = this.$range[0].getBoundingClientRect()[this.DIRECTION],
                d = this.getPositionFromNode(this.$handle[0]) - c,
                e = "vertical" === this.orientation ? this.maxHandlePos - (b - this.grabPos) : b - this.grabPos;
            this.setPosition(e), b >= d && b < d + this.handleDimension && (this.grabPos = b - d)
        }
    }, j.prototype.handleMove = function (a) {
        a.preventDefault();
        var b = this.getRelativePosition(a),
            c = "vertical" === this.orientation ? this.maxHandlePos - (b - this.grabPos) : b - this.grabPos;
        this.setPosition(c)
    }, j.prototype.handleEnd = function (a) {
        a.preventDefault(), this.$document.off(this.moveEvent, this.handleMove), this.$document.off(this.endEvent, this.handleEnd), this.$range.removeClass(this.options.activeClass), this.$element.trigger("change", {
            origin: this.identifier
        }), this.onSlideEnd && "function" == typeof this.onSlideEnd && this.onSlideEnd(this.position, this.value)
    }, j.prototype.cap = function (a, b, c) {
        return a < b ? b : a > c ? c : a
    }, j.prototype.setPosition = function (a, b) {
        var c, d;
        void 0 === b && (b = !0), c = this.getValueFromPosition(this.cap(a, 0, this.maxHandlePos)), d = this.getPositionFromValue(c), this.$fill[0].style[this.DIMENSION] = d + this.grabPos + "px", this.$handle[0].style[this.DIRECTION_STYLE] = d + "px", this.setValue(c), this.position = d, this.value = c, b && this.onSlide && "function" == typeof this.onSlide && this.onSlide(d, c)
    }, j.prototype.getPositionFromNode = function (a) {
        for (var b = 0; null !== a;) b += a.offsetLeft, a = a.offsetParent;
        return b
    }, j.prototype.getRelativePosition = function (a) {
        var b = i(this.COORDINATE),
            c = this.$range[0].getBoundingClientRect()[this.DIRECTION],
            d = 0;
        return "undefined" != typeof a.originalEvent["client" + b] ? d = a.originalEvent["client" + b] : a.originalEvent.touches && a.originalEvent.touches[0] && "undefined" != typeof a.originalEvent.touches[0]["client" + b] ? d = a.originalEvent.touches[0]["client" + b] : a.currentPoint && "undefined" != typeof a.currentPoint[this.COORDINATE] && (d = a.currentPoint[this.COORDINATE]), d - c
    }, j.prototype.getPositionFromValue = function (a) {
        var b, c;
        return b = (a - this.min) / (this.max - this.min), c = Number.isNaN(b) ? 0 : b * this.maxHandlePos
    }, j.prototype.getValueFromPosition = function (a) {
        var b, c;
        return b = a / (this.maxHandlePos || 1), c = this.step * Math.round(b * (this.max - this.min) / this.step) + this.min, Number(c.toFixed(this.toFixed))
    }, j.prototype.setValue = function (a) {
        a === this.value && "" !== this.$element[0].value || this.$element.val(a).trigger("input", {
            origin: this.identifier
        })
    }, j.prototype.destroy = function () {
        this.$document.off("." + this.identifier), this.$window.off("." + this.identifier), this.$element.off("." + this.identifier).removeAttr("style").removeData("plugin_" + k), this.$range && this.$range.length && this.$range[0].parentNode.removeChild(this.$range[0])
    }, a.fn[k] = function (b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return this.each(function () {
            var d = a(this),
                e = d.data("plugin_" + k);
            e || d.data("plugin_" + k, e = new j(this, b)), "string" == typeof b && e[b].apply(e, c)
        })
    }, "rangeslider.js is available in jQuery context e.g $(selector).rangeslider(options);"
});

/*! WOW - v1.1.3 - 2016-05-06
 * Copyright (c) 2016 Matthieu Aussaguel;*/
(function () {
    var a, b, c, d, e, f = function (a, b) {
            return function () {
                return a.apply(b, arguments)
            }
        },
        g = [].indexOf || function (a) {
            for (var b = 0, c = this.length; c > b; b++)
                if (b in this && this[b] === a) return b;
            return -1
        };
    b = function () {
        function a() {}
        return a.prototype.extend = function (a, b) {
            var c, d;
            for (c in b) d = b[c], null == a[c] && (a[c] = d);
            return a
        }, a.prototype.isMobile = function (a) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)
        }, a.prototype.createEvent = function (a, b, c, d) {
            var e;
            return null == b && (b = !1), null == c && (c = !1), null == d && (d = null), null != document.createEvent ? (e = document.createEvent("CustomEvent"), e.initCustomEvent(a, b, c, d)) : null != document.createEventObject ? (e = document.createEventObject(), e.eventType = a) : e.eventName = a, e
        }, a.prototype.emitEvent = function (a, b) {
            return null != a.dispatchEvent ? a.dispatchEvent(b) : b in (null != a) ? a[b]() : "on" + b in (null != a) ? a["on" + b]() : void 0
        }, a.prototype.addEvent = function (a, b, c) {
            return null != a.addEventListener ? a.addEventListener(b, c, !1) : null != a.attachEvent ? a.attachEvent("on" + b, c) : a[b] = c
        }, a.prototype.removeEvent = function (a, b, c) {
            return null != a.removeEventListener ? a.removeEventListener(b, c, !1) : null != a.detachEvent ? a.detachEvent("on" + b, c) : delete a[b]
        }, a.prototype.innerHeight = function () {
            return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
        }, a
    }(), c = this.WeakMap || this.MozWeakMap || (c = function () {
        function a() {
            this.keys = [], this.values = []
        }
        return a.prototype.get = function (a) {
            var b, c, d, e, f;
            for (f = this.keys, b = d = 0, e = f.length; e > d; b = ++d)
                if (c = f[b], c === a) return this.values[b]
        }, a.prototype.set = function (a, b) {
            var c, d, e, f, g;
            for (g = this.keys, c = e = 0, f = g.length; f > e; c = ++e)
                if (d = g[c], d === a) return void(this.values[c] = b);
            return this.keys.push(a), this.values.push(b)
        }, a
    }()), a = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (a = function () {
        function a() {
            "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
        }
        return a.notSupported = !0, a.prototype.observe = function () {}, a
    }()), d = this.getComputedStyle || function (a, b) {
        return this.getPropertyValue = function (b) {
            var c;
            return "float" === b && (b = "styleFloat"), e.test(b) && b.replace(e, function (a, b) {
                return b.toUpperCase()
            }), (null != (c = a.currentStyle) ? c[b] : void 0) || null
        }, this
    }, e = /(\-([a-z]){1})/g, this.WOW = function () {
        function e(a) {
            null == a && (a = {}), this.scrollCallback = f(this.scrollCallback, this), this.scrollHandler = f(this.scrollHandler, this), this.resetAnimation = f(this.resetAnimation, this), this.start = f(this.start, this), this.scrolled = !0, this.config = this.util().extend(a, this.defaults), null != a.scrollContainer && (this.config.scrollContainer = document.querySelector(a.scrollContainer)), this.animationNameCache = new c, this.wowEvent = this.util().createEvent(this.config.boxClass)
        }
        return e.prototype.defaults = {
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !0,
            live: !0,
            callback: null,
            scrollContainer: null
        }, e.prototype.init = function () {
            var a;
            return this.element = window.document.documentElement, "interactive" === (a = document.readyState) || "complete" === a ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
        }, e.prototype.start = function () {
            var b, c, d, e;
            if (this.stopped = !1, this.boxes = function () {
                    var a, c, d, e;
                    for (d = this.element.querySelectorAll("." + this.config.boxClass), e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
                    return e
                }.call(this), this.all = function () {
                    var a, c, d, e;
                    for (d = this.boxes, e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
                    return e
                }.call(this), this.boxes.length)
                if (this.disabled()) this.resetStyle();
                else
                    for (e = this.boxes, c = 0, d = e.length; d > c; c++) b = e[c], this.applyStyle(b, !0);
            return this.disabled() || (this.util().addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? new a(function (a) {
                return function (b) {
                    var c, d, e, f, g;
                    for (g = [], c = 0, d = b.length; d > c; c++) f = b[c], g.push(function () {
                        var a, b, c, d;
                        for (c = f.addedNodes || [], d = [], a = 0, b = c.length; b > a; a++) e = c[a], d.push(this.doSync(e));
                        return d
                    }.call(a));
                    return g
                }
            }(this)).observe(document.body, {
                childList: !0,
                subtree: !0
            }) : void 0
        }, e.prototype.stop = function () {
            return this.stopped = !0, this.util().removeEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0
        }, e.prototype.sync = function (b) {
            return a.notSupported ? this.doSync(this.element) : void 0
        }, e.prototype.doSync = function (a) {
            var b, c, d, e, f;
            if (null == a && (a = this.element), 1 === a.nodeType) {
                for (a = a.parentNode || a, e = a.querySelectorAll("." + this.config.boxClass), f = [], c = 0, d = e.length; d > c; c++) b = e[c], g.call(this.all, b) < 0 ? (this.boxes.push(b), this.all.push(b), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(b, !0), f.push(this.scrolled = !0)) : f.push(void 0);
                return f
            }
        }, e.prototype.show = function (a) {
            return this.applyStyle(a), a.className = a.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(a), this.util().emitEvent(a, this.wowEvent), this.util().addEvent(a, "animationend", this.resetAnimation), this.util().addEvent(a, "oanimationend", this.resetAnimation), this.util().addEvent(a, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(a, "MSAnimationEnd", this.resetAnimation), a
        }, e.prototype.applyStyle = function (a, b) {
            var c, d, e;
            return d = a.getAttribute("data-wow-duration"), c = a.getAttribute("data-wow-delay"), e = a.getAttribute("data-wow-iteration"), this.animate(function (f) {
                return function () {
                    return f.customStyle(a, b, d, c, e)
                }
            }(this))
        }, e.prototype.animate = function () {
            return "requestAnimationFrame" in window ? function (a) {
                return window.requestAnimationFrame(a)
            } : function (a) {
                return a()
            }
        }(), e.prototype.resetStyle = function () {
            var a, b, c, d, e;
            for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], e.push(a.style.visibility = "visible");
            return e
        }, e.prototype.resetAnimation = function (a) {
            var b;
            return a.type.toLowerCase().indexOf("animationend") >= 0 ? (b = a.target || a.srcElement, b.className = b.className.replace(this.config.animateClass, "").trim()) : void 0
        }, e.prototype.customStyle = function (a, b, c, d, e) {
            return b && this.cacheAnimationName(a), a.style.visibility = b ? "hidden" : "visible", c && this.vendorSet(a.style, {
                animationDuration: c
            }), d && this.vendorSet(a.style, {
                animationDelay: d
            }), e && this.vendorSet(a.style, {
                animationIterationCount: e
            }), this.vendorSet(a.style, {
                animationName: b ? "none" : this.cachedAnimationName(a)
            }), a
        }, e.prototype.vendors = ["moz", "webkit"], e.prototype.vendorSet = function (a, b) {
            var c, d, e, f;
            d = [];
            for (c in b) e = b[c], a["" + c] = e, d.push(function () {
                var b, d, g, h;
                for (g = this.vendors, h = [], b = 0, d = g.length; d > b; b++) f = g[b], h.push(a["" + f + c.charAt(0).toUpperCase() + c.substr(1)] = e);
                return h
            }.call(this));
            return d
        }, e.prototype.vendorCSS = function (a, b) {
            var c, e, f, g, h, i;
            for (h = d(a), g = h.getPropertyCSSValue(b), f = this.vendors, c = 0, e = f.length; e > c; c++) i = f[c], g = g || h.getPropertyCSSValue("-" + i + "-" + b);
            return g
        }, e.prototype.animationName = function (a) {
            var b;
            try {
                b = this.vendorCSS(a, "animation-name").cssText
            } catch (c) {
                b = d(a).getPropertyValue("animation-name")
            }
            return "none" === b ? "" : b
        }, e.prototype.cacheAnimationName = function (a) {
            return this.animationNameCache.set(a, this.animationName(a))
        }, e.prototype.cachedAnimationName = function (a) {
            return this.animationNameCache.get(a)
        }, e.prototype.scrollHandler = function () {
            return this.scrolled = !0
        }, e.prototype.scrollCallback = function () {
            var a;
            return !this.scrolled || (this.scrolled = !1, this.boxes = function () {
                var b, c, d, e;
                for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], a && (this.isVisible(a) ? this.show(a) : e.push(a));
                return e
            }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop()
        }, e.prototype.offsetTop = function (a) {
            for (var b; void 0 === a.offsetTop;) a = a.parentNode;
            for (b = a.offsetTop; a = a.offsetParent;) b += a.offsetTop;
            return b
        }, e.prototype.isVisible = function (a) {
            var b, c, d, e, f;
            return c = a.getAttribute("data-wow-offset") || this.config.offset, f = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset, e = f + Math.min(this.element.clientHeight, this.util().innerHeight()) - c, d = this.offsetTop(a), b = d + a.clientHeight, e >= d && b >= f
        }, e.prototype.util = function () {
            return null != this._util ? this._util : this._util = new b
        }, e.prototype.disabled = function () {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent)
        }, e
    }()
}).call(this);
