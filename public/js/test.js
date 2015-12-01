(function (f) {
	(function (o, m, n) {
		if (!m) {
			m = {};
			if (!o) {
				n.fieldSelection = m
			}
		}
		if (o) {
			o.fn.fieldSelection = function () {
				var q;
				var p = arguments;
				this.each(function () {
					if (p.length == 0) {
						q = m.get(this)
					} else {
						if (p.length == 1 && typeof p[0] == "string") {
							q = m.replace(this, p[0])
						} else {
							if (p.length == 2 && typeof p[0] == "number" && typeof p[1] == "number") {
								q = m.set(this, p[0], p[1])
							}
						}
					}
				});
				return q || this
			}
		}
		m.get = function (s) {
			var t = {
					start: 0,
					end: s.value.length,
					length: 0
				},
				q, r, p;
			if (s.selectionStart >= 0) {
				t.start = s.selectionStart;
				t.end = s.selectionEnd;
				t.length = t.end - t.start;
				t.text = s.value.substr(t.start, t.length)
			} else {
				if (s.ownerDocument.selection) {
					q = s.ownerDocument.selection.createRange();
					if (!q) {
						return t
					}
					r = s.createTextRange(), p = r.duplicate();
					r.moveToBookmark(q.getBookmark());
					p.setEndPoint("EndToStart", r);
					t.start = p.text.length;
					t.end = p.text.length + q.text.length;
					t.text = q.text;
					t.length = q.text.length
				}
			}
			return t
		};
		m.set = function (r, q, p) {
			n.setTimeout(function () {
				r.focus();
				if (r.setSelectionRange) {
					r.setSelectionRange(q, p)
				} else {
					if (r.ownerDocument.selection) {
						var s = r.createTextRange();
						s.collapse(true);
						s.moveEnd("character", -1 * r.value.length);
						s.moveEnd("character", p);
						s.moveStart("character", q);
						s.select()
					}
				}
			}, 500)
		};
		m.replace = function (r, u) {
			var w, p, v, s, t, q;
			r.focus();
			if (r.selectionStart >= 0) {
				w = r.selectionStart;
				p = r.selectionEnd;
				s = r.scrollTop;
				t = r.scrollLeft;
				r.value = r.value.substr(0, w) + u + r.value.substr(p);
				v = w + u.length;
				r.selectionStart = v;
				r.selectionEnd = v;
				r.scrollTop = s;
				r.scrollLeft = t
			} else {
				if (r.ownerDocument.selection) {
					q = r.ownerDocument.selection.createRange();
					q.text = u;
					q.move("character", 0);
					q.select()
				} else {
					r.value += u;
					r.scrollTop = 100000
				}
			}
		}
	}(typeof jQuery != "undefined" ? jQuery : null, typeof exports != "undefined" ? exports : null, window));

	function i(m) {
		if (!m) {
			return
		}
		if (m.indexOf(".css") != -1) {
			var n = document.createElement("link");
			n.type = "text/css";
			n.rel = "stylesheet";
			n.href = m
		}
		if (m.indexOf(".js") != -1) {
			var n = document.createElement("script");
			n.type = "text/javascript";
			n.src = m
		}
		document.getElementsByTagName("head")[0].appendChild(n)
	}
	i("/css/sns-plugin.css");
	if (typeof template == "undefined") {
		i("/js/art-template.js")
	}

	function j(m) {
		if (!m) {
			return ""
		}
		return m.replace(/</igm, "&lt;").replace(/>/igm, "&gt;").replace(/\'/igm, "\\'").replace(/"/igm, '\\"')
	}
	var g = {};
	var a = document.createDocumentFragment();
	g.inherits = function (n, m) {
		var o = function () {};
		o.prototype = m.prototype;
		n.prototype = new o();
		n.constructor = n
	};
	g.removeByEC = function (m) {
		a.appendChild(m)
	};

	function e(m) {
		this.config = m || {};
		if (!this.config.triggerClass) {
			return
		}
		this.wrapEl = f("<ul>").addClass("sns-droplist").css("display", "none").appendTo("body");
		this.plugins = [];
		f("body").delegate("." + this.config.triggerClass, "click", f.proxy(this.toggle, this));
		this.wrapEl.delegate("a", "click", f.proxy(this.itemClickHandler, this));
		f("html").click(f.proxy(this.unRender, this))
	}
	e.prototype.addPlugin = function (m) {
		if (!m || !m.title) {} else {
			this.plugins.push(m);
			m.host = this
		}
		return this
	};
	e.prototype.render = function () {
		if (!this.wrapEl.html()) {
			var n = '<% for(var i = 0; i < list.length; i++){ %><li class="<%= list[i].itemClass %>" data-index="<%= i %>"><a href="javascript:void(0)"><i></i><span><%= list[i].title %></span></a></li><% } %>';
			var p = template.compile(n);
			var q = {
				list: this.plugins
			};
			var o = p(q);
			this.wrapEl.html(o)
		}
		var r = f.proxy(function () {
			for (var y = 0; y < this.plugins.length; y++) {
				this.plugins[y].hide && this.plugins[y].hide()
			}
			if (this.config.shareContentInfo.shareType == 2 || this.config.shareContentInfo.shareType == 1 || this.config.shareContentInfo.custom) {
				this.wrapEl.find("[data-index=9]").hide()
			} else {
				this.wrapEl.find("[data-index=9]").show()
			}
			if (this.config.shareContentInfo.custom) {
				this.wrapEl.find("[data-index=2]").hide();
				this.wrapEl.find("[data-index=3]").hide()
			} else {
				this.wrapEl.find("[data-index=2]").show();
				this.wrapEl.find("[data-index=3]").show()
			}
			if (this.config.logInfo.loggedIn) {
				if (this.config.logInfo.accountType == 2 || this.config.logInfo.accountType == 3) {
					this.wrapEl.find("[data-index=0]").hide()
				}
			}
			if (this.config.shareContentInfo.customTypes) {
				var v = this.config.shareContentInfo.customTypes;
				this.wrapEl.find("li").each(function (F) {
					if (f.inArray(F, v) == -1) {
						f(this).hide()
					}
				})
			} else {
				this.wrapEl.find("[data-index=10]").hide()
			}
			if (this.config.shareContentInfo.customRemoteUrls) {
				var x = this.config.shareContentInfo.customRemoteUrls;
				var E = this.wrapEl;
				f.each(x, function (F, G) {
					E.find("[data-index=" + F + "] a").attr("href", G).attr("target", "_blank")
				})
			}
			var u = this.config.shareContentInfo.exclusion;
			if (u && u.length) {
				for (var y = 0; y < u.length; y++) {
					for (var w = 0; w < this.plugins.length; w++) {
						if (this.plugins[w].siteType == u[y]) {
							this.wrapEl.find("li").eq(w).hide()
						}
					}
				}
			}
			this.wrapEl.show();
			var C = this.triggerEl.offset();
			var t = this.wrapEl.height();
			var s = this.wrapEl.width();
			var z = this.triggerEl.height();
			var B = this.triggerEl.width();
			var D, A;
			if (f("body").height() - C.top - z < t) {
				D = C.top - t - 5
			} else {
				D = C.top + z + 5
			}
			if (f("body").width() - C.left < s) {
				A = C.left - s + B
			} else {
				A = C.left
			}
			this.wrapEl.css({
				top: D,
				left: A,
				position: "absolute",
				width: this.wrapEl.width()
			})
		}, this);
		var m = this;
		f.ajax({
			url: "/login.do?operation=check&_jq_filter=0",
			error: function () {
				YD.popTip("出错了，请稍后重试")
			}
		}).done(function (s) {
			m.config.logInfo = s;
			if (!m.config.shareContentInfo.sourceTitle) {
				f.ajax({
					url: "/getSourceTitle.do?_jq_filter=0",
					data: {
						source_uuid: m.config.shareContentInfo.sourceUuid
					},
					success: function (t) {
						if (t.ResultCode == 0) {
							m.config.shareContentInfo.sourceTitle = t.sourceTitle;
							r()
						}
					},
					error: function () {
						YD.popTip("出错了，请稍后重试")
					}
				})
			} else {
				r()
			}
		})
	};
	e.prototype.unRender = function () {
		this.wrapEl.hide()
	};
	e.prototype.toggle = function (o) {
		o && o.preventDefault();
		o && o.stopPropagation();
		this.triggerEl = f(o.target);
		if (!this.triggerEl.hasClass(this.config.triggerClass)) {
			this.triggerEl = this.triggerEl.parents("." + this.config.triggerClass)
		}
		this.config.shareContentInfo = this.triggerEl.data("contentinfo");
		if (this.config.shareContentInfo.initType) {
			for (var m = 0, n = this.plugins.length; m < n; m++) {
				if (this.plugins[m].title == this.config.shareContentInfo.initType) {
					this.plugins[m].toggle();
					break
				}
			}
		} else {
			this[this.wrapEl.css("display") == "none" ? "render" : "unRender"]()
		}
	};
	e.prototype.itemClickHandler = function (o) {
		o && o.stopPropagation();
		var n = f(o.target).parents("li");
		if (n.find("a").attr("href") == "javascript:void(0)") {
			var m = n.data("index");
			this.plugins[m].toggle();
			this.unRender()
		}
	};

	function k() {
		this.wrapEl = f("<div>").addClass("sns-overlay");
		this.wrapEl.data("rendered", false);
		this.wrapEl.data("shown", false);
		this.wrapEl.delegate(".J_Close", "click", f.proxy(this.toggle, this))
	}
	k.prototype.show = function () {
		var m = this;
		if (this.siteType === 11) {
			m.openLayer({})
		} else {
			f.ajax({
				url: "/login.do?operation=check&_jq_filter=0",
				error: function () {
					YD.popTip("出错了，请稍后重试")
				}
			}).done(function (n) {
				if (n.loggedIn) {
					m.openLayer(n)
				} else {
					if (typeof yueduLoginModule == "undefined") {
						login163()
					} else {
						yueduLoginModule.open()
					}
				}
			})
		}
	};
	k.prototype.openLayer = function (m) {
		var q, o = this;
		if ((!o.wrapEl.data("rendered") && o.render) || o.forceFresh) {
			q = o.render(m)
		}
		if (q !== false) {
			o.wrapEl.appendTo("body");
			var n = parseInt((f(window).height() - o.wrapEl.outerHeight(true)) / 2);
			var p = parseInt((f(window).width() - o.wrapEl.outerWidth(true)) / 2);
			n += document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop;
			o.wrapEl.show().css({
				top: n < 0 ? 0 : n,
				left: p < 0 ? 0 : p
			});
			o.wrapEl.data("rendered", true);
			o.wrapEl.data("shown", true)
		}
	};
	k.prototype.hide = function () {
		this.wrapEl.data("shown", false);
		g.removeByEC(this.wrapEl[0])
	};
	k.prototype.toggle = function (m) {
		m && m.preventDefault();
		this[this.wrapEl.data("shown") ? "hide" : "show"]()
	};

	function c() {
		k.call(this);
		this.title = "微信";
		this.forceFresh = true;
		this.itemClass = "weixin";
		this.siteType = 11;
		this.contentUrl = "";
		this.crtUrl = ""
	}
	g.inherits(c, k);
	c.prototype.render = function () {
		var n = "";
		if (this.host.config.shareContentInfo.shareType == 0) {
			n = "utm_source=newsdetailshare&utm_medium=weixin"
		} else {
			if (this.host.config.shareContentInfo.shareType == 1) {
				n = "utm_source=newssourceshare&utm_medium=weixin"
			} else {
				if (this.host.config.shareContentInfo.shareType == 2) {
					n = "utm_source=bookshare&utm_medium=2code&utm_campaign=position_all"
				}
			}
		}
		this.crtUrl = this.host.config.shareContentInfo.url;
		if (n != "") {
			if (this.crtUrl.indexOf("?") >= 0) {
				this.crtUrl += "&"
			} else {
				this.crtUrl += "?"
			}
			this.crtUrl += n
		}
		this.contentUrl = "/qr.do?content=" + encodeURIComponent(this.crtUrl) + "&width=180&height=180";
		var m = '   <div class="hd"><h4 class="t-weixin"><i></i>分享到' + this.title + '</h4><a href="#" class="close J_Close">关闭</a></div><div class="bd"><div class="wxqr"><img src="' + this.contentUrl + '"/></div><p class="wxtip">用微信“扫一扫”，打开网页后点击屏幕右上角“...”</p><p class="wxtip">发送给朋友或分享到朋友圈</p></div>';
		this.wrapEl.html(m).appendTo("body")
	};

	function b() {
		k.call(this);
		this.title = "阅读圈";
		this.forceFresh = true;
		this.itemClass = "yuedu-circle";
		this.shareUrl = "/snsFeed.do?_jq_filter=0";
		this.siteType = 8;
		this.wrapEl.delegate(".J_Send", "click", f.proxy(this.sendHandler, this)).delegate("textarea", "keyup", f.proxy(this.textareaInputHandler, this))
	}
	g.inherits(b, k);
	b.prototype.render = function () {
		if (typeof _gaq != "undefined" && _gaq.push) {
			if (this.host.config.shareContentInfo.origin && this.host.config.shareContentInfo.origin.length) {
				var n = this.host.config.shareContentInfo.origin;
				if (n[0] === "booksource" || n[0] === "bookshelf" || n[0] === "tradedetail") {
					_gaq.push(["_trackEvent", n[0], "source_share_yueduquan", this.host.config.shareContentInfo.sourceUuid])
				} else {
					if (n[0] === "newsreader") {
						var q, o;
						switch (n[1]) {
						case 0:
							q = "news";
							o = this.host.config.shareContentInfo.articleUuid;
							break;
						case 1:
							q = "news_bottom";
							o = this.host.config.shareContentInfo.articleUuid;
							break;
						case 2:
							q = "source";
							o = this.host.config.shareContentInfo.sourceUuid;
							break
						}
						_gaq.push(["_trackEvent", n[0], q + "_share_yueduquan", o])
					}
				}
			} else {
				if (this.host.config.shareContentInfo.shareType == 0) {
					_gaq.push(["_trackEvent", "newsreader", "news_share", "newsreader_home", "yueduquan"])
				} else {
					if (this.host.config.shareContentInfo.shareType == 1) {
						_gaq.push(["_trackEvent", "newsreader", "source_share", "newsreader_detail", "yueduquan"])
					}
				}
			}
		}
		var p = this.host.config.shareContentInfo.articleUuid || this.host.config.shareContentInfo.sourceUuid;
		var m = '   <div class="hd"><h4 class="t-yuedu-circle"><i></i>分享到' + this.title + '</h4><a href="#" class="close J_Close">关闭</a></div><div class="bd"><form><div class="yuedu-circle-box"><textarea name="comment"></textarea><label>点击发送，直接分享</label></div><input type="hidden" name="operation" value="forward" /><input type="hidden" name="shareType" value="' + this.host.config.shareContentInfo.shareType + '" /><input type="hidden" name="subjectId" value="' + p + '" /></form></div><div class="ft"><p>还可输入<span>500</span>字</p><a href="#" class="btn J_Send">发送</a></div>';
		this.wrapEl.html(m).appendTo("body");
		this.tipLabel = this.wrapEl.find("label");
		this.wordCount = this.wrapEl.find("span");
		this.wrapEl.find("textarea").fieldSelection(0, 0)
	};
	b.prototype.textareaInputHandler = function (m) {
		var o = m.target;
		if (o.value.length) {
			this.tipLabel.fadeOut(100)
		} else {
			this.tipLabel.fadeIn(100)
		}
		var n = 500 - o.value.length;
		if (n >= 0) {
			this.wordCount.css("color", "#999");
			this.wordCountOver = false
		} else {
			this.wordCount.css("color", "#f00");
			this.wordCountOver = true
		}
		this.wordCount.text(n)
	};
	b.prototype.sendHandler = function (o) {
		o && o.preventDefault();
		var n = this;
		var m = f(o.target);
		if (this.isBlocking) {
			return
		}
		if (this.wordCountOver) {
			YD.popTip("字数超过限制");
			return
		}
		this.isBlocking = true;
		m.addClass("dis-btn").text("发送中");
		f.ajax({
			url: this.shareUrl,
			type: "POST",
			dataType: "json",
			data: this.wrapEl.find("form").serializeArray(),
			success: function (p) {
				if (p.resultCode == 0) {
					YD.popTip("分享成功");
					n.isBlocking = false;
					n.hide();
					n.wrapEl.find("textarea").val("").trigger("keyup");
					m.removeClass("dis-btn").text("发送")
				}
			},
			error: function () {
				YD.popTip("出错了，请稍后重试");
				n.isBlocking = false;
				m.removeClass("dis-btn").text("发送")
			}
		})
	};

	function h() {
		k.call(this);
		this.title = "私信";
		this.itemClass = "i-message";
		this.friendsUrl = "/snsRelation.do?_jq_filter=0";
		this.shareUrl = "/snsMessage.do?_jq_filter=0";
		this.friendsCheckedLength = 0;
		this.forceFresh = true;
		this.siteType = 9;
		var m = this;
		this.wrapEl.delegate(".J_FriendsList li", "click", f.proxy(this.checkPretty, this)).delegate(".J_FriendsResult i", "click", f.proxy(this.deleteFriendsItem, this)).delegate(".J_FriendsFilterInput", "keyup", f.proxy(this.friendsFilterHandler, this)).delegate(".J_NextStep", "click", f.proxy(this.renderToSecondStep, this)).delegate(".J_BackToStepOne", "click", f.proxy(this.renderBackToFristStep, this)).delegate(".J_ContentArea", "keyup", f.proxy(this.textareaInputHandler, this)).delegate(".J_Send", "click", f.proxy(this.doneHandler, this))
	}
	g.inherits(h, k);
	h.prototype.render = function () {
		if (typeof _gaq != "undefined" && _gaq.push) {
			if (this.host.config.shareContentInfo.origin && this.host.config.shareContentInfo.origin.length) {
				var n = this.host.config.shareContentInfo.origin;
				if (n[0] === "booksource" || n[0] === "bookshelf" || n[0] === "tradedetail") {
					_gaq.push(["_trackEvent", n[0], "source_share_sixin", this.host.config.shareContentInfo.sourceUuid])
				} else {
					if (n[0] === "newsreader") {
						var p, o;
						switch (n[1]) {
						case 0:
							p = "news";
							o = this.host.config.shareContentInfo.articleUuid;
							break;
						case 1:
							p = "news_bottom";
							o = this.host.config.shareContentInfo.articleUuid;
							break;
						case 2:
							p = "source";
							o = this.host.config.shareContentInfo.sourceUuid;
							break
						}
						_gaq.push(["_trackEvent", n[0], p + "_share_sixin", o])
					}
				}
			} else {
				if (this.host.config.shareContentInfo.shareType == 0) {
					_gaq.push(["_trackEvent", "newsreader", "news_share", "newsreader_home", "sixin"])
				} else {
					if (this.host.config.shareContentInfo.shareType == 1) {
						_gaq.push(["_trackEvent", "newsreader", "source_share", "newsreader_detail", "sixin"])
					}
				}
			}
		}
		if (this.stepThreeEl) {
			this.stepThreeEl.hide();
			if (this.stepTwoEl.css("display") == "none") {
				this.stepOneEl.show()
			}
			return
		}
		if (!this.stepOneEl) {
			var m = '<div class="hd"><h4 class="t-i-message"><i></i>' + this.title + '分享</h4><a href="#" class="close J_Close">关闭</a></div><div class="bd"><dl class="friends"><dt>选择好友</dt><dd><div class="friends-filter-input"><input type="text" class="J_FriendsFilterInput" value="" /><label>输入昵称筛选好友</label></div><ul class="friends-list J_FriendsList"></ul><ul class="friends-result J_FriendsResult"></ul></dd></dl></div><div class="ft"><p class="J_MaxFriendsLengthTip">最多可同时分享10个好友</p><a href="#" class="btn J_NextStep">下一步</a></div>';
			this.stepOneEl = f("<div>").addClass("J_FriendsStepOne").html(m);
			this.wrapEl.empty().append(this.stepOneEl).appendTo("body");
			this.friendsListEl = this.wrapEl.find(".J_FriendsList");
			this.friendsReusltEl = this.wrapEl.find(".J_FriendsResult");
			this.maxFriendsLengthTip = this.wrapEl.find(".J_MaxFriendsLengthTip");
			this.renderFriendsList()
		}
	};
	h.prototype.renderFriendsList = function () {
		var m = this;
		f.ajax({
			url: this.friendsUrl,
			data: {
				operation: "getFriends"
			},
			dataType: "json",
			success: function (n) {
				if (n.resultCode == 0) {
					var o = '<% for(var i = 0; i < friends.length; i++){ %><% if(!friends[i].isFiltered){ %><li class="<% if(i%2==1){ %>eq<% } %>"><input data-nickname="<%= friends[i].nickName %>" name="userid" value="<%= friends[i].userId %>" type="checkbox" /><%= friends[i].nickName %></li><% } %><% } %>';
					var q = template.compile(o);
					var p = q(n);
					m.friendsListEl.html(p)
				}
			},
			error: function () {
				YD.popTip("获取好友列表失败，请稍后重试");
				m.hide();
				m.stepOneEl.remove()
			}
		})
	};
	h.prototype.checkPretty = function (r) {
		var s = r.target;
		var p;
		if (s.nodeName == "LI") {
			p = f(s).find("input")
		} else {
			p = f(s).parents("li").find("input")
		}
		var o = !p.prop("checked");
		o = s.nodeName == "INPUT" ? !o : o;
		if (o) {
			if (this.friendsCheckedLength >= 10) {
				r.preventDefault();
				this.maxFriendsLengthTip.css("color", "#c00")
			} else {
				p.prop("checked", o);
				var q = f("<li>").html("<span></span><i></i>").attr("data-userid", p.val()).attr("data-nickname", p.data("nickname"));
				var m = document.createTextNode("");
				var n = p.data("nickname");
				m.nodeValue = n.length < 15 ? n : n.substring(0, 15) + "...";
				q.find("span").append(m);
				this.friendsReusltEl.append(q);
				this.friendsCheckedLength++
			}
		} else {
			this.maxFriendsLengthTip.css("color", "#666");
			p.prop("checked", o);
			this.friendsReusltEl.find("li[data-userid=" + p.val() + "]").remove();
			this.friendsCheckedLength--
		}
	};
	h.prototype.deleteFriendsItem = function (o) {
		o && o.preventDefault();
		var n = f(o.target).parents("li");
		var m = n.data("userid");
		n.remove();
		this.friendsListEl.find("input[value=" + m + "]").prop("checked", false);
		this.friendsCheckedLength--
	};
	h.prototype.friendsFilterHandler = function (o) {
		var p = f(o.target);
		var n = f.trim(p.val());
		var m = this;
		if (n.length) {
			p.next().fadeOut(100);
			this.filterTimer && window.clearTimeout(this.filterTimer);
			this.filterTimer = window.setTimeout(function () {
				m.friendsListEl.find("input").each(function () {
					if (f(this).data("nickname").toString().indexOf(n) == -1) {
						f(this).parent().hide()
					} else {
						f(this).parent().show()
					}
				})
			}, 200)
		} else {
			p.next().fadeIn(100);
			this.friendsListEl.find("li").show()
		}
	};
	h.prototype.renderToSecondStep = function (q) {
		q && q.preventDefault();
		var r = [];
		this.friendsReusltEl.find("li").each(function () {
			r.push({
				userid: f(this).data("userid"),
				nickname: f(this).data("nickname")
			})
		});
		if (!r.length) {
			YD.popTip("没有选择好友");
			return
		}
		this.stepOneEl.hide();
		if (this.stepTwoEl) {
			this.stepTwoEl.appendTo(this.wrapEl).show()
		} else {
			var m = '<div class="hd"><h4 class="t-i-message"><i></i>' + this.title + '分享</h4><a href="#" class="close J_Close">关闭</a></div><div class="bd"><dl class="friends"><dt>分享好友<a href="#" class="J_BackToStepOne">重新选择好友&gt;</a></dt><dd><form><div class="friends-to-share J_FriendsToShare"></div><div class="textarea-box"><textarea class="J_ContentArea" name="content"></textarea><label>说点什么...</label></div><input type="hidden" name="operation" value="sendb" /><input type="hidden" name="targets" value="" /><input type="hidden" name="type" /><input type="hidden" name="subjectId" /></form></dd></dl></div><div class="ft"><p>还可输入<span>500</span>字</p><a href="#" class="btn J_Send">确认</a></div>';
			this.stepTwoEl = f("<div>").addClass("J_FriendsStepTwo").html(m);
			this.wrapEl.append(this.stepTwoEl);
			this.tipLabel = this.stepTwoEl.find("label");
			this.wordCount = this.stepTwoEl.find("span")
		}
		var s = "";
		var p = "{";
		for (var o = 0; o < r.length; o++) {
			s += (r[o].nickname + ";");
			p += ('"' + r[o].userid + '":');
			var n = r[o].nickname.replace('"', '\\"');
			n = n.replace(":", "\\:");
			n = n.replace(",", "\\,");
			p += ('"' + n + '",')
		}
		p = p.substring(0, p.length - 1) + "}";
		this.wrapEl.find(".J_FriendsToShare").text(s);
		this.wrapEl.find("input[name=targets]").val(p)
	};
	h.prototype.textareaInputHandler = function (m) {
		var o = m.target;
		if (o.value.length) {
			this.tipLabel.fadeOut(100)
		} else {
			this.tipLabel.fadeIn(100)
		}
		var n = 500 - o.value.length;
		if (n >= 0) {
			this.wordCount.css("color", "#999");
			this.wordCountOver = false
		} else {
			this.wordCount.css("color", "#f00");
			this.wordCountOver = true
		}
		this.wordCount.text(n)
	};
	h.prototype.renderBackToFristStep = function (m) {
		m && m.preventDefault();
		this.stepTwoEl.hide();
		this.stepOneEl.show()
	};
	h.prototype.resetUserData = function () {
		this.stepOneEl.find(".J_FriendsList input").prop("checked", false);
		this.stepOneEl.find(".J_FriendsResult").html("");
		this.stepTwoEl.find(".J_FriendsToShare").html("")
	};
	h.prototype.doneHandler = function (p) {
		p && p.preventDefault();
		var n = this;
		var m = f(p.target);
		if (this.isBlocking) {
			return
		}
		if (this.wordCountOver) {
			YD.popTip("字数超过限制");
			return
		}
		this.isBlocking = true;
		m.addClass("dis-btn").text("发送中");
		var o = this.wrapEl.find("form");
		o.find("[name=type]").val(this.host.config.shareContentInfo.shareType);
		o.find("[name=subjectId]").val(this.host.config.shareContentInfo.articleUuid || this.host.config.shareContentInfo.sourceUuid);
		f.ajax({
			url: this.shareUrl,
			type: "POST",
			dataType: "json",
			data: this.wrapEl.find("form").serializeArray(),
			success: function (q) {
				var t = "<ul><li>• 对方设置隐私，人家不鸟你。</li><li>• 用户被外星人劫持了。</li><li>• 系统扑街了。 </li></ul>";
				n.stepTwoEl.hide();
				if (n.stepThreeEl) {
					n.stepThreeEl.show()
				} else {
					var r = '<div class="hd"><h4 class="t-i-message"><i></i>' + n.title + '分享</h4><a href="#" class="close J_Close">关闭</a></div><div class="bd"></div><div class="ft"><a href="#" class="btn J_Close">我知道了</a></div>';
					n.stepThreeEl = f("<div>").addClass("J_FriendsStepThree").html(r).appendTo(n.wrapEl)
				}
				switch (q.resultCode) {
				case 0:
					if (!q.failNum) {
						YD.popTip("私信分享成功");
						n.hide();
						n.wrapEl.find(".J_ContentArea").val("").trigger("keyup")
					} else {
						var u = [];
						for (var s in q.failReason) {
							u.push(j(s))
						}
						var r = '<div class="success-tip">部分好友私信分享成功</div><div class="fail-tip"><p>' + u.join("、") + "无法接受您的私信分享,可能原因：</p>" + t + "</div>";
						n.stepThreeEl.find(".bd").html(r)
					}
					break;
				default:
					var r = '<div class="fail-tip"><p>私信分享失败，可能原因：</p>' + t + "</div>";
					n.stepThreeEl.find(".bd").html(r);
					break
				}
				n.isBlocking = false;
				m.removeClass("dis-btn").text("发送");
				n.resetUserData()
			},
			error: function () {
				YD.popTip("网络出错了，请稍后重试");
				n.isBlocking = false;
				m.removeClass("dis-btn").text("发送")
			}
		})
	};

	function l(m) {
		this.wrapEl = f("<div>").addClass("sns-overlay");
		this.title = m.title || "新浪微博";
		this.itemClass = m.itemClass || "sina-weibo";
		this.getFriendsUrl = m.getFriendsUrl || "/getFriendsUrl.do?_jq_filter=0";
		this.forceFresh = m.forceFresh || true;
		this.maxWordCount = m.maxWordCount || 140;
		this.atFriends = m.atFriends;
		this.shareUrl = m.shareUrl || "/weibo.do?_jq_filter=0";
		this.siteType = m.siteType || "1";
		this.imgSupport = m.imgSupport || false;
		this.friendsCheckedLength = 0;
		this.imageUrlInput;
		this.imageUrlTick;
		this.imageUrlShow = 1;
		this.wrapEl.data("rendered", false).data("shown", false).delegate(".J_Close", "click", f.proxy(this.toggle, this)).delegate(".J_CancelToStepOne", "click", f.proxy(this.friendsSelectedCancelHandler, this)).delegate(".J_FriendsList li", "click", f.proxy(this.checkPretty, this)).delegate(".J_FriendsResult i", "click", f.proxy(this.deleteFriendsItem, this)).delegate(".J_FriendsFilterInput", "keyup", f.proxy(this.friendsFilterHandler, this)).delegate(".J_ContentArea", "keyup", f.proxy(this.textareaInputHandler, this)).delegate(".J_ToAtFriends", "click", f.proxy(this.renderToFriendsList, this)).delegate(".J_FriendsSelectedOk", "click", f.proxy(this.friendsSelectedOkHandler, this)).delegate(".J_Send", "click", f.proxy(this.sendHandler, this)).delegate(".J_GoAuth", "click", f.proxy(this.authorizeHandler, this)).delegate(".J_GoBindCellPhone", "click", f.proxy(this.cellPhoneBindingHandler, this)).delegate(".J_ImgShareBtn", "click", f.proxy(this.controlImageShareBtn, this))
	}
	l.prototype.errorMsg = ["重复发表相同内容", "网络连接问题", "操作频率太快", "敏感字符", "认证失败", "其他复杂原因"];
	l.prototype.show = function () {
		((!this.wrapEl.data("rendered") && this.render) || this.forceFresh) && this.render();
		if (typeof _gaq != "undefined" && _gaq.push) {
			function s(y, x, w, v) {
				switch (y) {
				case 1:
					_gaq.push(["_trackEvent", x, w + "_share_sinaweb", v]);
					break;
				case 2:
					_gaq.push(["_trackEvent", x, w + "_share_163web", v]);
					break;
				case 3:
					_gaq.push(["_trackEvent", x, w + "_share_sohuweb", v]);
					break;
				case 4:
					_gaq.push(["_trackEvent", x, w + "_share_qqweb", v]);
					break;
				case 6:
					_gaq.push(["_trackEvent", x, w + "_share_renren", v]);
					break
				}
			}
			if (this.host.config.shareContentInfo.origin && this.host.config.shareContentInfo.origin.length) {
				var t = this.host.config.shareContentInfo.origin;
				if (t[0] === "booksource" || t[0] === "bookshelf" || t[0] === "tradedetail") {
					s(this.siteType, t[0], "source", this.shareContentInfo.sourceUuid)
				} else {
					if (t[0] === "newsreader") {
						var r, m;
						switch (t[1]) {
						case 0:
							r = "news";
							m = this.shareContentInfo.articleUuid;
							break;
						case 1:
							r = "news_bottom";
							m = this.shareContentInfo.articleUuid;
							break;
						case 2:
							r = "source";
							m = this.shareContentInfo.sourceUuid;
							break
						}
						s(this.siteType, t[0], r, m)
					}
				}
			} else {
				var q = "",
					o = "";
				if (this.host.config.shareContentInfo.shareType == 0) {
					q = "news_share";
					o = "newsreader_home"
				} else {
					if (this.host.config.shareContentInfo.shareType == 1) {
						q = "source_share";
						o = "newsreader_detail"
					}
				}
				if (q && o) {
					switch (this.siteType) {
					case 1:
						_gaq.push(["_trackEvent", "newsreader", q, o, "sinaweb"]);
						break;
					case 2:
						_gaq.push(["_trackEvent", "newsreader", q, o, "163web"]);
						break;
					case 3:
						_gaq.push(["_trackEvent", "newsreader", q, o, "sohuweb"]);
						break;
					case 4:
						_gaq.push(["_trackEvent", "newsreader", q, o, "qqweb"]);
						break;
					case 6:
						_gaq.push(["_trackEvent", "newsreader", q, o, "renren"]);
						break
					}
				}
			}
		}
		var p = parseInt((f(window).height() - this.wrapEl.outerHeight(true)) / 2);
		var n = parseInt((f(window).width() - this.wrapEl.outerWidth(true)) / 2);
		p += document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop;
		this.wrapEl.show().css({
			top: p < 0 ? 0 : p,
			left: n < 0 ? 0 : n
		});
		var u = this.wrapEl.find(".J_ImgShareBtn");
		this.imgProcess(u);
		this.wrapEl.data("rendered", true);
		this.wrapEl.data("shown", true)
	};
	l.prototype.hide = function () {
		this.wrapEl.hide();
		this.wrapEl.data("shown", false)
	};
	l.prototype.toggle = function (o) {
		o && o.preventDefault();
		var n = this;
		if (this.wrapEl.data("shown")) {
			this.hide()
		} else {
			if (this.siteType == 7) {
				f.ajax({
					url: "/login.do?operation=check&_jq_filter=0",
					error: function () {
						YD.popTip("出错了，请稍后重试")
					}
				}).done(function (q) {
					if (q.loggedIn) {
						n.shareContentInfo = n.host.config.shareContentInfo || {};
						n.shareContentInfo.shortUrl = n.shareContentInfo.url;
						n.shareContentInfo.selfUserName = q.userName;
						n.shareContentInfo.cellphoneNumber = q.phone;
						if (q.accountType == 0) {
							if (q.phoneMailBinded) {
								n.checkAppInstalledForYixin()
							} else {
								n.show();
								n.wrapEl.find(".bd").empty().html('<p class="need-auth">您的网易邮箱还没绑定手机号，请先去绑定</p>');
								n.wrapEl.find(".ft").empty().html('<a class="J_Close dis-btn">取消</a><a class="J_GoBindCellPhone btn">绑定</a>')
							}
						} else {
							if (q.accountType == 1) {
								n.checkAppInstalledForYixin()
							}
						}
					} else {
						if (typeof yueduLoginModule == "undefined") {
							login163()
						} else {
							yueduLoginModule.open("", [null, false, true])
						}
					}
				})
			} else {
				var m = {
					operation: "checkAuthorization",
					site: this.siteType,
					getShortLink: this.host.config.shareContentInfo.textType == -1 ? "false" : "true",
					url: this.host.config.shareContentInfo.url,
					getSource: this.host.config.shareContentInfo.textType == -1 ? "false" : "true",
					sourceUuid: this.host.config.shareContentInfo.sourceUuid
				};
				var p = this.host.config.shareContentInfo.textType;
				if (p == 6 || p == 7) {
					m.url += "?apresent=1"
				}
				f.ajax({
					url: this.shareUrl,
					data: m,
					type: "POST",
					dataType: "json",
					success: function (q) {
						switch (q.resultCode) {
						case 0:
							if (q.isAuthorized) {
								n.shareContentInfo = n.host.config.shareContentInfo || {};
								n.shareContentInfo.shortUrl = q.shortUrl || "";
								n.shareContentInfo.sourceTitle = q.sourceTitle;
								n.shareContentInfo.selfUserName = q.userName;
								n.show()
							} else {
								n.show();
								n.wrapEl.find(".bd").empty().html('<p class="need-auth">您还没有绑定' + n.title + "，请先去绑定</p>");
								n.wrapEl.find(".ft").empty().html('<a class="J_Close dis-btn">取消</a><a class="J_GoAuth btn">绑定</a>')
							}
							break;
						case -999:
							if (typeof yueduLoginModule == "undefined") {
								login163()
							} else {
								yueduLoginModule.open()
							}
							break;
						default:
							YD.popTip("网络出错了，请稍后重试");
							break
						}
					},
					error: function () {
						YD.popTip("网络出错了，请稍后重试")
					}
				})
			}
		}
	};
	l.prototype.imgProcess = function (o) {
		var m = 75,
			q = 75;
		var p = o,
			n = p.width(),
			r = p.height(),
			s = n && n / r;
		if (s < 1) {
			p.height(105);
			p.width(105 * n / r);
			this.sendBoxEl.find(".J_ContentArea").width(320)
		} else {
			if (s > 1) {
				p.width(100);
				p.height(100 * r / n);
				this.sendBoxEl.find(".J_ContentArea").width(350)
			} else {
				p.width(75);
				p.height(75);
				this.sendBoxEl.find(".J_ContentArea").width(370)
			}
		}
	};
	l.prototype.controlImageShare = function () {
		this.imageUrlInput = this.sendBoxEl.find('input[name="imageUrl"]');
		this.imageUrlTick = this.sendBoxEl.find(".img-box b")
	};
	l.prototype.controlImageShareBtn = function () {
		if (this.imageUrlShow) {
			YD.popTip("再次点击，加入图片分享");
			this.imageUrlShow = 0
		}
		if (this.imageUrlInput.val().length) {
			this.imageUrlInput.val("")
		} else {
			this.imageUrlInput.val(this.shareContentInfo.imageUrl)
		}
		this.imageUrlTick.toggle()
	};
	l.prototype.render = function () {
		this.sendBoxEl && this.sendBoxEl.remove();
		this.atFriendsEl && this.atFriendsEl.hide();
		var w = this;
		var n = "";
		this.shareContentInfo = this.shareContentInfo || this.host.config.shareContentInfo || {};
		var t = this.shareContentInfo.textType || 0;
		var p = this.shareContentInfo.articleTitle || this.shareContentInfo.sourceTitle;
		var u = this.shareContentInfo.subjectId || this.shareContentInfo.articleUuid || this.shareContentInfo.sourceUuid;
		var m = this.shareContentInfo.sourceUuid;
		var r = this.shareContentInfo.shortUrl || this.shareContentInfo.url || "";
		var v = this.shareContentInfo.imageUrl || "";
		var o = this.shareContentInfo.imageDescription || "";
		var q = this.shareContentInfo.cellphoneNumber || "";
		var s = '<div class="hd"><h4 class="t-' + this.itemClass + '"><i></i>' + this.title + '分享</h4><a href="#" class="close J_Close">关闭</a></div><div class="bd"><form><div class="textarea-box"><textarea class="J_ContentArea" name="message"></textarea><div class="img-box"><img class="J_ImgShareBtn" src="' + v + '" /><b></b></div><a href="#" class="at-friends J_ToAtFriends" style="display:none;">@' + this.title + '好友</a></div><input type="hidden" name="site" value="' + this.siteType + '" /><input type="hidden" name="sourceUuid" value="' + m + '" /><input type="hidden" name="subjectId" value="' + u + '"/><input type="hidden" name="title" value="' + j(p) + '"/><input type="hidden" name="shareType" value="' + this.shareContentInfo.shareType + '" /><input type="hidden" name="url" value="' + r + '" /><input type="hidden" name="imageUrl" value="' + v + '" /><input type="hidden" name="imageDescription" value="' + o + '" /><input type="hidden" name="operation" value="publishSingle" /></form></div><div class="ft"><p>还可输入<span class="J_WordCount">' + this.maxWordCount + '</span>字</p><a href="#" class="btn J_Send">发送</a></div>';
		this.sendBoxEl = f("<div>").addClass("J_SendBox").html(s);
		this.wrapEl.append(this.sendBoxEl).appendTo("body");
		if (v.length > 0 && this.imgSupport) {
			this.controlImageShare()
		} else {
			this.sendBoxEl.find(".img-box").hide()
		}
		this.wordCount = this.sendBoxEl.find(".J_WordCount");
		this.contentArea = this.sendBoxEl.find(".J_ContentArea");
		if (this.atFriends) {
			this.sendBoxEl.find(".J_ToAtFriends").show()
		}
		if (this.siteType == 7) {
			f('<span class="cellphone-yixin">绑定的手机尾号：<strong>' + q.substr(-3) + '</strong>|<a href="#" class="J_GoBindCellPhone">我要修改</a></span>').appendTo(this.wrapEl.find(".ft p"));
			f('<label class="J_TipLabel">点击发送，直接分享</label>').insertAfter(this.wrapEl.find(".J_ContentArea"))
		} else {
			if (this.shareContentInfo.custom) {
				n = "//“" + this.shareContentInfo.articleTitle + "”。网易云阅读支持rss等个性订阅， 强烈推荐~"
			} else {
				switch (t) {
				case 0:
					n = "//正在看《" + this.shareContentInfo.sourceTitle + "》的“" + this.shareContentInfo.articleTitle + "”。来自网易云阅读";
					break;
				case 1:
					n = "//正在看《" + this.shareContentInfo.sourceTitle + "》。来自网易云阅读";
					break;
				case 2:
					n = "//正在看《" + this.shareContentInfo.sourceTitle + "》。来自网易云阅读";
					break;
				case 3:
					n = "//我打赏了作品《" + this.shareContentInfo.sourceTitle + "》，好书需要分享，阅读丰富生活。";
					break;
				case 4:
					n = "//我给作品《" + this.shareContentInfo.sourceTitle + "》投了一张月票，好书需要分享，阅读丰富生活。";
					break;
				case 5:
					n = "//我正在 @网易云阅读 看《" + this.shareContentInfo.sourceTitle + "》，现在读可以免费哦。";
					break;
				case 6:
					n = "//我在 @网易云阅读 看到《" + this.shareContentInfo.sourceTitle + "》写的不错，免费送一些写的VIP章节给大家，快来领取跟我一起看吧。";
					break;
				case 7:
					n = "//我在 @网易云阅读 看到《" + this.shareContentInfo.sourceTitle + "》写的不错，有读者免费赠送了VIP章节给大家，快来领取一起看吧。";
					break;
				case -1:
					n = this.shareContentInfo.textCustomTemplate;
				default:
					break
				}
			}
			if (t != -1) {
				n += this.shareContentInfo.shortUrl
			}
			this.contentArea.val(n);
			this.defaultContentStr = n
		}
		this.contentArea.fieldSelection(0, 0);
		this.refreshWordCount();
		this.clearFriendsCheckedResult()
	};
	l.prototype.renderToFriendsList = function (n) {
		n && n.preventDefault();
		this.sendBoxEl.hide();
		if (this.atFriendsEl) {
			this.atFriendsEl.show()
		} else {
			var m = '<div class="hd"><h4 class="t-' + this.itemClass + '"><i></i>@' + this.title + '好友</h4><a href="#" class="close J_CancelToStepOne">关闭</a></div><div class="bd"><div class="friends"><div class="friends-filter-input"><input type="text" class="J_FriendsFilterInput" value="" /><label>输入昵称筛选好友</label></div><ul class="friends-list J_FriendsList"></ul><ul class="friends-result J_FriendsResult"></ul></div></div><div class="ft"><p>已选择好友<span class="J_FriendsSelectedCount">0</span>位</p><a href="#" class="btn J_FriendsSelectedOk">确定</a></div>';
			this.atFriendsEl = f("<div>").addClass("J_AtFriends").html(m);
			this.friendsListEl = this.atFriendsEl.find(".J_FriendsList");
			this.friendsReusltEl = this.atFriendsEl.find(".J_FriendsResult");
			this.friendsSelectedCountEl = this.atFriendsEl.find(".J_FriendsSelectedCount");
			this.wrapEl.append(this.atFriendsEl);
			this.renderFriendsList()
		}
	};
	l.prototype.renderFriendsList = function () {
		var m = this;
		f.ajax({
			url: this.shareUrl,
			data: {
				operation: "friends",
				site: this.siteType
			},
			dataType: "json",
			success: function (n) {
				if (n.resultCode == 0 && n.data.successful) {
					var o = '<% for(var i = 0; i < friends.length; i++){ %><% if(!friends[i].isFiltered){ %><li class="<% if(i%2==1){ %>eq<% } %>"><input data-symbolicname="<%= friends[i].symbolicName %>" data-nickname="<%= friends[i].nickName %>" name="userid" value="<%= friends[i].userId %>" type="checkbox" /><%= friends[i].nickName %></li><% } %><% } %>';
					var q = template.compile(o);
					var p = q(n.data);
					m.friendsListEl.html(p)
				}
			},
			error: function () {
				YD.popTip("出错了，请稍后重试");
				m.atFriendsEl.remove();
				m.sendBoxEl.show()
			}
		})
	};
	l.prototype.checkPretty = function (r) {
		var s = r.target;
		var p;
		if (s.nodeName == "LI") {
			p = f(s).find("input")
		} else {
			p = f(s).parents("li").find("input")
		}
		var o = !p.prop("checked");
		o = s.nodeName == "INPUT" ? !o : o;
		if (o) {
			p.prop("checked", o);
			var q = f("<li>").html("<span></span><i></i>").attr("data-userid", p.val()).attr("data-nickname", p.data("nickname")).attr("data-symbolicname", p.data("symbolicname"));
			var m = document.createTextNode("");
			var n = p.data("nickname");
			m.nodeValue = n.length < 15 ? n : n.substring(0, 15) + "...";
			q.find("span").append(m);
			this.friendsReusltEl.append(q);
			this.friendsCheckedLength++
		} else {
			p.prop("checked", o);
			this.friendsReusltEl.find("li[data-userid=" + p.val() + "]").remove();
			this.friendsCheckedLength--
		}
		this.friendsSelectedCountEl.text(this.friendsCheckedLength)
	};
	l.prototype.deleteFriendsItem = function (o) {
		o && o.preventDefault();
		var n = f(o.target).parents("li");
		var m = n.data("userid");
		n.remove();
		this.friendsListEl.find("input[value=" + m + "]").prop("checked", false);
		this.friendsCheckedLength--;
		this.friendsSelectedCountEl.text(this.friendsCheckedLength)
	};
	l.prototype.clearFriendsCheckedResult = function () {
		this.friendsListEl && this.friendsListEl.find("input").prop("checked", false);
		this.friendsReusltEl && this.friendsReusltEl.empty();
		this.friendsSelectedCountEl && this.friendsSelectedCountEl.text(0);
		this.friendsCheckedLength && (this.friendsCheckedLength = 0)
	};
	l.prototype.authorizeHandler = function (m) {
		m && m.preventDefault();
		this.hide();
		window.open(this.shareUrl + "&operation=authorize&site=" + this.siteType)
	};
	l.prototype.cellPhoneBindingHandler = function (m) {
		m && m.preventDefault();
		this.hide();
		window.open("https://reg.163.com/mobilealias/replaceAliasIndex.do?noheader=0")
	};
	l.prototype.friendsFilterHandler = function (o) {
		var p = f(o.target);
		var n = f.trim(p.val());
		var m = this;
		if (n.length) {
			p.next().fadeOut(100);
			this.filterTimer && window.clearTimeout(this.filterTimer);
			this.filterTimer = window.setTimeout(function () {
				m.friendsListEl.find("input").each(function () {
					if (f(this).data("nickname").indexOf(n) == -1) {
						f(this).parent().hide()
					} else {
						f(this).parent().show()
					}
				})
			}, 200)
		} else {
			p.next().fadeIn(100);
			this.friendsListEl.find("li").show()
		}
	};
	l.prototype.textareaInputHandler = function (m) {
		if (this.contentArea.val().length) {
			this.wrapEl.find(".J_TipLabel").fadeOut(100)
		} else {
			this.wrapEl.find(".J_TipLabel").fadeIn(100)
		}
		this.refreshWordCount()
	};
	l.prototype.refreshWordCount = function () {
		var m = this.maxWordCount - this.contentArea.val().length;
		this.wordCount.text(m);
		if (m < 0) {
			this.wordCount.css("color", "#c00")
		} else {
			this.wordCount.css("color", "#666")
		}
	};
	l.prototype.friendsSelectedOkHandler = function (n) {
		n && n.preventDefault();
		var p = [];
		var m = this.friendsReusltEl.find("li");
		m.each(function () {
			var q = f(this).data("symbolicname") || f(this).data("nickname");
			p.push("@" + q)
		});
		this.atFriendsEl.hide();
		this.clearFriendsCheckedResult();
		this.sendBoxEl.show();
		var o = p.length ? p.join(" ") + " " : "";
		this.contentArea.fieldSelection(o);
		this.refreshWordCount()
	};
	l.prototype.friendsSelectedCancelHandler = function (m) {
		m && m.preventDefault();
		this.clearFriendsCheckedResult();
		this.friendsSelectedOkHandler()
	};
	l.prototype.sendHandler = function (o) {
		o && o.preventDefault();
		if (this.contentArea.val().length > this.maxWordCount) {
			return
		}
		var n = this;
		var m = f(o.target);
		if (this.isBlocking) {
			return
		}
		this.isBlocking = true;
		m.addClass("dis-btn").text("发送中");
		f.ajax({
			url: this.shareUrl,
			type: "POST",
			dataType: "json",
			data: this.wrapEl.find("form").serializeArray(),
			success: function (p) {
				switch (p.resultCode) {
				case 0:
					YD.popTip("分享成功");
					n.toggle();
					break;
				case -999:
					if (typeof yueduLoginModule == "undefined") {
						login163()
					} else {
						yueduLoginModule.open()
					}
					break;
				case -1:
					if (p.data && typeof (p.data.error) == "number" && p.data.error > 0) {
						YD.popTip(n.errorMsg[p.data.error - 1])
					} else {
						YD.popTip("出错了，请稍后重试")
					}
					break;
				default:
					break
				}
				n.isBlocking = false;
				m.removeClass("dis-btn").text("发送")
			},
			error: function () {
				YD.popTip("出错了，请稍后重试");
				n.isBlocking = false;
				m.removeClass("dis-btn").text("发送")
			}
		})
	};
	l.prototype.checkAppInstalledForYixin = function () {
		var m = this;
		f.ajax({
			url: "/yiXin.do?operation=verifyUser",
			error: function () {
				YD.popTip("网络出错了，请稍后重试")
			}
		}).done(function (n) {
			if (!n.verified) {
				m.show();
				m.wrapEl.find(".bd").empty().html('<div class="install-yixin"><div class="text-tip">您绑定的号（' + m.shareContentInfo.cellphoneNumber + '<a href="#" class="J_GoBindCellPhone">修改</a>）未开通易信，可扫描二维码安装注册</div><div class="code"></div></div>');
				m.wrapEl.find(".ft").remove()
			} else {
				m.show()
			}
		})
	};

	function d() {
		k.call(this);
		this.title = "邮件分享";
		this.itemClass = "email";
		this.yueduCheckLoginUrl = "/login.do?operation=check&_jq_filter=0";
		this.yueduContactGetUrl = "/shareByMailForm.do?_jq_filter=0";
		this.mail163ContactIframeUrl = "/getMatil.html";
		this.sendMailUrl = "/shareByMail.do?_jq_filter=0";
		this.checkCodeUrl = "/capthca.do";
		this.forceFresh = true;
		this.siteType = 10;
		this.reciverArray = [];
		this.wrapEl.delegate(".J_ContactToggler", "click", f.proxy(this.contactBookToggleHandler, this)).delegate(".J_ContactList input", "click", f.proxy(this.contactCheckHandler, this)).delegate(".J_Addme", "click", f.proxy(this.addMeHandler, this)).delegate(".J_ReciverInput", "keyup", f.proxy(this.reciverInputHandler, this)).delegate(".J_Ok", "click", f.proxy(this.sendMailHandler, this)).delegate(".J_ChangeCheckCode", "click", f.proxy(this.checkCodeChangeHandler, this))
	}
	g.inherits(d, k);
	d.prototype.render = function (m) {
		if (typeof _gaq != "undefined" && _gaq.push) {
			if (this.host.config.shareContentInfo.origin && this.host.config.shareContentInfo.origin.length) {
				var o = this.host.config.shareContentInfo.origin;
				if (o[0] === "booksource" || o[0] === "bookshelf" || o[0] === "tradedetail") {
					_gaq.push(["_trackEvent", o[0], "source_share_mail", this.host.config.shareContentInfo.sourceUuid])
				} else {
					if (o[0] === "newsreader") {
						var t, s;
						switch (o[1]) {
						case 0:
							t = "news";
							s = this.host.config.shareContentInfo.articleUuid;
							break;
						case 1:
							t = "news_bottom";
							s = this.host.config.shareContentInfo.articleUuid;
							break;
						case 2:
							t = "source";
							s = this.host.config.shareContentInfo.sourceUuid;
							break
						}
						_gaq.push(["_trackEvent", o[0], t + "_share_mail", s])
					}
				}
			} else {
				if (this.host.config.shareContentInfo.shareType == 0) {
					_gaq.push(["_trackEvent", "newsreader", "news_share", "newsreader_home", "mail"])
				} else {
					if (this.host.config.shareContentInfo.shareType == 1) {
						_gaq.push(["_trackEvent", "newsreader", "source_share", "newsreader_detail", "mail"])
					}
				}
			}
		}
		if (m.foreign) {
			YD.popTip("您登录的帐号不是网易邮箱账号，不能使用邮件分享功能");
			return false
		}
		var n = '<div class="hd"><h4 class="t-email"><i></i>' + this.title + '</h4><a href="#" class="close J_Close">关闭</a></div><div class="bd"><dl class="email-body"><dt>收件人<span class="J_ReciverCountTip">（用分号分隔多个邮箱地址，最多支持10个地址）</span></dt><dd><div><input type="text" name="" class="text J_ReciverInput" /></div><div class="add-me"><label><input type="checkbox" class="J_Addme" />将我加入收件人列表</label></div></dd><dt>标题</dt><dd><input type="text" name="title" value="【分享文章】<%= emailShareTitle %>" class="text" disabled="disabled" /></dd><dt>附加评论</dt><dd><textarea disabled="disabled" name="message">好文分享：“<%= emailShareTitle %>”。网易云阅读的订阅源《<%= sourceTitle %>》不错， 值得一看~</textarea></dd><dt class="J_CheckCode" style="display:none;">验证码</dt><dd class="verification J_CheckCode" style="display:none;"><input type="text" class="text J_CheckCodeInput" /><img src="" /><a href="#" class="J_ChangeCheckCode">看不清？换一张</a></dd></dl><div class="contact-book J_ContactBook"><div class="contact-book-tab"><a href="#" data-target="J_RecentList" class="on J_ContactToggler">最近使用</a><a href="#" data-target="J_163MailList" class="J_ContactToggler">163邮箱通讯录</a></div><div class="contact-book-content J_ContactList"><ul class="J_RecentList"></ul><ul class="J_163MailList" style="display:none;"></ul></div></div></div><div class="ft"><a href="#" class="ok J_Ok">发送</a><a href="#" class="cacel J_Close">取消</a></div>';
		var r = this.host.config.shareContentInfo || {};
		r.emailShareTitle = this.host.config.shareContentInfo.articleTitle || this.host.config.shareContentInfo.sourceTitle;
		var q = template.compile(n);
		var p = q(r);
		this.wrapEl.addClass("email-overlay").html(p).appendTo("body");
		this.reciverArray = [];
		this.needCheckCode = false;
		this.contactBookEl = this.wrapEl.find(".J_ContactBook");
		this.reciverInputEl = this.wrapEl.find(".J_ReciverInput");
		this.reciverCountTip = this.wrapEl.find(".J_ReciverCountTip");
		this.checkCodeInput = this.wrapEl.find(".J_CheckCodeInput");
		this.renderContactBook()
	};
	d.prototype.renderContactBook = function () {
		var m = this;
		f("<iframe>").attr("src", this.mail163ContactIframeUrl).css({
			height: 0,
			width: 0,
			visibility: "hidden"
		}).appendTo("body");
		window.MC = window.MC || {};
		var n = MC.mailCall;
		MC.mailCall = function (r) {
			var q = '<% for(var i=0; i<list.length; i++){ if(list[i]){ %><li><label><input type="checkbox" value="<%= list[i] %>" /><%= list[i] %></label></li><% }} %>';
			var p = template.compile(q);
			var o = p({
				list: r
			});
			m.contactBookEl.find(".J_163MailList").html(o);
			MC.mailCall = n
		};
		f.ajax({
			url: this.yueduCheckLoginUrl,
			dataType: "json",
			success: function (o) {
				if (o.state == "login") {
					f.ajax({
						url: m.yueduContactGetUrl,
						dataType: "json",
						success: function (p) {
							if (p.resultCode == 0) {
								var s = '<% for(var i=0; i<list.length; i++){ if(list[i].contactAddr){ %><li><label><input type="checkbox" value="<%= list[i].contactAddr %>" /><%= list[i].contactAddr %></label></li><% }} %>';
								var r = template.compile(s);
								var q = r({
									list: p.contacts
								});
								m.contactBookEl.find(".J_RecentList").html(q);
								m.host.config.shareContentInfo.userName = p.userName;
								if (p.checkCode) {
									m.needCheckCode = true;
									m.wrapEl.find(".J_CheckCode").show().find("img").attr("src", m.checkCodeUrl + "?" + (new Date).getTime())
								}
							}
						},
						error: function () {
							YD.popTip("获取邮箱通讯录出错，请刷新重试")
						}
					})
				}
			}
		})
	};
	d.prototype.contactBookToggleHandler = function (m) {
		m && m.preventDefault();
		var n = f(m.target);
		this.contactBookEl.find(".J_ContactToggler").removeClass("on");
		n.addClass("on");
		this.contactBookEl.find("ul").hide();
		this.contactBookEl.find("." + n.data("target")).show()
	};
	d.prototype.updateReciver = function (m) {
		if (f.inArray(m, this.reciverArray) == -1) {
			if (this.reciverArray.length < 10) {
				this.reciverArray.push(m)
			} else {
				this.reciverCountTip.css("color", "#c00")
			}
		} else {
			for (var n = 0; n < this.reciverArray.length; n++) {
				if (this.reciverArray[n] == m) {
					this.reciverArray.splice(n, 1)
				}
			}
			this.reciverCountTip.css("color", "#999")
		}
		this.reciverInputEl.val(this.reciverArray.join(";"))
	};
	d.prototype.contactCheckHandler = function (m) {
		if (this.reciverArray.length >= 10) {
			m && m.preventDefault()
		}
		this.updateReciver(f(m.target).val())
	};
	d.prototype.checkCodeChangeHandler = function (m) {
		m && m.preventDefault();
		this.wrapEl.find(".J_CheckCodeInput").next().attr("src", this.checkCodeUrl + "?" + (new Date).getTime())
	};
	d.prototype.addMeHandler = function (m) {
		this.updateReciver(this.host.config.shareContentInfo.userName)
	};
	d.prototype.reciverInputHandler = function (n) {
		this.inputTimer && window.clearTimeout(this.inputTimer);
		var m = this;
		var o = n.target;
		this.inputTimer = window.setTimeout(function () {
			var p = o.value.split(";")
		}, 300)
	};
	d.prototype.sendMailHandler = function (r) {
		r && r.preventDefault();
		var n = f(r.target);
		if (this.isBlocking) {
			return
		}
		this.isBlocking = true;
		n.text("发送中");
		var u = this;
		var m = f.trim(this.reciverInputEl.val());
		var o = this.host.config.shareContentInfo || {};
		var q = f.trim(this.wrapEl.find("input[name=title]").val());
		var s = f.trim(this.wrapEl.find("textarea[name=message]").val());
		var p = f.trim(this.checkCodeInput.val());
		if (!m || !q || !s) {
			YD.popTip("信息填写不完整，请检查");
			this.isBlocking = false;
			return
		}
		if (this.reciverArray.length > 10) {
			YD.popTip("收件人不能超过10个");
			this.isBlocking = false;
			return
		}
		if (this.needCheckCode && !p) {
			YD.popTip("请输入验证码");
			this.isBlocking = false;
			return
		}
		var t = {
			receivers: m,
			title: s,
			content: q,
			sourceUuid: o.sourceUuid,
			entryID: o.articleUuid,
			posttime: o.posttime,
			url: o.url,
			code: this.checkCodeInput.val()
		};
		if (o.custom) {
			t.content = o.contentForEmailShare
		}
		f.ajax({
			url: this.sendMailUrl,
			type: "POST",
			data: t,
			dataType: "json",
			success: function (v) {
				switch (v.resultCode) {
				case 0:
					YD.popTip("发送成功");
					u.toggle();
					break;
				case -1:
					YD.popTip("验证码错误！");
					u.checkCodeChangeHandler();
					break;
				case -2:
					YD.popTip("每天最多100封");
					break;
				case -3:
					YD.popTip("接收人无效");
					break;
				case -6:
					YD.popTip("非网易邮箱账号，不能使用邮件分享功能");
					break;
				default:
					YD.popTip("发送失败，未知错误");
					break
				}
				u.isBlocking = false;
				n.text("发送")
			},
			error: function () {
				YD.popTip("出错了，请稍后重试");
				u.isBlocking = false;
				n.text("发送")
			}
		})
	};
	window.ydSns = {};
	window.ydSns.init = function (y) {
		this.yueduSnsInstance = new e({
			triggerClass: y.selector
		});
		var o = new c();
		var x = new b();
		var v = new h();
		var q = {};
		var r = new l({
			title: "易信朋友圈",
			itemClass: "yixin",
			getFriendsUrl: "",
			forceFresh: true,
			siteType: 7,
			atFriends: false,
			maxWordCount: 150,
			imgSupport: false,
			shareUrl: "/yiXin.do?operation=addFeed"
		});
		var s = new l({
			title: "新浪微博",
			itemClass: "sina-weibo",
			getFriendsUrl: "",
			forceFresh: true,
			siteType: 1,
			atFriends: true,
			imgSupport: true,
			maxWordCount: 140
		});
		var n = new l({
			title: "腾讯微博",
			itemClass: "qq-weibo",
			getFriendsUrl: "",
			forceFresh: true,
			siteType: 4,
			atFriends: true,
			imgSupport: true,
			maxWordCount: 140
		});
		var t = new l({
			title: "网易微博",
			itemClass: "netease-weibo",
			getFriendsUrl: "",
			forceFresh: true,
			siteType: 2,
			atFriends: false,
			imgSupport: true,
			maxWordCount: 163
		});
		var m = new l({
			title: "搜狐微博",
			itemClass: "sohu-weibo",
			getFriendsUrl: "",
			forceFresh: true,
			siteType: 3,
			atFriends: false,
			imgSupport: false,
			maxWordCount: 1000
		});
		var p = new l({
			title: "人人网",
			itemClass: "renren",
			getFriendsUrl: "",
			forceFresh: true,
			siteType: 6,
			atFriends: false,
			imgSupport: true,
			maxWordCount: 200
		});
		var u = new d();
		var w = new l({
			title: "QQ空间",
			itemClass: "qzone",
			getFriendsUrl: "",
			forceFresh: true,
			siteType: 6,
			atFriends: false,
			imgSupport: false,
			maxWordCount: 200
		});
		this.yueduSnsInstance.addPlugin(o).addPlugin(r).addPlugin(x).addPlugin(v).addPlugin(s).addPlugin(n).addPlugin(t).addPlugin(m).addPlugin(p).addPlugin(u).addPlugin(w)
	};
	window.ydSns.getInstance = function () {
		return this.yueduSnsInstance
	};
	f(function () {
		var m = "J_YueduSNS";
		window.ydSns.init({
			selector: m
		})
	})
})(jQuery);
