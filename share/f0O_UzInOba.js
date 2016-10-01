if (self.CavalryLogger) {
    CavalryLogger.start_js(["4vPry"]);
}

__d('Facepile.react', ['cx', 'fbt', 'ix', 'intlSummarizeNumber', 'joinClasses', 'HovercardLink', 'Image.react', 'Link.react', 'List.react', 'Pixelz.react', 'React'], (function a(b, c, d, e, f, g, h, i, j) {
    if (c.__markCompiled) c.__markCompiled();
    var k = c('React').PropTypes,
        l = {
            small: 24,
            medium: 32,
            large: 50
        },
        m = c('React').createClass({
            displayName: 'Facepile',
            defaultProps: {
                moreColor: 'blue',
                moreCount: 0,
                showHovercard: false
            },
            propTypes: {
                className: k.string,
                moreColor: k.oneOf(['blue', 'gray']),
                moreCount: k.number,
                moreDialogLink: k.string,
                morePageLink: k.string,
                numFaces: k.number,
                onFaceClick: k.func,
                onComponentDidMount: k.func,
                profiles: k.arrayOf(k.shape({
                    URL: k.string,
                    name: k.node.isRequired,
                    uniqueID: k.any.isRequired,
                    profilePicURI: k.any.isRequired
                })).isRequired,
                showHovercard: k.bool,
                size: k.oneOf([28, 'small', 'medium', 'large']).isRequired
            },
            _onFaceClick: function n(o, p) {
                if (this.props.onFaceClick) this.props.onFaceClick(o, p);
            },
            componentDidMount: function n() {
                if (this.props.onComponentDidMount) this.props.onComponentDidMount();
            },
            getPicSize: function n() {
                return l[this.props.size] || this.props.size;
            },
            renderFace: function n(o, p) {
                var q = this.getPicSize(),
                    r = c('HovercardLink').constructEndpoint({
                        id: o.uniqueID
                    }).toString();
                return (c('React').createElement('li', {
                    className: "_43q7",
                    key: o.uniqueID,
                    onClick: this._onFaceClick.bind(this, o, p)
                }, c('React').createElement(c('Link.react'), {
                    href: o.URL,
                    'aria-label': o.name,
                    'data-hover': !this.props.showHovercard ? 'tooltip' : null,
                    'data-hovercard': this.props.showHovercard ? r : null,
                    'data-tooltip-content': o.name,
                    className: "_2rt_ link",
                    'data-ignoreclass': "_2rt_",
                    'data-tooltip-alignh': 'left'
                }, c('React').createElement(c('Image.react'), {
                    src: o.profilePicURI,
                    width: q,
                    height: q,
                    className: 'img'
                }))));
            },
            renderMore: function n() {
                if (!this.props.moreCount) return null;
                var o = this.props.numFaces != null && this.props.numFaces <= this.props.profiles.length ? this.props.moreCount + 1 : this.props.moreCount,
                    p = c('intlSummarizeNumber')(o, 0),
                    q = p.length,
                    r;
                if (o === 0 || this.props.size === 'small' && q > 2 || this.props.size === 28 && q > 3 || this.props.size === 'medium' && q > 3 || this.props.size === 'large' && q > 6) {
                    r = c('React').createElement(c('Image.react'), {
                        src: j('/images/questions/ellipsis.png')
                    });
                } else r = '+' + p;
                var s;
                if (o === 1) {
                    s = i._("1 other person");
                } else s = i._("{num} other people", [i.param('num', o)]);
                var t = c('joinClasses')("_43q8" + (' ' + "_43q7") + (q < 2 ? ' ' + "_43qa" : '') + (q === 2 ? ' ' + "_43qb" : '') + (q === 3 ? ' ' + "_43qd" : '') + (q > 3 ? ' ' + "_43qe" : '') + (this.props.moreColor === 'blue' ? ' ' + "_49c8" : '') + (this.props.moreColor === 'gray' ? ' ' + "_49cb" : ''));
                return (c('React').createElement('li', {
                    className: t
                }, c('React').createElement('a', {
                    'data-hover': 'tooltip',
                    'data-tooltip-position': 'right',
                    'data-tooltip-content': s,
                    ajaxify: this.props.moreDialogLink,
                    href: this.props.morePageLink,
                    role: 'button',
                    rel: 'dialog'
                }, r)));
            },
            render: function n() {
                var o = c('joinClasses')(this.props.className, "_43qm" + (this.props.size == 28 ? ' ' + "_3cxu" : '') + (this.props.size == 'small' ? ' ' + "_43q9" : '') + (this.props.size == 'medium' ? ' ' + "_43qc" : '') + (this.props.size == 'large' ? ' ' + "_43qf" : '')),
                    p = this.props.numFaces == undefined ? this.props.profiles : this.props.profiles.slice(0, this.props.moreCount ? this.props.numFaces - 1 : this.props.numFaces);
                return (c('React').createElement('div', {
                    className: o,
                    style: this.props.style
                }, c('React').createElement(c('List.react'), {
                    className: "_4cg3",
                    direction: 'horizontal',
                    spacing: 'none',
                    border: 'none'
                }, p.map(this.renderFace), this.renderMore())));
            }
        });
    f.exports = m;
}), null);
__d('InsightsLegendAreaKey.react', ['cx', 'InsightsLegendKey.react', 'React'], (function a(b, c, d, e, f, g, h) {
    var i, j;
    if (c.__markCompiled) c.__markCompiled();
    i = babelHelpers.inherits(k, c('React').Component);
    j = i && i.prototype;
    k.prototype.render = function() {
        'use strict';
        return (c('React').createElement(c('InsightsLegendKey.react'), {
            className: this.props.className
        }, c('React').createElement('div', {
            className: "_1l46 _1l47",
            style: {
                background: this.props.color
            }
        }), this.props.children));
    };

    function k() {
        'use strict';
        i.apply(this, arguments);
    }
    f.exports = k;
}), null);
__d('FBMorePager.react', ['cx', 'OnVisible.react', 'React', 'getViewportDimensions', 'throttle'], (function a(b, c, d, e, f, g, h) {
    'use strict';
    var i, j;
    if (c.__markCompiled) c.__markCompiled();
    i = babelHelpers.inherits(k, c('React').Component);
    j = i && i.prototype;

    function k(m, n) {
        j.constructor.call(this, m, n);
        this.state = {
            isMounted: false,
            throttledCallback: c('throttle')(function() {
                return this.$FBMorePager1();
            }.bind(this), m.throttle),
            visible: false
        };
    }
    k.prototype.componentWillReceiveProps = function(m) {
        this.$FBMorePager2(m);
        if (this.props.throttle !== m.throttle) this.setState({
            throttledCallback: c('throttle')(function() {
                return this.$FBMorePager1();
            }.bind(this), m.throttle)
        });
    };
    k.prototype.componentWillMount = function() {
        this.setState({
            isMounted: true
        });
    };
    k.prototype.componentWillUnmount = function() {
        this.setState({
            isMounted: false
        });
    };
    k.prototype.render = function() {
        return (c('React').createElement('div', {
            className: "_3fv0" + (this.state.visible ? ' ' + "_3fv1" : '')
        }, c('React').createElement(c('OnVisible.react'), {
            buffer: this.props.buffer,
            onVisible: function() {
                return this.$FBMorePager3();
            }.bind(this),
            ref: 'onVisible'
        }, this.props.children)));
    };
    k.prototype.$FBMorePager2 = function() {
        this.setState({
            visible: false
        });
        this.refs.onVisible && this.refs.onVisible.reset();
    };
    k.prototype.$FBMorePager3 = function() {
        this.setState({
            visible: true
        });
        this.state.throttledCallback();
    };
    k.prototype.$FBMorePager1 = function() {
        this.state.isMounted && this.props.onMore && this.props.onMore();
    };
    var l = Math.min(c('getViewportDimensions')().height, c('getViewportDimensions')().width) * 2;
    k.defaultProps = {
        buffer: l,
        throttle: 1000
    };
    f.exports = k;
}), null);
__d('PhotoMultiPhotosThumb', ['Event', 'Style'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = 1200,
        i = {
            init: function j(k, l) {
                var m = null,
                    n = 0;

                function o(q) {
                    n = q;
                    l.forEach(function(r, s) {
                        c('Style').set(r, 'opacity', s === q ? 1 : 0);
                    });
                }

                function p() {
                    o((n + 1) % l.length);
                    m = setTimeout(p, h);
                }
                c('Event').listen(k, 'mouseenter', function() {
                    if (m) return;
                    n = 0;
                    p();
                });
                c('Event').listen(k, 'mouseleave', function() {
                    o(0);
                    window.clearTimeout(m);
                    m = null;
                });
            }
        };
    f.exports = i;
}), null);
__d('StaticSearchSource', ['AbstractSearchSource', 'SearchSourceCallbackManager', 'TokenizeUtil'], (function a(b, c, d, e, f, g) {
    var h, i;
    if (c.__markCompiled) c.__markCompiled();
    h = babelHelpers.inherits(j, c('AbstractSearchSource'));
    i = h && h.prototype;

    function j(k, l) {
        'use strict';
        i.constructor.call(this);
        this.$StaticSearchSource1 = k;
        this.$StaticSearchSource2 = new(c('SearchSourceCallbackManager'))({
            parseFn: c('TokenizeUtil').parse,
            matchFn: c('TokenizeUtil').isQueryMatch,
            indexFn: l
        });
        this.$StaticSearchSource2.addLocalEntries(this.$StaticSearchSource1);
    }
    j.prototype.searchImpl = function(k, l, m) {
        'use strict';
        if (!k) {
            l(this.$StaticSearchSource1, k);
        } else this.$StaticSearchSource2.search(k, l, m);
    };
    f.exports = j;
}), null);
__d('DialogExpansion', ['Animation', 'DialogPosition', 'LoadingDialogDimensions', 'Style'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = 400,
        i = 100;

    function j(k) {
        'use strict';
        this._dialog = k;
        this._fixedTopMargin = k.getFixedTopPosition();
        this._ignoreFixedTopInShortViewport = k.shouldIgnoreFixedTopInShortViewport();
    }
    j.prototype.enable = function() {
        'use strict';
        this._subscription = this._dialog.subscribe('aftershow', this._onAfterShow.bind(this));
    };
    j.prototype.disable = function() {
        'use strict';
        this._subscription.unsubscribe();
        this._subscription = null;
    };
    j.prototype.setTargetWidth = function(k) {
        'use strict';
        this._targetWidth = k;
    };
    j.prototype._onAfterShow = function() {
        'use strict';
        this._outer = this._dialog.getContentRoot();
        this._inner = this._dialog.getInnerContent();
        if (isNaN(parseInt(c('Style').get(this._inner, 'height'), 10))) return;
        var k = this._getWidth(),
            l = c('LoadingDialogDimensions').HEIGHT,
            m = c('DialogPosition').calculateTopMargin(k, l);
        c('Style').apply(this._inner, {
            opacity: '0',
            width: this._dialog.getWidth() + 'px'
        });
        c('Style').apply(this._outer, {
            width: k + 'px',
            height: l + 'px',
            marginTop: m + 'px',
            overflow: 'hidden'
        });
        setTimeout(function() {
            var n = parseInt(this._dialog.getWidth(), 10);
            if (this._targetWidth) n = this._targetWidth;
            var o = parseInt(c('Style').get(this._inner, 'height'), 10),
                p = c('DialogPosition').calculateTopMargin(n, o, this._fixedTopMargin, this._ignoreFixedTopInShortViewport);
            this._growThenFade(n, o, p);
        }.bind(this), 100);
    };
    j.prototype._growThenFade = function(k, l, m) {
        'use strict';
        new(c('Animation'))(this._outer).to('width', k).to('height', l).to('marginTop', m).duration(h).ease(c('Animation').ease.both).ondone(this._fadeIn.bind(this)).go();
    };
    j.prototype._fadeIn = function() {
        'use strict';
        c('Style').set(this._outer, 'overflow', '');
        c('Style').set(this._outer, 'height', '');
        new(c('Animation'))(this._inner).from('opacity', 0).to('opacity', 1).ondone(function() {
            this._dialog.inform('afterexpand');
        }.bind(this)).duration(i).go();
    };
    j.prototype._getWidth = function() {
        'use strict';
        return c('LoadingDialogDimensions').WIDTH;
    };
    f.exports = j;
}), null);
__d("MutationObserver", [], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    h.prototype.observe = function(j, k) {
        "use strict";
    };
    h.prototype.disconnect = function() {
        "use strict";
    };
    h.prototype.takeRecords = function() {
        "use strict";
        return null;
    };

    function h() {
        "use strict";
    }
    var i = b.MutationObserver || b.WebKitMutationObserver || h;
    f.exports = i;
}), null);
__d('SimpleObjectsPool', ['invariant'], (function a(b, c, d, e, f, g, h) {
    if (c.__markCompiled) c.__markCompiled();

    function i(j) {
        'use strict';
        this.$SimpleObjectsPool1 = j;
        this.$SimpleObjectsPool2 = [];
    }
    i.prototype.get = function() {
        'use strict';
        if (this.$SimpleObjectsPool2.length) {
            return this.$SimpleObjectsPool2.pop();
        } else {
            var j = this.$SimpleObjectsPool1;
            return new j();
        }
    };
    i.prototype.put = function(j) {
        'use strict';
        !(j instanceof this.$SimpleObjectsPool1) ? h(0): void 0;
        this.$SimpleObjectsPool2.push(j);
    };
    f.exports = i;
}), null);
__d('PersistentAnimationFrame', ['SimpleObjectsPool', 'Visibility', 'cancelAnimationFrame', 'requestAnimationFrame'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = 16,
        i, j = {},
        k = true;

    function l() {
        if (!i) i = new(c('SimpleObjectsPool'))(m);
        return i;
    }

    function m() {
        'use strict';
        this.$PersistentAnimationFrame1 = function() {
            this.callback();
            this.$PersistentAnimationFrame2();
            l().put(this);
        }.bind(this);
    }
    m.request = function(p) {
        'use strict';
        if (!p) return 0;
        return l().get().request(p);
    };
    m.cancel = function(p) {
        'use strict';
        if (p === 0) return;
        var q = j[String(p)];
        if (q) q.cancel();
    };
    m.prototype.request = function(p) {
        'use strict';
        k && n();
        this.callback = p;
        this.hidden = c('Visibility').isHidden();
        if (this.hidden) {
            this.intID = setTimeout(this.$PersistentAnimationFrame1, h);
        } else this.intID = c('requestAnimationFrame')(this.$PersistentAnimationFrame1);
        this.strID = String(this.intID);
        j[this.strID] = this;
        return this.intID;
    };
    m.prototype.cancel = function() {
        'use strict';
        if (this.strID) {
            if (this.hidden) {
                clearTimeout(this.intID);
            } else c('cancelAnimationFrame')(this.intID);
            this.$PersistentAnimationFrame2();
            l().put(this);
        }
    };
    m.prototype.$PersistentAnimationFrame2 = function() {
        'use strict';
        delete j[this.strID];
        delete this.intID;
        delete this.strID;
        delete this.callback;
        delete this.hidden;
    };

    function n() {
        k = false;
        c('Visibility').addListener(c('Visibility').HIDDEN, o);
        c('Visibility').addListener(c('Visibility').VISIBLE, o);
    }

    function o() {
        Object.keys(j).forEach(function(p) {
            var q = j[p],
                r = q.callback;
            q.cancel();
            r();
        });
    }
    f.exports = m;
}), null);
__d('requestPersistentAnimationFrame', ['PersistentAnimationFrame'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    f.exports = c('PersistentAnimationFrame').request;
}), null);
__d('ResizeEventHandler', ['requestPersistentAnimationFrame'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();

    function h(i) {
        this.handleEvent = function() {
            if (this.$ResizeEventHandler1 === false) {
                this.$ResizeEventHandler1 = true;
                c('requestPersistentAnimationFrame')(this.$ResizeEventHandler3);
            }
        }.bind(this);
        this.$ResizeEventHandler3 = function() {
            this.$ResizeEventHandler1 = false;
            this.$ResizeEventHandler2();
        }.bind(this);
        this.$ResizeEventHandler1 = false;
        this.$ResizeEventHandler2 = i;
    }
    f.exports = h;
}), null);
__d('ResponsiveBlock.react', ['cx', 'MutationObserver', 'React', 'ReactDOM', 'ResizeEventHandler', 'UserAgent', 'joinClasses', 'requestAnimationFrame'], (function a(b, c, d, e, f, g, h) {
    if (c.__markCompiled) c.__markCompiled();
    var i = c('React').PropTypes,
        j = c('UserAgent').isBrowser('IE') && 'onresize' in document.createElement('div'),
        k = {
            attributes: true,
            characterData: true,
            childList: true,
            subtree: true
        },
        l = c('React').createClass({
            displayName: 'ResponsiveBlock',
            propTypes: {
                onResize: i.func.isRequired
            },
            componentDidMount: function m() {
                this._width = null;
                this._height = null;
                this._resizeHandler = new(c('ResizeEventHandler'))(this._didResize);
                this._bindResizeEvent();
                this._observer = new(c('MutationObserver'))(this._resizeHandler.handleEvent);
                this._observer.observe(c('ReactDOM').findDOMNode(this), k);
            },
            componentWillUnmount: function m() {
                if (this._sensorTarget) {
                    this._sensorTarget.onresize = null;
                    this._sensorTarget = null;
                }
                this._resizeHandler = null;
                if (this._observer) {
                    this._observer.disconnect();
                    this._observer = null;
                }
                this._width = null;
                this._height = null;
            },
            render: function m() {
                var n = c('joinClasses')("_4u-c", this.props.className),
                    o;
                if (j) {
                    o = c('React').createElement('div', {
                        key: 'sensor',
                        ref: 'sensorNode',
                        className: "_4u-f"
                    });
                } else o = c('React').createElement('div', {
                    key: 'sensor',
                    className: "_4u-f"
                }, c('React').createElement('iframe', {
                    'aria-hidden': 'true',
                    ref: 'sensorNode',
                    className: "_1_xb",
                    tabIndex: '-1'
                }));
                return (c('React').createElement('div', babelHelpers['extends']({}, this.props, {
                    className: n
                }), this.props.children, o));
            },
            _bindResizeEvent: function m() {
                if (!this.isMounted()) return;
                if (j) {
                    this._sensorTarget = c('ReactDOM').findDOMNode(this.refs.sensorNode);
                } else this._sensorTarget = c('ReactDOM').findDOMNode(this.refs.sensorNode).contentWindow;
                if (this._sensorTarget) {
                    this._sensorTarget.onresize = this._resizeHandler.handleEvent;
                    this._resizeHandler.handleEvent();
                } else c('requestAnimationFrame')(this._bindResizeEvent);
            },
            _didResize: function m() {
                if (this.isMounted()) {
                    var n = c('ReactDOM').findDOMNode(this),
                        o = n.offsetWidth,
                        p = n.offsetHeight;
                    if (o !== this._width || p !== this._height) {
                        this._width = o;
                        this._height = p;
                        this.props.onResize(o, p);
                    }
                }
            }
        });
    f.exports = l;
}), null);
__d("XSaveController", ["XController"], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = c("XController").create("\/save\/story\/", {
        story_id: {
            type: "String"
        },
        object_id: {
            type: "Int"
        },
        action: {
            type: "Enum",
            enumType: 1
        },
        surface: {
            type: "Enum",
            enumType: 1
        },
        mechanism: {
            type: "Enum",
            enumType: 1
        },
        message_id: {
            type: "String"
        },
        tracking_message: {
            type: "String"
        }
    });
}), null);