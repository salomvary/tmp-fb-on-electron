if (self.CavalryLogger) {
    CavalryLogger.start_js(["SssNA"]);
}

__d('NewStoriesPillController', ['csx', 'Bootloader', 'DOMQuery', 'ge'], (function a(b, c, d, e, f, g, h) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    var i = {
        _isAtTop: false,
        _view: null,
        show: function j(k) {
            c('Bootloader').loadModules(["NewStoriesPillView"], function(l) {
                this._view = l;
                l.renderInto(c('DOMQuery').scry(c('ge')('contentArea'), "._2c44")[0], this._isAtTop);
                l.hideWhenScrollAbove(k);
            }.bind(this), 'NewStoriesPillController');
        },
        hide: function j() {
            this._isAtTop = false;
            if (this._view) this._view.unmount();
        },
        setAtTop: function j() {
            this._isAtTop = true;
            if (this._view) this._view.setAtTop();
        }
    };
    f.exports = i;
}), null);
__d("XFeedSeeFirstStoryController", ["XController"], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = c("XController").create("\/feed\/control\/see_first\/story\/", {});
}), null);
__d('SeeFirstStoryLogger', ['AsyncRequest', 'XFeedSeeFirstStoryController'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = function i() {
        var j = c('XFeedSeeFirstStoryController').getURIBuilder().getURI();
        new(c('AsyncRequest'))(j).send();
    };
    f.exports = {
        log: h
    };
}), null);
__d('runAfterScrollingStops', ['Arbiter', 'Event', 'Run', 'debounceAcrossTransitions', 'emptyFunction'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(s, t, u) {
        if (t && k[t]) return;
        if (!j) {
            c('Arbiter').subscribe('page_transition', r);
            j = true;
        }
        if (!i) {
            s();
            return;
        }
        t && (k[t] = 1);
        l.push(s);
        if (!u) {
            if (n) {
                c('Run').onLeave(r);
                n = false;
            }
            m.push(l.length - 1);
        }
    }
    var i, j, k = {},
        l = [],
        m = [],
        n = true,
        o = 500,
        p = c('debounceAcrossTransitions')(function() {
            i = false;
            var s = l;
            l = [];
            m = [];
            k = {};
            for (var t = 0, u = s.length; t < u; ++t) s[t]();
        }, o);

    function q() {
        i = true;
        p();
    }

    function r() {
        var s = m;
        m = [];
        n = true;
        for (var t = 0, u = s.length; t < u; ++t) l[s[t]] = c('emptyFunction');
    }
    c('Event').listen(window, 'scroll', q);
    f.exports = h;
}), null);
__d('LitestandOffscreenController', ['csx', 'cx', 'Arbiter', 'CSS', 'DOMQuery', 'Event', 'NavigationMessage', 'Run', 'Scroll', 'Style', 'SubscriptionsHandler', 'Vector', 'getFullScreenElement', 'getOrCreateDOMID', 'queryThenMutateDOM', 'runAfterScrollingStops', 'throttle'], (function a(b, c, d, e, f, g, h, i) {
    if (c.__markCompiled) c.__markCompiled();
    var j = 1,
        k = 9,
        l = 10,
        m = {},
        n = false,
        o, p, q, r, s = [];

    function t() {
        o && o.release();
        o = null;
        n = false;
    }

    function u() {
        m = {};
        s = [];
    }

    function v() {
        if (c('CSS').matchesSelector(document.body, "._5vb_")) return l;
        return k;
    }

    function w() {
        r = r || c('Vector').getViewportDimensions().y;
        p = c('Vector').getScrollPosition().y;
        q = p + r;
        if (j) {
            p -= r * j;
            q += r * j;
        }
        for (var ea in m) {
            var fa = m[ea];
            fa.position = c('Vector').getElementPosition(fa.element).y;
            if (!fa.hidden) fa.height = fa.element.offsetHeight;
        }
    }

    function x() {
        var ea = [],
            fa = c('getFullScreenElement')();
        for (var ga in m) {
            var ha = m[ga],
                ia = ha.position,
                ja = ia + ha.height < p,
                ka = ia > q;
            if (!fa && !ha.hidden && (ja || ka)) {
                y(ha);
            } else if (!ja && !ka) {
                ha.pendingHide = false;
                if (ha.hidden) {
                    if (ha.dirty && ia < p) {
                        ea.push(ga);
                        c('CSS').addClass(z(ha), "_49nu");
                    } else c('Style').apply(ha.element, {
                        height: '',
                        marginBottom: ''
                    });
                    c('CSS').show(z(ha));
                    ha.dirty = false;
                    ha.hidden = false;
                }
            }
        }
        if (!ea.length) return;
        var la = 0;
        c('queryThenMutateDOM')(function() {
            for (var ma = 0, na = ea.length; ma < na; ma++) {
                var oa = m[ea[ma]];
                la += oa.height - z(oa).offsetHeight + c('Style').getFloat(oa.element, 'marginBottom');
            }
        }, function() {
            for (var ma = 0, na = ea.length; ma < na; ma++) {
                var oa = m[ea[ma]];
                c('CSS').removeClass(z(oa), "_49nu");
                c('Style').apply(oa.element, {
                    height: '',
                    marginBottom: ''
                });
            }
            la && c('Scroll').setTop(document.body, c('Scroll').getTop(document.body) - la);
        });
    }

    function y(ea) {
        if (!ea.pendingHide) {
            s.push(ea);
            ea.pendingHide = true;
        }
    }

    function z(ea) {
        if (ea.wrapperElement) return ea.wrapperElement;
        var fa = ea.element;
        if (fa.firstElementChild) return ea.wrapperElement = fa.firstElementChild;
        for (var ga = 0; ga < fa.childNodes.length; ga++)
            if (fa.childNodes[ga].tagName) return ea.wrapperElement = fa.childNodes[ga];
    }

    function aa() {
        var ea = v() + 'px';
        for (var fa = 0; fa < s.length; fa++) {
            var ga = s[fa];
            if (c('DOMQuery').scry(ga.element, "._52fb").length) ga.pendingHide = false;
            if (ga && ga.element && ga.pendingHide && !ga.hidden) {
                c('Style').apply(ga.element, {
                    height: ga.height + 'px',
                    marginBottom: ea
                });
                c('CSS').hide(z(ga));
                ga.hidden = true;
                ga.pendingHide = false;
            }
        }
        s = [];
    }

    function ba() {
        c('runAfterScrollingStops')(aa, 'LitestandOffscreenController/hide');
        c('queryThenMutateDOM')(w, x, 'LitestandOffscreenController');
    }

    function ca() {
        c('Run').onLeave(t);
        o = new(c('SubscriptionsHandler'))();
        o.addSubscriptions(c('Arbiter').subscribe(c('NavigationMessage').NAVIGATION_BEGIN, u), c('Event').listen(window, 'scroll', c('throttle')(ba)), c('Event').listen(window, 'resize', c('throttle')(function() {
            r = null;
            ba();
        })));
        n = true;
    }
    var da = {
        attachSubstream: function ea(fa) {
            n || ca();
            m[c('getOrCreateDOMID')(fa)] = {
                element: fa
            };
        }
    };
    f.exports = da;
}), null);
__d('LitestandNewStoryController', ['cx', 'Arbiter', 'AsyncRequest', 'BlueBar', 'LitestandColumnManager', 'LitestandMessages', 'LitestandStream', 'Style', '$', 'getScrollPosition', 'queryThenMutateDOM', 'requestAnimationFrame', 'setImmediate'], (function a(b, c, d, e, f, g, h) {
    if (c.__markCompiled) c.__markCompiled();
    var i = 50,
        j = 500,
        k, l, m;

    function n() {
        m && clearTimeout(m);
        m = null;
    }

    function o() {
        m = setTimeout(function() {
            m = null;
            p();
        }, j);
    }

    function p() {
        var v;
        c('queryThenMutateDOM')(function() {
            v = c('LitestandStream').canInsertNewerStories();
        }, function() {
            if (v) {
                s();
            } else o();
        }, 'LitestandNewStoryController/tryShowingStories');
    }

    function q(v) {
        CSS.addClass(v, "_38xk");
        c('requestAnimationFrame')(function() {
            return c('Style').set(v, 'opacity', 1);
        });
    }

    function r(v) {
        n();
        if (!l) return;
        var w = l.nextSibling;
        if (v && w) var x = w.offsetTop;
        c('Style').apply(l, {
            height: '',
            left: '',
            opacity: '',
            overflow: '',
            position: '',
            width: ''
        });
        if (v) {
            var y = w.offsetTop + i,
                z = y - x,
                aa = c('getScrollPosition')(window);
            c('LitestandColumnManager').adjustVerticalWindowPosition(aa, z);
            c('requestAnimationFrame')(function() {
                c('LitestandColumnManager').adjustVerticalWindowPosition(aa, z);
                q(l);
                if (k) {
                    k.setAtTop();
                    k.show(z);
                }
            });
        } else q(l);
        c('Arbiter').inform(c('LitestandMessages').STORIES_INSERTED);
        c('Arbiter').inform(c('LitestandMessages').NEWER_STORIES_INSERTED);
        c('setImmediate')(function() {
            return c('Arbiter').inform('reflow');
        });
        new(c('AsyncRequest'))().setURI('/ajax/litestand/update_filter_viewtime').setData({
            section_id: c('LitestandStream').getSectionID()
        }).send();
    }

    function s() {
        r(c('BlueBar').hasFixedBlueBar());
    }

    function t() {
        r(false);
    }
    var u = {
        waitForDisplay: function v(w) {
            if (!l) l = c('$')(w);
            if (c('LitestandStream').canInsertNewerStories()) {
                s();
            } else o();
        },
        showStoriesNow: function v(w) {
            l = w;
            t();
        },
        setNewStoryPill: function v(w) {
            k = w;
        }
    };
    f.exports = u;
}), null);
__d('FeedErrorDetection', ['csx', 'Banzai', 'CSS', 'DataAttributeUtils', 'DOM', 'ge'], (function a(b, c, d, e, f, g, h) {
    if (c.__markCompiled) c.__markCompiled();
    var i = 0,
        j = {},
        k = false,
        l = false;

    function m(event, r, s, t) {
        var u = {
            event: event,
            shouldLogDetail: r,
            site: 'www'
        };
        if (r) {
            u.intValues = s;
            u.normalValues = t;
        }
        c('Banzai').post('feed_error_detection', u, {
            delay: 0
        });
    }
    var n = function r(s, t, u, v) {
            var w = c('DOM').scry(s, t || "._5jmm").filter(u),
                x = {};
            for (var y = 0; y < w.length; y++) {
                var z = w[y],
                    aa = z.getAttribute('data-dedupekey');
                if (x[aa]) {
                    v(z);
                } else x[aa] = 1;
            }
        },
        o = function r(s) {
            return !!s.getAttribute('data-dedupekey');
        },
        p = function r(s) {
            return o(s) && c('CSS').shown(s);
        },
        q = {
            dedupe: function r(s, t) {
                n(s, t, o, function(u) {
                    return c('DOM').remove(u);
                });
            },
            dedupeHide: function r(s, t) {
                n(s, t, p, function(u) {
                    c('CSS').hide(u);
                    u.removeAttribute('style');
                });
            },
            registerFeedStories: function r(s, t) {
                if (s == 'substream_0') {
                    i = 0;
                    j = {};
                    k = false;
                    l = false;
                }
                var u = c('DOM').scry(c('ge')(s), "._5jmm"),
                    v = u.length;
                if (!v && !k) {
                    if (!l) {
                        l = true;
                        return;
                    }
                    if (!i) {
                        m('empty_feed_js', t, {}, {});
                    } else m('end_of_feed_js', t, t ? {
                        stories_count: i
                    } : {}, {});
                    k = true;
                    return;
                }
                l = false;
                for (var w = 0; w < v; w++) {
                    var x = u[w],
                        y = x.getAttribute('data-dedupekey'),
                        z = c('DataAttributeUtils').getDataFt(x);
                    if (!y || !z) continue;
                    if (y in j) {
                        var aa = {};
                        if (t) aa = {
                            dedupKey: y,
                            ft_A: z,
                            ft_B: j[y]
                        };
                        m('duplicate_stories', t, {}, {
                            dup_field: aa
                        });
                    } else {
                        j[y] = z;
                        i++;
                    }
                }
            }
        };
    f.exports = q;
}), null);
__d('LitestandStreamTailLoader', ['Arbiter', 'Bootloader', 'CSS', 'DOM', 'Event', 'FeedErrorDetection', 'LitestandMessages', 'LitestandOffscreenController', 'LitestandStream', 'NavigationMessage', 'OnVisible', 'Run', 'SubscriptionsHandler', 'ge', 'getElementPosition', 'getOrCreateDOMID', 'getUnboundedScrollPosition', 'getViewportDimensions', 'throttle'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    var h = 30000,
        i = function l(m) {
            c('Bootloader').loadModules(["BanzaiODS"], function(n) {
                n && n.bumpEntityKey('feed_load', m);
            }, 'LitestandStreamTailLoader');
        };

    function j(l) {
        this.$LitestandStreamTailPager1 = function(n) {
            this.$LitestandStreamTailPager5(n);
        }.bind(this);
        this.$LitestandStreamTailPager2 = function(n) {
            i('streamload_error.tail.transport');
            this.$LitestandStreamTailPager5(n);
        }.bind(this);
        this.streamConfig = babelHelpers['extends']({
            bufferPixels: 1000,
            firstPagerScrollBuffer: 100,
            maxTailRetries: 2
        }, l.streamConfig);
        this.pagerConfig = l.pagerConfig;
        this.storiesContainer = l.storiesContainer;
        this.pagerElement = l.pagerElement;
        this.cursor = l.cursor;
        this.previousCursors = {};
        var m = c('DOM').find(this.pagerElement, 'a');
        c('Event').listen(m, 'click', this.$LitestandStreamTailPager3.bind(this));
    }
    j.prototype.$LitestandStreamTailPager3 = function(event) {
        this.$LitestandStreamTailPager4();
        event.preventDefault();
    };
    j.prototype.$LitestandStreamTailPager5 = function(l) {
        delete this.previousCursors[this.cursor];
        c('Arbiter').inform(c('LitestandMessages').STREAM_LOAD_ERROR, l);
        i('streamload_error.tail');
        if (this.lastRequestWasRetry) i('streamload_error.tail.retry');
        if (this.retryCounter < this.streamConfig.maxTailRetries) {
            this.retryCounter++;
            this.$LitestandStreamTailPager4(true);
            i('streamload.tail.retry');
            c('Arbiter').inform(c('LitestandMessages').STREAM_LOAD_RETRY);
            return;
        }
        c('CSS').removeClass(this.pagerElement, 'async_saving');
    };
    j.prototype.$LitestandStreamTailPager4 = function() {
        var l = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
        this.detach();
        c('CSS').addClass(this.pagerElement, 'async_saving');
        var m = c('DOM').scry(c('LitestandStream').getStreamRoot(), c('LitestandStream').getStoriesSelector()).map(function(o) {
                return o.getAttribute('data-cursor');
            }).filter(function(o) {
                return o;
            }),
            n = this.cursor;
        if (!n && m.length > 0) n = m[m.length - 1];
        if (this.previousCursors[n]) {
            i('duplicate_cursor');
            c('Arbiter').inform(c('LitestandMessages').DUPLICATE_CURSOR_ERROR, n);
        }
        this.previousCursors[n] = n;
        this.lastRequestWasRetry = l;
        c('Bootloader').loadModules(["UIPagelet"], function(o) {
            o.loadFromEndpoint('LitestandTailLoadPagelet', c('getOrCreateDOMID')(this.storiesContainer), {
                client_stories_count: m.length,
                cursor: n,
                feed_stream_id: c('LitestandStream').getFeedStreamID(),
                pager_config: this.pagerConfig,
                scroll_count: ++this.numTailLoads,
                story_id: c('LitestandStream').getStoryID()
            }, {
                append: true,
                automatic: true,
                crossPage: true,
                errorHandler: this.$LitestandStreamTailPager1,
                transportErrorHandler: this.$LitestandStreamTailPager2,
                usePipe: true
            });
            c('Arbiter').inform(c('LitestandMessages').STORIES_REQUESTED);
        }.bind(this), 'LitestandStreamTailLoader');
    };
    j.prototype.$LitestandStreamTailPager6 = function() {
        var l = c('getUnboundedScrollPosition')(window).y,
            m = this.streamConfig.firstPagerScrollBuffer || 100;
        return l > m;
    };
    j.prototype.$LitestandStreamTailPager7 = function() {
        this.detach();
        this.onVisibleListener = new(c('OnVisible'))(c('DOM').find(this.pagerElement, 'a'), function() {
            this.$LitestandStreamTailPager4();
        }.bind(this), false, this.streamConfig.bufferPixels);
    };
    j.prototype.attach = function() {
        var l = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
        this.detach();
        var m = c('getElementPosition')(this.pagerElement),
            n = c('getViewportDimensions')();
        if (m.y < n.height) {
            this.$LitestandStreamTailPager4();
        } else if (l && !this.$LitestandStreamTailPager6()) {
            this.onScrollListener = c('Event').listen(window, 'scroll', c('throttle')(function() {
                if (this.$LitestandStreamTailPager6()) this.$LitestandStreamTailPager7();
            }.bind(this)));
        } else this.$LitestandStreamTailPager7();
        c('CSS').removeClass(this.pagerElement, 'async_saving');
    };
    j.prototype.detach = function() {
        this.onScrollListener && this.onScrollListener.remove();
        this.onVisibleListener && this.onVisibleListener.remove();
        this.onScrollListener = null;
        this.onVisibleListener = null;
    };
    j.prototype.remove = function() {
        this.detach();
        if (this.pagerElement) c('DOM').remove(this.pagerElement);
    };

    function k() {
        this.$LitestandStreamTailLoader1 = function() {
            this.$LitestandStreamTailLoader3();
            this.subscriptionsHandler && this.subscriptionsHandler.release();
            this.subscriptionsHandler = null;
            this.pager && this.pager.remove();
            this.pager = null;
            c('Arbiter').inform(c('LitestandMessages').LEAVE_HOME);
        }.bind(this);
        this.$LitestandStreamTailLoader2 = function() {
            this.$LitestandStreamTailLoader3();
            this.loadTimeout = setTimeout(this.$LitestandStreamTailLoader4, h);
        }.bind(this);
        this.$LitestandStreamTailLoader3 = function() {
            this.loadTimeout && clearTimeout(this.loadTimeout);
        }.bind(this);
    }
    k.prototype.$LitestandStreamTailLoader4 = function() {
        i('streamload_timeout.tail');
    };
    k.prototype.createPager = function(l) {
        this.pager && this.pager.remove();
        this.pager = new j(l);
        this.pager.attach(true);
        if (!this.subscriptionsHandler) {
            this.subscriptionsHandler = new(c('SubscriptionsHandler'))();
            this.subscriptionsHandler.addSubscriptions(c('Arbiter').subscribe(c('NavigationMessage').NAVIGATION_BEGIN, this.$LitestandStreamTailLoader1), c('Arbiter').subscribe(c('LitestandMessages').STORIES_REQUESTED, this.$LitestandStreamTailLoader2), c('Arbiter').subscribe([c('LitestandMessages').STORIES_INSERTED, c('LitestandMessages').STREAM_LOAD_ERROR], this.$LitestandStreamTailLoader3));
            c('Run').onLeave(this.$LitestandStreamTailLoader1);
        }
    };
    k.prototype.updatePager = function(l) {
        c('FeedErrorDetection').dedupeHide(c('LitestandStream').getStreamRoot(), c('LitestandStream').getStoriesSelector());
        if (this.pager && l && l.cursor) {
            this.pager.cursor = l.cursor;
            this.pager.attach();
        } else i('update_tail_cursor_error');
    };
    k.prototype.removePager = function() {
        this.pager && this.pager.remove();
        this.pager = null;
    };
    k.prototype.moreStoriesInserted = function(l) {
        c('Arbiter').inform(c('LitestandMessages').STORIES_INSERTED, {
            substream_id: l
        });
        var m = c('ge')(l);
        if (m) {
            c('LitestandOffscreenController').attachSubstream(m);
            if (this.pager && this.pager.lastRequestWasRetry) {
                this.pager.lastRequestWasRetry = false;
                this.pager.retryCounter = 0;
                i('streamload.tail.retry.success');
            }
        }
    };
    f.exports = new k();
}), null);
__d('PrivacySelectorSelectableItem', ['csx', 'cx', 'CSS', 'DOM', 'DOMQuery', 'MenuSelectableItem', 'React'], (function a(b, c, d, e, f, g, h, i) {
    var j, k;
    if (c.__markCompiled) c.__markCompiled();
    j = babelHelpers.inherits(l, c('MenuSelectableItem'));
    k = j && j.prototype;

    function l(m) {
        'use strict';
        if (m.icon)
            if (m.children) {
                m.icon = c('React').createElement('div', {
                    className: "_4chk"
                }, m.icon);
            } else m.icon = c('DOM').create('div', {
                className: "_4chk"
            }, m.icon);
        k.constructor.call(this, m);
    }
    l.prototype.render = function() {
        'use strict';
        var m = k.render.call(this),
            n = c('DOMQuery').find(m, "._4chk"),
            o = n.parentNode;
        c('CSS').addClass(o, "_4chl");
        var p = c('DOMQuery').find(o, "._54nh");
        c('CSS').addClass(p, "_4chm");
        return m;
    };
    f.exports = l;
}), null);
__d('PrivacySelectorOptionNew', ['csx', 'cx', 'fbt', 'CSS', 'DOM', 'DOMQuery', 'JSXDOM', 'PrivacySelectorSelectableItem', 'PrivacyConst'], (function a(b, c, d, e, f, g, h, i, j) {
    var k, l;
    if (c.__markCompiled) c.__markCompiled();
    k = babelHelpers.inherits(m, c('PrivacySelectorSelectableItem'));
    l = k && k.prototype;

    function m(n) {
        'use strict';
        l.constructor.call(this, n);
        this._origLabel = this.getLabel();
        this._origTriggerLabel = this.getTriggerLabel();
    }
    m.prototype._getData = function() {
        'use strict';
        return this._data;
    };
    m.prototype.getTooltip = function() {
        'use strict';
        return this._getData().tooltip;
    };
    m.prototype.getPostParam = function() {
        'use strict';
        return this._getData().postParam.toString();
    };
    m.prototype.getTriggerIcon = function() {
        'use strict';
        return this._getData().triggerIcon;
    };
    m.prototype.getTriggerLabel = function() {
        'use strict';
        return this._getData().triggerLabel;
    };
    m.prototype.isPublic = function() {
        'use strict';
        return this.getPostParam().toString() === c('PrivacyConst').PostParam.EVERYONE.toString();
    };
    m.prototype.isFriends = function() {
        'use strict';
        return this.getPostParam().toString() === c('PrivacyConst').PostParam.FRIENDS.toString();
    };
    m.prototype.isOnlyMe = function() {
        'use strict';
        return this.getPostParam().toString() === c('PrivacyConst').PostParam.ONLY_ME.toString();
    };
    m.prototype.isBasicOption = function() {
        'use strict';
        return true;
    };
    m.prototype.isCustomOption = function() {
        'use strict';
        return false;
    };
    m.prototype.getTagExpansionBehavior = function() {
        'use strict';
        return this._getData().tagExpansionBehavior;
    };
    m.prototype.getBaseValue = function() {
        'use strict';
        return this._getData().baseValue;
    };
    m.prototype.getIndex = function() {
        'use strict';
        return this._getData().value;
    };
    m.prototype.getLoggingEventName = function() {
        'use strict';
        switch (this.getPostParam()) {
            case c('PrivacyConst').PostParam.FRIENDS:
                return 'click_friends';
            case c('PrivacyConst').PostParam.EVERYONE:
                return 'click_everyone';
            case c('PrivacyConst').PostParam.ONLY_ME:
                return 'click_only_me';
            case c('PrivacyConst').PostParam.FRIENDS_MINUS_ACQUAINTANCES:
                return 'click_friends_except_acquaintances';
            case c('PrivacyConst').PostParam.FB_ONLY:
                return 'click_fb_only';
            default:
                return 'click_other';
        }
    };
    m.prototype.updateAfterTagExpansion = function(n, o) {
        'use strict';
        var p = this._origLabel,
            q = this._origTriggerLabel;
        if (n && this._getData().showPlusOnTagExpansion) {
            p = j._("{privacyLabel} (+)", [j.param('privacyLabel', p)]);
            if (o && this.isFriends()) {
                q = j._("Friends, Friends of Tagged");
            } else q = j._("{privacyLabel} (+)", [j.param('privacyLabel', q)]);
        }
        this._setLabel(p);
        this._getData().triggerLabel = q;
        var r = this._getExpansionType(n),
            s = this._getData().optionSubtitles || {};
        this._setSubtitle(s[r]);
    };
    m.prototype.isBelowFold = function() {
        'use strict';
        var n = c('CSS').matchesSelector(this.getRoot(), "._3ey_");
        return n;
    };
    m.prototype.removeOnBootload = function() {
        'use strict';
        return !!this._getData().removeOnBootload;
    };
    m.prototype._setLabel = function(n) {
        'use strict';
        if (!n) return;
        var o = c('DOMQuery').find(this.getRoot(), "._54nh");
        o && c('DOM').setContent(o, n);
        this._getData().label = n;
    };
    m.prototype._setSubtitle = function(n) {
        'use strict';
        if (!n) return;
        var o = c('DOMQuery').find(this.getRoot(), "._48u1");
        o && c('DOM').setContent(o, n);
    };
    m.prototype._getExpansionType = function(n) {
        'use strict';
        return n ? c('PrivacyConst').ExpansionType.TAGS_ONLY : c('PrivacyConst').ExpansionType.NONE;
    };
    m.prototype.render = function() {
        'use strict';
        var n = l.render.call(this);
        if (!this._getData().isPrimaryOption) return n;
        var o = c('DOMQuery').find(n, "._54nc");
        o && c('CSS').addClass(o, "_48t_");
        var p = c('DOM').find(n, "._54nh");
        p && c('CSS').addClass(p, "_48u0");
        var q = c('JSXDOM').div({
            className: "_48u1"
        }, this._getData().optionSubtitle);
        c('DOM').appendContent(o, q);
        return n;
    };
    f.exports = m;
}), null);
__d("XPrivacySelectorLoggingController", ["XController"], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = c("XController").create("\/privacy\/selector\/log\/", {
        event: {
            type: "Enum",
            required: true,
            enumType: 1
        },
        render_location: {
            type: "Int",
            required: true
        },
        content_type: {
            type: "String",
            required: true
        }
    });
}), null);
__d('PrivacySelectorCustomOption', ['AsyncDialog', 'AsyncRequest', 'DataStore', 'PrivacySelectorOptionNew', 'XPrivacySelectorLoggingController', 'XPrivacyCustomDialogController'], (function a(b, c, d, e, f, g) {
    var h, i;
    if (c.__markCompiled) c.__markCompiled();
    h = babelHelpers.inherits(j, c('PrivacySelectorOptionNew'));
    i = h && h.prototype;

    function j(k) {
        'use strict';
        i.constructor.call(this, k);
    }
    j.prototype.isBasicOption = function() {
        'use strict';
        return false;
    };
    j.prototype.isCustomOption = function() {
        'use strict';
        return true;
    };
    j.prototype.getSelector = function() {
        'use strict';
        return this._selector;
    };
    j.prototype.setPostParam = function(k) {
        'use strict';
        this._data.postParam = k;
    };
    j.prototype.getLoggingEventName = function() {
        'use strict';
        return 'click_custom';
    };
    j.prototype.openDialog = function(k) {
        'use strict';
        if (typeof this._selector === 'undefined') this._selector = k;
        c('DataStore').set(this._data.id, 'PrivacySelectorCustomOption', this);
        var l = c('XPrivacyCustomDialogController').getURIBuilder().setString('option_id', this._data.id).setString('id', this._data.privacyfbid.toString()).setString('post_param', k.getPostParam()).setString('content_type', k.getContentType()).setInt('render_location', k.getRenderLocation()).setIntVector('tags', k.getTags()).setBool('autosave', this._data.autosave).setBool('limit_community', this._data.limitcommunity).setBool('limit_facebook', this._data.limitfacebook).setBool('limit_fof', this._data.limitfof).setBool('limit_tagexpand', this._data.limittagexpand).setBool('is_new_privacy_selector', true).getURI(),
            m = new(c('AsyncRequest'))(l);
        m.setRelativeTo(k.getTriggerButtonElement());
        c('AsyncDialog').send(m, function(n) {
            var o = function p(q) {
                var r = c('XPrivacySelectorLoggingController').getURIBuilder().setEnum('event', q).setInt('render_location', document.getElementsByName('render_location')[0].value).setString('content_type', document.getElementsByName('content_type')[0].value).getURI();
                new(c('AsyncRequest'))().setURI(r).send();
            };
            n.subscribe('hide', function() {
                k.inform('custom/hide');
                k.inform('selectorFinished');
            });
            n.subscribe('success', function() {
                k.inform('custom/success');
                o('custom_save');
            });
            n.subscribe('cancel', function() {
                k.inform('custom/cancel');
                o('custom_cancel');
            });
        });
    };
    j.customPrivacySave = function(k, l) {
        'use strict';
        var m = c('DataStore').get(k, 'PrivacySelectorCustomOption');
        m.getSelector().selectOption(l);
        c('DataStore').remove(k, 'PrivacySelectorCustomOption');
    };
    f.exports = j;
}), null);
__d("XPrivacySelectorAsyncMoreController", ["XController"], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = c("XController").create("\/privacy\/selector\/async_more\/", {
        id: {
            type: "String",
            required: true
        },
        next_value: {
            type: "Int",
            required: true
        },
        render_location: {
            type: "Int",
            required: true
        }
    });
}), null);
__d('PrivacySelectableMenu', ['csx', 'cx', 'Arbiter', 'AsyncRequest', 'CSS', 'DataStore', 'Ease', 'MenuSelectableItem', 'PrivacySelectorCustomOption', 'PrivacySelectorOptionNew', 'SelectableMenu', 'SelectableMenuUtils', 'XPrivacySelectorAsyncMoreController', 'XPrivacySelectorLoggingController'], (function a(b, c, d, e, f, g, h, i) {
    var j, k;
    if (c.__markCompiled) c.__markCompiled();
    j = babelHelpers.inherits(l, c('SelectableMenu'));
    k = j && j.prototype;

    function l(m, n) {
        'use strict';
        k.constructor.call(this, m, n);
        c('DataStore').set('PrivacySelectableMenu', n.id, this);
        this._needsBootload = !!n.needsbootload;
        this.collapseMenu();
        this.updateOptionsAfterTagExpansion(!!n.hasTags);
    }
    l.prototype.cleanup = function() {
        'use strict';
        c('DataStore').remove('PrivacySelectableMenu', this._config.id);
    };
    l.prototype.getItemForIndex = function(m) {
        'use strict';
        for (var n = 0; n < this._items.length; n++) {
            var o = this._items[n];
            if (o instanceof c('PrivacySelectorOptionNew') && o.getIndex() == m) return o;
        }
        return null;
    };
    l.prototype.getSelectedOption = function() {
        'use strict';
        for (var m = this._items, n = Array.isArray(m), o = 0, m = n ? m : m[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator']();;) {
            var p;
            if (n) {
                if (o >= m.length) break;
                p = m[o++];
            } else {
                o = m.next();
                if (o.done) break;
                p = o.value;
            }
            var q = p;
            if (q instanceof c('MenuSelectableItem') && q.isSelected()) return q;
        }
        return null;
    };
    l.prototype.selectOption = function(m) {
        'use strict';
        var n = null,
            o = false,
            p = false;
        for (var q = this._items, r = Array.isArray(q), s = 0, q = r ? q : q[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator']();;) {
            var t;
            if (r) {
                if (s >= q.length) break;
                t = q[s++];
            } else {
                s = q.next();
                if (s.done) break;
                t = s.value;
            }
            var u = t;
            if (u instanceof c('PrivacySelectorCustomOption')) {
                n = u;
                continue;
            }
            if (this._isMoreOption(u)) {
                if (this._needsBootload) {
                    o = true;
                } else this.expandMenu();
                continue;
            }
            if (!o && u instanceof c('PrivacySelectorOptionNew') && u.getPostParam() == m) {
                this.setValue(u.getIndex());
                p = true;
                break;
            }
        }
        if (!p && n) {
            n.setPostParam(m);
            this.setValue(n.getIndex());
        }
        if (o) {
            this.subscribeOnce('expandMenu', function() {
                this.selectOption(m);
            }.bind(this));
            this.expandMenu();
        } else this.inform('selectOption');
        return !o;
    };
    l.prototype._isMoreOption = function(m) {
        'use strict';
        return c('CSS').matchesSelector(m.getRoot(), "._po2");
    };
    l.prototype._handleItemClick = function(m, n) {
        'use strict';
        if (!c('SelectableMenuUtils').doesItemSupportSelect(m)) return k._handleItemClick.call(this, m, n);
        if (this._isMoreOption(m)) {
            this._logMoreClick();
            this.expandMenu();
            return;
        }
        this._logOptionClick(m);
        var o = this.inform('itemclick', {
            item: m,
            event: n
        });
        if (o) return;
        if (!c('SelectableMenuUtils').isSelected(m) && !m.isCustomOption() && m.select() !== false) {
            this._items.forEach(function(p) {
                if (c('SelectableMenuUtils').isSelected(p) && p !== m) p.deselect();
            });
            this.inform('change', this.getSelection());
        }
        c('Arbiter').inform('composerprivacy/aborteducation');
        this.done();
        return m.handleClick();
    };
    l.prototype._logMoreClick = function() {
        'use strict';
        var m = c('XPrivacySelectorLoggingController').getURIBuilder().setEnum('event', 'more_options').setInt('render_location', this._config.renderlocation).setString('content_type', this._config.contenttype).getURI();
        new(c('AsyncRequest'))().setURI(m).send();
    };
    l.prototype._logOptionClick = function(m) {
        'use strict';
        var n = c('XPrivacySelectorLoggingController').getURIBuilder().setEnum('event', m.getLoggingEventName()).setInt('render_location', this._config.renderlocation).setString('content_type', this._config.contenttype).getURI();
        new(c('AsyncRequest'))().setURI(n).send();
    };
    l.prototype._getMoreOptionsItem = function() {
        'use strict';
        var m = null;
        this.forEachItem(function(n) {
            if (this._isMoreOption(n)) m = n;
        }.bind(this));
        return m;
    };
    l.prototype.getCustomItem = function() {
        'use strict';
        for (var m = this._items, n = Array.isArray(m), o = 0, m = n ? m : m[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator']();;) {
            var p;
            if (n) {
                if (o >= m.length) break;
                p = m[o++];
            } else {
                o = m.next();
                if (o.done) break;
                p = o.value;
            }
            var q = p;
            if (q instanceof c('PrivacySelectorCustomOption')) return q;
        }
        return null;
    };
    l.prototype.expandMenu = function() {
        'use strict';
        if (this._expanded) return;
        this._expanded = true;
        if (!this._needsBootload) {
            this.expandMenuAfterLoaded();
            return;
        }
        this._needsBootload = false;
        var m = this._getMoreOptionsItem();
        if (m) {
            this._moreOptionsIcon = m.getIcon();
            m.setIcon(this._config.morespinner);
        }
        var n = Date.now(),
            o = c('XPrivacySelectorAsyncMoreController').getURIBuilder().setString('id', this._config.id).setInt('next_value', this._config.nextvalue).setInt('render_location', this._config.renderlocation).getURI();
        new(c('AsyncRequest'))().setURI(o).setRelativeTo(this.getRoot()).setErrorHandler(function(p) {
            var q = 1250 - (Date.now() - n);
            setTimeout(function() {
                m && m.setIcon(this._moreOptionsIcon);
                this._needsBootload = true;
                this._expanded = false;
            }.bind(this), q > 0 && m ? q : 0);
        }.bind(this)).send();
    };
    l.prototype.expandMenuAfterLoaded = function() {
        'use strict';
        c('CSS').removeClass(this.getRoot(), "_po3");
        c('CSS').addClass(this.getRoot(), "_po4");
        if (this._moreOptionsIcon) {
            this._getMoreOptionsItem().setIcon(this._moreOptionsIcon);
            this._moreOptionsIcon = undefined;
        }
        this.inform('expandMenu');
    };
    l.prototype.collapseMenu = function() {
        'use strict';
        c('CSS').removeClass(this.getRoot(), "_po4");
        c('CSS').addClass(this.getRoot(), "_po3");
        this._expanded = false;
    };
    l.prototype.updateOptionsAfterTagExpansion = function(m) {
        'use strict';
        this._lastHasTagsUpdate = m;
        this.forEachItem(function(n) {
            if (n instanceof c('PrivacySelectorOptionNew')) n.updateAfterTagExpansion(m, !!this._config.hasSimpleLabels);
        }.bind(this));
    };
    l.prototype.updateTagExpansionLabelAfterBootload = function() {
        'use strict';
        this.updateOptionsAfterTagExpansion(!!this._lastHasTagsUpdate);
    };
    l.prototype.onPopoverOpen = function(m) {
        'use strict';
        if (m && m.isBelowFold()) {
            if (this._needsBootload) {
                this.subscribeOnce('expandMenu', function() {
                    this._scrollToOption(this.getSelectedOption());
                }.bind(this));
            } else this._scrollToOption(m);
            this.expandMenu();
        } else this.collapseMenu();
    };
    l.prototype._scrollToOption = function(m) {
        'use strict';
        if (!this._scrollableArea) return;
        var n = m.getRoot();
        if (n === null) return;
        var o = 12,
            p = this._scrollableArea.getScrollTop(),
            q = p + this._scrollableArea.getClientHeight(),
            r = n.offsetTop + n.offsetHeight;
        if (r + o > q) this._scrollableArea.setScrollTop(p + r + o - q, true, {
            duration: Math.min(1000, (r + o - q) * 10),
            ease: c('Ease').sineOut
        });
    };
    f.exports = l;
}), null);
__d('PopoverButton', ['csx', 'DOM', 'DOMQuery', 'isTextNode'], (function a(b, c, d, e, f, g, h) {
    if (c.__markCompiled) c.__markCompiled();
    var i = {
        setLabel: function j(k, l) {
            var m = c('DOMQuery').find(k, "._55pe"),
                n = m.childNodes;
            for (var o = 0; o < n.length; o++)
                if (c('isTextNode')(n[o])) {
                    c('DOM').replace(n[o], l);
                    return;
                }
            c('DOM').appendContent(m, l);
        }
    };
    f.exports = i;
}), null);
__d('PrivacySelectorDataStore', ['ArbiterMixin', 'PrivacySelectorNewDispatcher', 'KeyedCallbackManager'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = new(c('KeyedCallbackManager'))(),
        i = babelHelpers['extends']({}, c('ArbiterMixin'), {
            get: function j(k, l) {
                h.executeOrEnqueue(k, l);
            },
            hasValueChanged: function j(k) {
                return !!h.getResource(k);
            }
        });
    c('PrivacySelectorNewDispatcher').register(function(j) {
        if (j.selector_type) {
            var k = {};
            k[j.selector_type] = {
                post_param: j.post_param,
                unique_id: j.unique_id,
                reload: j.reload,
                is_error: j.is_error,
                selector_type: j.selector_type
            };
            h.addResourcesAndExecute(k);
            i.inform('change');
        }
    });
    f.exports = i;
}), null);
__d("XPrivacySelectorUpdateController", ["XController"], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = c("XController").create("\/privacy\/selector\/update\/", {
        privacy_fbid: {
            type: "String",
            required: true
        },
        post_param: {
            type: "String",
            required: true
        },
        tags: {
            type: "IntVector"
        },
        render_location: {
            type: "Int",
            required: true
        },
        is_saved_on_select: {
            type: "Bool",
            defaultValue: false
        },
        should_return_tooltip: {
            type: "Bool",
            defaultValue: false
        },
        replace_on_select: {
            type: "Bool",
            defaultValue: false
        },
        prefix_tooltip_with_app_privacy: {
            type: "Bool",
            defaultValue: false
        },
        ent_id: {
            type: "String",
            required: true
        },
        reload_selector: {
            type: "Bool",
            defaultValue: false
        }
    });
}), null);
__d('PrivacySelectorBase', ['cx', 'fbt', 'Arbiter', 'ArbiterMixin', 'AsyncRequest', 'Animation', 'Button', 'CSS', 'CurrentUser', 'Focus', 'Input', 'MenuStaticItem', 'MenuSelectableItem', 'PopoverButton', 'PopoverLoadingMenu', 'DataStore', 'PrivacySelectorNewDispatcher', 'PrivacySelectorDataStore', 'PrivacySelectableMenu', 'Run', 'SubscriptionsHandler', 'TooltipData', 'XPrivacySelectorLoggingController', 'XPrivacySelectorUpdateController', 'XUIError', 'bind', 'mixin'], (function a(b, c, d, e, f, g, h, i) {
    var j, k;
    if (c.__markCompiled) c.__markCompiled();
    var l = 3;
    j = babelHelpers.inherits(m, c('mixin')(c('ArbiterMixin')));
    k = j && j.prototype;

    function m(n, o, p, q, r, s) {
        'use strict';
        k.constructor.call(this);
        c('DataStore').set(n, 'selector', this);
        this._root = n;
        this._button = o;
        this._config = s;
        this._menu = p;
        this._popoverMenu = r;
        this._input = q;
        this._isSavedOnSelect = s.is_saved_on_select;
        this._privacyFBID = s.privacy_fbid;
        this._contentType = s.content_type;
        this._renderLocation = s.render_location;
        this._supportsTagExpansion = s.supports_tag_expansion;
        this._skipCleanup = s.skip_cleanup;
        this._prefixTooltipApps = s.should_prefix_tooltip_apps;
        this._shouldDisplayLabel = s.should_display_label;
        this._tags = s.tagged_uids;
        this._hasTags = this._tags.length > 0;
        this._entID = s.ent_id;
        this._popover = this._popoverMenu.getPopover();
        this._receivingUpdate = false;
        this._selectorSyncKey = s.selector_sync_key;
        this._previousParam = null;
        this._listeners = new(c('SubscriptionsHandler'))();
        this._spinnerCount = 0;
        if (s.use_async_menu) {
            this._listeners.addSubscriptions(this._popoverMenu.subscribe('setMenu', function() {
                this._menu = this._popoverMenu.getMenu();
                if (!(this._menu instanceof c('PrivacySelectableMenu'))) return;
                this._onMenuLoad();
                this._onPopoverOpen();
                this.inform('asyncMenuLoaded');
            }.bind(this)));
        } else this._onMenuLoad();
        if (this._selectorSyncKey) this._initSelectorSync();
        c('Run').onLeave(this._cleanup.bind(this));
    }
    m.prototype._cleanup = function() {
        'use strict';
        if (this._skipCleanup) return;
        if (this._menu instanceof c('PrivacySelectableMenu')) this._menu.cleanup();
        this._listeners && this._listeners.release();
        this._listeners = null;
    };
    m.prototype._initSelectorSync = function() {
        'use strict';
        this._listeners.addSubscriptions(c('PrivacySelectorDataStore').subscribe('change', function() {
            c('PrivacySelectorDataStore').get(this._selectorSyncKey, function(n) {
                if (n.unique_id !== this._menu._config.id) {
                    this._receivingUpdate = true;
                    c('XUIError').clear(this._button);
                    if (n.post_param) this.selectOption(n.post_param);
                    n.reload && this.reloadSelector();
                    n.is_error && this._displayErrorWithoutFocus();
                    if (!n.post_param) this._receivingUpdate = false;
                }
            }.bind(this));
        }.bind(this)));
        this._listeners.addSubscriptions(this._menu.subscribe('change', function() {
            if (!this._shouldDisplaySuccessAndFailure()) this._broadcastUpdate();
        }.bind(this)));
    };
    m.prototype._broadcastUpdate = function() {
        'use strict';
        this._broadcastUpdateImpl(false);
    };
    m.prototype._broadcastError = function() {
        'use strict';
        this._broadcastUpdateImpl(true);
    };
    m.prototype._broadcastUpdateImpl = function(n) {
        'use strict';
        if (!this._receivingUpdate) {
            var o = {
                selector_type: this._selectorSyncKey,
                unique_id: this._menu._config.id
            };
            if (n) {
                o.is_error = n;
            } else {
                var p = this._getSelectedOption();
                o.post_param = p.getPostParam().toString();
            }
            c('PrivacySelectorNewDispatcher').handleUpdateFromSelector(o);
        }
    };
    m.prototype.shouldReplaceOnPost = function() {
        'use strict';
        return this._config.replace_on_post;
    };
    m.prototype.getIsPublicSelected = function() {
        'use strict';
        return this._selectedOption && this._selectedOption.isPublic();
    };
    m.prototype.getIsFriendsSelected = function() {
        'use strict';
        return this._selectedOption && this._selectedOption.isFriends();
    };
    m.prototype.getIsOnlyMeSelected = function() {
        'use strict';
        return this._selectedOption && this._selectedOption.isOnlyMe();
    };
    m.prototype.getSelectedBaseValue = function() {
        'use strict';
        return this._selectedOption && this._selectedOption.getBaseValue();
    };
    m.prototype.getSelectedLabelString = function() {
        'use strict';
        return this._selectedOption && this._selectedOption.getLabel();
    };
    m.prototype.getSelectedPostParam = function() {
        'use strict';
        return this._selectedOption && this._selectedOption.getPostParam().toString();
    };
    m.prototype.getIsCustomOptionSelected = function() {
        'use strict';
        return this._selectedOption && this._selectedOption.isCustomOption();
    };
    m.prototype.getIsSavedOnSelect = function() {
        'use strict';
        return this._isSavedOnSelect;
    };
    m.prototype.getPrivacyFBID = function() {
        'use strict';
        return this._privacyFBID;
    };
    m.prototype.setValue = function(n) {
        'use strict';
        this._menu.setValue(n);
    };
    m.prototype.setIsSavedOnSelect = function(n) {
        'use strict';
        this._isSavedOnSelect = n;
    };
    m.prototype.openSelectorExpanded = function(n) {
        'use strict';
        this.openSelector(function() {
            this._menu.expandMenu();
            n && n();
        }.bind(this));
    };
    m.prototype.openSelector = function(n) {
        'use strict';
        if (this._menu instanceof c('PopoverLoadingMenu')) {
            this.subscribeOnce('asyncMenuLoaded', function() {
                n && n();
            }.bind(this));
            this._popover.showLayer();
        } else {
            this._popover.showLayer();
            n && n();
        }
    };
    m.prototype.closeSelector = function() {
        'use strict';
        this._popover.hideLayer();
    };
    m.prototype.getPopover = function() {
        'use strict';
        return this._popover;
    };
    m.prototype.getPopoverMenu = function() {
        'use strict';
        return this._popoverMenu;
    };
    m.prototype.getTriggerButtonElement = function() {
        'use strict';
        return this._button;
    };
    m.prototype.getRoot = function() {
        'use strict';
        return this._root;
    };
    m.prototype.getMenuElement = function() {
        'use strict';
        return this._menu.getRoot();
    };
    m.prototype.selectOption = function(n) {
        'use strict';
        if (!n) return;
        if (this._menu instanceof c('PopoverLoadingMenu')) {
            this.subscribeOnce('asyncMenuLoaded', this._selectOptionImpl.bind(this, n));
            this._fetchAsyncMenu();
        } else this._selectOptionImpl(n);
    };
    m.prototype._selectOptionImpl = function(n) {
        'use strict';
        var o = this._menu.selectOption(n);
        if (!o) {
            this._menu.subscribeOnce('selectOption', function() {
                var p = this.getIsSavedOnSelect();
                this.setIsSavedOnSelect(false);
                this._updateMenu();
                this.setIsSavedOnSelect(p);
                this._finishSpinnerSuccess();
            }.bind(this));
            this._showSpinner();
        }
        this._updateMenu();
    };
    m.prototype._updateMenu = function() {
        'use strict';
        this._selectedOption = this._getSelectedOption();
        this.updateDataForItemIndex(this._selectedOption.getIndex(), this._selectedOption.getPostParam().toString());
    };
    m.prototype._fetchAsyncMenu = function() {
        'use strict';
        if (this._config.use_async_menu) this._popoverMenu.fetchMenu();
    };
    m.prototype._getSelectedOption = function() {
        'use strict';
        return this._menu instanceof c('PrivacySelectableMenu') ? this._menu.getSelectedOption() : null;
    };
    m.prototype._onItemClick = function(n, o) {
        'use strict';
        var p = o.item;
        if (p instanceof c('MenuStaticItem')) return;
        if (p.isBasicOption()) {
            this.updateDataForItemIndex(p.getIndex(), p.getPostParam().toString());
        } else if (p.isCustomOption()) {
            this._closeForCustom = true;
            p.openDialog(this);
        }
        this.inform('click', {
            customSelected: p.isCustomOption()
        });
    };
    m.prototype.getContentType = function() {
        'use strict';
        return this._contentType;
    };
    m.prototype.getRenderLocation = function() {
        'use strict';
        return this._renderLocation;
    };
    m.prototype.getPostParam = function() {
        'use strict';
        return this._postParam;
    };
    m.prototype.getTags = function() {
        'use strict';
        return this._tags;
    };
    m.prototype.updateDataForItemIndex = function(n, o) {
        'use strict';
        var p = this._menu.getItemForIndex(n);
        if (p.isCustomOption()) p.setPostParam(o);
        this._selectedOption = p;
        this._previousParam = this._postParam;
        this._postParam = o;
        c('Input').setValue(this._input, o);
        this._updateTriggerButtonLabelAndIcon();
        this._updateTooltipAndSavePrivacyIfNeeded();
        this.inform('changed', {
            post_param: this._postParam,
            base_value: this.getSelectedBaseValue()
        });
    };
    m.prototype._shouldUpdateTooltips = function() {
        'use strict';
        return this._prefixTooltipApps || this._supportsTagExpansion || this.getIsCustomOptionSelected();
    };
    m.prototype._updateTooltip = function() {
        'use strict';
        this._updateTooltipAndSavePrivacyIfNeededImpl(false);
    };
    m.prototype._updateTooltipAndSavePrivacyIfNeeded = function() {
        'use strict';
        this._updateTooltipAndSavePrivacyIfNeededImpl(true);
    };
    m.prototype._updateTooltipAndSavePrivacyIfNeededImpl = function(n) {
        'use strict';
        if (this._shouldUpdateTooltips()) this._updateTooltipToLoading();
        this._sendUpdateRequest(n);
        if (!this._shouldUpdateTooltips()) this._setTooltipValue(this._selectedOption.getTooltip());
    };
    m.prototype.reloadSelector = function() {
        'use strict';
        this._cleanup();
        var n = c('XPrivacySelectorUpdateController').getURIBuilder().setString('privacy_fbid', String(this._privacyFBID)).setString('post_param', this._postParam).setInt('render_location', this._renderLocation).setBool('reload_selector', true).setString('ent_id', String(this._entID)).getURI();
        new(c('AsyncRequest'))().setRelativeTo(this._root).setHandler(this.inform.bind(this, 'reloaded')).setURI(n).send();
    };
    m.prototype._sendUpdateRequest = function(n) {
        'use strict';
        n = n && this._isSavedOnSelect && !this._receivingUpdate;
        var o = this._shouldUpdateTooltips();
        if (!n && !o) {
            this._receivingUpdate = false;
            return;
        }
        n && this._showSpinner();
        var p = c('XPrivacySelectorUpdateController').getURIBuilder().setString('privacy_fbid', String(this._privacyFBID)).setString('post_param', this._postParam).setIntVector('tags', this._tags).setInt('render_location', this._renderLocation).setBool('is_saved_on_select', n).setBool('should_return_tooltip', o).setBool('prefix_tooltip_with_app_privacy', this._prefixTooltipApps).setBool('replace_on_select', this._config.replace_on_select).setString('ent_id', String(this._entID)).getURI(),
            q = new(c('AsyncRequest'))().setRelativeTo(this._root).setHandler(c('bind')(this, function(r) {
                if (n && this._shouldDisplaySuccessAndFailure()) {
                    this._finishSpinnerSuccess();
                    this._broadcastUpdate();
                }
                if (this._config.replace_on_select) this._cleanup();
                var s = r && r.payload && r.payload.tooltip;
                s && this._setTooltipValue(r.payload.tooltip);
                this.inform('selector_updated');
            })).setFinallyHandler(c('bind')(this, function(r) {
                this._receivingUpdate = false;
            })).setURI(p);
        if (n && this._shouldDisplaySuccessAndFailure()) q.setErrorHandler(c('bind')(this, function(r) {
            if (this._receivingUpdate) {
                this._displayErrorWithoutFocus();
                return;
            }
            this._menu.selectOption(this._previousParam);
            this._postParam = this._previousParam;
            this._displayError();
            this._broadcastError();
        }));
        q.send();
    };
    m.prototype._showSpinner = function() {
        'use strict';
        if (!this._shouldDisplaySuccessAndFailure()) return;
        if (!this.getIsSavedOnSelect()) return;
        if (this._spinnerCount === 0) {
            c('XUIError').clear(this._button);
            c('Button').setIcon(this._button, this._config.spinner);
            c('CSS').show(this._config.spinner);
            c('CSS').hide(this._config.checkmark);
        }
        this._spinnerCount++;
    };
    m.prototype._finishSpinnerSuccess = function() {
        'use strict';
        if (!this._shouldDisplaySuccessAndFailure()) return;
        if (!this.getIsSavedOnSelect()) return;
        this._spinnerCount--;
        if (this._spinnerCount === 0) {
            c('CSS').hide(this._config.spinner);
            this._updateTriggerButtonLabelAndIcon();
            if (this._config.checkmark) {
                var n = c('Button').getIcon(this._button);
                c('CSS').hide(n);
                new(c('Animation'))(this._config.checkmark).show().from('opacity', 0).to('opacity', 1).duration(400).checkpoint().duration(200).checkpoint().from('opacity', 1).to('opacity', 0).duration(400).hide().ondone(function() {
                    new(c('Animation'))(n).show().from('opacity', 0).to('opacity', 1).duration(300).go();
                }).go();
            }
        }
    };
    m.prototype._displayError = function() {
        'use strict';
        this._spinnerCount--;
        this._displayErrorImpl(true);
    };
    m.prototype._displayErrorWithoutFocus = function() {
        'use strict';
        this._displayErrorImpl(false);
    };
    m.prototype._displayErrorImpl = function(n) {
        'use strict';
        if (this._shouldDisplaySuccessAndFailure()) {
            c('PopoverButton').setLabel(this._button, i._("Select Audience"));
            c('Button').setIcon(this._button, this._config.error_icon);
            c('CSS').show(this._config.error_icon);
            c('TooltipData').remove(this._button);
            n && c('Focus').setWithoutOutline(this._button);
            c('XUIError').set({
                target: this._button,
                message: i._("Your selection might not have been saved. We recommend trying again later.")
            });
        }
    };
    m.prototype.informTagsChanged = function(n) {
        'use strict';
        var o = this._getTags(n);
        this.informTagsChangedWithIDs(o);
    };
    m.prototype.informTagsChangedWithIDs = function(n) {
        'use strict';
        var o = !n.length;
        if (this._hasTags === o) {
            this._hasTags = !!n.length;
            this._menu.updateOptionsAfterTagExpansion(this._showTagExpansion());
            this._updateTriggerButtonLabelAndIcon();
        }
        if (this._tags.length !== n.length) {
            this._tags = n;
            this._updateTooltip();
            c('Arbiter').inform('PrivacySelectorBase/changed', this._getChangedData());
        }
    };
    m.prototype._getChangedData = function() {
        'use strict';
        return {
            tags: this._tags,
            privacy: this.getSelectedBaseValue()
        };
    };
    m.prototype._showTagExpansion = function() {
        'use strict';
        return this._hasTags;
    };
    m.prototype._getTags = function(n) {
        'use strict';
        var o = [],
            p = c('CurrentUser').getID();
        if (n.withTags)
            for (var q = 0; q < n.withTags.length; q++) {
                var r = n.withTags[q].info;
                if (r.uid != p) o.push(r.uid);
            }
        if (n.mention)
            for (var s in n.mention)
                if (n.mention[s].type == 'user' && n.mention[s].uid != p) o.push(n.mention[s].uid);
        return o;
    };
    m.prototype._updateTriggerButtonLabelAndIcon = function() {
        'use strict';
        if (this._spinnerCount === 0) {
            var n = this._selectedOption.getTriggerIcon();
            if (this._config.trigger_no_icon) c('CSS').hide(n);
            c('Button').setIcon(this._button, n.cloneNode());
        }
        if (!this._shouldDisplayLabel) return;
        c('PopoverButton').setLabel(this._button, this._selectedOption.getTriggerLabel());
        if (this._config.trigger_style === l) {
            c('CSS').conditionClass(this.getTriggerButtonElement(), "_mw-", this.getIsOnlyMeSelected());
            c('CSS').conditionClass(this.getTriggerButtonElement(), "_mw_", this.getIsPublicSelected());
        }
    };
    m.prototype._updateTooltipToLoading = function() {
        'use strict';
        var n = i._("Loading...");
        this._setTooltipValue(n);
    };
    m.prototype._setTooltipValue = function(n) {
        'use strict';
        n && c('TooltipData').set(this._button, n);
    };
    m.prototype._onPopoverClose = function() {
        'use strict';
        if (!this._getSelectedOption()) return;
        if (this._closeForCustom) {
            this._closeForCustom = false;
        } else this.inform('selectorFinished');
        this.inform('close');
    };
    m.prototype._onPopoverOpen = function() {
        'use strict';
        if (!(this._menu instanceof c('PrivacySelectableMenu'))) return;
        this._menu.onPopoverOpen(this._getSelectedOption());
        var n = c('XPrivacySelectorLoggingController').getURIBuilder().setEnum('event', 'opened').setInt('render_location', this._renderLocation).setString('content_type', this._contentType).getURI();
        new(c('AsyncRequest'))().setURI(n).send();
        this.inform('open');
    };
    m.prototype._onMenuLoad = function() {
        'use strict';
        this._listeners.addSubscriptions(this._menu.subscribe('itemclick', this._onItemClick.bind(this)), this._popover.subscribe('hide', this._onPopoverClose.bind(this)), this._popover.subscribe('show', this._onPopoverOpen.bind(this)));
        this._listeners.addSubscriptions(this._menu.subscribe('expandMenu', function() {
            if (this._popover && this._popover.getLayer()) this._popover.getLayer().updatePosition();
            this._selectedOption = this._getSelectedOption();
        }.bind(this)));
        this._selectedOption = this._getSelectedOption();
        if (this._selectedOption) {
            this._postParam = this._selectedOption.getPostParam().toString();
            this._previousParam = this._postParam;
            this._hasAudienceExpansion() && this._updateTriggerButtonLabelAndIcon();
        }
    };
    m.prototype._hasAudienceExpansion = function() {
        'use strict';
        return this._hasTags;
    };
    m.prototype._shouldDisplaySuccessAndFailure = function() {
        'use strict';
        return this._config.spinner && this._config.checkmark && this._config.error_icon;
    };
    f.exports = m;
}), null);
__d('PubcontentFeedChainingControllerLoader', ['Arbiter', 'Bootloader', 'PageLikeConstants', 'SubscriptionsHandler', 'UFIUIEvents', 'AttachmentRelatedShareConstants'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = [c('PageLikeConstants').LIKED, c('UFIUIEvents').ActionLinkLike, c('UFIUIEvents').ReactionButtonClicked, c('UFIUIEvents').Comment, c('UFIUIEvents').ActionAddComment, 'composer/publish', 'LitestandComposer/publish', c('AttachmentRelatedShareConstants').ARTICLE_CLICK, c('AttachmentRelatedShareConstants').VIDEO_CLICK, c('AttachmentRelatedShareConstants').FBVIDEO_CLICK, c('AttachmentRelatedShareConstants').FBVIDEO_VIEW, c('AttachmentRelatedShareConstants').GAME_CLICK, c('AttachmentRelatedShareConstants').PHOTO_CLICK, c('AttachmentRelatedShareConstants').EVENT_JOIN, c('AttachmentRelatedShareConstants').PRODUCT_CLICK],
        i = null,
        j = false,
        k = void 0,
        l = null,
        m = {
            init: function n(o) {
                k = o;
                if (l) {
                    l.init({
                        isLazy: false,
                        sponsoredLinkSelector: k
                    });
                } else this._startListening();
            },
            _startListening: function n() {
                if (i) return;
                i = new(c('SubscriptionsHandler'))();
                i.addSubscriptions(c('Arbiter').subscribe(h, function(event, o) {
                    c('Arbiter').inform(event + '.lazy', o, c('Arbiter').BEHAVIOR_PERSISTENT);
                    this._bootload();
                }.bind(this)));
            },
            _bootload: function n() {
                if (j) return;
                j = true;
                c('Bootloader').loadModules(["PubcontentFeedChainingControllerX"], function(o) {
                    i && i.release();
                    l = o;
                    l.init({
                        isLazy: true,
                        sponsoredLinkSelector: k
                    });
                }, 'PubcontentFeedChainingControllerLoader');
            }
        };
    f.exports = m;
}), null);
__d('ReactFeedComposerXBody', ['DOM', 'Event', 'SubscriptionsHandler'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();

    function h(i) {
        this.$ReactFeedComposerXBody2 = i.root;
        this.$ReactFeedComposerXBody4 = c('DOM').find(this.$ReactFeedComposerXBody2, 'textarea');
        this.$ReactFeedComposerXBody1 = c('DOM').find(this.$ReactFeedComposerXBody2, 'input[type="hidden"]');
        this.$ReactFeedComposerXBody3 = new(c('SubscriptionsHandler'))();
        this.$ReactFeedComposerXBody3.addSubscriptions(c('Event').listen(this.$ReactFeedComposerXBody4, 'change', this.$ReactFeedComposerXBody5.bind(this)));
    }
    h.prototype.$ReactFeedComposerXBody5 = function(i) {
        this.$ReactFeedComposerXBody1.value = i.target.value;
    };
    f.exports = h;
}), null);
__d('FeedAdsGapRuleViolationDetection', ['csx', 'cx', 'Banzai', 'BanzaiODS', 'CSS', 'DataAttributeUtils', 'DOM', 'ge', 'isEmpty'], (function a(b, c, d, e, f, g, h, i) {
    if (c.__markCompiled) c.__markCompiled();
    var j = 'ei',
        k = 'qid',
        l = 'gap rule violation',
        m = 'non violating ads gap',
        n = 'first position violation',
        o = 'feed load',
        p = 'first position invalidation',
        q = 'spacing invalidation',
        r = 'ego_pymk',
        s = 'ego_other',
        t = [],
        u = [],
        v = [],
        w = {},
        x = {},
        y = {},
        z = [],
        aa = {
            registerFeedStories: function ba(ca, da) {
                if (ca.containerID == 'substream_0') {
                    t = [];
                    u = [];
                }
                var ea = c('ge')(ca.containerID);
                if (!ea) return;
                y = ca.egoGapRule;
                z = ca.egoStories;
                w = babelHelpers['extends']({}, ca.demoAdChecks, w);
                var fa = this._getAllStoriesFromContainer(ea);
                if (ca.isLoggingEnabled && fa.length !== 0) this._logFeedLoad();
                if (ca.isNewerStories) {
                    t = fa.concat(t);
                } else t = t.concat(fa);
                for (var ga in ca.minGaps)
                    if (ca.minGaps.hasOwnProperty(ga)) x[ga] = ca.minGaps[ga];
                if (c('isEmpty')(w)) {
                    if (ca.isLoggingEnabled) this._checkFirstPosViolation(ca, ea);
                    if (ca.isLoggingEnabled || ca.isGapRuleInvalidationEnabled) this._checkGapRuleViolation(ca);
                }
                if (ca.invalidateEgo) this._checkEgoGapRuleViolation(ca);
            },
            _getAllStoriesFromContainer: function ba(ca) {
                return c('DOM').scry(ca, "div._5jmm").map(this._convertStoryNodeToObject).filter(function(da) {
                    return da !== null;
                });
            },
            _convertStoryNodeToObject: function ba(ca) {
                if (c('CSS').matchesSelector(ca, "._170y")) return null;
                var da = ca.getAttribute('data-dedupekey');
                if (w[da]) return null;
                var ea = c('DOM').scry(ca, "div._hye"),
                    fa = c('DOM').scry(ca, "li._170x"),
                    ga = [];
                if (ea.length !== 0) {
                    ga = ea.map(function(ja) {
                        return c('DataAttributeUtils').getDataFt(ja);
                    }).filter(function(ja) {
                        return ja !== null;
                    });
                } else if (fa.length !== 0) {
                    ga = fa.map(function(ja) {
                        return c('DataAttributeUtils').getDataFt(ja);
                    }).filter(function(ja) {
                        return ja !== null;
                    });
                } else if (c('DataAttributeUtils').getDataFt(ca)) ga = [c('DataAttributeUtils').getDataFt(ca)];
                if (!ga.length) return null;
                var ha = JSON.parse(ga[0]),
                    ia = {
                        dataFTArray: ga,
                        dedupKey: da,
                        isSponsored: !!ha[j],
                        isEgoPymk: z[da] === r,
                        isEgoOther: z[da] === s,
                        height: ca.offsetHeight,
                        qid: parseInt(ha[k], 10),
                        nodeID: ca.id
                    };
                return ia;
            },
            _checkFirstPosViolation: function ba(ca, da) {
                while (t.length > 0 && t[0].isSponsored) {
                    var ea = {
                            ftArray: t[0].dataFTArray,
                            qid: t[0].qid,
                            nodeid: t[0].nodeID,
                            firstStoryType: ca.firstStoryType
                        },
                        fa = c('DOM').scry(da, '.uiBoxRed')[0];
                    if (fa) {
                        var ga = fa.textContent || fa.innerText;
                        if (ga) ea.error_msg = ga;
                    }
                    if (ca.isLoggingEnabled && !(t[0].dedupKey in v)) {
                        this._logFirstPosViolation(ea);
                        v[t[0].dedupKey] = ea;
                    }
                    break;
                }
            },
            _getMinGap: function ba(ca, da, ea) {
                var fa = Math.min(ca ? ca : Number.MAX_VALUE, da ? da : Number.MAX_VALUE);
                return fa !== Number.MAX_VALUE ? fa : ea;
            },
            _getStoryDedupKeys: function ba() {
                return t.map(function(ca) {
                    return ca.dedupKey;
                });
            },
            _getStoryDedupKeysJSONString: function ba(ca, da) {
                var ea = [];
                for (var fa = ca; fa <= da; fa++) ea.push(t[fa].dedupKey);
                return JSON.stringify(ea);
            },
            _getIdxOfStoryToSwap: function ba(ca, da) {
                if (da >= t.length - ca) return -1;
                for (var ea = ca + 1; ea < t.length && da > 0; ea++) {
                    if (!t[ea].isSponsored) {
                        da--;
                    } else return -1;
                    if (da === 0) return ea;
                }
                return -1;
            },
            _checkGapRuleViolation: function ba(ca) {
                var da = null,
                    ea = null,
                    fa = 0;
                for (var ga = 0; ga < t.length; ga++) {
                    var ha = t[ga];
                    fa += ha.height;
                    if (ha.isSponsored) {
                        fa -= ha.height;
                        var ia = false,
                            ja = false;
                        if (da !== null) {
                            var ka = ga - da,
                                la = null,
                                ma = this._getMinGap(x[ea.dedupKey], x[ha.dedupKey], ca.defaultMinGap);
                            if (ka < ma) {
                                la = l;
                            } else la = m;
                            var na = {
                                ftArray_A: ea.dataFTArray,
                                ftArray_B: ha.dataFTArray,
                                dist: ka,
                                pdist: fa,
                                pos: ga + 1,
                                qid_A: ea.qid,
                                qid_B: ha.qid,
                                event_type: la,
                                nodeid: ha.nodeID,
                                dedupKeys: this._getStoryDedupKeysJSONString(da, ga)
                            };
                            if (ca.isLoggingEnabled)
                                if (!(ha.dedupKey in u) || u[ha.dedupKey].event_type !== la) {
                                    this._logAdsGapEvent(na);
                                    u[ha.dedupKey] = na;
                                }
                            if (ca.isGapRuleInvalidationEnabled && la == l) {
                                var oa = -1;
                                if (ca.isSwapOnGapRuleViolationEnabled) oa = this._getIdxOfStoryToSwap(ga, ma - ka);
                                if (oa > 0) {
                                    this._shiftAdOrEgoBelowOrganicStory(ha.nodeID, t[oa].nodeID);
                                    var pa = t[ga];
                                    t.splice(ga, 1);
                                    t.splice(oa, 0, pa);
                                    if (ca.isLoggingEnabled) {
                                        var qa = {
                                            ft: t[oa].dataFTArray[0],
                                            dist: oa - ga,
                                            qid: t[oa].qid,
                                            event_type: 'ad_swap'
                                        };
                                        c('Banzai').post('feed_ads_gap_rule_violation', qa);
                                    }
                                    ja = true;
                                    ha = t[ga];
                                    fa += ha.height;
                                } else if (ca.isGapRuleInvalidationEnabled) {
                                    this._invalidateGapRuleViolatedAd(na);
                                    ia = true;
                                    t.splice(ga--, 1);
                                }
                            }
                        }
                        if (!ia && !ja) {
                            da = ga;
                            ea = ha;
                            fa = 0;
                        }
                    }
                }
            },
            _getMinGapBetweenStories: function ba(ca, da) {
                var ea = '';
                if (ca.isSponsored || ca.isEgoOther) {
                    ea = 'ad';
                } else if (ca.isEgoPymk) {
                    ea = 'pymk';
                } else return 0;
                var fa = '';
                if (da.isSponsored || da.isEgoOther) {
                    fa = 'ad';
                } else if (da.isEgoPymk) {
                    fa = 'pymk';
                } else return 0;
                return y[ea + '_' + fa];
            },
            _checkEgoGapRuleViolation: function ba(ca) {
                var da = null,
                    ea = null;
                for (var fa = 0; fa < t.length; fa++) {
                    var ga = t[fa];
                    if (ga.isEgoPymk || ga.isEgoOther) {
                        var ha = false;
                        if (da !== null) {
                            var ia = fa - da,
                                ja = this._getMinGapBetweenStories(ea, t[fa]);
                            if (ia < ja) {
                                ha = true;
                                var ka = -1,
                                    la = ja - ia;
                                for (var ma = fa + 1; ma < t.length; ma++) {
                                    if (t[ma].isSponsored || t[ma].isEgoPymk || t[ma].isEgoOther) {
                                        break;
                                    } else la--;
                                    if (la === 0) {
                                        ka = ma;
                                        break;
                                    }
                                }
                                if (ka > 0) {
                                    this._swapAndLogEgo(fa, ma);
                                } else {
                                    this._invalidateAndLogEgo(fa);
                                    fa--;
                                }
                            }
                        }
                        if (!ha) {
                            da = fa;
                            ea = ga;
                        }
                    }
                    if (ga.isSponsored) {
                        da = fa;
                        ea = ga;
                    }
                }
            },
            _swapAndLogEgo: function ba(ca, da) {
                this._shiftAdOrEgoBelowOrganicStory(t[ca].nodeID, t[da].nodeID);
                var ea = t[ca];
                t.splice(ca, 1);
                t.splice(da, 0, ea);
                c('BanzaiODS').bumpEntityKey('feed_ego_invalidation', 'swap');
            },
            _invalidateAndLogEgo: function ba(ca) {
                var da = c('ge')(t[ca].nodeID);
                da && c('CSS').hide(da);
                t.splice(ca, 1);
                c('BanzaiODS').bumpEntityKey('feed_ego_invalidation', 'invalidate');
            },
            _logFirstPosViolation: function ba(ca) {
                var da = {
                    ft: ca.ftArray[0],
                    event_type: n,
                    intValues: {
                        qid: ca.qid
                    },
                    first_story_type: ca.firstStoryType
                };
                if (ca.error_msg) da.error_msg = ca.error_msg;
                c('Banzai').post('feed_ads_gap_rule_violation', da);
            },
            _logAdsGapEvent: function ba(ca) {
                var da = {
                    ft_A: ca.ftArray_A[0],
                    ft_B: ca.ftArray_B[0],
                    event_type: ca.event_type,
                    intValues: {
                        dist: ca.dist,
                        pdist: ca.pdist,
                        pos: ca.pos,
                        qid_A: ca.qid_A,
                        qid_B: ca.qid_B
                    },
                    dedup_keys: ca.dedupKeys
                };
                c('Banzai').post('feed_ads_gap_rule_violation', da);
            },
            _logFeedLoad: function ba() {
                var ca = {
                    event_type: o
                };
                c('Banzai').post('feed_ads_gap_rule_violation', ca);
            },
            _invalidateFirstPosAd: function ba(ca) {
                c('CSS').hide(c('ge')(ca.nodeid));
                var da = {
                    ft_array: ca.ftArray,
                    event_type: p
                };
                c('Banzai').post('feed_ads_gap_rule_violation', da);
            },
            _invalidateGapRuleViolatedAd: function ba(ca) {
                var da = c('ge')(ca.nodeid);
                da && c('CSS').hide(da);
                var ea = {
                    ft_array_A: ca.ftArray_A,
                    ft_array_B: ca.ftArray_B,
                    event_type: q
                };
                c('Banzai').post('feed_ads_gap_rule_violation', ea);
            },
            _shiftAdOrEgoBelowOrganicStory: function ba(ca, da) {
                var ea = c('ge')(ca),
                    fa = c('ge')(da);
                ea && fa && c('DOM').insertAfter(fa, ea);
            }
        };
    f.exports = aa;
}), null);
__d('StoryPositionTracking', ['csx', 'DataAttributeUtils', 'DOM', 'LitestandStream', 'ge'], (function a(b, c, d, e, f, g, h) {
    if (c.__markCompiled) c.__markCompiled();
    var i = 0;

    function j(m, n) {
        var o = JSON.parse(c('DataAttributeUtils').getDataFt(m));
        if (o) {
            o.insertion_position = n;
            c('DataAttributeUtils').setDataFt(m, JSON.stringify(o));
        }
    }

    function k(m) {
        return c('DOM').scry(m, "._5jmm");
    }
    var l = {
        registerNewStories: function m(n) {
            if (n == 'substream_0') i = 0;
            var o = k(c('ge')(n)),
                p = o.length;
            for (var q = 0; q < p; q++) j(o[q], i++);
        },
        updateAllStories: function m() {
            var n = k(c('LitestandStream').getStreamRoot()),
                o = n.length;
            i = 0;
            for (var p = 0; p < o; p++) j(n[p], i++);
        }
    };
    f.exports = l;
}), null);
__d('FbFeedAttachmentRelatedShare', ['csx', 'Arbiter', 'AttachmentRelatedShareConstants', 'DOMQuery', 'Event', 'tidyEvent'], (function a(b, c, d, e, f, g, h) {
    if (c.__markCompiled) c.__markCompiled();
    var i = {
        loadRelatedAttachment: function j(k, l) {
            c('tidyEvent')(c('Event').listen(k, 'click', function() {
                c('Arbiter').inform(c('AttachmentRelatedShareConstants').ARTICLE_CLICK, {
                    attachment: k,
                    global_share_id: l
                });
            }));
        },
        loadRelatedGameAttachment: function j(k, l) {
            c('tidyEvent')(c('Event').listen(k, 'click', function() {
                c('Arbiter').inform(c('AttachmentRelatedShareConstants').GAME_CLICK, {
                    attachment: k,
                    global_share_id: l
                });
            }));
        },
        loadRelatedAttachmentForStream: function j(k) {
            var l = function m(event, n) {
                var o = event.getTarget();
                if (o.getAttribute('target') !== '_blank') return;
                var p = "^div._5pbx",
                    q = "^div._5pc9",
                    r = c('DOMQuery').scry(o, p)[0] || c('DOMQuery').scry(o, q)[0];
                if (!r) return;
                c('Arbiter').inform(c('AttachmentRelatedShareConstants').ARTICLE_CLICK, {
                    attachment: r,
                    global_share_id: 0,
                    link_url: o.getAttribute('href'),
                    is_right_click: n
                });
            };
            c('tidyEvent')(c('Event').listen(k, 'click', function(event) {
                l(event, false);
            }));
            c('tidyEvent')(c('Event').listen(k, 'mousedown', function(event) {
                if (event.which == 3 || event.button == 2) l(event, true);
            }));
        }
    };
    f.exports = i;
}), null);
__d('FbFeedViewportTracking', ['csx', 'Arbiter', 'LitestandMessages', 'LitestandStream', 'StreamViewportTracking', 'viewportTrackingBuilder'], (function a(b, c, d, e, f, g, h) {
    'use strict';
    var i, j;
    if (c.__markCompiled) c.__markCompiled();

    function k(n, o) {
        return c('StreamViewportTracking').getBehavior(n, c('LitestandStream').getStreamRoot(), o);
    }
    i = babelHelpers.inherits(l, c('StreamViewportTracking'));
    j = i && i.prototype;
    l.prototype.init = function(n) {
        j.init.call(this, n);
        this.invalidateAllStoriesCache = this.invalidateAllStoriesCache.bind(this);
        this.stopTimeTrackingData = this.updateTimeTrackingData.bind(this, true);
        this.subscriptions.addSubscriptions(c('Arbiter').subscribe(c('LitestandMessages').STORIES_INSERTED, this.invalidateAllStoriesCache), c('Arbiter').subscribe(c('LitestandMessages').LEAVE_HOME, this.stopTimeTrackingData));
    };
    l.prototype.getSessionID = function() {
        return c('LitestandStream').getFeedStreamID();
    };
    l.prototype.cleanup = function() {
        m.clearSingleton();
        j.cleanup.call(this);
    };

    function l() {
        i.apply(this, arguments);
    }
    var m = c('viewportTrackingBuilder')(function(n) {
        var o = new l(k(n, "._5jmm"));
        o.init(n);
        return o;
    });
    m.init = m.factory.bind(m);
    f.exports = m;
}), null);
__d("XDOMScannerResultsController", ["XController"], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = c("XController").create("\/ascend_mr_no\/", {});
}), null);