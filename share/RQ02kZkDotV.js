if (self.CavalryLogger) {
    CavalryLogger.start_js(["Z7w5z"]);
}

__d("XFamilyMentionsNUXDialogController", ["XController"], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = c("XController").create("\/family_mentions\/nux_dialog\/", {
        __asyncDialog: {
            type: "Int"
        }
    });
}), null);
__d('FamilyRelationshipMentions', ['AsyncDialog', 'AsyncRequest', 'FamilyMentionsData', 'XFamilyMentionsNUXDialogController'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = function() {
        var i = {},
            j = false;
        i.shouldShowNUX = function(k) {
            if (c('FamilyMentionsData').hasAcceptedNUX || j) return false;
            var l = k.family_names;
            if (l == undefined) return false;
            for (var m = 0; m < l.length; m++)
                if (l[m] == k.text) return true;
            return false;
        };
        i.showNUX = function(k, l) {
            var m = c('XFamilyMentionsNUXDialogController').getURIBuilder().getURI();
            c('AsyncDialog').send(new(c('AsyncRequest'))(m), function(n) {
                n.subscribe('cancel', function() {
                    k.text = k.default_name;
                    new(c('AsyncRequest'))().setURI('/ajax/family_mentions/deny_nux').send();
                    l(k);
                });
                n.subscribe('confirm', function() {
                    j = true;
                    new(c('AsyncRequest'))().setURI('/ajax/family_mentions/confirm_nux').send();
                    l(k);
                    n.finishHide();
                });
            });
        };
        return i;
    }();
    f.exports = h;
}), null);
__d('TypeaheadBestName', ['FamilyMentionsData', 'TokenizeUtil'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(i) {
        'use strict';
        this._typeahead = i;
    }
    h.prototype.enable = function() {
        'use strict';
        var i = this._typeahead.getView(),
            j = this._getAvailableAlternateNameFields();
        this._subscription = i.subscribe('beforeRender', function(k, l) {
            var m = l.value;
            for (var n = 0; n < l.results.length; ++n) {
                var o = l.results[n],
                    p = this._getNameToDisplay(o, m, j);
                if (p !== null) {
                    o.text = p;
                    if (o.hasOwnProperty('default_name') && o.text !== o.default_name) {
                        o.subtext = o.default_name;
                    } else o.subtext = null;
                }
            }
        }.bind(this));
    };
    h.prototype.disable = function() {
        'use strict';
        this._typeahead.getView().unsubscribe(this._subscription);
        this._subscription = null;
    };
    h.prototype._getNameToDisplay = function(i, j, k) {
        'use strict';
        if (i.hasOwnProperty('default_name') && c('TokenizeUtil').isQueryMatch(j, i.default_name)) return i.default_name;
        for (var l = 0; l < k.length; l++) {
            var m = i[k[l]];
            if (m == undefined) continue;
            for (var n = 0; n < m.length; n++) {
                var o = m[n];
                if (c('TokenizeUtil').isQueryMatch(j, o)) return o;
            }
        }
        if (i.hasOwnProperty('default_name')) return i.default_name;
        return null;
    };
    h.prototype._getAvailableAlternateNameFields = function() {
        'use strict';
        var i = ['alternate_names'];
        if (c('FamilyMentionsData').allowFamilyNames) i.push('family_names');
        return i;
    };
    Object.assign(h.prototype, {
        _subscription: null
    });
    f.exports = h;
}), null);
__d('legacy:BestNameTypeaheadBehavior', ['TypeaheadBestName'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    if (!b.TypeaheadBehaviors) b.TypeaheadBehaviors = {};
    b.TypeaheadBehaviors.buildBestAvailableNames = function(h) {
        h.enableBehavior(c('TypeaheadBestName'));
    };
}), 3);
__d('MentionsInputMatchers', [], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = ['@', '\\uff20'].join(''),
        i = ['#', '\\uFF03'].join(''),
        j = '.,+*?$|#{}()\\^\\-\\[\\]\\\\\/!%\'"~=<>_:;\n\r',
        k = j.replace('#', '') + '&',
        l = '\u200B';

    function m(p, q) {
        'use strict';
        this.$Matchers1 = p;
        this.$Matchers2 = q;
        this.$Matchers3();
    }
    m.prototype.$Matchers3 = function() {
        'use strict';
        var p = this.$Matchers4(this.$Matchers2),
            q = this.$Matchers5(this.$Matchers1, this.$Matchers2),
            r = this.$Matchers6(this.$Matchers1, q),
            s = this.$Matchers7(p, r),
            t = this.$Matchers8(p);
        this.$Matchers9 = new RegExp('[' + this.$Matchers1 + ']$');
        this.$Matchers10 = new RegExp(r + '$');
        this.$Matchers11 = new RegExp(t + '$');
        this.$Matchers12 = new RegExp(s + '$');
        this.$Matchers13 = new RegExp('[' + i + ']');
    };
    m.prototype.$Matchers4 = function(p) {
        'use strict';
        return '\\b[A-Z][^ A-Z' + p + l + ']';
    };
    m.prototype.$Matchers5 = function(p, q) {
        'use strict';
        return '(?:[^' + p + q + ']|[' + q + '][^ ' + q + '])';
    };
    m.prototype.$Matchers6 = function(p, q) {
        'use strict';
        return '(?:^|\\s)([' + p + '](' + q + '{0,20}))';
    };
    m.prototype.$Matchers7 = function(p, q) {
        'use strict';
        return '(?:(?:^|[^#])(' + p + '+)|' + q + ')';
    };
    m.prototype.$Matchers8 = function(p) {
        'use strict';
        return '(?:' + p + '{4,})';
    };
    m.prototype.getMainMatcher = function() {
        'use strict';
        return this.$Matchers10;
    };
    m.prototype.getTriggerMatcher = function() {
        'use strict';
        return this.$Matchers9;
    };
    m.prototype.getAutoMatcher = function() {
        'use strict';
        return this.$Matchers12;
    };
    m.prototype.getHashtagMatcher = function() {
        'use strict';
        return this.$Matchers13;
    };
    var n = '\\b[A-Z][^ A-Z' + j + ']',
        o = {
            mentionsMatchers: new m(h, j),
            hashtagMatchers: new m(i, k),
            userMatcher: new RegExp('(?:' + n + '{4,})' + '$')
        };
    f.exports = o;
}), null);
__d('htmlize', ['htmlSpecialChars'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(i) {
        return c('htmlSpecialChars')(i).replace(/\r\n|[\r\n]/g, '<br/>');
    }
    f.exports = h;
}), null);
__d('MentionsInput', ['cx', 'Arbiter', 'ArbiterMixin', 'Bootloader', 'CSS', 'DataStore', 'DOM', 'Event', 'FbtResult', 'FlipDirection', 'Input', 'InputSelection', 'Keys', 'MentionsInputMatchers', 'Parent', 'Style', 'TokenizeUtil', 'UserAgent_DEPRECATED', 'htmlize', 'mixin', 'removeFromArray'], (function a(b, c, d, e, f, g, h) {
    var i, j;
    if (c.__markCompiled) c.__markCompiled();
    var k = '\u200B',
        l = new RegExp(k, 'g'),
        m = function v(w) {
            return w + k;
        },
        n = function v(w) {
            return w.replace(/(@+)(\[[0-9]+\:([^\]]|\\\])*\]+)/g, '$1 $2');
        },
        o = /[\\\]:]/g,
        p = {
            MENTIONS: 'mentions',
            HASHTAGS: 'hashtags'
        };

    function q(v, w) {
        return v.replace(w, ' '.repeat(w.length));
    }

    function r(v, w) {
        return v.substring(0, w) + v.substring(w + 1);
    }

    function s(v) {
        var w = v.lastIndexOf('>');
        if (w >= 0) {
            var x = v.indexOf(' ', w);
            return x >= 0 ? v.substr(0, x + 1) : v;
        } else return '';
    }

    function t(v, w, x) {
        var y = x.lastIndexOf('<', w) > x.lastIndexOf('>', w);
        return y ? ' ' : '&nbsp;<wbr />';
    }
    i = babelHelpers.inherits(u, c('mixin')(c('ArbiterMixin')));
    j = i && i.prototype;

    function u(v, w, x, y, z, aa) {
        'use strict';
        j.constructor.call(this);
        c('DataStore').set(v, 'MentionsInput', this);
        this._root = v;
        this._typeahead = w;
        this._input = x;
        this._offsets = [];
        var ba = null,
            ca = this.init.bind(this, y, z, aa);
        try {
            ba = document.activeElement === this._input;
        } catch (da) {}
        if (ba) {
            setTimeout(ca, 0);
        } else var ea = c('Event').listen(this._input, 'focus', function() {
            setTimeout(ca, 0);
            ea.remove();
        });
        this._hasHashtags = y.hashtags;
        this._mentionsDataSource = this._typeahead.getData();
        this._currentDataSource = this._mentionsDataSource;
        this._autoSuggestPages = y.autosuggest_pages;
        this._lastHighlighterHTML = '';
        this._hashtags = [];
        this._matchers = c('MentionsInputMatchers').mentionsMatchers;
        this._matchersMode = p.MENTIONS;
    }
    u.prototype.init = function(v, w, x) {
        'use strict';
        if (this._initialized) return;
        this._initValue = w ? w.value : '';
        this._highlighter = c('DOM').find(this._root, '.highlighter');
        this._highlighterInner = this._highlighter.firstChild;
        this._highlighterContent = c('DOM').find(this._root, '.highlighterContent');
        this._hiddenInput = c('DOM').find(this._root, '.mentionsHidden');
        this._placeholder = this._input.getAttribute('placeholder') || '';
        this._metrics = x;
        if (!this._hiddenInput.name) {
            var y = this._input.name;
            this._input.name = y + '_text';
            this._hiddenInput.name = y;
        }
        this._initEvents();
        this._initTypeahead();
        if (w === null) {
            this._setup();
        } else this.reset(w);
        this.inform('init', null, c('Arbiter').BEHAVIOR_STATE);
        this._initialized = true;
    };
    u.prototype._setup = function() {
        'use strict';
        this._mentioned = {};
        this._orderedUIDs = [];
        this._numMentioned = 0;
        this._filterData = null;
        this._highlighterContent && c('DOM').empty(this._highlighterContent);
        this._highlighterAuxContent && c('DOM').remove(this._highlighterAuxContent);
        this._highlighterAuxContent = null;
        c('Input').setPlaceholder(this._input, this._placeholder);
        c('Style').set(this._typeahead.getElement(), 'height', 'auto');
    };
    u.prototype.reset = function(v) {
        'use strict';
        this._setup();
        var w = v && v.value || '';
        this._value = w;
        this._hiddenInput && (this._hiddenInput.value = w);
        if (this._input && v) c('Input').setValue(this._input, v.value);
        var x = v && v.mentions;
        if (x && x.length) {
            var y = [];
            x.forEach(function(z) {
                y.push(z.offset + z.length);
                delete z.offset;
                delete z.length;
                this._addToken(z);
            }, this);
            y.reverse().forEach(function(z) {
                w = w.substring(0, z) + k + w.substring(z);
            });
        }
        c('Input').setValue(this._input, w);
        if (this._value === '') c('FlipDirection').setDirection(this._input);
        this._update();
    };
    u.prototype.getValue = function() {
        'use strict';
        return c('Input').getValue(this._input).replace(l, '');
    };
    u.prototype._getMarkedValue = function() {
        'use strict';
        return c('Input').getValueRaw(this._input);
    };
    u.prototype.getRawValue = function() {
        'use strict';
        this._update();
        return c('Input').getValue(this._hiddenInput);
    };
    u.prototype.checkValue = function() {
        'use strict';
        var v = this._typeahead.getCore().getValue();
        if (this._matchers.getTriggerMatcher().exec(v) || v === '') this.inform('sessionEnd', {});
    };
    u.prototype.getTypeahead = function() {
        'use strict';
        return this._typeahead;
    };
    u.prototype.hasChanges = function() {
        'use strict';
        return !c('Input').isEmpty(this._input) && this._input.value !== this._initValue && this._initialized;
    };
    u.prototype.focus = function() {
        'use strict';
        this._input.focus();
    };
    u.prototype._initEvents = function() {
        'use strict';
        var v = this._update.bind(this);
        c('Event').listen(this._input, {
            input: v,
            keyup: v,
            change: v,
            blur: this._handleBlur.bind(this),
            focus: this._handleFocus.bind(this),
            keydown: this._handleKeydown.bind(this)
        });
        if (this._metrics) {
            this._metrics.init(this._typeahead);
            this._metrics._reset();
            this._metrics.bindSessionStart(this._typeahead, 'render', true);
            this._metrics.bindSessionEnd(this._typeahead.getView(), 'select', true);
            this._metrics.bindSessionEnd(this, 'sessionEnd', false);
            c('Event').listen(this._input, 'keyup', function(event) {
                setTimeout(this.checkValue.bind(this), 0);
            }.bind(this));
        }
    };
    u.prototype._initTypeahead = function() {
        'use strict';
        this._typeahead.subscribe('select', function(aa, ba) {
            var ca = ba.selected;
            this._addToken({
                uid: ca.uid,
                text: ca.text,
                type: ca.type,
                weakreference: ca.weak_reference
            });
            this.updateValue();
        }.bind(this));
        var v = this._input,
            w = null;

        function x() {
            if (w === null) {
                w = c('Input').getSubmitOnEnter(v);
                c('Input').setSubmitOnEnter(v, false);
            }
        }

        function y() {
            if (w !== null) {
                c('Input').setSubmitOnEnter(v, w);
                w = null;
            }
        }
        this._typeahead.subscribe('reset', y);
        this._typeahead.subscribe('render', x);
        this._typeahead.subscribe('highlight', function(aa, ba) {
            ba.index >= 0 ? x() : y();
        });
        this._typeahead.subscribe('query', function() {
            this._filterData = null;
        }.bind(this));
        var z = this._typeahead.getCore();
        z.suffix = k;
        this._handleFocus();
    };
    u.prototype._handleBlur = function() {
        'use strict';
        if (this._filterToken) {
            this._filterToken.remove();
            this._filterToken = null;
        }
    };
    u.prototype._handleFocus = function() {
        'use strict';
        if (!this._filterToken) this._filterToken = this._typeahead.getData().addFilter(this._filterResults.bind(this));
        this._updateWidth();
    };
    u.prototype._handleKeydown = function(event) {
        'use strict';
        var v = event.keyCode;
        if (v == c('Keys').BACKSPACE || v == c('Keys').DELETE) this._handleBackspaceAndDelete(event, v);
        if (v == c('Keys').LEFT || v == c('Keys').RIGHT) setTimeout(this._handleLeftAndRight.bind(this, v), 10);
    };
    u.prototype._handleLeftAndRight = function(v) {
        'use strict';
        var w = this._getMarkedValue(),
            x = c('InputSelection').get(this._input),
            y = x.start,
            z = x.end,
            aa = v == c('Keys').LEFT,
            ba = v == c('Keys').RIGHT;
        if (y == z) {
            var ca = aa ? -1 : 1;
            if (w.charAt(y) == k) c('InputSelection').set(this._input, y + ca);
        } else if (aa && w.charAt(y) == k) {
            c('InputSelection').set(this._input, y - 1, z);
        } else if (aa && w.charAt(z) == k) {
            c('InputSelection').set(this._input, y, z - 1);
        } else if (ba && w.charAt(z) == k) {
            c('InputSelection').set(this._input, y, z + 1);
        } else if (ba && w.charAt(y) == k) c('InputSelection').set(this._input, y + 1, z);
    };
    u.prototype._handleBackspaceAndDelete = function(event, v) {
        'use strict';
        var w = c('InputSelection').get(this._input),
            x = false;
        if (w.start !== w.end)
            if (this._offsetIsInsideMention(w.start + 1) && this._offsetIsInsideMention(w.end)) {
                x = v === c('Keys').BACKSPACE;
            } else return;
        var y = v === c('Keys').DELETE ? 1 : -1,
            z = y + (x ? w.end : w.start),
            aa = this._getMarkedValue(),
            ba = aa;
        for (var ca = 0; ca < this._orderedUIDs.length; ++ca) {
            var da = this._mentioned[this._orderedUIDs[ca]],
                ea = da.text,
                fa = m(ea),
                ga = ba.indexOf(fa),
                ha = ga + fa.length;
            if (z < ga || z >= ha) {
                ba = q(ba, fa);
                continue;
            }
            var ia, ja;
            if (da.type != 'user') {
                ia = 0;
                ja = [ea];
            } else {
                ia = fa.substring(0, z - ga).split(' ').length - 1;
                ja = ea.split(' ');
            }
            var ka = ja.splice(ia, 1)[0],
                la = ja.join(' '),
                ma = ia === 0 ? ga : ha - ka.length - 1;
            if (la) {
                da.text = la;
                la = m(la);
            } else this._removeToken(da.uid);
            var na = aa.substring(0, ga) + la + aa.substring(ha);
            c('Input').setValue(this._input, na);
            c('InputSelection').set(this._input, ma);
            this._update();
            event.kill();
            break;
        }
    };
    u.prototype._offsetIsInsideMention = function(v) {
        'use strict';
        for (var w = 0; w < this._offsets.length; w++)
            if (v > this._offsets[w][0] && v <= this._offsets[w][1]) return true;
        return false;
    };
    u.prototype._filterResults = function(v) {
        'use strict';
        if (this._filterData === null) {
            var w = c('InputSelection').get(this._input).start;
            if (this._offsetIsInsideMention(w)) {
                this._filterData = {
                    caretIsInsideMention: true
                };
                return false;
            }
            var x = this._typeahead.getCore();
            this._filterData = {
                value: x.getValue(),
                rawValue: x.getRawValue()
            };
        }
        if (this._filterData.caretIsInsideMention) return false;
        if (this._matchers.getMainMatcher().test(this._filterData.rawValue)) return true;
        if (v.type != 'user' && !v.connected_page) return false;
        if (v.disable_autosuggest) return false;
        if (this._matchersMode === p.MENTIONS && c('MentionsInputMatchers').userMatcher.test(this._filterData.value)) return true;
        return c('TokenizeUtil').isExactMatch(this._filterData.value, this._typeahead.getData().getTextToIndex(v));
    };
    u.prototype._addToken = function(v) {
        'use strict';
        var w = v.uid;
        if (!this._mentioned.hasOwnProperty(w)) {
            this._mentioned[w] = v;
            var x = this._orderedUIDs,
                y = n(this._getMarkedValue()),
                z = y.indexOf(m(this._mentioned[w].text)),
                aa = false,
                ba = 0;
            for (var ca = 0; ca < x.length; ++ca) {
                var da = m(this._mentioned[x[ca]].text),
                    ea = y.indexOf(da, ba);
                ba = ea + da.length;
                if (z < ea) {
                    this._orderedUIDs.splice(ca, 0, w);
                    aa = true;
                    break;
                }
            }
            if (!aa) this._orderedUIDs.push(w);
            this._numMentioned++;
            this._update();
        }
    };
    u.prototype._removeToken = function(v) {
        'use strict';
        if (this._mentioned.hasOwnProperty(v)) {
            delete this._mentioned[v];
            c('removeFromArray')(this._orderedUIDs, v);
            this._numMentioned--;
            this._update();
        }
    };
    u.prototype._update = function(v) {
        'use strict';
        v = v || {};
        var w = this._getMarkedValue();
        this._checkShouldSwapDataSource(w);
        if (w == this._value) return;
        this._value = w;
        this._updateTypeahead();
        this._updateMentions();
        this._updateWidth();
        setTimeout(this._updateDirection.bind(this), 0);
        this.updateValue();
        var x = this.hasAuxContent(),
            y = this._hiddenInput.value;
        this.inform('valueUpdate', {
            value: w,
            hasAuxContent: x,
            textWithMentions: y
        });
    };
    u.prototype._updateMentions = function() {
        'use strict';
        this._offsets = [];
        var v = this._getMarkedValue(),
            w = v;
        for (var x = 0; x < this._orderedUIDs.length; ++x) {
            var y = this._orderedUIDs[x],
                z = m(this._mentioned[y].text),
                aa = w.indexOf(z);
            if (aa == -1) this._removeToken(y);
            w = q(w, z);
            this._offsets.push([aa, aa + z.length]);
        }
        var ba = v;
        while ((aa = w.indexOf(k)) > -1) {
            ba = r(ba, aa);
            w = r(w, aa);
        }
        if (v !== ba) {
            var ca = c('InputSelection').get(this._input);
            c('Input').setValue(this._input, ba);
            c('InputSelection').set(this._input, ca.start);
            this._value = ba;
        }
    };
    u.prototype._renderHashtags = function(v) {
        'use strict';
        this._initHashtagParser(v);
        if (!this._hasHashtags || !this._hashtagParser) return c('htmlize')(v);
        this._hashtags = this._hashtagParser.parse(v);
        var w = [],
            x = 0;
        for (var y = 0; y < this._hashtags.length; y++) {
            var z = this._hashtags[y];
            w.push(c('htmlize')(v.substring(x, z.rawOffset)), '<b>', z.marker, z.tag, '</b>');
            x = z.rawOffset + z.marker.length + z.tag.length;
        }
        w.push(c('htmlize')(v.substring(x)));
        return w.join('');
    };
    u.prototype.updateValue = function() {
        'use strict';
        var v = this._value = this._getMarkedValue(),
            w = this._orderedUIDs,
            x = n(v);
        for (var y = 0; y < w.length; ++y) {
            var z = '@[' + w[y] + ':]',
                aa = m(this._mentioned[w[y]].text);
            x = x.replace(aa, z);
            v = v.replace(aa, z);
        }
        var ba = this._renderHashtags(v);
        for (var y = 0; y < w.length; ++y) {
            var ca = w[y],
                da = this._mentioned[ca],
                ea = da.text,
                fa = da.weakreference ? '<b class="weak">' : '<b>';
            ba = ba.replace('@[' + ca + ':]', fa + c('htmlize')(m(ea)) + '</b>');
            ea = ea.replace(o, function(ha) {
                return '\\' + ha;
            });
            x = x.replace('@[' + ca + ':]', '@[' + ca + ':' + ea + ']');
        }
        var ga = s(ba);
        if (this._highlighterAuxContent || ga !== this._lastHighlighterHTML) {
            if (c('UserAgent_DEPRECATED').ie() < 9) ba = ba.replace(/ /g, t);
            this._highlighterContent.innerHTML = ba;
            this._updateHighlighter();
            this._lastHighlighterHTML = ga;
        }
        this._hiddenInput.value = x;
        this._updateHeight();
    };
    u.prototype._updateDirection = function() {
        'use strict';
        var v = c('Style').get(this._input, 'direction');
        if (v == this._dir) return;
        this._dir = v;
        c('Style').set(this._highlighter, 'direction', v);
        if (v == 'rtl') {
            c('Style').set(this._highlighter, 'text-align', 'right');
        } else c('Style').set(this._highlighter, 'text-align', 'left');
    };
    u.prototype._updateWidth = function() {
        'use strict';
        var v = this._input.offsetWidth;
        if (v === this._lastInputWidth) return;
        this._lastInputWidth = v;
        var w = c('Style').getFloat.bind(null, this._input),
            x = v - w('paddingLeft') - w('paddingRight') - w('borderLeftWidth') - w('borderRightWidth');
        this._highlighterInner.style.width = Math.max(x, 0) + 'px';
    };
    u.prototype._updateHeight = function() {
        'use strict';
        if (this._highlighterAuxContent) {
            var v = this._highlighter.offsetHeight,
                w = this._typeahead.getElement();
            if (v > w.offsetHeight) {
                this._typeahead.setHeight(v);
                c('Arbiter').inform('reflow');
            }
        }
    };
    u.prototype._updateTypeahead = function() {
        'use strict';
        var v = this._typeahead.getCore();
        v.matcher = this._matchers.getAutoMatcher();
        v.setExclusions(this._orderedUIDs);
        this.inform('update', {
            mentioned: this._mentioned
        });
    };
    u.prototype.setPlaceholder = function(v) {
        'use strict';
        this._placeholder = v instanceof c('FbtResult') ? v.toString() : v;
        if (!this.hasAuxContent()) c('Input').setPlaceholder(this._input, this._placeholder);
    };
    u.prototype._updateHighlighter = function() {
        'use strict';
        if (this._highlighterContent) c('CSS').conditionShow(this._highlighterContent, this._numMentioned > 0 || this.hasAuxContent() || this._hashtags.length);
    };
    u.prototype.setAuxContent = function(v) {
        'use strict';
        if (this._highlighterContent) {
            if (!this._highlighterAuxContent) {
                this._highlighterAuxContent = c('DOM').create('span', {
                    className: "highlighterAuxContent"
                });
                c('DOM').insertAfter(this._highlighterContent, this._highlighterAuxContent);
            }
            c('DOM').setContent(this._highlighterAuxContent, v);
            if (v) {
                c('Input').setPlaceholder(this._input, '');
            } else c('Input').setPlaceholder(this._input, this._placeholder);
            this._value = null;
            this._update();
            this._updateHighlighter();
            this._updateHeight();
        }
    };
    u.prototype.hasAuxContent = function() {
        'use strict';
        var v = this.getAuxContentRoot();
        return v && c('CSS').shown(v) && v.innerHTML.length > 0;
    };
    u.prototype.getAuxContentRoot = function() {
        'use strict';
        return this._highlighterAuxContent;
    };
    u.prototype.addMention = function(v, w) {
        'use strict';
        w = typeof w === 'undefined' ? true : w;
        var x = w === false ? '' : ' ',
            y = this._getMarkedValue();
        if (y !== '') y += ' ';
        c('Input').setValue(this._input, y + m(v.text) + x);
        this._addToken(v);
        this._update();
    };
    u.prototype.getMentions = function() {
        'use strict';
        return this._mentioned;
    };
    u.prototype.bootloadHashtagParser = function() {
        'use strict';
        if (!this._hashtagParser) c('Bootloader').loadModules(["HashtagParser"], function(v) {
            this._hashtagParser = v;
            if (this._initialized) {
                this._value = null;
                this._update();
            }
        }.bind(this), 'MentionsInput');
    };
    u.getInstance = function(v) {
        'use strict';
        var w = c('Parent').byClass(v, 'uiMentionsInput');
        return w ? c('DataStore').get(w, 'MentionsInput') : null;
    };
    u.prototype._checkShouldSwapDataSource = function(v) {
        'use strict';
        this._initHashtagParser(v);
    };
    u.prototype._initHashtagParser = function(v) {
        'use strict';
        if (this._hashtagParser) return;
        if (this._matchers.getHashtagMatcher().exec(v)) this.bootloadHashtagParser();
    };
    f.exports = u;
}), null);
__d('MentionsTypeaheadAreaView', ['ContextualTypeaheadView', 'FamilyRelationshipMentions', 'Parent'], (function a(b, c, d, e, f, g) {
    var h, i;
    if (c.__markCompiled) c.__markCompiled();
    h = babelHelpers.inherits(j, c('ContextualTypeaheadView'));
    i = h && h.prototype;
    j.prototype.getContext = function() {
        'use strict';
        return c('Parent').byClass(this.element, 'uiMentionsInput');
    };
    j.prototype.shouldValidateTypeaheadSelection = function(k) {
        'use strict';
        return c('FamilyRelationshipMentions').shouldShowNUX(k);
    };
    j.prototype.validateTypeaheadSelection = function(k, l) {
        'use strict';
        c('FamilyRelationshipMentions').showNUX(k, l);
    };

    function j() {
        'use strict';
        h.apply(this, arguments);
    }
    f.exports = j;
}), null);
__d('legacy:MentionsInput', ['MentionsInput'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    b.MentionsInput = c('MentionsInput');
}), 3);
__d('TypeaheadAreaCore', ['InputSelection', 'TextAreaControl', 'TypeaheadCore', 'emptyFunction'], (function a(b, c, d, e, f, g) {
    var h, i;
    if (c.__markCompiled) c.__markCompiled();
    h = babelHelpers.inherits(j, c('TypeaheadCore'));
    i = h && h.prototype;

    function j(k) {
        'use strict';
        i.constructor.call(this, k);
        this.matcher = new RegExp(this.matcher + '$');
        this.preventFocusChangeOnTab = true;
    }
    j.prototype.select = function(k) {
        'use strict';
        i.select.call(this, k);
        var l = this.element.value,
            m = this.prefix + k.text + this.suffix;
        this.expandBounds(l, m);
        var n = l.substring(0, this.start),
            o = l.substring(this.end);
        this.element.value = n + m + o;
        c('InputSelection').set(this.element, n.length + m.length);
    };
    j.prototype.expandBounds = function(k, l) {
        'use strict';
        k = k.toLowerCase();
        l = l.toLowerCase();
        var m, n, o, p, q = /\s/;
        n = k.substring(this.start, this.end);
        o = l.indexOf(n);
        m = this.start;
        while (m >= 0 && o >= 0) {
            p = k.charAt(m - 1);
            if (!p || q.test(p)) this.start = m;
            n = p + n;
            o = l.indexOf(n);
            m--;
        }
        n = k.substring(this.start, this.end);
        o = l.indexOf(n);
        m = this.end;
        while (m <= k.length && o >= 0) {
            p = k.charAt(m);
            if (!p || q.test(p)) this.end = m;
            n = n + p;
            o = l.indexOf(n);
            m++;
        }
    };
    j.prototype.getRawValue = function() {
        'use strict';
        var k = c('InputSelection').get(this.element).start || 0;
        return i.getValue.call(this).substring(0, k);
    };
    j.prototype.getValue = function() {
        'use strict';
        var k = this.matcher && this.matcher.exec(this.getRawValue());
        if (!k) return '';
        var l = k[0],
            m = k.index + l.length;
        l = l.replace(/^\s/, '');
        var n = l.length;
        l = l.replace(/\s$/, '');
        var o = n - l.length;
        this.start = m - n;
        this.end = m + o;
        if (k[2] && (k[2].charAt(0) === '#' || k[2].charAt(0) === '\\uFF03')) return k[2];
        return k[3] || k[1] || k[0];
    };
    j.prototype.updateHeight = function() {
        'use strict';
        var k = c('TextAreaControl').getInstance(this.element);
        k.updateHeight();
    };
    Object.assign(j.prototype, {
        prefix: '',
        suffix: ', ',
        matcher: "\\b[^,]*",
        click: c('emptyFunction')
    });
    f.exports = j;
}), null);
__d('TypeaheadHoistFriends', [], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(i) {
        'use strict';
        this._typeahead = i;
    }
    h.prototype.enable = function() {
        'use strict';
        var i = this._typeahead.getView();
        this._subscription = i.subscribe('beforeRender', function(j, k) {
            var l = [],
                m = [],
                n = [];
            for (var o = 0; o < k.results.length; ++o) {
                var p = k.results[o];
                if (p.type == 'header') {
                    n = n.concat(m, l);
                    n.push(p);
                    m = [];
                    l = [];
                } else if (p.type == 'user' && p.bootstrapped) {
                    m.push(p);
                } else l.push(p);
            }
            k.results = n.concat(m, l);
        });
    };
    h.prototype.disable = function() {
        'use strict';
        this._typeahead.getView().unsubscribe(this._subscription);
        this._subscription = null;
    };
    Object.assign(h.prototype, {
        _subscription: null
    });
    f.exports = h;
}), null);
__d('legacy:HoistFriendsTypeaheadBehavior', ['TypeaheadHoistFriends'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    if (!b.TypeaheadBehaviors) b.TypeaheadBehaviors = {};
    b.TypeaheadBehaviors.hoistFriends = function(h) {
        h.enableBehavior(c('TypeaheadHoistFriends'));
    };
}), 3);
__d('TypeaheadMetrics', ['AsyncRequest', 'Event', 'QueriesHistory', 'emptyFunction'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = 1000;

    function i(j) {
        'use strict';
        this.extraData = {};
        Object.assign(this, j);
    }
    i.prototype.init = function(j) {
        'use strict';
        this.init = c('emptyFunction');
        this._initImpl(j);
    };
    i.prototype._initImpl = function(j) {
        'use strict';
        this.core = j.getCore();
        this.view = j.getView();
        this.data = j.getData();
        this.queriesHistory = new(c('QueriesHistory'))(h);
        this.stats = {};
        this.sessionActive = false;
        this._sessionStartEvents = [];
        this._sessionEndEvents = [];
        this._reset();
        this.initEvents();
    };
    i.prototype._reset = function() {
        'use strict';
        this.log = [];
        this.stats = {};
        this.avgStats = {};
        this.sessionActive = false;
        this._setSid(Math.floor(Date.now() * Math.random()));
        this.request_ids = [];
        this.lastNotBackspacedQuery = '';
        this.queriesHistory.reset();
        this._logEvent('session_started', {});
    };
    i.prototype._logEvent = function(j, k) {
        'use strict';
        var l = {
            type: j,
            data: k,
            time: Date.now()
        };
        this.log.push(l);
    };
    i.prototype._setSid = function(j) {
        'use strict';
        this.sid = j;
        if (typeof this.data.queryData === 'object' && this.data.queryData !== null) {
            this.data.queryData.sid = this.sid;
        } else this.data.setQueryData({
            sid: this.sid
        });
        if (typeof this.data.bootstrapData === 'object' && this.data.bootstrapData !== null) {
            this.data.bootstrapData.sid = this.sid;
        } else this.data.setBootstrapData({
            sid: this.sid
        });
    };
    i.prototype.resetWithData = function(j) {
        'use strict';
        this.init = c('emptyFunction');
        this._initImpl(j);
    };
    i.prototype.resetWithDataBeforeSessionEnd = function(j) {
        'use strict';
        var k = this.sessionActive;
        this.init = c('emptyFunction');
        this._initImpl(j);
        this.sessionActive = k;
    };
    i.prototype.recordSelect = function(j) {
        'use strict';
        var k = j.selected;
        if (k.uid == null) {
            this.recordStat('selected_id', 'SELECT_NULL');
        } else this.recordStat('selected_id', k.uid);
        this.recordStat('selected_type', k.type);
        this.recordStat('selected_score', k.score);
        this.recordStat('selected_original_id', k.original_id);
        this.recordStat('place_id', k.place_id);
        this.recordStat('client_time', k.client_time);
        this.recordStat('selected_position', j.index);
        this.recordStat('selected_with_mouse', j.clicked ? 1 : 0);
        this.recordStat('selected_query', j.query);
        this._sessionEnd();
    };
    i.prototype.bindSessionStart = function(j, event, k) {
        'use strict';
        if (k)
            for (var l = 0; l < this._sessionStartEvents.length; ++l) {
                var m = this._sessionStartEvents[l];
                m.obj.unsubscribe(m.token);
            }
        this._sessionStartEvents.push({
            obj: j,
            token: j.subscribe(event, function(n, o) {
                this._sessionStart();
            }.bind(this))
        });
    };
    i.prototype.bindSessionEnd = function(j, event, k) {
        'use strict';
        if (k)
            for (var l = 0; l < this._sessionEndEvents.length; ++l) {
                var m = this._sessionEndEvents[l];
                m.obj.unsubscribe(m.token);
            }
        this._sessionEndEvents.push({
            obj: j,
            token: j.subscribe(event, function(n, o) {
                this._sessionEnd();
            }.bind(this))
        });
    };
    i.prototype.dataSubscribe = function(j, k) {
        'use strict';
        var l = this.data,
            m = this.data.subscribe(j, k);
        this._dataSubscriptions.push(function() {
            l.unsubscribe(m);
        });
    };
    i.prototype.initEvents = function() {
        'use strict';
        this._dataSubscriptions = this._dataSubscriptions || [];
        this._dataSubscriptions.forEach(function(j) {
            j();
        });
        this._dataSubscriptions = [];
        this.bindSessionStart(this.core, 'focus', false);
        this.bindSessionEnd(this.core, 'blur', false);
        this.view.subscribe('select', function(j, k) {
            this.recordSelect(k);
        }.bind(this));
        this.bindSessionEnd(this.view, 'select', false);
        this.view.subscribe('render', function(j, k) {
            this.results = k;
        }.bind(this));
        this.dataSubscribe('beforeQuery', function(j, k) {
            this._logEvent('user_typed', {
                query: k.value
            });
            if (!k.value) return;
            this.query = k.value;
            this.queriesHistory.add(this.query);
            if (this.lastNotBackspacedQuery.indexOf(this.query) !== 0) this.lastNotBackspacedQuery = this.query;
            this.recordCountStat('num_queries');
        }.bind(this));
        this.dataSubscribe('beforeFetch', function(j, k) {
            if (k.fetch_context.bootstrap) {
                this.bootstrapBegin = Date.now();
            } else k.fetch_context.queryBegin = Date.now();
            this._logEvent('async_query_started', {
                query: k.fetch_context.value,
                request_id: k.fetch_context.request_id
            });
        }.bind(this));
        this.dataSubscribe('fetchComplete', function(j, k) {
            this._logEvent('async_query_completed', {
                query: k.fetch_context.value,
                request_id: k.fetch_context.request_id
            });
            if (k.fetch_context.bootstrap) {
                this.recordAvgStat('bootstrap_latency', Date.now() - this.bootstrapBegin);
                var l = {};
                k.response.payload.entries.forEach(function(m) {
                    if (!l[m.type]) {
                        l[m.type] = 1;
                    } else l[m.type]++;
                });
                this.recordStat('bootstrap_response_types', l);
                this.bootstrapped = true;
            } else {
                if ('filtered_count' in k.response.payload) this.recordStat('filtered_count', k.response.payload.filtered_count);
                this.recordAvgStat('avg_query_latency', Date.now() - k.fetch_context.queryBegin);
            }
        }.bind(this));
        this.dataSubscribe('respond', function(j, k) {
            this._logEvent('respond', {
                query: k.value,
                num_results: k.results.length
            });
            var l = this.data.tokenizeBackend(k.value || '').flatValue,
                m = this.data.findBestPreviousQuery(l, this.data.getQueryIDs()) || '',
                n = this.data.getQueryIDs()[m];
            this.normalized_backend_query = m;
            this.request_id = n;
            this.request_ids.push(n);
        }.bind(this));
        this.dataSubscribe('dirty', function(j, k) {
            this.bootstrapped = false;
        }.bind(this));
    };
    i.prototype._sessionStart = function() {
        'use strict';
        if (this.sessionActive) return;
        this.sessionActive = true;
    };
    i.prototype._sessionEnd = function() {
        'use strict';
        if (!this.sessionActive) return;
        this.sessionActive = false;
        this.submit();
        this._reset();
    };
    i.prototype.recordStat = function(j, k) {
        'use strict';
        this.stats[j] = k;
    };
    i.prototype.recordCountStat = function(j) {
        'use strict';
        var k = this.stats[j];
        this.stats[j] = k ? k + 1 : 1;
    };
    i.prototype.recordAvgStat = function(j, k) {
        'use strict';
        if (this.avgStats[j]) {
            this.avgStats[j][0] += k;
            ++this.avgStats[j][1];
        } else this.avgStats[j] = [k, 1];
    };
    i.prototype.hasStats = function() {
        'use strict';
        return !!Object.keys(this.stats).length;
    };
    i.prototype.submit = function() {
        'use strict';
        if ('log_all_sessions' in this.extraData || this.hasStats()) {
            Object.assign(this.stats, this.extraData);
            if (this.results) {
                var j = this.results.map(function(m, n) {
                    return m.uid;
                });
                this.recordStat('candidate_results', JSON.stringify(j));
            }
            if (this.query) this.recordStat('query', this.query);
            if (this.lastNotBackspacedQuery) this.recordStat('last_not_backspaced_query', this.lastNotBackspacedQuery);
            this.recordStat('queries_history', JSON.stringify(this.queriesHistory.getQueries()));
            if (this.normalized_backend_query) this.recordStat('normalized_backend_query', this.normalized_backend_query);
            if (this.request_id) this.recordStat('request_id', this.request_id);
            if (this.request_ids.length) this.recordStat('request_ids', this.request_ids);
            if (this.sid) this.recordStat('sid', this.sid);
            if (this.bootstrapped) this.recordStat('bootstrapped', 1);
            for (var k in this.avgStats) {
                var l = this.avgStats[k];
                this.stats[k] = l[0] / l[1];
            }
            this.recordStat('log', JSON.stringify(this.log));
            new(c('AsyncRequest'))().setURI(this.endPoint).setMethod('POST').setData({
                stats: this.stats
            }).setErrorHandler(c('emptyFunction')).send();
            this._reset();
        }
    };
    i.register = function(j, k, l) {
        'use strict';
        if (document.activeElement === j) {
            k.init(l);
        } else var m = c('Event').listen(j, 'focus', function() {
            k.init(l);
            m.remove();
        });
    };
    Object.assign(i.prototype, {
        endPoint: '/ajax/typeahead/record_basic_metrics.php'
    });
    f.exports = i;
}), null);
__d("XBirthdayMessagePostController", ["XController"], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = c("XController").create("\/reminders\/birthday\/message\/", {});
}), null);