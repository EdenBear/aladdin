angular.module("ui.bootstrap", ["ui.bootstrap.tpls", "ui.bootstrap.transition", "ui.bootstrap.collapse", "ui.bootstrap.accordion", "ui.bootstrap.alert", "ui.bootstrap.bindHtml", "ui.bootstrap.buttons", "ui.bootstrap.carousel", "ui.bootstrap.dateparser", "ui.bootstrap.position", "ui.bootstrap.datepicker", "ui.bootstrap.dropdown", "ui.bootstrap.modal", "ui.bootstrap.pagination", "ui.bootstrap.tooltip", "ui.bootstrap.popover", "ui.bootstrap.progressbar", "ui.bootstrap.rating", "ui.bootstrap.tabs", "ui.bootstrap.timepicker", "ui.bootstrap.typeahead"]), angular.module("ui.bootstrap.tpls", ["template/accordion/accordion-group.html", "template/accordion/accordion.html", "template/alert/alert.html", "template/carousel/carousel.html", "template/carousel/slide.html", "template/datepicker/datepicker.html", "template/datepicker/day.html", "template/datepicker/month.html", "template/datepicker/popup.html", "template/datepicker/year.html", "template/modal/backdrop.html", "template/modal/window.html", "template/pagination/pager.html", "template/pagination/pagination.html", "template/tooltip/tooltip-html-unsafe-popup.html", "template/tooltip/tooltip-popup.html", "template/popover/popover.html", "template/progressbar/bar.html", "template/progressbar/progress.html", "template/progressbar/progressbar.html", "template/rating/rating.html", "template/tabs/tab.html", "template/tabs/tabset.html", "template/timepicker/timepicker.html", "template/typeahead/typeahead-match.html", "template/typeahead/typeahead-popup.html"]), angular.module("ui.bootstrap.transition", []).factory("$transition", ["$q", "$timeout", "$rootScope",
	function(e, t, n) {
		function a(e) {
			for (var t in e)
				if (void 0 !== r.style[t]) return e[t]
		}
		var o = function(a, r, i) {
			i = i || {};
			var l = e.defer(),
				s = o[i.animation ? "animationEndEventName" : "transitionEndEventName"],
				d = function(e) {
					n.$apply(function() {
						a.unbind(s, d), l.resolve(a)
					})
				};
			return s && a.bind(s, d), t(function() {
				angular.isString(r) ? a.addClass(r) : angular.isFunction(r) ? r(a) : angular.isObject(r) && a.css(r), s || l.resolve(a)
			}), l.promise.cancel = function() {
				s && a.unbind(s, d), l.reject("Transition cancelled")
			}, l.promise
		}, r = document.createElement("trans"),
			i = {
				WebkitTransition: "webkitTransitionEnd",
				MozTransition: "transitionend",
				OTransition: "oTransitionEnd",
				transition: "transitionend"
			}, l = {
				WebkitTransition: "webkitAnimationEnd",
				MozTransition: "animationend",
				OTransition: "oAnimationEnd",
				transition: "animationend"
			};
		return o.transitionEndEventName = a(i), o.animationEndEventName = a(l), o
	}
]), angular.module("ui.bootstrap.collapse", ["ui.bootstrap.transition"]).directive("collapse", ["$transition",
	function(e) {
		return {
			link: function(t, n, a) {
				function o(t) {
					function a() {
						d === o && (d = void 0)
					}
					var o = e(n, t);
					return d && d.cancel(), d = o, o.then(a, a), o
				}

				function r() {
					c ? (c = !1, i()) : (n.removeClass("collapse").addClass("collapsing"), o({
						height: n[0].scrollHeight + "px"
					}).then(i))
				}

				function i() {
					n.removeClass("collapsing"), n.addClass("collapse in"), n.css({
						height: "auto"
					})
				}

				function l() {
					if (c) c = !1, s(), n.css({
						height: 0
					});
					else {
						n.css({
							height: n[0].scrollHeight + "px"
						});
						n[0].offsetWidth;
						n.removeClass("collapse in").addClass("collapsing"), o({
							height: 0
						}).then(s)
					}
				}

				function s() {
					n.removeClass("collapsing"), n.addClass("collapse")
				}
				var d, c = !0;
				t.$watch(a.collapse, function(e) {
					e ? l() : r()
				})
			}
		}
	}
]), angular.module("ui.bootstrap.accordion", ["ui.bootstrap.collapse"]).constant("accordionConfig", {
	closeOthers: !0
}).controller("AccordionController", ["$scope", "$attrs", "accordionConfig",
	function(e, t, n) {
		this.groups = [], this.closeOthers = function(a) {
			var o = angular.isDefined(t.closeOthers) ? e.$eval(t.closeOthers) : n.closeOthers;
			o && angular.forEach(this.groups, function(e) {
				e !== a && (e.isOpen = !1)
			})
		}, this.addGroup = function(e) {
			var t = this;
			this.groups.push(e), e.$on("$destroy", function(n) {
				t.removeGroup(e)
			})
		}, this.removeGroup = function(e) {
			var t = this.groups.indexOf(e); - 1 !== t && this.groups.splice(t, 1)
		}
	}
]).directive("accordion", function() {
	return {
		restrict: "EA",
		controller: "AccordionController",
		transclude: !0,
		replace: !1,
		templateUrl: "template/accordion/accordion.html"
	}
}).directive("accordionGroup", function() {
	return {
		require: "^accordion",
		restrict: "EA",
		transclude: !0,
		replace: !0,
		templateUrl: "template/accordion/accordion-group.html",
		scope: {
			heading: "@",
			isOpen: "=?",
			isDisabled: "=?"
		},
		controller: function() {
			this.setHeading = function(e) {
				this.heading = e
			}
		},
		link: function(e, t, n, a) {
			a.addGroup(e), e.$watch("isOpen", function(t) {
				t && a.closeOthers(e)
			}), e.toggleOpen = function() {
				e.isDisabled || (e.isOpen = !e.isOpen)
			}
		}
	}
}).directive("accordionHeading", function() {
	return {
		restrict: "EA",
		transclude: !0,
		template: "",
		replace: !0,
		require: "^accordionGroup",
		link: function(e, t, n, a, o) {
			a.setHeading(o(e, function() {}))
		}
	}
}).directive("accordionTransclude", function() {
	return {
		require: "^accordionGroup",
		link: function(e, t, n, a) {
			e.$watch(function() {
				return a[n.accordionTransclude]
			}, function(e) {
				e && (t.html(""), t.append(e))
			})
		}
	}
}), angular.module("ui.bootstrap.alert", []).controller("AlertController", ["$scope", "$attrs",
	function(e, t) {
		e.closeable = "close" in t, this.close = e.close
	}
]).directive("alert", function() {
	return {
		restrict: "EA",
		controller: "AlertController",
		templateUrl: "template/alert/alert.html",
		transclude: !0,
		replace: !0,
		scope: {
			type: "@",
			close: "&"
		}
	}
}).directive("dismissOnTimeout", ["$timeout",
	function(e) {
		return {
			require: "alert",
			link: function(t, n, a, o) {
				e(function() {
					o.close()
				}, parseInt(a.dismissOnTimeout, 10))
			}
		}
	}
]), angular.module("ui.bootstrap.bindHtml", []).directive("bindHtmlUnsafe", function() {
	return function(e, t, n) {
		t.addClass("ng-binding").data("$binding", n.bindHtmlUnsafe), e.$watch(n.bindHtmlUnsafe, function(e) {
			t.html(e || "")
		})
	}
}), angular.module("ui.bootstrap.buttons", []).constant("buttonConfig", {
	activeClass: "active",
	toggleEvent: "click"
}).controller("ButtonsController", ["buttonConfig",
	function(e) {
		this.activeClass = e.activeClass || "active", this.toggleEvent = e.toggleEvent || "click"
	}
]).directive("btnRadio", function() {
	return {
		require: ["btnRadio", "ngModel"],
		controller: "ButtonsController",
		link: function(e, t, n, a) {
			var o = a[0],
				r = a[1];
			r.$render = function() {
				t.toggleClass(o.activeClass, angular.equals(r.$modelValue, e.$eval(n.btnRadio)))
			}, t.bind(o.toggleEvent, function() {
				var a = t.hasClass(o.activeClass);
				(!a || angular.isDefined(n.uncheckable)) && e.$apply(function() {
					r.$setViewValue(a ? null : e.$eval(n.btnRadio)), r.$render()
				})
			})
		}
	}
}).directive("btnCheckbox", function() {
	return {
		require: ["btnCheckbox", "ngModel"],
		controller: "ButtonsController",
		link: function(e, t, n, a) {
			function o() {
				return i(n.btnCheckboxTrue, !0)
			}

			function r() {
				return i(n.btnCheckboxFalse, !1)
			}

			function i(t, n) {
				var a = e.$eval(t);
				return angular.isDefined(a) ? a : n
			}
			var l = a[0],
				s = a[1];
			s.$render = function() {
				t.toggleClass(l.activeClass, angular.equals(s.$modelValue, o()))
			}, t.bind(l.toggleEvent, function() {
				e.$apply(function() {
					s.$setViewValue(t.hasClass(l.activeClass) ? r() : o()), s.$render()
				})
			})
		}
	}
}), angular.module("ui.bootstrap.carousel", ["ui.bootstrap.transition"]).controller("CarouselController", ["$scope", "$timeout", "$interval", "$transition",
	function(e, t, n, a) {
		function o() {
			r();
			var t = +e.interval;
			!isNaN(t) && t > 0 && (l = n(i, t))
		}

		function r() {
			l && (n.cancel(l), l = null)
		}

		function i() {
			var t = +e.interval;
			s && !isNaN(t) && t > 0 ? e.next() : e.pause()
		}
		var l, s, d = this,
			c = d.slides = e.slides = [],
			u = -1;
		d.currentSlide = null;
		var p = !1;
		d.select = e.select = function(n, r) {
			function i() {
				if (!p) {
					if (d.currentSlide && angular.isString(r) && !e.noTransition && n.$element) {
						n.$element.addClass(r);
						n.$element[0].offsetWidth;
						angular.forEach(c, function(e) {
							angular.extend(e, {
								direction: "",
								entering: !1,
								leaving: !1,
								active: !1
							})
						}), angular.extend(n, {
							direction: r,
							active: !0,
							entering: !0
						}), angular.extend(d.currentSlide || {}, {
							direction: r,
							leaving: !0
						}), e.$currentTransition = a(n.$element, {}),
						function(t, n) {
							e.$currentTransition.then(function() {
								l(t, n)
							}, function() {
								l(t, n)
							})
						}(n, d.currentSlide)
					} else l(n, d.currentSlide);
					d.currentSlide = n, u = s, o()
				}
			}

			function l(t, n) {
				angular.extend(t, {
					direction: "",
					active: !0,
					leaving: !1,
					entering: !1
				}), angular.extend(n || {}, {
					direction: "",
					active: !1,
					leaving: !1,
					entering: !1
				}), e.$currentTransition = null
			}
			var s = c.indexOf(n);
			void 0 === r && (r = s > u ? "next" : "prev"), n && n !== d.currentSlide && (e.$currentTransition ? (e.$currentTransition.cancel(), t(i)) : i())
		}, e.$on("$destroy", function() {
			p = !0
		}), d.indexOfSlide = function(e) {
			return c.indexOf(e)
		}, e.next = function() {
			var t = (u + 1) % c.length;
			return e.$currentTransition ? void 0 : d.select(c[t], "next")
		}, e.prev = function() {
			var t = 0 > u - 1 ? c.length - 1 : u - 1;
			return e.$currentTransition ? void 0 : d.select(c[t], "prev")
		}, e.isActive = function(e) {
			return d.currentSlide === e
		}, e.$watch("interval", o), e.$on("$destroy", r), e.play = function() {
			s || (s = !0, o())
		}, e.pause = function() {
			e.noPause || (s = !1, r())
		}, d.addSlide = function(t, n) {
			t.$element = n, c.push(t), 1 === c.length || t.active ? (d.select(c[c.length - 1]), 1 == c.length && e.play()) : t.active = !1
		}, d.removeSlide = function(e) {
			var t = c.indexOf(e);
			c.splice(t, 1), c.length > 0 && e.active ? t >= c.length ? d.select(c[t - 1]) : d.select(c[t]) : u > t && u--
		}
	}
]).directive("carousel", [
	function() {
		return {
			restrict: "EA",
			transclude: !0,
			replace: !0,
			controller: "CarouselController",
			require: "carousel",
			templateUrl: "template/carousel/carousel.html",
			scope: {
				interval: "=",
				noTransition: "=",
				noPause: "="
			}
		}
	}
]).directive("slide", function() {
	return {
		require: "^carousel",
		restrict: "EA",
		transclude: !0,
		replace: !0,
		templateUrl: "template/carousel/slide.html",
		scope: {
			active: "=?"
		},
		link: function(e, t, n, a) {
			a.addSlide(e, t), e.$on("$destroy", function() {
				a.removeSlide(e)
			}), e.$watch("active", function(t) {
				t && a.select(e)
			})
		}
	}
}), angular.module("ui.bootstrap.dateparser", []).service("dateParser", ["$locale", "orderByFilter",
	function(e, t) {
		function n(e) {
			var n = [],
				a = e.split("");
			return angular.forEach(o, function(t, o) {
				var r = e.indexOf(o);
				if (r > -1) {
					e = e.split(""), a[r] = "(" + t.regex + ")", e[r] = "$";
					for (var i = r + 1, l = r + o.length; l > i; i++) a[i] = "", e[i] = "$";
					e = e.join(""), n.push({
						index: r,
						apply: t.apply
					})
				}
			}), {
				regex: new RegExp("^" + a.join("") + "$"),
				map: t(n, "index")
			}
		}

		function a(e, t, n) {
			return 1 === t && n > 28 ? 29 === n && (e % 4 === 0 && e % 100 !== 0 || e % 400 === 0) : 3 === t || 5 === t || 8 === t || 10 === t ? 31 > n : !0
		}
		this.parsers = {};
		var o = {
			yyyy: {
				regex: "\\d{4}",
				apply: function(e) {
					this.year = +e
				}
			},
			yy: {
				regex: "\\d{2}",
				apply: function(e) {
					this.year = +e + 2e3
				}
			},
			y: {
				regex: "\\d{1,4}",
				apply: function(e) {
					this.year = +e
				}
			},
			MMMM: {
				regex: e.DATETIME_FORMATS.MONTH.join("|"),
				apply: function(t) {
					this.month = e.DATETIME_FORMATS.MONTH.indexOf(t)
				}
			},
			MMM: {
				regex: e.DATETIME_FORMATS.SHORTMONTH.join("|"),
				apply: function(t) {
					this.month = e.DATETIME_FORMATS.SHORTMONTH.indexOf(t)
				}
			},
			MM: {
				regex: "0[1-9]|1[0-2]",
				apply: function(e) {
					this.month = e - 1
				}
			},
			M: {
				regex: "[1-9]|1[0-2]",
				apply: function(e) {
					this.month = e - 1
				}
			},
			dd: {
				regex: "[0-2][0-9]{1}|3[0-1]{1}",
				apply: function(e) {
					this.date = +e
				}
			},
			d: {
				regex: "[1-2]?[0-9]{1}|3[0-1]{1}",
				apply: function(e) {
					this.date = +e
				}
			},
			EEEE: {
				regex: e.DATETIME_FORMATS.DAY.join("|")
			},
			EEE: {
				regex: e.DATETIME_FORMATS.SHORTDAY.join("|")
			}
		};
		this.parse = function(t, o) {
			if (!angular.isString(t) || !o) return t;
			o = e.DATETIME_FORMATS[o] || o, this.parsers[o] || (this.parsers[o] = n(o));
			var r = this.parsers[o],
				i = r.regex,
				l = r.map,
				s = t.match(i);
			if (s && s.length) {
				for (var d, c = {
						year: 1900,
						month: 0,
						date: 1,
						hours: 0
					}, u = 1, p = s.length; p > u; u++) {
					var g = l[u - 1];
					g.apply && g.apply.call(c, s[u])
				}
				return a(c.year, c.month, c.date) && (d = new Date(c.year, c.month, c.date, c.hours)), d
			}
		}
	}
]), angular.module("ui.bootstrap.position", []).factory("$position", ["$document", "$window",
	function(e, t) {
		function n(e, n) {
			return e.currentStyle ? e.currentStyle[n] : t.getComputedStyle ? t.getComputedStyle(e)[n] : e.style[n]
		}

		function a(e) {
			return "static" === (n(e, "position") || "static")
		}
		var o = function(t) {
			for (var n = e[0], o = t.offsetParent || n; o && o !== n && a(o);) o = o.offsetParent;
			return o || n
		};
		return {
			position: function(t) {
				var n = this.offset(t),
					a = {
						top: 0,
						left: 0
					}, r = o(t[0]);
				r != e[0] && (a = this.offset(angular.element(r)), a.top += r.clientTop - r.scrollTop, a.left += r.clientLeft - r.scrollLeft);
				var i = t[0].getBoundingClientRect();
				return {
					width: i.width || t.prop("offsetWidth"),
					height: i.height || t.prop("offsetHeight"),
					top: n.top - a.top,
					left: n.left - a.left
				}
			},
			offset: function(n) {
				var a = n[0].getBoundingClientRect();
				return {
					width: a.width || n.prop("offsetWidth"),
					height: a.height || n.prop("offsetHeight"),
					top: a.top + (t.pageYOffset || e[0].documentElement.scrollTop),
					left: a.left + (t.pageXOffset || e[0].documentElement.scrollLeft)
				}
			},
			positionElements: function(e, t, n, a) {
				var o, r, i, l, s = n.split("-"),
					d = s[0],
					c = s[1] || "center";
				o = a ? this.offset(e) : this.position(e), r = t.prop("offsetWidth"), i = t.prop("offsetHeight");
				var u = {
					center: function() {
						return o.left + o.width / 2 - r / 2
					},
					left: function() {
						return o.left
					},
					right: function() {
						return o.left + o.width
					}
				}, p = {
						center: function() {
							return o.top + o.height / 2 - i / 2
						},
						top: function() {
							return o.top
						},
						bottom: function() {
							return o.top + o.height
						}
					};
				switch (d) {
					case "right":
						l = {
							top: p[c](),
							left: u[d]()
						};
						break;
					case "left":
						l = {
							top: p[c](),
							left: o.left - r
						};
						break;
					case "bottom":
						l = {
							top: p[d](),
							left: u[c]()
						};
						break;
					default:
						l = {
							top: o.top - i,
							left: u[c]()
						}
				}
				return l
			}
		}
	}
]), angular.module("ui.bootstrap.datepicker", ["ui.bootstrap.dateparser", "ui.bootstrap.position"]).constant("datepickerConfig", {
	formatDay: "dd",
	formatMonth: "MMMM",
	formatYear: "yyyy",
	formatDayHeader: "EEE",
	formatDayTitle: "MMMM yyyy",
	formatMonthTitle: "yyyy",
	datepickerMode: "day",
	minMode: "day",
	maxMode: "year",
	showWeeks: !0,
	startingDay: 0,
	yearRange: 20,
	minDate: null,
	maxDate: null
}).controller("DatepickerController", ["$scope", "$attrs", "$parse", "$interpolate", "$timeout", "$log", "dateFilter", "datepickerConfig",
	function(e, t, n, a, o, r, i, l) {
		var s = this,
			d = {
				$setViewValue: angular.noop
			};
		this.modes = ["day", "month", "year"], angular.forEach(["formatDay", "formatMonth", "formatYear", "formatDayHeader", "formatDayTitle", "formatMonthTitle", "minMode", "maxMode", "showWeeks", "startingDay", "yearRange"], function(n, o) {
			s[n] = angular.isDefined(t[n]) ? 8 > o ? a(t[n])(e.$parent) : e.$parent.$eval(t[n]) : l[n]
		}), angular.forEach(["minDate", "maxDate"], function(a) {
			t[a] ? e.$parent.$watch(n(t[a]), function(e) {
				s[a] = e ? new Date(e) : null, s.refreshView()
			}) : s[a] = l[a] ? new Date(l[a]) : null
		}), e.datepickerMode = e.datepickerMode || l.datepickerMode, e.uniqueId = "datepicker-" + e.$id + "-" + Math.floor(1e4 * Math.random()), this.activeDate = angular.isDefined(t.initDate) ? e.$parent.$eval(t.initDate) : new Date, e.isActive = function(t) {
			return 0 === s.compare(t.date, s.activeDate) ? (e.activeDateId = t.uid, !0) : !1
		}, this.init = function(e) {
			d = e, d.$render = function() {
				s.render()
			}
		}, this.render = function() {
			if (d.$modelValue) {
				var e = new Date(d.$modelValue),
					t = !isNaN(e);
				t ? this.activeDate = e : r.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.'), d.$setValidity("date", t)
			}
			this.refreshView()
		}, this.refreshView = function() {
			if (this.element) {
				this._refreshView();
				var e = d.$modelValue ? new Date(d.$modelValue) : null;
				d.$setValidity("date-disabled", !e || this.element && !this.isDisabled(e))
			}
		}, this.createDateObject = function(e, t) {
			var n = d.$modelValue ? new Date(d.$modelValue) : null;
			return {
				date: e,
				label: i(e, t),
				selected: n && 0 === this.compare(e, n),
				disabled: this.isDisabled(e),
				current: 0 === this.compare(e, new Date)
			}
		}, this.isDisabled = function(n) {
			return this.minDate && this.compare(n, this.minDate) < 0 || this.maxDate && this.compare(n, this.maxDate) > 0 || t.dateDisabled && e.dateDisabled({
				date: n,
				mode: e.datepickerMode
			})
		}, this.split = function(e, t) {
			for (var n = []; e.length > 0;) n.push(e.splice(0, t));
			return n
		}, e.select = function(t) {
			if (e.datepickerMode === s.minMode) {
				var n = d.$modelValue ? new Date(d.$modelValue) : new Date(0, 0, 0, 0, 0, 0, 0);
				n.setFullYear(t.getFullYear(), t.getMonth(), t.getDate()), d.$setViewValue(n), d.$render()
			} else s.activeDate = t, e.datepickerMode = s.modes[s.modes.indexOf(e.datepickerMode) - 1]
		}, e.move = function(e) {
			var t = s.activeDate.getFullYear() + e * (s.step.years || 0),
				n = s.activeDate.getMonth() + e * (s.step.months || 0);
			s.activeDate.setFullYear(t, n, 1), s.refreshView()
		}, e.toggleMode = function(t) {
			t = t || 1, e.datepickerMode === s.maxMode && 1 === t || e.datepickerMode === s.minMode && -1 === t || (e.datepickerMode = s.modes[s.modes.indexOf(e.datepickerMode) + t])
		}, e.keys = {
			13: "enter",
			32: "space",
			33: "pageup",
			34: "pagedown",
			35: "end",
			36: "home",
			37: "left",
			38: "up",
			39: "right",
			40: "down"
		};
		var c = function() {
			o(function() {
				s.element[0].focus()
			}, 0, !1)
		};
		e.$on("datepicker.focus", c), e.keydown = function(t) {
			var n = e.keys[t.which];
			if (n && !t.shiftKey && !t.altKey)
				if (t.preventDefault(), t.stopPropagation(), "enter" === n || "space" === n) {
					if (s.isDisabled(s.activeDate)) return;
					e.select(s.activeDate), c()
				} else !t.ctrlKey || "up" !== n && "down" !== n ? (s.handleKeyDown(n, t), s.refreshView()) : (e.toggleMode("up" === n ? 1 : -1), c())
		}
	}
]).directive("datepicker", function() {
	return {
		restrict: "EA",
		replace: !0,
		templateUrl: "template/datepicker/datepicker.html",
		scope: {
			datepickerMode: "=?",
			dateDisabled: "&"
		},
		require: ["datepicker", "?^ngModel"],
		controller: "DatepickerController",
		link: function(e, t, n, a) {
			var o = a[0],
				r = a[1];
			r && o.init(r)
		}
	}
}).directive("daypicker", ["dateFilter",
	function(e) {
		return {
			restrict: "EA",
			replace: !0,
			templateUrl: "template/datepicker/day.html",
			require: "^datepicker",
			link: function(t, n, a, o) {
				function r(e, t) {
					return 1 !== t || e % 4 !== 0 || e % 100 === 0 && e % 400 !== 0 ? s[t] : 29
				}

				function i(e, t) {
					var n = new Array(t),
						a = new Date(e),
						o = 0;
					for (a.setHours(12); t > o;) n[o++] = new Date(a), a.setDate(a.getDate() + 1);
					return n
				}

				function l(e) {
					var t = new Date(e);
					t.setDate(t.getDate() + 4 - (t.getDay() || 7));
					var n = t.getTime();
					return t.setMonth(0), t.setDate(1), Math.floor(Math.round((n - t) / 864e5) / 7) + 1
				}
				t.showWeeks = o.showWeeks, o.step = {
					months: 1
				}, o.element = n;
				var s = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
				o._refreshView = function() {
					var n = o.activeDate.getFullYear(),
						a = o.activeDate.getMonth(),
						r = new Date(n, a, 1),
						s = o.startingDay - r.getDay(),
						d = s > 0 ? 7 - s : -s,
						c = new Date(r);
					d > 0 && c.setDate(-d + 1);
					for (var u = i(c, 42), p = 0; 42 > p; p++) u[p] = angular.extend(o.createDateObject(u[p], o.formatDay), {
						secondary: u[p].getMonth() !== a,
						uid: t.uniqueId + "-" + p
					});
					t.labels = new Array(7);
					for (var g = 0; 7 > g; g++) t.labels[g] = {
						abbr: e(u[g].date, o.formatDayHeader),
						full: e(u[g].date, "EEEE")
					};
					if (t.title = e(o.activeDate, o.formatDayTitle), t.rows = o.split(u, 7), t.showWeeks) {
						t.weekNumbers = [];
						for (var f = l(t.rows[0][0].date), h = t.rows.length; t.weekNumbers.push(f++) < h;);
					}
				}, o.compare = function(e, t) {
					return new Date(e.getFullYear(), e.getMonth(), e.getDate()) - new Date(t.getFullYear(), t.getMonth(), t.getDate())
				}, o.handleKeyDown = function(e, t) {
					var n = o.activeDate.getDate();
					if ("left" === e) n -= 1;
					else if ("up" === e) n -= 7;
					else if ("right" === e) n += 1;
					else if ("down" === e) n += 7;
					else if ("pageup" === e || "pagedown" === e) {
						var a = o.activeDate.getMonth() + ("pageup" === e ? -1 : 1);
						o.activeDate.setMonth(a, 1), n = Math.min(r(o.activeDate.getFullYear(), o.activeDate.getMonth()), n)
					} else "home" === e ? n = 1 : "end" === e && (n = r(o.activeDate.getFullYear(), o.activeDate.getMonth()));
					o.activeDate.setDate(n)
				}, o.refreshView()
			}
		}
	}
]).directive("monthpicker", ["dateFilter",
	function(e) {
		return {
			restrict: "EA",
			replace: !0,
			templateUrl: "template/datepicker/month.html",
			require: "^datepicker",
			link: function(t, n, a, o) {
				o.step = {
					years: 1
				}, o.element = n, o._refreshView = function() {
					for (var n = new Array(12), a = o.activeDate.getFullYear(), r = 0; 12 > r; r++) n[r] = angular.extend(o.createDateObject(new Date(a, r, 1), o.formatMonth), {
						uid: t.uniqueId + "-" + r
					});
					t.title = e(o.activeDate, o.formatMonthTitle), t.rows = o.split(n, 3)
				}, o.compare = function(e, t) {
					return new Date(e.getFullYear(), e.getMonth()) - new Date(t.getFullYear(), t.getMonth())
				}, o.handleKeyDown = function(e, t) {
					var n = o.activeDate.getMonth();
					if ("left" === e) n -= 1;
					else if ("up" === e) n -= 3;
					else if ("right" === e) n += 1;
					else if ("down" === e) n += 3;
					else if ("pageup" === e || "pagedown" === e) {
						var a = o.activeDate.getFullYear() + ("pageup" === e ? -1 : 1);
						o.activeDate.setFullYear(a)
					} else "home" === e ? n = 0 : "end" === e && (n = 11);
					o.activeDate.setMonth(n)
				}, o.refreshView()
			}
		}
	}
]).directive("yearpicker", ["dateFilter",
	function(e) {
		return {
			restrict: "EA",
			replace: !0,
			templateUrl: "template/datepicker/year.html",
			require: "^datepicker",
			link: function(e, t, n, a) {
				function o(e) {
					return parseInt((e - 1) / r, 10) * r + 1
				}
				var r = a.yearRange;
				a.step = {
					years: r
				}, a.element = t, a._refreshView = function() {
					for (var t = new Array(r), n = 0, i = o(a.activeDate.getFullYear()); r > n; n++) t[n] = angular.extend(a.createDateObject(new Date(i + n, 0, 1), a.formatYear), {
						uid: e.uniqueId + "-" + n
					});
					e.title = [t[0].label, t[r - 1].label].join(" - "), e.rows = a.split(t, 5)
				}, a.compare = function(e, t) {
					return e.getFullYear() - t.getFullYear()
				}, a.handleKeyDown = function(e, t) {
					var n = a.activeDate.getFullYear();
					"left" === e ? n -= 1 : "up" === e ? n -= 5 : "right" === e ? n += 1 : "down" === e ? n += 5 : "pageup" === e || "pagedown" === e ? n += ("pageup" === e ? -1 : 1) * a.step.years : "home" === e ? n = o(a.activeDate.getFullYear()) : "end" === e && (n = o(a.activeDate.getFullYear()) + r - 1), a.activeDate.setFullYear(n)
				}, a.refreshView()
			}
		}
	}
]).constant("datepickerPopupConfig", {
	datepickerPopup: "yyyy-MM-dd",
	currentText: "Today",
	clearText: "Clear",
	closeText: "Done",
	closeOnDateSelection: !0,
	appendToBody: !1,
	showButtonBar: !0
}).directive("datepickerPopup", ["$compile", "$parse", "$document", "$position", "dateFilter", "dateParser", "datepickerPopupConfig",
	function(e, t, n, a, o, r, i) {
		return {
			restrict: "EA",
			require: "ngModel",
			scope: {
				isOpen: "=?",
				currentText: "@",
				clearText: "@",
				closeText: "@",
				dateDisabled: "&"
			},
			link: function(l, s, d, c) {
				function u(e) {
					return e.replace(/([A-Z])/g, function(e) {
						return "-" + e.toLowerCase()
					})
				}

				function p(e) {
					if (e) {
						if (angular.isDate(e) && !isNaN(e)) return c.$setValidity("date", !0), e;
						if (angular.isString(e)) {
							var t = r.parse(e, g) || new Date(e);
							return isNaN(t) ? void c.$setValidity("date", !1) : (c.$setValidity("date", !0), t)
						}
						return void c.$setValidity("date", !1)
					}
					return c.$setValidity("date", !0), null
				}
				var g, f = angular.isDefined(d.closeOnDateSelection) ? l.$parent.$eval(d.closeOnDateSelection) : i.closeOnDateSelection,
					h = angular.isDefined(d.datepickerAppendToBody) ? l.$parent.$eval(d.datepickerAppendToBody) : i.appendToBody;
				l.showButtonBar = angular.isDefined(d.showButtonBar) ? l.$parent.$eval(d.showButtonBar) : i.showButtonBar, l.getText = function(e) {
					return l[e + "Text"] || i[e + "Text"]
				}, d.$observe("datepickerPopup", function(e) {
					g = e || i.datepickerPopup, c.$render()
				});
				var m = angular.element("<div datepicker-popup-wrap><div datepicker></div></div>");
				m.attr({
					"ng-model": "date",
					"ng-change": "dateSelection()"
				});
				var v = angular.element(m.children()[0]);
				d.datepickerOptions && angular.forEach(l.$parent.$eval(d.datepickerOptions), function(e, t) {
					v.attr(u(t), e)
				}), l.watchData = {}, angular.forEach(["minDate", "maxDate", "datepickerMode"], function(e) {
					if (d[e]) {
						var n = t(d[e]);
						if (l.$parent.$watch(n, function(t) {
							l.watchData[e] = t
						}), v.attr(u(e), "watchData." + e), "datepickerMode" === e) {
							var a = n.assign;
							l.$watch("watchData." + e, function(e, t) {
								e !== t && a(l.$parent, e)
							})
						}
					}
				}), d.dateDisabled && v.attr("date-disabled", "dateDisabled({ date: date, mode: mode })"), c.$parsers.unshift(p), l.dateSelection = function(e) {
					angular.isDefined(e) && (l.date = e), c.$setViewValue(l.date), c.$render(), f && (l.isOpen = !1, s[0].focus())
				}, s.bind("input change keyup", function() {
					l.$apply(function() {
						l.date = c.$modelValue
					})
				}), c.$render = function() {
					var e = c.$viewValue ? o(c.$viewValue, g) : "";
					s.val(e), l.date = p(c.$modelValue)
				};
				var b = function(e) {
					l.isOpen && e.target !== s[0] && l.$apply(function() {
						l.isOpen = !1
					})
				}, k = function(e, t) {
						l.keydown(e)
					};
				s.bind("keydown", k), l.keydown = function(e) {
					27 === e.which ? (e.preventDefault(), e.stopPropagation(), l.close()) : 40 !== e.which || l.isOpen || (l.isOpen = !0)
				}, l.$watch("isOpen", function(e) {
					e ? (l.$broadcast("datepicker.focus"), l.position = h ? a.offset(s) : a.position(s), l.position.top = l.position.top + s.prop("offsetHeight"), n.bind("click", b)) : n.unbind("click", b)
				}), l.select = function(e) {
					if ("today" === e) {
						var t = new Date;
						angular.isDate(c.$modelValue) ? (e = new Date(c.$modelValue), e.setFullYear(t.getFullYear(), t.getMonth(), t.getDate())) : e = new Date(t.setHours(0, 0, 0, 0))
					}
					l.dateSelection(e)
				}, l.close = function() {
					l.isOpen = !1, s[0].focus()
				};
				var y = e(m)(l);
				m.remove(), h ? n.find("body").append(y) : s.after(y), l.$on("$destroy", function() {
					y.remove(), s.unbind("keydown", k), n.unbind("click", b)
				})
			}
		}
	}
]).directive("datepickerPopupWrap", function() {
	return {
		restrict: "EA",
		replace: !0,
		transclude: !0,
		templateUrl: "template/datepicker/popup.html",
		link: function(e, t, n) {
			t.bind("click", function(e) {
				e.preventDefault(), e.stopPropagation()
			})
		}
	}
}), angular.module("ui.bootstrap.dropdown", []).constant("dropdownConfig", {
	openClass: "open"
}).service("dropdownService", ["$document",
	function(e) {
		var t = null;
		this.open = function(o) {
			t || (e.bind("click", n), e.bind("keydown", a)), t && t !== o && (t.isOpen = !1), t = o
		}, this.close = function(o) {
			t === o && (t = null, e.unbind("click", n), e.unbind("keydown", a))
		};
		var n = function(e) {
			if (t) {
				var n = t.getToggleElement();
				e && n && n[0].contains(e.target) || t.$apply(function() {
					t.isOpen = !1
				})
			}
		}, a = function(e) {
				27 === e.which && (t.focusToggleElement(), n())
			}
	}
]).controller("DropdownController", ["$scope", "$attrs", "$parse", "dropdownConfig", "dropdownService", "$animate",
	function(e, t, n, a, o, r) {
		var i, l = this,
			s = e.$new(),
			d = a.openClass,
			c = angular.noop,
			u = t.onToggle ? n(t.onToggle) : angular.noop;
		this.init = function(a) {
			l.$element = a, t.isOpen && (i = n(t.isOpen), c = i.assign, e.$watch(i, function(e) {
				s.isOpen = !! e
			}))
		}, this.toggle = function(e) {
			return s.isOpen = arguments.length ? !! e : !s.isOpen
		}, this.isOpen = function() {
			return s.isOpen
		}, s.getToggleElement = function() {
			return l.toggleElement
		}, s.focusToggleElement = function() {
			l.toggleElement && l.toggleElement[0].focus()
		}, s.$watch("isOpen", function(t, n) {
			r[t ? "addClass" : "removeClass"](l.$element, d), t ? (s.focusToggleElement(), o.open(s)) : o.close(s), c(e, t), angular.isDefined(t) && t !== n && u(e, {
				open: !! t
			})
		}), e.$on("$locationChangeSuccess", function() {
			s.isOpen = !1
		}), e.$on("$destroy", function() {
			s.$destroy()
		})
	}
]).directive("dropdown", function() {
	return {
		controller: "DropdownController",
		link: function(e, t, n, a) {
			a.init(t)
		}
	}
}).directive("dropdownToggle", function() {
	return {
		require: "?^dropdown",
		link: function(e, t, n, a) {
			if (a) {
				a.toggleElement = t;
				var o = function(o) {
					o.preventDefault(), t.hasClass("disabled") || n.disabled || e.$apply(function() {
						a.toggle()
					})
				};
				t.bind("click", o), t.attr({
					"aria-haspopup": !0,
					"aria-expanded": !1
				}), e.$watch(a.isOpen, function(e) {
					t.attr("aria-expanded", !! e)
				}), e.$on("$destroy", function() {
					t.unbind("click", o)
				})
			}
		}
	}
}), angular.module("ui.bootstrap.modal", ["ui.bootstrap.transition"]).factory("$$stackedMap", function() {
	return {
		createNew: function() {
			var e = [];
			return {
				add: function(t, n) {
					e.push({
						key: t,
						value: n
					})
				},
				get: function(t) {
					for (var n = 0; n < e.length; n++)
						if (t == e[n].key) return e[n]
				},
				keys: function() {
					for (var t = [], n = 0; n < e.length; n++) t.push(e[n].key);
					return t
				},
				top: function() {
					return e[e.length - 1]
				},
				remove: function(t) {
					for (var n = -1, a = 0; a < e.length; a++)
						if (t == e[a].key) {
							n = a;
							break
						}
					return e.splice(n, 1)[0]
				},
				removeTop: function() {
					return e.splice(e.length - 1, 1)[0]
				},
				length: function() {
					return e.length
				}
			}
		}
	}
}).directive("modalBackdrop", ["$timeout",
	function(e) {
		return {
			restrict: "EA",
			replace: !0,
			templateUrl: "template/modal/backdrop.html",
			link: function(t, n, a) {
				t.backdropClass = a.backdropClass || "", t.animate = !1, e(function() {
					t.animate = !0
				})
			}
		}
	}
]).directive("modalWindow", ["$modalStack", "$timeout",
	function(e, t) {
		return {
			restrict: "EA",
			scope: {
				index: "@",
				animate: "="
			},
			replace: !0,
			transclude: !0,
			templateUrl: function(e, t) {
				return t.templateUrl || "template/modal/window.html"
			},
			link: function(n, a, o) {
				a.addClass(o.windowClass || ""), n.size = o.size, t(function() {
					n.animate = !0, a[0].querySelectorAll("[autofocus]").length || a[0].focus()
				}), n.close = function(t) {
					var n = e.getTop();
					n && n.value.backdrop && "static" != n.value.backdrop && t.target === t.currentTarget && (t.preventDefault(), t.stopPropagation(), e.dismiss(n.key, "backdrop click"))
				}
			}
		}
	}
]).directive("modalTransclude", function() {
	return {
		link: function(e, t, n, a, o) {
			o(e.$parent, function(e) {
				t.empty(), t.append(e)
			})
		}
	}
}).factory("$modalStack", ["$transition", "$timeout", "$document", "$compile", "$rootScope", "$$stackedMap",
	function(e, t, n, a, o, r) {
		function i() {
			for (var e = -1, t = g.keys(), n = 0; n < t.length; n++) g.get(t[n]).value.backdrop && (e = n);
			return e
		}

		function l(e) {
			var t = n.find("body").eq(0),
				a = g.get(e).value;
			g.remove(e), d(a.modalDomEl, a.modalScope, 300, function() {
				a.modalScope.$destroy(), t.toggleClass(p, g.length() > 0), s()
			})
		}

		function s() {
			if (c && -1 == i()) {
				var e = u;
				d(c, u, 150, function() {
					e.$destroy(), e = null
				}), c = void 0, u = void 0
			}
		}

		function d(n, a, o, r) {
			function i() {
				i.done || (i.done = !0, n.remove(), r && r())
			}
			a.animate = !1;
			var l = e.transitionEndEventName;
			if (l) {
				var s = t(i, o);
				n.bind(l, function() {
					t.cancel(s), i(), a.$apply()
				})
			} else t(i)
		}
		var c, u, p = "modal-open",
			g = r.createNew(),
			f = {};
		return o.$watch(i, function(e) {
			u && (u.index = e)
		}), n.bind("keydown", function(e) {
			var t;
			27 === e.which && (t = g.top(), t && t.value.keyboard && (e.preventDefault(), o.$apply(function() {
				f.dismiss(t.key, "escape key press")
			})))
		}), f.open = function(e, t) {
			g.add(e, {
				deferred: t.deferred,
				modalScope: t.scope,
				backdrop: t.backdrop,
				keyboard: t.keyboard
			});
			var r = n.find("body").eq(0),
				l = i();
			if (l >= 0 && !c) {
				u = o.$new(!0), u.index = l;
				var s = angular.element("<div modal-backdrop></div>");
				s.attr("backdrop-class", t.backdropClass), c = a(s)(u), r.append(c)
			}
			var d = angular.element("<div modal-window></div>");
			d.attr({
				"template-url": t.windowTemplateUrl,
				"window-class": t.windowClass,
				size: t.size,
				index: g.length() - 1,
				animate: "animate"
			}).html(t.content);
			var f = a(d)(t.scope);
			g.top().value.modalDomEl = f, r.append(f), r.addClass(p)
		}, f.close = function(e, t) {
			var n = g.get(e);
			n && (n.value.deferred.resolve(t), l(e))
		}, f.dismiss = function(e, t) {
			var n = g.get(e);
			n && (n.value.deferred.reject(t), l(e))
		}, f.dismissAll = function(e) {
			for (var t = this.getTop(); t;) this.dismiss(t.key, e), t = this.getTop()
		}, f.getTop = function() {
			return g.top()
		}, f
	}
]).provider("$modal", function() {
	var e = {
		options: {
			backdrop: !0,
			keyboard: !0
		},
		$get: ["$injector", "$rootScope", "$q", "$http", "$templateCache", "$controller", "$modalStack",
			function(t, n, a, o, r, i, l) {
				function s(e) {
					return e.template ? a.when(e.template) : o.get(angular.isFunction(e.templateUrl) ? e.templateUrl() : e.templateUrl, {
						cache: r
					}).then(function(e) {
						return e.data
					})
				}

				function d(e) {
					var n = [];
					return angular.forEach(e, function(e) {
						(angular.isFunction(e) || angular.isArray(e)) && n.push(a.when(t.invoke(e)))
					}), n
				}
				var c = {};
				return c.open = function(t) {
					var o = a.defer(),
						r = a.defer(),
						c = {
							result: o.promise,
							opened: r.promise,
							close: function(e) {
								l.close(c, e)
							},
							dismiss: function(e) {
								l.dismiss(c, e)
							}
						};
					if (t = angular.extend({}, e.options, t), t.resolve = t.resolve || {}, !t.template && !t.templateUrl) throw new Error("One of template or templateUrl options is required.");
					var u = a.all([s(t)].concat(d(t.resolve)));
					return u.then(function(e) {
						var a = (t.scope || n).$new();
						a.$close = c.close, a.$dismiss = c.dismiss;
						var r, s = {}, d = 1;
						t.controller && (s.$scope = a, s.$modalInstance = c, angular.forEach(t.resolve, function(t, n) {
							s[n] = e[d++]
						}), r = i(t.controller, s), t.controllerAs && (a[t.controllerAs] = r)), l.open(c, {
							scope: a,
							deferred: o,
							content: e[0],
							backdrop: t.backdrop,
							keyboard: t.keyboard,
							backdropClass: t.backdropClass,
							windowClass: t.windowClass,
							windowTemplateUrl: t.windowTemplateUrl,
							size: t.size
						})
					}, function(e) {
						o.reject(e)
					}), u.then(function() {
						r.resolve(!0)
					}, function() {
						r.reject(!1)
					}), c
				}, c
			}
		]
	};
	return e
}), angular.module("ui.bootstrap.pagination", []).controller("PaginationController", ["$scope", "$attrs", "$parse",
	function(e, t, n) {
		var a = this,
			o = {
				$setViewValue: angular.noop
			}, r = t.numPages ? n(t.numPages).assign : angular.noop;
		this.init = function(r, i) {
			o = r, this.config = i, o.$render = function() {
				a.render()
			}, t.itemsPerPage ? e.$parent.$watch(n(t.itemsPerPage), function(t) {
				a.itemsPerPage = parseInt(t, 10), e.totalPages = a.calculateTotalPages()
			}) : this.itemsPerPage = i.itemsPerPage
		}, this.calculateTotalPages = function() {
			var t = this.itemsPerPage < 1 ? 1 : Math.ceil(e.totalItems / this.itemsPerPage);
			return Math.max(t || 0, 1)
		}, this.render = function() {
			e.page = parseInt(o.$viewValue, 10) || 1
		}, e.selectPage = function(t) {
			e.page !== t && t > 0 && t <= e.totalPages && (o.$setViewValue(t), o.$render())
		}, e.getText = function(t) {
			return e[t + "Text"] || a.config[t + "Text"]
		}, e.noPrevious = function() {
			return 1 === e.page
		}, e.noNext = function() {
			return e.page === e.totalPages
		}, e.$watch("totalItems", function() {
			e.totalPages = a.calculateTotalPages()
		}), e.$watch("totalPages", function(t) {
			r(e.$parent, t), e.page > t ? e.selectPage(t) : o.$render()
		})
	}
]).constant("paginationConfig", {
	itemsPerPage: 10,
	boundaryLinks: !1,
	directionLinks: !0,
	firstText: "First",
	previousText: "Previous",
	nextText: "Next",
	lastText: "Last",
	rotate: !0
}).directive("pagination", ["$parse", "paginationConfig",
	function(e, t) {
		return {
			restrict: "EA",
			scope: {
				totalItems: "=",
				firstText: "@",
				previousText: "@",
				nextText: "@",
				lastText: "@"
			},
			require: ["pagination", "?ngModel"],
			controller: "PaginationController",
			templateUrl: "template/pagination/pagination.html",
			replace: !0,
			link: function(n, a, o, r) {
				function i(e, t, n) {
					return {
						number: e,
						text: t,
						active: n
					}
				}

				function l(e, t) {
					var n = [],
						a = 1,
						o = t,
						r = angular.isDefined(c) && t > c;
					r && (u ? (a = Math.max(e - Math.floor(c / 2), 1), o = a + c - 1, o > t && (o = t, a = o - c + 1)) : (a = (Math.ceil(e / c) - 1) * c + 1, o = Math.min(a + c - 1, t)));
					for (var l = a; o >= l; l++) {
						var s = i(l, l, l === e);
						n.push(s)
					}
					if (r && !u) {
						if (a > 1) {
							var d = i(a - 1, "...", !1);
							n.unshift(d)
						}
						if (t > o) {
							var p = i(o + 1, "...", !1);
							n.push(p)
						}
					}
					return n
				}
				var s = r[0],
					d = r[1];
				if (d) {
					var c = angular.isDefined(o.maxSize) ? n.$parent.$eval(o.maxSize) : t.maxSize,
						u = angular.isDefined(o.rotate) ? n.$parent.$eval(o.rotate) : t.rotate;
					n.boundaryLinks = angular.isDefined(o.boundaryLinks) ? n.$parent.$eval(o.boundaryLinks) : t.boundaryLinks, n.directionLinks = angular.isDefined(o.directionLinks) ? n.$parent.$eval(o.directionLinks) : t.directionLinks, s.init(d, t), o.maxSize && n.$parent.$watch(e(o.maxSize), function(e) {
						c = parseInt(e, 10), s.render()
					});
					var p = s.render;
					s.render = function() {
						p(), n.page > 0 && n.page <= n.totalPages && (n.pages = l(n.page, n.totalPages))
					}
				}
			}
		}
	}
]).constant("pagerConfig", {
	itemsPerPage: 10,
	previousText: "\xab Previous",
	nextText: "Next \xbb",
	align: !0
}).directive("pager", ["pagerConfig",
	function(e) {
		return {
			restrict: "EA",
			scope: {
				totalItems: "=",
				previousText: "@",
				nextText: "@"
			},
			require: ["pager", "?ngModel"],
			controller: "PaginationController",
			templateUrl: "template/pagination/pager.html",
			replace: !0,
			link: function(t, n, a, o) {
				var r = o[0],
					i = o[1];
				i && (t.align = angular.isDefined(a.align) ? t.$parent.$eval(a.align) : e.align,
					r.init(i, e))
			}
		}
	}
]), angular.module("ui.bootstrap.tooltip", ["ui.bootstrap.position", "ui.bootstrap.bindHtml"]).provider("$tooltip", function() {
	function e(e) {
		var t = /[A-Z]/g,
			n = "-";
		return e.replace(t, function(e, t) {
			return (t ? n : "") + e.toLowerCase()
		})
	}
	var t = {
		placement: "top",
		animation: !0,
		popupDelay: 0
	}, n = {
			mouseenter: "mouseleave",
			click: "click",
			focus: "blur"
		}, a = {};
	this.options = function(e) {
		angular.extend(a, e)
	}, this.setTriggers = function(e) {
		angular.extend(n, e)
	}, this.$get = ["$window", "$compile", "$timeout", "$document", "$position", "$interpolate",
		function(o, r, i, l, s, d) {
			return function(o, c, u) {
				function p(e) {
					var t = e || g.trigger || u,
						a = n[t] || t;
					return {
						show: t,
						hide: a
					}
				}
				var g = angular.extend({}, t, a),
					f = e(o),
					h = d.startSymbol(),
					m = d.endSymbol(),
					v = "<div " + f + '-popup title="' + h + "title" + m + '" content="' + h + "content" + m + '" placement="' + h + "placement" + m + '" animation="animation" is-open="isOpen"></div>';
				return {
					restrict: "EA",
					compile: function(e, t) {
						var n = r(v);
						return function(e, t, a) {
							function r() {
								x.isOpen ? u() : d()
							}

							function d() {
								(!I || e.$eval(a[c + "Enable"])) && (b(), x.popupDelay ? $ || ($ = i(f, x.popupDelay, !1), $.then(function(e) {
									e()
								})) : f()())
							}

							function u() {
								e.$apply(function() {
									h()
								})
							}

							function f() {
								return $ = null, T && (i.cancel(T), T = null), x.content ? (m(), C.css({
									top: 0,
									left: 0,
									display: "block"
								}), x.$digest(), S(), x.isOpen = !0, x.$digest(), S) : angular.noop
							}

							function h() {
								x.isOpen = !1, i.cancel($), $ = null, x.animation ? T || (T = i(v, 500)) : v()
							}

							function m() {
								C && v(), w = x.$new(), C = n(w, function(e) {
									E ? l.find("body").append(e) : t.after(e)
								})
							}

							function v() {
								T = null, C && (C.remove(), C = null), w && (w.$destroy(), w = null)
							}

							function b() {
								k(), y()
							}

							function k() {
								var e = a[c + "Placement"];
								x.placement = angular.isDefined(e) ? e : g.placement
							}

							function y() {
								var e = a[c + "PopupDelay"],
									t = parseInt(e, 10);
								x.popupDelay = isNaN(t) ? g.popupDelay : t
							}

							function N() {
								var e = a[c + "Trigger"];
								O(), D = p(e), D.show === D.hide ? t.bind(D.show, r) : (t.bind(D.show, d), t.bind(D.hide, u))
							}
							var C, w, T, $, E = angular.isDefined(g.appendToBody) ? g.appendToBody : !1,
								D = p(void 0),
								I = angular.isDefined(a[c + "Enable"]),
								x = e.$new(!0),
								S = function() {
									var e = s.positionElements(t, C, x.placement, E);
									e.top += "px", e.left += "px", C.css(e)
								};
							x.isOpen = !1, a.$observe(o, function(e) {
								x.content = e, !e && x.isOpen && h()
							}), a.$observe(c + "Title", function(e) {
								x.title = e
							});
							var O = function() {
								t.unbind(D.show, d), t.unbind(D.hide, u)
							};
							N();
							var P = e.$eval(a[c + "Animation"]);
							x.animation = angular.isDefined(P) ? !! P : g.animation;
							var M = e.$eval(a[c + "AppendToBody"]);
							E = angular.isDefined(M) ? M : E, E && e.$on("$locationChangeSuccess", function() {
								x.isOpen && h()
							}), e.$on("$destroy", function() {
								i.cancel(T), i.cancel($), O(), v(), x = null
							})
						}
					}
				}
			}
		}
	]
}).directive("tooltipPopup", function() {
	return {
		restrict: "EA",
		replace: !0,
		scope: {
			content: "@",
			placement: "@",
			animation: "&",
			isOpen: "&"
		},
		templateUrl: "template/tooltip/tooltip-popup.html"
	}
}).directive("tooltip", ["$tooltip",
	function(e) {
		return e("tooltip", "tooltip", "mouseenter")
	}
]).directive("tooltipHtmlUnsafePopup", function() {
	return {
		restrict: "EA",
		replace: !0,
		scope: {
			content: "@",
			placement: "@",
			animation: "&",
			isOpen: "&"
		},
		templateUrl: "template/tooltip/tooltip-html-unsafe-popup.html"
	}
}).directive("tooltipHtmlUnsafe", ["$tooltip",
	function(e) {
		return e("tooltipHtmlUnsafe", "tooltip", "mouseenter")
	}
]), angular.module("ui.bootstrap.popover", ["ui.bootstrap.tooltip"]).directive("popoverPopup", function() {
	return {
		restrict: "EA",
		replace: !0,
		scope: {
			title: "@",
			content: "@",
			placement: "@",
			animation: "&",
			isOpen: "&"
		},
		templateUrl: "template/popover/popover.html"
	}
}).directive("popover", ["$tooltip",
	function(e) {
		return e("popover", "popover", "click")
	}
]), angular.module("ui.bootstrap.progressbar", []).constant("progressConfig", {
	animate: !0,
	max: 100
}).controller("ProgressController", ["$scope", "$attrs", "progressConfig",
	function(e, t, n) {
		var a = this,
			o = angular.isDefined(t.animate) ? e.$parent.$eval(t.animate) : n.animate;
		this.bars = [], e.max = angular.isDefined(t.max) ? e.$parent.$eval(t.max) : n.max, this.addBar = function(t, n) {
			o || n.css({
				transition: "none"
			}), this.bars.push(t), t.$watch("value", function(n) {
				t.percent = +(100 * n / e.max).toFixed(2)
			}), t.$on("$destroy", function() {
				n = null, a.removeBar(t)
			})
		}, this.removeBar = function(e) {
			this.bars.splice(this.bars.indexOf(e), 1)
		}
	}
]).directive("progress", function() {
	return {
		restrict: "EA",
		replace: !0,
		transclude: !0,
		controller: "ProgressController",
		require: "progress",
		scope: {},
		templateUrl: "template/progressbar/progress.html"
	}
}).directive("bar", function() {
	return {
		restrict: "EA",
		replace: !0,
		transclude: !0,
		require: "^progress",
		scope: {
			value: "=",
			type: "@"
		},
		templateUrl: "template/progressbar/bar.html",
		link: function(e, t, n, a) {
			a.addBar(e, t)
		}
	}
}).directive("progressbar", function() {
	return {
		restrict: "EA",
		replace: !0,
		transclude: !0,
		controller: "ProgressController",
		scope: {
			value: "=",
			type: "@"
		},
		templateUrl: "template/progressbar/progressbar.html",
		link: function(e, t, n, a) {
			a.addBar(e, angular.element(t.children()[0]))
		}
	}
}), angular.module("ui.bootstrap.rating", []).constant("ratingConfig", {
	max: 5,
	stateOn: null,
	stateOff: null
}).controller("RatingController", ["$scope", "$attrs", "ratingConfig",
	function(e, t, n) {
		var a = {
			$setViewValue: angular.noop
		};
		this.init = function(o) {
			a = o, a.$render = this.render, this.stateOn = angular.isDefined(t.stateOn) ? e.$parent.$eval(t.stateOn) : n.stateOn, this.stateOff = angular.isDefined(t.stateOff) ? e.$parent.$eval(t.stateOff) : n.stateOff;
			var r = angular.isDefined(t.ratingStates) ? e.$parent.$eval(t.ratingStates) : new Array(angular.isDefined(t.max) ? e.$parent.$eval(t.max) : n.max);
			e.range = this.buildTemplateObjects(r)
		}, this.buildTemplateObjects = function(e) {
			for (var t = 0, n = e.length; n > t; t++) e[t] = angular.extend({
				index: t
			}, {
				stateOn: this.stateOn,
				stateOff: this.stateOff
			}, e[t]);
			return e
		}, e.rate = function(t) {
			!e.readonly && t >= 0 && t <= e.range.length && (a.$setViewValue(t), a.$render())
		}, e.enter = function(t) {
			e.readonly || (e.value = t), e.onHover({
				value: t
			})
		}, e.reset = function() {
			e.value = a.$viewValue, e.onLeave()
		}, e.onKeydown = function(t) {
			/(37|38|39|40)/.test(t.which) && (t.preventDefault(), t.stopPropagation(), e.rate(e.value + (38 === t.which || 39 === t.which ? 1 : -1)))
		}, this.render = function() {
			e.value = a.$viewValue
		}
	}
]).directive("rating", function() {
	return {
		restrict: "EA",
		require: ["rating", "ngModel"],
		scope: {
			readonly: "=?",
			onHover: "&",
			onLeave: "&"
		},
		controller: "RatingController",
		templateUrl: "template/rating/rating.html",
		replace: !0,
		link: function(e, t, n, a) {
			var o = a[0],
				r = a[1];
			r && o.init(r)
		}
	}
}), angular.module("ui.bootstrap.tabs", []).controller("TabsetController", ["$scope",
	function(e) {
		var t = this,
			n = t.tabs = e.tabs = [];
		t.select = function(e) {
			angular.forEach(n, function(t) {
				t.active && t !== e && (t.active = !1, t.onDeselect())
			}), e.active = !0, e.onSelect()
		}, t.addTab = function(e) {
			n.push(e), 1 === n.length ? e.active = !0 : e.active && t.select(e)
		}, t.removeTab = function(e) {
			var o = n.indexOf(e);
			if (e.active && n.length > 1 && !a) {
				var r = o == n.length - 1 ? o - 1 : o + 1;
				t.select(n[r])
			}
			n.splice(o, 1)
		};
		var a;
		e.$on("$destroy", function() {
			a = !0
		})
	}
]).directive("tabset", function() {
	return {
		restrict: "EA",
		transclude: !0,
		replace: !0,
		scope: {
			type: "@"
		},
		controller: "TabsetController",
		templateUrl: "template/tabs/tabset.html",
		link: function(e, t, n) {
			e.vertical = angular.isDefined(n.vertical) ? e.$parent.$eval(n.vertical) : !1, e.justified = angular.isDefined(n.justified) ? e.$parent.$eval(n.justified) : !1
		}
	}
}).directive("tab", ["$parse",
	function(e) {
		return {
			require: "^tabset",
			restrict: "EA",
			replace: !0,
			templateUrl: "template/tabs/tab.html",
			transclude: !0,
			scope: {
				active: "=?",
				heading: "@",
				onSelect: "&select",
				onDeselect: "&deselect"
			},
			controller: function() {},
			compile: function(t, n, a) {
				return function(t, n, o, r) {
					t.$watch("active", function(e) {
						e && r.select(t)
					}), t.disabled = !1, o.disabled && t.$parent.$watch(e(o.disabled), function(e) {
						t.disabled = !! e
					}), t.select = function() {
						t.disabled || (t.active = !0)
					}, r.addTab(t), t.$on("$destroy", function() {
						r.removeTab(t)
					}), t.$transcludeFn = a
				}
			}
		}
	}
]).directive("tabHeadingTransclude", [
	function() {
		return {
			restrict: "A",
			require: "^tab",
			link: function(e, t, n, a) {
				e.$watch("headingElement", function(e) {
					e && (t.html(""), t.append(e))
				})
			}
		}
	}
]).directive("tabContentTransclude", function() {
	function e(e) {
		return e.tagName && (e.hasAttribute("tab-heading") || e.hasAttribute("data-tab-heading") || "tab-heading" === e.tagName.toLowerCase() || "data-tab-heading" === e.tagName.toLowerCase())
	}
	return {
		restrict: "A",
		require: "^tabset",
		link: function(t, n, a) {
			var o = t.$eval(a.tabContentTransclude);
			o.$transcludeFn(o.$parent, function(t) {
				angular.forEach(t, function(t) {
					e(t) ? o.headingElement = t : n.append(t)
				})
			})
		}
	}
}), angular.module("ui.bootstrap.timepicker", []).constant("timepickerConfig", {
	hourStep: 1,
	minuteStep: 1,
	showMeridian: !0,
	meridians: null,
	readonlyInput: !1,
	mousewheel: !0
}).controller("TimepickerController", ["$scope", "$attrs", "$parse", "$log", "$locale", "timepickerConfig",
	function(e, t, n, a, o, r) {
		function i() {
			var t = parseInt(e.hours, 10),
				n = e.showMeridian ? t > 0 && 13 > t : t >= 0 && 24 > t;
			return n ? (e.showMeridian && (12 === t && (t = 0), e.meridian === h[1] && (t += 12)), t) : void 0
		}

		function l() {
			var t = parseInt(e.minutes, 10);
			return t >= 0 && 60 > t ? t : void 0
		}

		function s(e) {
			return angular.isDefined(e) && e.toString().length < 2 ? "0" + e : e
		}

		function d(e) {
			c(), f.$setViewValue(new Date(g)), u(e)
		}

		function c() {
			f.$setValidity("time", !0), e.invalidHours = !1, e.invalidMinutes = !1
		}

		function u(t) {
			var n = g.getHours(),
				a = g.getMinutes();
			e.showMeridian && (n = 0 === n || 12 === n ? 12 : n % 12), e.hours = "h" === t ? n : s(n), e.minutes = "m" === t ? a : s(a), e.meridian = g.getHours() < 12 ? h[0] : h[1]
		}

		function p(e) {
			var t = new Date(g.getTime() + 6e4 * e);
			g.setHours(t.getHours(), t.getMinutes()), d()
		}
		var g = new Date,
			f = {
				$setViewValue: angular.noop
			}, h = angular.isDefined(t.meridians) ? e.$parent.$eval(t.meridians) : r.meridians || o.DATETIME_FORMATS.AMPMS;
		this.init = function(n, a) {
			f = n, f.$render = this.render;
			var o = a.eq(0),
				i = a.eq(1),
				l = angular.isDefined(t.mousewheel) ? e.$parent.$eval(t.mousewheel) : r.mousewheel;
			l && this.setupMousewheelEvents(o, i), e.readonlyInput = angular.isDefined(t.readonlyInput) ? e.$parent.$eval(t.readonlyInput) : r.readonlyInput, this.setupInputEvents(o, i)
		};
		var m = r.hourStep;
		t.hourStep && e.$parent.$watch(n(t.hourStep), function(e) {
			m = parseInt(e, 10)
		});
		var v = r.minuteStep;
		t.minuteStep && e.$parent.$watch(n(t.minuteStep), function(e) {
			v = parseInt(e, 10)
		}), e.showMeridian = r.showMeridian, t.showMeridian && e.$parent.$watch(n(t.showMeridian), function(t) {
			if (e.showMeridian = !! t, f.$error.time) {
				var n = i(),
					a = l();
				angular.isDefined(n) && angular.isDefined(a) && (g.setHours(n), d())
			} else u()
		}), this.setupMousewheelEvents = function(t, n) {
			var a = function(e) {
				e.originalEvent && (e = e.originalEvent);
				var t = e.wheelDelta ? e.wheelDelta : -e.deltaY;
				return e.detail || t > 0
			};
			t.bind("mousewheel wheel", function(t) {
				e.$apply(a(t) ? e.incrementHours() : e.decrementHours()), t.preventDefault()
			}), n.bind("mousewheel wheel", function(t) {
				e.$apply(a(t) ? e.incrementMinutes() : e.decrementMinutes()), t.preventDefault()
			})
		}, this.setupInputEvents = function(t, n) {
			if (e.readonlyInput) return e.updateHours = angular.noop, void(e.updateMinutes = angular.noop);
			var a = function(t, n) {
				f.$setViewValue(null), f.$setValidity("time", !1), angular.isDefined(t) && (e.invalidHours = t), angular.isDefined(n) && (e.invalidMinutes = n)
			};
			e.updateHours = function() {
				var e = i();
				angular.isDefined(e) ? (g.setHours(e), d("h")) : a(!0)
			}, t.bind("blur", function(t) {
				!e.invalidHours && e.hours < 10 && e.$apply(function() {
					e.hours = s(e.hours)
				})
			}), e.updateMinutes = function() {
				var e = l();
				angular.isDefined(e) ? (g.setMinutes(e), d("m")) : a(void 0, !0)
			}, n.bind("blur", function(t) {
				!e.invalidMinutes && e.minutes < 10 && e.$apply(function() {
					e.minutes = s(e.minutes)
				})
			})
		}, this.render = function() {
			var e = f.$modelValue ? new Date(f.$modelValue) : null;
			isNaN(e) ? (f.$setValidity("time", !1), a.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.')) : (e && (g = e), c(), u())
		}, e.incrementHours = function() {
			p(60 * m)
		}, e.decrementHours = function() {
			p(60 * -m)
		}, e.incrementMinutes = function() {
			p(v)
		}, e.decrementMinutes = function() {
			p(-v)
		}, e.toggleMeridian = function() {
			p(720 * (g.getHours() < 12 ? 1 : -1))
		}
	}
]).directive("timepicker", function() {
	return {
		restrict: "EA",
		require: ["timepicker", "?^ngModel"],
		controller: "TimepickerController",
		replace: !0,
		scope: {},
		templateUrl: "template/timepicker/timepicker.html",
		link: function(e, t, n, a) {
			var o = a[0],
				r = a[1];
			r && o.init(r, t.find("input"))
		}
	}
}), angular.module("ui.bootstrap.typeahead", ["ui.bootstrap.position", "ui.bootstrap.bindHtml"]).factory("typeaheadParser", ["$parse",
	function(e) {
		var t = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;
		return {
			parse: function(n) {
				var a = n.match(t);
				if (!a) throw new Error('Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_" but got "' + n + '".');
				return {
					itemName: a[3],
					source: e(a[4]),
					viewMapper: e(a[2] || a[1]),
					modelMapper: e(a[1])
				}
			}
		}
	}
]).directive("typeahead", ["$compile", "$parse", "$q", "$timeout", "$document", "$position", "typeaheadParser",
	function(e, t, n, a, o, r, i) {
		var l = [9, 13, 27, 38, 40];
		return {
			require: "ngModel",
			link: function(s, d, c, u) {
				var p, g = s.$eval(c.typeaheadMinLength) || 1,
					f = s.$eval(c.typeaheadWaitMs) || 0,
					h = s.$eval(c.typeaheadEditable) !== !1,
					m = t(c.typeaheadLoading).assign || angular.noop,
					v = t(c.typeaheadOnSelect),
					b = c.typeaheadInputFormatter ? t(c.typeaheadInputFormatter) : void 0,
					k = c.typeaheadAppendToBody ? s.$eval(c.typeaheadAppendToBody) : !1,
					y = s.$eval(c.typeaheadFocusFirst) !== !1,
					N = t(c.ngModel).assign,
					C = i.parse(c.typeahead),
					w = s.$new();
				s.$on("$destroy", function() {
					w.$destroy()
				});
				var T = "typeahead-" + w.$id + "-" + Math.floor(1e4 * Math.random());
				d.attr({
					"aria-autocomplete": "list",
					"aria-expanded": !1,
					"aria-owns": T
				});
				var $ = angular.element("<div typeahead-popup></div>");
				$.attr({
					id: T,
					matches: "matches",
					active: "activeIdx",
					select: "select(activeIdx)",
					query: "query",
					position: "position"
				}), angular.isDefined(c.typeaheadTemplateUrl) && $.attr("template-url", c.typeaheadTemplateUrl);
				var E = function() {
					w.matches = [], w.activeIdx = -1, d.attr("aria-expanded", !1)
				}, D = function(e) {
						return T + "-option-" + e
					};
				w.$watch("activeIdx", function(e) {
					0 > e ? d.removeAttr("aria-activedescendant") : d.attr("aria-activedescendant", D(e))
				});
				var I = function(e) {
					var t = {
						$viewValue: e
					};
					m(s, !0), n.when(C.source(s, t)).then(function(n) {
						var a = e === u.$viewValue;
						if (a && p)
							if (n.length > 0) {
								w.activeIdx = y ? 0 : -1, w.matches.length = 0;
								for (var o = 0; o < n.length; o++) t[C.itemName] = n[o], w.matches.push({
									id: D(o),
									label: C.viewMapper(w, t),
									model: n[o]
								});
								w.query = e, w.position = k ? r.offset(d) : r.position(d), w.position.top = w.position.top + d.prop("offsetHeight"), d.attr("aria-expanded", !0)
							} else E();
						a && m(s, !1)
					}, function() {
						E(), m(s, !1)
					})
				};
				E(), w.query = void 0;
				var x, S = function(e) {
						x = a(function() {
							I(e)
						}, f)
					}, O = function() {
						x && a.cancel(x)
					};
				u.$parsers.unshift(function(e) {
					return p = !0, e && e.length >= g ? f > 0 ? (O(), S(e)) : I(e) : (m(s, !1), O(), E()), h ? e : e ? void u.$setValidity("editable", !1) : (u.$setValidity("editable", !0), e)
				}), u.$formatters.push(function(e) {
					var t, n, a = {};
					return b ? (a.$model = e, b(s, a)) : (a[C.itemName] = e, t = C.viewMapper(s, a), a[C.itemName] = void 0, n = C.viewMapper(s, a), t !== n ? t : e)
				}), w.select = function(e) {
					var t, n, o = {};
					o[C.itemName] = n = w.matches[e].model, t = C.modelMapper(s, o), N(s, t), u.$setValidity("editable", !0), v(s, {
						$item: n,
						$model: t,
						$label: C.viewMapper(s, o)
					}), E(), a(function() {
						d[0].focus()
					}, 0, !1)
				}, d.bind("keydown", function(e) {
					0 !== w.matches.length && -1 !== l.indexOf(e.which) && (-1 != w.activeIdx || 13 !== e.which && 9 !== e.which) && (e.preventDefault(), 40 === e.which ? (w.activeIdx = (w.activeIdx + 1) % w.matches.length, w.$digest()) : 38 === e.which ? (w.activeIdx = (w.activeIdx > 0 ? w.activeIdx : w.matches.length) - 1, w.$digest()) : 13 === e.which || 9 === e.which ? w.$apply(function() {
						w.select(w.activeIdx)
					}) : 27 === e.which && (e.stopPropagation(), E(), w.$digest()))
				}), d.bind("blur", function(e) {
					p = !1
				});
				var P = function(e) {
					d[0] !== e.target && (E(), w.$digest())
				};
				o.bind("click", P), s.$on("$destroy", function() {
					o.unbind("click", P), k && M.remove()
				});
				var M = e($)(w);
				k ? o.find("body").append(M) : d.after(M)
			}
		}
	}
]).directive("typeaheadPopup", function() {
	return {
		restrict: "EA",
		scope: {
			matches: "=",
			query: "=",
			active: "=",
			position: "=",
			select: "&"
		},
		replace: !0,
		templateUrl: "template/typeahead/typeahead-popup.html",
		link: function(e, t, n) {
			e.templateUrl = n.templateUrl, e.isOpen = function() {
				return e.matches.length > 0
			}, e.isActive = function(t) {
				return e.active == t
			}, e.selectActive = function(t) {
				e.active = t
			}, e.selectMatch = function(t) {
				e.select({
					activeIdx: t
				})
			}
		}
	}
}).directive("typeaheadMatch", ["$http", "$templateCache", "$compile", "$parse",
	function(e, t, n, a) {
		return {
			restrict: "EA",
			scope: {
				index: "=",
				match: "=",
				query: "="
			},
			link: function(o, r, i) {
				var l = a(i.templateUrl)(o.$parent) || "template/typeahead/typeahead-match.html";
				e.get(l, {
					cache: t
				}).success(function(e) {
					r.replaceWith(n(e.trim())(o))
				})
			}
		}
	}
]).filter("typeaheadHighlight", function() {
	function e(e) {
		return e.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
	}
	return function(t, n) {
		return n ? ("" + t).replace(new RegExp(e(n), "gi"), "<strong>$&</strong>") : t
	}
}), angular.module("template/accordion/accordion-group.html", []).run(["$templateCache",
	function(e) {
		e.put("template/accordion/accordion-group.html", '<div class="panel panel-default">\n  <div class="panel-heading">\n    <h4 class="panel-title">\n      <a href class="accordion-toggle" ng-click="toggleOpen()" accordion-transclude="heading"><span ng-class="{\'text-muted\': isDisabled}">{{heading}}</span></a>\n    </h4>\n  </div>\n  <div class="panel-collapse" collapse="!isOpen">\n	  <div class="panel-body" ng-transclude></div>\n  </div>\n</div>\n')
	}
]), angular.module("template/accordion/accordion.html", []).run(["$templateCache",
	function(e) {
		e.put("template/accordion/accordion.html", '<div class="panel-group" ng-transclude></div>')
	}
]), angular.module("template/alert/alert.html", []).run(["$templateCache",
	function(e) {
		e.put("template/alert/alert.html", '<div class="alert" ng-class="[\'alert-\' + (type || \'warning\'), closeable ? \'alert-dismissable\' : null]" role="alert">\n    <button ng-show="closeable" type="button" class="close" ng-click="close()">\n        <span aria-hidden="true">&times;</span>\n        <span class="sr-only">Close</span>\n    </button>\n    <div ng-transclude></div>\n</div>\n')
	}
]), angular.module("template/carousel/carousel.html", []).run(["$templateCache",
	function(e) {
		e.put("template/carousel/carousel.html", '<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel" ng-swipe-right="prev()" ng-swipe-left="next()">\n    <ol class="carousel-indicators" ng-show="slides.length > 1">\n        <li ng-repeat="slide in slides track by $index" ng-class="{active: isActive(slide)}" ng-click="select(slide)"></li>\n    </ol>\n    <div class="carousel-inner" ng-transclude></div>\n    <a class="left carousel-control" ng-click="prev()" ng-show="slides.length > 1"><span class="glyphicon glyphicon-chevron-left"></span></a>\n    <a class="right carousel-control" ng-click="next()" ng-show="slides.length > 1"><span class="glyphicon glyphicon-chevron-right"></span></a>\n</div>\n')
	}
]), angular.module("template/carousel/slide.html", []).run(["$templateCache",
	function(e) {
		e.put("template/carousel/slide.html", "<div ng-class=\"{\n    'active': leaving || (active && !entering),\n    'prev': (next || active) && direction=='prev',\n    'next': (next || active) && direction=='next',\n    'right': direction=='prev',\n    'left': direction=='next'\n  }\" class=\"item text-center\" ng-transclude></div>\n")
	}
]), angular.module("template/datepicker/datepicker.html", []).run(["$templateCache",
	function(e) {
		e.put("template/datepicker/datepicker.html", '<div ng-switch="datepickerMode" role="application" ng-keydown="keydown($event)">\n  <daypicker ng-switch-when="day" tabindex="0"></daypicker>\n  <monthpicker ng-switch-when="month" tabindex="0"></monthpicker>\n  <yearpicker ng-switch-when="year" tabindex="0"></yearpicker>\n</div>')
	}
]), angular.module("template/datepicker/day.html", []).run(["$templateCache",
	function(e) {
		e.put("template/datepicker/day.html", '<table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="{{5 + showWeeks}}"><button id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n    <tr>\n      <th ng-show="showWeeks" class="text-center"></th>\n      <th ng-repeat="label in labels track by $index" class="text-center"><small aria-label="{{label.full}}">{{label.abbr}}</small></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-show="showWeeks" class="text-center h6"><em>{{ weekNumbers[$index] }}</em></td>\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">\n        <button type="button" style="width:100%;" class="btn btn-default btn-sm" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="{\'text-muted\': dt.secondary, \'text-info\': dt.current}">{{dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')
	}
]), angular.module("template/datepicker/month.html", []).run(["$templateCache",
	function(e) {
		e.put("template/datepicker/month.html", '<table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th><button id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">\n        <button type="button" style="width:100%;" class="btn btn-default" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="{\'text-info\': dt.current}">{{dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')
	}
]), angular.module("template/datepicker/popup.html", []).run(["$templateCache",
	function(e) {
		e.put("template/datepicker/popup.html", '<ul class="dropdown-menu" ng-style="{display: (isOpen && \'block\') || \'none\', top: position.top+\'px\', left: position.left+\'px\'}" ng-keydown="keydown($event)">\n	<li ng-transclude></li>\n	<li ng-if="showButtonBar" style="padding:10px 9px 2px">\n		<span class="btn-group pull-left">\n			<button type="button" class="btn btn-sm btn-info" ng-click="select(\'today\')">{{ getText(\'current\') }}</button>\n			<button type="button" class="btn btn-sm btn-danger" ng-click="select(null)">{{ getText(\'clear\') }}</button>\n		</span>\n		<button type="button" class="btn btn-sm btn-success pull-right" ng-click="close()">{{ getText(\'close\') }}</button>\n	</li>\n</ul>\n')
	}
]), angular.module("template/datepicker/year.html", []).run(["$templateCache",
	function(e) {
		e.put("template/datepicker/year.html", '<table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="3"><button id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">\n        <button type="button" style="width:100%;" class="btn btn-default" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="{\'text-info\': dt.current}">{{dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')
	}
]), angular.module("template/modal/backdrop.html", []).run(["$templateCache",
	function(e) {
		e.put("template/modal/backdrop.html", '<div class="modal-backdrop fade {{ backdropClass }}"\n     ng-class="{in: animate}"\n     ng-style="{\'z-index\': 1040 + (index && 1 || 0) + index*10}"\n></div>\n')
	}
]), angular.module("template/modal/window.html", []).run(["$templateCache",
	function(e) {
		e.put("template/modal/window.html", '<div tabindex="-1" role="dialog" class="modal fade" ng-class="{in: animate}" ng-style="{\'z-index\': 1050 + index*10, display: \'block\'}" ng-click="close($event)">\n    <div class="modal-dialog" ng-class="{\'modal-sm\': size == \'sm\', \'modal-lg\': size == \'lg\'}"><div class="modal-content" modal-transclude></div></div>\n</div>')
	}
]), angular.module("template/pagination/pager.html", []).run(["$templateCache",
	function(e) {
		e.put("template/pagination/pager.html", '<ul class="pager">\n  <li ng-class="{disabled: noPrevious(), previous: align}"><a href ng-click="selectPage(page - 1)">{{getText(\'previous\')}}</a></li>\n  <li ng-class="{disabled: noNext(), next: align}"><a href ng-click="selectPage(page + 1)">{{getText(\'next\')}}</a></li>\n</ul>')
	}
]), angular.module("template/pagination/pagination.html", []).run(["$templateCache",
	function(e) {
		e.put("template/pagination/pagination.html", '<ul class="pagination">\n  <li ng-if="boundaryLinks" ng-class="{disabled: noPrevious()}"><a href ng-click="selectPage(1)">{{getText(\'first\')}}</a></li>\n  <li ng-if="directionLinks" ng-class="{disabled: noPrevious()}"><a href ng-click="selectPage(page - 1)">{{getText(\'previous\')}}</a></li>\n  <li ng-repeat="page in pages track by $index" ng-class="{active: page.active}"><a href ng-click="selectPage(page.number)">{{page.text}}</a></li>\n  <li ng-if="directionLinks" ng-class="{disabled: noNext()}"><a href ng-click="selectPage(page + 1)">{{getText(\'next\')}}</a></li>\n  <li ng-if="boundaryLinks" ng-class="{disabled: noNext()}"><a href ng-click="selectPage(totalPages)">{{getText(\'last\')}}</a></li>\n</ul>')
	}
]), angular.module("template/tooltip/tooltip-html-unsafe-popup.html", []).run(["$templateCache",
	function(e) {
		e.put("template/tooltip/tooltip-html-unsafe-popup.html", '<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" bind-html-unsafe="content"></div>\n</div>\n')
	}
]), angular.module("template/tooltip/tooltip-popup.html", []).run(["$templateCache",
	function(e) {
		e.put("template/tooltip/tooltip-popup.html", '<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" ng-bind="content"></div>\n</div>\n')
	}
]), angular.module("template/popover/popover.html", []).run(["$templateCache",
	function(e) {
		e.put("template/popover/popover.html", '<div class="popover {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="arrow"></div>\n\n  <div class="popover-inner">\n      <h3 class="popover-title" ng-bind="title" ng-show="title"></h3>\n      <div class="popover-content" ng-bind="content"></div>\n  </div>\n</div>\n')
	}
]), angular.module("template/progressbar/bar.html", []).run(["$templateCache",
	function(e) {
		e.put("template/progressbar/bar.html", '<div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: percent + \'%\'}" aria-valuetext="{{percent | number:0}}%" ng-transclude></div>')
	}
]), angular.module("template/progressbar/progress.html", []).run(["$templateCache",
	function(e) {
		e.put("template/progressbar/progress.html", '<div class="progress" ng-transclude></div>')
	}
]), angular.module("template/progressbar/progressbar.html", []).run(["$templateCache",
	function(e) {
		e.put("template/progressbar/progressbar.html", '<div class="progress">\n  <div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: percent + \'%\'}" aria-valuetext="{{percent | number:0}}%" ng-transclude></div>\n</div>')
	}
]), angular.module("template/rating/rating.html", []).run(["$templateCache",
	function(e) {
		e.put("template/rating/rating.html", '<span ng-mouseleave="reset()" ng-keydown="onKeydown($event)" tabindex="0" role="slider" aria-valuemin="0" aria-valuemax="{{range.length}}" aria-valuenow="{{value}}">\n    <i ng-repeat="r in range track by $index" ng-mouseenter="enter($index + 1)" ng-click="rate($index + 1)" class="glyphicon" ng-class="$index < value && (r.stateOn || \'glyphicon-star\') || (r.stateOff || \'glyphicon-star-empty\')">\n        <span class="sr-only">({{ $index < value ? \'*\' : \' \' }})</span>\n    </i>\n</span>')
	}
]), angular.module("template/tabs/tab.html", []).run(["$templateCache",
	function(e) {
		e.put("template/tabs/tab.html", '<li ng-class="{active: active, disabled: disabled}">\n  <a href ng-click="select()" tab-heading-transclude>{{heading}}</a>\n</li>\n')
	}
]), angular.module("template/tabs/tabset.html", []).run(["$templateCache",
	function(e) {
		e.put("template/tabs/tabset.html", '<div>\n  <ul class="nav nav-{{type || \'tabs\'}}" ng-class="{\'nav-stacked\': vertical, \'nav-justified\': justified}" ng-transclude></ul>\n  <div class="tab-content">\n    <div class="tab-pane" \n         ng-repeat="tab in tabs" \n         ng-class="{active: tab.active}"\n         tab-content-transclude="tab">\n    </div>\n  </div>\n</div>\n')
	}
]), angular.module("template/timepicker/timepicker.html", []).run(["$templateCache",
	function(e) {
		e.put("template/timepicker/timepicker.html", '<table>\n	<tbody>\n		<tr class="text-center">\n			<td><a ng-click="incrementHours()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n			<td>&nbsp;</td>\n			<td><a ng-click="incrementMinutes()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n			<td ng-show="showMeridian"></td>\n		</tr>\n		<tr>\n			<td style="width:50px;" class="form-group" ng-class="{\'has-error\': invalidHours}">\n				<input type="text" ng-model="hours" ng-change="updateHours()" class="form-control text-center" ng-mousewheel="incrementHours()" ng-readonly="readonlyInput" maxlength="2">\n			</td>\n			<td>:</td>\n			<td style="width:50px;" class="form-group" ng-class="{\'has-error\': invalidMinutes}">\n				<input type="text" ng-model="minutes" ng-change="updateMinutes()" class="form-control text-center" ng-readonly="readonlyInput" maxlength="2">\n			</td>\n			<td ng-show="showMeridian"><button type="button" class="btn btn-default text-center" ng-click="toggleMeridian()">{{meridian}}</button></td>\n		</tr>\n		<tr class="text-center">\n			<td><a ng-click="decrementHours()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n			<td>&nbsp;</td>\n			<td><a ng-click="decrementMinutes()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n			<td ng-show="showMeridian"></td>\n		</tr>\n	</tbody>\n</table>\n')
	}
]), angular.module("template/typeahead/typeahead-match.html", []).run(["$templateCache",
	function(e) {
		e.put("template/typeahead/typeahead-match.html", '<a tabindex="-1" bind-html-unsafe="match.label | typeaheadHighlight:query"></a>')
	}
]), angular.module("template/typeahead/typeahead-popup.html", []).run(["$templateCache",
	function(e) {
		e.put("template/typeahead/typeahead-popup.html", '<ul class="dropdown-menu" ng-show="isOpen()" ng-style="{top: position.top+\'px\', left: position.left+\'px\'}" style="display: block;" role="listbox" aria-hidden="{{!isOpen()}}">\n    <li ng-repeat="match in matches track by $index" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)" ng-click="selectMatch($index)" role="option" id="{{match.id}}">\n        <div typeahead-match index="$index" match="match" query="query" template-url="templateUrl"></div>\n    </li>\n</ul>\n')
	}
]),
function() {
	this.labelService = function(e) {
		var t, n;
		return console.debug("init labels service..."), n = $("#labels").data("prod-id"), t = {
			product_id: n
		}, t.index = function(t, a) {
			return console.log("get product: " + n + " root label..."), e({
				url: "/admin/labels.json?" + t,
				method: "get"
			}).success(function(e) {
				return a(e)
			})
		}, t.checked_labels = function(t, a) {
			return console.log("get product: " + n + " root label..."), e({
				url: "/admin/labels/checked_labels.json?product_id=" + n + "&" + t,
				method: "get"
			}).success(function(e) {
				return a(e)
			})
		}, t.rename = function(t, n) {
			return console.log("rename label id: " + t.id + "..."), e({
				url: "/admin/labels/" + t.id + "/update",
				method: "post",
				data: {
					name: t.name
				}
			}).success(function(e) {
				return n(e)
			})
		}, t.add = function(t, n, a) {
			return console.log("add sub label: " + name + ", parent id: " + t), n.parent_id = t, e({
				url: "/admin/labels",
				method: "post",
				data: n
			}).success(function(e) {
				return a(e)
			})
		}, t.del = function(t, n) {
			return console.log("delete label: " + t + "..."), e({
				url: "/admin/labels/" + t + "/destroy",
				method: "post"
			}).success(function(e) {
				return n(e)
			})
		}, t
	}
}.call(this),
function() {
	this.labelsCtrl = function(e, t, n) {
		var a, o, r, i, l, s, d, c;
		return console.debug("init labels controller..."), t.cached = {}, n.index("", function(e) {
			var t;
			return t = $.fn.zTree.init($("#labels_tree"), c(), e), o(t), s(t)
		}), n.index("promotion=true", function(e) {
			var t;
			return t = $.fn.zTree.init($("#promotion-labels_tree"), c("radio"), e), o(t), s(t)
		}), t.create = function() {
			var e, t, a;
			return a = l(arguments[0]), t = {
				name: "\u672a\u547d\u540d",
				pId: null,
				isParent: !1
			}, e = !1, "promotion-labels_tree" === arguments[0] && (e = !0), n.add(null, {
				name: t.name,
				is_promotion: e
			}, function(e) {
				return t.id = e.id, a.addNodes(null, t)
			})
		}, t.createSub = function() {
			var e, t, a, o;
			return o = l(arguments[0]), e = i(arguments[0]), a = e ? e.id : null, t = {
				name: "\u672a\u547d\u540d",
				pId: a,
				isParent: !1
			}, n.add(a, {
				name: t.name
			}, function(n) {
				return t.id = n.id, o.addNodes(e, t)
			})
		}, t.edit = function() {
			var e, t;
			return t = l(arguments[0]), e = i(arguments[0]), e ? t.editName(e) : alert("\u8bf7\u9009\u62e9\u6807\u7b7e\u518d\u64cd\u4f5c")
		}, t.remove = function() {
			var e, t, a;
			return a = l(arguments[0]), (e = i(arguments[0])) ? (t = "\u786e\u8ba4\u5220\u9664\u8be5\u6807\u7b7e\u5417(\u5176\u5b50\u6807\u7b7e\u4e5f\u4f1a\u88ab\u5220\u9664)\uff1f", "promotion-labels_tree" === arguments[0] && (t = "\u786e\u8ba4\u5220\u9664\u8be5\u4fc3\u9500\u6807\u7b7e\uff1f"), confirmDialog("\u786e\u8ba4\u5220\u9664", t, {
				type: "type-danger"
			}, function(t) {
				return t ? n.del(e.id, function(t) {
					return a.removeNode(e)
				}) : void 0
			})) : alert("\u8bf7\u9009\u62e9\u6807\u7b7e\u518d\u64cd\u4f5c")
		}, t.is_changed = function() {
			return t.get_checked_nodes(arguments[0]).length > 0 || t.get_unchecked_nodes(arguments[0]).length > 0
		}, t.get_checked_nodes = function() {
			var e, t;
			return t = l(arguments[0]), e = t.getChangeCheckedNodes(), _.chain(e).filter(function(e) {
				return e.checked
			}).map(function(e) {
				return e.id
			}).value()
		}, t.get_unchecked_nodes = function() {
			var e, t;
			return t = l(arguments[0]), e = t.getChangeCheckedNodes(), _.chain(e).filter(function(e) {
				return e.checked === !1
			}).map(function(e) {
				return e.id
			}).value()
		}, c = function() {
			var e;
			return e = {
				check: {
					enable: !0
				},
				view: {
					selectedMulti: !1
				},
				edit: {
					enable: !0,
					showRemoveBtn: !1,
					showRenameBtn: !1
				},
				data: {
					keep: {
						parent: !0,
						leaf: !1
					},
					simpleData: {
						enable: !0
					}
				},
				callback: {
					onRename: d,
					beforeCheck: a
				}
			}
		}, l = function() {
			return $.fn.zTree.getZTreeObj(arguments[0] || "labels_tree")
		}, i = function() {
			var e, t;
			return t = l(arguments[0]), e = t.getSelectedNodes()[0]
		}, o = function(e) {
			var n, a, o;
			return n = [], a = e.getNodes(), o = function(e) {
				return _.each(e, function(e) {
					return n[e.id] = e.tId, e.isParent ? o(e.children) : void 0
				})
			}, o(a), t.cached[e.setting.treeId] = n
		}, s = function(e) {
			var t;
			return t = "", "promotion-labels_tree" === e.setting.treeId && (t = "promotion=true"), n.checked_labels(t, function(t) {
				return console.debug("checked data: " + t), angular.forEach(t, function(t) {
					var n;
					return n = r(e, t), n ? (e.checkNode(n, !0, !1), n.checkedOld = !0) : void 0
				})
			})
		}, r = function(e, n) {
			var a;
			return a = t.cached[e.setting.treeId][n], e.getNodeByTId(a)
		}, a = function(e, n) {
			var a, o, r;
			return "promotion-labels_tree" === e && (a = t.get_checked_nodes(e), r = l(e), o = r.getCheckedNodes(!0), o.length > 2 && o.indexOf(n) < 0) ? (alert("\u6700\u591a\u53ef\u9009\u62e9\u6216\u8bbe\u7f6e3\u4e2a\u4fc3\u9500\u6807\u7b7e!"), !1) : void 0
		}, d = function(e, t, a, o) {
			return n.rename({
				id: a.id,
				name: a.name
			}, function(e) {
				return console.log("label: " + a.id + " rename success")
			})
		}
	}
}.call(this),
function() {
	console.debug("init angular labels app..."), angular.module("labelsApp", ["ui.bootstrap"]).service("labelService", ["$http", this.labelService]).controller("labelsCtrl", ["$rootScope", "$scope", "labelService", this.labelsCtrl]).config(["$httpProvider",
		function(e) {
			return e.defaults.headers.common["X-CSRF-Token"] = $("meta[name=csrf-token]").attr("content")
		}
	])
}.call(this),
function($) {
	var settings = {}, roots = {}, caches = {}, _consts = {
			className: {
				BUTTON: "button",
				LEVEL: "level",
				ICO_LOADING: "ico_loading",
				SWITCH: "switch"
			},
			event: {
				NODECREATED: "ztree_nodeCreated",
				CLICK: "ztree_click",
				EXPAND: "ztree_expand",
				COLLAPSE: "ztree_collapse",
				ASYNC_SUCCESS: "ztree_async_success",
				ASYNC_ERROR: "ztree_async_error"
			},
			id: {
				A: "_a",
				ICON: "_ico",
				SPAN: "_span",
				SWITCH: "_switch",
				UL: "_ul"
			},
			line: {
				ROOT: "root",
				ROOTS: "roots",
				CENTER: "center",
				BOTTOM: "bottom",
				NOLINE: "noline",
				LINE: "line"
			},
			folder: {
				OPEN: "open",
				CLOSE: "close",
				DOCU: "docu"
			},
			node: {
				CURSELECTED: "curSelectedNode"
			}
		}, _setting = {
			treeId: "",
			treeObj: null,
			view: {
				addDiyDom: null,
				autoCancelSelected: !0,
				dblClickExpand: !0,
				expandSpeed: "fast",
				fontCss: {},
				nameIsHTML: !1,
				selectedMulti: !0,
				showIcon: !0,
				showLine: !0,
				showTitle: !0,
				txtSelectedEnable: !1
			},
			data: {
				key: {
					children: "children",
					name: "name",
					title: "",
					url: "url"
				},
				simpleData: {
					enable: !1,
					idKey: "id",
					pIdKey: "pId",
					rootPId: null
				},
				keep: {
					parent: !1,
					leaf: !1
				}
			},
			async: {
				enable: !1,
				contentType: "application/x-www-form-urlencoded",
				type: "post",
				dataType: "text",
				url: "",
				autoParam: [],
				otherParam: [],
				dataFilter: null
			},
			callback: {
				beforeAsync: null,
				beforeClick: null,
				beforeDblClick: null,
				beforeRightClick: null,
				beforeMouseDown: null,
				beforeMouseUp: null,
				beforeExpand: null,
				beforeCollapse: null,
				beforeRemove: null,
				onAsyncError: null,
				onAsyncSuccess: null,
				onNodeCreated: null,
				onClick: null,
				onDblClick: null,
				onRightClick: null,
				onMouseDown: null,
				onMouseUp: null,
				onExpand: null,
				onCollapse: null,
				onRemove: null
			}
		}, _initRoot = function(e) {
			var t = data.getRoot(e);
			t || (t = {}, data.setRoot(e, t)), t[e.data.key.children] = [], t.expandTriggerFlag = !1, t.curSelectedList = [], t.noSelection = !0, t.createdNodes = [], t.zId = 0, t._ver = (new Date).getTime()
		}, _initCache = function(e) {
			var t = data.getCache(e);
			t || (t = {}, data.setCache(e, t)), t.nodes = [], t.doms = []
		}, _bindEvent = function(e) {
			var t = e.treeObj,
				n = consts.event;
			t.bind(n.NODECREATED, function(t, n, a) {
				tools.apply(e.callback.onNodeCreated, [t, n, a])
			}), t.bind(n.CLICK, function(t, n, a, o, r) {
				tools.apply(e.callback.onClick, [n, a, o, r])
			}), t.bind(n.EXPAND, function(t, n, a) {
				tools.apply(e.callback.onExpand, [t, n, a])
			}), t.bind(n.COLLAPSE, function(t, n, a) {
				tools.apply(e.callback.onCollapse, [t, n, a])
			}), t.bind(n.ASYNC_SUCCESS, function(t, n, a, o) {
				tools.apply(e.callback.onAsyncSuccess, [t, n, a, o])
			}), t.bind(n.ASYNC_ERROR, function(t, n, a, o, r, i) {
				tools.apply(e.callback.onAsyncError, [t, n, a, o, r, i])
			})
		}, _unbindEvent = function(e) {
			var t = e.treeObj,
				n = consts.event;
			t.unbind(n.NODECREATED).unbind(n.CLICK).unbind(n.EXPAND).unbind(n.COLLAPSE).unbind(n.ASYNC_SUCCESS).unbind(n.ASYNC_ERROR)
		}, _eventProxy = function(e) {
			var t = e.target,
				n = data.getSetting(e.data.treeId),
				a = "",
				o = null,
				r = "",
				i = "",
				l = null,
				s = null,
				d = null;
			if (tools.eqs(e.type, "mousedown") ? i = "mousedown" : tools.eqs(e.type, "mouseup") ? i = "mouseup" : tools.eqs(e.type, "contextmenu") ? i = "contextmenu" : tools.eqs(e.type, "click") ? tools.eqs(t.tagName, "span") && null !== t.getAttribute("treeNode" + consts.id.SWITCH) ? (a = tools.getNodeMainDom(t).id, r = "switchNode") : (d = tools.getMDom(n, t, [{
				tagName: "a",
				attrName: "treeNode" + consts.id.A
			}]), d && (a = tools.getNodeMainDom(d).id, r = "clickNode")) : tools.eqs(e.type, "dblclick") && (i = "dblclick", d = tools.getMDom(n, t, [{
				tagName: "a",
				attrName: "treeNode" + consts.id.A
			}]), d && (a = tools.getNodeMainDom(d).id, r = "switchNode")), i.length > 0 && 0 == a.length && (d = tools.getMDom(n, t, [{
				tagName: "a",
				attrName: "treeNode" + consts.id.A
			}]), d && (a = tools.getNodeMainDom(d).id)), a.length > 0) switch (o = data.getNodeCache(n, a), r) {
				case "switchNode":
					o.isParent && (tools.eqs(e.type, "click") || tools.eqs(e.type, "dblclick") && tools.apply(n.view.dblClickExpand, [n.treeId, o], n.view.dblClickExpand)) ? l = handler.onSwitchNode : r = "";
					break;
				case "clickNode":
					l = handler.onClickNode
			}
			switch (i) {
				case "mousedown":
					s = handler.onZTreeMousedown;
					break;
				case "mouseup":
					s = handler.onZTreeMouseup;
					break;
				case "dblclick":
					s = handler.onZTreeDblclick;
					break;
				case "contextmenu":
					s = handler.onZTreeContextmenu
			}
			var c = {
				stop: !1,
				node: o,
				nodeEventType: r,
				nodeEventCallback: l,
				treeEventType: i,
				treeEventCallback: s
			};
			return c
		}, _initNode = function(e, t, n, a, o, r, i) {
			if (n) {
				var l = data.getRoot(e),
					s = e.data.key.children;
				n.level = t, n.tId = e.treeId + "_" + ++l.zId, n.parentTId = a ? a.tId : null, n.open = "string" == typeof n.open ? tools.eqs(n.open, "true") : !! n.open, n[s] && n[s].length > 0 ? (n.isParent = !0, n.zAsync = !0) : (n.isParent = "string" == typeof n.isParent ? tools.eqs(n.isParent, "true") : !! n.isParent, n.open = n.isParent && !e.async.enable ? n.open : !1, n.zAsync = !n.isParent), n.isFirstNode = o, n.isLastNode = r, n.getParentNode = function() {
					return data.getNodeCache(e, n.parentTId)
				}, n.getPreNode = function() {
					return data.getPreNode(e, n)
				}, n.getNextNode = function() {
					return data.getNextNode(e, n)
				}, n.isAjaxing = !1, data.fixPIdKeyValue(e, n)
			}
		}, _init = {
			bind: [_bindEvent],
			unbind: [_unbindEvent],
			caches: [_initCache],
			nodes: [_initNode],
			proxys: [_eventProxy],
			roots: [_initRoot],
			beforeA: [],
			afterA: [],
			innerBeforeA: [],
			innerAfterA: [],
			zTreeTools: []
		}, data = {
			addNodeCache: function(e, t) {
				data.getCache(e).nodes[data.getNodeCacheId(t.tId)] = t
			},
			getNodeCacheId: function(e) {
				return e.substring(e.lastIndexOf("_") + 1)
			},
			addAfterA: function(e) {
				_init.afterA.push(e)
			},
			addBeforeA: function(e) {
				_init.beforeA.push(e)
			},
			addInnerAfterA: function(e) {
				_init.innerAfterA.push(e)
			},
			addInnerBeforeA: function(e) {
				_init.innerBeforeA.push(e)
			},
			addInitBind: function(e) {
				_init.bind.push(e)
			},
			addInitUnBind: function(e) {
				_init.unbind.push(e)
			},
			addInitCache: function(e) {
				_init.caches.push(e)
			},
			addInitNode: function(e) {
				_init.nodes.push(e)
			},
			addInitProxy: function(e, t) {
				t ? _init.proxys.splice(0, 0, e) : _init.proxys.push(e)
			},
			addInitRoot: function(e) {
				_init.roots.push(e)
			},
			addNodesData: function(e, t, n) {
				var a = e.data.key.children;
				t[a] || (t[a] = []), t[a].length > 0 && (t[a][t[a].length - 1].isLastNode = !1, view.setNodeLineIcos(e, t[a][t[a].length - 1])), t.isParent = !0, t[a] = t[a].concat(n)
			},
			addSelectedNode: function(e, t) {
				var n = data.getRoot(e);
				data.isSelectedNode(e, t) || n.curSelectedList.push(t)
			},
			addCreatedNode: function(e, t) {
				if (e.callback.onNodeCreated || e.view.addDiyDom) {
					var n = data.getRoot(e);
					n.createdNodes.push(t)
				}
			},
			addZTreeTools: function(e) {
				_init.zTreeTools.push(e)
			},
			exSetting: function(e) {
				$.extend(!0, _setting, e)
			},
			fixPIdKeyValue: function(e, t) {
				e.data.simpleData.enable && (t[e.data.simpleData.pIdKey] = t.parentTId ? t.getParentNode()[e.data.simpleData.idKey] : e.data.simpleData.rootPId)
			},
			getAfterA: function(e, t, n) {
				for (var a = 0, o = _init.afterA.length; o > a; a++) _init.afterA[a].apply(this, arguments)
			},
			getBeforeA: function(e, t, n) {
				for (var a = 0, o = _init.beforeA.length; o > a; a++) _init.beforeA[a].apply(this, arguments)
			},
			getInnerAfterA: function(e, t, n) {
				for (var a = 0, o = _init.innerAfterA.length; o > a; a++) _init.innerAfterA[a].apply(this, arguments)
			},
			getInnerBeforeA: function(e, t, n) {
				for (var a = 0, o = _init.innerBeforeA.length; o > a; a++) _init.innerBeforeA[a].apply(this, arguments)
			},
			getCache: function(e) {
				return caches[e.treeId]
			},
			getNextNode: function(e, t) {
				if (!t) return null;
				for (var n = e.data.key.children, a = t.parentTId ? t.getParentNode() : data.getRoot(e), o = 0, r = a[n].length - 1; r >= o; o++)
					if (a[n][o] === t) return o == r ? null : a[n][o + 1];
				return null
			},
			getNodeByParam: function(e, t, n, a) {
				if (!t || !n) return null;
				for (var o = e.data.key.children, r = 0, i = t.length; i > r; r++) {
					if (t[r][n] == a) return t[r];
					var l = data.getNodeByParam(e, t[r][o], n, a);
					if (l) return l
				}
				return null
			},
			getNodeCache: function(e, t) {
				if (!t) return null;
				var n = caches[e.treeId].nodes[data.getNodeCacheId(t)];
				return n ? n : null
			},
			getNodeName: function(e, t) {
				var n = e.data.key.name;
				return "" + t[n]
			},
			getNodeTitle: function(e, t) {
				var n = "" === e.data.key.title ? e.data.key.name : e.data.key.title;
				return "" + t[n]
			},
			getNodes: function(e) {
				return data.getRoot(e)[e.data.key.children]
			},
			getNodesByParam: function(e, t, n, a) {
				if (!t || !n) return [];
				for (var o = e.data.key.children, r = [], i = 0, l = t.length; l > i; i++) t[i][n] == a && r.push(t[i]), r = r.concat(data.getNodesByParam(e, t[i][o], n, a));
				return r
			},
			getNodesByParamFuzzy: function(e, t, n, a) {
				if (!t || !n) return [];
				var o = e.data.key.children,
					r = [];
				a = a.toLowerCase();
				for (var i = 0, l = t.length; l > i; i++) "string" == typeof t[i][n] && t[i][n].toLowerCase().indexOf(a) > -1 && r.push(t[i]), r = r.concat(data.getNodesByParamFuzzy(e, t[i][o], n, a));
				return r
			},
			getNodesByFilter: function(e, t, n, a, o) {
				if (!t) return a ? null : [];
				for (var r = e.data.key.children, i = a ? null : [], l = 0, s = t.length; s > l; l++) {
					if (tools.apply(n, [t[l], o], !1)) {
						if (a) return t[l];
						i.push(t[l])
					}
					var d = data.getNodesByFilter(e, t[l][r], n, a, o);
					if (a && d) return d;
					i = a ? d : i.concat(d)
				}
				return i
			},
			getPreNode: function(e, t) {
				if (!t) return null;
				for (var n = e.data.key.children, a = t.parentTId ? t.getParentNode() : data.getRoot(e), o = 0, r = a[n].length; r > o; o++)
					if (a[n][o] === t) return 0 == o ? null : a[n][o - 1];
				return null
			},
			getRoot: function(e) {
				return e ? roots[e.treeId] : null
			},
			getRoots: function() {
				return roots
			},
			getSetting: function(e) {
				return settings[e]
			},
			getSettings: function() {
				return settings
			},
			getZTreeTools: function(e) {
				var t = this.getRoot(this.getSetting(e));
				return t ? t.treeTools : null
			},
			initCache: function(e) {
				for (var t = 0, n = _init.caches.length; n > t; t++) _init.caches[t].apply(this, arguments)
			},
			initNode: function(e, t, n, a, o, r) {
				for (var i = 0, l = _init.nodes.length; l > i; i++) _init.nodes[i].apply(this, arguments)
			},
			initRoot: function(e) {
				for (var t = 0, n = _init.roots.length; n > t; t++) _init.roots[t].apply(this, arguments)
			},
			isSelectedNode: function(e, t) {
				for (var n = data.getRoot(e), a = 0, o = n.curSelectedList.length; o > a; a++)
					if (t === n.curSelectedList[a]) return !0;
				return !1
			},
			removeNodeCache: function(e, t) {
				var n = e.data.key.children;
				if (t[n])
					for (var a = 0, o = t[n].length; o > a; a++) arguments.callee(e, t[n][a]);
				data.getCache(e).nodes[data.getNodeCacheId(t.tId)] = null
			},
			removeSelectedNode: function(e, t) {
				for (var n = data.getRoot(e), a = 0, o = n.curSelectedList.length; o > a; a++) t !== n.curSelectedList[a] && data.getNodeCache(e, n.curSelectedList[a].tId) || (n.curSelectedList.splice(a, 1), a--, o--)
			},
			setCache: function(e, t) {
				caches[e.treeId] = t
			},
			setRoot: function(e, t) {
				roots[e.treeId] = t
			},
			setZTreeTools: function(e, t) {
				for (var n = 0, a = _init.zTreeTools.length; a > n; n++) _init.zTreeTools[n].apply(this, arguments)
			},
			transformToArrayFormat: function(e, t) {
				if (!t) return [];
				var n = e.data.key.children,
					a = [];
				if (tools.isArray(t))
					for (var o = 0, r = t.length; r > o; o++) a.push(t[o]), t[o][n] && (a = a.concat(data.transformToArrayFormat(e, t[o][n])));
				else a.push(t), t[n] && (a = a.concat(data.transformToArrayFormat(e, t[n])));
				return a
			},
			transformTozTreeFormat: function(e, t) {
				var n, a, o = e.data.simpleData.idKey,
					r = e.data.simpleData.pIdKey,
					i = e.data.key.children;
				if (!o || "" == o || !t) return [];
				if (tools.isArray(t)) {
					var l = [],
						s = [];
					for (n = 0, a = t.length; a > n; n++) s[t[n][o]] = t[n];
					for (n = 0, a = t.length; a > n; n++) s[t[n][r]] && t[n][o] != t[n][r] ? (s[t[n][r]][i] || (s[t[n][r]][i] = []), s[t[n][r]][i].push(t[n])) : l.push(t[n]);
					return l
				}
				return [t]
			}
		}, event = {
			bindEvent: function(e) {
				for (var t = 0, n = _init.bind.length; n > t; t++) _init.bind[t].apply(this, arguments)
			},
			unbindEvent: function(e) {
				for (var t = 0, n = _init.unbind.length; n > t; t++) _init.unbind[t].apply(this, arguments)
			},
			bindTree: function(e) {
				var t = {
					treeId: e.treeId
				}, n = e.treeObj;
				e.view.txtSelectedEnable || n.bind("selectstart", function(e) {
					var t = e.originalEvent.srcElement.nodeName.toLowerCase();
					return "input" === t || "textarea" === t
				}).css({
					"-moz-user-select": "-moz-none"
				}), n.bind("click", t, event.proxy), n.bind("dblclick", t, event.proxy), n.bind("mouseover", t, event.proxy), n.bind("mouseout", t, event.proxy), n.bind("mousedown", t, event.proxy), n.bind("mouseup", t, event.proxy), n.bind("contextmenu", t, event.proxy)
			},
			unbindTree: function(e) {
				var t = e.treeObj;
				t.unbind("click", event.proxy).unbind("dblclick", event.proxy).unbind("mouseover", event.proxy).unbind("mouseout", event.proxy).unbind("mousedown", event.proxy).unbind("mouseup", event.proxy).unbind("contextmenu", event.proxy)
			},
			doProxy: function(e) {
				for (var t = [], n = 0, a = _init.proxys.length; a > n; n++) {
					var o = _init.proxys[n].apply(this, arguments);
					if (t.push(o), o.stop) break
				}
				return t
			},
			proxy: function(e) {
				var t = data.getSetting(e.data.treeId);
				if (!tools.uCanDo(t, e)) return !0;
				for (var n = event.doProxy(e), a = !0, o = !1, r = 0, i = n.length; i > r; r++) {
					var l = n[r];
					l.nodeEventCallback && (o = !0, a = l.nodeEventCallback.apply(l, [e, l.node]) && a), l.treeEventCallback && (o = !0, a = l.treeEventCallback.apply(l, [e, l.node]) && a)
				}
				return a
			}
		}, handler = {
			onSwitchNode: function(e, t) {
				var n = data.getSetting(e.data.treeId);
				if (t.open) {
					if (0 == tools.apply(n.callback.beforeCollapse, [n.treeId, t], !0)) return !0;
					data.getRoot(n).expandTriggerFlag = !0, view.switchNode(n, t)
				} else {
					if (0 == tools.apply(n.callback.beforeExpand, [n.treeId, t], !0)) return !0;
					data.getRoot(n).expandTriggerFlag = !0, view.switchNode(n, t)
				}
				return !0
			},
			onClickNode: function(e, t) {
				var n = data.getSetting(e.data.treeId),
					a = n.view.autoCancelSelected && e.ctrlKey && data.isSelectedNode(n, t) ? 0 : n.view.autoCancelSelected && e.ctrlKey && n.view.selectedMulti ? 2 : 1;
				return 0 == tools.apply(n.callback.beforeClick, [n.treeId, t, a], !0) ? !0 : (0 === a ? view.cancelPreSelectedNode(n, t) : view.selectNode(n, t, 2 === a), n.treeObj.trigger(consts.event.CLICK, [e, n.treeId, t, a]), !0)
			},
			onZTreeMousedown: function(e, t) {
				var n = data.getSetting(e.data.treeId);
				return tools.apply(n.callback.beforeMouseDown, [n.treeId, t], !0) && tools.apply(n.callback.onMouseDown, [e, n.treeId, t]), !0
			},
			onZTreeMouseup: function(e, t) {
				var n = data.getSetting(e.data.treeId);
				return tools.apply(n.callback.beforeMouseUp, [n.treeId, t], !0) && tools.apply(n.callback.onMouseUp, [e, n.treeId, t]), !0
			},
			onZTreeDblclick: function(e, t) {
				var n = data.getSetting(e.data.treeId);
				return tools.apply(n.callback.beforeDblClick, [n.treeId, t], !0) && tools.apply(n.callback.onDblClick, [e, n.treeId, t]), !0
			},
			onZTreeContextmenu: function(e, t) {
				var n = data.getSetting(e.data.treeId);
				return tools.apply(n.callback.beforeRightClick, [n.treeId, t], !0) && tools.apply(n.callback.onRightClick, [e, n.treeId, t]), "function" != typeof n.callback.onRightClick
			}
		}, tools = {
			apply: function(e, t, n) {
				return "function" == typeof e ? e.apply(zt, t ? t : []) : n
			},
			canAsync: function(e, t) {
				var n = e.data.key.children;
				return e.async.enable && t && t.isParent && !(t.zAsync || t[n] && t[n].length > 0)
			},
			clone: function(e) {
				if (null === e) return null;
				var t = tools.isArray(e) ? [] : {};
				for (var n in e) t[n] = e[n] instanceof Date ? new Date(e[n].getTime()) : "object" == typeof e[n] ? arguments.callee(e[n]) : e[n];
				return t
			},
			eqs: function(e, t) {
				return e.toLowerCase() === t.toLowerCase()
			},
			isArray: function(e) {
				return "[object Array]" === Object.prototype.toString.apply(e)
			},
			$: function(e, t, n) {
				return t && "string" != typeof t && (n = t, t = ""), "string" == typeof e ? $(e, n ? n.treeObj.get(0).ownerDocument : null) : $("#" + e.tId + t, n ? n.treeObj : null)
			},
			getMDom: function(e, t, n) {
				if (!t) return null;
				for (; t && t.id !== e.treeId;) {
					for (var a = 0, o = n.length; t.tagName && o > a; a++)
						if (tools.eqs(t.tagName, n[a].tagName) && null !== t.getAttribute(n[a].attrName)) return t;
					t = t.parentNode
				}
				return null
			},
			getNodeMainDom: function(e) {
				return $(e).parent("li").get(0) || $(e).parentsUntil("li").parent().get(0)
			},
			isChildOrSelf: function(e, t) {
				return $(e).closest("#" + t).length > 0
			},
			uCanDo: function(e, t) {
				return !0
			}
		}, view = {
			addNodes: function(e, t, n, a) {
				if (!e.data.keep.leaf || !t || t.isParent)
					if (tools.isArray(n) || (n = [n]), e.data.simpleData.enable && (n = data.transformTozTreeFormat(e, n)), t) {
						var o = $$(t, consts.id.SWITCH, e),
							r = $$(t, consts.id.ICON, e),
							i = $$(t, consts.id.UL, e);
						t.open || (view.replaceSwitchClass(t, o, consts.folder.CLOSE), view.replaceIcoClass(t, r, consts.folder.CLOSE), t.open = !1, i.css({
							display: "none"
						})), data.addNodesData(e, t, n), view.createNodes(e, t.level + 1, n, t), a || view.expandCollapseParentNode(e, t, !0)
					} else data.addNodesData(e, data.getRoot(e), n), view.createNodes(e, 0, n, null)
			},
			appendNodes: function(e, t, n, a, o, r) {
				if (!n) return [];
				for (var i = [], l = e.data.key.children, s = 0, d = n.length; d > s; s++) {
					var c = n[s];
					if (o) {
						var u = a ? a : data.getRoot(e),
							p = u[l],
							g = p.length == n.length && 0 == s,
							f = s == n.length - 1;
						data.initNode(e, t, c, a, g, f, r), data.addNodeCache(e, c)
					}
					var h = [];
					c[l] && c[l].length > 0 && (h = view.appendNodes(e, t + 1, c[l], c, o, r && c.open)), r && (view.makeDOMNodeMainBefore(i, e, c), view.makeDOMNodeLine(i, e, c), data.getBeforeA(e, c, i), view.makeDOMNodeNameBefore(i, e, c), data.getInnerBeforeA(e, c, i), view.makeDOMNodeIcon(i, e, c), data.getInnerAfterA(e, c, i), view.makeDOMNodeNameAfter(i, e, c), data.getAfterA(e, c, i), c.isParent && c.open && view.makeUlHtml(e, c, i, h.join("")), view.makeDOMNodeMainAfter(i, e, c), data.addCreatedNode(e, c))
				}
				return i
			},
			appendParentULDom: function(e, t) {
				var n = [],
					a = $$(t, e);
				!a.get(0) && t.parentTId && (view.appendParentULDom(e, t.getParentNode()), a = $$(t, e));
				var o = $$(t, consts.id.UL, e);
				o.get(0) && o.remove();
				var r = e.data.key.children,
					i = view.appendNodes(e, t.level + 1, t[r], t, !1, !0);
				view.makeUlHtml(e, t, n, i.join("")), a.append(n.join(""))
			},
			asyncNode: function(setting, node, isSilent, callback) {
				var i, l;
				if (node && !node.isParent) return tools.apply(callback), !1;
				if (node && node.isAjaxing) return !1;
				if (0 == tools.apply(setting.callback.beforeAsync, [setting.treeId, node], !0)) return tools.apply(callback), !1;
				if (node) {
					node.isAjaxing = !0;
					var icoObj = $$(node, consts.id.ICON, setting);
					icoObj.attr({
						style: "",
						"class": consts.className.BUTTON + " " + consts.className.ICO_LOADING
					})
				}
				var tmpParam = {};
				for (i = 0, l = setting.async.autoParam.length; node && l > i; i++) {
					var pKey = setting.async.autoParam[i].split("="),
						spKey = pKey;
					pKey.length > 1 && (spKey = pKey[1], pKey = pKey[0]), tmpParam[spKey] = node[pKey]
				}
				if (tools.isArray(setting.async.otherParam))
					for (i = 0, l = setting.async.otherParam.length; l > i; i += 2) tmpParam[setting.async.otherParam[i]] = setting.async.otherParam[i + 1];
				else
					for (var p in setting.async.otherParam) tmpParam[p] = setting.async.otherParam[p];
				var _tmpV = data.getRoot(setting)._ver;
				return $.ajax({
					contentType: setting.async.contentType,
					type: setting.async.type,
					url: tools.apply(setting.async.url, [setting.treeId, node], setting.async.url),
					data: tmpParam,
					dataType: setting.async.dataType,
					success: function(msg) {
						if (_tmpV == data.getRoot(setting)._ver) {
							var newNodes = [];
							try {
								newNodes = msg && 0 != msg.length ? "string" == typeof msg ? eval("(" + msg + ")") : msg : []
							} catch (err) {
								newNodes = msg
							}
							node && (node.isAjaxing = null, node.zAsync = !0), view.setNodeLineIcos(setting, node), newNodes && "" !== newNodes ? (newNodes = tools.apply(setting.async.dataFilter, [setting.treeId, node, newNodes], newNodes), view.addNodes(setting, node, newNodes ? tools.clone(newNodes) : [], !! isSilent)) : view.addNodes(setting, node, [], !! isSilent), setting.treeObj.trigger(consts.event.ASYNC_SUCCESS, [setting.treeId, node, msg]), tools.apply(callback)
						}
					},
					error: function(e, t, n) {
						_tmpV == data.getRoot(setting)._ver && (node && (node.isAjaxing = null), view.setNodeLineIcos(setting, node), setting.treeObj.trigger(consts.event.ASYNC_ERROR, [setting.treeId, node, e, t, n]))
					}
				}), !0
			},
			cancelPreSelectedNode: function(e, t) {
				for (var n = data.getRoot(e).curSelectedList, a = 0, o = n.length - 1; o >= a; o--)
					if ((!t || t === n[o]) && ($$(n[o], consts.id.A, e).removeClass(consts.node.CURSELECTED), t)) {
						data.removeSelectedNode(e, t);
						break
					}
				t || (data.getRoot(e).curSelectedList = [])
			},
			createNodeCallback: function(e) {
				if (e.callback.onNodeCreated || e.view.addDiyDom)
					for (var t = data.getRoot(e); t.createdNodes.length > 0;) {
						var n = t.createdNodes.shift();
						tools.apply(e.view.addDiyDom, [e.treeId, n]), e.callback.onNodeCreated && e.treeObj.trigger(consts.event.NODECREATED, [e.treeId, n])
					}
			},
			createNodes: function(e, t, n, a) {
				if (n && 0 != n.length) {
					var o = data.getRoot(e),
						r = e.data.key.children,
						i = !a || a.open || !! $$(a[r][0], e).get(0);
					o.createdNodes = [];
					var l = view.appendNodes(e, t, n, a, !0, i);
					if (a) {
						var s = $$(a, consts.id.UL, e);
						s.get(0) && s.append(l.join(""))
					} else e.treeObj.append(l.join(""));
					view.createNodeCallback(e)
				}
			},
			destroy: function(e) {
				e && (data.initCache(e), data.initRoot(e), event.unbindTree(e), event.unbindEvent(e), e.treeObj.empty())
			},
			expandCollapseNode: function(e, t, n, a, o) {
				var r = data.getRoot(e),
					i = e.data.key.children;
				if (!t) return void tools.apply(o, []);
				if (r.expandTriggerFlag) {
					var l = o;
					o = function() {
						l && l(), t.open ? e.treeObj.trigger(consts.event.EXPAND, [e.treeId, t]) : e.treeObj.trigger(consts.event.COLLAPSE, [e.treeId, t])
					}, r.expandTriggerFlag = !1
				}
				if (!t.open && t.isParent && (!$$(t, consts.id.UL, e).get(0) || t[i] && t[i].length > 0 && !$$(t[i][0], e).get(0)) && (view.appendParentULDom(e, t), view.createNodeCallback(e)), t.open == n) return void tools.apply(o, []);
				var s = $$(t, consts.id.UL, e),
					d = $$(t, consts.id.SWITCH, e),
					c = $$(t, consts.id.ICON, e);
				t.isParent ? (t.open = !t.open, t.iconOpen && t.iconClose && c.attr("style", view.makeNodeIcoStyle(e, t)), t.open ? (view.replaceSwitchClass(t, d, consts.folder.OPEN), view.replaceIcoClass(t, c, consts.folder.OPEN), 0 == a || "" == e.view.expandSpeed ? (s.show(), tools.apply(o, [])) : t[i] && t[i].length > 0 ? s.slideDown(e.view.expandSpeed, o) : (s.show(), tools.apply(o, []))) : (view.replaceSwitchClass(t, d, consts.folder.CLOSE), view.replaceIcoClass(t, c, consts.folder.CLOSE), 0 != a && "" != e.view.expandSpeed && t[i] && t[i].length > 0 ? s.slideUp(e.view.expandSpeed, o) : (s.hide(), tools.apply(o, [])))) : tools.apply(o, [])
			},
			expandCollapseParentNode: function(e, t, n, a, o) {
				if (t) {
					if (!t.parentTId) return void view.expandCollapseNode(e, t, n, a, o);
					view.expandCollapseNode(e, t, n, a), t.parentTId && view.expandCollapseParentNode(e, t.getParentNode(), n, a, o)
				}
			},
			expandCollapseSonNode: function(e, t, n, a, o) {
				var r = data.getRoot(e),
					i = e.data.key.children,
					l = t ? t[i] : r[i],
					s = t ? !1 : a,
					d = data.getRoot(e).expandTriggerFlag;
				if (data.getRoot(e).expandTriggerFlag = !1, l)
					for (var c = 0, u = l.length; u > c; c++) l[c] && view.expandCollapseSonNode(e, l[c], n, s);
				data.getRoot(e).expandTriggerFlag = d, view.expandCollapseNode(e, t, n, a, o)
			},
			makeDOMNodeIcon: function(e, t, n) {
				var a = data.getNodeName(t, n),
					o = t.view.nameIsHTML ? a : a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
				e.push("<span id='", n.tId, consts.id.ICON, "' title='' treeNode", consts.id.ICON, " class='", view.makeNodeIcoClass(t, n), "' style='", view.makeNodeIcoStyle(t, n), "'></span><span id='", n.tId, consts.id.SPAN, "'>", o, "</span>")
			},
			makeDOMNodeLine: function(e, t, n) {
				e.push("<span id='", n.tId, consts.id.SWITCH, "' title='' class='", view.makeNodeLineClass(t, n), "' treeNode", consts.id.SWITCH, "></span>")
			},
			makeDOMNodeMainAfter: function(e, t, n) {
				e.push("</li>")
			},
			makeDOMNodeMainBefore: function(e, t, n) {
				e.push("<li id='", n.tId, "' class='", consts.className.LEVEL, n.level, "' tabindex='0' hidefocus='true' treenode>")
			},
			makeDOMNodeNameAfter: function(e, t, n) {
				e.push("</a>")
			},
			makeDOMNodeNameBefore: function(e, t, n) {
				var a = data.getNodeTitle(t, n),
					o = view.makeNodeUrl(t, n),
					r = view.makeNodeFontCss(t, n),
					i = [];
				for (var l in r) i.push(l, ":", r[l], ";");
				e.push("<a id='", n.tId, consts.id.A, "' class='", consts.className.LEVEL, n.level, "' treeNode", consts.id.A, ' onclick="', n.click || "", '" ', null != o && o.length > 0 ? "href='" + o + "'" : "", " target='", view.makeNodeTarget(n), "' style='", i.join(""), "'"), tools.apply(t.view.showTitle, [t.treeId, n], t.view.showTitle) && a && e.push("title='", a.replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), "'"), e.push(">")
			},
			makeNodeFontCss: function(e, t) {
				var n = tools.apply(e.view.fontCss, [e.treeId, t], e.view.fontCss);
				return n && "function" != typeof n ? n : {}
			},
			makeNodeIcoClass: function(e, t) {
				var n = ["ico"];
				return t.isAjaxing || (n[0] = (t.iconSkin ? t.iconSkin + "_" : "") + n[0], t.isParent ? n.push(t.open ? consts.folder.OPEN : consts.folder.CLOSE) : n.push(consts.folder.DOCU)), consts.className.BUTTON + " " + n.join("_")
			},
			makeNodeIcoStyle: function(e, t) {
				var n = [];
				if (!t.isAjaxing) {
					var a = t.isParent && t.iconOpen && t.iconClose ? t.open ? t.iconOpen : t.iconClose : t.icon;
					a && n.push("background:url(", a, ") 0 0 no-repeat;"), 0 != e.view.showIcon && tools.apply(e.view.showIcon, [e.treeId, t], !0) || n.push("width:0px;height:0px;")
				}
				return n.join("")
			},
			makeNodeLineClass: function(e, t) {
				var n = [];
				return e.view.showLine ? 0 == t.level && t.isFirstNode && t.isLastNode ? n.push(consts.line.ROOT) : 0 == t.level && t.isFirstNode ? n.push(consts.line.ROOTS) : t.isLastNode ? n.push(consts.line.BOTTOM) : n.push(consts.line.CENTER) : n.push(consts.line.NOLINE), t.isParent ? n.push(t.open ? consts.folder.OPEN : consts.folder.CLOSE) : n.push(consts.folder.DOCU), view.makeNodeLineClassEx(t) + n.join("_")
			},
			makeNodeLineClassEx: function(e) {
				return consts.className.BUTTON + " " + consts.className.LEVEL + e.level + " " + consts.className.SWITCH + " "
			},
			makeNodeTarget: function(e) {
				return e.target || "_blank"
			},
			makeNodeUrl: function(e, t) {
				var n = e.data.key.url;
				return t[n] ? t[n] : null
			},
			makeUlHtml: function(e, t, n, a) {
				n.push("<ul id='", t.tId, consts.id.UL, "' class='", consts.className.LEVEL, t.level, " ", view.makeUlLineClass(e, t), "' style='display:", t.open ? "block" : "none", "'>"), n.push(a), n.push("</ul>")
			},
			makeUlLineClass: function(e, t) {
				return e.view.showLine && !t.isLastNode ? consts.line.LINE : ""
			},
			removeChildNodes: function(e, t) {
				if (t) {
					var n = e.data.key.children,
						a = t[n];
					if (a) {
						for (var o = 0, r = a.length; r > o; o++) data.removeNodeCache(e, a[o]);
						if (data.removeSelectedNode(e), delete t[n], e.data.keep.parent) $$(t, consts.id.UL, e).empty();
						else {
							t.isParent = !1, t.open = !1;
							var i = $$(t, consts.id.SWITCH, e),
								l = $$(t, consts.id.ICON, e);
							view.replaceSwitchClass(t, i, consts.folder.DOCU), view.replaceIcoClass(t, l, consts.folder.DOCU), $$(t, consts.id.UL, e).remove()
						}
					}
				}
			},
			setFirstNode: function(e, t) {
				var n = e.data.key.children,
					a = t[n].length;
				a > 0 && (t[n][0].isFirstNode = !0)
			},
			setLastNode: function(e, t) {
				var n = e.data.key.children,
					a = t[n].length;
				a > 0 && (t[n][a - 1].isLastNode = !0)
			},
			removeNode: function(e, t) {
				var n = data.getRoot(e),
					a = e.data.key.children,
					o = t.parentTId ? t.getParentNode() : n;
				if (t.isFirstNode = !1, t.isLastNode = !1, t.getPreNode = function() {
					return null
				}, t.getNextNode = function() {
					return null
				}, data.getNodeCache(e, t.tId)) {
					$$(t, e).remove(), data.removeNodeCache(e, t), data.removeSelectedNode(e, t);
					for (var r = 0, i = o[a].length; i > r; r++)
						if (o[a][r].tId == t.tId) {
							o[a].splice(r, 1);
							break
						}
					view.setFirstNode(e, o), view.setLastNode(e, o);
					var l, s, d, c = o[a].length;
					if (e.data.keep.parent || 0 != c) {
						if (e.view.showLine && c > 0) {
							var u = o[a][c - 1];
							if (l = $$(u, consts.id.UL, e), s = $$(u, consts.id.SWITCH, e), d = $$(u, consts.id.ICON, e), o == n)
								if (1 == o[a].length) view.replaceSwitchClass(u, s, consts.line.ROOT);
								else {
									var p = $$(o[a][0], consts.id.SWITCH, e);
									view.replaceSwitchClass(o[a][0], p, consts.line.ROOTS), view.replaceSwitchClass(u, s, consts.line.BOTTOM)
								} else view.replaceSwitchClass(u, s, consts.line.BOTTOM);
							l.removeClass(consts.line.LINE)
						}
					} else o.isParent = !1, o.open = !1, l = $$(o, consts.id.UL, e), s = $$(o, consts.id.SWITCH, e), d = $$(o, consts.id.ICON, e), view.replaceSwitchClass(o, s, consts.folder.DOCU), view.replaceIcoClass(o, d, consts.folder.DOCU), l.css("display", "none")
				}
			},
			replaceIcoClass: function(e, t, n) {
				if (t && !e.isAjaxing) {
					var a = t.attr("class");
					if (void 0 != a) {
						var o = a.split("_");
						switch (n) {
							case consts.folder.OPEN:
							case consts.folder.CLOSE:
							case consts.folder.DOCU:
								o[o.length - 1] = n
						}
						t.attr("class", o.join("_"))
					}
				}
			},
			replaceSwitchClass: function(e, t, n) {
				if (t) {
					var a = t.attr("class");
					if (void 0 != a) {
						var o = a.split("_");
						switch (n) {
							case consts.line.ROOT:
							case consts.line.ROOTS:
							case consts.line.CENTER:
							case consts.line.BOTTOM:
							case consts.line.NOLINE:
								o[0] = view.makeNodeLineClassEx(e) + n;
								break;
							case consts.folder.OPEN:
							case consts.folder.CLOSE:
							case consts.folder.DOCU:
								o[1] = n
						}
						t.attr("class", o.join("_")), n !== consts.folder.DOCU ? t.removeAttr("disabled") : t.attr("disabled", "disabled")
					}
				}
			},
			selectNode: function(e, t, n) {
				n || view.cancelPreSelectedNode(e), $$(t, consts.id.A, e).addClass(consts.node.CURSELECTED), data.addSelectedNode(e, t)
			},
			setNodeFontCss: function(e, t) {
				var n = $$(t, consts.id.A, e),
					a = view.makeNodeFontCss(e, t);
				a && n.css(a)
			},
			setNodeLineIcos: function(e, t) {
				if (t) {
					var n = $$(t, consts.id.SWITCH, e),
						a = $$(t, consts.id.UL, e),
						o = $$(t, consts.id.ICON, e),
						r = view.makeUlLineClass(e, t);
					0 == r.length ? a.removeClass(consts.line.LINE) : a.addClass(r), n.attr("class", view.makeNodeLineClass(e, t)), t.isParent ? n.removeAttr("disabled") : n.attr("disabled", "disabled"), o.removeAttr("style"), o.attr("style", view.makeNodeIcoStyle(e, t)), o.attr("class", view.makeNodeIcoClass(e, t))
				}
			},
			setNodeName: function(e, t) {
				var n = data.getNodeTitle(e, t),
					a = $$(t, consts.id.SPAN, e);
				if (a.empty(), e.view.nameIsHTML ? a.html(data.getNodeName(e, t)) : a.text(data.getNodeName(e, t)), tools.apply(e.view.showTitle, [e.treeId, t], e.view.showTitle)) {
					var o = $$(t, consts.id.A, e);
					o.attr("title", n ? n : "")
				}
			},
			setNodeTarget: function(e, t) {
				var n = $$(t, consts.id.A, e);
				n.attr("target", view.makeNodeTarget(t))
			},
			setNodeUrl: function(e, t) {
				var n = $$(t, consts.id.A, e),
					a = view.makeNodeUrl(e, t);
				null == a || 0 == a.length ? n.removeAttr("href") : n.attr("href", a)
			},
			switchNode: function(e, t) {
				if (t.open || !tools.canAsync(e, t)) view.expandCollapseNode(e, t, !t.open);
				else if (e.async.enable) {
					if (!view.asyncNode(e, t)) return void view.expandCollapseNode(e, t, !t.open)
				} else t && view.expandCollapseNode(e, t, !t.open)
			}
		};
	$.fn.zTree = {
		consts: _consts,
		_z: {
			tools: tools,
			view: view,
			event: event,
			data: data
		},
		getZTreeObj: function(e) {
			var t = data.getZTreeTools(e);
			return t ? t : null
		},
		destroy: function(e) {
			if (e && e.length > 0) view.destroy(data.getSetting(e));
			else
				for (var t in settings) view.destroy(settings[t])
		},
		init: function(e, t, n) {
			var a = tools.clone(_setting);
			$.extend(!0, a, t), a.treeId = e.attr("id"), a.treeObj = e, a.treeObj.empty(), settings[a.treeId] = a, "undefined" == typeof document.body.style.maxHeight && (a.view.expandSpeed = ""), data.initRoot(a);
			var o = data.getRoot(a),
				r = a.data.key.children;
			n = n ? tools.clone(tools.isArray(n) ? n : [n]) : [], a.data.simpleData.enable ? o[r] = data.transformTozTreeFormat(a, n) : o[r] = n, data.initCache(a), event.unbindTree(a), event.bindTree(a), event.unbindEvent(a), event.bindEvent(a);
			var i = {
				setting: a,
				addNodes: function(e, t, n) {
					function o() {
						view.addNodes(a, e, r, 1 == n)
					}
					if (!t) return null;
					if (e || (e = null), e && !e.isParent && a.data.keep.leaf) return null;
					var r = tools.clone(tools.isArray(t) ? t : [t]);
					return tools.canAsync(a, e) ? view.asyncNode(a, e, n, o) : o(), r
				},
				cancelSelectedNode: function(e) {
					view.cancelPreSelectedNode(a, e)
				},
				destroy: function() {
					view.destroy(a)
				},
				expandAll: function(e) {
					return e = !! e, view.expandCollapseSonNode(a, null, e, !0), e
				},
				expandNode: function(e, t, n, o, r) {
					if (!e || !e.isParent) return null;
					if (t !== !0 && t !== !1 && (t = !e.open), r = !! r, r && t && 0 == tools.apply(a.callback.beforeExpand, [a.treeId, e], !0)) return null;
					if (r && !t && 0 == tools.apply(a.callback.beforeCollapse, [a.treeId, e], !0)) return null;
					if (t && e.parentTId && view.expandCollapseParentNode(a, e.getParentNode(), t, !1), t === e.open && !n) return null;
					if (data.getRoot(a).expandTriggerFlag = r, !tools.canAsync(a, e) && n) view.expandCollapseSonNode(a, e, t, !0, function() {
						if (o !== !1) try {
							$$(e, a).focus().blur()
						} catch (t) {}
					});
					else if (e.open = !t, view.switchNode(this.setting, e), o !== !1) try {
						$$(e, a).focus().blur()
					} catch (i) {}
					return t
				},
				getNodes: function() {
					return data.getNodes(a)
				},
				getNodeByParam: function(e, t, n) {
					return e ? data.getNodeByParam(a, n ? n[a.data.key.children] : data.getNodes(a), e, t) : null
				},
				getNodeByTId: function(e) {
					return data.getNodeCache(a, e)
				},
				getNodesByParam: function(e, t, n) {
					return e ? data.getNodesByParam(a, n ? n[a.data.key.children] : data.getNodes(a), e, t) : null
				},
				getNodesByParamFuzzy: function(e, t, n) {
					return e ? data.getNodesByParamFuzzy(a, n ? n[a.data.key.children] : data.getNodes(a), e, t) : null
				},
				getNodesByFilter: function(e, t, n, o) {
					return t = !! t, e && "function" == typeof e ? data.getNodesByFilter(a, n ? n[a.data.key.children] : data.getNodes(a), e, t, o) : t ? null : []
				},
				getNodeIndex: function(e) {
					if (!e) return null;
					for (var t = a.data.key.children, n = e.parentTId ? e.getParentNode() : data.getRoot(a), o = 0, r = n[t].length; r > o; o++)
						if (n[t][o] == e) return o;
					return -1
				},
				getSelectedNodes: function() {
					for (var e = [], t = data.getRoot(a).curSelectedList, n = 0, o = t.length; o > n; n++) e.push(t[n]);
					return e
				},
				isSelectedNode: function(e) {
					return data.isSelectedNode(a, e)
				},
				reAsyncChildNodes: function(e, t, n) {
					if (this.setting.async.enable) {
						var o = !e;
						if (o && (e = data.getRoot(a)), "refresh" == t) {
							for (var r = this.setting.data.key.children, i = 0, l = e[r] ? e[r].length : 0; l > i; i++) data.removeNodeCache(a, e[r][i]);
							if (data.removeSelectedNode(a), e[r] = [], o) this.setting.treeObj.empty();
							else {
								var s = $$(e, consts.id.UL, a);
								s.empty()
							}
						}
						view.asyncNode(this.setting, o ? null : e, !! n)
					}
				},
				refresh: function() {
					this.setting.treeObj.empty();
					var e = data.getRoot(a),
						t = e[a.data.key.children];
					data.initRoot(a), e[a.data.key.children] = t, data.initCache(a), view.createNodes(a, 0, e[a.data.key.children])
				},
				removeChildNodes: function(e) {
					if (!e) return null;
					var t = a.data.key.children,
						n = e[t];
					return view.removeChildNodes(a, e), n ? n : null
				},
				removeNode: function(e, t) {
					e && (t = !! t, t && 0 == tools.apply(a.callback.beforeRemove, [a.treeId, e], !0) || (view.removeNode(a, e), t && this.setting.treeObj.trigger(consts.event.REMOVE, [a.treeId, e])))
				},
				selectNode: function(e, t) {
					if (e && tools.uCanDo(a)) {
						if (t = a.view.selectedMulti && t, e.parentTId) view.expandCollapseParentNode(a, e.getParentNode(), !0, !1, function() {
							try {
								$$(e, a).focus().blur()
							} catch (t) {}
						});
						else try {
							$$(e, a).focus().blur()
						} catch (n) {}
						view.selectNode(a, e, t)
					}
				},
				transformTozTreeNodes: function(e) {
					return data.transformTozTreeFormat(a, e)
				},
				transformToArray: function(e) {
					return data.transformToArrayFormat(a, e)
				},
				updateNode: function(e, t) {
					if (e) {
						var n = $$(e, a);
						n.get(0) && tools.uCanDo(a) && (view.setNodeName(a, e), view.setNodeTarget(a, e), view.setNodeUrl(a, e), view.setNodeLineIcos(a, e), view.setNodeFontCss(a, e))
					}
				}
			};
			return o.treeTools = i, data.setZTreeTools(a, i), o[r] && o[r].length > 0 ? view.createNodes(a, 0, o[r]) : a.async.enable && a.async.url && "" !== a.async.url && view.asyncNode(a), i
		}
	};
	var zt = $.fn.zTree,
		$$ = tools.$,
		consts = zt.consts
}(jQuery),
function(e) {
	var t = {
		event: {
			CHECK: "ztree_check"
		},
		id: {
			CHECK: "_check"
		},
		checkbox: {
			STYLE: "checkbox",
			DEFAULT: "chk",
			DISABLED: "disable",
			FALSE: "false",
			TRUE: "true",
			FULL: "full",
			PART: "part",
			FOCUS: "focus"
		},
		radio: {
			STYLE: "radio",
			TYPE_ALL: "all",
			TYPE_LEVEL: "level"
		}
	}, n = {
			check: {
				enable: !1,
				autoCheckTrigger: !1,
				chkStyle: t.checkbox.STYLE,
				nocheckInherit: !1,
				chkDisabledInherit: !1,
				radioType: t.radio.TYPE_LEVEL,
				chkboxType: {
					Y: "ps",
					N: "ps"
				}
			},
			data: {
				key: {
					checked: "checked"
				}
			},
			callback: {
				beforeCheck: null,
				onCheck: null
			}
		}, a = function(e) {
			var t = N.getRoot(e);
			t.radioCheckedList = []
		}, o = function(e) {}, r = function(e) {
			var t = e.treeObj,
				n = k.event;
			t.bind(n.CHECK, function(t, n, a, o) {
				b.apply(e.callback.onCheck, [n ? n : t, a, o])
			})
		}, i = function(e) {
			var t = e.treeObj,
				n = k.event;
			t.unbind(n.CHECK)
		}, l = function(e) {
			var t = e.target,
				n = N.getSetting(e.data.treeId),
				a = "",
				o = null,
				r = "",
				i = "",
				l = null,
				s = null;
			if (b.eqs(e.type, "mouseover") ? n.check.enable && b.eqs(t.tagName, "span") && null !== t.getAttribute("treeNode" + k.id.CHECK) && (a = b.getNodeMainDom(t).id, r = "mouseoverCheck") : b.eqs(e.type, "mouseout") ? n.check.enable && b.eqs(t.tagName, "span") && null !== t.getAttribute("treeNode" + k.id.CHECK) && (a = b.getNodeMainDom(t).id, r = "mouseoutCheck") : b.eqs(e.type, "click") && n.check.enable && b.eqs(t.tagName, "span") && null !== t.getAttribute("treeNode" + k.id.CHECK) && (a = b.getNodeMainDom(t).id, r = "checkNode"), a.length > 0) switch (o = N.getNodeCache(n, a), r) {
				case "checkNode":
					l = g.onCheckNode;
					break;
				case "mouseoverCheck":
					l = g.onMouseoverCheck;
					break;
				case "mouseoutCheck":
					l = g.onMouseoutCheck
			}
			var d = {
				stop: "checkNode" === r,
				node: o,
				nodeEventType: r,
				nodeEventCallback: l,
				treeEventType: i,
				treeEventCallback: s
			};
			return d
		}, s = function(e, t, n, a, o, r, i) {
			if (n) {
				var l = e.data.key.checked;
				if ("string" == typeof n[l] && (n[l] = b.eqs(n[l], "true")), n[l] = !! n[l], n.checkedOld = n[l], "string" == typeof n.nocheck && (n.nocheck = b.eqs(n.nocheck, "true")), n.nocheck = !! n.nocheck || e.check.nocheckInherit && a && !! a.nocheck, "string" == typeof n.chkDisabled && (n.chkDisabled = b.eqs(n.chkDisabled, "true")), n.chkDisabled = !! n.chkDisabled || e.check.chkDisabledInherit && a && !! a.chkDisabled, "string" == typeof n.halfCheck && (n.halfCheck = b.eqs(n.halfCheck, "true")), n.halfCheck = !! n.halfCheck, n.check_Child_State = -1, n.check_Focus = !1, n.getCheckStatus = function() {
					return N.getCheckStatus(e, n)
				}, e.check.chkStyle == k.radio.STYLE && e.check.radioType == k.radio.TYPE_ALL && n[l]) {
					var s = N.getRoot(e);
					s.radioCheckedList.push(n)
				}
			}
		}, d = function(e, t, n) {
			e.data.key.checked;
			e.check.enable && (N.makeChkFlag(e, t), n.push("<span ID='", t.tId, k.id.CHECK, "' class='", y.makeChkClass(e, t), "' treeNode", k.id.CHECK, t.nocheck === !0 ? " style='display:none;'" : "", "></span>"))
		}, c = function(e, t) {
			t.checkNode = function(t, n, a, o) {
				var r = e.data.key.checked;
				if (t.chkDisabled !== !0 && (n !== !0 && n !== !1 && (n = !t[r]), o = !! o, (t[r] !== n || a) && (!o || 0 != b.apply(this.setting.callback.beforeCheck, [e.treeId, t], !0)) && b.uCanDo(this.setting) && e.check.enable && t.nocheck !== !0)) {
					t[r] = n;
					var i = C(t, k.id.CHECK, e);
					(a || e.check.chkStyle === k.radio.STYLE) && y.checkNodeRelation(e, t), y.setChkClass(e, i, t), y.repairParentChkClassWithSelf(e, t), o && e.treeObj.trigger(k.event.CHECK, [null, e.treeId, t])
				}
			}, t.checkAllNodes = function(t) {
				y.repairAllChk(e, !! t)
			}, t.getCheckedNodes = function(t) {
				var n = e.data.key.children;
				return t = t !== !1, N.getTreeCheckedNodes(e, N.getRoot(e)[n], t)
			}, t.getChangeCheckedNodes = function() {
				var t = e.data.key.children;
				return N.getTreeChangeCheckedNodes(e, N.getRoot(e)[t])
			}, t.setChkDisabled = function(t, n, a, o) {
				n = !! n, a = !! a, o = !! o, y.repairSonChkDisabled(e, t, n, o), y.repairParentChkDisabled(e, t.getParentNode(), n, a)
			};
			var n = t.updateNode;
			t.updateNode = function(a, o) {
				if (n && n.apply(t, arguments), a && e.check.enable) {
					var r = C(a, e);
					if (r.get(0) && b.uCanDo(e)) {
						var i = C(a, k.id.CHECK, e);
						(1 == o || e.check.chkStyle === k.radio.STYLE) && y.checkNodeRelation(e, a), y.setChkClass(e, i, a), y.repairParentChkClassWithSelf(e, a)
					}
				}
			}
		}, u = {
			getRadioCheckedList: function(e) {
				for (var t = N.getRoot(e).radioCheckedList, n = 0, a = t.length; a > n; n++) N.getNodeCache(e, t[n].tId) || (t.splice(n, 1), n--, a--);
				return t
			},
			getCheckStatus: function(e, t) {
				if (!e.check.enable || t.nocheck || t.chkDisabled) return null;
				var n = e.data.key.checked,
					a = {
						checked: t[n],
						half: t.halfCheck ? t.halfCheck : e.check.chkStyle == k.radio.STYLE ? 2 === t.check_Child_State : t[n] ? t.check_Child_State > -1 && t.check_Child_State < 2 : t.check_Child_State > 0
					};
				return a
			},
			getTreeCheckedNodes: function(e, t, n, a) {
				if (!t) return [];
				var o = e.data.key.children,
					r = e.data.key.checked,
					i = n && e.check.chkStyle == k.radio.STYLE && e.check.radioType == k.radio.TYPE_ALL;
				a = a ? a : [];
				for (var l = 0, s = t.length; s > l && (t[l].nocheck === !0 || t[l].chkDisabled === !0 || t[l][r] != n || (a.push(t[l]), !i)) && (N.getTreeCheckedNodes(e, t[l][o], n, a), !(i && a.length > 0)); l++);
				return a
			},
			getTreeChangeCheckedNodes: function(e, t, n) {
				if (!t) return [];
				var a = e.data.key.children,
					o = e.data.key.checked;
				n = n ? n : [];
				for (var r = 0, i = t.length; i > r; r++) t[r].nocheck !== !0 && t[r].chkDisabled !== !0 && t[r][o] != t[r].checkedOld && n.push(t[r]), N.getTreeChangeCheckedNodes(e, t[r][a], n);
				return n
			},
			makeChkFlag: function(e, t) {
				if (t) {
					var n = e.data.key.children,
						a = e.data.key.checked,
						o = -1;
					if (t[n])
						for (var r = 0, i = t[n].length; i > r; r++) {
							var l = t[n][r],
								s = -1;
							if (e.check.chkStyle == k.radio.STYLE) {
								if (s = l.nocheck === !0 || l.chkDisabled === !0 ? l.check_Child_State : l.halfCheck === !0 ? 2 : l[a] ? 2 : l.check_Child_State > 0 ? 2 : 0, 2 == s) {
									o = 2;
									break
								}
								0 == s && (o = 0)
							} else if (e.check.chkStyle == k.checkbox.STYLE) {
								if (s = l.nocheck === !0 || l.chkDisabled === !0 ? l.check_Child_State : l.halfCheck === !0 ? 1 : l[a] ? -1 === l.check_Child_State || 2 === l.check_Child_State ? 2 : 1 : l.check_Child_State > 0 ? 1 : 0, 1 === s) {
									o = 1;
									break
								}
								if (2 === s && o > -1 && r > 0 && s !== o) {
									o = 1;
									break
								}
								if (2 === o && s > -1 && 2 > s) {
									o = 1;
									break
								}
								s > -1 && (o = s)
							}
						}
					t.check_Child_State = o
				}
			}
		}, p = {}, g = {
			onCheckNode: function(e, t) {
				if (t.chkDisabled === !0) return !1;
				var n = N.getSetting(e.data.treeId),
					a = n.data.key.checked;
				if (0 == b.apply(n.callback.beforeCheck, [n.treeId, t], !0)) return !0;
				t[a] = !t[a], y.checkNodeRelation(n, t);
				var o = C(t, k.id.CHECK, n);
				return y.setChkClass(n, o, t), y.repairParentChkClassWithSelf(n, t), n.treeObj.trigger(k.event.CHECK, [e, n.treeId, t]), !0
			},
			onMouseoverCheck: function(e, t) {
				if (t.chkDisabled === !0) return !1;
				var n = N.getSetting(e.data.treeId),
					a = C(t, k.id.CHECK, n);
				return t.check_Focus = !0, y.setChkClass(n, a, t), !0
			},
			onMouseoutCheck: function(e, t) {
				if (t.chkDisabled === !0) return !1;
				var n = N.getSetting(e.data.treeId),
					a = C(t, k.id.CHECK, n);
				return t.check_Focus = !1, y.setChkClass(n, a, t), !0
			}
		}, f = {}, h = {
			checkNodeRelation: function(e, t) {
				var n, a, o, r = e.data.key.children,
					i = e.data.key.checked,
					l = k.radio;
				if (e.check.chkStyle == l.STYLE) {
					var s = N.getRadioCheckedList(e);
					if (t[i])
						if (e.check.radioType == l.TYPE_ALL) {
							for (a = s.length - 1; a >= 0; a--) n = s[a], n[i] = !1, s.splice(a, 1), y.setChkClass(e, C(n, k.id.CHECK, e), n), n.parentTId != t.parentTId && y.repairParentChkClassWithSelf(e, n);
							s.push(t)
						} else {
							var d = t.parentTId ? t.getParentNode() : N.getRoot(e);
							for (a = 0, o = d[r].length; o > a; a++) n = d[r][a], n[i] && n != t && (n[i] = !1, y.setChkClass(e, C(n, k.id.CHECK, e), n))
						} else
					if (e.check.radioType == l.TYPE_ALL)
						for (a = 0, o = s.length; o > a; a++)
							if (t == s[a]) {
								s.splice(a, 1);
								break
							}
				} else t[i] && (!t[r] || 0 == t[r].length || e.check.chkboxType.Y.indexOf("s") > -1) && y.setSonNodeCheckBox(e, t, !0), t[i] || t[r] && 0 != t[r].length && !(e.check.chkboxType.N.indexOf("s") > -1) || y.setSonNodeCheckBox(e, t, !1), t[i] && e.check.chkboxType.Y.indexOf("p") > -1 && y.setParentNodeCheckBox(e, t, !0), !t[i] && e.check.chkboxType.N.indexOf("p") > -1 && y.setParentNodeCheckBox(e, t, !1)
			},
			makeChkClass: function(e, t) {
				var n = e.data.key.checked,
					a = k.checkbox,
					o = k.radio,
					r = "";
				r = t.chkDisabled === !0 ? a.DISABLED : t.halfCheck ? a.PART : e.check.chkStyle == o.STYLE ? t.check_Child_State < 1 ? a.FULL : a.PART : t[n] ? 2 === t.check_Child_State || -1 === t.check_Child_State ? a.FULL : a.PART : t.check_Child_State < 1 ? a.FULL : a.PART;
				var i = e.check.chkStyle + "_" + (t[n] ? a.TRUE : a.FALSE) + "_" + r;
				return i = t.check_Focus && t.chkDisabled !== !0 ? i + "_" + a.FOCUS : i, k.className.BUTTON + " " + a.DEFAULT + " " + i
			},
			repairAllChk: function(e, t) {
				if (e.check.enable && e.check.chkStyle === k.checkbox.STYLE)
					for (var n = e.data.key.checked, a = e.data.key.children, o = N.getRoot(e), r = 0, i = o[a].length; i > r; r++) {
						var l = o[a][r];
						l.nocheck !== !0 && l.chkDisabled !== !0 && (l[n] = t), y.setSonNodeCheckBox(e, l, t)
					}
			},
			repairChkClass: function(e, t) {
				if (t && (N.makeChkFlag(e, t), t.nocheck !== !0)) {
					var n = C(t, k.id.CHECK, e);
					y.setChkClass(e, n, t)
				}
			},
			repairParentChkClass: function(e, t) {
				if (t && t.parentTId) {
					var n = t.getParentNode();
					y.repairChkClass(e, n), y.repairParentChkClass(e, n)
				}
			},
			repairParentChkClassWithSelf: function(e, t) {
				if (t) {
					var n = e.data.key.children;
					t[n] && t[n].length > 0 ? y.repairParentChkClass(e, t[n][0]) : y.repairParentChkClass(e, t)
				}
			},
			repairSonChkDisabled: function(e, t, n, a) {
				if (t) {
					var o = e.data.key.children;
					if (t.chkDisabled != n && (t.chkDisabled = n), y.repairChkClass(e, t), t[o] && a)
						for (var r = 0, i = t[o].length; i > r; r++) {
							var l = t[o][r];
							y.repairSonChkDisabled(e, l, n, a)
						}
				}
			},
			repairParentChkDisabled: function(e, t, n, a) {
				t && (t.chkDisabled != n && a && (t.chkDisabled = n), y.repairChkClass(e, t), y.repairParentChkDisabled(e, t.getParentNode(), n, a))
			},
			setChkClass: function(e, t, n) {
				t && (n.nocheck === !0 ? t.hide() : t.show(), t.removeClass(), t.addClass(y.makeChkClass(e, n)))
			},
			setParentNodeCheckBox: function(e, t, n, a) {
				var o = e.data.key.children,
					r = e.data.key.checked,
					i = C(t, k.id.CHECK, e);
				if (a || (a = t), N.makeChkFlag(e, t), t.nocheck !== !0 && t.chkDisabled !== !0 && (t[r] = n, y.setChkClass(e, i, t), e.check.autoCheckTrigger && t != a && e.treeObj.trigger(k.event.CHECK, [null, e.treeId, t])), t.parentTId) {
					var l = !0;
					if (!n)
						for (var s = t.getParentNode()[o], d = 0, c = s.length; c > d; d++)
							if (s[d].nocheck !== !0 && s[d].chkDisabled !== !0 && s[d][r] || (s[d].nocheck === !0 || s[d].chkDisabled === !0) && s[d].check_Child_State > 0) {
								l = !1;
								break
							}
					l && y.setParentNodeCheckBox(e, t.getParentNode(), n, a)
				}
			},
			setSonNodeCheckBox: function(e, t, n, a) {
				if (t) {
					var o = e.data.key.children,
						r = e.data.key.checked,
						i = C(t, k.id.CHECK, e);
					a || (a = t);
					var l = !1;
					if (t[o])
						for (var s = 0, d = t[o].length; d > s && t.chkDisabled !== !0; s++) {
							var c = t[o][s];
							y.setSonNodeCheckBox(e, c, n, a), c.chkDisabled === !0 && (l = !0)
						}
					t != N.getRoot(e) && t.chkDisabled !== !0 && (l && t.nocheck !== !0 && N.makeChkFlag(e, t), t.nocheck !== !0 && t.chkDisabled !== !0 ? (t[r] = n, l || (t.check_Child_State = t[o] && t[o].length > 0 ? n ? 2 : 0 : -1)) : t.check_Child_State = -1, y.setChkClass(e, i, t), e.check.autoCheckTrigger && t != a && t.nocheck !== !0 && t.chkDisabled !== !0 && e.treeObj.trigger(k.event.CHECK, [null, e.treeId, t]))
				}
			}
		}, m = {
			tools: f,
			view: h,
			event: p,
			data: u
		};
	e.extend(!0, e.fn.zTree.consts, t), e.extend(!0, e.fn.zTree._z, m);
	var v = e.fn.zTree,
		b = v._z.tools,
		k = v.consts,
		y = v._z.view,
		N = v._z.data,
		C = (v._z.event, b.$);
	N.exSetting(n), N.addInitBind(r), N.addInitUnBind(i), N.addInitCache(o), N.addInitNode(s), N.addInitProxy(l, !0), N.addInitRoot(a), N.addBeforeA(d), N.addZTreeTools(c);
	var w = y.createNodes;
	y.createNodes = function(e, t, n, a) {
		w && w.apply(y, arguments), n && y.repairParentChkClassWithSelf(e, a)
	};
	var T = y.removeNode;
	y.removeNode = function(e, t) {
		var n = t.getParentNode();
		T && T.apply(y, arguments), t && n && (y.repairChkClass(e, n), y.repairParentChkClass(e, n))
	};
	var $ = y.appendNodes;
	y.appendNodes = function(e, t, n, a, o, r) {
		var i = "";
		return $ && (i = $.apply(y, arguments)), a && N.makeChkFlag(e, a), i
	}
}(jQuery),
function(e) {
	var t = {
		event: {
			DRAG: "ztree_drag",
			DROP: "ztree_drop",
			REMOVE: "ztree_remove",
			RENAME: "ztree_rename"
		},
		id: {
			EDIT: "_edit",
			INPUT: "_input",
			REMOVE: "_remove"
		},
		move: {
			TYPE_INNER: "inner",
			TYPE_PREV: "prev",
			TYPE_NEXT: "next"
		},
		node: {
			CURSELECTED_EDIT: "curSelectedNode_Edit",
			TMPTARGET_TREE: "tmpTargetzTree",
			TMPTARGET_NODE: "tmpTargetNode"
		}
	}, n = {
			edit: {
				enable: !1,
				editNameSelectAll: !1,
				showRemoveBtn: !0,
				showRenameBtn: !0,
				removeTitle: "remove",
				renameTitle: "rename",
				drag: {
					autoExpandTrigger: !1,
					isCopy: !0,
					isMove: !0,
					prev: !0,
					next: !0,
					inner: !0,
					minMoveSize: 5,
					borderMax: 10,
					borderMin: -5,
					maxShowNodeNum: 5,
					autoOpenTime: 500
				}
			},
			view: {
				addHoverDom: null,
				removeHoverDom: null
			},
			callback: {
				beforeDrag: null,
				beforeDragOpen: null,
				beforeDrop: null,
				beforeEditName: null,
				beforeRename: null,
				onDrag: null,
				onDrop: null,
				onRename: null
			}
		}, a = function(e) {
			var t = y.getRoot(e),
				n = y.getRoots();
			t.curEditNode = null, t.curEditInput = null, t.curHoverNode = null, t.dragFlag = 0, t.dragNodeShowBefore = [], t.dragMaskList = new Array, n.showHoverDom = !0
		}, o = function(e) {}, r = function(e) {
			var t = e.treeObj,
				n = b.event;
			t.bind(n.RENAME, function(t, n, a, o) {
				v.apply(e.callback.onRename, [t, n, a, o])
			}), t.bind(n.REMOVE, function(t, n, a) {
				v.apply(e.callback.onRemove, [t, n, a])
			}), t.bind(n.DRAG, function(t, n, a, o) {
				v.apply(e.callback.onDrag, [n, a, o])
			}), t.bind(n.DROP, function(t, n, a, o, r, i, l) {
				v.apply(e.callback.onDrop, [n, a, o, r, i, l])
			})
		}, i = function(e) {
			var t = e.treeObj,
				n = b.event;
			t.unbind(n.RENAME), t.unbind(n.REMOVE), t.unbind(n.DRAG), t.unbind(n.DROP)
		}, l = function(e) {
			var t = e.target,
				n = y.getSetting(e.data.treeId),
				a = e.relatedTarget,
				o = "",
				r = null,
				i = "",
				l = "",
				s = null,
				d = null,
				c = null;
			if (v.eqs(e.type, "mouseover") ? (c = v.getMDom(n, t, [{
				tagName: "a",
				attrName: "treeNode" + b.id.A
			}]), c && (o = v.getNodeMainDom(c).id, i = "hoverOverNode")) : v.eqs(e.type, "mouseout") ? (c = v.getMDom(n, a, [{
				tagName: "a",
				attrName: "treeNode" + b.id.A
			}]), c || (o = "remove", i = "hoverOutNode")) : v.eqs(e.type, "mousedown") && (c = v.getMDom(n, t, [{
				tagName: "a",
				attrName: "treeNode" + b.id.A
			}]), c && (o = v.getNodeMainDom(c).id, i = "mousedownNode")), o.length > 0) switch (r = y.getNodeCache(n, o), i) {
				case "mousedownNode":
					s = p.onMousedownNode;
					break;
				case "hoverOverNode":
					s = p.onHoverOverNode;
					break;
				case "hoverOutNode":
					s = p.onHoverOutNode
			}
			var u = {
				stop: !1,
				node: r,
				nodeEventType: i,
				nodeEventCallback: s,
				treeEventType: l,
				treeEventCallback: d
			};
			return u
		}, s = function(e, t, n, a, o, r, i) {
			n && (n.isHover = !1, n.editNameFlag = !1)
		}, d = function(e, t) {
			t.cancelEditName = function(t) {
				var n = y.getRoot(e);
				n.curEditNode && k.cancelCurEditNode(e, t ? t : null, !0)
			}, t.copyNode = function(t, n, a, o) {
				function r() {
					k.addNodes(e, t, [i], o)
				}
				if (!n) return null;
				if (t && !t.isParent && e.data.keep.leaf && a === b.move.TYPE_INNER) return null;
				var i = v.clone(n);
				return t || (t = null, a = b.move.TYPE_INNER), a == b.move.TYPE_INNER ? v.canAsync(e, t) ? k.asyncNode(e, t, o, r) : r() : (k.addNodes(e, t.parentNode, [i], o), k.moveNode(e, t, i, a, !1, o)), i
			}, t.editName = function(t) {
				t && t.tId && t === y.getNodeCache(e, t.tId) && (t.parentTId && k.expandCollapseParentNode(e, t.getParentNode(), !0), k.editNode(e, t))
			}, t.moveNode = function(t, n, a, o) {
				function r() {
					k.moveNode(e, t, n, a, !1, o)
				}
				return n ? t && !t.isParent && e.data.keep.leaf && a === b.move.TYPE_INNER ? null : t && (n.parentTId == t.tId && a == b.move.TYPE_INNER || N(n, e).find("#" + t.tId).length > 0) ? null : (t || (t = null), v.canAsync(e, t) && a === b.move.TYPE_INNER ? k.asyncNode(e, t, o, r) : r(), n) : n
			}, t.setEditable = function(t) {
				return e.edit.enable = t, this.refresh()
			}
		}, c = {
			setSonNodeLevel: function(e, t, n) {
				if (n) {
					var a = e.data.key.children;
					if (n.level = t ? t.level + 1 : 0, n[a])
						for (var o = 0, r = n[a].length; r > o; o++) n[a][o] && y.setSonNodeLevel(e, n, n[a][o])
				}
			}
		}, u = {}, p = {
			onHoverOverNode: function(e, t) {
				var n = y.getSetting(e.data.treeId),
					a = y.getRoot(n);
				a.curHoverNode != t && p.onHoverOutNode(e), a.curHoverNode = t, k.addHoverDom(n, t)
			},
			onHoverOutNode: function(e, t) {
				var n = y.getSetting(e.data.treeId),
					a = y.getRoot(n);
				a.curHoverNode && !y.isSelectedNode(n, a.curHoverNode) && (k.removeTreeDom(n, a.curHoverNode), a.curHoverNode = null)
			},
			onMousedownNode: function(n, a) {
				function o(n) {
					if (0 == c.dragFlag && Math.abs(_ - n.clientX) < d.edit.drag.minMoveSize && Math.abs(A - n.clientY) < d.edit.drag.minMoveSize) return !0;
					var a, o, i, l, s, p = d.data.key.children;
					if (E.css("cursor", "pointer"), 0 == c.dragFlag) {
						if (0 == v.apply(d.callback.beforeDrag, [d.treeId, f], !0)) return r(n), !0;
						for (a = 0, o = f.length; o > a; a++) 0 == a && (c.dragNodeShowBefore = []), i = f[a], i.isParent && i.open ? (k.expandCollapseNode(d, i, !i.open), c.dragNodeShowBefore[i.tId] = !0) : c.dragNodeShowBefore[i.tId] = !1;
						c.dragFlag = 1, u.showHoverDom = !1, v.showIfameMask(d, !0);
						var g = !0,
							x = -1;
						if (f.length > 1) {
							var L = f[0].parentTId ? f[0].getParentNode()[p] : y.getNodes(d);
							for (s = [], a = 0, o = L.length; o > a; a++)
								if (void 0 !== c.dragNodeShowBefore[L[a].tId] && (g && x > -1 && x + 1 !== a && (g = !1), s.push(L[a]), x = a), f.length === s.length) {
									f = s;
									break
								}
						}
						for (g && (w = f[0].getPreNode(), T = f[f.length - 1].getNextNode()), h = N("<ul class='zTreeDragUL'></ul>", d), a = 0, o = f.length; o > a; a++)
							if (i = f[a], i.editNameFlag = !1, k.selectNode(d, i, a > 0), k.removeTreeDom(d, i), l = N("<li id='" + i.tId + "_tmp'></li>", d), l.append(N(i, b.id.A, d).clone()), l.css("padding", "0"), l.children("#" + i.tId + b.id.A).removeClass(b.node.CURSELECTED), h.append(l), a == d.edit.drag.maxShowNodeNum - 1) {
								l = N("<li id='" + i.tId + "_moretmp'><a>  ...  </a></li>", d), h.append(l);
								break
							}
						h.attr("id", f[0].tId + b.id.UL + "_tmp"), h.addClass(d.treeObj.attr("class")), h.appendTo(E), m = N("<span class='tmpzTreeMove_arrow'></span>", d), m.attr("id", "zTreeMove_arrow_tmp"), m.appendTo(E), d.treeObj.trigger(b.event.DRAG, [n, d.treeId, f])
					}
					if (1 == c.dragFlag) {
						if (C && m.attr("id") == n.target.id && P && n.clientX + $.scrollLeft() + 2 > e("#" + P + b.id.A, C).offset().left) {
							var F = e("#" + P + b.id.A, C);
							n.target = F.length > 0 ? F.get(0) : n.target
						} else C && (C.removeClass(b.node.TMPTARGET_TREE), P && e("#" + P + b.id.A, C).removeClass(b.node.TMPTARGET_NODE + "_" + b.move.TYPE_PREV).removeClass(b.node.TMPTARGET_NODE + "_" + t.move.TYPE_NEXT).removeClass(b.node.TMPTARGET_NODE + "_" + t.move.TYPE_INNER));
						C = null, P = null, D = !1, I = d;
						var U = y.getSettings();
						for (var H in U) U[H].treeId && U[H].edit.enable && U[H].treeId != d.treeId && (n.target.id == U[H].treeId || e(n.target).parents("#" + U[H].treeId).length > 0) && (D = !0, I = U[H]);
						var B = $.scrollTop(),
							j = $.scrollLeft(),
							Y = I.treeObj.offset(),
							V = I.treeObj.get(0).scrollHeight,
							z = I.treeObj.get(0).scrollWidth,
							q = n.clientY + B - Y.top,
							K = I.treeObj.height() + Y.top - n.clientY - B,
							W = n.clientX + j - Y.left,
							G = I.treeObj.width() + Y.left - n.clientX - j,
							X = q < d.edit.drag.borderMax && q > d.edit.drag.borderMin,
							Z = K < d.edit.drag.borderMax && K > d.edit.drag.borderMin,
							Q = W < d.edit.drag.borderMax && W > d.edit.drag.borderMin,
							J = G < d.edit.drag.borderMax && G > d.edit.drag.borderMin,
							ee = q > d.edit.drag.borderMin && K > d.edit.drag.borderMin && W > d.edit.drag.borderMin && G > d.edit.drag.borderMin,
							te = X && I.treeObj.scrollTop() <= 0,
							ne = Z && I.treeObj.scrollTop() + I.treeObj.height() + 10 >= V,
							ae = Q && I.treeObj.scrollLeft() <= 0,
							oe = J && I.treeObj.scrollLeft() + I.treeObj.width() + 10 >= z;
						if (n.target && v.isChildOrSelf(n.target, I.treeId)) {
							for (var re = n.target; re && re.tagName && !v.eqs(re.tagName, "li") && re.id != I.treeId;) re = re.parentNode;
							var ie = !0;
							for (a = 0, o = f.length; o > a; a++) {
								if (i = f[a], re.id === i.tId) {
									ie = !1;
									break
								}
								if (N(i, d).find("#" + re.id).length > 0) {
									ie = !1;
									break
								}
							}
							ie && n.target && v.isChildOrSelf(n.target, re.id + b.id.A) && (C = e(re), P = re.id)
						}
						i = f[0], ee && v.isChildOrSelf(n.target, I.treeId) && (!C && (n.target.id == I.treeId || te || ne || ae || oe) && (D || !D && i.parentTId) && (C = I.treeObj), X ? I.treeObj.scrollTop(I.treeObj.scrollTop() - 10) : Z && I.treeObj.scrollTop(I.treeObj.scrollTop() + 10), Q ? I.treeObj.scrollLeft(I.treeObj.scrollLeft() - 10) : J && I.treeObj.scrollLeft(I.treeObj.scrollLeft() + 10), C && C != I.treeObj && C.offset().left < I.treeObj.offset().left && I.treeObj.scrollLeft(I.treeObj.scrollLeft() + C.offset().left - I.treeObj.offset().left)), h.css({
							top: n.clientY + B + 3 + "px",
							left: n.clientX + j + 3 + "px"
						});
						var le = 0,
							se = 0;
						if (C && C.attr("id") != I.treeId) {
							var de = null == P ? null : y.getNodeCache(I, P),
								ce = n.ctrlKey && d.edit.drag.isMove && d.edit.drag.isCopy || !d.edit.drag.isMove && d.edit.drag.isCopy,
								ue = !(!w || P !== w.tId),
								pe = !(!T || P !== T.tId),
								ge = i.parentTId && i.parentTId == P,
								fe = (ce || !pe) && v.apply(I.edit.drag.prev, [I.treeId, f, de], !! I.edit.drag.prev),
								he = (ce || !ue) && v.apply(I.edit.drag.next, [I.treeId, f, de], !! I.edit.drag.next),
								me = (ce || !ge) && !(I.data.keep.leaf && !de.isParent) && v.apply(I.edit.drag.inner, [I.treeId, f, de], !! I.edit.drag.inner);
							if (fe || he || me) {
								var ve = e("#" + P + b.id.A, C),
									be = de.isLastNode ? null : e("#" + de.getNextNode().tId + b.id.A, C.next()),
									ke = ve.offset().top,
									ye = ve.offset().left,
									Ne = fe ? me ? .25 : he ? .5 : 1 : -1,
									Ce = he ? me ? .75 : fe ? .5 : 0 : -1,
									we = (n.clientY + B - ke) / ve.height();
								if ((1 == Ne || Ne >= we && we >= -.2) && fe ? (le = 1 - m.width(), se = ke - m.height() / 2, M = b.move.TYPE_PREV) : (0 == Ce || we >= Ce && 1.2 >= we) && he ? (le = 1 - m.width(), se = null == be || de.isParent && de.open ? ke + ve.height() - m.height() / 2 : be.offset().top - m.height() / 2, M = b.move.TYPE_NEXT) : (le = 5 - m.width(), se = ke, M = b.move.TYPE_INNER), m.css({
									display: "block",
									top: se + "px",
									left: ye + le + "px"
								}), ve.addClass(b.node.TMPTARGET_NODE + "_" + M), (S != P || O != M) && (R = (new Date).getTime()), de && de.isParent && M == b.move.TYPE_INNER) {
									var Te = !0;
									window.zTreeMoveTimer && window.zTreeMoveTargetNodeTId !== de.tId ? (clearTimeout(window.zTreeMoveTimer), window.zTreeMoveTargetNodeTId = null) : window.zTreeMoveTimer && window.zTreeMoveTargetNodeTId === de.tId && (Te = !1), Te && (window.zTreeMoveTimer = setTimeout(function() {
										M == b.move.TYPE_INNER && de && de.isParent && !de.open && (new Date).getTime() - R > I.edit.drag.autoOpenTime && v.apply(I.callback.beforeDragOpen, [I.treeId, de], !0) && (k.switchNode(I, de), I.edit.drag.autoExpandTrigger && I.treeObj.trigger(b.event.EXPAND, [I.treeId, de]))
									}, I.edit.drag.autoOpenTime + 50), window.zTreeMoveTargetNodeTId = de.tId)
								}
							} else C = null, P = "", M = b.move.TYPE_INNER, m.css({
								display: "none"
							}), window.zTreeMoveTimer && (clearTimeout(window.zTreeMoveTimer), window.zTreeMoveTargetNodeTId = null)
						} else M = b.move.TYPE_INNER, C && v.apply(I.edit.drag.inner, [I.treeId, f, null], !! I.edit.drag.inner) ? C.addClass(b.node.TMPTARGET_TREE) : C = null, m.css({
							display: "none"
						}), window.zTreeMoveTimer && (clearTimeout(window.zTreeMoveTimer), window.zTreeMoveTargetNodeTId = null);
						S = P, O = M
					}
					return !1
				}

				function r(n) {
					function a() {
						if (D) {
							if (!g)
								for (var e = 0, t = f.length; t > e; e++) k.removeNode(d, f[e]);
							if (M == b.move.TYPE_INNER) k.addNodes(I, w, T);
							else if (k.addNodes(I, w.getParentNode(), T), M == b.move.TYPE_PREV)
								for (e = 0, t = T.length; t > e; e++) k.moveNode(I, w, T[e], M, !1);
							else
								for (e = -1, t = T.length - 1; t > e; t--) k.moveNode(I, w, T[t], M, !1)
						} else if (g && M == b.move.TYPE_INNER) k.addNodes(I, w, T);
						else if (g && k.addNodes(I, w.getParentNode(), T), M != b.move.TYPE_NEXT)
							for (e = 0, t = T.length; t > e; e++) k.moveNode(I, w, T[e], M, !1);
						else
							for (e = -1, t = T.length - 1; t > e; t--) k.moveNode(I, w, T[t], M, !1);
						k.selectNodes(I, T), N(T[0], d).focus().blur(), d.treeObj.trigger(b.event.DROP, [n, I.treeId, T, w, M, g])
					}
					if (window.zTreeMoveTimer && (clearTimeout(window.zTreeMoveTimer), window.zTreeMoveTargetNodeTId = null), S = null, O = null, $.unbind("mousemove", o), $.unbind("mouseup", r), $.unbind("selectstart", i), E.css("cursor", "auto"), C && (C.removeClass(b.node.TMPTARGET_TREE), P && e("#" + P + b.id.A, C).removeClass(b.node.TMPTARGET_NODE + "_" + b.move.TYPE_PREV).removeClass(b.node.TMPTARGET_NODE + "_" + t.move.TYPE_NEXT).removeClass(b.node.TMPTARGET_NODE + "_" + t.move.TYPE_INNER)), v.showIfameMask(d, !1), u.showHoverDom = !0, 0 != c.dragFlag) {
						c.dragFlag = 0;
						var l, s, p;
						for (l = 0, s = f.length; s > l; l++) p = f[l], p.isParent && c.dragNodeShowBefore[p.tId] && !p.open && (k.expandCollapseNode(d, p, !p.open), delete c.dragNodeShowBefore[p.tId]);
						h && h.remove(), m && m.remove();
						var g = n.ctrlKey && d.edit.drag.isMove && d.edit.drag.isCopy || !d.edit.drag.isMove && d.edit.drag.isCopy;
						if (!g && C && P && f[0].parentTId && P == f[0].parentTId && M == b.move.TYPE_INNER && (C = null), C) {
							var w = null == P ? null : y.getNodeCache(I, P);
							if (0 == v.apply(d.callback.beforeDrop, [I.treeId, f, w, M, g], !0)) return void k.selectNodes(x, f);
							var T = g ? v.clone(f) : f;
							M == b.move.TYPE_INNER && v.canAsync(I, w) ? k.asyncNode(I, w, !1, a) : a()
						} else k.selectNodes(x, f), d.treeObj.trigger(b.event.DROP, [n, d.treeId, f, null, null, null])
					}
				}

				function i() {
					return !1
				}
				var l, s, d = y.getSetting(n.data.treeId),
					c = y.getRoot(d),
					u = y.getRoots();
				if (2 == n.button || !d.edit.enable || !d.edit.drag.isCopy && !d.edit.drag.isMove) return !0;
				var p = n.target,
					g = y.getRoot(d).curSelectedList,
					f = [];
				if (y.isSelectedNode(d, a))
					for (l = 0, s = g.length; s > l; l++) {
						if (g[l].editNameFlag && v.eqs(p.tagName, "input") && null !== p.getAttribute("treeNode" + b.id.INPUT)) return !0;
						if (f.push(g[l]), f[0].parentTId !== g[l].parentTId) {
							f = [a];
							break
						}
					} else f = [a];
				k.editNodeBlur = !0, k.cancelCurEditNode(d);
				var h, m, C, w, T, $ = e(d.treeObj.get(0).ownerDocument),
					E = e(d.treeObj.get(0).ownerDocument.body),
					D = !1,
					I = d,
					x = d,
					S = null,
					O = null,
					P = null,
					M = b.move.TYPE_INNER,
					_ = n.clientX,
					A = n.clientY,
					R = (new Date).getTime();
				return v.uCanDo(d) && $.bind("mousemove", o), $.bind("mouseup", r), $.bind("selectstart", i), n.preventDefault && n.preventDefault(), !0
			}
		}, g = {
			getAbs: function(e) {
				var t = e.getBoundingClientRect(),
					n = document.body.scrollTop + document.documentElement.scrollTop,
					a = document.body.scrollLeft + document.documentElement.scrollLeft;
				return [t.left + a, t.top + n]
			},
			inputFocus: function(e) {
				e.get(0) && (e.focus(), v.setCursorPosition(e.get(0), e.val().length))
			},
			inputSelect: function(e) {
				e.get(0) && (e.focus(), e.select())
			},
			setCursorPosition: function(e, t) {
				if (e.setSelectionRange) e.focus(), e.setSelectionRange(t, t);
				else if (e.createTextRange) {
					var n = e.createTextRange();
					n.collapse(!0), n.moveEnd("character", t), n.moveStart("character", t), n.select()
				}
			},
			showIfameMask: function(e, t) {
				for (var n = y.getRoot(e); n.dragMaskList.length > 0;) n.dragMaskList[0].remove(), n.dragMaskList.shift();
				if (t)
					for (var a = N("iframe", e), o = 0, r = a.length; r > o; o++) {
						var i = a.get(o),
							l = v.getAbs(i),
							s = N("<div id='zTreeMask_" + o + "' class='zTreeMask' style='top:" + l[1] + "px; left:" + l[0] + "px; width:" + i.offsetWidth + "px; height:" + i.offsetHeight + "px;'></div>", e);
						s.appendTo(N("body", e)), n.dragMaskList.push(s)
					}
			}
		}, f = {
			addEditBtn: function(e, t) {
				if (!(t.editNameFlag || N(t, b.id.EDIT, e).length > 0) && v.apply(e.edit.showRenameBtn, [e.treeId, t], e.edit.showRenameBtn)) {
					var n = N(t, b.id.A, e),
						a = "<span class='" + b.className.BUTTON + " edit' id='" + t.tId + b.id.EDIT + "' title='" + v.apply(e.edit.renameTitle, [e.treeId, t], e.edit.renameTitle) + "' treeNode" + b.id.EDIT + " style='display:none;'></span>";
					n.append(a), N(t, b.id.EDIT, e).bind("click", function() {
						return v.uCanDo(e) && 0 != v.apply(e.callback.beforeEditName, [e.treeId, t], !0) ? (k.editNode(e, t), !1) : !1
					}).show()
				}
			},
			addRemoveBtn: function(e, t) {
				if (!(t.editNameFlag || N(t, b.id.REMOVE, e).length > 0) && v.apply(e.edit.showRemoveBtn, [e.treeId, t], e.edit.showRemoveBtn)) {
					var n = N(t, b.id.A, e),
						a = "<span class='" + b.className.BUTTON + " remove' id='" + t.tId + b.id.REMOVE + "' title='" + v.apply(e.edit.removeTitle, [e.treeId, t], e.edit.removeTitle) + "' treeNode" + b.id.REMOVE + " style='display:none;'></span>";
					n.append(a), N(t, b.id.REMOVE, e).bind("click", function() {
						return v.uCanDo(e) && 0 != v.apply(e.callback.beforeRemove, [e.treeId, t], !0) ? (k.removeNode(e, t), e.treeObj.trigger(b.event.REMOVE, [e.treeId, t]), !1) : !1
					}).bind("mousedown", function(e) {
						return !0
					}).show()
				}
			},
			addHoverDom: function(e, t) {
				y.getRoots().showHoverDom && (t.isHover = !0, e.edit.enable && (k.addEditBtn(e, t), k.addRemoveBtn(e, t)), v.apply(e.view.addHoverDom, [e.treeId, t]))
			},
			cancelCurEditNode: function(e, t, n) {
				var a = y.getRoot(e),
					o = e.data.key.name,
					r = a.curEditNode;
				if (r) {
					var i = a.curEditInput,
						l = t ? t : n ? r[o] : i.val();
					if (v.apply(e.callback.beforeRename, [e.treeId, r, l, n], !0) === !1) return !1;
					r[o] = l, e.treeObj.trigger(b.event.RENAME, [e.treeId, r, n]);
					var s = N(r, b.id.A, e);
					s.removeClass(b.node.CURSELECTED_EDIT), i.unbind(), k.setNodeName(e, r), r.editNameFlag = !1, a.curEditNode = null, a.curEditInput = null, k.selectNode(e, r, !1)
				}
				return a.noSelection = !0, !0
			},
			editNode: function(e, t) {
				var n = y.getRoot(e);
				if (k.editNodeBlur = !1, y.isSelectedNode(e, t) && n.curEditNode == t && t.editNameFlag) return void setTimeout(function() {
					v.inputFocus(n.curEditInput)
				}, 0);
				var a = e.data.key.name;
				t.editNameFlag = !0, k.removeTreeDom(e, t), k.cancelCurEditNode(e), k.selectNode(e, t, !1), N(t, b.id.SPAN, e).html("<input type=text class='rename' id='" + t.tId + b.id.INPUT + "' treeNode" + b.id.INPUT + " >");
				var o = N(t, b.id.INPUT, e);
				o.attr("value", t[a]), e.edit.editNameSelectAll ? v.inputSelect(o) : v.inputFocus(o), o.bind("blur", function(t) {
					k.editNodeBlur || k.cancelCurEditNode(e)
				}).bind("keydown", function(t) {
					"13" == t.keyCode ? (k.editNodeBlur = !0, k.cancelCurEditNode(e)) : "27" == t.keyCode && k.cancelCurEditNode(e, null, !0)
				}).bind("click", function(e) {
					return !1
				}).bind("dblclick", function(e) {
					return !1
				}), N(t, b.id.A, e).addClass(b.node.CURSELECTED_EDIT), n.curEditInput = o, n.noSelection = !1, n.curEditNode = t
			},
			moveNode: function(e, t, n, a, o, r) {
				var i = y.getRoot(e),
					l = e.data.key.children;
				if (t != n && (!e.data.keep.leaf || !t || t.isParent || a != b.move.TYPE_INNER)) {
					var s = n.parentTId ? n.getParentNode() : i,
						d = null === t || t == i;
					d && null === t && (t = i), d && (a = b.move.TYPE_INNER);
					var c = t.parentTId ? t.getParentNode() : i;
					a != b.move.TYPE_PREV && a != b.move.TYPE_NEXT && (a = b.move.TYPE_INNER), a == b.move.TYPE_INNER && (d ? n.parentTId = null : (t.isParent || (t.isParent = !0, t.open = !! t.open, k.setNodeLineIcos(e, t)), n.parentTId = t.tId));
					var u, p;
					if (d) u = e.treeObj, p = u;
					else {
						if (r || a != b.move.TYPE_INNER ? r || k.expandCollapseNode(e, t.getParentNode(), !0, !1) : k.expandCollapseNode(e, t, !0, !1), u = N(t, e), p = N(t, b.id.UL, e), u.get(0) && !p.get(0)) {
							var g = [];
							k.makeUlHtml(e, t, g, ""), u.append(g.join(""))
						}
						p = N(t, b.id.UL, e)
					}
					var f = N(n, e);
					f.get(0) ? u.get(0) || f.remove() : f = k.appendNodes(e, n.level, [n], null, !1, !0).join(""), p.get(0) && a == b.move.TYPE_INNER ? p.append(f) : u.get(0) && a == b.move.TYPE_PREV ? u.before(f) : u.get(0) && a == b.move.TYPE_NEXT && u.after(f);
					var h, m, v = -1,
						C = 0,
						w = null,
						T = null,
						$ = n.level;
					if (n.isFirstNode) v = 0, s[l].length > 1 && (w = s[l][1], w.isFirstNode = !0);
					else if (n.isLastNode) v = s[l].length - 1, w = s[l][v - 1], w.isLastNode = !0;
					else
						for (h = 0, m = s[l].length; m > h; h++)
							if (s[l][h].tId == n.tId) {
								v = h;
								break
							} if (v >= 0 && s[l].splice(v, 1), a != b.move.TYPE_INNER)
						for (h = 0, m = c[l].length; m > h; h++) c[l][h].tId == t.tId && (C = h);
					if (a == b.move.TYPE_INNER ? (t[l] || (t[l] = new Array), t[l].length > 0 && (T = t[l][t[l].length - 1], T.isLastNode = !1), t[l].splice(t[l].length, 0, n), n.isLastNode = !0, n.isFirstNode = 1 == t[l].length) : t.isFirstNode && a == b.move.TYPE_PREV ? (c[l].splice(C, 0, n), T = t, T.isFirstNode = !1, n.parentTId = t.parentTId, n.isFirstNode = !0, n.isLastNode = !1) : t.isLastNode && a == b.move.TYPE_NEXT ? (c[l].splice(C + 1, 0, n), T = t, T.isLastNode = !1, n.parentTId = t.parentTId, n.isFirstNode = !1, n.isLastNode = !0) : (a == b.move.TYPE_PREV ? c[l].splice(C, 0, n) : c[l].splice(C + 1, 0, n), n.parentTId = t.parentTId, n.isFirstNode = !1, n.isLastNode = !1), y.fixPIdKeyValue(e, n), y.setSonNodeLevel(e, n.getParentNode(), n), k.setNodeLineIcos(e, n), k.repairNodeLevelClass(e, n, $), !e.data.keep.parent && s[l].length < 1) {
						s.isParent = !1, s.open = !1;
						var E = N(s, b.id.UL, e),
							D = N(s, b.id.SWITCH, e),
							I = N(s, b.id.ICON, e);
						k.replaceSwitchClass(s, D, b.folder.DOCU), k.replaceIcoClass(s, I, b.folder.DOCU), E.css("display", "none")
					} else w && k.setNodeLineIcos(e, w);
					T && k.setNodeLineIcos(e, T), e.check && e.check.enable && k.repairChkClass && (k.repairChkClass(e, s), k.repairParentChkClassWithSelf(e, s), s != n.parent && k.repairParentChkClassWithSelf(e, n)), r || k.expandCollapseParentNode(e, n.getParentNode(), !0, o)
				}
			},
			removeEditBtn: function(e, t) {
				N(t, b.id.EDIT, e).unbind().remove()
			},
			removeRemoveBtn: function(e, t) {
				N(t, b.id.REMOVE, e).unbind().remove()
			},
			removeTreeDom: function(e, t) {
				t.isHover = !1, k.removeEditBtn(e, t), k.removeRemoveBtn(e, t), v.apply(e.view.removeHoverDom, [e.treeId, t])
			},
			repairNodeLevelClass: function(e, t, n) {
				if (n !== t.level) {
					var a = N(t, e),
						o = N(t, b.id.A, e),
						r = N(t, b.id.UL, e),
						i = b.className.LEVEL + n,
						l = b.className.LEVEL + t.level;
					a.removeClass(i), a.addClass(l), o.removeClass(i), o.addClass(l), r.removeClass(i), r.addClass(l)
				}
			},
			selectNodes: function(e, t) {
				for (var n = 0, a = t.length; a > n; n++) k.selectNode(e, t[n], n > 0)
			}
		}, h = {
			tools: g,
			view: f,
			event: u,
			data: c
		};
	e.extend(!0, e.fn.zTree.consts, t), e.extend(!0, e.fn.zTree._z, h);
	var m = e.fn.zTree,
		v = m._z.tools,
		b = m.consts,
		k = m._z.view,
		y = m._z.data,
		N = (m._z.event, v.$);
	y.exSetting(n), y.addInitBind(r), y.addInitUnBind(i), y.addInitCache(o), y.addInitNode(s), y.addInitProxy(l), y.addInitRoot(a), y.addZTreeTools(d);
	var C = k.cancelPreSelectedNode;
	k.cancelPreSelectedNode = function(e, t) {
		for (var n = y.getRoot(e).curSelectedList, a = 0, o = n.length; o > a && (t && t !== n[a] || (k.removeTreeDom(e, n[a]), !t)); a++);
		C && C.apply(k, arguments)
	};
	var w = k.createNodes;
	k.createNodes = function(e, t, n, a) {
		w && w.apply(k, arguments), n && k.repairParentChkClassWithSelf && k.repairParentChkClassWithSelf(e, a)
	};
	var T = k.makeNodeUrl;
	k.makeNodeUrl = function(e, t) {
		return e.edit.enable ? null : T.apply(k, arguments)
	};
	var $ = k.removeNode;
	k.removeNode = function(e, t) {
		var n = y.getRoot(e);
		n.curEditNode === t && (n.curEditNode = null), $ && $.apply(k, arguments)
	};
	var E = k.selectNode;
	k.selectNode = function(e, t, n) {
		var a = y.getRoot(e);
		return y.isSelectedNode(e, t) && a.curEditNode == t && t.editNameFlag ? !1 : (E && E.apply(k, arguments), k.addHoverDom(e, t), !0)
	};
	var D = v.uCanDo;
	v.uCanDo = function(e, t) {
		var n = y.getRoot(e);
		return t && (v.eqs(t.type, "mouseover") || v.eqs(t.type, "mouseout") || v.eqs(t.type, "mousedown") || v.eqs(t.type, "mouseup")) ? !0 : (n.curEditNode && (k.editNodeBlur = !1, n.curEditInput.focus()), !n.curEditNode && (D ? D.apply(k, arguments) : !0))
	}
}(jQuery);