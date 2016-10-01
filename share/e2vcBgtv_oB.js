if (self.CavalryLogger) {
    CavalryLogger.start_js(["hsEz3"]);
}

__d('CheckpointSelectorEventEmitter', ['EventEmitter'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    f.exports = new(c('EventEmitter'))();
}), null);
__d('CheckpointSlideAsyncAnimation', ['CSS', 'DOM', 'ge', 'Style', 'EventListener', 'EventEmitter'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        init: function i(j, k, l, m, n) {
            var o = false;
            if (l) {
                var p = function r(s) {
                    if (s.target && s.target.id && !o) {
                        o = true;
                        var t = l.cloneNode(true),
                            u = c('ge')(s.target.id, k),
                            v = u.innerText;
                        c('Style').set(u, 'min-width', c('Style').get(u, 'width'));
                        c('CSS').show(t);
                        c('DOM').setContent(u, t);
                        var w = n.addListener('reset', function() {
                            w.remove();
                            c('DOM').setContent(u, v);
                            o = false;
                        });
                    }
                };
                for (var q in j)
                    if (j.hasOwnProperty(q)) c('EventListener').listen(j[q], 'click', p);
            }
            if (m) n.addListener('submit', function() {
                if (!o) {
                    o = true;
                    c('CSS').show(m);
                    var r = n.addListener('reset', function() {
                        r.remove();
                        c('CSS').hide(m);
                        o = false;
                    });
                }
            });
        }
    };
    f.exports = h;
}), null);
__d('CheckpointSlideController', ['cx', 'CSS', 'CheckpointSelectorEventEmitter', 'EventListener', 'EventEmitter', 'CheckpointSlideAsyncAnimation'], (function a(b, c, d, e, f, g, h) {
    if (c.__markCompiled) c.__markCompiled();
    var i = null;

    function j(k, l, m, n, o, p, q, r) {
        'use strict';
        this.$CheckpointSlideController1 = k;
        this.$CheckpointSlideController2 = l;
        this.$CheckpointSlideController3 = m;
        this.$CheckpointSlideController4 = n;
        this.$CheckpointSlideController5 = o;
        this.$CheckpointSlideController6 = p;
        i = this;
        this.$CheckpointSlideController7();
        this.$CheckpointSlideController8 = this.$CheckpointSlideController9();
        c('CheckpointSlideAsyncAnimation').init(n, p, q, r, this.$CheckpointSlideController8);
    }
    j.prototype.submitButton = function(k) {
        'use strict';
        var l = this.getButton(k);
        if (l) l.click();
    };
    j.prototype.$CheckpointSlideController9 = function() {
        'use strict';
        var k = this.$CheckpointSlideController6,
            l = new(c('EventEmitter'))(),
            m, n, o;
        n = c('EventListener').listen(this.$CheckpointSlideController6, 'error', function() {
            c('CSS').removeClass(k, "_jru");
            l.emit('reset');
        });
        o = c('EventListener').listen(this.$CheckpointSlideController6, 'success', function() {
            c('CSS').removeClass(k, "_jru");
            n.remove();
            o.remove();
            m.remove();
            l.emit('destroy');
        });
        m = c('EventListener').listen(this.$CheckpointSlideController6, 'submit', function() {
            c('CSS').addClass(k, "_jru");
            l.emit('submit');
        });
        return l;
    };
    j.prototype.$CheckpointSlideController7 = function() {
        'use strict';
        c('CheckpointSelectorEventEmitter').addListener('submit', function(k) {
            if (k) {
                var l = this.getButton(k);
                if (l) {
                    l.click();
                    for (var m in this.$CheckpointSlideController4) {
                        c('CSS').addClass(this.$CheckpointSlideController4[m], "_42fr");
                        this.$CheckpointSlideController4[m].disabled = 'disabled';
                    }
                }
            }
        }.bind(this));
        c('CheckpointSelectorEventEmitter').addListener('disable_button', function(k) {
            if (k) {
                var l = this.getButton(k);
                if (l) {
                    c('CSS').addClass(l, "_42fr");
                    l.disabled = true;
                }
            }
        }.bind(this));
        c('CheckpointSelectorEventEmitter').addListener('enable_button', function(k) {
            if (k) {
                var l = this.getButton(k);
                if (l) {
                    c('CSS').removeClass(l, "_42fr");
                    l.disabled = false;
                }
            }
        }.bind(this));
    };
    j.prototype.getRoot = function() {
        'use strict';
        return this.$CheckpointSlideController6;
    };
    j.getInstance = function() {
        'use strict';
        return i;
    };
    j.prototype.getTitleBar = function() {
        'use strict';
        return this.$CheckpointSlideController1;
    };
    j.prototype.getTitle = function() {
        'use strict';
        return this.$CheckpointSlideController2;
    };
    j.prototype.getBottomBar = function() {
        'use strict';
        return this.$CheckpointSlideController3;
    };
    j.prototype.getButton = function(k) {
        'use strict';
        if (this.$CheckpointSlideController4 && this.$CheckpointSlideController4[k]) return this.$CheckpointSlideController4[k];
        return null;
    };
    j.prototype.getFooter = function() {
        'use strict';
        return this.$CheckpointSlideController5;
    };
    j.prototype.getEmitter = function() {
        'use strict';
        return this.$CheckpointSlideController8;
    };
    j.prototype.setTitleText = function(k) {
        'use strict';
        var l = this.getTitle();
        if (l) l.innerText = k;
    };
    j.prototype.hideTitleBar = function() {
        'use strict';
        if (this.getTitleBar()) c('CSS').hide(this.getTitleBar());
    };
    j.prototype.showTitleBar = function() {
        'use strict';
        if (this.getTitleBar()) c('CSS').show(this.getTitleBar());
    };
    j.prototype.hideBottomBar = function() {
        'use strict';
        if (this.getBottomBar()) c('CSS').hide(this.getBottomBar());
    };
    j.prototype.showBottomBar = function() {
        'use strict';
        if (this.getBottomBar()) c('CSS').show(this.getBottomBar());
    };
    j.prototype.hideButton = function(k) {
        'use strict';
        var l = this.getButton(k);
        if (l) c('CSS').hide(l);
    };
    j.prototype.showButton = function(k) {
        'use strict';
        var l = this.getButton(k);
        if (l) c('CSS').show(l);
    };
    j.prototype.hideFooter = function() {
        'use strict';
        if (this.getFooter()) c('CSS').hide(this.getFooter());
    };
    j.prototype.showFooter = function() {
        'use strict';
        if (this.getFooter()) c('CSS').show(this.getFooter());
    };
    f.exports = j;
}), null);
__d('PlatformDialogResize', ['DialogPosition', 'DOMDimensions', 'Layer', 'getElementPosition', 'getViewportDimensions', 'throttle'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    c('DialogPosition').setFixedTopMargin(40);
    var h = [],
        i, j;

    function k(r) {
        return function(s) {
            return s[r];
        };
    }

    function l(r) {
        return Math.max.apply(null, r);
    }

    function m(r, s) {
        return c('DOMDimensions').measureElementBox(r, s, true, true, true);
    }

    function n(r) {
        var s = c('DOMDimensions').getElementDimensions(r),
            t = c('getElementPosition')(r);
        return {
            width: t.x + s.width + m(r, 'right'),
            height: t.y + s.height + m(r, 'bottom')
        };
    }

    function o() {
        return h.map(function(r) {
            return r.isShown() && r.getContentRoot() ? n(r.getRoot().children[0]) : {
                width: 0,
                height: 0
            };
        });
    }
    var p = c('throttle')(function() {
        var r = c('getViewportDimensions')(),
            s = c('DOMDimensions').getDocumentDimensions(),
            t = o().concat(s, r, i),
            u = l(t.map(k('width'))) - r.width,
            v = l(t.map(k('height'))) - r.height;
        try {
            window.resizeBy(u, v);
            window.moveBy(u / -2, 0);
        } catch (w) {}
    }, 200);
    c('Layer').subscribe('show', function(event, r) {
        if (h.length === 0) j = setInterval(p, 200);
        h.push(r);
        p();
    });
    c('Layer').subscribe('hide', function(event, r) {
        var s = h.indexOf(r);
        if (s !== -1) {
            h.splice(s, 1);
            p();
        }
        if (h.length === 0) {
            clearInterval(j);
            j = null;
        }
    });
    var q = {
        auto: function r(s, t) {
            i = {
                width: s,
                height: t
            };
            p();
            setTimeout(p, 250);
        }
    };
    f.exports = q;
}), null);
__d('PlatformDialogE2ETracking', ['DOMEventListener'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        init: function i(j) {
            var k = j.getForm(),
                l = k.e2e.value;
            l = l ? JSON.parse(l) : {};
            var m = Object.keys(l).filter(function(n) {
                return /^submit_/.test(n);
            }).length;
            c('DOMEventListener').add(k, 'submit', function() {
                if (j.getDisplay() !== 'async')
                    if (b._cavalry) {
                        l['start_' + m] = window._cstart;
                        l['tti_' + m] = _cavalry.data[_cavalry.tti];
                    } else if (b.CavalryLogger) {
                    l['start_' + m] = window._cstart;
                    l['tti_' + m] = CavalryLogger.getInstance().getLastTtiValue();
                }
                l['submit_' + m] = Date.now();
                k.e2e.value = JSON.stringify(l);
            });
        },
        asyncUpdate: function i() {
            if (b._cavalry) {
                _cavalry.log(_cavalry.tti);
            } else if (b.CavalryLogger) {
                var j = CavalryLogger.getInstance();
                j.setTimeStamp(j.tti_event, true);
            }
        }
    };
    f.exports = h;
}), null);
__d('FormDisableOnSubmit', [], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(i) {
        'use strict';
        this._form = i;
    }
    h.prototype.enable = function() {
        'use strict';
        this._subscription = this._form.subscribe(['submit', 'reset'], this._handle.bind(this));
    };
    h.prototype.disable = function() {
        'use strict';
        this._form.unsubscribe(this._subscription);
        this._subscription = null;
    };
    h.prototype._handle = function(i, j) {
        'use strict';
        if (i == 'submit') {
            if (this._disabled) return false;
            this._disabled = true;
            return true;
        }
        this._disabled = false;
    };
    Object.assign(h.prototype, {
        _subscription: null,
        _disabled: false
    });
    f.exports = h;
}), null);
__d('CheckpointStepIconSwitcher', ['CSS'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = null,
        i = null;

    function j(k) {
        if (h !== null) {
            c('CSS').hide(h[i]);
            c('CSS').show(h[k]);
        }
        i = k;
    }
    f.exports = {
        initialize: function k(l, m) {
            h = l;
            var n = i;
            i = m;
            if (n !== null) j(n);
        },
        show: function k(l) {
            j(l);
        }
    };
}), null);