! function($) {
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
				i = consts.event;
			t.bind(i.NODECREATED, function(t, i, o) {
				tools.apply(e.callback.onNodeCreated, [t, i, o])
			}), t.bind(i.CLICK, function(t, i, o, n, r) {
				tools.apply(e.callback.onClick, [i, o, n, r])
			}), t.bind(i.EXPAND, function(t, i, o) {
				tools.apply(e.callback.onExpand, [t, i, o])
			}), t.bind(i.COLLAPSE, function(t, i, o) {
				tools.apply(e.callback.onCollapse, [t, i, o])
			}), t.bind(i.ASYNC_SUCCESS, function(t, i, o, n) {
				tools.apply(e.callback.onAsyncSuccess, [t, i, o, n])
			}), t.bind(i.ASYNC_ERROR, function(t, i, o, n, r, a) {
				tools.apply(e.callback.onAsyncError, [t, i, o, n, r, a])
			})
		}, _unbindEvent = function(e) {
			var t = e.treeObj,
				i = consts.event;
			t.unbind(i.NODECREATED).unbind(i.CLICK).unbind(i.EXPAND).unbind(i.COLLAPSE).unbind(i.ASYNC_SUCCESS).unbind(i.ASYNC_ERROR)
		}, _eventProxy = function(e) {
			var t = e.target,
				i = data.getSetting(e.data.treeId),
				o = "",
				n = null,
				r = "",
				a = "",
				s = null,
				l = null,
				d = null;
			if (tools.eqs(e.type, "mousedown") ? a = "mousedown" : tools.eqs(e.type, "mouseup") ? a = "mouseup" : tools.eqs(e.type, "contextmenu") ? a = "contextmenu" : tools.eqs(e.type, "click") ? tools.eqs(t.tagName, "span") && null !== t.getAttribute("treeNode" + consts.id.SWITCH) ? (o = tools.getNodeMainDom(t).id, r = "switchNode") : (d = tools.getMDom(i, t, [{
				tagName: "a",
				attrName: "treeNode" + consts.id.A
			}]), d && (o = tools.getNodeMainDom(d).id, r = "clickNode")) : tools.eqs(e.type, "dblclick") && (a = "dblclick", d = tools.getMDom(i, t, [{
				tagName: "a",
				attrName: "treeNode" + consts.id.A
			}]), d && (o = tools.getNodeMainDom(d).id, r = "switchNode")), a.length > 0 && 0 == o.length && (d = tools.getMDom(i, t, [{
				tagName: "a",
				attrName: "treeNode" + consts.id.A
			}]), d && (o = tools.getNodeMainDom(d).id)), o.length > 0) switch (n = data.getNodeCache(i, o), r) {
				case "switchNode":
					n.isParent && (tools.eqs(e.type, "click") || tools.eqs(e.type, "dblclick") && tools.apply(i.view.dblClickExpand, [i.treeId, n], i.view.dblClickExpand)) ? s = handler.onSwitchNode : r = "";
					break;
				case "clickNode":
					s = handler.onClickNode
			}
			switch (a) {
				case "mousedown":
					l = handler.onZTreeMousedown;
					break;
				case "mouseup":
					l = handler.onZTreeMouseup;
					break;
				case "dblclick":
					l = handler.onZTreeDblclick;
					break;
				case "contextmenu":
					l = handler.onZTreeContextmenu
			}
			var c = {
				stop: !1,
				node: n,
				nodeEventType: r,
				nodeEventCallback: s,
				treeEventType: a,
				treeEventCallback: l
			};
			return c
		}, _initNode = function(e, t, i, o, n, r, a) {
			if (i) {
				var s = data.getRoot(e),
					l = e.data.key.children;
				i.level = t, i.tId = e.treeId + "_" + ++s.zId, i.parentTId = o ? o.tId : null, i.open = "string" == typeof i.open ? tools.eqs(i.open, "true") : !! i.open, i[l] && i[l].length > 0 ? (i.isParent = !0, i.zAsync = !0) : (i.isParent = "string" == typeof i.isParent ? tools.eqs(i.isParent, "true") : !! i.isParent, i.open = i.isParent && !e.async.enable ? i.open : !1, i.zAsync = !i.isParent), i.isFirstNode = n, i.isLastNode = r, i.getParentNode = function() {
					return data.getNodeCache(e, i.parentTId)
				}, i.getPreNode = function() {
					return data.getPreNode(e, i)
				}, i.getNextNode = function() {
					return data.getNextNode(e, i)
				}, i.isAjaxing = !1, data.fixPIdKeyValue(e, i)
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
			addNodesData: function(e, t, i) {
				var o = e.data.key.children;
				t[o] || (t[o] = []), t[o].length > 0 && (t[o][t[o].length - 1].isLastNode = !1, view.setNodeLineIcos(e, t[o][t[o].length - 1])), t.isParent = !0, t[o] = t[o].concat(i)
			},
			addSelectedNode: function(e, t) {
				var i = data.getRoot(e);
				data.isSelectedNode(e, t) || i.curSelectedList.push(t)
			},
			addCreatedNode: function(e, t) {
				if (e.callback.onNodeCreated || e.view.addDiyDom) {
					var i = data.getRoot(e);
					i.createdNodes.push(t)
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
			getAfterA: function(e, t, i) {
				for (var o = 0, n = _init.afterA.length; n > o; o++) _init.afterA[o].apply(this, arguments)
			},
			getBeforeA: function(e, t, i) {
				for (var o = 0, n = _init.beforeA.length; n > o; o++) _init.beforeA[o].apply(this, arguments)
			},
			getInnerAfterA: function(e, t, i) {
				for (var o = 0, n = _init.innerAfterA.length; n > o; o++) _init.innerAfterA[o].apply(this, arguments)
			},
			getInnerBeforeA: function(e, t, i) {
				for (var o = 0, n = _init.innerBeforeA.length; n > o; o++) _init.innerBeforeA[o].apply(this, arguments)
			},
			getCache: function(e) {
				return caches[e.treeId]
			},
			getNextNode: function(e, t) {
				if (!t) return null;
				for (var i = e.data.key.children, o = t.parentTId ? t.getParentNode() : data.getRoot(e), n = 0, r = o[i].length - 1; r >= n; n++)
					if (o[i][n] === t) return n == r ? null : o[i][n + 1];
				return null
			},
			getNodeByParam: function(e, t, i, o) {
				if (!t || !i) return null;
				for (var n = e.data.key.children, r = 0, a = t.length; a > r; r++) {
					if (t[r][i] == o) return t[r];
					var s = data.getNodeByParam(e, t[r][n], i, o);
					if (s) return s
				}
				return null
			},
			getNodeCache: function(e, t) {
				if (!t) return null;
				var i = caches[e.treeId].nodes[data.getNodeCacheId(t)];
				return i ? i : null
			},
			getNodeName: function(e, t) {
				var i = e.data.key.name;
				return "" + t[i]
			},
			getNodeTitle: function(e, t) {
				var i = "" === e.data.key.title ? e.data.key.name : e.data.key.title;
				return "" + t[i]
			},
			getNodes: function(e) {
				return data.getRoot(e)[e.data.key.children]
			},
			getNodesByParam: function(e, t, i, o) {
				if (!t || !i) return [];
				for (var n = e.data.key.children, r = [], a = 0, s = t.length; s > a; a++) t[a][i] == o && r.push(t[a]), r = r.concat(data.getNodesByParam(e, t[a][n], i, o));
				return r
			},
			getNodesByParamFuzzy: function(e, t, i, o) {
				if (!t || !i) return [];
				var n = e.data.key.children,
					r = [];
				o = o.toLowerCase();
				for (var a = 0, s = t.length; s > a; a++) "string" == typeof t[a][i] && t[a][i].toLowerCase().indexOf(o) > -1 && r.push(t[a]), r = r.concat(data.getNodesByParamFuzzy(e, t[a][n], i, o));
				return r
			},
			getNodesByFilter: function(e, t, i, o, n) {
				if (!t) return o ? null : [];
				for (var r = e.data.key.children, a = o ? null : [], s = 0, l = t.length; l > s; s++) {
					if (tools.apply(i, [t[s], n], !1)) {
						if (o) return t[s];
						a.push(t[s])
					}
					var d = data.getNodesByFilter(e, t[s][r], i, o, n);
					if (o && d) return d;
					a = o ? d : a.concat(d)
				}
				return a
			},
			getPreNode: function(e, t) {
				if (!t) return null;
				for (var i = e.data.key.children, o = t.parentTId ? t.getParentNode() : data.getRoot(e), n = 0, r = o[i].length; r > n; n++)
					if (o[i][n] === t) return 0 == n ? null : o[i][n - 1];
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
				for (var t = 0, i = _init.caches.length; i > t; t++) _init.caches[t].apply(this, arguments)
			},
			initNode: function(e, t, i, o, n, r) {
				for (var a = 0, s = _init.nodes.length; s > a; a++) _init.nodes[a].apply(this, arguments)
			},
			initRoot: function(e) {
				for (var t = 0, i = _init.roots.length; i > t; t++) _init.roots[t].apply(this, arguments)
			},
			isSelectedNode: function(e, t) {
				for (var i = data.getRoot(e), o = 0, n = i.curSelectedList.length; n > o; o++)
					if (t === i.curSelectedList[o]) return !0;
				return !1
			},
			removeNodeCache: function(e, t) {
				var i = e.data.key.children;
				if (t[i])
					for (var o = 0, n = t[i].length; n > o; o++) arguments.callee(e, t[i][o]);
				data.getCache(e).nodes[data.getNodeCacheId(t.tId)] = null
			},
			removeSelectedNode: function(e, t) {
				for (var i = data.getRoot(e), o = 0, n = i.curSelectedList.length; n > o; o++) t !== i.curSelectedList[o] && data.getNodeCache(e, i.curSelectedList[o].tId) || (i.curSelectedList.splice(o, 1), o--, n--)
			},
			setCache: function(e, t) {
				caches[e.treeId] = t
			},
			setRoot: function(e, t) {
				roots[e.treeId] = t
			},
			setZTreeTools: function(e, t) {
				for (var i = 0, o = _init.zTreeTools.length; o > i; i++) _init.zTreeTools[i].apply(this, arguments)
			},
			transformToArrayFormat: function(e, t) {
				if (!t) return [];
				var i = e.data.key.children,
					o = [];
				if (tools.isArray(t))
					for (var n = 0, r = t.length; r > n; n++) o.push(t[n]), t[n][i] && (o = o.concat(data.transformToArrayFormat(e, t[n][i])));
				else o.push(t), t[i] && (o = o.concat(data.transformToArrayFormat(e, t[i])));
				return o
			},
			transformTozTreeFormat: function(e, t) {
				var i, o, n = e.data.simpleData.idKey,
					r = e.data.simpleData.pIdKey,
					a = e.data.key.children;
				if (!n || "" == n || !t) return [];
				if (tools.isArray(t)) {
					var s = [],
						l = [];
					for (i = 0, o = t.length; o > i; i++) l[t[i][n]] = t[i];
					for (i = 0, o = t.length; o > i; i++) l[t[i][r]] && t[i][n] != t[i][r] ? (l[t[i][r]][a] || (l[t[i][r]][a] = []), l[t[i][r]][a].push(t[i])) : s.push(t[i]);
					return s
				}
				return [t]
			}
		}, event = {
			bindEvent: function(e) {
				for (var t = 0, i = _init.bind.length; i > t; t++) _init.bind[t].apply(this, arguments)
			},
			unbindEvent: function(e) {
				for (var t = 0, i = _init.unbind.length; i > t; t++) _init.unbind[t].apply(this, arguments)
			},
			bindTree: function(e) {
				var t = {
					treeId: e.treeId
				}, i = e.treeObj;
				e.view.txtSelectedEnable || i.bind("selectstart", function(e) {
					var t = e.originalEvent.srcElement.nodeName.toLowerCase();
					return "input" === t || "textarea" === t
				}).css({
					"-moz-user-select": "-moz-none"
				}), i.bind("click", t, event.proxy), i.bind("dblclick", t, event.proxy), i.bind("mouseover", t, event.proxy), i.bind("mouseout", t, event.proxy), i.bind("mousedown", t, event.proxy), i.bind("mouseup", t, event.proxy), i.bind("contextmenu", t, event.proxy)
			},
			unbindTree: function(e) {
				var t = e.treeObj;
				t.unbind("click", event.proxy).unbind("dblclick", event.proxy).unbind("mouseover", event.proxy).unbind("mouseout", event.proxy).unbind("mousedown", event.proxy).unbind("mouseup", event.proxy).unbind("contextmenu", event.proxy)
			},
			doProxy: function(e) {
				for (var t = [], i = 0, o = _init.proxys.length; o > i; i++) {
					var n = _init.proxys[i].apply(this, arguments);
					if (t.push(n), n.stop) break
				}
				return t
			},
			proxy: function(e) {
				var t = data.getSetting(e.data.treeId);
				if (!tools.uCanDo(t, e)) return !0;
				for (var i = event.doProxy(e), o = !0, n = !1, r = 0, a = i.length; a > r; r++) {
					var s = i[r];
					s.nodeEventCallback && (n = !0, o = s.nodeEventCallback.apply(s, [e, s.node]) && o), s.treeEventCallback && (n = !0, o = s.treeEventCallback.apply(s, [e, s.node]) && o)
				}
				return o
			}
		}, handler = {
			onSwitchNode: function(e, t) {
				var i = data.getSetting(e.data.treeId);
				if (t.open) {
					if (0 == tools.apply(i.callback.beforeCollapse, [i.treeId, t], !0)) return !0;
					data.getRoot(i).expandTriggerFlag = !0, view.switchNode(i, t)
				} else {
					if (0 == tools.apply(i.callback.beforeExpand, [i.treeId, t], !0)) return !0;
					data.getRoot(i).expandTriggerFlag = !0, view.switchNode(i, t)
				}
				return !0
			},
			onClickNode: function(e, t) {
				var i = data.getSetting(e.data.treeId),
					o = i.view.autoCancelSelected && e.ctrlKey && data.isSelectedNode(i, t) ? 0 : i.view.autoCancelSelected && e.ctrlKey && i.view.selectedMulti ? 2 : 1;
				return 0 == tools.apply(i.callback.beforeClick, [i.treeId, t, o], !0) ? !0 : (0 === o ? view.cancelPreSelectedNode(i, t) : view.selectNode(i, t, 2 === o), i.treeObj.trigger(consts.event.CLICK, [e, i.treeId, t, o]), !0)
			},
			onZTreeMousedown: function(e, t) {
				var i = data.getSetting(e.data.treeId);
				return tools.apply(i.callback.beforeMouseDown, [i.treeId, t], !0) && tools.apply(i.callback.onMouseDown, [e, i.treeId, t]), !0
			},
			onZTreeMouseup: function(e, t) {
				var i = data.getSetting(e.data.treeId);
				return tools.apply(i.callback.beforeMouseUp, [i.treeId, t], !0) && tools.apply(i.callback.onMouseUp, [e, i.treeId, t]), !0
			},
			onZTreeDblclick: function(e, t) {
				var i = data.getSetting(e.data.treeId);
				return tools.apply(i.callback.beforeDblClick, [i.treeId, t], !0) && tools.apply(i.callback.onDblClick, [e, i.treeId, t]), !0
			},
			onZTreeContextmenu: function(e, t) {
				var i = data.getSetting(e.data.treeId);
				return tools.apply(i.callback.beforeRightClick, [i.treeId, t], !0) && tools.apply(i.callback.onRightClick, [e, i.treeId, t]), "function" != typeof i.callback.onRightClick
			}
		}, tools = {
			apply: function(e, t, i) {
				return "function" == typeof e ? e.apply(zt, t ? t : []) : i
			},
			canAsync: function(e, t) {
				var i = e.data.key.children;
				return e.async.enable && t && t.isParent && !(t.zAsync || t[i] && t[i].length > 0)
			},
			clone: function(e) {
				if (null === e) return null;
				var t = tools.isArray(e) ? [] : {};
				for (var i in e) t[i] = e[i] instanceof Date ? new Date(e[i].getTime()) : "object" == typeof e[i] ? arguments.callee(e[i]) : e[i];
				return t
			},
			eqs: function(e, t) {
				return e.toLowerCase() === t.toLowerCase()
			},
			isArray: function(e) {
				return "[object Array]" === Object.prototype.toString.apply(e)
			},
			$: function(e, t, i) {
				return t && "string" != typeof t && (i = t, t = ""), "string" == typeof e ? $(e, i ? i.treeObj.get(0).ownerDocument : null) : $("#" + e.tId + t, i ? i.treeObj : null)
			},
			getMDom: function(e, t, i) {
				if (!t) return null;
				for (; t && t.id !== e.treeId;) {
					for (var o = 0, n = i.length; t.tagName && n > o; o++)
						if (tools.eqs(t.tagName, i[o].tagName) && null !== t.getAttribute(i[o].attrName)) return t;
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
			addNodes: function(e, t, i, o) {
				if (!e.data.keep.leaf || !t || t.isParent)
					if (tools.isArray(i) || (i = [i]), e.data.simpleData.enable && (i = data.transformTozTreeFormat(e, i)), t) {
						var n = $$(t, consts.id.SWITCH, e),
							r = $$(t, consts.id.ICON, e),
							a = $$(t, consts.id.UL, e);
						t.open || (view.replaceSwitchClass(t, n, consts.folder.CLOSE), view.replaceIcoClass(t, r, consts.folder.CLOSE), t.open = !1, a.css({
							display: "none"
						})), data.addNodesData(e, t, i), view.createNodes(e, t.level + 1, i, t), o || view.expandCollapseParentNode(e, t, !0)
					} else data.addNodesData(e, data.getRoot(e), i), view.createNodes(e, 0, i, null)
			},
			appendNodes: function(e, t, i, o, n, r) {
				if (!i) return [];
				for (var a = [], s = e.data.key.children, l = 0, d = i.length; d > l; l++) {
					var c = i[l];
					if (n) {
						var u = o ? o : data.getRoot(e),
							h = u[s],
							p = h.length == i.length && 0 == l,
							f = l == i.length - 1;
						data.initNode(e, t, c, o, p, f, r), data.addNodeCache(e, c)
					}
					var g = [];
					c[s] && c[s].length > 0 && (g = view.appendNodes(e, t + 1, c[s], c, n, r && c.open)), r && (view.makeDOMNodeMainBefore(a, e, c), view.makeDOMNodeLine(a, e, c), data.getBeforeA(e, c, a), view.makeDOMNodeNameBefore(a, e, c), data.getInnerBeforeA(e, c, a), view.makeDOMNodeIcon(a, e, c), data.getInnerAfterA(e, c, a), view.makeDOMNodeNameAfter(a, e, c), data.getAfterA(e, c, a), c.isParent && c.open && view.makeUlHtml(e, c, a, g.join("")), view.makeDOMNodeMainAfter(a, e, c), data.addCreatedNode(e, c))
				}
				return a
			},
			appendParentULDom: function(e, t) {
				var i = [],
					o = $$(t, e);
				!o.get(0) && t.parentTId && (view.appendParentULDom(e, t.getParentNode()), o = $$(t, e));
				var n = $$(t, consts.id.UL, e);
				n.get(0) && n.remove();
				var r = e.data.key.children,
					a = view.appendNodes(e, t.level + 1, t[r], t, !1, !0);
				view.makeUlHtml(e, t, i, a.join("")), o.append(i.join(""))
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
					error: function(e, t, i) {
						_tmpV == data.getRoot(setting)._ver && (node && (node.isAjaxing = null), view.setNodeLineIcos(setting, node), setting.treeObj.trigger(consts.event.ASYNC_ERROR, [setting.treeId, node, e, t, i]))
					}
				}), !0
			},
			cancelPreSelectedNode: function(e, t) {
				for (var i = data.getRoot(e).curSelectedList, o = 0, n = i.length - 1; n >= o; n--)
					if ((!t || t === i[n]) && ($$(i[n], consts.id.A, e).removeClass(consts.node.CURSELECTED), t)) {
						data.removeSelectedNode(e, t);
						break
					}
				t || (data.getRoot(e).curSelectedList = [])
			},
			createNodeCallback: function(e) {
				if (e.callback.onNodeCreated || e.view.addDiyDom)
					for (var t = data.getRoot(e); t.createdNodes.length > 0;) {
						var i = t.createdNodes.shift();
						tools.apply(e.view.addDiyDom, [e.treeId, i]), e.callback.onNodeCreated && e.treeObj.trigger(consts.event.NODECREATED, [e.treeId, i])
					}
			},
			createNodes: function(e, t, i, o) {
				if (i && 0 != i.length) {
					var n = data.getRoot(e),
						r = e.data.key.children,
						a = !o || o.open || !! $$(o[r][0], e).get(0);
					n.createdNodes = [];
					var s = view.appendNodes(e, t, i, o, !0, a);
					if (o) {
						var l = $$(o, consts.id.UL, e);
						l.get(0) && l.append(s.join(""))
					} else e.treeObj.append(s.join(""));
					view.createNodeCallback(e)
				}
			},
			destroy: function(e) {
				e && (data.initCache(e), data.initRoot(e), event.unbindTree(e), event.unbindEvent(e), e.treeObj.empty())
			},
			expandCollapseNode: function(e, t, i, o, n) {
				var r = data.getRoot(e),
					a = e.data.key.children;
				if (!t) return void tools.apply(n, []);
				if (r.expandTriggerFlag) {
					var s = n;
					n = function() {
						s && s(), t.open ? e.treeObj.trigger(consts.event.EXPAND, [e.treeId, t]) : e.treeObj.trigger(consts.event.COLLAPSE, [e.treeId, t])
					}, r.expandTriggerFlag = !1
				}
				if (!t.open && t.isParent && (!$$(t, consts.id.UL, e).get(0) || t[a] && t[a].length > 0 && !$$(t[a][0], e).get(0)) && (view.appendParentULDom(e, t), view.createNodeCallback(e)), t.open == i) return void tools.apply(n, []);
				var l = $$(t, consts.id.UL, e),
					d = $$(t, consts.id.SWITCH, e),
					c = $$(t, consts.id.ICON, e);
				t.isParent ? (t.open = !t.open, t.iconOpen && t.iconClose && c.attr("style", view.makeNodeIcoStyle(e, t)), t.open ? (view.replaceSwitchClass(t, d, consts.folder.OPEN), view.replaceIcoClass(t, c, consts.folder.OPEN), 0 == o || "" == e.view.expandSpeed ? (l.show(), tools.apply(n, [])) : t[a] && t[a].length > 0 ? l.slideDown(e.view.expandSpeed, n) : (l.show(), tools.apply(n, []))) : (view.replaceSwitchClass(t, d, consts.folder.CLOSE), view.replaceIcoClass(t, c, consts.folder.CLOSE), 0 != o && "" != e.view.expandSpeed && t[a] && t[a].length > 0 ? l.slideUp(e.view.expandSpeed, n) : (l.hide(), tools.apply(n, [])))) : tools.apply(n, [])
			},
			expandCollapseParentNode: function(e, t, i, o, n) {
				if (t) {
					if (!t.parentTId) return void view.expandCollapseNode(e, t, i, o, n);
					view.expandCollapseNode(e, t, i, o), t.parentTId && view.expandCollapseParentNode(e, t.getParentNode(), i, o, n)
				}
			},
			expandCollapseSonNode: function(e, t, i, o, n) {
				var r = data.getRoot(e),
					a = e.data.key.children,
					s = t ? t[a] : r[a],
					l = t ? !1 : o,
					d = data.getRoot(e).expandTriggerFlag;
				if (data.getRoot(e).expandTriggerFlag = !1, s)
					for (var c = 0, u = s.length; u > c; c++) s[c] && view.expandCollapseSonNode(e, s[c], i, l);
				data.getRoot(e).expandTriggerFlag = d, view.expandCollapseNode(e, t, i, o, n)
			},
			makeDOMNodeIcon: function(e, t, i) {
				var o = data.getNodeName(t, i),
					n = t.view.nameIsHTML ? o : o.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
				e.push("<span id='", i.tId, consts.id.ICON, "' title='' treeNode", consts.id.ICON, " class='", view.makeNodeIcoClass(t, i), "' style='", view.makeNodeIcoStyle(t, i), "'></span><span id='", i.tId, consts.id.SPAN, "'>", n, "</span>")
			},
			makeDOMNodeLine: function(e, t, i) {
				e.push("<span id='", i.tId, consts.id.SWITCH, "' title='' class='", view.makeNodeLineClass(t, i), "' treeNode", consts.id.SWITCH, "></span>")
			},
			makeDOMNodeMainAfter: function(e, t, i) {
				e.push("</li>")
			},
			makeDOMNodeMainBefore: function(e, t, i) {
				e.push("<li id='", i.tId, "' class='", consts.className.LEVEL, i.level, "' tabindex='0' hidefocus='true' treenode>")
			},
			makeDOMNodeNameAfter: function(e, t, i) {
				e.push("</a>")
			},
			makeDOMNodeNameBefore: function(e, t, i) {
				var o = data.getNodeTitle(t, i),
					n = view.makeNodeUrl(t, i),
					r = view.makeNodeFontCss(t, i),
					a = [];
				for (var s in r) a.push(s, ":", r[s], ";");
				e.push("<a id='", i.tId, consts.id.A, "' class='", consts.className.LEVEL, i.level, "' treeNode", consts.id.A, ' onclick="', i.click || "", '" ', null != n && n.length > 0 ? "href='" + n + "'" : "", " target='", view.makeNodeTarget(i), "' style='", a.join(""), "'"), tools.apply(t.view.showTitle, [t.treeId, i], t.view.showTitle) && o && e.push("title='", o.replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), "'"), e.push(">")
			},
			makeNodeFontCss: function(e, t) {
				var i = tools.apply(e.view.fontCss, [e.treeId, t], e.view.fontCss);
				return i && "function" != typeof i ? i : {}
			},
			makeNodeIcoClass: function(e, t) {
				var i = ["ico"];
				return t.isAjaxing || (i[0] = (t.iconSkin ? t.iconSkin + "_" : "") + i[0], t.isParent ? i.push(t.open ? consts.folder.OPEN : consts.folder.CLOSE) : i.push(consts.folder.DOCU)), consts.className.BUTTON + " " + i.join("_")
			},
			makeNodeIcoStyle: function(e, t) {
				var i = [];
				if (!t.isAjaxing) {
					var o = t.isParent && t.iconOpen && t.iconClose ? t.open ? t.iconOpen : t.iconClose : t.icon;
					o && i.push("background:url(", o, ") 0 0 no-repeat;"), 0 != e.view.showIcon && tools.apply(e.view.showIcon, [e.treeId, t], !0) || i.push("width:0px;height:0px;")
				}
				return i.join("")
			},
			makeNodeLineClass: function(e, t) {
				var i = [];
				return e.view.showLine ? 0 == t.level && t.isFirstNode && t.isLastNode ? i.push(consts.line.ROOT) : 0 == t.level && t.isFirstNode ? i.push(consts.line.ROOTS) : t.isLastNode ? i.push(consts.line.BOTTOM) : i.push(consts.line.CENTER) : i.push(consts.line.NOLINE), t.isParent ? i.push(t.open ? consts.folder.OPEN : consts.folder.CLOSE) : i.push(consts.folder.DOCU), view.makeNodeLineClassEx(t) + i.join("_")
			},
			makeNodeLineClassEx: function(e) {
				return consts.className.BUTTON + " " + consts.className.LEVEL + e.level + " " + consts.className.SWITCH + " "
			},
			makeNodeTarget: function(e) {
				return e.target || "_blank"
			},
			makeNodeUrl: function(e, t) {
				var i = e.data.key.url;
				return t[i] ? t[i] : null
			},
			makeUlHtml: function(e, t, i, o) {
				i.push("<ul id='", t.tId, consts.id.UL, "' class='", consts.className.LEVEL, t.level, " ", view.makeUlLineClass(e, t), "' style='display:", t.open ? "block" : "none", "'>"), i.push(o), i.push("</ul>")
			},
			makeUlLineClass: function(e, t) {
				return e.view.showLine && !t.isLastNode ? consts.line.LINE : ""
			},
			removeChildNodes: function(e, t) {
				if (t) {
					var i = e.data.key.children,
						o = t[i];
					if (o) {
						for (var n = 0, r = o.length; r > n; n++) data.removeNodeCache(e, o[n]);
						if (data.removeSelectedNode(e), delete t[i], e.data.keep.parent) $$(t, consts.id.UL, e).empty();
						else {
							t.isParent = !1, t.open = !1;
							var a = $$(t, consts.id.SWITCH, e),
								s = $$(t, consts.id.ICON, e);
							view.replaceSwitchClass(t, a, consts.folder.DOCU), view.replaceIcoClass(t, s, consts.folder.DOCU), $$(t, consts.id.UL, e).remove()
						}
					}
				}
			},
			setFirstNode: function(e, t) {
				var i = e.data.key.children,
					o = t[i].length;
				o > 0 && (t[i][0].isFirstNode = !0)
			},
			setLastNode: function(e, t) {
				var i = e.data.key.children,
					o = t[i].length;
				o > 0 && (t[i][o - 1].isLastNode = !0)
			},
			removeNode: function(e, t) {
				var i = data.getRoot(e),
					o = e.data.key.children,
					n = t.parentTId ? t.getParentNode() : i;
				if (t.isFirstNode = !1, t.isLastNode = !1, t.getPreNode = function() {
					return null
				}, t.getNextNode = function() {
					return null
				}, data.getNodeCache(e, t.tId)) {
					$$(t, e).remove(), data.removeNodeCache(e, t), data.removeSelectedNode(e, t);
					for (var r = 0, a = n[o].length; a > r; r++)
						if (n[o][r].tId == t.tId) {
							n[o].splice(r, 1);
							break
						}
					view.setFirstNode(e, n), view.setLastNode(e, n);
					var s, l, d, c = n[o].length;
					if (e.data.keep.parent || 0 != c) {
						if (e.view.showLine && c > 0) {
							var u = n[o][c - 1];
							if (s = $$(u, consts.id.UL, e), l = $$(u, consts.id.SWITCH, e), d = $$(u, consts.id.ICON, e), n == i)
								if (1 == n[o].length) view.replaceSwitchClass(u, l, consts.line.ROOT);
								else {
									var h = $$(n[o][0], consts.id.SWITCH, e);
									view.replaceSwitchClass(n[o][0], h, consts.line.ROOTS), view.replaceSwitchClass(u, l, consts.line.BOTTOM)
								} else view.replaceSwitchClass(u, l, consts.line.BOTTOM);
							s.removeClass(consts.line.LINE)
						}
					} else n.isParent = !1, n.open = !1, s = $$(n, consts.id.UL, e), l = $$(n, consts.id.SWITCH, e), d = $$(n, consts.id.ICON, e), view.replaceSwitchClass(n, l, consts.folder.DOCU), view.replaceIcoClass(n, d, consts.folder.DOCU), s.css("display", "none")
				}
			},
			replaceIcoClass: function(e, t, i) {
				if (t && !e.isAjaxing) {
					var o = t.attr("class");
					if (void 0 != o) {
						var n = o.split("_");
						switch (i) {
							case consts.folder.OPEN:
							case consts.folder.CLOSE:
							case consts.folder.DOCU:
								n[n.length - 1] = i
						}
						t.attr("class", n.join("_"))
					}
				}
			},
			replaceSwitchClass: function(e, t, i) {
				if (t) {
					var o = t.attr("class");
					if (void 0 != o) {
						var n = o.split("_");
						switch (i) {
							case consts.line.ROOT:
							case consts.line.ROOTS:
							case consts.line.CENTER:
							case consts.line.BOTTOM:
							case consts.line.NOLINE:
								n[0] = view.makeNodeLineClassEx(e) + i;
								break;
							case consts.folder.OPEN:
							case consts.folder.CLOSE:
							case consts.folder.DOCU:
								n[1] = i
						}
						t.attr("class", n.join("_")), i !== consts.folder.DOCU ? t.removeAttr("disabled") : t.attr("disabled", "disabled")
					}
				}
			},
			selectNode: function(e, t, i) {
				i || view.cancelPreSelectedNode(e), $$(t, consts.id.A, e).addClass(consts.node.CURSELECTED), data.addSelectedNode(e, t)
			},
			setNodeFontCss: function(e, t) {
				var i = $$(t, consts.id.A, e),
					o = view.makeNodeFontCss(e, t);
				o && i.css(o)
			},
			setNodeLineIcos: function(e, t) {
				if (t) {
					var i = $$(t, consts.id.SWITCH, e),
						o = $$(t, consts.id.UL, e),
						n = $$(t, consts.id.ICON, e),
						r = view.makeUlLineClass(e, t);
					0 == r.length ? o.removeClass(consts.line.LINE) : o.addClass(r), i.attr("class", view.makeNodeLineClass(e, t)), t.isParent ? i.removeAttr("disabled") : i.attr("disabled", "disabled"), n.removeAttr("style"), n.attr("style", view.makeNodeIcoStyle(e, t)), n.attr("class", view.makeNodeIcoClass(e, t))
				}
			},
			setNodeName: function(e, t) {
				var i = data.getNodeTitle(e, t),
					o = $$(t, consts.id.SPAN, e);
				if (o.empty(), e.view.nameIsHTML ? o.html(data.getNodeName(e, t)) : o.text(data.getNodeName(e, t)), tools.apply(e.view.showTitle, [e.treeId, t], e.view.showTitle)) {
					var n = $$(t, consts.id.A, e);
					n.attr("title", i ? i : "")
				}
			},
			setNodeTarget: function(e, t) {
				var i = $$(t, consts.id.A, e);
				i.attr("target", view.makeNodeTarget(t))
			},
			setNodeUrl: function(e, t) {
				var i = $$(t, consts.id.A, e),
					o = view.makeNodeUrl(e, t);
				null == o || 0 == o.length ? i.removeAttr("href") : i.attr("href", o)
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
		init: function(e, t, i) {
			var o = tools.clone(_setting);
			$.extend(!0, o, t), o.treeId = e.attr("id"), o.treeObj = e, o.treeObj.empty(), settings[o.treeId] = o, "undefined" == typeof document.body.style.maxHeight && (o.view.expandSpeed = ""), data.initRoot(o);
			var n = data.getRoot(o),
				r = o.data.key.children;
			i = i ? tools.clone(tools.isArray(i) ? i : [i]) : [], o.data.simpleData.enable ? n[r] = data.transformTozTreeFormat(o, i) : n[r] = i, data.initCache(o), event.unbindTree(o), event.bindTree(o), event.unbindEvent(o), event.bindEvent(o);
			var a = {
				setting: o,
				addNodes: function(e, t, i) {
					function n() {
						view.addNodes(o, e, r, 1 == i)
					}
					if (!t) return null;
					if (e || (e = null), e && !e.isParent && o.data.keep.leaf) return null;
					var r = tools.clone(tools.isArray(t) ? t : [t]);
					return tools.canAsync(o, e) ? view.asyncNode(o, e, i, n) : n(), r
				},
				cancelSelectedNode: function(e) {
					view.cancelPreSelectedNode(o, e)
				},
				destroy: function() {
					view.destroy(o)
				},
				expandAll: function(e) {
					return e = !! e, view.expandCollapseSonNode(o, null, e, !0), e
				},
				expandNode: function(e, t, i, n, r) {
					if (!e || !e.isParent) return null;
					if (t !== !0 && t !== !1 && (t = !e.open), r = !! r, r && t && 0 == tools.apply(o.callback.beforeExpand, [o.treeId, e], !0)) return null;
					if (r && !t && 0 == tools.apply(o.callback.beforeCollapse, [o.treeId, e], !0)) return null;
					if (t && e.parentTId && view.expandCollapseParentNode(o, e.getParentNode(), t, !1), t === e.open && !i) return null;
					if (data.getRoot(o).expandTriggerFlag = r, !tools.canAsync(o, e) && i) view.expandCollapseSonNode(o, e, t, !0, function() {
						if (n !== !1) try {
							$$(e, o).focus().blur()
						} catch (t) {}
					});
					else if (e.open = !t, view.switchNode(this.setting, e), n !== !1) try {
						$$(e, o).focus().blur()
					} catch (a) {}
					return t
				},
				getNodes: function() {
					return data.getNodes(o)
				},
				getNodeByParam: function(e, t, i) {
					return e ? data.getNodeByParam(o, i ? i[o.data.key.children] : data.getNodes(o), e, t) : null
				},
				getNodeByTId: function(e) {
					return data.getNodeCache(o, e)
				},
				getNodesByParam: function(e, t, i) {
					return e ? data.getNodesByParam(o, i ? i[o.data.key.children] : data.getNodes(o), e, t) : null
				},
				getNodesByParamFuzzy: function(e, t, i) {
					return e ? data.getNodesByParamFuzzy(o, i ? i[o.data.key.children] : data.getNodes(o), e, t) : null
				},
				getNodesByFilter: function(e, t, i, n) {
					return t = !! t, e && "function" == typeof e ? data.getNodesByFilter(o, i ? i[o.data.key.children] : data.getNodes(o), e, t, n) : t ? null : []
				},
				getNodeIndex: function(e) {
					if (!e) return null;
					for (var t = o.data.key.children, i = e.parentTId ? e.getParentNode() : data.getRoot(o), n = 0, r = i[t].length; r > n; n++)
						if (i[t][n] == e) return n;
					return -1
				},
				getSelectedNodes: function() {
					for (var e = [], t = data.getRoot(o).curSelectedList, i = 0, n = t.length; n > i; i++) e.push(t[i]);
					return e
				},
				isSelectedNode: function(e) {
					return data.isSelectedNode(o, e)
				},
				reAsyncChildNodes: function(e, t, i) {
					if (this.setting.async.enable) {
						var n = !e;
						if (n && (e = data.getRoot(o)), "refresh" == t) {
							for (var r = this.setting.data.key.children, a = 0, s = e[r] ? e[r].length : 0; s > a; a++) data.removeNodeCache(o, e[r][a]);
							if (data.removeSelectedNode(o), e[r] = [], n) this.setting.treeObj.empty();
							else {
								var l = $$(e, consts.id.UL, o);
								l.empty()
							}
						}
						view.asyncNode(this.setting, n ? null : e, !! i)
					}
				},
				refresh: function() {
					this.setting.treeObj.empty();
					var e = data.getRoot(o),
						t = e[o.data.key.children];
					data.initRoot(o), e[o.data.key.children] = t, data.initCache(o), view.createNodes(o, 0, e[o.data.key.children])
				},
				removeChildNodes: function(e) {
					if (!e) return null;
					var t = o.data.key.children,
						i = e[t];
					return view.removeChildNodes(o, e), i ? i : null
				},
				removeNode: function(e, t) {
					e && (t = !! t, t && 0 == tools.apply(o.callback.beforeRemove, [o.treeId, e], !0) || (view.removeNode(o, e), t && this.setting.treeObj.trigger(consts.event.REMOVE, [o.treeId, e])))
				},
				selectNode: function(e, t) {
					if (e && tools.uCanDo(o)) {
						if (t = o.view.selectedMulti && t, e.parentTId) view.expandCollapseParentNode(o, e.getParentNode(), !0, !1, function() {
							try {
								$$(e, o).focus().blur()
							} catch (t) {}
						});
						else try {
							$$(e, o).focus().blur()
						} catch (i) {}
						view.selectNode(o, e, t)
					}
				},
				transformTozTreeNodes: function(e) {
					return data.transformTozTreeFormat(o, e)
				},
				transformToArray: function(e) {
					return data.transformToArrayFormat(o, e)
				},
				updateNode: function(e, t) {
					if (e) {
						var i = $$(e, o);
						i.get(0) && tools.uCanDo(o) && (view.setNodeName(o, e), view.setNodeTarget(o, e), view.setNodeUrl(o, e), view.setNodeLineIcos(o, e), view.setNodeFontCss(o, e))
					}
				}
			};
			return n.treeTools = a, data.setZTreeTools(o, a), n[r] && n[r].length > 0 ? view.createNodes(o, 0, n[r]) : o.async.enable && o.async.url && "" !== o.async.url && view.asyncNode(o), a
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
	}, i = {
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
		}, o = function(e) {
			var t = k.getRoot(e);
			t.radioCheckedList = []
		}, n = function(e) {}, r = function(e) {
			var t = e.treeObj,
				i = b.event;
			t.bind(i.CHECK, function(t, i, o, n) {
				_.apply(e.callback.onCheck, [i ? i : t, o, n])
			})
		}, a = function(e) {
			var t = e.treeObj,
				i = b.event;
			t.unbind(i.CHECK)
		}, s = function(e) {
			var t = e.target,
				i = k.getSetting(e.data.treeId),
				o = "",
				n = null,
				r = "",
				a = "",
				s = null,
				l = null;
			if (_.eqs(e.type, "mouseover") ? i.check.enable && _.eqs(t.tagName, "span") && null !== t.getAttribute("treeNode" + b.id.CHECK) && (o = _.getNodeMainDom(t).id,
				r = "mouseoverCheck") : _.eqs(e.type, "mouseout") ? i.check.enable && _.eqs(t.tagName, "span") && null !== t.getAttribute("treeNode" + b.id.CHECK) && (o = _.getNodeMainDom(t).id, r = "mouseoutCheck") : _.eqs(e.type, "click") && i.check.enable && _.eqs(t.tagName, "span") && null !== t.getAttribute("treeNode" + b.id.CHECK) && (o = _.getNodeMainDom(t).id, r = "checkNode"), o.length > 0) switch (n = k.getNodeCache(i, o), r) {
				case "checkNode":
					s = p.onCheckNode;
					break;
				case "mouseoverCheck":
					s = p.onMouseoverCheck;
					break;
				case "mouseoutCheck":
					s = p.onMouseoutCheck
			}
			var d = {
				stop: "checkNode" === r,
				node: n,
				nodeEventType: r,
				nodeEventCallback: s,
				treeEventType: a,
				treeEventCallback: l
			};
			return d
		}, l = function(e, t, i, o, n, r, a) {
			if (i) {
				var s = e.data.key.checked;
				if ("string" == typeof i[s] && (i[s] = _.eqs(i[s], "true")), i[s] = !! i[s], i.checkedOld = i[s], "string" == typeof i.nocheck && (i.nocheck = _.eqs(i.nocheck, "true")), i.nocheck = !! i.nocheck || e.check.nocheckInherit && o && !! o.nocheck, "string" == typeof i.chkDisabled && (i.chkDisabled = _.eqs(i.chkDisabled, "true")), i.chkDisabled = !! i.chkDisabled || e.check.chkDisabledInherit && o && !! o.chkDisabled, "string" == typeof i.halfCheck && (i.halfCheck = _.eqs(i.halfCheck, "true")), i.halfCheck = !! i.halfCheck, i.check_Child_State = -1, i.check_Focus = !1, i.getCheckStatus = function() {
					return k.getCheckStatus(e, i)
				}, e.check.chkStyle == b.radio.STYLE && e.check.radioType == b.radio.TYPE_ALL && i[s]) {
					var l = k.getRoot(e);
					l.radioCheckedList.push(i)
				}
			}
		}, d = function(e, t, i) {
			e.data.key.checked;
			e.check.enable && (k.makeChkFlag(e, t), i.push("<span ID='", t.tId, b.id.CHECK, "' class='", y.makeChkClass(e, t), "' treeNode", b.id.CHECK, t.nocheck === !0 ? " style='display:none;'" : "", "></span>"))
		}, c = function(e, t) {
			t.checkNode = function(t, i, o, n) {
				var r = e.data.key.checked;
				if (t.chkDisabled !== !0 && (i !== !0 && i !== !1 && (i = !t[r]), n = !! n, (t[r] !== i || o) && (!n || 0 != _.apply(this.setting.callback.beforeCheck, [e.treeId, t], !0)) && _.uCanDo(this.setting) && e.check.enable && t.nocheck !== !0)) {
					t[r] = i;
					var a = C(t, b.id.CHECK, e);
					(o || e.check.chkStyle === b.radio.STYLE) && y.checkNodeRelation(e, t), y.setChkClass(e, a, t), y.repairParentChkClassWithSelf(e, t), n && e.treeObj.trigger(b.event.CHECK, [null, e.treeId, t])
				}
			}, t.checkAllNodes = function(t) {
				y.repairAllChk(e, !! t)
			}, t.getCheckedNodes = function(t) {
				var i = e.data.key.children;
				return t = t !== !1, k.getTreeCheckedNodes(e, k.getRoot(e)[i], t)
			}, t.getChangeCheckedNodes = function() {
				var t = e.data.key.children;
				return k.getTreeChangeCheckedNodes(e, k.getRoot(e)[t])
			}, t.setChkDisabled = function(t, i, o, n) {
				i = !! i, o = !! o, n = !! n, y.repairSonChkDisabled(e, t, i, n), y.repairParentChkDisabled(e, t.getParentNode(), i, o)
			};
			var i = t.updateNode;
			t.updateNode = function(o, n) {
				if (i && i.apply(t, arguments), o && e.check.enable) {
					var r = C(o, e);
					if (r.get(0) && _.uCanDo(e)) {
						var a = C(o, b.id.CHECK, e);
						(1 == n || e.check.chkStyle === b.radio.STYLE) && y.checkNodeRelation(e, o), y.setChkClass(e, a, o), y.repairParentChkClassWithSelf(e, o)
					}
				}
			}
		}, u = {
			getRadioCheckedList: function(e) {
				for (var t = k.getRoot(e).radioCheckedList, i = 0, o = t.length; o > i; i++) k.getNodeCache(e, t[i].tId) || (t.splice(i, 1), i--, o--);
				return t
			},
			getCheckStatus: function(e, t) {
				if (!e.check.enable || t.nocheck || t.chkDisabled) return null;
				var i = e.data.key.checked,
					o = {
						checked: t[i],
						half: t.halfCheck ? t.halfCheck : e.check.chkStyle == b.radio.STYLE ? 2 === t.check_Child_State : t[i] ? t.check_Child_State > -1 && t.check_Child_State < 2 : t.check_Child_State > 0
					};
				return o
			},
			getTreeCheckedNodes: function(e, t, i, o) {
				if (!t) return [];
				var n = e.data.key.children,
					r = e.data.key.checked,
					a = i && e.check.chkStyle == b.radio.STYLE && e.check.radioType == b.radio.TYPE_ALL;
				o = o ? o : [];
				for (var s = 0, l = t.length; l > s && (t[s].nocheck === !0 || t[s].chkDisabled === !0 || t[s][r] != i || (o.push(t[s]), !a)) && (k.getTreeCheckedNodes(e, t[s][n], i, o), !(a && o.length > 0)); s++);
				return o
			},
			getTreeChangeCheckedNodes: function(e, t, i) {
				if (!t) return [];
				var o = e.data.key.children,
					n = e.data.key.checked;
				i = i ? i : [];
				for (var r = 0, a = t.length; a > r; r++) t[r].nocheck !== !0 && t[r].chkDisabled !== !0 && t[r][n] != t[r].checkedOld && i.push(t[r]), k.getTreeChangeCheckedNodes(e, t[r][o], i);
				return i
			},
			makeChkFlag: function(e, t) {
				if (t) {
					var i = e.data.key.children,
						o = e.data.key.checked,
						n = -1;
					if (t[i])
						for (var r = 0, a = t[i].length; a > r; r++) {
							var s = t[i][r],
								l = -1;
							if (e.check.chkStyle == b.radio.STYLE) {
								if (l = s.nocheck === !0 || s.chkDisabled === !0 ? s.check_Child_State : s.halfCheck === !0 ? 2 : s[o] ? 2 : s.check_Child_State > 0 ? 2 : 0, 2 == l) {
									n = 2;
									break
								}
								0 == l && (n = 0)
							} else if (e.check.chkStyle == b.checkbox.STYLE) {
								if (l = s.nocheck === !0 || s.chkDisabled === !0 ? s.check_Child_State : s.halfCheck === !0 ? 1 : s[o] ? -1 === s.check_Child_State || 2 === s.check_Child_State ? 2 : 1 : s.check_Child_State > 0 ? 1 : 0, 1 === l) {
									n = 1;
									break
								}
								if (2 === l && n > -1 && r > 0 && l !== n) {
									n = 1;
									break
								}
								if (2 === n && l > -1 && 2 > l) {
									n = 1;
									break
								}
								l > -1 && (n = l)
							}
						}
					t.check_Child_State = n
				}
			}
		}, h = {}, p = {
			onCheckNode: function(e, t) {
				if (t.chkDisabled === !0) return !1;
				var i = k.getSetting(e.data.treeId),
					o = i.data.key.checked;
				if (0 == _.apply(i.callback.beforeCheck, [i.treeId, t], !0)) return !0;
				t[o] = !t[o], y.checkNodeRelation(i, t);
				var n = C(t, b.id.CHECK, i);
				return y.setChkClass(i, n, t), y.repairParentChkClassWithSelf(i, t), i.treeObj.trigger(b.event.CHECK, [e, i.treeId, t]), !0
			},
			onMouseoverCheck: function(e, t) {
				if (t.chkDisabled === !0) return !1;
				var i = k.getSetting(e.data.treeId),
					o = C(t, b.id.CHECK, i);
				return t.check_Focus = !0, y.setChkClass(i, o, t), !0
			},
			onMouseoutCheck: function(e, t) {
				if (t.chkDisabled === !0) return !1;
				var i = k.getSetting(e.data.treeId),
					o = C(t, b.id.CHECK, i);
				return t.check_Focus = !1, y.setChkClass(i, o, t), !0
			}
		}, f = {}, g = {
			checkNodeRelation: function(e, t) {
				var i, o, n, r = e.data.key.children,
					a = e.data.key.checked,
					s = b.radio;
				if (e.check.chkStyle == s.STYLE) {
					var l = k.getRadioCheckedList(e);
					if (t[a])
						if (e.check.radioType == s.TYPE_ALL) {
							for (o = l.length - 1; o >= 0; o--) i = l[o], i[a] = !1, l.splice(o, 1), y.setChkClass(e, C(i, b.id.CHECK, e), i), i.parentTId != t.parentTId && y.repairParentChkClassWithSelf(e, i);
							l.push(t)
						} else {
							var d = t.parentTId ? t.getParentNode() : k.getRoot(e);
							for (o = 0, n = d[r].length; n > o; o++) i = d[r][o], i[a] && i != t && (i[a] = !1, y.setChkClass(e, C(i, b.id.CHECK, e), i))
						} else
					if (e.check.radioType == s.TYPE_ALL)
						for (o = 0, n = l.length; n > o; o++)
							if (t == l[o]) {
								l.splice(o, 1);
								break
							}
				} else t[a] && (!t[r] || 0 == t[r].length || e.check.chkboxType.Y.indexOf("s") > -1) && y.setSonNodeCheckBox(e, t, !0), t[a] || t[r] && 0 != t[r].length && !(e.check.chkboxType.N.indexOf("s") > -1) || y.setSonNodeCheckBox(e, t, !1), t[a] && e.check.chkboxType.Y.indexOf("p") > -1 && y.setParentNodeCheckBox(e, t, !0), !t[a] && e.check.chkboxType.N.indexOf("p") > -1 && y.setParentNodeCheckBox(e, t, !1)
			},
			makeChkClass: function(e, t) {
				var i = e.data.key.checked,
					o = b.checkbox,
					n = b.radio,
					r = "";
				r = t.chkDisabled === !0 ? o.DISABLED : t.halfCheck ? o.PART : e.check.chkStyle == n.STYLE ? t.check_Child_State < 1 ? o.FULL : o.PART : t[i] ? 2 === t.check_Child_State || -1 === t.check_Child_State ? o.FULL : o.PART : t.check_Child_State < 1 ? o.FULL : o.PART;
				var a = e.check.chkStyle + "_" + (t[i] ? o.TRUE : o.FALSE) + "_" + r;
				return a = t.check_Focus && t.chkDisabled !== !0 ? a + "_" + o.FOCUS : a, b.className.BUTTON + " " + o.DEFAULT + " " + a
			},
			repairAllChk: function(e, t) {
				if (e.check.enable && e.check.chkStyle === b.checkbox.STYLE)
					for (var i = e.data.key.checked, o = e.data.key.children, n = k.getRoot(e), r = 0, a = n[o].length; a > r; r++) {
						var s = n[o][r];
						s.nocheck !== !0 && s.chkDisabled !== !0 && (s[i] = t), y.setSonNodeCheckBox(e, s, t)
					}
			},
			repairChkClass: function(e, t) {
				if (t && (k.makeChkFlag(e, t), t.nocheck !== !0)) {
					var i = C(t, b.id.CHECK, e);
					y.setChkClass(e, i, t)
				}
			},
			repairParentChkClass: function(e, t) {
				if (t && t.parentTId) {
					var i = t.getParentNode();
					y.repairChkClass(e, i), y.repairParentChkClass(e, i)
				}
			},
			repairParentChkClassWithSelf: function(e, t) {
				if (t) {
					var i = e.data.key.children;
					t[i] && t[i].length > 0 ? y.repairParentChkClass(e, t[i][0]) : y.repairParentChkClass(e, t)
				}
			},
			repairSonChkDisabled: function(e, t, i, o) {
				if (t) {
					var n = e.data.key.children;
					if (t.chkDisabled != i && (t.chkDisabled = i), y.repairChkClass(e, t), t[n] && o)
						for (var r = 0, a = t[n].length; a > r; r++) {
							var s = t[n][r];
							y.repairSonChkDisabled(e, s, i, o)
						}
				}
			},
			repairParentChkDisabled: function(e, t, i, o) {
				t && (t.chkDisabled != i && o && (t.chkDisabled = i), y.repairChkClass(e, t), y.repairParentChkDisabled(e, t.getParentNode(), i, o))
			},
			setChkClass: function(e, t, i) {
				t && (i.nocheck === !0 ? t.hide() : t.show(), t.removeClass(), t.addClass(y.makeChkClass(e, i)))
			},
			setParentNodeCheckBox: function(e, t, i, o) {
				var n = e.data.key.children,
					r = e.data.key.checked,
					a = C(t, b.id.CHECK, e);
				if (o || (o = t), k.makeChkFlag(e, t), t.nocheck !== !0 && t.chkDisabled !== !0 && (t[r] = i, y.setChkClass(e, a, t), e.check.autoCheckTrigger && t != o && e.treeObj.trigger(b.event.CHECK, [null, e.treeId, t])), t.parentTId) {
					var s = !0;
					if (!i)
						for (var l = t.getParentNode()[n], d = 0, c = l.length; c > d; d++)
							if (l[d].nocheck !== !0 && l[d].chkDisabled !== !0 && l[d][r] || (l[d].nocheck === !0 || l[d].chkDisabled === !0) && l[d].check_Child_State > 0) {
								s = !1;
								break
							}
					s && y.setParentNodeCheckBox(e, t.getParentNode(), i, o)
				}
			},
			setSonNodeCheckBox: function(e, t, i, o) {
				if (t) {
					var n = e.data.key.children,
						r = e.data.key.checked,
						a = C(t, b.id.CHECK, e);
					o || (o = t);
					var s = !1;
					if (t[n])
						for (var l = 0, d = t[n].length; d > l && t.chkDisabled !== !0; l++) {
							var c = t[n][l];
							y.setSonNodeCheckBox(e, c, i, o), c.chkDisabled === !0 && (s = !0)
						}
					t != k.getRoot(e) && t.chkDisabled !== !0 && (s && t.nocheck !== !0 && k.makeChkFlag(e, t), t.nocheck !== !0 && t.chkDisabled !== !0 ? (t[r] = i, s || (t.check_Child_State = t[n] && t[n].length > 0 ? i ? 2 : 0 : -1)) : t.check_Child_State = -1, y.setChkClass(e, a, t), e.check.autoCheckTrigger && t != o && t.nocheck !== !0 && t.chkDisabled !== !0 && e.treeObj.trigger(b.event.CHECK, [null, e.treeId, t]))
				}
			}
		}, m = {
			tools: f,
			view: g,
			event: h,
			data: u
		};
	e.extend(!0, e.fn.zTree.consts, t), e.extend(!0, e.fn.zTree._z, m);
	var v = e.fn.zTree,
		_ = v._z.tools,
		b = v.consts,
		y = v._z.view,
		k = v._z.data,
		C = (v._z.event, _.$);
	k.exSetting(i), k.addInitBind(r), k.addInitUnBind(a), k.addInitCache(n), k.addInitNode(l), k.addInitProxy(s, !0), k.addInitRoot(o), k.addBeforeA(d), k.addZTreeTools(c);
	var w = y.createNodes;
	y.createNodes = function(e, t, i, o) {
		w && w.apply(y, arguments), i && y.repairParentChkClassWithSelf(e, o)
	};
	var N = y.removeNode;
	y.removeNode = function(e, t) {
		var i = t.getParentNode();
		N && N.apply(y, arguments), t && i && (y.repairChkClass(e, i), y.repairParentChkClass(e, i))
	};
	var x = y.appendNodes;
	y.appendNodes = function(e, t, i, o, n, r) {
		var a = "";
		return x && (a = x.apply(y, arguments)), o && k.makeChkFlag(e, o), a
	}
}(jQuery);
var rwindow, rdocument;
if ("undefined" == typeof RELANG) var RELANG = {};
var RLANG = {
	html: "HTML",
	video: "Insert Video",
	image: "Insert Image",
	table: "Table",
	link: "Link",
	link_insert: "Insert link",
	unlink: "Unlink",
	formatting: "Formatting",
	paragraph: "Paragraph",
	quote: "Quote",
	code: "Code",
	header1: "Header 1",
	header2: "Header 2",
	header3: "Header 3",
	header4: "Header 4",
	bold: "Bold",
	italic: "Italic",
	fontcolor: "Font Color",
	backcolor: "Back Color",
	unorderedlist: "Unordered List",
	orderedlist: "Ordered List",
	outdent: "Outdent",
	indent: "Indent",
	cancel: "Cancel",
	insert: "Insert",
	save: "Save",
	_delete: "Delete",
	insert_table: "Insert Table",
	insert_row_above: "Add Row Above",
	insert_row_below: "Add Row Below",
	insert_column_left: "Add Column Left",
	insert_column_right: "Add Column Right",
	delete_column: "Delete Column",
	delete_row: "Delete Row",
	delete_table: "Delete Table",
	rows: "Rows",
	columns: "Columns",
	add_head: "Add Head",
	delete_head: "Delete Head",
	title: "Title",
	image_position: "Position",
	none: "None",
	left: "Left",
	right: "Right",
	image_web_link: "Image Web Link",
	text: "Text",
	mailto: "Email",
	web: "URL",
	video_html_code: "Video Embed Code",
	file: "Insert File",
	upload: "Upload",
	download: "Download",
	choose: "Choose",
	or_choose: "Or choose",
	drop_file_here: "Drop file here",
	align_left: "Align text to the left",
	align_center: "Center text",
	align_right: "Align text to the right",
	align_justify: "Justify text",
	horizontalrule: "Insert Horizontal Rule",
	deleted: "Deleted",
	anchor: "Anchor",
	link_new_tab: "Open link in new tab",
	underline: "Underline",
	alignment: "Alignment"
};
! function(e) {
	jQuery.fn.redactor = function(i) {
		return this.each(function() {
			var o = e(this),
				n = o.data("redactor");
			n || o.data("redactor", n = new t(this, i))
		})
	};
	var t = function(t, i) {
		this.$el = e(t), "undefined" != typeof i && "undefined" != typeof i.lang && "en" !== i.lang && "undefined" != typeof RELANG[i.lang] && (RLANG = RELANG[i.lang]), this.opts = e.extend({
			iframe: !1,
			css: !1,
			lang: "en",
			direction: "ltr",
			callback: !1,
			keyupCallback: !1,
			keydownCallback: !1,
			execCommandCallback: !1,
			plugins: !1,
			cleanup: !0,
			focus: !1,
			tabindex: !1,
			autoresize: !0,
			minHeight: !1,
			fixed: !1,
			fixedTop: 0,
			fixedBox: !1,
			source: !0,
			shortcuts: !0,
			mobile: !0,
			air: !1,
			wym: !1,
			convertLinks: !0,
			convertDivs: !0,
			protocol: "http://",
			autosave: !1,
			autosaveCallback: !1,
			interval: 60,
			imageGetJson: !1,
			imageUpload: !1,
			imageUploadCallback: !1,
			imageUploadErrorCallback: !1,
			fileUpload: !1,
			fileUploadCallback: !1,
			fileUploadErrorCallback: !1,
			uploadCrossDomain: !1,
			uploadFields: !1,
			observeImages: !0,
			overlay: !0,
			allowedTags: ["form", "input", "button", "select", "option", "datalist", "output", "textarea", "fieldset", "legend", "section", "header", "hgroup", "aside", "footer", "article", "details", "nav", "progress", "time", "canvas", "code", "span", "div", "label", "a", "br", "p", "b", "i", "del", "strike", "u", "img", "video", "source", "track", "audio", "iframe", "object", "embed", "param", "blockquote", "mark", "cite", "small", "ul", "ol", "li", "hr", "dl", "dt", "dd", "sup", "sub", "big", "pre", "code", "figure", "figcaption", "strong", "em", "table", "tr", "td", "th", "tbody", "thead", "tfoot", "h1", "h2", "h3", "h4", "h5", "h6"],
			toolbarExternal: !1,
			buttonsCustom: {},
			buttonsAdd: [],
			buttons: ["html", "|", "formatting", "|", "bold", "italic", "deleted", "|", "unorderedlist", "orderedlist", "outdent", "indent", "|", "image", "video", "file", "table", "link", "|", "fontcolor", "backcolor", "|", "alignment", "|", "horizontalrule"],
			airButtons: ["formatting", "|", "bold", "italic", "deleted", "|", "unorderedlist", "orderedlist", "outdent", "indent", "|", "fontcolor", "backcolor"],
			formattingTags: ["p", "blockquote", "pre", "h1", "h2", "h3", "h4"],
			activeButtons: ["deleted", "italic", "bold", "underline", "unorderedlist", "orderedlist"],
			activeButtonsStates: {
				b: "bold",
				strong: "bold",
				i: "italic",
				em: "italic",
				del: "deleted",
				strike: "deleted",
				ul: "unorderedlist",
				ol: "orderedlist",
				u: "underline"
			},
			colors: ["#ffffff", "#000000", "#eeece1", "#1f497d", "#4f81bd", "#c0504d", "#9bbb59", "#8064a2", "#4bacc6", "#f79646", "#ffff00", "#f2f2f2", "#7f7f7f", "#ddd9c3", "#c6d9f0", "#dbe5f1", "#f2dcdb", "#ebf1dd", "#e5e0ec", "#dbeef3", "#fdeada", "#fff2ca", "#d8d8d8", "#595959", "#c4bd97", "#8db3e2", "#b8cce4", "#e5b9b7", "#d7e3bc", "#ccc1d9", "#b7dde8", "#fbd5b5", "#ffe694", "#bfbfbf", "#3f3f3f", "#938953", "#548dd4", "#95b3d7", "#d99694", "#c3d69b", "#b2a2c7", "#b7dde8", "#fac08f", "#f2c314", "#a5a5a5", "#262626", "#494429", "#17365d", "#366092", "#953734", "#76923c", "#5f497a", "#92cddc", "#e36c09", "#c09100", "#7f7f7f", "#0c0c0c", "#1d1b10", "#0f243e", "#244061", "#632423", "#4f6128", "#3f3151", "#31859b", "#974806", "#7f6000"],
			emptyHtml: "<p><br /></p>",
			buffer: !1,
			visual: !0,
			modal_file: String() + '<div id="redactor_modal_content"><form id="redactorUploadFileForm" method="post" action="" enctype="multipart/form-data"><label>Name (optional)</label><input type="text" id="redactor_filename" class="redactor_input" /><div style="margin-top: 7px;"><input type="file" id="redactor_file" name="file" /></div></form><br></div>',
			modal_image_edit: String() + '<div id="redactor_modal_content"><label>' + RLANG.title + '</label><input id="redactor_file_alt" class="redactor_input" /><label>' + RLANG.link + '</label><input id="redactor_file_link" class="redactor_input" /><label>' + RLANG.image_position + '</label><select id="redactor_form_image_align"><option value="none">' + RLANG.none + '</option><option value="left">' + RLANG.left + '</option><option value="right">' + RLANG.right + '</option></select></div><div id="redactor_modal_footer"><a href="javascript:void(null);" id="redactor_image_delete_btn" class="redactor_modal_btn">' + RLANG._delete + '</a>&nbsp;&nbsp;&nbsp;<a href="javascript:void(null);" class="redactor_modal_btn redactor_btn_modal_close">' + RLANG.cancel + '</a><input type="button" name="save" class="redactor_modal_btn" id="redactorSaveBtn" value="' + RLANG.save + '" /></div>',
			modal_image: String() + '<div id="redactor_modal_content"><div id="redactor_tabs"><a href="javascript:void(null);" class="redactor_tabs_act">' + RLANG.upload + '</a><a href="javascript:void(null);">' + RLANG.choose + '</a><a href="javascript:void(null);">' + RLANG.link + '</a></div><form id="redactorInsertImageForm" method="post" action="" enctype="multipart/form-data"><div id="redactor_tab1" class="redactor_tab"><input type="file" id="redactor_file" name="file" /></div><div id="redactor_tab2" class="redactor_tab" style="display: none;"><div id="redactor_image_box"></div></div></form><div id="redactor_tab3" class="redactor_tab" style="display: none;"><label>' + RLANG.image_web_link + '</label><input type="text" name="redactor_file_link" id="redactor_file_link" class="redactor_input"  /></div></div><div id="redactor_modal_footer"><a href="javascript:void(null);" class="redactor_modal_btn redactor_btn_modal_close">' + RLANG.cancel + '</a><input type="button" name="upload" class="redactor_modal_btn" id="redactor_upload_btn" value="' + RLANG.insert + '" /></div>',
			modal_link: String() + '<div id="redactor_modal_content"><form id="redactorInsertLinkForm" method="post" action=""><div id="redactor_tabs"><a href="javascript:void(null);" class="redactor_tabs_act">URL</a><a href="javascript:void(null);">Email</a><a href="javascript:void(null);">' + RLANG.anchor + '</a></div><input type="hidden" id="redactor_tab_selected" value="1" /><div class="redactor_tab" id="redactor_tab1"><label>URL</label><input type="text" id="redactor_link_url" class="redactor_input"  /><label>' + RLANG.text + '</label><input type="text" class="redactor_input redactor_link_text" id="redactor_link_url_text" /><label><input type="checkbox" id="redactor_link_blank"> ' + RLANG.link_new_tab + '</label></div><div class="redactor_tab" id="redactor_tab2" style="display: none;"><label>Email</label><input type="text" id="redactor_link_mailto" class="redactor_input" /><label>' + RLANG.text + '</label><input type="text" class="redactor_input redactor_link_text" id="redactor_link_mailto_text" /></div><div class="redactor_tab" id="redactor_tab3" style="display: none;"><label>' + RLANG.anchor + '</label><input type="text" class="redactor_input" id="redactor_link_anchor"  /><label>' + RLANG.text + '</label><input type="text" class="redactor_input redactor_link_text" id="redactor_link_anchor_text" /></div></form></div><div id="redactor_modal_footer"><a href="javascript:void(null);" class="redactor_modal_btn redactor_btn_modal_close">' + RLANG.cancel + '</a><input type="button" class="redactor_modal_btn" id="redactor_insert_link_btn" value="' + RLANG.insert + '" /></div>',
			modal_table: String() + '<div id="redactor_modal_content"><label>' + RLANG.rows + '</label><input type="text" size="5" value="2" id="redactor_table_rows" /><label>' + RLANG.columns + '</label><input type="text" size="5" value="3" id="redactor_table_columns" /></div><div id="redactor_modal_footer"><a href="javascript:void(null);" class="redactor_modal_btn redactor_btn_modal_close">' + RLANG.cancel + '</a><input type="button" name="upload" class="redactor_modal_btn" id="redactor_insert_table_btn" value="' + RLANG.insert + '" /></div>',
			modal_video: String() + '<div id="redactor_modal_content"><form id="redactorInsertVideoForm"><label>' + RLANG.video_html_code + '</label><textarea id="redactor_insert_video_area" style="width: 99%; height: 160px;"></textarea></form></div><div id="redactor_modal_footer"><a href="javascript:void(null);" class="redactor_modal_btn redactor_btn_modal_close">' + RLANG.cancel + '</a><input type="button" class="redactor_modal_btn" id="redactor_insert_video_btn" value="' + RLANG.insert + '" /></div>',
			toolbar: {
				html: {
					title: RLANG.html,
					func: "toggle"
				},
				formatting: {
					title: RLANG.formatting,
					func: "show",
					dropdown: {
						p: {
							title: RLANG.paragraph,
							exec: "formatblock"
						},
						blockquote: {
							title: RLANG.quote,
							exec: "formatblock",
							className: "redactor_format_blockquote"
						},
						pre: {
							title: RLANG.code,
							exec: "formatblock",
							className: "redactor_format_pre"
						},
						h1: {
							title: RLANG.header1,
							exec: "formatblock",
							className: "redactor_format_h1"
						},
						h2: {
							title: RLANG.header2,
							exec: "formatblock",
							className: "redactor_format_h2"
						},
						h3: {
							title: RLANG.header3,
							exec: "formatblock",
							className: "redactor_format_h3"
						},
						h4: {
							title: RLANG.header4,
							exec: "formatblock",
							className: "redactor_format_h4"
						}
					}
				},
				bold: {
					title: RLANG.bold,
					exec: "bold"
				},
				italic: {
					title: RLANG.italic,
					exec: "italic"
				},
				deleted: {
					title: RLANG.deleted,
					exec: "strikethrough"
				},
				underline: {
					title: RLANG.underline,
					exec: "underline"
				},
				unorderedlist: {
					title: "&bull; " + RLANG.unorderedlist,
					exec: "insertunorderedlist"
				},
				orderedlist: {
					title: "1. " + RLANG.orderedlist,
					exec: "insertorderedlist"
				},
				outdent: {
					title: "< " + RLANG.outdent,
					exec: "outdent"
				},
				indent: {
					title: "> " + RLANG.indent,
					exec: "indent"
				},
				image: {
					title: RLANG.image,
					func: "showImage"
				},
				video: {
					title: RLANG.video,
					func: "showVideo"
				},
				file: {
					title: RLANG.file,
					func: "showFile"
				},
				table: {
					title: RLANG.table,
					func: "show",
					dropdown: {
						insert_table: {
							title: RLANG.insert_table,
							func: "showTable"
						},
						separator_drop1: {
							name: "separator"
						},
						insert_row_above: {
							title: RLANG.insert_row_above,
							func: "insertRowAbove"
						},
						insert_row_below: {
							title: RLANG.insert_row_below,
							func: "insertRowBelow"
						},
						insert_column_left: {
							title: RLANG.insert_column_left,
							func: "insertColumnLeft"
						},
						insert_column_right: {
							title: RLANG.insert_column_right,
							func: "insertColumnRight"
						},
						separator_drop2: {
							name: "separator"
						},
						add_head: {
							title: RLANG.add_head,
							func: "addHead"
						},
						delete_head: {
							title: RLANG.delete_head,
							func: "deleteHead"
						},
						separator_drop3: {
							name: "separator"
						},
						delete_column: {
							title: RLANG.delete_column,
							func: "deleteColumn"
						},
						delete_row: {
							title: RLANG.delete_row,
							func: "deleteRow"
						},
						delete_table: {
							title: RLANG.delete_table,
							func: "deleteTable"
						}
					}
				},
				link: {
					title: RLANG.link,
					func: "show",
					dropdown: {
						link: {
							title: RLANG.link_insert,
							func: "showLink"
						},
						unlink: {
							title: RLANG.unlink,
							exec: "unlink"
						}
					}
				},
				fontcolor: {
					title: RLANG.fontcolor,
					func: "show"
				},
				backcolor: {
					title: RLANG.backcolor,
					func: "show"
				},
				alignment: {
					title: RLANG.alignment,
					func: "show",
					dropdown: {
						alignleft: {
							title: RLANG.align_left,
							exec: "JustifyLeft"
						},
						aligncenter: {
							title: RLANG.align_center,
							exec: "JustifyCenter"
						},
						alignright: {
							title: RLANG.align_right,
							exec: "JustifyRight"
						},
						justify: {
							title: RLANG.align_justify,
							exec: "JustifyFull"
						}
					}
				},
				alignleft: {
					exec: "JustifyLeft",
					title: RLANG.align_left
				},
				aligncenter: {
					exec: "JustifyCenter",
					title: RLANG.align_center
				},
				alignright: {
					exec: "JustifyRight",
					title: RLANG.align_right
				},
				justify: {
					exec: "JustifyFull",
					title: RLANG.align_justify
				},
				horizontalrule: {
					exec: "inserthorizontalrule",
					title: RLANG.horizontalrule
				}
			}
		}, i, this.$el.data()), this.dropdowns = [], this.init()
	};
	t.prototype = {
		init: function() {
			function t() {
				if (this.enableAir(), this.buildToolbar(), "object" == typeof this.opts.plugins && e.each(this.opts.plugins, e.proxy(function(t, i) {
					"undefined" != typeof RedactorPlugins[i] && (e.extend(this, RedactorPlugins[i]), "undefined" != typeof RedactorPlugins[i].init && this.init())
				}, this)), this.opts.activeButtons !== !1 && this.opts.toolbar !== !1) {
					var t = e.proxy(function() {
						this.observeFormatting()
					}, this);
					this.$editor.click(t).keyup(t)
				}
				var i = !1;
				if (this.browser("webkit") && -1 === navigator.userAgent.indexOf("Chrome")) {
					var o = this.browser("version").split(".");
					o[0] < 536 && (i = !0)
				}
				if (this.isMobile(!0) === !1 && i === !1 && this.$editor.bind("paste", e.proxy(function(t) {
					if (this.opts.cleanup === !1) return !0;
					this.pasteRunning = !0, this.setBuffer(), this.opts.autoresize === !0 ? this.saveScroll = this.document.body.scrollTop : this.saveScroll = this.$editor.scrollTop();
					var i = this.extractContent();
					setTimeout(e.proxy(function() {
						var e = this.extractContent();
						this.$editor.append(i), this.restoreSelection();
						var t = this.getFragmentHtml(e);
						this.pasteCleanUp(t), this.pasteRunning = !1
					}, this), 1)
				}, this)), this.keyup(), this.keydown(), this.opts.autosave !== !1 && this.autoSave(), setTimeout(e.proxy(function() {
					this.observeImages(), this.observeTables()
				}, this), 1), this.browser("mozilla")) {
					this.$editor.click(e.proxy(function() {
						this.saveSelection()
					}, this));
					try {
						this.document.execCommand("enableObjectResizing", !1, !1), this.document.execCommand("enableInlineTableEditing", !1, !1)
					} catch (n) {}
				}
				this.opts.focus && setTimeout(e.proxy(function() {
					this.$editor.focus()
				}, this), 1), this.opts.fixed && (this.observeScroll(), e(document).scroll(e.proxy(this.observeScroll, this))), "function" == typeof this.opts.callback && this.opts.callback(this), this.opts.toolbar !== !1 && this.$toolbar.find("a").attr("tabindex", "-1")
			}
			if (this.height = this.$el.css("height"), this.width = this.$el.css("width"), rdocument = this.document = document, rwindow = this.window = window, this.opts.mobile === !1 && this.isMobile()) return this.build(!0), !1;
			if (this.opts.iframe && (this.opts.autoresize = !1), this.opts.air) this.opts.buttons = this.opts.airButtons;
			else if (this.opts.toolbar !== !1) {
				if (this.opts.source === !1) {
					var i = this.opts.buttons.indexOf("html"),
						o = this.opts.buttons[i + 1];
					this.opts.buttons.splice(i, 1), "undefined" != typeof o && "|" === o && this.opts.buttons.splice(i, 1)
				}
				e.extend(this.opts.toolbar, this.opts.buttonsCustom), e.each(this.opts.buttonsAdd, e.proxy(function(e, t) {
					this.opts.buttons.push(t)
				}, this))
			}
			this.opts.toolbar !== !1 && e.each(this.opts.toolbar.formatting.dropdown, e.proxy(function(t, i) {
				"-1" == e.inArray(t, this.opts.formattingTags) && delete this.opts.toolbar.formatting.dropdown[t]
			}, this)), this.build(!1, t)
		},
		shortcuts: function(e, t) {
			e.preventDefault(), this.execCommand(t, !1)
		},
		keyup: function() {
			this.$editor.keyup(e.proxy(function(e) {
				var t = e.keyCode || e.which;
				return this.browser("mozilla") && !this.pasteRunning && this.saveSelection(), "function" == typeof this.opts.keyupCallback && this.opts.keyupCallback(this, e), 8 === t || 46 === t ? (this.observeImages(), this.formatEmpty(e)) : (13 !== t || e.shiftKey || e.ctrlKey || e.metaKey || (this.browser("webkit") && this.formatNewLine(e), this.opts.convertLinks && this.$editor.linkify()), void this.syncCode())
			}, this))
		},
		keydown: function() {
			this.$editor.keydown(e.proxy(function(t) {
				var i = t.keyCode || t.which,
					o = this.getParentNode(),
					n = this.getCurrentNode(),
					r = !1,
					a = t.ctrlKey || t.metaKey;
				if (!o && !n || "PRE" !== e(o).get(0).tagName && "PRE" !== e(n).get(0).tagName || (r = !0), "function" == typeof this.opts.keydownCallback && this.opts.keydownCallback(this, t), a && this.opts.shortcuts && (90 === i ? this.opts.buffer !== !1 ? (t.preventDefault(), this.getBuffer()) : t.shiftKey ? this.shortcuts(t, "redo") : this.shortcuts(t, "undo") : 77 === i ? this.shortcuts(t, "removeFormat") : 66 === i ? this.shortcuts(t, "bold") : 73 === i ? this.shortcuts(t, "italic") : 74 === i ? this.shortcuts(t, "insertunorderedlist") : 75 === i ? this.shortcuts(t, "insertorderedlist") : 76 === i ? this.shortcuts(t, "superscript") : 72 === i && this.shortcuts(t, "subscript")), a || 90 === i || (this.opts.buffer = !1), r === !0 && 13 === i) {
					t.preventDefault();
					var s = e(n).parent().text();
					return this.insertNodeAtCaret(this.document.createTextNode("\r\n")), -1 == s.search(/\s$/) && this.insertNodeAtCaret(this.document.createTextNode("\r\n")), this.syncCode(), !1
				}
				if (this.opts.shortcuts && !t.shiftKey && 9 === i) {
					if (r !== !1) return t.preventDefault(), this.insertNodeAtCaret(this.document.createTextNode("	")), this.syncCode(), !1;
					this.shortcuts(t, "indent")
				} else this.opts.shortcuts && t.shiftKey && 9 === i && this.shortcuts(t, "outdent");
				return this.browser("webkit") && -1 === navigator.userAgent.indexOf("Chrome") ? this.safariShiftKeyEnter(t, i) : void 0
			}, this))
		},
		build: function(t, i) {
			function o() {
				this.$editor = this.$content.contents().find("body").attr("contenteditable", !0).attr("dir", this.opts.direction), rdocument = this.document = this.$editor[0].ownerDocument, rwindow = this.window = this.document.defaultView || window, this.opts.css !== !1 && this.$content.contents().find("head").append('<link rel="stylesheet" href="' + this.opts.css + '" />'), this.$editor.html(a), i && (i.call(this), i = null)
			}
			if (t !== !0) {
				if (this.$box = e('<div class="redactor_box"></div>'), this.opts.air && (this.air = e('<div class="redactor_air" style="display: none;"></div>')), this.$content = null, this.textareamode = !0, "TEXTAREA" === this.$el.get(0).tagName) {
					if (this.opts.iframe) {
						var n = this;
						this.$content = e('<iframe style="width: 100%;" frameborder="0"></iframe>').load(function() {
							o.call(n)
						})
					} else this.$content = this.$editor = e("<div></div>");
					var r = this.$el.get(0).className.split(/\s+/);
					e.each(r, e.proxy(function(e, t) {
						this.$content.addClass("redactor_" + t)
					}, this))
				} else this.textareamode = !1, this.$content = this.$editor = this.$el, this.$el = e('<textarea name="' + this.$editor.attr("id") + '"></textarea>').css("height", this.height);
				this.$editor && this.$editor.addClass("redactor_editor").attr("contenteditable", !0).attr("dir", this.opts.direction), this.opts.tabindex !== !1 && this.$content.attr("tabindex", this.opts.tabindex), this.opts.minHeight !== !1 && this.$content.css("min-height", this.opts.minHeight + "px"), this.opts.wym === !0 && this.$content.addClass("redactor_editor_wym"), this.opts.autoresize === !1 && this.$content.css("height", this.height), this.$el.hide();
				var a = "";
				this.textareamode ? (a = this.$el.val(), a = this.savePreCode(a), this.$box.insertAfter(this.$el).append(this.$content).append(this.$el)) : (a = this.$editor.html(), a = this.savePreCode(a), this.$box.insertAfter(this.$content).append(this.$el).append(this.$editor)), a = this.paragraphy(a), this.$editor && this.$editor.html(a), this.textareamode === !1 && this.syncCode()
			} else if ("TEXTAREA" !== this.$el.get(0).tagName) {
				var a = this.$el.val(),
					s = e('<textarea name="' + this.$editor.attr("id") + '"></textarea>').css("height", this.height).val(a);
				this.$el.hide(), this.$el.after(s)
			}
			i && this.$editor && i.call(this)
		},
		enableAir: function() {
			return this.opts.air === !1 ? !1 : (this.air.hide(), this.$editor.bind("textselect", e.proxy(function(e) {
				this.showAir(e)
			}, this)), void this.$editor.bind("textunselect", e.proxy(function() {
				this.air.hide()
			}, this)))
		},
		showAir: function(t) {
			e(".redactor_air").hide();
			var i = this.air.innerWidth(),
				o = t.clientX;
			e(this.document).width() < o + i && (o -= i);
			var n = t.clientY + e(document).scrollTop() + 14;
			this.opts.iframe === !0 && (n += this.$box.position().top, o += this.$box.position().left), this.air.css({
				left: o + "px",
				top: n + "px"
			}).show()
		},
		syncCode: function() {
			this.$el.val(this.$editor.html())
		},
		setCode: function(e) {
			e = this.stripTags(e), this.$editor.html(e).focus(), this.syncCode()
		},
		getCode: function() {
			var e = "";
			return e = this.opts.visual ? this.$editor.html() : this.$el.val(), this.stripTags(e)
		},
		insertHtml: function(e) {
			this.$editor.focus(), this.pasteHtmlAtCaret(e), this.observeImages(), this.syncCode()
		},
		pasteHtmlAtCaret: function(e) {
			var t, i;
			if (this.document.getSelection) {
				if (t = this.window.getSelection(), t.getRangeAt && t.rangeCount) {
					i = t.getRangeAt(0), i.deleteContents();
					var o = this.document.createElement("div");
					o.innerHTML = e;
					for (var n, r, a = this.document.createDocumentFragment(); n = o.firstChild;) r = a.appendChild(n);
					i.insertNode(a), r && (i = i.cloneRange(), i.setStartAfter(r), i.collapse(!0), t.removeAllRanges(), t.addRange(i))
				}
			} else this.document.selection && "Control" != this.document.selection.type && this.document.selection.createRange().pasteHTML(e)
		},
		destroy: function() {
			var t = this.getCode();
			this.textareamode ? (this.$box.after(this.$el), this.$box.remove(), this.$el.height(this.height).val(t).show()) : (this.$box.after(this.$editor), this.$box.remove(), this.$editor.removeClass("redactor_editor").removeClass("redactor_editor_wym").attr("contenteditable", !1).html(t).show()), this.opts.toolbarExternal && e(this.opts.toolbarExternal).empty(), e(".redactor_air").remove();
			for (var i = 0; i < this.dropdowns.length; i++) this.dropdowns[i].remove(), delete this.dropdowns[i];
			this.opts.autosave !== !1 && clearInterval(this.autosaveInterval)
		},
		observeFormatting: function() {
			var t = this.getCurrentNode();
			this.inactiveAllButtons(), e.each(this.opts.activeButtonsStates, e.proxy(function(i, o) {
				0 != e(t).closest(i, this.$editor.get()[0]).length && this.setBtnActive(o)
			}, this));
			var i = e(t).closest(["p", "div", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "td"]);
			if ("undefined" != typeof i[0] && "undefined" != typeof i[0].elem && 0 != e(i[0].elem).size()) {
				var o = e(i[0].elem).css("text-align");
				switch (o) {
					case "right":
						this.setBtnActive("alignright");
						break;
					case "center":
						this.setBtnActive("aligncenter");
						break;
					case "justify":
						this.setBtnActive("justify");
						break;
					default:
						this.setBtnActive("alignleft")
				}
			}
		},
		observeImages: function() {
			return this.opts.observeImages === !1 ? !1 : void this.$editor.find("img").each(e.proxy(function(t, i) {
				this.browser("msie") && e(i).attr("unselectable", "on"), this.resizeImage(i)
			}, this))
		},
		observeTables: function() {
			this.$editor.find("table").click(e.proxy(this.tableObserver, this))
		},
		observeScroll: function() {
			var t = e(this.document).scrollTop(),
				i = this.$box.offset().top,
				o = 0;
			if (t > i) {
				var n = "100%";
				this.opts.fixedBox && (o = this.$box.offset().left, n = this.$box.innerWidth()), this.fixed = !0, this.$toolbar.css({
					position: "fixed",
					width: n,
					zIndex: 1005,
					top: this.opts.fixedTop + "px",
					left: o
				})
			} else this.fixed = !1, this.$toolbar.css({
				position: "relative",
				width: "auto",
				zIndex: 1,
				top: 0,
				left: o
			})
		},
		setBuffer: function() {
			this.saveSelection(), this.opts.buffer = this.$editor.html()
		},
		getBuffer: function() {
			return this.opts.buffer === !1 ? !1 : (this.$editor.html(this.opts.buffer), this.browser("msie") || this.restoreSelection(), void(this.opts.buffer = !1))
		},
		execCommand: function(t, i) {
			if (0 == this.opts.visual) return this.$el.focus(), !1;
			try {
				var o;
				if ("inserthtml" === t) this.browser("msie") ? (this.$editor.focus(), this.document.selection.createRange().pasteHTML(i)) : this.pasteHtmlAtCaret(i), this.observeImages();
				else if ("unlink" === t) o = this.getParentNode(), "A" === e(o).get(0).tagName ? e(o).replaceWith(e(o).text()) : this.execRun(t, i);
				else if ("JustifyLeft" === t || "JustifyCenter" === t || "JustifyRight" === t || "JustifyFull" === t) {
					o = this.getCurrentNode();
					var n = e(o).get(0).tagName;
					if (this.opts.iframe === !1 && 0 == e(o).parents(".redactor_editor").size()) return !1;
					var r = ["P", "DIV", "H1", "H2", "H3", "H4", "H5", "H6", "BLOCKQUOTE", "TD"];
					if (-1 != e.inArray(n, r)) {
						var a = !1;
						"JustifyCenter" === t ? a = "center" : "JustifyRight" === t ? a = "right" : "JustifyFull" === t && (a = "justify"), a === !1 ? e(o).css("text-align", "") : e(o).css("text-align", a)
					} else this.execRun(t, i)
				} else if ("formatblock" === t && "blockquote" === i)
					if (o = this.getCurrentNode(), "BLOCKQUOTE" === e(o).get(0).tagName)
						if (this.browser("msie")) {
							var s = e("<p>" + e(o).html() + "</p>");
							e(o).replaceWith(s)
						} else this.execRun(t, "p");
						else
				if ("P" === e(o).get(0).tagName) {
					var l = e(o).parent();
					if ("BLOCKQUOTE" === e(l).get(0).tagName) {
						var s = e("<p>" + e(o).html() + "</p>");
						e(l).replaceWith(s), this.setSelection(s[0], 0, s[0], 0)
					} else if (this.browser("msie")) {
						var s = e("<blockquote>" + e(o).html() + "</blockquote>");
						e(o).replaceWith(s)
					} else this.execRun(t, i)
				} else this.execRun(t, i);
				else "formatblock" !== t || "pre" !== i && "p" !== i ? ("inserthorizontalrule" === t && this.browser("msie") && this.$editor.focus(), "formatblock" === t && this.browser("mozilla") && this.$editor.focus(), this.execRun(t, i)) : (o = this.getParentNode(), "PRE" === e(o).get(0).tagName ? e(o).replaceWith("<p>" + this.encodeEntities(e(o).text()) + "</p>") : this.execRun(t, i));
				"inserthorizontalrule" === t && this.$editor.find("hr").removeAttr("id"), this.syncCode(), this.oldIE() && this.$editor.focus(), "function" == typeof this.opts.execCommandCallback && this.opts.execCommandCallback(this, t), this.opts.air && this.air.hide()
			} catch (d) {}
		},
		execRun: function(e, t) {
			"formatblock" === e && this.browser("msie") && (t = "<" + t + ">"), this.document.execCommand(e, !1, t)
		},
		formatNewLine: function(t) {
			var i = this.getParentNode();
			if ("DIV" === i.nodeName && "redactor_editor" === i.className) {
				var o = e(this.getCurrentNode());
				if ("DIV" === o.get(0).tagName && ("" === o.html() || "<br>" === o.html())) {
					var n = e("<p>").append(o.clone().get(0).childNodes);
					o.replaceWith(n), n.html("<br />"), this.setSelection(n[0], 0, n[0], 0)
				}
			}
		},
		safariShiftKeyEnter: function(t, i) {
			return t.shiftKey && 13 === i ? (t.preventDefault(), this.insertNodeAtCaret(e("<span><br /></span>").get(0)), this.syncCode(), !1) : !0
		},
		formatEmpty: function(t) {
			var i = e.trim(this.$editor.html());
			this.browser("mozilla") && (i = i.replace(/<br>/i, ""));
			var o = i.replace(/<(?:.|\n)*?>/gm, "");
			if ("" === i || "" === o) {
				t.preventDefault();
				var n = e(this.opts.emptyHtml).get(0);
				return this.$editor.html(n), this.setSelection(n, 0, n, 0), this.syncCode(), !1
			}
			this.syncCode()
		},
		paragraphy: function(t) {
			if (t = e.trim(t), "" === t || "<p></p>" === t) return this.opts.emptyHtml;
			this.opts.convertDivs && (t = t.replace(/<div(.*?)>([\w\W]*?)<\/div>/gi, "<p>$2</p>"));
			var i = function(e, t, i) {
				return e.replace(new RegExp(t, "g"), i)
			}, o = function(e, o) {
					return i(t, e, o)
				}, n = "(table|thead|tfoot|caption|colgroup|tbody|tr|td|th|div|dl|dd|dt|ul|ol|li|pre|select|form|blockquote|address|math|style|script|object|input|param|p|h[1-6])";
			return t += "\n", o("<br />\\s*<br />", "\n\n"), o("(<" + n + "[^>]*>)", "\n$1"), o("(</" + n + ">)", "$1\n\n"), o("\r\n|\r", "\n"), o("\n\n+", "\n\n"), o("\n?((.|\n)+?)$", "<p>$1</p>\n"), o("<p>\\s*?</p>", ""), o("<p>(<div[^>]*>\\s*)", "$1<p>"), o("<p>([^<]+)\\s*?(</(div|address|form)[^>]*>)", "<p>$1</p>$2"), o("<p>\\s*(</?" + n + "[^>]*>)\\s*</p>", "$1"), o("<p>(<li.+?)</p>", "$1"), o("<p>\\s*(</?" + n + "[^>]*>)", "$1"), o("(</?" + n + "[^>]*>)\\s*</p>", "$1"), o("(</?" + n + "[^>]*>)\\s*<br />", "$1"), o("<br />(\\s*</?(p|li|div|dl|dd|dt|th|pre|td|ul|ol)[^>]*>)", "$1"), -1 != t.indexOf("<pre") && o("(<pre(.|\n)*?>)((.|\n)*?)</pre>", function(e, t, o, n) {
				return i(t, "\\\\(['\"\\\\])", "$1") + i(i(i(n, "<p>", "\n"), "</p>|<br />", ""), "\\\\(['\"\\\\])", "$1") + "</pre>"
			}), o("\n</p>$", "</p>")
		},
		stripTags: function(t) {
			var i = this.opts.allowedTags,
				o = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
			return t.replace(o, function(t, o) {
				return e.inArray(o.toLowerCase(), i) > "-1" ? t : ""
			})
		},
		savePreCode: function(t) {
			var i = t.match(/<pre(.*?)>([\w\W]*?)<\/pre>/gi);
			return null !== i && e.each(i, e.proxy(function(e, i) {
				var o = i.match(/<pre(.*?)>([\w\W]*?)<\/pre>/i);
				o[2] = this.encodeEntities(o[2]), t = t.replace(i, "<pre" + o[1] + ">" + o[2] + "</pre>")
			}, this)), t
		},
		encodeEntities: function(e) {
			return e = String(e).replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"'), String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
		},
		cleanupPre: function(e) {
			e = e.replace(/<br>/gi, "\n"), e = e.replace(/<\/p>/gi, "\n"), e = e.replace(/<\/div>/gi, "\n");
			var t = this.document.createElement("div");
			return t.innerHTML = e, t.textContent || t.innerText
		},
		pasteCleanUp: function(t) {
			var i = this.getParentNode();
			return "PRE" === e(i).get(0).tagName ? (t = this.cleanupPre(t), this.pasteCleanUpInsert(t), !0) : (t = t.replace(/<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi, ""), t = t.replace(/(&nbsp;){2,}/gi, "&nbsp;"), t = t.replace(/<b\sid="internal-source-marker(.*?)">([\w\W]*?)<\/b>/gi, "$2"), t = this.stripTags(t), t = t.replace(/<td><\/td>/gi, "[td]"), t = t.replace(/<td>&nbsp;<\/td>/gi, "[td]"), t = t.replace(/<td><br><\/td>/gi, "[td]"), t = t.replace(/<a(.*?)href="(.*?)"(.*?)>([\w\W]*?)<\/a>/gi, '[a href="$2"]$4[/a]'), t = t.replace(/<iframe(.*?)>([\w\W]*?)<\/iframe>/gi, "[iframe$1]$2[/iframe]"), t = t.replace(/<video(.*?)>([\w\W]*?)<\/video>/gi, "[video$1]$2[/video]"), t = t.replace(/<audio(.*?)>([\w\W]*?)<\/audio>/gi, "[audio$1]$2[/audio]"), t = t.replace(/<embed(.*?)>([\w\W]*?)<\/embed>/gi, "[embed$1]$2[/embed]"), t = t.replace(/<object(.*?)>([\w\W]*?)<\/object>/gi, "[object$1]$2[/object]"), t = t.replace(/<param(.*?)>/gi, "[param$1]"), t = t.replace(/<img(.*?)style="(.*?)"(.*?)>/gi, "[img$1$3]"), t = t.replace(/<(\w+)([\w\W]*?)>/gi, "<$1>"), t = t.replace(/<[^\/>][^>]*>(\s*|\t*|\n*|&nbsp;|<br>)<\/[^>]+>/gi, ""), t = t.replace(/<[^\/>][^>]*>(\s*|\t*|\n*|&nbsp;|<br>)<\/[^>]+>/gi, ""), t = t.replace(/\[td\]/gi, "<td>&nbsp;</td>"), t = t.replace(/\[a href="(.*?)"\]([\w\W]*?)\[\/a\]/gi, '<a href="$1">$2</a>'), t = t.replace(/\[iframe(.*?)\]([\w\W]*?)\[\/iframe\]/gi, "<iframe$1>$2</iframe>"), t = t.replace(/\[video(.*?)\]([\w\W]*?)\[\/video\]/gi, "<video$1>$2</video>"), t = t.replace(/\[audio(.*?)\]([\w\W]*?)\[\/audio\]/gi, "<audio$1>$2</audio>"), t = t.replace(/\[embed(.*?)\]([\w\W]*?)\[\/embed\]/gi, "<embed$1>$2</embed>"), t = t.replace(/\[object(.*?)\]([\w\W]*?)\[\/object\]/gi, "<object$1>$2</object>"), t = t.replace(/\[param(.*?)\]/gi, "<param$1>"), t = t.replace(/\[img(.*?)\]/gi, "<img$1>"), this.opts.convertDivs && (t = t.replace(/<div(.*?)>([\w\W]*?)<\/div>/gi, "<p>$2</p>")), t = t.replace(/<span>([\w\W]*?)<\/span>/gi, "$1"), t = t.replace(/\n{3,}/gi, "\n"), t = t.replace(/<p><p>/gi, "<p>"), t = t.replace(/<\/p><\/p>/gi, "</p>"), this.browser("mozilla") && (t = t.replace(/<br>$/gi, "")), void this.pasteCleanUpInsert(t))
		},
		pasteCleanUpInsert: function(t) {
			this.execCommand("inserthtml", t), this.opts.autoresize === !0 ? e(this.document.body).scrollTop(this.saveScroll) : this.$editor.scrollTop(this.saveScroll)
		},
		formattingRemove: function(t) {
			var i = [],
				o = t.match(/<pre(.*?)>([\w\W]*?)<\/pre>/gi);
			return null !== o && e.each(o, function(e, o) {
				t = t.replace(o, "prebuffer_" + e), i.push(o)
			}), t = t.replace(/\s{2,}/g, " "), t = t.replace(/\n/g, " "), t = t.replace(/[\t]*/g, ""), t = t.replace(/\n\s*\n/g, "\n"), t = t.replace(/^[\s\n]*/g, ""), t = t.replace(/[\s\n]*$/g, ""), t = t.replace(/>\s+</g, "><"), i && (e.each(i, function(e, i) {
				t = t.replace("prebuffer_" + e, i)
			}), i = []), t
		},
		formattingIndenting: function(e) {
			return e = e.replace(/<li/g, "	<li"), e = e.replace(/<tr/g, "	<tr"), e = e.replace(/<td/g, "		<td"), e = e.replace(/<\/tr>/g, "	</tr>")
		},
		formattingEmptyTags: function(e) {
			for (var t = ["<pre></pre>", "<blockquote>\\s*</blockquote>", "<em>\\s*</em>", "<ul></ul>", "<ol></ol>", "<li></li>", "<table></table>", "<tr></tr>", "<span>\\s*<span>", "<span>&nbsp;<span>", "<b>\\s*</b>", "<b>&nbsp;</b>", "<p>\\s*</p>", "<p>&nbsp;</p>", "<p>\\s*<br>\\s*</p>", "<div>\\s*</div>", "<div>\\s*<br>\\s*</div>"], i = 0; i < t.length; ++i) {
				var o = t[i];
				e = e.replace(new RegExp(o, "gi"), "")
			}
			return e
		},
		formattingAddBefore: function(e) {
			for (var t = "\r\n", i = ["<p", "<form", "</ul>", "</ol>", "<fieldset", "<legend", "<object", "<embed", "<select", "<option", "<input", "<textarea", "<pre", "<blockquote", "<ul", "<ol", "<li", "<dl", "<dt", "<dd", "<table", "<thead", "<tbody", "<caption", "</caption>", "<th", "<tr", "<td", "<figure"], o = 0; o < i.length; ++o) {
				var n = i[o];
				e = e.replace(new RegExp(n, "gi"), t + n)
			}
			return e
		},
		formattingAddAfter: function(e) {
			for (var t = "\r\n", i = ["</p>", "</div>", "</h1>", "</h2>", "</h3>", "</h4>", "</h5>", "</h6>", "<br>", "<br />", "</dl>", "</dt>", "</dd>", "</form>", "</blockquote>", "</pre>", "</legend>", "</fieldset>", "</object>", "</embed>", "</textarea>", "</select>", "</option>", "</table>", "</thead>", "</tbody>", "</tr>", "</td>", "</th>", "</figure>"], o = 0; o < i.length; ++o) {
				var n = i[o];
				e = e.replace(new RegExp(n, "gi"), n + t)
			}
			return e
		},
		formatting: function(e) {
			return e = this.formattingRemove(e), e = this.formattingEmptyTags(e), e = this.formattingAddBefore(e), e = this.formattingAddAfter(e), e = this.formattingIndenting(e)
		},
		toggle: function() {
			var e;
			if (this.opts.visual) {
				var t = this.$editor.innerHeight();
				this.$editor.hide(), this.$content.hide(), e = this.$editor.html(), this.$el.height(t).val(e).show().focus(), this.setBtnActive("html"), this.opts.visual = !1
			} else {
				this.$el.hide();
				var e = this.$el.val();
				this.$editor.html(e).show(), this.$content.show(), "" === this.$editor.html() && this.setCode(this.opts.emptyHtml), this.$editor.focus(), this.setBtnInactive("html"), this.opts.visual = !0, this.observeImages(), this.observeTables()
			}
		},
		autoSave: function() {
			this.autosaveInterval = setInterval(e.proxy(function() {
				e.ajax({
					url: this.opts.autosave,
					type: "post",
					data: this.$el.attr("name") + "=" + escape(encodeURIComponent(this.getCode())),
					success: e.proxy(function(e) {
						"function" == typeof this.opts.autosaveCallback && this.opts.autosaveCallback(e, this)
					}, this)
				})
			}, this), 1e3 * this.opts.interval)
		},
		buildToolbar: function() {
			return this.opts.toolbar === !1 ? !1 : (this.$toolbar = e("<ul>").addClass("redactor_toolbar"), this.opts.air ? (e(this.air).append(this.$toolbar), e("body").append(this.air)) : this.opts.toolbarExternal === !1 ? this.$box.prepend(this.$toolbar) : e(this.opts.toolbarExternal).html(this.$toolbar), void e.each(this.opts.buttons, e.proxy(function(t, i) {
				if ("|" !== i && "undefined" != typeof this.opts.toolbar[i]) {
					var o = this.opts.toolbar[i];
					if (this.opts.fileUpload === !1 && "file" === i) return !0;
					this.$toolbar.append(e("<li>").append(this.buildButton(i, o)))
				}
				"|" === i && this.$toolbar.append(e('<li class="redactor_separator"></li>'))
			}, this)))
		},
		buildButton: function(t, i) {
			var o = e('<a href="javascript:void(null);" title="' + i.title + '" class="redactor_btn_' + t + '"></a>');
			if ("undefined" == typeof i.func ? o.click(e.proxy(function() {
				-1 != e.inArray(t, this.opts.activeButtons) && (this.inactiveAllButtons(), this.setBtnActive(t)), this.browser("mozilla") && this.$editor.focus(), this.execCommand(i.exec, t)
			}, this)) : "show" !== i.func && o.click(e.proxy(function(e) {
				this[i.func](e)
			}, this)), "undefined" != typeof i.callback && i.callback !== !1 && o.click(e.proxy(function(e) {
				i.callback(this, e, t)
			}, this)), "backcolor" === t || "fontcolor" === t || "undefined" != typeof i.dropdown) {
				var n = e('<div class="redactor_dropdown" style="display: none;">');
				n = "backcolor" === t || "fontcolor" === t ? this.buildColorPicker(n, t) : this.buildDropdown(n, i.dropdown), this.dropdowns.push(n.appendTo(e(document.body))), this.hdlShowDropDown = e.proxy(function(e) {
					this.showDropDown(e, n, t)
				}, this), o.click(this.hdlShowDropDown)
			}
			return o
		},
		buildDropdown: function(t, i) {
			return e.each(i, e.proxy(function(i, o) {
				"undefined" == typeof o.className && (o.className = "");
				var n;
				"undefined" != typeof o.name && "separator" === o.name ? n = e('<a class="redactor_separator_drop">') : (n = e('<a href="javascript:void(null);" class="' + o.className + '">' + o.title + "</a>"), "function" == typeof o.callback ? e(n).click(e.proxy(function(e) {
					o.callback(this, e, i)
				}, this)) : "undefined" == typeof o.func ? e(n).click(e.proxy(function() {
					this.execCommand(o.exec, i)
				}, this)) : e(n).click(e.proxy(function(e) {
					this[o.func](e)
				}, this))), e(t).append(n)
			}, this)), t
		},
		buildColorPicker: function(t, i) {
			var o;
			o = "backcolor" === i ? this.browser("msie") ? "BackColor" : "hilitecolor" : "forecolor", e(t).width(210);
			for (var n = this.opts.colors.length, r = 0; n > r; ++r) {
				var a = this.opts.colors[r],
					s = e('<a rel="' + a + '" href="javascript:void(null);" class="redactor_color_link"></a>').css({
						backgroundColor: a
					});
				e(t).append(s);
				var l = this;
				e(s).click(function() {
					l.execCommand(o, e(this).attr("rel")), "forecolor" === o && l.$editor.find("font").replaceWith(function() {
						return e('<span style="color: ' + e(this).attr("color") + ';">' + e(this).html() + "</span>")
					}), l.browser("msie") && "BackColor" === o && l.$editor.find("font").replaceWith(function() {
						return e('<span style="' + e(this).attr("style") + '">' + e(this).html() + "</span>")
					})
				})
			}
			var d = e('<a href="javascript:void(null);" class="redactor_color_none"></a>').html(RLANG.none);
			return "backcolor" === i ? d.click(e.proxy(this.setBackgroundNone, this)) : d.click(e.proxy(this.setColorNone, this)), e(t).append(d), t
		},
		setBackgroundNone: function() {
			e(this.getParentNode()).css("background-color", "transparent"), this.syncCode()
		},
		setColorNone: function() {
			e(this.getParentNode()).attr("color", "").css("color", ""), this.syncCode()
		},
		showDropDown: function(t, i, o) {
			if (this.getBtn(o).hasClass("dropact")) this.hideAllDropDown();
			else {
				this.hideAllDropDown(), this.setBtnActive(o), this.getBtn(o).addClass("dropact");
				var n = this.getBtn(o).offset().left;
				if (this.opts.air) {
					var r = this.air.offset().top;
					e(i).css({
						position: "absolute",
						left: n + "px",
						top: r + 30 + "px"
					}).show()
				} else if (this.opts.fixed && this.fixed) e(i).css({
					position: "fixed",
					left: n + "px",
					top: "30px"
				}).show();
				else {
					var a = this.$toolbar.offset().top + 30;
					e(i).css({
						position: "absolute",
						left: n + "px",
						top: a + "px"
					}).show()
				}
			}
			var s = e.proxy(function(e) {
				this.hideDropDown(e, i, o)
			}, this);
			e(document).one("click", s), this.$editor.one("click", s), this.$content.one("click", s), t.stopPropagation()
		},
		hideAllDropDown: function() {
			this.$toolbar.find("a.dropact").removeClass("redactor_act").removeClass("dropact"), e(".redactor_dropdown").hide()
		},
		hideDropDown: function(t, i, o) {
			e(t.target).hasClass("dropact") || (e(i).removeClass("dropact"), this.showedDropDown = !1, this.hideAllDropDown())
		},
		getBtn: function(t) {
			return this.opts.toolbar === !1 ? !1 : e(this.$toolbar.find("a.redactor_btn_" + t))
		},
		setBtnActive: function(e) {
			this.getBtn(e).addClass("redactor_act")
		},
		setBtnInactive: function(e) {
			this.getBtn(e).removeClass("redactor_act")
		},
		inactiveAllButtons: function() {
			e.each(this.opts.activeButtons, e.proxy(function(e, t) {
				this.setBtnInactive(t)
			}, this))
		},
		changeBtnIcon: function(e, t) {
			this.getBtn(e).addClass("redactor_btn_" + t)
		},
		removeBtnIcon: function(e, t) {
			this.getBtn(e).removeClass("redactor_btn_" + t)
		},
		addBtnSeparator: function() {
			this.$toolbar.append(e('<li class="redactor_separator"></li>'))
		},
		addBtnSeparatorAfter: function(t) {
			var i = this.getBtn(t);
			i.parent().after(e('<li class="redactor_separator"></li>'))
		},
		addBtnSeparatorBefore: function(t) {
			var i = this.getBtn(t);
			i.parent().before(e('<li class="redactor_separator"></li>'))
		},
		removeBtnSeparatorAfter: function(e) {
			var t = this.getBtn(e);
			t.parent().next().remove()
		},
		removeBtnSeparatorBefore: function(e) {
			var t = this.getBtn(e);
			t.parent().prev().remove()
		},
		setBtnRight: function(e) {
			return this.opts.toolbar === !1 ? !1 : void this.getBtn(e).parent().addClass("redactor_btn_right")
		},
		setBtnLeft: function(e) {
			return this.opts.toolbar === !1 ? !1 : void this.getBtn(e).parent().removeClass("redactor_btn_right")
		},
		addBtn: function(t, i, o, n) {
			if (this.opts.toolbar === !1) return !1;
			var r = this.buildButton(t, {
				title: i,
				callback: o,
				dropdown: n
			});
			this.$toolbar.append(e("<li>").append(r))
		},
		addBtnFirst: function(t, i, o, n) {
			if (this.opts.toolbar === !1) return !1;
			var r = this.buildButton(t, {
				title: i,
				callback: o,
				dropdown: n
			});
			this.$toolbar.prepend(e("<li>").append(r))
		},
		addBtnAfter: function(t, i, o, n, r) {
			if (this.opts.toolbar === !1) return !1;
			var a = this.buildButton(i, {
				title: o,
				callback: n,
				dropdown: r
			}),
				s = this.getBtn(t);
			s.parent().after(e("<li>").append(a))
		},
		addBtnBefore: function(t, i, o, n, r) {
			if (this.opts.toolbar === !1) return !1;
			var a = this.buildButton(i, {
				title: o,
				callback: n,
				dropdown: r
			}),
				s = this.getBtn(t);
			s.parent().before(e("<li>").append(a))
		},
		removeBtn: function(e, t) {
			var i = this.getBtn(e);
			t === !0 && i.parent().next().remove(), i.parent().removeClass("redactor_btn_right"), i.remove()
		},
		getFragmentHtml: function(e) {
			var t = e.cloneNode(!0),
				i = this.document.createElement("div");
			return i.appendChild(t), i.innerHTML
		},
		extractContent: function() {
			for (var e, t = this.$editor.get(0), i = this.document.createDocumentFragment(); e = t.firstChild;) i.appendChild(e);
			return i
		},
		saveSelection: function() {
			this.$editor.focus(), this.savedSel = this.getOrigin(), this.savedSelObj = this.getFocus()
		},
		restoreSelection: function() {
			"undefined" != typeof this.savedSel && null !== this.savedSel && null !== this.savedSelObj && "BODY" !== this.savedSel[0].tagName ? this.opts.iframe === !1 && 0 == e(this.savedSel[0]).closest(".redactor_editor").size() ? this.$editor.focus() : (this.browser("opera") && this.$editor.focus(), this.setSelection(this.savedSel[0], this.savedSel[1], this.savedSelObj[0], this.savedSelObj[1]), this.browser("mozilla") && this.$editor.focus()) : this.$editor.focus()
		},
		getSelection: function() {
			var e = this.document;
			return this.window.getSelection ? this.window.getSelection() : e.getSelection ? e.getSelection() : e.selection.createRange()
		},
		hasSelection: function() {
			if (this.oldIE()) {
				var e, t = this.$editor.get(0);
				return t.focus(), t.document.selection ? (e = t.document.selection.createRange(), e && e.parentElement().document === t.document) : !1
			}
			var i;
			return (i = this.getSelection()) && null != i.focusNode && null != i.anchorNode
		},
		getOrigin: function() {
			if (this.oldIE()) {
				var e, t = this.$editor.get(0);
				return t.focus(), this.hasSelection() ? (e = t.document.selection.createRange(), this._getBoundary(t.document, e, !0)) : null
			}
			var i;
			return (i = this.getSelection()) && null != i.anchorNode ? [i.anchorNode, i.anchorOffset] : null
		},
		getFocus: function() {
			if (this.oldIE()) {
				var e, t = this.$editor.get(0);
				return t.focus(), this.hasSelection() ? (e = t.document.selection.createRange(), this._getBoundary(t.document, e, !1)) : null
			}
			var i;
			return (i = this.getSelection()) && null != i.focusNode ? [i.focusNode, i.focusOffset] : null
		},
		setSelection: function(e, t, i, o) {
			if (null == i && (i = e), null == o && (o = t), this.oldIE()) {
				var n = this.$editor.get(0),
					a = n.document.body.createTextRange();
				return this._moveBoundary(n.document, a, !1, i, o), this._moveBoundary(n.document, a, !0, e, t), a.select()
			}
			var s = this.getSelection();
			if (s)
				if (s.collapse && s.extend) s.collapse(e, t), s.extend(i, o);
				else {
					r = this.document.createRange(), r.setStart(e, t), r.setEnd(i, o);
					try {
						s.removeAllRanges()
					} catch (l) {}
					s.addRange(r)
				}
		},
		getCurrentNode: function() {
			return "undefined" != typeof this.window.getSelection ? this.getSelectedNode().parentNode : "undefined" != typeof this.document.selection ? this.getSelection().parentElement() : void 0
		},
		getParentNode: function() {
			return e(this.getCurrentNode()).parent()[0]
		},
		getSelectedNode: function() {
			if (this.oldIE()) return this.getSelection().parentElement();
			if ("undefined" != typeof this.window.getSelection) {
				var e = this.window.getSelection();
				return e.rangeCount > 0 ? this.getSelection().getRangeAt(0).commonAncestorContainer : !1
			}
			return "undefined" != typeof this.document.selection ? this.getSelection() : void 0
		},
		_getBoundary: function(e, t, i) {
			var o, n, r, a, s;
			for (n = e.createElement("a"), o = t.duplicate(), o.collapse(i), s = o.parentElement();;)
				if (s.insertBefore(n, n.previousSibling), o.moveToElementText(n), !(o.compareEndPoints(i ? "StartToStart" : "StartToEnd", t) > 0 && null != n.previousSibling)) break;
			return -1 === o.compareEndPoints(i ? "StartToStart" : "StartToEnd", t) && n.nextSibling ? (o.setEndPoint(i ? "EndToStart" : "EndToEnd", t), r = n.nextSibling, a = o.text.length) : (r = n.parentNode, a = this._getChildIndex(n)), n.parentNode.removeChild(n), [r, a]
		},
		_moveBoundary: function(e, t, i, o, n) {
			var r, a, s, l, d;
			return d = 0, r = this._isText(o) ? o : o.childNodes[n], a = this._isText(o) ? o.parentNode : o, this._isText(o) && (d = n), l = e.createElement("a"), a.insertBefore(l, r || null), s = e.body.createTextRange(), s.moveToElementText(l), l.parentNode.removeChild(l), t.setEndPoint(i ? "StartToStart" : "EndToEnd", s), t[i ? "moveStart" : "moveEnd"]("character", d)
		},
		_isText: function(e) {
			return null != e ? 3 == e.nodeType : !1
		},
		_getChildIndex: function(e) {
			for (var t = 0; e = e.previousSibling;) t++;
			return t
		},
		insertNodeAfterCaret: function(e) {
			this.saveSelection(), this.insertNodeAtCaret(e), this.restoreSelection()
		},
		insertNodeAtCaret: function(e) {
			if (this.window.getSelection) {
				var t = this.getSelection();
				if (t.rangeCount) {
					var i = t.getRangeAt(0);
					i.collapse(!1), i.insertNode(e), i = i.cloneRange(), i.selectNodeContents(e), i.collapse(!1), t.removeAllRanges(), t.addRange(i)
				}
			} else if (this.document.selection) {
				var o = 1 === e.nodeType ? e.outerHTML : e.data,
					n = "marker_" + ("" + Math.random()).slice(2);
				o += '<span id="' + n + '"></span>';
				var r = this.getSelection();
				r.collapse(!1), r.pasteHTML(o);
				var a = this.document.getElementById(n);
				r.moveToElementText(a), r.select(), a.parentNode.removeChild(a)
			}
		},
		getSelectedHtml: function() {
			var e = "";
			if (this.window.getSelection) {
				var t = this.window.getSelection();
				if (t.rangeCount) {
					for (var i = this.document.createElement("div"), o = 0, n = t.rangeCount; n > o; ++o) i.appendChild(t.getRangeAt(o).cloneContents());
					e = i.innerHTML
				}
			} else this.document.selection && "Text" === this.document.selection.type && (e = this.document.selection.createRange().htmlText);
			return e
		},
		resizeImage: function(t) {
			var i, o, n = !1,
				r = !1,
				a = e(t).width() / e(t).height(),
				s = 10,
				l = 10;
			e(t).off("hover mousedown mouseup click mousemove"), e(t).hover(function() {
				e(t).css("cursor", "nw-resize")
			}, function() {
				e(t).css("cursor", ""), n = !1
			}), e(t).mousedown(function(s) {
				s.preventDefault(), a = e(t).width() / e(t).height(), n = !0, r = !0, i = Math.round(s.pageX - e(t).eq(0).offset().left), o = Math.round(s.pageY - e(t).eq(0).offset().top)
			}), e(t).mouseup(e.proxy(function(i) {
				n = !1, e(t).css("cursor", ""), this.syncCode()
			}, this)), e(t).click(e.proxy(function(e) {
				r && this.imageEdit(e)
			}, this)), e(t).mousemove(function(d) {
				if (n) {
					r = !1;
					var c = (Math.round(d.pageX - e(this).eq(0).offset().left) - i, Math.round(d.pageY - e(this).eq(0).offset().top) - o),
						u = e(t).height(),
						h = parseInt(u, 10) + c,
						p = h * a;
					p > s && e(t).width(p), h > l && e(t).height(h), i = Math.round(d.pageX - e(this).eq(0).offset().left), o = Math.round(d.pageY - e(this).eq(0).offset().top)
				}
			})
		},
		showTable: function() {
			this.saveSelection(), this.modalInit(RLANG.table, this.opts.modal_table, 300, e.proxy(function() {
				e("#redactor_insert_table_btn").click(e.proxy(this.insertTable, this)), setTimeout(function() {
					e("#redactor_table_rows").focus()
				}, 200)
			}, this))
		},
		insertTable: function() {
			for (var t = e("#redactor_table_rows").val(), i = e("#redactor_table_columns").val(), o = e("<div></div>"), n = Math.floor(99999 * Math.random()), r = e('<table id="table' + n + '"><tbody></tbody></table>'), a = 0; t > a; a++) {
				for (var s = e("<tr></tr>"), l = 0; i > l; l++) {
					var d = e("<td><br></td>");
					e(s).append(d)
				}
				e(r).append(s)
			}
			e(o).append(r);
			var c = e(o).html() + "<p></p>";
			this.restoreSelection(), this.execCommand("inserthtml", c), this.modalClose(), this.observeTables()
		},
		tableObserver: function(t) {
			this.$table = e(t.target).closest("table"), this.$table_tr = this.$table.find("tr"), this.$table_td = this.$table.find("td"), this.$tbody = e(t.target).closest("tbody"), this.$thead = e(this.$table).find("thead"), this.$current_td = e(t.target), this.$current_tr = e(t.target).closest("tr")
		},
		deleteTable: function() {
			e(this.$table).remove(), this.$table = !1, this.syncCode()
		},
		deleteRow: function() {
			e(this.$current_tr).remove(), this.syncCode()
		},
		deleteColumn: function() {
			var t = e(this.$current_td).get(0).cellIndex;
			e(this.$table).find("tr").each(function() {
				e(this).find("td").eq(t).remove()
			}), this.syncCode()
		},
		addHead: function() {
			if (0 !== e(this.$table).find("thead").size()) this.deleteHead();
			else {
				var t = e(this.$table).find("tr").first().clone();
				t.find("td").html("&nbsp;"), this.$thead = e("<thead></thead>"), this.$thead.append(t), e(this.$table).prepend(this.$thead), this.syncCode()
			}
		},
		deleteHead: function() {
			e(this.$thead).remove(), this.$thead = !1, this.syncCode()
		},
		insertRowAbove: function() {
			this.insertRow("before")
		},
		insertRowBelow: function() {
			this.insertRow("after")
		},
		insertColumnLeft: function() {
			this.insertColumn("before")
		},
		insertColumnRight: function() {
			this.insertColumn("after")
		},
		insertRow: function(t) {
			var i = e(this.$current_tr).clone();
			i.find("td").html("&nbsp;"), "after" === t ? e(this.$current_tr).after(i) : e(this.$current_tr).before(i), this.syncCode()
		},
		insertColumn: function(t) {
			var i = 0;
			this.$current_tr.find("td").each(e.proxy(function(t, o) {
				e(o)[0] === this.$current_td[0] && (i = t)
			}, this)), this.$table_tr.each(function(o, n) {
				var r = e(n).find("td").eq(i),
					a = r.clone();
				a.html("&nbsp;"), "after" === t ? e(r).after(a) : e(r).before(a)
			}), this.syncCode()
		},
		showVideo: function() {
			this.saveSelection(), this.modalInit(RLANG.video, this.opts.modal_video, 600, e.proxy(function() {
				e("#redactor_insert_video_btn").click(e.proxy(this.insertVideo, this)), setTimeout(function() {
					e("#redactor_insert_video_area").focus()
				}, 200)
			}, this))
		},
		insertVideo: function() {
			var t = e("#redactor_insert_video_area").val();
			t = this.stripTags(t), this.restoreSelection(), this.execCommand("inserthtml", t), this.modalClose()
		},
		imageEdit: function(t) {
			var i = e(t.target),
				o = i.parent(),
				n = e.proxy(function() {
					e("#redactor_file_alt").val(i.attr("alt")), e("#redactor_image_edit_src").attr("href", i.attr("src")), e("#redactor_form_image_align").val(i.css("float")), "A" === e(o).get(0).tagName && e("#redactor_file_link").val(e(o).attr("href")), e("#redactor_image_delete_btn").click(e.proxy(function() {
						this.imageDelete(i)
					}, this)), e("#redactorSaveBtn").click(e.proxy(function() {
						this.imageSave(i)
					}, this))
				}, this);
			this.modalInit(RLANG.image, this.opts.modal_image_edit, 380, n)
		},
		imageDelete: function(t) {
			e(t).remove(), this.modalClose(), this.syncCode()
		},
		imageSave: function(t) {
			var i = e(t).parent();
			e(t).attr("alt", e("#redactor_file_alt").val());
			var o = e("#redactor_form_image_align").val();
			"left" === o ? e(t).css({
				"float": "left",
				margin: "0 10px 10px 0"
			}) : "right" === o ? e(t).css({
				"float": "right",
				margin: "0 0 10px 10px"
			}) : e(t).css({
				"float": "none",
				margin: "0"
			});
			var n = e.trim(e("#redactor_file_link").val());
			"" !== n ? "A" !== e(i).get(0).tagName ? e(t).replaceWith('<a href="' + n + '">' + this.outerHTML(t) + "</a>") : e(i).attr("href", n) : "A" === e(i).get(0).tagName && e(i).replaceWith(this.outerHTML(t)), this.modalClose(), this.observeImages(), this.syncCode()
		},
		showImage: function() {
			this.saveSelection();
			var t = e.proxy(function() {
				if (this.opts.imageGetJson !== !1 ? e.getJSON(this.opts.imageGetJson, e.proxy(function(t) {
					var i = {}, o = 0;
					e.each(t, e.proxy(function(e, t) {
						"undefined" != typeof t.folder && (o++, i[t.folder] = o)
					}, this));
					var n = !1;
					if (e.each(t, e.proxy(function(t, o) {
						var r = "";
						"undefined" != typeof o.title && (r = o.title);
						var a = 0;
						e.isEmptyObject(i) || "undefined" == typeof o.folder || (a = i[o.folder], n === !1 && (n = ".redactorfolder" + a));
						var s = e('<img src="' + o.thumb + '" class="redactorfolder redactorfolder' + a + '" rel="' + o.image + '" title="' + r + '" />');
						e("#redactor_image_box").append(s), e(s).click(e.proxy(this.imageSetThumb, this))
					}, this)), !e.isEmptyObject(i)) {
						e(".redactorfolder").hide(), e(n).show();
						var r = function(t) {
							e(".redactorfolder").hide(), e(".redactorfolder" + e(t.target).val()).show()
						}, a = e('<select id="redactor_image_box_select">');
						e.each(i, function(t, i) {
							a.append(e('<option value="' + i + '">' + t + "</option>"))
						}), e("#redactor_image_box").before(a), a.change(r)
					}
				}, this)) : e("#redactor_tabs a").eq(1).remove(), this.opts.imageUpload !== !1) this.opts.uploadCrossDomain === !1 && this.isMobile() === !1 && 0 !== e("#redactor_file").size() && e("#redactor_file").dragupload({
					url: this.opts.imageUpload,
					uploadFields: this.opts.uploadFields,
					success: e.proxy(this.imageUploadCallback, this),
					error: e.proxy(this.opts.imageUploadErrorCallback, this)
				}), this.uploadInit("redactor_file", {
					auto: !0,
					url: this.opts.imageUpload,
					success: e.proxy(this.imageUploadCallback, this),
					error: e.proxy(this.opts.imageUploadErrorCallback, this)
				});
				else if (e(".redactor_tab").hide(), this.opts.imageGetJson === !1) e("#redactor_tabs").remove(), e("#redactor_tab3").show();
				else {
					var t = e("#redactor_tabs a");
					t.eq(0).remove(), t.eq(1).addClass("redactor_tabs_act"), e("#redactor_tab2").show()
				}
				e("#redactor_upload_btn").click(e.proxy(this.imageUploadCallbackLink, this)), this.opts.imageUpload === !1 && this.opts.imageGetJson === !1 && setTimeout(function() {
					e("#redactor_file_link").focus()
				}, 200)
			}, this);
			this.modalInit(RLANG.image, this.opts.modal_image, 610, t)
		},
		imageSetThumb: function(t) {
			this._imageSet('<img src="' + e(t.target).attr("rel") + '" alt="' + e(t.target).attr("title") + '" />', !0)
		},
		imageUploadCallbackLink: function() {
			if ("" !== e("#redactor_file_link").val()) {
				var t = '<img src="' + e("#redactor_file_link").val() + '" />';
				this._imageSet(t, !0)
			} else this.modalClose()
		},
		imageUploadCallback: function(e) {
			this._imageSet(e)
		},
		_imageSet: function(e, t) {
			if (this.restoreSelection(), e !== !1) {
				var i = "";
				i = t !== !0 ? '<p><img src="' + e.filelink + '" /></p>' : e, this.execCommand("inserthtml", i), t !== !0 && "function" == typeof this.opts.imageUploadCallback && this.opts.imageUploadCallback(this, e)
			}
			this.modalClose(), this.observeImages()
		},
		showLink: function() {
			this.saveSelection();
			var t = e.proxy(function() {
				this.insert_link_node = !1;
				var t = this.getSelection(),
					i = "",
					o = "",
					n = "";
				if (this.browser("msie")) {
					var r = this.getParentNode();
					"A" === r.nodeName ? (this.insert_link_node = e(r), o = this.insert_link_node.text(), i = this.insert_link_node.attr("href"), n = this.insert_link_node.attr("target")) : o = this.oldIE() ? t.text : t.toString()
				} else t && t.anchorNode && "A" === t.anchorNode.parentNode.tagName ? (i = t.anchorNode.parentNode.href, o = t.anchorNode.parentNode.text, n = t.anchorNode.parentNode.target, "" === t.toString() && (this.insert_link_node = t.anchorNode.parentNode)) : o = t.toString();
				e(".redactor_link_text").val(o);
				var a = self.location.href.replace(/\/$/i, ""),
					s = i.replace(a, "");
				0 === i.search("mailto:") ? (this.setModalTab(2), e("#redactor_tab_selected").val(2), e("#redactor_link_mailto").val(i.replace("mailto:", ""))) : 0 === s.search(/^#/gi) ? (this.setModalTab(3), e("#redactor_tab_selected").val(3), e("#redactor_link_anchor").val(s.replace(/^#/gi, ""))) : e("#redactor_link_url").val(s), "_blank" === n && e("#redactor_link_blank").attr("checked", !0), e("#redactor_insert_link_btn").click(e.proxy(this.insertLink, this)), setTimeout(function() {
					e("#redactor_link_url").focus()
				}, 200)
			}, this);
			this.modalInit(RLANG.link, this.opts.modal_link, 460, t)
		},
		insertLink: function() {
			var t = e("#redactor_tab_selected").val(),
				i = "",
				o = "",
				n = "";
			if ("1" === t) {
				i = e("#redactor_link_url").val(), o = e("#redactor_link_url_text").val(), e("#redactor_link_blank").attr("checked") && (n = ' target="_blank"');
				var r = "/(w+:{0,1}w*@)?(S+)(:[0-9]+)?(/|/([w#!:.?+=&%@!-/]))?/",
					a = new RegExp("^(http|ftp|https)://" + r, "i"),
					s = new RegExp("^" + r, "i"); - 1 == i.search(a) && 0 == i.search(s) && this.opts.protocol !== !1 && (i = this.opts.protocol + i)
			} else "2" === t ? (i = "mailto:" + e("#redactor_link_mailto").val(), o = e("#redactor_link_mailto_text").val()) : "3" === t && (i = "#" + e("#redactor_link_anchor").val(), o = e("#redactor_link_anchor_text").val());
			this._insertLink('<a href="' + i + '"' + n + ">" + o + "</a>", e.trim(o), i, n)
		},
		_insertLink: function(t, i, o, n) {
			this.$editor.focus(), this.restoreSelection(), "" !== i && (this.insert_link_node ? (e(this.insert_link_node).text(i), e(this.insert_link_node).attr("href", o), "" !== n ? e(this.insert_link_node).attr("target", n) : e(this.insert_link_node).removeAttr("target"), this.syncCode()) : this.execCommand("inserthtml", t)), this.modalClose()
		},
		showFile: function() {
			this.saveSelection();
			var t = e.proxy(function() {
				var t = this.getSelection(),
					i = "";
				i = this.oldIE() ? t.text : t.toString(), e("#redactor_filename").val(i), this.opts.uploadCrossDomain === !1 && this.isMobile() === !1 && e("#redactor_file").dragupload({
					url: this.opts.fileUpload,
					uploadFields: this.opts.uploadFields,
					success: e.proxy(this.fileUploadCallback, this),
					error: e.proxy(this.opts.fileUploadErrorCallback, this)
				}), this.uploadInit("redactor_file", {
					auto: !0,
					url: this.opts.fileUpload,
					success: e.proxy(this.fileUploadCallback, this),
					error: e.proxy(this.opts.fileUploadErrorCallback, this)
				})
			}, this);
			this.modalInit(RLANG.file, this.opts.modal_file, 500, t)
		},
		fileUploadCallback: function(t) {
			if (this.restoreSelection(), t !== !1) {
				var i = e("#redactor_filename").val();
				"" === i && (i = t.filename);
				var o = '<a href="' + t.filelink + '">' + i + "</a>";
				this.browser("webkit") && this.window.chrome && (o += "&nbsp;"), this.execCommand("inserthtml", o), "function" == typeof this.opts.fileUploadCallback && this.opts.fileUploadCallback(this, t)
			}
			this.modalClose()
		},
		modalInit: function(t, i, o, n) {
			if (0 === e("#redactor_modal_overlay").size() && (this.overlay = e('<div id="redactor_modal_overlay" style="display: none;"></div>'), e("body").prepend(this.overlay)), this.opts.overlay && (e("#redactor_modal_overlay").show(), e("#redactor_modal_overlay").click(e.proxy(this.modalClose, this))), 0 === e("#redactor_modal").size() && (this.modal = e('<div id="redactor_modal" style="display: none;"><div id="redactor_modal_close">&times;</div><div id="redactor_modal_header"></div><div id="redactor_modal_inner"></div></div>'), e("body").append(this.modal)), e("#redactor_modal_close").click(e.proxy(this.modalClose, this)), this.hdlModalClose = e.proxy(function(e) {
				return 27 === e.keyCode ? (this.modalClose(), !1) : void 0
			}, this), e(document).keyup(this.hdlModalClose), this.$editor.keyup(this.hdlModalClose), 0 == i.indexOf("#") ? e("#redactor_modal_inner").empty().append(e(i).html()) : e("#redactor_modal_inner").empty().append(i), e("#redactor_modal_header").html(t), "undefined" != typeof e.fn.draggable && (e("#redactor_modal").draggable({
				handle: "#redactor_modal_header"
			}), e("#redactor_modal_header").css("cursor", "move")), 0 !== e("#redactor_tabs").size()) {
				var r = this;
				e("#redactor_tabs a").each(function(t, i) {
					t++, e(i).click(function() {
						if (e("#redactor_tabs a").removeClass("redactor_tabs_act"), e(this).addClass("redactor_tabs_act"), e(".redactor_tab").hide(), e("#redactor_tab" + t).show(), e("#redactor_tab_selected").val(t), r.isMobile() === !1) {
							var i = e("#redactor_modal").outerHeight();
							e("#redactor_modal").css("margin-top", "-" + (i + 10) / 2 + "px")
						}
					})
				})
			}
			e("#redactor_modal .redactor_btn_modal_close").click(e.proxy(this.modalClose, this)), this.isMobile() === !1 ? (e("#redactor_modal").css({
				position: "fixed",
				top: "-2000px",
				left: "50%",
				width: o + "px",
				marginLeft: "-" + (o + 60) / 2 + "px"
			}).show(), this.modalSaveBodyOveflow = e(document.body).css("overflow"), e(document.body).css("overflow", "hidden")) : e("#redactor_modal").css({
				position: "fixed",
				width: "100%",
				height: "100%",
				top: "0",
				left: "0",
				margin: "0",
				minHeight: "300px"
			}).show(), "function" == typeof n && n(), this.isMobile() === !1 && setTimeout(function() {
				var t = e("#redactor_modal").outerHeight();
				e("#redactor_modal").css({
					top: "50%",
					height: "auto",
					minHeight: "auto",
					marginTop: "-" + (t + 10) / 2 + "px"
				})
			}, 20)
		},
		modalClose: function() {
			return e("#redactor_modal_close").unbind("click", this.modalClose), e("#redactor_modal").fadeOut("fast", e.proxy(function() {
				e("#redactor_modal_inner").html(""), this.opts.overlay && (e("#redactor_modal_overlay").hide(), e("#redactor_modal_overlay").unbind("click", this.modalClose)), e(document).unbind("keyup", this.hdlModalClose), this.$editor.unbind("keyup", this.hdlModalClose)
			}, this)), this.isMobile() === !1 && e(document.body).css("overflow", this.modalSaveBodyOveflow ? this.modalSaveBodyOveflow : "visible"), !1
		},
		setModalTab: function(t) {
			e(".redactor_tab").hide();
			var i = e("#redactor_tabs a");
			i.removeClass("redactor_tabs_act"), i.eq(t - 1).addClass("redactor_tabs_act"), e("#redactor_tab" + t).show()
		},
		uploadInit: function(t, i) {
			this.uploadOptions = {
				url: !1,
				success: !1,
				error: !1,
				start: !1,
				trigger: !1,
				auto: !1,
				input: !1
			}, e.extend(this.uploadOptions, i), 0 !== e("#" + t).size() && "INPUT" === e("#" + t).get(0).tagName ? (this.uploadOptions.input = e("#" + t), this.element = e(e("#" + t).get(0).form)) : this.element = e("#" + t), this.element_action = this.element.attr("action"), this.uploadOptions.auto ? e(this.uploadOptions.input).change(e.proxy(function() {
				this.element.submit(function(e) {
					return !1
				}), this.uploadSubmit()
			}, this)) : this.uploadOptions.trigger && e("#" + this.uploadOptions.trigger).click(e.proxy(this.uploadSubmit, this))
		},
		uploadSubmit: function() {
			this.uploadForm(this.element, this.uploadFrame())
		},
		uploadFrame: function() {
			this.id = "f" + Math.floor(99999 * Math.random());
			var t = this.document.createElement("div"),
				i = '<iframe style="display:none" id="' + this.id + '" name="' + this.id + '"></iframe>';
			return t.innerHTML = i, e(t).appendTo("body"), this.uploadOptions.start && this.uploadOptions.start(), e("#" + this.id).load(e.proxy(this.uploadLoaded, this)), this.id
		},
		uploadForm: function(t, i) {
			if (this.uploadOptions.input) {
				var o = "redactorUploadForm" + this.id,
					n = "redactorUploadFile" + this.id;
				this.form = e('<form  action="' + this.uploadOptions.url + '" method="POST" target="' + i + '" name="' + o + '" id="' + o + '" enctype="multipart/form-data"></form>'), this.opts.uploadFields !== !1 && "object" == typeof this.opts.uploadFields && e.each(this.opts.uploadFields, e.proxy(function(t, i) {
					0 === i.toString().indexOf("#") && (i = e(i).val());
					var o = e("<input/>", {
						type: "hidden",
						name: t,
						value: i
					});
					e(this.form).append(o)
				}, this));
				var r = this.uploadOptions.input,
					a = e(r).clone();
				e(r).attr("id", n), e(r).before(a), e(r).appendTo(this.form), e(this.form).css("position", "absolute"), e(this.form).css("top", "-2000px"), e(this.form).css("left", "-2000px"), e(this.form).appendTo("body"), this.form.submit()
			} else t.attr("target", i), t.attr("method", "POST"), t.attr("enctype", "multipart/form-data"), t.attr("action", this.uploadOptions.url), this.element.submit()
		},
		uploadLoaded: function() {
			var t, i = e("#" + this.id)[0];
			if (t = i.contentDocument ? i.contentDocument : i.contentWindow ? i.contentWindow.document : window.frames[this.id].document, this.uploadOptions.success)
				if ("undefined" != typeof t) {
					var o = t.body.innerHTML,
						n = o.match(/\{(.|\n)*\}/)[0],
						r = e.parseJSON(n);
					"undefined" == typeof r.error ? this.uploadOptions.success(r) : (this.uploadOptions.error(this, r), this.modalClose())
				} else alert("Upload failed!"), this.modalClose();
			this.element.attr("action", this.element_action), this.element.attr("target", "")
		},
		browser: function(e) {
			var t = navigator.userAgent.toLowerCase(),
				i = /(chrome)[ \/]([\w.]+)/.exec(t) || /(webkit)[ \/]([\w.]+)/.exec(t) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t) || /(msie) ([\w.]+)/.exec(t) || t.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t) || [];
			return "version" == e ? i[2] : "webkit" == e ? "chrome" == i[1] || "webkit" == i[1] : i[1] == e
		},
		oldIE: function() {
			return this.browser("msie") && parseInt(this.browser("version"), 10) < 9 ? !0 : !1
		},
		outerHTML: function(t) {
			return e("<p>").append(e(t).eq(0).clone()).html()
		},
		normalize: function(e) {
			return parseInt(e.replace("px", ""), 10)
		},
		isMobile: function(e) {
			return e === !0 && /(iPhone|iPod|iPad|BlackBerry|Android)/.test(navigator.userAgent) ? !0 : /(iPhone|iPod|BlackBerry|Android)/.test(navigator.userAgent) ? !0 : !1
		}
	}, e.fn.getObject = function() {
		return this.data("redactor")
	}, e.fn.getEditor = function() {
		return this.data("redactor").$editor
	}, e.fn.getCode = function() {
		return e.trim(this.data("redactor").getCode())
	}, e.fn.getText = function() {
		return this.data("redactor").$editor.text()
	}, e.fn.getSelected = function() {
		return this.data("redactor").getSelectedHtml()
	}, e.fn.setCode = function(e) {
		this.data("redactor").setCode(e)
	}, e.fn.insertHtml = function(e) {
		this.data("redactor").insertHtml(e)
	}, e.fn.destroyEditor = function() {
		this.each(function() {
			"undefined" != typeof e(this).data("redactor") && (e(this).data("redactor").destroy(), e(this).removeData("redactor"))
		})
	}, e.fn.setFocus = function() {
		this.data("redactor").$editor.focus()
	}, e.fn.execCommand = function(e, t) {
		this.data("redactor").execCommand(e, t)
	}
}(jQuery),
function(e) {
	"use strict";

	function t(t, i) {
		this.opts = e.extend({
			url: !1,
			success: !1,
			error: !1,
			preview: !1,
			uploadFields: !1,
			text: RLANG.drop_file_here,
			atext: RLANG.or_choose
		}, i), this.$el = e(t)
	}
	e.fn.dragupload = function(e) {
		return this.each(function() {
			var i = new t(this, e);
			i.init()
		})
	}, t.prototype = {
		init: function() {
			if (-1 === navigator.userAgent.search("MSIE")) {
				this.droparea = e('<div class="redactor_droparea"></div>'), this.dropareabox = e('<div class="redactor_dropareabox">' + this.opts.text + "</div>"), this.dropalternative = e('<div class="redactor_dropalternative">' + this.opts.atext + "</div>"), this.droparea.append(this.dropareabox), this.$el.before(this.droparea), this.$el.before(this.dropalternative), this.dropareabox.bind("dragover", e.proxy(function() {
					return this.ondrag()
				}, this)), this.dropareabox.bind("dragleave", e.proxy(function() {
					return this.ondragleave()
				}, this));
				var t = e.proxy(function(e) {
					var t = parseInt(e.loaded / e.total * 100, 10);
					this.dropareabox.text("Loading " + t + "%")
				}, this),
					i = jQuery.ajaxSettings.xhr();
				i.upload && i.upload.addEventListener("progress", t, !1);
				var o = function() {
					return i
				};
				this.dropareabox.get(0).ondrop = e.proxy(function(t) {
					t.preventDefault(), this.dropareabox.removeClass("hover").addClass("drop");
					var i = t.dataTransfer.files[0],
						n = new FormData;
					this.opts.uploadFields !== !1 && "object" == typeof this.opts.uploadFields && e.each(this.opts.uploadFields, e.proxy(function(t, i) {
						0 === i.toString().indexOf("#") && (i = e(i).val()), n.append(t, i)
					}, this)), n.append("file", i), e.ajax({
						url: this.opts.url,
						dataType: "html",
						data: n,
						xhr: o,
						cache: !1,
						contentType: !1,
						processData: !1,
						type: "POST",
						success: e.proxy(function(t) {
							var i = e.parseJSON(t);
							"undefined" == typeof i.error ? this.opts.success(i) : (this.opts.error(this, i), this.opts.success(!1))
						}, this)
					})
				}, this)
			}
		},
		ondrag: function() {
			return this.dropareabox.addClass("hover"), !1
		},
		ondragleave: function() {
			return this.dropareabox.removeClass("hover"), !1
		}
	}
}(jQuery),
function(e) {
	"use strict";
	var t = "http://",
		i = /(^|&lt;|\s)(www\..+?\..+?)(\s|&gt;|$)/g,
		o = /(^|&lt;|\s)(((https?|ftp):\/\/|mailto:).+?)(\s|&gt;|$)/g,
		n = function() {
			for (var r = this.childNodes, a = r.length; a--;) {
				var s = r[a];
				if (3 === s.nodeType) {
					var l = s.nodeValue;
					l && (l = l.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(i, '$1<a href="' + t + '$2">$2</a>$3').replace(o, '$1<a href="$2">$2</a>$5'), e(s).after(l).remove())
				} else 1 !== s.nodeType || /^(a|button|textarea)$/i.test(s.tagName) || n.call(s)
			}
		};
	e.fn.linkify = function() {
		this.each(n)
	}
}(jQuery), eval(function(e, t, i, o, n, r) {
	if (n = function(e) {
		return (t > e ? "" : n(parseInt(e / t))) + ((e %= t) > 35 ? String.fromCharCode(e + 29) : e.toString(36))
	}, !"".replace(/^/, String)) {
		for (; i--;) r[n(i)] = o[i] || n(i);
		o = [
			function(e) {
				return r[e]
			}
		], n = function() {
			return "\\w+"
		}, i = 1
	}
	for (; i--;) o[i] && (e = e.replace(new RegExp("\\b" + n(i) + "\\b", "g"), o[i]));
	return e
}('(5($){$.1.4.7={t:5(0,v){$(2).0("8",c);$(2).0("r",0);$(2).l(\'g\',$.1.4.7.b)},u:5(0){$(2).w(\'g\',$.1.4.7.b)},b:5(1){9 0=$(2).0("r");9 3=$.1.4.7.f(0).h();6(3!=\'\'){$(2).0("8",x);1.j="7";1.3=3;$.1.i.m(2,k)}},f:5(0){9 3=\'\';6(q.e){3=q.e()}o 6(d.e){3=d.e()}o 6(d.p){3=d.p.B().3}A 3}};$.1.4.a={t:5(0,v){$(2).0("n",0);$(2).0("8",c);$(2).l(\'g\',$.1.4.a.b);$(2).l(\'D\',$.1.4.a.s)},u:5(0){$(2).w(\'g\',$.1.4.a.b)},b:5(1){6($(2).0("8")){9 0=$(2).0("n");9 3=$.1.4.7.f(0).h();6(3==\'\'){$(2).0("8",c);1.j="a";$.1.i.m(2,k)}}},s:5(1){6($(2).0("8")){9 0=$(2).0("n");9 3=$.1.4.7.f(0).h();6((1.y=z)&&(3==\'\')){$(2).0("8",c);1.j="a";$.1.i.m(2,k)}}}}})(C);', 40, 40, "data|event|this|text|special|function|if|textselect|textselected|var|textunselect|handler|false|rdocument|getSelection|getSelectedText|mouseup|toString|handle|type|arguments|bind|apply|rttt|else|selection|rwindow|ttt|handlerKey|setup|teardown|namespaces|unbind|true|keyCode|27|return|createRange|jQuery|keyup".split("|"), 0, {})),
function() {
	this.RedactorPlugins = this.RedactorPlugins || {},
	function() {
		var e;
		return e = this.Cellar, this.RedactorPlugins.gallery = {
			init: function() {
				var t;
				return t = this, this.addBtn("gallery", "\u56fe\u5e93", function() {
					var i;
					return i = new e.Widget.PhotoGalleryDialog, i.prov_id = $("#product_provider_id").val(), i.on("photo:dialog:close", function(e) {
						return function(e) {
							var i, o;
							return e.length > 0 ? (i = function() {
								var t, i, n;
								for (n = [], t = 0, i = e.length; i > t; t++) o = e[t], n.push("<img src=" + o.image + " style=width:100%;>");
								return n
							}().join(""), t.insertHtml(i)) : void 0
						}
					}(this)), e.dialog.show(i)
				})
			}
		}
	}()
}.call(this),
function() {
	this.RELANG = this.RELANG || {}, this.RELANG.zh_cn = {
		html: "HTML\u4ee3\u7801",
		video: "\u89c6\u9891",
		image: "\u56fe\u7247",
		table: "\u8868\u683c",
		link: "\u94fe\u63a5",
		link_insert: "\u63d2\u5165\u94fe\u63a5",
		unlink: "\u53d6\u6d88\u94fe\u63a5",
		formatting: "\u6837\u5f0f",
		paragraph: "\u6bb5\u843d",
		quote: "\u5f15\u7528",
		code: "\u4ee3\u7801",
		header1: "\u4e00\u7ea7\u6807\u9898",
		header2: "\u4e8c\u7ea7\u6807\u9898",
		header3: "\u4e09\u7ea7\u6807\u9898",
		header4: "\u56db\u7ea7\u6807\u9898",
		bold: "\u7c97\u4f53",
		italic: "\u659c\u4f53",
		fontcolor: "\u5b57\u4f53\u989c\u8272",
		backcolor: "\u80cc\u666f\u989c\u8272",
		unorderedlist: "\u9879\u76ee\u7f16\u53f7",
		orderedlist: "\u6570\u5b57\u7f16\u53f7",
		outdent: "\u51cf\u5c11\u7f29\u8fdb",
		indent: "\u589e\u52a0\u7f29\u8fdb",
		cancel: "\u53d6\u6d88",
		insert: "\u63d2\u5165",
		save: "\u4fdd\u5b58",
		_delete: "\u5220\u9664",
		insert_table: "\u63d2\u5165\u8868\u683c",
		insert_row_above: "\u5728\u4e0a\u65b9\u63d2\u5165",
		insert_row_below: "\u5728\u4e0b\u65b9\u63d2\u5165",
		insert_column_left: "\u5728\u5de6\u4fa7\u63d2\u5165",
		insert_column_right: "\u5728\u53f3\u4fa7\u63d2\u5165",
		delete_column: "\u5220\u9664\u6574\u5217",
		delete_row: "\u5220\u9664\u6574\u884c",
		delete_table: "\u5220\u9664\u8868\u683c",
		rows: "\u884c",
		columns: "\u5217",
		add_head: "\u6dfb\u52a0\u6807\u9898",
		delete_head: "\u5220\u9664\u6807\u9898",
		title: "\u6807\u9898",
		image_position: "\u4f4d\u7f6e",
		none: "\u65e0",
		left: "\u5de6",
		right: "\u53f3",
		image_web_link: "\u56fe\u7247\u7f51\u9875\u94fe\u63a5",
		text: "\u6587\u672c",
		mailto: "\u90ae\u7bb1",
		web: "\u7f51\u5740",
		video_html_code: "\u89c6\u9891\u5d4c\u5165\u4ee3\u7801",
		file: "\u6587\u4ef6",
		upload: "\u4e0a\u4f20",
		download: "\u4e0b\u8f7d",
		choose: "\u9009\u62e9",
		or_choose: "\u6216\u9009\u62e9",
		drop_file_here: "\u5c06\u6587\u4ef6\u62d6\u62fd\u81f3\u6b64\u533a\u57df",
		align_left: "\u5de6\u5bf9\u9f50",
		align_center: "\u5c45\u4e2d",
		align_right: "\u53f3\u5bf9\u9f50",
		align_justify: "\u4e24\u7aef\u5bf9\u9f50",
		horizontalrule: "\u6c34\u5e73\u7ebf",
		fullscreen: "\u5168\u5c4f",
		deleted: "\u5220\u9664",
		anchor: "\u951a\u70b9",
		link_new_tab: "\u5728\u65b0\u6807\u7b7e\u6253\u5f00\u94fe\u63a5",
		underline: "\u4e0b\u5212\u7ebf",
		alignment: "\u5bf9\u9f50"
	}
}.call(this),
function() {}.call(this),
function(e, t) {
	"function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t() : e.MicroPlugin = t()
}(this, function() {
	var e = {};
	e.mixin = function(e) {
		e.plugins = {}, e.prototype.initializePlugins = function(e) {
			var i, o, n, r = this,
				a = [];
			if (r.plugins = {
				names: [],
				settings: {},
				requested: {},
				loaded: {}
			}, t.isArray(e))
				for (i = 0, o = e.length; o > i; i++) "string" == typeof e[i] ? a.push(e[i]) : (r.plugins.settings[e[i].name] = e[i].options, a.push(e[i].name));
			else if (e)
				for (n in e) e.hasOwnProperty(n) && (r.plugins.settings[n] = e[n], a.push(n));
			for (; a.length;) r.require(a.shift())
		}, e.prototype.loadPlugin = function(t) {
			var i = this,
				o = i.plugins,
				n = e.plugins[t];
			if (!e.plugins.hasOwnProperty(t)) throw new Error('Unable to find "' + t + '" plugin');
			o.requested[t] = !0, o.loaded[t] = n.fn.apply(i, [i.plugins.settings[t] || {}]), o.names.push(t)
		}, e.prototype.require = function(e) {
			var t = this,
				i = t.plugins;
			if (!t.plugins.loaded.hasOwnProperty(e)) {
				if (i.requested[e]) throw new Error('Plugin has circular dependency ("' + e + '")');
				t.loadPlugin(e)
			}
			return i.loaded[e]
		}, e.define = function(t, i) {
			e.plugins[t] = {
				name: t,
				fn: i
			}
		}
	};
	var t = {
		isArray: Array.isArray || function(e) {
			return "[object Array]" === Object.prototype.toString.call(e)
		}
	};
	return e
}),
function(e, t) {
	"function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t() : e.Sifter = t()
}(this, function() {
	var e = function(e, t) {
		this.items = e, this.settings = t || {
			diacritics: !0
		}
	};
	e.prototype.tokenize = function(e) {
		if (e = o(String(e || "").toLowerCase()), !e || !e.length) return [];
		var t, i, r, s, l = [],
			d = e.split(/ +/);
		for (t = 0, i = d.length; i > t; t++) {
			if (r = n(d[t]), this.settings.diacritics)
				for (s in a) a.hasOwnProperty(s) && (r = r.replace(new RegExp(s, "g"), a[s]));
			l.push({
				string: d[t],
				regex: new RegExp(r, "i")
			})
		}
		return l
	}, e.prototype.iterator = function(e, t) {
		var i;
		i = r(e) ? Array.prototype.forEach || function(e) {
			for (var t = 0, i = this.length; i > t; t++) e(this[t], t, this)
		} : function(e) {
			for (var t in this) this.hasOwnProperty(t) && e(this[t], t, this)
		}, i.apply(e, [t])
	}, e.prototype.getScoreFunction = function(e, t) {
		var i, o, n, r;
		i = this, e = i.prepareSearch(e, t), n = e.tokens, o = e.options.fields, r = n.length;
		var a = function(e, t) {
			var i, o;
			return e ? (e = String(e || ""), o = e.search(t.regex), -1 === o ? 0 : (i = t.string.length / e.length, 0 === o && (i += .5), i)) : 0
		}, s = function() {
				var e = o.length;
				return e ? 1 === e ? function(e, t) {
					return a(t[o[0]], e)
				} : function(t, i) {
					for (var n = 0, r = 0; e > n; n++) r += a(i[o[n]], t);
					return r / e
				} : function() {
					return 0
				}
			}();
		return r ? 1 === r ? function(e) {
			return s(n[0], e)
		} : "and" === e.options.conjunction ? function(e) {
			for (var t, i = 0, o = 0; r > i; i++) {
				if (t = s(n[i], e), 0 >= t) return 0;
				o += t
			}
			return o / r
		} : function(e) {
			for (var t = 0, i = 0; r > t; t++) i += s(n[t], e);
			return i / r
		} : function() {
			return 0
		}
	}, e.prototype.getSortFunction = function(e, i) {
		var o, n, r, a, s, l, d, c, u, h, p;
		if (r = this, e = r.prepareSearch(e, i), p = !e.query && i.sort_empty || i.sort, u = function(e, t) {
			return "$score" === e ? t.score : r.items[t.id][e]
		}, s = [], p)
			for (o = 0, n = p.length; n > o; o++)(e.query || "$score" !== p[o].field) && s.push(p[o]);
		if (e.query) {
			for (h = !0, o = 0, n = s.length; n > o; o++)
				if ("$score" === s[o].field) {
					h = !1;
					break
				}
			h && s.unshift({
				field: "$score",
				direction: "desc"
			})
		} else
			for (o = 0, n = s.length; n > o; o++)
				if ("$score" === s[o].field) {
					s.splice(o, 1);
					break
				} for (c = [], o = 0, n = s.length; n > o; o++) c.push("desc" === s[o].direction ? -1 : 1);
		return l = s.length, l ? 1 === l ? (a = s[0].field, d = c[0], function(e, i) {
			return d * t(u(a, e), u(a, i))
		}) : function(e, i) {
			var o, n, r;
			for (o = 0; l > o; o++)
				if (r = s[o].field, n = c[o] * t(u(r, e), u(r, i))) return n;
			return 0
		} : null
	}, e.prototype.prepareSearch = function(e, t) {
		if ("object" == typeof e) return e;
		t = i({}, t);
		var o = t.fields,
			n = t.sort,
			a = t.sort_empty;
		return o && !r(o) && (t.fields = [o]), n && !r(n) && (t.sort = [n]), a && !r(a) && (t.sort_empty = [a]), {
			options: t,
			query: String(e || "").toLowerCase(),
			tokens: this.tokenize(e),
			total: 0,
			items: []
		}
	}, e.prototype.search = function(e, t) {
		var i, o, n, r, a = this;
		return o = this.prepareSearch(e, t), t = o.options, e = o.query, r = t.score || a.getScoreFunction(o), e.length ? a.iterator(a.items, function(e, n) {
			i = r(e), (t.filter === !1 || i > 0) && o.items.push({
				score: i,
				id: n
			})
		}) : a.iterator(a.items, function(e, t) {
			o.items.push({
				score: 1,
				id: t
			})
		}), n = a.getSortFunction(o, t), n && o.items.sort(n), o.total = o.items.length, "number" == typeof t.limit && (o.items = o.items.slice(0, t.limit)), o
	};
	var t = function(e, t) {
		return "number" == typeof e && "number" == typeof t ? e > t ? 1 : t > e ? -1 : 0 : (e = String(e || "").toLowerCase(), t = String(t || "").toLowerCase(), e > t ? 1 : t > e ? -1 : 0)
	}, i = function(e, t) {
			var i, o, n, r;
			for (i = 1, o = arguments.length; o > i; i++)
				if (r = arguments[i])
					for (n in r) r.hasOwnProperty(n) && (e[n] = r[n]);
			return e
		}, o = function(e) {
			return (e + "").replace(/^\s+|\s+$|/g, "")
		}, n = function(e) {
			return (e + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
		}, r = Array.isArray || $ && $.isArray || function(e) {
			return "[object Array]" === Object.prototype.toString.call(e)
		}, a = {
			a: "[a\xc0\xc1\xc2\xc3\xc4\xc5\xe0\xe1\xe2\xe3\xe4\xe5\u0100\u0101]",
			c: "[c\xc7\xe7\u0107\u0106\u010d\u010c]",
			d: "[d\u0111\u0110\u010f\u010e]",
			e: "[e\xc8\xc9\xca\xcb\xe8\xe9\xea\xeb\u011b\u011a\u0112\u0113]",
			i: "[i\xcc\xcd\xce\xcf\xec\xed\xee\xef\u012a\u012b]",
			n: "[n\xd1\xf1\u0148\u0147]",
			o: "[o\xd2\xd3\xd4\xd5\xd5\xd6\xd8\xf2\xf3\xf4\xf5\xf6\xf8\u014c\u014d]",
			r: "[r\u0159\u0158]",
			s: "[s\u0160\u0161]",
			t: "[t\u0165\u0164]",
			u: "[u\xd9\xda\xdb\xdc\xf9\xfa\xfb\xfc\u016f\u016e\u016a\u016b]",
			y: "[y\u0178\xff\xfd\xdd]",
			z: "[z\u017d\u017e]"
		};
	return e
}),
function(e) {
	"function" == typeof define && define.amd ? define(["underscore", "jquery", "backbone"], e) : "undefined" != typeof module && module.exports ? module.exports = e(require("underscore"), require("jquery"), require("backbone")) : e(_, jQuery, Backbone)
}(function(e, t, i) {
	if (!i) throw "Please include Backbone.js before Backbone.ModelBinder.js";
	return i.ModelBinder = function() {
		e.bindAll.apply(e, [this].concat(e.functions(this)))
	}, i.ModelBinder.SetOptions = function(e) {
		i.ModelBinder.options = e
	}, i.ModelBinder.VERSION = "1.0.6", i.ModelBinder.Constants = {}, i.ModelBinder.Constants.ModelToView = "ModelToView", i.ModelBinder.Constants.ViewToModel = "ViewToModel", e.extend(i.ModelBinder.prototype, {
		bind: function(e, i, o, n) {
			this.unbind(), this._model = e, this._rootEl = i, this._setOptions(n), this._model || this._throwException("model must be specified"), this._rootEl || this._throwException("rootEl must be specified"), o ? (this._attributeBindings = t.extend(!0, {}, o), this._initializeAttributeBindings(), this._initializeElBindings()) : this._initializeDefaultBindings(), this._bindModelToView(), this._bindViewToModel()
		},
		bindCustomTriggers: function(e, t, i, o, n) {
			this._triggers = i, this.bind(e, t, o, n)
		},
		unbind: function() {
			this._unbindModelToView(), this._unbindViewToModel(), this._attributeBindings && (delete this._attributeBindings, this._attributeBindings = void 0)
		},
		_setOptions: function(t) {
			this._options = e.extend({
				boundAttribute: "name"
			}, i.ModelBinder.options, t), this._options.modelSetOptions || (this._options.modelSetOptions = {}), this._options.modelSetOptions.changeSource = "ModelBinder", this._options.changeTriggers || (this._options.changeTriggers = {
				"": "change",
				"[contenteditable]": "blur"
			}), this._options.initialCopyDirection || (this._options.initialCopyDirection = i.ModelBinder.Constants.ModelToView)
		},
		_initializeAttributeBindings: function() {
			var t, i, o, n, r;
			for (t in this._attributeBindings) {
				for (i = this._attributeBindings[t], e.isString(i) ? o = {
					elementBindings: [{
						selector: i
					}]
				} : e.isArray(i) ? o = {
					elementBindings: i
				} : e.isObject(i) ? o = {
					elementBindings: [i]
				} : this._throwException("Unsupported type passed to Model Binder " + o), n = 0; n < o.elementBindings.length; n++) r = o.elementBindings[n], r.attributeBinding = o;
				o.attributeName = t, this._attributeBindings[t] = o
			}
		},
		_initializeDefaultBindings: function() {
			var e, i, o, n, r;
			for (this._attributeBindings = {}, i = t("[" + this._options.boundAttribute + "]", this._rootEl), e = 0; e < i.length; e++) o = i[e], n = t(o).attr(this._options.boundAttribute), this._attributeBindings[n] ? this._attributeBindings[n].elementBindings.push({
				attributeBinding: this._attributeBindings[n],
				boundEls: [o]
			}) : (r = {
				attributeName: n
			}, r.elementBindings = [{
				attributeBinding: r,
				boundEls: [o]
			}], this._attributeBindings[n] = r)
		},
		_initializeElBindings: function() {
			var e, i, o, n, r, a, s;
			for (e in this._attributeBindings)
				for (i = this._attributeBindings[e], o = 0; o < i.elementBindings.length; o++)
					if (n = i.elementBindings[o], r = "" === n.selector ? t(this._rootEl) : t(n.selector, this._rootEl), 0 === r.length) this._throwException("Bad binding found. No elements returned for binding selector " + n.selector);
					else
						for (n.boundEls = [], a = 0; a < r.length; a++) s = r[a], n.boundEls.push(s)
		},
		_bindModelToView: function() {
			this._model.on("change", this._onModelChange, this), this._options.initialCopyDirection === i.ModelBinder.Constants.ModelToView && this.copyModelAttributesToView()
		},
		copyModelAttributesToView: function(t) {
			var i, o;
			for (i in this._attributeBindings)(void 0 === t || -1 !== e.indexOf(t, i)) && (o = this._attributeBindings[i], this._copyModelToView(o))
		},
		copyViewValuesToModel: function() {
			var e, i, o, n, r, a;
			for (e in this._attributeBindings)
				for (i = this._attributeBindings[e], o = 0; o < i.elementBindings.length; o++)
					if (n = i.elementBindings[o], this._isBindingUserEditable(n))
						if (this._isBindingRadioGroup(n)) a = this._getRadioButtonGroupCheckedEl(n), a && this._copyViewToModel(n, a);
						else
							for (r = 0; r < n.boundEls.length; r++) a = t(n.boundEls[r]), this._isElUserEditable(a) && this._copyViewToModel(n, a)
		},
		_unbindModelToView: function() {
			this._model && (this._model.off("change", this._onModelChange), this._model = void 0)
		},
		_bindViewToModel: function() {
			e.each(this._options.changeTriggers, function(e, i) {
				t(this._rootEl).delegate(i, e, this._onElChanged)
			}, this), this._options.initialCopyDirection === i.ModelBinder.Constants.ViewToModel && this.copyViewValuesToModel()
		},
		_unbindViewToModel: function() {
			this._options && this._options.changeTriggers && e.each(this._options.changeTriggers, function(e, i) {
				t(this._rootEl).undelegate(i, e, this._onElChanged)
			}, this)
		},
		_onElChanged: function(e) {
			var i, o, n, r;
			for (i = t(e.target)[0], o = this._getElBindings(i), n = 0; n < o.length; n++) r = o[n], this._isBindingUserEditable(r) && this._copyViewToModel(r, i)
		},
		_isBindingUserEditable: function(e) {
			return void 0 === e.elAttribute || "text" === e.elAttribute || "html" === e.elAttribute
		},
		_isElUserEditable: function(e) {
			var t = e.attr("contenteditable");
			return t || e.is("input") || e.is("select") || e.is("textarea")
		},
		_isBindingRadioGroup: function(e) {
			var i, o, n = e.boundEls.length > 0;
			for (i = 0; i < e.boundEls.length; i++)
				if (o = t(e.boundEls[i]), "radio" !== o.attr("type")) {
					n = !1;
					break
				}
			return n
		},
		_getRadioButtonGroupCheckedEl: function(e) {
			var i, o;
			for (i = 0; i < e.boundEls.length; i++)
				if (o = t(e.boundEls[i]), "radio" === o.attr("type") && o.attr("checked")) return o;
			return void 0
		},
		_getElBindings: function(e) {
			var t, i, o, n, r, a, s = [];
			for (t in this._attributeBindings)
				for (i = this._attributeBindings[t], o = 0; o < i.elementBindings.length; o++)
					for (n = i.elementBindings[o], r = 0; r < n.boundEls.length; r++) a = n.boundEls[r], a === e && s.push(n);
			return s
		},
		_onModelChange: function() {
			var e, t;
			for (e in this._model.changedAttributes()) t = this._attributeBindings[e], t && this._copyModelToView(t)
		},
		_copyModelToView: function(e) {
			var o, n, r, a, s, l;
			for (s = this._model.get(e.attributeName), o = 0; o < e.elementBindings.length; o++)
				for (n = e.elementBindings[o], r = 0; r < n.boundEls.length; r++) a = n.boundEls[r], a._isSetting || (l = this._getConvertedValue(i.ModelBinder.Constants.ModelToView, n, s), this._setEl(t(a), n, l))
		},
		_setEl: function(e, t, i) {
			t.elAttribute ? this._setElAttribute(e, t, i) : this._setElValue(e, i)
		},
		_setElAttribute: function(t, o, n) {
			switch (o.elAttribute) {
				case "html":
					t.html(n);
					break;
				case "text":
					t.text(n);
					break;
				case "enabled":
					t.prop("disabled", !n);
					break;
				case "displayed":
					t[n ? "show" : "hide"]();
					break;
				case "hidden":
					t[n ? "hide" : "show"]();
					break;
				case "css":
					t.css(o.cssAttribute, n);
					break;
				case "class":
					var r = this._model.previous(o.attributeBinding.attributeName),
						a = this._model.get(o.attributeBinding.attributeName);
					e.isUndefined(r) && e.isUndefined(a) || (r = this._getConvertedValue(i.ModelBinder.Constants.ModelToView, o, r), t.removeClass(r)), n && t.addClass(n);
					break;
				default:
					t.attr(o.elAttribute, n)
			}
		},
		_setElValue: function(e, t) {
			if (e.attr("type")) switch (e.attr("type")) {
				case "radio":
					e.prop("checked", e.val() === t);
					break;
				case "checkbox":
					e.prop("checked", !! t);
					break;
				case "file":
					break;
				default:
					e.val(t)
			} else e.is("input") || e.is("select") || e.is("textarea") ? e.val(t || (0 === t ? "0" : "")) : e.text(t || (0 === t ? "0" : ""))
		},
		_copyViewToModel: function(e, o) {
			var n, r, a;
			o._isSetting || (o._isSetting = !0, n = this._setModel(e, t(o)), o._isSetting = !1, n && e.converter && (r = this._model.get(e.attributeBinding.attributeName), a = this._getConvertedValue(i.ModelBinder.Constants.ModelToView, e, r), this._setEl(t(o), e, a)))
		},
		_getElValue: function(e, t) {
			switch (t.attr("type")) {
				case "checkbox":
					return t.prop("checked") ? !0 : !1;
				default:
					return void 0 !== t.attr("contenteditable") ? t.html() : t.val()
			}
		},
		_setModel: function(e, t) {
			var o = {}, n = this._getElValue(e, t);
			return n = this._getConvertedValue(i.ModelBinder.Constants.ViewToModel, e, n), o[e.attributeBinding.attributeName] = n, this._model.set(o, this._options.modelSetOptions)
		},
		_getConvertedValue: function(e, t, i) {
			return t.converter ? i = t.converter(e, i, t.attributeBinding.attributeName, this._model, t.boundEls) : this._options.converter && (i = this._options.converter(e, i, t.attributeBinding.attributeName, this._model, t.boundEls)), i
		},
		_throwException: function(e) {
			if (!this._options.suppressThrows) throw e;
			"undefined" != typeof console && console.error && console.error(e)
		}
	}), i.ModelBinder.CollectionConverter = function(t) {
		if (this._collection = t, !this._collection) throw "Collection must be defined";
		e.bindAll(this, "convert")
	}, e.extend(i.ModelBinder.CollectionConverter.prototype, {
		convert: function(e, t) {
			return e === i.ModelBinder.Constants.ModelToView ? t ? t.id : void 0 : this._collection.get(t)
		}
	}), i.ModelBinder.createDefaultBindings = function(e, i, o, n) {
		var r, a, s, l, d = {};
		for (r = t("[" + i + "]", e), a = 0; a < r.length; a++)
			if (s = r[a], l = t(s).attr(i), !d[l]) {
				var c = {
					selector: "[" + i + '="' + l + '"]'
				};
				d[l] = c, o && (d[l].converter = o), n && (d[l].elAttribute = n)
			}
		return d
	}, i.ModelBinder.combineBindings = function(t, i) {
		return e.each(i, function(e, i) {
			var o = {
				selector: e.selector
			};
			e.converter && (o.converter = e.converter), e.elAttribute && (o.elAttribute = e.elAttribute), t[i] ? t[i] = [t[i], o] : t[i] = o
		}), t
	}, i.ModelBinder
}),
function() {
	this.PriceTaskService = function(e) {
		var t;
		return t = {}, t.index = function(t, i) {
			return e({
				url: "/admin/price_tasks.json?product_id=" + t,
				method: "get"
			}).success(function(e) {
				return i(e)
			})
		}, t.create = function(t, i) {
			return e({
				url: "/admin/price_tasks.json",
				method: "post",
				data: {
					price_task: t
				}
			}).success(function(e) {
				return i(e)
			})
		}, t.update = function(t, i, o) {
			return e({
				url: "/admin/price_tasks/" + t + ".json",
				method: "put",
				data: {
					price_task: i
				}
			}).success(function(e) {
				return o(e)
			})
		}, t
	}
}.call(this),
function(e, t, i) {
	"use strict";
	t.module("ui.sortable", []).value("uiSortableConfig", {}).directive("uiSortable", ["uiSortableConfig", "$timeout", "$log",
		function(e, i, o) {
			return {
				require: "?ngModel",
				link: function(n, r, a, s) {
					function l(e, t) {
						return t && "function" == typeof t ? function(i, o) {
							e(i, o), t(i, o)
						} : e
					}

					function d(e, t) {
						var i = e.sortable("option", "helper");
						return "clone" === i || "function" == typeof i && t.item.sortable.isCustomHelperUsed()
					}
					var c, u = {}, h = {
							receive: null,
							remove: null,
							start: null,
							stop: null,
							update: null
						}, p = {
							helper: null
						};
					return t.extend(u, e, n.$eval(a.uiSortable)), t.element.fn && t.element.fn.jquery ? (s ? (n.$watch(a.ngModel + ".length", function() {
						i(function() {
							r.data("ui-sortable") && r.sortable("refresh")
						})
					}), h.start = function(e, t) {
						t.item.sortable = {
							index: t.item.index(),
							cancel: function() {
								t.item.sortable._isCanceled = !0
							},
							isCanceled: function() {
								return t.item.sortable._isCanceled
							},
							isCustomHelperUsed: function() {
								return !!t.item.sortable._isCustomHelperUsed
							},
							_isCanceled: !1,
							_isCustomHelperUsed: t.item.sortable._isCustomHelperUsed
						}
					}, h.activate = function() {
						c = r.contents();
						var e = r.sortable("option", "placeholder");
						if (e && e.element && "function" == typeof e.element) {
							var i = e.element();
							i = t.element(i);
							var o = r.find('[class="' + i.attr("class") + '"]');
							c = c.not(o)
						}
					}, h.update = function(e, t) {
						t.item.sortable.received || (t.item.sortable.dropindex = t.item.index(), t.item.sortable.droptarget = t.item.parent(), r.sortable("cancel")), d(r, t) && !t.item.sortable.received && "parent" === r.sortable("option", "appendTo") && (c = c.not(c.last())), c.appendTo(r), t.item.sortable.received && (c = null), t.item.sortable.received && !t.item.sortable.isCanceled() && n.$apply(function() {
							s.$modelValue.splice(t.item.sortable.dropindex, 0, t.item.sortable.moved)
						})
					}, h.stop = function(e, t) {
						!t.item.sortable.received && "dropindex" in t.item.sortable && !t.item.sortable.isCanceled() ? n.$apply(function() {
							s.$modelValue.splice(t.item.sortable.dropindex, 0, s.$modelValue.splice(t.item.sortable.index, 1)[0])
						}) : "dropindex" in t.item.sortable && !t.item.sortable.isCanceled() || d(r, t) || c.appendTo(r), c = null
					}, h.receive = function(e, t) {
						t.item.sortable.received = !0
					}, h.remove = function(e, t) {
						"dropindex" in t.item.sortable || (r.sortable("cancel"), t.item.sortable.cancel()), t.item.sortable.isCanceled() || n.$apply(function() {
							t.item.sortable.moved = s.$modelValue.splice(t.item.sortable.index, 1)[0]
						})
					}, p.helper = function(e) {
						return e && "function" == typeof e ? function(t, i) {
							var o = e(t, i);
							return i.sortable._isCustomHelperUsed = i !== o, o
						} : e
					}, n.$watch(a.uiSortable, function(e) {
						r.data("ui-sortable") && t.forEach(e, function(e, t) {
							h[t] ? ("stop" === t && (e = l(e, function() {
								n.$apply()
							})), e = l(h[t], e)) : p[t] && (e = p[t](e)), r.sortable("option", t, e)
						})
					}, !0), t.forEach(h, function(e, t) {
						u[t] = l(e, u[t])
					})) : o.info("ui.sortable: ngModel not provided!", r), void r.sortable(u)) : void o.error("ui.sortable: jQuery should be included before AngularJS!")
				}
			}
		}
	])
}(window, window.angular),
function() {
	var e, t, i = [].indexOf || function(e) {
			for (var t = 0, i = this.length; i > t; t++)
				if (t in this && this[t] === e) return t;
			return -1
		};
	Array.prototype.product = function() {
		var e, t, i, o;
		for (o = 1, t = 0, i = this.length; i > t; t++) e = this[t], o *= e;
		return o
	}, Array.prototype.max = function() {
		return this.reduce(function(e, t) {
			return e > t ? e : t
		}, 0)
	}, e = function() {
		function e(e) {
			var t, i, o, n, r, a, s, l, d, c, u, h, p, f, g, m, v, _;
			if (this.items = e, null !== this.items && 0 !== this.items.length) {
				for (u = this.items.map(function(e) {
					return e.values.length
				}), p = this.items, n = 0, s = p.length; s > n; n++) o = p[n], u.shift(), o.rows = u.product();
				for (this.matrix = [], f = this.items[0].values, r = 0, l = f.length; l > r; r++) _ = f[r], _.parent = this.items[0], this.matrix.push([_]);
				if (1 === this.items.length) return this.gen_key(this.matrix), this.gen_name(this.matrix), void(this.crop_matrix = this.matrix);
				for (i = 1; i < this.items.length;) this.matrix = this.merge(this.matrix, this.items[i]), i += 1;
				for (this.gen_key(this.matrix), this.gen_name(this.matrix), this.crop_matrix = [], g = this.matrix, v = a = 0, d = g.length; d > a; v = ++a) {
					for (o = g[v], m = [], m.key = o.key, m.name = o.name, h = 0, c = o.length; c > h; h++) t = o[h], v % t.parent.rows === 0 && m.push(t);
					this.crop_matrix.push(m)
				}
			}
		}
		return e.prototype.gen_key = function(e) {
			var t, i, o, n, r;
			for (n = [], i = 0, o = e.length; o > i; i++) r = e[i], t = r.map(function(e) {
				return e.id
			}), n.push(r.key = t.join("-"));
			return n
		}, e.prototype.gen_name = function(e) {
			var t, i, o, n, r;
			for (n = [], t = 0, i = e.length; i > t; t++) r = e[t], o = r.map(function(e) {
				return e.parent.name + ":" + e.name
			}), n.push(r.name = o.join(","));
			return n
		}, e.prototype.merge = function(e, t) {
			var i, o, n, r, a, s, l, d, c;
			for (s = [], o = 0, r = e.length; r > o; o++)
				for (d = e[o], l = t.values, n = 0, a = l.length; a > n; n++) c = l[n], i = d.slice(), c.parent = t, i.push(c), s.push(i);
			return s
		}, e.prototype.getHeader = function() {
			return void 0 === this.matrix || void 0 === this.matrix[0] || 0 === this.matrix[0].length ? [] : this.matrix[0].map(function(e) {
				return e.parent.name
			})
		}, e.prototype.get_matrix = function() {
			return this.crop_matrix || []
		}, e
	}(), t = function(t, o) {
		var n, r, a, s, l, d, c, u;
		return new_product && (t.is_show_box = 0, t.editor = {
			id: "",
			name: "",
			value: "",
			values: []
		}), t.items = [], t.origin_items = [], t.stocks = {}, t.origin_stocks = {}, u = "admin.php?s=/goods/attr", o.get(u).success(function(e, i, o, n) {
			return t.templates = e
//		}), new_product || (u = "/admin/products/" + product_id + "/stocks", o.get(u).success(function(e, i, o, n) {
		}), PRODUCT_ID == '' || (u = "admin.php?s=/goods/getSku/proid/" + PRODUCT_ID, o.get(u).success(function(e, i, o, n) {
			var r, a, s, l, d;
			for (t.items = e.tags, t.origin_items = angular.copy(t.items), d = {}, s = e.stocks, r = 0, a = s.length; a > r; r++) l = s[r], d[l.key] = l;
			return t.stocks = d, t.origin_stocks = angular.copy(t.stocks)
		})), t.tpl_box_show = !1, t.uniform_price = $("#auto_complete_price").prop("checked"), t.new_tag_box = "new_tab_box", t.$watch("items", function() {
			var i, o, n, r, a, s, l, d, c, u, h, p, f, g, m, v, _, b, y;
			for (n = angular.copy(t.items), i = r = 0, d = n.length; d > r; i = ++r) o = n[i], o.values = o.values.filter(function(e) {
				return e.checked
			});
			n = n.filter(function(e) {
				return e.values.length > 0
			}), h = new e(n), t.matrix = h.get_matrix(), p = $("#p_market_price").val() || 0, b = $("#p_supply_price").val() || 0, _ = {}, console.debug(t.stocks), f = t.stocks || {};
			for (s in f)
				for (y = f[s], console.debug(i), g = t.matrix, a = 0, c = g.length; c > a; a++) v = g[a], v.key === s && (_[v.key] = y);
			for (console.debug(_), m = t.matrix, l = 0, u = m.length; u > l; l++) v = m[l], void 0 === _[v.key] ? _[v.key] = {
				key: v.key,
				name: v.name,
				price: p,
				supply_price: b,
				quantity: 50
			} : null === _[v.key].name && (_[v.key].name = v.name);
			return t.stocks = _, t.headers = h.getHeader(),PRO_ATTR_OBJ = t.stocks;
		}, !0), c = 0, t.$watch("templates", function() {
			var e;
			return c += 1, void 0 !== t.templates && c > 2 ? (e = JSON.stringify(t.templates), $.post("/admin/products/update_tpl", {
				templates: e
			}, function() {
				return toastr.info("\u89c4\u683c\u6a21\u677f\u5df2\u66f4\u65b0")
			})) : void 0
		}, !0), t.editor_hidden = !0, t.is_dirty_tags = function() {
			return !angular.equals(t.items, t.origin_items)
		}, t.is_dirty_stocks = function() {
			return !angular.equals(t.stocks, t.origin_stocks)
		}, t.enter_add_item_value = function(e) {
			return 13 === e.which ? t.add_item_value() : void 0
		}, s = function(e) {
			var t;
			return t = e.map(function(e) {
				return e.id
			}), t.max()
		}, l = function() {
			return t.items.map(function(e) {
				return e.values.map(function(e) {
					return e.id
				}).max()
			}).max()
		}, r = function(e, t) {
			var i;
			return i = t.filter(function(t) {
				return t.name === e
			}), i.length > 0 ? !0 : !1
		}, t.add_item_value = function() {
			var e, i, o, n;
			return e = t.editor, o = l(), n = s(e.values), i = o > n ? o : n, void 0 === e.value || "" === e.value.trim() ? void toastr.error("规格值不能为空，请输入规格值！") : r(e.value, e.values) ? void toastr.error("规格值名称重复") : (t.editor.values.push({
				id: i + 1,
				name: e.value,
				checked: !1
			}), e.value = "")
		}, t.del_item_value = function(e) {
			return t.editor.values.splice(e, 1)
		}, n = function(e) {
			var i;
			return i = t.items.filter(function(t) {
				return t.name === e
			}), i.length > 0 ? !0 : !1
		}, t.add_item = function() {
			var e, i;
			return i = t.editor, e = i.edit_index, void 0 === i.name || "" === i.name.trim() ? void toastr.error("规格名称不能为空，请输入规格名称！") : i.values.length < 1 ? void toastr.error("至少要有一个规格值！") : void 0 === e ? n(t.editor.name) ? void toastr.error("存在重复规格名称！") : (t.items.push(angular.copy(i)), t.is_show_box = !1) : i.old_name !== i.name && n(t.editor.name) ? void toastr.error("存在重复规格名称！") : (delete i.value, delete i.old_name, t.items[e] = i, t.editor.edit_index = void 0, t.open_show_box_scope.is_show_box = !1),this.$parent.$parent.is_show_box = !1
		}, t.new_tag = function() {
			var e;
			return t.open_show_box_scope && (t.open_show_box_scope.is_show_box = !1), t.open_show_box_scope = this, this.is_show_box = !0, e = s(t.items) + 1, t.editor = {
				id: e,
				name: "",
				value: "",
				values: []
			}
		},t.edit_item2=function(e){
			return t.editor = angular.copy(t.items[e]),t.editor.value = "", t.editor.old_name = t.editor.name, t.editor.edit_index = e,t.this.is_show_box = 1,t.open_show_box_scope && (t.open_show_box_scope.is_show_box = !1), t.open_show_box_scope = this
		},
		t.edit_item = function(e) {
			return t.editor = angular.copy(t.items[e]), t.editor.value = "", t.editor.old_name = t.editor.name, t.editor.edit_index = e, t.open_show_box_scope && (t.open_show_box_scope.is_show_box = !1), t.open_show_box_scope = this, this.is_show_box = !0
		}, t.delete_item = function(e) {
			return t.items.splice(e, 1)
		}, t.cancel_edit_item = function() {
			return this.$parent.$parent.is_show_box = !1
		}, t.show_tpl_box = function() {
			return t.tpl_box_show = !0
		}, t.close_tpl_box = function() {
			return t.tpl_box_show = !1
		}, t.apply_template = function() {
			var e, i, o, n, r, a, d, c;
			for (t.close_tpl_box(), i = angular.copy(this.item), r = s(t.items), a = l(), i.id = r + 1, d = i.values, e = o = 0, n = d.length; n > o; e = ++o) c = d[e], c.id = a + e + 1;
			return i.edit_index = t.editor.edit_index, t.editor = i
		}, t.del_tpl_item = function(e) {
			return this.$parent.templates.splice(e, 1)
		}, t.del_tpl_item_value = function(e) {
			return this.$parent.item.values.splice(e, 1)
		}, t.save_to_tpl = function() {
			var e;
			return e = t.editor, e.values.length > 0 ? (t.templates.push(angular.copy(e)), toastr.info("\u5df2\u52a0\u5165\u5230\u89c4\u683c\u6a21\u677f\u4e2d")) : void 0
		}, t.is_o2o_product = product_o2o_flag, t.can_add = function() {
			
			return !(t.is_o2o_product || $("#product_type_id").length > 0 && ["6", "7"].indexOf($("#product_type_id").val()) > -1)
		}, d = {}, d["" + O2O_PAY_AUTO_SUCCESS] = "\u5b9e\u65f6\u4e0b\u5355", d["" + VIRTUAL_COUPON_AUTO_SUCCESS] = "\u9ed8\u8ba4\u4f18\u60e0\u5238", d["" + SECKILL] = "\u9ed8\u8ba4\u79d2\u6740", d["" + O2O_SPECIAL] = "O2O\u7279\u7ea6", d["" + O2O_UNION] = "O2O\u8054\u76df", a = d, t.load_product_stock = function(e) {
			return t.is_o2o_product = i.call(o2o_names, e) >= 0, a[e] ? (t.items = [{
				name: a[e],
				values: [{
					name: "\u9ed8\u8ba4\u89c4\u683c",
					checked: !0
				}]
			}], t.$apply()) : void 0
		}, t.reset_from_product = function(e) {
			return t.is_o2o_product = i.call(o2o_names, e) >= 0, a[e] ? (t.items = [], t.$apply()) : void 0
		}
	}, angular.module("StockEditor", ["ui.sortable"]).controller("stockCtrl", ["$scope", "$http", t])
}.call(this),
function() {
	this.JST || (this.JST = {}), this.JST["apps/products/editor/templates/photo"] = function(e) {
		e || (e = {});
		var t, i = [],
			o = function(e) {
				return e && e.ecoSafe ? e : "undefined" != typeof e && null != e ? r(e) : ""
			}, n = e.safe,
			r = e.escape;
		return t = e.safe = function(e) {
			if (e && e.ecoSafe) return e;
			("undefined" == typeof e || null == e) && (e = "");
			var t = new String(e);
			return t.ecoSafe = !0, t
		}, r || (r = e.escape = function(e) {
			return ("" + e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
		}),
		function() {
			(function() {
				i.push('<div class="photo-box '), i.push(o(this["class"])), i.push('">\n	<div class="close-box">\n		<button type="button" class="close" aria-hidden="true">&times;</button>\n	</div>\n	<div class="inner-box">\n		<img src="'), i.push(o(this.thumb)), i.push('">\n		<div class="filename">'), i.push(o(this.filename)), i.push("</div>\n	</div>\n</div>\n")
			}).call(this)
		}.call(e), e.safe = n, e.escape = r, i.join("")
	}
}.call(this),
function() {
	this.JST || (this.JST = {}), this.JST["apps/products/editor/templates/tag"] = function(e) {
		e || (e = {});
		var t, i = [],
			o = function(e) {
				return e && e.ecoSafe ? e : "undefined" != typeof e && null != e ? r(e) : ""
			}, n = e.safe,
			r = e.escape;
		return t = e.safe = function(e) {
			if (e && e.ecoSafe) return e;
			("undefined" == typeof e || null == e) && (e = "");
			var t = new String(e);
			return t.ecoSafe = !0, t
		}, r || (r = e.escape = function(e) {
			return ("" + e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
		}),
		function() {
			(function() {
				i.push('<div data-item-id="'), i.push(o(this.id)), i.push('">\n	<div class="key col">\n	  <input name="name" type="text" class="form-control" value="'), i.push(o(this.name)), i.push('" placeholder="\u5c5e\u6027\u540d">\n	</div>\n	<div class="val col">\n	  <input name="value" type="text" class="form-control" value="'), i.push(o(this.value)), i.push('" placeholder="\u5c5e\u6027\u503c">\n	</div>\n	<div class="btn col" style="padding:3px;">\n	  <a class="btn btn-danger btn-sm btn-remove-tag">\u5220\u9664</a>\n	</div>\n</div>\n')
			}).call(this)
		}.call(e), e.safe = n, e.escape = r, i.join("")
	}
}.call(this),
function() {
	var e;
	e = function(e, t) {
		return e.price_tasks = [], e.supply_price = 0, e.price = 0, e.rebate = 1, e.new_ids = [], e.is_o2o = !1, !new_product && product_id && t.index(product_id, function(t) {
			return e.price_tasks = t
		}), e.createTiming = function() {
			var i, o, n, r, a;
			if (n = {}, n.valid_at = e.valid_at, n.supply_price = e.supply_price, n.price = e.price, n.rebate = e.rebate, n.rebate_price = e.rebate_price, !(n.valid_at.length > 0 && parseFloat(n.supply_price) > 0 && parseFloat(n.price) > 0 && parseFloat(n.rebate_price) && n.rebate > 0)) return alert("\u8f93\u5165\u7684\u65f6\u95f4\u6216\u4ef7\u683c\u4e0d\u5bf9\uff01"), !1;
			for (r = e.price_tasks, i = 0, o = r.length; o > i; i++)
				if (a = r[i], a.valid_at === n.valid_at && a.can_stop) return alert("\u65f6\u95f4\u4e0d\u53ef\u91cd\u53e0\uff01"), !1;
			return !new_product && product_id && (n.product_id = product_id), t.create(n, function(t) {
				return e.price_tasks.splice(0, 0, t), e.new_ids.push(t.id), e.valid_at = "", e.supply_price = 0, e.price = 0, e.addMode = !1
			})
		}, e.stopTask = function(i) {
			return confirmDialog("\u786e\u8ba4\u4e2d\u6b62", "\u60a8\u771f\u7684\u8981\u4e2d\u6b62\u9009\u4e2d\u8c03\u4ef7\u4efb\u52a1\u5417\uff1f", {
				type: "type-danger"
			}, function(o) {
				return o === !0 ? t.update(i.id, {
					status: "cancel"
				}, function(t) {
					return e.price_tasks[e.price_tasks.indexOf(i)] = t
				}) : void 0
			})
		}, e.$watch("price", function(t, i) {
			return parseFloat(t) > 0 && parseFloat(e.rebate_price) > 0 ? e.rebate = parseFloat(e.rebate_price) / parseFloat(t) : void 0
		}), e.$watch("rebate_price", function(t, i) {
			return parseFloat(t) > 0 && parseFloat(e.rebate_price) > 0 ? e.rebate = parseFloat(t) / parseFloat(e.price) : void 0
		}), e.NewPriceTask = function() {
			var t;
			return t = parseInt($("#product_type_id").val()), t && [5, 8, 9].indexOf(t) > -1 && (e.is_o2o = !0, e.rebate_price = 100, e.price = 100), e.addMode = !0
		}, e.Cancel = function() {
			return e.addMode = !1
		}, e.GoBackStock = function() {
			return $("#norms-price-tasks").removeClass("active"), $("#norms").addClass("active"), !1
		}
	}, angular.module("PriceTaskEditor", []).service("PriceTaskService", ["$http", this.PriceTaskService]).controller("PriceTaskCtrl", ["$scope", "PriceTaskService", e]).config(["$httpProvider",
		function(e) {
			return e.defaults.headers.common["X-CSRF-Token"] = $("meta[name=csrf-token]").attr("content")
		}
	]), $(function() {
		return angular.bootstrap(document.getElementById("price_task-panel"), ["PriceTaskEditor"])
	})
}.call(this),
function() {
	var e = function(e, i) {
		function o() {
			this.constructor = e
		}
		for (var n in i) t.call(i, n) && (e[n] = i[n]);
		return o.prototype = i.prototype, e.prototype = new o, e.__super__ = i.prototype, e
	}, t = {}.hasOwnProperty,
		i = [].indexOf || function(e) {
			for (var t = 0, i = this.length; i > t; t++)
				if (t in this && this[t] === e) return t;
			return -1
		};
	this.Cellar.module("Editor", function(t, o, n, r, a, s) {
		var l, d, c, u, h, p;
		return l = function(t) {
			function i() {
				return i.__super__.constructor.apply(this, arguments)
			}
			return e(i, t), i.prototype.remove = function() {
				return this.collection.remove(this)
			}, i
		}(n.Model), c = function(t) {
			function i() {
				return i.__super__.constructor.apply(this, arguments)
			}
			return e(i, t), i.prototype.model = l, i.prototype.url = function() {
				return "/admin/products/" + this.pid + "/photos"
			}, i.prototype.pid = 0, i.prototype.setProductId = function(e) {
				return this.pid = e
			}, i
		}(n.Collection), d = function(t) {
			function i() {
				return i.__super__.constructor.apply(this, arguments)
			}
			return e(i, t), i.prototype.tagName = "li", i.prototype.template = "products/editor/templates/photo", i.prototype.events = {
				"click button.close": function(e) {
					return this.model.collection.remove(this.model)
				}
			}, i
		}(r.ItemView), u = function(t) {
			function i() {
				return i.__super__.constructor.apply(this, arguments)
			}
			return e(i, t), i.prototype.tagName = "ul", i.prototype.itemView = d, i
		}(r.CollectionView), p = function(t) {
			function i() {
				return i.__super__.constructor.apply(this, arguments)
			}
			return e(i, t), i.prototype.el = ".tree", i.prototype.initialize = function() {
				var e;
				return e = {
					check: {
						enable: !0
					},
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
					},
					callback: {
						beforeDrag: function(e, t) {
							return !1
						}
					}
				}, a.getJSON(this.path + "/tree", function(t) {
					return function(i) {
						var o, n, r;
						return t.ztree = a.fn.zTree.init(t.$(".ztree"), e, i), o = [], n = t.ztree.getNodes(), r = function(e) {
							return s.each(e, function(e) {
								return o[e.id] = e.tId, e.isParent ? r(e.children) : void 0
							})
						}, r(n), t.cached = o, t.initChecked()
					}
				}(this))
			}, i.prototype.path = "/admin/product_categories", i.prototype.getChecked = function() {
				var e;
				return e = this.ztree.getChangeCheckedNodes(), s.chain(e).filter(function(e) {
					return e.checked && !e.isParent
				}).map(function(e) {
					return e.id
				}).value()
			}, i.prototype.getUnChecked = function() {
				var e;
				return e = this.ztree.getChangeCheckedNodes(), s.chain(e).filter(function(e) {
					return e.checked === !1 && !e.isParent
				}).map(function(e) {
					return e.id
				}).value()
			}, i.prototype.getNodeById = function(e) {
				var t;
				return t = this.cached[e], this.ztree.getNodeByTId(t)
			}, i.prototype.initChecked = function() {
				var e, t;
				return e = this.options.url, t = this.ztree, a.getJSON(e, function(e) {
					return function(i) {
						return log.debug("checked data is ", i), s.each(i, function(i) {
							var o;
							return o = e.getNodeById(i), o ? (t.checkNode(o, !0, !0), o.checkedOld = !0) : void 0
						})
					}
				}(this))
			}, i
		}(r.ItemView), h = function(t) {
			function n() {
				return n.__super__.constructor.apply(this, arguments)
			}
			return e(n, t), n.prototype.el = "#product-editor", n.prototype.path = "/admin/products", n.prototype.initialize = function() {
				var e;
				return this.$("#editor li>a:first").tab("show"), this.toggleProductLadingBill(), this.toggleValidType(), this.initLadingBillValidDate(), e = this.getProductId(), this.isVirtual(), this.tree = new p({
					url: this.path + "/" + e + "/chktree"
				}), this.$("#redactor-editor").val(this.$("#product_description").val()), this.$("#redactor-editor").redactor({
					minHeight: 297,
					autoresize: !1,
					plugins: ["gallery"],
					lang: "zh_cn"
				}), this.recalculateFee(), this.$(".label-switch input[type=checkbox]").each(function() {
					return a(this).change(function() {
						return a(this).is(":checked") ? a(this).val(1) : a(this).val(0)
					})
				}), this.photos = new c, this.photos.on("remove", function(e) {
					return function(t) {
						var i;
						return log.debug("collection remove", t), e.isNewEditor() ? void 0 : (i = t.get("item_id"), a.post(e.path + "/" + i + "/remove_photo", function(e) {
							return log.debug("delete success")
						}))
					}
				}(this)), this.photos.on("add", function(t) {
					return function(i) {
						var o;
						return t.isNewEditor() ? void 0 : (log.warn("add photo to ..."), o = i.get("id"), e = t.getProductId(), a.post(t.path + "/" + e + "/add_photo", {
							photo_id: o
						}, function(e) {
							return log.warn("add success", e), i.set("item_id", e.item_id)
						}))
					}
				}(this)), this.photos.setProductId(this.getProductId()), this.photosView = new u({
					collection: this.photos
				}), this.photos.fetch({
					silent: !0
				}).done(function(e) {
					return function() {
						return e.$(".photos-box").html(e.photosView.render().el)
					}
				}(this))
			}, n.prototype.events = {
				"click .btn-photos": function(e) {
					var t;
					return log.debug("add photo button click"), t = new o.Widget.PhotoGalleryDialog, t.prov_id = a("#product_provider_id").val(), t.on("photo:dialog:close", function(e) {
						return function(t) {
							return log.debug("user select the photo", t), t.length > 0 ? (e.photos.add(t), console.debug("---> all photos after added: " + e.photos.pluck("filename")), e.photosView.render()) : void 0
						}
					}(this)), o.dialog.show(t)
				},
				"click .btn-save": function(e) {
					var t, i, o, n, r, s, l, d, c, u, h, p, f, g, m, v, _, b, y, k, C, w, N, x, $, S, T, A, E, L, I, R, B;
					if (h = this.getProductTypeId() === VIRTUAL_LADING_BILL, console.debug("isLadingBill: " + h + "."), n = angular.element(".stock-editor").scope()) {
						if (!h && 0 === n.items.length) return toastr.error("商品规格不能为空"), !1;
						if (!h && 0 === n.matrix.length) return toastr.error("至少选择一个规格"), !1
					}
					if (window.photos = this.photos, t = this.$("#product_form"), log.warn("btn-save"), this.isNewEditor() && (N = this.photos.map(function(e) {
						return e.id
					}), log.debug("user click save button ", N), u = a("<input/>", {
						type: "hidden",
						name: "photo_ids",
						value: N
					}), t.append(u)), n && ((n.is_dirty_tags() || h) && (L = n.items, h && (L = this.productDefaultTags()), i = a("<input/>", {
						type: "hidden",
						name: "product[tags]",
						value: JSON.stringify(L)
					}), t.append(i)), n.is_dirty_stocks() || h)) {
						if (h && (E = this.productDefaultStock()), !E) {
							E = n.stocks, console.debug(n.stocks), x = n.stocks;
							for (S in x) {
								if (A = x[S], console.debug(A.quantity), "" === A.quantity || A.quantity < 0) return void toastr.error("数量不能为空或小于零");
								if ("" === A.price || A.price < 0) return void toastr.error("价格不能为空或小于零");
								if ("" === A.supply_price || A.supply_price < 0) return void toastr.error("供货价不能为空或小于零")
							}
							E = function() {
								var e;
								e = [];
								for (g in E) e.push(E[g]);
								return e
							}()
						}
						i = a("<input/>", {
							type: "hidden",
							name: "stocks",
							value: JSON.stringify(E)
						}), t.append(i)
					}
					if (this.$("#product_description").val(this.$("#redactor-editor").val()), r = this.tree.getChecked(), r.length > 0 && (u = a("<input/>", {
						type: "hidden",
						name: "check_ids",
						value: r
					}), t.append(u)), I = this.tree.getUnChecked(), I.length > 0 && (u = a("<input/>", {
						type: "hidden",
						name: "uncheck_ids",
						value: I
					}), t.append(u)), y = this.$("#product_lading_bill_valid_type"), b = this.$("#product_lading_bill_valid_days"), _ = this.$("#product_lading_bill_start_date"), v = this.$("#product_lading_bill_end_date"), log.debug("getProductTypeId: " + this.getProductTypeId()), this.getProductTypeId() === VIRTUAL_LADING_BILL)
						if (log.debug("lading_bill_valid_type_input.val: " + y.val()), "2" === y.val()) {
							if (b.val(0), "" === _.val()) return void toastr.error("请输入有效开始时间");
							if ("" === v.val()) return void toastr.error("请输入有效结束时间")
						} else {
							if ("" === b.val()) return void toastr.error("请输入有效天数");
							if (parseInt(b.val()) < 1) return void toastr.error("有效期必须大于等于1")
						}
					for (l = [], B = [], $ = ["promotion-labels_tree", "labels_tree"], c = 0, k = $.length; k > c; c++)
						if (m = $[c], o = angular.element("#" + m).scope(), o && (console.debug("is changed: " + o.is_changed()), o.is_changed(m))) {
							for (s = o.get_checked_nodes(m), R = o.get_unchecked_nodes(m), p = 0, C = s.length; C > p; p++) d = s[p], l.push(d);
							for (f = 0, w = R.length; w > f; f++) d = R[f], B.push(d);
							console.debug("checked label ids : " + l), console.debug("unchecked label ids : " + B)
						}
					return l.length > 0 && (u = a("<input/>", {
						type: "hidden",
						name: "check_label_ids",
						value: l.join(",")
					}), t.append(u)), B.length > 0 && (u = a("<input/>", {
						type: "hidden",
						name: "uncheck_label_ids",
						value: B.join(",")
					}), t.append(u)), a("#auto_complete_price").prop("checked") && angular.element("#price_task-panel") && (T = angular.element("#price_task-panel").scope(), T && (u = a("<input/>", {
						type: "hidden",
						name: "product[new_price_task_ids]",
						value: T.new_ids.join(",")
					}), t.append(u))), t.submit()
				},
				"change #product_provider_id": function(e) {
					var t, i;
					return t = a("#product_provider_id").val(), i = "/admin/products/fee_templates", a.get(i, {
						provider_id: t
					}, function(e) {
						var t;
						return a("#product_ship_type").empty(), t = "", e.map(function(e) {
							return t += "<option value=" + e[1] + ">" + e[0] + "</option>"
						}), a("#product_ship_type").append(t), a("#product_ship_type").selectpicker("refresh")
					})
				},
				"click .btn-cancel": function(e) {
					return history.back()
				},
				"keyup td.price input": function(e) {
					return this.commission(e)
				},
				"mousemove td.price": function(e) {
					return this.commission(e)
				},
				"change #p_market_price": function(e) {
					return this.recalculateFee()
				},
				"change #c_fee_ratio": function(e) {
					return this.recalculateFee()
				},
				"change #c_rebate": function(e) {
					return this.recalculateFee()
				},
				"change #c_sales_fee_ratio": function(e) {
					return this.recalculateFee()
				},
				"change #p_esaoying_fee": function() {
					return this.recalculateFee()
				},
				"change #p_supply_price": function() {
					var e;
					return e = this.getProductTypeId(), e === o2o_names && (this.$("#p_supply_price").val() >= 100 ? (alert("\u8f93\u5165\u91d1\u989d\u4e0d\u53ef\u5927\u4e8e\u6216\u7b49\u4e8e100\uff01"), this.$("#p_supply_price").val(0)) : 0 === this.$("#p_supply_price").val().length && this.$("#p_supply_price").val(0), this.$("#p_o2orate").html(parseFloat(this.$("#p_supply_price").val()) / 100)), this.CalcDefaultRatio(), this.apply_price_change_to_stocks()
				},
				"click .btn-gen-qrcode": function(e) {
					var t;
					return t = this.getProductId(), a.post("/admin/products/" + t + "/gen_qrcode", function(e) {
						return a(".qrcode-box .img-box img").attr("src", e.url)
					})
				},
				"click #system-default-fee-ratio": function(e) {
					return this.CalcDefaultRatio()
				},
				"change #product_type_id": function(e) {
					return log.debug("change product_type_id, value: " + this.getProductTypeId() + "."), this.isVirtual(), this.toggleProductLadingBill()
				},
				"change #product_lading_bill_valid_type": function(e) {
					return log.debug("change product_lading_bill_valid_type, value: " + this.getLadingBillValidType()), this.toggleValidType()
				},
				"change #auto_complete_price": function(e) {
					return this.apply_price_change_to_stocks()
				},
				"click .norms-tabs": function(e) {
					var t, i;
					return t = this.$(e.target).attr("data-target"), "norms-stocks" === t ? (a("#norms").addClass("active"), a("#norms-price-tasks").removeClass("active")) : a("#auto_complete_price").prop("checked") ? (i = this.getProductTypeId(), a("#norms").removeClass("active"), a("#norms-price-tasks").addClass("active")) : alert("\u4ec5\u5bf9\u6240\u6709\u578b\u53f7\u7edf\u4e00\u4f9b\u8d27\u548c\u6807\u4ef7\u7684\u5546\u54c1\u9002\u7528!")
				}
			}, n.prototype.isNewEditor = function() {
				return this.$el.data("new-record")
			}, n.prototype.isVirtual = function() {
				return ["1", "7"].indexOf(this.getProductTypeId()) > -1 ? (a(".product_ship_type").show(), a(".product_weight").show()) : (a(".product_ship_type").hide(), a(".product_weight").hide())
			}, n.prototype.recalculateFee = function() {
				var e, t, i, o, n, r, s, l;
				return i = a("#p_market_price").val(), r = a("#c_rebate").val(), o = 0, n = a("#c_fee_ratio").val(), s = a("#c_sales_fee_ratio").val(), null == r || 0 === parseFloat(r) || "" === r || parseFloat(r) > parseFloat(i) ? (o = i * a("#p_rebate").val(), a("#c_rebate").val(Math.round(100 * o) / 100), a("#c_fee_ratio").val(Math.round(o * a("#p_fee_ratio").val() * 100) / 100), a("#c_sales_fee_ratio").val(Math.round(o * a("#p_sales_fee_ratio").val() * 100) / 100)) : null == i || 0 === parseFloat(i) || "" === i ? (i = r / a("#p_rebate").val(), a("#p_market_price").val(i), o = i * a("#p_rebate").val()) : (t = parseFloat((r / i).toFixed(6)), a("#p_rebate").val(t), o = i * a("#p_rebate").val()), parseFloat(n) > parseFloat(r) || parseFloat(s) > parseFloat(r) ? (o = i * a("#p_rebate").val(), a("#c_fee_ratio").val(Math.round(o * a("#p_fee_ratio").val() * 100) / 100), a("#c_sales_fee_ratio").val(Math.round(o * a("#p_sales_fee_ratio").val() * 100) / 100)) : (e = (a("#c_fee_ratio").val() / o).toFixed(6), a("#p_fee_ratio").val(e), l = (a("#c_sales_fee_ratio").val() / o).toFixed(6), a("#p_sales_fee_ratio").val(l)), this.CalcDefaultRatio(), this.apply_price_change_to_stocks()
			}, n.prototype.getProductId = function() {
				return this.$el.data("product-id") || 0
			}, n.prototype.commission = function(e) {
				var t, i, o, n, r, s;
				return o = a(e.target).closest("input").val(), null == o && (o = a(e.target).children("input").val()), null != o ? (a("div.prompt").find("span").remove(), n = o * a("#p_rebate").val(), r = Math.round(100 * n) / 100, i = Math.round(n * a("#p_fee_ratio").val() * 100) / 100, s = Math.round(n * a("#p_sales_fee_ratio").val() * 100) / 100, t = Math.round((i + s) * site.esaoying_fee * 100) / 100, a(".discount-price").append("<span>" + r + "</span>"), a(".agent-commission").append("<span>" + i + "</span>"), a(".sales-commission").append("<span>" + s + "</span>"), a(".technology-commission").append("<span>" + t + "</span>")) : void 0
			}, n.prototype.getProductTypeId = function() {
				return this.$("#product_type_id").val()
			}, n.prototype.getLadingBillValidType = function() {
				return this.$("#product_lading_bill_valid_type").val()
			}, n.prototype.toggleProductLadingBill = function() {
				var e;
				return this.$(".p-hidden").hide(), e = this.getProductTypeId(), i.call(o2o_names, e) >= 0 ? (this.toggleo2oProduct(), this.recalculateFee()) : e === VIRTUAL_COUPON_AUTO_SUCCESS ? this.toggleCoupon() : (e === SECKILL ? (this.$("#product_buy_limit").val(1), this.$("#product_buy_limit").attr("readonly", !0), this.$(".norms-tabs[data-target='norms-price-tasks']").hide(), this.$("#valid_at-form-group").show(), this.load_product_stock(e)) : (this.$("#product_buy_limit").attr("readonly", !1), this.$(".norms-tabs[data-target='norms-price-tasks']").show(), this.$("#valid_at-form-group").hide()), e === VIRTUAL_LADING_BILL ? (this.$("div.lading_bill").show(), this.$("div.left-lading").show(), this.$("div.left").hide()) : (this.$("div.lading_bill").hide(), this.$("div.left").show(), this.$("div.left-lading").hide()), this.$("label.label-switch input.boolean").attr("disabled", !1), this.$(".swith-div:not(.enabled-attr)").show(), this.$("li.product-tab-category").show(), this.$("#c_rebate").attr("readonly", !1), this.$(".hide-o2o-product").show(), this.$(".show-o2o-product").hide(), e !== SECKILL ? angular.element("#product-editor .stock-editor").scope() && angular.element("#product-editor .stock-editor").scope().reset_from_product(e) : void 0)
			}, n.prototype.toggleValidType = function() {
				return "1" === this.getLadingBillValidType() ? (this.$("div.product_lading_bill_valid_days").show(), this.$("#lading_bill_valid_date_div").hide()) : (this.$("div.product_lading_bill_valid_days").hide(), this.$("#lading_bill_valid_date_div").show())
			}, n.prototype.initLadingBillValidDate = function() {
				var e, t;
				return t = this.$("#datepicker").data("limit-start"), e = this.$("#datepicker").data("limit-end"), this.$("#datepicker").datepicker({
					format: "yyyy\u5e74mm\u6708dd\u65e5",
					todayBtn: "linked",
					language: "zh-CN",
					autoclose: !0,
					startDate: t
				}), this.$(".idatetimepicker").datetimepicker({
					todayBtn: "linked",
					language: "zh-CN",
					autoclose: !0,
					adjustTop: 70
				})
			}, n.prototype.productDefaultTags = function() {
				return [{
					id: 1,
					name: "\u89c4\u683c",
					value: "",
					values: [{
						id: 1,
						name: "\u9ed8\u8ba4",
						checked: !0
					}]
				}]
			}, n.prototype.productDefaultStock = function() {
				return [{
					key: "1",
					name: "\u89c4\u683c:\u9ed8\u8ba4",
					price: a("#p_market_price").val(),
					supply_price: a("#p_supply_price").val(),
					quantity: 50
				}]
			}, n.prototype.apply_price_change_to_stocks = function() {
				var e, t, i, o, n, r, s, l;
				if (t = a("#auto_complete_price").prop("checked"), e = angular.element(".stock-editor").scope(), void 0 !== e) {
					if (o = e.unpaid_price, e.uniform_price = t, t || this.getProductTypeId() === o2o_names) {
						n = a("#p_supply_price").val(), r = a("#p_market_price").val(), s = e.stocks;
						for (i in s) l = s[i], console.log(l), l.supply_price = n, l.price = r
					}
					return e.$apply()
				}
			}, n.prototype.toggleCoupon = function() {
				return this.$("div.lading_bill").hide(), this.$("div.left-lading").hide(), this.$("div.left").show(), this.$("#product_subscribed_only,#product_require_enable,#product_enable_coupon").prop("checked", !1), this.$("label.label-switch input.boolean").attr("disabled", !0), this.$("label.label-switch input#product_enabled").attr("disabled", !1), this.$(".swith-div:not(.enabled-attr)").hide(), this.$("#c_rebate").attr("readonly", !1), this.$(".product_weight").hide(), this.$(".p-show-type-6").show(), this.$("li.product-tab-category").show(), this.$(".show-o2o-product").hide(), this.load_product_stock(this.getProductTypeId())
			}, n.prototype.toggleo2oProduct = function() {
				var e;
				return this.$("div.lading_bill").hide(), this.$("div.left-lading").hide(), this.$("li.product-tab-category").hide(), this.$("div.left").show(), this.$("#product_subscribed_only,#product_require_enable,#product_enable_coupon").prop("checked", !1), this.$("label.label-switch input.boolean").attr("disabled", !0), this.$("label.label-switch input#product_enabled").attr("disabled", !1), this.$(".swith-div:not(.enabled-attr)").hide(), this.$(".product_weight").hide(), e = parseFloat(this.$("#p_supply_price").val()), e > 0 && 100 >= e && 100 === parseInt(this.$("#p_market_price").val()) || (this.$("#p_supply_price").val(60), this.$("#p_market_price").val(100), this.$("#c_rebate").val(100), this.$("#p_o2orate").html(parseFloat(this.$("#p_supply_price").val()) / 100)), this.$("#c_rebate").attr("readonly", !0), this.$(".hide-o2o-product,.product_ship_type").hide(), this.$(".show-o2o-product").show(), this.$("#product_buy_limit").attr("readonly", !1), this.$(".norms-tabs[data-target='norms-price-tasks']").show(), this.$("#valid_at-form-group").hide(), this.load_product_stock(this.getProductTypeId())
			}, n.prototype.load_product_stock = function(e) {
				return angular.element("#product-editor .stock-editor").scope() ? angular.element("#product-editor .stock-editor").scope().load_product_stock(e) : setTimeout(function() {
					return angular.element("#product-editor .stock-editor").scope().load_product_stock(e)
				}, 1e3)
			}, n.prototype.CalcDefaultRatio = function() {
				var e, t, i, o, n, r, s;
				if (e = a("#system-default-fee-ratio").prop("checked")) {
					if (a("#c_fee_ratio").prop("disabled", !0), a("#c_sales_fee_ratio").prop("disabled", !0), n = Number(a("#p_supply_price").val()) || 0, r = Number(a("#c_rebate").val()) || 0, 0 == r) return;
					o = r - n, 0 > o && (o = 0), i = o * site.gross_fee_ratio, s = o * site.gross_sales_fee_ratio, a("#c_fee_ratio").val(i.toFixed(2)), a("#c_sales_fee_ratio").val(s.toFixed(2)), a("#p_fee_ratio").val((i / r).toFixed(6)), a("#p_sales_fee_ratio").val((s / r).toFixed(6))
				} else a("#c_fee_ratio").prop("disabled", !1), a("#c_sales_fee_ratio").prop("disabled", !1);
				return t = a("#c_fee_ratio").val() * site.esaoying_fee + a("#c_sales_fee_ratio").val() * site.esaoying_fee, 0 == t ? a("#c_esaoying_fee").text("0") : a("#c_esaoying_fee").text(t.toFixed(2))
			}, n
		}(r.ItemView), this.addInitializer(function() {
			return new h
		})
	}), $(function() {
		return angular.bootstrap(document.getElementById("labels"), ["labelsApp"])
	})
}.call(this);