if (self.CavalryLogger) {
    CavalryLogger.start_js(["\/1Ne2"]);
}

__d('PluginSend', ['Arbiter', 'CSS', 'DOM', 'DOMEvent', 'DOMEventListener', 'Focus', 'Plugin', 'PluginOptin', 'PluginResize', 'PopupWindow'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = 3000,
        i = 5000,
        j = function k(l, m, n, o, p, q, r, s, t) {
            new(c('PluginResize'))(function() {
                return l.offsetWidth;
            }, function() {
                return l.offsetHeight;
            }).resize().auto();
            if (r !== null) {
                c('DOMEventListener').add(m, 'click', y);
                return;
            }
            if (t) {
                c('DOMEventListener').add(m, 'click', function(aa) {
                    aa = new(c('DOMEvent'))(aa);
                    aa.kill();
                    c('PopupWindow').open(t, 340, 670);
                });
                return;
            }
            if (!o) {
                var u = new(c('PluginOptin'))('send').addReturnParams({
                    act: 'send'
                });
                c('DOMEventListener').add(m, 'click', u.start.bind(u));
                return;
            }
            var v = false,
                w = false,
                x;

            function y() {
                if (s !== null) {
                    if (x !== null) clearTimeout(x);
                    var aa = Date.now();
                    x = setTimeout(function() {
                        if (Date.now() - aa < i) window.parent.location.href = s;
                    }, h);
                }
                window.parent.location.href = r;
            }

            function z() {
                w = !w;
                c('CSS').toggle(m);
                c('CSS').toggle(n);
                c('CSS').toggle(o);
                if (w) {
                    setTimeout(function() {
                        var ca = c('DOM').find(o, '.textInput');
                        c('Focus').set(ca);
                    }, 500);
                } else {
                    var aa = c('DOM').find(m, 'button');
                    c('Focus').set(aa);
                }
                if (!v) {
                    var ba = window.ServerJSAsyncLoader;
                    ba && ba.ondemandjs && ba.run(ba.ondemandjs);
                    v = true;
                }
                new(c('PluginResize'))(function() {
                    return Math.max(l.offsetWidth, o.offsetWidth);
                }, function() {
                    return Math.max(l.offsetHeight, o.offsetHeight + o.offsetTop);
                }, 'resize.iframe', true).resize().auto();
            }
            c('DOMEventListener').add(m, 'click', z);
            c('DOMEventListener').add(n, 'click', z);
            c('DOMEventListener').add(l.parentNode, 'click', function(aa) {
                aa = new(c('DOMEvent'))(aa);
                if (aa.target === l.parentNode) {
                    aa.kill();
                    z();
                }
            });
            c('Arbiter').subscribe(k.CLOSE, z);
            c('Arbiter').subscribe(c('Plugin').ERROR, function(event, aa) {
                c('DOM').setContent(l, aa.content);
                z();
            });
            if (q) z();
        };
    Object.assign(j, {
        SUCCESS: 'platform/plugins/send/success',
        CLOSE: 'platform/plugins/send/close',
        success: function k() {
            c('Arbiter').inform(this.SUCCESS);
        }
    });
    f.exports = j;
}), null);
__d('PluginUITypeahead', ['DOMDimensions', 'DOMQuery', 'Tokenizer', 'getElementPosition'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h() {
        return c('DOMQuery').scry(document.body, '.uiTokenizer').map(function(j) {
            var k = c('Tokenizer').getInstance(j);
            if (!k) return {
                x: 0,
                y: 0
            };
            var l = k.getTypeahead().getView(),
                m = c('getElementPosition')(l.getElement()),
                n = c('DOMDimensions').getElementDimensions(l.getElement());
            return {
                x: m.x + n.width,
                y: m.y + n.height
            };
        });
    }
    var i = {
        width: function j() {
            return Math.max.apply(null, h().map(function(k) {
                return k.x;
            }));
        },
        height: function j() {
            return Math.max.apply(null, h().map(function(k) {
                return k.y;
            }));
        }
    };
    f.exports = i;
}), null);
__d('PluginSendFlyout', ['Arbiter', 'Button', 'DOMEvent', 'DOMEventListener', 'DOMQuery', 'Focus', 'FormSubmit', 'PluginResize', 'PluginSend', 'PluginUITypeahead'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h() {}
    Object.assign(h, {
        init: function i(j, k) {
            var l = c('DOMQuery').find(j, '.uiTokenizer'),
                m = c('DOMQuery').find(j, '.textInput'),
                n = c('DOMQuery').find(j, '.pluginSendFlyoutTextarea'),
                o = c('DOMQuery').find(j, 'form'),
                p = c('DOMQuery').find(document.body, '.pluginSend'),
                q = c('DOMQuery').find(o, '.pluginSendFlyoutCancelButton'),
                r = c('DOMQuery').find(o, '.pluginSendFlyoutSendButton');
            c('Arbiter').subscribe('Form/change', function(t, u) {
                if (u.node !== l) return;
                c('Button').setEnabled(r, k.getTokens().length > 0);
            });

            function s() {
                k.reset();
                n.value = '';
                c('Button').setEnabled(r, false);
                c('Focus').setWithoutOutline(p);
                c('Arbiter').inform(c('PluginSend').CLOSE);
            }
            c('DOMEventListener').add(o, 'submit', function(t) {
                new(c('DOMEvent'))(t).kill();
                c('FormSubmit').send(o);
            });
            c('DOMEventListener').add(q, 'click', function(t) {
                new(c('DOMEvent'))(t).kill();
                s();
            });
            c('DOMEventListener').add(q, 'keydown', function(t) {
                t = new(c('DOMEvent'))(t);
                var u = t.event.keyCode || t.event.which;
                if (u == 9 && !t.event.shiftKey) {
                    t.preventDefault();
                    c('Focus').set(m);
                }
            });
            c('DOMEventListener').add(m, 'keydown', function(t) {
                t = new(c('DOMEvent'))(t);
                var u = t.event.keyCode || t.event.which;
                if (u == 9 && t.event.shiftKey) {
                    t.preventDefault();
                    if (m.getAttribute('aria-expanded') == 'true') {
                        m.setAttribute('aria-expanded', 'false');
                    } else c('Focus').set(q);
                }
            });
            c('DOMEventListener').add(o, 'keyup', function(t) {
                t = new(c('DOMEvent'))(t);
                var u = t.event.keyCode || t.event.which;
                if (u == 27) s();
            });
            c('Arbiter').subscribe(c('PluginSend').SUCCESS, s);
            new(c('PluginResize'))(function() {
                return Math.max(p.offsetWidth, j.offsetWidth, c('PluginUITypeahead').width());
            }, function() {
                return Math.max(p.offsetHeight, j.offsetHeight + j.offsetTop, c('PluginUITypeahead').height());
            }, 'resize.iframe', false).resize().auto();
        }
    });
    f.exports = h;
}), null);
__d('TypeaheadShowResultsOnFocus', ['Event', 'Keys'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(i) {
        'use strict';
        this._typeahead = i;
    }
    h.prototype.enable = function() {
        'use strict';
        this._typeahead.getCore().resetOnKeyup = false;
        this._subscription = this._typeahead.subscribe('bootstrap', function(i, j) {
            this.firstFetch(j, this._typeahead.getCore(), this._typeahead.getData());
        }.bind(this));
        this._keyUpListener = c('Event').listen(this._typeahead.getCore().getElement(), 'keyup', function(event) {
            if (c('Event').getKeyCode(event) == c('Keys').BACKSPACE || c('Event').getKeyCode(event) == c('Keys').DELETE) this.respond(this._typeahead.getCore(), this._typeahead.getData());
        }.bind(this));
        this._focusListener = c('Event').listen(this._typeahead.getCore().getElement(), 'focus', function(event) {
            this.respond(this._typeahead.getCore(), this._typeahead.getData());
        }.bind(this));
    };
    h.prototype.disable = function() {
        'use strict';
        this._typeahead.unsubscribe(this._subscription);
        this._subscription = null;
        this._keyUpListener.remove();
        this._keyUpListener = null;
        this._focusListener.remove();
        this._focusListener = null;
    };
    h.prototype.firstFetch = function(i, j, k) {
        'use strict';
        !i.bootstrapping && this.respond(j, k);
    };
    h.prototype.respond = function(i, j) {
        'use strict';
        if (!i.getValue()) this.refreshAndShowNeededResults(i, j);
    };
    h.prototype.refreshAndShowNeededResults = function(i, j) {
        'use strict';
        var k = this.getUidsFromData(j);
        i.setValue('');
        var l = j.buildUids(' ', k);
        j.respond('', l);
    };
    h.prototype.getUidsFromData = function(i) {
        'use strict';
        var j = i.getAllEntries(),
            k = [];
        for (var l in j) k.push({
            uid: j[l].uid,
            index: j[l].index
        });
        k.sort(function(m, n) {
            return m.index - n.index;
        });
        return k.map(function(m) {
            return m.uid;
        });
    };
    Object.assign(h.prototype, {
        _subscription: null,
        _keyUpListener: null,
        _focusListener: null
    });
    f.exports = h;
}), null);