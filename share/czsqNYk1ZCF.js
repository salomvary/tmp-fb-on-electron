if (self.CavalryLogger) {
    CavalryLogger.start_js(["5IlUv"]);
}

__d("ComposerXAjaxEndpoint", [], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = {
        ADS_MEDIA_UPLOAD: "\/ajax\/ads\/create\/composerx\/attachment\/media\/upload\/",
        ADS_ATTACHMENT_STATUS: "\/ajax\/ads\/create\/composerx\/attachment\/status\/",
        MEDIA_UPLOAD: "\/ajax\/composerx\/attachment\/media\/upload\/",
        VIDEO_UPLOAD: "\/ajax\/composerx\/attachment\/video\/upload\/"
    };
}), null);
__d("ComposerXContextConfig", [], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = {
        propertyNames: {
            actorID: "ACTOR_ID",
            postID: "POST_ID"
        },
        propertyValues: {
            ACTOR_ID: "actorID",
            POST_ID: "postID"
        }
    };
}), null);
__d('ComposerXAttachmentBootstrap', ['csx', 'cx', 'CSS', 'Form', 'FormSubmit', 'Parent', 'URI'], (function a(b, c, d, e, f, g, h, i) {
    if (c.__markCompiled) c.__markCompiled();
    var j = [],
        k = {
            bootstrap: function l(m) {
                k.load(c('Parent').byTag(m, 'form'), m.getAttribute('data-endpoint'));
            },
            load: function l(m, n, o) {
                var p = new(c('URI'))(n).addQueryData({
                    composerurihash: k.getURIHash(n)
                });
                c('CSS').conditionClass(m, "_fu", o);
                var q = c('Parent').bySelector(m, "._2_4");
                c('CSS').removeClass(q, 'async_saving');
                c('Form').setDisabled(m, false);
                m.action = p.toString();
                c('FormSubmit').send(m);
            },
            getURIHash: function l(m) {
                if (m === 'initial') return 'initial';
                var n = j.indexOf(m);
                if (n !== -1) {
                    return n + '';
                } else {
                    n = j.length;
                    j[n] = m;
                    return n + '';
                }
            }
        };
    f.exports = k;
}), null);
__d('ComposerXContext', ['invariant', 'ComposerXContextConfig'], (function a(b, c, d, e, f, g, h) {
    if (c.__markCompiled) c.__markCompiled();
    var i = function k(l) {
        return c('ComposerXContextConfig').propertyNames[l];
    };

    function j(k) {
        'use strict';
        this.$ComposerXContext1 = {};
        for (var l in k) this.setProperty(l, k[l]);
    }
    j.prototype.getProperty = function(k) {
        'use strict';
        !i(k) ? h(0) : void 0;
        return this.$ComposerXContext1[k];
    };
    j.prototype.setProperty = function(k, l) {
        'use strict';
        !i(k) ? h(0) : void 0;
        this.$ComposerXContext1[k] = l;
        return this;
    };
    j.PROPERTIES = c('ComposerXContextConfig').propertyValues;
    f.exports = j;
}), null);
__d('ComposerXSessionIDInserter', ['csx', 'cx', 'ComposerXSessionIDs', 'DOM', 'DOMQuery', 'Event', 'Parent', 'onEnclosingPageletDestroy'], (function a(b, c, d, e, f, g, h, i) {
    if (c.__markCompiled) c.__markCompiled();
    var j = {
        init: function k(l) {
            var m = c('Event').listen(l, 'submit', j._onSubmit);
            c('onEnclosingPageletDestroy')(l, function() {
                m.remove();
            });
        },
        _onSubmit: function k(l) {
            j.insertSessionInput(l.getTarget());
        },
        insertSessionInput: function k(l) {
            var m = c('Parent').bySelector(l, "._119");
            if (!m) return;
            var n = c('ComposerXSessionIDs').getSessionID(m.id);
            if (!n) return;
            var o = c('DOMQuery').scry(l, "._5r_b")[0];
            if (!o) {
                c('DOM').prependContent(l, c('ComposerXSessionIDs').createSessionIDInput(n));
            } else o.value = n;
        }
    };
    f.exports = j;
}), null);
__d("AudienceSelectorTags", [], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {},
        i = {
            hasTags: function j(k) {
                return h.hasOwnProperty(k);
            },
            setHasTags: function j(k) {
                if (k) h[k] = true;
            }
        };
    f.exports = i;
}), null);
__d('DynamicIconSelector', ['Button', 'CSS', 'DOM', 'SelectorDeprecated'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        swapIcon: function i(j) {
            var k = c('SelectorDeprecated').getSelectedOptions(j)[0],
                l = k && c('DOM').scry(k, '.itemIcon')[0],
                m = c('SelectorDeprecated').getSelectorButton(j);
            if (l) {
                c('Button').setIcon(m, l.cloneNode(true));
            } else {
                var n = c('DOM').scry(m, '.img')[0];
                n && c('DOM').remove(n);
            }
            c('CSS').conditionClass(m, 'uiSelectorChevronOnly', !l);
        }
    };
    c('SelectorDeprecated').subscribe('change', function(i, j) {
        var k = j.selector;
        if (c('CSS').hasClass(k, 'dynamicIconSelector')) h.swapIcon(k);
    });
    f.exports = h;
}), null);
__d('PrivacySelectorOption', ['csx', 'fbt', 'Arbiter', 'AudienceSelectorTags', 'CSS', 'CurrentUser', 'DOM', 'DynamicIconSelector', 'Parent', 'PrivacyConst', 'SelectorDeprecated', 'intlList'], (function a(b, c, d, e, f, g, h, i) {
    if (c.__markCompiled) c.__markCompiled();

    function j(k, l) {
        if (!k) throw new Error("there's no DOM option. Config data: ", l);
        this._elem = k;
        this._selector = c('Parent').byClass(this._elem, 'audienceSelector');
        if (!this._selector) return;
        this._priv_base_val = l.priv_base_val;
        this._audienceCount = l.audience_count || "";
        this._hasRestricted = l.has_restricted || false;
        this._isCustom = l.is_custom || false;
        this._includedAudience = l.included || "";
        this._excludedAudience = l.excluded || {};
        this._excludedTaggees = {};
        this._tagExpansionBehavior = l.tag_expansion_behavior || c('PrivacyConst').TagExpansion.NONE;
        this._plusLabel = c('DOM').scry(k, '.plusLabel')[0];
        this._audienceCountLabel = c('DOM').scry(k, '.audienceCountLabel')[0];
        this._taggedIDs = [];
        this._tags = [];
        this._recalculateTooltipAndLabel();
        this._updateOptionCountLabel();
        this._updateSelector();
        c('Arbiter').subscribe('Composer/changedtags', function(m, n) {
            var o = c('CSS').hasClass(this._selector, 'composerAudienceSelector');
            if (!this._getChangedData() || !o) return;
            this._tags = [];
            this._taggedIDs = [];
            for (var p = 0; p < n.withTags.length; p++) {
                var q = n.withTags[p].info;
                if (q.uid != c('CurrentUser').getID()) {
                    this._tags.push(q.text);
                    this._taggedIDs.push(q.uid);
                }
            }
            for (p in n.mention)
                if (n.mention[p].type == 'user' && n.mention[p].uid != c('CurrentUser').getID()) {
                    this._tags.push(n.mention[p].text);
                    this._taggedIDs.push(n.mention[p].uid);
                }
            var r = c('DOM').scry(document.body, "._5l7q")[0];
            r && !!this._taggedIDs.length && c('CSS').hide(r);
            this._updateOptionCountLabel();
            var s = this._recalculateTooltipAndLabel();
            if (s && c('SelectorDeprecated').isOptionSelected(this._elem)) {
                this._updateSelector();
                c('Arbiter').inform('SelectedPrivacyOption/changed', this._getChangedData());
            }
        }.bind(this));
        c('SelectorDeprecated').listen(this._selector, 'change', this._updateSelector.bind(this));
    }
    Object.assign(j.prototype, {
        updateOption: function k(l, m, n, o, p) {
            this._priv_base_val = l;
            this._includedAudience = m;
            this._excludedAudience = n;
            this._tagExpansionBehavior = o;
            this._audienceCount = p;
            this._recalculateTooltipAndLabel();
            this._updateOptionCountLabel();
            return {
                label: this._label,
                tooltip: this._tooltip
            };
        },
        _recalculateTooltipAndLabel: function k() {
            var l = this._label;
            this._label = this._getNewSelectorLabel();
            var m = this._tooltip;
            this._tooltip = this._getNewTooltip();
            return m != this._tooltip || l != this._label;
        },
        _getNewTooltip: function k() {
            if (this._isCustom) return this._recalcCustomTooltip();
            switch (this._priv_base_val) {
                case c('PrivacyConst').FriendsValue.ALL_FRIENDS:
                    return this._recalcFriendsTooltip();
                case c('PrivacyConst').FriendsValue.FRIENDS_MINUS_ACQUAINTANCES:
                    return this._recalcFriendsMinusTooltip();
                case c('PrivacyConst').FriendsValue.SELF:
                    var l = this._getTagExpansionText();
                    return l ? l : this._getIncludedAudience();
                default:
                    return this._recalcCustomTooltip();
            }
        },
        _getNewSelectorLabel: function k() {
            var l = this._elem.getAttribute('data-label').replace(/\(.*\)/, "");
            if (this._showAudienceCount()) {
                var m = ' (' + this._audienceCount + ')';
                l += m;
            }
            if (this._isTagExpanded()) l += ' (+)';
            return l;
        },
        _updateOptionCountLabel: function k() {
            if (this._audienceCountLabel) {
                if (this._showAudienceCount()) {
                    var l = ' (' + this._audienceCount + ')';
                    c('DOM').setContent(this._audienceCountLabel, l);
                }
                c('CSS').conditionShow(this._audienceCountLabel, this._showAudienceCount());
            }
            this._plusLabel && c('CSS').conditionShow(this._plusLabel, this._isTagExpanded());
        },
        _getChangedData: function k() {
            return {
                tags: this._taggedIDs,
                privacy: this._priv_base_val
            };
        },
        _showAudienceCount: function k() {
            return this._audienceCountLabel && this._audienceCount && this._audienceCount.length > 0;
        },
        _isTagExpanded: function k() {
            var l = this._getTagExpansionBehavior(),
                m = !!this._taggedIDs.length || this._alreadyHasTags();
            return m && l != c('PrivacyConst').TagExpansion.NONE;
        },
        _alreadyHasTags: function k() {
            var l = c('DOM').scry(this._selector, '*[data-oid]')[0];
            l = l && l.getAttribute('data-oid');
            return l && c('AudienceSelectorTags').hasTags(l);
        },
        _updateSelector: function k() {
            if (!this._isSharedAlbum() && c('SelectorDeprecated').isOptionSelected(this._elem)) {
                var l = c('CSS').hasClass(this._selector, 'composerAudienceSelector');
                l && c('SelectorDeprecated').setButtonLabel(this._selector, this._label);
                c('SelectorDeprecated').setButtonTooltip(this._selector, this._tooltip);
                c('DynamicIconSelector').swapIcon(this._selector);
                return false;
            }
            return true;
        },
        _isSharedAlbum: function k() {
            var l = c('DOM').scry(this._selector, '*[data-shared-album]')[0];
            return l && l.getAttribute('data-shared-album');
        },
        _getTagExpansionBehavior: function k() {
            if (this._tagExpansionBehavior) return this._tagExpansionBehavior;
            var l = this._priv_base_val === c('PrivacyConst').FriendsValue.SELF,
                m = this._priv_base_val === c('PrivacyConst').FriendsValue.EVERYONE;
            if (l && this._isSharedAlbum() || m) {
                return c('PrivacyConst').TagExpansion.NONE;
            } else if (this._priv_base_val < c('PrivacyConst').FriendsValue.ALL_FRIENDS) return c('PrivacyConst').TagExpansion.TAGGEES;
            return c('PrivacyConst').TagExpansion.FRIENDS_OF_TAGGEES;
        },
        _getTagExpansionText: function k() {
            var l = this._getTagExpansionBehavior();
            if (!!this._taggedIDs.length || this._alreadyHasTags()) {
                if (l == c('PrivacyConst').TagExpansion.FRIENDS_OF_TAGGEES) {
                    return i._("friends of anyone tagged");
                } else if (l == c('PrivacyConst').TagExpansion.TAGGEES) return i._("Anyone tagged");
                return '';
            }
            return '';
        },
        _getIncludedAudience: function k() {
            if (this._includedAudience) return this._includedAudience;
            var l = this._priv_base_val === c('PrivacyConst').FriendsValue.SELF;
            if (l && !this._isSharedAlbum()) return i._("Only Me");
            return this._elem.getAttribute('data-label');
        },
        _getCombinedSentence: function k(l, m) {
            if (!m) return l;
            return i._("{list of people who can see this}; Except: {list of people who cannot see this}", [i.param('list of people who can see this', l), i.param('list of people who cannot see this', m)]);
        },
        _recalcFriendsTooltip: function k() {
            var l = this._tags.length;
            if (l > 2) {
                return this._hasRestricted ? i._("Your friends and friends of anyone tagged; Except: Restricted") : i._("Your friends and friends of anyone tagged");
            } else if (l == 2) {
                if (this._hasRestricted) {
                    return i._("Your friends, {user}'s friends and {user2}'s friends; Except: Restricted", [i.param('user', this._tags[0]), i.param('user2', this._tags[1])]);
                } else return i._("Your friends, {user}'s friends and {user2}'s friends", [i.param('user', this._tags[0]), i.param('user2', this._tags[1])]);
            } else if (l == 1) {
                if (this._hasRestricted) {
                    return i._("Your friends and {user}'s friends; Except: Restricted", [i.param('user', this._tags[0])]);
                } else return i._("Your friends and {user}'s friends", [i.param('user', this._tags[0])]);
            } else return this._hasRestricted ? i._("Your friends; Except: Restricted") : i._("Your friends");
        },
        _recalcFriendsMinusTooltip: function k() {
            var l = this._tags.length;
            if (l > 0 || this._alreadyHasTags()) {
                var m = i._("friends of anyone tagged"),
                    n = i._("{people who can see this}, {list of more people who can see this}", [i.param('people who can see this', i._("Your friends")), i.param('list of more people who can see this', m)]),
                    o = i._("Acquaintances");
                if (this._hasRestricted) o = i._("{Name of Acquaintances friend list}, {restricted}", [i.param('Name of Acquaintances friend list', o), i.param('restricted', i._("Restricted"))]);
                return this._getCombinedSentence(n, o);
            } else {
                if (this._hasRestricted) return i._("Friends; Except: Acquaintances, Restricted");
                return i._("Friends except Acquaintances");
            }
        },
        _recalcCustomTooltip: function k() {
            var l = this._getIncludedAudience(),
                m = this._getTagExpansionText();
            if (m) l = i._("{list of people who can see this}, {list of additional people who can see this}", [i.param('list of people who can see this', l), i.param('list of additional people who can see this', m)]);
            for (var n = 0; n < this._taggedIDs.length; n++) {
                o = this._taggedIDs[n];
                if (o in this._excludedAudience) {
                    delete this._excludedAudience[o];
                    this._excludedTaggees[o] = this._tags[n];
                    break;
                }
            }
            for (var o in this._excludedTaggees)
                if (this._excludedTaggees.hasOwnProperty(o))
                    if (this._taggedIDs.indexOf(o) === -1) {
                        this._excludedAudience[o] = this._excludedTaggees[o];
                        delete this._excludedTaggees[o];
                        break;
                    }
            var p = [];
            for (n in this._excludedAudience)
                if (this._excludedAudience.hasOwnProperty(n)) p.push(this._excludedAudience[n]);
            return this._getCombinedSentence(l, c('intlList')(p));
        }
    });
    f.exports = j;
}), null);
__d('CustomPrivacyOptionController', ['Arbiter', 'AsyncDialog', 'AsyncRequest', 'DOM', 'Event', 'Form', 'Parent', 'PrivacyConst', 'PrivacySelectorOption', 'SelectorDeprecated', 'XPrivacyCustomDialogController'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(i, j) {
        if (!i) return;
        setTimeout(function() {
            this._selector = c('Parent').byClass(i, 'audienceSelector');
            if (!this._selector) return;
            this.initCustomState(i, j.option_id, j.id);
            var k = {
                priv_base_val: j.base_audience_value,
                audience_count: j.audience_count,
                is_custom: true,
                included: j.included_audience,
                excluded: j.excluded_audience,
                tag_expansion_behavior: j.tag_expansion_behavior
            };
            this._optionJSInstance = new(c('PrivacySelectorOption'))(i, k);
            c('Event').listen(i, 'click', function(event) {
                this.openCustomDialog(event, j.option_id, j.explain_tags, j.autosave, j.limit_community, j.limit_facebook, j.limit_fof, j.limit_tagexpand, j.source);
            }.bind(this));
            c('SelectorDeprecated').listen(this._selector, 'select', function(l) {
                if (l.option._id != this._id) this.clearCustomState();
            }.bind(this));
        }.bind(this), 0);
    }
    Object.assign(h, {
        _instances: {},
        update: function i(j, k, l, m, n, o, p, q, r) {
            var s = h._instances[j];
            s._update(k, l)._updateOption(l, n, o, p, q, r);
            c('Arbiter').inform('Form/change', {
                node: s._container
            });
        },
        getData: function i(j) {
            var k = h._instances[j];
            return k && k._privacyData;
        },
        setPrivacyData: function i(j, k, l) {
            h._instances[j]._update(k, l);
        }
    });
    Object.assign(h.prototype, {
        _updateOption: function i(j, k, l, m, n, o) {
            var p = c('SelectorDeprecated').getOption(this._selector, j) || c('SelectorDeprecated').getOption(this._selector, c('PrivacyConst').BaseValue.CUSTOM + ''),
                q = this._optionJSInstance.updateOption(k, l, m, n, o);
            c('Arbiter').inform('CustomPrivacyOptionController/update', {
                selector: this._selector,
                option: p,
                tooltip: q.tooltip,
                label: q.label
            });
            return this;
        },
        _update: function i(j, k) {
            var l = k == c('PrivacyConst').BaseValue.CUSTOM || !c('SelectorDeprecated').getOption(this._selector, k),
                m = this._selector.getAttribute('data-name');
            this.updateCustomState(j, l, m);
            return this;
        },
        initCustomState: function i(j, k, l) {
            h._instances[k] = this;
            this._container = c('DOM').find(j, '.customPrivacyInputs');
            this._id = l;
            this._privacyData = {};
            var m = c('Form').serialize(this._container);
            if (m.audience) this._privacyData = m.audience[l];
            return j;
        },
        openCustomDialog: function i(event, j, k, l, m, n, o, p, q) {
            var r = c('XPrivacyCustomDialogController').getURIBuilder().setString('option_id', j).setString('id', this._id).setString('privacy_data', JSON.stringify(this._privacyData)).setBool('explain_tags', k).setBool('autosave', l).setBool('limit_community', m).setBool('limit_facebook', n).setBool('limit_fof', o).setBool('limit_tagexpand', p).setBool('is_new_privacy_selector', false).setString('source', q).getURI(),
                s = new(c('AsyncRequest'))(r);
            s.setRelativeTo(event.getTarget());
            c('AsyncDialog').send(s, function(t) {
                t.subscribe('cancel', function() {
                    c('Arbiter').inform('CustomPrivacyOptionController/cancel', {
                        selector: this._selector
                    });
                }.bind(this));
            }.bind(this));
        },
        updateCustomState: function i(j, k, l) {
            this.clearCustomState();
            this._privacyData = babelHelpers['extends']({}, j);
            if (k)
                if (l) {
                    l = l.slice(0, -'[value]'.length);
                    var m = {};
                    m[l] = j;
                    c('Form').createHiddenInputs(m, this._container, {}, true);
                }
        },
        clearCustomState: function i() {
            this._privacyData = {};
            c('DOM').empty(this._container);
        }
    });
    f.exports = h;
}), null);
__d('AudienceSelector', ['Arbiter', 'AsyncRequest', 'AudienceSelectorTags', 'CSS', 'CustomPrivacyOptionController', 'DOM', 'DynamicIconSelector', 'PrivacyConst', 'SelectorDeprecated'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {};
    c('SelectorDeprecated').subscribe('select', function(j, k) {
        if (!c('CSS').hasClass(k.selector, 'audienceSelector')) return;
        var l = c('SelectorDeprecated').getOptionValue(k.option);
        k.value = l;
        c('Arbiter').inform('AudienceSelector/changed', k);
        if (l == c('PrivacyConst').BaseValue.CUSTOM && !c('CSS').hasClass(k.option, 'noDialog')) {
            c('SelectorDeprecated').toggle(k.selector);
            return false;
        }
        c('Arbiter').inform('AudienceSelector/changedNonCustomDialogButton', k);
        if (c('CSS').hasClass(k.selector, 'dataTooltip')) {
            var m = c('DOM').find(k.option, '.itemAnchor').getAttribute('data-tooltip');
            c('SelectorDeprecated').setButtonTooltip(k.selector, m || null);
        }
        if (!c('CSS').hasClass(k.option, 'specialOption')) return;
        var n = c('DOM').find(k.option, 'a').getAttribute('data-type');
        if (c('CSS').hasClass(k.option, 'moreOption')) {
            c('CSS').addClass(k.selector, n);
            c('CSS').addClass(k.selector, 'showSecondaryOptions');
            return false;
        } else if (c('CSS').hasClass(k.option, 'returnOption')) {
            c('CSS').removeClass(k.selector, 'showSecondaryOptions');
            c('CSS').removeClass(k.selector, 'friendList');
            return false;
        }
    });
    var i = {
        keepSynchronized: function j(k, l) {
            h[k] || (h[k] = {});
            h[k][l.id] = l;
        },
        setHasTags: function j(k) {
            c('AudienceSelectorTags').setHasTags(k);
        },
        getComposerInstance: function j() {
            var k = h['PrivacyLiteNav/audience'];
            if (k) {
                var l;
                for (var m in k) {
                    l = k[m];
                    return l;
                }
            }
            return null;
        },
        forceAndKeepSynchronized: function j(k, l) {
            i.keepSynchronized(k, l);
            c('Arbiter').inform('AudienceSelector/update', {
                option: c('SelectorDeprecated').getSelectedOptions(l)[0],
                selector: l
            });
        },
        get: function j(k) {
            if (c('CSS').hasClass(k, 'audienceSelector')) return k;
            var l = c('DOM').scry(k, 'div.audienceSelector');
            if (l.length != 1) return;
            return l[0];
        },
        setAudience: function j(k, l) {
            var m = i.get(k);
            c('SelectorDeprecated').loadMenu(m, function(n) {
                c('SelectorDeprecated').setSelected(m, l.toString());
                c('DynamicIconSelector').swapIcon(m);
                var o = c('SelectorDeprecated').getSelectedOptions(m),
                    p = o[0] && c('DOM').find(o[0], 'a');
                if (p && p.getAttribute('ajaxify')) c('AsyncRequest').bootstrap(p.getAttribute('ajaxify'), p, true);
                c('Arbiter').inform('AudienceSelector/changed', {
                    option: o[0],
                    selector: m
                });
            });
        }
    };
    c('Arbiter').subscribe('CustomPrivacyOptionController/update', function(j, k) {
        if (!c('CSS').hasClass(k.selector, 'audienceSelector')) return;
        c('SelectorDeprecated').setSelected(k.selector, c('SelectorDeprecated').getOptionValue(k.option));
        c('DynamicIconSelector').swapIcon(k.selector);
        var l = c('CSS').hasClass(k.selector, 'composerAudienceSelector');
        if (l) c('SelectorDeprecated').setButtonLabel(k.selector, k.label);
        c('SelectorDeprecated').setButtonTooltip(k.selector, k.tooltip);
        c('Arbiter').inform('AudienceSelector/update', k);
    });
    c('Arbiter').subscribe(['AudienceSelector/changed', 'AudienceSelector/update'], function(event, j) {
        var k = c('SelectorDeprecated').getOptionValue(j.option),
            l = {};
        if (k == c('PrivacyConst').BaseValue.CUSTOM) {
            if (event == 'AudienceSelector/changed') return;
            l = c('CustomPrivacyOptionController').getData(j.option.id);
            if (!l) return;
        }
        for (var m in h) {
            var n = h[m];
            if (n[j.selector.id]) {
                c('Arbiter').inform('AudienceSelector/syncNonSelectorIcon', {
                    category: m
                });
                for (var o in n) {
                    var p = n[o];
                    if (!p || j.selector === p) continue;
                    if (c('SelectorDeprecated').getValue(p) !== k) {
                        c('SelectorDeprecated').setSelected(p, k);
                        c('DynamicIconSelector').swapIcon(p);
                    }
                    if (k == c('PrivacyConst').BaseValue.CUSTOM) {
                        var q = c('SelectorDeprecated').getOption(p, c('PrivacyConst').BaseValue.CUSTOM + '');
                        if (q) {
                            c('CustomPrivacyOptionController').setPrivacyData(q.id, l, k);
                            c('SelectorDeprecated').setButtonTooltip(p, j.tooltip);
                        }
                    }
                }
            }
        }
    });
    f.exports = i;
}), null);
__d("XStickyComposerChangeController", ["XController"], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = c("XController").create("\/privacy\/sticky_composer\/change\/", {
        privacyx: {
            type: "String"
        },
        logging_source: {
            type: "String"
        }
    });
}), null);
__d('PrivacySelector', ['csx', 'cx', 'Arbiter', 'ArbiterMixin', 'AsyncRequest', 'AudienceSelector', 'CSS', 'DOM', 'PrivacyConst', 'DataStore', 'PrivacySelectorNewDispatcher', 'Run', 'SelectorDeprecated', 'SubscriptionsHandler', 'XStickyComposerChangeController', 'mixin'], (function a(b, c, d, e, f, g, h, i) {
    var j, k;
    if (c.__markCompiled) c.__markCompiled();
    j = babelHelpers.inherits(l, c('mixin')(c('ArbiterMixin')));
    k = j && j.prototype;

    function l(m, n) {
        'use strict';
        k.constructor.call(this);
        this.$PrivacySelector1 = n;
        if (n) {
            this.$PrivacySelector2 = m;
        } else this.$PrivacySelector3 = m;
        this.$PrivacySelector4 = null;
        this.$PrivacySelector5 = new(c('SubscriptionsHandler'))();
        this.$PrivacySelector6 = new(c('SubscriptionsHandler'))();
        if (this.$PrivacySelector1) {
            this.$PrivacySelector7();
        } else this.$PrivacySelector8();
        c('Run').onLeave(this.cleanup.bind(this));
    }
    l.prototype.select = function(m, n, o) {
        'use strict';
        if (!m || !n) throw new Error('PrivacySelector.select: you must pass in privacyParam ' + 'and privacyBase');
        if (this.$PrivacySelector1) {
            if (o) this.$PrivacySelector5.addSubscriptions(this.$PrivacySelector2.subscribeOnce('changed', function(p, q) {
                o('changed', {
                    post_param: q.post_param
                });
            }));
            this.$PrivacySelector2.selectOption(m);
        } else {
            if (o) this.$PrivacySelector6.addSubscriptions(c('Arbiter').subscribe('AudienceSelector/changed', function(p, q) {
                if (this.$PrivacySelector9(q.selector)) {
                    var r = c('SelectorDeprecated').getOptionValue(q.option);
                    o('changed', {
                        privacy_base: r
                    });
                }
            }.bind(this)));
            c('AudienceSelector').setAudience(this.$PrivacySelector3, n);
        }
    };
    l.prototype.expandFull = function(m) {
        'use strict';
        if (this.$PrivacySelector1) {
            this.$PrivacySelector2.openSelectorExpanded(m);
        } else this.expand(m);
    };
    l.prototype.expandFullAndShowFlyout = function(m) {
        'use strict';
        this.expandFull(this.showFlyoutOnMenu.bind(this, m));
    };
    l.prototype.expand = function(m) {
        'use strict';
        if (this.$PrivacySelector1) {
            this.$PrivacySelector2.openSelector(m);
        } else {
            var n = c('SelectorDeprecated').getSelectorMenu(this.$PrivacySelector3);
            if (!n) {
                c('SelectorDeprecated').loadMenu(this.$PrivacySelector3, function() {
                    m && m();
                });
            } else this.$PrivacySelector6.addSubscriptions(c('SelectorDeprecated').listen(this.$PrivacySelector3, 'open', function() {
                m && m();
                this.$PrivacySelector9(this.$PrivacySelector3);
            }.bind(this)));
            c('SelectorDeprecated').toggle(this.$PrivacySelector3, m);
        }
    };
    l.prototype.showFlyoutOnMenu = function(m) {
        'use strict';
        this.$PrivacySelector10 && this.$PrivacySelector10.hide();
        this.$PrivacySelector10 = m;
        var n;
        if (this.$PrivacySelector1) {
            n = this.$PrivacySelector2.getMenuElement();
            m.setOffsetY(85);
        } else {
            n = c('DOM').scry(this.$PrivacySelector3, 'div.uiSelectorMenuWrapper')[0];
            m.setOffsetY(13);
        }
        m.setContext(n);
        m.show();
    };
    l.prototype.setOnClose = function(m) {
        'use strict';
        this.$PrivacySelector4 = m;
    };
    l.prototype.cleanup = function() {
        'use strict';
        this.$PrivacySelector5.release();
        this.$PrivacySelector5 = new(c('SubscriptionsHandler'))();
        this.$PrivacySelector6.release();
        this.$PrivacySelector6 = new(c('SubscriptionsHandler'))();
        this.$PrivacySelector10 && this.$PrivacySelector10.hide();
        this.$PrivacySelector10 = null;
        this.$PrivacySelector4 = null;
    };
    l.prototype.disable = function() {
        'use strict';
        if (this.$PrivacySelector1) {
            this.$PrivacySelector2.getPopoverMenu().disable();
        } else c('SelectorDeprecated').setEnabled(this.$PrivacySelector3, false);
    };
    l.prototype.enable = function() {
        'use strict';
        if (this.$PrivacySelector1) {
            this.$PrivacySelector2.getPopoverMenu().enable();
        } else c('SelectorDeprecated').setEnabled(this.$PrivacySelector3, true);
    };
    l.get = function(m) {
        'use strict';
        if (!m) return;
        var n = c('DataStore').get(m, 'selector');
        if (!n) {
            m = l.getDOMFromStory(m);
            if (!m) return;
            n = c('DataStore').get(m, 'selector');
        }
        if (n) return new l(n, true);
        return new l(m, false);
    };
    l.getAdamaSelectorInstance = function(m) {
        'use strict';
        if (!m) return;
        var n = c('DataStore').get(m, 'selector');
        if (!n) {
            m = l.getDOMFromStory(m);
            if (!m) return;
            n = c('DataStore').get(m, 'selector');
        }
        return n;
    };
    l.getDOMFromStory = function(m) {
        'use strict';
        if (!m) return;
        var n = c('DOM').scry(m, "._43_1")[0];
        if (n) return n;
        return c('AudienceSelector').get(m);
    };
    l.getIconFromSelectorDOM = function(m) {
        'use strict';
        return c('DOM').scry(m, 'i.img')[0];
    };
    l.setComposerPrivacy = function(m, n, o) {
        'use strict';
        var p = c('XStickyComposerChangeController').getURIBuilder().setString('privacyx', m);
        o && p.setString('logging_source', o);
        new(c('AsyncRequest'))(p.getURI()).send();
        c('PrivacySelectorNewDispatcher').handleUpdateFromSelector({
            selector_type: c('PrivacyConst').PrivacyField.CURRENT_COMPOSER,
            post_param: m,
            unique_value: '_updateStickyComposerPrivacy'
        });
        var q = c('AudienceSelector').getComposerInstance(n);
        if (q) c('AudienceSelector').setAudience(q, n);
    };
    l.isFakeOrUneditableSelector = function(m) {
        'use strict';
        return (c('CSS').matchesSelector(m, "._2qwi") || c('CSS').matchesSelector(m, "._29ee") || c('CSS').matchesSelector(m, "._jl") || c('DOM').scry(m, "._2qwi")[0] || c('DOM').scry(m, "._29ee")[0] || c('DOM').scry(m, "._jl")[0]);
    };
    l.prototype.$PrivacySelector7 = function() {
        'use strict';
        this.$PrivacySelector5.addSubscriptions(this.$PrivacySelector2.subscribe('changed', function(m, n) {
            this.inform('changed', {
                post_param: n.post_param
            });
        }.bind(this)), this.$PrivacySelector2.subscribe('selectorFinished', function() {
            this.$PrivacySelector4 && this.$PrivacySelector4();
        }.bind(this)));
    };
    l.prototype.$PrivacySelector8 = function() {
        'use strict';
        this.$PrivacySelector5.addSubscriptions(c('Arbiter').subscribe('AudienceSelector/update', function(m, n) {
            if (this.$PrivacySelector3 !== n.selector) return;
            var o = c('SelectorDeprecated').getOptionValue(n.option);
            this.inform('changed', {
                privacy_base: o
            });
        }.bind(this)), c('Arbiter').subscribe('AudienceSelector/changed', function(m, n) {
            if (this.$PrivacySelector3 !== n.selector) return;
            if (c('CSS').hasClass(n.option, 'moreOption') || c('CSS').hasClass(n.option, 'returnOption')) return;
            if (n.value != c('PrivacyConst').BaseValue.CUSTOM) {
                this.inform('changed', {
                    privacy_base: n.value
                });
            } else if (n.value == c('PrivacyConst').BaseValue.CUSTOM) this.$PrivacySelector11 = true;
        }.bind(this)), c('SelectorDeprecated').listen(this.$PrivacySelector3, 'close', function() {
            if (this.$PrivacySelector11) {
                this.$PrivacySelector11 = false;
                return;
            }
            this.$PrivacySelector4 && this.$PrivacySelector4();
        }.bind(this)), c('Arbiter').subscribe('CustomPrivacyOptionController/cancel', function(m, n) {
            if (this.$PrivacySelector3 !== n.selector) return;
            this.$PrivacySelector4 && this.$PrivacySelector4();
        }.bind(this)));
    };
    l.prototype.$PrivacySelector9 = function(m) {
        'use strict';
        if (m != this.$PrivacySelector3) return false;
        this.$PrivacySelector6.release();
        this.$PrivacySelector6 = new(c('SubscriptionsHandler'))();
        return true;
    };
    f.exports = l;
}), null);
__d('ComposerX', ['csx', 'cx', 'ActorURI', 'Arbiter', 'ComposerXAttachmentBootstrap', 'ComposerXContext', 'ComposerXMarauderLogger', 'ComposerXSessionIDs', 'ComposerXSessionIDInserter', 'ComposerXStore', 'CSS', 'DOM', 'DOMQuery', 'PrivacyConst', 'PrivacySelector', 'PrivacySelectorNewDispatcher', 'URI', 'SubscriptionsHandler', 'arrayContains', 'getObjectValues', 'removeFromArray'], (function a(b, c, d, e, f, g, h, i) {
    if (c.__markCompiled) c.__markCompiled();
    var j = 'any';

    function k(l) {
        'use strict';
        this._root = l;
        this._composerID = l.id;
        this._attachments = {};
        this._context = new(c('ComposerXContext'))({});
        c('ComposerXSessionIDs').resetSessionID(this._composerID);
        c('ComposerXSessionIDInserter').init(this._root);
        this._subscriptionsHandler = new(c('SubscriptionsHandler'))();
        this._subscriptionsHandler.addSubscriptions(c('Arbiter').subscribe(['composer/publish', 'composer/close'], function(m, n) {
            if (n.composer_id === this._composerID) {
                this.reset();
                var o = c('DOMQuery').scry(l, '.hidden_target_specs');
                if (o && o.length) o.forEach(c('DOM').remove);
                c('Arbiter').inform('composer/publishDone', n);
            }
        }.bind(this)));
        this._subscriptionsHandler.addSubscriptions.apply(this._subscriptionsHandler, c('ComposerXMarauderLogger').listenForPostEvents(this._composerID, this._getContent()));
        this._attachmentFetchForm = c('DOMQuery').find(l, "._2_4");
        c('Arbiter').inform('composer/ready', {}, c('Arbiter').BEHAVIOR_STATE);
    }
    k.prototype.getAttachment = function(l, m, n, o) {
        'use strict';
        l = this._augmentURI(l);
        var p = c('ComposerXAttachmentBootstrap').getURIHash(l);
        this._endpointHashToShow = p;
        var q = this._attachments[p];
        if (q && !o) {
            this._showAttachmentAfterComponentsLoaded(p, n);
        } else this.fetchAttachmentData(l, m, o);
    };
    k.prototype.fetchAttachmentData = function(l, m, n) {
        'use strict';
        l = this._augmentURI(l);
        var o = c('ComposerXAttachmentBootstrap').getURIHash(l);
        if (this._attachments[o] && !n) return;
        if (!c('arrayContains')(this._currentFetchEndpoints, o)) {
            c('ComposerXAttachmentBootstrap').load(this._attachmentFetchForm, l, m);
            this._currentFetchEndpoints.push(o);
        }
    };
    k.prototype.setAttachment = function(l, m, n, o) {
        'use strict';
        c('removeFromArray')(this._currentFetchEndpoints, l);
        this._setupAttachment(l, m, n, o);
        this._showAttachmentAfterComponentsLoaded(l, false);
    };
    k.prototype.setInitialAttachment = function(l, m, n, o, p) {
        'use strict';
        if (p) this._context = p;
        l = this._augmentURI(l);
        var q = c('ComposerXAttachmentBootstrap').getURIHash(l);
        this._setupAttachment(q, m, n, o);
        this._initialAttachmentEndpoint = l;
        if (!this._currentInstance) this._showAttachmentAfterComponentsLoaded(q, true);
    };
    k.prototype.setComponent = function(l, m) {
        'use strict';
        if (!c('ComposerXStore').get(this._composerID, l)) {
            c('ComposerXStore').set(this._composerID, l, m);
            c('DOM').appendContent(this._attachmentFetchForm, c('DOM').create('input', {
                type: 'hidden',
                name: 'loaded_components[]',
                value: l
            }));
        }
    };
    k.prototype.reset = function() {
        'use strict';
        if (this._currentInstance) {
            this._currentInstance.cleanup();
            this._currentInstance = null;
        }
        c('ComposerXSessionIDs').resetSessionID(this._composerID);
        for (var l in this._attachments) this._attachments[l].instance.reset();
        var m = c('ComposerXStore').getAllForComposer(this._composerID);
        c('getObjectValues')(m).forEach(function(q) {
            if (q.reset) q.reset(q);
        });
        var n = c('PrivacySelector').getAdamaSelectorInstance(c('DOM').scry(this._root, "div._1lo2")[0]),
            o = c('ComposerXStore').get(this._composerID, 'mainprivacywidget'),
            p = o && o.instance && o.instance.getInstance();
        if (n) {
            p.setInstance(n);
        } else n = p && p.getInstance();
        if (n && n.shouldReplaceOnPost()) c('PrivacySelectorNewDispatcher').handleUpdateFromSelector({
            selector_type: c('PrivacyConst').PrivacyField.CURRENT_COMPOSER.toString(),
            post_param: '',
            unique_id: '_reloadStickySelectors',
            reload: true
        });
        this.getAttachment(this._initialAttachmentEndpoint, false, true);
        c('Arbiter').inform('composer/reset');
    };
    k.prototype.destroy = function() {
        'use strict';
        this._subscriptionsHandler.release();
    };
    k.prototype.addPlaceholders = function(l, m) {
        'use strict';
        var n;
        for (var o in this._attachments) {
            n = this._attachments[o];
            if (n.instance === l) {
                m.forEach(function(p) {
                    n.placeholders.push(p);
                    n.required_components.push(p.component_name);
                });
                break;
            }
        }
        if (this._currentInstance === l) this._fillPlaceholders(m);
    };
    k.prototype.hasAttachmentWithClassName = function(l) {
        'use strict';
        return c('DOMQuery').scry(this._root, '.' + l).length > 0;
    };
    k.prototype.showAttachmentThrobber = function() {
        'use strict';
        c('CSS').addClass(this._attachmentFetchForm, 'async_saving');
    };
    k.prototype.hideAttachmentThrobber = function() {
        'use strict';
        c('CSS').removeClass(this._attachmentFetchForm, 'async_saving');
    };
    k.prototype.getContext = function() {
        'use strict';
        return this._context;
    };
    k.prototype.getID = function() {
        'use strict';
        return this._composerID;
    };
    k.prototype._setupAttachment = function(l, m, n, o) {
        'use strict';
        m.setComposerID(this._composerID);
        this._attachments[l] = {
            instance: m,
            placeholders: n,
            required_components: o
        };
        var p = this._getContent(),
            q = m.getRoot();
        if (q.parentNode !== p) {
            c('CSS').hide(q);
            c('DOM').appendContent(p, q);
        }
    };
    k.prototype._getContent = function() {
        'use strict';
        return c('DOMQuery').find(this._root, "div._55d0");
    };
    k.prototype._showAttachment = function(l, m, n, o) {
        'use strict';
        if (this._currentInstance === l) return;
        if (this._endpointHashToShow === j) {
            this._endpointHashToShow = null;
        } else if (this._endpointHashToShow !== m) return;
        if (this._currentInstance) {
            if (!this._currentInstance.canSwitchAway()) return;
            this._currentInstance.cleanup();
        }
        this._currentInstance = l;
        var p = this._getContent().childNodes,
            q = l.getRoot();
        for (var r = 0; r < p.length; r++)
            if (p[r] !== q) c('CSS').hide(p[r]);
        c('CSS').show(q);
        this._fillPlaceholders(n);
        l.initWithComponents(o);
        this._setAttachmentSelectedClass(l.attachmentClassName);
        c('Arbiter').inform('composer/initializedAttachment', {
            composerRoot: this._root,
            isInitial: o
        });
    };
    k.prototype._showAttachmentAfterComponentsLoaded = function(l, m) {
        'use strict';
        var n = this._attachments[l];
        c('ComposerXStore').waitForComponents(this._composerID, n.required_components, this._showAttachment.bind(this, n.instance, l, n.placeholders, m));
    };
    k.prototype._fillPlaceholders = function(l) {
        'use strict';
        l.forEach(function(m) {
            var n = c('ComposerXStore').get(this._composerID, m.component_name);
            if (n.element && m.element !== n.element.parentNode) c('DOM').setContent(m.element, n.element);
        }.bind(this));
    };
    k.prototype._setAttachmentSelectedClass = function(l) {
        'use strict';
        var m = c('DOMQuery').scry(this._root, "._519b")[0],
            n;
        if (m) {
            c('CSS').removeClass(m, "_519b");
            n = c('DOMQuery').scry(m, '*[aria-pressed="true"]')[0];
            if (n) n.setAttribute('aria-pressed', 'false');
        }
        if (l) {
            var o = c('DOMQuery').scry(this._root, '.' + l)[0];
            if (o) {
                c('CSS').addClass(o, "_519b");
                n = c('DOMQuery').scry(o, '*[aria-pressed="false"]')[0];
                if (n) n.setAttribute('aria-pressed', 'true');
            }
        }
    };
    k.prototype._augmentURI = function(l) {
        'use strict';
        var m = this._context.getProperty(c('ComposerXContext').PROPERTIES.ACTOR_ID),
            n = m ? c('ActorURI').create(l, m) : new(c('URI'))(l),
            o = this._context.getProperty(c('ComposerXContext').PROPERTIES.POST_ID);
        if (o) n.addQueryData('post_id', o);
        return n.toString();
    };
    Object.assign(k.prototype, {
        _endpointHashToShow: j,
        _currentFetchEndpoints: [],
        _initialAttachmentEndpoint: ''
    });
    f.exports = k;
}), null);
__d('registerForLeaveWarning', ['fbt', 'Run', 'URI', 'createCancelableFunction'], (function a(b, c, d, e, f, g, h) {
    if (c.__markCompiled) c.__markCompiled();

    function i(k) {
        var l = c('URI').getNextURI(),
            m = c('createCancelableFunction')(k);
        c('Run').onBeforeUnload(function() {
            return j(m, l);
        });
        return m;
    }

    function j(k, l) {
        var m = c('URI').getMostRecentURI(),
            n = c('URI').getNextURI(),
            o = m.getQueryData().hasOwnProperty('theater') && l.path === n.path,
            p = n.getQueryData().hasOwnProperty('theater'),
            q = b.DialogNavigationStack && b.DialogNavigationStack.isActiveURI(n);
        if (o || p || q) {
            c('Run').onAfterLoad(function() {
                c('Run').onBeforeUnload(function() {
                    return j(k, l);
                });
            });
            return;
        }
        if (b.Dialog && b.Dialog.getCurrent()) return;
        if (k()) return h._("You haven't finished your post yet. Do you want to leave without finishing?");
    }
    f.exports = i;
}), null);
__d('ComposerXController', ['csx', 'cx', 'invariant', 'ActorURI', 'Arbiter', 'ComposerX', 'ComposerXAttachmentBootstrap', 'ComposerXContext', 'ComposerXMarauderLogger', 'Event', 'Parent', '$', 'emptyFunction', 'ge', 'registerForLeaveWarning'], (function a(b, c, d, e, f, g, h, i, j) {
    if (c.__markCompiled) c.__markCompiled();
    var k = {},
        l = {},
        m = {};

    function n(r) {
        var s = c('ge')(r);
        if (!s) return null;
        var t = c('Parent').bySelector(c('$')(r), "._119"),
            u = t.id;
        if (!m[u]) m[u] = new(c('ComposerX'))(t);
        return m[u];
    }

    function o(r) {
        var s = n(r);
        !(s !== null) ? j(0): void 0;
        return s;
    }

    function p(r) {
        if (!l[r]) return;
        l[r].forEach(function(s) {
            return s.cancel();
        });
        delete l[r];
    }
    var q = {
        registerConditionForComposerCancel: function r(s, t) {
            var u = o(s).getID();
            if (!(u in k)) k[u] = [];
            k[u].push(t);
            if (!(u in l)) l[u] = [];
            l[u].push(c('registerForLeaveWarning')(t));
        },
        hasChanges: function r(s) {
            var t = k[s];
            if (!t) return false;
            return t.some(function(u) {
                return u();
            });
        },
        getAttachment: function r(s, t, u, v) {
            var w = o(s);
            w.getAttachment(t, u, null, v);
        },
        fetchAttachmentData: function r(s, t, u) {
            o(s).fetchAttachmentData(t, u);
        },
        setAttachment: function r(s, t, u, v, w) {
            var x = n(s);
            if (x) x.setAttachment(t, u, v, w);
        },
        setInitialAttachment: function r(s, t, u, v, w, x) {
            var y = o(s);
            y.setInitialAttachment(t, u, v, w, x);
        },
        setComponent: function r(s, t, u) {
            var v = n(s);
            if (v) v.setComponent(t, u);
        },
        reset: function r(s) {
            var t = o(s);
            t.reset();
        },
        holdTheMarkup: c('emptyFunction'),
        getEndpoint: function r(s, t, u) {
            var v = o(s),
                w = v.getContext();
            t = c('ActorURI').create(t, w.getProperty(c('ComposerXContext').PROPERTIES.ACTOR_ID)).toString();
            c('ComposerXAttachmentBootstrap').load(v._attachmentFetchForm, t, u);
        },
        addPlaceholders: function r(s, t, u) {
            var v = o(s);
            v.addPlaceholders(t, u);
        },
        hasAttachmentWithClassName: function r(s, t) {
            var u = o(s);
            return u.hasAttachmentWithClassName(t);
        },
        showAttachmentThrobber: function r(s) {
            var t = o(s);
            t.showAttachmentThrobber();
        },
        hideAttachmentThrobber: function r(s) {
            var t = o(s);
            t.hideAttachmentThrobber();
        },
        logEventForElement: function r(s, t) {
            c('Event').listen(s, 'click', function() {
                var u = q.getComposerID(s);
                c('ComposerXMarauderLogger').logEvent(t, u);
            });
        },
        getComposerID: function r(s) {
            return o(s).getID();
        },
        destroyComposer: function r(s) {
            if (!(s in m)) return;
            m[s].destroy();
            delete m[s];
            delete k[s];
            p(s);
        }
    };
    c('ComposerXAttachmentBootstrap').bootstrap = function(r) {
        q.getAttachment(r, r.getAttribute('data-endpoint'));
    };
    c('Arbiter').subscribe('page_transition', function() {
        for (var r in m)
            if (!c('ge')(r)) q.destroyComposer(r);
    });
    f.exports = q;
}), null);
__d("isAnimatedGif", ["Promise"], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = 1e+06;

    function i(m) {
        return m[0] === 71 && m[1] === 73 && m[2] === 70;
    }

    function j(m, n) {
        return m[n] === 0 && m[n + 1] === 33 && m[n + 2] === 249 && m[n + 3] === 4 && m[n + 8] === 0 && (m[n + 9] === 44 || m[n + 9] === 33);
    }

    function k(m) {
        if (!i(m)) return false;
        var n = 0;
        for (var o = 0; o + 9 < m.length; ++o) {
            if (j(m, o)) n++;
            if (n > 1) return true;
        }
        return false;
    }

    function l(m) {
        return new(c("Promise"))(function(n) {
            var o = new FileReader();
            o.onloadend = function(r) {
                if (r.target.readyState == FileReader.DONE) {
                    var s = new Uint8Array(r.target.result);
                    if (k(s)) {
                        n(true);
                    } else n(false);
                }
            };
            o.onerror = function(r) {
                n(false);
            };
            var p = Math.min(h, m.size),
                q = m.slice(0, p);
            o.readAsArrayBuffer(q);
        });
    }
    f.exports = l;
}), null);
__d('ComposerXMediaUploadHandler', ['fbt', 'Arbiter', 'AsyncRequest', 'ComposerXAjaxEndpoint', 'ComposerXController', 'CSS', 'Dialog', 'ImageExtensions', 'QE', 'ReloadPage', 'SubscriptionsHandler', 'URI', 'VideoUploadConfig', 'VideoUploadFile', 'isAnimatedGif'], (function a(b, c, d, e, f, g, h) {
    if (c.__markCompiled) c.__markCompiled();
    var i = c('ComposerXAjaxEndpoint').MEDIA_UPLOAD,
        j = '/ajax/composerx/attachment/video/upload/',
        k = 0;

    function l(m, n) {
        'use strict';
        this.$ComposerXMediaUploadHandler1 = m;
        this.$ComposerXMediaUploadHandler2 = n;
    }
    l.prototype.fetchAttachments = function() {
        'use strict';
        [this.getPhotoUploadAttachmentEndpoint(), j].forEach(function(m) {
            c('ComposerXController').fetchAttachmentData(this.$ComposerXMediaUploadHandler1, m);
        }.bind(this));
    };
    l.prototype.handleFileSelected = function(m) {
        'use strict';
        var n = this;
        l.isVideoOrAnimatedGifAsync(m, function(o) {
            if (o) {
                n.handleVideoSelected(m);
            } else n.handlePhotoSelected(m);
        });
    };
    l.canUploadAnimatedGIF = function() {
        'use strict';
        return c('ImageExtensions').GIF in c('VideoUploadConfig').videoExtensions;
    };
    l.isVideoOrAnimatedGifAsync = function(m, n) {
        'use strict';
        var o = c('VideoUploadFile').getExtensionFromFileInput(m.getInput());
        if (l.canUploadAnimatedGIF() && o === c('ImageExtensions').GIF) {
            c('isAnimatedGif')(m.getInput().files[0]).then(n);
        } else if (c('VideoUploadConfig').videoExtensions[o]) {
            n(true);
        } else n(false);
    };
    l.prototype.handleVideoSelected = function(m) {
        'use strict';
        if (this.$ComposerXMediaUploadHandler2 && this.$ComposerXMediaUploadHandler2.imagesOnly) {
            var n = new(c('Dialog'))().setModal(true).setButtons([c('Dialog').OK]);
            if (this.$ComposerXMediaUploadHandler2.isEditComposer) {
                n.setTitle(h._("Can't add video")).setBody(h._("Sorry, you can't add a video to a post you're editing."));
            } else n.setTitle(h._("Invalid Image File")).setBody(h._("Please upload a valid image file."));
            n.show();
            return;
        }
        c('ComposerXController').getAttachment(this.$ComposerXMediaUploadHandler1, j);
        c('Arbiter').inform('ComposerXFilesStore/filesAdded/' + this.$ComposerXMediaUploadHandler1 + '/videoupload', {
            fileInput: m
        }, c('Arbiter').BEHAVIOR_PERSISTENT);
    };
    l.prototype.handlePhotoSelected = function(m) {
        'use strict';
        c('ComposerXController').getAttachment(this.$ComposerXMediaUploadHandler1, this.getPhotoUploadAttachmentEndpoint());
        l.$ComposerXMediaUploadHandler3(this.$ComposerXMediaUploadHandler1, m);
    };
    l.isVideoFile = function(m) {
        'use strict';
        var n = c('VideoUploadFile').getExtensionFromFileInput(m.getInput());
        return !!c('VideoUploadConfig').videoExtensions[n];
    };
    l.prototype.$ComposerXMediaUploadHandler4 = function() {
        'use strict';
        return this.$ComposerXMediaUploadHandler2 ? this.$ComposerXMediaUploadHandler2.photoUploadOverrideEndpoint : null;
    };
    l.prototype.getPhotoUploadAttachmentEndpoint = function() {
        'use strict';
        var m = this.$ComposerXMediaUploadHandler4();
        return m ? m : i;
    };
    l.$ComposerXMediaUploadHandler3 = function(m, n) {
        'use strict';
        c('Arbiter').inform('ComposerXFilesStore/filesAdded/' + m + '/mediaupload', {
            fileInput: n,
            receivedBySubscriber: false
        }, c('Arbiter').BEHAVIOR_PERSISTENT);
    };
    l.setupFileUploadToComposerDialog = function(m, n, o, p) {
        'use strict';
        var q = 'composerxmediauploadhandler' + k++,
            r = function u(v) {
                c('CSS').conditionClass(m.getControl(), o, v);
                m.getInput().disabled = v;
            },
            s = new(c('URI'))(n),
            t = s.getQueryData();
        t.client_ref = q;
        s.setQueryData(t);
        n = s.toString();
        m.subscribe('change', function() {
            new(c('AsyncRequest'))().setURI(n).setErrorHandler(function() {
                m.clear();
                r(false);
            }).send();
            r(true);
        });
        c('Arbiter').subscribe('composer/dialog/' + q + '/new', function(u, v) {
            this.$ComposerXMediaUploadHandler3(v.composerID, m);
            var w = new(c('SubscriptionsHandler'))();
            w.addSubscriptions(c('Arbiter').subscribe('composer/publish', function(event, x) {
                if (p && v.composerID === x.composer_id) c('ReloadPage').now();
            }), v.dialog.subscribe('hide', function() {
                w.release();
                m.clear();
                r(false);
            }));
        }.bind(this));
    };
    f.exports = l;
}), null);
__d('legacy:AudienceSelector', ['AudienceSelector'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    c('AudienceSelector');
}), 3);
__d('ProgressBarBase', ['emptyFunction', 'requestAnimationFrame', 'removeFromArray', 'arrayContains'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = [];

    function i(j, k) {
        'use strict';
        this._min = j || 0;
        this._max = k || 100;
        this._initialPosition = 0;
        this._position = 0;
        this._initialVelocity = 0;
        this._velocity = 0;
        this._acceleration = 0;
        this.useAcceleration = true;
        this._targetPosition = 0;
        this._targetTime = 0;
        this._startTime = null;
        this._onComplete = c('emptyFunction');
    }
    i.prototype.setPosition = function(j) {
        'use strict';
        j = this._normalizePosition(j);
        this._initialPosition = j;
        this._position = j;
        this.updateMeter(this._position);
        this.stop();
        return this;
    };
    i.prototype.setCompleteHandler = function(j) {
        'use strict';
        this._onComplete = j || c('emptyFunction');
        return this;
    };
    i.prototype.setTarget = function(j, k) {
        'use strict';
        this._stopAnimating();
        this._clearOnCompleteTimeout();
        this._targetPosition = j;
        var l = this._normalizePosition(j);
        this._targetTime = k;
        this._initialVelocity = this._velocity;
        this._initialPosition = this._position;
        if (this.useAcceleration) {
            this._acceleration = 2 * (l - this._initialPosition - this._initialVelocity * k) / (k * k);
        } else {
            this._acceleration = 0;
            this._velocity = this._initialVelocity = (l - this._initialPosition) / k;
        }
        if (this._position >= l) {
            this._onComplete();
        } else this._start();
        return this;
    };
    i.prototype.setNoAcceleration = function(j) {
        'use strict';
        this.useAcceleration = !j;
        return this;
    };
    i.prototype._clearOnCompleteTimeout = function() {
        'use strict';
        b.clearTimeout(this._onCompleteTimeout);
    };
    i.prototype.stop = function() {
        'use strict';
        this._clearOnCompleteTimeout();
        this._velocity = 0;
        this._initialVelocity = 0;
        this._acceleration = 0;
        this._stopAnimating();
        return this;
    };
    i.prototype._start = function() {
        'use strict';
        this._startTime = Date.now();
        this._onCompleteTimeout = b.setTimeout(function() {
            this.setPosition(this._targetPosition);
            this._onComplete();
        }.bind(this), this._targetTime);
        this._startAnimating();
        return this;
    };
    i.prototype._loop = function() {
        'use strict';
        var j = Date.now() - this._startTime;
        this._position = .5 * this._acceleration * j * j + this._initialVelocity * j + this._initialPosition;
        var k = this._velocity;
        this._velocity = this._acceleration * j + this._initialVelocity;
        var l = k < 0 !== this._velocity < 0;
        if (this._position > this._normalizePosition(this._targetPosition) || l) {
            this.setPosition(this._targetPosition);
            this._onComplete();
        } else this.updateMeter(this._position);
    };
    i.prototype.updateMeter = function(j) {
        'use strict';
        throw "Unimplemented function: updateMeter";
    };
    i.prototype._normalizePosition = function(j) {
        'use strict';
        return Math.min(Math.max((j - this._min) / (this._max - this._min), 0), 1);
    };
    i.prototype._startAnimating = function() {
        'use strict';
        if (!c('arrayContains')(h, this)) {
            h.push(this);
            if (h.length === 1) c('requestAnimationFrame')(i.prototype._requestAnimationFrameCallback);
        }
    };
    i.prototype._stopAnimating = function() {
        'use strict';
        c('removeFromArray')(h, this);
    };
    i.prototype._requestAnimationFrameCallback = function() {
        'use strict';
        h.forEach(function(j) {
            j._loop();
        });
        if (h.length) c('requestAnimationFrame')(i.prototype._requestAnimationFrameCallback);
    };
    i.setPosition = function(j, k) {
        'use strict';
        j.setPosition(k);
    };
    i.setTarget = function(j, k, l) {
        'use strict';
        j.setTarget(k, l);
    };
    f.exports = i;
}), null);
__d('ProgressBar', ['cx', 'csx', 'ProgressBarBase', 'CSS', 'Style', 'DOM'], (function a(b, c, d, e, f, g, h, i) {
    var j, k;
    if (c.__markCompiled) c.__markCompiled();
    j = babelHelpers.inherits(l, c('ProgressBarBase'));
    k = j && j.prototype;

    function l(m, n, o) {
        'use strict';
        k.constructor.call(this, n, o);
        this._root = m;
        this._meter = c('DOM').find(m, "div._5e4k");
        this._meter2 = c('DOM').scry(m, "div._5e2g")[0];
    }
    l.prototype.getRoot = function() {
        'use strict';
        return this._root;
    };
    l.prototype.updateMeter = function(m) {
        'use strict';
        var n = Math.min(Math.max(m, 0), 1);
        c('CSS').conditionClass(this._meter, "_5e2d", n <= 0);
        c('CSS').conditionClass(this._meter, "_5e4j", n >= 1);
        n = n * 100 + '%';
        c('Style').set(this._meter, 'width', n);
        if (this._meter2) {
            c('Style').set(this._meter2, 'left', n);
            c('Style').set(this._meter2, 'width', n);
        }
    };
    l.prototype.changeLabel = function(m) {
        'use strict';
        var n = c('DOM').scry(this._root, "span._5e2h");
        n.forEach(function(o) {
            c('DOM').setContent(o, m);
        });
        return this;
    };
    f.exports = l;
}), null);