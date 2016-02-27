! function(t, e) {
	"use strict";
	t.rails !== e && t.error("jquery-ujs has already been loaded!");
	var i, n = t(document);
	t.rails = i = {
		linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]",
		buttonClickSelector: "button[data-remote]:not(form button), button[data-confirm]:not(form button)",
		inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
		formSubmitSelector: "form",
		formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
		disableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
		enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
		requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
		fileInputSelector: "input[type=file]:not([disabled])",
		linkDisableSelector: "a[data-disable-with], a[data-disable]",
		buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]",
		csrfToken: function() {
			return t("meta[name=csrf-token]").attr("content")
		},
		csrfParam: function() {
			return t("meta[name=csrf-param]").attr("content")
		},
		CSRFProtection: function(t) {
			var e = i.csrfToken();
			e && t.setRequestHeader("X-CSRF-Token", e)
		},
		refreshCSRFTokens: function() {
			t('form input[name="' + i.csrfParam() + '"]').val(i.csrfToken())
		},
		fire: function(e, i, n) {
			var s = t.Event(i);
			return e.trigger(s, n), s.result !== !1
		},
		confirm: function(t) {
			return confirm(t)
		},
		ajax: function(e) {
			return t.ajax(e)
		},
		href: function(t) {
			return t[0].href
		},
		isRemote: function(t) {
			return t.data("remote") !== e && t.data("remote") !== !1
		},
		handleRemote: function(n) {
			var s, o, a, r, l, h;
			if (i.fire(n, "ajax:before")) {
				if (r = n.data("with-credentials") || null, l = n.data("type") || t.ajaxSettings && t.ajaxSettings.dataType, n.is("form")) {
					s = n.attr("method"), o = n.attr("action"), a = n.serializeArray();
					var d = n.data("ujs:submit-button");
					d && (a.push(d), n.data("ujs:submit-button", null))
				} else n.is(i.inputChangeSelector) ? (s = n.data("method"), o = n.data("url"), a = n.serialize(), n.data("params") && (a = a + "&" + n.data("params"))) : n.is(i.buttonClickSelector) ? (s = n.data("method") || "get", o = n.data("url"), a = n.serialize(), n.data("params") && (a = a + "&" + n.data("params"))) : (s = n.data("method"), o = i.href(n), a = n.data("params") || null);
				return h = {
					type: s || "GET",
					data: a,
					dataType: l,
					beforeSend: function(t, s) {
						return s.dataType === e && t.setRequestHeader("accept", "*/*;q=0.5, " + s.accepts.script), i.fire(n, "ajax:beforeSend", [t, s]) ? void n.trigger("ajax:send", t) : !1
					},
					success: function(t, e, i) {
						n.trigger("ajax:success", [t, e, i])
					},
					complete: function(t, e) {
						n.trigger("ajax:complete", [t, e])
					},
					error: function(t, e, i) {
						n.trigger("ajax:error", [t, e, i])
					},
					crossDomain: i.isCrossDomain(o)
				}, r && (h.xhrFields = {
					withCredentials: r
				}), o && (h.url = o), i.ajax(h)
			}
			return !1
		},
		isCrossDomain: function(t) {
			var e = document.createElement("a");
			e.href = location.href;
			var i = document.createElement("a");
			try {
				return i.href = t, i.href = i.href, !((!i.protocol || ":" === i.protocol) && !i.host || e.protocol + "//" + e.host == i.protocol + "//" + i.host)
			} catch (n) {
				return !0
			}
		},
		handleMethod: function(n) {
			var s = i.href(n),
				o = n.data("method"),
				a = n.attr("target"),
				r = i.csrfToken(),
				l = i.csrfParam(),
				h = t('<form method="post" action="' + s + '"></form>'),
				d = '<input name="_method" value="' + o + '" type="hidden" />';
			l === e || r === e || i.isCrossDomain(s) || (d += '<input name="' + l + '" value="' + r + '" type="hidden" />'), a && h.attr("target", a), h.hide().append(d).appendTo("body"), h.submit()
		},
		formElements: function(e, i) {
			return e.is("form") ? t(e[0].elements).filter(i) : e.find(i)
		},
		disableFormElements: function(e) {
			i.formElements(e, i.disableSelector).each(function() {
				i.disableFormElement(t(this))
			})
		},
		disableFormElement: function(t) {
			var i, n;
			i = t.is("button") ? "html" : "val", n = t.data("disable-with"), t.data("ujs:enable-with", t[i]()), n !== e && t[i](n), t.prop("disabled", !0)
		},
		enableFormElements: function(e) {
			i.formElements(e, i.enableSelector).each(function() {
				i.enableFormElement(t(this))
			})
		},
		enableFormElement: function(t) {
			var e = t.is("button") ? "html" : "val";
			"undefined" != typeof t.data("ujs:enable-with") && t[e](t.data("ujs:enable-with")), t.prop("disabled", !1)
		},
		allowAction: function(t) {
			var e, n = t.data("confirm"),
				s = !1;
			if (!n) return !0;
			if (i.fire(t, "confirm")) {
				try {
					s = i.confirm(n)
				} catch (o) {
					(console.error || console.log).call(console, o.stack || o)
				}
				e = i.fire(t, "confirm:complete", [s])
			}
			return s && e
		},
		blankInputs: function(e, i, n) {
			var s, o, a = t(),
				r = i || "input,textarea",
				l = e.find(r);
			return l.each(function() {
				if (s = t(this), o = s.is("input[type=checkbox],input[type=radio]") ? s.is(":checked") : !! s.val(), o === n) {
					if (s.is("input[type=radio]") && l.filter('input[type=radio]:checked[name="' + s.attr("name") + '"]').length) return !0;
					a = a.add(s)
				}
			}), a.length ? a : !1
		},
		nonBlankInputs: function(t, e) {
			return i.blankInputs(t, e, !0)
		},
		stopEverything: function(e) {
			return t(e.target).trigger("ujs:everythingStopped"), e.stopImmediatePropagation(), !1
		},
		disableElement: function(t) {
			var n = t.data("disable-with");
			t.data("ujs:enable-with", t.html()), n !== e && t.html(n), t.bind("click.railsDisable", function(t) {
				return i.stopEverything(t)
			})
		},
		enableElement: function(t) {
			t.data("ujs:enable-with") !== e && (t.html(t.data("ujs:enable-with")), t.removeData("ujs:enable-with")), t.unbind("click.railsDisable")
		}
	}, i.fire(n, "rails:attachBindings") && (t.ajaxPrefilter(function(t, e, n) {
		t.crossDomain || i.CSRFProtection(n)
	}), t(window).on("pageshow.rails", function() {
		t(t.rails.enableSelector).each(function() {
			var e = t(this);
			e.data("ujs:enable-with") && t.rails.enableFormElement(e)
		}), t(t.rails.linkDisableSelector).each(function() {
			var e = t(this);
			e.data("ujs:enable-with") && t.rails.enableElement(e)
		})
	}), n.delegate(i.linkDisableSelector, "ajax:complete", function() {
		i.enableElement(t(this))
	}), n.delegate(i.buttonDisableSelector, "ajax:complete", function() {
		i.enableFormElement(t(this))
	}), n.delegate(i.linkClickSelector, "click.rails", function(e) {
		var n = t(this),
			s = n.data("method"),
			o = n.data("params"),
			a = e.metaKey || e.ctrlKey;
		if (!i.allowAction(n)) return i.stopEverything(e);
		if (!a && n.is(i.linkDisableSelector) && i.disableElement(n), i.isRemote(n)) {
			if (a && (!s || "GET" === s) && !o) return !0;
			var r = i.handleRemote(n);
			return r === !1 ? i.enableElement(n) : r.fail(function() {
				i.enableElement(n)
			}), !1
		}
		return s ? (i.handleMethod(n), !1) : void 0
	}), n.delegate(i.buttonClickSelector, "click.rails", function(e) {
		var n = t(this);
		if (!i.allowAction(n) || !i.isRemote(n)) return i.stopEverything(e);
		n.is(i.buttonDisableSelector) && i.disableFormElement(n);
		var s = i.handleRemote(n);
		return s === !1 ? i.enableFormElement(n) : s.fail(function() {
			i.enableFormElement(n)
		}), !1
	}), n.delegate(i.inputChangeSelector, "change.rails", function(e) {
		var n = t(this);
		return i.allowAction(n) && i.isRemote(n) ? (i.handleRemote(n), !1) : i.stopEverything(e)
	}), n.delegate(i.formSubmitSelector, "submit.rails", function(n) {
		var s, o, a = t(this),
			r = i.isRemote(a);
		if (!i.allowAction(a)) return i.stopEverything(n);
		if (a.attr("novalidate") === e && (s = i.blankInputs(a, i.requiredInputSelector, !1), s && i.fire(a, "ajax:aborted:required", [s]))) return i.stopEverything(n);
		if (r) {
			if (o = i.nonBlankInputs(a, i.fileInputSelector)) {
				setTimeout(function() {
					i.disableFormElements(a)
				}, 13);
				var l = i.fire(a, "ajax:aborted:file", [o]);
				return l || setTimeout(function() {
					i.enableFormElements(a)
				}, 13), l
			}
			return i.handleRemote(a), !1
		}
		setTimeout(function() {
			i.disableFormElements(a)
		}, 13)
	}), n.delegate(i.formInputClickSelector, "click.rails", function(e) {
		var n = t(this);
		if (!i.allowAction(n)) return i.stopEverything(e);
		var s = n.attr("name"),
			o = s ? {
				name: s,
				value: n.val()
			} : null;
		n.closest("form").data("ujs:submit-button", o)
	}), n.delegate(i.formSubmitSelector, "ajax:send.rails", function(e) {
		this === e.target && i.disableFormElements(t(this))
	}), n.delegate(i.formSubmitSelector, "ajax:complete.rails", function(e) {
		this === e.target && i.enableFormElements(t(this))
	}), t(function() {
		i.refreshCSRFTokens()
	}))
}(jQuery), Backbone.ChildViewContainer = function(t, e) {
	var i = function(t) {
		this._views = {}, this._indexByModel = {}, this._indexByCustom = {}, this._updateLength(), e.each(t, this.add, this)
	};
	e.extend(i.prototype, {
		add: function(t, e) {
			var i = t.cid;
			this._views[i] = t, t.model && (this._indexByModel[t.model.cid] = i), e && (this._indexByCustom[e] = i), this._updateLength()
		},
		findByModel: function(t) {
			return this.findByModelCid(t.cid)
		},
		findByModelCid: function(t) {
			var e = this._indexByModel[t];
			return this.findByCid(e)
		},
		findByCustom: function(t) {
			var e = this._indexByCustom[t];
			return this.findByCid(e)
		},
		findByIndex: function(t) {
			return e.values(this._views)[t]
		},
		findByCid: function(t) {
			return this._views[t]
		},
		remove: function(t) {
			var i = t.cid;
			t.model && delete this._indexByModel[t.model.cid], e.any(this._indexByCustom, function(t, e) {
				return t === i ? (delete this._indexByCustom[e], !0) : void 0
			}, this), delete this._views[i], this._updateLength()
		},
		call: function(t) {
			this.apply(t, e.tail(arguments))
		},
		apply: function(t, i) {
			e.each(this._views, function(n) {
				e.isFunction(n[t]) && n[t].apply(n, i || [])
			})
		},
		_updateLength: function() {
			this.length = e.size(this._views)
		}
	});
	var n = ["forEach", "each", "map", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "toArray", "first", "initial", "rest", "last", "without", "isEmpty", "pluck"];
	return e.each(n, function(t) {
		i.prototype[t] = function() {
			var i = e.values(this._views),
				n = [i].concat(e.toArray(arguments));
			return e[t].apply(e, n)
		}
	}), i
}(Backbone, _), Backbone.Wreqr = function(t, e, i) {
	"use strict";
	var n = {};
	return n.Handlers = function(t, e) {
		var i = function(t) {
			this.options = t, this._wreqrHandlers = {}, e.isFunction(this.initialize) && this.initialize(t)
		};
		return i.extend = t.Model.extend, e.extend(i.prototype, t.Events, {
			setHandlers: function(t) {
				e.each(t, function(t, i) {
					var n = null;
					e.isObject(t) && !e.isFunction(t) && (n = t.context, t = t.callback), this.setHandler(i, t, n)
				}, this)
			},
			setHandler: function(t, e, i) {
				var n = {
					callback: e,
					context: i
				};
				this._wreqrHandlers[t] = n, this.trigger("handler:add", t, e, i)
			},
			hasHandler: function(t) {
				return !!this._wreqrHandlers[t]
			},
			getHandler: function(t) {
				var e = this._wreqrHandlers[t];
				if (!e) throw new Error("Handler not found for '" + t + "'");
				return function() {
					var t = Array.prototype.slice.apply(arguments);
					return e.callback.apply(e.context, t)
				}
			},
			removeHandler: function(t) {
				delete this._wreqrHandlers[t]
			},
			removeAllHandlers: function() {
				this._wreqrHandlers = {}
			}
		}), i
	}(t, i), n.CommandStorage = function() {
		var e = function(t) {
			this.options = t, this._commands = {}, i.isFunction(this.initialize) && this.initialize(t)
		};
		return i.extend(e.prototype, t.Events, {
			getCommands: function(t) {
				var e = this._commands[t];
				return e || (e = {
					command: t,
					instances: []
				}, this._commands[t] = e), e
			},
			addCommand: function(t, e) {
				var i = this.getCommands(t);
				i.instances.push(e)
			},
			clearCommands: function(t) {
				var e = this.getCommands(t);
				e.instances = []
			}
		}), e
	}(), n.Commands = function(t) {
		return t.Handlers.extend({
			storageType: t.CommandStorage,
			constructor: function(e) {
				this.options = e || {}, this._initializeStorage(this.options), this.on("handler:add", this._executeCommands, this);
				var i = Array.prototype.slice.call(arguments);
				t.Handlers.prototype.constructor.apply(this, i)
			},
			execute: function(t, e) {
				t = arguments[0], e = Array.prototype.slice.call(arguments, 1), this.hasHandler(t) ? this.getHandler(t).apply(this, e) : this.storage.addCommand(t, e)
			},
			_executeCommands: function(t, e, n) {
				var s = this.storage.getCommands(t);
				i.each(s.instances, function(t) {
					e.apply(n, t)
				}), this.storage.clearCommands(t)
			},
			_initializeStorage: function(t) {
				var e, n = t.storageType || this.storageType;
				e = i.isFunction(n) ? new n : n, this.storage = e
			}
		})
	}(n), n.RequestResponse = function(t) {
		return t.Handlers.extend({
			request: function() {
				var t = arguments[0],
					e = Array.prototype.slice.call(arguments, 1);
				return this.getHandler(t).apply(this, e)
			}
		})
	}(n), n.EventAggregator = function(t, e) {
		var i = function() {};
		return i.extend = t.Model.extend, e.extend(i.prototype, t.Events), i
	}(t, i), n
}(Backbone, Backbone.Marionette, _);
var Marionette = function(t, e, i) {
	"use strict";

	function n(t) {
		return a.call(t)
	}

	function s(t, e) {
		var i = new Error(t);
		throw i.name = e || "Error", i
	}
	var o = {};
	e.Marionette = o, o.$ = e.$;
	var a = Array.prototype.slice;
	return o.extend = e.Model.extend, o.getOption = function(t, e) {
		if (t && e) {
			var i;
			return i = t.options && e in t.options && void 0 !== t.options[e] ? t.options[e] : t[e]
		}
	}, o.triggerMethod = function() {
		function t(t, e, i) {
			return i.toUpperCase()
		}
		var e = /(^|:)(\w)/gi,
			n = function(n) {
				var s = "on" + n.replace(e, t),
					o = this[s];
				return i.isFunction(this.trigger) && this.trigger.apply(this, arguments), i.isFunction(o) ? o.apply(this, i.tail(arguments)) : void 0
			};
		return n
	}(), o.MonitorDOMRefresh = function() {
		function t(t) {
			t._isShown = !0, n(t)
		}

		function e(t) {
			t._isRendered = !0, n(t)
		}

		function n(t) {
			t._isShown && t._isRendered && i.isFunction(t.triggerMethod) && t.triggerMethod("dom:refresh")
		}
		return function(i) {
			i.listenTo(i, "show", function() {
				t(i)
			}), i.listenTo(i, "render", function() {
				e(i)
			})
		}
	}(),
	function(t) {
		function e(t, e, n, o) {
			var a = o.split(/\s+/);
			i.each(a, function(i) {
				var o = t[i];
				o || s("Method '" + i + "' was configured as an event handler, but does not exist."), t.listenTo(e, n, o, t)
			})
		}

		function n(t, e, i, n) {
			t.listenTo(e, i, n, t)
		}

		function o(t, e, n, s) {
			var o = s.split(/\s+/);
			i.each(o, function(i) {
				var s = t[i];
				t.stopListening(e, n, s, t)
			})
		}

		function a(t, e, i, n) {
			t.stopListening(e, i, n, t)
		}

		function r(t, e, n, s, o) {
			e && n && (i.isFunction(n) && (n = n.call(t)), i.each(n, function(n, a) {
				i.isFunction(n) ? s(t, e, a, n) : o(t, e, a, n)
			}))
		}
		t.bindEntityEvents = function(t, i, s) {
			r(t, i, s, n, e)
		}, t.unbindEntityEvents = function(t, e, i) {
			r(t, e, i, a, o)
		}
	}(o), o.Callbacks = function() {
		this._deferred = o.$.Deferred(), this._callbacks = []
	}, i.extend(o.Callbacks.prototype, {
		add: function(t, e) {
			this._callbacks.push({
				cb: t,
				ctx: e
			}), this._deferred.done(function(i, n) {
				e && (i = e), t.call(i, n)
			})
		},
		run: function(t, e) {
			this._deferred.resolve(e, t)
		},
		reset: function() {
			var t = this._callbacks;
			this._deferred = o.$.Deferred(), this._callbacks = [], i.each(t, function(t) {
				this.add(t.cb, t.ctx)
			}, this)
		}
	}), o.Controller = function(t) {
		this.triggerMethod = o.triggerMethod, this.options = t || {}, i.isFunction(this.initialize) && this.initialize(this.options)
	}, o.Controller.extend = o.extend, i.extend(o.Controller.prototype, e.Events, {
		close: function() {
			this.stopListening(), this.triggerMethod("close"), this.unbind()
		}
	}), o.Region = function(t) {
		if (this.options = t || {}, this.el = o.getOption(this, "el"), !this.el) {
			var e = new Error("An 'el' must be specified for a region.");
			throw e.name = "NoElError", e
		}
		if (this.initialize) {
			var i = Array.prototype.slice.apply(arguments);
			this.initialize.apply(this, i)
		}
	}, i.extend(o.Region, {
		buildRegion: function(t, e) {
			var n = "string" == typeof t,
				s = "string" == typeof t.selector,
				o = "undefined" == typeof t.regionType,
				a = "function" == typeof t;
			if (!a && !n && !s) throw new Error("Region must be specified as a Region type, a selector string or an object with selector property");
			var r, l;
			n && (r = t), t.selector && (r = t.selector), a && (l = t), !a && o && (l = e), t.regionType && (l = t.regionType);
			var h = new l({
				el: r
			});
			return t.parentEl && (h.getEl = function(e) {
				var n = t.parentEl;
				return i.isFunction(n) && (n = n()), n.find(e)
			}), h
		}
	}), i.extend(o.Region.prototype, e.Events, {
		show: function(t) {
			this.ensureEl();
			var e = t.isClosed || i.isUndefined(t.$el),
				n = t !== this.currentView;
			n && this.close(), t.render(), (n || e) && this.open(t), this.currentView = t, o.triggerMethod.call(this, "show", t), o.triggerMethod.call(t, "show")
		},
		ensureEl: function() {
			this.$el && 0 !== this.$el.length || (this.$el = this.getEl(this.el))
		},
		getEl: function(t) {
			return o.$(t)
		},
		open: function(t) {
			this.$el.empty().append(t.el)
		},
		close: function() {
			var t = this.currentView;
			t && !t.isClosed && (t.close ? t.close() : t.remove && t.remove(), o.triggerMethod.call(this, "close"), delete this.currentView)
		},
		attachView: function(t) {
			this.currentView = t
		},
		reset: function() {
			this.close(), delete this.$el
		}
	}), o.Region.extend = o.extend, o.RegionManager = function(t) {
		var e = t.Controller.extend({
			constructor: function(e) {
				this._regions = {}, t.Controller.prototype.constructor.call(this, e)
			},
			addRegions: function(t, e) {
				var n = {};
				return i.each(t, function(t, s) {
					"string" == typeof t && (t = {
						selector: t
					}), t.selector && (t = i.defaults({}, t, e));
					var o = this.addRegion(s, t);
					n[s] = o
				}, this), n
			},
			addRegion: function(e, n) {
				var s, o = i.isObject(n),
					a = i.isString(n),
					r = !! n.selector;
				return s = a || o && r ? t.Region.buildRegion(n, t.Region) : i.isFunction(n) ? t.Region.buildRegion(n, t.Region) : n, this._store(e, s), this.triggerMethod("region:add", e, s), s
			},
			get: function(t) {
				return this._regions[t]
			},
			removeRegion: function(t) {
				var e = this._regions[t];
				this._remove(t, e)
			},
			removeRegions: function() {
				i.each(this._regions, function(t, e) {
					this._remove(e, t)
				}, this)
			},
			closeRegions: function() {
				i.each(this._regions, function(t, e) {
					t.close()
				}, this)
			},
			close: function() {
				this.removeRegions();
				var e = Array.prototype.slice.call(arguments);
				t.Controller.prototype.close.apply(this, e)
			},
			_store: function(t, e) {
				this._regions[t] = e, this._setLength()
			},
			_remove: function(t, e) {
				e.close(), delete this._regions[t], this._setLength(), this.triggerMethod("region:remove", t, e)
			},
			_setLength: function() {
				this.length = i.size(this._regions)
			}
		}),
			n = ["forEach", "each", "map", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "toArray", "first", "initial", "rest", "last", "without", "isEmpty", "pluck"];
		return i.each(n, function(t) {
			e.prototype[t] = function() {
				var e = i.values(this._regions),
					n = [e].concat(i.toArray(arguments));
				return i[t].apply(i, n)
			}
		}), e
	}(o), o.TemplateCache = function(t) {
		this.templateId = t
	}, i.extend(o.TemplateCache, {
		templateCaches: {},
		get: function(t) {
			var e = this.templateCaches[t];
			return e || (e = new o.TemplateCache(t), this.templateCaches[t] = e), e.load()
		},
		clear: function() {
			var t, e = n(arguments),
				i = e.length;
			if (i > 0)
				for (t = 0; i > t; t++) delete this.templateCaches[e[t]];
			else this.templateCaches = {}
		}
	}), i.extend(o.TemplateCache.prototype, {
		load: function() {
			if (this.compiledTemplate) return this.compiledTemplate;
			var t = this.loadTemplate(this.templateId);
			return this.compiledTemplate = this.compileTemplate(t), this.compiledTemplate
		},
		loadTemplate: function(t) {
			var e = o.$(t).html();
			return e && 0 !== e.length || s("Could not find template: '" + t + "'", "NoTemplateError"), e
		},
		compileTemplate: function(t) {
			return i.template(t)
		}
	}), o.Renderer = {
		render: function(t, e) {
			if (!t) {
				var i = new Error("Cannot render the template since it's false, null or undefined.");
				throw i.name = "TemplateNotFoundError", i
			}
			var n;
			return (n = "function" == typeof t ? t : o.TemplateCache.get(t))(e)
		}
	}, o.View = e.View.extend({
		constructor: function(t) {
			i.bindAll(this, "render");
			var n = Array.prototype.slice.apply(arguments);
			this.options = i.extend({}, this.options, t), this.events = this.normalizeUIKeys(i.result(this, "events")), e.View.prototype.constructor.apply(this, n), o.MonitorDOMRefresh(this), this.listenTo(this, "show", this.onShowCalled, this)
		},
		triggerMethod: o.triggerMethod,
		getTemplate: function() {
			return o.getOption(this, "template")
		},
		mixinTemplateHelpers: function(t) {
			t = t || {};
			var e = o.getOption(this, "templateHelpers");
			return i.isFunction(e) && (e = e.call(this)), i.extend(t, e)
		},
		normalizeUIKeys: function(t) {
			return "undefined" != typeof t ? (i.each(i.keys(t), function(e) {
				var i = e.split("@ui.");
				2 === i.length && (t[i[0] + this.ui[i[1]]] = t[e], delete t[e])
			}, this), t) : void 0
		},
		configureTriggers: function() {
			if (this.triggers) {
				var t = {}, e = this.normalizeUIKeys(i.result(this, "triggers"));
				return i.each(e, function(e, n) {
					var s = i.isObject(e),
						o = s ? e.event : e;
					t[n] = function(t) {
						if (t) {
							var i = t.preventDefault,
								n = t.stopPropagation,
								a = s ? e.preventDefault : i,
								r = s ? e.stopPropagation : n;
							a && i && i.apply(t), r && n && n.apply(t)
						}
						var l = {
							view: this,
							model: this.model,
							collection: this.collection
						};
						this.triggerMethod(o, l)
					}
				}, this), t
			}
		},
		delegateEvents: function(t) {
			this._delegateDOMEvents(t), o.bindEntityEvents(this, this.model, o.getOption(this, "modelEvents")), o.bindEntityEvents(this, this.collection, o.getOption(this, "collectionEvents"))
		},
		_delegateDOMEvents: function(t) {
			t = t || this.events, i.isFunction(t) && (t = t.call(this));
			var n = {}, s = this.configureTriggers();
			i.extend(n, t, s), e.View.prototype.delegateEvents.call(this, n)
		},
		undelegateEvents: function() {
			var t = Array.prototype.slice.call(arguments);
			e.View.prototype.undelegateEvents.apply(this, t), o.unbindEntityEvents(this, this.model, o.getOption(this, "modelEvents")), o.unbindEntityEvents(this, this.collection, o.getOption(this, "collectionEvents"))
		},
		onShowCalled: function() {},
		close: function() {
			if (!this.isClosed) {
				var t = this.triggerMethod("before:close");
				t !== !1 && (this.isClosed = !0, this.triggerMethod("close"), this.unbindUIElements(), this.remove())
			}
		},
		bindUIElements: function() {
			if (this.ui) {
				this._uiBindings || (this._uiBindings = this.ui);
				var t = i.result(this, "_uiBindings");
				this.ui = {}, i.each(i.keys(t), function(e) {
					var i = t[e];
					this.ui[e] = this.$(i)
				}, this)
			}
		},
		unbindUIElements: function() {
			this.ui && this._uiBindings && (i.each(this.ui, function(t, e) {
				delete this.ui[e]
			}, this), this.ui = this._uiBindings, delete this._uiBindings)
		}
	}), o.ItemView = o.View.extend({
		constructor: function() {
			o.View.prototype.constructor.apply(this, n(arguments))
		},
		serializeData: function() {
			var t = {};
			return this.model ? t = this.model.toJSON() : this.collection && (t = {
				items: this.collection.toJSON()
			}), t
		},
		render: function() {
			this.isClosed = !1, this.triggerMethod("before:render", this), this.triggerMethod("item:before:render", this);
			var t = this.serializeData();
			t = this.mixinTemplateHelpers(t);
			var e = this.getTemplate(),
				i = o.Renderer.render(e, t);
			return this.$el.html(i), this.bindUIElements(), this.triggerMethod("render", this), this.triggerMethod("item:rendered", this), this
		},
		close: function() {
			this.isClosed || (this.triggerMethod("item:before:close"), o.View.prototype.close.apply(this, n(arguments)), this.triggerMethod("item:closed"))
		}
	}), o.CollectionView = o.View.extend({
		itemViewEventPrefix: "itemview",
		constructor: function(t) {
			this._initChildViewStorage(), o.View.prototype.constructor.apply(this, n(arguments)), this._initialEvents(), this.initRenderBuffer()
		},
		initRenderBuffer: function() {
			this.elBuffer = document.createDocumentFragment()
		},
		startBuffering: function() {
			this.initRenderBuffer(), this.isBuffering = !0
		},
		endBuffering: function() {
			this.appendBuffer(this, this.elBuffer), this.initRenderBuffer(), this.isBuffering = !1
		},
		_initialEvents: function() {
			this.collection && (this.listenTo(this.collection, "add", this.addChildView, this), this.listenTo(this.collection, "remove", this.removeItemView, this), this.listenTo(this.collection, "reset", this.render, this))
		},
		addChildView: function(t, e, i) {
			this.closeEmptyView();
			var n = this.getItemView(t),
				s = this.collection.indexOf(t);
			this.addItemView(t, n, s)
		},
		onShowCalled: function() {
			this.children.each(function(t) {
				o.triggerMethod.call(t, "show")
			})
		},
		triggerBeforeRender: function() {
			this.triggerMethod("before:render", this), this.triggerMethod("collection:before:render", this)
		},
		triggerRendered: function() {
			this.triggerMethod("render", this), this.triggerMethod("collection:rendered", this)
		},
		render: function() {
			return this.isClosed = !1, this.triggerBeforeRender(), this._renderChildren(), this.triggerRendered(), this
		},
		_renderChildren: function() {
			this.startBuffering(), this.closeEmptyView(), this.closeChildren(), this.collection && this.collection.length > 0 ? this.showCollection() : this.showEmptyView(), this.endBuffering()
		},
		showCollection: function() {
			var t;
			this.collection.each(function(e, i) {
				t = this.getItemView(e), this.addItemView(e, t, i)
			}, this)
		},
		showEmptyView: function() {
			var t = this.getEmptyView();
			if (t && !this._showingEmptyView) {
				this._showingEmptyView = !0;
				var i = new e.Model;
				this.addItemView(i, t, 0)
			}
		},
		closeEmptyView: function() {
			this._showingEmptyView && (this.closeChildren(), delete this._showingEmptyView)
		},
		getEmptyView: function() {
			return o.getOption(this, "emptyView")
		},
		getItemView: function(t) {
			var e = o.getOption(this, "itemView");
			return e || s("An `itemView` must be specified", "NoItemViewError"), e
		},
		addItemView: function(t, e, n) {
			var s = o.getOption(this, "itemViewOptions");
			i.isFunction(s) && (s = s.call(this, t, n));
			var a = this.buildItemView(t, e, s);
			this.addChildViewEventForwarding(a), this.triggerMethod("before:item:added", a), this.children.add(a), this.renderItemView(a, n), this._isShown && o.triggerMethod.call(a, "show"), this.triggerMethod("after:item:added", a)
		},
		addChildViewEventForwarding: function(t) {
			var e = o.getOption(this, "itemViewEventPrefix");
			this.listenTo(t, "all", function() {
				var i = n(arguments);
				i[0] = e + ":" + i[0], i.splice(1, 0, t), o.triggerMethod.apply(this, i)
			}, this)
		},
		renderItemView: function(t, e) {
			t.render(), this.appendHtml(this, t, e)
		},
		buildItemView: function(t, e, n) {
			var s = i.extend({
				model: t
			}, n);
			return new e(s)
		},
		removeItemView: function(t) {
			var e = this.children.findByModel(t);
			this.removeChildView(e), this.checkEmpty()
		},
		removeChildView: function(t) {
			t && (this.stopListening(t), t.close ? t.close() : t.remove && t.remove(), this.children.remove(t)), this.triggerMethod("item:removed", t)
		},
		checkEmpty: function() {
			this.collection && 0 !== this.collection.length || this.showEmptyView()
		},
		appendBuffer: function(t, e) {
			t.$el.append(e)
		},
		appendHtml: function(t, e, i) {
			t.isBuffering ? t.elBuffer.appendChild(e.el) : t.$el.append(e.el)
		},
		_initChildViewStorage: function() {
			this.children = new e.ChildViewContainer
		},
		close: function() {
			this.isClosed || (this.triggerMethod("collection:before:close"), this.closeChildren(), this.triggerMethod("collection:closed"), o.View.prototype.close.apply(this, n(arguments)))
		},
		closeChildren: function() {
			this.children.each(function(t) {
				this.removeChildView(t)
			}, this), this.checkEmpty()
		}
	}), o.CompositeView = o.CollectionView.extend({
		constructor: function() {
			o.CollectionView.prototype.constructor.apply(this, n(arguments))
		},
		_initialEvents: function() {
			this.once("render", function() {
				this.collection && (this.listenTo(this.collection, "add", this.addChildView, this), this.listenTo(this.collection, "remove", this.removeItemView, this), this.listenTo(this.collection, "reset", this._renderChildren, this))
			})
		},
		getItemView: function(t) {
			var e = o.getOption(this, "itemView") || this.constructor;
			return e || s("An `itemView` must be specified", "NoItemViewError"), e
		},
		serializeData: function() {
			var t = {};
			return this.model && (t = this.model.toJSON()), t
		},
		render: function() {
			this.isRendered = !0, this.isClosed = !1, this.resetItemViewContainer(), this.triggerBeforeRender();
			var t = this.renderModel();
			return this.$el.html(t), this.bindUIElements(), this.triggerMethod("composite:model:rendered"), this._renderChildren(), this.triggerMethod("composite:rendered"), this.triggerRendered(), this
		},
		_renderChildren: function() {
			this.isRendered && (o.CollectionView.prototype._renderChildren.call(this), this.triggerMethod("composite:collection:rendered"))
		},
		renderModel: function() {
			var t = {};
			t = this.serializeData(), t = this.mixinTemplateHelpers(t);
			var e = this.getTemplate();
			return o.Renderer.render(e, t)
		},
		appendBuffer: function(t, e) {
			var i = this.getItemViewContainer(t);
			i.append(e)
		},
		appendHtml: function(t, e, i) {
			if (t.isBuffering) t.elBuffer.appendChild(e.el);
			else {
				var n = this.getItemViewContainer(t);
				n.append(e.el)
			}
		},
		getItemViewContainer: function(t) {
			if ("$itemViewContainer" in t) return t.$itemViewContainer;
			var e, n = o.getOption(t, "itemViewContainer");
			if (n) {
				var a = i.isFunction(n) ? n() : n;
				e = t.$(a), e.length <= 0 && s("The specified `itemViewContainer` was not found: " + t.itemViewContainer, "ItemViewContainerMissingError")
			} else e = t.$el;
			return t.$itemViewContainer = e, e
		},
		resetItemViewContainer: function() {
			this.$itemViewContainer && delete this.$itemViewContainer
		}
	}), o.Layout = o.ItemView.extend({
		regionType: o.Region,
		constructor: function(t) {
			t = t || {}, this._firstRender = !0, this._initializeRegions(t), o.ItemView.prototype.constructor.call(this, t)
		},
		render: function() {
			this.isClosed && this._initializeRegions(), this._firstRender ? this._firstRender = !1 : this.isClosed || this._reInitializeRegions();
			var t = Array.prototype.slice.apply(arguments),
				e = o.ItemView.prototype.render.apply(this, t);
			return e
		},
		close: function() {
			if (!this.isClosed) {
				this.regionManager.close();
				var t = Array.prototype.slice.apply(arguments);
				o.ItemView.prototype.close.apply(this, t)
			}
		},
		addRegion: function(t, e) {
			var i = {};
			return i[t] = e, this._buildRegions(i)[t]
		},
		addRegions: function(t) {
			return this.regions = i.extend({}, this.regions, t), this._buildRegions(t)
		},
		removeRegion: function(t) {
			return delete this.regions[t], this.regionManager.removeRegion(t)
		},
		_buildRegions: function(t) {
			var e = this,
				i = {
					regionType: o.getOption(this, "regionType"),
					parentEl: function() {
						return e.$el
					}
				};
			return this.regionManager.addRegions(t, i)
		},
		_initializeRegions: function(t) {
			var e;
			this._initRegionManager(), e = i.isFunction(this.regions) ? this.regions(t) : this.regions || {}, this.addRegions(e)
		},
		_reInitializeRegions: function() {
			this.regionManager.closeRegions(), this.regionManager.each(function(t) {
				t.reset()
			})
		},
		_initRegionManager: function() {
			this.regionManager = new o.RegionManager, this.listenTo(this.regionManager, "region:add", function(t, e) {
				this[t] = e, this.trigger("region:add", t, e)
			}), this.listenTo(this.regionManager, "region:remove", function(t, e) {
				delete this[t], this.trigger("region:remove", t, e)
			})
		}
	}), o.AppRouter = e.Router.extend({
		constructor: function(t) {
			e.Router.prototype.constructor.apply(this, n(arguments)), this.options = t || {};
			var i = o.getOption(this, "appRoutes"),
				s = this._getController();
			this.processAppRoutes(s, i)
		},
		appRoute: function(t, e) {
			var i = this._getController();
			this._addAppRoute(i, t, e)
		},
		processAppRoutes: function(t, e) {
			if (e) {
				var n = i.keys(e).reverse();
				i.each(n, function(i) {
					this._addAppRoute(t, i, e[i])
				}, this)
			}
		},
		_getController: function() {
			return o.getOption(this, "controller")
		},
		_addAppRoute: function(t, e, n) {
			var s = t[n];
			if (!s) throw new Error("Method '" + n + "' was not found on the controller");
			this.route(e, n, i.bind(s, t))
		}
	}), o.Application = function(t) {
		this._initRegionManager(), this._initCallbacks = new o.Callbacks, this.vent = new e.Wreqr.EventAggregator, this.commands = new e.Wreqr.Commands, this.reqres = new e.Wreqr.RequestResponse, this.submodules = {}, i.extend(this, t), this.triggerMethod = o.triggerMethod
	}, i.extend(o.Application.prototype, e.Events, {
		execute: function() {
			var t = Array.prototype.slice.apply(arguments);
			this.commands.execute.apply(this.commands, t)
		},
		request: function() {
			var t = Array.prototype.slice.apply(arguments);
			return this.reqres.request.apply(this.reqres, t)
		},
		addInitializer: function(t) {
			this._initCallbacks.add(t)
		},
		start: function(t) {
			this.triggerMethod("initialize:before", t), this._initCallbacks.run(t, this), this.triggerMethod("initialize:after", t), this.triggerMethod("start", t)
		},
		addRegions: function(t) {
			return this._regionManager.addRegions(t)
		},
		closeRegions: function() {
			this._regionManager.closeRegions()
		},
		removeRegion: function(t) {
			this._regionManager.removeRegion(t)
		},
		getRegion: function(t) {
			return this._regionManager.get(t)
		},
		module: function(t, e) {
			var i = n(arguments);
			return i.unshift(this), o.Module.create.apply(o.Module, i)
		},
		_initRegionManager: function() {
			this._regionManager = new o.RegionManager, this.listenTo(this._regionManager, "region:add", function(t, e) {
				this[t] = e
			}), this.listenTo(this._regionManager, "region:remove", function(t, e) {
				delete this[t]
			})
		}
	}), o.Application.extend = o.extend, o.Module = function(t, e) {
		this.moduleName = t, this.submodules = {}, this._setupInitializersAndFinalizers(), this.app = e, this.startWithParent = !0, this.triggerMethod = o.triggerMethod
	}, i.extend(o.Module.prototype, e.Events, {
		addInitializer: function(t) {
			this._initializerCallbacks.add(t)
		},
		addFinalizer: function(t) {
			this._finalizerCallbacks.add(t)
		},
		start: function(t) {
			this._isInitialized || (i.each(this.submodules, function(e) {
				e.startWithParent && e.start(t)
			}), this.triggerMethod("before:start", t), this._initializerCallbacks.run(t, this), this._isInitialized = !0, this.triggerMethod("start", t))
		},
		stop: function() {
			this._isInitialized && (this._isInitialized = !1, o.triggerMethod.call(this, "before:stop"), i.each(this.submodules, function(t) {
				t.stop()
			}), this._finalizerCallbacks.run(void 0, this), this._initializerCallbacks.reset(), this._finalizerCallbacks.reset(), o.triggerMethod.call(this, "stop"))
		},
		addDefinition: function(t, e) {
			this._runModuleDefinition(t, e)
		},
		_runModuleDefinition: function(t, n) {
			if (t) {
				var s = i.flatten([this, this.app, e, o, o.$, i, n]);
				t.apply(this, s)
			}
		},
		_setupInitializersAndFinalizers: function() {
			this._initializerCallbacks = new o.Callbacks, this._finalizerCallbacks = new o.Callbacks
		}
	}), i.extend(o.Module, {
		create: function(t, e, s) {
			var o = t,
				a = n(arguments);
			a.splice(0, 3), e = e.split(".");
			var r = e.length,
				l = [];
			return l[r - 1] = s, i.each(e, function(e, i) {
				var n = o;
				o = this._getModule(n, e, t), this._addModuleDefinition(n, o, l[i], a)
			}, this), o
		},
		_getModule: function(t, e, i, n, s) {
			var a = t[e];
			return a || (a = new o.Module(e, i), t[e] = a, t.submodules[e] = a), a
		},
		_addModuleDefinition: function(t, e, n, s) {
			var o, a;
			i.isFunction(n) ? (o = n, a = !0) : i.isObject(n) ? (o = n.define, a = n.startWithParent) : a = !0, o && e.addDefinition(o, s), e.startWithParent = e.startWithParent && a, e.startWithParent && !e.startWithParentIsConfigured && (e.startWithParentIsConfigured = !0, t.addInitializer(function(t) {
				e.startWithParent && e.start(t)
			}))
		}
	}), o
}(this, Backbone, _);
! function(t, e) {
	function i() {
		return new Date(Date.UTC.apply(Date, arguments))
	}

	function n() {
		var t = new Date;
		return i(t.getFullYear(), t.getMonth(), t.getDate())
	}

	function s(t) {
		return function() {
			return this[t].apply(this, arguments)
		}
	}

	function o(e, i) {
		function n(t, e) {
			return e.toLowerCase()
		}
		var s, o = t(e).data(),
			a = {}, r = new RegExp("^" + i.toLowerCase() + "([A-Z])");
		i = new RegExp("^" + i.toLowerCase());
		for (var l in o) i.test(l) && (s = l.replace(r, n), a[s] = o[l]);
		return a
	}

	function a(e) {
		var i = {};
		if (f[e] || (e = e.split("-")[0], f[e])) {
			var n = f[e];
			return t.each(p, function(t, e) {
				e in n && (i[e] = n[e])
			}), i
		}
	}
	var r = t(window),
		l = function() {
			var e = {
				get: function(t) {
					return this.slice(t)[0]
				},
				contains: function(t) {
					for (var e = t && t.valueOf(), i = 0, n = this.length; n > i; i++)
						if (this[i].valueOf() === e) return i;
					return -1
				},
				remove: function(t) {
					this.splice(t, 1)
				},
				replace: function(e) {
					e && (t.isArray(e) || (e = [e]), this.clear(), this.push.apply(this, e))
				},
				clear: function() {
					this.length = 0
				},
				copy: function() {
					var t = new l;
					return t.replace(this), t
				}
			};
			return function() {
				var i = [];
				return i.push.apply(i, arguments), t.extend(i, e), i
			}
		}(),
		h = function(e, i) {
			this.dates = new l, this.viewDate = n(), this.focusDate = null, this._process_options(i), this.element = t(e), this.isInline = !1, this.isInput = this.element.is("input"), this.component = this.element.is(".date") ? this.element.find(".add-on, .input-group-addon, .btn") : !1, this.hasInput = this.component && this.element.find("input").length, this.component && 0 === this.component.length && (this.component = !1), this.picker = t(m.template), this._buildEvents(), this._attachEvents(), this.isInline ? this.picker.addClass("datepicker-inline").appendTo(this.element) : this.picker.addClass("datepicker-dropdown dropdown-menu"), this.o.rtl && this.picker.addClass("datepicker-rtl"), this.viewMode = this.o.startView, this.o.calendarWeeks && this.picker.find("tfoot th.today, tfoot th.clear").attr("colspan", function(t, e) {
				return parseInt(e) + 1
			}), this._allow_update = !1, this.setStartDate(this._o.startDate), this.setEndDate(this._o.endDate), this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled), this.fillDow(), this.fillMonths(), this._allow_update = !0, this.update(), this.showMode(), this.isInline && this.show()
		};
	h.prototype = {
		constructor: h,
		_process_options: function(e) {
			this._o = t.extend({}, this._o, e);
			var i = this.o = t.extend({}, this._o),
				n = i.language;
			switch (f[n] || (n = n.split("-")[0], f[n] || (n = u.language)), i.language = n, i.startView) {
				case 2:
				case "decade":
					i.startView = 2;
					break;
				case 1:
				case "year":
					i.startView = 1;
					break;
				default:
					i.startView = 0
			}
			switch (i.minViewMode) {
				case 1:
				case "months":
					i.minViewMode = 1;
					break;
				case 2:
				case "years":
					i.minViewMode = 2;
					break;
				default:
					i.minViewMode = 0
			}
			i.startView = Math.max(i.startView, i.minViewMode), i.multidate !== !0 && (i.multidate = Number(i.multidate) || !1, i.multidate !== !1 ? i.multidate = Math.max(0, i.multidate) : i.multidate = 1), i.multidateSeparator = String(i.multidateSeparator), i.weekStart %= 7, i.weekEnd = (i.weekStart + 6) % 7;
			var s = m.parseFormat(i.format);
			i.startDate !== -(1 / 0) && (i.startDate ? i.startDate instanceof Date ? i.startDate = this._local_to_utc(this._zero_time(i.startDate)) : i.startDate = m.parseDate(i.startDate, s, i.language) : i.startDate = -(1 / 0)), i.endDate !== 1 / 0 && (i.endDate ? i.endDate instanceof Date ? i.endDate = this._local_to_utc(this._zero_time(i.endDate)) : i.endDate = m.parseDate(i.endDate, s, i.language) : i.endDate = 1 / 0), i.daysOfWeekDisabled = i.daysOfWeekDisabled || [], t.isArray(i.daysOfWeekDisabled) || (i.daysOfWeekDisabled = i.daysOfWeekDisabled.split(/[,\s]*/)), i.daysOfWeekDisabled = t.map(i.daysOfWeekDisabled, function(t) {
				return parseInt(t, 10)
			});
			var o = String(i.orientation).toLowerCase().split(/\s+/g),
				a = i.orientation.toLowerCase();
			if (o = t.grep(o, function(t) {
				return /^auto|left|right|top|bottom$/.test(t)
			}), i.orientation = {
				x: "auto",
				y: "auto"
			}, a && "auto" !== a)
				if (1 === o.length) switch (o[0]) {
					case "top":
					case "bottom":
						i.orientation.y = o[0];
						break;
					case "left":
					case "right":
						i.orientation.x = o[0]
				} else a = t.grep(o, function(t) {
					return /^left|right$/.test(t)
				}), i.orientation.x = a[0] || "auto", a = t.grep(o, function(t) {
					return /^top|bottom$/.test(t)
				}), i.orientation.y = a[0] || "auto";
				else;
		},
		_events: [],
		_secondaryEvents: [],
		_applyEvents: function(t) {
			for (var i, n, s, o = 0; o < t.length; o++) i = t[o][0], 2 === t[o].length ? (n = e, s = t[o][1]) : 3 === t[o].length && (n = t[o][1], s = t[o][2]), i.on(s, n)
		},
		_unapplyEvents: function(t) {
			for (var i, n, s, o = 0; o < t.length; o++) i = t[o][0], 2 === t[o].length ? (s = e, n = t[o][1]) : 3 === t[o].length && (s = t[o][1], n = t[o][2]), i.off(n, s)
		},
		_buildEvents: function() {
			this.isInput ? this._events = [
				[this.element, {
					focus: t.proxy(this.show, this),
					keyup: t.proxy(function(e) {
						-1 === t.inArray(e.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) && this.update()
					}, this),
					keydown: t.proxy(this.keydown, this)
				}]
			] : this.component && this.hasInput ? this._events = [
				[this.element.find("input"), {
					focus: t.proxy(this.show, this),
					keyup: t.proxy(function(e) {
						-1 === t.inArray(e.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) && this.update()
					}, this),
					keydown: t.proxy(this.keydown, this)
				}],
				[this.component, {
					click: t.proxy(this.show, this)
				}]
			] : this.element.is("div") ? this.isInline = !0 : this._events = [
				[this.element, {
					click: t.proxy(this.show, this)
				}]
			], this._events.push([this.element, "*", {
				blur: t.proxy(function(t) {
					this._focused_from = t.target
				}, this)
			}], [this.element, {
				blur: t.proxy(function(t) {
					this._focused_from = t.target
				}, this)
			}]), this._secondaryEvents = [
				[this.picker, {
					click: t.proxy(this.click, this)
				}],
				[t(window), {
					resize: t.proxy(this.place, this)
				}],
				[t(document), {
					"mousedown touchstart": t.proxy(function(t) {
						this.element.is(t.target) || this.element.find(t.target).length || this.picker.is(t.target) || this.picker.find(t.target).length || this.hide()
					}, this)
				}]
			]
		},
		_attachEvents: function() {
			this._detachEvents(), this._applyEvents(this._events)
		},
		_detachEvents: function() {
			this._unapplyEvents(this._events)
		},
		_attachSecondaryEvents: function() {
			this._detachSecondaryEvents(), this._applyEvents(this._secondaryEvents)
		},
		_detachSecondaryEvents: function() {
			this._unapplyEvents(this._secondaryEvents)
		},
		_trigger: function(e, i) {
			var n = i || this.dates.get(-1),
				s = this._utc_to_local(n);
			this.element.trigger({
				type: e,
				date: s,
				dates: t.map(this.dates, this._utc_to_local),
				format: t.proxy(function(t, e) {
					0 === arguments.length ? (t = this.dates.length - 1, e = this.o.format) : "string" == typeof t && (e = t, t = this.dates.length - 1), e = e || this.o.format;
					var i = this.dates.get(t);
					return m.formatDate(i, e, this.o.language)
				}, this)
			})
		},
		show: function() {
			this.isInline || this.picker.appendTo("body"), this.picker.show(), this.place(), this._attachSecondaryEvents(), this._trigger("show")
		},
		hide: function() {
			this.isInline || this.picker.is(":visible") && (this.focusDate = null, this.picker.hide().detach(), this._detachSecondaryEvents(), this.viewMode = this.o.startView, this.showMode(), this.o.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val()) && this.setValue(), this._trigger("hide"))
		},
		remove: function() {
			this.hide(), this._detachEvents(), this._detachSecondaryEvents(), this.picker.remove(), delete this.element.data().datepicker, this.isInput || delete this.element.data().date
		},
		_utc_to_local: function(t) {
			return t && new Date(t.getTime() + 6e4 * t.getTimezoneOffset())
		},
		_local_to_utc: function(t) {
			return t && new Date(t.getTime() - 6e4 * t.getTimezoneOffset())
		},
		_zero_time: function(t) {
			return t && new Date(t.getFullYear(), t.getMonth(), t.getDate())
		},
		_zero_utc_time: function(t) {
			return t && new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()))
		},
		getDates: function() {
			return t.map(this.dates, this._utc_to_local)
		},
		getUTCDates: function() {
			return t.map(this.dates, function(t) {
				return new Date(t)
			})
		},
		getDate: function() {
			return this._utc_to_local(this.getUTCDate())
		},
		getUTCDate: function() {
			return new Date(this.dates.get(-1))
		},
		setDates: function() {
			var e = t.isArray(arguments[0]) ? arguments[0] : arguments;
			this.update.apply(this, e), this._trigger("changeDate"), this.setValue()
		},
		setUTCDates: function() {
			var e = t.isArray(arguments[0]) ? arguments[0] : arguments;
			this.update.apply(this, t.map(e, this._utc_to_local)), this._trigger("changeDate"), this.setValue()
		},
		setDate: s("setDates"),
		setUTCDate: s("setUTCDates"),
		setValue: function() {
			var t = this.getFormattedDate();
			this.isInput ? this.element.val(t).change() : this.component && this.element.find("input").val(t).change()
		},
		getFormattedDate: function(i) {
			i === e && (i = this.o.format);
			var n = this.o.language;
			return t.map(this.dates, function(t) {
				return m.formatDate(t, i, n)
			}).join(this.o.multidateSeparator)
		},
		setStartDate: function(t) {
			this._process_options({
				startDate: t
			}), this.update(), this.updateNavArrows()
		},
		setEndDate: function(t) {
			this._process_options({
				endDate: t
			}), this.update(), this.updateNavArrows()
		},
		setDaysOfWeekDisabled: function(t) {
			this._process_options({
				daysOfWeekDisabled: t
			}), this.update(), this.updateNavArrows()
		},
		place: function() {
			if (!this.isInline) {
				var e = this.picker.outerWidth(),
					i = this.picker.outerHeight(),
					n = 10,
					s = r.width(),
					o = r.height(),
					a = r.scrollTop(),
					l = [];
				this.element.parents().each(function() {
					var e = t(this).css("z-index");
					"auto" !== e && 0 !== e && l.push(parseInt(e))
				});
				var h = Math.max.apply(Math, l) + 10,
					d = this.component ? this.component.parent().offset() : this.element.offset(),
					c = this.component ? this.component.outerHeight(!0) : this.element.outerHeight(!1),
					u = this.component ? this.component.outerWidth(!0) : this.element.outerWidth(!1),
					p = d.left,
					f = d.top;
				this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"), "auto" !== this.o.orientation.x ? (this.picker.addClass("datepicker-orient-" + this.o.orientation.x), "right" === this.o.orientation.x && (p -= e - u)) : (this.picker.addClass("datepicker-orient-left"), d.left < 0 ? p -= d.left - n : d.left + e > s && (p = s - e - n));
				var m, g, v = this.o.orientation.y;
				"auto" === v && (m = -a + d.top - i, g = a + o - (d.top + c + i), v = Math.max(m, g) === g ? "top" : "bottom"), this.picker.addClass("datepicker-orient-" + v), "top" === v ? f += c : f -= i + parseInt(this.picker.css("padding-top")), this.picker.css({
					top: f,
					left: p,
					zIndex: h
				})
			}
		},
		_allow_update: !0,
		update: function() {
			if (this._allow_update) {
				var e = this.dates.copy(),
					i = [],
					n = !1;
				arguments.length ? (t.each(arguments, t.proxy(function(t, e) {
					e instanceof Date && (e = this._local_to_utc(e)), i.push(e)
				}, this)), n = !0) : (i = this.isInput ? this.element.val() : this.element.data("date") || this.element.find("input").val(), i = i && this.o.multidate ? i.split(this.o.multidateSeparator) : [i], delete this.element.data().date), i = t.map(i, t.proxy(function(t) {
					return m.parseDate(t, this.o.format, this.o.language)
				}, this)), i = t.grep(i, t.proxy(function(t) {
					return t < this.o.startDate || t > this.o.endDate || !t
				}, this), !0), this.dates.replace(i), this.dates.length ? this.viewDate = new Date(this.dates.get(-1)) : this.viewDate < this.o.startDate ? this.viewDate = new Date(this.o.startDate) : this.viewDate > this.o.endDate && (this.viewDate = new Date(this.o.endDate)), n ? this.setValue() : i.length && String(e) !== String(this.dates) && this._trigger("changeDate"), !this.dates.length && e.length && this._trigger("clearDate"), this.fill()
			}
		},
		fillDow: function() {
			var t = this.o.weekStart,
				e = "<tr>";
			if (this.o.calendarWeeks) {
				var i = '<th class="cw">&nbsp;</th>';
				e += i, this.picker.find(".datepicker-days thead tr:first-child").prepend(i)
			}
			for (; t < this.o.weekStart + 7;) e += '<th class="dow">' + f[this.o.language].daysMin[t++ % 7] + "</th>";
			e += "</tr>", this.picker.find(".datepicker-days thead").append(e)
		},
		fillMonths: function() {
			for (var t = "", e = 0; 12 > e;) t += '<span class="month">' + f[this.o.language].monthsShort[e++] + "</span>";
			this.picker.find(".datepicker-months td").html(t)
		},
		setRange: function(e) {
			e && e.length ? this.range = t.map(e, function(t) {
				return t.valueOf()
			}) : delete this.range, this.fill()
		},
		getClassNames: function(e) {
			var i = [],
				n = this.viewDate.getUTCFullYear(),
				s = this.viewDate.getUTCMonth(),
				o = new Date;
			return e.getUTCFullYear() < n || e.getUTCFullYear() === n && e.getUTCMonth() < s ? i.push("old") : (e.getUTCFullYear() > n || e.getUTCFullYear() === n && e.getUTCMonth() > s) && i.push("new"), this.focusDate && e.valueOf() === this.focusDate.valueOf() && i.push("focused"), this.o.todayHighlight && e.getUTCFullYear() === o.getFullYear() && e.getUTCMonth() === o.getMonth() && e.getUTCDate() === o.getDate() && i.push("today"), -1 !== this.dates.contains(e) && i.push("active"), (e.valueOf() < this.o.startDate || e.valueOf() > this.o.endDate || -1 !== t.inArray(e.getUTCDay(), this.o.daysOfWeekDisabled)) && i.push("disabled"), this.range && (e > this.range[0] && e < this.range[this.range.length - 1] && i.push("range"), -1 !== t.inArray(e.valueOf(), this.range) && i.push("selected")), i
		},
		fill: function() {
			var n, s = new Date(this.viewDate),
				o = s.getUTCFullYear(),
				a = s.getUTCMonth(),
				r = this.o.startDate !== -(1 / 0) ? this.o.startDate.getUTCFullYear() : -(1 / 0),
				l = this.o.startDate !== -(1 / 0) ? this.o.startDate.getUTCMonth() : -(1 / 0),
				h = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCFullYear() : 1 / 0,
				d = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCMonth() : 1 / 0,
				c = f[this.o.language].today || f.en.today || "",
				u = f[this.o.language].clear || f.en.clear || "";
			if (!isNaN(o) && !isNaN(a)) {
				this.picker.find(".datepicker-days thead th.datepicker-switch").text(f[this.o.language].months[a] + " " + o), this.picker.find("tfoot th.today").text(c).toggle(this.o.todayBtn !== !1), this.picker.find("tfoot th.clear").text(u).toggle(this.o.clearBtn !== !1), this.updateNavArrows(), this.fillMonths();
				var p = i(o, a - 1, 28),
					g = m.getDaysInMonth(p.getUTCFullYear(), p.getUTCMonth());
				p.setUTCDate(g), p.setUTCDate(g - (p.getUTCDay() - this.o.weekStart + 7) % 7);
				var v = new Date(p);
				v.setUTCDate(v.getUTCDate() + 42), v = v.valueOf();
				for (var y, w = []; p.valueOf() < v;) {
					if (p.getUTCDay() === this.o.weekStart && (w.push("<tr>"), this.o.calendarWeeks)) {
						var b = new Date(+p + (this.o.weekStart - p.getUTCDay() - 7) % 7 * 864e5),
							D = new Date(Number(b) + (11 - b.getUTCDay()) % 7 * 864e5),
							_ = new Date(Number(_ = i(D.getUTCFullYear(), 0, 1)) + (11 - _.getUTCDay()) % 7 * 864e5),
							C = (D - _) / 864e5 / 7 + 1;
						w.push('<td class="cw">' + C + "</td>")
					}
					if (y = this.getClassNames(p), y.push("day"), this.o.beforeShowDay !== t.noop) {
						var T = this.o.beforeShowDay(this._utc_to_local(p));
						T === e ? T = {} : "boolean" == typeof T ? T = {
							enabled: T
						} : "string" == typeof T && (T = {
							classes: T
						}), T.enabled === !1 && y.push("disabled"), T.classes && (y = y.concat(T.classes.split(/\s+/))), T.tooltip && (n = T.tooltip)
					}
					y = t.unique(y), w.push('<td class="' + y.join(" ") + '"' + (n ? ' title="' + n + '"' : "") + ">" + p.getUTCDate() + "</td>"), n = null, p.getUTCDay() === this.o.weekEnd && w.push("</tr>"), p.setUTCDate(p.getUTCDate() + 1)
				}
				this.picker.find(".datepicker-days tbody").empty().append(w.join(""));
				var k = this.picker.find(".datepicker-months").find("th:eq(1)").text(o).end().find("span").removeClass("active");
				t.each(this.dates, function(t, e) {
					e.getUTCFullYear() === o && k.eq(e.getUTCMonth()).addClass("active")
				}), (r > o || o > h) && k.addClass("disabled"), o === r && k.slice(0, l).addClass("disabled"), o === h && k.slice(d + 1).addClass("disabled"), w = "", o = 10 * parseInt(o / 10, 10);
				var M = this.picker.find(".datepicker-years").find("th:eq(1)").text(o + "-" + (o + 9)).end().find("td");
				o -= 1;
				for (var x, S = t.map(this.dates, function(t) {
						return t.getUTCFullYear()
					}), U = -1; 11 > U; U++) x = ["year"], -1 === U ? x.push("old") : 10 === U && x.push("new"), -1 !== t.inArray(o, S) && x.push("active"), (r > o || o > h) && x.push("disabled"), w += '<span class="' + x.join(" ") + '">' + o + "</span>", o += 1;
				M.html(w)
			}
		},
		updateNavArrows: function() {
			if (this._allow_update) {
				var t = new Date(this.viewDate),
					e = t.getUTCFullYear(),
					i = t.getUTCMonth();
				switch (this.viewMode) {
					case 0:
						this.o.startDate !== -(1 / 0) && e <= this.o.startDate.getUTCFullYear() && i <= this.o.startDate.getUTCMonth() ? this.picker.find(".prev").css({
							visibility: "hidden"
						}) : this.picker.find(".prev").css({
							visibility: "visible"
						}), this.o.endDate !== 1 / 0 && e >= this.o.endDate.getUTCFullYear() && i >= this.o.endDate.getUTCMonth() ? this.picker.find(".next").css({
							visibility: "hidden"
						}) : this.picker.find(".next").css({
							visibility: "visible"
						});
						break;
					case 1:
					case 2:
						this.o.startDate !== -(1 / 0) && e <= this.o.startDate.getUTCFullYear() ? this.picker.find(".prev").css({
							visibility: "hidden"
						}) : this.picker.find(".prev").css({
							visibility: "visible"
						}), this.o.endDate !== 1 / 0 && e >= this.o.endDate.getUTCFullYear() ? this.picker.find(".next").css({
							visibility: "hidden"
						}) : this.picker.find(".next").css({
							visibility: "visible"
						})
				}
			}
		},
		click: function(e) {
			e.preventDefault();
			var n, s, o, a = t(e.target).closest("span, td, th");
			if (1 === a.length) switch (a[0].nodeName.toLowerCase()) {
				case "th":
					switch (a[0].className) {
						case "datepicker-switch":
							this.showMode(1);
							break;
						case "prev":
						case "next":
							var r = m.modes[this.viewMode].navStep * ("prev" === a[0].className ? -1 : 1);
							switch (this.viewMode) {
								case 0:
									this.viewDate = this.moveMonth(this.viewDate, r), this._trigger("changeMonth", this.viewDate);
									break;
								case 1:
								case 2:
									this.viewDate = this.moveYear(this.viewDate, r), 1 === this.viewMode && this._trigger("changeYear", this.viewDate)
							}
							this.fill();
							break;
						case "today":
							var l = new Date;
							l = i(l.getFullYear(), l.getMonth(), l.getDate(), 0, 0, 0), this.showMode(-2);
							var h = "linked" === this.o.todayBtn ? null : "view";
							this._setDate(l, h);
							break;
						case "clear":
							var d;
							this.isInput ? d = this.element : this.component && (d = this.element.find("input")), d && d.val("").change(), this.update(), this._trigger("changeDate"), this.o.autoclose && this.hide()
					}
					break;
				case "span":
					a.is(".disabled") || (this.viewDate.setUTCDate(1), a.is(".month") ? (o = 1, s = a.parent().find("span").index(a), n = this.viewDate.getUTCFullYear(), this.viewDate.setUTCMonth(s), this._trigger("changeMonth", this.viewDate), 1 === this.o.minViewMode && this._setDate(i(n, s, o))) : (o = 1, s = 0, n = parseInt(a.text(), 10) || 0, this.viewDate.setUTCFullYear(n), this._trigger("changeYear", this.viewDate), 2 === this.o.minViewMode && this._setDate(i(n, s, o))), this.showMode(-1), this.fill());
					break;
				case "td":
					a.is(".day") && !a.is(".disabled") && (o = parseInt(a.text(), 10) || 1, n = this.viewDate.getUTCFullYear(), s = this.viewDate.getUTCMonth(), a.is(".old") ? 0 === s ? (s = 11, n -= 1) : s -= 1 : a.is(".new") && (11 === s ? (s = 0, n += 1) : s += 1), this._setDate(i(n, s, o)))
			}
			this.picker.is(":visible") && this._focused_from && t(this._focused_from).focus(), delete this._focused_from
		},
		_toggle_multidate: function(t) {
			var e = this.dates.contains(t);
			if (t || this.dates.clear(), 1 === this.o.multidate && 0 === e || (-1 !== e ? this.dates.remove(e) : this.dates.push(t)), "number" == typeof this.o.multidate)
				for (; this.dates.length > this.o.multidate;) this.dates.remove(0)
		},
		_setDate: function(t, e) {
			e && "date" !== e || this._toggle_multidate(t && new Date(t)), e && "view" !== e || (this.viewDate = t && new Date(t)), this.fill(), this.setValue(), this._trigger("changeDate");
			var i;
			this.isInput ? i = this.element : this.component && (i = this.element.find("input")), i && i.change(), !this.o.autoclose || e && "date" !== e || this.hide()
		},
		moveMonth: function(t, i) {
			if (!t) return e;
			if (!i) return t;
			var n, s, o = new Date(t.valueOf()),
				a = o.getUTCDate(),
				r = o.getUTCMonth(),
				l = Math.abs(i);
			if (i = i > 0 ? 1 : -1, 1 === l) s = -1 === i ? function() {
				return o.getUTCMonth() === r
			} : function() {
				return o.getUTCMonth() !== n
			}, n = r + i, o.setUTCMonth(n), (0 > n || n > 11) && (n = (n + 12) % 12);
			else {
				for (var h = 0; l > h; h++) o = this.moveMonth(o, i);
				n = o.getUTCMonth(), o.setUTCDate(a), s = function() {
					return n !== o.getUTCMonth()
				}
			}
			for (; s();) o.setUTCDate(--a), o.setUTCMonth(n);
			return o
		},
		moveYear: function(t, e) {
			return this.moveMonth(t, 12 * e)
		},
		dateWithinRange: function(t) {
			return t >= this.o.startDate && t <= this.o.endDate
		},
		keydown: function(t) {
			if (this.picker.is(":not(:visible)")) return void(27 === t.keyCode && this.show());
			var e, i, s, o = !1,
				a = this.focusDate || this.viewDate;
			switch (t.keyCode) {
				case 27:
					this.focusDate ? (this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill()) : this.hide(), t.preventDefault();
					break;
				case 37:
				case 39:
					if (!this.o.keyboardNavigation) break;
					e = 37 === t.keyCode ? -1 : 1, t.ctrlKey ? (i = this.moveYear(this.dates.get(-1) || n(), e), s = this.moveYear(a, e), this._trigger("changeYear", this.viewDate)) : t.shiftKey ? (i = this.moveMonth(this.dates.get(-1) || n(), e), s = this.moveMonth(a, e), this._trigger("changeMonth", this.viewDate)) : (i = new Date(this.dates.get(-1) || n()), i.setUTCDate(i.getUTCDate() + e), s = new Date(a), s.setUTCDate(a.getUTCDate() + e)), this.dateWithinRange(i) && (this.focusDate = this.viewDate = s, this.setValue(), this.fill(), t.preventDefault());
					break;
				case 38:
				case 40:
					if (!this.o.keyboardNavigation) break;
					e = 38 === t.keyCode ? -1 : 1, t.ctrlKey ? (i = this.moveYear(this.dates.get(-1) || n(), e), s = this.moveYear(a, e), this._trigger("changeYear", this.viewDate)) : t.shiftKey ? (i = this.moveMonth(this.dates.get(-1) || n(), e), s = this.moveMonth(a, e), this._trigger("changeMonth", this.viewDate)) : (i = new Date(this.dates.get(-1) || n()), i.setUTCDate(i.getUTCDate() + 7 * e), s = new Date(a), s.setUTCDate(a.getUTCDate() + 7 * e)), this.dateWithinRange(i) && (this.focusDate = this.viewDate = s, this.setValue(), this.fill(), t.preventDefault());
					break;
				case 32:
					break;
				case 13:
					a = this.focusDate || this.dates.get(-1) || this.viewDate, this.o.keyboardNavigation && (this._toggle_multidate(a), o = !0), this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.setValue(), this.fill(), this.picker.is(":visible") && (t.preventDefault(), this.o.autoclose && this.hide());
					break;
				case 9:
					this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill(), this.hide()
			}
			if (o) {
				this.dates.length ? this._trigger("changeDate") : this._trigger("clearDate");
				var r;
				this.isInput ? r = this.element : this.component && (r = this.element.find("input")), r && r.change()
			}
		},
		showMode: function(t) {
			t && (this.viewMode = Math.max(this.o.minViewMode, Math.min(2, this.viewMode + t))), this.picker.find(">div").hide().filter(".datepicker-" + m.modes[this.viewMode].clsName).css("display", "block"), this.updateNavArrows()
		}
	};
	var d = function(e, i) {
		this.element = t(e), this.inputs = t.map(i.inputs, function(t) {
			return t.jquery ? t[0] : t
		}), delete i.inputs, t(this.inputs).datepicker(i).bind("changeDate", t.proxy(this.dateUpdated, this)), this.pickers = t.map(this.inputs, function(e) {
			return t(e).data("datepicker")
		}), this.updateDates()
	};
	d.prototype = {
		updateDates: function() {
			this.dates = t.map(this.pickers, function(t) {
				return t.getUTCDate()
			}), this.updateRanges()
		},
		updateRanges: function() {
			var e = t.map(this.dates, function(t) {
				return t.valueOf()
			});
			t.each(this.pickers, function(t, i) {
				i.setRange(e)
			})
		},
		dateUpdated: function(e) {
			if (!this.updating) {
				this.updating = !0;
				var i = t(e.target).data("datepicker"),
					n = i.getUTCDate(),
					s = t.inArray(e.target, this.inputs),
					o = this.inputs.length;
				if (-1 !== s) {
					if (t.each(this.pickers, function(t, e) {
						e.getUTCDate() || e.setUTCDate(n)
					}), n < this.dates[s])
						for (; s >= 0 && n < this.dates[s];) this.pickers[s--].setUTCDate(n);
					else if (n > this.dates[s])
						for (; o > s && n > this.dates[s];) this.pickers[s++].setUTCDate(n);
					this.updateDates(), delete this.updating
				}
			}
		},
		remove: function() {
			t.map(this.pickers, function(t) {
				t.remove()
			}), delete this.element.data().datepicker
		}
	};
	var c = t.fn.datepicker;
	t.fn.datepicker = function(i) {
		var n = Array.apply(null, arguments);
		n.shift();
		var s;
		return this.each(function() {
			var r = t(this),
				l = r.data("datepicker"),
				c = "object" == typeof i && i;
			if (!l) {
				var p = o(this, "date"),
					f = t.extend({}, u, p, c),
					m = a(f.language),
					g = t.extend({}, u, m, p, c);
				if (r.is(".input-daterange") || g.inputs) {
					var v = {
						inputs: g.inputs || r.find("input").toArray()
					};
					r.data("datepicker", l = new d(this, t.extend(g, v)))
				} else r.data("datepicker", l = new h(this, g))
			}
			return "string" == typeof i && "function" == typeof l[i] && (s = l[i].apply(l, n), s !== e) ? !1 : void 0
		}), s !== e ? s : this
	};
	var u = t.fn.datepicker.defaults = {
		autoclose: !1,
		beforeShowDay: t.noop,
		calendarWeeks: !1,
		clearBtn: !1,
		daysOfWeekDisabled: [],
		endDate: 1 / 0,
		forceParse: !0,
		format: "mm/dd/yyyy",
		keyboardNavigation: !0,
		language: "en",
		minViewMode: 0,
		multidate: !1,
		multidateSeparator: ",",
		orientation: "auto",
		rtl: !1,
		startDate: -(1 / 0),
		startView: 0,
		todayBtn: !1,
		todayHighlight: !1,
		weekStart: 0
	}, p = t.fn.datepicker.locale_opts = ["format", "rtl", "weekStart"];
	t.fn.datepicker.Constructor = h;
	var f = t.fn.datepicker.dates = {
		en: {
			days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
			daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
			daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
			months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			today: "Today",
			clear: "Clear"
		}
	}, m = {
			modes: [{
				clsName: "days",
				navFnc: "Month",
				navStep: 1
			}, {
				clsName: "months",
				navFnc: "FullYear",
				navStep: 1
			}, {
				clsName: "years",
				navFnc: "FullYear",
				navStep: 10
			}],
			isLeapYear: function(t) {
				return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0
			},
			getDaysInMonth: function(t, e) {
				return [31, m.isLeapYear(t) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e]
			},
			validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
			nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
			parseFormat: function(t) {
				var e = t.replace(this.validParts, "\x00").split("\x00"),
					i = t.match(this.validParts);
				if (!e || !e.length || !i || 0 === i.length) throw new Error("Invalid date format.");
				return {
					separators: e,
					parts: i
				}
			},
			parseDate: function(n, s, o) {
				function a() {
					var t = this.slice(0, u[d].length),
						e = u[d].slice(0, t.length);
					return t === e
				}
				if (!n) return e;
				if (n instanceof Date) return n;
				"string" == typeof s && (s = m.parseFormat(s));
				var r, l, d, c = /([\-+]\d+)([dmwy])/,
					u = n.match(/([\-+]\d+)([dmwy])/g);
				if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(n)) {
					for (n = new Date, d = 0; d < u.length; d++) switch (r = c.exec(u[d]), l = parseInt(r[1]), r[2]) {
						case "d":
							n.setUTCDate(n.getUTCDate() + l);
							break;
						case "m":
							n = h.prototype.moveMonth.call(h.prototype, n, l);
							break;
						case "w":
							n.setUTCDate(n.getUTCDate() + 7 * l);
							break;
						case "y":
							n = h.prototype.moveYear.call(h.prototype, n, l)
					}
					return i(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate(), 0, 0, 0)
				}
				u = n && n.match(this.nonpunctuation) || [], n = new Date;
				var p, g, v = {}, y = ["yyyy", "yy", "M", "MM", "m", "mm", "d", "dd"],
					w = {
						yyyy: function(t, e) {
							return t.setUTCFullYear(e)
						},
						yy: function(t, e) {
							return t.setUTCFullYear(2e3 + e)
						},
						m: function(t, e) {
							if (isNaN(t)) return t;
							for (e -= 1; 0 > e;) e += 12;
							for (e %= 12, t.setUTCMonth(e); t.getUTCMonth() !== e;) t.setUTCDate(t.getUTCDate() - 1);
							return t
						},
						d: function(t, e) {
							return t.setUTCDate(e)
						}
					};
				w.M = w.MM = w.mm = w.m, w.dd = w.d, n = i(n.getFullYear(), n.getMonth(), n.getDate(), 0, 0, 0);
				var b = s.parts.slice();
				if (u.length !== b.length && (b = t(b).filter(function(e, i) {
					return -1 !== t.inArray(i, y)
				}).toArray()), u.length === b.length) {
					var D;
					for (d = 0, D = b.length; D > d; d++) {
						if (p = parseInt(u[d], 10), r = b[d], isNaN(p)) switch (r) {
							case "MM":
								g = t(f[o].months).filter(a), p = t.inArray(g[0], f[o].months) + 1;
								break;
							case "M":
								g = t(f[o].monthsShort).filter(a), p = t.inArray(g[0], f[o].monthsShort) + 1
						}
						v[r] = p
					}
					var _, C;
					for (d = 0; d < y.length; d++) C = y[d], C in v && !isNaN(v[C]) && (_ = new Date(n), w[C](_, v[C]), isNaN(_) || (n = _))
				}
				return n
			},
			formatDate: function(e, i, n) {
				if (!e) return "";
				"string" == typeof i && (i = m.parseFormat(i));
				var s = {
					d: e.getUTCDate(),
					D: f[n].daysShort[e.getUTCDay()],
					DD: f[n].days[e.getUTCDay()],
					m: e.getUTCMonth() + 1,
					M: f[n].monthsShort[e.getUTCMonth()],
					MM: f[n].months[e.getUTCMonth()],
					yy: e.getUTCFullYear().toString().substring(2),
					yyyy: e.getUTCFullYear()
				};
				s.dd = (s.d < 10 ? "0" : "") + s.d, s.mm = (s.m < 10 ? "0" : "") + s.m, e = [];
				for (var o = t.extend([], i.separators), a = 0, r = i.parts.length; r >= a; a++) o.length && e.push(o.shift()), e.push(s[i.parts[a]]);
				return e.join("")
			},
			headTemplate: '<thead><tr><th class="prev">&laquo;</th><th colspan="5" class="datepicker-switch"></th><th class="next">&raquo;</th></tr></thead>',
			contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
			footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'
		};
	m.template = '<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">' + m.headTemplate + "<tbody></tbody>" + m.footTemplate + '</table></div><div class="datepicker-months"><table class="table-condensed">' + m.headTemplate + m.contTemplate + m.footTemplate + '</table></div><div class="datepicker-years"><table class="table-condensed">' + m.headTemplate + m.contTemplate + m.footTemplate + "</table></div></div>", t.fn.datepicker.DPGlobal = m, t.fn.datepicker.noConflict = function() {
		return t.fn.datepicker = c, this
	}, t(document).on("focus.datepicker.data-api click.datepicker.data-api", '[data-provide="datepicker"]', function(e) {
		var i = t(this);
		i.data("datepicker") || (e.preventDefault(), i.datepicker("show"))
	}), t(function() {
		t('[data-provide="datepicker-inline"]').datepicker()
	})
}(window.jQuery),
function(t) {
	t.fn.datepicker.dates["zh-CN"] = {
		days: ["\u661f\u671f\u65e5", "\u661f\u671f\u4e00", "\u661f\u671f\u4e8c", "\u661f\u671f\u4e09", "\u661f\u671f\u56db", "\u661f\u671f\u4e94", "\u661f\u671f\u516d", "\u661f\u671f\u65e5"],
		daysShort: ["\u5468\u65e5", "\u5468\u4e00", "\u5468\u4e8c", "\u5468\u4e09", "\u5468\u56db", "\u5468\u4e94", "\u5468\u516d", "\u5468\u65e5"],
		daysMin: ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u65e5"],
		months: ["\u4e00\u6708", "\u4e8c\u6708", "\u4e09\u6708", "\u56db\u6708", "\u4e94\u6708", "\u516d\u6708", "\u4e03\u6708", "\u516b\u6708", "\u4e5d\u6708", "\u5341\u6708", "\u5341\u4e00\u6708", "\u5341\u4e8c\u6708"],
		monthsShort: ["\u4e00\u6708", "\u4e8c\u6708", "\u4e09\u6708", "\u56db\u6708", "\u4e94\u6708", "\u516d\u6708", "\u4e03\u6708", "\u516b\u6708", "\u4e5d\u6708", "\u5341\u6708", "\u5341\u4e00\u6708", "\u5341\u4e8c\u6708"],
		today: "\u4eca\u65e5",
		format: "yyyy\u5e74mm\u6708dd\u65e5",
		weekStart: 1,
		clear: "\u6e05\u7a7a"
	}
}(jQuery), ! function(t) {
	function e() {
		return new Date(Date.UTC.apply(Date, arguments))
	}
	"indexOf" in Array.prototype || (Array.prototype.indexOf = function(t, e) {
		void 0 === e && (e = 0), 0 > e && (e += this.length), 0 > e && (e = 0);
		for (var i = this.length; i > e; e++)
			if (e in this && this[e] === t) return e;
		return -1
	});
	var i = function(e, i) {
		var n = this;
		this.element = t(e), this.container = i.container || "body", this.language = i.language || this.element.data("date-language") || "en", this.language = this.language in s ? this.language : this.language.split("-")[0], this.language = this.language in s ? this.language : "en", this.isRTL = s[this.language].rtl || !1, this.formatType = i.formatType || this.element.data("format-type") || "standard", this.format = o.parseFormat(i.format || this.element.data("date-format") || s[this.language].format || o.getDefaultFormat(this.formatType, "input"), this.formatType), this.isInline = !1, this.isVisible = !1, this.isInput = this.element.is("input"), this.fontAwesome = i.fontAwesome || this.element.data("font-awesome") || !1, this.bootcssVer = i.bootcssVer || (this.isInput ? this.element.is(".form-control") ? 3 : 2 : this.bootcssVer = this.element.is(".input-group") ? 3 : 2), this.component = this.element.is(".date") ? 3 == this.bootcssVer ? this.element.find(".input-group-addon .glyphicon-th, .input-group-addon .glyphicon-time, .input-group-addon .glyphicon-calendar, .input-group-addon .glyphicon-calendar, .input-group-addon .fa-calendar, .input-group-addon .fa-clock-o").parent() : this.element.find(".add-on .icon-th, .add-on .icon-time, .add-on .icon-calendar, .add-on .fa-calendar, .add-on .fa-clock-o").parent() : !1, this.componentReset = this.element.is(".date") ? 3 == this.bootcssVer ? this.element.find(".input-group-addon .glyphicon-remove, .input-group-addon .fa-times").parent() : this.element.find(".add-on .icon-remove, .add-on .fa-times").parent() : !1, this.hasInput = this.component && this.element.find("input").length, this.component && 0 === this.component.length && (this.component = !1), this.linkField = i.linkField || this.element.data("link-field") || !1, this.linkFormat = o.parseFormat(i.linkFormat || this.element.data("link-format") || o.getDefaultFormat(this.formatType, "link"), this.formatType), this.minuteStep = i.minuteStep || this.element.data("minute-step") || 5, this.pickerPosition = i.pickerPosition || this.element.data("picker-position") || "bottom-right", this.showMeridian = i.showMeridian || this.element.data("show-meridian") || !1, this.initialDate = i.initialDate || new Date, this.zIndex = i.zIndex || this.element.data("z-index") || void 0, this.adjustTop = i.adjustTop || this.element.data("adjust-top") || 0, this.icons = {
			leftArrow: this.fontAwesome ? "fa-arrow-left" : 3 === this.bootcssVer ? "glyphicon-arrow-left" : "icon-arrow-left",
			rightArrow: this.fontAwesome ? "fa-arrow-right" : 3 === this.bootcssVer ? "glyphicon-arrow-right" : "icon-arrow-right"
		}, this.icontype = this.fontAwesome ? "fa" : "glyphicon", this._attachEvents(), this.clickedOutside = function(e) {
			0 === t(e.target).closest(".datetimepicker").length && n.hide()
		}, this.formatViewType = "datetime", "formatViewType" in i ? this.formatViewType = i.formatViewType : "formatViewType" in this.element.data() && (this.formatViewType = this.element.data("formatViewType")), this.minView = 0, "minView" in i ? this.minView = i.minView : "minView" in this.element.data() && (this.minView = this.element.data("min-view")), this.minView = o.convertViewMode(this.minView), this.maxView = o.modes.length - 1, "maxView" in i ? this.maxView = i.maxView : "maxView" in this.element.data() && (this.maxView = this.element.data("max-view")), this.maxView = o.convertViewMode(this.maxView), this.wheelViewModeNavigation = !1, "wheelViewModeNavigation" in i ? this.wheelViewModeNavigation = i.wheelViewModeNavigation : "wheelViewModeNavigation" in this.element.data() && (this.wheelViewModeNavigation = this.element.data("view-mode-wheel-navigation")), this.wheelViewModeNavigationInverseDirection = !1, "wheelViewModeNavigationInverseDirection" in i ? this.wheelViewModeNavigationInverseDirection = i.wheelViewModeNavigationInverseDirection : "wheelViewModeNavigationInverseDirection" in this.element.data() && (this.wheelViewModeNavigationInverseDirection = this.element.data("view-mode-wheel-navigation-inverse-dir")), this.wheelViewModeNavigationDelay = 100, "wheelViewModeNavigationDelay" in i ? this.wheelViewModeNavigationDelay = i.wheelViewModeNavigationDelay : "wheelViewModeNavigationDelay" in this.element.data() && (this.wheelViewModeNavigationDelay = this.element.data("view-mode-wheel-navigation-delay")), this.startViewMode = 2, "startView" in i ? this.startViewMode = i.startView : "startView" in this.element.data() && (this.startViewMode = this.element.data("start-view")), this.startViewMode = o.convertViewMode(this.startViewMode), this.viewMode = this.startViewMode, this.viewSelect = this.minView, "viewSelect" in i ? this.viewSelect = i.viewSelect : "viewSelect" in this.element.data() && (this.viewSelect = this.element.data("view-select")), this.viewSelect = o.convertViewMode(this.viewSelect), this.forceParse = !0, "forceParse" in i ? this.forceParse = i.forceParse : "dateForceParse" in this.element.data() && (this.forceParse = this.element.data("date-force-parse"));
		for (var a = 3 === this.bootcssVer ? o.templateV3 : o.template; - 1 !== a.indexOf("{iconType}");) a = a.replace("{iconType}", this.icontype);
		for (; - 1 !== a.indexOf("{leftArrow}");) a = a.replace("{leftArrow}", this.icons.leftArrow);
		for (; - 1 !== a.indexOf("{rightArrow}");) a = a.replace("{rightArrow}", this.icons.rightArrow);
		if (this.picker = t(a).appendTo(this.isInline ? this.element : this.container).on({
				click: t.proxy(this.click, this),
				mousedown: t.proxy(this.mousedown, this)
			}), this.wheelViewModeNavigation && (t.fn.mousewheel ? this.picker.on({
				mousewheel: t.proxy(this.mousewheel, this)
			}) : console.log("Mouse Wheel event is not supported. Please include the jQuery Mouse Wheel plugin before enabling this option")),
			this.isInline ? this.picker.addClass("datetimepicker-inline") : this.picker.addClass("datetimepicker-dropdown-" + this.pickerPosition + " dropdown-menu"), this.isRTL) {
			this.picker.addClass("datetimepicker-rtl");
			var r = 3 === this.bootcssVer ? ".prev span, .next span" : ".prev i, .next i";
			this.picker.find(r).toggleClass(this.icons.leftArrow + " " + this.icons.rightArrow)
		}
		t(document).on("mousedown", this.clickedOutside), this.autoclose = !1, "autoclose" in i ? this.autoclose = i.autoclose : "dateAutoclose" in this.element.data() && (this.autoclose = this.element.data("date-autoclose")), this.keyboardNavigation = !0, "keyboardNavigation" in i ? this.keyboardNavigation = i.keyboardNavigation : "dateKeyboardNavigation" in this.element.data() && (this.keyboardNavigation = this.element.data("date-keyboard-navigation")), this.todayBtn = i.todayBtn || this.element.data("date-today-btn") || !1, this.todayHighlight = i.todayHighlight || this.element.data("date-today-highlight") || !1, this.weekStart = (i.weekStart || this.element.data("date-weekstart") || s[this.language].weekStart || 0) % 7, this.weekEnd = (this.weekStart + 6) % 7, this.startDate = -(1 / 0), this.endDate = 1 / 0, this.daysOfWeekDisabled = [], this.setStartDate(i.startDate || this.element.data("date-startdate")), this.setEndDate(i.endDate || this.element.data("date-enddate")), this.setDaysOfWeekDisabled(i.daysOfWeekDisabled || this.element.data("date-days-of-week-disabled")), this.setMinutesDisabled(i.minutesDisabled || this.element.data("date-minute-disabled")), this.setHoursDisabled(i.hoursDisabled || this.element.data("date-hour-disabled")), this.fillDow(), this.fillMonths(), this.update(), this.showMode(), this.isInline && this.show()
	};
	i.prototype = {
		constructor: i,
		_events: [],
		_attachEvents: function() {
			this._detachEvents(), this.isInput ? this._events = [
				[this.element, {
					focus: t.proxy(this.show, this),
					keyup: t.proxy(this.update, this),
					keydown: t.proxy(this.keydown, this)
				}]
			] : this.component && this.hasInput ? (this._events = [
				[this.element.find("input"), {
					focus: t.proxy(this.show, this),
					keyup: t.proxy(this.update, this),
					keydown: t.proxy(this.keydown, this)
				}],
				[this.component, {
					click: t.proxy(this.show, this)
				}]
			], this.componentReset && this._events.push([this.componentReset, {
				click: t.proxy(this.reset, this)
			}])) : this.element.is("div") ? this.isInline = !0 : this._events = [
				[this.element, {
					click: t.proxy(this.show, this)
				}]
			];
			for (var e, i, n = 0; n < this._events.length; n++) e = this._events[n][0], i = this._events[n][1], e.on(i)
		},
		_detachEvents: function() {
			for (var t, e, i = 0; i < this._events.length; i++) t = this._events[i][0], e = this._events[i][1], t.off(e);
			this._events = []
		},
		show: function(e) {
			this.picker.show(), this.height = this.component ? this.component.outerHeight() : this.element.outerHeight(), this.forceParse && this.update(), this.place(), t(window).on("resize", t.proxy(this.place, this)), e && (e.stopPropagation(), e.preventDefault()), this.isVisible = !0, this.element.trigger({
				type: "show",
				date: this.date
			})
		},
		hide: function(e) {
			this.isVisible && (this.isInline || (this.picker.hide(), t(window).off("resize", this.place), this.viewMode = this.startViewMode, this.showMode(), this.isInput || t(document).off("mousedown", this.hide), this.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val()) && this.setValue(), this.isVisible = !1, this.element.trigger({
				type: "hide",
				date: this.date
			})))
		},
		remove: function() {
			this._detachEvents(), t(document).off("mousedown", this.clickedOutside), this.picker.remove(), delete this.picker, delete this.element.data().datetimepicker
		},
		getDate: function() {
			var t = this.getUTCDate();
			return new Date(t.getTime() + 6e4 * t.getTimezoneOffset())
		},
		getUTCDate: function() {
			return this.date
		},
		setDate: function(t) {
			this.setUTCDate(new Date(t.getTime() - 6e4 * t.getTimezoneOffset()))
		},
		setUTCDate: function(t) {
			t >= this.startDate && t <= this.endDate ? (this.date = t, this.setValue(), this.viewDate = this.date, this.fill()) : this.element.trigger({
				type: "outOfRange",
				date: t,
				startDate: this.startDate,
				endDate: this.endDate
			})
		},
		setFormat: function(t) {
			this.format = o.parseFormat(t, this.formatType);
			var e;
			this.isInput ? e = this.element : this.component && (e = this.element.find("input")), e && e.val() && this.setValue()
		},
		setValue: function() {
			var e = this.getFormattedDate();
			this.isInput ? this.element.val(e) : (this.component && this.element.find("input").val(e), this.element.data("date", e)), this.linkField && t("#" + this.linkField).val(this.getFormattedDate(this.linkFormat))
		},
		getFormattedDate: function(t) {
			return void 0 == t && (t = this.format), o.formatDate(this.date, t, this.language, this.formatType)
		},
		setStartDate: function(t) {
			this.startDate = t || -(1 / 0), this.startDate !== -(1 / 0) && (this.startDate = o.parseDate(this.startDate, this.format, this.language, this.formatType)), this.update(), this.updateNavArrows()
		},
		setEndDate: function(t) {
			this.endDate = t || 1 / 0, this.endDate !== 1 / 0 && (this.endDate = o.parseDate(this.endDate, this.format, this.language, this.formatType)), this.update(), this.updateNavArrows()
		},
		setDaysOfWeekDisabled: function(e) {
			this.daysOfWeekDisabled = e || [], t.isArray(this.daysOfWeekDisabled) || (this.daysOfWeekDisabled = this.daysOfWeekDisabled.split(/,\s*/)), this.daysOfWeekDisabled = t.map(this.daysOfWeekDisabled, function(t) {
				return parseInt(t, 10)
			}), this.update(), this.updateNavArrows()
		},
		setMinutesDisabled: function(e) {
			this.minutesDisabled = e || [], t.isArray(this.minutesDisabled) || (this.minutesDisabled = this.minutesDisabled.split(/,\s*/)), this.minutesDisabled = t.map(this.minutesDisabled, function(t) {
				return parseInt(t, 10)
			}), this.update(), this.updateNavArrows()
		},
		setHoursDisabled: function(e) {
			this.hoursDisabled = e || [], t.isArray(this.hoursDisabled) || (this.hoursDisabled = this.hoursDisabled.split(/,\s*/)), this.hoursDisabled = t.map(this.hoursDisabled, function(t) {
				return parseInt(t, 10)
			}), this.update(), this.updateNavArrows()
		},
		place: function() {
			if (!this.isInline) {
				if (!this.zIndex) {
					var e = 0;
					t("div").each(function() {
						var i = parseInt(t(this).css("zIndex"), 10);
						i > e && (e = i)
					}), this.zIndex = e + 10
				}
				var i, n, s, o;
				o = this.container instanceof t ? this.container.offset() : t(this.container).offset(), this.component ? (i = this.component.offset(), s = i.left, ("bottom-left" == this.pickerPosition || "top-left" == this.pickerPosition) && (s += this.component.outerWidth() - this.picker.outerWidth())) : (i = this.element.offset(), s = i.left);
				var a = document.body.clientWidth || window.innerWidth;
				s + 220 > a && (s = a - 220), n = "top-left" == this.pickerPosition || "top-right" == this.pickerPosition ? i.top - this.picker.outerHeight() : i.top + this.height, n -= o.top, s -= o.left, n += this.adjustTop, this.picker.css({
					top: n,
					left: s,
					zIndex: this.zIndex
				})
			}
		},
		update: function() {
			var t, e = !1;
			arguments && arguments.length && ("string" == typeof arguments[0] || arguments[0] instanceof Date) ? (t = arguments[0], e = !0) : (t = (this.isInput ? this.element.val() : this.element.find("input").val()) || this.element.data("date") || this.initialDate, ("string" == typeof t || t instanceof String) && (t = t.replace(/^\s+|\s+$/g, ""))), t || (t = new Date, e = !1), this.date = o.parseDate(t, this.format, this.language, this.formatType), e && this.setValue(), this.date < this.startDate ? this.viewDate = new Date(this.startDate) : this.date > this.endDate ? this.viewDate = new Date(this.endDate) : this.viewDate = new Date(this.date), this.fill()
		},
		fillDow: function() {
			for (var t = this.weekStart, e = "<tr>"; t < this.weekStart + 7;) e += '<th class="dow">' + s[this.language].daysMin[t++ % 7] + "</th>";
			e += "</tr>", this.picker.find(".datetimepicker-days thead").append(e)
		},
		fillMonths: function() {
			for (var t = "", e = 0; 12 > e;) t += '<span class="month">' + s[this.language].monthsShort[e++] + "</span>";
			this.picker.find(".datetimepicker-months td").html(t)
		},
		fill: function() {
			if (null != this.date && null != this.viewDate) {
				var i = new Date(this.viewDate),
					n = i.getUTCFullYear(),
					a = i.getUTCMonth(),
					r = i.getUTCDate(),
					l = i.getUTCHours(),
					h = i.getUTCMinutes(),
					d = this.startDate !== -(1 / 0) ? this.startDate.getUTCFullYear() : -(1 / 0),
					c = this.startDate !== -(1 / 0) ? this.startDate.getUTCMonth() + 1 : -(1 / 0),
					u = this.endDate !== 1 / 0 ? this.endDate.getUTCFullYear() : 1 / 0,
					p = this.endDate !== 1 / 0 ? this.endDate.getUTCMonth() + 1 : 1 / 0,
					f = new e(this.date.getUTCFullYear(), this.date.getUTCMonth(), this.date.getUTCDate()).valueOf(),
					m = new Date;
				if (this.picker.find(".datetimepicker-days thead th:eq(1)").text(s[this.language].months[a] + " " + n), "time" == this.formatViewType) {
					var g = this.getFormattedDate();
					this.picker.find(".datetimepicker-hours thead th:eq(1)").text(g), this.picker.find(".datetimepicker-minutes thead th:eq(1)").text(g)
				} else this.picker.find(".datetimepicker-hours thead th:eq(1)").text(r + " " + s[this.language].months[a] + " " + n), this.picker.find(".datetimepicker-minutes thead th:eq(1)").text(r + " " + s[this.language].months[a] + " " + n);
				this.picker.find("tfoot th.today").text(s[this.language].today).toggle(this.todayBtn !== !1), this.updateNavArrows(), this.fillMonths();
				var v = e(n, a - 1, 28, 0, 0, 0, 0),
					y = o.getDaysInMonth(v.getUTCFullYear(), v.getUTCMonth());
				v.setUTCDate(y), v.setUTCDate(y - (v.getUTCDay() - this.weekStart + 7) % 7);
				var w = new Date(v);
				w.setUTCDate(w.getUTCDate() + 42), w = w.valueOf();
				for (var b, D = []; v.valueOf() < w;) v.getUTCDay() == this.weekStart && D.push("<tr>"), b = "", v.getUTCFullYear() < n || v.getUTCFullYear() == n && v.getUTCMonth() < a ? b += " old" : (v.getUTCFullYear() > n || v.getUTCFullYear() == n && v.getUTCMonth() > a) && (b += " new"), this.todayHighlight && v.getUTCFullYear() == m.getFullYear() && v.getUTCMonth() == m.getMonth() && v.getUTCDate() == m.getDate() && (b += " today"), v.valueOf() == f && (b += " active"), (v.valueOf() + 864e5 <= this.startDate || v.valueOf() > this.endDate || -1 !== t.inArray(v.getUTCDay(), this.daysOfWeekDisabled)) && (b += " disabled"), D.push('<td class="day' + b + '">' + v.getUTCDate() + "</td>"), v.getUTCDay() == this.weekEnd && D.push("</tr>"), v.setUTCDate(v.getUTCDate() + 1);
				this.picker.find(".datetimepicker-days tbody").empty().append(D.join("")), D = [];
				for (var _ = "", C = "", T = "", k = this.hoursDisabled || [], M = 0; 24 > M; M++)
					if (-1 === k.indexOf(M)) {
						var x = e(n, a, r, M);
						b = "", x.valueOf() + 36e5 <= this.startDate || x.valueOf() > this.endDate ? b += " disabled" : l == M && (b += " active"), this.showMeridian && 2 == s[this.language].meridiem.length ? (C = 12 > M ? s[this.language].meridiem[0] : s[this.language].meridiem[1], C != T && ("" != T && D.push("</fieldset>"), D.push('<fieldset class="hour"><legend>' + C.toUpperCase() + "</legend>")), T = C, _ = M % 12 ? M % 12 : 12, D.push('<span class="hour' + b + " hour_" + (12 > M ? "am" : "pm") + '">' + _ + "</span>"), 23 == M && D.push("</fieldset>")) : (_ = M + ":00", D.push('<span class="hour' + b + '">' + _ + "</span>"))
					}
				this.picker.find(".datetimepicker-hours td").html(D.join("")), D = [], _ = "", C = "", T = "";
				for (var S = this.minutesDisabled || [], M = 0; 60 > M; M += this.minuteStep)
					if (-1 === S.indexOf(M)) {
						var x = e(n, a, r, l, M, 0);
						b = "", x.valueOf() < this.startDate || x.valueOf() > this.endDate ? b += " disabled" : Math.floor(h / this.minuteStep) == Math.floor(M / this.minuteStep) && (b += " active"), this.showMeridian && 2 == s[this.language].meridiem.length ? (C = 12 > l ? s[this.language].meridiem[0] : s[this.language].meridiem[1], C != T && ("" != T && D.push("</fieldset>"), D.push('<fieldset class="minute"><legend>' + C.toUpperCase() + "</legend>")), T = C, _ = l % 12 ? l % 12 : 12, D.push('<span class="minute' + b + '">' + _ + ":" + (10 > M ? "0" + M : M) + "</span>"), 59 == M && D.push("</fieldset>")) : (_ = M + ":00", D.push('<span class="minute' + b + '">' + l + ":" + (10 > M ? "0" + M : M) + "</span>"))
					}
				this.picker.find(".datetimepicker-minutes td").html(D.join(""));
				var U = this.date.getUTCFullYear(),
					E = this.picker.find(".datetimepicker-months").find("th:eq(1)").text(n).end().find("span").removeClass("active");
				if (U == n) {
					var I = E.length - 12;
					E.eq(this.date.getUTCMonth() + I).addClass("active")
				}(d > n || n > u) && E.addClass("disabled"), n == d && E.slice(0, c + 1).addClass("disabled"), n == u && E.slice(p).addClass("disabled"), D = "", n = 10 * parseInt(n / 10, 10);
				var F = this.picker.find(".datetimepicker-years").find("th:eq(1)").text(n + "-" + (n + 9)).end().find("td");
				n -= 1;
				for (var M = -1; 11 > M; M++) D += '<span class="year' + (-1 == M || 10 == M ? " old" : "") + (U == n ? " active" : "") + (d > n || n > u ? " disabled" : "") + '">' + n + "</span>", n += 1;
				F.html(D), this.place()
			}
		},
		updateNavArrows: function() {
			var t = new Date(this.viewDate),
				e = t.getUTCFullYear(),
				i = t.getUTCMonth(),
				n = t.getUTCDate(),
				s = t.getUTCHours();
			switch (this.viewMode) {
				case 0:
					this.startDate !== -(1 / 0) && e <= this.startDate.getUTCFullYear() && i <= this.startDate.getUTCMonth() && n <= this.startDate.getUTCDate() && s <= this.startDate.getUTCHours() ? this.picker.find(".prev").css({
						visibility: "hidden"
					}) : this.picker.find(".prev").css({
						visibility: "visible"
					}), this.endDate !== 1 / 0 && e >= this.endDate.getUTCFullYear() && i >= this.endDate.getUTCMonth() && n >= this.endDate.getUTCDate() && s >= this.endDate.getUTCHours() ? this.picker.find(".next").css({
						visibility: "hidden"
					}) : this.picker.find(".next").css({
						visibility: "visible"
					});
					break;
				case 1:
					this.startDate !== -(1 / 0) && e <= this.startDate.getUTCFullYear() && i <= this.startDate.getUTCMonth() && n <= this.startDate.getUTCDate() ? this.picker.find(".prev").css({
						visibility: "hidden"
					}) : this.picker.find(".prev").css({
						visibility: "visible"
					}), this.endDate !== 1 / 0 && e >= this.endDate.getUTCFullYear() && i >= this.endDate.getUTCMonth() && n >= this.endDate.getUTCDate() ? this.picker.find(".next").css({
						visibility: "hidden"
					}) : this.picker.find(".next").css({
						visibility: "visible"
					});
					break;
				case 2:
					this.startDate !== -(1 / 0) && e <= this.startDate.getUTCFullYear() && i <= this.startDate.getUTCMonth() ? this.picker.find(".prev").css({
						visibility: "hidden"
					}) : this.picker.find(".prev").css({
						visibility: "visible"
					}), this.endDate !== 1 / 0 && e >= this.endDate.getUTCFullYear() && i >= this.endDate.getUTCMonth() ? this.picker.find(".next").css({
						visibility: "hidden"
					}) : this.picker.find(".next").css({
						visibility: "visible"
					});
					break;
				case 3:
				case 4:
					this.startDate !== -(1 / 0) && e <= this.startDate.getUTCFullYear() ? this.picker.find(".prev").css({
						visibility: "hidden"
					}) : this.picker.find(".prev").css({
						visibility: "visible"
					}), this.endDate !== 1 / 0 && e >= this.endDate.getUTCFullYear() ? this.picker.find(".next").css({
						visibility: "hidden"
					}) : this.picker.find(".next").css({
						visibility: "visible"
					})
			}
		},
		mousewheel: function(e) {
			if (e.preventDefault(), e.stopPropagation(), !this.wheelPause) {
				this.wheelPause = !0;
				var i = e.originalEvent,
					n = i.wheelDelta,
					s = n > 0 ? 1 : 0 === n ? 0 : -1;
				this.wheelViewModeNavigationInverseDirection && (s = -s), this.showMode(s), setTimeout(t.proxy(function() {
					this.wheelPause = !1
				}, this), this.wheelViewModeNavigationDelay)
			}
		},
		click: function(i) {
			i.stopPropagation(), i.preventDefault();
			var n = t(i.target).closest("span, td, th, legend");
			if (n.is("." + this.icontype) && (n = t(n).parent().closest("span, td, th, legend")), 1 == n.length) {
				if (n.is(".disabled")) return void this.element.trigger({
					type: "outOfRange",
					date: this.viewDate,
					startDate: this.startDate,
					endDate: this.endDate
				});
				switch (n[0].nodeName.toLowerCase()) {
					case "th":
						switch (n[0].className) {
							case "switch":
								this.showMode(1);
								break;
							case "prev":
							case "next":
								var s = o.modes[this.viewMode].navStep * ("prev" == n[0].className ? -1 : 1);
								switch (this.viewMode) {
									case 0:
										this.viewDate = this.moveHour(this.viewDate, s);
										break;
									case 1:
										this.viewDate = this.moveDate(this.viewDate, s);
										break;
									case 2:
										this.viewDate = this.moveMonth(this.viewDate, s);
										break;
									case 3:
									case 4:
										this.viewDate = this.moveYear(this.viewDate, s)
								}
								this.fill(), this.element.trigger({
									type: n[0].className + ":" + this.convertViewModeText(this.viewMode),
									date: this.viewDate,
									startDate: this.startDate,
									endDate: this.endDate
								});
								break;
							case "today":
								var a = new Date;
								a = e(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds(), 0), a < this.startDate ? a = this.startDate : a > this.endDate && (a = this.endDate), this.viewMode = this.startViewMode, this.showMode(0), this._setDate(a), this.fill(), this.autoclose && this.hide()
						}
						break;
					case "span":
						if (!n.is(".disabled")) {
							var r = this.viewDate.getUTCFullYear(),
								l = this.viewDate.getUTCMonth(),
								h = this.viewDate.getUTCDate(),
								d = this.viewDate.getUTCHours(),
								c = this.viewDate.getUTCMinutes(),
								u = this.viewDate.getUTCSeconds();
							if (n.is(".month") ? (this.viewDate.setUTCDate(1), l = n.parent().find("span").index(n), h = this.viewDate.getUTCDate(), this.viewDate.setUTCMonth(l), this.element.trigger({
								type: "changeMonth",
								date: this.viewDate
							}), this.viewSelect >= 3 && this._setDate(e(r, l, h, d, c, u, 0))) : n.is(".year") ? (this.viewDate.setUTCDate(1), r = parseInt(n.text(), 10) || 0, this.viewDate.setUTCFullYear(r), this.element.trigger({
								type: "changeYear",
								date: this.viewDate
							}), this.viewSelect >= 4 && this._setDate(e(r, l, h, d, c, u, 0))) : n.is(".hour") ? (d = parseInt(n.text(), 10) || 0, (n.hasClass("hour_am") || n.hasClass("hour_pm")) && (12 == d && n.hasClass("hour_am") ? d = 0 : 12 != d && n.hasClass("hour_pm") && (d += 12)), this.viewDate.setUTCHours(d), this.element.trigger({
								type: "changeHour",
								date: this.viewDate
							}), this.viewSelect >= 1 && this._setDate(e(r, l, h, d, c, u, 0))) : n.is(".minute") && (c = parseInt(n.text().substr(n.text().indexOf(":") + 1), 10) || 0, this.viewDate.setUTCMinutes(c), this.element.trigger({
								type: "changeMinute",
								date: this.viewDate
							}), this.viewSelect >= 0 && this._setDate(e(r, l, h, d, c, u, 0))), 0 != this.viewMode) {
								var p = this.viewMode;
								this.showMode(-1), this.fill(), p == this.viewMode && this.autoclose && this.hide()
							} else this.fill(), this.autoclose && this.hide()
						}
						break;
					case "td":
						if (n.is(".day") && !n.is(".disabled")) {
							var h = parseInt(n.text(), 10) || 1,
								r = this.viewDate.getUTCFullYear(),
								l = this.viewDate.getUTCMonth(),
								d = this.viewDate.getUTCHours(),
								c = this.viewDate.getUTCMinutes(),
								u = this.viewDate.getUTCSeconds();
							n.is(".old") ? 0 === l ? (l = 11, r -= 1) : l -= 1 : n.is(".new") && (11 == l ? (l = 0, r += 1) : l += 1), this.viewDate.setUTCFullYear(r), this.viewDate.setUTCMonth(l, h), this.element.trigger({
								type: "changeDay",
								date: this.viewDate
							}), this.viewSelect >= 2 && this._setDate(e(r, l, h, d, c, u, 0))
						}
						var p = this.viewMode;
						this.showMode(-1), this.fill(), p == this.viewMode && this.autoclose && this.hide()
				}
			}
		},
		_setDate: function(t, e) {
			e && "date" != e || (this.date = t), e && "view" != e || (this.viewDate = t), this.fill(), this.setValue();
			var i;
			this.isInput ? i = this.element : this.component && (i = this.element.find("input")), i && (i.change(), this.autoclose && (!e || "date" == e)), this.element.trigger({
				type: "changeDate",
				date: this.date
			}), null == t && (this.date = this.viewDate)
		},
		moveMinute: function(t, e) {
			if (!e) return t;
			var i = new Date(t.valueOf());
			return i.setUTCMinutes(i.getUTCMinutes() + e * this.minuteStep), i
		},
		moveHour: function(t, e) {
			if (!e) return t;
			var i = new Date(t.valueOf());
			return i.setUTCHours(i.getUTCHours() + e), i
		},
		moveDate: function(t, e) {
			if (!e) return t;
			var i = new Date(t.valueOf());
			return i.setUTCDate(i.getUTCDate() + e), i
		},
		moveMonth: function(t, e) {
			if (!e) return t;
			var i, n, s = new Date(t.valueOf()),
				o = s.getUTCDate(),
				a = s.getUTCMonth(),
				r = Math.abs(e);
			if (e = e > 0 ? 1 : -1, 1 == r) n = -1 == e ? function() {
				return s.getUTCMonth() == a
			} : function() {
				return s.getUTCMonth() != i
			}, i = a + e, s.setUTCMonth(i), (0 > i || i > 11) && (i = (i + 12) % 12);
			else {
				for (var l = 0; r > l; l++) s = this.moveMonth(s, e);
				i = s.getUTCMonth(), s.setUTCDate(o), n = function() {
					return i != s.getUTCMonth()
				}
			}
			for (; n();) s.setUTCDate(--o), s.setUTCMonth(i);
			return s
		},
		moveYear: function(t, e) {
			return this.moveMonth(t, 12 * e)
		},
		dateWithinRange: function(t) {
			return t >= this.startDate && t <= this.endDate
		},
		keydown: function(t) {
			if (this.picker.is(":not(:visible)")) return void(27 == t.keyCode && this.show());
			var e, i, n, s = !1;
			switch (t.keyCode) {
				case 27:
					this.hide(), t.preventDefault();
					break;
				case 37:
				case 39:
					if (!this.keyboardNavigation) break;
					e = 37 == t.keyCode ? -1 : 1, viewMode = this.viewMode, t.ctrlKey ? viewMode += 2 : t.shiftKey && (viewMode += 1), 4 == viewMode ? (i = this.moveYear(this.date, e), n = this.moveYear(this.viewDate, e)) : 3 == viewMode ? (i = this.moveMonth(this.date, e), n = this.moveMonth(this.viewDate, e)) : 2 == viewMode ? (i = this.moveDate(this.date, e), n = this.moveDate(this.viewDate, e)) : 1 == viewMode ? (i = this.moveHour(this.date, e), n = this.moveHour(this.viewDate, e)) : 0 == viewMode && (i = this.moveMinute(this.date, e), n = this.moveMinute(this.viewDate, e)), this.dateWithinRange(i) && (this.date = i, this.viewDate = n, this.setValue(), this.update(), t.preventDefault(), s = !0);
					break;
				case 38:
				case 40:
					if (!this.keyboardNavigation) break;
					e = 38 == t.keyCode ? -1 : 1, viewMode = this.viewMode, t.ctrlKey ? viewMode += 2 : t.shiftKey && (viewMode += 1), 4 == viewMode ? (i = this.moveYear(this.date, e), n = this.moveYear(this.viewDate, e)) : 3 == viewMode ? (i = this.moveMonth(this.date, e), n = this.moveMonth(this.viewDate, e)) : 2 == viewMode ? (i = this.moveDate(this.date, 7 * e), n = this.moveDate(this.viewDate, 7 * e)) : 1 == viewMode ? this.showMeridian ? (i = this.moveHour(this.date, 6 * e), n = this.moveHour(this.viewDate, 6 * e)) : (i = this.moveHour(this.date, 4 * e), n = this.moveHour(this.viewDate, 4 * e)) : 0 == viewMode && (i = this.moveMinute(this.date, 4 * e), n = this.moveMinute(this.viewDate, 4 * e)), this.dateWithinRange(i) && (this.date = i, this.viewDate = n, this.setValue(), this.update(), t.preventDefault(), s = !0);
					break;
				case 13:
					if (0 != this.viewMode) {
						var o = this.viewMode;
						this.showMode(-1), this.fill(), o == this.viewMode && this.autoclose && this.hide()
					} else this.fill(), this.autoclose && this.hide();
					t.preventDefault();
					break;
				case 9:
					this.hide()
			}
			if (s) {
				var a;
				this.isInput ? a = this.element : this.component && (a = this.element.find("input")), a && a.change(), this.element.trigger({
					type: "changeDate",
					date: this.date
				})
			}
		},
		showMode: function(t) {
			if (t) {
				var e = Math.max(0, Math.min(o.modes.length - 1, this.viewMode + t));
				e >= this.minView && e <= this.maxView && (this.element.trigger({
					type: "changeMode",
					date: this.viewDate,
					oldViewMode: this.viewMode,
					newViewMode: e
				}), this.viewMode = e)
			}
			this.picker.find(">div").hide().filter(".datetimepicker-" + o.modes[this.viewMode].clsName).css("display", "block"), this.updateNavArrows()
		},
		reset: function(t) {
			this._setDate(null, "date")
		},
		convertViewModeText: function(t) {
			switch (t) {
				case 4:
					return "decade";
				case 3:
					return "year";
				case 2:
					return "month";
				case 1:
					return "day";
				case 0:
					return "hour"
			}
		}
	};
	var n = t.fn.datetimepicker;
	t.fn.datetimepicker = function(e) {
		var n = Array.apply(null, arguments);
		n.shift();
		var s;
		return this.each(function() {
			var o = t(this),
				a = o.data("datetimepicker"),
				r = "object" == typeof e && e;
			return a || o.data("datetimepicker", a = new i(this, t.extend({}, t.fn.datetimepicker.defaults, r))), "string" == typeof e && "function" == typeof a[e] && (s = a[e].apply(a, n), void 0 !== s) ? !1 : void 0
		}), void 0 !== s ? s : this
	}, t.fn.datetimepicker.defaults = {}, t.fn.datetimepicker.Constructor = i;
	var s = t.fn.datetimepicker.dates = {
		en: {
			days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
			daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
			daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
			months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			meridiem: ["am", "pm"],
			suffix: ["st", "nd", "rd", "th"],
			today: "Today"
		}
	}, o = {
			modes: [{
				clsName: "minutes",
				navFnc: "Hours",
				navStep: 1
			}, {
				clsName: "hours",
				navFnc: "Date",
				navStep: 1
			}, {
				clsName: "days",
				navFnc: "Month",
				navStep: 1
			}, {
				clsName: "months",
				navFnc: "FullYear",
				navStep: 1
			}, {
				clsName: "years",
				navFnc: "FullYear",
				navStep: 10
			}],
			isLeapYear: function(t) {
				return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0
			},
			getDaysInMonth: function(t, e) {
				return [31, o.isLeapYear(t) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e]
			},
			getDefaultFormat: function(t, e) {
				if ("standard" == t) return "input" == e ? "yyyy-mm-dd hh:ii" : "yyyy-mm-dd hh:ii:ss";
				if ("php" == t) return "input" == e ? "Y-m-d H:i" : "Y-m-d H:i:s";
				throw new Error("Invalid format type.")
			},
			validParts: function(t) {
				if ("standard" == t) return /hh?|HH?|p|P|ii?|ss?|dd?|DD?|mm?|MM?|yy(?:yy)?/g;
				if ("php" == t) return /[dDjlNwzFmMnStyYaABgGhHis]/g;
				throw new Error("Invalid format type.")
			},
			nonpunctuation: /[^ -\/:-@\[-`{-~\t\n\rTZ]+/g,
			parseFormat: function(t, e) {
				var i = t.replace(this.validParts(e), "\x00").split("\x00"),
					n = t.match(this.validParts(e));
				if (!i || !i.length || !n || 0 == n.length) throw new Error("Invalid date format.");
				return {
					separators: i,
					parts: n
				}
			},
			parseDate: function(n, o, a, r) {
				if (n instanceof Date) {
					var l = new Date(n.valueOf() - 6e4 * n.getTimezoneOffset());
					return l.setMilliseconds(0), l
				}
				if (/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(n) && (o = this.parseFormat("yyyy-mm-dd", r)), /^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}$/.test(n) && (o = this.parseFormat("yyyy-mm-dd hh:ii", r)), /^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}\:\d{1,2}[Z]{0,1}$/.test(n) && (o = this.parseFormat("yyyy-mm-dd hh:ii:ss", r)), /^[-+]\d+[dmwy]([\s,]+[-+]\d+[dmwy])*$/.test(n)) {
					var h, d, c = /([-+]\d+)([dmwy])/,
						u = n.match(/([-+]\d+)([dmwy])/g);
					n = new Date;
					for (var p = 0; p < u.length; p++) switch (h = c.exec(u[p]), d = parseInt(h[1]), h[2]) {
						case "d":
							n.setUTCDate(n.getUTCDate() + d);
							break;
						case "m":
							n = i.prototype.moveMonth.call(i.prototype, n, d);
							break;
						case "w":
							n.setUTCDate(n.getUTCDate() + 7 * d);
							break;
						case "y":
							n = i.prototype.moveYear.call(i.prototype, n, d)
					}
					return e(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate(), n.getUTCHours(), n.getUTCMinutes(), n.getUTCSeconds(), 0)
				}
				if (/^\d{4}.\d{1,2}.\d{1,2}.[T ]\d{1,2}\:\d{1,2}\:\d{1,2}[Z]{0,1}$/.test(n)) return u = n.match(/([\d]+\d+)/g), e(u[0], u[1] - 1, u[2], u[3], u[4], u[5] || 0, 0);
				var f, m, h, u = n && n.toString().match(this.nonpunctuation) || [],
					n = new Date(0, 0, 0, 0, 0, 0, 0),
					g = {}, v = ["hh", "h", "ii", "i", "ss", "s", "yyyy", "yy", "M", "MM", "m", "mm", "D", "DD", "d", "dd", "H", "HH", "p", "P"],
					y = {
						hh: function(t, e) {
							return t.setUTCHours(e)
						},
						h: function(t, e) {
							return t.setUTCHours(e)
						},
						HH: function(t, e) {
							return t.setUTCHours(12 == e ? 0 : e)
						},
						H: function(t, e) {
							return t.setUTCHours(12 == e ? 0 : e)
						},
						ii: function(t, e) {
							return t.setUTCMinutes(e)
						},
						i: function(t, e) {
							return t.setUTCMinutes(e)
						},
						ss: function(t, e) {
							return t.setUTCSeconds(e)
						},
						s: function(t, e) {
							return t.setUTCSeconds(e)
						},
						yyyy: function(t, e) {
							return t.setUTCFullYear(e)
						},
						yy: function(t, e) {
							return t.setUTCFullYear(2e3 + e)
						},
						m: function(t, e) {
							for (e -= 1; 0 > e;) e += 12;
							for (e %= 12, t.setUTCMonth(e); t.getUTCMonth() != e;) {
								if (isNaN(t.getUTCMonth())) return t;
								t.setUTCDate(t.getUTCDate() - 1)
							}
							return t
						},
						d: function(t, e) {
							return t.setUTCDate(e)
						},
						p: function(t, e) {
							return t.setUTCHours(1 == e ? t.getUTCHours() + 12 : t.getUTCHours())
						}
					};
				if (y.M = y.MM = y.mm = y.m, y.dd = y.d, y.P = y.p, n = e(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds()), u.length == o.parts.length) {
					for (var p = 0, w = o.parts.length; w > p; p++) {
						if (f = parseInt(u[p], 10), h = o.parts[p], isNaN(f)) switch (h) {
							case "MM":
								m = t(s[a].months).filter(function() {
									var t = this.slice(0, u[p].length),
										e = u[p].slice(0, t.length);
									return t == e
								}), f = t.inArray(m[0], s[a].months) + 1;
								break;
							case "M":
								m = t(s[a].monthsShort).filter(function() {
									var t = this.slice(0, u[p].length),
										e = u[p].slice(0, t.length);
									return t.toLowerCase() == e.toLowerCase()
								}), f = t.inArray(m[0], s[a].monthsShort) + 1;
								break;
							case "p":
							case "P":
								f = t.inArray(u[p].toLowerCase(), s[a].meridiem)
						}
						g[h] = f
					}
					for (var b, p = 0; p < v.length; p++) b = v[p], b in g && !isNaN(g[b]) && y[b](n, g[b])
				}
				return n
			},
			formatDate: function(e, i, n, a) {
				if (null == e) return "";
				var r;
				if ("standard" == a) r = {
					yy: e.getUTCFullYear().toString().substring(2),
					yyyy: e.getUTCFullYear(),
					m: e.getUTCMonth() + 1,
					M: s[n].monthsShort[e.getUTCMonth()],
					MM: s[n].months[e.getUTCMonth()],
					d: e.getUTCDate(),
					D: s[n].daysShort[e.getUTCDay()],
					DD: s[n].days[e.getUTCDay()],
					p: 2 == s[n].meridiem.length ? s[n].meridiem[e.getUTCHours() < 12 ? 0 : 1] : "",
					h: e.getUTCHours(),
					i: e.getUTCMinutes(),
					s: e.getUTCSeconds()
				}, 2 == s[n].meridiem.length ? r.H = r.h % 12 == 0 ? 12 : r.h % 12 : r.H = r.h, r.HH = (r.H < 10 ? "0" : "") + r.H, r.P = r.p.toUpperCase(), r.hh = (r.h < 10 ? "0" : "") + r.h, r.ii = (r.i < 10 ? "0" : "") + r.i, r.ss = (r.s < 10 ? "0" : "") + r.s, r.dd = (r.d < 10 ? "0" : "") + r.d, r.mm = (r.m < 10 ? "0" : "") + r.m;
				else {
					if ("php" != a) throw new Error("Invalid format type.");
					r = {
						y: e.getUTCFullYear().toString().substring(2),
						Y: e.getUTCFullYear(),
						F: s[n].months[e.getUTCMonth()],
						M: s[n].monthsShort[e.getUTCMonth()],
						n: e.getUTCMonth() + 1,
						t: o.getDaysInMonth(e.getUTCFullYear(), e.getUTCMonth()),
						j: e.getUTCDate(),
						l: s[n].days[e.getUTCDay()],
						D: s[n].daysShort[e.getUTCDay()],
						w: e.getUTCDay(),
						N: 0 == e.getUTCDay() ? 7 : e.getUTCDay(),
						S: e.getUTCDate() % 10 <= s[n].suffix.length ? s[n].suffix[e.getUTCDate() % 10 - 1] : "",
						a: 2 == s[n].meridiem.length ? s[n].meridiem[e.getUTCHours() < 12 ? 0 : 1] : "",
						g: e.getUTCHours() % 12 == 0 ? 12 : e.getUTCHours() % 12,
						G: e.getUTCHours(),
						i: e.getUTCMinutes(),
						s: e.getUTCSeconds()
					}, r.m = (r.n < 10 ? "0" : "") + r.n, r.d = (r.j < 10 ? "0" : "") + r.j, r.A = r.a.toString().toUpperCase(), r.h = (r.g < 10 ? "0" : "") + r.g, r.H = (r.G < 10 ? "0" : "") + r.G, r.i = (r.i < 10 ? "0" : "") + r.i, r.s = (r.s < 10 ? "0" : "") + r.s
				}
				for (var e = [], l = t.extend([], i.separators), h = 0, d = i.parts.length; d > h; h++) l.length && e.push(l.shift()), e.push(r[i.parts[h]]);
				return l.length && e.push(l.shift()), e.join("")
			},
			convertViewMode: function(t) {
				switch (t) {
					case 4:
					case "decade":
						t = 4;
						break;
					case 3:
					case "year":
						t = 3;
						break;
					case 2:
					case "month":
						t = 2;
						break;
					case 1:
					case "day":
						t = 1;
						break;
					case 0:
					case "hour":
						t = 0
				}
				return t
			},
			headTemplate: '<thead><tr><th class="prev"><i class="{iconType} {leftArrow}"/>&#60;&#60;</th><th colspan="5" class="switch"></th><th class="next"><i class="{iconType} {rightArrow}"/>&#62;&#62;</th></tr></thead>',
			headTemplateV3: '<thead><tr><th class="prev"><span class="{iconType} {leftArrow}">&#60;&#60;</span> </th><th colspan="5" class="switch"></th><th class="next"><span class="{iconType} {rightArrow}">&#62;&#62;</span> </th></tr></thead>',
			contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
			footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr></tfoot>'
		};
	o.template = '<div class="datetimepicker"><div class="datetimepicker-minutes"><table class=" table-condensed">' + o.headTemplate + o.contTemplate + o.footTemplate + '</table></div><div class="datetimepicker-hours"><table class=" table-condensed">' + o.headTemplate + o.contTemplate + o.footTemplate + '</table></div><div class="datetimepicker-days"><table class=" table-condensed">' + o.headTemplate + "<tbody></tbody>" + o.footTemplate + '</table></div><div class="datetimepicker-months"><table class="table-condensed">' + o.headTemplate + o.contTemplate + o.footTemplate + '</table></div><div class="datetimepicker-years"><table class="table-condensed">' + o.headTemplate + o.contTemplate + o.footTemplate + "</table></div></div>", o.templateV3 = '<div class="datetimepicker"><div class="datetimepicker-minutes"><table class=" table-condensed">' + o.headTemplateV3 + o.contTemplate + o.footTemplate + '</table></div><div class="datetimepicker-hours"><table class=" table-condensed">' + o.headTemplateV3 + o.contTemplate + o.footTemplate + '</table></div><div class="datetimepicker-days"><table class=" table-condensed">' + o.headTemplateV3 + "<tbody></tbody>" + o.footTemplate + '</table></div><div class="datetimepicker-months"><table class="table-condensed">' + o.headTemplateV3 + o.contTemplate + o.footTemplate + '</table></div><div class="datetimepicker-years"><table class="table-condensed">' + o.headTemplateV3 + o.contTemplate + o.footTemplate + "</table></div></div>", t.fn.datetimepicker.DPGlobal = o, t.fn.datetimepicker.noConflict = function() {
		return t.fn.datetimepicker = n, this
	}, t(document).on("focus.datetimepicker.data-api click.datetimepicker.data-api", '[data-provide="datetimepicker"]', function(e) {
		var i = t(this);
		i.data("datetimepicker") || (e.preventDefault(), i.datetimepicker("show"))
	}), t(function() {
		t('[data-provide="datetimepicker-inline"]').datetimepicker()
	})
}(window.jQuery),
function(t) {
	t.fn.datetimepicker.dates["zh-CN"] = {
		days: ["\u661f\u671f\u65e5", "\u661f\u671f\u4e00", "\u661f\u671f\u4e8c", "\u661f\u671f\u4e09", "\u661f\u671f\u56db", "\u661f\u671f\u4e94", "\u661f\u671f\u516d", "\u661f\u671f\u65e5"],
		daysShort: ["\u5468\u65e5", "\u5468\u4e00", "\u5468\u4e8c", "\u5468\u4e09", "\u5468\u56db", "\u5468\u4e94", "\u5468\u516d", "\u5468\u65e5"],
		daysMin: ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u65e5"],
		months: ["\u4e00\u6708", "\u4e8c\u6708", "\u4e09\u6708", "\u56db\u6708", "\u4e94\u6708", "\u516d\u6708", "\u4e03\u6708", "\u516b\u6708", "\u4e5d\u6708", "\u5341\u6708", "\u5341\u4e00\u6708", "\u5341\u4e8c\u6708"],
		monthsShort: ["\u4e00\u6708", "\u4e8c\u6708", "\u4e09\u6708", "\u56db\u6708", "\u4e94\u6708", "\u516d\u6708", "\u4e03\u6708", "\u516b\u6708", "\u4e5d\u6708", "\u5341\u6708", "\u5341\u4e00\u6708", "\u5341\u4e8c\u6708"],
		today: "\u4eca\u5929",
		suffix: [],
		meridiem: ["\u4e0a\u5348", "\u4e0b\u5348"]
	}
}(jQuery),
function(t) {
	"use strict";
	t.expr[":"].icontains = function(e, i, n) {
		return t(e).text().toUpperCase().indexOf(n[3].toUpperCase()) >= 0
	};
	var e = function(i, n, s) {
		s && (s.stopPropagation(), s.preventDefault()), this.$element = t(i), this.$newElement = null, this.$button = null, this.$menu = null, this.$lis = null, this.options = n, null === this.options.title && (this.options.title = this.$element.attr("title")), this.val = e.prototype.val, this.render = e.prototype.render, this.refresh = e.prototype.refresh, this.setStyle = e.prototype.setStyle, this.selectAll = e.prototype.selectAll, this.deselectAll = e.prototype.deselectAll, this.destroy = e.prototype.remove, this.remove = e.prototype.remove, this.show = e.prototype.show, this.hide = e.prototype.hide, this.init()
	};
	e.VERSION = "1.6.1", e.DEFAULTS = {
		noneSelectedText: "Nothing selected",
		noneResultsText: "No results match",
		countSelectedText: "{0} of {1} selected",
		maxOptionsText: ["Limit reached ({n} {var} max)", "Group limit reached ({n} {var} max)", ["items", "item"]],
		multipleSeparator: ", ",
		style: "btn-default",
		size: "auto",
		title: null,
		selectedTextFormat: "values",
		width: !1,
		container: !1,
		hideDisabled: !1,
		showSubtext: !1,
		showIcon: !0,
		showContent: !0,
		dropupAuto: !0,
		header: !1,
		liveSearch: !1,
		actionsBox: !1,
		iconBase: "glyphicon",
		tickIcon: "glyphicon-ok",
		maxOptions: !1,
		mobile: !1
	}, e.prototype = {
		constructor: e,
		init: function() {
			var e = this,
				i = this.$element.attr("id");
			this.$element.hide(), this.multiple = this.$element.prop("multiple"), this.autofocus = this.$element.prop("autofocus"), this.$newElement = this.createView(), this.$element.after(this.$newElement), this.$menu = this.$newElement.find("> .dropdown-menu"), this.$button = this.$newElement.find("> button"), this.$searchbox = this.$newElement.find("input"), void 0 !== i && (this.$button.attr("data-id", i), t('label[for="' + i + '"]').click(function(t) {
				t.preventDefault(), e.$button.focus()
			})), this.checkDisabled(), this.clickListener(), this.options.liveSearch && this.liveSearchListener(), this.render(), this.liHeight(), this.setStyle(), this.setWidth(), this.options.container && this.selectPosition(), this.$menu.data("this", this), this.$newElement.data("this", this), this.options.mobile && this.mobile()
		},
		createDropdown: function() {
			var e = this.multiple ? " show-tick" : "",
				i = this.$element.parent().hasClass("input-group") ? " input-group-btn" : "",
				n = this.autofocus ? " autofocus" : "",
				s = this.options.header ? '<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + "</div>" : "",
				o = this.options.liveSearch ? '<div class="bootstrap-select-searchbox"><input type="text" class="input-block-level form-control" autocomplete="off" /></div>' : "",
				a = this.options.actionsBox ? '<div class="bs-actionsbox"><div class="btn-group btn-block"><button class="actions-btn bs-select-all btn btn-sm btn-default">Select All</button><button class="actions-btn bs-deselect-all btn btn-sm btn-default">Deselect All</button></div></div>' : "",
				r = '<div class="btn-group bootstrap-select' + e + i + '"><button type="button" class="btn dropdown-toggle selectpicker" data-toggle="dropdown"' + n + '><span class="filter-option pull-left"></span>&nbsp;<span class="caret"></span></button><div class="dropdown-menu open">' + s + o + a + '<ul class="dropdown-menu inner selectpicker" role="menu"></ul></div></div>';
			return t(r)
		},
		createView: function() {
			var t = this.createDropdown(),
				e = this.createLi();
			return t.find("ul").append(e), t
		},
		reloadLi: function() {
			this.destroyLi();
			var t = this.createLi();
			this.$menu.find("ul").append(t)
		},
		destroyLi: function() {
			this.$menu.find("li").remove()
		},
		createLi: function() {
			var e = this,
				i = [],
				n = "",
				s = 0;
			return this.$element.find("option").each(function() {
				var n = t(this),
					o = n.attr("class") || "",
					a = n.attr("style") || "",
					r = n.data("content") ? n.data("content") : n.html(),
					l = void 0 !== n.data("subtext") ? '<small class="muted text-muted">' + n.data("subtext") + "</small>" : "",
					h = void 0 !== n.data("icon") ? '<i class="' + e.options.iconBase + " " + n.data("icon") + '"></i> ' : "";
				if ("" !== h && (n.is(":disabled") || n.parent().is(":disabled")) && (h = "<span>" + h + "</span>"), n.data("content") || (r = h + '<span class="text">' + r + l + "</span>"), e.options.hideDisabled && (n.is(":disabled") || n.parent().is(":disabled"))) i.push('<a style="min-height: 0; padding: 0"></a>');
				else if (n.parent().is("optgroup") && n.data("divider") !== !0)
					if (0 === n.index()) {
						var d = n.parent().attr("label"),
							c = void 0 !== n.parent().data("subtext") ? '<small class="muted text-muted">' + n.parent().data("subtext") + "</small>" : "",
							u = n.parent().data("icon") ? '<i class="' + e.options.iconBase + " " + n.parent().data("icon") + '"></i> ' : "";
						d = u + '<span class="text">' + d + c + "</span>", s += 1, 0 !== n[0].index ? i.push('<div class="div-contain"><div class="divider"></div></div><dt>' + d + "</dt>" + e.createA(r, "opt " + o, a, s)) : i.push("<dt>" + d + "</dt>" + e.createA(r, "opt " + o, a, s))
					} else i.push(e.createA(r, "opt " + o, a, s));
					else n.data("divider") === !0 ? i.push('<div class="div-contain"><div class="divider"></div></div>') : t(this).data("hidden") === !0 ? i.push("<a></a>") : i.push(e.createA(r, o, a))
			}), t.each(i, function(t, e) {
				var i = "<a></a>" === e ? 'class="hide is-hidden"' : "";
				n += '<li rel="' + t + '"' + i + ">" + e + "</li>"
			}), this.multiple || 0 !== this.$element.find("option:selected").length || this.options.title || this.$element.find("option").eq(0).prop("selected", !0).attr("selected", "selected"), t(n)
		},
		createA: function(t, e, i, n) {
			return '<a tabindex="0" class="' + e + '" style="' + i + '"' + ("undefined" != typeof n ? 'data-optgroup="' + n + '"' : "") + ">" + t + '<i class="' + this.options.iconBase + " " + this.options.tickIcon + ' icon-ok check-mark"></i></a>'
		},
		render: function(e) {
			var i = this;
			e !== !1 && this.$element.find("option").each(function(e) {
				i.setDisabled(e, t(this).is(":disabled") || t(this).parent().is(":disabled")), i.setSelected(e, t(this).is(":selected"))
			}), this.tabIndex();
			var n = this.$element.find("option:selected").map(function() {
				var e, n = t(this),
					s = n.data("icon") && i.options.showIcon ? '<i class="' + i.options.iconBase + " " + n.data("icon") + '"></i> ' : "";
				return e = i.options.showSubtext && n.attr("data-subtext") && !i.multiple ? ' <small class="muted text-muted">' + n.data("subtext") + "</small>" : "", n.data("content") && i.options.showContent ? n.data("content") : void 0 !== n.attr("title") ? n.attr("title") : s + n.html() + e
			}).toArray(),
				s = this.multiple ? n.join(this.options.multipleSeparator) : n[0];
			if (this.multiple && this.options.selectedTextFormat.indexOf("count") > -1) {
				var o = this.options.selectedTextFormat.split(">"),
					a = this.options.hideDisabled ? ":not([disabled])" : "";
				(o.length > 1 && n.length > o[1] || 1 == o.length && n.length >= 2) && (s = this.options.countSelectedText.replace("{0}", n.length).replace("{1}", this.$element.find('option:not([data-divider="true"], [data-hidden="true"])' + a).length))
			}
			this.options.title = this.$element.attr("title"), "static" == this.options.selectedTextFormat && (s = this.options.title), s || (s = void 0 !== this.options.title ? this.options.title : this.options.noneSelectedText), this.$button.attr("title", t.trim(t("<div/>").html(s).text()).replace(/\s\s+/g, " ")), this.$newElement.find(".filter-option").html(s)
		},
		setStyle: function(t, e) {
			this.$element.attr("class") && this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|validate\[.*\]/gi, ""));
			var i = t ? t : this.options.style;
			"add" == e ? this.$button.addClass(i) : "remove" == e ? this.$button.removeClass(i) : (this.$button.removeClass(this.options.style), this.$button.addClass(i))
		},
		liHeight: function() {
			if (this.options.size !== !1) {
				var t = this.$menu.parent().clone().find("> .dropdown-toggle").prop("autofocus", !1).end().appendTo("body"),
					e = t.addClass("open").find("> .dropdown-menu"),
					i = e.find("li > a").outerHeight(),
					n = this.options.header ? e.find(".popover-title").outerHeight() : 0,
					s = this.options.liveSearch ? e.find(".bootstrap-select-searchbox").outerHeight() : 0,
					o = this.options.actionsBox ? e.find(".bs-actionsbox").outerHeight() : 0;
				t.remove(), this.$newElement.data("liHeight", i).data("headerHeight", n).data("searchHeight", s).data("actionsHeight", o)
			}
		},
		setSize: function() {
			var e, i, n, s = this,
				o = this.$menu,
				a = o.find(".inner"),
				r = this.$newElement.outerHeight(),
				l = this.$newElement.data("liHeight"),
				h = this.$newElement.data("headerHeight"),
				d = this.$newElement.data("searchHeight"),
				c = this.$newElement.data("actionsHeight"),
				u = o.find("li .divider").outerHeight(!0),
				p = parseInt(o.css("padding-top")) + parseInt(o.css("padding-bottom")) + parseInt(o.css("border-top-width")) + parseInt(o.css("border-bottom-width")),
				f = this.options.hideDisabled ? ":not(.disabled)" : "",
				m = t(window),
				g = p + parseInt(o.css("margin-top")) + parseInt(o.css("margin-bottom")) + 2,
				v = function() {
					i = s.$newElement.offset().top - m.scrollTop(), n = m.height() - i - r
				};
			if (v(), this.options.header && o.css("padding-top", 0), "auto" == this.options.size) {
				var y = function() {
					var t, r = s.$lis.not(".hide");
					v(), e = n - g, s.options.dropupAuto && s.$newElement.toggleClass("dropup", i > n && e - g < o.height()), s.$newElement.hasClass("dropup") && (e = i - g), t = r.length + r.find("dt").length > 3 ? 3 * l + g - 2 : 0, o.css({
						"max-height": e + "px",
						overflow: "hidden",
						"min-height": t + h + d + c + "px"
					}), a.css({
						"max-height": e - h - d - c - p + "px",
						"overflow-y": "auto",
						"min-height": Math.max(t - p, 0) + "px"
					})
				};
				y(), this.$searchbox.off("input.getSize propertychange.getSize").on("input.getSize propertychange.getSize", y), t(window).off("resize.getSize").on("resize.getSize", y), t(window).off("scroll.getSize").on("scroll.getSize", y)
			} else if (this.options.size && "auto" != this.options.size && o.find("li" + f).length > this.options.size) {
				var w = o.find("li" + f + " > *").not(".div-contain").slice(0, this.options.size).last().parent().index(),
					b = o.find("li").slice(0, w + 1).find(".div-contain").length;
				e = l * this.options.size + b * u + p, s.options.dropupAuto && this.$newElement.toggleClass("dropup", i > n && e < o.height()), o.css({
					"max-height": e + h + d + c + "px",
					overflow: "hidden"
				}), a.css({
					"max-height": e - p + "px",
					"overflow-y": "auto"
				})
			}
		},
		setWidth: function() {
			if ("auto" == this.options.width) {
				this.$menu.css("min-width", "0");
				var t = this.$newElement.clone().appendTo("body"),
					e = t.find("> .dropdown-menu").css("width"),
					i = t.css("width", "auto").find("> button").css("width");
				t.remove(), this.$newElement.css("width", Math.max(parseInt(e), parseInt(i)) + "px")
			} else "fit" == this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", "").addClass("fit-width")) : this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", this.options.width)) : (this.$menu.css("min-width", ""), this.$newElement.css("width", ""));
			this.$newElement.hasClass("fit-width") && "fit" !== this.options.width && this.$newElement.removeClass("fit-width")
		},
		selectPosition: function() {
			var e, i, n = this,
				s = "<div />",
				o = t(s),
				a = function(t) {
					o.addClass(t.attr("class").replace(/form-control/gi, "")).toggleClass("dropup", t.hasClass("dropup")), e = t.offset(), i = t.hasClass("dropup") ? 0 : t[0].offsetHeight, o.css({
						top: e.top + i,
						left: e.left,
						width: t[0].offsetWidth,
						position: "absolute"
					})
				};
			this.$newElement.on("click", function() {
				n.isDisabled() || (a(t(this)), o.appendTo(n.options.container), o.toggleClass("open", !t(this).hasClass("open")), o.append(n.$menu))
			}), t(window).resize(function() {
				a(n.$newElement)
			}), t(window).on("scroll", function() {
				a(n.$newElement)
			}), t("html").on("click", function(e) {
				t(e.target).closest(n.$newElement).length < 1 && o.removeClass("open")
			})
		},
		setSelected: function(e, i) {
			null == this.$lis && (this.$lis = this.$menu.find("li")), t(this.$lis[e]).toggleClass("selected", i)
		},
		setDisabled: function(e, i) {
			null == this.$lis && (this.$lis = this.$menu.find("li")), i ? t(this.$lis[e]).addClass("disabled").find("a").attr("href", "#").attr("tabindex", -1) : t(this.$lis[e]).removeClass("disabled").find("a").removeAttr("href").attr("tabindex", 0)
		},
		isDisabled: function() {
			return this.$element.is(":disabled")
		},
		checkDisabled: function() {
			var t = this;
			this.isDisabled() ? this.$button.addClass("disabled").attr("tabindex", -1) : (this.$button.hasClass("disabled") && this.$button.removeClass("disabled"), -1 == this.$button.attr("tabindex") && (this.$element.data("tabindex") || this.$button.removeAttr("tabindex"))), this.$button.click(function() {
				return !t.isDisabled()
			})
		},
		tabIndex: function() {
			this.$element.is("[tabindex]") && (this.$element.data("tabindex", this.$element.attr("tabindex")), this.$button.attr("tabindex", this.$element.data("tabindex")))
		},
		clickListener: function() {
			var e = this;
			this.$newElement.on("touchstart.dropdown", ".dropdown-menu", function(t) {
				t.stopPropagation()
			}), this.$newElement.on("click", function() {
				e.setSize(), e.options.liveSearch || e.multiple || setTimeout(function() {
					e.$menu.find(".selected a").focus()
				}, 10)
			}), this.$menu.on("click", "li a", function(i) {
				var n = t(this).parent().index(),
					s = e.$element.val(),
					o = e.$element.prop("selectedIndex");
				if (e.multiple && i.stopPropagation(), i.preventDefault(), !e.isDisabled() && !t(this).parent().hasClass("disabled")) {
					var a = e.$element.find("option"),
						r = a.eq(n),
						l = r.prop("selected"),
						h = r.parent("optgroup"),
						d = e.options.maxOptions,
						c = h.data("maxOptions") || !1;
					if (e.multiple) {
						if (r.prop("selected", !l), e.setSelected(n, !l), t(this).blur(), d !== !1 || c !== !1) {
							var u = d < a.filter(":selected").length,
								p = c < h.find("option:selected").length,
								f = e.options.maxOptionsText,
								m = f[0].replace("{n}", d),
								g = f[1].replace("{n}", c),
								v = t('<div class="notify"></div>');
							if (d && u || c && p)
								if (d && 1 == d) a.prop("selected", !1), r.prop("selected", !0), e.$menu.find(".selected").removeClass("selected"), e.setSelected(n, !0);
								else
							if (c && 1 == c) {
								h.find("option:selected").prop("selected", !1), r.prop("selected", !0);
								var y = t(this).data("optgroup");
								e.$menu.find(".selected").has('a[data-optgroup="' + y + '"]').removeClass("selected"), e.setSelected(n, !0)
							} else f[2] && (m = m.replace("{var}", f[2][d > 1 ? 0 : 1]), g = g.replace("{var}", f[2][c > 1 ? 0 : 1])), r.prop("selected", !1), e.$menu.append(v), d && u && (v.append(t("<div>" + m + "</div>")), e.$element.trigger("maxReached.bs.select")), c && p && (v.append(t("<div>" + g + "</div>")), e.$element.trigger("maxReachedGrp.bs.select")), setTimeout(function() {
								e.setSelected(n, !1)
							}, 10), v.delay(750).fadeOut(300, function() {
								t(this).remove()
							})
						}
					} else a.prop("selected", !1), r.prop("selected", !0), e.$menu.find(".selected").removeClass("selected"), e.setSelected(n, !0);
					e.multiple ? e.options.liveSearch && e.$searchbox.focus() : e.$button.focus(), (s != e.$element.val() && e.multiple || o != e.$element.prop("selectedIndex") && !e.multiple) && e.$element.change()
				}
			}), this.$menu.on("click", "li.disabled a, li dt, li .div-contain, .popover-title, .popover-title :not(.close)", function(t) {
				t.target == this && (t.preventDefault(), t.stopPropagation(), e.options.liveSearch ? e.$searchbox.focus() : e.$button.focus())
			}), this.$menu.on("click", ".popover-title .close", function() {
				e.$button.focus()
			}), this.$searchbox.on("click", function(t) {
				t.stopPropagation()
			}), this.$menu.on("click", ".actions-btn", function(i) {
				e.options.liveSearch ? e.$searchbox.focus() : e.$button.focus(), i.preventDefault(), i.stopPropagation(), t(this).is(".bs-select-all") ? e.selectAll() : e.deselectAll(), e.$element.change()
			}), this.$element.change(function() {
				e.render(!1)
			})
		},
		liveSearchListener: function() {
			var e = this,
				i = t('<li class="no-results"></li>');
			this.$newElement.on("click.dropdown.data-api", function() {
				e.$menu.find(".active").removeClass("active"), e.$searchbox.val() && (e.$searchbox.val(""), e.$lis.not(".is-hidden").removeClass("hide"), i.parent().length && i.remove()), e.multiple || e.$menu.find(".selected").addClass("active"), setTimeout(function() {
					e.$searchbox.focus()
				}, 10)
			}), this.$searchbox.on("input propertychange", function() {
				e.$searchbox.val() ? (e.$lis.not(".is-hidden").removeClass("hide").find("a").not(":icontains(" + e.$searchbox.val() + ")").parent().addClass("hide"), e.$menu.find("li").filter(":visible:not(.no-results)").length ? i.parent().length && i.remove() : (i.parent().length && i.remove(), i.html(e.options.noneResultsText + ' "' + e.$searchbox.val() + '"').show(), e.$menu.find("li").last().after(i))) : (e.$lis.not(".is-hidden").removeClass("hide"), i.parent().length && i.remove()), e.$menu.find("li.active").removeClass("active"), e.$menu.find("li").filter(":visible:not(.divider)").eq(0).addClass("active").find("a").focus(), t(this).focus()
			}), this.$menu.on("mouseenter", "a", function(i) {
				e.$menu.find(".active").removeClass("active"), t(i.currentTarget).parent().not(".disabled").addClass("active")
			}), this.$menu.on("mouseleave", "a", function() {
				e.$menu.find(".active").removeClass("active")
			})
		},
		val: function(t) {
			return void 0 !== t ? (this.$element.val(t), this.$element.change(), this.render(), this.$element) : this.$element.val()
		},
		selectAll: function() {
			null == this.$lis && (this.$lis = this.$menu.find("li")), this.$element.find("option:enabled").prop("selected", !0), t(this.$lis).not(".disabled").addClass("selected"), this.render(!1)
		},
		deselectAll: function() {
			null == this.$lis && (this.$lis = this.$menu.find("li")), this.$element.find("option:enabled").prop("selected", !1), t(this.$lis).not(".disabled").removeClass("selected"), this.render(!1)
		},
		keydown: function(e) {
			var i, n, s, o, a, r, l, h, d, c, u, p, f = {
					32: " ",
					48: "0",
					49: "1",
					50: "2",
					51: "3",
					52: "4",
					53: "5",
					54: "6",
					55: "7",
					56: "8",
					57: "9",
					59: ";",
					65: "a",
					66: "b",
					67: "c",
					68: "d",
					69: "e",
					70: "f",
					71: "g",
					72: "h",
					73: "i",
					74: "j",
					75: "k",
					76: "l",
					77: "m",
					78: "n",
					79: "o",
					80: "p",
					81: "q",
					82: "r",
					83: "s",
					84: "t",
					85: "u",
					86: "v",
					87: "w",
					88: "x",
					89: "y",
					90: "z",
					96: "0",
					97: "1",
					98: "2",
					99: "3",
					100: "4",
					101: "5",
					102: "6",
					103: "7",
					104: "8",
					105: "9"
				};
			if (i = t(this), s = i.parent(), i.is("input") && (s = i.parent().parent()), c = s.data("this"), c.options.liveSearch && (s = i.parent().parent()), c.options.container && (s = c.$menu), n = t("[role=menu] li:not(.divider) a", s), p = c.$menu.parent().hasClass("open"), !p && /([0-9]|[A-z])/.test(String.fromCharCode(e.keyCode)) && (c.options.container ? c.$newElement.trigger("click") : (c.setSize(), c.$menu.parent().addClass("open"), p = !0), c.$searchbox.focus()), c.options.liveSearch && (/(^9$|27)/.test(e.keyCode.toString(10)) && p && 0 === c.$menu.find(".active").length && (e.preventDefault(), c.$menu.parent().removeClass("open"), c.$button.focus()), n = t("[role=menu] li:not(.divider):visible", s), i.val() || /(38|40)/.test(e.keyCode.toString(10)) || 0 === n.filter(".active").length && (n = c.$newElement.find("li").filter(":icontains(" + f[e.keyCode] + ")"))), n.length) {
				if (/(38|40)/.test(e.keyCode.toString(10))) o = n.index(n.filter(":focus")), r = n.parent(":not(.disabled):visible").first().index(), l = n.parent(":not(.disabled):visible").last().index(), a = n.eq(o).parent().nextAll(":not(.disabled):visible").eq(0).index(), h = n.eq(o).parent().prevAll(":not(.disabled):visible").eq(0).index(), d = n.eq(a).parent().prevAll(":not(.disabled):visible").eq(0).index(), c.options.liveSearch && (n.each(function(e) {
					t(this).is(":not(.disabled)") && t(this).data("index", e)
				}), o = n.index(n.filter(".active")), r = n.filter(":not(.disabled):visible").first().data("index"), l = n.filter(":not(.disabled):visible").last().data("index"), a = n.eq(o).nextAll(":not(.disabled):visible").eq(0).data("index"), h = n.eq(o).prevAll(":not(.disabled):visible").eq(0).data("index"), d = n.eq(a).prevAll(":not(.disabled):visible").eq(0).data("index")), u = i.data("prevIndex"), 38 == e.keyCode && (c.options.liveSearch && (o -= 1), o != d && o > h && (o = h), r > o && (o = r), o == u && (o = l)), 40 == e.keyCode && (c.options.liveSearch && (o += 1), -1 == o && (o = 0), o != d && a > o && (o = a), o > l && (o = l), o == u && (o = r)), i.data("prevIndex", o), c.options.liveSearch ? (e.preventDefault(), i.is(".dropdown-toggle") || (n.removeClass("active"), n.eq(o).addClass("active").find("a").focus(), i.focus())) : n.eq(o).focus();
				else if (!i.is("input")) {
					var m, g, v = [];
					n.each(function() {
						t(this).parent().is(":not(.disabled)") && t.trim(t(this).text().toLowerCase()).substring(0, 1) == f[e.keyCode] && v.push(t(this).parent().index())
					}), m = t(document).data("keycount"), m++, t(document).data("keycount", m), g = t.trim(t(":focus").text().toLowerCase()).substring(0, 1), g != f[e.keyCode] ? (m = 1, t(document).data("keycount", m)) : m >= v.length && (t(document).data("keycount", 0), m > v.length && (m = 1)), n.eq(v[m - 1]).focus()
				}
				/(13|32)/.test(e.keyCode.toString(10)) && p && (/(32)/.test(e.keyCode.toString(10)) || e.preventDefault(), c.options.liveSearch ? /(32)/.test(e.keyCode.toString(10)) || (c.$menu.find(".active a").click(), i.focus()) : t(":focus").click(), t(document).data("keycount", 0)), (/(^9$|27)/.test(e.keyCode.toString(10)) && p && (c.multiple || c.options.liveSearch) || /(27)/.test(e.keyCode.toString(10)) && !p) && (c.$menu.parent().removeClass("open"), c.$button.focus())
			}
		},
		mobile: function() {
			this.$element.addClass("mobile-device").appendTo(this.$newElement), this.options.container && this.$menu.hide()
		},
		refresh: function() {
			this.$lis = null, this.reloadLi(), this.render(), this.setWidth(), this.setStyle(), this.checkDisabled(), this.liHeight()
		},
		update: function() {
			this.reloadLi(), this.setWidth(), this.setStyle(), this.checkDisabled(), this.liHeight()
		},
		hide: function() {
			this.$newElement.hide()
		},
		show: function() {
			this.$newElement.show()
		},
		remove: function() {
			this.$newElement.remove(), this.$element.remove()
		}
	}, t.fn.selectpicker = function(i, n) {
		var s = arguments,
			i = s[0],
			n = s[1];
		[].shift.apply(s);
		var o, a = this.each(function() {
				var a = t(this);
				if (a.is("select")) {
					var r = a.data("selectpicker"),
						l = "object" == typeof i && i;
					if (r) {
						if (l)
							for (var h in l) l.hasOwnProperty(h) && (r.options[h] = l[h])
					} else {
						var d = t.extend(e.DEFAULTS, t.fn.selectpicker.defaults || {}, a.data(), l);
						a.data("selectpicker", r = new e(this, d, n))
					}
					"string" == typeof i && (o = r[i] instanceof Function ? r[i].apply(r, s) : r.options[i])
				}
			});
		return "undefined" != typeof o ? o : a
	}, t.fn.selectpicker.Constructor = e, t(document).data("keycount", 0).on("keydown", ".bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bootstrap-select-searchbox input", e.prototype.keydown).on("focusin.modal", ".bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bootstrap-select-searchbox input", function(t) {
		t.stopPropagation()
	})
}(jQuery),
function() {
	var t = function() {
		var t = "function" == typeof require && require,
			e = function(i, n, s) {
				n || (n = 0);
				var o = e.resolve(i, n),
					a = e.m[n][o];
				if (!a && t) {
					if (a = t(o)) return a
				} else if (a && a.c && (n = a.c, o = a.m, a = e.m[n][a.m], !a)) throw new Error('failed to require "' + o + '" from ' + n);
				if (!a) throw new Error('failed to require "' + i + '" from ' + s);
				return a.exports || (a.exports = {}, a.call(a.exports, a, a.exports, e.relative(o, n))), a.exports
			};
		return e.resolve = function(t, i) {
			var n = t,
				s = t + ".js",
				o = t + "/index.js";
			return e.m[i][s] && s ? s : e.m[i][o] && o ? o : n
		}, e.relative = function(t, i) {
			return function(n) {
				if ("." != n.charAt(0)) return e(n, i, t);
				var s = t.split("/"),
					o = n.split("/");
				s.pop();
				for (var a = 0; a < o.length; a++) {
					var r = o[a];
					".." == r ? s.pop() : "." != r && s.push(r)
				}
				return e(s.join("/"), i, t)
			}
		}, e
	}();
	t.m = [], t.m[0] = {
		microee: {
			c: 2,
			m: "index.js"
		},
		"lib/web/index.js": function(t, e, i) {
			var n = i("../common/minilog.js"),
				s = n.enable,
				o = n.disable,
				a = "undefined" != typeof navigator && /chrome/i.test(navigator.userAgent),
				r = i("./console.js");
			if (n.defaultBackend = a ? r.minilog : r, "undefined" != typeof window) {
				try {
					n.enable(JSON.parse(window.localStorage.minilogSettings))
				} catch (l) {}
				if (window.location && window.location.search) {
					var h = RegExp("[?&]minilog=([^&]*)").exec(window.location.search);
					h && n.enable(decodeURIComponent(h[1]))
				}
			}
			n.enable = function() {
				s.call(n, !0);
				try {
					window.localStorage.minilogSettings = JSON.stringify(!0)
				} catch (t) {}
				return this
			}, n.disable = function() {
				o.call(n);
				try {
					delete window.localStorage.minilogSettings
				} catch (t) {}
				return this
			}, e = t.exports = n, e.backends = {
				array: i("./array.js"),
				browser: n.defaultBackend,
				localStorage: i("./localstorage.js"),
				jQuery: i("./jquery_simple.js")
			}
		},
		"lib/web/array.js": function(t, e, i) {
			var n = i("../common/transform.js"),
				s = [],
				o = new n;
			o.write = function(t, e, i) {
				s.push([t, e, i])
			}, o.get = function() {
				return s
			}, o.empty = function() {
				s = []
			}, t.exports = o
		},
		"lib/web/console.js": function(t, e, i) {
			var n = i("../common/transform.js"),
				s = /\n+$/,
				o = new n;
			o.write = function(t, e, i) {
				var n = i.length - 1;
				if ("undefined" != typeof console && console.log) {
					if (console.log.apply) return console.log.apply(console, [t, e].concat(i));
					if (JSON && JSON.stringify) {
						i[n] && "string" == typeof i[n] && (i[n] = i[n].replace(s, ""));
						try {
							for (n = 0; n < i.length; n++) i[n] = JSON.stringify(i[n])
						} catch (o) {}
						console.log(i.join(" "))
					}
				}
			}, o.formatters = ["color", "minilog"], o.color = i("./formatters/color.js"), o.minilog = i("./formatters/minilog.js"), t.exports = o
		},
		"lib/common/filter.js": function(t, e, i) {
			function n() {
				this.enabled = !0, this.defaultResult = !0, this.clear()
			}

			function s(t, e) {
				return t.n.test ? t.n.test(e) : t.n == e
			}
			var o = i("./transform.js"),
				a = {
					debug: 1,
					info: 2,
					warn: 3,
					error: 4
				};
			o.mixin(n), n.prototype.allow = function(t, e) {
				return this._white.push({
					n: t,
					l: a[e]
				}), this
			}, n.prototype.deny = function(t, e) {
				return this._black.push({
					n: t,
					l: a[e]
				}), this
			}, n.prototype.clear = function() {
				return this._white = [], this._black = [], this
			}, n.prototype.test = function(t, e) {
				var i, n = Math.max(this._white.length, this._black.length);
				for (i = 0; n > i; i++) {
					if (this._white[i] && s(this._white[i], t) && a[e] >= this._white[i].l) return !0;
					if (this._black[i] && s(this._black[i], t) && a[e] < this._black[i].l) return !1
				}
				return this.defaultResult
			}, n.prototype.write = function(t, e, i) {
				return !this.enabled || this.test(t, e) ? this.emit("item", t, e, i) : void 0
			}, t.exports = n
		},
		"lib/common/minilog.js": function(t, e, i) {
			var n = i("./transform.js"),
				s = i("./filter.js"),
				o = new n,
				a = Array.prototype.slice;
			e = t.exports = function(t) {
				var i = function() {
					return o.write(t, void 0, a.call(arguments)), i
				};
				return i.debug = function() {
					return o.write(t, "debug", a.call(arguments)), i
				}, i.info = function() {
					return o.write(t, "info", a.call(arguments)), i
				}, i.warn = function() {
					return o.write(t, "warn", a.call(arguments)), i
				}, i.error = function() {
					return o.write(t, "error", a.call(arguments)), i
				}, i.log = i.debug, i.suggest = e.suggest, i.format = o.format, i
			}, e.defaultBackend = e.defaultFormatter = null, e.pipe = function(t) {
				return o.pipe(t)
			}, e.end = e.unpipe = e.disable = function(t) {
				return o.unpipe(t)
			}, e.Transform = n, e.Filter = s, e.suggest = new s, e.enable = function() {
				return e.defaultFormatter ? o.pipe(e.suggest).pipe(e.defaultFormatter).pipe(e.defaultBackend) : o.pipe(e.suggest).pipe(e.defaultBackend)
			}
		},
		"lib/common/transform.js": function(t, e, i) {
			function n() {}
			var s = i("microee");
			s.mixin(n), n.prototype.write = function(t, e, i) {
				this.emit("item", t, e, i)
			}, n.prototype.end = function() {
				this.emit("end"), this.removeAllListeners()
			}, n.prototype.pipe = function(t) {
				function e() {
					t.write.apply(t, Array.prototype.slice.call(arguments))
				}

				function i() {
					!t._isStdio && t.end()
				}
				var n = this;
				return n.emit("unpipe", t), t.emit("pipe", n), n.on("item", e), n.on("end", i), n.when("unpipe", function(s) {
					var o = s === t || "undefined" == typeof s;
					return o && (n.removeListener("item", e), n.removeListener("end", i), t.emit("unpipe")), o
				}), t
			}, n.prototype.unpipe = function(t) {
				return this.emit("unpipe", t), this
			}, n.prototype.format = function(t) {
				throw new Error(["Warning: .format() is deprecated in Minilog v2! Use .pipe() instead. For example:", "var Minilog = require('minilog');", "Minilog", "  .pipe(Minilog.backends.console.formatClean)", "  .pipe(Minilog.backends.console);"].join("\n"))
			}, n.mixin = function(t) {
				var e, i = n.prototype;
				for (e in i) i.hasOwnProperty(e) && (t.prototype[e] = i[e])
			}, t.exports = n
		},
		"lib/web/localstorage.js": function(t, e, i) {
			var n = i("../common/transform.js"),
				s = !1,
				o = new n;
			o.write = function(t, e, i) {
				if ("undefined" != typeof window && "undefined" != typeof JSON && JSON.stringify && JSON.parse) try {
					s || (s = window.localStorage.minilog ? JSON.parse(window.localStorage.minilog) : []), s.push([(new Date).toString(), t, e, i]), window.localStorage.minilog = JSON.stringify(s)
				} catch (n) {}
			}, t.exports = o
		},
		"lib/web/jquery_simple.js": function(t, e, i) {
			function n(t) {
				this.url = t.url || "", this.cache = [], this.timer = null, this.interval = t.interval || 3e4, this.enabled = !0, this.jQuery = window.jQuery, this.extras = {}
			}
			var s = i("../common/transform.js"),
				o = (new Date).valueOf().toString(36);
			s.mixin(n), n.prototype.write = function(t, e, i) {
				this.timer || this.init(), this.cache.push([t, e].concat(i))
			}, n.prototype.init = function() {
				if (this.enabled && this.jQuery) {
					var t = this;
					this.timer = setTimeout(function() {
						var e, i, n = [],
							s = t.url;
						if (0 == t.cache.length) return t.init();
						for (e = 0; e < t.cache.length; e++) try {
							n.push(JSON.stringify(t.cache[e]))
						} catch (a) {}
						t.jQuery.isEmptyObject(t.extras) ? (i = n.join("\n"), s = t.url + "?client_id=" + o) : i = JSON.stringify(t.jQuery.extend({
							logs: n
						}, t.extras)), t.jQuery.ajax(s, {
							type: "POST",
							cache: !1,
							processData: !1,
							data: i,
							contentType: "application/json",
							timeout: 1e4
						}).success(function(e, i, n) {
							e.interval && (t.interval = Math.max(1e3, e.interval))
						}).error(function() {
							t.interval = 3e4
						}).always(function() {
							t.init()
						}), t.cache = []
					}, this.interval)
				}
			}, n.prototype.end = function() {}, n.jQueryWait = function(t) {
				return "undefined" != typeof window && (window.jQuery || window.$) ? t(window.jQuery || window.$) : void("undefined" != typeof window && setTimeout(function() {
					n.jQueryWait(t)
				}, 200))
			}, t.exports = n
		},
		"lib/web/formatters/util.js": function(t, e, i) {
			function n(t, e) {
				return e ? "color: #fff; background: " + s[t] + ";" : "color: " + s[t] + ";"
			}
			var s = {
				black: "#000",
				red: "#c23621",
				green: "#25bc26",
				yellow: "#bbbb00",
				blue: "#492ee1",
				magenta: "#d338d3",
				cyan: "#33bbc8",
				gray: "#808080",
				purple: "#708"
			};
			t.exports = n
		},
		"lib/web/formatters/color.js": function(t, e, i) {
			var n = i("../../common/transform.js"),
				s = i("./util.js"),
				o = {
					debug: ["cyan"],
					info: ["purple"],
					warn: ["yellow", !0],
					error: ["red", !0]
				}, a = new n;
			a.write = function(t, e, i) {
				var n = console.log;
				console[e] && console[e].apply && (n = console[e], n.apply(console, ["%c" + t + " %c" + e, s("gray"), s.apply(s, o[e])].concat(i)))
			}, a.pipe = function() {}, t.exports = a
		},
		"lib/web/formatters/minilog.js": function(t, e, i) {
			var n = i("../../common/transform.js"),
				s = i("./util.js");
			colors = {
				debug: ["gray"],
				info: ["purple"],
				warn: ["yellow", !0],
				error: ["red", !0]
			}, logger = new n, logger.write = function(t, e, i) {
				var n = console.log;
				"debug" != e && console[e] && (n = console[e]);
				var o = 0;
				if ("info" != e) {
					for (; o < i.length && "string" == typeof i[o]; o++);
					n.apply(console, ["%c" + t + " " + i.slice(0, o).join(" "), s.apply(s, colors[e])].concat(i.slice(o)))
				} else n.apply(console, ["%c" + t, s.apply(s, colors[e])].concat(i))
			}, logger.pipe = function() {}, t.exports = logger
		}
	}, t.m[1] = {}, t.m[2] = {
		"index.js": function(t, e, i) {
			function n() {
				this._events = {}
			}
			n.prototype = {
				on: function(t, e) {
					this._events || (this._events = {});
					var i = this._events;
					return (i[t] || (i[t] = [])).push(e), this
				},
				removeListener: function(t, e) {
					var i, n = this._events[t] || [];
					for (i = n.length - 1; i >= 0 && n[i]; i--)(n[i] === e || n[i].cb === e) && n.splice(i, 1)
				},
				removeAllListeners: function(t) {
					t ? this._events[t] && (this._events[t] = []) : this._events = {}
				},
				emit: function(t) {
					this._events || (this._events = {});
					var e, i = Array.prototype.slice.call(arguments, 1),
						n = this._events[t] || [];
					for (e = n.length - 1; e >= 0 && n[e]; e--) n[e].apply(this, i);
					return this
				},
				when: function(t, e) {
					return this.once(t, e, !0)
				},
				once: function(t, e, i) {
					function n() {
						i || this.removeListener(t, n), e.apply(this, arguments) && i && this.removeListener(t, n)
					}
					return e ? (n.cb = e, this.on(t, n), this) : this
				}
			}, n.mixin = function(t) {
				var e, i = n.prototype;
				for (e in i) i.hasOwnProperty(e) && (t.prototype[e] = i[e])
			}, t.exports = n
		}
	}, Minilog = t("lib/web/index.js")
}();
var log = Minilog("cellar:"),
	BootstrapDialog = null;
! function(t) {
	"use strict";
	BootstrapDialog = function(t) {
		this.defaultOptions = {
			id: BootstrapDialog.newGuid(),
			type: BootstrapDialog.TYPE_PRIMARY,
			size: BootstrapDialog.SIZE_NORMAL,
			title: null,
			message: null,
			buttons: [],
			closable: !0,
			spinicon: BootstrapDialog.ICON_SPINNER,
			data: {},
			onshow: null,
			onhide: null,
			autodestroy: !0
		}, this.indexedButtons = {}, this.realized = !1, this.opened = !1, this.initOptions(t), this.holdThisInstance()
	}, BootstrapDialog.NAMESPACE = "bootstrap-dialog", BootstrapDialog.TYPE_DEFAULT = "type-default", BootstrapDialog.TYPE_INFO = "type-info", BootstrapDialog.TYPE_PRIMARY = "type-primary", BootstrapDialog.TYPE_SUCCESS = "type-success", BootstrapDialog.TYPE_WARNING = "type-warning", BootstrapDialog.TYPE_DANGER = "type-danger", BootstrapDialog.DEFAULT_TEXTS = {}, BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_DEFAULT] = "Information", BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_INFO] = "Information", BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_PRIMARY] = "Information", BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_SUCCESS] = "Success", BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_WARNING] = "Warning", BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_DANGER] = "Danger", BootstrapDialog.SIZE_NORMAL = "size-normal", BootstrapDialog.SIZE_LARGE = "size-large", BootstrapDialog.BUTTON_SIZES = {}, BootstrapDialog.BUTTON_SIZES[BootstrapDialog.SIZE_NORMAL] = "", BootstrapDialog.BUTTON_SIZES[BootstrapDialog.SIZE_LARGE] = "btn-lg", BootstrapDialog.ICON_SPINNER = "glyphicon glyphicon-asterisk", BootstrapDialog.dialogs = {}, BootstrapDialog.openAll = function() {
		t.each(BootstrapDialog.dialogs, function(t, e) {
			e.open()
		})
	}, BootstrapDialog.closeAll = function() {
		t.each(BootstrapDialog.dialogs, function(t, e) {
			e.close()
		})
	}, BootstrapDialog.prototype = {
		constructor: BootstrapDialog,
		initOptions: function(e) {
			return this.options = t.extend(!0, this.defaultOptions, e), this
		},
		holdThisInstance: function() {
			return BootstrapDialog.dialogs[this.getId()] = this, this
		},
		initModalStuff: function() {
			return this.setModal(this.createModal()).setModalDialog(this.createModalDialog()).setModalContent(this.createModalContent()).setModalHeader(this.createModalHeader()).setModalBody(this.createModalBody()).setModalFooter(this.createModalFooter()), this.getModal().append(this.getModalDialog()), this.getModalDialog().append(this.getModalContent()), this.getModalContent().append(this.getModalHeader()).append(this.getModalBody()).append(this.getModalFooter()), this
		},
		createModal: function() {
			return t('<div class="modal fade" tabindex="-1" id="' + this.getId() + '"></div>')
		},
		getModal: function() {
			return this.$modal
		},
		setModal: function(t) {
			return this.$modal = t, this
		},
		createModalDialog: function() {
			return t('<div class="modal-dialog"></div>')
		},
		getModalDialog: function() {
			return this.$modalDialog
		},
		setModalDialog: function(t) {
			return this.$modalDialog = t, this
		},
		createModalContent: function() {
			return t('<div class="modal-content"></div>')
		},
		getModalContent: function() {
			return this.$modalContent
		},
		setModalContent: function(t) {
			return this.$modalContent = t, this
		},
		createModalHeader: function() {
			return t('<div class="modal-header"></div>')
		},
		getModalHeader: function() {
			return this.$modalHeader
		},
		setModalHeader: function(t) {
			return this.$modalHeader = t, this
		},
		createModalBody: function() {
			return t('<div class="modal-body"></div>')
		},
		getModalBody: function() {
			return this.$modalBody
		},
		setModalBody: function(t) {
			return this.$modalBody = t, this
		},
		createModalFooter: function() {
			return t('<div class="modal-footer"></div>')
		},
		getModalFooter: function() {
			return this.$modaFooter
		},
		setModalFooter: function(t) {
			return this.$modaFooter = t, this
		},
		createDynamicContent: function(t) {
			var e = null;
			return e = "function" == typeof t ? t.call(t, this) : t, "string" == typeof e && (e = this.formatStringContent(e)), e
		},
		formatStringContent: function(t) {
			return t.replace(/\r\n/g, "<br />").replace(/[\r\n]/g, "<br />")
		},
		setData: function(t, e) {
			return this.options.data[t] = e, this
		},
		getData: function(t) {
			return this.options.data[t]
		},
		setId: function(t) {
			return this.options.id = t, this
		},
		getId: function() {
			return this.options.id
		},
		getType: function() {
			return this.options.type
		},
		setType: function(t) {
			return this.options.type = t, this
		},
		getSize: function() {
			return this.options.size
		},
		setSize: function(t) {
			return this.options.size = t, this
		},
		getTitle: function() {
			return this.options.title
		},
		setTitle: function(t) {
			return this.options.title = t, this
		},
		getMessage: function() {
			return this.options.message
		},
		setMessage: function(t) {
			return this.options.message = t, this
		},
		isClosable: function() {
			return this.options.closable
		},
		setClosable: function(t) {
			return this.options.closable = t, this.updateClosable(), this
		},
		getSpinicon: function() {
			return this.options.spinicon
		},
		setSpinicon: function(t) {
			return this.options.spinicon = t, this
		},
		addButton: function(t) {
			return this.options.buttons.push(t), this
		},
		addButtons: function(e) {
			var i = this;
			return t.each(e, function(t, e) {
				i.addButton(e)
			}), this
		},
		getButtons: function() {
			return this.options.buttons
		},
		setButtons: function(t) {
			return this.options.buttons = t, this
		},
		getButton: function(t) {
			return "undefined" != typeof this.indexedButtons[t] ? this.indexedButtons[t] : null
		},
		getButtonSize: function() {
			return "undefined" != typeof BootstrapDialog.BUTTON_SIZES[this.getSize()] ? BootstrapDialog.BUTTON_SIZES[this.getSize()] : ""
		},
		isAutodestroy: function() {
			return this.options.autodestroy
		},
		setAutodestroy: function(t) {
			this.options.autodestroy = t
		},
		getDefaultText: function() {
			return BootstrapDialog.DEFAULT_TEXTS[this.getType()]
		},
		getNamespace: function(t) {
			return BootstrapDialog.NAMESPACE + "-" + t
		},
		createHeaderContent: function() {
			var e = t("<div></div>");
			return e.addClass(this.getNamespace("header")), e.append(this.createTitleContent()), e.append(this.createCloseButton()), e
		},
		createTitleContent: function() {
			var e = t("<div></div>");
			return e.addClass(this.getNamespace("title")), e.append(null !== this.getTitle() ? this.createDynamicContent(this.getTitle()) : this.getDefaultText()), e
		},
		createCloseButton: function() {
			var e = t("<div></div>");
			e.addClass(this.getNamespace("close-button"));
			var i = t('<button class="close">\xd7</button>');
			return e.append(i), e.on("click", {
				dialog: this
			}, function(t) {
				t.data.dialog.close()
			}), e
		},
		createBodyContent: function() {
			var e = t("<div></div>");
			return e.addClass(this.getNamespace("body")), e.append(this.createMessageContent()),
			e
		},
		createMessageContent: function() {
			var e = t("<div></div>");
			return e.addClass(this.getNamespace("message")), e.append(this.createDynamicContent(this.getMessage())), e
		},
		createFooterContent: function() {
			var e = t("<div></div>");
			return e.addClass(this.getNamespace("footer")), e.append(this.createFooterButtons()), e
		},
		createFooterButtons: function() {
			var e = this,
				i = t("<div></div>");
			return i.addClass(this.getNamespace("footer-buttons")), this.indexedButtons = {}, t.each(this.options.buttons, function(t, n) {
				var s = e.createButton(n);
				"undefined" != typeof n.id && (e.indexedButtons[n.id] = s), i.append(s)
			}), i
		},
		createButton: function(e) {
			var i = t('<button class="btn"></button>');
			return i.addClass(this.getButtonSize()), void 0 !== typeof e.icon && "" !== t.trim(e.icon) && i.append(this.createButtonIcon(e.icon)), void 0 !== typeof e.label && i.append(e.label), void 0 !== typeof e.cssClass && "" !== t.trim(e.cssClass) ? i.addClass(e.cssClass) : i.addClass("btn-default"), i.on("click", {
				dialog: this,
				button: e
			}, function(e) {
				var i = e.data.dialog,
					n = e.data.button;
				if ("function" == typeof n.action && n.action.call(this, i), n.autospin) {
					var s = t(this);
					s.find("." + i.getNamespace("button-icon")).remove(), s.prepend(i.createButtonIcon(i.getSpinicon()).addClass("icon-spin"))
				}
			}), i
		},
		createButtonIcon: function(e) {
			var i = t("<span></span>");
			return i.addClass(this.getNamespace("button-icon")).addClass(e), i
		},
		enableButtons: function(t) {
			var e = this.getModalFooter().find(".btn");
			return e.prop("disabled", !t).toggleClass("disabled", !t), this
		},
		updateClosable: function() {
			if (this.isRealized()) {
				var t = this.getModal();
				t.off("click").on("click", {
					dialog: this
				}, function(t) {
					t.target === this && t.data.dialog.isClosable() && t.data.dialog.close()
				}), this.getModalHeader().find("." + this.getNamespace("close-button")).toggle(this.isClosable()), t.off("keyup").on("keyup", {
					dialog: this
				}, function(t) {
					27 === t.which && t.data.dialog.isClosable() && t.data.dialog.close()
				})
			}
			return this
		},
		onShow: function(t) {
			return this.options.onshow = t, this
		},
		onHide: function(t) {
			return this.options.onhide = t, this
		},
		isRealized: function() {
			return this.realized
		},
		setRealized: function(t) {
			return this.realized = t, this
		},
		isOpened: function() {
			return this.opened
		},
		setOpened: function(t) {
			return this.opened = t, this
		},
		handleModalEvents: function() {
			return this.getModal().on("show.bs.modal", {
				dialog: this
			}, function(t) {
				var e = t.data.dialog;
				"function" == typeof e.options.onshow && e.options.onshow(e), e.showPageScrollBar(!0)
			}), this.getModal().on("hide.bs.modal", {
				dialog: this
			}, function(t) {
				var e = t.data.dialog;
				"function" == typeof e.options.onhide && e.options.onhide(e)
			}), this.getModal().on("hidden.bs.modal", {
				dialog: this
			}, function(e) {
				var i = e.data.dialog;
				i.isAutodestroy() && t(this).remove(), i.showPageScrollBar(!1)
			}), this
		},
		showPageScrollBar: function(e) {
			t(document.body).toggleClass("modal-open", e)
		},
		realize: function() {
			return this.initModalStuff(), this.getModal().addClass(BootstrapDialog.NAMESPACE).addClass(this.getType()).addClass(this.getSize()), this.getModalHeader().append(this.createHeaderContent()), this.getModalBody().append(this.createBodyContent()), this.getModalFooter().append(this.createFooterContent()), this.getModal().modal({
				backdrop: "static",
				keyboard: !1,
				show: !1
			}), this.handleModalEvents(), this.setRealized(!0), this
		},
		open: function() {
			return !this.isRealized() && this.realize(), this.updateClosable(), this.getModal().modal("show"), this.setOpened(!0), this
		},
		close: function() {
			return this.getModal().modal("hide"), this.isAutodestroy() && delete BootstrapDialog.dialogs[this.getId()], this.setOpened(!1), this
		}
	}, BootstrapDialog.newGuid = function() {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
			var e = 16 * Math.random() | 0,
				i = "x" === t ? e : 3 & e | 8;
			return i.toString(16)
		})
	}, BootstrapDialog.show = function(t) {
		new BootstrapDialog(t).open()
	}, BootstrapDialog.alert = function(t, e) {
		new BootstrapDialog({
			message: t,
			data: {
				callback: e
			},
			closable: !1,
			buttons: [{
				label: "OK",
				action: function(t) {
					"function" == typeof t.getData("callback") && t.getData("callback")(!0), t.close()
				}
			}]
		}).open()
	}, BootstrapDialog.confirm = function(t, e) {
		new BootstrapDialog({
			title: "Confirmation",
			message: t,
			closable: !1,
			data: {
				callback: e
			},
			buttons: [{
				label: "Cancel",
				action: function(t) {
					"function" == typeof t.getData("callback") && t.getData("callback")(!1), t.close()
				}
			}, {
				label: "OK",
				cssClass: "btn-primary",
				action: function(t) {
					"function" == typeof t.getData("callback") && t.getData("callback")(!0), t.close()
				}
			}]
		}).open()
	}
}(window.jQuery), window.alert = BootstrapDialog.alert,
function(t) {
	t(["jquery"], function(t) {
		return function() {
			function e(t, e, i) {
				return f({
					type: b.error,
					iconClass: m().iconClasses.error,
					message: t,
					optionsOverride: i,
					title: e
				})
			}

			function i(e, i) {
				return e || (e = m()), v = t("#" + e.containerId), v.length ? v : (i && (v = c(e)), v)
			}

			function n(t, e, i) {
				return f({
					type: b.info,
					iconClass: m().iconClasses.info,
					message: t,
					optionsOverride: i,
					title: e
				})
			}

			function s(t) {
				y = t
			}

			function o(t, e, i) {
				return f({
					type: b.success,
					iconClass: m().iconClasses.success,
					message: t,
					optionsOverride: i,
					title: e
				})
			}

			function a(t, e, i) {
				return f({
					type: b.warning,
					iconClass: m().iconClasses.warning,
					message: t,
					optionsOverride: i,
					title: e
				})
			}

			function r(t) {
				var e = m();
				v || i(e), d(t, e) || h(e)
			}

			function l(e) {
				var n = m();
				return v || i(n), e && 0 === t(":focus", e).length ? void g(e) : void(v.children().length && v.remove())
			}

			function h(e) {
				for (var i = v.children(), n = i.length - 1; n >= 0; n--) d(t(i[n]), e)
			}

			function d(e, i) {
				return e && 0 === t(":focus", e).length ? (e[i.hideMethod]({
					duration: i.hideDuration,
					easing: i.hideEasing,
					complete: function() {
						g(e)
					}
				}), !0) : !1
			}

			function c(e) {
				return v = t("<div/>").attr("id", e.containerId).addClass(e.positionClass).attr("aria-live", "polite").attr("role", "alert"), v.appendTo(t(e.target)), v
			}

			function u() {
				return {
					tapToDismiss: !0,
					toastClass: "toast",
					containerId: "toast-container",
					debug: !1,
					showMethod: "fadeIn",
					showDuration: 300,
					showEasing: "swing",
					onShown: void 0,
					hideMethod: "fadeOut",
					hideDuration: 1e3,
					hideEasing: "swing",
					onHidden: void 0,
					extendedTimeOut: 1e3,
					iconClasses: {
						error: "toast-error",
						info: "toast-info",
						success: "toast-success",
						warning: "toast-warning"
					},
					iconClass: "toast-info",
					positionClass: "toast-top-right",
					timeOut: 5e3,
					titleClass: "toast-title",
					messageClass: "toast-message",
					target: "body",
					closeHtml: "<button>&times;</button>",
					newestOnTop: !0
				}
			}

			function p(t) {
				y && y(t)
			}

			function f(e) {
				function n(e) {
					return !t(":focus", h).length || e ? h[a.hideMethod]({
						duration: a.hideDuration,
						easing: a.hideEasing,
						complete: function() {
							g(h), a.onHidden && "hidden" !== f.state && a.onHidden(), f.state = "hidden", f.endTime = new Date, p(f)
						}
					}) : void 0
				}

				function s() {
					(a.timeOut > 0 || a.extendedTimeOut > 0) && (l = setTimeout(n, a.extendedTimeOut))
				}

				function o() {
					clearTimeout(l), h.stop(!0, !0)[a.showMethod]({
						duration: a.showDuration,
						easing: a.showEasing
					})
				}
				var a = m(),
					r = e.iconClass || a.iconClass;
				"undefined" != typeof e.optionsOverride && (a = t.extend(a, e.optionsOverride), r = e.optionsOverride.iconClass || r), w++, v = i(a, !0);
				var l = null,
					h = t("<div/>"),
					d = t("<div/>"),
					c = t("<div/>"),
					u = t(a.closeHtml),
					f = {
						toastId: w,
						state: "visible",
						startTime: new Date,
						options: a,
						map: e
					};
				return e.iconClass && h.addClass(a.toastClass).addClass(r), e.title && (d.append(e.title).addClass(a.titleClass), h.append(d)), e.message && (c.append(e.message).addClass(a.messageClass), h.append(c)), a.closeButton && (u.addClass("toast-close-button").attr("role", "button"), h.prepend(u)), h.hide(), a.newestOnTop ? v.prepend(h) : v.append(h), h[a.showMethod]({
					duration: a.showDuration,
					easing: a.showEasing,
					complete: a.onShown
				}), a.timeOut > 0 && (l = setTimeout(n, a.timeOut)), h.hover(o, s), !a.onclick && a.tapToDismiss && h.click(n), a.closeButton && u && u.click(function(t) {
					t.stopPropagation ? t.stopPropagation() : void 0 !== t.cancelBubble && t.cancelBubble !== !0 && (t.cancelBubble = !0), n(!0)
				}), a.onclick && h.click(function() {
					a.onclick(), n()
				}), p(f), a.debug && console && console.log(f), h
			}

			function m() {
				return t.extend({}, u(), D.options)
			}

			function g(t) {
				v || (v = i()), t.is(":visible") || (t.remove(), t = null, 0 === v.children().length && v.remove())
			}
			var v, y, w = 0,
				b = {
					error: "error",
					info: "info",
					success: "success",
					warning: "warning"
				}, D = {
					clear: r,
					remove: l,
					error: e,
					getContainer: i,
					info: n,
					options: {},
					subscribe: s,
					success: o,
					version: "2.0.3",
					warning: a
				};
			return D
		}()
	})
}("function" == typeof define && define.amd ? define : function(t, e) {
	"undefined" != typeof module && module.exports ? module.exports = e(require("jquery")) : window.toastr = e(window.jQuery)
}), toastr.options = {
	closeButton: !0,
	debug: !1,
	positionClass: "toast-bottom-right",
	onclick: null,
	showDuration: "300",
	hideDuration: "1000",
	timeOut: "5000",
	extendedTimeOut: "1000",
	showEasing: "swing",
	hideEasing: "linear",
	showMethod: "fadeIn",
	hideMethod: "fadeOut"
},
function(t) {
	"function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : jQuery)
}(function(t) {
	function e(t) {
		return r.raw ? t : encodeURIComponent(t)
	}

	function i(t) {
		return r.raw ? t : decodeURIComponent(t)
	}

	function n(t) {
		return e(r.json ? JSON.stringify(t) : String(t))
	}

	function s(t) {
		0 === t.indexOf('"') && (t = t.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
		try {
			return t = decodeURIComponent(t.replace(a, " ")), r.json ? JSON.parse(t) : t
		} catch (e) {}
	}

	function o(e, i) {
		var n = r.raw ? e : s(e);
		return t.isFunction(i) ? i(n) : n
	}
	var a = /\+/g,
		r = t.cookie = function(s, a, l) {
			if (void 0 !== a && !t.isFunction(a)) {
				if (l = t.extend({}, r.defaults, l), "number" == typeof l.expires) {
					var h = l.expires,
						d = l.expires = new Date;
					d.setTime(+d + 864e5 * h)
				}
				return document.cookie = [e(s), "=", n(a), l.expires ? "; expires=" + l.expires.toUTCString() : "", l.path ? "; path=" + l.path : "", l.domain ? "; domain=" + l.domain : "", l.secure ? "; secure" : ""].join("")
			}
			for (var c = s ? void 0 : {}, u = document.cookie ? document.cookie.split("; ") : [], p = 0, f = u.length; f > p; p++) {
				var m = u[p].split("="),
					g = i(m.shift()),
					v = m.join("=");
				if (s && s === g) {
					c = o(v, a);
					break
				}
				s || void 0 === (v = o(v)) || (c[g] = v)
			}
			return c
		};
	r.defaults = {}, t.removeCookie = function(e, i) {
		return void 0 === t.cookie(e) ? !1 : (t.cookie(e, "", t.extend({}, i, {
			expires: -1
		})), !t.cookie(e))
	}
}), Date.prototype.Format = function(t) {
	var e = {
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		S: this.getMilliseconds()
	};
	/(y+)/.test(t) && (t = t.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
	for (var i in e) new RegExp("(" + i + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[i] : ("00" + e[i]).substr(("" + e[i]).length)));
	return t
},
function() {
	! function(t) {
		return this.alertDialog = function(e, i, n) {
			var s, o;
			return null == n && (n = {}), s = "type-danger" === n.type ? "btn-danger" : "type-warning" === n.type ? "btn-warning" : "btn-primary", o = _.defaults(n, {
				closable: !1,
				title: e,
				message: i,
				onshow: function(t) {
					return t.$modalDialog.css("width", 320)
				},
				buttons: [{
					label: "\u786e\u5b9a",
					hotkey: 13,
					cssClass: s,
					action: function(t) {
						return function(t) {
							return t.close()
						}
					}(this)
				}]
			}), t.show(o)
		}, this.confirmDialog = function(e, i, n, s) {
			var o;
			return "function" == typeof n && (s = n, n = {}), o = "type-danger" === n.type ? "btn-danger" : "btn-primary", n = _.defaults(n, {
				closable: !1,
				title: e,
				message: i,
				onshow: function(t) {
					return t.$modalDialog.css("width", 320)
				},
				buttons: [{
					label: "\u53d6\u6d88",
					action: function(t) {
						return function(t) {
							return s && s(!1), t.close()
						}
					}(this)
				}, {
					label: "\u786e\u5b9a",
					hotkey: 13,
					cssClass: o,
					action: function(t) {
						return function(t) {
							return s && s(!0), t.close()
						}
					}(this)
				}]
			}), t.show(n)
		}, this.promptDialog = function(e, i, n) {
			var s;
			return "function" == typeof i && (n = i, i = {}), s = "type-danger" === i.type ? "btn-danger" : "btn-primary", i = _.defaults(i, {
				closable: !1,
				title: e,
				message: '<input class="form-control" autofocus="true" style="width: 100%"/>',
				onshow: function(t) {
					return t.$modalDialog.css("width", 320), t.$modalContent.find("input").focus()
				},
				buttons: [{
					label: "\u53d6\u6d88",
					action: function(t) {
						return function(t) {
							return n && n(!1), t.close()
						}
					}(this)
				}, {
					label: "\u786e\u5b9a",
					hotkey: 13,
					cssClass: s,
					action: function(t) {
						return function(t) {
							var e;
							return e = t.$modalContent.find("input").val(), n && n(!0, e), t.close()
						}
					}(this)
				}]
			}), t.show(i)
		}
	}(BootstrapDialog)
}.call(this),
function() {
	var t = function(t, i) {
		function n() {
			this.constructor = t
		}
		for (var s in i) e.call(i, s) && (t[s] = i[s]);
		return n.prototype = i.prototype, t.prototype = new n, t.__super__ = i.prototype, t
	}, e = {}.hasOwnProperty;
	this.Cellar = function(e) {
		var i, n;
		return n = function(e) {
			function i() {
				_.extend(this, Backbone.Events)
			}
			return t(i, e), i.prototype.onShow = function(t) {
				var e;
				return e = this.getDefaultOptions(_.result(t, "dialog")), e = _.defaults(e, {
					message: t.el
				}), BootstrapDialog.show(e)
			}, i.prototype.getDefaultOptions = function(t) {
				return null == t && (t = {}), _.defaults(t, {
					title: "\u5bf9\u8bdd\u6846",
					buttons: [{
						label: "\u786e\u5b9a",
						cssClass: "btn-primary",
						action: function(t) {
							return function(t) {
								return t.close()
							}
						}(this)
					}],
					onhide: function(t) {
						return function() {
							return t.currentView.close()
						}
					}(this)
				})
			}, i
		}(e.Region), i = new e.Application, log.debug("new Cellar app"), i.addRegions({
			contentRegion: "#content",
			dialog: n
		}), i.addInitializer(function() {
			return log.info("Cellar App init ...")
		}), i.on("initialize:after", function() {
			return Backbone.history ? Backbone.history.start() : void 0
		}), i
	}(Marionette)
}.call(this),
function() {}.call(this),
function(t) {
	"use strict";
	"function" == typeof define && define.amd ? define(["jquery"], t) : t(window.jQuery)
}(function(t) {
	"use strict";
	var e = 0;
	t.ajaxTransport("iframe", function(i) {
		if (i.async) {
			var n, s, o, a = i.initialIframeSrc || "javascript:false;";
			return {
				send: function(r, l) {
					n = t('<form style="display:none;"></form>'), n.attr("accept-charset", i.formAcceptCharset), o = /\?/.test(i.url) ? "&" : "?", "DELETE" === i.type ? (i.url = i.url + o + "_method=DELETE", i.type = "POST") : "PUT" === i.type ? (i.url = i.url + o + "_method=PUT", i.type = "POST") : "PATCH" === i.type && (i.url = i.url + o + "_method=PATCH", i.type = "POST"), e += 1, s = t('<iframe src="' + a + '" name="iframe-transport-' + e + '"></iframe>').bind("load", function() {
						var e, o = t.isArray(i.paramName) ? i.paramName : [i.paramName];
						s.unbind("load").bind("load", function() {
							var e;
							try {
								if (e = s.contents(), !e.length || !e[0].firstChild) throw new Error
							} catch (i) {
								e = void 0
							}
							l(200, "success", {
								iframe: e
							}), t('<iframe src="' + a + '"></iframe>').appendTo(n), window.setTimeout(function() {
								n.remove()
							}, 0)
						}), n.prop("target", s.prop("name")).prop("action", i.url).prop("method", i.type), i.formData && t.each(i.formData, function(e, i) {
							t('<input type="hidden"/>').prop("name", i.name).val(i.value).appendTo(n)
						}), i.fileInput && i.fileInput.length && "POST" === i.type && (e = i.fileInput.clone(), i.fileInput.after(function(t) {
							return e[t]
						}), i.paramName && i.fileInput.each(function(e) {
							t(this).prop("name", o[e] || i.paramName)
						}), n.append(i.fileInput).prop("enctype", "multipart/form-data").prop("encoding", "multipart/form-data"), i.fileInput.removeAttr("form")), n.submit(), e && e.length && i.fileInput.each(function(i, n) {
							var s = t(e[i]);
							t(n).prop("name", s.prop("name")).attr("form", s.attr("form")), s.replaceWith(n)
						})
					}), n.append(s).appendTo(document.body)
				},
				abort: function() {
					s && s.unbind("load").prop("src", a), n && n.remove()
				}
			}
		}
	}), t.ajaxSetup({
		converters: {
			"iframe text": function(e) {
				return e && t(e[0].body).text()
			},
			"iframe json": function(e) {
				return e && t.parseJSON(t(e[0].body).text())
			},
			"iframe html": function(e) {
				return e && t(e[0].body).html()
			},
			"iframe xml": function(e) {
				var i = e && e[0];
				return i && t.isXMLDoc(i) ? i : t.parseXML(i.XMLDocument && i.XMLDocument.xml || t(i.body).html())
			},
			"iframe script": function(e) {
				return e && t.globalEval(t(e[0].body).text())
			}
		}
	})
}),
function(t) {
	"use strict";
	"function" == typeof define && define.amd ? define(["jquery", "jquery.ui.widget"], t) : t(window.jQuery)
}(function(t) {
	"use strict";
	t.support.fileInput = !(new RegExp("(Android (1\\.[0156]|2\\.[01]))|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)|(w(eb)?OSBrowser)|(webOS)|(Kindle/(1\\.0|2\\.[05]|3\\.0))").test(window.navigator.userAgent) || t('<input type="file">').prop("disabled")), t.support.xhrFileUpload = !(!window.ProgressEvent || !window.FileReader), t.support.xhrFormDataFileUpload = !! window.FormData, t.support.blobSlice = window.Blob && (Blob.prototype.slice || Blob.prototype.webkitSlice || Blob.prototype.mozSlice), t.widget("blueimp.fileupload", {
		options: {
			dropZone: t(document),
			pasteZone: t(document),
			fileInput: void 0,
			replaceFileInput: !0,
			paramName: void 0,
			singleFileUploads: !0,
			limitMultiFileUploads: void 0,
			limitMultiFileUploadSize: void 0,
			limitMultiFileUploadSizeOverhead: 512,
			sequentialUploads: !1,
			limitConcurrentUploads: void 0,
			forceIframeTransport: !1,
			redirect: void 0,
			redirectParamName: void 0,
			postMessage: void 0,
			multipart: !0,
			maxChunkSize: void 0,
			uploadedBytes: void 0,
			recalculateProgress: !0,
			progressInterval: 100,
			bitrateInterval: 500,
			autoUpload: !0,
			messages: {
				uploadedBytes: "Uploaded bytes exceed file size"
			},
			i18n: function(e, i) {
				return e = this.messages[e] || e.toString(), i && t.each(i, function(t, i) {
					e = e.replace("{" + t + "}", i)
				}), e
			},
			formData: function(t) {
				return t.serializeArray()
			},
			add: function(e, i) {
				return e.isDefaultPrevented() ? !1 : void((i.autoUpload || i.autoUpload !== !1 && t(this).fileupload("option", "autoUpload")) && i.process().done(function() {
					i.submit()
				}))
			},
			processData: !1,
			contentType: !1,
			cache: !1
		},
		_specialOptions: ["fileInput", "dropZone", "pasteZone", "multipart", "forceIframeTransport"],
		_blobSlice: t.support.blobSlice && function() {
			var t = this.slice || this.webkitSlice || this.mozSlice;
			return t.apply(this, arguments)
		},
		_BitrateTimer: function() {
			this.timestamp = Date.now ? Date.now() : (new Date).getTime(), this.loaded = 0, this.bitrate = 0, this.getBitrate = function(t, e, i) {
				var n = t - this.timestamp;
				return (!this.bitrate || !i || n > i) && (this.bitrate = (e - this.loaded) * (1e3 / n) * 8, this.loaded = e, this.timestamp = t), this.bitrate
			}
		},
		_isXHRUpload: function(e) {
			return !e.forceIframeTransport && (!e.multipart && t.support.xhrFileUpload || t.support.xhrFormDataFileUpload)
		},
		_getFormData: function(e) {
			var i;
			return "function" === t.type(e.formData) ? e.formData(e.form) : t.isArray(e.formData) ? e.formData : "object" === t.type(e.formData) ? (i = [], t.each(e.formData, function(t, e) {
				i.push({
					name: t,
					value: e
				})
			}), i) : []
		},
		_getTotal: function(e) {
			var i = 0;
			return t.each(e, function(t, e) {
				i += e.size || 1
			}), i
		},
		_initProgressObject: function(e) {
			var i = {
				loaded: 0,
				total: 0,
				bitrate: 0
			};
			e._progress ? t.extend(e._progress, i) : e._progress = i
		},
		_initResponseObject: function(t) {
			var e;
			if (t._response)
				for (e in t._response) t._response.hasOwnProperty(e) && delete t._response[e];
			else t._response = {}
		},
		_onProgress: function(e, i) {
			if (e.lengthComputable) {
				var n, s = Date.now ? Date.now() : (new Date).getTime();
				if (i._time && i.progressInterval && s - i._time < i.progressInterval && e.loaded !== e.total) return;
				i._time = s, n = Math.floor(e.loaded / e.total * (i.chunkSize || i._progress.total)) + (i.uploadedBytes || 0), this._progress.loaded += n - i._progress.loaded, this._progress.bitrate = this._bitrateTimer.getBitrate(s, this._progress.loaded, i.bitrateInterval), i._progress.loaded = i.loaded = n, i._progress.bitrate = i.bitrate = i._bitrateTimer.getBitrate(s, n, i.bitrateInterval), this._trigger("progress", t.Event("progress", {
					delegatedEvent: e
				}), i), this._trigger("progressall", t.Event("progressall", {
					delegatedEvent: e
				}), this._progress)
			}
		},
		_initProgressListener: function(e) {
			var i = this,
				n = e.xhr ? e.xhr() : t.ajaxSettings.xhr();
			n.upload && (t(n.upload).bind("progress", function(t) {
				var n = t.originalEvent;
				t.lengthComputable = n.lengthComputable, t.loaded = n.loaded, t.total = n.total, i._onProgress(t, e)
			}), e.xhr = function() {
				return n
			})
		},
		_isInstanceOf: function(t, e) {
			return Object.prototype.toString.call(e) === "[object " + t + "]"
		},
		_initXHRData: function(e) {
			var i, n = this,
				s = e.files[0],
				o = e.multipart || !t.support.xhrFileUpload,
				a = "array" === t.type(e.paramName) ? e.paramName[0] : e.paramName;
			e.headers = t.extend({}, e.headers), e.contentRange && (e.headers["Content-Range"] = e.contentRange), o && !e.blob && this._isInstanceOf("File", s) || (e.headers["Content-Disposition"] = 'attachment; filename="' + encodeURI(s.name) + '"'), o ? t.support.xhrFormDataFileUpload && (e.postMessage ? (i = this._getFormData(e), e.blob ? i.push({
				name: a,
				value: e.blob
			}) : t.each(e.files, function(n, s) {
				i.push({
					name: "array" === t.type(e.paramName) && e.paramName[n] || a,
					value: s
				})
			})) : (n._isInstanceOf("FormData", e.formData) ? i = e.formData : (i = new FormData, t.each(this._getFormData(e), function(t, e) {
				i.append(e.name, e.value)
			})), e.blob ? i.append(a, e.blob, s.name) : t.each(e.files, function(s, o) {
				(n._isInstanceOf("File", o) || n._isInstanceOf("Blob", o)) && i.append("array" === t.type(e.paramName) && e.paramName[s] || a, o, o.uploadName || o.name)
			})), e.data = i) : (e.contentType = s.type || "application/octet-stream", e.data = e.blob || s), e.blob = null
		},
		_initIframeSettings: function(e) {
			var i = t("<a></a>").prop("href", e.url).prop("host");
			e.dataType = "iframe " + (e.dataType || ""), e.formData = this._getFormData(e), e.redirect && i && i !== location.host && e.formData.push({
				name: e.redirectParamName || "redirect",
				value: e.redirect
			})
		},
		_initDataSettings: function(t) {
			this._isXHRUpload(t) ? (this._chunkedUpload(t, !0) || (t.data || this._initXHRData(t), this._initProgressListener(t)), t.postMessage && (t.dataType = "postmessage " + (t.dataType || ""))) : this._initIframeSettings(t)
		},
		_getParamName: function(e) {
			var i = t(e.fileInput),
				n = e.paramName;
			return n ? t.isArray(n) || (n = [n]) : (n = [], i.each(function() {
				for (var e = t(this), i = e.prop("name") || "files[]", s = (e.prop("files") || [1]).length; s;) n.push(i), s -= 1
			}), n.length || (n = [i.prop("name") || "files[]"])), n
		},
		_initFormSettings: function(e) {
			e.form && e.form.length || (e.form = t(e.fileInput.prop("form")), e.form.length || (e.form = t(this.options.fileInput.prop("form")))), e.paramName = this._getParamName(e), e.url || (e.url = e.form.prop("action") || location.href), e.type = (e.type || "string" === t.type(e.form.prop("method")) && e.form.prop("method") || "").toUpperCase(), "POST" !== e.type && "PUT" !== e.type && "PATCH" !== e.type && (e.type = "POST"), e.formAcceptCharset || (e.formAcceptCharset = e.form.attr("accept-charset"))
		},
		_getAJAXSettings: function(e) {
			var i = t.extend({}, this.options, e);
			return this._initFormSettings(i), this._initDataSettings(i), i
		},
		_getDeferredState: function(t) {
			return t.state ? t.state() : t.isResolved() ? "resolved" : t.isRejected() ? "rejected" : "pending"
		},
		_enhancePromise: function(t) {
			return t.success = t.done, t.error = t.fail, t.complete = t.always, t
		},
		_getXHRPromise: function(e, i, n) {
			var s = t.Deferred(),
				o = s.promise();
			return i = i || this.options.context || o, e === !0 ? s.resolveWith(i, n) : e === !1 && s.rejectWith(i, n), o.abort = s.promise, this._enhancePromise(o)
		},
		_addConvenienceMethods: function(e, i) {
			var n = this,
				s = function(e) {
					return t.Deferred().resolveWith(n, e).promise()
				};
			i.process = function(e, o) {
				return (e || o) && (i._processQueue = this._processQueue = (this._processQueue || s([this])).pipe(function() {
					return i.errorThrown ? t.Deferred().rejectWith(n, [i]).promise() : s(arguments)
				}).pipe(e, o)), this._processQueue || s([this])
			}, i.submit = function() {
				return "pending" !== this.state() && (i.jqXHR = this.jqXHR = n._trigger("submit", t.Event("submit", {
					delegatedEvent: e
				}), this) !== !1 && n._onSend(e, this)), this.jqXHR || n._getXHRPromise()
			}, i.abort = function() {
				return this.jqXHR ? this.jqXHR.abort() : (this.errorThrown = "abort", n._trigger("fail", null, this), n._getXHRPromise(!1))
			}, i.state = function() {
				return this.jqXHR ? n._getDeferredState(this.jqXHR) : this._processQueue ? n._getDeferredState(this._processQueue) : void 0
			}, i.processing = function() {
				return !this.jqXHR && this._processQueue && "pending" === n._getDeferredState(this._processQueue)
			}, i.progress = function() {
				return this._progress
			}, i.response = function() {
				return this._response
			}
		},
		_getUploadedBytes: function(t) {
			var e = t.getResponseHeader("Range"),
				i = e && e.split("-"),
				n = i && i.length > 1 && parseInt(i[1], 10);
			return n && n + 1
		},
		_chunkedUpload: function(e, i) {
			e.uploadedBytes = e.uploadedBytes || 0;
			var n, s, o = this,
				a = e.files[0],
				r = a.size,
				l = e.uploadedBytes,
				h = e.maxChunkSize || r,
				d = this._blobSlice,
				c = t.Deferred(),
				u = c.promise();
			return this._isXHRUpload(e) && d && (l || r > h) && !e.data ? i ? !0 : l >= r ? (a.error = e.i18n("uploadedBytes"), this._getXHRPromise(!1, e.context, [null, "error", a.error])) : (s = function() {
				var i = t.extend({}, e),
					u = i._progress.loaded;
				i.blob = d.call(a, l, l + h, a.type), i.chunkSize = i.blob.size, i.contentRange = "bytes " + l + "-" + (l + i.chunkSize - 1) + "/" + r, o._initXHRData(i), o._initProgressListener(i), n = (o._trigger("chunksend", null, i) !== !1 && t.ajax(i) || o._getXHRPromise(!1, i.context)).done(function(n, a, h) {
					l = o._getUploadedBytes(h) || l + i.chunkSize, u + i.chunkSize - i._progress.loaded && o._onProgress(t.Event("progress", {
						lengthComputable: !0,
						loaded: l - i.uploadedBytes,
						total: l - i.uploadedBytes
					}), i), e.uploadedBytes = i.uploadedBytes = l, i.result = n, i.textStatus = a, i.jqXHR = h, o._trigger("chunkdone", null, i), o._trigger("chunkalways", null, i), r > l ? s() : c.resolveWith(i.context, [n, a, h])
				}).fail(function(t, e, n) {
					i.jqXHR = t, i.textStatus = e, i.errorThrown = n, o._trigger("chunkfail", null, i), o._trigger("chunkalways", null, i), c.rejectWith(i.context, [t, e, n])
				})
			}, this._enhancePromise(u), u.abort = function() {
				return n.abort()
			}, s(), u) : !1
		},
		_beforeSend: function(t, e) {
			0 === this._active && (this._trigger("start"), this._bitrateTimer = new this._BitrateTimer, this._progress.loaded = this._progress.total = 0, this._progress.bitrate = 0), this._initResponseObject(e), this._initProgressObject(e), e._progress.loaded = e.loaded = e.uploadedBytes || 0, e._progress.total = e.total = this._getTotal(e.files) || 1, e._progress.bitrate = e.bitrate = 0, this._active += 1, this._progress.loaded += e.loaded, this._progress.total += e.total
		},
		_onDone: function(e, i, n, s) {
			var o = s._progress.total,
				a = s._response;
			s._progress.loaded < o && this._onProgress(t.Event("progress", {
				lengthComputable: !0,
				loaded: o,
				total: o
			}), s), a.result = s.result = e, a.textStatus = s.textStatus = i, a.jqXHR = s.jqXHR = n, this._trigger("done", null, s)
		},
		_onFail: function(t, e, i, n) {
			var s = n._response;
			n.recalculateProgress && (this._progress.loaded -= n._progress.loaded, this._progress.total -= n._progress.total), s.jqXHR = n.jqXHR = t, s.textStatus = n.textStatus = e, s.errorThrown = n.errorThrown = i, this._trigger("fail", null, n)
		},
		_onAlways: function(t, e, i, n) {
			this._trigger("always", null, n)
		},
		_onSend: function(e, i) {
			i.submit || this._addConvenienceMethods(e, i);
			var n, s, o, a, r = this,
				l = r._getAJAXSettings(i),
				h = function() {
					return r._sending += 1, l._bitrateTimer = new r._BitrateTimer, n = n || ((s || r._trigger("send", t.Event("send", {
						delegatedEvent: e
					}), l) === !1) && r._getXHRPromise(!1, l.context, s) || r._chunkedUpload(l) || t.ajax(l)).done(function(t, e, i) {
						r._onDone(t, e, i, l)
					}).fail(function(t, e, i) {
						r._onFail(t, e, i, l)
					}).always(function(t, e, i) {
						if (r._onAlways(t, e, i, l), r._sending -= 1, r._active -= 1, l.limitConcurrentUploads && l.limitConcurrentUploads > r._sending)
							for (var n = r._slots.shift(); n;) {
								if ("pending" === r._getDeferredState(n)) {
									n.resolve();
									break
								}
								n = r._slots.shift()
							}
						0 === r._active && r._trigger("stop")
					})
				};
			return this._beforeSend(e, l), this.options.sequentialUploads || this.options.limitConcurrentUploads && this.options.limitConcurrentUploads <= this._sending ? (this.options.limitConcurrentUploads > 1 ? (o = t.Deferred(), this._slots.push(o), a = o.pipe(h)) : (this._sequence = this._sequence.pipe(h, h), a = this._sequence), a.abort = function() {
				return s = [void 0, "abort", "abort"], n ? n.abort() : (o && o.rejectWith(l.context, s), h())
			}, this._enhancePromise(a)) : h()
		},
		_onAdd: function(e, i) {
			var n, s, o, a, r = this,
				l = !0,
				h = t.extend({}, this.options, i),
				d = i.files,
				c = d.length,
				u = h.limitMultiFileUploads,
				p = h.limitMultiFileUploadSize,
				f = h.limitMultiFileUploadSizeOverhead,
				m = 0,
				g = this._getParamName(h),
				v = 0;
			if (!p || c && void 0 !== d[0].size || (p = void 0), (h.singleFileUploads || u || p) && this._isXHRUpload(h))
				if (h.singleFileUploads || p || !u)
					if (!h.singleFileUploads && p)
						for (o = [], n = [], a = 0; c > a; a += 1) m += d[a].size + f, (a + 1 === c || m + d[a + 1].size + f > p || u && a + 1 - v >= u) && (o.push(d.slice(v, a + 1)), s = g.slice(v, a + 1), s.length || (s = g), n.push(s), v = a + 1, m = 0);
					else n = g;
					else
						for (o = [], n = [], a = 0; c > a; a += u) o.push(d.slice(a, a + u)), s = g.slice(a, a + u), s.length || (s = g), n.push(s);
					else o = [d], n = [g];
			return i.originalFiles = d, t.each(o || d, function(s, a) {
				var h = t.extend({}, i);
				return h.files = o ? a : [a], h.paramName = n[s], r._initResponseObject(h), r._initProgressObject(h), r._addConvenienceMethods(e, h), l = r._trigger("add", t.Event("add", {
					delegatedEvent: e
				}), h)
			}), l
		},
		_replaceFileInput: function(e) {
			var i = e.clone(!0);
			t("<form></form>").append(i)[0].reset(), e.after(i).detach(), t.cleanData(e.unbind("remove")), this.options.fileInput = this.options.fileInput.map(function(t, n) {
				return n === e[0] ? i[0] : n
			}), e[0] === this.element[0] && (this.element = i)
		},
		_handleFileTreeEntry: function(e, i) {
			var n, s = this,
				o = t.Deferred(),
				a = function(t) {
					t && !t.entry && (t.entry = e), o.resolve([t])
				}, r = function(t) {
					s._handleFileTreeEntries(t, i + e.name + "/").done(function(t) {
						o.resolve(t)
					}).fail(a)
				}, l = function() {
					n.readEntries(function(t) {
						t.length ? (h = h.concat(t), l()) : r(h)
					}, a)
				}, h = [];
			return i = i || "", e.isFile ? e._file ? (e._file.relativePath = i, o.resolve(e._file)) : e.file(function(t) {
				t.relativePath = i, o.resolve(t)
			}, a) : e.isDirectory ? (n = e.createReader(), l()) : o.resolve([]), o.promise()
		},
		_handleFileTreeEntries: function(e, i) {
			var n = this;
			return t.when.apply(t, t.map(e, function(t) {
				return n._handleFileTreeEntry(t, i)
			})).pipe(function() {
				return Array.prototype.concat.apply([], arguments)
			})
		},
		_getDroppedFiles: function(e) {
			e = e || {};
			var i = e.items;
			return i && i.length && (i[0].webkitGetAsEntry || i[0].getAsEntry) ? this._handleFileTreeEntries(t.map(i, function(t) {
				var e;
				return t.webkitGetAsEntry ? (e = t.webkitGetAsEntry(), e && (e._file = t.getAsFile()), e) : t.getAsEntry()
			})) : t.Deferred().resolve(t.makeArray(e.files)).promise()
		},
		_getSingleFileInputFiles: function(e) {
			e = t(e);
			var i, n, s = e.prop("webkitEntries") || e.prop("entries");
			if (s && s.length) return this._handleFileTreeEntries(s);
			if (i = t.makeArray(e.prop("files")), i.length) void 0 === i[0].name && i[0].fileName && t.each(i, function(t, e) {
				e.name = e.fileName, e.size = e.fileSize
			});
			else {
				if (n = e.prop("value"), !n) return t.Deferred().resolve([]).promise();
				i = [{
					name: n.replace(/^.*\\/, "")
				}]
			}
			return t.Deferred().resolve(i).promise()
		},
		_getFileInputFiles: function(e) {
			return e instanceof t && 1 !== e.length ? t.when.apply(t, t.map(e, this._getSingleFileInputFiles)).pipe(function() {
				return Array.prototype.concat.apply([], arguments)
			}) : this._getSingleFileInputFiles(e)
		},
		_onChange: function(e) {
			var i = this,
				n = {
					fileInput: t(e.target),
					form: t(e.target.form)
				};
			this._getFileInputFiles(n.fileInput).always(function(s) {
				n.files = s, i.options.replaceFileInput && i._replaceFileInput(n.fileInput), i._trigger("change", t.Event("change", {
					delegatedEvent: e
				}), n) !== !1 && i._onAdd(e, n)
			})
		},
		_onPaste: function(e) {
			var i = e.originalEvent && e.originalEvent.clipboardData && e.originalEvent.clipboardData.items,
				n = {
					files: []
				};
			i && i.length && (t.each(i, function(t, e) {
				var i = e.getAsFile && e.getAsFile();
				i && n.files.push(i)
			}), this._trigger("paste", t.Event("paste", {
				delegatedEvent: e
			}), n) !== !1 && this._onAdd(e, n))
		},
		_onDrop: function(e) {
			e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
			var i = this,
				n = e.dataTransfer,
				s = {};
			n && n.files && n.files.length && (e.preventDefault(), this._getDroppedFiles(n).always(function(n) {
				s.files = n, i._trigger("drop", t.Event("drop", {
					delegatedEvent: e
				}), s) !== !1 && i._onAdd(e, s)
			}))
		},
		_onDragOver: function(e) {
			e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
			var i = e.dataTransfer;
			i && -1 !== t.inArray("Files", i.types) && this._trigger("dragover", t.Event("dragover", {
				delegatedEvent: e
			})) !== !1 && (e.preventDefault(), i.dropEffect = "copy")
		},
		_initEventHandlers: function() {
			this._isXHRUpload(this.options) && (this._on(this.options.dropZone, {
				dragover: this._onDragOver,
				drop: this._onDrop
			}), this._on(this.options.pasteZone, {
				paste: this._onPaste
			})), t.support.fileInput && this._on(this.options.fileInput, {
				change: this._onChange
			})
		},
		_destroyEventHandlers: function() {
			this._off(this.options.dropZone, "dragover drop"), this._off(this.options.pasteZone, "paste"), this._off(this.options.fileInput, "change")
		},
		_setOption: function(e, i) {
			var n = -1 !== t.inArray(e, this._specialOptions);
			n && this._destroyEventHandlers(), this._super(e, i), n && (this._initSpecialOptions(), this._initEventHandlers())
		},
		_initSpecialOptions: function() {
			var e = this.options;
			void 0 === e.fileInput ? e.fileInput = this.element.is('input[type="file"]') ? this.element : this.element.find('input[type="file"]') : e.fileInput instanceof t || (e.fileInput = t(e.fileInput)), e.dropZone instanceof t || (e.dropZone = t(e.dropZone)), e.pasteZone instanceof t || (e.pasteZone = t(e.pasteZone))
		},
		_getRegExp: function(t) {
			var e = t.split("/"),
				i = e.pop();
			return e.shift(), new RegExp(e.join("/"), i)
		},
		_isRegExpOption: function(e, i) {
			return "url" !== e && "string" === t.type(i) && /^\/.*\/[igm]{0,3}$/.test(i)
		},
		_initDataAttributes: function() {
			var e = this,
				i = this.options,
				n = t(this.element[0].cloneNode(!1));
			t.each(n.data(), function(t, s) {
				var o = "data-" + t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
				n.attr(o) && (e._isRegExpOption(t, s) && (s = e._getRegExp(s)), i[t] = s)
			})
		},
		_create: function() {
			this._initDataAttributes(), this._initSpecialOptions(), this._slots = [], this._sequence = this._getXHRPromise(!0), this._sending = this._active = 0, this._initProgressObject(this), this._initEventHandlers()
		},
		active: function() {
			return this._active
		},
		progress: function() {
			return this._progress
		},
		add: function(e) {
			var i = this;
			e && !this.options.disabled && (e.fileInput && !e.files ? this._getFileInputFiles(e.fileInput).always(function(t) {
				e.files = t, i._onAdd(null, e)
			}) : (e.files = t.makeArray(e.files), this._onAdd(null, e)))
		},
		send: function(e) {
			if (e && !this.options.disabled) {
				if (e.fileInput && !e.files) {
					var i, n, s = this,
						o = t.Deferred(),
						a = o.promise();
					return a.abort = function() {
						return n = !0, i ? i.abort() : (o.reject(null, "abort", "abort"), a)
					}, this._getFileInputFiles(e.fileInput).always(function(t) {
						if (!n) {
							if (!t.length) return void o.reject();
							e.files = t, i = s._onSend(null, e), i.then(function(t, e, i) {
								o.resolve(t, e, i)
							}, function(t, e, i) {
								o.reject(t, e, i)
							})
						}
					}), this._enhancePromise(a)
				}
				if (e.files = t.makeArray(e.files), e.files.length) return this._onSend(null, e)
			}
			return this._getXHRPromise(!1, e && e.context)
		}
	})
}),
function() {
	var t = function(t, i) {
		function n() {
			this.constructor = t
		}
		for (var s in i) e.call(i, s) && (t[s] = i[s]);
		return n.prototype = i.prototype, t.prototype = new n, t.__super__ = i.prototype, t
	}, e = {}.hasOwnProperty;
	this.Cellar.module("Widget", function(e, i, n, s, o, a) {
		var r, l, h, d;
		return r = function(e) {
			function i() {
				return i.__super__.constructor.apply(this, arguments)
			}
			return t(i, e),
			i
		}(n.Model), h = function(e) {
			function n() {
				return n.__super__.constructor.apply(this, arguments)
			}
			return t(n, e), n.prototype.model = r, n.prototype.url = "/admin/photos/folders", n.prototype.initialize = function() {
				return i.commands.setHandler("folder.enter", function(t) {
					return function(e) {
						return e ? t.url = "/admin/photos/folders?id=" + e : t.url = "/admin/photos/folders", t.fetch()
					}
				}(this))
			}, n
		}(n.Collection), l = function(e) {
			function i() {
				return i.__super__.constructor.apply(this, arguments)
			}
			return t(i, e), i.prototype.model = r, i.prototype.tagName = "li", i.prototype.template = "gallery/templates/folder", i
		}(s.ItemView), d = function(e) {
			function n() {
				return n.__super__.constructor.apply(this, arguments)
			}
			return t(n, e), n.prototype.template = "gallery/templates/crumb", n.prototype.itemView = l, n.prototype.itemViewContainer = ".breadcrumb", n.prototype.initialize = function() {
				return this.collection = new h, this.collection.fetch()
			}, n.prototype.events = {
				"click li>a": function(t) {
					var e;
					return e = o(t.target).data("folder-id"), i.execute("photo.enter.folder", e)
				}
			}, n
		}(s.CompositeView), e.FoldersView = d
	})
}.call(this),
function() {
	var t, e, i = function(t, e) {
			function i() {
				this.constructor = t
			}
			for (var s in e) n.call(e, s) && (t[s] = e[s]);
			return i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype, t
		}, n = {}.hasOwnProperty;
	e = this.confirmDialog, t = this.alertDialog, this.Cellar.module("Widget", function(n, s, o, a, r, l) {
		var h, d, c, u;
		return h = function(t) {
			function e() {
				return e.__super__.constructor.apply(this, arguments)
			}
			return i(e, t), e
		}(o.Model), u = function(t) {
			function e() {
				return e.__super__.constructor.apply(this, arguments)
			}
			return i(e, t), e.prototype.model = h, e.prototype.url = "/admin/photos", e.prototype.parse = function(t) {
				var i;
				return i = t.folders.concat(t.photos), e.__super__.parse.call(this, i)
			}, e
		}(o.Collection), c = function(n) {
			function o() {
				return o.__super__.constructor.apply(this, arguments)
			}
			return i(o, n), o.prototype.model = h, o.prototype.tagName = "li", o.prototype.template = "gallery/templates/photo", o.prototype.events = {
				"dblclick .folder": "click_folder",
				"click .photo > .inner-box": "click_photo",
				"click .filename": "nameEditor",
				"blur input.name-editor": "rename",
				"keydown input.name-editor": "enterKey",
				"click button.close": "delete_item"
			}, o.prototype.initialize = function() {}, o.prototype.remove_it = function() {
				return this.model.collection.remove(this.model), toastr.info("\u5220\u9664\u6210\u529f!")
			}, o.prototype.delete_item = function(i) {
				var n, s, o;
				return n = r(i.target).closest(".photo-box"), o = n.data("type"), s = n.data("item-id"), "folder" === o ? e("\u6587\u4ef6\u5939", "\u771f\u7684\u8981\u5220\u9664\u8be5\u6587\u4ef6\u5939\u5417\uff1f", {
					type: "type-danger"
				}, function(e) {
					return function(i) {
						return i ? (s = s.split("_")[1], r.post("/admin/photos/delete_folder", {
							id: s
						}, function(i) {
							return "error" === i.status ? t("\u6d88\u606f", i.msg) : e.remove_it()
						})) : void 0
					}
				}(this)) : r.get("/admin/photos/" + s + "/counter", function(t) {
					return function(i) {
						var n;
						return n = i.counter > 0 ? "\u8be5\u56fe\u7247\u6709 " + i.counter + " \u5173\u8054\u5546\u54c1\uff0c\u5220\u9664\u5c06\u89e3\u9664\u5173\u8054\uff0c\u662f\u5426\u7ee7\u7eed\uff1f" : "\u8be5\u56fe\u7247\u6ca1\u6709\u5546\u54c1\u4e0e\u4e4b\u5173\u8054\uff0c\u53ef\u4ee5\u5b89\u5168\u5220\u9664\uff0c\u662f\u5426\u7ee7\u7eed\uff1f", e("\u5220\u9664\u786e\u8ba4", n, {
							type: "type-danger"
						}, function(e) {
							return e ? r.post("/admin/photos/" + s + "/destroy", function(e) {
								return log.debug("delete photo OK"), t.remove_it()
							}) : void 0
						})
					}
				}(this))
			}, o.prototype.click_folder = function(t) {
				var e, i;
				return e = r(t.target).closest(".folder"), i = e.data("item-id").split("_")[1], s.execute("photo.enter.folder", i), s.execute("folder.enter", i)
			}, o.prototype.click_photo = function(t) {
				var e;
				return log.debug("photo inner-box click"), e = r(t.target).closest(".inner-box"), e.toggleClass("selected"), this.model.set("selected", e.hasClass("selected")), log.debug(this.model)
			}, o.prototype.nameEditor = function(t) {
				var e, i;
				return t.preventDefault(), t.stopPropagation(), i = this.$("span.name"), e = this.$("input.name-editor"), i.hide(), e.val(i.text()).show().focus()
			}, o.prototype.rename = function(t) {
				var e, i, n, s, o, a, l;
				return n = this.$("span.name"), i = this.$("input.name-editor"), n.text(i.val()).show(), i.hide(), e = r(t.target).closest(".photo-box"), a = e.data("type"), "photo" === a ? (s = e.data("item-id"), l = "/admin/photos/rename_photo") : (s = e.data("item-id").split("_")[1], l = "/admin/photos/rename_folder"), o = {
					name: i.val(),
					id: s
				}, r.post(l, o, function() {
					return log.debug("server rename OK")
				})
			}, o.prototype.enterKey = function(t) {
				return 13 === t.which ? r(t.target).blur() : void 0
			}, o
		}(a.ItemView), d = function(t) {
			function e() {
				return e.__super__.constructor.apply(this, arguments)
			}
			return i(e, t), e.prototype.tagName = "ul", e.prototype.itemView = c, e.prototype.prov_id = 0, e.prototype.page = 0, e.prototype.initialize = function() {
				var t;
				return this.prov_id = this.attributes.prov_id, this.collection = new u, t = this.prov_id > 0 ? "/admin/photos?prov_id=" + this.prov_id : "/admin/photos", this.collection.url = t, this.collection.fetch(), s.commands.setHandler("photo.enter.folder", function(t) {
					return function(e) {
						return t.enter_folder(e)
					}
				}(this)), s.commands.setHandler("add.photo", function(t) {
					return function(e) {
						return t.collection.add(e)
					}
				}(this))
			}, e.prototype.enter_folder = function(t) {
				var e, i;
				return this.page = 0, i = t ? "/admin/photos?folder_id=" + t : this.prov_id > 0 ? "/admin/photos?prov_id=" + this.prov_id : "/admin/photos", this.collection.url = i, this.collection.fetch(), r("input[name=folder_id]").size() > 0 ? r("input[name=folder_id]").val(t) : (e = r("<input/>", {
					name: "folder_id",
					type: "hidden"
				}).val(t), r("#upload-photo").append(e))
			}, e.prototype.getPhotos = function() {
				return this.collection
			}, e.prototype.getSelected = function() {
				var t;
				return t = [], this.collection.each(function(e, i) {
					return e.get("selected") ? t.push(e.toJSON()) : void 0
				}), t
			}, e.prototype.getSelectedId = function() {
				var t, e;
				return e = this.getSelected(), t = l.map(e, function(t) {
					return t.id
				})
			}, e.prototype.removeSelected = function() {
				var t, e;
				return t = this.collection, e = [], t.forEach(function(t) {
					return function(t, i) {
						return log.warn(t, i), t.get("selected") ? e.push(t) : void 0
					}
				}(this)), t.remove(e)
			}, e
		}(a.CollectionView), n.PhotoGalleryView = d
	})
}.call(this),
function() {
	this.JST || (this.JST = {}), this.JST["admins/gallery/templates/crumb"] = function(t) {
		t || (t = {});
		var e, i = [],
			n = t.safe,
			s = t.escape;
		return e = t.safe = function(t) {
			if (t && t.ecoSafe) return t;
			("undefined" == typeof t || null == t) && (t = "");
			var e = new String(t);
			return e.ecoSafe = !0, e
		}, s || (s = t.escape = function(t) {
			return ("" + t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
		}),
		function() {
			(function() {
				i.push('<ol class="breadcrumb">\n	<li><a>\u5168\u90e8</a></li>\n</ol>\n')
			}).call(this)
		}.call(t), t.safe = n, t.escape = s, i.join("")
	}
}.call(this),
function() {
	this.JST || (this.JST = {}), this.JST["admins/gallery/templates/folder"] = function(t) {
		t || (t = {});
		var e, i = [],
			n = function(t) {
				return t && t.ecoSafe ? t : "undefined" != typeof t && null != t ? o(t) : ""
			}, s = t.safe,
			o = t.escape;
		return e = t.safe = function(t) {
			if (t && t.ecoSafe) return t;
			("undefined" == typeof t || null == t) && (t = "");
			var e = new String(t);
			return e.ecoSafe = !0, e
		}, o || (o = t.escape = function(t) {
			return ("" + t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
		}),
		function() {
			(function() {
				i.push('<a data-folder-id="'), i.push(n(this.id)), i.push('">'), i.push(n(this.name)), i.push("</a>\n")
			}).call(this)
		}.call(t), t.safe = s, t.escape = o, i.join("")
	}
}.call(this),
function() {
	this.JST || (this.JST = {}), this.JST["admins/gallery/templates/photo.gallery"] = function(t) {
		t || (t = {});
		var e, i = [],
			n = t.safe,
			s = t.escape;
		return e = t.safe = function(t) {
			if (t && t.ecoSafe) return t;
			("undefined" == typeof t || null == t) && (t = "");
			var e = new String(t);
			return e.ecoSafe = !0, e
		}, s || (s = t.escape = function(t) {
			return ("" + t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
		}),
		function() {
			(function() {
				i.push('<div id="gallery-box">\n	\n	<div class="toolbars">\n		<button class="btn btn-default btn-upload"><span class="icons-cloud-upload"</span>\u4e0a\u4f20\u56fe\u7247</button>\n		<button class="btn btn-default btn-new-folder">\u65b0\u5efa\u6587\u4ef6\u5939</button>\n		<div class="btn-group">\n      <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">\n        \u66f4\u591a... <span class="caret"></span>\n      </button>\n      <ul class="dropdown-menu" role="menu">\n        <li><a id="move-to" class="action">\u79fb\u52a8\u5230...</a></li>\n        <li><a id="delete-selected" class="action">\u5220\u9664</a></li>\n      </ul>\n    </div>		\n	</div>\n\n	<div id="uploader-form">\n  	<form id="upload-photo" action="/admin/photos.json" method="post">\n  		<input id="file" type="file" name="photo[image]">\n  	</form>\n	</div>\n	<div id="crumb-box"></div>\n  <div id="gallery"></div>\n  <div id="progressbar-box">\n  	<div class="progress progress-striped">\n		  <div id="progressbar" class="progress-bar progress-bar-info" role="progressbar">\n		    <span class="sr-only"></span>\n		  </div>\n		</div>\n  </div>\n</div>\n')
			}).call(this)
		}.call(t), t.safe = n, t.escape = s, i.join("")
	}
}.call(this),
function() {
	this.JST || (this.JST = {}), this.JST["admins/gallery/templates/photo"] = function(t) {
		t || (t = {});
		var e, i = [],
			n = function(t) {
				return t && t.ecoSafe ? t : "undefined" != typeof t && null != t ? o(t) : ""
			}, s = t.safe,
			o = t.escape;
		return e = t.safe = function(t) {
			if (t && t.ecoSafe) return t;
			("undefined" == typeof t || null == t) && (t = "");
			var e = new String(t);
			return e.ecoSafe = !0, e
		}, o || (o = t.escape = function(t) {
			return ("" + t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
		}),
		function() {
			(function() {
				i.push('<div class="photo-box '), i.push(n(this["class"])), i.push('" data-type="'), i.push(n(this["class"])), i.push('" data-item-id="'), i.push(n(this.id)), i.push('">\n	<div class="close-box">\n		<button type="button" class="close" aria-hidden="true">&times;</button>\n	</div>\n	<div class="inner-box">\n		<img src="'), i.push(n(this.thumb)), i.push('">\n		<div class="filename">\n			<span class="name">'), i.push(n(this.filename)), i.push('</span>\n			<input type="text" class="name-editor form-control input-sm">\n		</div>\n	</div>\n</div>\n')
			}).call(this)
		}.call(t), t.safe = s, t.escape = o, i.join("")
	}
}.call(this),
function() {
	var t = function(t, i) {
		function n() {
			this.constructor = t
		}
		for (var s in i) e.call(i, s) && (t[s] = i[s]);
		return n.prototype = i.prototype, t.prototype = new n, t.__super__ = i.prototype, t
	}, e = {}.hasOwnProperty;
	this.Cellar.module("Widget", function(e, i, n, s, o, a) {
		var r;
		return r = function(e) {
			function i() {
				return i.__super__.constructor.apply(this, arguments)
			}
			return t(i, e), i.prototype.id = "folder-tree", i.prototype.tagName = "ul", i.prototype.className = "ztree", i.prototype.prov_id = 0, i.prototype.initialize = function() {
				var t, e;
				return t = {
					view: {
						selectedMulti: !1
					},
					data: {
						keep: {
							parent: !0,
							leaf: !1
						},
						simpleData: {
							enable: !0
						}
					}
				}, e = this.prov_id > 0 ? "/admin/photos/tree?prov_id=" + this.prov_id : "/admin/photos/tree", o.getJSON(e, function(e) {
					return function(i) {
						return e.ztree = o.fn.zTree.init(e.$el, t, i)
					}
				}(this))
			}, i.prototype.openDialog = function() {
				var t;
				return t = {
					message: this.el,
					title: "\u9009\u62e9\u7ed3\u70b9",
					buttons: [{
						label: "\u53d6\u6d88",
						cssClass: "btn-default",
						action: function(t) {
							return function(t) {
								return t.close()
							}
						}(this)
					}, {
						label: "\u786e\u5b9a",
						cssClass: "btn-primary",
						action: function(t) {
							return function(e) {
								var i;
								return i = t.ztree.getSelectedNodes(), i && t.trigger("select.node", i[0]), e.close()
							}
						}(this)
					}]
				}, BootstrapDialog.show(t)
			}, i
		}(s.ItemView), e.FolderTree = r
	})
}.call(this),
function() {
	var t = function(t, i) {
		function n() {
			this.constructor = t
		}
		for (var s in i) e.call(i, s) && (t[s] = i[s]);
		return n.prototype = i.prototype, t.prototype = new n, t.__super__ = i.prototype, t
	}, e = {}.hasOwnProperty;
	this.Cellar.module("Widget", function(e, i, n, s, o, a) {
		return e.PhotoGalleryDialog = function(n) {
			function s() {
				return s.__super__.constructor.apply(this, arguments)
			}
			return t(s, n), s.prototype.template = "gallery/templates/photo.gallery", s.prototype.prov_id = 0, s.prototype.initialize = function() {
				return log.info("initialize")
			}, s.prototype.events = {
				"click .btn-upload": function(t) {
					return log.debug("upload a file"), this.$("#file").click()
				},
				"click .btn-new-folder": function(t) {
					var e, n, s, a;
					return log.debug("new folder"), e = o("input[name=folder_id]"), n = e.val(), s = {
						name: "\u672a\u547d\u540d",
						parent_id: n
					}, a = this.prov_id > 0 ? "/admin/photos/new_folder?prov_id=" + this.prov_id : "/admin/photos/new_folder", o.post(a, s, function(t) {
						return function(t) {
							var e;
							return e = {
								id: "folder_" + t.id,
								filename: "\u672a\u547d\u540d",
								"class": "folder",
								image: "/images/folder.png",
								thumb: "/images/folder.png"
							}, i.execute("add.photo", e)
						}
					}(this))
				},
				"click #move-to": function(t) {
					var i;
					return log.warn("move to"), i = new e.FolderTree({
						attributes: {
							prov_id: this.prov_id
						}
					}), i.on("select.node", function(t) {
						return function(e) {
							var i, n;
							return i = t.gallery.getSelectedId(), n = {
								folder_id: e.id,
								ids: i
							}, o.post("/admin/photos/move_to", n, function() {
								return t.gallery.removeSelected(), log.warn("finish move to")
							})
						}
					}(this)), i.openDialog()
				},
				"click #delete-selected": function(t) {
					return log.warn("delete selected"), BootstrapDialog.confirm("\u60a8\u771f\u7684\u8981\u5220\u9664\u6240\u9009\u56fe\u7247\u5417\uff1f", function(t) {
						return function(e) {
							var i;
							return e ? (i = t.gallery.getSelectedId(), o.post("/admin/photos/remove_selected", {
								ids: i
							}, function() {
								return t.gallery.removeSelected(), log.debug("remove select on server")
							})) : void 0
						}
					}(this))
				}
			}, s.prototype.crumb = function() {
				return this.folders = new e.FoldersView, log.warn(this.$("#crumb-box")), this.$("#crumb-box").html(this.folders.render().el)
			}, s.prototype.onShow = function(t) {
				var n, s;
				return this.crumb(), this.gallery = new e.PhotoGalleryView({
					attributes: {
						prov_id: this.prov_id
					}
				}), n = this.gallery, this.$("#gallery").html(this.gallery.render().el), s = this.prov_id > 0 ? "/admin/photos?prov_id=" + this.prov_id : "/admin/photos", this.$("#gallery").get(0).addEventListener("scroll", function(t) {
					var e, s, a, r, l, h;
					return e = o(".breadcrumb li:last a").data("folder-id"), r = o("#gallery").scrollTop(), a = o("#gallery").prop("scrollHeight"), h = o("#gallery").height(), s = a - h - r, 5 >= s && n.page >= 0 ? (l = this.prov_id > 0 ? "/admin/photos?prov_id=" + this.prov_id + "&page=" + n.page + "&folder_id=" + e : "/admin/photos?page=" + n.page + "&folder_id=" + e, o.ajax({
						type: "get",
						url: l,
						dataType: "html",
						headers: {
							"X-CSRF-Token": o('meta[name="csrf-token"]').attr("content")
						},
						success: function(t) {
							var e;
							return e = JSON.parse(t).photos, i.execute("add.photo", e), e.length > 0 ? n.page++ : n.page = -1
						}
					})) : void 0
				}), this.$("#upload-photo").fileupload({
					url: s,
					add: function(t) {
						return function(e, i) {
							return t.$("#progressbar").css("width", "0%"), t.$("#progressbar > .sr-only").text(""), t.$("#progressbar-box").show(), i.submit()
						}
					}(this),
					progress: function(t) {
						return function(e, i) {
							var n;
							return log.warn("progress"), n = parseInt(i.loaded / i.total * 100, 10), t.$("#progressbar").css("width", n + "%"), t.$("#progressbar > .sr-only").text(n + "%\u5b8c\u6210")
						}
					}(this),
					done: function(t) {
						return function(e, n) {
							var s;
							return s = n.result, i.execute("add.photo", s), t.$("#progressbar-box").hide(), log.info(s)
						}
					}(this)
				})
			}, s.prototype.dialog = function() {
				return {
					title: "\u56fe\u7247\u5e93",
					closable: !1,
					buttons: [{
						label: "\u53d6\u6d88",
						cssClass: "btn-default",
						action: function(t) {
							return t.close()
						}
					}, {
						label: "\u63d2\u5165\u56fe\u7247",
						cssClass: "btn-primary",
						action: function(t) {
							return function(e) {
								var i;
								return e.close(), i = t.gallery.getSelected(), t.trigger("photo:dialog:close", i)
							}
						}(this)
					}]
				}
			}, s
		}(s.ItemView)
	})
}.call(this),
function() {
/*	$(document).ajaxError(function(t, e, i, n) {
		return n ? toastr.error('eee') : void 0
	})*/
}.call(this),
function() {
	! function(t) {
		return t.Renderer.render = function(e, i) {
			var n;
			if (n = JST["apps/" + e], n || (n = JST["admins/" + e]), n || (n = t.TemplateCache.get(e)), !n) throw "Template " + e + " not found!";
			return n(i)
		}
	}(Marionette)
}.call(this),
function() {
	! function(t) {
		return t.TemplateCache.prototype.compileTemplate = function(t) {
			return Handlebars.compile(t)
		}
	}(Marionette)
}.call(this),
function() {}.call(this),
function() {
	var t = function(t, i) {
		function n() {
			this.constructor = t
		}
		for (var s in i) e.call(i, s) && (t[s] = i[s]);
		return n.prototype = i.prototype, t.prototype = new n, t.__super__ = i.prototype, t
	}, e = {}.hasOwnProperty;
	this.Cellar.module("Admin", function(e, i, n, s, o, a) {
		var r, l;
		return r = function(e) {
			function i() {
				return i.__super__.constructor.apply(this, arguments)
			}
			return t(i, e), i.prototype.el = "#header", i.prototype.events = {
				"click .msg-box li": function() {
					return log.info("click icon")
				}
			}, i.prototype.update_counter = function() {
				return o.get("/admin/counter", function(t) {
					var e, i;
					return i = o(".right-message-counter"), e = o(".notification-counter"), t.right > 0 ? (i.text(t.right), i.show()) : i.hide(), t.notification > 0 ? (e.text(t.notification), e.show(), t.async_notities > 0 ? toastr.success("\u62a5\u8868\u5df2\u5b8c\u6210\u5bfc\u51fa\uff0c\u8bf7\u5230\u6d88\u606f\u7ba1\u7406\u9875\u67e5\u770b\u548c\u4e0b\u8f7d\u3002") : void 0) : e.hide()
				})
			}, i.prototype.initialize = function() {
				return this.update_counter()
			}, i
		}(s.ItemView), l = function(e) {
			function i() {
				return i.__super__.constructor.apply(this, arguments)
			}
			return t(i, e), i.prototype.el = "#sidebar", i.prototype.initialize = function() {
				var t, e, i;
				return (i = /\/admin\/(.*)$/.exec(location.pathname)) ? (i = location.pathname.split("/"), i = i.slice(2), e = i.length > 2 ? i && i[0] || o.cookie("actived-menu") : 2 === i.length ? i && i[1] || o.cookie("actived-menu") : i && i[0] || o.cookie("actived-menu"), e && !location.pathname.match("admin$") ? (t = this.$("[data-name=" + e + "]"), t.addClass("actived"), this.menu_click(t.closest(".ui-menu").find(".ui-nav-main"))) : void 0) : void 0
			}, i.prototype.menu_click = function(t) {
				return t.find(".fold").toggleClass("icons-chevron-down").toggleClass("icons-chevron-up"), t.toggleClass("ui-close"), t.next().toggle()
			}, i.prototype.sub_menu_click = function(t) {
				var e, i, n;
				return e = o(t.target).closest("li"), i = e.data("name"), i && o.cookie("actived-menu", i), this.$(".ui-nav-sub>li").removeClass("actived"), e.closest(".ui-nav-sub>li").addClass("actived"), n = e.find("a").attr("href"), n ? location.replace(n) : void 0
			}, i.prototype.events = {
				"click .ui-nav-main": function(t) {
					var e;
					return e = o(t.target).closest(".ui-nav-main"), this.menu_click(e)
				},
				"click .ui-nav-sub>li": "sub_menu_click",
				"click .ui-nav-sub>li>a": "sub_menu_click"
			}, i
		}(s.ItemView), this.addInitializer(function() {
			return log.info("main module init"), new r, new l
		})
	})
}.call(this), $(function() {
	Cellar.start(), $(".datepicker").datepicker({
		language: "zh-CN",
		format: "yyyy-mm-dd"
	}), $(".selectpicker").selectpicker(), $(".idatepicker").each(function(t, e) {
		var i;
		i = $(e).data("limit-start"), $(e).datepicker({
			format: "yyyy\u5e74mm\u6708dd\u65e5",
			todayBtn: "linked",
			language: "zh-CN",
			autoclose: !0,
			startDate: i
		})
	})
});