if (self.CavalryLogger) {
    CavalryLogger.start_js(["UQLYp"]);
}

__d("FullViewType", [], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = {
        ENTIRE_UNIT: 1
    };
}), null);
__d('BrowseClientEventLogger', ['Banzai', 'SearchLoggingOptions'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = 'browse_client_event_session',
        i = 'search_www_click_error',
        j = '21.',
        k = {
            logData: function l(event, m, n, o) {
                if (!event || !m) return;
                o = o || {};
                o.event = event;
                o.client_time = Math.floor(Date.now());
                o.session_id = m;
                o.vertical = n;
                this.processedSessions = this.processedSessions || [];
                if (this.processedSessions.indexOf(m) !== -1) return;
                var p = o.event === 'click' && o.clicked_href !== undefined && c('SearchLoggingOptions').signalLinkClicks;
                c('Banzai').post(h, [o], {
                    delay: 0,
                    retry: true,
                    signal: p
                });
            },
            logClick: function l(m) {
                m.gt.event = 'click';
                this.maybeLogVisiblityEvent(m, true);
            },
            maybeLogClientViewEvent: function l(m) {
                m.event = 'client_view';
                this.maybeLogVisiblityEvent(m);
            },
            maybeLogVisiblityEvent: function l(m, n) {
                var o = null;
                if (n) {
                    o = m;
                    m = m.gt;
                }
                if (!m || !m.xt || m.xt.indexOf(j) !== 0) {
                    if (n) c('Banzai').post(i, [o], {
                        delay: 0,
                        retry: true
                    });
                    return;
                }
                var p = JSON.parse(m.xt.substring(3));
                if (n) {
                    p.click_type = m.click_type;
                    p.tn = m.tn;
                    p.clicked_href = m.clicked_href;
                }
                var event = m.event;
                if (event === 'vpvd') {
                    if (!m.ft) return;
                    p.vpvd_time = m.ft.vpvd_time_delta;
                }
                this.logData(event, p.session_id, p.vertical, p);
            },
            logImpression: function l(m) {
                m.event = 'impression';
                this.maybeLogVisiblityEvent(m);
            }
        };
    f.exports = k;
}), null);
__d("GamesGogglesSwitch", [], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = false,
        i = {
            enable: function j() {
                h = true;
            },
            isEnabled: function j() {
                return h;
            }
        };
    f.exports = i;
}), null);
__d('VisibilityTrackingHelper', ['Arbiter', 'DesktopHscrollUnitEventConstants', 'getViewportDimensions', 'Event'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        getEventListeners: function i(j) {
            return [c('Event').listen(document, 'DOMContentLoaded', j), c('Event').listen(window, 'scroll', j), c('Event').listen(window, 'resize', j), c('Arbiter').subscribe(c('DesktopHscrollUnitEventConstants').HSCROLL_ITEM_SHOWN_EVENT, j)];
        },
        getViewportInfo: function i() {
            return c('getViewportDimensions')();
        }
    };
    f.exports = h;
}), null);
__d('VisibilityTracking', ['Banzai', 'BrowseClientEventLogger', 'DataAttributeUtils', 'ErrorUtils', 'ScriptPath', 'SubscriptionsHandler', 'Visibility', 'VisibilityTrackingHelper', 'collectDataAttributes', 'getElementPosition', 'pageID', 'throttle'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = 'visibility_tracking',
        i = '[data-vistracking]',
        j = 500,
        k = 50,
        l = 50,
        m = 50,
        n = 50,
        o = {
            VISIBLE: 'visible',
            HIDDEN: 'hidden'
        },
        p = {
            DEFAULT: 'default',
            REMOVED: 'removed'
        },
        q = {
            name: o.VISIBLE,
            cause: p.DEFAULT
        },
        r = {
            name: o.HIDDEN,
            cause: p.DEFAULT
        },
        s = {
            name: o.HIDDEN,
            cause: p.REMOVED
        },
        t = 0;

    function u(v) {
        'use strict';
        v = v || {};
        if (!v.bypass_banzai_check && !c('Banzai').isEnabled(h)) return;
        this.visibleElementInfo = {};
        this.getDataFromConfig(v);
        c('Visibility').addListener(c('Visibility').VISIBLE, c('ErrorUtils').guard(this.fireEvent, 'VisibilityTracking:visible', this));
        if (!this.skipVisibilityHiddenEvents) c('Visibility').addListener(c('Visibility').HIDDEN, c('ErrorUtils').guard(this.clearAllVisibleElements, 'VisibilityTracking:hidden', this));
        c('ScriptPath').subscribe(c('ErrorUtils').guard(this.updateVisibleElements, 'VisibilityTracking:scriptPath', this));
        c('Banzai').subscribe(c('Banzai').SHUTDOWN, c('ErrorUtils').guard(this.onUnload, 'VisibilityTracking:banzaiShutdown', this));
        this.fireEventCallback = c('throttle').acrossTransitions(c('ErrorUtils').guard(this.fireEvent, 'VisibilityTracking:fireEventCallback', this), this.timeout, this);
        this.listeners = new(c('SubscriptionsHandler'))();
        c('VisibilityTrackingHelper').getEventListeners(this.fireEventCallback).forEach(function(w) {
            this.listeners.addSubscriptions(w);
        }, this);
        if (this.extraInit) c('ErrorUtils').applyWithGuard(this.extraInit.bind(this));
    }
    u.prototype.getDataFromConfig = function(v) {
        'use strict';
        this.config = v;
        this.root = v.root || document.documentElement;
        this.selector = v.selector || i;
        this.timeout = typeof v.timeout !== 'undefined' ? v.timeout : j;
        this.minOffsetVisibleFromBottom = typeof v.minOffsetVisibleFromBottom !== 'undefined' ? v.minOffsetVisibleFromBottom : k;
        this.minOffsetVisibleFromTop = typeof v.minOffsetVisibleFromTop !== 'undefined' ? v.minOffsetVisibleFromTop : l;
        this.minOffsetVisibleFromLeft = typeof v.minOffsetVisibleFromLeft !== 'undefined' ? v.minOffsetVisibleFromLeft : m;
        this.minOffsetVisibleFromRight = typeof v.minOffsetVisibleFromRight !== 'undefined' ? v.minOffsetVisibleFromRight : n;
        this.handleAllHiddenEvents = typeof v.handleAllHiddenEvents !== 'undefined' ? v.handleAllHiddenEvents : false;
        this.handleAllVisibleEvents = typeof v.handleAllVisibleEvents !== 'undefined' ? v.handleAllVisibleEvents : false;
        this.skipVisibilityHiddenEvents = typeof v.skipVisibilityHiddenEvents !== 'undefined' ? v.skipVisibilityHiddenEvents : false;
        this.cacheTrackedElements = typeof v.cacheTrackedElements !== 'undefined' ? v.cacheTrackedElements : false;
    };
    u.prototype.getAllTrackedElements = function() {
        'use strict';
        if (!this.allTrackedElements) {
            this.allTrackedElements = {};
            var v = [];
            if (this.config.is_xtrackable) {
                v = c('DataAttributeUtils').getXTrackableElements();
            } else if (this.root.querySelectorAll) v = this.root.querySelectorAll(this.selector);
            for (var w = 0; w < v.length; w++) {
                var x = this.getElementID(v[w]);
                this.allTrackedElements[x] = v[w];
            }
        }
        return this.allTrackedElements;
    };
    u.prototype.refreshAllTrackedElements = function() {
        'use strict';
        delete this.allTrackedElements;
        return this.getAllTrackedElements();
    };
    u.prototype.getDataToLog = function(v) {
        'use strict';
        var w = Object.assign(c('collectDataAttributes')(v, ['gt']).gt, {
            client_time: Date.now() / 1000,
            time_spent_id: c('pageID'),
            script_path: c('ScriptPath').getScriptPath()
        });
        return w;
    };
    u.prototype.getElementID = function(v) {
        'use strict';
        var w = v.$VisibilityTracking1;
        if (w) return w;
        v.$VisibilityTracking1 = ++t;
        return t;
    };
    u.prototype.sendDataToLog = function(v) {
        'use strict';
        c('BrowseClientEventLogger').maybeLogVisiblityEvent(v);
        c('Banzai').post(h, v);
    };
    u.prototype.fireEvent = function() {
        'use strict';
        var v = this.cacheTrackedElements ? this.allTrackedElements : this.refreshAllTrackedElements();
        for (var w in v) {
            var x = v[w],
                y = c('VisibilityTrackingHelper').getViewportInfo(),
                z = this.isVisible(x, y);
            if (!z && (w in this.visibleElementInfo || this.handleAllHiddenEvents)) {
                this.handleEvent(x, r);
            } else if (z && (!(w in this.visibleElementInfo) || this.handleAllVisibleEvents)) this.handleEvent(x, q);
        }
        this.clearUntrackedVisibleElements();
    };
    u.prototype.isVisible = function(v, w) {
        'use strict';
        var x = c('getElementPosition')(v);
        return (x.x || x.y || x.width || x.height) && x.y + x.height >= this.minOffsetVisibleFromTop && x.y <= w.height - this.minOffsetVisibleFromBottom && x.x + x.width >= this.minOffsetVisibleFromLeft && x.x <= w.width - this.minOffsetVisibleFromRight;
    };
    u.prototype.handleEvent = function(v, event) {
        'use strict';
        var w = this.getElementID(v),
            x = this.getDataToLog(v),
            y;
        if (event.name === o.VISIBLE) {
            var z = Math.floor(Date.now() / 1000);
            y = c('pageID').concat(":", z.toString(), ":", this.getElementID(v).toString());
            this.visibleElementInfo[w] = {
                visibility_id: y,
                elem: v
            };
        } else if (event.name === o.HIDDEN)
            if (w in this.visibleElementInfo) {
                y = this.visibleElementInfo[w].visibility_id;
                delete this.visibleElementInfo[w];
            }
        this.sendDataToLog(Object.assign(x, {
            event: event.name,
            visibility_id: y
        }));
    };
    u.prototype.clearUntrackedVisibleElements = function() {
        'use strict';
        var v = this.getAllTrackedElements();
        for (var w in this.visibleElementInfo)
            if (!(w in v)) {
                var x = this.visibleElementInfo[w];
                if (x.elem) this.handleEvent(x.elem, s);
            }
    };
    u.prototype.clearAllVisibleElements = function() {
        'use strict';
        var v = this.getAllTrackedElements();
        for (var w in v)
            if (w in this.visibleElementInfo) this.handleEvent(v[w], r);
        this.clearUntrackedVisibleElements();
    };
    u.prototype.updateVisibleElements = function() {
        'use strict';
        this.clearAllVisibleElements();
        this.fireEvent();
    };
    u.prototype.refreshAndFireEvent = function() {
        'use strict';
        this.refreshAllTrackedElements();
        this.fireEventCallback();
    };
    u.prototype.onUnload = function() {
        'use strict';
        this.clearAllVisibleElements();
        if (this.listeners) {
            this.listeners.release();
            this.listeners = null;
        }
        if (this.extraCleanup) c('ErrorUtils').applyWithGuard(this.extraCleanup.bind(this));
    };
    u.init = function(v) {
        'use strict';
        new u(v);
    };
    u.EVENT = o;
    u.CAUSE = p;
    f.exports = u;
}), null);
__d('GamesImpressionTracker', ['cx', 'Arbiter', 'Banzai', 'Event', 'GamesGogglesSwitch', 'VisibilityTracking', 'throttle'], (function a(b, c, d, e, f, g, h) {
    var i, j;
    if (c.__markCompiled) c.__markCompiled();
    var k = 'data-gamesegoimp',
        l = 'data-gamesrankedimp',
        m = 1000;

    function n(s) {
        if (c('GamesGogglesSwitch').isEnabled()) s.className = s.className + ' ' + "_1z5y";
    }

    function o(s) {
        return function() {
            if (s) {
                s();
                s = null;
            }
        };
    }
    i = babelHelpers.inherits(p, c('VisibilityTracking'));
    j = i && i.prototype;
    p.prototype.handleEvent = function(s, event) {
        'use strict';
        if (event.name === c('VisibilityTracking').EVENT.VISIBLE) {
            var t = s.getAttribute(l);
            s.removeAttribute(l);
            if (t) {
                n(s);
                t && c('Banzai').post('games_ranked_imp', {
                    data: t
                });
            }
            c('Event').listen(s, 'mouseover', o(function() {
                c('Banzai').post('games_mouseover', {
                    data: t
                });
                c('Event').listen(s, 'mouseout', o(function() {
                    c('Banzai').post('games_mouseout', {
                        data: t
                    });
                }));
            }));
        }
    };

    function p() {
        'use strict';
        i.apply(this, arguments);
    }
    var q = new p({
            selector: '[data-gamesrankedimp]',
            handleAllVisibleEvents: true,
            skipVisibilityHiddenEvents: true,
            cacheTrackedElements: true
        }),
        r = c('throttle').acrossTransitions(function() {
            return q.fireEventCallback();
        }, m, null);
    q.listeners.addSubscriptions(c('Event').listen(document, 'mousemove', r), c('Event').listen(document, 'click', r), c('Arbiter').subscribe('games_unit_loaded', function() {
        return q.refreshAllTrackedElements();
    }));
}), null);
__d('legacy:async-signal', ['AsyncSignal'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    b.AsyncSignal = c('AsyncSignal');
}), 3);
__d('ViewableImpressionUtils', ['csx', 'cx', 'CSS'], (function a(b, c, d, e, f, g, h, i) {
    if (c.__markCompiled) c.__markCompiled();
    var j = {
        isHorizontallyOffscreen: function k(l, m, n) {
            var o = Math.max(m.x, 0),
                p = Math.min(m.x + m.width, n.width);
            return p - o < m.width || c('CSS').matchesSelector(l, ".desktop_hscroll_offscreen");
        }
    };
    f.exports = j;
}), null);
__d('FullViewLogger', ['Banzai', 'ScriptPath', 'SubscriptionsHandler', 'URI'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    h.logFromViewableImpressionTracker = function(i) {
        'use strict';
        var j = new h();
        j.subscribeToTrackerEvents(i);
    };
    h.prototype.subscribeToTrackerEvents = function(i) {
        'use strict';
        this.subscriptionsHandler = new(c('SubscriptionsHandler'))();
        this.subscriptionsHandler.addSubscriptions(i.addListener('full_view', this.onFullView, this));
    };
    h.prototype.onFullView = function(i) {
        'use strict';
        if (this.$FullViewLogger1()) this.$FullViewLogger2(i);
        var j = {
            token: i.token,
            fullViewType: i.fullViewType,
            scriptPath: c('ScriptPath').getTopViewEndpoint()
        };
        c('Banzai').post('xtrackable:full_view', j);
        if (this.$FullViewLogger1()) this.$FullViewLogger3(j);
    };
    h.prototype.$FullViewLogger1 = function() {
        'use strict';
        return 0;
    };
    h.prototype.$FullViewLogger2 = function(i) {
        'use strict';
    };
    h.prototype.$FullViewLogger3 = function(i) {
        'use strict';
    };

    function h() {
        'use strict';
    }
    f.exports = h;
}), null);
__d('ViewableImpressionHeatmapLogger', ['Banzai'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    h.logFromViewableImpressionTracker = function(i, j) {
        'use strict';
        var k = new h(j);
        k.subscribeToTrackerEvents(i);
    };

    function h(i) {
        'use strict';
        this.loggingDurationMS = i;
        this.trackingEntries = {};
    }
    h.prototype.subscribeToTrackerEvents = function(i) {
        'use strict';
        this.visibleSubscription = i.addListener('visible', this.onElementVisible, this);
        this.hiddenSubscription = i.addListener('hidden', this.onElementHidden, this);
    };
    h.prototype.onElementVisible = function(i) {
        'use strict';
        var j = this.getCurrentTimestamp(),
            k = this.trackingEntries[i.id];
        if (!k) {
            k = this.createTrackingEntry(i);
            this.beginTracking(i.id, k);
            j = k.startedTrackingTS;
        }
        k.viewportProgressEvents.push({
            timestamp: j,
            percentInViewport: i.percentInViewport.toFixed(2)
        });
    };
    h.prototype.onElementHidden = function(i) {
        'use strict';
        var j = this.getCurrentTimestamp(),
            k = this.trackingEntries[i.id];
        if (!k) return;
        k.viewportProgressEvents.push({
            timestamp: j,
            percentInViewport: 0
        });
    };
    h.prototype.onTrackingCompleted = function(i) {
        'use strict';
        var j = this.trackingEntries[i];
        j.viewportProgressEvents.push({
            timestamp: this.getCurrentTimestamp(),
            percentInViewport: j.tracker.getPercentInViewport().toFixed(2)
        });
        if (this.$ViewableImpressionHeatmapLogger1()) this.$ViewableImpressionHeatmapLogger2(i, j);
        this.logToServer(j);
        delete this.trackingEntries[i];
    };
    h.prototype.logToServer = function(i) {
        'use strict';
        var j = i;
        delete j.tracker;
        c('Banzai').post('xtrackable:heatmap', j);
    };
    h.prototype.beginTracking = function(i, j) {
        'use strict';
        this.trackingEntries[i] = j;
        setTimeout(function() {
            return this.onTrackingCompleted(i);
        }.bind(this), this.loggingDurationMS);
    };
    h.prototype.createTrackingEntry = function(i) {
        'use strict';
        return {
            tracker: i.tracker,
            token: i.token,
            startedTrackingTS: this.getCurrentTimestamp(),
            viewportProgressEvents: []
        };
    };
    h.prototype.getCurrentTimestamp = function() {
        'use strict';
        return (Date.now() / 1000).toFixed(2);
    };
    h.prototype.$ViewableImpressionHeatmapLogger1 = function() {
        'use strict';
        return 0;
    };
    h.prototype.$ViewableImpressionHeatmapLogger2 = function(i, j) {
        'use strict';
        var k = 'Completed tracking for id ' + i + ' token=' + j.token + ' startedTrackingTS=' + j.startedTrackingTS + '\n';
        j.viewportProgressEvents.forEach(function(l) {
            k += '% in view: ' + l.percentInViewport + ' timestamp=' + l.timestamp + '\n';
        });
    };
    f.exports = h;
}), null);
__d('ViewableImpressionTracker', ['Banzai', 'BrowseClientEventLogger', 'DataAttributeUtils', 'DOM', 'FullViewType', 'NonBlockingIFrame', 'Style', 'URI', 'ViewableImpressionUtils', 'WebSpeedExperiments', 'getElementPosition', 'getViewportDimensions', 'mixInEventEmitter'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(i, j, k) {
        'use strict';
        this.id = i;
        this.element = j;
        this.config = k;
        this.iframe = null;
        this.viewableTimeout = null;
        this.clearSubsequentTimeout = null;
        this.waitForSubsequent = false;
        this.waitForLogged = false;
        this.isNonViewableLogged = false;
        this.isVisible = false;
        this.iframeLogged = false;
        this.banzaiLogged = false;
        this.topLeftInViewport = false;
        this.bottomRightInViewport = false;
    }
    h.prototype.getID = function() {
        'use strict';
        return this.id;
    };
    h.prototype.getPercentInViewport = function() {
        'use strict';
        var i = c('getViewportDimensions')(),
            j = c('getElementPosition')(this.element);
        return this.$ViewableImpressionTracker1(i, j);
    };
    h.prototype.$ViewableImpressionTracker1 = function(i, j) {
        'use strict';
        if (j.x < i.width && j.x + j.width > 0 && j.y < i.height && j.y + j.height > 0 && c('Style').get(this.element, 'visibility') !== 'hidden' && c('Style').get(this.element, 'opacity') !== '0') {
            var k = Math.max(j.x, 0),
                l = Math.min(j.x + j.width, i.width),
                m = Math.max(j.y, 0),
                n = Math.min(j.y + j.height, i.height);
            if (j.height * j.width === 0) return 100;
            if (this.config.require_horizontally_onscreen && c('ViewableImpressionUtils').isHorizontallyOffscreen(this.element, j, i)) return 0;
            var o = 100 * (l - k) * (n - m) / (j.height * j.width);
            return o;
        }
        return 0;
    };
    h.prototype.$ViewableImpressionTracker2 = function(i, j) {
        'use strict';
        if (c('Style').get(this.element, 'visibility') === 'hidden' || c('Style').get(this.element, 'opacity') === '0') return false;
        var k = j.x,
            l = j.y,
            m = j.x + j.width,
            n = j.y + j.height;
        this.topLeftInViewport = this.topLeftInViewport || k >= 0 && k <= i.width && l >= 0 && l <= i.height;
        this.bottomRightInViewport = this.bottomRightInViewport || m >= 0 && m <= i.width && n >= 0 && n <= i.height;
        return this.topLeftInViewport && this.bottomRightInViewport;
    };
    h.prototype.$ViewableImpressionTracker3 = function(i, j) {
        'use strict';
        if (this.hasEmittedFullViewEvent) return;
        if (this.$ViewableImpressionTracker2(i, j)) {
            this.emit('full_view', {
                tracker: this,
                id: this.getID(),
                token: this.getToken(),
                fullViewType: c('FullViewType').ENTIRE_UNIT
            });
            this.hasEmittedFullViewEvent = true;
        }
    };
    h.prototype.onVisible = function() {
        'use strict';
        this.isVisible = true;
        var i = c('getViewportDimensions')(),
            j = c('getElementPosition')(this.element),
            k = this.$ViewableImpressionTracker1(i, j),
            l = k > this.config.pixel_in_percentage;
        this.emit('visible', {
            tracker: this,
            id: this.getID(),
            token: this.getToken(),
            percentInViewport: k
        });
        this.$ViewableImpressionTracker3(i, j);
        if (!l) {
            this.$ViewableImpressionTracker4();
            return;
        }
        if (this.isLogged()) {
            this.$ViewableImpressionTracker5();
        } else this.$ViewableImpressionTracker6();
        if (!this.waitForLogged && !this.isLogged()) {
            this.waitForLogged = true;
            this.viewableTimeout = setTimeout(function() {
                this.waitForLogged = false;
                var m = this.getPercentInViewport(),
                    n = m > this.config.pixel_in_percentage;
                if (!n) {
                    this.$ViewableImpressionTracker7();
                    return;
                }
                this.logImpression(1, {});
                this.$ViewableImpressionTracker5();
            }.bind(this), this.config.duration_in_ms);
        }
    };
    h.prototype.onHidden = function() {
        'use strict';
        this.emit('hidden', {
            id: this.getID(),
            token: this.getToken()
        });
        if (this.config.log_initial_nonviewable && !this.isLogged() && !this.isNonViewableLogged) {
            this.logNonViewableImpression();
        } else if (!this.config.log_initial_nonviewable && !this.isLogged() && this.isVisible) this.logNonViewableImpression();
        this.isVisible = false;
        if (this.waitForLogged) {
            this.waitForLogged = false;
            clearTimeout(this.viewableTimeout);
        }
        if (this.isLogged() && !this.waitForSubsequent && this.config.subsequent_gap_in_ms >= 0) {
            this.waitForSubsequent = true;
            this.clearSubsequentTimeout = setTimeout(function() {
                this.waitForSubsequent = false;
                this.reset();
                if (this.isVisible) this.onVisible();
            }.bind(this), this.config.subsequent_gap_in_ms);
        }
        this.$ViewableImpressionTracker7();
    };
    h.prototype.onRemoved = function() {
        'use strict';
        this.isVisible = false;
    };
    h.prototype.getToken = function() {
        'use strict';
        return c('DataAttributeUtils').getDataAttribute(this.element, 'data-xt');
    };
    h.prototype.logImpression = function(i, j) {
        'use strict';
        if (this.isLogged()) return;
        var k = this.getToken(),
            l = Math.floor(Date.now() / 1000),
            m = {
                xt: k,
                isv: i,
                cts: l
            };
        if (c('Banzai').isEnabled('xtrackable_clientview_batch') && this.config.should_batch || this.config.vital_mode_for_ss || this.config.signal_mode_for_ss) {
            var n = this.config.vital_mode_for_ss ? c('Banzai').VITAL : {};
            n.signal = this.config.signal_mode_for_ss;
            this.logWithBanzai(m, n);
        } else this.logWithIFrame(Object.assign(m, j));
    };
    h.prototype.logNonViewableImpression = function() {
        'use strict';
        if (this.config.nonviewableEnabled) {
            var i = this.getToken();
            c('Banzai').post('xtrackable:nonviewable', {
                xt: i
            });
        }
        this.isNonViewableLogged = true;
    };
    h.prototype.isLogged = function() {
        'use strict';
        return this.iframeLogged || this.banzaiLogged;
    };
    h.prototype.reset = function() {
        'use strict';
        if (this.iframeLogged) this.iframeLogged = false;
        if (this.iframe) {
            c('DOM').remove(this.iframe);
            this.iframe = null;
        }
        if (this.banzaiLogged) this.banzaiLogged = false;
        this.isNonViewableLogged = false;
        this.isVisible = false;
        this.waitForLogged = false;
        this.waitForSubsequent = false;
    };
    h.prototype.logWithBanzai = function(i, j) {
        'use strict';
        this.banzaiLogged = true;
        c('BrowseClientEventLogger').maybeLogClientViewEvent(i);
        c('Banzai').post('xtrackable:clientview_batch', i, j);
    };
    h.prototype.logWithIFrame = function(i) {
        'use strict';
        this.iframeLogged = true;
        if (c('WebSpeedExperiments').non_blocking_tracker) {
            c('NonBlockingIFrame').loadIFrame(new(c('URI'))(this.config.impressionURL).addQueryData(i).toString());
        } else {
            this.iframe = c('DOM').create('iframe', {
                src: new(c('URI'))(this.config.impressionURL).addQueryData(i),
                width: 0,
                height: 0,
                frameborder: 0,
                scrolling: 'no',
                className: 'fbEmuTracking'
            });
            this.iframe.setAttribute('aria-hidden', 'true');
            c('DOM').appendContent(this.element, this.iframe);
        }
    };
    h.prototype.$ViewableImpressionTracker8 = function() {
        'use strict';
        return 0;
    };
    h.prototype.$ViewableImpressionTracker4 = function() {
        'use strict';
        if (this.$ViewableImpressionTracker8()) {
            c('Style').set(this.element, 'background-color', '#abab9a');
            c('Style').set(this.element, 'outline', '3px solid #abab9a');
        }
    };
    h.prototype.$ViewableImpressionTracker6 = function() {
        'use strict';
        if (this.$ViewableImpressionTracker8()) {
            c('Style').set(this.element, 'background-color', '#e4f70a');
            c('Style').set(this.element, 'outline', '3px solid #e4f70a');
        }
    };
    h.prototype.$ViewableImpressionTracker7 = function() {
        'use strict';
        if (this.$ViewableImpressionTracker8()) {
            c('Style').set(this.element, 'background-color', null);
            c('Style').set(this.element, 'outline', null);
        }
    };
    h.prototype.$ViewableImpressionTracker5 = function() {
        'use strict';
        if (this.$ViewableImpressionTracker8()) {
            c('Style').set(this.element, 'background-color', '#047515');
            c('Style').set(this.element, 'outline', '3px solid #047515');
        }
    };
    c('mixInEventEmitter')(h, {
        visible: true,
        hidden: true,
        full_view: true
    });
    f.exports = h;
}), null);
__d('ViewableImpressionEventHandler', ['DataAttributeUtils', 'FullViewLogger', 'ViewableImpressionHeatmapLogger', 'ViewableImpressionTracker', 'VisibilityTracking'], (function a(b, c, d, e, f, g) {
    var h, i;
    if (c.__markCompiled) c.__markCompiled();
    var j = 1;
    h = babelHelpers.inherits(k, c('VisibilityTracking'));
    i = h && h.prototype;
    k.prototype.extraInit = function() {
        'use strict';
        this.impressionTrackers = {};
    };
    k.prototype.getDataFromConfig = function(l) {
        'use strict';
        i.getDataFromConfig.call(this, l);
        this.doHeatmapLogging = l.doHeatmapLogging;
        this.heatmapLoggingDurationMS = l.heatmapLoggingDurationMS;
        l.impressionURL = l.impressionURL !== undefined ? l.impressionURL : '/xti.php';
        l.nonviewableEnabled = l.nonviewableEnabled !== undefined ? l.nonviewableEnabled : false;
    };
    k.prototype.getImpressionTracking = function(l) {
        'use strict';
        var m = this.getElementID(l),
            n = babelHelpers['extends']({}, this.getConfigFromElement(l), this.config),
            o = this.impressionTrackers[m];
        if (!o) {
            o = new(c('ViewableImpressionTracker'))(m, l, n);
            this.impressionTrackers[m] = o;
            if (this.doHeatmapLogging) c('ViewableImpressionHeatmapLogger').logFromViewableImpressionTracker(o, this.heatmapLoggingDurationMS);
            if (n.should_log_full_views) c('FullViewLogger').logFromViewableImpressionTracker(o);
        }
        return o;
    };
    k.prototype.handleEvent = function(l, event) {
        'use strict';
        var m = this.getImpressionTracking(l);
        if (!m) return;
        if (event.name === c('VisibilityTracking').EVENT.VISIBLE) {
            m.onVisible();
            if (!this.visibleElementInfo[m.getID()]) this.visibleElementInfo[m.getID()] = {
                elem: l
            };
        } else if (event.name === c('VisibilityTracking').EVENT.HIDDEN)
            if (event.cause === c('VisibilityTracking').CAUSE.DEFAULT) {
                m.onHidden();
                delete this.visibleElementInfo[m.getID()];
            } else if (event.cause === c('VisibilityTracking').CAUSE.REMOVED) {
            m.onRemoved();
            delete this.visibleElementInfo[m.getID()];
            delete this.impressionTrackers[m.getID()];
        }
    };
    k.prototype.getConfigFromElement = function(l) {
        'use strict';
        return JSON.parse(c('DataAttributeUtils').getDataAttribute(l, 'data-xt-vimp'));
    };
    k.prototype.getElementID = function(l) {
        'use strict';
        if (!l.getAttribute('id')) l.setAttribute('id', 'xt_uniq_' + j++);
        return l.getAttribute('id');
    };

    function k() {
        'use strict';
        h.apply(this, arguments);
    }
    f.exports = k;
}), null);
__d('ViewableImpressionTracking', ['Arbiter', 'DesktopHscrollUnitEventConstants', 'ErrorUtils', 'LitestandMessages', 'Run', 'ViewableImpressionEventHandler', 'ViewableImpressionConfig'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        init: function i() {
            if (c('ViewableImpressionEventHandler').instance === undefined) {
                c('ViewableImpressionEventHandler').instance = new(c('ViewableImpressionEventHandler'))(c('ViewableImpressionConfig'));
                c('ViewableImpressionEventHandler').instance.listeners.addSubscriptions(c('Arbiter').subscribe([c('LitestandMessages').STORIES_INSERTED, 'AdsRefreshHandler/AdsLoaded', 'MPPInsights/ChartView', 'PhotoSnowliftAds/displayUnits', 'WebMessengerAdsControl/adjustAds', c('DesktopHscrollUnitEventConstants').HSCROLL_ITEM_INSERTED_EVENT, 'WebVideoChannelAds/AdsLoaded', 'CommercialBreak/AdsLoaded'], c('ErrorUtils').guard(function() {
                    c('ViewableImpressionEventHandler').instance.refreshAndFireEvent();
                }, 'ViewableImpressionTracking')));
            }
            c('Run').onLoad(function() {
                c('ViewableImpressionEventHandler').instance.refreshAndFireEvent();
            });
        }
    };
    f.exports = h;
}), null);
__d('SelectorDeprecated', ['Arbiter', 'Button', 'ContextualLayer', 'CSS', 'DataStore', 'DOM', 'Event', 'Focus', 'HTML', 'Keys', 'MenuDeprecated', 'Parent', 'Style', 'Toggler', 'TooltipData', 'URI', 'Vector', 'arrayContains', 'emptyFunction', 'getDocumentScrollElement'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h, i, j = [],
        k;

    function l(w) {
        return c('Parent').byClass(w, 'uiSelector');
    }

    function m(w) {
        return c('Parent').byClass(w, 'uiSelectorButton');
    }

    function n() {
        if (!i) {
            i = new(c('ContextualLayer'))({
                position: 'below'
            }, c('DOM').create('div'));
            c('CSS').addClass(i.getRoot(), 'uiSelectorContextualLayer');
        }
        return i;
    }

    function o(w) {
        return c('DOM').scry(w, 'select')[0];
    }

    function p(w) {
        return c('DOM').find(w, 'div.uiSelectorMenuWrapper');
    }
    var q = function w() {
        q = c('emptyFunction');
        c('MenuDeprecated').subscribe('select', function(x, y) {
            if (!h || !y || y.menu !== v.getSelectorMenu(h)) return;
            var z = r(h),
                aa = s(y.item);
            if (aa) {
                var ba = h,
                    ca = v.isOptionSelected(y.item),
                    da = v.inform('select', {
                        selector: ba,
                        option: y.item,
                        clone: k
                    });
                if (da === false) return;
                if (z || !ca) {
                    v.setSelected(ba, v.getOptionValue(y.item), !ca);
                    v.inform('toggle', {
                        selector: ba,
                        option: y.item
                    });
                    v.inform('change', {
                        selector: ba
                    });
                    c('Arbiter').inform('Form/change', {
                        node: ba
                    });
                    if (t(ba)) c('DataStore').set(ba, 'dirty', true);
                }
            }
            if (!z || !aa) h && v.toggle(h);
        });
    };

    function r(w) {
        return !!w.getAttribute('data-multiple');
    }

    function s(w) {
        return c('CSS').hasClass(w, 'uiSelectorOption');
    }

    function t(w) {
        return !!w.getAttribute('data-autosubmit');
    }
    var u = function w() {
        u = c('emptyFunction');
        var x = {
            keydown: function y(event) {
                var z = event.getTarget();
                if (c('DOM').isInputNode(z)) return;
                switch (c('Event').getKeyCode(event)) {
                    case c('Keys').DOWN:
                    case c('Keys').SPACE:
                    case c('Keys').UP:
                        if (m(z)) {
                            var aa = l(z);
                            v.toggle(aa);
                            return false;
                        }
                        break;
                    case c('Keys').ESC:
                        if (h) {
                            var ba = v.getSelectorButton(h);
                            v.toggle(h);
                            ba && c('Focus').set(ba);
                            return false;
                        }
                        break;
                }
            },
            mouseover: function y(event) {
                var z = c('Parent').byAttribute(event.getTarget(), 'ajaxify');
                if (z && c('CSS').hasClass(z, 'uiSelectorButton')) v.loadMenu(l(z));
            }
        };
        c('Event').listen(document.body, x);
    };
    c('Toggler').subscribe(['show', 'hide'], function(w, x) {
        var y = l(x.getActive());
        if (y) {
            u();
            q();
            var z = v.getSelectorButton(y),
                aa = v.getSelectorMenu(y),
                ba = w === 'show';
            z.setAttribute('aria-expanded', ba ? 'true' : 'false');
            if (ba) {
                h = y;
                if (c('CSS').hasClass(z, 'uiButtonDisabled')) {
                    v.setEnabled(y, false);
                    return false;
                }
                aa = aa || v.loadMenu(y);
                var ca = c('Style').getScrollParent(y),
                    da = ca !== window && ca !== c('getDocumentScrollElement')();
                if (da || c('CSS').hasClass(y, 'uiSelectorUseLayer')) {
                    if (da) j.push(c('Event').listen(ca, 'scroll', function() {
                        x.hide();
                    }));
                    k = c('DOM').create('div', {
                        className: y.className
                    });
                    c('CSS').addClass(k, 'invisible_elem');
                    c('Vector').getElementDimensions(y).setElementDimensions(k);
                    c('DOM').replace(y, k);
                    var ea = c('CSS').hasClass(y, 'uiSelectorRight'),
                        fa = c('CSS').hasClass(y, 'uiSelectorBottomUp');
                    n().setContext(k).setContent(y).setPosition(fa ? 'above' : 'below').setAlignment(ea ? 'right' : 'left').show();
                }
                c('MenuDeprecated').register(aa);
                var ga = c('MenuDeprecated').getCheckedItems(aa);
                if (!ga.length) ga = c('MenuDeprecated').getEnabledItems(aa);
                if (ga.length) c('MenuDeprecated').focusItem(ga[0]);
            } else {
                h = null;
                if (k) {
                    while (j.length) j.pop().remove();
                    c('DOM').replace(k, y);
                    n().hide();
                    k = null;
                }
                aa && c('MenuDeprecated').unregister(aa);
                if (t(y) && c('DataStore').get(y, 'dirty')) {
                    var ha = c('DOM').scry(y, 'input.submitButton')[0];
                    ha && ha.click();
                    c('DataStore').remove(y, 'dirty');
                }
            }
            c('CSS').conditionClass(v.getSelectorButton(y), 'selected', ba);
            v.inform(ba ? 'open' : 'close', {
                selector: y,
                clone: k
            });
        }
    });
    var v = Object.assign(new(c('Arbiter'))(), {
        attachMenu: function w(x, y, z) {
            x = l(x);
            if (x) {
                h && c('MenuDeprecated').unregister(v.getSelectorMenu(h));
                c('DOM').setContent(p(x), y);
                h && c('MenuDeprecated').register(v.getSelectorMenu(x));
                k && n().updatePosition();
                if (z) {
                    var aa = x.getAttribute('data-name');
                    aa && z.setAttribute('name', aa);
                    if (!r(x)) z.setAttribute('multiple', false);
                    var ba = o(x);
                    if (ba) {
                        c('DOM').replace(ba, z);
                    } else c('DOM').insertAfter(x.firstChild, z);
                }
                return true;
            }
        },
        getOption: function w(x, y) {
            var z = v.getOptions(x),
                aa = z.length;
            while (aa--)
                if (y === v.getOptionValue(z[aa])) return z[aa];
            return null;
        },
        getOptions: function w(x) {
            var y = c('MenuDeprecated').getItems(v.getSelectorMenu(x));
            return y.filter(s);
        },
        getEnabledOptions: function w(x) {
            var y = c('MenuDeprecated').getEnabledItems(v.getSelectorMenu(x));
            return y.filter(s);
        },
        getSelectedOptions: function w(x) {
            return c('MenuDeprecated').getCheckedItems(v.getSelectorMenu(x));
        },
        getOptionText: function w(x) {
            return c('MenuDeprecated').getItemLabel(x);
        },
        getOptionValue: function w(x) {
            var y = l(x),
                z = o(y),
                aa = v.getOptions(y).indexOf(x);
            return aa >= 0 ? z.options[aa + 1].value : '';
        },
        getSelectorButton: function w(x) {
            return c('DOM').find(x, 'a.uiSelectorButton');
        },
        getSelectorMenu: function w(x) {
            return c('DOM').scry(x, 'div.uiSelectorMenu')[0];
        },
        getValue: function w(x) {
            var y = o(x);
            if (!y) return null;
            if (!r(x)) return y.value;
            var z = [],
                aa = y.options;
            for (var ba = 1, ca = aa.length; ba < ca; ba++)
                if (aa[ba].selected) z.push(aa[ba].value);
            return z;
        },
        isOptionSelected: function w(x) {
            return c('MenuDeprecated').isItemChecked(x);
        },
        listen: function w(x, y, z) {
            return this.subscribe(y, function(aa, ba) {
                if (ba.selector === x) return z(ba, aa);
            });
        },
        loadMenu: function w(x, y) {
            var z = v.getSelectorMenu(x);
            if (!z) {
                var aa = v.getSelectorButton(x),
                    ba = aa.getAttribute('ajaxify');
                if (ba) {
                    e(['AsyncRequest'], function(da) {
                        var ea = new(c('URI'))(ba),
                            fa = ea.getQueryData();
                        ea.setQueryData({});
                        var ga = new da(ea).setData(fa).setNectarModuleDataSafe(aa).setRelativeTo(aa);
                        y && ga.setFinallyHandler(function() {
                            setTimeout(y, 0);
                        });
                        ga.send();
                    }.bind(this));
                    var ca = c('HTML')('<div class="uiSelectorMenuWrapper uiToggleFlyout">' + '<div class="uiMenu uiSelectorMenu loading">' + '<ul class="uiMenuInner">' + '<li><span></span></li>' + '</ul>' + '</div>' + '</div>');
                    c('DOM').appendContent(aa.parentNode, ca);
                    z = v.getSelectorMenu(x);
                    aa.removeAttribute('onmouseover');
                }
            } else y && y();
            return z;
        },
        setButtonLabel: function w(x, y) {
            var z = v.getSelectorButton(x),
                aa = parseInt(z.getAttribute('data-length'), 10);
            y = y || z.getAttribute('data-label') || '';
            c('Button').setLabel(z, y);
            if (typeof y === 'string')
                if (aa && y.length > aa) {
                    z.setAttribute('title', y);
                } else z.removeAttribute('title');
        },
        setButtonTooltip: function w(x, y) {
            var z = v.getSelectorButton(x),
                aa = c('Parent').byTag(z, 'a');
            aa && c('TooltipData').set(aa, y || z.getAttribute('data-tooltip') || '');
        },
        setEnabled: function w(x, y) {
            if (!y && h && l(x) === h) v.toggle(x);
            c('Button').setEnabled(v.getSelectorButton(x), y);
        },
        setOptionEnabled: function w(x, y) {
            c('MenuDeprecated').setItemEnabled(x, y);
        },
        setSelected: function w(x, y, z) {
            z = z !== false;
            var aa = v.getOption(x, y);
            if (!aa) return;
            var ba = v.isOptionSelected(aa);
            if (z !== ba) {
                if (!r(x) && !ba) {
                    var ca = v.getSelectedOptions(x)[0];
                    ca && c('MenuDeprecated').toggleItem(ca);
                }
                c('MenuDeprecated').toggleItem(aa);
            }
            v.updateSelector(x);
        },
        toggle: function w(x) {
            c('Toggler').toggle(c('DOM').scry(l(x), 'div.wrap')[0]);
        },
        updateSelector: function w(x) {
            var y = v.getOptions(x),
                z = v.getSelectedOptions(x),
                aa = o(x).options,
                ba = [],
                ca = [];
            for (var da = 0, ea = y.length; da < ea; da++) {
                var fa = c('arrayContains')(z, y[da]);
                aa[da + 1].selected = fa;
                if (fa) {
                    var ga = v.getOptionText(y[da]);
                    ba.push(ga);
                    ca.push(y[da].getAttribute('data-tooltip') || ga);
                }
            }
            aa[0].selected = !z.length;
            var ha = c('CSS').hasClass(x, 'uiSelectorDynamicLabel'),
                ia = c('CSS').hasClass(x, 'uiSelectorDynamicTooltip');
            if (ha || ia) {
                var ja = '';
                if (r(x)) {
                    var ka = v.getSelectorButton(x);
                    ja = ka.getAttribute('data-delimiter') || ', ';
                }
                ba = ba.join(ja);
                ca = ca.join(ja);
                ha && v.setButtonLabel(x, ba);
                ia && v.setButtonTooltip(x, ca);
            }
        }
    });
    f.exports = v;
}), null);
__d('EgoUnitSlideInsert', ['csx', 'cx', 'Animation', 'CSS', 'DataStore', 'DOM', 'Ease', 'Event', 'Parent', 'TidyArbiterMixin', 'tidyEvent'], (function a(b, c, d, e, f, g, h, i) {
    if (c.__markCompiled) c.__markCompiled();
    var j = 'sliding',
        k = "EgoSlider/End",
        l = babelHelpers['extends']({
            isSliding: function m(n) {
                return c('DataStore').get(n, j);
            },
            runAfterSlide: function m(n, o) {
                var p = c('tidyEvent')(l.subscribe(k, function(q, r) {
                    if (r === n) {
                        p && p.unsubscribe();
                        o();
                    }
                }));
            },
            registerSlide: function m(n, o) {
                c('Event').listen(n, 'click', function(p) {
                    var q = c('Parent').bySelector(p.getTarget(), "._5cl_");
                    if (!q) return;
                    var r = c('Parent').byClass(n, 'ego_unit'),
                        s = 0,
                        t = c('Parent').byClass(r, 'ego_unit_container'),
                        u = c('DOM').scry(t, '.ego_unit')[0];
                    if (u === r)
                        if (r.nextSibling) {
                            r.nextSibling.style.paddingTop = '0px';
                            r.nextSibling.style.borderTop = '0px';
                        }
                    c('CSS').addClass(r, "_5cl-");
                    c('DataStore').set(r, j, true);
                    new(c('Animation'))(r).to('height', 0).to('padding-top', s).to('padding-bottom', 0).to('margin', 0).from('opacity', 1).to('opacity', 0).ease(c('Ease').circOut).duration(300).checkpoint(1, function() {
                        c('DOM').appendContent(t, r);
                        c('DOM').prependContent(r, o);
                        c('DataStore').remove(r, j);
                    }).to('height', 12).to('opacity', 1).to('margin-bottom', 10).duration(0).checkpoint(2, function() {
                        l.inform(k, r);
                    }).go();
                });
            }
        }, c('TidyArbiterMixin'));
    f.exports = l;
}), null);
__d('NetEgo', ['csx', 'Animation', 'Arbiter', 'CSS', 'DOM', 'EgoUnitSlideInsert', 'PageLikeConstants', 'Parent', 'URI', 'ge'], (function a(b, c, d, e, f, g, h) {
    if (c.__markCompiled) c.__markCompiled();
    var i = {
        setup: function j(k) {
            c('Arbiter').subscribe([c('PageLikeConstants').LIKED, 'FriendRequest/sending'], function(l, m) {
                if (k == m.profile_id && m.origin == 'hovercard' || k == m.uid) {
                    var n = c('ge')(document.body, '.ego_unit_container');
                    if (n) {
                        var o = c('DOM').scry(n, '.ego_unit'),
                            p = o.length;
                        for (var q = 0; q < p; q++) {
                            var r = o[q].getAttribute('data-ego-fbid');
                            if (r == k) {
                                var s = c('DOM').scry(o[q], '.ego_action a')[0];
                                if (s) s.click();
                                break;
                            }
                        }
                    }
                }
            });
        },
        updateXids: function j(k, l) {
            if (k.length == 0 && l.length == 0) return;
            var m = function w(x) {
                    return function(y) {
                        var z = y.getAttribute(x);
                        if (!z) return false;
                        var aa = new(c('URI'))(z).getQueryData();
                        return !!aa.xids;
                    };
                },
                n = c('DOM').scry(document.body, '.ego_section a');
            n = n.filter(m('ajaxify'));
            if (n.length == 0) return;
            var o = new(c('URI'))(n[0].getAttribute('ajaxify')),
                p = o.getQueryData();
            if (!p.xids) return;
            var q = null;
            try {
                q = JSON.parse(p.xids);
            } catch (r) {
                return;
            }
            for (var s = 0; s < l.length; ++s) q[l[s]] = 1;
            var t = JSON.stringify(q),
                u = function w(x, y) {
                    o = new(c('URI'))(x.getAttribute(y));
                    p = o.getQueryData();
                    p.xids = t;
                    o.setQueryData(p);
                    x.setAttribute(y, o.toString());
                };
            for (s = 0; s < n.length; ++s) u(n[s], 'ajaxify');
            var v = c('DOM').scry(document.body, '.ego_unit form');
            v = v.filter(m('action'));
            for (s = 0; s < v.length; ++s) u(v[s], 'action');
        },
        replaceUnit: function j(k, l, m, n) {
            i.replaceUnitCheckParent(k, l, m, n, '');
        },
        replaceUnitCheckParent: function j(k, l, m, n, o) {
            var p = c('Parent').byClass(k, 'ego_unit_container');
            if (p && c('EgoUnitSlideInsert').isSliding(k)) {
                var q = c('DOM').appendContent(p, l);
                q.forEach(c('CSS').hide);
                c('EgoUnitSlideInsert').runAfterSlide(k, i._replaceUnitElement.bind(null, k, q, o));
            } else i._replaceUnit(k, l, m, n, o);
        },
        _replaceUnit: function j(k, l, m, n, o) {
            var p = c('DOM').insertAfter(k, l);
            p.forEach(c('CSS').hide);
            if (n !== undefined && n !== null) {
                setTimeout(function() {
                    i._replaceUnitFadeout(k, p, m, o);
                }, n);
            } else i._replaceUnitFadeout(k, p, m, o);
        },
        _replaceUnitFadeout: function j(k, l, m, n) {
            if (m) {
                new(c('Animation'))(k).from('opacity', 1).to('opacity', 0).duration(m).checkpoint(1, function() {
                    i._replaceUnitElement(k, l, n);
                }).go();
            } else i._replaceUnitElement(k, l, n);
        },
        _replaceUnitElement: function j(k, l, m) {
            var n = c('CSS').hasClass(k, 'ego_unit') ? k.parentNode : null;
            if (n && n.tagName === 'LI') n = c('DOM').scry(k.parentNode, '^ul')[0];
            c('DOM').remove(k);
            if (l.length) l.forEach(c('CSS').show);
            c('Arbiter').inform('netego_replacedUnit', {
                serializedData: m,
                numUnitsRemained: n.childNodes.length
            });
            i.clearHeader();
        },
        clearHeader: function j() {
            var k = c('DOM').scry(document.body, '.ego_column'),
                l = [];
            for (var m = 0; m < k.length; ++m) l = l.concat(c('DOM').scry(k[m], '.uiHeader'));
            for (m = 0; m < l.length; ++m) {
                var n = l[m].nextSibling,
                    o = c('DOM').find(n, "._2xq");
                if (!o) o = n;
                if (!o || o.childNodes.length === 0) {
                    c('DOM').remove(l[m]);
                } else if (o.childNodes.length === 1) {
                    var p = o.childNodes[0];
                    if (c('CSS').hasClass(p, 'ego_appended_units') && p.childNodes.length === 0) c('DOM').remove(l[m]);
                }
            }
        }
    };
    f.exports = i;
}), null);
__d('AdBlockerDetectorLogging', ['Banzai', 'DataAttributeUtils', 'ErrorUtils', 'Parent', 'Run', 'getElementPosition'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = 1,
        i = 2,
        j = 'swank',
        k = {
            doAdBlockCheck: function l(m, n) {
                c('Run').onAfterLoad(function() {
                    c('ErrorUtils').applyWithGuard(function() {
                        this._doAdBlockImgCheck(m, n.token || n, 0);
                    }.bind(this), this);
                }.bind(this));
            },
            gatherImageHiddenStyleDebugData: function l(m, n) {
                c('Run').onAfterLoad(function() {
                    c('ErrorUtils').applyWithGuard(function() {
                        this._gatherImageHiddenStyleDebugData(m, n.token || n);
                    }.bind(this), this);
                }.bind(this));
            },
            _gatherImageHiddenStyleDebugData: function l(m, n) {
                if (!n || !m) return;
                var o = m.querySelectorAll('img'),
                    p = [];
                if (o.length > 0)
                    for (var q = 0; q < o.length; q++) {
                        var r = o[q],
                            s = c('getElementPosition')(r);
                        if (window.getComputedStyle(r).visibility === 'hidden') {
                            var t = {
                                w: s.width,
                                h: s.height,
                                ii: q,
                                ic: o.length
                            };
                            p.push(t);
                        }
                    }
                if (p.length > 0) {
                    var u = m,
                        v = 0;
                    while (u !== null) {
                        if (v++ > 50) break;
                        if (u.classList.contains('hidden_elem') || u.classList.contains('holdoutAdStory') || u.classList.contains('ego_ads_holdout')) return;
                        u = u.parentElement;
                    }
                    for (q = 0; q < p.length; q++) c('Banzai').post('xtrackable:' + j, {
                        token: n,
                        event_code: 3,
                        debug: p[q]
                    });
                }
            },
            checkImageLoadStatus: function l(m) {
                var n = this;
                c('ErrorUtils').applyWithGuard(function() {
                    setTimeout(function() {
                        n._checkImageLoadStatus(m);
                    }, 10000);
                }, n);
            },
            _doAdBlockImgCheck: function l(m, n, o) {
                if (!n || !m) return;
                var p = m.querySelectorAll('img');
                if (p.length > 0) {
                    var q = false,
                        r = 0;
                    for (var s = 0; s < p.length; s++) {
                        var t = p[s],
                            u = c('getElementPosition')(t);
                        if (u.width > 0 || u.height > 0) {
                            if (window.getComputedStyle(t).visibility === 'hidden') r++;
                            q = true;
                        }
                    }
                    if (!q || r > 0) {
                        var v = m,
                            w = 0;
                        while (v !== null) {
                            if (w++ > 50) break;
                            if (v.classList.contains('hidden_elem') || v.classList.contains('holdoutAdStory') || v.classList.contains('ego_ads_holdout')) return;
                            v = v.parentElement;
                        }
                        if (r > 0) c('Banzai').post('xtrackable:' + j, {
                            token: n,
                            event_code: 2
                        });
                        if (!q) c('Banzai').post('xtrackable:' + j, {
                            token: n
                        });
                    }
                } else if (p.length === 0 && n.startsWith('7.'))
                    if (++o < 5) setTimeout(function() {
                        this._doAdBlockImgCheck(m, n, o);
                    }.bind(this).bind(this), 2500);
            },
            _checkImageLoadStatus: function l(m) {
                var n = m.querySelector('img');
                if (n && (!n.complete || !n.naturalWidth)) {
                    var o = this._findParentImpressionToken(m);
                    c('Banzai').post('xtrackable:' + j, {
                        token: o,
                        event_code: 1
                    });
                }
            },
            _findParentImpressionToken: function l(m) {
                var n = c('DataAttributeUtils').getParentByAttributeOrDataStoreKey(m, 'data-xt', 'data-xt');
                return n ? c('DataAttributeUtils').getDataAttribute(n, 'data-xt') : null;
            },
            doBrowserExtensionCheck: function l(m, n) {
                try {
                    var p = document.getElementsByTagName('head')[0],
                        q = document.documentElement.shadowRoot,
                        r = [];
                    if (q) r = Array.prototype.slice.call(q.querySelectorAll('style'));
                    var s = Array.prototype.slice.call(p.querySelectorAll('style')).filter(function(u) {
                            return u && u.textContent.length == 0;
                        }),
                        t = {};
                    t[h] = r.length > 0;
                    t[i] = s.length > 0;
                    if (m) r.forEach(function(u) {
                        u.disabled = true;
                    });
                    if (n) s.forEach(function(u) {
                        u.disabled = true;
                    });
                    c('Banzai').post('search_check', t);
                } catch (o) {}
            }
        };
    f.exports = k;
}), null);