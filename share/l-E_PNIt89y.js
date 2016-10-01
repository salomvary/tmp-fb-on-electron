if (self.CavalryLogger) {
    CavalryLogger.start_js(["KS0HO"]);
}

__d('BlueBarFocusListener', ['CSS', 'Deferred', 'Event'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = 'f_key',
        i = 'f_click',
        j = null,
        k = function r() {
            j = null;
        };

    function l(r) {
        c('CSS').removeClass(r, h);
        c('CSS').removeClass(r, i);
    }

    function m(r) {
        if (j) j.reject();
        j = new(c('Deferred'))();
        j.then(function(s) {
            l(r);
            c('CSS').addClass(r, s);
        }).done(k, k);
    }

    function n() {
        if (j) j.resolve(h);
    }

    function o(r) {
        if (j) j.reject();
        c('CSS').removeClass(r, h);
        c('CSS').addClass(r, i);
    }

    function p(r) {
        return function(event) {
            r(event.getTarget());
        };
    }
    var q = {
        listen: function r(s) {
            if (!s) return;
            c('Event').listen(s, 'focusout', p(l));
            c('Event').listen(s, 'focusin', p(m));
            c('Event').listen(s, 'click', p(o));
            c('Event').listen(s, 'keyup', n);
        }
    };
    f.exports = q;
}), null);
__d('RoyalBluebar', ['Arbiter', 'Event', 'Run', 'SubscriptionsHandler'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        _subscriptionHandler: null,
        _getSubscriptionHandler: function i() {
            if (!this._subscriptionHandler) {
                this._subscriptionHandler = new(c('SubscriptionsHandler'))();
                c('Run').onUnload(function() {
                    this._subscriptionHandler.release();
                    this._subscriptionHandler = null;
                }.bind(this));
            }
            return this._subscriptionHandler;
        },
        informOnClick: function i(j) {
            this._getSubscriptionHandler().addSubscriptions(c('Event').listen(j, 'click', function(event) {
                if (c('Arbiter').inform('BlueBar/homeClick', event) === false) event.preventDefault();
            }));
        }
    };
    f.exports = h;
}), null);
__d('NotificationSeenState', ['NotificationConstants', 'NotificationUpdates', 'createObjectFrom'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {},
        i = 1,
        j = 2,
        k = 0,
        l = i,
        m = i | j,
        n = c('NotificationConstants').PayloadSourceType.INITIAL_LOAD,
        o = {
            UNSEEN_AND_UNREAD: k,
            SEEN_BUT_UNREAD: l,
            SEEN_AND_READ: m
        };

    function p(s) {
        var t = [],
            u = [];
        Object.keys(s).forEach(function(v) {
            var w = s[v],
                x = h[v];
            h[v] = w;
            if (x === undefined) {
                t.push(v);
                u.push(v);
                return;
            }
            var y = x ^ w;
            if (y & i) t.push(v);
            if (y & j) u.push(v);
        });
        t.length && c('NotificationUpdates').didUpdateSeenState(t);
        u.length && c('NotificationUpdates').didUpdateReadState(u);
    }
    c('NotificationUpdates').subscribe('update-notifications', function(s, t) {
        var u = t.nodes;
        if (!u || !u.length) return;
        var v = t.payloadsource,
            w = c('NotificationConstants').PayloadSourceType,
            x = v == w.ENDPOINT,
            y = {};
        t.nodes.forEach(function(z) {
            var aa = z.alert_id;
            if (!x || h[aa] === undefined) y[aa] = o[z.seen_state];
        });
        p(y);
    });
    c('NotificationUpdates').subscribe('update-seen', function(s, t) {
        if (!t.seenState) return;
        var u = [],
            v = {};
        Object.keys(t.seenState).forEach(function(x) {
            if (!t.seenState[x]) {
                u.push(x);
                return;
            }
            var y = h[x];
            if (y !== undefined) v[x] = y | i;
        });
        var w = babelHelpers['extends']({}, c('createObjectFrom')(u, k), v);
        p(w);
    });
    c('NotificationUpdates').subscribe('update-read', function(s, t) {
        if (!t.readState) return;
        var u = [],
            v = {};
        Object.keys(t.readState).forEach(function(x) {
            if (t.readState[x]) {
                u.push(x);
                return;
            }
            var y = h[x];
            if (y !== undefined) {
                v[x] = y & ~j;
            } else if (t.payloadsource == n) v[x] = l;
        });
        var w = babelHelpers['extends']({}, c('createObjectFrom')(u, m), v);
        p(w);
    });

    function q(s) {
        var t = h[s];
        return t;
    }
    var r = {
        isRead: function s(t) {
            return q(t) === m;
        },
        isSeen: function s(t) {
            return q(t) !== k;
        },
        getUnseenCount: function s() {
            return r.getUnseenIDs().length;
        },
        getUnseenIDs: function s() {
            return Object.keys(h).filter(function(t) {
                return h[t] === k;
            });
        },
        getUnreadCount: function s() {
            return r.getUnreadIDs().length;
        },
        getUnreadIDs: function s() {
            return Object.keys(h).filter(function(t) {
                return h[t] !== m;
            });
        }
    };
    f.exports = r;
}), null);
__d('NotificationJewelControllerModuleLoader', ['JSResource', 'NotificationSeenState', 'NotificationStore', 'NotificationUpdates'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    c('NotificationSeenState');
    c('NotificationStore');
    c('NotificationUpdates');
    f.exports = c('JSResource')('NotificationJewelController').__setRef('NotificationJewelControllerModuleLoader');
}), null);
__d('NotificationJewelHeaderController', ['DOM', 'Event', 'NotificationSeenState', 'NotificationUserActions', 'NotificationUpdates'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(i, j) {
        'use strict';
        c('Event').listen(i, 'click', function() {
            var k = c('NotificationSeenState').getUnreadIDs();
            if (k.length) c('NotificationUserActions').markNotificationsAsRead(k);
        });
        c('NotificationUpdates').subscribe('read-state-updated', function() {
            if (j) c('DOM').setContent(j, c('NotificationSeenState').getUnreadCount());
        });
    }
    f.exports = h;
}), null);
__d('NotificationJewelListController', ['Bootloader', 'React', 'ReactDOM'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = null,
        i = null;

    function j(k, l) {
        'use strict';
        this.$NotificationJewelListController1 = k;
        this.$NotificationJewelListController2 = l;
        this.$NotificationJewelListController3 = false;
        this.$NotificationJewelListController4 = false;
    }
    j.prototype.open = function() {
        'use strict';
        this.$NotificationJewelListController3 = true;
        this.$NotificationJewelListController5();
    };
    j.prototype.pause = function() {
        'use strict';
        this.$NotificationJewelListController4 = true;
        this.$NotificationJewelListController5();
    };
    j.prototype.unpause = function() {
        'use strict';
        this.$NotificationJewelListController4 = false;
        this.$NotificationJewelListController5();
    };
    j.prototype.$NotificationJewelListController5 = function() {
        'use strict';
        if (!h || !i) {
            c('Bootloader').loadModules(["NotificationList.react", "NotificationJewelList.react"], function(k, l) {
                h = k;
                i = l;
                this.$NotificationJewelListController6();
            }.bind(this), 'NotificationJewelListController');
        } else this.$NotificationJewelListController6();
    };
    j.prototype.$NotificationJewelListController6 = function() {
        'use strict';
        c('ReactDOM').render(c('React').createElement(h, {
            hasEverBeenOpened: this.$NotificationJewelListController3,
            paused: this.$NotificationJewelListController4,
            tracking: this.$NotificationJewelListController2.tracking,
            negativeTracking: this.$NotificationJewelListController2.negativeTracking,
            shortenTimestamp: this.$NotificationJewelListController2.shortenTimestamp,
            businessID: this.$NotificationJewelListController2.businessID,
            maxHeight: this.$NotificationJewelListController2.maxHeight,
            useChevron: this.$NotificationJewelListController2.useChevron,
            chevronType: this.$NotificationJewelListController2.chevronType,
            numPerPage: 5,
            listRenderer: i,
            upsell: this.$NotificationJewelListController2.upsell || null,
            endpoint: this.$NotificationJewelListController2.endpoint
        }), this.$NotificationJewelListController1);
    };
    f.exports = j;
}), null);
__d("XBrowserPushDisabledController", ["XController"], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = c("XController").create("\/notifications\/client\/push\/disabled\/", {});
}), null);
__d("XBrowserPushXOutController", ["XController"], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = c("XController").create("\/notifications\/client\/push\/xout\/", {});
}), null);
__d("XServiceWorkerSessionChangeController", ["XController"], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = c("XController").create("\/service_workers\/session\/persist\/", {});
}), null);
__d('BrowserPushSessionChange.react', ['cx', 'fbt', 'ix', 'AsyncRequest', 'BanzaiLogger', 'Image.react', 'ImageBlock.react', 'LayerFadeOnHide', 'React', 'ReloadPage', 'XBrowserPushDisabledController', 'XBrowserPushXOutController', 'XServiceWorkerSessionChangeController', 'XUIDialog.react', 'XUIDialogBody.react', 'XUIDialogButton.react', 'XUIDialogFooter.react', 'XUIDialogOkayButton.react', 'XUIDialogTitle.react', 'XUISpinner.react', 'XUIText.react'], (function a(b, c, d, e, f, g, h, i, j) {
    var k, l;
    if (c.__markCompiled) c.__markCompiled();
    var m = c('React').PropTypes;
    k = babelHelpers.inherits(n, c('React').Component);
    l = k && k.prototype;

    function n() {
        var o, p;
        'use strict';
        for (var q = arguments.length, r = Array(q), s = 0; s < q; s++) r[s] = arguments[s];
        return p = (o = l.constructor).call.apply(o, [this].concat(r)), this.state = {
            dialogShown: true,
            spin: false
        }, this.$BrowserPushSessionChange1 = function(t) {
            if (t) return;
            this.setState({
                dialogShown: false
            });
            this.$BrowserPushSessionChange2('session_keep');
            var u = c('XServiceWorkerSessionChangeController').getURIBuilder().getURI();
            new(c('AsyncRequest'))().setURI(u).setMethod('post').setData({
                app_id: this.props.push.appID
            }).setAllowCrossPageTransition(true).setHandler(function(v) {
                this.props.onHide();
            }.bind(this)).send();
        }.bind(this), this.$BrowserPushSessionChange2 = function(event) {
            var t = {
                event: event,
                appid: this.props.push.appID,
                surface: 'session_change'
            };
            c('BanzaiLogger').log('BrowserPushLoggerConfig', t);
        }.bind(this), this.$BrowserPushSessionChange3 = function() {
            this.setState({
                spin: true
            });
            this.$BrowserPushSessionChange2('session_uninstall');
            this.$BrowserPushSessionChange2('xout');
            var t = c('XBrowserPushXOutController').getURIBuilder().getURI(),
                u = function() {
                    this.props.push.unregisterPushAndSW(c('XBrowserPushDisabledController'), c('AsyncRequest')).done(function(v) {
                        c('ReloadPage').now();
                    });
                }.bind(this);
            new(c('AsyncRequest'))().setURI(t).setMethod('post').setHandler(u).setAllowCrossPageTransition(true).send();
        }.bind(this), p;
    }
    n.prototype.componentDidMount = function() {
        'use strict';
        this.$BrowserPushSessionChange2('session_change_prompt');
    };
    n.prototype.render = function() {
        'use strict';
        if (!this.state.dialogShown) return null;
        var o = j('/images/notifications/potsy_jump.png');
        return (c('React').createElement(c('XUIDialog.react'), {
            shown: true,
            behaviors: {
                LayerFadeOnHide: c('LayerFadeOnHide')
            },
            onToggle: this.$BrowserPushSessionChange1,
            width: 445,
            key: 'dialog'
        }, c('React').createElement(c('XUIDialogTitle.react'), null, i._("Desktop Notifications Are On")), c('React').createElement(c('XUIDialogBody.react'), null, this.state.spin ? c('React').createElement(c('XUISpinner.react'), {
            size: 'large'
        }) : c('React').createElement(c('ImageBlock.react'), {
            spacing: 'medium'
        }, c('React').createElement(c('Image.react'), {
            src: o,
            alt: i._("Desktop Notifications Are On")
        }), c('React').createElement('div', null, c('React').createElement('div', {
            className: "_3-8h"
        }, c('React').createElement(c('XUIText.react'), {
            size: 'large'
        }, i._("When you get a new notification, you'll see it in the corner of your screen."))), c('React').createElement('div', {
            className: "_3-8h"
        }, c('React').createElement(c('XUIText.react'), {
            size: 'small'
        }, i._("To be sure you get notifications, you'll now stay logged into Facebook on this computer. If you're using a public computer or don't want to stay logged in, click Undo to turn off desktop notifications.")))))), c('React').createElement(c('XUIDialogFooter.react'), null, c('React').createElement(c('XUIDialogButton.react'), {
            action: 'button',
            label: i._("Undo"),
            onClick: this.$BrowserPushSessionChange3
        }), c('React').createElement(c('XUIDialogOkayButton.react'), {
            use: 'confirm',
            action: 'cancel'
        }))));
    };
    n.propTypes = {
        onHide: m.func.isRequired,
        push: m.object.isRequired
    };
    f.exports = n;
}), null);
__d('NotificationPermissionNotice.react', ['cx', 'fbt', 'Event', 'Keys', 'React', 'XUIAmbientNUX.react'], (function a(b, c, d, e, f, g, h, i) {
    var j, k;
    if (c.__markCompiled) c.__markCompiled();
    var l = [],
        m = c('React').PropTypes;
    j = babelHelpers.inherits(n, c('React').Component);
    k = j && j.prototype;

    function n() {
        var o, p;
        'use strict';
        for (var q = arguments.length, r = Array(q), s = 0; s < q; s++) r[s] = arguments[s];
        return p = (o = k.constructor).call.apply(o, [this].concat(r)), this.renderLayers = function() {
            var t = this.props.shortText ? i._("Click the lock to give {browser_name} permission to send you desktop notifications.", [i.param('browser_name', this.props.browserName)]) : i._("If you change your mind, click the lock to give {browser_name} permission to send you desktop notifications.", [i.param('browser_name', this.props.browserName)]);
            return (c('React').createElement(c('XUIAmbientNUX.react'), {
                contextRef: function() {
                    return this.refs.noticeAnchor;
                }.bind(this),
                shown: true,
                position: 'below',
                onCloseButtonClick: this.props.onHide,
                key: 'nux'
            }, t));
        }.bind(this), p;
    }
    n.prototype.componentDidMount = function() {
        'use strict';
        l.push(c('Event').listen(window, 'mousedown', this.props.onHide));
        l.push(c('Event').listen(window, 'keydown', function(event) {
            if (event.keyCode === c('Keys').ESC) this.props.onHide();
        }.bind(this)));
    };
    n.prototype.componentWillUnmount = function() {
        'use strict';
        while (l.length > 0) {
            var o = l.pop();
            o.remove();
        }
    };
    n.prototype.render = function() {
        'use strict';
        return (c('React').createElement('span', null, c('React').createElement('span', {
            ref: 'noticeAnchor',
            className: "_1_i1"
        }), this.renderLayers()));
    };
    n.propTypes = {
        onHide: m.func.isRequired,
        shortText: m.bool,
        browserName: m.string.isRequired
    };
    f.exports = n;
}), null);
__d('NotificationPermissionRequest.react', ['cx', 'Spotlight.react', 'React'], (function a(b, c, d, e, f, g, h) {
    var i, j;
    if (c.__markCompiled) c.__markCompiled();
    var k = c('React').PropTypes;
    i = babelHelpers.inherits(l, c('React').Component);
    j = i && i.prototype;
    l.prototype.render = function() {
        'use strict';
        return (c('React').createElement(c('Spotlight.react'), {
            shown: true,
            onHide: this.props.onHide,
            key: 'spotlight'
        }, c('React').createElement('div', {
            className: "_n3"
        })));
    };

    function l() {
        'use strict';
        i.apply(this, arguments);
    }
    l.propTypes = {
        onHide: k.func.isRequired
    };
    f.exports = l;
}), null);
__d('ContextualHelpSearchController', ['Event', 'AsyncRequest', 'DOM', 'CSS', 'Focus', 'Input'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = 400;

    function i(j, k, l, m, n, o) {
        this._token = null;
        this._timerID = 0;
        this._lastQuery = null;
        this.loader = j;
        this.search_box = k;
        this.topics_area = l;
        this.results_area = m;
        this.clear_button = n;
        this.typing_listener = c('Event').listen(this.search_box, 'keyup', this.setTimer.bind(this));
        this.clear_listener = c('Event').listen(this.clear_button, 'click', this.clearResults.bind(this));
        if (o == null || o.focusSearchBox == null || o.focusSearchBox) c('Focus').set(this.search_box);
        this.async_request = null;
    }
    Object.assign(i.prototype, {
        source: 'contextual_help',
        clearResults: function j() {
            this.show(this.topics_area);
            this._lastQuery = '';
            c('Input').reset(this.search_box);
            c('Focus').set(this.search_box);
            if (this.async_request !== null) {
                this.async_request.abort();
                this.async_request = null;
            }
            c('CSS').addClass(this.clear_button, 'hidden_elem');
        },
        update: function j() {
            var k = c('Input').getValue(this.search_box);
            if (k === this._lastQuery) return;
            this._lastQuery = k;
            if (k === '') {
                this.clearResults();
                return;
            }
            this.show(this.loader);
            var l = {
                query: k,
                width: this._width || h,
                source: this.source
            };
            this.async_request = new(c('AsyncRequest'))('/help/ajax/search/').setData(l).setHandler(function(m) {
                this._update(m);
            }.bind(this));
            this.async_request.send();
        },
        _update: function j(k) {
            this.async_request = null;
            var l = k.getPayload().results;
            c('DOM').setContent(this.results_area, l);
            this.show(this.results_area);
            if (c('Input').getValue(this.search_box) === '') {
                this.clearResults();
            } else c('CSS').removeClass(this.clear_button, 'hidden_elem');
        },
        setTimer: function j() {
            if (this._timerID !== 0) clearTimeout(this._timerID);
            this._timerID = setTimeout(this.update.bind(this), 300);
            if (this.async_request != null) {
                this.async_request.abort();
                this.async_request = null;
            }
        },
        show: function j(k) {
            var l = [this.loader, this.topics_area, this.results_area];
            for (var m = 0; m < l.length; m++) c('CSS').addClass(l[m], 'hidden_elem');
            c('CSS').removeClass(k, 'hidden_elem');
        }
    });
    f.exports = i;
}), null);
__d('JewelCountSideLoader', ['CSS'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {},
        i = {},
        j = {},
        k = {
            queueInstances: function l(m, n, o) {
                h[m] = {
                    badge: n,
                    root: o
                };
            },
            updateCountAndQueueArgs: function l(m, n, o) {
                var p = i[m];
                if (p) {
                    p.updateCountAndArgs(o, n);
                    return;
                }
                var q = h[m];
                if (!q) throw new Error('Jewel instances where not set');
                j[m] = {
                    count: n,
                    args: o
                };
                c('CSS').conditionClass(q.root, 'hasNew', n);
                q.badge.setLegacyContent(n);
                return;
            },
            getOverwritesForJewel: function l(m) {
                if (j[m.name]) return j[m.name];
                i[m.name] = m;
                return null;
            }
        };
    f.exports = k;
}), null);
__d('NotificationJewelFunnelLoggingConstants', [], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    f.exports = {
        FUNNEL_LOGGING_NAME: 'WWW_NOTIFICATION_FUNNEL',
        FUNNEL_LOGGING_EVENT: {
            FETCH_NOTIFICATIONS: 'fetch_notifications',
            OPEN_JEWEL: 'open_jewel',
            CLOSE_JEWEL: 'close_jewel',
            MOUSE_OVER_ON_JEWEL: 'mouse_over_on_jewel',
            SCROLL_TO_FETCH: 'scroll_to_fetch',
            FETCH_NEXT_SET: 'fetch_next_set',
            CLEAR_BADGE_COUNT: 'clear_badge_count'
        }
    };
}), null);
__d('JewelBase', ['csx', 'Promise', 'Arbiter', 'ArbiterMixin', 'CSS', 'DOM', 'Event', 'HTML', 'JewelCountSideLoader', 'Keys', 'Run', 'TabIsolation', 'Toggler', 'TooltipData', 'FunnelLogger', 'NotificationJewelFunnelLoggingConstants', 'mixin', 'reportData'], (function a(b, c, d, e, f, g, h) {
    var i, j;
    if (c.__markCompiled) c.__markCompiled();
    var k = c('NotificationJewelFunnelLoggingConstants').FUNNEL_LOGGING_NAME,
        l = c('NotificationJewelFunnelLoggingConstants').FUNNEL_LOGGING_EVENT,
        m = {};
    i = babelHelpers.inherits(n, c('mixin')(c('ArbiterMixin')));
    j = i && i.prototype;

    function n(o, p) {
        'use strict';
        j.constructor.call(this);
        this.name = p.name;
        this.label = p.label;
        this.root = o;
        this.badge = p.badge;
        this.countNew = 0;
        this.initialCount = 0;
        this.escHandler = null;
        this.bootload_module = p.bootload_module;
        this.bootload_args = p.bootload_args;
        this.bootloading = null;
        this.togglerInstance = c('Toggler').getInstance(o).setSticky(false);
        c('Run').onAfterLoad(function() {
            return this.$JewelBase1();
        }.bind(this));
        if (p.keepOpenForSnowlift) this.togglerInstance.setPrePageTransitionCallback(this.$JewelBase2.bind(this));
        m[this.name] = this;
        this.$JewelBase3();
        var q = this.getFlyout(),
            r = new(c('TabIsolation'))(q);
        c('Toggler').createInstance(q).setSticky(false);
        this.$JewelBase4();
        c('Toggler').listen('show', this.root, function(s) {
            c('FunnelLogger').appendAction(k, l.OPEN_JEWEL);
            this.$JewelBase5();
            this.hasNew() && this.markSeen();
            this.reset();
            c('Arbiter').inform('layer_shown', {
                type: 'Jewel'
            });
            r.enable();
            this.setupEvents();
            this.$JewelBase6();
            return this.$JewelBase1().then(function() {
                this.inform('opened');
            }.bind(this));
        }.bind(this));
        c('Toggler').listen('hide', this.root, function(s, t) {
            c('FunnelLogger').appendAction(k, l.CLOSE_JEWEL);
            c('FunnelLogger').endFunnel(k);
            this.hasNew() && this.markSeen();
            this.reset();
            this.inform('closed');
            c('Arbiter').inform('layer_hidden', {
                type: 'Jewel'
            });
            r.disable();
            this.removeEvents();
            this.$JewelBase4();
        }.bind(this));
        c('Arbiter').subscribe('jewel/count-updated', function(s, t) {
            t.jewel == this.name && this.update(t);
        }.bind(this));
        c('Arbiter').subscribe('jewel/hide', function(s, t) {
            this.hide();
        }.bind(this));
    }
    n.prototype.getRoot = function() {
        'use strict';
        return this.root;
    };
    n.prototype.hide = function() {
        'use strict';
        if (this.isOpen()) c('Toggler').hide(this.root);
    };
    n.prototype.getFlyout = function() {
        'use strict';
        if (this.$JewelBase7 === undefined) this.$JewelBase7 = c('DOM').find(this.root, ".__tw");
        return this.$JewelBase7;
    };
    n.prototype.hasNew = function() {
        'use strict';
        return c('CSS').hasClass(this.root, 'hasNew');
    };
    n.prototype.isOpen = function() {
        'use strict';
        return c('CSS').hasClass(this.root, 'openToggler');
    };
    n.prototype.reset = function() {
        'use strict';
        c('FunnelLogger').appendAction(k, l.CLEAR_BADGE_COUNT);
        c('CSS').removeClass(this.root, 'hasNew');
    };
    n.prototype.setContent = function(o) {
        'use strict';
        var p = c('DOM').find(this.root, 'ul.jewelItemList');
        c('DOM').setContent(p, c('HTML')(o));
    };
    n.prototype.update = function(o) {
        'use strict';
        this.countNew = o.count;
        if (typeof this.countNew === 'number' && this.countNew < 0) this.countNew = 0;
        this.badge.setLegacyContent(this.countNew);
        var p = isNaN(this.countNew) || this.countNew > 0;
        c('CSS').conditionClass(this.root, 'hasNew', p);
        this.inform('updated', o);
    };
    n.prototype.setupEvents = function() {
        'use strict';
        this.escHandler = c('Event').listen(document.documentElement, 'keydown', function(o) {
            if (o.keyCode === c('Keys').ESC) this.hide();
        }.bind(this));
    };
    n.prototype.removeEvents = function() {
        'use strict';
        if (this.escHandler) {
            this.escHandler.remove();
            this.escHandler = null;
        }
    };
    n.prototype.markSeen = function() {
        'use strict';
        c('Arbiter').inform('jewel/count-updated', {
            jewel: this.name,
            count: 0
        }, c('Arbiter').BEHAVIOR_STATE);
        this.inform('marked-seen');
    };
    n.prototype.$JewelBase8 = function() {
        'use strict';
        if (typeof this.$JewelBase9 === 'undefined') this.$JewelBase9 = c('DOM').find(this.root, "a.jewelButton");
        return this.$JewelBase9;
    };
    n.prototype.$JewelBase4 = function() {
        'use strict';
        var o = this.$JewelBase8();
        c('TooltipData').set(o, this.label);
        o.setAttribute('data-tooltip-delay', '500');
    };
    n.prototype.$JewelBase6 = function() {
        'use strict';
        c('TooltipData').remove(this.$JewelBase8());
    };
    n.prototype.$JewelBase2 = function(o, p) {
        'use strict';
        if (!this.$JewelBase10(p.from) && !this.$JewelBase10(p.to)) this.togglerInstance && this.togglerInstance.hide();
    };
    n.prototype.$JewelBase10 = function(o) {
        'use strict';
        return o && o.getQueryData().hasOwnProperty('theater');
    };
    n.prototype.$JewelBase5 = function() {
        'use strict';
        c('reportData')('jewel_click', {
            gt: {
                count: this.countNew,
                initial: this.initialCount,
                jewel: this.name
            }
        });
    };
    n.prototype.$JewelBase1 = function() {
        'use strict';
        if (!this.bootload_module) return c('Promise').resolve();
        if (!this.bootloading) this.bootloading = new(c('Promise'))(function(o, p) {
            this.bootload_module.load().then(function(q) {
                new q(this, this.bootload_args);
                o();
            }.bind(this))['catch'](p);
        }.bind(this));
        return this.bootloading;
    };
    n.prototype.$JewelBase3 = function() {
        'use strict';
        if (this.bootloading) return;
        var o = c('JewelCountSideLoader').getOverwritesForJewel(this);
        if (!o) return;
        this.updateCountAndArgs(o.args, o.count);
    };
    n.prototype.updateCountAndArgs = function(o, p) {
        'use strict';
        for (var q in o)
            if (o[q]) this.bootload_args[q] = o[q];
        if (p) c('Arbiter').inform('jewel/count-updated', {
            jewel: this.name,
            count: p
        }, c('Arbiter').BEHAVIOR_STATE);
    };
    f.exports = n;
}), null);
__d('ModalMask', ['DOM'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = null,
        i = 0,
        j = {
            show: function k() {
                i++;
                if (!h) {
                    h = c('DOM').create('div', {
                        id: 'modalMaskOverlay'
                    });
                    c('DOM').appendContent(document.body, h);
                }
            },
            hide: function k() {
                if (i) {
                    i--;
                    if (!i && h) {
                        c('DOM').remove(h);
                        h = null;
                    }
                }
            },
            getNode: function k() {
                return h;
            }
        };
    f.exports = j;
}), null);
__d('LitestandChromeHomeCount', ['cx', 'Arbiter', 'AsyncRequest', 'CSS', 'DOM', 'Event', 'LitestandMessages', 'UserAgent'], (function a(b, c, d, e, f, g, h) {
    if (c.__markCompiled) c.__markCompiled();
    var i = 300000,
        j = {},
        k, l;

    function m() {
        l && clearTimeout(l);
        if (k) return;
        l = setTimeout(n, i);
    }

    function n() {
        if (k) return;
        new(c('AsyncRequest'))().setURI('/ajax/litestand/newsfeed_count').setHandler(function(q) {
            if (k) return;
            p.setCount(q.getPayload());
            m();
        }).setAllowCrossPageTransition(true).send();
    }

    function o(q) {
        c('CSS').conditionClass(j.wrapNode, "_461d", q > 0);
        if (q > 0) {
            var r = q > j.max ? j.max + '+' : q;
            c('DOM').setContent(j.countNode, r);
        }
    }
    var p = {
        init: function q(r) {
            j = r;
            c('Event').listen(j.homeNode, 'click', function(event) {
                var s = event.getModifiers(),
                    t = s.shift,
                    u = s.meta,
                    v = s.control;
                if (t || c('UserAgent').isPlatform('Mac OS X') && u || c('UserAgent').isPlatform('Windows') && v) o(0);
            });
            c('Arbiter').subscribe(c('LitestandMessages').NEWSFEED_LOAD, function() {
                k = true;
                this.setCount(0);
            }.bind(this));
            c('Arbiter').subscribe(c('LitestandMessages').LEAVE_HOME, function() {
                k = false;
                m();
            });
            m();
        },
        setCount: function q(r) {
            o(k ? 0 : r);
        }
    };
    f.exports = p;
}), null);
__d('AccessibilityShortcut', ['AccessibilityLogger', 'Event', 'Focus', 'ge', 'onEnclosingPageletDestroy', 'warning'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        init: function i(j, k) {
            var l = c('Event').listen(j, 'click', function(m) {
                m.preventDefault();
                var n = c('ge')(k);
                if (n) {
                    c('Focus').set(n);
                    c('AccessibilityLogger').logSRKey();
                } else c('warning')(n, 'Failed to set focus on element with ID: %s', k);
            });
            c('onEnclosingPageletDestroy')(j, function() {
                return l.remove();
            });
        }
    };
    f.exports = h;
}), null);
__d('QuicklingAugmenter', ['URI'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = [],
        i = {
            addHandler: function j(k) {
                h.push(k);
            },
            augmentURI: function j(k) {
                var l = [],
                    m = new(c('URI'))(k);
                h.forEach(function(n) {
                    var o = n(m);
                    if (!o) return m;
                    l.push(n);
                    m = m.addQueryData(o);
                });
                h = l;
                return m;
            }
        };
    f.exports = i;
}), null);
__d('cancelIdleCallback', ['TimerStorage', 'IdleCallbackImplementation'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    f.exports = function() {
        for (var h = arguments.length, i = Array(h), j = 0; j < h; j++) i[j] = arguments[j];
        c('TimerStorage').unset(c('TimerStorage').IDLE_CALLBACK, i[0]);
        return Function.prototype.apply.call(c('IdleCallbackImplementation').cancelIdleCallback, b, i);
    };
}), null);
__d('replaceNativeTimer', ['clearInterval', 'clearTimeout', 'setInterval', 'setTimeout'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = false;

    function i() {
        if (!h) {
            h = true;
            c('setTimeout').nativeBackup = b.setTimeout;
            c('clearTimeout').nativeBackup = b.clearTimeout;
            c('setInterval').nativeBackup = b.setInterval;
            c('clearInterval').nativeBackup = b.clearInterval;
            b.setTimeout = c('setTimeout');
            b.clearTimeout = c('clearTimeout');
            b.setInterval = c('setInterval');
            b.clearInterval = c('clearInterval');
        }
    }
    f.exports = i;
}), null);
__d('Quickling', ['AjaxPipeRequest', 'Arbiter', 'CSSClassTransition', 'DocumentTitle', 'DOM', 'HTML', 'PageHooks', 'PageEvents', 'PageTransitionsRegistrar', 'QuicklingAugmenter', 'QuicklingConfig', 'Run', 'URI', 'UserAgent_DEPRECATED', 'PHPQuerySerializer', 'TimerStorage', 'cancelAnimationFrame', 'cancelIdleCallback', 'clearImmediate', 'clearInterval', 'clearTimeout', 'goOrReplace', 'isEmpty', 'replaceNativeTimer', 'requireWeak'], (function a(b, c, d, e, f, g) {
    var h, i;
    if (c.__markCompiled) c.__markCompiled();
    var j;
    c('requireWeak')('PageTransitions', function(w) {
        j = w;
    });
    var k = c('QuicklingConfig').version,
        l = c('QuicklingConfig').sessionLength,
        m = new RegExp(c('QuicklingConfig').inactivePageRegex),
        n = 0,
        o, p = '',
        q = {
            isActive: function w() {
                return true;
            },
            isPageActive: function w(x) {
                if (x == '#') return false;
                x = new(c('URI'))(x);
                if (x.getDomain() && x.getDomain() != new(c('URI'))(window.location.href).getDomain()) return false;
                if (x.getPath() == '/l.php') {
                    var y = x.getQueryData().u;
                    if (y) {
                        y = new(c('URI'))(unescape(y)).getDomain();
                        if (y && y != new(c('URI'))(window.location.href).getDomain()) return false;
                    }
                }
                var z = x.getPath(),
                    aa = x.getQueryData();
                if (!c('isEmpty')(aa)) z += '?' + c('PHPQuerySerializer').serialize(aa);
                return !m.test(z);
            },
            getLoadCount: function w() {
                return n;
            }
        };

    function r(w) {
        w = w || 'Facebook';
        c('DocumentTitle').set(w);
        if (c('UserAgent_DEPRECATED').ie()) {
            p = w;
            if (!o) o = window.setInterval(function() {
                var x = p,
                    y = c('DocumentTitle').get();
                if (x != y) c('DocumentTitle').set(x);
            }, 5000, false);
        }
    }

    function s(w) {
        var x = document.getElementsByTagName('link');
        for (var y = 0; y < x.length; ++y) {
            if (x[y].rel != 'alternate') continue;
            c('DOM').remove(x[y]);
        }
        if (w.length) {
            var z = c('DOM').find(document, 'head');
            z && c('DOM').appendContent(z, c('HTML')(w[0]));
        }
    }
    h = babelHelpers.inherits(t, c('AjaxPipeRequest'));
    i = h && h.prototype;

    function t(w) {
        'use strict';
        var x = {
            version: k
        };
        i.constructor.call(this, w, {
            quickling: x
        });
        this._isQuickling = true;
    }
    t.prototype._preBootloadFirstResponse = function(w) {
        'use strict';
        return true;
    };
    t.prototype._fireDomContentCallback = function() {
        'use strict';
        this._request.cavalry && this._request.cavalry.setTimeStamp('t_domcontent');
        if (j) j.transitionComplete();
        this._onPageDisplayed && this._onPageDisplayed(this.pipe);
        i._fireDomContentCallback.call(this);
    };
    t.prototype._fireOnloadCallback = function() {
        'use strict';
        if (this._request.cavalry) {
            this._request.cavalry.setTimeStamp('t_hooks');
            this._request.cavalry.setTimeStamp('t_layout');
            this._request.cavalry.setTimeStamp('t_onload');
        }
        i._fireOnloadCallback.call(this);
    };
    t.prototype.isPageActive = function(w) {
        'use strict';
        return q.isPageActive(w);
    };
    t.prototype._versionCheck = function(w) {
        'use strict';
        if (w.version == k) return true;
        var x = ['quickling', 'ajaxpipe', 'ajaxpipe_token'];
        c('goOrReplace')(window.location, new(c('URI'))(w.uri).removeQueryData(x), true);
        return false;
    };
    t.prototype._processFirstResponse = function(w) {
        'use strict';
        var x = w.getPayload();
        r(x.title);
        s(x.syndication || []);
        window.scrollTo(0, 0);
        c('CSSClassTransition').go(document.body, x.body_class || '', j.getMostRecentURI(), w.getRequest().getURI());
        c('Arbiter').inform('quickling/response');
    };
    t.prototype.getSanitizedParameters = function() {
        'use strict';
        return ['quickling'];
    };

    function u() {
        n++;
        return n >= l;
    }

    function v(w) {
        c('AjaxPipeRequest').setCurrentRequest(null);
        if (u()) {
            w.addQueryData({
                qsefr: 1
            });
            return false;
        }
        w = c('QuicklingAugmenter').augmentURI(w);
        if (!q.isPageActive(w)) return false;
        c('TimerStorage').clearAll(c('TimerStorage').ANIMATION_FRAME, c('cancelAnimationFrame'));
        c('TimerStorage').clearAll(c('TimerStorage').IDLE_CALLBACK, c('cancelIdleCallback'));
        c('TimerStorage').clearAll(c('TimerStorage').IMMEDIATE, c('clearImmediate'));
        c('TimerStorage').clearAll(c('TimerStorage').INTERVAL, c('clearInterval'));
        c('TimerStorage').clearAll(c('TimerStorage').TIMEOUT, c('clearTimeout'));
        window.ExitTime = Date.now();
        c('Run').__removeHook(c('PageHooks').ONLOAD_HOOK);
        c('Run').__removeHook(c('PageHooks').DOMREADY_HOOK);
        c('PageHooks').runHooks('onleavehooks');
        c('Arbiter').inform(c('PageEvents').AJAXPIPE_ONUNLOAD, {
            transition_type: 'quickling'
        });
        new t(w).setCanvasId('content').send();
        var x = window.__bodyWrapper;
        if (x.getCodeUsage) x.clearCodeUsage();
        return c('PageTransitionsRegistrar').DELAY_HISTORY;
    }
    c('replaceNativeTimer')();
    c('Run').onAfterLoad(function w() {
        c('PageTransitionsRegistrar').registerHandler(v, 1);
    });
    f.exports = b.Quickling = q;
}), null);
__d('BrowserPushCommands', [], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = 'browser_push_ack',
        i = 'browser_push_redirect',
        j = 'browser_push_window_visible',
        k = {
            ACK: h,
            REDIRECT: i,
            WINDOW_VISIBLE: j
        };
    f.exports = k;
}), null);
__d('BrowserPushMessageRedirectUtil', ['Bootloader', 'MercuryConfig'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = function i(j) {
        var k = '(messages)(.*?)(?:(tid=))([^&]*)',
            l = j.match(k);
        if (!l) return true;
        var m = l.pop();
        if (c('MercuryConfig').FantaTabs) {
            c('Bootloader').loadModules(["FantaTabActions"], function(n) {
                n.openTab(m);
            }, 'BrowserPushMessageRedirectUtil');
        } else c('Bootloader').loadModules(["ChatOpenTab"], function(n) {
            n.openThread(m, 'jewel');
        }, 'BrowserPushMessageRedirectUtil');
        return false;
    };
    f.exports = h;
}), null);
__d('BrowserPushMessageHandler', ['BrowserPushCommands', 'BrowserPushMessageRedirectUtil', 'EventListener', 'isFacebookURI', 'URISchemes'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(event) {
        if (event.data.command && event.data.command === c('BrowserPushCommands').REDIRECT) {
            if (window.onbeforeunload() === undefined) {
                event.ports[0].postMessage({
                    command: c('BrowserPushCommands').ACK,
                    success: true
                });
            } else {
                event.ports[0].postMessage({
                    command: c('BrowserPushCommands').ACK,
                    success: false
                });
                return;
            }
            var j = event.data.uri;
            if (/^([^.:/?#]+):/.test(j) && !c('URISchemes').isAllowed(/^([^.:/?#]+):/.exec(j)[0]) && c('isFacebookURI')(j)) throw new Error('goURI: URI scheme rejected, URI: ' + j);
            if (c('BrowserPushMessageRedirectUtil')(j)) window.location.href = j;
        }
    }
    var i = {
        registerRedirectHandler: function j() {
            c('EventListener').listen(window, 'message', function(event) {
                if (event.origin === '') h(event);
            });
            if (navigator.serviceWorker && navigator.serviceWorker.addEventListener) navigator.serviceWorker.addEventListener('message', function(event) {
                if (navigator.serviceWorker && navigator.serviceWorker.controller && event.target && event.target.controller && event.target.controller === navigator.serviceWorker.controller || new RegExp('^' + window.location.protocol + '//' + window.location.host + '$').test(event.origin)) h(event);
            });
        }
    };
    f.exports = i;
}), null);
__d('BrowserPushVisibilityChanger', ['BrowserPushCommands', 'ClientServiceWorkerMessage', 'Visibility'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h() {
        new(c('ClientServiceWorkerMessage'))(c('BrowserPushCommands').WINDOW_VISIBLE, null).sendViaController();
    }
    var i = {
        listenForVisibility: function j() {
            if (!c('Visibility').isHidden()) h();
            c('Visibility').addListener(c('Visibility').VISIBLE, h);
        }
    };
    f.exports = i;
}), null);
__d('ServiceWorkerRegistration', ['Promise', 'ClientServiceWorkerMessage'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = 'serviceWorker' in navigator;

    function i() {
        var k = navigator.serviceWorker;
        if (!h || !k) throw new Error('serviceWorker is not supported in this browser');
        return k;
    }
    var j = {
        isSupported: function k() {
            return h;
        },
        registerWorkerIfUnregistered: function k(l) {
            var m = i();
            return new(c('Promise'))(function(n, o) {
                this.getWorkerRegistration(l).done(function(p) {
                    if (!p) {
                        c('Promise').resolve(m.register(l)).done(function() {
                            c('Promise').resolve(m.ready).done(n);
                        });
                    } else n(p);
                });
            }.bind(this));
        },
        unregisterControllingWorker: function k() {
            return new(c('Promise'))(function(l, m) {
                var n = new(c('ClientServiceWorkerMessage'))('unregister', {}, function() {
                    l(true);
                });
                n.sendViaController();
            });
        },
        getWorkerRegistration: function k(l) {
            var m = i();
            return c('Promise').resolve(m.getRegistration(l));
        }
    };
    f.exports = j;
}), null);
__d('PushRegistration', ['Promise', 'BrowserPushMessageHandler', 'BrowserPushVisibilityChanger', 'Map', 'ServiceWorkerRegistration'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = window.Notification,
        i = new(c('Map'))();
    j.get = function(k, l) {
        'use strict';
        if (i.has(l)) return i.get(l);
        var m = new j(k, l);
        i.set(l, m);
        return m;
    };

    function j(k, l) {
        'use strict';
        this.$PushRegistration3 = k;
        this.appID = l;
        if (!j.$PushRegistration1 && !j.$PushRegistration2) {
            j.$PushRegistration1 = false;
            j.$PushRegistration2 = false;
        }
    }
    j.prototype.getPushSubscription = function() {
        'use strict';
        return new(c('Promise'))(function(k, l) {
            if (!h || h.permission === 'denied') l(new Error('No permission or not supported'));
            c('ServiceWorkerRegistration').getWorkerRegistration(this.$PushRegistration3).then(function(m) {
                if (!m) {
                    k(null);
                    return;
                }
                m.pushManager.getSubscription().then(function(n) {
                    k(n);
                })['catch'](l);
            })['catch'](l);
        }.bind(this));
    };
    j.prototype.$PushRegistration4 = function(k) {
        'use strict';
        var l = k.endpoint;
        if ('subscriptionId' in k && !new RegExp('/' + k.subscriptionId + '$').test(l)) l += '/' + k.subscriptionId;
        return l;
    };
    j.prototype.$PushRegistration5 = function(k, l, m, n) {
        'use strict';
        var o = this.$PushRegistration4(m),
            p = k.getURIBuilder().getURI(),
            q = new l(p);
        q.setData({
            app_id: this.appID,
            push_endpoint: o,
            subscription_keys: JSON.stringify(m.toJSON().keys)
        });
        q.setMethod('post');
        if (q.setHandler) q.setHandler(function(r) {
            if (r.payload && r.payload.session_change) n();
        });
        q.send();
    };
    j.prototype.getSubscription = function() {
        'use strict';
        return new(c('Promise'))(function(k, l) {
            this.getPushSubscription().then(function(m) {
                if (m) {
                    k(this.$PushRegistration4(m));
                } else k(null);
            }.bind(this))['catch'](l);
        }.bind(this));
    };
    j.prototype.maybeRegisterPushAgain = function(k, l, m) {
        'use strict';
        return new(c('Promise'))(function(n, o) {
            this.getPushSubscription().then(function(p) {
                if (p) {
                    this.$PushRegistration5(k, l, p, m);
                    n(this.$PushRegistration4(p));
                } else n(null);
            }.bind(this))['catch'](function() {
                n(null);
            });
        }.bind(this));
    };
    j.prototype.$PushRegistration6 = function(k, l, m) {
        'use strict';
        return new(c('Promise'))(function(n, o) {
            if (j.$PushRegistration2 && !m) {
                o(new Error('sending disable info already'));
                return;
            }
            j.$PushRegistration2 = true;
            var p = k.getURIBuilder().getURI(),
                q = new l(p.toString());
            q.setData({
                appid: this.appID,
                from_browser_settings: m
            });
            q.setMethod('post');
            if (q.listen) {
                q.listen('finally', n);
                q.listen('fail', function() {
                    j.$PushRegistration2 = false;
                    o();
                });
            } else if (q.setErrorHandler && q.setHandler) {
                q.setErrorHandler(function() {
                    j.$PushRegistration2 = false;
                    o();
                });
                q.setHandler(n);
            } else n();
            q.send();
        }.bind(this));
    };
    j.prototype.isPushRegistered = function(k, l, m, n, o, p, q) {
        'use strict';
        c('BrowserPushMessageHandler').registerRedirectHandler();
        return new(c('Promise'))(function(r, s) {
            this.getPushSubscription().then(function(t) {
                r(!!t || k && !j.pushPermissionIsPending());
                if (t) {
                    if (o) {
                        self.$PushRegistration5(l, n, p, q);
                    } else c('BrowserPushVisibilityChanger').listenForVisibility();
                } else if (!t && k)
                    if (j.pushPermissionIsOn()) {
                        this.registerPush(l, n, p, q)['catch'](function() {});
                    } else this.$PushRegistration6(m, n, false);
            }.bind(this))['catch'](function() {
                if (k) {
                    this.$PushRegistration6(m, n, false);
                    s();
                }
                if (q) c('ServiceWorkerRegistration').unregisterControllingWorker();
            }.bind(this));
        }.bind(this));
    };
    j.prototype.$PushRegistration7 = function() {
        'use strict';
        return new(c('Promise'))(function(k, l) {
            h.requestPermission(k);
        });
    };
    j.prototype.registerPushAndWaitForEndpoint = function(k, l, m, n) {
        'use strict';
        return new(c('Promise'))(function(o, p) {
            this.$PushRegistration8(k, l, m, true, null, n).then(function(q) {
                if (typeof q !== 'string') {
                    p(new Error('registerPushImpl did not return an endpoint'));
                    return;
                }
                o(q);
            })['catch'](p);
        }.bind(this));
    };
    j.prototype.registerPush = function(k, l, m, n) {
        'use strict';
        return this.registerPushWithFinishedCallBack(k, l, m, null, n);
    };
    j.prototype.registerPushWithFinishedCallBack = function(k, l, m, n, o) {
        'use strict';
        return new(c('Promise'))(function(p, q) {
            this.$PushRegistration8(k, l, m, false, n, o).then(function(r) {
                if (typeof r !== 'boolean') {
                    q(new Error('registerPushImpl did not return a boolean'));
                    return;
                }
                p(r);
            })['catch'](q);
        }.bind(this));
    };
    j.prototype.$PushRegistration8 = function(k, l, m, n, o, p) {
        'use strict';
        if (j.$PushRegistration1) return new(c('Promise'))(function(q, r) {
            r(new Error('registering already'));
        });
        j.$PushRegistration1 = true;
        return new(c('Promise'))(function(q, r) {
            var s = c('ServiceWorkerRegistration').registerWorkerIfUnregistered(this.$PushRegistration3),
                t = this.$PushRegistration7();
            c('Promise').all([s, t]).then(function(u) {
                var v = u[0];
                if (!j.pushPermissionIsOn()) {
                    if (p) v.unregister();
                    throw new Error('Push permission was denied');
                }
                if (!n) q(true);
                v.pushManager.subscribe({
                    userVisibleOnly: true
                }).then(function(w) {
                    if (n) q(this.$PushRegistration4(w));
                    this.$PushRegistration5(k, l, w, m);
                    if (o) o();
                    c('BrowserPushVisibilityChanger').listenForVisibility();
                }.bind(this))['catch'](function(w) {
                    j.$PushRegistration1 = false;
                    if (p) v.unregister();
                    r(w);
                });
            }.bind(this))['catch'](function(u) {
                j.$PushRegistration1 = false;
                r(u);
            });
        }.bind(this));
    };
    j.prototype.unregisterPushAndSW = function(k, l) {
        'use strict';
        return new(c('Promise'))(function(m, n) {
            this.$PushRegistration6(k, l, true).then(function() {
                c('ServiceWorkerRegistration').unregisterControllingWorker().done(m);
            })['catch'](n);
        }.bind(this));
    };
    j.prototype.unregisterPushOnly = function(k, l) {
        'use strict';
        return new(c('Promise'))(function(m, n) {
            this.getPushSubscription().then(function(o) {
                if (o) {
                    o.unsubscribe().then(this.$PushRegistration6(k, l, true)).then(function() {
                        m(true);
                    })['catch'](n);
                } else n();
            }.bind(this))['catch'](n);
        }.bind(this));
    };
    j.pushPermissionIsPending = function() {
        'use strict';
        return h && h.permission === 'default';
    };
    j.pushPermissionIsOn = function() {
        'use strict';
        return h && h.permission === 'granted';
    };
    f.exports = j;
}), null);
__d("XPushRegisterServiceWorkerController", ["XController"], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = c("XController").create("\/push\/register\/service_worker\/", {});
}), null);
__d('BrowserPushDirectPromptInstaller', ['Arbiter', 'AsyncRequest', 'BanzaiLogger', 'BrowserPushSessionChange.react', 'DOM', 'NotificationPermissionNotice.react', 'NotificationPermissionRequest.react', 'PushRegistration', 'React', 'ReactDOM', 'XBrowserPushDisabledController', 'XBrowserPushXOutController', 'XPushRegisterServiceWorkerController'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = false;

    function i(event, m) {
        var n = {
            event: event,
            appid: m,
            surface: 'prompt'
        };
        c('BanzaiLogger').log('BrowserPushLoggerConfig', n);
    }

    function j(m) {
        if (!h) {
            h = true;
            c('ReactDOM').unmountComponentAtNode(m);
        }
    }

    function k(m, n) {
        var o = c('DOM').insertBefore(m, c('DOM').create('span')),
            p = o.pop();
        c('ReactDOM').render(c('React').createElement(c('BrowserPushSessionChange.react'), {
            onHide: function q() {
                c('ReactDOM').unmountComponentAtNode(m);
            },
            push: n
        }), p);
    }
    var l = {
        installPush: function m(n, o, p, q, r, s, t, u) {
            var v = c('PushRegistration').get(n, o);
            v.isPushRegistered(q, c('XPushRegisterServiceWorkerController'), c('XBrowserPushDisabledController'), c('AsyncRequest'), !!s, function() {
                k(p, v);
            }, u).then(function(w) {
                if (w || r) return;
                if (c('PushRegistration').pushPermissionIsPending()) c('ReactDOM').render(c('React').createElement(c('NotificationPermissionRequest.react'), {
                    onHide: function x() {
                        j(p);
                    }
                }), p);
                i('turn_on', o);
                v.registerPushWithFinishedCallBack(c('XPushRegisterServiceWorkerController'), c('AsyncRequest'), function() {
                    k(p, v);
                }, function() {
                    c('Arbiter').inform('BrowserPushInstall/installed');
                }, u).then(function() {
                    j(p);
                    i('install', o);
                })['catch'](function(x) {
                    j(p);
                    if (window.Notification && window.Notification.permission === 'denied') {
                        c('ReactDOM').render(c('React').createElement(c('NotificationPermissionNotice.react'), {
                            onHide: function z() {
                                c('ReactDOM').unmountComponentAtNode(p);
                            },
                            browserName: t
                        }), p);
                        i('deny', o);
                    } else i('install_ignore', o);
                    var y = c('XBrowserPushXOutController').getURIBuilder().getURI();
                    new(c('AsyncRequest'))().setURI(y).setMethod('post').send();
                    i('xout', o);
                });
            })['catch'](function() {});
        }
    };
    f.exports = l;
}), null);
__d("XBrowserPushMuteController", ["XController"], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = c("XController").create("\/notifications\/client\/push\/mute\/", {
        push_endpoint: {
            type: "String",
            required: true
        },
        appid: {
            type: "Int",
            required: true
        },
        is_settings_page: {
            type: "Bool",
            defaultValue: false
        },
        __asyncDialog: {
            type: "Int"
        }
    });
}), null);
__d('BrowserPushMuteOptions', ['fbt', 'AsyncRequest', 'PushRegistration', 'React', 'ReactDOM', 'XBrowserPushMuteController'], (function a(b, c, d, e, f, g, h) {
    if (c.__markCompiled) c.__markCompiled();

    function i(k, l, m) {
        var n = c('PushRegistration').get(l, m);
        n.getPushSubscription().done(function(o) {
            if (o) {
                var p = c('XBrowserPushMuteController').getURIBuilder().setString('push_endpoint', o.endpoint).setInt('appid', m).getURI();
                new(c('AsyncRequest'))().setURI(p).setRelativeTo(k).send();
            }
        });
    }
    var j = {
        showMuteOptions: function k(l, m, n) {
            if (!c('PushRegistration').pushPermissionIsOn()) return;
            c('ReactDOM').render(c('React').createElement('a', {
                href: '#',
                onClick: function o() {
                    i(l, m, n);
                }
            }, h._("Mute")), l);
        }
    };
    f.exports = j;
}), null);
__d('PrivacyLiteFlyoutHelp', ['csx', 'cx', 'Arbiter', 'AsyncRequest', 'Banzai', 'ContextualHelpSearchController', 'CSS', 'DOM', 'Event', 'Parent'], (function a(b, c, d, e, f, g, h, i) {
    if (c.__markCompiled) c.__markCompiled();
    var j, k;

    function l(m, n, o, p, q) {
        this._width = 315;
        k = c('DOM').find(n, 'input');
        var r = c('DOM').create('div');
        c('ContextualHelpSearchController').call(this, m, k, r, o, p, {
            focusSearchBox: false
        });
        j = c('Parent').bySelector(n, "._8-a");
        c('Event').listen(q, 'click', function() {
            this._hideSearch(this);
            c('Banzai').post('privacy_lite', {
                event: 'plite_search_collapse',
                exit_point: null
            });
        }.bind(this));
        c('Arbiter').subscribe('PrivacyLiteFlyout/expandingSection', this._hideSearch.bind(this));
        var s = c('DOM').scry(j, "._d1r")[0];
        s && c('Event').listen(s, 'click', function() {
            c('CSS').addClass(j, "_aw6");
            k.focus();
            c('Banzai').post('privacy_lite', {
                event: 'plite_search_expand',
                exit_point: null
            });
            if (!this.suggestedResults) new(c('AsyncRequest'))('/ajax/privacy/privacy_lite/help_suggestions').setHandler(function(t) {
                var u = t.getPayload().searchSuggestions,
                    v = c('DOM').find(j, "._4_8m");
                c('DOM').setContent(v, u);
                c('CSS').addClass(j, "_4_8l");
            }.bind(this)).send();
        }.bind(this));
    }
    Object.assign(l.prototype, c('ContextualHelpSearchController').prototype, {
        source: 'privacy_shortcuts',
        _hideSearch: function m() {
            this.clearResults();
            c('CSS').removeClass(j, "_aw6");
        },
        show: function m(n) {
            if (n === this.topics_area) {
                c('CSS').removeClass(j, "_aw7");
                return;
            } else if (n === this.loader) {
                c('CSS').addClass(j, "_aw7");
                c('CSS').hide(this.results_area);
            } else c('CSS').hide(this.loader);
            c('CSS').show(n);
        }
    });
    f.exports = l;
}), null);
__d('ViewasChromeBar', ['csx', 'cx', 'Arbiter', 'AsyncRequest', 'CSS', 'DOM', 'Event', 'Focus', 'ModalMask', 'PageTransitionsRegistrar', 'Parent'], (function a(b, c, d, e, f, g, h, i) {
    if (c.__markCompiled) c.__markCompiled();
    var j = 'ViewasChromeBar/initialized',
        k = null,
        l = false;

    function m(p) {
        c('Arbiter').subscribe(j, p);
    }

    function n(p) {
        c('CSS').addClass(p, "_7g7");
        var q = c('DOM').find(p, "._7g0");
        c('Focus').set(c('DOM').find(q, '.textInput'));
    }
    var o = {
        initChromeBar: function p(q) {
            if (l) return;
            k = q;
            l = true;
            c('Arbiter').inform(j, null, c('Arbiter').BEHAVIOR_STATE);
        },
        update: function p(q, r) {
            m(function() {
                c('DOM').setContent(k, q);
                if (r) new(c('AsyncRequest'))('/ajax/privacy/glasgow/viewas_bar_flyout_open').send();
            });
        },
        registerSpecificModeOnClick: function p(q) {
            c('Event').listen(q, 'click', n.bind(null, c('Parent').bySelector(q, "._7f-")));
        },
        registerFlyoutModalMask: function p() {
            c('ModalMask').show();
            c('PageTransitionsRegistrar').registerHandler(c('ModalMask').hide, 10);
        }
    };
    f.exports = o;
}), null);
__d("XServiceWorkerController", ["XController"], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = c("XController").create("\/sw\/", {
        s: {
            type: "String",
            required: true
        }
    });
}), null);
__d('ReactBlueBarBrowserPushMuteLink.react', ['fbt', 'BrowserPushMuteOptions', 'React', 'XServiceWorkerController', 'nullthrows'], (function a(b, c, d, e, f, g, h) {
    var i, j;
    if (c.__markCompiled) c.__markCompiled();

    function k() {
        var m = c('XServiceWorkerController').getURIBuilder().setString('s', 'push').getURI();
        m.setPath(m.getPath().replace(/\/$/, ''));
        return m.toString();
    }
    i = babelHelpers.inherits(l, c('React').Component);
    j = i && i.prototype;
    l.prototype.shouldComponentUpdate = function() {
        'use strict';
        return false;
    };
    l.prototype.render = function() {
        'use strict';
        return (c('React').createElement('span', {
            ref: function(m) {
                return this.$ReactBlueBarBrowserPushMuteLink1 = m;
            }.bind(this)
        }, h._("Mute")));
    };
    l.prototype.componentDidMount = function() {
        'use strict';
        c('BrowserPushMuteOptions').showMuteOptions(c('nullthrows')(this.$ReactBlueBarBrowserPushMuteLink1), k(), this.props.appID);
    };

    function l() {
        'use strict';
        i.apply(this, arguments);
    }
    f.exports = l;
}), null);
