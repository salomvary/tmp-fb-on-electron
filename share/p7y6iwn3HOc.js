if (self.CavalryLogger) {
    CavalryLogger.start_js(["oa483"]);
}

__d("MercuryTypeaheadConstants", [], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = {
        COMPOSER_FRIENDS_MAX: 4,
        COMPOSER_FB4C_MAX: 4,
        COMPOSER_NON_FRIENDS_MAX: 2,
        COMPOSER_MESSENGER_ONLY_CONTACT_MAX: 4,
        COMPOSER_SHOW_MORE_LIMIT: 2,
        COMPOSER_THREADS_INITIAL_LIMIT: 2,
        COMPOSER_CHATTAB_MAX: 5,
        COMPOSER_PAGES_MAX: 5,
        COMPOSER_WM_MAX: 19,
        USER_TYPE: "user",
        PAGE_TYPE: "page",
        THREAD_TYPE: "thread",
        HEADER_TYPE: "header",
        SEARCH_TYPE: "search",
        FRIEND_TYPE: "friend",
        NON_FRIEND_TYPE: "non_friend",
        FB4C_TYPE: "fb4c",
        MEETING_ROOM_PAGE_TYPE: "meeting_room_page",
        COMMERCE_PAGE_TYPE: "commerce_page",
        VALID_EMAIL: "^([A-Z0-9._\u0025+-]+\u0040((?!facebook\\.com))[A-Z0-9.-]+\\.[A-Z]{2,4}|(([A-Z._\u0025+-]+[A-Z0-9._\u0025+-]*)|([A-Z0-9._\u0025+-]+[A-Z._\u0025+-]+[A-Z0-9._\u0025+-]*))\u0040(?:facebook\\.com))$"
    };
}), null);
__d("MessengerView", [], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = {
        DETAIL: {
            COMPOSE: "detail\/compose",
            THREAD: "detail\/thread"
        },
        MASTER: {
            GROUPS: "master\/groups",
            PEOPLE: "master\/people",
            RECENT: "master\/recent",
            SUPPORT: "master\/support",
            SEARCH: "master\/search"
        }
    };
}), null);
__d('ChatSearchSource', ['requireWeak', 'AbstractSearchSource', 'AsyncRequest', 'CurrentUser', 'MercuryConfig', 'MercuryParticipantTypes', 'SearchableEntry', 'SearchSourceCallbackManager', 'ShortProfiles', 'TokenizeUtil', 'debounce', 'emptyFunction', 'isValidUniqueID'], (function a(b, c, d, e, f, g) {
    'use strict';
    var h, i;
    if (c.__markCompiled) c.__markCompiled();
    var j = null;
    c('requireWeak')('OrderedFriendsList', function(l) {
        j = l;
    });
    h = babelHelpers.inherits(k, c('AbstractSearchSource'));
    i = h && h.prototype;

    function k(l) {
        i.constructor.call(this);
        this.$ChatSearchSource1 = new(c('SearchSourceCallbackManager'))({
            parseFn: c('TokenizeUtil').parse,
            matchFn: c('TokenizeUtil').isQueryMatch,
            indexFn: l.indexFn
        });
        this.$ChatSearchSource2 = l.queryRequests || [];
        this.$ChatSearchSource3 = false;
        this.$ChatSearchSource4 = c('debounce')(this.$ChatSearchSource4, 100, this);
    }
    k.prototype.bootstrapImpl = function(l) {
        c('ShortProfiles').fetchAll().done(function() {
            this.$ChatSearchSource3 = true;
            this.$ChatSearchSource5();
            l();
        }.bind(this));
    };
    k.prototype.searchImpl = function(l, m, n) {
        var o = null,
            p = {},
            q = n && n.onQueryFinished,
            r = n && n.onQueryStarted;
        r && r(l);
        var s = this.$ChatSearchSource1.search(l, function(v) {
            if (!o) {
                o = v;
                o.forEach(function(w) {
                    return p[w.getUniqueID()] = true;
                });
            } else v.forEach(function(w) {
                var x = w.getUniqueID();
                if (!p[x]) {
                    o.push(w);
                    p[x] = true;
                }
            });
            m(o, l);
            if (l.length === 1 && this.$ChatSearchSource3) q && q(l);
        }.bind(this), n);
        if (!s || !this.$ChatSearchSource2 || !this.$ChatSearchSource2.length || l.length === 0) {
            q && q(l);
            return;
        }
        if (l.length === 1) {
            if (this.$ChatSearchSource3) q && q(l);
            return;
        }
        var t = {
                value: l,
                existing_ids: o && o.map(function(v) {
                    return v.getUniqueID();
                }).join(','),
                limit: n && n.threadLimit
            },
            u = this.$ChatSearchSource2.length;
        this.$ChatSearchSource2.forEach(function(v) {
            this.$ChatSearchSource4(t, v, function(w) {
                this.$ChatSearchSource6(this.$ChatSearchSource7(this.$ChatSearchSource8(w)).filter(function(x) {
                    return !!x;
                }), l);
                u--;
                if (u === 0) {
                    this.$ChatSearchSource1.setQueryStringAsExhausted(l);
                    q && q(l);
                }
            }.bind(this));
        }.bind(this), this);
    };
    k.prototype.getAllEntriesMap = function() {
        return this.$ChatSearchSource1.getAllEntries();
    };
    k.prototype.$ChatSearchSource5 = function() {
        var l = c('ShortProfiles').getCachedProfileIDs(),
            m = l.filter(function(o) {
                var p = c('ShortProfiles').getNow(o);
                return (o == c('CurrentUser').getID() || p.type === c('MercuryParticipantTypes').FRIEND || p.type === c('MercuryParticipantTypes').PAGE && c('MercuryConfig').LinkedAgents && c('MercuryConfig').LinkedAgents.indexOf(o.toString()) > -1);
            }),
            n = m.map(this.$ChatSearchSource9);
        if (n.length) this.$ChatSearchSource1.addLocalEntries(n);
    };
    k.prototype.$ChatSearchSource7 = function(l) {
        return l.map(this.$ChatSearchSource10, this);
    };
    k.prototype.$ChatSearchSource10 = function(l, m) {
        if (l.mercury_thread) {
            if (!j) return null;
            return j.normalizeThreadEntry(l, m);
        }
        var n = l.text,
            o = l.uid;
        if (!n || !c('isValidUniqueID')(o)) return null;
        var p = j ? j.getActiveRank(o) : 0;
        if (j && !j.contains(o)) p += m;
        return new(c('SearchableEntry'))({
            uniqueID: o,
            title: n,
            order: p,
            subtitle: l.subtext,
            type: l.render_type || l.type,
            photo: l.photo,
            uri: l.path,
            auxiliaryData: {
                isMessengerUser: l.is_messenger_user,
                alias: l.alias
            }
        });
    };
    k.prototype.$ChatSearchSource8 = function(l) {
        var m = l.getPayload();
        if (Array.isArray(m)) {
            return m;
        } else if (m && m.entries) {
            return m.entries;
        } else return [];
    };
    k.prototype.$ChatSearchSource9 = function(l) {
        var m = c('ShortProfiles').getNow(l),
            n = l == c('CurrentUser').getID() ? c('MercuryParticipantTypes').FRIEND : m.type,
            o = [m.additionalName, m.alternateName].concat(m.searchTokens || []).join(' '),
            p = m.name,
            q = null;
        return new(c('SearchableEntry'))({
            uniqueID: l,
            title: p,
            order: j ? j.getActiveRank(l) : 0,
            subtitle: q,
            keywordString: o,
            type: n,
            photo: m.thumbSrc,
            uri: m.uri,
            auxiliaryData: {
                isMessengerUser: m.is_messenger_user,
                alias: m.alias
            }
        });
    };
    k.prototype.$ChatSearchSource4 = function(l, m, n, o) {
        new(c('AsyncRequest'))(m.uri).setData(babelHelpers['extends']({}, l, m.data)).setMethod('GET').setReadOnly(true).setHandler(n).setErrorHandler(o || c('emptyFunction')).setAllowCrossPageTransition(true).send();
    };
    k.prototype.$ChatSearchSource6 = function(l, m) {
        if (l.length) this.$ChatSearchSource1.addQueryEntries(l, m);
    };
    k.prototype.addLocalEntries = function(l) {
        this.$ChatSearchSource1.addLocalEntries(l);
    };
    k.prototype.refreshData = function() {
        c('ShortProfiles').fetchAll();
    };
    f.exports = k;
}), null);
__d('MercuryFilters', ['MessagingTag', 'arrayContains'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = [c('MessagingTag').UNREAD],
        i = {
            ALL: 'all',
            NONPRIORITY: 'non-priority',
            UNREAD: c('MessagingTag').UNREAD,
            getSupportedFilters: function j() {
                return h.concat();
            },
            isSupportedFilter: function j(k) {
                return c('arrayContains')(h, k);
            }
        };
    f.exports = i;
}), null);
__d('MessengerURIConstants', [], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        COMPOSE_SUBPATH: '/new',
        GROUPS_PATH: '/groups',
        PEOPLE_PATH: '/people',
        SUPPORT_PATH: '/support',
        FILTERED_REQUESTS_PATH: '/filtered',
        MESSAGE_REQUESTS_PATH: '/requests',
        THREAD_PREFIX: '/t/',
        GROUP_PREFIX: 'group-'
    };
    f.exports = h;
}), null);
__d('MessengerStateProcessor', ['MercuryAPIArgsSource', 'MercuryIDs', 'MercuryParticipantTypes', 'MercuryParticipants', 'MercuryThreadIDMap', 'MercuryThreads', 'MercuryVanityIDMap', 'MessengerURIConstants'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        preprocess: function j(k) {
            var l = k.activeThreadID;
            if (l) {
                var m = c('MercuryIDs').getUserIDFromThreadID(l),
                    n = m && c('MercuryParticipants').getNow(c('MercuryIDs').getParticipantIDFromUserID(m));
                if (n && n.type !== c('MercuryParticipantTypes').EVENT) {
                    k.threadKey = n.vanity || m;
                } else if (m && !n) {
                    var o = c('MercuryIDs').getParticipantIDFromUserID(m);
                    k.threadKey = c('MercuryVanityIDMap').hasID(o) ? c('MercuryVanityIDMap').getVanity(o) : m;
                } else {
                    var p = c('MercuryThreadIDMap').get(),
                        q = p.getServerIDFromClientIDNow(l);
                    k.threadKey = q || c('MercuryIDs').tokenize(l).value;
                }
            }
            delete k.activeThreadID;
            return k;
        },
        postprocess: function j(k) {
            var l = c('MercuryThreadIDMap').get(),
                m = c('MercuryThreads').get(),
                n = i(k.threadKey),
                o = void 0;
            o = c('MercuryIDs').isValid(n) ? n : l.getClientIDFromServerIDNow(n);
            if (!o) {
                var p = c('MercuryParticipants').getIDFromVanityOrFBID(n),
                    q = p && m.getCanonicalThreadToParticipant(p, null, c('MercuryAPIArgsSource').MESSENGER);
                if (q) o = q.thread_id;
            }
            if (o) {
                k.activeThreadID = o;
                k.serverThreadID = l.getServerIDFromClientIDNow(o);
            }
            delete k.threadKey;
            return k;
        },
        supportInboxPostprocess: function j(k) {
            if (k.threadKey) k.activeThreadID = c('MercuryIDs').getThreadIDFromSupportInboxItemID(k.threadKey);
            delete k.threadKey;
            return k;
        }
    };

    function i(j) {
        if (!j) return null;
        return j.startsWith(c('MessengerURIConstants').GROUP_PREFIX) ? j.substr(c('MessengerURIConstants').GROUP_PREFIX.length) : j;
    }
    f.exports = h;
}), null);
__d('MessengerURISerializer', ['MercuryFilters', 'MessagingTag', 'MessengerStateProcessor', 'MessengerURIConstants', 'MessengerView', 'URI', 'WWWBase'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    var h = '/?$',
        i = {
            serialize: function k(l) {
                var m = new(c('URI'))(c('WWWBase').uri);
                l = c('MessengerStateProcessor').preprocess(l);
                switch (l.masterView) {
                    case c('MessengerView').MASTER.GROUPS:
                        m.setPath(c('MessengerURIConstants').GROUPS_PATH);
                        break;
                    case c('MessengerView').MASTER.PEOPLE:
                        m.setPath(c('MessengerURIConstants').PEOPLE_PATH);
                        break;
                    case c('MessengerView').MASTER.SUPPORT:
                        m.setPath(c('MessengerURIConstants').SUPPORT_PATH);
                        break;
                }
                switch (l.folder) {
                    case c('MessagingTag').OTHER:
                        m.setPath(c('MessengerURIConstants').FILTERED_REQUESTS_PATH);
                        break;
                    case c('MessagingTag').PENDING:
                        m.setPath(c('MessengerURIConstants').MESSAGE_REQUESTS_PATH);
                        break;
                }
                if (l.detailView === c('MessengerView').DETAIL.COMPOSE) {
                    m.setPath(m.getPath() + c('MessengerURIConstants').COMPOSE_SUBPATH);
                } else if (l.threadKey) m.setPath(m.getPath() + c('MessengerURIConstants').THREAD_PREFIX + l.threadKey);
                if (l.extraQueryParms) m.addQueryData(l.extraQueryParams);
                if (c('MercuryFilters').isSupportedFilter(l.filter)) m.addQueryData({
                    filter: l.filter
                });
                if (l.query != null) {
                    var n;
                    m.addQueryData((n = {}, n[l.masterView === c('MessengerView').MASTER.SEARCH ? 'qa' : 'q'] = l.query, n));
                }
                if (l.mid) m.addQueryData({
                    mid: l.mid
                });
                return m;
            },
            deserialize: function k(l) {
                var m = {},
                    n = l.getPath(),
                    o = l.getQueryData(),
                    p = o.filter,
                    q = o.mid,
                    r = o.q,
                    s = o.qa,
                    t = babelHelpers.objectWithoutProperties(o, ['filter', 'mid', 'q', 'qa']);
                if (n.match('^' + c('MessengerURIConstants').GROUPS_PATH)) {
                    m.masterView = c('MessengerView').MASTER.GROUPS;
                } else if (n.match('^' + c('MessengerURIConstants').PEOPLE_PATH)) {
                    m.masterView = c('MessengerView').MASTER.PEOPLE;
                } else if (n.match('^' + c('MessengerURIConstants').SUPPORT_PATH)) {
                    m.masterView = c('MessengerView').MASTER.SUPPORT;
                } else if (s) {
                    m.masterView = c('MessengerView').MASTER.SEARCH;
                } else m.masterView = c('MessengerView').MASTER.RECENT;
                if (n.match('^' + c('MessengerURIConstants').FILTERED_REQUESTS_PATH)) {
                    m.folder = c('MessagingTag').OTHER;
                } else if (n.match('^' + c('MessengerURIConstants').MESSAGE_REQUESTS_PATH)) {
                    m.folder = c('MessagingTag').PENDING;
                } else m.folder = c('MessagingTag').INBOX;
                if (n.match(c('MessengerURIConstants').COMPOSE_SUBPATH + h)) {
                    m.detailView = c('MessengerView').DETAIL.COMPOSE;
                } else {
                    var u = j(n);
                    if (u) {
                        m.threadKey = u;
                        m.detailView = c('MessengerView').DETAIL.THREAD;
                    }
                }
                if (c('MercuryFilters').isSupportedFilter(p)) {
                    m.filter = p;
                } else m.filter = c('MercuryFilters').ALL;
                m.mid = q;
                m.query = s || r;
                m.extraQueryParams = t;
                if (m.masterView === c('MessengerView').MASTER.SUPPORT) return c('MessengerStateProcessor').supportInboxPostprocess(m);
                return c('MessengerStateProcessor').postprocess(m);
            }
        };

    function j(k) {
        var l = k.match(c('MessengerURIConstants').THREAD_PREFIX + '([^/]+)' + h);
        return l && l[1];
    }
    f.exports = i;
}), null);
__d('MessengerActions', ['invariant', 'MercuryIDs', 'MessengerDispatcher', 'MessengerURISerializer', 'MercuryTypeaheadConstants', 'MessengerView', 'URI', 'goURI', 'keyMirror'], (function a(b, c, d, e, f, g, h) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    var i = c('keyMirror')({
            HIDE_DIALOG: null,
            REPLACE_STATE: null,
            SHOW_DIALOG: null
        }),
        j = {
            Types: i,
            changeDetailView: function l(m) {
                k(function(n) {
                    if (n.detailView !== m) return {
                        detailView: m
                    };
                });
            },
            changeMasterView: function l(m) {
                k(function(n) {
                    if (n.masterView !== m) {
                        var o = {
                            masterView: m
                        };
                        if (n.masterView === c('MessengerView').MASTER.SEARCH) o.query = undefined;
                        return o;
                    }
                });
            },
            selectThread: function l(m, n) {
                if (n === c('MercuryTypeaheadConstants').MEETING_ROOM_PAGE_TYPE) {
                    !!!m ? h(0) : void 0;
                    var o = c('MercuryIDs').getUserIDFromThreadID(m);
                    !!!o ? h(0) : void 0;
                    var p = new(c('URI'))(),
                        q = p.getQualifiedURI().getSubdomain();
                    p.setDomain('facebook.com').setSubdomain(q).setPath('/' + o).setProtocol('https');
                    window.open(p, '_blank');
                    return;
                }
                k(function(r) {
                    if (r.activeThreadID !== m) return {
                        activeThreadID: m,
                        detailView: c('MessengerView').DETAIL.THREAD,
                        mid: null
                    };
                });
            },
            changeState: function l(m) {
                c('MessengerDispatcher').dispatch({
                    type: i.REPLACE_STATE,
                    nextState: m
                });
            },
            showDialog: function l(m, n) {
                c('MessengerDispatcher').dispatch({
                    type: j.Types.SHOW_DIALOG,
                    dialogClass: m,
                    dialogProps: n
                });
            },
            hideDialog: function l(m) {
                c('MessengerDispatcher').dispatch({
                    type: j.Types.HIDE_DIALOG,
                    dialogClass: m
                });
            },
            changeFolder: function l(m) {
                k(function(n) {
                    if (n.folder !== m) return {
                        folder: m
                    };
                });
            },
            changeFilter: function l(m) {
                k(function(n) {
                    if (n.filter !== m) return {
                        filter: m
                    };
                });
            },
            changeQuery: function l(m) {
                k(function(n) {
                    if (n.query !== m) return {
                        query: m
                    };
                });
            },
            changeQueryAll: function l(m) {
                var n = !!m;
                k(function(o) {
                    if (o.queryAll !== m) return {
                        query: m,
                        masterView: c('MessengerView').MASTER.SEARCH
                    };
                });
            },
            changeMid: function l(m) {
                k(function(n) {
                    if (n.mid !== m) return {
                        mid: m
                    };
                });
            }
        };

    function k(l) {
        var m = c('MessengerURISerializer').deserialize(new(c('URI'))(window.location.href)),
            n = l(m);
        if (n) c('goURI')(c('MessengerURISerializer').serialize(Object.assign(m, n)));
    }
    f.exports = j;
}), null);
__d('MNCommerceDialogStateStore', ['FluxStore', 'MessengerDispatcher', 'MNCommerceActionTypes'], (function a(b, c, d, e, f, g) {
    'use strict';
    var h, i;
    if (c.__markCompiled) c.__markCompiled();
    h = babelHelpers.inherits(j, c('FluxStore'));
    i = h && h.prototype;

    function j() {
        i.constructor.call(this, c('MessengerDispatcher'));
        this.$MNCommerceDialogStateStore1 = null;
        this.$MNCommerceDialogStateStore2 = null;
    }
    j.prototype.__onDispatch = function(k) {
        var l = k.type;
        switch (l) {
            case c('MNCommerceActionTypes').DIALOG.SHOW:
                this.$MNCommerceDialogStateStore1 = k.dialogContainer;
                this.$MNCommerceDialogStateStore2 = k.state;
                this.__emitChange();
                break;
            case c('MNCommerceActionTypes').DIALOG.HIDE:
                this.$MNCommerceDialogStateStore1 = null;
                this.$MNCommerceDialogStateStore2 = null;
                this.__emitChange();
                break;
        }
    };
    j.prototype.getDialogContainer = function() {
        return this.$MNCommerceDialogStateStore1;
    };
    j.prototype.getState = function() {
        return this.$MNCommerceDialogStateStore2;
    };
    f.exports = new j();
}), null);
__d('MercuryTypeaheadDataSource', ['CurrentUser', 'DataSource', 'MercuryConfig', 'MercuryParticipantTypes', 'MercuryTypeaheadConstants', 'OrderedFriendsList', 'ShortProfiles', 'WorkModeConfig', 'debounce'], (function a(b, c, d, e, f, g) {
    var h, i;
    if (c.__markCompiled) c.__markCompiled();
    var j = 500,
        k = [],
        l = {},
        m = {},
        n = {},
        o = false,
        p = false;
    h = babelHelpers.inherits(q, c('DataSource'));
    i = h && h.prototype;

    function q(r) {
        'use strict';
        r = r || {};
        r.kanaNormalization = true;
        i.constructor.call(this, r);
    }
    q.prototype.dirty = function() {
        'use strict';
        this.$MercuryTypeaheadDataSource1 = k;
        this.localCache = m;
        this.queryCache = l;
        this.queryIDs = n;
        return this;
    };
    q.prototype.bootstrap = function() {
        'use strict';
        if (o || p) return false;
        p = true;
        c('ShortProfiles').fetchAll().then(function() {
            this.updateBootstrapData();
            p = false;
            o = true;
        }.bind(this), function() {}.bind(this));
        return true;
    };
    q.prototype.updateBootstrapData = function() {
        'use strict';
        var r = this.getCachedShortProfileIDs(),
            s = c('WorkModeConfig').is_work_user ? c('MercuryParticipantTypes').FB4C : c('MercuryParticipantTypes').FRIEND,
            t = r.map(function(u) {
                var v = c('ShortProfiles').getNow(u),
                    w = u == c('CurrentUser').getID() ? s : v.type,
                    x = [v.additionalName, v.alternateName].concat(v.searchTokens || []).join(' '),
                    y = v.name,
                    z = null;
                return {
                    uid: u,
                    index: c('OrderedFriendsList').getActiveRank(u),
                    text: y,
                    subtext: z,
                    tokens: x,
                    localized_text: v.name,
                    additional_text: v.additionalName,
                    photo: v.thumbSrc,
                    render_type: w,
                    type: c('MercuryTypeaheadConstants').USER_TYPE
                };
            });
        if (t.length) this.addEntries(t);
    };
    q.prototype.query = function(r, s, t, u) {
        'use strict';
        var v = s || r.length === 1;
        return i.query.call(this, r, v, t, u);
    };
    q.prototype.getQueryData = function(r, s) {
        'use strict';
        return babelHelpers['extends']({}, i.getQueryData.call(this, r, s));
    };
    q.prototype.setEntry = function(r, s) {
        'use strict';
        this.$MercuryTypeaheadDataSource1[r] = s;
    };
    q.prototype.getEntry = function(r) {
        'use strict';
        return this.$MercuryTypeaheadDataSource1[r] || null;
    };
    q.prototype.getCachedShortProfileIDs = function() {
        'use strict';
        var r = c('ShortProfiles').getCachedProfileIDs(),
            s = r.filter(function(t) {
                var u = c('ShortProfiles').getNow(t);
                return (t == c('CurrentUser').getID() || u.type === c('MercuryParticipantTypes').FRIEND || u.type === c('MercuryParticipantTypes').FB4C || u.type === c('MercuryParticipantTypes').PAGE && c('MercuryConfig').LinkedAgents && c('MercuryConfig').LinkedAgents.indexOf(t.toString()) > -1);
            });
        return s;
    };
    q.prototype.isBootstrapped = function() {
        'use strict';
        return o;
    };
    q.prototype.isBootstrapping = function() {
        'use strict';
        return p;
    };
    q.prototype.processEntries = function(r, s) {
        'use strict';
        r = r.map(function(t) {
            if (t.index == null && (t.render_type === c('MercuryParticipantTypes').FRIEND || t.render_type === c('MercuryParticipantTypes').FB4C)) t.index = c('OrderedFriendsList').getActiveRank(t.uid);
            if (t.render_type === c('MercuryParticipantTypes').PAGE && c('MercuryConfig').LinkedAgents && c('MercuryConfig').LinkedAgents.indexOf(t.uid.toString()) > -1) t.index = 1;
            return t;
        });
        return i.processEntries.call(this, r);
    };
    q.prototype.mergeUids = function(r, s, t, u) {
        'use strict';
        var v = s.sort(function(w, x) {
            return this.getEntry(w).index - this.getEntry(x).index;
        }.bind(this));
        return i.mergeUids.call(this, r, v, t, u);
    };
    f.exports = q;
}), null);
__d('CompactTypeaheadRenderer', ['BadgeHelper', 'DOM', 'emojiAndEmote', 'TypeaheadFacepile', 'isSocialPlugin'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(i, j) {
        var k = [];
        if (i.xhp) return c('DOM').create('li', {
            className: 'raw'
        }, i.xhp);
        var l = i.photos || i.photo;
        if (l) {
            if (l instanceof Array) {
                l = c('TypeaheadFacepile').render(l);
            } else l = c('DOM').create('img', {
                alt: '',
                src: l
            });
            k.push(l);
        }
        var m = i.iconClass;
        if (m) {
            var n = c('DOM').create('span', {
                className: m
            });
            k.push(n);
        }
        var o = i.debug_info;
        if (o) k.push(c('DOM').create('span', {
            className: 'debugInfo'
        }, o));
        if (i.text) {
            var p = [i.text];
            if (!c('isSocialPlugin')()) p = c('emojiAndEmote')(i.text);
            if (i.is_verified) {
                p.push(c('BadgeHelper').renderBadge('xsmall', 'verified'));
            } else if (i.is_work_user) {
                p.push(c('BadgeHelper').renderBadge('xsmall', 'work'));
            } else if (i.is_trending_hashtag) p.push(c('BadgeHelper').renderBadge('xsmall', 'trending'));
            k.push(c('DOM').create('span', {
                className: 'text'
            }, p));
        }
        var q = i.subtext,
            r = i.category;
        if (q || r) {
            var s = [];
            q && s.push(q);
            q && r && s.push(" \u00b7 ");
            r && s.push(r);
            k.push(c('DOM').create('span', {
                className: 'subtext'
            }, s));
        }
        var t = c('DOM').create('li', {
            className: i.type || ''
        }, k);
        if (i.text) {
            t.setAttribute('title', i.text);
            t.setAttribute('aria-label', i.text);
        }
        return t;
    }
    h.className = 'compact';
    f.exports = h;
}), null);
__d('legacy:CompactTypeaheadRenderer', ['CompactTypeaheadRenderer'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    if (!b.TypeaheadRenderers) b.TypeaheadRenderers = {};
    b.TypeaheadRenderers.compact = c('CompactTypeaheadRenderer');
}), 3);
__d('PureStoreBasedStateMixin', ['invariant', 'StoreBasedStateMixinHelper', 'setImmediate'], (function a(b, c, d, e, f, g, h) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    var i = function() {
        for (var j = arguments.length, k = Array(j), l = 0; l < j; l++) k[l] = arguments[l];
        return {
            getInitialState: function m() {
                return this.constructor.calculateState();
            },
            componentWillMount: function m() {
                !this.constructor.calculateState ? h(0) : void 0;
                this._recalculateStateID = null;
                var n = function() {
                    if (this.isMounted()) this.setState(this.constructor.calculateState());
                    this._recalculateStateID = null;
                }.bind(this);
                this._mixin = new(c('StoreBasedStateMixinHelper'))(k);
                this._mixin.subscribeCallback(function() {
                    if (this._recalculateStateID === null) this._recalculateStateID = c('setImmediate')(n);
                }.bind(this));
            },
            componentWillUnmount: function m() {
                this._mixin.release();
                this._mixin = null;
            }
        };
    }.bind(this);
    f.exports = i;
}), null);