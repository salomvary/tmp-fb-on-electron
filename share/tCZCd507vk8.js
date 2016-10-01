if (self.CavalryLogger) {
    CavalryLogger.start_js(["LTOMU"]);
}

__d("FunnelRegistry", [], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = {
        WWW_EXAMPLE_FUNNEL: true,
        MSITE_EXAMPLE_FUNNEL: true,
        WWW_FEED_SHARE_DIALOG_FUNNEL: true,
        MSITE_FEED_SHARE_DIALOG_FUNNEL: true,
        PLATFORM_SHARE_DIALOG_FUNNEL: true,
        WWW_RECRUITING_SEARCH_FUNNEL: true,
        WWW_CANVAS_EDITOR_FUNNEL: true,
        MSITE_COMMENT_TYPING_FUNNEL: true,
        MSITE_NOTE_READING_FUNNEL: true,
        WWW_CAMPFIRE_COMPOSER_UPSELL_FUNNEL: true,
        WWW_REACTIONS_LIKE_BUTTON_HOVER_FUNNEL: true,
        WWW_REACTIONS_NUX_FUNNEL: true,
        MSITE_INLINE_REPLY_COMPOSER_FUNNEL: true,
        WWW_LEAD_GEN_FORM_CREATION_FUNNEL: true,
        WWW_LEAD_GEN_DESKTOP_AD_UNIT_FUNNEL: true,
        WWW_LEAD_GEN_MSITE_AD_UNIT_FUNNEL: true,
        WWW_LINK_PICKER_DIALOG_FUNNEL: true,
        WWW_MEME_PICKER_DIALOG_FUNNEL: true,
        WWW_SNOWLIFT_ACTIONS_FUNNEL: true,
        WWW_CANVAS_AD_CREATION_FUNNEL: true,
        WWW_SEARCH_AWARENESS_LEARNING_NUX_FUNNEL: true,
        WWW_CONSTITUENT_TITLE_UPSELL_FUNNEL: true,
        MTOUCH_PAGE_CREATION_FUNNEL: true,
        WWW_PAGE_CREATION_FUNNEL: true,
        WWW_VIDEOS_CASTING_FUNNEL: true,
        MSITE_PPD_FUNNEL: true,
        WWW_CMS_SEARCH_FUNNEL: true,
        SOCIAL_SEARCH_CONVERSION_WWW_FUNNEL: true,
        SOCIAL_SEARCH_DASHBOARD_WWW_FUNNEL: true,
        GAMES_QUICKSILVER_FUNNEL: true,
        SRT_USER_FLOW_FUNNEL: true,
        WWW_MEME_PIVOT_FUNNEL: true,
        WWW_NOTIFICATION_FUNNEL: true,
        MSITE_HASHTAG_PROMPT_FUNNEL: true,
        WWW_ACCESSIBILITY_NOTIFICATIONS_JEWEL_TABBING_FUNNEL: true,
        MTOUCH_FEED_MISSED_STORIES_FUNNEL: true,
        WWW_STORYSET_FUNNEL: true,
        POLYGLOT_MAIN_FUNNEL: true
    };
}), null);
__d('XAsyncRequest', ['AsyncRequest'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(i) {
        'use strict';
        this.$XAsyncRequest1 = new(c('AsyncRequest'))(i);
    }
    h.prototype.setMethod = function(i) {
        'use strict';
        this.$XAsyncRequest1.setMethod(i);
        return this;
    };
    h.prototype.setData = function(i) {
        'use strict';
        this.$XAsyncRequest1.setData(i);
        return this;
    };
    h.prototype.setHandler = function(i) {
        'use strict';
        this.$XAsyncRequest1.setHandler(i);
        return this;
    };
    h.prototype.setErrorHandler = function(i) {
        'use strict';
        this.$XAsyncRequest1.setErrorHandler(i);
        return this;
    };
    h.prototype.send = function() {
        'use strict';
        this.$XAsyncRequest1.send();
        return this;
    };
    h.prototype.abort = function() {
        'use strict';
        this.$XAsyncRequest1.abort();
    };
    f.exports = h;
}), null);
__d('FacebarTypeaheadSeeMore', ['cx', 'fbt', 'FacebarGSv2Echo', 'FacebarGlobalOptions', 'FacebarJSConstants', 'FacebarKeywordSearchUtils', 'FacebarStructuredText'], (function a(b, c, d, e, f, g, h, i) {
    if (c.__markCompiled) c.__markCompiled();

    function j(k) {
        'use strict';
        this.$FacebarTypeaheadSeeMore1 = k.getCore();
        this.$FacebarTypeaheadSeeMore2 = this.$FacebarTypeaheadSeeMore1.view;
    }
    j.prototype.enable = function() {
        'use strict';
        this.$FacebarTypeaheadSeeMore3 = this.$FacebarTypeaheadSeeMore2.subscribe('seeMore', this.$FacebarTypeaheadSeeMore4.bind(this));
    };
    j.prototype.disable = function() {
        'use strict';
        this.$FacebarTypeaheadSeeMore3.unsubscribe();
    };
    j.prototype.$FacebarTypeaheadSeeMore4 = function(k, l) {
        'use strict';
        var m = l.value.toString().trim();
        m = c('FacebarGSv2Echo').normalizeValue(m);
        var n = c('FacebarKeywordSearchUtils').makeFacebarEntry(m),
            o = void 0;
        if (c('FacebarGlobalOptions').hasKeywordOnlyTypeahead) {
            o = i._("See all results for {query}", [i.param('query', m)]);
        } else o = i._("See all results for \"{query}\"", [i.param('query', m)]);
        return babelHelpers['extends']({}, n, {
            query_string: m,
            icon_class: "_5b1w",
            isSeeMore: true,
            structure: c('FacebarStructuredText').fromString(m),
            displayStructure: c('FacebarStructuredText').fromString(String(o)),
            uri: n.uri,
            tags: {},
            isSingleState: this.$FacebarTypeaheadSeeMore1.data.getSingleState(),
            keywordType: c('FacebarJSConstants').keywordTypes.escape,
            keywordSource: c('FacebarJSConstants').keywordTypes.escape
        });
    };
    f.exports = j;
}), null);
__d('FunnelAction', [], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    var h = 'name',
        i = 'relative_time',
        j = 'tag';

    function k(l, m, n) {
        this.$FunnelAction1 = {};
        this.$FunnelAction1[h] = l;
        this.$FunnelAction1[i] = m;
        if (n !== undefined) this.$FunnelAction1[j] = n;
    }
    k.prototype.getData = function() {
        return this.$FunnelAction1;
    };
    f.exports = k;
}), null);
__d('Funnel', ['invariant', 'FunnelAction', 'FunnelRegistry', 'sprintf'], (function a(b, c, d, e, f, g, h) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    var i = 'name',
        j = 'instance_id',
        k = 'start_time',
        l = 'tags',
        m = 'actions',
        n = 'sampling_rate',
        o = 'timeout_sec',
        p = {
            EXPLICIT: 'explicit',
            TIMEOUT: 'timeout',
            SESSION_END: 'session_end',
            RESTART: 'restart',
            ACTIONS_FULL: 'actions_full'
        },
        q = {
            ACTION_END: 'funnel_end',
            ACTION_WINDOW_BLUR: 'window_blur',
            ACTION_WINDOW_FOCUS: 'window_focus'
        },
        r = 600;

    function s(t, u, v, w) {
        !(c('FunnelRegistry')[t] === true) ? h(0): void 0;
        this.$Funnel1 = t;
        this.$Funnel2 = u;
        this.$Funnel3 = [];
        this.$Funnel4 = {};
        this.$Funnel5 = v;
        this.$Funnel6 = Date.now();
        this.timeout_sec = r;
        this.shouldTrackFocus = false;
        this.$Funnel7 = w;
        this.devModeLogger('Started funnel');
    }
    s.prototype.addTag = function(t) {
        !(typeof t === 'string') ? h(0): void 0;
        this.$Funnel4[t] = true;
        this.devModeLogger('Added funnel tag %s', t);
        return this;
    };
    s.prototype.appendAction = function(t, u) {
        this.$Funnel3.push(new(c('FunnelAction'))(t, Date.now() - this.$Funnel6, u));
        if (u) {
            this.devModeLogger('Appended action %s with tag %s', t, u);
        } else this.devModeLogger('Appended action %s', t);
        this.$Funnel8 = t;
        return this;
    };
    s.prototype.appendActionIfNew = function(t, u) {
        if (t !== this.$Funnel8) this.appendAction(t, u);
        return this;
    };
    s.prototype.getLogData = function() {
        var t = {};
        t[i] = this.$Funnel1;
        if (this.$Funnel2 !== undefined) {
            t[j] = this.$Funnel2;
        } else t[j] = Math.floor(Math.random() * 65536);
        t[k] = this.$Funnel6;
        t[n] = this.$Funnel5;
        t[o] = this.timeout_sec;
        t[l] = [];
        for (var u in this.$Funnel4)
            if (this.$Funnel4[u] === true) t[l].push(u);
        if (this.$Funnel3.length > 0) {
            t[m] = [];
            for (var v = 0; v < this.$Funnel3.length; v++) t[m].push(this.$Funnel3[v].getData());
        }
        return t;
    };
    s.prototype.devModeLogger = function() {};
    f.exports = {
        Funnel: s,
        EndType: p,
        ActionType: q
    };
}), null);
__d('FunnelLoggerSampler', ['FunnelLoggerConfig'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();

    function h(j) {
        var k = i(j);
        if (k === 0) return false;
        return Math.random() * k < 1;
    }

    function i(j) {
        var k = c('FunnelLoggerConfig').freq[j];
        if (k === undefined) k = c('FunnelLoggerConfig').freq['default'];
        return k;
    }
    f.exports = {
        shouldLog: h,
        getSamplingRate: i
    };
}), null);
__d('FunnelLogger', ['invariant', 'Banzai', 'Funnel', 'FunnelRegistry', 'FunnelLoggerSampler', 'MarauderLogger'], (function a(b, c, d, e, f, g, h) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    var i = {},
        j = false,
        k = true;

    function l(la, ma) {
        var na = w(la, ma);
        ka();
        fa(na);
        if (c('FunnelLoggerSampler').shouldLog(la)) {
            i[na] = new(c('Funnel').Funnel)(la, ma, c('FunnelLoggerSampler').getSamplingRate(la), false);
            z(na);
        }
    }

    function m(la, ma) {}

    function n(la, ma, na) {
        if (na === undefined) {
            y(la, undefined, ma);
        } else if (na) y(la, ma, na);
    }

    function o(la, ma) {
        var na = w(la, ma);
        if (x(na)) {
            i[na].devModeLogger('Cancelled funnel');
            aa(na);
            i[na] = undefined;
        }
    }

    function p(la, ma) {
        var na = w(la, ma);
        if (x(na)) {
            i[na].appendAction(c('Funnel').ActionType.ACTION_END, c('Funnel').EndType.EXPLICIT);
            ga(na);
        }
    }

    function q(la, ma, na) {
        if (na === undefined) {
            ba(la, undefined, String(ma));
        } else ba(la, Number(ma), na);
    }

    function r(la, ma, na) {
        if (na === undefined) {
            ca(la, undefined, Boolean(ma));
        } else ca(la, Number(ma), na);
    }

    function s(la, ma, na) {
        if (na === undefined) {
            da(la, undefined, String(ma), undefined);
        } else da(la, Number(ma), na, undefined);
    }

    function t(la, ma, na) {
        if (na === undefined) {
            ea(la, undefined, String(ma), undefined);
        } else ea(la, Number(ma), na, undefined);
    }

    function u(la, ma, na, oa) {
        if (oa === undefined) {
            da(la, undefined, String(ma), na);
        } else da(la, Number(ma), na, oa);
    }

    function v(la, ma, na, oa) {
        if (oa === undefined) {
            ea(la, undefined, String(ma), na);
        } else ea(la, Number(ma), na, oa);
    }

    function w(la, ma) {
        !(c('FunnelRegistry')[la] === true) ? h(0): void 0;
        if (ma === undefined || ma === null) {
            return la;
        } else return la + ma.toString();
    }

    function x(la) {
        return i[la] !== undefined;
    }

    function y(la, ma, na) {
        var oa = w(la, ma);
        if (x(oa)) {
            i[oa].timeout_sec = na;
            i[oa].devModeLogger('Timeout set to %d sec', na);
            z(oa);
        }
    }

    function z(la) {
        aa(la);
        i[la].timeout_handle = setTimeout(function() {
            i[la].appendAction(c('Funnel').ActionType.ACTION_END, c('Funnel').EndType.TIMEOUT);
            ga(la);
        }, 1000 * i[la].timeout_sec);
    }

    function aa(la) {
        if (i[la].timeout_handle) clearTimeout(i[la].timeout_handle);
    }

    function ba(la, ma, na) {
        var oa = w(la, ma);
        if (x(oa)) {
            i[oa].addTag(na);
            z(oa);
        }
    }

    function ca(la, ma, na) {
        var oa = w(la, ma);
        if (x(oa)) {
            i[oa].shouldTrackFocus = na;
            i[oa].devModeLogger('Focus tracking %s', na ? 'on' : 'off');
        }
    }

    function da(la, ma, na, oa) {
        var pa = w(la, ma);
        if (x(pa)) {
            i[pa].appendAction(na, oa);
            z(pa);
        }
    }

    function ea(la, ma, na, oa) {
        var pa = w(la, ma);
        if (x(pa)) i[pa].appendActionIfNew(na, oa);
    }

    function fa(la) {
        if (x(la)) {
            i[la].appendAction(c('Funnel').ActionType.ACTION_END, c('Funnel').EndType.RESTART);
            ga(la);
        }
    }

    function ga(la) {
        if (x(la)) {
            var ma = i[la].getLogData();
            c('MarauderLogger').log('funnel_analytics', null, ma);
            i[la].devModeLogger('Logged: %s', JSON.stringify(ma));
            aa(la);
            i[la] = undefined;
        }
    }

    function ha() {
        for (var la in i)
            if (i.hasOwnProperty(la) && x(la)) {
                i[la].appendAction(c('Funnel').ActionType.ACTION_END, c('Funnel').EndType.SESSION_END);
                ga(la);
            }
    }

    function ia() {
        if (k) {
            k = false;
            for (var la in i)
                if (i.hasOwnProperty(la) && x(la) && i[la].shouldTrackFocus) {
                    i[la].appendAction(c('Funnel').ActionType.ACTION_WINDOW_BLUR);
                    aa(la);
                }
        }
    }

    function ja() {
        if (!k) {
            k = true;
            for (var la in i)
                if (i.hasOwnProperty(la) && x(la) && i[la].shouldTrackFocus) {
                    i[la].appendAction(c('Funnel').ActionType.ACTION_WINDOW_FOCUS);
                    aa(la);
                }
        }
    }

    function ka() {
        if (!j) {
            j = true;
            if (window.addEventListener) {
                c('Banzai').subscribe(c('Banzai').SHUTDOWN, ha);
                window.addEventListener('blur', ia);
                window.addEventListener('focus', ja);
            }
        }
    }
    f.exports = {
        startFunnel: l,
        startFunnel_DEV_MODE: m,
        setFunnelTimeout: n,
        setFunnelTrackFocus: r,
        addFunnelTag: q,
        appendAction: s,
        appendActionIfNew: t,
        appendActionWithTag: u,
        appendActionWithTagIfNew: v,
        cancelFunnel: o,
        endFunnel: p
    };
}), null);
__d('NodeHighlighter', ['DOM', 'TokenizeUtil', 'concatMap', 'escapeRegex', 'getElementText', 'isTextNode'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {};

    function i(l, m) {
        var n = c('getElementText')(l).split(m),
            o = n.map(function(p) {
                if (m.test(p)) return j(p);
                return p || '';
            });
        return n.length > 1 ? o : null;
    }

    function j(l) {
        var m = c('DOM').create('span', {
            'class': 'highlightNode',
            className: 'highlightNode'
        }, l);
        return m;
    }
    var k = {
        getTextNodes: function l(m) {
            if (this.isLeafNode(m) || this.isStopNode(m)) {
                return m;
            } else if (this.isDiscardNode(m)) return [];
            return c('concatMap')(this.getTextNodes.bind(this), Array.from(m.childNodes));
        },
        getHighlightCandidates: function l() {
            return [];
        },
        isLeafNode: function l(m) {
            return c('isTextNode')(m);
        },
        isStopNode: function l(m) {
            return false;
        },
        isDiscardNode: function l(m) {
            return false;
        },
        createSegmentedRegex: function l(m) {
            var n = c('TokenizeUtil').getPunctuation();
            m = this.escapeAndAddBidirectionalCharsToTokens(m);
            m = m.map(function(o) {
                o = o.split(/\s+/).join('(?:' + n + '|\\s)+');
                return o;
            });
            return '(^|\\s|' + n + ')(' + m.join('|') + ')(?=(?:$|\\s|' + n + '))';
        },
        createNonSegmentedRegex: function l(m) {
            return '(' + m.map(c('escapeRegex')).join('|') + ')';
        },
        escapeAndAddBidirectionalCharsToTokens: function l(m) {
            var n = '[\\u200E\\u200F\\u202A\\u202B\\u202C\\u202D\\u202E]*';
            return m.map(function(o) {
                return n + String(o).split('').map(c('escapeRegex')).join(n) + n;
            });
        },
        createRegex: function l(m) {
            m = m.filter(function(t) {
                return t;
            });
            if (!m || m.length === 0) return new RegExp(null);
            var n = m.join('|');
            if (h[n]) return h[n];
            var o = /[\u0E00-\u109F\u2000-\uFFFF]/,
                p = [],
                q = [];
            m.forEach(function(t) {
                if (o.test(t)) {
                    q.push(t);
                } else p.push(t);
            });
            var r = '';
            if (p.length) {
                r += this.createSegmentedRegex(p);
                r += q.length ? '|' : '';
            }
            if (q.length) r += this.createNonSegmentedRegex(q);
            var s = new RegExp(r, 'i');
            h[n] = s;
            return s;
        },
        searchNodes: function l(m, n) {
            return c('DOM').scry(m, n);
        },
        highlight: function l(m, n) {
            n = n.filter(function(q) {
                return q;
            });
            if (!n || n.length === 0 || !m) return;
            var o = c('concatMap')(function(q) {
                    return c('concatMap')(this.getTextNodes.bind(this), this.searchNodes(m, q));
                }.bind(this), this.getHighlightCandidates()),
                p = this.createRegex(n);
            o.forEach(function(q) {
                var r = i(q, p);
                if (r)
                    if (this.isStopNode(q)) {
                        c('DOM').setContent(q, r);
                    } else c('DOM').replace(q, r);
            }.bind(this));
        }
    };
    f.exports = k;
}), null);