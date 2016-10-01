if (self.CavalryLogger) {
    CavalryLogger.start_js(["W7JZ8"]);
}

__d("PagePluginActions", [], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = {
        PAGE_AVATAR: "page_avatar",
        PAGE_CTA: "page_cta",
        PAGE_LIKE: "page_like",
        PAGE_PERMALINK: "page_permalink",
        PAGE_SHARE: "page_share",
        PAGE_UNLIKE: "page_unlike"
    };
}), null);
__d("PagePluginActionTypes", [], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = {
        CLICK: "click"
    };
}), null);
__d("PluginConnectButtonType", [], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = {
        BLUE_BASE: 1,
        WHITE_BASE: 2
    };
}), null);
__d("PluginShareLogTypes", [], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = {
        IMPRESSION: "impression",
        CLICK: "click"
    };
}), null);
__d('PlatformDialog', ['cx', 'DOMEventListener', 'DOMEvent', 'CSS'], (function a(b, c, d, e, f, g, h) {
    if (c.__markCompiled) c.__markCompiled();
    var i;
    j.getInstance = function() {
        'use strict';
        return i;
    };

    function j(k, l, m) {
        'use strict';
        i = this;
        this.$PlatformDialog1 = k;
        this.$PlatformDialog2 = l;
        this.$PlatformDialog3 = false;
        c('DOMEventListener').add(this.$PlatformDialog1, 'submit', function(n) {
            if (this.$PlatformDialog3) {
                new(c('DOMEvent'))(n).kill();
                return;
            }
            this.$PlatformDialog3 = true;
            if (m) c('CSS').addClass(k, "_32qa");
        }.bind(this));
    }
    j.prototype.getForm = function() {
        'use strict';
        return this.$PlatformDialog1;
    };
    j.prototype.getDisplay = function() {
        'use strict';
        return this.$PlatformDialog2;
    };
    j.prototype.hasBeenSubmitted = function() {
        'use strict';
        return this.$PlatformDialog3;
    };
    j.RESPONSE = 'platform/dialog/response';
    f.exports = j;
}), null);
__d('PluginLoggedOutUserTypedLogger', ['Banzai', 'GeneratedLoggerUtils', 'nullthrows'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();

    function h() {
        this.clear();
    }
    h.prototype.log = function() {
        c('GeneratedLoggerUtils').log('logger:PluginLoggedOutUserLoggerConfig', this.$PluginLoggedOutUserTypedLogger1, c('Banzai').BASIC);
    };
    h.prototype.logVital = function() {
        c('GeneratedLoggerUtils').log('logger:PluginLoggedOutUserLoggerConfig', this.$PluginLoggedOutUserTypedLogger1, c('Banzai').VITAL);
    };
    h.prototype.clear = function() {
        this.$PluginLoggedOutUserTypedLogger1 = {};
        return this;
    };
    h.prototype.updateData = function(j) {
        this.$PluginLoggedOutUserTypedLogger1 = babelHelpers['extends']({}, this.$PluginLoggedOutUserTypedLogger1, j);
        return this;
    };
    h.prototype.setHref = function(j) {
        this.$PluginLoggedOutUserTypedLogger1.href = j;
        return this;
    };
    h.prototype.setIsSDK = function(j) {
        this.$PluginLoggedOutUserTypedLogger1.is_sdk = j;
        return this;
    };
    h.prototype.setPluginAppID = function(j) {
        this.$PluginLoggedOutUserTypedLogger1.plugin_app_id = j;
        return this;
    };
    h.prototype.setPluginName = function(j) {
        this.$PluginLoggedOutUserTypedLogger1.plugin_name = j;
        return this;
    };
    h.prototype.setRefererURL = function(j) {
        this.$PluginLoggedOutUserTypedLogger1.referer_url = j;
        return this;
    };
    h.prototype.setVC = function(j) {
        this.$PluginLoggedOutUserTypedLogger1.vc = j;
        return this;
    };
    h.prototype.updateExtraData = function(j) {
        j = c('nullthrows')(c('GeneratedLoggerUtils').serializeMap(j));
        c('GeneratedLoggerUtils').checkExtraDataFieldNames(j, i);
        this.$PluginLoggedOutUserTypedLogger1 = babelHelpers['extends']({}, this.$PluginLoggedOutUserTypedLogger1, j);
        return this;
    };
    h.prototype.addToExtraData = function(j, k) {
        var l = {};
        l[j] = k;
        return this.updateExtraData(l);
    };
    var i = {
        href: true,
        is_sdk: true,
        plugin_app_id: true,
        plugin_name: true,
        referer_url: true,
        vc: true
    };
    f.exports = h;
}), null);
__d('ArbiterFrame', [], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        inform: function i(j, k, l) {
            var m = parent.frames,
                n = m.length,
                o;
            k.crossFrame = true;
            for (var p = 0; p < n; p++) {
                o = m[p];
                try {
                    if (!o || o == window) continue;
                    if (o.require) {
                        o.require('Arbiter').inform(j, k, l);
                    } else if (o.ServerJSAsyncLoader) o.ServerJSAsyncLoader.wakeUp(j, k, l);
                } catch (q) {}
            }
        }
    };
    f.exports = h;
}), null);
__d('FormSubmit', ['AsyncRequest', 'AsyncResponse', 'CSS', 'DOMQuery', 'Event', 'Form', 'Parent', 'trackReferrer'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        send: function i(j, k) {
            var l = (c('Form').getAttribute(j, 'method') || 'GET').toUpperCase();
            k = c('Parent').byTag(k, 'button') || k;
            var m = c('Parent').byClass(k, 'stat_elem') || j;
            if (c('CSS').hasClass(m, 'async_saving')) return null;
            if (k && (k.form !== j || k.nodeName != 'INPUT' && k.nodeName != 'BUTTON' || k.type != 'submit')) {
                var n = c('DOMQuery').scry(j, '.enter_submit_target')[0];
                n && (k = n);
            }
            var o = c('Form').serialize(j, k);
            c('Form').setDisabled(j, true);
            var p = c('Form').getAttribute(j, 'ajaxify') || c('Form').getAttribute(j, 'action'),
                q = !!c('Form').getAttribute(j, 'data-cors');
            c('trackReferrer')(j, p);
            var r = new(c('AsyncRequest'))().setAllowCrossOrigin(q).setURI(p).setData(o).setNectarModuleDataSafe(j).setReadOnly(l == 'GET').setMethod(l).setRelativeTo(j).setStatusElement(m).setInitialHandler(c('Form').setDisabled.bind(null, j, false)).setHandler(function(s) {
                c('Event').fire(j, 'success', {
                    response: s
                });
            }).setErrorHandler(function(s) {
                if (c('Event').fire(j, 'error', {
                        response: s
                    }) !== false) c('AsyncResponse').defaultErrorHandler(s);
            }).setFinallyHandler(c('Form').setDisabled.bind(null, j, false));
            r.send();
            return r;
        }
    };
    f.exports = h;
}), null);
__d('Popup', [], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        open: function i(j, k, l, m) {
            var n = document.body,
                o = 'screenX' in window ? window.screenX : window.screenLeft,
                p = 'screenY' in window ? window.screenY : window.screenTop,
                q = 'outerWidth' in window ? window.outerWidth : n.clientWidth,
                r = 'outerHeight' in window ? window.outerHeight : n.clientHeight - 22,
                s = Math.floor(o + (q - k) / 2),
                t = Math.floor(p + (r - l) / 2.5),
                u = ['width=' + k, 'height=' + l, 'left=' + s, 'top=' + t, 'scrollbars'];
            return window.open(j, m || '_blank', u.join(','));
        }
    };
    f.exports = h;
}), null);
__d('PopupLink', ['DOMEvent', 'DOMEventListener', 'Popup'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        listen: function i(j, k, l) {
            c('DOMEventListener').add(j, 'click', function(m) {
                new(c('DOMEvent'))(m).kill();
                c('Popup').open(j.href, k, l);
            });
        }
    };
    f.exports = h;
}), null);
__d('PopupWindow', ['DOMDimensions', 'DOMQuery', 'Layer', 'Popup', 'getViewportDimensions'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        _opts: {
            allowShrink: true,
            strategy: 'vector',
            timeout: 100,
            widthElement: null
        },
        init: function i(j) {
            Object.assign(h._opts, j);
            setInterval(h._resizeCheck, h._opts.timeout);
        },
        _resizeCheck: function i() {
            var j = c('getViewportDimensions')(),
                k = h._getDocumentSize(),
                l = c('Layer').getTopmostLayer();
            if (l) {
                var m = l.getRoot().firstChild,
                    n = c('DOMDimensions').getElementDimensions(m);
                n.height += c('DOMDimensions').measureElementBox(m, 'height', true, true, true);
                n.width += c('DOMDimensions').measureElementBox(m, 'width', true, true, true);
                k.height = Math.max(k.height, n.height);
                k.width = Math.max(k.width, n.width);
            }
            var o = k.height - j.height,
                p = k.width - j.width;
            if (p < 0 && !h._opts.widthElement) p = 0;
            p = p > 1 ? p : 0;
            if (!h._opts.allowShrink && o < 0) o = 0;
            if (o || p) try {
                window.console && window.console.firebug;
                window.resizeBy(p, o);
                if (p) window.moveBy(p / -2, 0);
            } catch (q) {}
        },
        _getDocumentSize: function i() {
            var j = c('DOMDimensions').getDocumentDimensions();
            if (h._opts.strategy === 'offsetHeight') j.height = document.body.offsetHeight;
            if (h._opts.widthElement) {
                var k = c('DOMQuery').scry(document.body, h._opts.widthElement)[0];
                if (k) j.width = c('DOMDimensions').getElementDimensions(k).width;
            }
            var l = b.Dialog;
            if (l && l.max_bottom && l.max_bottom > j.height) j.height = l.max_bottom;
            return j;
        },
        open: function i(j, k, l, m) {
            return c('Popup').open(j, l, k, m);
        }
    };
    f.exports = h;
}), null);
__d('Queue', [], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {};

    function i(j) {
        'use strict';
        this._opts = babelHelpers['extends']({
            interval: 0,
            processor: null
        }, j);
        this._queue = [];
        this._stopped = true;
    }
    i.prototype._dispatch = function(j) {
        'use strict';
        if (this._stopped || this._queue.length === 0) return;
        if (!this._opts.processor) {
            this._stopped = true;
            throw new Error('No processor available');
        }
        if (this._opts.interval) {
            this._opts.processor.call(this, this._queue.shift());
            this._timeout = setTimeout(this._dispatch.bind(this), this._opts.interval);
        } else
            while (this._queue.length) this._opts.processor.call(this, this._queue.shift());
    };
    i.prototype.enqueue = function(j) {
        'use strict';
        if (this._opts.processor && !this._stopped) {
            this._opts.processor.call(this, j);
        } else this._queue.push(j);
        return this;
    };
    i.prototype.start = function(j) {
        'use strict';
        if (j) this._opts.processor = j;
        this._stopped = false;
        this._dispatch();
        return this;
    };
    i.prototype.isStarted = function() {
        'use strict';
        return !this._stopped;
    };
    i.prototype.dispatch = function() {
        'use strict';
        this._dispatch(true);
    };
    i.prototype.stop = function(j) {
        'use strict';
        this._stopped = true;
        if (j) clearTimeout(this._timeout);
        return this;
    };
    i.prototype.merge = function(j, k) {
        'use strict';
        this._queue[k ? 'unshift' : 'push'].apply(this._queue, j._queue);
        j._queue = [];
        this._dispatch();
        return this;
    };
    i.prototype.getLength = function() {
        'use strict';
        return this._queue.length;
    };
    i.get = function(j, k) {
        'use strict';
        var l;
        if (j in h) {
            l = h[j];
        } else l = h[j] = new i(k);
        return l;
    };
    i.exists = function(j) {
        'use strict';
        return j in h;
    };
    i.remove = function(j) {
        'use strict';
        return delete h[j];
    };
    f.exports = i;
}), null);
__d('TextInputControl', ['DOMControl', 'Event', 'Input', 'debounce'], (function a(b, c, d, e, f, g) {
    var h, i;
    if (c.__markCompiled) c.__markCompiled();
    h = babelHelpers.inherits(j, c('DOMControl'));
    i = h && h.prototype;

    function j(k) {
        'use strict';
        i.constructor.call(this, k);
        var l = this.getRoot(),
            m = c('debounce')(this.update.bind(this), 0);
        c('Event').listen(l, {
            input: m,
            keydown: m,
            paste: m
        });
    }
    j.prototype.setMaxLength = function(k) {
        'use strict';
        c('Input').setMaxLength(this.getRoot(), k);
        return this;
    };
    j.prototype.getValue = function() {
        'use strict';
        return c('Input').getValue(this.getRoot());
    };
    j.prototype.isEmpty = function() {
        'use strict';
        return c('Input').isEmpty(this.getRoot());
    };
    j.prototype.setValue = function(k) {
        'use strict';
        c('Input').setValue(this.getRoot(), k);
        this.update();
        return this;
    };
    j.prototype.clear = function() {
        'use strict';
        return this.setValue('');
    };
    j.prototype.setPlaceholderText = function(k) {
        'use strict';
        c('Input').setPlaceholder(this.getRoot(), k);
        return this;
    };
    f.exports = j;
}), null);
__d('transferTextStyles', ['Style'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        fontFamily: null,
        fontSize: null,
        fontStyle: null,
        fontWeight: null,
        lineHeight: null,
        wordWrap: null
    };

    function i(j, k) {
        for (var l in h)
            if (h.hasOwnProperty(l)) h[l] = c('Style').get(j, l);
        c('Style').apply(k, h);
    }
    f.exports = i;
}), null);
__d('TextMetrics', ['DOM', 'Style', 'UserAgent', 'transferTextStyles'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(j) {
        var k = j.clientWidth,
            l = c('Style').get(j, '-moz-box-sizing') == 'border-box';
        if (l && c('UserAgent').isBrowser('Firefox < 29')) return k;
        var m = c('Style').getFloat(j, 'paddingLeft') + c('Style').getFloat(j, 'paddingRight');
        return k - m;
    }

    function i(j, k) {
        'use strict';
        this.$TextMetrics1 = j;
        this.$TextMetrics2 = !!k;
        var l = 'textarea',
            m = 'textMetrics';
        if (this.$TextMetrics2) {
            l = 'div';
            m += ' textMetricsInline';
        }
        this.$TextMetrics3 = c('DOM').create(l, {
            className: m
        });
        c('transferTextStyles')(j, this.$TextMetrics3);
        document.body.appendChild(this.$TextMetrics3);
    }
    i.prototype.measure = function(j) {
        'use strict';
        var k = this.$TextMetrics1,
            l = this.$TextMetrics3;
        j = (j || k.value) + '...';
        if (!this.$TextMetrics2) {
            var m = h(k);
            c('Style').set(l, 'width', Math.max(m, 0) + 'px');
        }
        if (k.nodeName === 'TEXTAREA') {
            l.value = j;
        } else c('DOM').setContent(l, j);
        return {
            width: l.scrollWidth,
            height: l.scrollHeight
        };
    };
    i.prototype.destroy = function() {
        'use strict';
        c('DOM').remove(this.$TextMetrics3);
    };
    f.exports = i;
}), null);
__d('TextAreaControl', ['Arbiter', 'ArbiterMixin', 'CSS', 'DOMControl', 'Event', 'Style', 'TextInputControl', 'TextMetrics', 'classWithMixins', 'mixin'], (function a(b, c, d, e, f, g) {
    var h, i;
    if (c.__markCompiled) c.__markCompiled();

    function j(l, m) {
        return c('Style').getFloat(l, m) || 0;
    }
    h = babelHelpers.inherits(k, c('classWithMixins')(c('TextInputControl'), c('mixin')(c('ArbiterMixin'))));
    i = h && h.prototype;

    function k(l) {
        'use strict';
        i.constructor.call(this, l);
        this.autogrow = c('CSS').hasClass(l, 'uiTextareaAutogrow');
        this.autogrowWithPlaceholder = c('CSS').hasClass(l, 'uiTextareaAutogrowWithPlaceholder');
        this.width = null;
        c('Event').listen(l, 'focus', this._handleFocus.bind(this));
    }
    k.prototype.setAutogrow = function(l) {
        'use strict';
        this.autogrow = l;
        return this;
    };
    k.prototype.onupdate = function() {
        'use strict';
        i.onupdate.call(this);
        this.updateHeight();
    };
    k.prototype.updateHeight = function() {
        'use strict';
        if (this.autogrow) {
            var l = this.getRoot();
            if (!this.metrics) this.metrics = new(c('TextMetrics'))(l);
            if (typeof this.initialHeight === 'undefined') {
                this.isBorderBox = c('Style').get(l, 'box-sizing') === 'border-box' || c('Style').get(l, '-moz-box-sizing') === 'border-box' || c('Style').get(l, '-webkit-box-sizing') === 'border-box';
                this.borderBoxOffset = j(l, 'padding-top') + j(l, 'padding-bottom') + j(l, 'border-top-width') + j(l, 'border-bottom-width');
                this.initialHeight = l.offsetHeight - this.borderBoxOffset;
            }
            var m = null;
            if ((!l.value || l.value.length === 0) && this.autogrowWithPlaceholder) {
                m = this.metrics.measure(l.placeholder);
            } else m = this.metrics.measure();
            var n = Math.max(this.initialHeight, m.height);
            if (this.isBorderBox) n += this.borderBoxOffset;
            if (this.maxHeight && n > this.maxHeight) {
                n = this.maxHeight;
                c('Arbiter').inform('maxHeightExceeded', {
                    textArea: l
                });
            }
            if (n !== this.height) {
                this.height = n;
                c('Style').set(l, 'height', n + 'px');
                c('Arbiter').inform('reflow');
                this.inform('resize');
            }
        } else if (this.metrics) {
            this.metrics.destroy();
            this.metrics = null;
        }
    };
    k.prototype.resetHeight = function() {
        'use strict';
        this.height = -1;
        this.update();
    };
    k.prototype.setMaxHeight = function(l) {
        'use strict';
        this.maxHeight = l;
    };
    k.prototype.setAutogrowWithPlaceholder = function(l) {
        'use strict';
        this.autogrowWithPlacedholder = l;
    };
    k.prototype._handleFocus = function() {
        'use strict';
        this.width = null;
    };
    k.getInstance = function(l) {
        'use strict';
        return c('DOMControl').getInstance(l) || new k(l);
    };
    f.exports = k;
}), null);
__d('resolveWindow', [], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(i) {
        var j = window,
            k = i.split('.');
        try {
            for (var m = 0; m < k.length; m++) {
                var n = k[m],
                    o = /^frames\[['"]?([a-zA-Z0-9\-_]+)['"]?\]$/.exec(n);
                if (o) {
                    j = j.frames[o[1]];
                } else if (n === 'opener' || n === 'parent' || n === 'top') {
                    j = j[n];
                } else return null;
            }
        } catch (l) {
            return null;
        }
        return j;
    }
    f.exports = h;
}), null);
__d('XD', ['Arbiter', 'DOM', 'DOMDimensions', 'Log', 'PHPQuerySerializer', 'URI', 'Queue', 'isFacebookURI', 'isInIframe', 'resolveWindow'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = 'fb_xdm_frame_' + location.protocol.replace(':', ''),
        i = {
            _callbacks: [],
            _opts: {
                autoResize: false,
                allowShrink: true,
                channelUrl: null,
                hideOverflow: false,
                resizeTimeout: 1000,
                resizeWidth: false,
                expectResizeAck: false,
                resizeAckTimeout: 6000
            },
            _lastResizeAckId: 0,
            _resizeCount: 0,
            _resizeTimestamp: 0,
            _shrinker: null,
            init: function k(l) {
                this._opts = babelHelpers['extends']({}, this._opts, l);
                if (this._opts.autoResize) this._startResizeMonitor();
                c('Arbiter').subscribe('Connect.Unsafe.resize.ack', function(m, n) {
                    if (!n.id) n.id = this._resizeCount;
                    if (n.id > this._lastResizeAckId) this._lastResizeAckId = n.id;
                }.bind(this));
            },
            getQueue: function k() {
                if (!this._queue) this._queue = new(c('Queue'))();
                return this._queue;
            },
            setChannelUrl: function k(l) {
                this.getQueue().start(function(m) {
                    return this.send(m, l);
                }.bind(this));
            },
            send: function k(l, m) {
                m = m || this._opts.channelUrl;
                if (!m) {
                    this.getQueue().enqueue(l);
                    return;
                }
                var n = {},
                    o = new(c('URI'))(m);
                Object.assign(n, l, c('PHPQuerySerializer').deserialize(o.getFragment()));
                var p = new(c('URI'))(n.origin).getOrigin(),
                    q = c('resolveWindow')(n.relation.replace(/^parent\./, '')),
                    r = 50,
                    s = function t() {
                        var u = q.frames[h];
                        try {
                            u.proxyMessage(c('PHPQuerySerializer').serialize(n), p);
                        } catch (v) {
                            if (--r) {
                                setTimeout(t, 100);
                            } else c('Log').warn('No such frame "' + h + '" to proxyMessage to');
                        }
                    };
                s();
            },
            _computeSize: function k() {
                var l = c('DOMDimensions').getDocumentDimensions(),
                    m = 0;
                if (this._opts.resizeWidth) {
                    var n = document.body;
                    if (n.clientWidth < n.scrollWidth) {
                        m = l.width;
                    } else {
                        var o = n.childNodes;
                        for (var p = 0; p < o.length; p++) {
                            var q = o[p],
                                r = q.offsetLeft + q.offsetWidth;
                            if (r > m) m = r;
                        }
                    }
                    m = Math.max(m, i.forced_min_width);
                }
                l.width = m;
                if (this._opts.allowShrink) {
                    if (!this._shrinker) this._shrinker = c('DOM').create('div');
                    c('DOM').appendContent(document.body, this._shrinker);
                    l.height = Math.max(this._shrinker.offsetTop, 0);
                }
                return l;
            },
            _startResizeMonitor: function k() {
                var l, m = document.documentElement;
                if (this._opts.hideOverflow) {
                    m.style.overflow = 'hidden';
                    document.body.style.overflow = 'hidden';
                }
                var n = function() {
                    var o = this._computeSize(),
                        p = Date.now(),
                        q = this._lastResizeAckId < this._resizeCount && p - this._resizeTimestamp > this._opts.resizeAckTimeout;
                    if (!l || this._opts.expectResizeAck && q || this._opts.allowShrink && l.width != o.width || !this._opts.allowShrink && l.width < o.width || this._opts.allowShrink && l.height != o.height || !this._opts.allowShrink && l.height < o.height) {
                        l = o;
                        this._resizeCount++;
                        this._resizeTimestamp = p;
                        var r = {
                            type: 'resize',
                            height: o.height,
                            ackData: {
                                id: this._resizeCount
                            }
                        };
                        if (o.width && o.width != 0) r.width = o.width;
                        try {
                            if (c('isFacebookURI')(new(c('URI'))(document.referrer)) && c('isInIframe')() && window.name && window.parent.location && window.parent.location.toString && c('isFacebookURI')(new(c('URI'))(window.parent.location))) {
                                var t = window.parent.document.getElementsByTagName('iframe');
                                for (var u = 0; u < t.length; u = u + 1)
                                    if (t[u].name == window.name) {
                                        if (this._opts.resizeWidth) t[u].style.width = r.width + 'px';
                                        t[u].style.height = r.height + 'px';
                                    }
                            }
                            this.send(r);
                        } catch (s) {
                            this.send(r);
                        }
                    }
                }.bind(this);
                n();
                setInterval(n, this._opts.resizeTimeout);
            }
        },
        j = babelHelpers['extends']({}, i);
    f.exports.UnverifiedXD = j;
    f.exports.XD = i;
    b.UnverifiedXD = j;
    b.XD = i;
}), null);
__d('Plugin', ['Arbiter', 'ArbiterFrame'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        CONNECT: 'platform/plugins/connect',
        DISCONNECT: 'platform/plugins/disconnect',
        ERROR: 'platform/plugins/error',
        RELOAD: 'platform/plugins/reload',
        DIALOG: 'platform/plugins/dialog',
        connect: function i(j, k) {
            var l = {
                identifier: j,
                href: j,
                story_fbid: k
            };
            c('Arbiter').inform(h.CONNECT, l);
            c('ArbiterFrame').inform(h.CONNECT, l);
        },
        disconnect: function i(j, k) {
            var l = {
                identifier: j,
                href: j,
                story_fbid: k
            };
            c('Arbiter').inform(h.DISCONNECT, l);
            c('ArbiterFrame').inform(h.DISCONNECT, l);
        },
        error: function i(j, k) {
            c('Arbiter').inform(h.ERROR, {
                action: j,
                content: k
            });
        },
        reload: function i(j) {
            c('Arbiter').inform(h.RELOAD, {
                reloadUrl: j || ''
            });
            c('ArbiterFrame').inform(h.RELOAD, {
                reloadUrl: j || ''
            });
        },
        reloadOtherPlugins: function i(j, k) {
            c('ArbiterFrame').inform(h.RELOAD, {
                reloadUrl: '',
                reload: j || '',
                identifier: k || ''
            });
        }
    };
    f.exports = h;
}), null);
__d('PluginCSSReflowHack', ['Style'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        trigger: function i(j) {
            setTimeout(function() {
                var k = 'border-bottom-width',
                    l = c('Style').get(j, k);
                c('Style').set(j, k, parseInt(l, 10) + 1 + 'px');
                var m = j.offsetHeight;
                c('Style').set(j, k, l);
                return m;
            }, 1000);
        }
    };
    f.exports = h;
}), null);
__d('StrSet', [], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(i) {
        'use strict';
        this.$StrSet2 = {};
        this.$StrSet1 = 0;
        if (i) this.addAll(i);
    }
    h.prototype.add = function(i) {
        'use strict';
        if (!this.$StrSet2.hasOwnProperty(i)) {
            this.$StrSet2[i] = true;
            this.$StrSet1++;
        }
        return this;
    };
    h.prototype.addAll = function(i) {
        'use strict';
        i.forEach(this.add, this);
        return this;
    };
    h.prototype.remove = function(i) {
        'use strict';
        if (this.$StrSet2.hasOwnProperty(i)) {
            delete this.$StrSet2[i];
            this.$StrSet1--;
        }
        return this;
    };
    h.prototype.removeAll = function(i) {
        'use strict';
        i.forEach(this.remove, this);
        return this;
    };
    h.prototype.toArray = function() {
        'use strict';
        return Object.keys(this.$StrSet2);
    };
    h.prototype.toMap = function(i) {
        'use strict';
        var j = {};
        Object.keys(this.$StrSet2).forEach(function(k) {
            j[k] = typeof i == 'function' ? i(k) : i || true;
        });
        return j;
    };
    h.prototype.contains = function(i) {
        'use strict';
        return this.$StrSet2.hasOwnProperty(i);
    };
    h.prototype.count = function() {
        'use strict';
        return this.$StrSet1;
    };
    h.prototype.clear = function() {
        'use strict';
        this.$StrSet2 = {};
        this.$StrSet1 = 0;
        return this;
    };
    h.prototype.clone = function() {
        'use strict';
        return new h(this);
    };
    h.prototype.forEach = function(i, j) {
        'use strict';
        Object.keys(this.$StrSet2).forEach(i, j);
    };
    h.prototype.map = function(i, j) {
        'use strict';
        return Object.keys(this.$StrSet2).map(i, j);
    };
    h.prototype.some = function(i, j) {
        'use strict';
        return Object.keys(this.$StrSet2).some(i, j);
    };
    h.prototype.every = function(i, j) {
        'use strict';
        return Object.keys(this.$StrSet2).every(i, j);
    };
    h.prototype.filter = function(i, j) {
        'use strict';
        return new h(Object.keys(this.$StrSet2).filter(i, j));
    };
    h.prototype.union = function(i) {
        'use strict';
        return this.clone().addAll(i);
    };
    h.prototype.intersect = function(i) {
        'use strict';
        return this.filter(function(j) {
            return i.contains(j);
        });
    };
    h.prototype.difference = function(i) {
        'use strict';
        return i.filter(function(j) {
            return !this.contains(j);
        }.bind(this));
    };
    h.prototype.equals = function(i) {
        'use strict';
        var j = function n(o, p) {
                return o === p ? 0 : o < p ? -1 : 1;
            },
            k = this.toArray(),
            l = i.toArray();
        if (k.length !== l.length) return false;
        var m = k.length;
        k = k.sort(j);
        l = l.sort(j);
        while (m--)
            if (k[m] !== l[m]) return false;
        return true;
    };
    f.exports = h;
}), null);
__d('PlatformBaseVersioning', ['invariant', 'PlatformVersions', 'getObjectValues', 'StrSet'], (function a(b, c, d, e, f, g, h) {
    if (c.__markCompiled) c.__markCompiled();
    var i = new(c('StrSet'))(c('getObjectValues')(c('PlatformVersions').versions)),
        j = location.pathname,
        k = j.substring(1, j.indexOf('/', 1)),
        l = i.contains(k) ? k : c('PlatformVersions').versions.UNVERSIONED;

    function m(p, q) {
        if (q == c('PlatformVersions').versions.UNVERSIONED) return p;
        !i.contains(q) ? h(0) : void 0;
        if (p.indexOf('/') !== 0) p = '/' + p;
        return '/' + q + p;
    }

    function n(p) {
        if (i.contains(p.substring(1, p.indexOf('/', 1)))) return p.substring(p.indexOf('/', 1));
        return p;
    }
    var o = {
        addVersionToPath: m,
        getLatestVersion: function p() {
            return c('PlatformVersions').LATEST;
        },
        versionAwareURI: function p(q) {
            return q.setPath(m(q.getPath(), l));
        },
        versionAwarePath: function p(q) {
            return m(q, l);
        },
        getUnversionedPath: n
    };
    f.exports = o;
}), null);
__d('PlatformWidgetEndpoint', ['PlatformBaseVersioning'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(m, n) {
        return c('PlatformBaseVersioning').versionAwarePath('/dialog' + '/' + m + (n ? '/' + n : ''));
    }

    function i(m, n) {
        return c('PlatformBaseVersioning').versionAwarePath('/plugins' + '/' + m + (n ? '/' + n : ''));
    }

    function j(m) {
        return /^\/plugins\//.test(c('PlatformBaseVersioning').getUnversionedPath(m));
    }

    function k(m) {
        return /^\/dialog\//.test(c('PlatformBaseVersioning').getUnversionedPath(m));
    }
    var l = {
        dialog: h,
        plugins: i,
        isPluginEndpoint: j,
        isDialogEndpoint: k
    };
    f.exports = l;
}), null);
__d('PluginFlyout', ['csx', 'Arbiter', 'Button', 'CSS', 'DOM', 'DOMEvent', 'DOMEventListener', 'Focus', 'FormSubmit', 'Plugin', 'TextAreaControl'], (function a(b, c, d, e, f, g, h) {
    if (c.__markCompiled) c.__markCompiled();
    var i = c('Arbiter').SUBSCRIBE_NEW,
        j = c('Arbiter').subscribe,
        k = c('Arbiter').inform,
        l = function n(o, p) {
            return c('DOMEventListener').add(o, 'click', p);
        };

    function m(n, o, p) {
        var q = this,
            r = j(c('Plugin').CONNECT, function(event, s) {
                c('Arbiter').unsubscribe(r);
                q.init(n, o, p);
                q.connect(event, s);
            }, i);
        j(c('Plugin').DIALOG, function() {
            q.init(n, o, p);
            q.toggle();
        }, i);
    }
    Object.assign(m.prototype, {
        init: function n(o, p, q) {
            if (this.initialized) return;
            this.initialized = true;
            c('DOM').appendContent(o, JSON.parse(q));
            var r = c('DOM').find(o, 'form'),
                s = c('DOM').find(r, "._56zw"),
                t = c('DOM').find(r, "._56zx"),
                u = c('DOM').find(r, "._42x4"),
                v = c('TextAreaControl').getInstance(u);
            c('DOMEventListener').add(u, 'keyup', function(z) {
                c('Button').setEnabled(s, !!v.getValue());
            });
            c('DOMEventListener').add(window, 'keydown', function(z) {
                if (z.keyCode === 27) x();
            });
            c('DOMEventListener').add(r, 'submit', function(z) {
                new(c('DOMEvent'))(z).kill();
                c('FormSubmit').send(r);
            });
            var w = p === 'tiny' ? c('DOM').find(document.body, '.pluginPostFlyoutPrompt') : null;
            this.flyout = o;
            this.form = r;
            this.post_button = s;
            this.prompt = w;
            var x = this.hide.bind(this),
                y = this.show.bind(this);
            l(t, function(z) {
                new(c('DOMEvent'))(z).kill();
                x();
            });
            if (w) l(w, function(z) {
                new(c('DOMEvent'))(z).kill();
                y();
            });
            j(c('Plugin').CONNECT, this.connect.bind(this), i);
            j(c('Plugin').DISCONNECT, function() {
                x();
            }, i);
            j(m.SUCCESS, function() {
                x();
                if (w) c('CSS').hide(w);
            }, i);
            j(c('Plugin').ERROR, function(event, z) {
                if (z.action !== 'comment') return;
                c('DOM').setContent(c('DOM').find(r, "._56zy"), z.content);
                c('CSS').hide(s);
            }, i);
        },
        connect: function n(event, o) {
            if (o.crossFrame) return;
            if (this.prompt) c('CSS').show(this.prompt);
            if (!o.story_fbid) this.show();
        },
        show: function n() {
            this.shown = true;
            c('CSS').show(this.flyout);
            c('CSS').show(this.post_button);
            var o = c('DOM').scry(this.form, "._5jjo");
            if (o) {
                c('Focus').set(o[0]);
            } else c('Focus').set(this.form.comment);
            k(m.SHOW);
        },
        hide: function n() {
            this.shown = false;
            c('CSS').hide(this.flyout);
            k(m.HIDE);
        },
        toggle: function n() {
            if (this.shown) {
                this.hide();
            } else this.show();
        }
    });
    Object.assign(m, {
        SUCCESS: 'platform/plugins/flyout/success',
        SHOW: 'platform/plugins/flyout/show',
        HIDE: 'platform/plugins/flyout/hide',
        success: function n() {
            k(m.SUCCESS);
        }
    });
    f.exports = m;
}), null);
__d('PluginMessage', ['DOMEventListener'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        listen: function i() {
            c('DOMEventListener').add(window, 'message', function(event) {
                if (/\.facebook\.com$/.test(event.origin) && /^FB_POPUP:/.test(event.data)) {
                    var j = JSON.parse(event.data.substring(9));
                    if ('reload' in j && /^https?:/.test(j.reload)) document.location.replace(j.reload);
                }
            });
        }
    };
    f.exports = h;
}), null);
__d('PluginOptin', ['DOMEvent', 'DOMEventListener', 'PluginMessage', 'PopupWindow', 'URI', 'UserAgent_DEPRECATED', 'PlatformWidgetEndpoint', 'PluginLoggedOutUserTypedLogger'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(i, j) {
        Object.assign(this, {
            return_params: c('URI').getRequestURI().getQueryData(),
            login_params: {},
            optin_params: {},
            plugin: i,
            api_key: j
        });
        this.addReturnParams({
            ret: 'optin'
        });
        this.login_params.nux = false;
        delete this.return_params.hash;
    }
    Object.assign(h.prototype, {
        addReturnParams: function i(j) {
            Object.assign(this.return_params, j);
            return this;
        },
        addLoginParams: function i(j) {
            Object.assign(this.login_params, j);
            return this;
        },
        addOptinParams: function i(j) {
            Object.assign(this.optin_params, j);
            return this;
        },
        start: function i() {
            var j = this.api_key || 127760087237610,
                k = new(c('URI'))(c('PlatformWidgetEndpoint').dialog('plugin.optin')).addQueryData(this.optin_params).addQueryData({
                    app_id: j,
                    secure: c('URI').getRequestURI().isSecure(),
                    social_plugin: this.plugin,
                    return_params: JSON.stringify(this.return_params),
                    login_params: JSON.stringify(this.login_params)
                });
            if (c('UserAgent_DEPRECATED').mobile()) {
                k.setSubdomain('m');
            } else k.addQueryData({
                display: 'popup'
            });
            if (this.return_params.act !== null && this.return_params.act === 'send') new(c('PluginLoggedOutUserTypedLogger'))().setPluginAppID(j).setPluginName(this.return_params.act).setHref(this.return_params.href).logVital();
            this.popup = c('PopupWindow').open(k.toString(), 420, 450);
            c('PluginMessage').listen();
            return this;
        }
    });
    h.starter = function(i, j, k, l) {
        var m = new h(i);
        m.addReturnParams(j || {});
        m.addLoginParams(k || {});
        m.addOptinParams(l || {});
        return m.start.bind(m);
    };
    h.listen = function(i, j, k, l, m) {
        c('DOMEventListener').add(i, 'click', function(n) {
            new(c('DOMEvent'))(n).kill();
            h.starter(j, k, l, m)();
        });
    };
    f.exports = h;
}), null);
__d('PluginConnectButton', ['csx', 'cx', 'Arbiter', 'CSS', 'DOM', 'DOMDimensions', 'DOMEvent', 'DOMEventListener', 'Focus', 'FormSubmit', 'PlatformWidgetEndpoint', 'Plugin', 'PluginConnectButtonType', 'PluginFlyout', 'PluginOptin', 'Style', 'URI', 'getElementPosition'], (function a(b, c, d, e, f, g, h, i) {
    if (c.__markCompiled) c.__markCompiled();
    var j = c('Arbiter').SUBSCRIBE_NEW,
        k = c('Arbiter').subscribe,
        l = function n(o, p) {
            return c('DOMEventListener').add(o, 'click', p);
        };

    function m(n) {
        this.config = n;
        this.busy = false;
        var o = c('DOM').find(n.form, '.pluginConnectButton');
        this.buttons = o;
        this.node_connected = c('DOM').find(o, '.pluginConnectButtonConnected');
        this.node_disconnected = c('DOM').find(o, '.pluginConnectButtonDisconnected');
        var p = function(r) {
            new(c('DOMEvent'))(r).kill();
            if (!this.busy) {
                this.submit();
                this.busy = this.canpersonalize;
            }
        }.bind(this);
        l(this.node_disconnected, p);
        if (n.buttontype === c('PluginConnectButtonType').BLUE_BASE) {
            l(c('DOM').find(o, '.pluginButtonX button'), p);
        } else if (n.buttontype === c('PluginConnectButtonType').WHITE_BASE) l(this.node_connected, p);
        l(this.node_connected, function(r) {
            return c('Arbiter').inform(c('Plugin').DIALOG, r);
        });
        var q = this.update.bind(this);
        k(c('Plugin').CONNECT, q, j);
        k(c('Plugin').DISCONNECT, q, j);
        k(c('Plugin').ERROR, this.error.bind(this), j);
        k('Connect.Unsafe.xd/reposition', this.flip.bind(this));
        k(c('PluginFlyout').HIDE, this.hideFlyout.bind(this));
        if (n.autosubmit) setTimeout(this.submit.bind(this), 0);
    }
    Object.assign(m.prototype, {
        update: function n(o, event) {
            this.busy = false;
            var p = this.config;
            if (event.identifier !== p.identifier) return;
            var q = o === c('Plugin').CONNECT,
                r = c('PlatformWidgetEndpoint').plugins(p.plugin);
            r += '/' + (!q ? 'connect' : 'disconnect');
            c('CSS')[q ? 'show' : 'hide'](this.node_connected);
            c('CSS')[q ? 'hide' : 'show'](this.node_disconnected);
            try {
                if (document.activeElement.nodeName.toLowerCase() === 'button') {
                    var t = q ? this.node_connected : this.node_disconnected,
                        u = c('DOM').find(t, 'button');
                    u.disabled = false;
                    c('Focus').set(u);
                }
            } catch (s) {}
            p.connected = q;
            p.form.setAttribute('action', r);
            p.form.setAttribute('ajaxify', r);
        },
        error: function n(event, o) {
            this.busy = false;
            if (o.action in {
                    connect: 1,
                    disconnect: 1
                }) {
                c('DOM').setContent(this.buttons, o.content);
                var p = c('DOM').scry(this.buttons, '.confirmButton');
                if (p.length === 1) c('Focus').set(p[0]);
            }
        },
        submit: function n() {
            if (!this.config.canpersonalize) return this.login();
            c('FormSubmit').send(this.config.form);
            this.fireStateToggle();
        },
        fireStateToggle: function n() {
            var o = this.config;
            if (o.connected) {
                c('Plugin').disconnect(o.identifier);
            } else c('Plugin').connect(o.identifier);
        },
        login: function n() {
            var o = this.config.plugin;
            new(c('PluginOptin'))(o, c('URI').getRequestURI().getQueryData().api_key).addReturnParams({
                act: 'connect'
            }).addLoginParams({
                social_plugin_action: this.config.pluginaction
            }).start();
        },
        flip: function n(o, p) {
            var q = c('DOM').scry(document.body, "._4xn8");
            if (q.length === 0) {
                return;
            } else q = q[0];
            var r = c('DOM').scry(this.config.form, '.pluginConnectButtonConnected .pluginButtonIcon'),
                s = c('Style').get(r[0], 'display') !== 'none' ? r[0] : r[1],
                t = c('DOM').find(document.body, '.pluginConnectButtonLayoutRoot'),
                u;
            if (p.type === 'reposition') {
                c('CSS').addClass(t, "_1f8a");
                c('Style').set(t, 'padding-left', 450 - t.offsetWidth + 'px');
                c('CSS').removeClass(t, "_1f8b");
                u = c('getElementPosition')(s).x + c('DOMDimensions').getElementDimensions(s).width / 2 - 6;
            } else {
                c('CSS').addClass(t, "_1f8b");
                c('Style').set(t, 'padding-left', '0px');
                c('CSS').removeClass(t, "_1f8a");
                u = 6;
            }
            c('Style').set(q, 'left', u + 'px');
        },
        hideFlyout: function n() {
            c('Focus').set(this.connected ? this.node_disconnected : this.node_connected);
        }
    });
    f.exports = m;
}), null);
__d('UnverifiedXD', ['XD'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = c('XD').UnverifiedXD;
    f.exports = h;
}), null);
__d('PluginResize', ['Locale', 'Log', 'UnverifiedXD', 'getOffsetParent', 'getStyleProperty'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(l) {
        l = l || document.body;
        var m = 0,
            n = c('getOffsetParent')(l);
        if (c('Locale').isRTL() && n) {
            m = n.offsetWidth - l.offsetLeft - l.offsetWidth;
        } else if (!c('Locale').isRTL()) m = l.offsetLeft;
        return i(l) + m;
    }

    function i(l) {
        return Math.ceil(parseFloat(c('getStyleProperty')(l, 'width'))) || l.offsetWidth;
    }

    function j(l) {
        l = l || document.body;
        return l.offsetHeight + l.offsetTop;
    }

    function k(l, m, event, n) {
        this.calcWidth = l || h;
        this.calcHeight = m || j;
        this.width = undefined;
        this.height = undefined;
        this.reposition = !!n;
        this.event = event || 'resize';
    }
    Object.assign(k.prototype, {
        resize: function l() {
            var m = this.calcWidth(),
                n = this.calcHeight();
            if (m !== this.width || n !== this.height) {
                c('Log').debug('Resizing Plugin: (%s, %s, %s, %s)', m, n, this.event, this.reposition);
                this.width = m;
                this.height = n;
                c('UnverifiedXD').send({
                    type: this.event,
                    width: m,
                    height: n,
                    reposition: this.reposition
                });
            }
            return this;
        },
        auto: function l(m) {
            setInterval(this.resize.bind(this), m || 250);
            return this;
        }
    });
    k.auto = function(l, event, m) {
        return new k(h.bind(null, l), j.bind(null, l), event).resize().auto(m);
    };
    k.autoHeight = function(l, m, event, n) {
        return new k(function() {
            return l;
        }, j.bind(null, m), event).resize().auto(n);
    };
    k.getElementWidth = i;
    f.exports = k;
}), null);
__d('PluginConnectButtonResize', ['DOMDimensions', 'DOMQuery', 'PluginResize', 'Style', 'getElementPosition'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(i, j, k) {
        if (k) c('Style').set(i, 'width', k + 'px');
        c('PluginResize').auto(i, 'resize.flow');

        function l() {
            var m = c('DOMQuery').scry(document.body, '.uiTypeaheadView')[0];
            if (!m) return {
                x: 0,
                y: 0
            };
            var n = c('getElementPosition')(m),
                o = c('DOMDimensions').getElementDimensions(m);
            return {
                x: n.x + o.width,
                y: n.y + o.height
            };
        }
        new(c('PluginResize'))(function() {
            return (Math.max(c('PluginResize').getElementWidth(i), j && j.offsetWidth, l().x));
        }, function() {
            return (Math.max(i.offsetHeight, j ? j.offsetHeight + j.offsetTop : 0, l().y));
        }, 'resize.iframe', true).resize().auto();
    }
    f.exports = h;
}), null);
__d('PluginConnection', ['Arbiter', 'CSS', 'Plugin'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = function i() {};
    Object.assign(h.prototype, {
        init: function i(j, k, l, event) {
            event = event || c('Plugin').CONNECT;
            this.identifier = j;
            this.element = k;
            this.css = l;
            c('Arbiter').subscribe([c('Plugin').CONNECT, c('Plugin').DISCONNECT], function(m, n) {
                if (j === n.href) c('CSS')[m === event ? 'addClass' : 'removeClass'](k, l);
                return true;
            });
            return this;
        },
        connected: function i() {
            return c('CSS').hasClass(this.element, this.css);
        },
        connect: function i() {
            return c('Arbiter').inform(c('Plugin').CONNECT, {
                href: this.identifier
            }, c('Arbiter').BEHAVIOR_STATE);
        },
        disconnect: function i() {
            return c('Arbiter').inform(c('Plugin').DISCONNECT, {
                href: this.identifier
            }, c('Arbiter').BEHAVIOR_STATE);
        },
        toggle: function i() {
            return this.connected() ? this.disconnect() : this.connect();
        }
    });
    h.init = function(i) {
        for (var j, k = 0; k < i.length; k++) {
            j = new h();
            j.init.apply(j, i[k]);
        }
    };
    f.exports = h;
}), null);
__d('PluginPageActionLogger', ['BanzaiLogger', 'DOM', 'Event', 'PagePluginActions', 'PagePluginActionTypes'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        initializeClickLoggers: function i(j, k, l, m, n, o, p, q, r, s) {
            var t = function u(v, w) {
                try {
                    var y = c('DOM').find(m, '.' + v);
                    c('Event').listen(y, 'click', function(z) {
                        c('BanzaiLogger').log('PagePluginActionsLoggerConfig', {
                            page_id: k,
                            page_plugin_action: w,
                            page_plugin_action_type: c('PagePluginActionTypes').CLICK,
                            referer_url: l,
                            is_sdk: j
                        });
                    });
                } catch (x) {}
            };
            t(n, c('PagePluginActions').PAGE_LIKE);
            t(o, c('PagePluginActions').PAGE_UNLIKE);
            t(p, c('PagePluginActions').PAGE_AVATAR);
            t(q, c('PagePluginActions').PAGE_PERMALINK);
            t(r, c('PagePluginActions').PAGE_SHARE);
            t(s, c('PagePluginActions').PAGE_CTA);
        }
    };
    f.exports = h;
}), null);
__d('PluginReturn', ['invariant', 'Arbiter', 'Log', 'PlatformDialog', 'Plugin', 'URI', 'PlatformWidgetEndpoint'], (function a(b, c, d, e, f, g, h) {
    if (c.__markCompiled) c.__markCompiled();
    c('Arbiter').subscribe(c('PlatformDialog').RESPONSE, function(event, j) {
        if (j.error_code) {
            c('Log').debug('Plugin Return Error (%s): %s', j.error_code, j.error_message || j.error_description);
            return;
        }
        c('Plugin').reload(j.plugin_reload);
    });
    var i = {
        auto: function j() {
            c('Arbiter').subscribe(c('Plugin').RELOAD, function(event, k) {
                var l = typeof k == 'object' ? k.reloadUrl : k;
                i.reload(l);
            });
        },
        syncPlugins: function j() {
            c('Arbiter').subscribe(c('Plugin').RELOAD, function(event, k) {
                if (k.crossFrame) i.reload(k.reloadUrl, k.reload, k.identifier);
            });
        },
        reload: function j(k, j, l) {
            var m = c('URI').getRequestURI().removeQueryData('ret').removeQueryData('act').removeQueryData('hash').addQueryData('reload', j).addQueryData('id', l);
            if (k) {
                var j = new(c('URI'))(k);
                !c('PlatformWidgetEndpoint').isPluginEndpoint(j.getPath()) ? h(0) : void 0;
                m.setPath(j.getPath()).addQueryData(j.getQueryData());
            }
            window.location.replace(m.toString());
        }
    };
    f.exports = i;
}), null);
__d("XSharePluginLoggingController", ["XController"], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = c("XController").create("\/platform\/plugin\/share\/logging\/", {});
}), null);
__d('PluginShareActions', ['AsyncRequest', 'Event', 'UnverifiedXD', 'PluginShareLogTypes', 'XSharePluginLoggingController'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        init: function i(j, k, l, m, n, o, p) {
            c('Event').listen(n, 'click', function(q) {
                new(c('AsyncRequest'))().setURI(c('XSharePluginLoggingController').getURIBuilder().getURI()).setData({
                    app_id: o,
                    href: j,
                    layout: k,
                    event: c('PluginShareLogTypes').CLICK,
                    has_iframe: l,
                    referer_url: m,
                    new_ui: p
                }).send();
            });
        },
        triggerMobileIframe: function i(j, k) {
            c('Event').listen(k, 'click', function(l) {
                c('UnverifiedXD').send({
                    type: 'shareTriggerMobileIframe',
                    data: JSON.stringify({
                        href: j
                    })
                });
            });
        }
    };
    f.exports = h;
}), null);
__d('PluginXDReady', ['Arbiter', 'UnverifiedXD'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        handleMessage: function i(j) {
            if (!j.method) return;
            try {
                c('Arbiter').inform('Connect.Unsafe.' + j.method, JSON.parse(j.params), c('Arbiter').BEHAVIOR_PERSISTENT);
            } catch (k) {}
        }
    };
    b.XdArbiter = h;
    c('UnverifiedXD').send({
        xd_action: 'plugin_ready',
        name: window.name
    });
    f.exports = null;
}), null);