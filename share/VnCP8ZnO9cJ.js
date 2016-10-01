if (self.CavalryLogger) {
    CavalryLogger.start_js(["YswZ9"]);
}

__d("ChatReliabilityEvents", [], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = {
        ERROR: "error",
        CHANNEL_DISCONNECT: "channel_disconnect",
        CHANNEL_CONNECT: "channel_connect",
        CHANNEL_INIT: "channel_init",
        CHANNEL_NOCONFIG: "channel_noconfig",
        CHANNEL_HISTORY_INVALID: "channel_history_invalid",
        CHANNEL_STALLED: "channel_stalled",
        MESSAGE_RECEIVED: "msg_received"
    };
}), null);
__d("ChatSidebarSections", [], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = {
        MORE_ONLINE_FRIENDS: "more_online_friends",
        MORE_ONLINE_COWORKERS: "more_online_coworkers",
        OFFLINE_USERS: "offline_users",
        ORDERED_LIST: "ordered_list",
        ORDERED_COWORKERS: "ordered_coworkers",
        TYPEAHEAD: "typeahead",
        NOW_PINNED_LIST: "now_pinned_list"
    };
}), null);
__d("MercuryParticipantTypes", [], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = {
        USER: "user",
        THREAD: "thread",
        EVENT: "event",
        PAGE: "page",
        FRIEND: "friend",
        FB4C: "fb4c",
        NON_FRIEND: "non_friend"
    };
}), null);
__d("NotifTestIDs", [], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = {
        REACT_BLUE_BAR_JEWEL: "react_blue_bar_jewel",
        NON_REACT_BLUE_BAR_JEWEL: "non_react_blue_bar_jewel",
        REACT_NOTIF_LIST: "react_notif_list",
        SEE_ALL_LIST: "see_all_list",
        REACT_NOTIF_JEWEL_FLYOUT: "react_notif_jewel_flyout",
        NON_REACT_NOTIF_JEWEL_FLYOUT: "non_react_notif_jewel_flyout",
        CHEVRON: "chevron",
        REACT_MARK_ALL_AS_READ_LINK: "react_mark_all_as_read_link",
        NON_REACT_MARK_ALL_AS_READ_LINK: "non_react_mark_all_as_read_link",
        NOTIFICATION_SOUND_SETTING: "notifiation_sound_setting",
        NOTIFICATION_SOUND_SETTING_SELECTOR: "notifiation_sound_setting_selector",
        MESSAGE_SOUND_SETTING: "message_sound_setting",
        MESSAGE_SOUND_SETTING_SELECTOR: "message_sound_setting_selector",
        CLOSE_FRIEND_ACTIVITY_SELECTOR: "close_friend_activity_selector",
        BIRTHDAY_SELECTOR: "birthday_selector",
        ON_THIS_DAY_SELECTOR: "on_this_day_selector",
        TAGS_SELECTOR: "tags_selector",
        LIVE_VIDEO_SELECTOR: "live_video_selector",
        REACT_BADGE_COUNT_CONTAINER: "react_badge_count_container",
        NON_REACT_BADGE_COUNT_CONTAINER: "non_react_badge_count_container",
        BEEPER_LIST: "beeper_list",
        NON_REACT_SETTING_LINK: "non_react_setting_link",
        REACT_SETTING_LINK: "react_setting_link"
    };
}), null);
__d("PhotoResizeModeConst", [], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = {
        CONTAIN: "s",
        COVER: "p"
    };
}), null);
__d("SidebarType", [], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = {
        SIDEBAR: "sidebar",
        BUDDYLIST: "buddylist",
        BUDDYLIST_NUB: "buddylist_nub"
    };
}), null);
__d("SyncRequestStatusEnum", [], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = {
        PENDING: 0,
        ACCEPTED: 1,
        REJECTED: 2,
        EXPIRED: 3,
        CANCELED: 4,
        namesByValue: ["PENDING", "ACCEPTED", "REJECTED", "EXPIRED", "CANCELED"]
    };
}), null);
__d('AvailableListConstants', [], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        ON_AVAILABILITY_CHANGED: 'buddylist/availability-changed',
        ON_UPDATE_ERROR: 'buddylist/update-error',
        ON_UPDATED: 'buddylist/updated',
        ON_CHAT_NOTIFICATION_CHANGED: 'chat-notification-changed',
        OFFLINE: 0,
        IDLE: 1,
        ACTIVE: 2,
        MOBILE: 3,
        WEB_STATUS: 'webStatus',
        FB_APP_STATUS: 'fbAppStatus',
        MESSENGER_STATUS: 'messengerStatus',
        OTHER_STATUS: 'otherStatus',
        STATUS_ACTIVE: 'active',
        STATUS_IDLE: 'idle',
        STATUS_OFFLINE: 'offline'
    };
    f.exports = h;
}), null);
__d('LastActiveTimes', ['fbt', 'ServerTime'], (function a(b, c, d, e, f, g, h) {
    if (c.__markCompiled) c.__markCompiled();
    var i = {};

    function j(n) {
        if (!n || n < 0) return '';
        var o = c('ServerTime').get() / 1000 - n,
            p = Math.floor(o / 60),
            q = Math.floor(p / 60),
            r = Math.floor(q / 24);
        if (p <= 1) {
            return h._("{count}m", [h.param('count', 1)]);
        } else if (p < 60) {
            return h._("{count}m", [h.param('count', p)]);
        } else if (q < 24) {
            return h._("{count}h", [h.param('count', q)]);
        } else if (r < 3) {
            return h._("{count}d", [h.param('count', r)]);
        } else return '';
    }

    function k(n, o) {
        if (!(n in i) || i[n] < o) i[n] = o;
    }

    function l(n) {
        if (n in i) {
            return i[n];
        } else return 0;
    }
    var m = {
        update: function n(o) {
            for (var p in o) k(p, o[p]);
        },
        getShortDisplay: function n(o) {
            return j(l(o));
        },
        get: function n(o) {
            return l(o);
        },
        getDebugData: function n() {
            return i;
        }
    };
    f.exports = m;
}), null);
__d('PresenceUtil', ['CurrentUser', 'randomInt'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = c('randomInt')(0, 4294967295) + 1;

    function i() {
        return h;
    }

    function j() {
        return c('CurrentUser').isLoggedInNow();
    }
    f.exports = {
        getSessionID: i,
        hasUserCookie: j
    };
}), null);
__d('PresencePrivacy', ['Arbiter', 'AsyncRequest', 'ChannelConstants', 'CurrentUser', 'PresencePrivacyInitialData', 'JSLogger', 'PresenceUtil'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = '/ajax/chat/privacy/settings.php',
        i = '/ajax/chat/privacy/online_policy.php',
        j = '/ajax/chat/privacy/visibility.php',
        k = 'friend_visibility',
        l = 'visibility',
        m = 'online_policy',
        n = babelHelpers['extends']({}, c('PresencePrivacyInitialData').privacyData),
        o = c('PresencePrivacyInitialData').visibility,
        p = babelHelpers['extends']({}, c('PresencePrivacyInitialData').privacyData),
        q = o,
        r = c('PresencePrivacyInitialData').onlinePolicy,
        s = r,
        t = [],
        u = false;

    function v() {
        return c('JSLogger').create('blackbird');
    }
    var w = Object.assign(new(c('Arbiter'))(), {
        WHITELISTED: 1,
        BLACKLISTED: -1,
        UNLISTED: 0,
        ONLINE: 1,
        OFFLINE: 0,
        ONLINE_TO_WHITELIST: 0,
        ONLINE_TO_BLACKLIST: 1
    });

    function x(ja) {
        var ka;
        for (ka in ja) {
            var la = ja[ka];
            if (ka == c('CurrentUser').getID()) {
                v().error('set_viewer_visibility');
                throw new Error("Invalid to set current user's visibility");
            }
            switch (la) {
                case w.WHITELISTED:
                case w.BLACKLISTED:
                case w.UNLISTED:
                    break;
                default:
                    v().error('set_invalid_friend_visibility', {
                        id: ka,
                        value: la
                    });
                    throw new Error("Invalid state: " + la);
            }
        }
        for (ka in ja) n[ka] = ja[ka];
        w.inform('privacy-changed');
    }

    function y(ja, ka) {
        var la = {};
        la[ja] = ka;
        x(la);
    }

    function z(ja) {
        switch (ja) {
            case w.ONLINE:
            case w.OFFLINE:
                break;
            default:
                v().error('set_invalid_visibility', {
                    value: ja
                });
                throw new Error("Invalid visibility: " + ja);
        }
        o = ja;
        w.inform('privacy-changed');
        w.inform('privacy-user-presence-changed');
    }

    function aa(ja) {
        switch (ja) {
            case w.ONLINE_TO_WHITELIST:
            case w.ONLINE_TO_BLACKLIST:
                break;
            default:
                throw new Error("Invalid default online policy: " + ja);
        }
        r = ja;
        w.inform('privacy-user-presence-changed');
        w.inform('privacy-changed');
    }

    function ba(ja, ka) {
        u = true;
        ja.send();
    }

    function ca(ja, ka) {
        t.push({
            request: ja,
            data: ka
        });
        if (!u) {
            var la = t.shift();
            ba(la.request, la.data);
        }
    }

    function da(ja, ka) {
        var la = ja.type;
        if (la === k) {
            w.inform('privacy-availability-changed');
            for (var ma in ja.settings) p[ma] = ja.settings[ma];
        } else {
            if (la === l) {
                q = ja.visibility;
            } else if (la === m) s = ja.online_policy;
            w.inform('privacy-user-presence-response');
        }
        v().log('set_update_response', {
            data: ja,
            response: ka
        });
    }

    function ea(ja, ka) {
        if (o !== q) z(q);
        if (r !== s) aa(s);
        Object.assign(n, p);
        w.inform('privacy-changed');
        t = [];
        v().log('set_error_response', {
            data: ja,
            response: ka
        });
    }

    function fa(ja) {
        u = false;
        if (t.length > 0) {
            var ka = t.shift();
            ba(ka.request, ka.data);
        }
    }

    function ga(ja, ka) {
        if (c('PresenceUtil') != null) {
            var la = ja.getData();
            la.window_id = c('PresenceUtil').getSessionID();
            ja.setData(la);
        }
        ja.setHandler(da.bind(this, ka)).setErrorHandler(ea.bind(this, ka)).setTransportErrorHandler(ea.bind(this, ka)).setFinallyHandler(fa.bind(this)).setAllowCrossPageTransition(true);
        return ja;
    }

    function ha(ja, ka, la) {
        return ga(new(c('AsyncRequest'))(ja).setData(ka), la);
    }

    function ia(ja, ka) {
        var la = ka.obj;
        if (la.viewer_id != c('CurrentUser').getID()) {
            v().error('invalid_viewer_for_channel_message', {
                type: ja,
                data: ka
            });
            throw new Error("Viewer got from the channel is not the real viewer");
        }
        if (la.window_id === c('PresenceUtil').getSessionID()) return;
        var ma = la.data;
        if (la.event == 'access_control_entry') {
            ma.target_ids.forEach(function(oa) {
                y(oa, ma.setting);
                p[oa] = ma.setting;
            });
        } else {
            if (la.event == 'visibility_update') {
                var na = !!ma.visibility ? w.ONLINE : w.OFFLINE;
                z(na);
                q = na;
            } else if (la.event == 'online_policy_update') {
                aa(ma.online_policy);
                s = ma.online_policy;
            }
            w.inform('privacy-user-presence-response');
        }
        v().log('channel_message_received', {
            data: ka.obj
        });
    }
    Object.assign(w, {
        WHITELISTED: 1,
        BLACKLISTED: -1,
        UNLISTED: 0,
        ONLINE: 1,
        OFFLINE: 0,
        ONLINE_TO_WHITELIST: 0,
        ONLINE_TO_BLACKLIST: 1,
        init: function ja(ka, la, ma) {},
        setVisibility: function ja(ka) {
            q = o;
            z(ka);
            var la = {
                    visibility: ka
                },
                ma = {
                    type: l,
                    visibility: ka
                },
                na = ha(j, la, ma);
            ca(na, ma);
            v().log('set_visibility', {
                data: la
            });
            return ka;
        },
        getVisibility: function ja() {
            return o;
        },
        setOnlinePolicy: function ja(ka) {
            s = r;
            aa(ka);
            var la = {
                    online_policy: ka
                },
                ma = {
                    type: m,
                    online_policy: ka
                },
                na = ha(i, la, ma);
            ca(na, ma);
            v().log('set_online_policy', {
                data: la
            });
            return ka;
        },
        getOnlinePolicy: function ja() {
            return r;
        },
        getFriendVisibility: function ja(ka) {
            return n[ka] || w.UNLISTED;
        },
        isUserOffline: function ja() {
            return this.getVisibility() === w.OFFLINE;
        },
        allows: function ja(ka) {
            if (this.isUserOffline()) return false;
            var la = this.getOnlinePolicy();
            return la === w.ONLINE_TO_WHITELIST ? n[ka] == w.WHITELISTED : n[ka] != w.BLACKLISTED;
        },
        setFriendsVisibility: function ja(ka, la) {
            if (ka.length > 0) {
                var ma = {};
                for (var na = 0; na < ka.length; na++) {
                    var oa = ka[na];
                    p[oa] = n[oa];
                    ma[oa] = la;
                }
                x(ma);
                var pa = la;
                if (pa == w.UNLISTED) pa = p[ka[0]];
                var qa = {
                        users: ka,
                        setting: la,
                        setting_type: pa
                    },
                    ra = {
                        type: k,
                        settings: ma
                    },
                    sa = ha(h, qa, ra);
                ca(sa, ra);
                v().log('set_friend_visibility', {
                    data: qa
                });
            }
            return la;
        },
        setFriendVisibilityMap: function ja(ka, la) {
            for (var ma in ka) p[ma] = n[ma];
            x(ka);
            var na = {
                type: k,
                settings: ka
            };
            ca(ga(la, na), na);
            v().log('set_friend_visibility_from_map', {
                data: ka
            });
        },
        allow: function ja(ka) {
            if (this.allows(ka)) {
                v().error('allow_already_allowed');
                throw new Error("allow() should only be called for users that " + "are not already allowed");
            }
            if (this.getVisibility() === w.OFFLINE) {
                v().error('allow_called_while_offline');
                throw new Error("allow() should only be called when the user is already online");
            }
            var la = this.getOnlinePolicy() === w.ONLINE_TO_WHITELIST ? w.WHITELISTED : w.UNLISTED;
            return this.setFriendsVisibility([ka], la);
        },
        disallow: function ja(ka) {
            if (!this.allows(ka)) {
                v().error('disallow_already_disallowed');
                throw new Error("disallow() should only be called for users that " + "are not already disallowed");
            }
            if (this.getVisibility() === w.OFFLINE) {
                v().error('disallow_called_while_offline');
                throw new Error("disallow() should only be called when the user is already online");
            }
            var la = this.getOnlinePolicy() === w.ONLINE_TO_BLACKLIST ? w.BLACKLISTED : w.UNLISTED;
            return this.setFriendsVisibility([ka], la);
        },
        getBlacklist: function ja() {
            var ka = [];
            for (var la in n)
                if (n[la] === w.BLACKLISTED) ka.push(la);
            return ka;
        },
        getWhitelist: function ja() {
            var ka = [];
            for (var la in n)
                if (n[la] === w.WHITELISTED) ka.push(la);
            return ka;
        },
        getMapForTest: function ja() {
            return n;
        },
        setMapForTest: function ja(ka) {
            n = ka;
        }
    });
    w.inform('privacy-changed');
    w.inform('privacy-user-presence-changed', c('Arbiter').BEHAVIOR_STATE);
    v().log('initialized', {
        visibility: o,
        policy: r
    });
    c('Arbiter').subscribe(c('JSLogger').DUMP_EVENT, function(ja, ka) {
        ka.presence_privacy = {
            initial: c('PresencePrivacyInitialData').privacyData,
            current: n
        };
    });
    c('Arbiter').subscribe(c('ChannelConstants').getArbiterType('privacy_changed'), ia.bind(this));
    c('Arbiter').subscribe(c('ChannelConstants').ON_CONFIG, function(ja, ka) {
        var la = ka.getConfig('visibility', null);
        if (la !== null && typeof la !== 'undefined') {
            var ma = la ? w.ONLINE : w.OFFLINE;
            z(ma);
            v().log('config_visibility', {
                vis: ma
            });
        }
    }.bind(this));
    f.exports = w;
}), null);
__d('ChatVisibility', ['Arbiter', 'JSLogger', 'PresencePrivacy'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        isOnline: function i() {
            return c('PresencePrivacy').getVisibility() === c('PresencePrivacy').ONLINE;
        },
        hasBlackbirdEnabled: function i() {
            return this.isVisibleToMostFriends() || this.isVisibleToSomeFriends();
        },
        isVisibleToMostFriends: function i() {
            return c('PresencePrivacy').getOnlinePolicy() === c('PresencePrivacy').ONLINE_TO_BLACKLIST && c('PresencePrivacy').getBlacklist().length > 0;
        },
        isVisibleToSomeFriends: function i() {
            return c('PresencePrivacy').getOnlinePolicy() === c('PresencePrivacy').ONLINE_TO_WHITELIST && c('PresencePrivacy').getWhitelist().length > 0;
        },
        goOnline: function i(j) {
            if (c('PresencePrivacy').getVisibility() === c('PresencePrivacy').OFFLINE) {
                c('JSLogger').create('blackbird').log('chat_go_online');
                c('PresencePrivacy').setVisibility(c('PresencePrivacy').ONLINE);
                c('Arbiter').inform('chat-visibility/go-online');
            }
            j && j();
        },
        goOffline: function i(j) {
            if (c('PresencePrivacy').getVisibility() === c('PresencePrivacy').ONLINE) {
                c('JSLogger').create('blackbird').log('chat_go_offline');
                c('PresencePrivacy').setVisibility(c('PresencePrivacy').OFFLINE);
                c('Arbiter').inform('chat-visibility/go-offline');
            }
            j && j();
        },
        toggleVisibility: function i() {
            if (h.isOnline()) {
                h.goOffline();
            } else h.goOnline();
        }
    };
    f.exports = h;
}), null);
__d('PresenceStatus', ['ArbiterMixin', 'AvailableListConstants', 'BanzaiODS', 'ChatVisibility', 'CurrentUser', 'LastActiveTimes', 'PresencePrivacy', 'ServerTime', 'createObjectFrom', 'debounceAcrossTransitions'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    c('BanzaiODS').setEntitySample('presence', .0001);
    var h = {},
        i = {},
        j = {},
        k = Object.assign({}, c('ArbiterMixin')),
        l = c('debounceAcrossTransitions')(function() {
            return k.inform('change');
        }, 0);
    Object.assign(k, {
        resetPresenceData: function m() {
            h = {};
            i = {};
        },
        reset: function m() {
            k.resetPresenceData();
            j = {};
        },
        get: function m(n) {
            if (n == c('CurrentUser').getID()) return c('ChatVisibility').isOnline() ? c('AvailableListConstants').ACTIVE : c('AvailableListConstants').OFFLINE;
            var o = c('AvailableListConstants').OFFLINE;
            if (n in h) o = h[n];
            if (!c('PresencePrivacy').allows(n)) o = c('AvailableListConstants').OFFLINE;
            return o;
        },
        getCapabilities: function m(n) {
            var o = i[n];
            return o ? o : 0;
        },
        isPlayingCanvasGameUser: function m(n) {
            return !!j[n];
        },
        getGroup: function m(n) {
            return n.some(function(o) {
                if (o == c('CurrentUser').getID()) return false;
                return k.get(o) === c('AvailableListConstants').ACTIVE;
            }) ? c('AvailableListConstants').ACTIVE : c('AvailableListConstants').OFFLINE;
        },
        set: function m(n, o, p, q, r, s) {
            if (n == c('CurrentUser').getID()) return false;
            var t;
            if (o !== null && o !== undefined) {
                o = o == c('AvailableListConstants').ACTIVE ? c('AvailableListConstants').ACTIVE : c('AvailableListConstants').OFFLINE;
                var u = k.get(n);
                t = u != o;
                if (t && u == c('AvailableListConstants').ACTIVE || o == c('AvailableListConstants').ACTIVE) {
                    var v = {};
                    v[n] = c('ServerTime').get() / 1000;
                    c('LastActiveTimes').update(v);
                }
                h[n] = o;
            }
            var w = false;
            if (r !== undefined && r !== null) {
                w = k.getCapabilities(n) != r;
                i[n] = r;
            }
            var x = t || w;
            if (x && !s) l();
            return x;
        },
        setPlayingCanvasGameFriends: function m(n) {
            j = c('createObjectFrom')(n);
        },
        getOnlineIDs: function m() {
            var n, o = [];
            for (n in h)
                if (k.get(n) === c('AvailableListConstants').ACTIVE) o.push(n);
            return o;
        },
        getAllIDs: function m() {
            return Object.keys(h);
        },
        getOnlineCount: function m() {
            return k.getOnlineIDs().length;
        },
        getPresenceStats: function m() {
            var n = 0,
                o = 0,
                p = 0;
            for (var q in h) {
                n += 1;
                switch (k.get(q)) {
                    case c('AvailableListConstants').OFFLINE:
                        o += 1;
                        break;
                    case c('AvailableListConstants').ACTIVE:
                        p += 1;
                        break;
                    default:
                        break;
                }
            }
            return {
                total: n,
                offline: o,
                active: p
            };
        },
        getAllDebugInfo: function m() {
            var n = {};
            for (var o in h) n[o] = {
                p: h[o],
                vc: i[o]
            };
            return n;
        },
        setMulti: function m(n, o) {
            var p = false;
            for (var q in n) k.set(q, n[q].a, false, o, n[q].c, true) && (p = true);
            if (p) l();
        },
        setMultiChatproxy: function m(n) {
            var o = {};
            for (var p in n) {
                if (n[p].lat) o[p] = n[p].lat;
                var q = n[p].p;
                k.set(p, q, false, 'chatproxy', n[p].vc, true);
            }
            c('LastActiveTimes').update(o);
            l();
        },
        setMultiActive: function m(n, o) {
            var p = false;
            n.forEach(function(q) {
                k.set(q, c('AvailableListConstants').ACTIVE, false, o, null, true) && (p = true);
            });
            if (p) l();
        }
    });
    f.exports = k;
}), null);
__d('ChatproxyPresence', ['Arbiter', 'AvailableListConstants', 'AvailableListInitialData', 'BanzaiODS', 'ChannelConstants', 'LastActiveTimes', 'PresenceStatus', 'debounceAcrossTransitions', 'ClientChromeExperimentsData'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = c('ClientChromeExperimentsData').ClientChromeAvailableListInitialDataPreloader;

    function i(k) {
        var l = k.activeList,
            m = k.lastActiveTimes;
        if (l) c('PresenceStatus').setMultiActive(l, 'available_list_active');
        if (m && !Array.isArray(m)) c('LastActiveTimes').update(m);
    }

    function j(k) {
        'use strict';
        this.$ChatproxyPresence1 = k;
        this.$ChatproxyPresence2 = false;
        this.$ChatproxyPresence3 = c('AvailableListInitialData').chatNotif;
        this.$ChatproxyPresence4 = false;
        if (h) {
            h.onLoaded(i);
        } else i(c('AvailableListInitialData'));
    }
    j.prototype.subscribe = function() {
        'use strict';
        c('Arbiter').subscribe(c('ChannelConstants').getArbiterType('chatproxy-presence'), this.updatePresenceInfo.bind(this));
        c('Arbiter').subscribe(c('ChannelConstants').ON_INVALID_HISTORY, function() {
            this.$ChatproxyPresence2 = true;
        }.bind(this));
        c('Arbiter').subscribe(c('ChannelConstants').RTI_SESSION, function(k, l) {
            if (l) this.$ChatproxyPresence4 = l;
        }.bind(this));
        c('Arbiter').subscribe(c('ChannelConstants').getArbiterType('get_debug_presence'), function(k, l) {
            var m = c('PresenceStatus').getAllDebugInfo(),
                n = c('LastActiveTimes').getDebugData();
            for (var o in n) {
                var p = m[o];
                if (p === undefined) {
                    p = {};
                    m[o] = p;
                }
                p.l = Math.floor(n[o]);
            }
            this.$ChatproxyPresence4.issueRequest('/debug_presence', {}, m, function() {
                c('BanzaiODS').bumpEntityKey('ChatproxyPresence', 'debug_presence.sucess');
            });
        }.bind(this));
    };
    j.prototype.getRTISession = function() {
        'use strict';
        return this.$ChatproxyPresence4;
    };
    j.prototype.updatePresenceInfo = function(k, l) {
        'use strict';
        if (this.$ChatproxyPresence2) {
            this.$ChatproxyPresence2 = false;
            c('PresenceStatus').resetPresenceData();
        }
        l = l.obj;
        var m = l.buddyList;
        c('PresenceStatus').setMultiChatproxy(m);
        var n = false;
        if (l.chatNotif !== undefined) n = this.$ChatproxyPresence3 !== l.chatNotif;
        if (n) this.$ChatproxyPresence3 = l.chatNotif;
        if (l.gamers) c('PresenceStatus').setPlayingCanvasGameFriends(l.gamers);
        if (n) this.$ChatproxyPresence1(c('AvailableListConstants').ON_CHAT_NOTIFICATION_CHANGED, this.$ChatproxyPresence3);
        c('debounceAcrossTransitions')(function() {
            this.$ChatproxyPresence1(c('AvailableListConstants').ON_AVAILABILITY_CHANGED);
        }.bind(this), 0)();
    };
    j.prototype.getWebChatNotification = function() {
        'use strict';
        return this.$ChatproxyPresence3;
    };
    f.exports = j;
}), null);
__d('ChatConfig', ['ChatConfigInitialData'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {},
        i = {
            get: function j(k, l) {
                return k in h ? h[k] : l;
            },
            set: function j(k) {
                if (arguments.length > 1) {
                    var l = {};
                    l[k] = arguments[1];
                    k = l;
                }
                Object.assign(h, k);
            },
            getDebugInfo: function j() {
                return h;
            }
        };
    i.set(c('ChatConfigInitialData'));
    f.exports = i;
}), null);
__d('ChatDispatcher', ['ExplicitRegistrationDispatcher'], (function a(b, c, d, e, f, g) {
    'use strict';
    var h, i;
    if (c.__markCompiled) c.__markCompiled();
    h = babelHelpers.inherits(j, c('ExplicitRegistrationDispatcher'));
    i = h && h.prototype;

    function j() {
        h.apply(this, arguments);
    }
    f.exports = new j({
        strict: false
    });
}), null);
__d('ChatReliabilityTypedLogger', ['Banzai', 'GeneratedLoggerUtils', 'nullthrows'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();

    function h() {
        this.clear();
    }
    h.prototype.log = function() {
        c('GeneratedLoggerUtils').log('logger:ChatReliabilityLoggerConfig', this.$ChatReliabilityTypedLogger1, c('Banzai').BASIC);
    };
    h.prototype.logVital = function() {
        c('GeneratedLoggerUtils').log('logger:ChatReliabilityLoggerConfig', this.$ChatReliabilityTypedLogger1, c('Banzai').VITAL);
    };
    h.prototype.clear = function() {
        this.$ChatReliabilityTypedLogger1 = {};
        return this;
    };
    h.prototype.updateData = function(j) {
        this.$ChatReliabilityTypedLogger1 = babelHelpers['extends']({}, this.$ChatReliabilityTypedLogger1, j);
        return this;
    };
    h.prototype.setEvent = function(j) {
        this.$ChatReliabilityTypedLogger1.event = j;
        return this;
    };
    h.prototype.setEventData = function(j) {
        this.$ChatReliabilityTypedLogger1.event_data = j;
        return this;
    };
    var i = {
        event: true,
        event_data: true
    };
    f.exports = h;
}), null);
__d('ChatReliabilityInstrumentation', ['ChatReliabilityEvents', 'ChatReliabilityTypedLogger', 'MercuryConfig'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    var h = function j(event, k) {
            if (!c('MercuryConfig').EnableReliabilityLogging) return;
            new(c('ChatReliabilityTypedLogger'))().setEvent(event).setEventData(k).log();
        },
        i = {
            logERROR: function j(k) {
                h(c('ChatReliabilityEvents').ERROR, k);
            },
            logCHANNEL_DISCONNECT: function j(k) {
                h(c('ChatReliabilityEvents').CHANNEL_DISCONNECT, k);
            },
            logCHANNEL_CONNECT: function j(k) {
                h(c('ChatReliabilityEvents').CHANNEL_CONNECT, k);
            },
            logCHANNEL_HISTORY_INVALID: function j(k) {
                h(c('ChatReliabilityEvents').CHANNEL_HISTORY_INVALID, k);
            },
            logMESSAGE_RECEIVED: function j(k) {
                h(c('ChatReliabilityEvents').MESSAGE_RECEIVED, k);
            },
            logCHANNEL_STALLED: function j(k) {
                h(c('ChatReliabilityEvents').CHANNEL_STALLED, k);
            },
            logCHANNEL_INIT: function j(k) {
                h(c('ChatReliabilityEvents').CHANNEL_INIT, k);
            },
            logCHANNEL_NOCONFIG: function j(k) {
                h(c('ChatReliabilityEvents').CHANNEL_NOCONFIG, k);
            }
        };
    f.exports = i;
}), null);
__d('PresenceStatusActionTypes', ['keyMirror'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    f.exports = c('keyMirror')({
        AVAILABILITY_CHANGED: null
    });
}), null);
__d("TypingStates", [], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        INACTIVE: 0,
        TYPING: 1,
        QUITTING: 2
    };
    f.exports = h;
}), null);
__d('AvailableList', ['Arbiter', 'ArbiterMixin', 'AsyncRequest', 'AvailableListConstants', 'BanzaiODS', 'Bootloader', 'ChannelConstants', 'ChatConfig', 'ChatDispatcher', 'ChatproxyPresence', 'ChatReliabilityInstrumentation', 'ChatVisibility', 'CurrentUser', 'ErrorUtils', 'JSLogger', 'LastActiveTimes', 'PresencePrivacy', 'PresenceStatus', 'PresenceStatusActionTypes', 'Run', 'ServerTime', 'TypingStates', 'debounceAcrossTransitions', 'emptyFunction', 'requireWeak'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    c('BanzaiODS').setEntitySample('presence', .0001);
    var h = babelHelpers['extends']({}, c('AvailableListConstants'), c('ArbiterMixin')),
        i = /\D/;
    h.subscribe([c('AvailableListConstants').ON_AVAILABILITY_CHANGED, c('AvailableListConstants').ON_UPDATE_ERROR], function(q, r) {
        c('Arbiter').inform(q, r);
    });
    var j = c('debounceAcrossTransitions')(function() {
        h.inform(c('AvailableListConstants').ON_AVAILABILITY_CHANGED);
        c('ChatDispatcher').dispatch({
            type: c('PresenceStatusActionTypes').AVAILABILITY_CHANGED
        });
    }, 0);

    function k(q, r, s, t, u) {
        if (q === c('CurrentUser').getID()) return;
        var v = c('PresenceStatus').set(q, r, s, t, u);
        if (v) {
            var w = c('debounceAcrossTransitions')(function() {
                h.inform(c('AvailableListConstants').ON_AVAILABILITY_CHANGED, q);
                c('ChatDispatcher').dispatch({
                    type: c('PresenceStatusActionTypes').AVAILABILITY_CHANGED,
                    id: q
                });
            }, 0);
            w();
        }
    }

    function l(q) {
        var r = q.payload.availability || {};
        for (var s in r) k(s && s.toString(), r[s].a, true, 'mercury_tabs', r[s].c);
    }

    function m(q) {
        if (!q || i.test(q)) {
            c('ChatReliabilityInstrumentation').logERROR('bad id for available list: ' + q);
            return;
        }
        new(c('AsyncRequest'))('/ajax/mercury/tabs_presence.php').setData({
            target_id: q
        }).setHandler(l).setErrorHandler(c('emptyFunction')).setAllowCrossPageTransition(true).send();
    }

    function n(q, r) {
        r.chat_config = c('ChatConfig').getDebugInfo();
        r.available_list_debug_info = {
            count: c('PresenceStatus').getOnlineIDs().length
        };
    }
    var o = undefined;
    try {
        o = new(c('ChatproxyPresence'))(function(event) {
            h.inform(event);
        });
        o.subscribe();
    } catch (p) {
        c('ErrorUtils').reportError && c('ErrorUtils').reportError(p, false);
        c('ChatReliabilityInstrumentation').logERROR(p.getMessage());
    }
    Object.assign(h, {
        getChatproxyPresenceObject: function q() {
            return o;
        },
        get: function q(r) {
            return c('PresenceStatus').get(r);
        },
        updateForID: function q(r) {
            m(r);
            if (c('PresencePrivacy').getVisibility() == c('PresencePrivacy').ONLINE) c('Run').onAfterLoad(function() {
                return (c('Bootloader').loadModules(["ChannelManager", "ChannelTransport"], function(s, t) {
                    t.sendAdditionalBuddyRequest(s.getCompleteConfig(), r);
                }, 'AvailableList'));
            });
        },
        getWebChatNotification: function q() {
            return o && o.getWebChatNotification();
        },
        isReady: function q() {
            return !!o;
        },
        set: function q(r, s, t, u) {
            k(r, s, true, t, u);
        }
    });
    c('Arbiter').subscribe(c('JSLogger').DUMP_EVENT, n);
    c('PresencePrivacy').subscribe(['privacy-changed', 'privacy-availability-changed', 'privacy-user-presence-response'], j);
    c('requireWeak')('ChannelConnection', function(q) {
        return (q.subscribe([q.CONNECTED, q.RECONNECTING, q.SHUTDOWN, q.MUTE_WARNING, q.UNMUTE_WARNING], j));
    });
    c('Arbiter').subscribe(c('ChannelConstants').getArbiterType('buddylist_overlay'), function(q, r) {
        var s = {},
            t = r.obj.overlay;
        for (var u in t) {
            h.set(u, t[u].a, t[u].s || 'channel', t[u].vc);
            if (t[u].la) s[u] = t[u].la;
        }
        c('LastActiveTimes').update(s);
    });
    c('Arbiter').subscribe([c('ChannelConstants').getArbiterType('typ'), c('ChannelConstants').getArbiterType('ttyp')], function(q, r) {
        var s = r.obj;
        if (s.st === c('TypingStates').TYPING) {
            var t = s.from;
            if (c('ChatVisibility').isOnline()) {
                c('BanzaiODS').bumpEntityKey('presence', 'stale_presence_check_typing');
                var u = c('PresenceStatus').get(t);
                if (u != c('AvailableListConstants').ACTIVE) {
                    var v = c('LastActiveTimes').get(t) * 1000,
                        w = c('ServerTime').get();
                    if (!v) {
                        c('BanzaiODS').bumpEntityKey('presence', 'no_detailed_presence_typing');
                    } else if (w - v > 5 * 60 * 1000) {
                        var x = 'stale_presence_typing',
                            y = w - v;
                        if (y < 10 * 60 * 1000) {
                            x += '600';
                        } else if (y < 60 * 60 * 1000) x += '3600';
                        c('BanzaiODS').bumpEntityKey('presence', x);
                    }
                }
            }
            h.set(t && t.toString(), c('AvailableListConstants').ACTIVE, 'channel-typing');
        }
    });
    c('Arbiter').subscribe(c('ChannelConstants').getArbiterType('messaging'), function(q, r) {
        if (!c('ChatVisibility').isOnline()) return;
        var s = r.obj;
        if (s.message && s.message.timestamp && s.message.sender_fbid) {
            var t = c('ServerTime').get(),
                u = s.message.timestamp;
            if (t - u < 2 * 60 * 1000) {
                c('BanzaiODS').bumpEntityKey('presence', 'stale_presence_check');
                var v = s.message.sender_fbid,
                    w = c('PresenceStatus').get(v);
                if (w == c('AvailableListConstants').ACTIVE) return;
                var x = c('LastActiveTimes').get(v) * 1000;
                if (!x) {
                    c('BanzaiODS').bumpEntityKey('presence', 'no_detailed_presence');
                } else if (u - x > 5 * 60 * 1000) {
                    var y = 'stale_presence',
                        z = u - x;
                    if (z < 10 * 60 * 1000) {
                        y += '600';
                    } else if (z < 60 * 60 * 1000) y += '3600';
                    c('BanzaiODS').bumpEntityKey('presence', y);
                }
            }
        }
    });
    f.exports = h;
}), null);
__d('Poller', ['ArbiterMixin', 'AsyncRequest', 'CurrentUser', 'emptyFunction', 'mixin', 'setTimeoutAcrossTransitions', 'setTimeout'], (function a(b, c, d, e, f, g) {
    var h, i;
    if (c.__markCompiled) c.__markCompiled();
    h = babelHelpers.inherits(j, c('mixin')(c('ArbiterMixin')));
    i = h && h.prototype;

    function j(l) {
        'use strict';
        i.constructor.call(this);
        this._config = babelHelpers['extends']({
            clearOnQuicklingEvents: true,
            setupRequest: c('emptyFunction'),
            interval: null,
            maxRequests: Infinity,
            dontStart: false
        }, l);
        this._handle = null;
        this._isSkipIndefinitely = false;
        this._hasSkippedRequest = false;
        this._requests = 0;
        this._muted = false;
        this._polling = false;
        this._skip = false;
        this._cancelRequest = c('emptyFunction');
        if (!this._config.dontStart) this.start();
    }
    j.prototype.start = function() {
        'use strict';
        if (this._polling) return this;
        this._requests = 0;
        this.request();
        return this;
    };
    j.prototype.stop = function() {
        'use strict';
        this._cancelRequest();
        return this;
    };
    j.prototype.mute = function() {
        'use strict';
        this._muted = true;
        return this;
    };
    j.prototype.resume = function() {
        'use strict';
        if (this._muted) {
            this._muted = false;
            if (this._handle === null && this._polling) return this.request();
        }
        if (this._isSkipIndefinitely) {
            this._isSkipIndefinitely = false;
            return this.request();
        }
        return this;
    };
    j.prototype.skip = function() {
        'use strict';
        this._skip = true;
        return this;
    };
    j.prototype.startSkipIndefinitely = function() {
        'use strict';
        this._isSkipIndefinitely = true;
        return this;
    };
    j.prototype.stopSkipIndefinitely = function() {
        'use strict';
        this._isSkipIndefinitely = false;
        if (this._hasSkippedRequest) {
            return this.request();
        } else return this;
    };
    j.prototype.isSkipIndefinitely = function() {
        'use strict';
        return this._isSkipIndefinitely;
    };
    j.prototype.reset = function() {
        'use strict';
        return this.stop().start();
    };
    j.prototype.request = function() {
        'use strict';
        this._cancelRequest();
        this._polling = true;
        if (!this._config.allowNotLoggedIn && !k()) return this._done();
        if (this._muted) return this;
        var l = false;
        this._cancelRequest = function() {
            l = true;
            this._cleanup();
        }.bind(this);
        if (this._isSkipIndefinitely) {
            this._deferRequest();
            this._hasSkippedRequest = true;
            return this;
        } else this._hasSkippedRequest = false;
        if (++this._requests > this._config.maxRequests) return this._done();
        var m = new(c('AsyncRequest'))();
        m.setIsBackgroundRequest(true);
        m.setInitialHandler(function() {
            return !l;
        });
        m.setFinallyHandler(this._deferRequest.bind(this));
        m.setInitialHandler = c('emptyFunction');
        m.setFinallyHandler = c('emptyFunction');
        this._config.setupRequest(m, this);
        if (this._skip) {
            this._skip = false;
            c('setTimeoutAcrossTransitions')(this._deferRequest.bind(this), 0);
        } else m.send();
        return this;
    };
    j.prototype.isPolling = function() {
        'use strict';
        return this._polling;
    };
    j.prototype.isMuted = function() {
        'use strict';
        return this._muted;
    };
    j.prototype.setInterval = function(l) {
        'use strict';
        if (l) {
            this._config.interval = l;
            this.start();
        }
    };
    j.prototype.getInterval = function() {
        'use strict';
        return this._config.interval;
    };
    j.prototype._cleanup = function() {
        'use strict';
        if (this._handle !== null) clearTimeout(this._handle);
        this._handle = null;
        this._cancelRequest = c('emptyFunction');
        this._polling = false;
    };
    j.prototype._done = function() {
        'use strict';
        this._cleanup();
        this.inform('done', {
            sender: this
        });
        return this;
    };
    j.prototype._deferRequest = function() {
        'use strict';
        if (!this._polling) return;
        if (this._requests < this._config.maxRequests) {
            var l = this._config.interval;
            l = typeof l === 'function' ? l(this._requests) : l;
            l = l > j.MIN_INTERVAL ? l : j.MIN_INTERVAL;
            if (this._config.clearOnQuicklingEvents) {
                this._handle = c('setTimeout')(this.request.bind(this), l);
            } else this._handle = c('setTimeoutAcrossTransitions')(this.request.bind(this), l);
        } else this._done();
    };
    j.MIN_INTERVAL = 2000;

    function k() {
        return c('CurrentUser').isLoggedInNow();
    }
    f.exports = j;
}), null);
__d('ChatImpressionLogger', ['AsyncSignal', 'ChatConfig', 'ChatVisibility', 'Poller', 'PresencePrivacy', 'PresenceStatus', 'requireWeak', 'debounceAcrossTransitions'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = null;
    c('requireWeak')('AvailableList', function(m) {
        return h = m;
    });
    var i = null;

    function j(m) {
        if (!i) {
            m([]);
        } else i.getSortedList(function(n) {
            return m(n);
        });
    }

    function k(m) {
        if (!i || !h) return '';
        var n = [];
        for (var o = 0; o < m.length; o++) n[o] = h.get(m[o]);
        return n.toString();
    }
    var l = {
        init: function m(n) {
            i = n;
            j(function(o) {
                var p, q = o.toString(),
                    r = k(o),
                    s = c('ChatConfig').get('chat_impression_logging_periodical', 0);
                if (s)(function() {
                    var t = c('ChatConfig').get('periodical_impression_logging_config.interval'),
                        u = new(c('Poller'))({
                            interval: t,
                            setupRequest: function v(w) {
                                w.setURI('/ajax/chat/imps_logging.php').setData({
                                    list_availability: r,
                                    sorted_list: q,
                                    source: 'periodical_imps'
                                });
                            },
                            clearOnQuicklingEvents: false,
                            dontStart: true
                        });
                    c('PresencePrivacy').subscribe('privacy-user-presence-changed', c('debounceAcrossTransitions')(function() {
                        if (c('ChatVisibility').isOnline()) {
                            u.start();
                        } else u.stop();
                    }));
                })();
            });
            this.init = function() {};
        },
        logImpression: function m(n, o, p) {
            j(function(q) {
                var r = c('ChatConfig').get('chat_impression_logging_with_click'),
                    s = {
                        list_availability: r ? k(q) : '',
                        sorted_list: r ? q.toString() : '',
                        source: n,
                        target: o,
                        target_presence: c('PresenceStatus').get(o),
                        viewport_width: document.body.clientWidth
                    };
                new(c('AsyncSignal'))('/ajax/chat/ct.php', Object.assign(s, p)).send();
            });
        }
    };
    f.exports = l;
}), null);
__d('ChatTypeaheadConstants', [], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        USER_TYPE: 'user',
        THREAD_TYPE: 'thread',
        FRIEND_TYPE: 'friend',
        NON_FRIEND_TYPE: 'non_friend',
        FB4C_TYPE: 'fb4c',
        PAGE_TYPE: 'page',
        MEETING_ROOM_PAGE_TYPE: 'meeting_room_page',
        COMMERCE_PAGE_TYPE: 'commerce_page',
        HEADER_TYPE: 'header'
    };
    f.exports = h;
}), null);
__d('MercuryIDs', [], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        isValid: function i(j) {
            if (!j || typeof j !== 'string') return false;
            return /^\w{3,12}:.+/.test(j);
        },
        isValidThreadID: function i(j) {
            if (!h.isValid(j)) return false;
            var k = h.tokenize(j);
            switch (k.type) {
                case 'user':
                case 'group':
                case 'support':
                case 'thread':
                case 'root':
                case 'pending':
                    return true;
                default:
                    return false;
            }
        },
        tokenize: function i(j) {
            if (!j || !h.isValid(j)) throw new Error('bad_id_format ' + String(j));
            var k = j.indexOf(':');
            return {
                type: j.substr(0, k),
                value: j.substr(k + 1)
            };
        },
        getUserIDFromParticipantID: function i(j) {
            if (!h.isValid(j)) throw new Error('bad_id_format ' + j);
            var k = h.tokenize(j),
                l = k.type,
                m = k.value;
            return l === 'fbid' ? m : null;
        },
        getParticipantIDFromUserID: function i(j) {
            if (isNaN(j)) throw new Error('Not a user ID: ' + j);
            return 'fbid:' + j;
        },
        getUserIDFromThreadID: function i(j) {
            if (!this.isCanonical(j)) return null;
            return this.tokenize(j).value;
        },
        getThreadIDFromUserID: function i(j) {
            return 'user:' + j;
        },
        getThreadIDFromThreadFBID: function i(j) {
            return 'thread:' + j;
        },
        getThreadIDFromSupportInboxItemID: function i(j) {
            return 'support:' + j;
        },
        getThreadFBIDFromThreadID: function i(j) {
            return this.tokenize(j).value;
        },
        getThreadIDFromParticipantID: function i(j) {
            var k = this.getUserIDFromParticipantID(j);
            return k ? this.getThreadIDFromUserID(k) : null;
        },
        getParticipantIDFromFromThreadID: function i(j) {
            var k = this.getUserIDFromThreadID(j);
            return k ? this.getParticipantIDFromUserID(k) : null;
        },
        getSupportInboxItemIDFromThreadID: function i(j) {
            return this.tokenize(j).value;
        },
        isCanonical: function i(j) {
            return this.isValid(j) && this.tokenize(j).type === 'user';
        },
        isGroupChat: function i(j) {
            return this.isValid(j) && this.tokenize(j).type !== 'user';
        },
        isLocalThread: function i(j) {
            return this.isValid(j) && this.tokenize(j).type === 'root';
        }
    };
    f.exports = h;
}), null);
__d('WebMessengerPermalinkConstants', ['URI'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        ARCHIVED_PATH: '/messages/archived',
        BASE_PATH: '/messages',
        PENDING_PATH: '/messages/pending',
        OTHER_PATH: '/messages/other',
        SPAM_PATH: '/messages/spam',
        COMPOSE_POSTFIX_PATH: '/new',
        SEARCH_POSTFIX_PATH: '/search',
        TID_POSTFIX_PARTIAL_PATH: '/conversation-',
        overriddenVanities: '(archived|other|pending|spam|new|search|conversation-.*)',
        getURIPathForThreadID: function i(j, k) {
            return (k || h.BASE_PATH) + h.TID_POSTFIX_PARTIAL_PATH + c('URI').encodeComponent(c('URI').encodeComponent(j));
        },
        getThreadIDFromURI: function i(j) {
            var k = j.getPath().match(h.BASE_PATH + '(/[^/]*)*' + h.TID_POSTFIX_PARTIAL_PATH + '([^/]+)');
            if (k) {
                var l = c('URI').decodeComponent(c('URI').decodeComponent(k[2]));
                return l;
            }
        },
        getURIPathForIDOrVanity: function i(j, k) {
            if (j.match('^' + h.overriddenVanities + '$')) j = '.' + j;
            return (k || h.BASE_PATH) + '/' + j;
        },
        getUserIDOrVanity: function i(j) {
            var k = j.match(h.BASE_PATH + '.*/([^/]+)/?$'),
                l = k && k[1],
                m = h.overriddenVanities;
            if (!l || l.match('^' + m + '$')) {
                return false;
            } else if (l.match('^\\.' + m + '$')) {
                return l.substr(1);
            } else return l;
        }
    };
    f.exports = h;
}), null);
__d('ChatOpenTab', ['csx', 'Bootloader', 'ChatTypeaheadConstants', 'ContextualThing', 'Event', 'MercuryConfig', 'MercuryIDs', 'MercuryParticipantTypes', 'Parent', 'URI', 'WebMessengerPermalinkConstants', 'WorkFocusModeController', 'emptyFunction', 'goURI', 'ifRequired', 'requireWeak'], (function a(b, c, d, e, f, g, h) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    var i = c('WorkFocusModeController').WorkFocusMode,
        j = null;
    c('requireWeak')('FantaTabsApp', function(t) {
        return j = t;
    });
    c('requireWeak')('ChatApp', function(t) {
        return j = t;
    });

    function k(t, u) {
        var v = t ? new(c('URI'))(c('WebMessengerPermalinkConstants').getURIPathForThreadID(t)) : new(c('URI'))(c('WebMessengerPermalinkConstants').BASE_PATH + c('WebMessengerPermalinkConstants').COMPOSE_POSTFIX_PATH);
        if (u) v.addQueryData({
            ref: u
        });
        c('ifRequired')('BusinessURI.brands', function(w) {
            return c('goURI')(w(v));
        }, function() {
            return c('goURI')(v);
        });
    }

    function l(t, u) {
        var v = c('MercuryIDs').getThreadIDFromUserID(t);
        i && i.addBypassFocusModeForThread(v);
        k(v, u);
    }

    function m(t, u, v) {
        var w = c('MercuryIDs').getThreadIDFromUserID(u);
        i && i.addBypassFocusModeForThread(w);
        l(u, v);
    }

    function n(t, u) {
        var v = c('MercuryIDs').getThreadIDFromUserID(t);
        i && i.addBypassFocusModeForThread(v);
        k(v, u);
    }

    function o(t, u) {
        k(null, u);
    }

    function p(t, u, v, w) {
        c('Event').listen(t, 'click', function(x) {
            if (s.canOpenTab()) {
                w(u, v);
                return x.kill();
            }
        });
    }

    function q(t, u, v, w) {
        c('Event').listen(t, 'click', function(x) {
            if (s.canOpenTab()) w(u, v);
        });
    }

    function r(t) {
        var u = c('ContextualThing').getContext(t);
        return u && c('Parent').bySelector(u, "._3qw") !== null;
    }
    var s = {
        canOpenTab: function t() {
            return j && !j.isHidden();
        },
        openEmptyTab: function t(u, v, w) {
            s.impl().openEmptyTab(u, v, w);
        },
        listenOpenEmptyTabDEPRECATED: function t(u, v) {
            if (c('MercuryConfig').FantaTabs) {
                p(u, null, v, this._loadAndOpenEmptyFantaTab);
            } else p(u, null, v, s.openEmptyTab);
        },
        openThread: function t(u, v, w, x, y) {
            s.impl().openThreadTab(u, v, w, x, y);
        },
        openClientTab: function t(u, v, w, x, y) {
            var z = s.impl();
            z.openClientTab(u, x, y);
            z._logChatOpenTabEvent(v, u, null, w);
        },
        listenOpenThreadDEPRECATED: function t(u, v, w) {
            var x = c('MercuryConfig').FantaTabs ? this._loadAndOpenFantaTab : s.openThread;
            p(u, v, w, x);
        },
        openUserTab: function t(u, v, w) {
            s.impl().openUserTab(u, v, w);
        },
        openPageTab: function t(u, v, w) {
            s.impl().openPageTab(u, v, w);
            return true;
        },
        openPageTabDEPRECATED: function t(u, v, w) {
            if (c('MercuryConfig').FantaTabs) {
                this._loadAndOpenFantaTab(v, c('MercuryParticipantTypes').PAGE);
            } else s.impl().openPageTab(u, v, w);
            return true;
        },
        listenOpenUserTabDEPRECATED: function t(u, v, w) {
            if (!r(u)) {
                var x = c('MercuryConfig').FantaTabs ? function(y) {
                    return this._loadAndOpenFantaTab(y, c('MercuryParticipantTypes').USER);
                }.bind(this) : s.openUserTab;
                p(u, v, w, x);
            }
        },
        listenOpenUserTabPersistentEventDEPRECATED: function t(u, v, w) {
            if (!r(u)) {
                var x = c('MercuryConfig').FantaTabs ? function(y) {
                    return this._loadAndOpenFantaTab(y, c('MercuryParticipantTypes').USER);
                }.bind(this) : s.openUserTab;
                q(u, v, w, x);
            }
        },
        listenOpenPageTabDEPRECATED: function t(u, v, w, x) {
            if (!r(u)) {
                var y = c('MercuryConfig').FantaTabs ? function(z) {
                    return this._loadAndOpenFantaTab(z, c('MercuryParticipantTypes').PAGE);
                }.bind(this) : function(z) {
                    return s.openPageTab(w, z, x);
                };
                p(u, v, x, y);
            }
        },
        listenOpenPageTabPersistentEventDEPRECATED: function t(u, v, w, x) {
            if (!r(u)) {
                var y = c('MercuryConfig').FantaTabs ? function(z) {
                    return this._loadAndOpenFantaTab(z, c('MercuryParticipantTypes').PAGE);
                }.bind(this) : function(z) {
                    return s.openPageTab(w, z, x);
                };
                q(u, v, x, y);
            }
        },
        openTabByType: function t(u, v, w) {
            if (v === c('ChatTypeaheadConstants').THREAD_TYPE) {
                if (u) {
                    this.openThread(u, w);
                } else this.openEmptyTab(null, w);
            } else if (v === c('ChatTypeaheadConstants').MEETING_ROOM_PAGE_TYPE) {
                var x = c('MercuryIDs').getUserIDFromThreadID(u);
                c('goURI')('/' + x);
            } else if (!v || v === c('MercuryParticipantTypes').FRIEND || v === c('ChatTypeaheadConstants').FRIEND_TYPE || v === c('ChatTypeaheadConstants').PAGE_TYPE || v === c('ChatTypeaheadConstants').USER_TYPE) {
                if (c('MercuryIDs').isValidThreadID(u)) u = c('MercuryIDs').getUserIDFromThreadID(u);
                this.openUserTab(u, w);
            } else this.openThread(u, w);
        },
        impl: function t() {
            if (j && j.isInitialized() && !j.isHidden() && j.chatOpenTabImpl) {
                return j.chatOpenTabImpl;
            } else return {
                openClientTab: k,
                openUserTab: l,
                openEmptyTab: o,
                openThreadTab: n,
                openPageTab: m,
                _logChatOpenTabEvent: c('emptyFunction')
            };
        },
        _loadAndOpenFantaTab: function t(u, v) {
            c('Bootloader').loadModules(["FantaTabActions"], function(w) {
                if (v === c('MercuryParticipantTypes').USER || v === c('MercuryParticipantTypes').PAGE) {
                    var x = c('MercuryIDs').getThreadIDFromUserID(u);
                    w.openTab(x);
                } else w.openTab(u);
            }, 'ChatOpenTab');
        },
        _loadAndOpenEmptyFantaTab: function t() {
            c('Bootloader').loadModules(["FantaTabActions", "MercuryThreads"], function(u, v) {
                var w = v.get().createNewLocalThreadGenerateID();
                u.openTab(w);
            }, 'ChatOpenTab');
        }
    };
    f.exports = s;
}), null);
__d('ChatOpenTabEventLogger', ['Banzai', 'ChatImpressionLogger', 'ChatTypeaheadConstants', 'MercuryIDs', 'MercuryParticipantTypes'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    var h = 'messaging_tracking',
        i = {
            log: function j(k, l, m, n) {
                var o = {
                    referrer: k || '',
                    message_thread_id: l,
                    message_view: 'chat',
                    timestamp_send: Date.now(),
                    message_target_ids: null
                };
                if (m !== undefined) o.message_target_ids = [m];
                c('ChatImpressionLogger').logImpression(k, m, n);
                c('Banzai').post(h, o, {
                    delay: 0,
                    retry: true
                });
                var p = c('MercuryIDs').getUserIDFromThreadID(String(l));
                c('Banzai').post('page_message_button_click', {
                    page_id: p,
                    ref: k
                });
            },
            logUser: function j(k, l, m) {
                var n = c('MercuryIDs').getThreadIDFromUserID(l);
                this.log(k, n, l, m);
            },
            logPage: function j(k, l) {
                this.logUser(k, l);
            },
            logByType: function j(k, l, m) {
                if (k === c('ChatTypeaheadConstants').THREAD_TYPE) {
                    this.log(l, m);
                } else if (k === c('ChatTypeaheadConstants').MEETING_ROOM_PAGE_TYPE) {
                    var n = c('MercuryIDs').getUserIDFromThreadID(m);
                    this.log(l, m, n);
                } else if (!k || k === c('MercuryParticipantTypes').FRIEND || k === c('ChatTypeaheadConstants').FRIEND_TYPE || k === c('ChatTypeaheadConstants').PAGE_TYPE || k === c('ChatTypeaheadConstants').USER_TYPE) {
                    var o = void 0;
                    if (c('MercuryIDs').isValidThreadID(m)) o = c('MercuryIDs').getUserIDFromThreadID(m);
                    this.log(l, m, o);
                } else this.log(l, m);
            }
        };
    f.exports = i;
}), null);
__d('ChatSidebarActionTypes', ['keyMirror'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    f.exports = c('keyMirror')({
        INIT: null,
        LOADED: null,
        SET_ENABLED: null,
        SHOW: null
    });
}), null);
__d("ChatSidebarHideReason", [], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        VIEWPORT_INCAPABLE: 0,
        LOW_FRIEND_COUNT: 1,
        NOT_ENABLED: 2
    };
    f.exports = h;
}), null);
__d('ChatSidebarStore', ['ChatDispatcher', 'ChatOptionsInitialData', 'ChatSidebarActionTypes', 'FluxStore', 'SidebarType', 'performanceAbsoluteNow'], (function a(b, c, d, e, f, g) {
    'use strict';
    var h, i;
    if (c.__markCompiled) c.__markCompiled();
    h = babelHelpers.inherits(j, c('FluxStore'));
    i = h && h.prototype;

    function j() {
        i.constructor.call(this, c('ChatDispatcher'));
        this.$ChatSidebarStore2 = {
            initialized: false,
            initTime: c('performanceAbsoluteNow')(),
            loaded: false,
            enabled: !!c('ChatOptionsInitialData').sidebar_mode,
            visible: null
        };
        this.$ChatSidebarStore1 = {};
    }
    j.prototype.__onDispatch = function(k) {
        var l = k.type;
        this.$ChatSidebarStore1 = babelHelpers['extends']({}, this.$ChatSidebarStore2);
        switch (l) {
            case c('ChatSidebarActionTypes').INIT:
                if (!this.$ChatSidebarStore1.initialized) this.$ChatSidebarStore2.initTime = c('performanceAbsoluteNow')();
                this.$ChatSidebarStore2.initialized = true;
                break;
            case c('ChatSidebarActionTypes').LOADED:
                this.$ChatSidebarStore2.loaded = true;
                break;
            case c('ChatSidebarActionTypes').SHOW:
                this.$ChatSidebarStore2.visible = k.sidebarType;
                break;
            case c('ChatSidebarActionTypes').SET_ENABLED:
                this.$ChatSidebarStore2.enabled = k.enabled;
                this.$ChatSidebarStore2.visible = k.sidebarType;
                break;
        }
        for (var m in this.$ChatSidebarStore2)
            if (this.$ChatSidebarStore2.hasOwnProperty(m))
                if (this.$ChatSidebarStore2[m] !== this.$ChatSidebarStore1[m]) {
                    this.__emitChange();
                    break;
                }
    };
    j.prototype.getPrevState = function() {
        return this.$ChatSidebarStore1;
    };
    j.prototype.getState = function() {
        return this.$ChatSidebarStore2;
    };
    j.prototype.isInitialized = function() {
        return this.$ChatSidebarStore2.initialized;
    };
    j.prototype.isLoaded = function() {
        return this.$ChatSidebarStore2.loaded;
    };
    j.prototype.isEnabled = function() {
        return this.$ChatSidebarStore2.enabled;
    };
    j.prototype.getInitTime = function() {
        return this.$ChatSidebarStore2.initTime;
    };
    j.prototype.getVisibleType = function() {
        return this.$ChatSidebarStore2.visible;
    };
    f.exports = new j();
}), null);
__d('ChatSidebarPreloadStore', ['ChatGraphQLSidebar', 'InitialChatFriendsList'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    var h = c('ChatGraphQLSidebar').Preloader,
        i = {
            onLoaded: function j(k) {
                if (h) {
                    h.onLoaded(function(l) {
                        var m = l.buddies,
                            n = l.groups,
                            o = l.profiles;
                        return k({
                            buddies: m,
                            groups: n,
                            profiles: o
                        });
                    });
                } else k({
                    buddies: c('InitialChatFriendsList').list || [],
                    groups: c('InitialChatFriendsList').groups || [],
                    profiles: []
                });
            }
        };
    f.exports = i;
}), null);
__d('ChatProfileStore', ['ChatSidebarPreloadStore'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    var h = {},
        i = {
            init: function j() {
                c('ChatSidebarPreloadStore').onLoaded(function(k) {
                    var l = k.profiles;
                    return l.forEach(function(m) {
                        var n = new Date(),
                            o = m.birthdate && n.getDate() === m.birthdate.day && n.getMonth() + 1 === m.birthdate.month,
                            p = m.profile_picture && m.profile_picture.uri ? m.profile_picture.uri : null;
                        h[m.id] = {
                            id: m.id,
                            is_birthday: o,
                            thumbSrc: p,
                            name: m.name,
                            is_messenger_only: !!m.is_messenger_only
                        };
                    });
                });
            },
            get: function j(k) {
                return h[k];
            }
        };
    f.exports = i;
}), null);
__d('OrderedFriendsList', ['AvailableListConstants', 'ChatProfileStore', 'ChatSidebarPreloadStore', 'MercuryIDs', 'PresenceStatus', 'SearchableEntry', 'ShortProfiles', 'WorkModeConfig', 'createArrayFromMixed', 'isValidUniqueID', 'InitialChatFriendsList'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    var h = null,
        i = {},
        j = [],
        k = {};

    function l(r) {
        r = String(r);
        return c('MercuryIDs').isValid(r) ? r : c('MercuryIDs').getParticipantIDFromUserID(r);
    }

    function m(r, s) {
        var t = c('createArrayFromMixed')(r);
        s(t.filter(function(u) {
            var v = c('ShortProfiles').getNow(u);
            return !v || p(v) || v.is_nonfriend_messenger_contact;
        }));
    }

    function n(r) {
        h = [];
        var s = 0;
        r.forEach(function(t) {
            var u = t.slice(0, -2),
                v = t.slice(-1);
            if (c('PresenceStatus').get(u) == v) {
                h[s] = u;
                i[u] = s++;
            }
        });
    }

    function o(r) {
        var s = 0;
        r.forEach(function(t) {
            var u = t.slice(0, -2),
                v = t.slice(-1);
            if (v == c('AvailableListConstants').ACTIVE) {
                j[s] = u;
                k[u] = s++;
            }
        });
    }

    function p(r) {
        return r.type === 'friend' || c('WorkModeConfig').is_work_user && r.type === 'fb4c';
    }
    var q = {
        contains: function r(s) {
            return s in i;
        },
        getList: function r(s) {
            if (h && h.length) {
                m(h, s);
                return;
            }
            c('ChatSidebarPreloadStore').onLoaded(function(t) {
                var u = t.buddies;
                n(u);
                m(h, s);
            });
        },
        getSearchableEntries: function r(s, t) {
            q.getList(function(u) {
                c('ChatSidebarPreloadStore').onLoaded(function(v) {
                    var w = v.groups;
                    c('ShortProfiles').getMulti(u.slice(0, s), function(x) {
                        var y = [];
                        for (var z in x) y.push(q.normalizeProfileEntry(x[z], z));
                        var aa = w.map(q.normalizeThreadEntry);
                        t(y.concat(aa).filter(function(ba) {
                            return !!ba;
                        }).sort(function(ba, ca) {
                            return ba.getOrder() - ca.getOrder();
                        }));
                    });
                });
            });
        },
        normalizeProfileEntry: function r(s, t) {
            var u = s.searchTokens || [],
                v = s.name,
                w = null;
            return new(c('SearchableEntry'))({
                uniqueID: s.id || t,
                keywordString: u.join(' '),
                order: q.getRank(s.id || t),
                photo: s.thumbSrc,
                title: v,
                subtitle: w,
                type: s.type,
                uri: s.uri,
                auxiliaryData: {
                    isMessengerUser: s.is_messenger_user
                }
            });
        },
        normalizeThreadEntry: function r(s, t) {
            var u = s.mercury_thread,
                v = s.participants_to_render.map(function(aa) {
                    return babelHelpers['extends']({}, aa, {
                        id: l(aa.id)
                    });
                });
            u.participants = u.participants.map(l);
            var w = s.text,
                x = null;
            if (!w) w = u.name;
            var y = v.map(function(aa) {
                return aa.name;
            }).join(', ');
            if (!w) {
                w = y;
            } else x = y;
            var z = s.uid;
            if (!w || !c('isValidUniqueID')(z)) return null;
            return new(c('SearchableEntry'))({
                uniqueID: z,
                order: t,
                photo: u.image_src,
                title: w,
                subtitle: x,
                type: 'thread',
                auxiliaryData: {
                    participantsToRender: v,
                    thread: u
                }
            });
        },
        getRank: function r(s) {
            if (s in i) return i[s];
            return h ? h.length : 0;
        },
        getActiveList: function r(s) {
            if (j.length > 0) {
                s(j);
                return;
            }
            q.getList(function(t) {
                return s(t);
            });
        },
        getActiveRank: function r(s) {
            return s in k ? k[s] : q.getRank(s);
        }
    };
    (function() {
        var r = c('InitialChatFriendsList');
        if (r.shortProfiles) c('ShortProfiles').setMulti(r.shortProfiles);
        c('ChatSidebarPreloadStore').onLoaded(function(s) {
            var t = s.buddies;
            o(t);
            n(t);
        });
        c('ChatProfileStore').init();
    })();
    f.exports = q;
}), null);
__d('ChatSidebarVisibility', ['ChatConfig', 'ChatSidebarHideReason', 'ChatSidebarStore', 'OrderedFriendsList', 'SidebarType', 'getViewportDimensions'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    var h = c('ChatConfig').get('sidebar.min_friends'),
        i = c('ChatConfig').get('sidebar.minimum_width'),
        j = {
            getViewport: function k() {
                return c('getViewportDimensions').withoutScrollbars();
            },
            shouldShowSidebar: function k(l, m) {
                j.shouldShowSidebarIgnoreEnabled(l, function(n, o) {
                    var p = c('ChatSidebarStore').isEnabled();
                    m(n && p, p ? o : o.concat([c('ChatSidebarHideReason').NOT_ENABLED]));
                });
            },
            shouldShowSidebarIgnoreEnabled: function k(l, m) {
                c('OrderedFriendsList').getActiveList(function(n) {
                    var o = l || j.getViewport(),
                        p = o.width > i,
                        q = n.length <= h,
                        r = true,
                        s = [];
                    if (!p) {
                        r = false;
                        s.push(c('ChatSidebarHideReason').VIEWPORT_INCAPABLE);
                    }
                    if (q) {
                        r = false;
                        s.push(c('ChatSidebarHideReason').LOW_FRIEND_COUNT);
                    }
                    m(r, s);
                });
            },
            isSidebarVisible: function k() {
                return c('ChatSidebarStore').getVisibleType() === c('SidebarType').SIDEBAR;
            },
            isBuddyListVisible: function k() {
                return c('ChatSidebarStore').getVisibleType() === c('SidebarType').BUDDYLIST;
            }
        };
    f.exports = j;
}), null);
__d('ChatSidebarActions', ['ChatDispatcher', 'ChatSidebarActionTypes', 'ChatSidebarVisibility', 'SidebarType'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        init: function i() {
            c('ChatDispatcher').dispatch({
                type: c('ChatSidebarActionTypes').INIT
            });
        },
        loaded: function i() {
            c('ChatDispatcher').dispatch({
                type: c('ChatSidebarActionTypes').LOADED
            });
        },
        disable: function i() {
            c('ChatDispatcher').dispatch({
                type: c('ChatSidebarActionTypes').SET_ENABLED,
                enabled: false,
                sidebarType: c('SidebarType').BUDDYLIST
            });
        },
        enable: function i(j) {
            c('ChatDispatcher').dispatch({
                type: c('ChatSidebarActionTypes').SET_ENABLED,
                enabled: true,
                sidebarType: j
            });
        },
        show: function i(j) {
            c('ChatDispatcher').dispatch({
                type: c('ChatSidebarActionTypes').SHOW,
                sidebarType: j
            });
        }
    };
    f.exports = h;
}), null);
__d('FBRTCDispatcher', ['Dispatcher_DEPRECATED'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    f.exports = new(c('Dispatcher_DEPRECATED'))();
}), null);
__d('FBRTCStore', ['FBRTCDispatcher', 'FluxStore'], (function a(b, c, d, e, f, g) {
    'use strict';
    var h, i;
    if (c.__markCompiled) c.__markCompiled();
    h = babelHelpers.inherits(j, c('FluxStore'));
    i = h && h.prototype;

    function j() {
        i.constructor.call(this, c('FBRTCDispatcher'));
    }
    j.prototype.__emitChange = function() {
        this.__emitter.emit(this.__changeEvent);
    };
    f.exports = j;
}), null);
__d('FBRTCCallBlockingStore', ['Arbiter', 'AsyncRequest', 'BanzaiLogger', 'ChannelConstants', 'FBRTCDispatcher', 'FBRTCStore', 'setTimeoutAcrossTransitions'], (function a(b, c, d, e, f, g) {
    'use strict';
    var h, i;
    if (c.__markCompiled) c.__markCompiled();
    var j = false,
        k = 0,
        l = null,
        m = 'call_block_setting_changed';
    h = babelHelpers.inherits(n, c('FBRTCStore'));
    i = h && h.prototype;
    n.prototype.init = function(o) {
        this.$FBRTCCallBlockingStore1(o);
        c('Arbiter').subscribe(c('ChannelConstants').getArbiterType('videocall_block_setting'), this.$FBRTCCallBlockingStore2.bind(this));
    };
    n.prototype.__onDispatch = function(o) {
        if (o.type !== m) return;
        this.$FBRTCCallBlockingStore1(o.data);
    };
    n.prototype.$FBRTCCallBlockingStore1 = function(o) {
        switch (o) {
            case 0:
                j = false;
                this.$FBRTCCallBlockingStore3();
                break;
            case -1:
                j = true;
                this.$FBRTCCallBlockingStore3();
                break;
            default:
                j = true;
                this.$FBRTCCallBlockingStore4(o);
        }
        this.__emitChange();
    };
    n.prototype.$FBRTCCallBlockingStore4 = function(o) {
        if (l === null) l = c('setTimeoutAcrossTransitions')(this.turnOnVideoCalling.bind(this), o * 1000);
    };
    n.prototype.getBlockingStatus = function() {
        return j;
    };
    n.prototype.turnOnVideoCalling = function() {
        new(c('AsyncRequest'))('/ajax/chat/settings.php').setHandler(this.$FBRTCCallBlockingStore5.bind(this)).setData({
            call_blocked_until: 0
        }).send();
    };
    n.prototype.turnOffVideoCalling = function(o) {
        k = o;
        new(c('AsyncRequest'))('/ajax/chat/settings.php').setHandler(this.$FBRTCCallBlockingStore6.bind(this)).setData({
            call_blocked_until: o
        }).send();
    };
    n.prototype.$FBRTCCallBlockingStore3 = function() {
        if (l) {
            clearTimeout(l);
            l = null;
        }
    };
    n.prototype.$FBRTCCallBlockingStore5 = function() {
        c('FBRTCDispatcher').dispatch({
            type: m,
            data: 0
        });
        c('BanzaiLogger').log('VideoCallLoggerConfig', {
            event: m,
            message: 'enable'
        });
    };
    n.prototype.$FBRTCCallBlockingStore6 = function() {
        c('FBRTCDispatcher').dispatch({
            type: m,
            data: k
        });
        c('BanzaiLogger').log('VideoCallLoggerConfig', {
            event: m,
            message: 'disable_' + k
        });
    };
    n.prototype.$FBRTCCallBlockingStore2 = function(o, p) {
        c('FBRTCDispatcher').dispatch({
            type: m,
            data: p.obj.value
        });
    };

    function n() {
        h.apply(this, arguments);
    }
    f.exports = new n();
}), null);
__d('ChatOptions', ['Arbiter', 'ChannelConstants', 'ChatSidebarActions', 'ChatSidebarVisibility', 'FBRTCCallBlockingStore', 'JSLogger', 'PresenceUtil', 'SidebarType', 'ChatOptionsInitialData'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = c('JSLogger').create('chat_options'),
        i = {};
    (function() {
        var k = c('ChatOptionsInitialData');
        for (var l in k) {
            var m = k[l];
            if (l === 'call_blocked_until') {
                c('FBRTCCallBlockingStore').init(m);
            } else i[l] = !!m;
        }
    })();
    var j = Object.assign(new(c('Arbiter'))(), {
        getSetting: function k(l) {
            return i[l];
        },
        setSetting: function k(l, m, n) {
            if (l === 'sidebar_mode') {
                c('ChatSidebarVisibility').shouldShowSidebarIgnoreEnabled(null, function(o, p) {
                    if (m) {
                        c('ChatSidebarActions').enable(o ? c('SidebarType').SIDEBAR : c('SidebarType').BUDDYLIST);
                    } else c('ChatSidebarActions').disable();
                });
                return;
            }
            if (this.getSetting(l) == m) return;
            if (n) {
                n = 'from_' + n;
                h.log(n, {
                    name: l,
                    new_value: m,
                    old_value: this.getSetting(l)
                });
            }
            i[l] = !!m;
            c('Arbiter').inform('chat/option-changed', {
                name: l,
                value: m
            });
        }
    });
    c('Arbiter').subscribe(c('ChannelConstants').getArbiterType('setting'), function(k, l) {
        var m = l.obj;
        if (m.window_id === c('PresenceUtil').getSessionID()) return;
        j.setSetting(m.setting, !!m.value, 'channel');
    });
    c('Arbiter').subscribe(c('JSLogger').DUMP_EVENT, function(k, l) {
        l.chat_options = i;
    });
    f.exports = j;
}), null);
__d('ChatQuietLinks', ['DataStore', 'DOM', 'Event', 'Parent', 'UserAgent_DEPRECATED', 'getOrCreateDOMID'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {},
        i = {
            silenceLinks: function m(n) {
                j(n, this.removeEmptyHrefs.bind(this));
            },
            nukeLinks: function m(n) {
                j(n, this.removeAllHrefs.bind(this));
            },
            removeEmptyHrefs: function m(n) {
                k(n, function(o) {
                    return !o || o === '#';
                });
            },
            removeAllHrefs: function m(n) {
                k(n);
            }
        };

    function j(m, n) {
        var o = !!c('UserAgent_DEPRECATED').chrome(),
            p = !!c('UserAgent_DEPRECATED').chrome() || c('UserAgent_DEPRECATED').ie() >= 9 || c('UserAgent_DEPRECATED').firefox() >= 4;
        if (h[c('getOrCreateDOMID')(m)]) return;
        h[c('getOrCreateDOMID')(m)] = true;
        if (!p) return;
        if (!o) {
            n && n(m);
            return;
        }
        c('Event').listen(m, 'mouseover', function q(r) {
            var s = c('Parent').byTag(r.getTarget(), 'a');
            if (s) {
                var t = s.getAttribute('href');
                if (l(t)) {
                    c('DataStore').set(s, 'stashedHref', s.getAttribute('href'));
                    s.removeAttribute('href');
                }
            }
        });
        c('Event').listen(m, 'mouseout', function q(r) {
            var s = c('Parent').byTag(r.getTarget(), 'a'),
                t = s && c('DataStore').remove(s, 'stashedHref');
            if (l(t)) s.setAttribute('href', t);
        });
        c('Event').listen(m, 'mousedown', function(q) {
            if (!q.isDefaultRequested()) return true;
            var r = c('Parent').byTag(q.getTarget(), 'a'),
                s = r && c('DataStore').get(r, 'stashedHref');
            if (l(s)) r.setAttribute('href', s);
        });
    }

    function k(m, n) {
        var o = c('DOM').scry(m, 'a');
        if (n) o = o.filter(function(p) {
            return n(p.getAttribute('href'));
        });
        o.forEach(function(p) {
            p.removeAttribute('href');
            if (!p.tabIndex) p.setAttribute('tabindex', 0);
        });
    }

    function l(m) {
        return m && m !== '#';
    }
    f.exports = i;
}), null);
__d('ChatUnreadCountActionTypes', ['keyMirror'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    f.exports = c('keyMirror')({
        COUNT_UPDATED: null
    });
}), null);
__d('RequestsJewelStore', ['Arbiter', 'ArbiterMixin', 'ChannelConstants'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = babelHelpers['extends']({}, c('ArbiterMixin'), {
        _initialized: false,
        _count: 0,
        _requestList: {},
        addFriendRequests: function i(j) {
            Object.assign(this._requestList, j);
        },
        getRequestListKeys: function i() {
            return Object.keys(this._requestList);
        },
        removeRequest: function i(j) {
            delete this._requestList[j];
        },
        getRequestCount: function i(j) {
            return this.getRequestListKeys().length;
        },
        decrementCount: function i() {
            this.setCount(Math.max(0, this._count - 1));
        },
        setCount: function i(j) {
            c('Arbiter').inform('jewel/count-updated', {
                jewel: 'requests',
                count: j
            }, c('Arbiter').BEHAVIOR_STATE);
        },
        setupListeners: function i() {
            if (this._initialized) return;
            this._initialized = true;
            c('Arbiter').subscribe('jewel/count-updated', function(j, k) {
                k.jewel === 'requests' && this._updateCount(k.count);
            }.bind(this));
            c('Arbiter').subscribe(c('ChannelConstants').getArbiterType('jewel_requests_add'), function(j, k) {
                return this._addRequest(k);
            }.bind(this));
            c('Arbiter').subscribe(c('ChannelConstants').getArbiterType('jewel_friending_notifs'), function(j, k) {
                return this._addNotification(k);
            }.bind(this));
            c('Arbiter').subscribe(c('ChannelConstants').getArbiterType('jewel_requests_remove_old'), function(j, k) {
                return this._removeOldRequest(k);
            }.bind(this));
            c('Arbiter').subscribe(c('ChannelConstants').getArbiterType('friend_requests_seen'), function(j, k) {
                return this.setCount(0);
            }.bind(this));
        },
        _updateCount: function i(j) {
            var k = this._count !== j;
            this._count = j;
            if (k) this.inform('countUpdated', j);
        },
        _addRequest: function i(j) {
            if (!j) return;
            var k = j.obj,
                l = k.from,
                m = k.suggester,
                n = this._requestList[l];
            if (!n) this.setCount(this._count + 1);
            var o = n ? n.type : null,
                p = o === 19 && !m;
            this.inform('addRequest', {
                shouldReplace: p,
                previousType: o
            });
        },
        _addNotification: function i(j) {
            if (!j || j.obj.notif_type !== 'friend_confirmed') return;
            this.inform('addNotification');
        },
        _removeOldRequest: function i(j) {
            if (!j) return;
            var k = this._requestList[j.obj.from];
            if (!k) return;
            this.inform('removeOldRequest', k);
        }
    });
    f.exports = h;
}), null);
__d('ChatPerfTypedLogger', ['Banzai', 'GeneratedLoggerUtils', 'nullthrows'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();

    function h() {
        this.clear();
    }
    h.prototype.log = function() {
        c('GeneratedLoggerUtils').log('logger:ChatPerfLoggerConfig', this.$ChatPerfTypedLogger1, c('Banzai').BASIC);
    };
    h.prototype.logVital = function() {
        c('GeneratedLoggerUtils').log('logger:ChatPerfLoggerConfig', this.$ChatPerfTypedLogger1, c('Banzai').VITAL);
    };
    h.prototype.clear = function() {
        this.$ChatPerfTypedLogger1 = {};
        return this;
    };
    h.prototype.updateData = function(j) {
        this.$ChatPerfTypedLogger1 = babelHelpers['extends']({}, this.$ChatPerfTypedLogger1, j);
        return this;
    };
    h.prototype.setDuration = function(j) {
        this.$ChatPerfTypedLogger1.duration = j;
        return this;
    };
    h.prototype.setEndpoint = function(j) {
        this.$ChatPerfTypedLogger1.endpoint = j;
        return this;
    };
    h.prototype.setEvent = function(j) {
        this.$ChatPerfTypedLogger1.event = j;
        return this;
    };
    h.prototype.setTabsOpen = function(j) {
        this.$ChatPerfTypedLogger1.tabs_open = j;
        return this;
    };
    var i = {
        duration: true,
        endpoint: true,
        event: true,
        tabs_open: true
    };
    f.exports = h;
}), null);
__d('Dcode', [], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h, i = {},
        j = {
            _: '%',
            A: '%2',
            B: '000',
            C: '%7d',
            D: '%7b%22',
            E: '%2c%22',
            F: '%22%3a',
            G: '%2c%22ut%22%3a1',
            H: '%2c%22bls%22%3a',
            I: '%2c%22n%22%3a%22%',
            J: '%22%3a%7b%22i%22%3a0%7d',
            K: '%2c%22pt%22%3a0%2c%22vis%22%3a',
            L: '%2c%22ch%22%3a%7b%22h%22%3a%22',
            M: '%7b%22v%22%3a2%2c%22time%22%3a1',
            N: '.channel%22%2c%22sub%22%3a%5b',
            O: '%2c%22sb%22%3a1%2c%22t%22%3a%5b',
            P: '%2c%22ud%22%3a100%2c%22lc%22%3a0',
            Q: '%5d%2c%22f%22%3anull%2c%22uct%22%3a',
            R: '.channel%22%2c%22sub%22%3a%5b1%5d',
            S: '%22%2c%22m%22%3a0%7d%2c%7b%22i%22%3a',
            T: '%2c%22blc%22%3a1%2c%22snd%22%3a1%2c%22ct%22%3a',
            U: '%2c%22blc%22%3a0%2c%22snd%22%3a1%2c%22ct%22%3a',
            V: '%2c%22blc%22%3a0%2c%22snd%22%3a0%2c%22ct%22%3a',
            W: '%2c%22s%22%3a0%2c%22blo%22%3a0%7d%2c%22bl%22%3a%7b%22ac%22%3a',
            X: '%2c%22ri%22%3a0%7d%2c%22state%22%3a%7b%22p%22%3a0%2c%22ut%22%3a1',
            Y: '%2c%22pt%22%3a0%2c%22vis%22%3a1%2c%22bls%22%3a0%2c%22blc%22%3a0%2c%22snd%22%3a1%2c%22ct%22%3a',
            Z: '%2c%22sb%22%3a1%2c%22t%22%3a%5b%5d%2c%22f%22%3anull%2c%22uct%22%3a0%2c%22s%22%3a0%2c%22blo%22%3a0%7d%2c%22bl%22%3a%7b%22ac%22%3a'
        };
    (function() {
        var l = [];
        for (var m in j) {
            i[j[m]] = m;
            l.push(j[m]);
        }
        l.reverse();
        h = new RegExp(l.join("|"), 'g');
    })();
    var k = {
        encode: function l(m) {
            return encodeURIComponent(m).replace(/([_A-Z])|%../g, function(n, o) {
                return o ? '%' + o.charCodeAt(0).toString(16) : n;
            }).toLowerCase().replace(h, function(n) {
                return i[n];
            });
        },
        decode: function l(m) {
            return decodeURIComponent(m.replace(/[_A-Z]/g, function(n) {
                return j[n];
            }));
        }
    };
    f.exports = k;
}), null);
__d('PresenceCookieManager', ['Cookie', 'CurrentUser', 'Dcode', 'ErrorUtils', 'JSLogger', 'PresenceInitialData', 'PresenceUtil', 'URI'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = c('PresenceInitialData').cookieVersion,
        i = 'presence',
        j = {},
        k = null,
        l = null,
        m = c('JSLogger').create('presence_cookie');

    function n() {
        try {
            var r = c('Cookie').get(i);
            if (k !== r) {
                k = r;
                l = null;
                if (r && r.charAt(0) == 'E') r = c('Dcode').decode(r.substring(1));
                if (r) l = JSON.parse(r);
            }
            if (l) {
                if (l.user && l.user !== c('CurrentUser').getID()) return null;
                if (l.v !== h) return null;
                return l;
            }
        } catch (q) {
            m.warn('getcookie_error', q);
        }
        return null;
    }

    function o() {
        return parseInt(Date.now() / 1000, 10);
    }
    var p = {
        register: function q(r, s) {
            j[r] = s;
        },
        store: function q() {
            var r = n();
            if (r && r.v && h < r.v) {
                m.debug('stale_cookie', h);
                return;
            }
            var s = {
                v: h,
                time: o(),
                user: c('CurrentUser').getID()
            };
            for (var t in j) s[t] = c('ErrorUtils').applyWithGuard(j[t], j, [r && r[t]], function(x) {
                x.presence_subcookie = t;
            });
            var u = 'E' + c('Dcode').encode(JSON.stringify(s));
            if (c('PresenceUtil').hasUserCookie()) {
                var v = u.length;
                if (v > 1024) m.warn('big_cookie', v);
                var w = c('URI').getRequestURI(false).isSecure() && !!c('Cookie').get('csm');
                c('Cookie').set(i, u, null, null, w);
            }
        },
        clear: function q() {
            c('Cookie').clear(i);
        },
        getSubCookie: function q(r) {
            var s = n();
            if (!s) return null;
            return s[r];
        }
    };
    f.exports = p;
}), null);
__d('PresenceState', ['Arbiter', 'ErrorUtils', 'JSLogger', 'PresenceCookieManager', 'debounceAcrossTransitions', 'setIntervalAcrossTransitions', 'PresenceInitialData'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = c('PresenceInitialData').cookiePollInterval || 2000,
        i = c('PresenceInitialData').shouldSuppress || false,
        j = [],
        k = [],
        l = null,
        m = null,
        n = 0,
        o = null,
        p = 0,
        q = ['sb2', 't2', 'lm2', 'uct2', 'tr', 'tw', 'at', 'wml'],
        r = c('JSLogger').create('presence_state');

    function s() {
        return c('PresenceCookieManager').getSubCookie('state');
    }

    function t() {
        n = Date.now();
        c('PresenceCookieManager').store();
        x(m);
    }
    var u = c('debounceAcrossTransitions')(t, 0);

    function v(ca) {
        if (typeof ca == 'undefined' || isNaN(ca) || ca == Number.POSITIVE_INFINITY || ca == Number.NEGATIVE_INFINITY) ca = 0;
        return ca;
    }

    function w(ca) {
        var da = {};
        if (ca) {
            q.forEach(function(ga) {
                da[ga] = ca[ga];
            });
            if (n < ca.ut) r.error('new_cookie', {
                cookie_time: ca.ut,
                local_time: n
            });
        }
        da.ut = n;
        for (var ea = 0, fa = j.length; ea < fa; ea++) c('ErrorUtils').applyWithGuard(j[ea], null, [da]);
        m = da;
        return m;
    }

    function x(ca) {
        p++;
        n = v(ca.ut);
        if (!l) l = c('setIntervalAcrossTransitions')(aa, h);
        m = ca;
        if (o === null) o = ca;
        for (var da = 0, ea = k.length; da < ea; da++) c('ErrorUtils').applyWithGuard(k[da], null, [ca]);
        p--;
    }

    function y(ca) {
        if (ca && ca.ut)
            if (n < ca.ut) {
                return true;
            } else if (ca.ut < n) r.error('old_cookie', {
            cookie_time: ca.ut,
            local_time: n
        });
        return false;
    }

    function z() {
        var ca = s();
        if (y(ca)) m = ca;
        return m;
    }

    function aa() {
        var ca = s();
        if (y(ca)) x(ca);
    }
    c('PresenceCookieManager').register('state', w);
    c('Arbiter').subscribe(c('JSLogger').DUMP_EVENT, function(ca, da) {
        da.presence_state = {
            initial: babelHelpers['extends']({}, o),
            state: babelHelpers['extends']({}, m),
            update_time: n,
            sync_paused: p,
            poll_time: h
        };
    });
    (function() {
        var ca = z();
        if (ca) {
            x(ca);
        } else {
            r.debug('no_cookie_initial');
            x(w());
            return;
        }
    })();
    var ba = {
        doSync: function ca(da) {
            if (p) return;
            if (da) {
                t();
            } else u();
        },
        registerStateStorer: function ca(da) {
            j.push(da);
        },
        registerStateLoader: function ca(da) {
            k.push(da);
        },
        get: function ca() {
            return z();
        },
        getInitial: function ca() {
            return o;
        },
        shouldSuppress: function ca() {
            return i;
        },
        verifyNumber: v
    };
    f.exports = ba;
}), null);
__d('ChatPerfInstrumentation', ['Promise', 'BaseEventEmitter', 'ChatPerfEvent', 'ChatPerfTypedLogger', 'PresenceState', 'emptyFunction', 'performanceAbsoluteNow'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    var h = void 0,
        i = c('PresenceState').getInitial() && c('PresenceState').getInitial().t2 ? c('PresenceState').getInitial().t2.length : null,
        j = {
            _startTime: (Number),
            _sidebarStartTime: (Number),
            init: function k() {
                this._startTime = c('performanceAbsoluteNow')();
                return new(c('Promise'))(function(l) {
                    return l();
                });
            },
            initDivebar: function k() {
                this._sidebarStartTime = c('performanceAbsoluteNow')();
            },
            _log: function k(event, l) {
                var m = c('performanceAbsoluteNow')() - (l || this._startTime);
                if (h) h.emit(event, m);
                var n = new(c('ChatPerfTypedLogger'))();
                n.setEvent(event).setDuration(m);
                if (i !== null) n.setTabsOpen(i);
                n.log();
            },
            addPerfTimingsListener: function k(event, l) {
                if (!h) h = new(c('BaseEventEmitter'))();
                return h.once(event, l);
            },
            logInitStores: function k() {
                this.logInitStores = c('emptyFunction');
                this._log(c('ChatPerfEvent').CHAT_INIT_STORES);
            },
            logInitData: function k() {
                this.logInitData = c('emptyFunction');
                this._log(c('ChatPerfEvent').CHAT_INIT_DATA);
            },
            logInitUI: function k() {
                this.logInitUI = c('emptyFunction');
                this._log(c('ChatPerfEvent').CHAT_INIT_UI);
            },
            logInitSound: function k() {
                this.logInitSound = c('emptyFunction');
                this._log(c('ChatPerfEvent').CHAT_INIT_SOUND);
            },
            logDisplayDone: function k() {
                this.logDisplayDone = c('emptyFunction');
                this._log(c('ChatPerfEvent').CHAT_DISPLAY_DONE);
            },
            logTTI: function k() {
                this.logTTI = c('emptyFunction');
                this._log(c('ChatPerfEvent').TTI);
            },
            logCHAT_CONVERSATION_TTI: function k() {
                this.logCHAT_CONVERSATION_TTI = c('emptyFunction');
                this._log(c('ChatPerfEvent').CHAT_CONVERSATION_TTI);
            },
            logSIDEBAR_FROM_CLIENT_TTI: function k() {
                this.logSIDEBAR_FROM_CLIENT_TTI = c('emptyFunction');
                this._log(c('ChatPerfEvent').SIDEBAR_FROM_CLIENT_TTI, this._sidebarStartTime);
            },
            logSIDEBAR_DISPLAY_DONE: function k() {
                this.logSIDEBAR_DISPLAY_DONE = c('emptyFunction');
                this._log(c('ChatPerfEvent').SIDEBAR_DISPLAY_DONE, this._sidebarStartTime);
            }
        };
    f.exports = j;
}), null);
__d('FantaDispatcher', ['ExplicitRegistrationDispatcher'], (function a(b, c, d, e, f, g) {
    'use strict';
    var h, i;
    if (c.__markCompiled) c.__markCompiled();
    h = babelHelpers.inherits(j, c('ExplicitRegistrationDispatcher'));
    i = h && h.prototype;

    function j() {
        h.apply(this, arguments);
    }
    f.exports = new j({
        strict: false
    });
}), null);
__d('FantaTabActions', ['FantaDispatcher', 'URI', 'WebMessengerPermalinkConstants', 'goURI', 'ifRequired', 'keyMirror'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    var h = c('keyMirror')({
        CLOSE_ALL_TABS: null,
        CLOSE_AND_TAB_NEXT: null,
        CLOSE_TAB: null,
        FOCUS_NEXT_TAB: null,
        FOCUS_PREVIOUS_TAB: null,
        FOCUS_TAB: null,
        LOAD_FROM_DATA: null,
        MERCURY_REGISTER_TAB_FOCUS_DEPRECATED: null,
        MINIMIZE_ALL_TABS: null,
        MINIMIZE_TAB: null,
        OPEN_TAB: null,
        REPLACE_TAB: null,
        SET_ALLOWED_RAISED_TABS: null,
        SET_MESSAGE_COUNT: null,
        UNMINIMIZE_TAB: null
    });

    function i(k) {
        var l = k ? new(c('URI'))(c('WebMessengerPermalinkConstants').getURIPathForThreadID(k)) : new(c('URI'))(c('WebMessengerPermalinkConstants').BASE_PATH + c('WebMessengerPermalinkConstants').COMPOSE_POSTFIX_PATH);
        c('ifRequired')('BusinessURI.brands', function(m) {
            return c('goURI')(m(l));
        }, function() {
            return c('goURI')(l);
        });
    }
    var j = {
        Types: h,
        openTab: function k(l) {
            c('FantaDispatcher').dispatch({
                type: h.OPEN_TAB,
                tabID: l
            });
            c('ifRequired')('FantaTabsApp', function(m) {}, function() {
                return i(l);
            });
        },
        registerTabFocusDeprecated: function k(l, m, n, o) {
            c('FantaDispatcher').dispatch({
                type: h.MERCURY_REGISTER_TAB_FOCUS_DEPRECATED,
                tabID: l,
                focusCallback: m,
                blurCallback: n,
                dontFocusOnMountDEPRECATED: o
            });
        },
        replaceTab: function k(l, m) {
            c('FantaDispatcher').dispatch({
                type: h.REPLACE_TAB,
                tabID: l,
                newTabID: m
            });
        },
        minimizeTab: function k(l) {
            c('FantaDispatcher').dispatch({
                type: h.MINIMIZE_TAB,
                tabID: l
            });
        },
        minimizeAllTabs: function k() {
            c('FantaDispatcher').dispatch({
                type: h.MINIMIZE_ALL_TABS
            });
        },
        unminimizeTab: function k(l) {
            c('FantaDispatcher').dispatch({
                type: h.UNMINIMIZE_TAB,
                tabID: l
            });
        },
        closeTab: function k(l) {
            c('FantaDispatcher').dispatch({
                type: h.CLOSE_TAB,
                tabID: l
            });
        },
        closeAllTabs: function k() {
            c('FantaDispatcher').dispatch({
                type: h.CLOSE_ALL_TABS
            });
        },
        closeAndTabNext: function k(l) {
            c('FantaDispatcher').dispatch({
                type: h.CLOSE_AND_TAB_NEXT,
                tabID: l
            });
        },
        focusTab: function k(l) {
            c('FantaDispatcher').dispatch({
                type: h.FOCUS_TAB,
                tabID: l
            });
        },
        setAllowedRaisedTabs: function k(l) {
            c('FantaDispatcher').dispatch({
                type: h.SET_ALLOWED_RAISED_TABS,
                allowedRaisedTabs: l
            });
        },
        setMessageCount: function k(l, m) {
            c('FantaDispatcher').dispatch({
                type: h.SET_MESSAGE_COUNT,
                threadID: l,
                messageCount: m
            });
        },
        loadFromData: function k(l) {
            c('FantaDispatcher').dispatch({
                type: h.LOAD_FROM_DATA,
                tabData: l
            });
        },
        focusNextTab: function k() {
            c('FantaDispatcher').dispatch({
                type: h.FOCUS_NEXT_TAB
            });
        },
        focusPreviousTab: function k() {
            c('FantaDispatcher').dispatch({
                type: h.FOCUS_PREVIOUS_TAB
            });
        }
    };
    f.exports = j;
}), null);
__d('ChatSidebar', ['csx', 'Arbiter', 'AsyncRequest', 'Bootloader', 'ChatDispatcher', 'ChatImpressionLogger', 'ChatPerfInstrumentation', 'ChatSidebarActions', 'ChatSidebarHideReason', 'ChatSidebarStore', 'ChatSidebarVisibility', 'CSS', 'DOM', 'DOMDimensions', 'Event', 'LogHistory', 'JSLogger', 'KeyEventController', 'LitestandClassicPlaceHolders', 'Parent', 'PresencePrivacy', 'PresenceUtil', 'ScrollableArea', 'SidebarType', 'Style', 'TimeSlice', 'ViewportBounds', 'debounce', 'emptyFunction', 'ge'], (function a(b, c, d, e, f, g, h) {
    if (c.__markCompiled) c.__markCompiled();
    var i, j, k, l, m, n, o = false,
        p, q = true,
        r = null,
        s = c('LogHistory').getInstance('chat_sidebar');

    function t() {
        return c('ChatSidebarStore').getVisibleType() === c('SidebarType').SIDEBAR;
    }

    function u(ea, fa) {
        if (!t()) return;
        if (fa) {
            m.hide();
        } else {
            m.show();
            x();
        }
    }

    function v() {
        return !t() || !l ? 0 : 206;
    }

    function w() {
        c('CSS').removeClass(document.documentElement, 'sidebarMode');
        if (c('ChatSidebarStore').isInitialized()) {
            m.hide();
            c('CSS').hide(l);
            c('CSS').hide(k);
        }
        c('Arbiter').inform('sidebar/visibility', false, c('Arbiter').BEHAVIOR_STATE);
        c('Arbiter').inform('reflow');
        c('ViewportBounds').inform('change');
    }

    function x(ea) {
        if (!ea || ea.width !== r.width) c('ChatSidebarVisibility').shouldShowSidebar(r, function(fa, ga) {
            c('ChatSidebarActions').show(fa ? c('SidebarType').SIDEBAR : c('SidebarType').BUDDYLIST);
        });
        if (!ea || ea.height !== r.height) aa();
    }

    function y(ea) {
        var fa = r || c('ChatSidebarVisibility').getViewport(),
            ga = fa.height;
        ea.forEach(function(ha) {
            if (ha && ha !== i && !c('CSS').hasClass(ha, 'hidden_elem')) ga -= c('DOMDimensions').getElementDimensions(ha).height;
        });
        if (p) ga -= p.getOffset();
        if (n) ga -= c('DOMDimensions').getElementDimensions(n).height;
        return Math.max(0, ga);
    }

    function z() {
        c('CSS').show(k);
        c('CSS').show(l);
        c('CSS').addClass(document.documentElement, 'sidebarMode');
        m.show();
        s.log('sidebar_show', '{}');
        c('Arbiter').inform('sidebar/visibility', true, c('Arbiter').BEHAVIOR_STATE);
        c('LitestandClassicPlaceHolders').destroy('sidebar');
        c('ViewportBounds').inform('change');
        if (!o) {
            aa();
            o = true;
        }
    }

    function aa() {
        if (!t()) return;
        var ea = da.getBodyHeight(),
            fa = m.getItemHeight(),
            ga = 8;
        c('Style').set(i, 'height', ea + 'px');
        var ha = Math.floor((ea - ga) / fa);
        m.setNumTopFriends(ha, q);
        q = false;
        var ia = Math.floor(ea - ga);
        c('Arbiter').inform('sidebar/resized', ia, c('Arbiter').BEHAVIOR_STATE);
        c('Arbiter').inform('reflow');
    }

    function ba() {
        new(c('AsyncRequest'))('/ajax/chat/settings.php').setHandler(c('emptyFunction')).setErrorHandler(c('emptyFunction')).setData({
            sidebar_mode: c('ChatSidebarStore').isEnabled(),
            window_id: c('PresenceUtil').getSessionID()
        }).setAllowCrossPageTransition(true).send();
    }

    function ca() {
        c('ChatSidebarVisibility').shouldShowSidebar(null, function(ea, fa) {
            var ga = true;
            fa.forEach(function(ia) {
                if (ia === null) return;
                switch (ia) {
                    case c('ChatSidebarHideReason').NOT_ENABLED:
                        s.log('state_not_enabled', '{}');
                        ga = false;
                        break;
                    case c('ChatSidebarHideReason').LOW_FRIEND_COUNT:
                        s.log('state_not_shown_num_friends', '{}');
                        ga = false;
                        break;
                    case c('ChatSidebarHideReason').VIEWPORT_INCAPABLE:
                        ga = false;
                }
            });
            var ha = ga ? 'state_shown' : 'state_not_shown';
            s.log(ha, '{}');
            c('ChatPerfInstrumentation').logSIDEBAR_FROM_CLIENT_TTI();
        });
    }
    var da = {
        init: function ea(fa, ga) {
            da.init = c('emptyFunction');
            c('ChatPerfInstrumentation').initDivebar();
            c('ChatDispatcher').explicitlyRegisterStore(c('ChatSidebarStore'));
            c('ChatSidebarActions').loaded();
            l = fa;
            m = ga;
            i = c('DOM').find(fa, 'div.fbChatSidebarBody');
            k = c('DOM').find(fa, "._51x_");
            n = c('DOM').find(fa, "._5qqe");
            c('Event').listen(window, 'resize', function() {
                var ha = babelHelpers['extends']({}, r) || {};
                this._cacheViewport();
                x(ha);
            }.bind(this));
            c('KeyEventController').registerKey('q', function(event) {
                if (c('ChatSidebarStore').getVisibleType() !== c('SidebarType').SIDEBAR) return;
                if (!j) {
                    var ha = c('DOM').scry(fa, "._3rhb input");
                    if (ha.length > 0) j = ha[0];
                }
                if (j) {
                    j.focus();
                    event.prevent();
                }
            });
            m.setScrollContainer(c('Parent').byClass(m.getRoot(), 'uiScrollableAreaWrap'));
            m.subscribe(['render', 'show', 'hide'], c('debounce')(function(ha) {
                var ia = c('ScrollableArea').getInstance(m.getRoot());
                ia && ia.adjustGripper();
            }));
            c('Arbiter').subscribe('chat/option-changed', function(ha, ia) {
                if (ia.name === 'hide_groups') aa();
            });
            c('Arbiter').subscribe(['AppsDivebar/show-apps', 'AppsDivebar/hide-apps', 'Ticker/resized'], aa);
            c('Arbiter').subscribe('sidebar/typeahead/active', u);
            c('PresencePrivacy').subscribe('privacy-user-presence-changed', x);
            c('ChatSidebarStore').addListener(function() {
                var ha = c('ChatSidebarStore').getState(),
                    ia = c('ChatSidebarStore').getPrevState();
                if (ha.visible !== ia.visible) switch (ha.visible) {
                    case c('SidebarType').SIDEBAR:
                        z();
                        break;
                    case c('SidebarType').BUDDYLIST:
                        w();
                        break;
                }
                if (ha.enabled !== ia.enabled) ba();
            });
            this._cacheViewport();
            x();
            c('ChatImpressionLogger').init(m);
            c('ViewportBounds').addPersistentRight(v);
            c('Arbiter').inform('sidebar/initialized', da, c('Arbiter').BEHAVIOR_STATE);
            c('ChatSidebarActions').init();
            ca();
            c('ChatPerfInstrumentation').logSIDEBAR_DISPLAY_DONE();
        },
        ensureLoaded: function ea() {
            if (!c('ChatSidebarStore').isEnabled()) return;
            if (c('ChatSidebarStore').isLoaded()) return;
            if (c('ge')('pagelet_sidebar')) return;
            c('Bootloader').loadModules(["UIPagelet"], function(fa) {
                var ga = c('DOM').create('div', {
                    id: 'pagelet_sidebar'
                });
                c('DOM').appendContent(document.body, ga);
                fa.loadFromEndpoint('SidebarPagelet', 'pagelet_sidebar');
            }, 'ChatSidebar');
            c('ChatSidebarActions').loaded();
        },
        hide: function ea() {
            if (!c('ChatSidebarStore').isEnabled()) return;
            c('ChatSidebarActions').disable();
        },
        unhide: function ea() {
            if (c('ChatSidebarStore').isEnabled()) return;
            c('ChatSidebarVisibility').shouldShowSidebarIgnoreEnabled(null, function(fa, ga) {
                c('ChatSidebarActions').enable(fa ? c('SidebarType').SIDEBAR : c('SidebarType').BUDDYLIST);
            });
        },
        _cacheViewport: function ea() {
            r = c('ChatSidebarVisibility').getViewport();
        },
        getBodyHeight: function ea() {
            return y(Array.from(k.childNodes));
        }
    };
    c('Arbiter').subscribe(c('JSLogger').DUMP_EVENT, function(ea, fa) {
        fa.sidebar_visible = t();
    });
    da.init = c('TimeSlice').guard(da.init, 'ChatSidebar init');
    f.exports = da;
}), null);
__d('MercuryParticipantListRenderer', ['fbt', 'MercuryIDs'], (function a(b, c, d, e, f, g, h) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();

    function i() {
        this.$MercuryParticipantListRenderer1 = false;
        this.$MercuryParticipantListRenderer2 = false;
        this.$MercuryParticipantListRenderer3 = false;
        this.$MercuryParticipantListRenderer4 = 0;
        this.$MercuryParticipantListRenderer5 = null;
        this.$MercuryParticipantListRenderer6 = function(s) {
            if (this.$MercuryParticipantListRenderer5) {
                var t = c('MercuryIDs').getUserIDFromParticipantID(s.id);
                if (this.$MercuryParticipantListRenderer5[t]) return this.$MercuryParticipantListRenderer5[t];
            }
            return this.$MercuryParticipantListRenderer2 ? s.short_name : s.name;
        }.bind(this);
    }
    i.prototype.renderParticipantList = function(s) {
        var t = s.map(this.$MercuryParticipantListRenderer6);
        switch (t.length) {
            case 0:
                return j(this.$MercuryParticipantListRenderer1);
            case 1:
                return k(t);
            case 2:
                return this.$MercuryParticipantListRenderer3 ? m(t) : l(t);
            case 3:
                return this.$MercuryParticipantListRenderer3 ? o(t) : n(t);
            default:
                return this.$MercuryParticipantListRenderer3 ? q(t, this.$MercuryParticipantListRenderer4) : p(t, this.$MercuryParticipantListRenderer4);
        }
    };
    i.prototype.setIsNewThread = function(s) {
        this.$MercuryParticipantListRenderer1 = s;
        return this;
    };
    i.prototype.setNameRenderer = function(s) {
        this.$MercuryParticipantListRenderer6 = s;
        return this;
    };
    i.prototype.setUseShortName = function(s) {
        this.$MercuryParticipantListRenderer2 = s;
        return this;
    };
    i.prototype.setNickname = function(s) {
        this.$MercuryParticipantListRenderer5 = s;
        return this;
    };
    i.prototype.setUseAndSeparator = function(s) {
        this.$MercuryParticipantListRenderer3 = s;
        return this;
    };
    i.prototype.setTotalParticipantCount = function(s) {
        this.$MercuryParticipantListRenderer4 = s;
        return this;
    };

    function j(s) {
        if (s) {
            return h._("New Message");
        } else return h._("No Participants");
    }

    function k(s) {
        return s[0];
    }

    function l(s) {
        return h._("{participant1}, {participant2}", [h.param('participant1', s[0]), h.param('participant2', s[1])]);
    }

    function m(s) {
        return h._("{participant1} and {participant2}", [h.param('participant1', s[0]), h.param('participant2', s[1])]);
    }

    function n(s) {
        return h._("{participant1}, {participant2}, {participant3}", [h.param('participant1', s[0]), h.param('participant2', s[1]), h.param('participant3', s[2])]);
    }

    function o(s) {
        return h._("{participant1}, {participant2} and {participant3}", [h.param('participant1', s[0]), h.param('participant2', s[1]), h.param('participant3', s[2])]);
    }

    function p(s, t) {
        return h._("{participant1}, {participant2}, {participant3}, {others_link}", [h.param('participant1', s[0]), h.param('participant2', s[1]), h.param('participant3', s[2]), h.param('others_link', r((t || s.length) - 3))]);
    }

    function q(s, t) {
        return h._("{participant1}, {participant2} and {others_link}", [h.param('participant1', s[0]), h.param('participant2', s[1]), h.param('others_link', r((t || s.length) - 2))]);
    }

    function r(s) {
        if (s > 1) {
            return h._({
                "*": "{others_count} others"
            }, [h.param('others_count', s, [0])]);
        } else return h._("1 other");
    }
    f.exports = i;
}), null);
__d('DocumentTitle', ['Arbiter'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = document.title,
        i = null,
        j = 1500,
        k = [],
        l = 0,
        m = null,
        n = false;

    function o() {
        if (k.length > 0) {
            if (!n) {
                p(k[l].title);
                l = ++l % k.length;
            } else q();
        } else {
            clearInterval(m);
            m = null;
            q();
        }
    }

    function p(s) {
        document.title = s;
        n = true;
    }

    function q() {
        r.set(i || h, true);
        n = false;
    }
    var r = {
        get: function s() {
            return h;
        },
        set: function s(t, u) {
            document.title = t;
            if (!u) {
                h = t;
                i = null;
                c('Arbiter').inform('update_title', t);
            } else i = t;
        },
        blink: function s(t) {
            var u = {
                title: t
            };
            k.push(u);
            if (m === null) m = setInterval(o, j);
            return {
                stop: function v() {
                    var w = k.indexOf(u);
                    if (w >= 0) {
                        k.splice(w, 1);
                        if (l > w) {
                            l--;
                        } else if (l == w && l == k.length) l = 0;
                    }
                }
            };
        }
    };
    f.exports = r;
}), null);
__d('XHPTemplate', ['DataStore', 'DOM', 'HTML', 'XHPTemplateProcessor'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = c('XHPTemplateProcessor').processor;

    function i(k) {
        'use strict';
        if (h instanceof Function) k = h(k);
        this._model = k;
    }
    i.prototype.render = function() {
        'use strict';
        if (c('HTML').isHTML(this._model)) this._model = c('DOM').setContent(document.createDocumentFragment(), this._model)[0];
        return this._model.cloneNode(true);
    };
    i.prototype.build = function() {
        'use strict';
        return new j(this.render());
    };
    i.getNode = function(k, l) {
        'use strict';
        return i.getNodes(k)[l];
    };
    i.getNodes = function(k) {
        'use strict';
        var l = c('DataStore').get(k, 'XHPTemplate:nodes');
        if (!l) {
            l = {};
            var m = c('DOM').scry(k, '[data-jsid]');
            m.push(k);
            var n = m.length;
            while (n--) {
                var o = m[n];
                l[o.getAttribute('data-jsid')] = o;
                o.removeAttribute('data-jsid');
            }
            c('DataStore').set(k, 'XHPTemplate:nodes', l);
        }
        return l;
    };

    function j(k) {
        'use strict';
        this._root = k;
        this._populateNodes();
    }
    j.prototype._populateNodes = function() {
        'use strict';
        this._nodes = {};
        this._leaves = {};
        var k = this._root.getElementsByTagName('*');
        for (var l = 0, m = k.length; l < m; l++) {
            var n = k[l],
                o = n.getAttribute('data-jsid');
            if (o) {
                n.removeAttribute('data-jsid');
                this._nodes[o] = n;
                this._leaves[o] = !n.childNodes.length;
            }
        }
    };
    j.prototype.getRoot = function() {
        'use strict';
        return this._root;
    };
    j.prototype.getNode = function(k) {
        'use strict';
        return this._nodes[k];
    };
    j.prototype.setNodeProperty = function(k, l, m) {
        'use strict';
        this.getNode(k)[l] = m;
        return this;
    };
    j.prototype.setNodeContent = function(k, l) {
        'use strict';
        if (!this._leaves[k]) throw new Error("Can't setContent on non-leaf node: " + k);
        c('DOM').setContent(this.getNode(k), l);
        return this;
    };
    f.exports = i;
}), null);
__d('BaseTextWithDecoration.react', ['React', 'ReactFragment'], (function a(b, c, d, e, f, g) {
    'use strict';
    var h, i;
    if (c.__markCompiled) c.__markCompiled();

    function j(l, m, n, o) {
        var p = l[m];
        if (!p) {
            o.push(n);
            return;
        }
        p(n, function(q) {
            o.push(q);
        }, function(q) {
            j(l, m + 1, q, o);
        });
    }
    h = babelHelpers.inherits(k, c('React').Component);
    i = h && h.prototype;
    k.prototype.render = function() {
        var l = this.props,
            m = l.decorators,
            n = l.text,
            o = [],
            p = {};
        j(m, 0, n, o);
        o.forEach(function(q, r) {
            p['i' + r] = q;
        });
        return c('React').createElement('span', null, c('ReactFragment').create(p));
    };

    function k() {
        h.apply(this, arguments);
    }
    f.exports = k;
}), null);
__d('EmoticonEmojiList', [], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    f.exports = {
        names: {
            ':)': 'slightsmile',
            ':-)': 'slightsmile',
            ':]': 'slightsmile',
            '=)': 'smile',
            '(:': 'slightsmile',
            '(=': 'smile',
            ':(': 'frown',
            ':-(': 'frown',
            ':[': 'frown',
            '=(': 'frown',
            ')=': 'frown',
            ';-P': 'winktongue',
            ';P': 'winktongue',
            ';-p': 'winktongue',
            ';p': 'winktongue',
            ':poop:': 'poop',
            ':P': 'tongue',
            ':-P': 'tongue',
            ':-p': 'tongue',
            ':p': 'tongue',
            '=P': 'tongue',
            '=p': 'tongue',
            '=D': 'grin',
            ':-D': 'slightgrin',
            ':D': 'slightgrin',
            ':o': 'gasp',
            ':-O': 'gasp',
            ':O': 'gasp',
            ':-o': 'gasp',
            ';)': 'wink',
            ';-)': 'wink',
            '8-)': 'glasses',
            '8)': 'glasses',
            'B-)': 'glasses',
            'B)': 'glasses',
            '>:(': 'grumpy',
            '>:-(': 'grumpy',
            ':/': 'unsure',
            ':-/': 'unsure',
            ':\\': 'unsure',
            ':-\\': 'unsure',
            '=/': 'unsure',
            '=\\': 'unsure',
            ':\'(': 'cry',
            ':\'-(': 'cry',
            '3:)': 'devil',
            '3:-)': 'devil',
            'O:)': 'angel',
            'O:-)': 'angel',
            '0:)': 'angel',
            '0:-)': 'angel',
            ':*': 'kiss',
            ':-*': 'kiss',
            ';-*': 'winkkiss',
            ';*': 'winkkiss',
            '<3': 'heart',
            '&lt;3': 'heart',
            '\u2665': 'heart',
            '^_^': 'kiki',
            '^~^': 'kiki',
            '-_-': 'expressionless',
            ':-|': 'squint',
            ':|': 'squint',
            '>:o': 'upset',
            '>:O': 'upset',
            '>:-O': 'upset',
            '>:-o': 'upset',
            '>_<': 'persevere',
            '>.<': 'persevere',
            '<(")': 'penguin',
            O_O: 'flushface',
            o_o: 'flushface',
            '0_0': 'flushface',
            T_T: 'crying',
            'T-T': 'crying',
            ToT: 'crying',
            '-3-': 'flushkiss',
            '\'-_-': 'sweating',
            '(y)': 'like',
            ':like:': 'like',
            '(Y)': 'like',
            '(n)': 'dislike',
            '(N)': 'dislike'
        },
        emote2emojis: {
            slightsmile: '1f642',
            smile: '1f60a',
            frown: '1f61e',
            winktongue: '1f61c',
            poop: '1f4a9',
            tongue: '1f61b',
            slightgrin: '1f600',
            grin: '1f603',
            gasp: '1f62e',
            wink: '1f609',
            glasses: '1f60e',
            grumpy: '1f620',
            unsure: '1f615',
            cry: '1f622',
            devil: '1f608',
            angel: '1f607',
            kiss: '1f617',
            winkkiss: '1f618',
            heart: '2764',
            kiki: '1f60a',
            expressionless: '1f611',
            squint: '1f610',
            upset: '1f620',
            persevere: '1f623',
            penguin: '1f427',
            flushface: '1f633',
            crying: '1f62d',
            flushkiss: '1f61a',
            sweating: '1f613',
            like: 'f0000',
            dislike: '1f44e'
        },
        symbols: {
            slightsmile: ':)',
            smile: '=)',
            frown: ':(',
            winktongue: ';-P',
            poop: ':poop:',
            tongue: ':P',
            slightgrin: ':D',
            grin: '=D',
            gasp: ':o',
            wink: ';)',
            glasses: '8-)',
            grumpy: '>:(',
            unsure: ':/',
            cry: ':\'(',
            devil: '3:)',
            angel: 'O:)',
            kiss: ':*',
            winkkiss: ';*',
            heart: '<3',
            kiki: '^_^',
            expressionless: '-_-',
            squint: ':-|',
            upset: '>:o',
            persevere: '>_<',
            penguin: '<(")',
            flushface: 'O_O',
            crying: 'T_T',
            flushkiss: '-3-',
            sweating: '\'-_-',
            like: '(y)',
            dislike: '(n)'
        },
        regexp: /(^|[\s\'\".])(:\)(?!\))|:\-\)(?!\))|:\]|=\)(?!\))|\(:|\(=|:\(|:\-\(|:\[|=\(|\)=|;P|;\-P|;\-p|;p|:poop:|:P|:\-P|:\-p|:p|=P|=p|=D|:\-D|:D|:o|:\-O|:O|:\-o|;\)(?!\))|;\-\)(?!\))|8\-\)(?!\))|B\-\)(?!\))|B\)(?!\))|8\)(?!\))|>:\(|>:\-\(|:\/|:\-\/|:\\|:\-\\|=\/|=\\|:\'\(|:\'\-\(|3:\)(?!\))|3:\-\)(?!\))|O:\)(?!\))|O:\-\)(?!\))|0:\)(?!\))|0:\-\)(?!\))|:\*|:\-\*|;\*|;\-\*|<3|&lt;3|\u2665|\^_\^|\^~\^|\-_\-|:\-\||:\||>:o|>:O|>:\-O|>:\-o|>_<|>\.<|<\(\"\)(?!\))|O_O|o_o|0_0|T_T|T\-T|ToT|\-3\-|\'\-_\-|\(y\)(?!\))|:like:|\(Y\)(?!\))|\(n\)(?!\))|\(N\)(?!\)))([\s\'\".,!?]|<br>|$)/,
        noncapturingRegexp: /(?:^|[\s\'\".])(:\)(?!\))|:\-\)(?!\))|:\]|=\)(?!\))|\(:|\(=|:\(|:\-\(|:\[|=\(|\)=|;P|;\-P|;\-p|;p|:poop:|:P|:\-P|:\-p|:p|=P|=p|=D|:\-D|:D|:o|:\-O|:O|:\-o|;\)(?!\))|;\-\)(?!\))|8\-\)(?!\))|B\-\)(?!\))|B\)(?!\))|8\)(?!\))|>:\(|>:\-\(|:\/|:\-\/|:\\|:\-\\|=\/|=\\|:\'\(|:\'\-\(|3:\)(?!\))|3:\-\)(?!\))|O:\)(?!\))|O:\-\)(?!\))|0:\)(?!\))|0:\-\)(?!\))|:\*|:\-\*|;\*|;\-\*|<3|&lt;3|\u2665|\^_\^|\^~\^|\-_\-|:\-\||:\||>:o|>:O|>:\-O|>:\-o|>_<|>\.<|<\(\"\)(?!\))|O_O|o_o|0_0|T_T|T\-T|ToT|\-3\-|\'\-_\-|\(y\)(?!\))|:like:|\(Y\)(?!\))|\(n\)(?!\))|\(N\)(?!\)))(?:[\s\'\".,!?]|<br>|$)/
    };
}), null);
__d('messengerIterateEmoji', ['MessengerSupportedEmoji'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();

    function h(i, j, k, l) {
        var m, n, o, p = String(i);
        while (p) {
            var q = c('MessengerSupportedEmoji').findEmoji(p);
            if (q) {
                m = p.substr(0, q.index);
                n = q[0];
                o = p.substr(q.index + n.length);
                k(m);
                j(n, q.emoji, l);
                p = o;
            } else break;
        }
        k(p);
    }
    f.exports = h;
}), null);
__d('messengerIterateEmoticons', ['EmoticonEmojiList'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();

    function h(i, j, k, l) {
        var m, n, o, p, q, r = String(i);
        while (r) {
            var s = c('EmoticonEmojiList').regexp.exec(r);
            if (s) {
                m = s.index + s[1].length;
                n = r.substr(0, m);
                o = s[2];
                p = r.substr(m + o.length);
                q = c('EmoticonEmojiList').names[o];
                k(n);
                j(o, q, l);
                r = p;
            } else break;
        }
        k(r);
    }
    f.exports = h;
}), null);
__d('MessengerTextWithEmoticons.react', ['cx', 'fbt', 'BaseTextWithDecoration.react', 'EmojiImageURL', 'EmoticonEmojiList', 'Image.react', 'React', 'messengerIterateEmoticons', 'messengerIterateEmoji'], (function a(b, c, d, e, f, g, h, i) {
    'use strict';
    var j, k;
    if (c.__markCompiled) c.__markCompiled();
    var l = c('React').PropTypes;

    function m(q, r, s) {
        var t = s ? 128 : 16,
            u = c('EmojiImageURL').getMessengerURL(r, t),
            v = s ? "_1ift _5m3a" : "_1ift _2560";
        return (c('React').createElement(c('Image.react'), {
            alt: q,
            className: v,
            src: u
        }));
    }

    function n(q, r, s) {
        var t = s ? 128 : 16,
            u = c('EmoticonEmojiList').emote2emojis[r],
            v = u ? c('EmojiImageURL').getMessengerURL(u, t) : null;
        if (v) {
            var w = String.fromCodePoint(parseInt(u, t)),
                x = s ? "_1ift _5m3a" : "_1ift _2560";
            return (c('React').createElement(c('Image.react'), {
                alt: w,
                className: x,
                src: v
            }));
        }
        var y = i._("{emoticonName} emoticon", [i.param('emoticonName', r)]);
        return (c('React').createElement('span', {
            'aria-label': y
        }, q));
    }

    function o(q, r, s) {
        return function(t, u, v) {
            var w = function x(y, z, aa) {
                u(r(y, z, aa));
            };
            q(String(t), w, v, s);
        };
    }
    j = babelHelpers.inherits(p, c('React').Component);
    k = j && j.prototype;
    p.prototype.shouldComponentUpdate = function(q) {
        return q.text !== this.props.text;
    };
    p.prototype.render = function() {
        var q = [o(c('messengerIterateEmoji'), m, this.props.customSize), o(c('messengerIterateEmoticons'), n, this.props.customSize)];
        return (c('React').createElement(c('BaseTextWithDecoration.react'), babelHelpers['extends']({}, this.props, {
            text: this.props.text,
            decorators: q
        })));
    };

    function p() {
        j.apply(this, arguments);
    }
    p.propTypes = {
        text: l.string,
        customSize: l.bool
    };
    f.exports = p;
}), null);
__d('getNormalizedClientRect', ['getDocumentScrollElement'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();

    function h(i) {
        var j = i.getBoundingClientRect(),
            k = 0,
            l = 0,
            m = c('getDocumentScrollElement')(i.ownerDocument),
            n = m.getBoundingClientRect();
        if (n.left > 0) {
            k = -n.left;
        } else {
            var o = m.scrollWidth + n.left,
                p = n.width;
            if (p > o) k = p - o;
        }
        if (n.top > 0) l = -n.top;
        return {
            bottom: j.bottom + l,
            height: j.height,
            left: j.left + k,
            right: j.right + k,
            top: j.top + l,
            width: j.width
        };
    }
    f.exports = h;
}), null);