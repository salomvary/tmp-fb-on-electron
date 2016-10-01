if (self.CavalryLogger) {
    CavalryLogger.start_js(["sioBG"]);
}

__d("PrivacyConst", [], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = {
        BaseValue: {
            FRIEND_LIST: 129,
            FRIENDS_PLUS_GAMER_FRIENDS: 128,
            FRIENDS_MINUS_ACQUAINTANCES: 127,
            FACEBOOK_EMPLOYEES: 112,
            CUSTOM: 111,
            EVERYONE: 80,
            NETWORKS_FRIENDS_OF_FRIENDS: 60,
            NETWORKS_FRIENDS: 55,
            FRIENDS_OF_FRIENDS: 50,
            ALL_FRIENDS: 40,
            SELF: 10,
            NOBODY: 0
        },
        CustomPrivacyTokens: {
            FRIENDS: 247124075410460,
            FRIENDS_OF_FRIENDS: 498125493540100
        },
        FriendsValue: {
            EVERYONE: 80,
            NETWORKS_FRIENDS: 55,
            FRIENDS_OF_FRIENDS: 50,
            ALL_FRIENDS: 40,
            SOME_FRIENDS: 30,
            SELF: 10,
            NO_FRIENDS: 0
        },
        PostParam: {
            EVERYONE: 300645083384735,
            NETWORKS_FRIENDS: 123780391104836,
            FRIENDS_OF_FRIENDS: 275425949243301,
            FRIENDS: 291667064279714,
            FRIENDS_MINUS_ACQUAINTANCES: 284920934947802,
            ONLY_ME: 286958161406148,
            FB_ONLY: 411331705596297,
            EVENT_PUBLIC: 1493271774218406,
            EVENT_OPEN_INVITE: 854618297899786,
            EVENT_GUESTS_AND_FRIENDS: 1439959856260766,
            EVENT_INVITE_ONLY: 599950423437029
        },
        PrivacyField: {
            CURRENT_COMPOSER: 8787670733,
            DEFAULT_COMPOSER: 875106179167765,
            TIMELINE_TAGGED_CONTENT_VISIBILITY: 8787530733,
            WALL_POSTS: 8787370733,
            TAG_EXPANDED_CONTENT: 8787795733,
            SEARCH_BY_PHONE: 8787815733,
            SEARCH_BY_EMAIL: 8787820733,
            CAN_FRIEND: 8787540733,
            DEPRECATED_APP_DEFAULT: 8787700733,
            SEARCH_BY_NAME: 8787755733,
            SEARCH_BY_CONTACT_INFO: 8787760733,
            SCREENNAME: 8787335733,
            CURRENT_ADDRESS: 8787355733,
            FRIENDS: 8787365733,
            WEBSITE: 8787375733,
            STATUS_UPDATES: 8787395733,
            BIRTHDAY: 8787510733,
            BIRTHYEAR: 8787805733,
            CAN_COMMENT: 8787535733,
            CAN_MESSAGE: 8787545733,
            RELATIONSHIPS: 8787550733,
            PROFILE_PICTURE_ALBUM: 8787565733,
            DASHBOARD_ACTIVITY: 8787575733,
            FAMILY: 8787585733,
            INTERESTED_IN_LOOKING_FOR: 8787590733,
            PLACES: 8787620733,
            NAME_DAY: 8787810733,
            LANGUAGES: 8787625733,
            QUOTATIONS: 8787630733,
            ABOUT_ME: 8787635733,
            POLITICAL: 8787640733,
            RELIGIOUS: 8787645733,
            CURRENT_CITY: 8787650733,
            HOMETOWN: 8787655733,
            PROFILE_LIKES_AND_INTERESTS: 8787660733,
            BLURB: 8787665733,
            OTHER_LIKES_AND_INTERESTS: 8787680733,
            SUBSCRIBERS: 8787690733,
            SUBSCRIBED_TO: 8787695733,
            PERSONAL_CONTACT_DEFAULT: 8787765733,
            PAGE_CONTACT_DEFAULT: 8787770733,
            AUTO_GENERATED_FB_EMAIL: 8787775733,
            SKILLS: 8787780733,
            CUSTOM_GENDERS: 237760973066217,
            LOCATION_DO_NOT_WRITE_DIRECTLY: 8787785733,
            SOCIAL_ADS: 7719929599,
            PLATFORM_ADS: 126540474531,
            BASS_ADS: 183468681673909,
            ACTIVITIES: 144331422306930,
            INTERESTS: 113693108715766,
            MUSIC: 172372399483077,
            BOOKS: 100725463352700,
            GAMES: 199298603444535,
            MOVIES: 201146206594049,
            TV_SHOWS: 129665560441221,
            SPORTS_PLAYED: 129991670408857,
            FAVORITE_TEAMS: 225288534151802,
            FAVORITE_ATHLETES: 203380763033334,
            PEOPLE_I_ADMIRE: 210380795648667,
            FAVORITE_FOODS: 585935528106425,
            FAVORITE_RESTAURANTS: 172588449584647,
            FAVORITE_WEBSITES: 180412195459106,
            CLOTHING_BRANDS: 397391233714082,
            LAST_POST_PRIVACY: 314763985364212,
            SECOND_TO_LAST_POST_PRIVACY: 321179124722698,
            PREVIOUS_SECONDARY_COMPOSER: 864562253561430,
            RECENT_COMPOSER: 358304524327898,
            COMPOSER_CUSTOM_INCLUSION: 1067668039947624,
            COMPOSER_CUSTOM_EXCLUSION: 1082068668536535,
            NOW_COMPOSER: 421290164697736,
            BACKSTAGE_PRIVACY: 809506612451171
        },
        TagExpansion: {
            NONE: 0,
            TAGGEES: 1,
            FRIENDS_OF_TAGGEES: 2
        },
        ExpansionType: {
            NONE: 0,
            TAGS_ONLY: 1
        }
    };
}), null);
__d("XPubcontentInlinePhotoPivotsEventsController", ["XController"], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = c("XController").create("\/pubcontent\/inline_photo_pivots_chaining\/events\/", {});
}), null);
__d('EntstreamAttachmentRelatedShare', ['csx', 'cx', 'Arbiter', 'AsyncRequest', 'AttachmentRelatedShareConstants', 'CSS', 'DOM', 'Event', 'XPubcontentInlinePhotoPivotsEventsController', 'ge', 'getOrCreateDOMID', 'tidyEvent'], (function a(b, c, d, e, f, g, h, i) {
    if (c.__markCompiled) c.__markCompiled();
    var j = 2,
        k = 3,
        l = {
            loadRelatedAttachment: function m(n, o, p) {
                var q = null;
                if (typeof n === "string") {
                    q = c('ge')(n);
                } else q = n;
                if (!q) return;
                var r = c('Event').listen(q, 'click', function() {
                        r.remove();
                        c('Arbiter').inform(c('AttachmentRelatedShareConstants').ARTICLE_CLICK, {
                            attachment: q,
                            global_share_id: o,
                            is_right_click: false,
                            share_id: p
                        });
                    }),
                    s = c('Event').listen(q, 'mousedown', function(event) {
                        if (event.which === k || event.button === j) {
                            s.remove();
                            c('Arbiter').inform(c('AttachmentRelatedShareConstants').ARTICLE_CLICK, {
                                attachment: q,
                                global_share_id: o,
                                is_right_click: true
                            });
                        }
                    });
            },
            loadInlineStoryPivotAttachment: function m(n, o) {
                var p = c('ge')(n);
                if (!p) return;
                var q = c('Event').listen(p, 'click', function() {
                    q.remove();
                    c('Arbiter').inform(c('AttachmentRelatedShareConstants').PHOTO_CLICK, {
                        attachment: p,
                        storyid: o
                    });
                });
            },
            loadRelatedGameAttachment: function m(n, o) {
                var p = null;
                if (typeof n === "string") {
                    p = c('ge')(n);
                } else p = n;
                if (!p) return;
                c('tidyEvent')(c('Event').listen(p, 'click', function() {
                    c('Arbiter').inform(c('AttachmentRelatedShareConstants').GAME_CLICK, {
                        attachment: p,
                        global_share_id: o
                    });
                }));
                c('tidyEvent')(c('Event').listen(p, 'mousedown', function(event) {
                    if (event.which === k || event.button === j) c('Arbiter').inform(c('AttachmentRelatedShareConstants').GAME_CLICK, {
                        attachment: p,
                        global_share_id: o
                    });
                }));
            },
            loadRelatedLSCVideoAttachment: function m(n, o) {
                var p = null;
                if (typeof n === 'string') {
                    p = c('ge')(n);
                } else p = n;
                if (!p) return;
                var q = "^div._4-u2",
                    r = c('DOM').scry(p, q),
                    s = c('Event').listen(p, 'click', function() {
                        s.remove();
                        c('Arbiter').inform(c('AttachmentRelatedShareConstants').VIDEO_CLICK, {
                            attachment: p,
                            global_share_id: o
                        });
                    });
            },
            loadRelatedLSCInlineVideoAttachment: function m(n, o) {
                var p = null;
                if (typeof n === 'string') {
                    p = c('ge')(n);
                } else p = n;
                if (!p) return;
                c('Event').listen(p, 'click', function() {
                    var q = "^div._4-u2",
                        r = "_1d8v",
                        s = c('DOM').scry(p, q),
                        t = s.length === 1 ? s[0] : null,
                        u = t.parentNode,
                        v = u.previousSibling;
                    while (!v) {
                        u = u.parentNode;
                        v = u.previousSibling;
                    }
                    if (!c('CSS').hasClass(v, r)) {
                        var w = c('DOM').create('div', {
                                className: r
                            }),
                            x = c('DOM').insertBefore(t.parentNode, w),
                            y = x.length >= 1 ? x[0] : null;
                    } else y = v;
                    var z = c('getOrCreateDOMID')(y);
                    new(c('AsyncRequest'))().setURI('/ajax/flash/expand_inline.php').setData({
                        share_id: o,
                        target_div: z,
                        max_width: 470,
                        max_height: 264,
                        replace_target_div: true
                    }).setMethod('GET').setReadOnly(true).setRelativeTo(p.parentNode).send();
                });
            },
            loadRelatedEventsPivotAttachment: function m(n, o) {
                var p = null;
                if (typeof n === "string") {
                    p = c('ge')(n);
                } else p = n;
                if (!p) return;
                c('tidyEvent')(c('Event').listen(p, 'click', function() {
                    c('Arbiter').inform(c('AttachmentRelatedShareConstants').EVENT_JOIN, {
                        attachment: p,
                        event_id: o
                    });
                }));
            },
            loadRelatedProductAttachment: function m(n, o) {
                var p = null;
                if (typeof n === 'string') {
                    p = c('ge')(n);
                } else p = n;
                if (!p) return;
                c('tidyEvent')(c('Event').listen(p, 'click', function() {
                    c('Arbiter').inform(c('AttachmentRelatedShareConstants').PRODUCT_CLICK, {
                        attachment: p,
                        product_id: o
                    });
                }));
            },
            closeButton: function m(n, o) {
                c('Event').listen(n, 'click', function() {
                    c('DOM').remove(o);
                });
            },
            closeButtonPhotoPivots: function m(n, o, p, q) {
                c('Event').listen(n, 'click', function() {
                    var r = c('XPubcontentInlinePhotoPivotsEventsController').getURIBuilder(),
                        s = {
                            story_id: p,
                            search_query_type: q,
                            event: 'hide'
                        };
                    new(c('AsyncRequest'))().setMethod('POST').setURI(r.getURI()).setData(s).send();
                    c('DOM').remove(o);
                });
            },
            seeAllLinkPhotoPivots: function m(n, o, p) {
                c('Event').listen(n, 'click', function() {
                    var q = c('XPubcontentInlinePhotoPivotsEventsController').getURIBuilder(),
                        r = {
                            story_id: o,
                            search_query_type: p,
                            event: 'see_all'
                        };
                    new(c('AsyncRequest'))().setMethod('POST').setURI(q.getURI()).setData(r).send();
                });
            },
            removeOldSuggestions: function m(n) {
                var o = c('ge')(n);
                if (!o) return;
                var p = c('DOM').scry(o.parentNode, "._5d73");
                for (var q = 1; q < p.length; q++) c('DOM').remove(p[q]);
                setTimeout(function() {
                    c('CSS').show(p[0]);
                }, 1000);
            },
            showHiddenSuggestions: function m(n) {
                var o = c('Event').listen(n, 'click', function() {
                    o.remove();
                    var p = "^._1ui8",
                        q = c('DOM').scry(n, p);
                    if (!q) return;
                    c('CSS').hide(q[0]);
                    var r = q[0].previousSibling;
                    while (r) {
                        c('CSS').show(r);
                        r = r.previousSibling;
                    }
                });
            }
        };
    f.exports = l;
}), null);
__d('FeedTrackingAsync', ['Arbiter', 'Run', 'collectDataAttributes'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h;
    f.exports.init = function() {
        if (h) return;
        h = c('Arbiter').subscribe('AsyncRequest/send', function(i, j) {
            var k = j.request,
                l = k.getRelativeTo();
            if (l) {
                var m = k.getData(),
                    n = c('collectDataAttributes')(l, ['ft']);
                if (n.ft && Object.keys(n.ft).length) Object.assign(m, n);
            }
        });
        c('Run').onLeave(function() {
            h.unsubscribe();
            h = null;
        });
    };
}), null);
__d('PrivacySelectorNewDispatcher', ['Dispatcher_DEPRECATED'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = 'selector',
        i = Object.assign(new(c('Dispatcher_DEPRECATED'))(), {
            handleUpdateFromSelector: function j(k) {
                this.dispatch(babelHelpers['extends']({
                    payloadSource: h
                }, k));
            }
        });
    f.exports = i;
}), null);
__d('FbFeedAccessible', ['csx', 'cx', 'fbt', 'invariant', 'AccessibilityConfig', 'Arbiter', 'ARIA', 'BootloadedComponent.react', 'CSS', 'DataAttributeUtils', 'DOMQuery', 'JSResource', 'LitestandMessages', 'React', 'ReactDOM', 'SubscriptionsHandler', 'ge', 'getOrCreateDOMID'], (function a(b, c, d, e, f, g, h, i, j, k) {
    if (c.__markCompiled) c.__markCompiled();
    var l = 'Accessibility/StoriesRequested',
        m = 'Accessibility/StoriesLoaded',
        n = 'Accessibility/StoryContentInserted',
        o = 'Accessibility/SubstreamInserted',
        p = void 0,
        q = void 0,
        r = {
            init: function s(t) {
                p = t;
                if (c('AccessibilityConfig').a11yNewsfeedStoryEnumeration) {
                    var u = new(c('SubscriptionsHandler'))();
                    u.addSubscriptions(c('Arbiter').subscribe(c('LitestandMessages').STORIES_REQUESTED, this._onStoriesRequested.bind(this)), c('Arbiter').subscribe(c('LitestandMessages').STORIES_INSERTED, this._onInsertedSubstream.bind(this)), c('Arbiter').subscribe(c('LitestandMessages').NEWER_STORIES_INSERTED, this._onInsertedSubstream.bind(this)), c('Arbiter').subscribe(m, this._processStoriesLoaded.bind(this)), c('Arbiter').subscribe(l, this._processStoriesRequested.bind(this)), c('Arbiter').subscribe(n, this._processStoryContentInserted.bind(this)), c('Arbiter').subscribe(o, this._processInsertedSubstream.bind(this)));
                    this._enumerateStories();
                }
            },
            informStoryContentInserted: function s(t) {
                c('Arbiter').inform(n, t);
                this.setAriaLabelledBy(t);
            },
            setAriaLabelledBy: function s(t) {
                var u = c('ge')(t),
                    v;
                if (u && this._isStory(u)) {
                    if (u.getAttribute('aria-labelledby')) return;
                    v = this._filterForElement(u, ["._4gns", "._5pbw", ".timestampContent", "._5pbx"]);
                    if (v.length > 0) u.setAttribute('aria-labelledby', v.map(function(w) {
                        return c('getOrCreateDOMID')(w);
                    }).join(' '));
                }
            },
            _getStories: function s(t) {
                return c('DOMQuery').scry(t || p, "._5jmm");
            },
            _onInsertedSubstream: function s(t, u) {
                if (u && u.substream_id) c('Arbiter').inform(o, u.substream_id);
            },
            _onStoriesRequested: function s() {
                c('Arbiter').inform(l);
            },
            _setEnumerationText: function s(t, u, v) {
                var w = c('React').createElement(c('BootloadedComponent.react'), {
                    bootloadLoader: c('JSResource')('FbFeedPager.react').__setRef('FbFeedAccessible'),
                    bootloadPlaceholder: c('React').createElement('div', null),
                    position: u,
                    total: v,
                    'aria-hidden': 'true'
                });
                c('ReactDOM').render(w, t);
            },
            _enumerateStories: function s() {
                var t = this._getStories(p);
                q = t.length;
                t.forEach(function(u, v) {
                    this._enumerateStory(u, v += 1);
                }.bind(this));
            },
            _enumerateSubstream: function s(t) {
                var u = this._getStories();
                q = u.length;
                var v = this._getStories(c('ge')(t)),
                    w = v.length || 0;
                for (var x = 0; x < w; x++) this._registerStoryEnumerationPosition(v[x], q - w + (x + 1), x + 1);
            },
            _enumerateStory: function s(t, u) {
                !this._isStory(t) ? k(0) : void 0;
                if (u > 0) {
                    var v = c('DOMQuery').scry(t, "._4gns");
                    if (v && v[0]) this._setEnumerationText(v[0], u, q);
                }
            },
            _processStoriesLoaded: function s() {
                c('ARIA').notify(j._("More stories loaded."));
            },
            _processStoriesRequested: function s() {
                c('ARIA').notify(j._("More stories requested."));
            },
            _processInsertedSubstream: function s(t, u) {
                this._enumerateSubstream(u);
                this._enumerateStories();
            },
            _processStoryContentInserted: function s(t, u) {
                var v = void 0,
                    w = c('ge')(u);
                if (w) v = JSON.parse(c('DataAttributeUtils').getDataFt(w));
                if (v && v.ordinal_position) {
                    var x = v.ordinal_position.split(':'),
                        y = x[0],
                        z = x[1];
                    y = parseInt(y, 10);
                    z = parseInt(z, 10);
                    this._enumerateStory(w, y);
                    if (z === 1) c('Arbiter').inform(m);
                }
            },
            _registerStoryEnumerationPosition: function s(t, u, v) {
                var w = JSON.parse(c('DataAttributeUtils').getDataFt(t));
                if (w) {
                    w.ordinal_position = u + ':' + v;
                    c('DataAttributeUtils').setDataFt(t, JSON.stringify(w));
                }
            },
            _isStory: function s(t) {
                return c('CSS').matchesSelector(t, "._5jmm");
            },
            _filterForElement: function s(t, u) {
                return u.map(function(v) {
                    return c('DOMQuery').scry(t || document, v)[0];
                }).filter(function(v) {
                    return !!v;
                });
            }
        };
    f.exports = r;
}), null);
__d("XPrivacyCustomDialogController", ["XController"], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = c("XController").create("\/privacy\/custom_dialog\/", {
        id: {
            type: "String",
            required: true
        },
        option_id: {
            type: "String",
            required: true
        },
        autosave: {
            type: "Bool",
            defaultValue: false
        },
        explain_tags: {
            type: "Bool",
            defaultValue: false
        },
        limit_community: {
            type: "Bool",
            defaultValue: false
        },
        limit_facebook: {
            type: "Bool",
            defaultValue: false
        },
        limit_fof: {
            type: "Bool",
            defaultValue: false
        },
        limit_tagexpand: {
            type: "Bool",
            defaultValue: false
        },
        is_new_privacy_selector: {
            type: "Bool",
            defaultValue: false
        },
        render_location: {
            type: "Int"
        },
        content_type: {
            type: "String"
        },
        post_param: {
            type: "String"
        },
        privacy_data: {
            type: "String"
        },
        source: {
            type: "String"
        },
        tags: {
            type: "IntVector"
        },
        __asyncDialog: {
            type: "Int"
        }
    });
}), null);