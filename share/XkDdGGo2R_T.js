if (self.CavalryLogger) {
    CavalryLogger.start_js(["E\/lai"]);
}

__d('DocumentUploadConfig', ['DocumentUploadConfigInitialData'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        isSupported: function i(j) {
            if (!j) return false;
            if (c('DocumentUploadConfigInitialData').CONTENT_TYPES.length <= 0) return false;
            return c('DocumentUploadConfigInitialData').CONTENT_TYPES.includes(j);
        }
    };
    f.exports = h;
}), null);
__d('fileSliceName', ['UserAgent_DEPRECATED'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = 'slice',
        i;
    if (i = c('UserAgent_DEPRECATED').chrome()) {
        if (i < 21) h = 'webkitSlice';
    } else if (i = c('UserAgent_DEPRECATED').firefox()) {
        if (i < 13) h = 'mozSlice';
    } else if (!(i = c('UserAgent_DEPRECATED').safari()))
        if (c('UserAgent_DEPRECATED').webkit()) h = 'webkitSlice';
    f.exports = h;
}), null);
__d('fileSlice', ['fileSliceName'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = b.File && b.File.prototype[c('fileSliceName')];
    f.exports = h;
}), null);
__d('VideoUploadFeatureDetector', ['UserAgent_DEPRECATED', 'fileSlice'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        supportsChunking: function i() {
            return typeof c('fileSlice') === 'function' && this.supportsXHR();
        },
        supportsFullProgress: function i() {
            return !c('UserAgent_DEPRECATED').firefox();
        },
        supportsFileAPI: function i() {
            return 'FileList' in window;
        },
        supportsFileReading: function i() {
            return 'FileReader' in window && 'DataView' in window;
        },
        supportsXHR: function i() {
            return 'FormData' in window;
        }
    };
    f.exports = h;
}), null);
__d('ComposerXDragDropUtils', ['csx', 'cx', 'Arbiter', 'CSS', 'DocumentUploadConfig', 'DOMQuery', 'Parent', 'VideoUploadFeatureDetector'], (function a(b, c, d, e, f, g, h, i) {
    if (c.__markCompiled) c.__markCompiled();
    var j = {
        handleDragEnterAndLeave: function k(l) {
            var m = c('DOMQuery').scry(c('Parent').bySelector(l, "._119"), "._2wr");
            c('Arbiter').subscribe('dragenter', function(n, o) {
                if (l == o.element) m.forEach(c('CSS').hide);
            });
            c('Arbiter').subscribe('dragleave', function(n, o) {
                if (l == o.element) m.forEach(c('CSS').show);
            });
        },
        filterImages: function k(l) {
            var m = c('VideoUploadFeatureDetector').supportsFileAPI(),
                n = [];
            for (var o = 0; o < l.length; o++)
                if (l[o].type.match('image/*')) {
                    n.push(l[o]);
                } else if (m && l[o].type.match('video/*')) {
                n.push(l[o]);
            } else if (c('DocumentUploadConfig').isSupported(l[o].type)) n.push(l[o]);
            return n;
        }
    };
    f.exports = j;
}), null);
__d("DragDropFileUpload", [], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    g.isSupported = function() {
        return typeof FileList !== "undefined";
    };
}), null);
__d('DocumentDragDrop', ['Arbiter', 'CSS', 'DOMQuery', 'DragDropFileUpload', 'Event', 'emptyFunction', 'getObjectValues', 'getOrCreateDOMID'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {},
        i = 0;

    function j() {
        i = 0;
        c('getObjectValues')(h).forEach(function(o) {
            c('CSS').removeClass(o.element, o.className);
            c('Arbiter').inform('dragleave', {
                element: o.element
            });
        });
    }
    var k = null;

    function l() {
        k && clearTimeout(k);
        k = setTimeout(function() {
            j();
        }, 500);
    }
    var m = function o() {
            if (!c('DragDropFileUpload').isSupported()) return;
            c('Event').listen(document, 'dragenter', function(p) {
                if (i === 0) c('getObjectValues')(h).forEach(function(q) {
                    c('CSS').addClass(q.element, q.className);
                    c('Arbiter').inform('dragenter', {
                        element: q.element,
                        event: p
                    });
                });
                i++;
                l();
            });
            c('Event').listen(document, 'dragleave', function(p) {
                i--;
                if (i === 0) j();
                l();
            });
            c('Event').listen(document, 'drop', function(p) {
                j();
                var q = p.getTarget();
                if (c('DOMQuery').isNodeOfType(p.getTarget(), 'input'))
                    if (q.type === 'file') return;
                p.prevent();
            });
            c('Event').listen(document, 'dragover', c('Event').prevent);
            document.addEventListener('dragover', l, true);
            m = c('emptyFunction');
        },
        n = {
            init: function o() {
                m();
            },
            registerStatusElement: function o(p, q) {
                m();
                h[c('getOrCreateDOMID')(p)] = {
                    element: p,
                    className: q
                };
                if (i > 0) c('CSS').addClass(p, q);
            },
            removeStatusElement: function o(p) {
                var q = c('getOrCreateDOMID')(p),
                    r = h[q];
                if (r) {
                    c('CSS').removeClass(r.element, r.className);
                    delete h[q];
                }
            }
        };
    f.exports = n;
}), null);
__d('DragDropTarget', ['Arbiter', 'Event', 'SubscriptionsHandler', 'CSS', 'DataTransfer', 'DocumentDragDrop', 'DragDropFileUpload', 'emptyFunction'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(i) {
        this._element = i;
        this._listeners = new(c('SubscriptionsHandler'))();
        this._statusElem = i;
        this._dragEnterCount = 0;
        this._enabled = false;
    }
    Object.assign(h.prototype, {
        _onFilesDropCallback: c('emptyFunction'),
        _onURLDropCallback: c('emptyFunction'),
        _onPlainTextDropCallback: c('emptyFunction'),
        _onDropCallback: c('emptyFunction'),
        _fileFilterFn: c('emptyFunction').thatReturnsArgument,
        setOnDocumentDragEnterCallback: function i(j) {
            this._onDocumentDragEnterCallback = j;
            return this;
        },
        setOnDocumentDragLeaveCallback: function i(j) {
            this._onDocumentDragLeaveCallback = j;
            return this;
        },
        setOnDragEnterCallback: function i(j) {
            this._onDragEnterCallback = j;
            return this;
        },
        setOnDragLeaveCallback: function i(j) {
            this._onDragLeaveCallback = j;
            return this;
        },
        setOnFilesDropCallback: function i(j) {
            this._onFilesDropCallback = j;
            return this;
        },
        setOnURLDropCallback: function i(j) {
            this._onURLDropCallback = j;
            return this;
        },
        setOnPlainTextDropCallback: function i(j) {
            this._onPlainTextDropCallback = j;
            return this;
        },
        setOnDropCallback: function i(j) {
            this._onDropCallback = j;
            return this;
        },
        enable: function i() {
            if (!c('DragDropFileUpload').isSupported()) return this;
            this._listeners.engage();
            c('DocumentDragDrop').registerStatusElement(this._statusElem, 'fbWantsDragDrop');
            this._listeners.addSubscriptions(c('Event').listen(this._element, 'dragenter', this._onDragEnter.bind(this)), c('Event').listen(this._element, 'dragleave', this._onDragLeave.bind(this)), c('Event').listen(this._element, 'dragover', this._onDragOver.bind(this)), c('Event').listen(this._element, 'drop', function(j) {
                this._dragEnterCount = 0;
                c('CSS').removeClass(this._statusElem, 'fbDropReady');
                c('CSS').removeClass(this._statusElem, 'fbDropReadyPhoto');
                c('CSS').removeClass(this._statusElem, 'fbDropReadyPhotos');
                c('CSS').removeClass(this._statusElem, 'fbDropReadyLink');
                var k = new(c('DataTransfer'))(j.dataTransfer),
                    l = {},
                    m = false,
                    n = this._fileFilterFn(j.dataTransfer.files);
                if (n.length) {
                    this._onFilesDropCallback(n, j);
                    l.files = n;
                    m = true;
                }
                var o = k.getLink();
                if (o) {
                    this._onURLDropCallback(o, j);
                    l.url = o;
                    m = true;
                }
                var p = k.getText();
                if (p) {
                    this._onPlainTextDropCallback(p, j);
                    l.plainText = p;
                    m = true;
                }
                if (m) this._onDropCallback(l, j);
                j.kill();
            }.bind(this)));
            this._listeners.addSubscriptions(c('Arbiter').subscribe('dragenter', this._onDocumentDragEnter.bind(this)), c('Arbiter').subscribe('dragleave', this._onDocumentDragLeave.bind(this)));
            this._enabled = true;
            return this;
        },
        disable: function i() {
            if (!this._enabled) return this;
            c('DocumentDragDrop').removeStatusElement(this._statusElem, 'fbWantsDragDrop');
            c('CSS').removeClass(this._statusElem, 'fbDropReady');
            c('CSS').removeClass(this._statusElem, 'fbDropReadyPhoto');
            c('CSS').removeClass(this._statusElem, 'fbDropReadyPhotos');
            c('CSS').removeClass(this._statusElem, 'fbDropReadyLink');
            this._listeners.release();
            this._enabled = false;
            return this;
        },
        setFileFilter: function i(j) {
            this._fileFilterFn = j;
            return this;
        },
        setStatusElement: function i(j) {
            this._statusElem = j;
            return this;
        },
        _onDragEnter: function i(j) {
            if (this._dragEnterCount === 0) {
                var k = new(c('DataTransfer'))(j.dataTransfer);
                c('CSS').addClass(this._statusElem, 'fbDropReady');
                if (k.isLink() || !k.isImage()) {
                    c('CSS').addClass(this._statusElem, 'fbDropReadyLink');
                } else if (k.getCount() > 1) {
                    c('CSS').addClass(this._statusElem, 'fbDropReadyPhotos');
                } else c('CSS').addClass(this._statusElem, 'fbDropReadyPhoto');
                this._onDragEnterCallback && this._onDragEnterCallback();
            }
            this._dragEnterCount++;
            j.preventDefault();
        },
        _onDragLeave: function i(j) {
            this._dragEnterCount = Math.max(this._dragEnterCount - 1, 0);
            if (this._dragEnterCount === 0) {
                c('CSS').removeClass(this._statusElem, 'fbDropReady');
                c('CSS').removeClass(this._statusElem, 'fbDropReadyPhoto');
                c('CSS').removeClass(this._statusElem, 'fbDropReadyPhotos');
                c('CSS').removeClass(this._statusElem, 'fbDropReadyLink');
                this._onDragLeaveCallback && this._onDragLeaveCallback();
            }
        },
        _onDragOver: function i(j) {
            if (!j.dataTransfer) {
                c('Event').kill(j);
                return;
            }
            try {
                var l = j.dataTransfer.effectAllowed;
                j.dataTransfer.dropEffect = l == 'move' || l == 'linkMove' ? 'move' : 'copy';
            } catch (k) {}
            c('Event').kill(j);
        },
        _onDocumentDragEnter: function i(event, j) {
            if (this._onDocumentDragEnterCallback && j.element == this._element) this._onDocumentDragEnterCallback();
        },
        _onDocumentDragLeave: function i(event, j) {
            this._dragEnterCount = 0;
            this._onDragLeave(event);
            if (this._onDocumentDragLeaveCallback && j.element == this._element) this._onDocumentDragLeaveCallback();
        }
    });
    f.exports = h;
}), null);
__d('LitestandComposer', ['Arbiter', 'Bootloader', 'ReactComposerIDGenerator', 'Run', 'SubscriptionsHandler'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = 600;

    function i(k, l) {
        c('Bootloader').loadModules(["Animation", "ComposerXController", "ComposerXMarauderLogger", "DOM", "LitestandStream"], function(m, n, o, p, q) {
            if (!c('ReactComposerIDGenerator').isComposerID(k)) n.reset(k);
            if (!q || !l) return;
            p.prependContent(q.getStreamRoot(), l);
            new m(l).from('opacity', 0).to('opacity', 1).duration(h).go();
            o.logCompleted(k);
        }, 'LitestandComposer');
    }
    var j = {
        initComposer: function k(l) {
            var m = new(c('SubscriptionsHandler'))();
            m.addSubscriptions(c('Arbiter').subscribe('LitestandComposer/publish', function(n, o) {
                if (o.composer_id === l) i(l, o.markup);
            }.bind(this)));
            c('Run').onLeave(function() {
                m.release();
            });
        }
    };
    f.exports = j;
}), null);
__d('ReactComposerAttachmentLoader', ['ReactComposerAttachmentActions', 'ReactComposerAttachmentInitState', 'ReactComposerAttachmentStore', 'ReactComposerStore', 'XReactComposerLoggingODSController', 'AsyncRequest'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        load: function i(j, k, l, m) {
            var n = c('ReactComposerAttachmentStore').getAttachment(j, k);
            if (!n || n.initState === c('ReactComposerAttachmentInitState').INITIALIZED) return;
            c('ReactComposerAttachmentActions').setInitialized(j, k);
            this._logToODS(j, 'bootload_start', k);
            l(function(o, p) {
                this._logToODS(j, 'bootload_done', k);
                c('ReactComposerAttachmentActions').setBootloaded(j, k, o, p);
            }.bind(this));
            this._logToODS(j, 'bootstrap_start', k);
            new(c('AsyncRequest'))(m).setHandler(function() {
                this._logToODS(j, 'bootstrap_done', k);
                setTimeout(function() {
                    return c('ReactComposerAttachmentActions').setBootstrapped(j, k);
                }, 0);
            }.bind(this)).send();
        },
        _logToODS: function i(j, event, k) {
            var l = c('XReactComposerLoggingODSController').getURIBuilder().setString('event', event).setString('attachment_type', k).setEnum('composer_type', c('ReactComposerStore').getRef(j)).getURI();
            new(c('AsyncRequest'))(l).send();
        }
    };
    f.exports = h;
}), null);
__d('ReactComposerAttachmentPlaceholder.react', ['cx', 'React', 'XUISpinner.react', 'joinClasses'], (function a(b, c, d, e, f, g, h) {
    'use strict';
    var i, j;
    if (c.__markCompiled) c.__markCompiled();
    i = babelHelpers.inherits(k, c('React').PureComponent);
    j = i && i.prototype;
    k.prototype.render = function() {
        var l = c('joinClasses')(this.props.className, "_2nt-");
        return (c('React').createElement('div', {
            className: l
        }, c('React').createElement(c('XUISpinner.react'), {
            className: "_2nt_",
            size: 'large'
        })));
    };

    function k() {
        i.apply(this, arguments);
    }
    f.exports = k;
}), null);
__d('ReactComposerAttachmentSelector.react', ['cx', 'Image.react', 'Link.react', 'React', 'TooltipData', 'joinClasses'], (function a(b, c, d, e, f, g, h) {
    'use strict';
    var i, j;
    if (c.__markCompiled) c.__markCompiled();
    var k = c('React').PropTypes;
    i = babelHelpers.inherits(l, c('React').PureComponent);
    j = i && i.prototype;
    l.prototype.render = function() {
        var m = c('joinClasses')("_4-h7" + (this.props.selected ? ' ' + "_5qtn" : ''), 'fbReactComposerAttachmentSelector_' + this.props.attachmentID);
        return (c('React').createElement(c('Link.react'), babelHelpers['extends']({
            onClick: this.props.onSelected,
            className: m,
            role: 'tab',
            'aria-selected': this.props.selected,
            'data-tooltip-delay': '500'
        }, c('TooltipData').propsFor(this.props.label), this.props), c('React').createElement('span', {
            className: "_4-fs"
        }, c('React').createElement(c('Image.react'), {
            src: this.props.icon,
            className: "_5qto"
        }), c('React').createElement('span', {
            className: "_5qtp"
        }, this.props.label), c('React').createElement('span', {
            className: "_4-h8"
        }))));
    };

    function l() {
        i.apply(this, arguments);
    }
    l.propTypes = {
        selected: k.bool,
        label: k.string.isRequired,
        icon: k.object.isRequired,
        onSelected: k.func.isRequired
    };
    l.defaultProps = {
        selected: false
    };
    f.exports = l;
}), null);
__d('TreeMap', ['Map', 'nullthrows'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();

    function h(v, w, x) {
        this.key = v;
        this.value = w;
        this.time = x;
    }

    function i(v) {
        this.$TreeMap1 = function(w, x) {
            var y = v(w, x);
            return y !== 0 ? y : w.time - x.time;
        };
        this.$TreeMap2 = new(c('Map'))();
        this.$TreeMap3 = null;
        this.$TreeMap4 = 0;
        this.size = this.$TreeMap2.size;
    }
    i.prototype.clear = function() {
        this.$TreeMap2 = new(c('Map'))();
        this.$TreeMap3 = null;
        this.size = this.$TreeMap2.size;
    };
    i.prototype.has = function(v) {
        return this.$TreeMap2.has(v);
    };
    i.prototype.set = function(v, w) {
        if (this.has(v)) this['delete'](v);
        var x = new h(v, w, this.$TreeMap4++);
        this.$TreeMap2.set(v, x);
        this.$TreeMap3 = p(this.$TreeMap3, x, this.$TreeMap1);
        this.size = this.$TreeMap2.size;
        return this;
    };
    i.prototype.get = function(v) {
        return this.has(v) ? this.$TreeMap2.get(v).value : undefined;
    };
    i.prototype['delete'] = function(v) {
        if (!this.has(v)) return false;
        var w = this.$TreeMap2.get(v);
        this.$TreeMap3 = q(this.$TreeMap3, w, this.$TreeMap1);
        this.$TreeMap2['delete'](v);
        this.size = this.$TreeMap2.size;
        return true;
    };
    i.prototype.keys = function() {
        var v = [];
        u(this.$TreeMap3, v, function(w) {
            return w.key;
        });
        return v;
    };
    i.prototype.values = function() {
        var v = [];
        u(this.$TreeMap3, v, function(w) {
            return w.value;
        });
        return v;
    };
    i.prototype.entries = function() {
        var v = [];
        u(this.$TreeMap3, v, function(w) {
            return {
                key: w.key,
                value: w.value
            };
        });
        return v;
    };
    i.prototype.range = function(v, w) {
        var x = [],
            y = null;
        if (v) y = new h(v.key, v.value, -1);
        var z = null;
        if (w) z = new h(w.key, w.value, this.$TreeMap4);
        u(this.$TreeMap3, x, function(aa) {
            return {
                key: aa.key,
                value: aa.value
            };
        }, this.$TreeMap1, y, z);
        return x;
    };
    i.prototype.min = function() {
        if (!this.$TreeMap3) return undefined;
        var v = r(c('nullthrows')(this.$TreeMap3)),
            w = v.key,
            x = v.value;
        return {
            key: w,
            value: x
        };
    };
    i.prototype.max = function() {
        if (!this.$TreeMap3) return undefined;
        var v = s(c('nullthrows')(this.$TreeMap3)),
            w = v.key,
            x = v.value;
        return {
            key: w,
            value: x
        };
    };
    i.prototype.__testRoot = function() {};

    function j(v) {
        if (!v) return v;
        o(v);
        if (v.balanceFactor < -1) {
            if (v.right && v.right.balanceFactor <= 0) {
                return k(v);
            } else return l(v);
        } else if (v.balanceFactor > 1) {
            if (v.left && v.left.balanceFactor >= 0) {
                return m(v);
            } else return n(v);
        } else return v;
    }

    function k(v) {
        var w = v,
            x = c('nullthrows')(w.right),
            y = x.left;
        w.right = y;
        o(w);
        c('nullthrows')(x).left = w;
        o(x);
        return x;
    }

    function l(v) {
        var w = v,
            x = c('nullthrows')(w.right),
            y = c('nullthrows')(x.left),
            z = y.left,
            aa = y.right;
        w.right = z;
        o(w);
        x.left = aa;
        o(x);
        y = c('nullthrows')(y);
        y.left = w;
        y.right = x;
        o(y);
        return y;
    }

    function m(v) {
        var w = v,
            x = c('nullthrows')(w.left),
            y = x.right;
        w.left = y;
        o(w);
        x.right = w;
        o(x);
        return x;
    }

    function n(v) {
        var w = v,
            x = c('nullthrows')(w.left),
            y = c('nullthrows')(x.right),
            z = y.left,
            aa = y.right;
        x.right = z;
        o(x);
        w.left = aa;
        o(w);
        y.left = x;
        y.right = w;
        o(y);
        return y;
    }

    function o(v) {
        var w = v.left ? v.left.height : -1,
            x = v.right ? v.right.height : -1;
        v.height = Math.max(w, x) + 1;
        v.balanceFactor = w - x;
    }

    function p(v, w, x) {
        if (v == null) return j(w);
        var y = x(w, v);
        if (y < 0) {
            v.left = p(v.left, w, x);
            return j(v);
        } else {
            v.right = p(v.right, w, x);
            return j(v);
        }
    }

    function q(v, w, x) {
        if (v == null) return null;
        if (v === w)
            if (v.left && v.right) {
                var y = s(v.left);
                v.left = t(v.left);
                y.left = v.left;
                y.right = v.right;
                return j(y);
            } else if (v.left) {
            return j(v.left);
        } else if (v.right) {
            return j(v.right);
        } else return null;
        var z = x(w, v);
        if (z < 0) {
            v.left = q(v.left, w, x);
            return j(v);
        } else {
            v.right = q(v.right, w, x);
            return j(v);
        }
    }

    function r(v) {
        while (v.left) v = v.left;
        return v;
    }

    function s(v) {
        while (v.right) v = v.right;
        return v;
    }

    function t(v) {
        if (!v) return null;
        if (v.right == null) return j(v.left || null);
        v.right = t(v.right);
        return j(v);
    }

    function u(v, w, x, y, z, aa) {
        if (v == null) return;
        var ba = !y || !z || y(v, z) >= 0,
            ca = !y || !aa || y(v, aa) <= 0;
        if (ba) u(v.left, w, x, y, z, aa);
        if (ba && ca) w.push(x(v));
        if (ca) u(v.right, w, x, y, z, aa);
    }
    f.exports = i;
}), null);
__d('Cache', ['DateConsts', 'Map', 'TreeMap'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();

    function h() {
        this.$Cache1 = new(c('Map'))();
    }
    h.prototype.has = function(i) {
        return this.$Cache1.has(i);
    };
    h.prototype.get = function(i, j) {
        var k = this.__getRaw(i);
        if (!k) return j;
        return k.$Cache2;
    };
    h.prototype.getAll = function(i, j) {
        var k = new(c('Map'))();
        i.forEach(function(l) {
            return k.set(l, this.get(l, j));
        }.bind(this));
        return k;
    };
    h.prototype['delete'] = function(i) {
        var j = this.__getRaw(i);
        if (j && j.$Cache3) clearTimeout(j.$Cache3);
        return this.$Cache1['delete'](i);
    };
    h.prototype.clear = function() {
        this.$Cache1.forEach(function(i) {
            if (i && i.$Cache3) clearTimeout(i.$Cache3);
        });
        this.$Cache1.clear();
    };
    h.prototype.set = function(i, j, k, l) {
        if (!this.shouldUpdate(i, k)) return false;
        var m = this.__getRaw(i);
        if (!m) m = this.__getNewRawObject();
        delete m.$Cache2;
        delete m.$Cache4;
        if (m.$Cache3) clearTimeout(m.$Cache3);
        delete m.$Cache3;
        m.$Cache2 = j;
        if (k != null) m.$Cache4 = k;
        if (l != null && l >= 0) m.$Cache3 = setTimeout(this['delete'].bind(this, i), l * c('DateConsts').MS_PER_SEC * c('DateConsts').SEC_PER_MIN);
        this.__setRaw(i, m);
        return true;
    };
    h.prototype.shouldUpdate = function(i, j) {
        var k = this.__getRaw(i);
        return (k == null || k.$Cache4 == null || j == null || j > k.$Cache4);
    };
    h.prototype.size = function() {
        return this.$Cache1.size;
    };
    h.prototype.__getRaw = function(i) {
        return this.$Cache1.get(i);
    };
    h.prototype.__setRaw = function(i, j) {
        this.$Cache1.set(i, j);
    };
    h.prototype.__getNewRawObject = function() {
        return {
            $Cache2: null,
            $Cache3: null,
            $Cache4: null,
            $Cache5: null,
            $Cache6: null
        };
    };
    h.prototype.__keys = function() {
        return this.$Cache1.keys();
    };
    f.exports = h;
}), null);
__d('QE', ['Banzai', 'Cache'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = 'qe_log_exposure',
        i = 60,
        j = new(c('Cache'))(),
        k = {
            logExposure: function l(m, n) {
                var o = n ? m + '|' + n : m;
                if (j.has(o)) return;
                var p = {
                        signal: true
                    },
                    q = {
                        name: m,
                        id: null
                    };
                if (n) q.id = n;
                c('Banzai').post(h, q, p);
                j.set(o, true, 1, i);
            }
        };
    f.exports = k;
}), null);
__d('ReactComposerAttachmentSelectorContainer.react', ['ReactComposerAttachmentActions', 'ReactComposerAttachmentSelector.react', 'ReactComposerAttachmentStore', 'ReactComposerAttachmentType', 'ComposerEntryPointRef', 'ReactComposerEvents', 'ReactComposerPropsAndStoreBasedStateMixin', 'Arbiter', 'ReactComponentWithPureRenderMixin', 'React', 'QE', 'emptyFunction', 'getObjectValues'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = c('React').PropTypes,
        i = c('React').createClass({
            displayName: 'ComposerAttachmentSelectorContainer',
            mixins: [c('ReactComponentWithPureRenderMixin'), c('ReactComposerPropsAndStoreBasedStateMixin')(c('ReactComposerAttachmentStore'))],
            propTypes: {
                attachmentID: h.oneOf(c('getObjectValues')(c('ReactComposerAttachmentType'))).isRequired,
                label: h.string.isRequired,
                icon: h.object.isRequired,
                onSelected: h.func,
                loggingName: h.string.isRequired,
                disableSelectAttachment: h.bool
            },
            getDefaultProps: function j() {
                return {
                    onSelected: c('emptyFunction'),
                    disableSelectAttachment: false
                };
            },
            statics: {
                calculateState: function j(k, l) {
                    return {
                        selected: c('ReactComposerAttachmentStore').getIsAttachmentSelected(k, l.attachmentID)
                    };
                }
            },
            _onSelected: function j() {
                if (this.context.composerType === c('ComposerEntryPointRef').TIMELINE && this.context.actorID !== this.context.targetID) {
                    c('QE').logExposure('entdirectedpost_multi_photos_universe');
                    c('QE').logExposure('www_entdirectedphoto_with_multimedia');
                }
                if (this.props.disableSelectAttachment) return;
                c('ReactComposerAttachmentActions').selectAttachment(this.context.composerID, this.props.attachmentID, true, this.props.loggingName);
                setTimeout(function() {
                    return c('Arbiter').inform(c('ReactComposerEvents').ACTIVATE_ATTACHMENT + this.context.composerID);
                }.bind(this), 0);
            },
            render: function j() {
                var k = this.props.onSelected !== c('emptyFunction') ? this.props.onSelected : this._onSelected;
                return (c('React').createElement(c('ReactComposerAttachmentSelector.react'), babelHelpers['extends']({}, this.props, {
                    selected: this.state.selected,
                    showNLUEducation: this.state.showNLUEducation,
                    onSelected: k
                })));
            }
        });
    f.exports = i;
}), null);
__d('ReactComposerAlbumActionType', ['keyMirrorRecursive'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    f.exports = c('keyMirrorRecursive')({
        CREATE_ALBUM_CLICKED: null
    }, 'ReactComposerAlbumActionType');
}), null);
__d('ReactComposerAlbumActions', ['ReactComposerAlbumActionType', 'ReactComposerDispatcher'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    h.prototype.selectorClicked = function(i) {
        'use strict';
        c('ReactComposerDispatcher').dispatch({
            composerID: i,
            type: c('ReactComposerAlbumActionType').CREATE_ALBUM_SELECTOR_CLICKED
        });
    };

    function h() {
        'use strict';
    }
    f.exports = new h();
}), null);
__d('ReactComposerAlbumAttachmentSelector.react', ['ReactComposerAlbumActions', 'ReactComposerContextMixin', 'DOMContainer.react', 'ReactComponentWithPureRenderMixin', 'React'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = c('React').PropTypes,
        i = c('React').createClass({
            displayName: 'ReactComposerAlbumAttachmentSelector',
            mixins: [c('ReactComposerContextMixin'), c('ReactComponentWithPureRenderMixin')],
            propTypes: {
                isInMoreButton: h.bool,
                createAlbumLink: h.any
            },
            render: function j() {
                return (c('React').createElement(c('DOMContainer.react'), {
                    display: 'block',
                    onClick: this._onClick
                }, this.props.createAlbumLink));
            },
            _onClick: function j() {
                c('ReactComposerAlbumActions').selectorClicked(this.context.composerID);
            }
        });
    f.exports = i;
}), null);
__d('ReactComposerDragDropPrompt.react', ['cx', 'fbt', 'React'], (function a(b, c, d, e, f, g, h, i) {
    var j, k;
    if (c.__markCompiled) c.__markCompiled();
    j = babelHelpers.inherits(l, c('React').PureComponent);
    k = j && j.prototype;
    l.prototype.render = function() {
        'use strict';
        return (c('React').createElement('div', {
            className: "_1y-n"
        }, c('React').createElement('div', {
            className: "_1y-o"
        }, c('React').createElement('span', {
            className: "_1y-p"
        }, i._("Drag Link\/Photos\/Video Here")), c('React').createElement('span', {
            className: "_1y-q"
        }, i._("Drop Link")), c('React').createElement('span', {
            className: "_1y-r"
        }, i._("Drop Photo\/Video")), c('React').createElement('span', {
            className: "_1y-s"
        }, i._("Drop Photos")))));
    };

    function l() {
        'use strict';
        j.apply(this, arguments);
    }
    f.exports = l;
}), null);
__d('ReactComposerDragDropPromptLazy.react', ['ReactComposerDragDropPrompt.react', 'ComposerXDragDropUtils', 'DragDropTarget', 'React', 'ReactDOM', 'emptyFunction'], (function a(b, c, d, e, f, g) {
    var h, i;
    if (c.__markCompiled) c.__markCompiled();
    var j = c('React').PropTypes;
    h = babelHelpers.inherits(k, c('React').PureComponent);
    i = h && h.prototype;

    function k() {
        var l, m;
        'use strict';
        for (var n = arguments.length, o = Array(n), p = 0; p < n; p++) o[p] = arguments[p];
        return m = (l = i.constructor).call.apply(l, [this].concat(o)), this.$ReactComposerDragDropPromptLazy1 = undefined, m;
    }
    k.prototype.componentDidMount = function() {
        'use strict';
        var l = c('ReactDOM').findDOMNode(this.props.root);
        this.$ReactComposerDragDropPromptLazy1 = new(c('DragDropTarget'))(l).setOnFilesDropCallback(this.props.onFilesDrop).setOnURLDropCallback(this.props.onURLDrop).setFileFilter(c('ComposerXDragDropUtils').filterImages).enable();
    };
    k.prototype.componentWillUnmount = function() {
        'use strict';
        this.$ReactComposerDragDropPromptLazy1 && this.$ReactComposerDragDropPromptLazy1.disable();
    };
    k.prototype.render = function() {
        'use strict';
        return c('React').createElement(c('ReactComposerDragDropPrompt.react'), null);
    };
    k.propTypes = {
        root: j.object.isRequired,
        onFilesDrop: j.func,
        onURLDrop: j.func
    };
    k.defaultProps = {
        onFilesDrop: c('emptyFunction'),
        onURLDrop: c('emptyFunction')
    };
    f.exports = k;
}), null);
__d('ReactComposerAttachmentBodyMixin', ['invariant', 'ReactComposerAttachmentActions', 'ReactComposerAttachmentStore', 'ReactComposerPropsAndStoreBasedStateMixin', 'ReactComponentWithPureRenderMixin'], (function a(b, c, d, e, f, g, h) {
    if (c.__markCompiled) c.__markCompiled();

    function i() {
        for (var j = arguments.length, k = Array(j), l = 0; l < j; l++) k[l] = arguments[l];
        k = k.concat(c('ReactComposerAttachmentStore'));
        return {
            mixins: [c('ReactComponentWithPureRenderMixin'), c('ReactComposerPropsAndStoreBasedStateMixin').apply(this, k)],
            statics: {
                beforeCalculateInitialState: function m(n, o) {
                    var p = this.getAttachmentConfig ? this.getAttachmentConfig(o) : o.config && o.config.attachmentsConfig && o.config.attachmentsConfig[this.attachmentID];
                    c('ReactComposerAttachmentActions').registerAttachment(n, {
                        id: this.attachmentID,
                        selected: o.selected,
                        config: p
                    });
                },
                calculateState: function m(n, o) {
                    return Object.assign({
                        selected: c('ReactComposerAttachmentStore').getIsAttachmentSelected(n, this.attachmentID)
                    }, this.calculateAttachmentState ? this.calculateAttachmentState(n, o) : {});
                }
            },
            componentWillMount: function m() {
                !this.constructor.attachmentID ? h(0) : void 0;
                !this.constructor.attachmentID ? h(0) : void 0;
            },
            render: function m() {
                if (!this.state.selected) return null;
                return this.renderX();
            }
        };
    }
    f.exports = i;
}), null);
__d('ReactComposerLoadableAttachmentBodyMixin', ['cx', 'invariant', 'ReactComposerAttachmentBodyMixin', 'ReactComposerAttachmentInitState', 'ReactComposerAttachmentLoader', 'ReactComposerAttachmentPlaceholder.react', 'ReactComposerAttachmentStore', 'ReactComposerStore', 'React'], (function a(b, c, d, e, f, g, h, i) {
    if (c.__markCompiled) c.__markCompiled();
    var j = {
        mixins: [c('ReactComposerAttachmentBodyMixin')(c('ReactComposerAttachmentStore'))],
        statics: {
            calculateAttachmentState: function k(l, m) {
                var n = c('ReactComposerAttachmentStore').getAttachment(l, this.attachmentID),
                    o = c('ReactComposerAttachmentStore').getIsAttachmentSelected(l, this.attachmentID),
                    p = c('ReactComposerStore').isActive(l);
                return {
                    composerIsActive: p,
                    initState: n && n.initState,
                    attachmentModule: n && n.module,
                    bootstrapped: n && n.bootstrapped,
                    postButtonModule: n && n.postButtonModule,
                    isSelected: o
                };
            }
        },
        componentWillMount: function k() {
            !this.constructor.attachmentID ? i(0) : void 0;
            if (this.props.selected && this._shouldInitialize()) this._initialize();
        },
        componentDidUpdate: function k(l, m) {
            if (this.state.initState === c('ReactComposerAttachmentInitState').INITIALIZING && this._shouldInitialize()) this._initialize();
        },
        renderX: function k() {
            if (!this.state.attachmentModule || !this.state.bootstrapped) {
                var l = this.getPlaceholderModule && this.getPlaceholderModule(),
                    m = l ? l : c('ReactComposerAttachmentPlaceholder.react');
                return (c('React').createElement(m, babelHelpers['extends']({
                    className: "_3rlw"
                }, this.props)));
            }
            var n = this.state.attachmentModule;
            return (c('React').createElement(n, babelHelpers['extends']({}, this.props, {
                postButtonModule: this.state.postButtonModule
            })));
        },
        _shouldInitialize: function k() {
            return this.constructor.initOnlyWhenComposerActive ? this.state.composerIsActive : true;
        },
        _initialize: function k() {
            c('ReactComposerAttachmentLoader').load(this.context.composerID, this.constructor.attachmentID, this.bootload, this.getBootstrapURI());
        }
    };
    f.exports = j;
}), null);
__d("XReactComposerLiveVideoAttachmentBootstrapController", ["XController"], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = c("XController").create("\/react_composer\/live_video\/bootstrap\/", {
        composer_id: {
            type: "String",
            required: true
        },
        composer_type: {
            type: "Enum",
            required: true,
            enumType: 1
        },
        target_id: {
            type: "Int",
            required: true
        }
    });
}), null);
__d('ReactComposerLiveVideoLazyAttachment.react', ['ReactComposerAttachmentType', 'ReactComposerLoadableAttachmentBodyMixin', 'ActorURI', 'Bootloader', 'React', 'XReactComposerLiveVideoAttachmentBootstrapController'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = c('React').PropTypes,
        i = c('React').createClass({
            displayName: 'ReactComposerLiveVideoLazyAttachment',
            mixins: [c('ReactComposerLoadableAttachmentBodyMixin')],
            propTypes: {
                selected: h.bool
            },
            statics: {
                attachmentID: c('ReactComposerAttachmentType').LIVE_VIDEO
            },
            bootload: function j(k) {
                c('Bootloader').loadModules(["ReactComposerLiveVideoAttachmentContainer.react"], k, 'ReactComposerLiveVideoLazyAttachment.react');
            },
            getBootstrapURI: function j() {
                return c('ActorURI').create(c('XReactComposerLiveVideoAttachmentBootstrapController').getURIBuilder().setString('composer_id', this.context.composerID).setEnum('composer_type', this.context.composerType).setInt('target_id', this.context.targetID).getURI(), this.context.actorID);
            }
        });
    f.exports = i;
}), null);
__d('ReactComposerMediaAttachmentSelector.react', ['fbt', 'ix', 'ReactComponentWithPureRenderMixin', 'React', 'ReactComposerAttachmentSelectorContainer.react', 'ReactComposerAttachmentType', 'ReactComposerLoggingName'], (function a(b, c, d, e, f, g, h, i) {
    if (c.__markCompiled) c.__markCompiled();
    var j = c('React').PropTypes,
        k = c('React').createClass({
            displayName: 'ReactComposerMediaAttachmentSelector',
            mixins: [c('ReactComponentWithPureRenderMixin')],
            propTypes: {
                isInMoreButton: j.bool,
                label: j.string
            },
            getDefaultProps: function l() {
                return {
                    label: h._("Photo \/ Video")
                };
            },
            render: function l() {
                return (c('React').createElement(c('ReactComposerAttachmentSelectorContainer.react'), {
                    attachmentID: c('ReactComposerAttachmentType').MEDIA,
                    label: this.props.label,
                    icon: i('/images/facelift/composer/icons/camera_16.png'),
                    'data-testid': 'media-attachment-selector',
                    loggingName: c('ReactComposerLoggingName').MEDIA_TAB_SELECTOR
                }));
            }
        });
    f.exports = k;
}), null);
__d('ReactComposerBootloaderPropTypes', ['React'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    var h = c('React').PropTypes;
    f.exports = h.shape({
        statusAttachment: h.func.isRequired,
        mediaAttachment: h.func.isRequired,
        qandaAttachment: h.func,
        questionAttachment: h.func,
        extraAttachment: h.func
    });
}), null);
__d("XReactComposerMediaAttachmentBootstrapController", ["XController"], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = c("XController").create("\/react_composer\/media\/bootstrap\/", {
        composer_id: {
            type: "String",
            required: true
        },
        composer_type: {
            type: "Enum",
            required: true,
            enumType: 1
        },
        target_id: {
            type: "String",
            required: true
        }
    });
}), null);
__d('ReactComposerMediaInitUtils', ['ActorURI', 'Bootloader', 'XReactComposerMediaAttachmentBootstrapController'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        bootload: function i(j) {
            c('Bootloader').loadModules(["ReactComposerMediaAttachmentContainer.react", "ReactComposerMediaAttachmentPostButtonContainer.react"], j, 'ReactComposerMediaInitUtils');
        },
        getBootstrapURI: function i(j, k, l, m) {
            return c('ActorURI').create(c('XReactComposerMediaAttachmentBootstrapController').getURIBuilder().setString('composer_id', j).setEnum('composer_type', k).setString('target_id', l).getURI(), m);
        }
    };
    f.exports = h;
}), null);
__d('ReactComposerMediaLazyAttachment.react', ['ReactComposerAttachmentType', 'ReactComposerBootloaderPropTypes', 'ReactComposerLoadableAttachmentBodyMixin', 'ReactComposerMediaInitUtils', 'React'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = c('React').PropTypes,
        i = c('React').createClass({
            displayName: 'ReactComposerMediaLazyAttachment',
            mixins: [c('ReactComposerLoadableAttachmentBodyMixin')],
            propTypes: {
                additionalTaggers: h.arrayOf(h.shape({
                    button: h.element.isRequired,
                    container: h.element.isRequired
                })),
                additionalFooterActions: h.arrayOf(h.element),
                bootloader: c('ReactComposerBootloaderPropTypes')
            },
            statics: {
                attachmentID: c('ReactComposerAttachmentType').MEDIA
            },
            bootload: function j(k) {
                if (this.props.bootloader) {
                    this.props.bootloader.mediaAttachment(k);
                } else c('ReactComposerMediaInitUtils').bootload(k);
            },
            getBootstrapURI: function j() {
                return c('ReactComposerMediaInitUtils').getBootstrapURI(this.context.composerID, this.context.composerType, this.context.targetID, this.context.actorID);
            }
        });
    f.exports = i;
}), null);
__d('ReactComposerActions', ['ReactComposerActionTypes', 'ReactComposerDispatcher', 'ReactComposerStore'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    c('ReactComposerStore');
    var h, i = {
        initConfig: function j(k, l, m) {
            c('ReactComposerDispatcher').dispatch({
                composerID: k,
                type: c('ReactComposerActionTypes').INIT_CONFIG,
                loggingConfig: l,
                activateOnInit: m === true
            });
        },
        postError: function j(k, l) {
            c('ReactComposerDispatcher').dispatch({
                composerID: k,
                type: c('ReactComposerActionTypes').POST_ERROR,
                response: l
            });
        },
        postIntended: function j(k, l) {
            setTimeout(function() {
                if (!h || h(k, l.actorID, l.config, l.targetID)) c('ReactComposerDispatcher').dispatch({
                    composerID: k,
                    type: c('ReactComposerActionTypes').POST_INTENDED,
                    actorID: l.actorID,
                    config: l.config,
                    targetID: l.targetID
                });
            }, 0);
        },
        registerPostIntendedHandler: function j(k) {
            h = k;
        },
        postStarted: function j(k, l) {
            var m = l.actorID,
                n = l.composerType,
                o = l.config,
                p = l.onPostSuccess,
                q = l.targetID,
                r = babelHelpers.objectWithoutProperties(l, ['actorID', 'composerType', 'config', 'onPostSuccess', 'targetID']);
            setTimeout(function() {
                return c('ReactComposerDispatcher').dispatch({
                    composerID: k,
                    composerType: n,
                    type: c('ReactComposerActionTypes').POST_STARTED,
                    actorID: m,
                    config: o,
                    targetID: q,
                    onPostSuccess: p,
                    otherData: r
                });
            }, 0);
        },
        postSucceeded: function j(k) {
            c('ReactComposerDispatcher').dispatch({
                composerID: k,
                type: c('ReactComposerActionTypes').POST_SUCCEEDED
            });
        },
        postFinally: function j(k, l) {
            c('ReactComposerDispatcher').dispatch({
                composerID: k,
                type: c('ReactComposerActionTypes').POST_FINALLY,
                response: l
            });
        },
        publishStarted: function j(k) {
            c('ReactComposerDispatcher').dispatch({
                composerID: k,
                type: c('ReactComposerActionTypes').PUBLISH_STARTED
            });
        },
        reset: function j(k) {
            c('ReactComposerDispatcher').dispatch({
                composerID: k,
                type: c('ReactComposerActionTypes').COMPOSER_RESET
            });
        },
        expandSprouts: function j(k) {
            c('ReactComposerDispatcher').dispatch({
                composerID: k,
                type: c('ReactComposerActionTypes').EXPAND_SPROUTS
            });
        }
    };
    f.exports = i;
}), null);
__d('ReactComposerPostUtilsCore', ['invariant', 'ReactComposerActions'], (function a(b, c, d, e, f, g, h) {
    if (c.__markCompiled) c.__markCompiled();
    var i = {
        getCoreData: function j(k, l, m) {
            !(!isNaN(m) && m > 0) ? h(0): void 0;
            return Object.assign({
                is_react: true,
                xhpc_composerid: k,
                xhpc_targetid: m
            }, l);
        },
        handlePostSucceeded: function j(k) {
            c('ReactComposerActions').postSucceeded(k);
            c('ReactComposerActions').reset(k);
        }
    };
    f.exports = i;
}), null);
__d('ReactComposerProfilePhoto.react', ['cx', 'fbt', 'Image.react', 'Link.react', 'React'], (function a(b, c, d, e, f, g, h, i) {
    var j, k;
    if (c.__markCompiled) c.__markCompiled();
    var l = c('React').PropTypes,
        m = 40;
    j = babelHelpers.inherits(n, c('React').PureComponent);
    k = j && j.prototype;
    n.prototype.render = function() {
        'use strict';
        var o = "_3hvt",
            p = c('React').createElement(c('Image.react'), {
                className: "_bth",
                src: this.props.src,
                height: m,
                width: m
            }),
            q = i._("Profile of {name}", [i.param('name', this.props.profileName)]);
        return this.props.profileURI ? c('React').createElement(c('Link.react'), {
            'aria-label': q,
            className: o,
            href: this.props.profileURI,
            onClick: this.props.onClick
        }, p) : c('React').createElement('div', {
            className: o
        }, p);
    };

    function n() {
        'use strict';
        j.apply(this, arguments);
    }
    n.propTypes = {
        src: l.string.isRequired,
        profileName: l.string,
        profileURI: l.string,
        onClick: l.func
    };
    f.exports = n;
}), null);
__d('ReactComposerProfilePhotoBlock.react', ['cx', 'ReactComposerProfilePhoto.react', 'Layout.react', 'React', 'emptyFunction'], (function a(b, c, d, e, f, g, h) {
    'use strict';
    var i, j;
    if (c.__markCompiled) c.__markCompiled();
    var k = c('Layout.react').Column,
        l = c('Layout.react').FillColumn,
        m = c('React').PropTypes;
    i = babelHelpers.inherits(n, c('React').PureComponent);
    j = i && i.prototype;
    n.prototype.render = function() {
        var o = this.props.profilePhotoBadge,
            p = this.props.onClick || c('emptyFunction');
        return (c('React').createElement(c('Layout.react'), null, c('React').createElement(k, {
            className: "_42k7"
        }, o ? c('React').createElement(o, this.props) : c('React').createElement(c('ReactComposerProfilePhoto.react'), {
            src: this.props.profilePicSrc,
            profileName: this.props.profileName,
            profileURI: this.props.profileURI,
            onClick: p
        })), c('React').createElement(l, null, this.props.children)));
    };

    function n() {
        i.apply(this, arguments);
    }
    n.propTypes = {
        profileName: m.string,
        profilePicSrc: m.string.isRequired,
        profileURI: m.string,
        profilePhotoBadge: m.any,
        currentProfileBadgeURI: m.string,
        profileBadgeNUX: m.string,
        onClick: m.func
    };
    f.exports = n;
}), null);
__d('ReactComposerStatusLazyAttachmentTextarea.react', ['cx', 'ReactComposerContextMixin', 'ReactComponentWithPureRenderMixin', 'React', 'ReactDOM', 'joinClasses'], (function a(b, c, d, e, f, g, h) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    var i = c('React').PropTypes,
        j = c('React').createClass({
            displayName: 'ReactComposerStatusLazyAttachmentTextarea',
            mixins: [c('ReactComponentWithPureRenderMixin'), c('ReactComposerContextMixin')],
            propTypes: {
                expanded: i.bool,
                onFocus: i.func.isRequired,
                placeholder: i.string.isRequired
            },
            getInitialState: function k() {
                return {
                    message: null
                };
            },
            componentWillUnmount: function k() {
                this._onUnmount();
            },
            render: function k() {
                return (c('React').createElement('div', {
                    className: c('joinClasses')(this.props.className, "_4h96")
                }, c('React').createElement('textarea', {
                    className: "_4h98",
                    ref: 'textarea',
                    placeholder: this.props.placeholder,
                    onFocus: this.props.onFocus,
                    onChange: this.onChange,
                    name: 'xhpc_message_text'
                }), c('React').createElement('input', {
                    type: 'hidden',
                    name: 'xhpc_message',
                    value: this.state.message
                })));
            },
            onChange: function k(l) {
                this.setState({
                    message: l.target.value
                });
            },
            focus: function k() {
                this.refs.textarea.focus();
            },
            _onUnmount: function k() {
                var l = c('ReactDOM').findDOMNode(this.refs.textarea);
                e.call(null, ['ReactComposerStatusActions', 'ReactComposerPrefillMentionsInput', 'ReactInputSelection'], function(m, n, o) {
                    var p = {
                            text: l.value
                        },
                        q = o.getSelection(l),
                        r = n.createEditorState(p, q);
                    m.setEditorState(this.context.composerID, r);
                }.bind(this));
            }
        });
    f.exports = j;
}), null);
__d('ReactComposerStatusLazyAttachmentTextareaContainer.react', ['cx', 'ReactComposerAttachmentStore', 'ReactComposerAttachmentType', 'ReactComposerContextMixin', 'ReactComposerEvents', 'ReactComposerPropsAndStoreBasedStateMixin', 'ReactComposerStatusLazyAttachmentTextarea.react', 'Arbiter', 'ReactComponentWithPureRenderMixin', 'React', 'SubscriptionsHandler'], (function a(b, c, d, e, f, g, h) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    var i = c('React').PropTypes,
        j = c('React').createClass({
            displayName: 'ReactComposerStatusLazyAttachmentTextareaContainer',
            _subscriptions: undefined,
            mixins: [c('ReactComponentWithPureRenderMixin'), c('ReactComposerContextMixin'), c('ReactComposerPropsAndStoreBasedStateMixin')(c('ReactComposerAttachmentStore'))],
            statics: {
                calculateState: function k(l, m) {
                    return {
                        focused: c('ReactComposerAttachmentStore').isSelectedAttachmentActive(l)
                    };
                }
            },
            componentWillMount: function k() {
                this._subscriptions = new(c('SubscriptionsHandler'))();
                this._subscriptions.addSubscriptions(c('Arbiter').subscribe(c('ReactComposerEvents').ACTIVATE_ATTACHMENT + this.context.composerID, function() {
                    var l = c('ReactComposerAttachmentStore').getSelectedAttachmentID(this.context.composerID);
                    if (l === c('ReactComposerAttachmentType').STATUS) this.refs.textarea.focus();
                }.bind(this)));
            },
            componentWillUnmount: function k() {
                this._subscriptions && this._subscriptions.release();
            },
            propTypes: {
                expanded: i.bool,
                id: i.string,
                hasProfilePic: i.bool,
                onFocus: i.func.isRequired,
                placeholder: i.node.isRequired
            },
            render: function k() {
                return (c('React').createElement(c('ReactComposerStatusLazyAttachmentTextarea.react'), babelHelpers['extends']({
                    className: (this.state.focused ? "_3_1x" : '') + (this.props.expanded ? ' ' + "_4h97" : '') + (this.props.hasProfilePic ? ' ' + "_30z" : '')
                }, this.props, {
                    ref: 'textarea'
                })));
            }
        });
    f.exports = j;
}), null);
__d('ReactComposerFooter.react', ['cx', 'React', 'XUICardSection.react', 'joinClasses'], (function a(b, c, d, e, f, g, h) {
    var i, j;
    if (c.__markCompiled) c.__markCompiled();
    var k = c('React').PropTypes;
    i = babelHelpers.inherits(l, c('React').PureComponent);
    j = i && i.prototype;
    l.prototype.render = function() {
        'use strict';
        var m = c('joinClasses')("_2dck", this.props.className);
        return (c('React').createElement(c('XUICardSection.react'), {
            background: this.props.background,
            className: m
        }, this.props.children));
    };

    function l() {
        'use strict';
        i.apply(this, arguments);
    }
    l.propTypes = {
        background: k.string
    };
    l.defaultProps = {
        background: 'white'
    };
    f.exports = l;
}), null);
__d('ReactComposerFooterActions.react', ['cx', 'React', 'XUICardSection.react', 'joinClasses'], (function a(b, c, d, e, f, g, h) {
    var i, j;
    if (c.__markCompiled) c.__markCompiled();
    i = babelHelpers.inherits(k, c('React').PureComponent);
    j = i && i.prototype;
    k.prototype.render = function() {
        'use strict';
        var l = c('joinClasses')("_2ph-", this.props.className);
        return (c('React').createElement(c('XUICardSection.react'), {
            className: l
        }, this.props.children));
    };

    function k() {
        'use strict';
        i.apply(this, arguments);
    }
    f.exports = k;
}), null);
__d('ReactComposerPostButton.react', ['cx', 'fbt', 'ix', 'Image.react', 'React', 'XUIButton.react'], (function a(b, c, d, e, f, g, h, i, j) {
    'use strict';
    var k, l;
    if (c.__markCompiled) c.__markCompiled();
    var m = c('React').PropTypes;
    k = babelHelpers.inherits(n, c('React').PureComponent);
    l = k && k.prototype;
    n.getButtonSize = function() {
        return 'medium';
    };
    n.prototype.render = function() {
        var o = c('React').createElement(c('Image.react'), {
                className: "_5gm4" + (this.props.disabled && this.props.isPosting ? ' ' + "_5gm5" : ''),
                src: j('/images/loaders/indicator_blue_small.gif'),
                'data-testid': 'react-composer-throbber'
            }),
            p = c('React').createElement('span', {
                className: this.props.disabled && this.props.isPosting ? "_5gm9" : ''
            }, this.props.label);
        return (c('React').createElement(c('XUIButton.react'), {
            className: "_1mf7",
            disabled: this.props.disabled,
            label: p,
            image: o,
            onClick: this.props.onClick,
            use: 'confirm',
            'data-testid': 'react-composer-post-button'
        }));
    };

    function n() {
        k.apply(this, arguments);
    }
    n.propTypes = {
        disabled: m.bool,
        onClick: m.func,
        label: m.string,
        isPosting: m.bool
    };
    n.defaultProps = {
        disabled: false,
        label: i._(["Post", "0a1c00b9f90903aa694f9e3e1b1e515e"])
    };
    f.exports = n;
}), null);
__d('ReactComposerPostButtonContainerMixin', ['ReactComposerActions', 'ReactComposerConfig', 'ReactComposerContextMixin', 'ReactComposerPostButton.react', 'ReactComposerPropsAndStoreBasedStateMixin', 'ReactComposerStore', 'ReactComponentWithPureRenderMixin', 'React'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = c('React').PropTypes,
        i = {
            mixins: [c('ReactComponentWithPureRenderMixin'), c('ReactComposerContextMixin'), c('ReactComposerPropsAndStoreBasedStateMixin')(c('ReactComposerStore'))],
            propTypes: {
                config: c('ReactComposerConfig').isRequired,
                forceDisabled: h.bool,
                onClickPreprocess: h.func
            },
            getDefaultProps: function j() {
                return {
                    forceDisabled: false
                };
            },
            statics: {
                calculateState: function j(k, l, m) {
                    return {
                        isPosting: c('ReactComposerStore').isPosting(k),
                        isUploading: c('ReactComposerStore').isUploading(k)
                    };
                },
                getButtonSize: function j() {
                    return 'medium';
                }
            },
            render: function j() {
                return (c('React').createElement(c('ReactComposerPostButton.react'), babelHelpers['extends']({}, this.props, {
                    disabled: this.props.forceDisabled || this.state.isPosting || this.state.isUploading,
                    className: this.props.className,
                    onClick: this._onClick,
                    isPosting: this.state.isPosting
                })));
            },
            _onClick: function j() {
                if (this.props.onClickPreprocess)
                    if (!this.props.onClickPreprocess()) return;
                c('ReactComposerActions').postStarted(this.context.composerID, {
                    actorID: this.context.actorID,
                    config: this.props.config,
                    targetID: this.context.targetID
                });
            }
        };
    f.exports = i;
}), null);
__d('ReactComposerPostButtonContainer.react', ['ReactComposerPostButtonContainerMixin', 'React'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = c('React').createClass({
        displayName: 'ReactComposerPostButtonContainer',
        mixins: [c('ReactComposerPostButtonContainerMixin')]
    });
    f.exports = h;
}), null);
__d('ReactComposerGenericFooter.react', ['ReactComposerConfig', 'ReactComposerFooter.react', 'ReactComposerFooterActions.react', 'ReactComposerPostButtonContainer.react', 'React', 'LeftRight.react'], (function a(b, c, d, e, f, g) {
    var h, i;
    if (c.__markCompiled) c.__markCompiled();
    var j = c('React').PropTypes;
    h = babelHelpers.inherits(k, c('React').PureComponent);
    i = h && h.prototype;
    k.prototype.render = function() {
        'use strict';
        var l = this.props.postButton ? this.props.postButton : c('React').createElement(c('ReactComposerPostButtonContainer.react'), {
            config: this.props.config
        });
        return (c('React').createElement(c('ReactComposerFooter.react'), {
            background: this.props.background
        }, c('React').createElement(c('LeftRight.react'), null, this.props.leftChild, c('React').createElement(c('ReactComposerFooterActions.react'), null, this.props.audienceSelector, l))));
    };

    function k() {
        'use strict';
        h.apply(this, arguments);
    }
    k.propTypes = {
        audienceSelector: j.element,
        background: j.string,
        config: c('ReactComposerConfig').isRequired,
        leftChild: j.element,
        postButton: j.element
    };
    k.defaultProps = {
        background: 'white',
        leftChild: c('React').createElement('noscript', null)
    };
    f.exports = k;
}), null);
__d('ReactComposerStatusPlaceholderFooter.react', ['cx', 'fbt', 'ReactComposerAttachmentType', 'ReactComposerConfig', 'ReactComposerGenericFooter.react', 'DOMContainer.react', 'React', 'XUIButton.react', 'requireWeak'], (function a(b, c, d, e, f, g, h, i) {
    var j, k;
    if (c.__markCompiled) c.__markCompiled();
    var l;
    c('requireWeak')('ReactComposerAudienceSelectorContainer.react', function(n) {
        l = n;
    });
    j = babelHelpers.inherits(m, c('React').PureComponent);
    k = j && j.prototype;
    m.prototype.render = function() {
        'use strict';
        var n = this.props.config,
            o = n.attachmentsConfig[c('ReactComposerAttachmentType').STATUS],
            p = o.footerBackground ? o.footerBackground : n.showExpandedComposer ? 'white' : 'light-wash',
            q = c('React').createElement(c('XUIButton.react'), {
                className: "_1mf7",
                label: i._(["Post", "0a1c00b9f90903aa694f9e3e1b1e515e"]),
                use: 'confirm'
            }),
            r = null;
        if (n.audienceXHP) r = l && n.targetData ? c('React').createElement(l, {
            audienceXHP: n.audienceXHP,
            viewerIsTarget: n.targetData.viewerIsTarget
        }) : c('React').createElement(c('DOMContainer.react'), {
            className: "_5dd8"
        }, n.audienceXHP);
        return (c('React').createElement(c('ReactComposerGenericFooter.react'), {
            audienceSelector: r,
            postButton: q,
            background: p,
            config: n
        }));
    };

    function m() {
        'use strict';
        j.apply(this, arguments);
    }
    m.propTypes = {
        config: c('ReactComposerConfig').isRequired
    };
    f.exports = m;
}), null);
__d('ReactComposerTaggerSummaryPlaceholder.react', ['cx', 'React'], (function a(b, c, d, e, f, g, h) {
    var i, j;
    if (c.__markCompiled) c.__markCompiled();
    i = babelHelpers.inherits(k, c('React').PureComponent);
    j = i && i.prototype;
    k.prototype.render = function() {
        'use strict';
        return (c('React').createElement('div', {
            className: "_3o1x"
        }));
    };

    function k() {
        'use strict';
        i.apply(this, arguments);
    }
    f.exports = k;
}), null);
__d('ReactComposerStatusAttachmentPlaceholder.react', ['ReactComposerAttachmentActions', 'ReactComposerAttachmentStore', 'ReactComposerAttachmentType', 'ReactComposerConfig', 'ReactComposerContextMixin', 'ReactComposerDragDropPromptLazy.react', 'ReactComposerLoggingName', 'ReactComposerPostUtilsCore', 'ReactComposerProfilePhotoBlock.react', 'ReactComposerPropsAndStoreBasedStateMixin', 'ReactComposerSproutsDisplayState', 'ReactComposerStatusLazyAttachmentTextareaContainer.react', 'ReactComposerStatusPlaceholderFooter.react', 'ReactComposerStore', 'ReactComposerTaggerSummaryPlaceholder.react', 'ActorURI', 'Bootloader', 'Event', 'ReactComponentWithPureRenderMixin', 'React', 'ReactDOM', 'SubscriptionsHandler', 'curry'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = c('React').PropTypes,
        i = c('React').createClass({
            displayName: 'ReactComposerStatusAttachmentPlaceholder',
            _subscriptionsHandler: null,
            mixins: [c('ReactComponentWithPureRenderMixin'), c('ReactComposerContextMixin'), c('ReactComposerPropsAndStoreBasedStateMixin')(c('ReactComposerAttachmentStore'), c('ReactComposerStore'))],
            propTypes: {
                config: c('ReactComposerConfig').isRequired,
                expanded: h.bool,
                placeholder: h.string.isRequired
            },
            statics: {
                calculateState: function j(k, l) {
                    return {
                        isActive: c('ReactComposerAttachmentStore').isSelectedAttachmentActive(k),
                        sproutsDisplayState: c('ReactComposerStore').getSproutsDisplayState(k)
                    };
                }
            },
            componentDidMount: function j() {
                var k = new(c('SubscriptionsHandler'))();
                k.addSubscriptions(c('Event').listen(c('ReactDOM').findDOMNode(this.refs.form), 'success', c('curry')(c('ReactComposerPostUtilsCore').handlePostSucceeded, this.context.composerID)));
                this._subscriptionsHandler = k;
            },
            componentWillUnmount: function j() {
                this._subscriptionsHandler && this._subscriptionsHandler.release();
            },
            render: function j() {
                var k = this.context.gks && this.context.gks.isSproutsComposer,
                    l = this._renderTextArea(),
                    m = k ? this._renderSproutsList() : null,
                    n = this.state.isActive || this.props.expanded || k ? c('React').createElement(c('ReactComposerStatusPlaceholderFooter.react'), {
                        config: this.props.config
                    }) : null;
                return (c('React').createElement('div', null, c('React').createElement(c('ReactComposerDragDropPromptLazy.react'), {
                    root: this,
                    config: this.props.config,
                    onFilesDrop: this._onFilesDrop,
                    onURLDrop: this._onURLDrop
                }), c('React').createElement('form', {
                    action: c('ActorURI').create('/ajax/updatestatus.php', this.context.actorID),
                    method: 'post',
                    rel: 'async',
                    ref: 'form'
                }, l, c('React').createElement(c('ReactComposerTaggerSummaryPlaceholder.react'), null), m, n, this._getHiddenInputs())));
            },
            _renderTextArea: function j() {
                var k = this.props.config.attachmentsConfig[c('ReactComposerAttachmentType').STATUS],
                    l = c('React').createElement(c('ReactComposerStatusLazyAttachmentTextareaContainer.react'), {
                        expanded: this.props.expanded,
                        hasProfilePic: k.showProfilePic,
                        onFocus: this._onFocus,
                        placeholder: this.props.placeholder
                    });
                return k.showProfilePic ? c('React').createElement(c('ReactComposerProfilePhotoBlock.react'), {
                    profilePicSrc: k.profilePicSrc,
                    profileURI: k.profileURI,
                    profilePhotoBadge: k.customProfilePhoto,
                    currentProfileBadgeURI: k.currentProfileBadgeURI
                }, l) : l;
            },
            _renderSproutsList: function j() {
                var k = this.context.jsModules && this.context.jsModules.ComposerSproutsListContainer;
                return (c('React').createElement(k, {
                    config: this.props.config
                }));
            },
            _onFocus: function j() {
                c('ReactComposerAttachmentActions').selectAttachment(this.context.composerID, c('ReactComposerAttachmentType').STATUS, true, c('ReactComposerLoggingName').INLINE_COMPOSER);
            },
            _onFilesDrop: function j(k) {
                var l = this.props.config.attachmentsConfig[c('ReactComposerAttachmentType').MEDIA];
                c('Bootloader').loadModules(["ReactComposerStatusUtils", "ReactComposerPhotoUploader"], function(m, n) {
                    var o = this.context.composerID;
                    m.uploadDroppedFiles(o, k, new n(this.context, l.photoLimit, {
                        disableFaceRecognition: l.disableFaceboxTagger
                    }), this.props.config.targetData.targetSupportsMultiMedia);
                }.bind(this), 'ReactComposerStatusAttachmentPlaceholder.react');
            },
            _onURLDrop: function j(k) {
                c('Bootloader').loadModules(["ReactComposerScrapedAttachmentActions", "ReactComposerStatusUtils"], function(l, m) {
                    var n = this.props.config.attachmentsConfig[c('ReactComposerAttachmentType').STATUS];
                    c('ReactComposerAttachmentActions').selectAttachment(this.context.composerID, c('ReactComposerAttachmentType').STATUS, true, c('ReactComposerLoggingName').LINK_DROPPED);
                    l.enabled(this.context.composerID, n.canScrapeShare);
                    m.scrapeLink(this.context.composerID, this.context.targetID, k, this.context.composerType, this.context.actorID);
                }.bind(this), 'ReactComposerStatusAttachmentPlaceholder.react');
            },
            _getHiddenInputs: function j() {
                var k = c('ReactComposerPostUtilsCore').getCoreData(this.context.composerID, this.props.config.contextInfo, this.context.targetID),
                    l = [];
                for (var m in k) l.push(c('React').createElement('input', {
                    type: 'hidden',
                    name: m,
                    value: k[m],
                    key: m
                }));
                return l;
            }
        });
    f.exports = i;
}), null);
__d("XReactComposerStatusAttachmentBootstrapController", ["XController"], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = c("XController").create("\/react_composer\/status\/bootstrap\/", {
        composer_id: {
            type: "String",
            required: true
        },
        composer_type: {
            type: "Enum",
            required: true,
            enumType: 1
        },
        target_id: {
            type: "String",
            required: true
        }
    });
}), null);
__d('ReactComposerStatusLazyAttachment.react', ['fbt', 'ReactComposerAttachmentType', 'ReactComposerBootloaderPropTypes', 'ReactComposerLoadableAttachmentBodyMixin', 'ReactComposerStatusAttachmentPlaceholder.react', 'XReactComposerStatusAttachmentBootstrapController', 'ActorURI', 'Arbiter', 'Bootloader', 'React'], (function a(b, c, d, e, f, g, h) {
    if (c.__markCompiled) c.__markCompiled();
    var i = c('React').PropTypes,
        j = c('React').createClass({
            displayName: 'ReactComposerStatusLazyAttachment',
            _useCustomPlaceholder: true,
            mixins: [c('ReactComposerLoadableAttachmentBodyMixin')],
            propTypes: {
                additionalTaggers: i.arrayOf(i.shape({
                    button: i.element.isRequired,
                    container: i.element.isRequired
                })),
                additionalFooterActions: i.arrayOf(i.element),
                bootloader: c('ReactComposerBootloaderPropTypes'),
                config: i.object.isRequired,
                expanded: i.bool,
                onPostIntent: i.func,
                placeholder: i.string.isRequired
            },
            getDefaultProps: function k() {
                return {
                    placeholder: h._(["What's on your mind?", "2340e43c54f5a3de9ca7fc0a7efc2cae"])
                };
            },
            statics: {
                attachmentID: c('ReactComposerAttachmentType').STATUS,
                initOnlyWhenComposerActive: true
            },
            getInitialState: function k() {
                return {
                    expanded: false
                };
            },
            componentDidMount: function k() {
                c('Arbiter').inform('ReactComposerStatusLazyAttachment/mounted', this.context.composerID, c('Arbiter').BEHAVIOR_STATE);
            },
            componentWillUpdate: function k(l, m) {
                if (!m.isSelected) this._useCustomPlaceholder = false;
            },
            getPlaceholderModule: function k() {
                if (!this._useCustomPlaceholder) return null;
                if (this._placeholder) return this._placeholder;
                this._placeholder = c('ReactComposerStatusAttachmentPlaceholder.react');
                return this._placeholder;
            },
            bootload: function k(l) {
                if (this.props.bootloader) {
                    this.props.bootloader.statusAttachment(l);
                } else c('Bootloader').loadModules(["ReactComposerStatusAttachmentContainer.react"], l, 'ReactComposerStatusLazyAttachment.react');
            },
            getBootstrapURI: function k() {
                return c('ActorURI').create(c('XReactComposerStatusAttachmentBootstrapController').getURIBuilder().setString('composer_id', this.context.composerID).setEnum('composer_type', this.context.composerType).setString('target_id', this.context.targetID).getURI(), this.context.actorID);
            }
        });
    f.exports = j;
}), null);
__d('ReactComposerSessionMetricsActionTypes', ['keyMirrorRecursive'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    f.exports = c('keyMirrorRecursive')({
        KEYSTROKE: null,
        PASTE: null
    }, 'ReactComposerSessionMetricsActionTypes');
}), null);
__d('ReactComposerSessionMetricsStore', ['ReactComposerStoreBase', 'ReactComposerAttachmentActionType', 'ReactComposerSessionMetricsActionTypes'], (function a(b, c, d, e, f, g) {
    var h, i;
    if (c.__markCompiled) c.__markCompiled();
    h = babelHelpers.inherits(j, c('ReactComposerStoreBase'));
    i = h && h.prototype;

    function j() {
        'use strict';
        var k = void 0;
        i.constructor.call(this, function() {
            return {
                composerStartTime: null,
                keystrokeCount: 0,
                pasteCount: 0
            };
        }, function(l) {
            switch (l.type) {
                case c('ReactComposerAttachmentActionType').SELECT_ATTACHMENT:
                    k && k.$ReactComposerSessionMetricsStore1(l);
                    break;
                case c('ReactComposerSessionMetricsActionTypes').KEYSTROKE:
                    k && k.$ReactComposerSessionMetricsStore2(l);
                    break;
                case c('ReactComposerSessionMetricsActionTypes').PASTE:
                    k && k.$ReactComposerSessionMetricsStore3(l);
                    break;
            }
        });
        k = this;
    }
    j.prototype.getComposerStartTime = function(k) {
        'use strict';
        return this.getComposerData(k).composerStartTime;
    };
    j.prototype.getKeystrokeCount = function(k) {
        'use strict';
        return this.getComposerData(k).keystrokeCount;
    };
    j.prototype.getPasteCount = function(k) {
        'use strict';
        return this.getComposerData(k).pasteCount;
    };
    j.prototype.$ReactComposerSessionMetricsStore1 = function(k) {
        'use strict';
        var l = this.validateAction(k, 'composerID'),
            m = this.getComposerData(l);
        if (!m.composerStartTime) m.composerStartTime = Date.now();
    };
    j.prototype.$ReactComposerSessionMetricsStore2 = function(k) {
        'use strict';
        var l = this.validateAction(k, 'composerID'),
            m = this.getComposerData(l);
        m.keystrokeCount++;
    };
    j.prototype.$ReactComposerSessionMetricsStore3 = function(k) {
        'use strict';
        var l = this.validateAction(k, 'composerID'),
            m = this.getComposerData(l);
        m.pasteCount++;
    };
    f.exports = new j();
}), null);
__d('ReactComposerContextProviderMixin', ['invariant', 'ReactComposerContextMixin'], (function a(b, c, d, e, f, g, h) {
    if (c.__markCompiled) c.__markCompiled();
    var i = c('ReactComposerContextMixin').contextTypes,
        j = {
            childContextTypes: i,
            getChildContext: function k() {
                return {
                    actorID: this.props.contextConfig.actorID,
                    composerID: this.props.contextConfig.composerID,
                    composerType: this.props.contextConfig.composerType,
                    gks: this.props.contextConfig.gks || {},
                    targetID: this.props.contextConfig.targetID,
                    jsModules: this.props.contextConfig.jsModules
                };
            },
            componentWillMount: function k() {
                !this.props.contextConfig.actorID ? h(0) : void 0;
                !this.props.contextConfig.composerID ? h(0) : void 0;
                !this.props.contextConfig.composerType ? h(0) : void 0;
                !this.props.contextConfig.targetID ? h(0) : void 0;
            }
        };
    f.exports = j;
}), null);
__d('ReactComposerLoggingConfig', ['React'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = c('React').PropTypes;
    f.exports = h.shape({
        targetType: h.string,
        ref: h.string,
        composerSourceSurface: h.string.isRequired,
        isEditComposer: h.bool
    });
}), null);
__d('ReactComposer.react', ['cx', 'ReactComposerActions', 'ReactComposerContextMixin', 'ReactComposerInit', 'ReactComposerLoggingActions', 'ReactComposerLoggingConfig', 'ReactComposerLoggingName', 'ReactComposerLoggingQueue', 'ReactComposerPropsAndStoreBasedStateMixin', 'ReactComposerSessionMetricsStore', 'ReactComposerStore', 'ReactComponentWithPureRenderMixin', 'React', 'ReactDOM', 'XUICard.react', 'joinClasses'], (function a(b, c, d, e, f, g, h) {
    if (c.__markCompiled) c.__markCompiled();
    var i = c('React').PropTypes,
        j = c('React').createClass({
            displayName: 'ReactComposer',
            mixins: [c('ReactComponentWithPureRenderMixin'), c('ReactComposerContextMixin'), c('ReactComposerPropsAndStoreBasedStateMixin')(c('ReactComposerStore'), c('ReactComposerSessionMetricsStore'))],
            propTypes: {
                hideBorders: i.bool,
                loggingConfig: c('ReactComposerLoggingConfig').isRequired,
                activateOnInit: i.bool,
                activateOnInitEntryPoint: i.oneOf(Object.values(c('ReactComposerLoggingName')))
            },
            getDefaultProps: function k() {
                return {
                    hideBorders: false,
                    activateOnInit: false,
                    activateOnInitEntryPoint: c('ReactComposerLoggingName').OTHERS
                };
            },
            getInitialState: function k() {
                return {
                    hasBeenActive: false
                };
            },
            statics: {
                calculateState: function k(l, m) {
                    return {
                        isActive: c('ReactComposerStore').isActive(l)
                    };
                }
            },
            componentWillMount: function k() {
                c('ReactComposerActions').initConfig(this.context.composerID, this.props.loggingConfig, this.props.activateOnInit);
                if (this.props.activateOnInit) c('ReactComposerLoggingActions').composerEntry(this.context.composerID, this.props.activateOnInitEntryPoint);
            },
            componentDidUpdate: function k(l, m) {
                if (this.state.isActive && !this.state.hasBeenActive) {
                    this.setState({
                        hasBeenActive: !this.state.hasBeenActive
                    });
                    c('ReactComposerLoggingQueue').initBootload(this.context.composerID, c('ReactDOM').findDOMNode(this), this.context.targetID, this.props.loggingConfig);
                }
            },
            componentWillUnmount: function k() {
                c('ReactComposerInit').unmountInstance(this.context.composerID);
            },
            render: function k() {
                var l = "_36bx" + (this.props.hideBorders ? ' ' + "_143o" : '');
                return (c('React').createElement(c('XUICard.react'), {
                    className: c('joinClasses')(this.props.className, l),
                    'data-testid': 'react-composer-root',
                    id: this.context.composerID
                }, this.props.children));
            }
        });
    f.exports = j;
}), null);
__d('ReactComposerBody.react', ['cx', 'React', 'XUICardSection.react', 'joinClasses'], (function a(b, c, d, e, f, g, h) {
    'use strict';
    var i, j;
    if (c.__markCompiled) c.__markCompiled();
    i = babelHelpers.inherits(k, c('React').PureComponent);
    j = i && i.prototype;
    k.prototype.render = function() {
        var l = c('joinClasses')("_4zoz", this.props.className);
        return (c('React').createElement(c('XUICardSection.react'), {
            className: l
        }, this.props.children));
    };

    function k() {
        i.apply(this, arguments);
    }
    f.exports = k;
}), null);
__d('ReactComposerBodyContainer.react', ['cx', 'ReactComposerAttachmentStore', 'ReactComposerBody.react', 'ReactComposerPropsAndStoreBasedStateMixin', 'ReactComponentWithPureRenderMixin', 'React'], (function a(b, c, d, e, f, g, h) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    var i = c('React').PropTypes,
        j = c('React').createClass({
            displayName: 'ReactComposerBodyContainer',
            mixins: [c('ReactComponentWithPureRenderMixin'), c('ReactComposerPropsAndStoreBasedStateMixin')(c('ReactComposerAttachmentStore'))],
            propTypes: {
                expanded: i.bool,
                hasMinHeight: i.bool
            },
            getDefaultProps: function k() {
                return {
                    expanded: false,
                    hasMinHeight: true
                };
            },
            statics: {
                calculateState: function k(l, m, n) {
                    var o = c('ReactComposerAttachmentStore').isSelectedAttachmentActive(l);
                    return {
                        active: o
                    };
                }
            },
            render: function k() {
                var l = (this.state.active && this.props.hasMinHeight ? "_5xv3" : '') + (this.props.expanded ? ' ' + "_4cw" : '');
                return (c('React').createElement(c('ReactComposerBody.react'), {
                    className: l
                }, this.props.children));
            }
        });
    f.exports = j;
}), null);
__d('ReactComposerHeaderProps', ['React'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = c('React').PropTypes,
        i = {
            propTypes: {
                attachmentSelectors: h.arrayOf(h.node),
                background: h.string,
                forceThrobber: h.bool,
                noHorizontalMargin: h.bool,
                rightChild: h.element,
                showDelimiter: h.bool,
                truncateSelectorText: h.bool
            },
            getDefaultProps: function j() {
                return {
                    background: 'white',
                    forceThrobber: false,
                    noHorizontalMargin: false,
                    showDelimiter: true,
                    truncateSelectorText: false
                };
            }
        };
    f.exports = i;
}), null);
__d('ReactComposerHeaderCore.react', ['cx', 'ReactComposerHeaderProps', 'LeftRight.react', 'React', 'XUICardSection.react', 'joinClasses'], (function a(b, c, d, e, f, g, h) {
    var i, j;
    if (c.__markCompiled) c.__markCompiled();
    i = babelHelpers.inherits(k, c('React').PureComponent);
    j = i && i.prototype;
    k.prototype.render = function() {
        'use strict';
        var l;
        if (this.props.showDelimiter) {
            l = c('React').createElement('ul', {
                className: "_-h"
            }, c('React').Children.map(this.props.attachmentSelectors, function(m, n) {
                return (c('React').createElement('li', {
                    className: "_1tm3",
                    key: n
                }, m));
            }));
        } else l = this.props.attachmentSelectors;
        return (c('React').createElement(c('XUICardSection.react'), {
            background: this.props.background,
            className: c('joinClasses')(this.props.className, "_4d6h" + (this.props.noHorizontalMargin ? ' ' + "_4p1p" : '') + (this.props.truncateSelectorText ? ' ' + "_1kvc" : ''))
        }, c('React').createElement(c('LeftRight.react'), null, c('React').createElement('div', null, l), c('React').createElement('div', null, this.props.children))));
    };

    function k() {
        'use strict';
        i.apply(this, arguments);
    }
    k.propTypes = c('ReactComposerHeaderProps').propTypes;
    k.defaultProps = c('ReactComposerHeaderProps').getDefaultProps();
    f.exports = k;
}), null);
__d('ReactComposerContextConfig', ['ReactComposerContextMixin', 'React'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = c('ReactComposerContextMixin').contextTypes,
        i = c('React').PropTypes;
    f.exports = i.shape(h);
}), null);