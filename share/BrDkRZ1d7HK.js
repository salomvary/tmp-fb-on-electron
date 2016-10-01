if (self.CavalryLogger) {
    CavalryLogger.start_js(["kOUJK"]);
}

__d("OGComposerConstants", [], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = {
        EditAttachmentURI: "\/ajax\/composerx\/attachment\/edit\/",
        ExercisesTypeID: 718343998201893,
        TransitivityStateIntransitive: 2
    };
}), null);
__d("PlaceTagType", [], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = {
        CITY: "city",
        STATE_PROVINCE: "state_province",
        COUNTRY: "country",
        PLACE: "place",
        EVENT: "event",
        RESIDENCE: "residence",
        TEXT: "text"
    };
}), null);
__d('ComposerXTokenizer', ['CSS', 'CurrentUser', 'DOM', 'DOMQuery', 'Token', 'Tokenizer'], (function a(b, c, d, e, f, g) {
    var h, i;
    if (c.__markCompiled) c.__markCompiled();
    h = babelHelpers.inherits(j, c('Tokenizer'));
    i = h && h.prototype;

    function j(k, l, m) {
        'use strict';
        i.constructor.call(this, k, l, m);
        this._loadingIndicatorText = '';
    }
    j.prototype.createDecorativeToken = function(k, l) {
        'use strict';
        var m = new(c('Token'))(k, this.paramName),
            n = m.createElement(false, l);
        m.setElement(n);
        if (c('CurrentUser').getID() == k.uid) c('DOMQuery').scry(n, 'input[type="hidden"]').forEach(c('DOM').remove);
        return m;
    };
    j.prototype.setLoadingIndicatorText = function(k) {
        'use strict';
        this._loadingIndicatorText = k;
    };
    j.prototype.addLoadingIndicator = function() {
        'use strict';
        if (this._loadingIndicator) return;
        this._loadingIndicator = this.createDecorativeToken({
            text: this._loadingIndicatorText
        }, 'loadingIndicator');
        c('DOM').appendContent(this.tokenarea, this._loadingIndicator.element);
        this.updateTokenarea();
    };
    j.prototype.removeToken = function(k) {
        'use strict';
        if (k === this._loadingIndicator) {
            this.removeLoadingIndicator();
            this.inform('removeLoadingIndicator');
        } else i.removeToken.call(this, k);
    };
    j.prototype.removeLoadingIndicator = function() {
        'use strict';
        if (!this._loadingIndicator) return;
        c('DOM').remove(this._loadingIndicator.element);
        this._loadingIndicator = null;
        this.updateTokenarea();
    };
    j.prototype.updateTokenareaVisibility = function() {
        'use strict';
        c('CSS').conditionShow(this.tokenarea, this.tokens.length !== 0 || this._loadingIndicator);
    };
    j.prototype.findToken = function(k) {
        'use strict';
        var l = this._tokenKey(k);
        if (l in this.unique) return this.unique[l];
        return null;
    };
    j.prototype.replaceToken = function(k) {
        'use strict';
        var l = this.findToken(k.getInfo());
        if (l) {
            var m = l.getElement();
            l.setElement(k.getElement());
            c('DOM').replace(m, k.getElement());
            return true;
        } else {
            this.addToken(k);
            return false;
        }
    };
    f.exports = j;
}), null);
__d('PlacesCitySharerX', ['csx', 'cx', 'fbt', 'Arbiter', 'ArbiterMixin', 'AsyncRequest', 'CSS', 'DOM', 'Event', 'Parent', 'QE', 'mixin'], (function a(b, c, d, e, f, g, h, i, j) {
    var k, l;
    if (c.__markCompiled) c.__markCompiled();
    var m = {};
    k = babelHelpers.inherits(n, c('mixin')(c('ArbiterMixin')));
    l = k && k.prototype;

    function n(o, p, q, r, s, t, u, v, w, x, y, z, aa, ba) {
        'use strict';
        l.constructor.call(this);
        this._root = o;
        this.setShareSetting(x);
        this.init(p, q, r, s, t, y, aa);
        if (v) this.setDefaultCity(u, v, w);
        if (this._shareDefaultCity) this.useDefaultCity();
        if (z) this.toggleSelect();
    }
    n.prototype.init = function(o, p, q, r, s, t, u) {
        'use strict';
        this._cityLink = o;
        this._closeButton = p;
        this._input = q;
        this._disableShareInput = r;
        this._options = s;
        this._targetId = t || 0;
        this._cityName = c('DOM').find(this._cityLink, "._y8");
        this._data = {};
        this._resetTempInfo();
        c('Event').listen(this._closeButton, 'click', function() {
            this._resetTempInfo();
            this._defaultCityData = {};
            this.clearCity();
            this._disableShareInput.value = 'true';
        }.bind(this));
        m[this._root] = this;
        this.inform('init', null, c('Arbiter').BEHAVIOR_PERSISTENT);
        this._implicitLocationConfig = u;
    };
    n.prototype.toggleSelect = function() {
        'use strict';
        this._placeSelected = true;
        c('CSS').addClass(this._cityLink, "_1dsf");
        c('CSS').addClass(this._root, "_1fa");
        c('CSS').hide(this._closeButton);
    };
    n.prototype.addPlace = function(o) {
        'use strict';
        this.toggleSelect();
        this._resetTempInfo();
    };
    n.prototype.changeCity = function(o, p, q) {
        'use strict';
        this.setCity(o, p, q);
        this.toggleLocationSharing(o, p, q, false);
    };
    n.prototype.clearCity = function() {
        'use strict';
        this._data = {};
        this._input.value = '';
        c('DOM').empty(this._cityName);
        var o = j._("Check in");
        this._cityLink.setAttribute('data-tooltip-content', o);
        c('CSS').removeClass(this._root, "_y7");
        c('CSS').hide(this._closeButton);
        c('CSS').removeClass(this._cityLink, "_1dsf");
        c('CSS').removeClass(this._root, "_1fa");
        this.inform('change', null, c('Arbiter').BEHAVIOR_PERSISTENT);
    };
    n.prototype.clearPlace = function() {
        'use strict';
        this._placeSelected = false;
        c('CSS').removeClass(this._cityLink, "_1dsf");
        c('CSS').removeClass(this._root, "_1fa");
        c('CSS').conditionShow(this._closeButton, this.getValue());
        if (typeof this._implicitLocationConfig === 'boolean') {
            if (this._implicitLocationConfig) {
                this.clearCity();
            } else this.setDefaultCity(this._data.city_name, this._data.city_page_id, this._data.city_id);
        } else if (this._implicitLocationConfig.enable_implicit_location) {
            this.setDefaultCity(this._data.city_name, this._data.city_page_id, this._data.city_id);
        } else this.clearCity();
    };
    n.prototype.getIcon = function() {
        'use strict';
        return this._root;
    };
    n.prototype.getValue = function() {
        'use strict';
        return this._input.value;
    };
    n.prototype.restoreCityInfo = function() {
        'use strict';
        if (this._placeSelected || this._shareDefaultCity) {
            this.changeCity(this._tempCityName, this._tempCityPid, this._tempCityId);
            this._resetTempInfo();
        }
    };
    n.prototype.saveCityInfo = function() {
        'use strict';
        if (this._defaultCityData) {
            this._tempCityName = this._defaultCityData.city_name;
            this._tempCityPid = this._defaultCityData.city_page_id;
            this._tempCityId = this._defaultCityData.city_id;
        }
    };
    n.prototype.setCity = function(o, p, q) {
        'use strict';
        if (p) {
            this.setCityData(o, p, q);
            this._input.value = p;
            this.inform('change', this._data, c('Arbiter').BEHAVIOR_PERSISTENT);
        }
    };
    n.prototype.setCityData = function(o, p, q) {
        'use strict';
        if (p) {
            this._data = {
                city_name: o,
                city_page_id: p,
                city_id: q
            };
            var r = o.lastIndexOf(',');
            if (r != -1) o = o.substring(0, r);
            var s;
            if (o) {
                s = j._("Currently in {city-name}. Check in", [j.param('city-name', o)]);
            } else s = j._("Check in");
            c('DOM').setContent(this._cityName, o);
            this._cityLink.setAttribute('aria-label', s);
            c('CSS').addClass(this._root, "_y7");
            c('CSS').conditionShow(this._closeButton, !this._placeSelected);
        }
    };
    n.prototype.setDefaultCity = function(o, p, q) {
        'use strict';
        this._defaultCityData = {
            city_id: q,
            city_page_id: p,
            city_name: o
        };
    };
    n.prototype.setSessionID = function(o) {
        'use strict';
        this._options.session_id = o;
    };
    n.prototype.setShareSetting = function(o) {
        'use strict';
        this._shareDefaultCity = o;
    };
    n.prototype.toggleLocationSharing = function(o, p, q, r) {
        'use strict';
        if (p) new(c('AsyncRequest'))().setURI('/ajax/places/toggle_location_sharing').setData({
            city_id: q,
            city_page_id: p,
            city_name: o,
            is_default: r,
            session_id: this._options.session_id
        }).send();
    };
    n.prototype.useDefaultCity = function() {
        'use strict';
        if (this._defaultCityData) {
            this.setCity(this._defaultCityData.city_name, this._defaultCityData.city_page_id, this._defaultCityData.city_id);
            c('CSS').show(this._closeButton);
            this.toggleLocationSharing(this._defaultCityData.city_name, this._defaultCityData.city_page_id, this._defaultCityData.city_id, true);
        }
    };
    n.prototype._resetTempInfo = function() {
        'use strict';
        this._tempCityName = null;
        this._tempCityPid = null;
        this._tempCityId = null;
    };
    n.getInstance = function(o) {
        'use strict';
        var p = c('Parent').byClass(o, 'ComposerCitySharer');
        return p && m[p];
    };
    n.prototype.getTargetID = function() {
        'use strict';
        return this._targetId;
    };
    f.exports = n;
}), null);
__d('ComposerXImplicitLocation', [], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(i, j, k, l) {
        'use strict';
        this._citySharer = i;
        this._placeTagger = j;
        this._hiddenInput = k;
        this._subscriptions = [];
        this._subscribeChangeCity();
        this._subscribeSelect();
        this._subscribeUnselect();
    }
    h.prototype.cleanup = function() {
        'use strict';
        while (this._subscriptions.length) this._subscriptions.pop().unsubscribe();
    };
    h.prototype.disable = function() {
        'use strict';
        if (!this._placeTagger.getCore().getValue()) {
            this._disableImplicit = true;
            this._citySharer.saveCityInfo();
            this._citySharer.clearCity();
        }
        this._placeTagger.getData().setBootstrapEndpoint('/ajax/places/typeahead');
    };
    h.prototype.enable = function() {
        'use strict';
        if (!this._placeTagger.getCore().getValue()) {
            this._citySharer.restoreCityInfo();
            this._disableImplicit = false;
        }
        this._placeTagger.getData().resetBootstrapEndpoint();
    };
    h.prototype.selectPlace = function(i) {
        'use strict';
        if (i.place_type == 'city') {
            this._citySharer.changeCity(i.text, i.uid, i.city_id);
            this._placeTagger.getCore().setCity(i.city_id, true);
        }
        if (i.city_id) {
            if (!this._disableImplicit) {
                this._citySharer.changeCity(i.city_name, i.city_page_id, i.city_id);
            } else this._citySharer.setCityData(i.city_name, i.city_page_id, i.city_id);
        } else this._citySharer.clearCity();
        this._citySharer.addPlace(i);
    };
    h.prototype.unselectPlace = function() {
        'use strict';
        this._hiddenInput.value = this._citySharer.getValue();
        this._citySharer.clearPlace();
        if (this._disableImplicit) this.disable();
    };
    h.prototype._subscribeChangeCity = function() {
        'use strict';
        this._subscriptions.push(this._citySharer.subscribe('change', function(i, j) {
            if (!this._placeTagger.getCore().getHiddenValue()) this._hiddenInput.value = this._citySharer.getValue();
            if (j && j.city_id) this._placeTagger.getCore().setCity(j.city_id, true);
        }.bind(this)));
    };
    h.prototype._subscribeSelect = function() {
        'use strict';
        this._subscriptions.push(this._placeTagger.subscribe('select', function(i, j) {
            this.selectPlace(j.selected);
        }.bind(this)));
    };
    h.prototype._subscribeUnselect = function() {
        'use strict';
        this._subscriptions.push(this._placeTagger.subscribe('unselect', this.unselectPlace.bind(this)));
    };
    f.exports = h;
}), null);
__d('PlaceUtils', ['PlaceTagType'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        placesClose: function i(j, k, l, m) {
            j = j || 0;
            k = k || 0;
            l = l || 0;
            m = m || 0;
            return Math.abs(j - l) < 1e-05 && Math.abs(k - m) < 1e-05;
        },
        isNonSpecificPlace: function i(j) {
            return (j == c('PlaceTagType').CITY || j == c('PlaceTagType').STATE_PROVINCE || j == c('PlaceTagType').COUNTRY);
        }
    };
    f.exports = h;
}), null);
__d('ComposerXStandardTagger', ['cx', 'Arbiter', 'ArbiterMixin', 'AsyncRequest', 'ComposerXImplicitLocation', 'CSS', 'CurrentUser', 'DOM', 'Event', 'Focus', 'Input', 'Keys', 'Parent', 'PlaceUtils', 'StickyPlaceholderInput', 'WeakToken', 'getOrCreateDOMID', 'isEmpty', 'mixin'], (function a(b, c, d, e, f, g, h) {
    var i, j;
    if (c.__markCompiled) c.__markCompiled();
    i = babelHelpers.inherits(k, c('mixin')(c('ArbiterMixin')));
    j = i && i.prototype;

    function k(l) {
        'use strict';
        j.constructor.call(this);
        this._listeners = [];
        this._subscriptions = [];
        this._onCleanup = [];
        this._config = l || {};
        this._taggers = {};
        this._taggerIcons = {};
        this._onTaggerShowCallbacks = {};
        this._onTaggerHideCallbacks = {};
        this._currentTagger = null;
        this._socialTextSelectors = {};
    }
    k.prototype.init = function(l) {
        'use strict';
        this._mentionsInput = l.getComponent('maininput');
        this._withTagger = l.getComponent('withtagger');
        this._withTaggerIcon = l.getComponent('withtaggericon');
        this._placeTagger = l.getComponent('placetagger');
        this._hiddenExplicitPlace = l.getComponent('explicitplaceinput');
        this._citySharerIcon = l.getComponent('citysharericon');
        this._hiddenPlaceInput = l.getComponent('hiddenplaceinput');
        this._placeNameInput = l.getComponent('placenameinput');
        this._sessionID = l.getComponent('hiddensessionid');
        this._editParams = l.getComponent('editparams');
        this._interestTagger = l.getComponent('interesttagger');
        this._interestTaggerIcon = l.getComponent('pagestargetingicon');
        if (this._hasMentionsInput()) {
            this._input = c('DOM').scry(this._mentionsInput.element, 'textarea.input')[0];
            c('Arbiter').subscribe('composer/ogCustomIconSelected', function() {
                c('Focus').set(this._input);
            }.bind(this));
        }
        this._withTagger && this.initAndRegisterWithTagger();
        this._placeTagger && this.initAndRegisterPlaceTagger();
        this._placeTagger && this.registerAutoEventSuggestion();
        this.initAndRegisterInterestTagger();
        if (this._hasMentionsInput()) this._listeners.push(c('Event').listen(this._mentionsInput.element, 'mousedown', this._onMentionsInputClicked.bind(this)));
    };
    k.prototype.registerAutoEventSuggestion = function() {
        'use strict';
        this._subscriptions.push(c('Arbiter').subscribe('Events/autoSuggestionConfirmed', function(l, m) {
            this._toggleTagger('place');
            c('Arbiter').inform('Events/autoSuggestionSelected', m);
            c('Focus').set(this._input);
        }.bind(this)));
    };
    k.prototype.initAndRegisterPlaceTagger = function() {
        'use strict';
        this.registerTagger('place', this._placeTagger, this._citySharerIcon);
        this.initTaggerInput('place', this._placeTagger.instance.getCore().getElement());
        this._initCitySharer();
        this._initPlaceTagger();
    };
    k.prototype.initAndRegisterWithTagger = function() {
        'use strict';
        this.registerTagger('with', this._withTagger, this._withTaggerIcon);
        this.initTaggerInput('with', this._withTagger.instance.getInput());
        this._initWithTagger();
        if (this.isEditComposer()) this._updateWithTaggerUI();
    };
    k.prototype.initAndRegisterInterestTagger = function() {
        'use strict';
        if (!this._interestTagger || !this._interestTaggerIcon) return;
        this.registerTagger('interest', this._interestTagger, this._interestTaggerIcon);
        this.initTaggerInput('interest', this._interestTagger.instance.getInput());
        this._subscriptions.push(this._interestTagger.instance.subscribe(['addToken', 'removeToken', 'init'], this._updateInterestTaggerUI.bind(this)));
    };
    k.prototype.cleanup = function() {
        'use strict';
        this.hideTaggers();
        this._listeners.forEach(function(l) {
            l.remove();
        });
        this._listeners = [];
        this._subscriptions.forEach(function(l) {
            l.unsubscribe();
        });
        this._subscriptions = [];
        this._onCleanup.forEach(function(l) {
            l();
        });
        this._onCleanup = [];
        if (this._citySharerIcon) this._implicitLocation.cleanup();
        this._brComposerUpsell = null;
    };
    k.prototype.reset = function() {
        'use strict';
        if (this._socialTextRequest) this._socialTextRequest.abort();
    };
    k.prototype.registerTagger = function(l, m, n) {
        'use strict';
        this._taggers[l] = m;
        if (this.hasIcons()) {
            this._taggerIcons[l] = n;
            this._listeners.push(c('Event').listen(this._taggerIcons[l].element, 'click', this._toggleTagger.bind(this, l)));
        }
    };
    k.prototype.hideTaggerIcons = function() {
        'use strict';
        for (var l in this._taggers) c('CSS').hide(this._taggerIcons[l].element);
    };
    k.prototype.showTaggerIcons = function() {
        'use strict';
        for (var l in this._taggers) c('CSS').show(this._taggerIcons[l].element);
    };
    k.prototype.initTaggerInput = function(l, m) {
        'use strict';
        var n = this._config.placeholders || {};
        if (n[l]) c('StickyPlaceholderInput').setPlaceholderText(m, n[l]);
        this._onTaggerShowCallbacks[l] = c('Focus').set.bind(null, m);
        this._listeners.push(c('Event').listen(m, 'keydown', function(o) {
            if (c('Event').getKeyCode(o) == c('Keys').RETURN && !c('Input').getValue(o.getTarget())) {
                this.hideTaggers();
                setTimeout(c('Focus').set.bind(null, this._input), 0);
            }
        }.bind(this)));
    };
    k.prototype.setTaggerCallback = function(l, m) {
        'use strict';
        this._onTaggerShowCallbacks[l] = m;
    };
    k.prototype.setTaggerHideCallback = function(l, m) {
        'use strict';
        this._onTaggerHideCallbacks[l] = m;
    };
    k.prototype._initCitySharer = function() {
        'use strict';
        this._implicitLocation = new(c('ComposerXImplicitLocation'))(this._citySharerIcon.instance, this._placeTagger.instance, this._hiddenPlaceInput.element);
        if (this._config.disableImplicitCity) {
            this._implicitLocation.disable();
        } else this._implicitLocation.enable();
    };
    k.prototype.switchTaggerInResponseToClick = function(event) {
        'use strict';
        var l = event.getTarget();
        if (c('Parent').byClass(l, 'withToken')) {
            this.switchToTagger('with');
        } else if (c('Parent').byClass(l, 'placeToken')) {
            this.switchToTagger('place');
        } else if (c('Parent').byClass(l, 'og_composer_object')) {
            this.switchToTagger('ogtagger');
        } else this._hideTaggersFromMentionsInputClick();
    };
    k.prototype._onMentionsInputClicked = function(event) {
        'use strict';
        this.switchTaggerInResponseToClick(event);
    };
    k.prototype._hideTaggersFromMentionsInputClick = function() {
        'use strict';
        this.hideTaggers();
    };
    k.prototype._initWithTagger = function() {
        'use strict';
        this._subscriptions.push(this._withTagger.instance.subscribe(['addToken', 'removeToken', 'init'], this._updateWithTaggerUI.bind(this)));
        this.refreshWithTaggerPlaceholder();
    };
    k.prototype.getWithTaggerPlaceholder = function() {
        'use strict';
        return this._config.placeholders ? this._config.placeholders['with'] : null;
    };
    k.prototype.getCitySharerIcon = function() {
        'use strict';
        return this._citySharerIcon;
    };
    k.prototype.refreshWithTaggerPlaceholder = function() {
        'use strict';
        var l = this.getWithTaggerPlaceholder();
        if (l) this._withTagger.instance.setPlaceholder(l);
    };
    k.prototype._initPlaceTagger = function() {
        'use strict';
        this._subscriptions.push(this._placeTagger.instance.subscribe('select', function(l, m) {
            this._hiddenPlaceInput.element.value = m.selected.uid;
            this._placeNameInput.element.value = m.selected.text;
            this._hiddenExplicitPlace.element.value = true;
            this._placeType = m.selected.place_type;
            this.updateTaggedText();
            this.hideTaggers();
            c('Focus').set(this._input);
        }.bind(this)));
        this._subscriptions.push(this._placeTagger.instance.subscribe('unselect', function(l, m) {
            this._hiddenExplicitPlace.element.value = false;
            this._placeNameInput.element.value = '';
            this._placeType = null;
            this.updateTaggedText();
        }.bind(this)));
    };
    k.prototype.addSubscription = function(l) {
        'use strict';
        this._subscriptions.push(l);
    };
    k.prototype.addListener = function(l) {
        'use strict';
        this._listeners.push(l);
    };
    k.prototype.hasIcons = function() {
        'use strict';
        return true;
    };
    k.prototype._showTagger = function(l) {
        'use strict';
        c('Arbiter').inform('showTagger');
        this._currentTagger = l;
        c('CSS').show(this._taggers[l].element);
        if (this.hasIcons()) c('CSS').addClass(this._taggerIcons[l].element, "_509o");
        if (l === 'with') new(c('AsyncRequest'))().setURI('/ajax/fof/user_education.php').setData({
            increment: 1
        }).send();
        if (this._onTaggerShowCallbacks[l]) this._onTaggerShowCallbacks[l]();
    };
    k.prototype._hideTagger = function(l) {
        'use strict';
        c('CSS').hide(this._taggers[l].element);
        if (this.hasIcons()) c('CSS').removeClass(this._taggerIcons[l].element, "_509o");
        if (this._onTaggerHideCallbacks[l]) this._onTaggerHideCallbacks[l]();
        if (this._currentTagger === l) this._currentTagger = null;
    };
    k.prototype.hideTaggers = function() {
        'use strict';
        for (var l in this._taggers) this._hideTagger(l);
        this._currentTagger = null;
        this.inform('hidetaggers');
    };
    k.prototype.isAnyTaggerShown = function() {
        'use strict';
        return !!this._currentTagger;
    };
    k.prototype.switchToTagger = function(l) {
        'use strict';
        this.hideTaggers();
        this._showTagger(l);
    };
    k.prototype._toggleTagger = function(l) {
        'use strict';
        if (c('CSS').shown(this._taggers[l].element)) {
            this.hideTaggers();
        } else this.switchToTagger(l);
    };
    k.prototype._getTaggedTextData = function() {
        'use strict';
        if (this._hasPlaceTagger()) var l = this._placeTagger.instance.getCore(),
            m = l.getHiddenValue(),
            n = m && l.getValue();
        var o = (this._withTagger && this._withTagger.instance.getTokens() || []).filter(function(p) {
            return p.info.uid != c('CurrentUser').getID();
        });
        if (!o.length && !n) return {};
        return {
            people: o.map(function(p) {
                return p.info.uid;
            }),
            weakReferences: o.filter(function(p, q, r) {
                return p instanceof c('WeakToken');
            }).map(function(p) {
                return p.info.uid;
            }),
            place: n,
            placeID: m,
            isNonSpecificPlace: c('PlaceUtils').isNonSpecificPlace(this._placeType)
        };
    };
    k.prototype.updateTaggedText = function() {
        'use strict';
        if (this._hasMentionsInput()) {
            var l = this._getTaggedTextData();
            if (this.getExtraTaggedTextData) l = Object.assign(l, this.getExtraTaggedTextData());
            ++this._requestID;
            if (c('isEmpty')(l)) {
                this._mentionsInput.instance.setAuxContent(null);
                c('Arbiter').inform('reflow');
                return;
            }
            l.requestID = this._requestID;
            l.sessionID = this._sessionID.element.value;
            this._socialTextRequest = new(c('AsyncRequest'))();
            this._socialTextRequest.setURI('/ajax/metacomposer/social_text.php').setData(l).setHandler(this._handleSocialText.bind(this)).send();
        }
    };
    k.prototype._updateWithTaggerUI = function() {
        'use strict';
        if (!this._withTagger || !this._withTaggerIcon) return;
        setTimeout(c('StickyPlaceholderInput').update.bind(null, this._withTagger.instance.getInput()), 0);
        c('CSS').conditionClass(this._withTaggerIcon.element, "_1dsa", this._withTagger.instance.getTokens().length > 0);
        this.updateTaggedText();
    };
    k.prototype._updateInterestTaggerUI = function() {
        'use strict';
        c('CSS').conditionClass(this._interestTaggerIcon.element, "_21yl", this._interestTagger.instance.getTokens().length > 0);
    };
    k.prototype._handleSocialText = function(l) {
        'use strict';
        if (l.payload.requestID === this._requestID) {
            var m = this._mentionsInput.instance;
            m.setAuxContent(l.payload.rendered);
            var n = m.getAuxContentRoot();
            if (n) this._input.setAttribute('aria-labelledby', c('getOrCreateDOMID')(n));
            c('Arbiter').inform('reflow');
        }
    };
    k.prototype._hasMentionsInput = function() {
        'use strict';
        return this._mentionsInput !== undefined;
    };
    k.prototype._hasPlaceTagger = function() {
        'use strict';
        return this._placeTagger !== undefined;
    };
    k.prototype.isEditComposer = function() {
        'use strict';
        return !!this._editParams;
    };
    Object.assign(k.prototype, {
        _placeType: null,
        _requestID: 0,
        _socialTextRequest: null
    });
    f.exports = k;
}), null);
__d('ComposerXOGTaggerBehavior', ['csx', 'cx', 'Arbiter', 'ComposerXController', 'CSS', 'DOM', 'DOMQuery', 'MinutiaeVerbs', 'OGComposerConstants', 'URI'], (function a(b, c, d, e, f, g, h, i) {
    if (c.__markCompiled) c.__markCompiled();
    var j = null,
        k = {
            initOGTagger: function l(m) {
                this._attachmentRoot = m.getRoot();
                this._showPreview = m.allowOGTagPreview();
                this._ogTagger = m.getComponent('ogtagger');
                this._ogIcon = m.getComponent('ogtaggericon');
                this._removeUrl = m._config && m._config.remove_url || '/ajax/composerx/attachment/status/';
                j = this._ogTagger.instance;
                this.registerTagger('ogtagger', this._ogTagger, this._ogIcon);
                this.setTaggerCallback('ogtagger', this._ogTagger.instance.showTagger.bind(this._ogTagger.instance));
                this.setTaggerHideCallback('ogtagger', this._ogTagger.instance.hideTagger.bind(this._ogTagger.instance));
                this.addSubscription(this._ogTagger.instance.subscribe('changed', this._handleOGActionChanged.bind(this)));
                this.addSubscription(this._ogTagger.instance.subscribe('unselect', this._handleOGActionRemoved.bind(this)));
                this._placeTagger && this.addSubscription(this._placeTagger.instance.subscribe(['select', 'unselect'], this._handlePlaceChanged.bind(this)));
                this.addSubscription(c('Arbiter').subscribe('composer/initializedAttachment', function() {
                    if (this._ogTagger.instance.isSet()) c('Arbiter').inform('composer/deactivateDragdrop');
                }.bind(this)));
                this.addSubscription(c('Arbiter').subscribe('composer/ogCustomIconSelected', function(p, q) {
                    if (typeof q !== 'object') {
                        this._ogTagger.instance.setCustomIconID(q);
                        return;
                    }
                    this._ogTagger.instance.setCustomIconID(q.icon_id);
                }.bind(this)));
                this.addSubscription(c('Arbiter').subscribe('composer/ogIconPickerOpened', function(p, q) {
                    if (typeof q !== 'object') {
                        this._ogTagger.instance.markIconPickerOpened();
                        return;
                    }
                    this._ogTagger.instance.markIconPickerOpened();
                }.bind(this)));
                this.addSubscription(c('Arbiter').subscribe('composer/updateViewerLocationEstimate', function(p, q) {
                    return this._handleViewerLocationChanged(q);
                }.bind(this)));
                this.subscribe('hidetaggers', this.hideTypeaheadView.bind(this));
                this._updateOGIconState();
                this._updateWithTaggerUI();
                if (!this._config.preventUnfinishedPostAlert) {
                    var n = m.getComposerID(),
                        o = m.getRoot();
                    while (o != null) {
                        o = o.parentNode;
                        if (o.id == n) break;
                    }
                    c('ComposerXController').registerConditionForComposerCancel(o, function() {
                        return j && j.hasChanges && j.hasChanges();
                    });
                }
            },
            _handleOGActionChanged: function l() {
                this._ogTagger.instance.setCustomIconID('');
                this.updateTaggedText();
                this._updateOGIconState();
                if (this._showPreview && this._ogTagger.instance.isSet()) {
                    c('Arbiter').inform('composer/deactivateDragdrop');
                    var m = this._ogTagger.instance.getObjectID();
                    if (m) {
                        var n = this._ogTagger.instance.getActionTypeID(),
                            o = c('DOM').find(this._attachmentRoot, 'input[name="hide_object_attachment"]');
                        o.value = 0;
                        if (this._config.objectPreviewID == m) this._showAttachmentPreview();
                        if (this._config.hasShareScrape) return;
                        var p;
                        if (this.isEditComposer()) {
                            p = new(c('URI'))(c('OGComposerConstants').EditAttachmentURI);
                        } else p = new(c('URI'))(this._removeUrl);
                        p.addQueryData({
                            override_preview_object_id: true,
                            preview_object_id: m,
                            preview_action_type_id: n,
                            og_action_changed: true
                        });
                        c('ComposerXController').getAttachment(this._attachmentRoot, p.toString());
                        if (n == c('MinutiaeVerbs').COMPOSER_ATTENDS) c('Arbiter').inform('composer/attendingMinutiaeAdded', {
                            info: {
                                original_id: m
                            }
                        });
                    }
                } else {
                    c('Arbiter').inform('composer/reactivateDragdrop');
                    this._hideAttachmentPreview();
                }
            },
            _handleOGActionRemoved: function l() {
                c('Arbiter').inform('composer/attendingMinutiaeRemoved', {
                    info: {}
                });
            },
            _updateOGIconState: function l() {
                c('CSS').conditionClass(this._ogIcon.element, "_4-jh", this._ogTagger.instance.isSet());
                if (this._ogTagger.instance.isSet()) {
                    this._ogIcon.element.setAttribute('aria-selected', 'true');
                    this._ogIcon.element.removeAttribute('role');
                    this._hideTagger('ogtagger');
                } else {
                    this._ogIcon.element.setAttribute('aria-selected', 'false');
                    this._ogIcon.element.setAttribute('role', 'button');
                }
            },
            _handleViewerLocationChanged: function l(m) {
                if (!m.latitude || !m.longitude) return;
                this._ogTagger.instance.setViewerCoords && this._ogTagger.instance.setViewerCoords(m);
            },
            _handlePlaceChanged: function l(m, n) {
                var o = n.selected ? n.selected.uid : 0;
                this._ogTagger.instance.setPlaceID(o);
            },
            _showAttachmentPreview: function l() {
                var m = c('DOM').scry(this._attachmentRoot, "div.fbComposerOGAttachmentPreview");
                if (m[0]) c('CSS').show(m[0]);
            },
            _hideAttachmentPreview: function l() {
                var m = c('DOM').scry(this._attachmentRoot, "div.fbComposerOGAttachmentPreview");
                if (m[0]) c('CSS').hide(m[0]);
            },
            cleanupOGTagger: function l() {
                this._showAttachmentPreview();
                j = null;
            },
            getExtraTaggedTextData: function l() {
                var m = {};
                if (this.getMoreExtraTaggedTextData) m = this.getMoreExtraTaggedTextData();
                if (!this._ogTagger || !this._ogTagger.instance.isSet()) return m;
                m = Object.assign(m, {
                    actionID: this._ogTagger.instance.getActionTypeID(),
                    objectID: this._ogTagger.instance.getObjectID(),
                    objectStr: this._ogTagger.instance.getObjectStr(),
                    objectQuery: this._ogTagger.instance.getObjectQuery(),
                    actionIconID: this._ogTagger.instance.getCustomIconID(),
                    iconPickerOpened: this._ogTagger.instance.getIconPickerOpened()
                });
                return m;
            },
            isOGTaggerSet: function l() {
                return this._ogTagger && this._ogTagger.instance.isSet();
            },
            hideTypeaheadView: function l() {
                this._ogTagger.instance.getNounTypeahead().getView().hide();
            },
            updateSuggestion: function l(m, n) {
                if (!m) return;
                var o = c('DOMQuery').find(this._ogIcon.element, "._5xlw");
                if (!o) return;
                var p = parseInt(o.innerText, 10) || 0;
                c('DOM').setContent(o, m + p);
                if (!this._ogTagger.instance.suggestIconShown()) this._ogTagger.instance.showSuggestCount(o);
                if (!n) n = '';
                this._ogTagger.instance.getVerbTypeahead().getData().bootstrapData.user_input = n;
            },
            saveSuggestion: function l(m, n) {
                var o = this._ogTagger.instance.getVerbTypeahead().getData().bootstrapData.saved_suggestions || {};
                o[n] = m;
                this._ogTagger.instance.getVerbTypeahead().getData().bootstrapData.saved_suggestions = o;
            }
        };
    f.exports = k;
}), null);
__d('ComposerXStandardTaggerWithOG', ['ComposerXOGTaggerBehavior', 'ComposerXStandardTagger', 'classWithMixins', 'mixin'], (function a(b, c, d, e, f, g) {
    var h, i;
    if (c.__markCompiled) c.__markCompiled();
    h = babelHelpers.inherits(j, c('classWithMixins')(c('ComposerXStandardTagger'), c('mixin')(c('ComposerXOGTaggerBehavior'))));
    i = h && h.prototype;
    j.prototype.init = function(k) {
        'use strict';
        i.init.call(this, k);
        this.initOGTagger(k);
    };
    j.prototype.cleanup = function() {
        'use strict';
        i.cleanup.call(this);
        this.cleanupOGTagger();
    };

    function j() {
        'use strict';
        h.apply(this, arguments);
    }
    f.exports = j;
}), null);
__d('BanzaiNectarSimple', ['Banzai'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(j) {
        return {
            log: function k(l, m, n) {
                var o = {
                    e: m,
                    a: n
                };
                c('Banzai').post('nectar_simple:' + l, o, j);
            }
        };
    }
    var i = h();
    i.create = h;
    f.exports = i;
}), null);
__d('OGComposerTagger', ['csx', 'Arbiter', 'ArbiterMixin', 'BanzaiNectarSimple', 'CSS', 'DOM', 'Event', 'Input', 'QE', 'RTLKeys', 'StickyPlaceholderInput', 'areEqual', 'mixin', 'tidyEvent'], (function a(b, c, d, e, f, g, h) {
    var i, j;
    if (c.__markCompiled) c.__markCompiled();
    i = babelHelpers.inherits(k, c('mixin')(c('ArbiterMixin')));
    j = i && i.prototype;

    function k(l, m, n, o, p, q, r, s, t, u, v) {
        'use strict';
        j.constructor.call(this);
        this._verbTypeahead = l;
        this._nounTypeahead = m;
        this._hiddenObjectStr = n;
        this._suggestionMechanismInput = o;
        this._suggestionLoggingDataInput = s;
        this._nounTypeaheadDatasources = t;
        this._defaultNounTypeaheadDatasource = this._nounTypeahead.getData();
        this._customIconInput = p;
        this._objectQuery = null;
        this._suggestIconElement = null;
        this._suggestIconShown = false;
        this._nounTypeaheadMetrics = r;
        this._iconPickerOpened = false;
        this._placeSpecificVerbList = u;
        this._enableVerbPrefetching = v;
        this._initialObjectStr = this.getObjectStr();
        this._initialObjectID = this.getObjectID();
        if (q) {
            c('DOM').setContent(this._getVerbSpan(), q);
            c('CSS').show(this._getVerbSpan());
        }
        this._prefetchVerbs();
        l.getCore().preventFocusChangeOnTab = true;
        m.getCore().preventFocusChangeOnTab = true;
        m.getCore().keepFocused = false;
        this._watchCloseButton(m);
        var w = m.getCore().getElement(),
            x = l.getCore().getElement();
        c('tidyEvent')([l.subscribe('select', function(y, z) {
            return (this._handleVerbChange(z.selected));
        }.bind(this)), m.subscribe('select', function(y, z) {
            return (this._handleNounChange(z.selected));
        }.bind(this)), m.subscribe('unselect', function() {
            return this._handleNounUnselect();
        }.bind(this)), c('Event').listen(x, 'keydown', function(event) {
            if (c('Event').getKeyCode(event) == c('RTLKeys').SPACE || c('Event').getKeyCode(event) == c('RTLKeys').getRight()) {
                l.getView().select(false);
                event.kill();
            }
            if (c('Event').getKeyCode(event) != c('RTLKeys').BACKSPACE && c('Event').getKeyCode(event) != c('RTLKeys').DELETE && c('Event').getKeyCode(event) != c('RTLKeys').SPACE && l.getData().value !== '') c('BanzaiNectarSimple').log('og_composer_waterfall', 'verb_typeahead', {
                search_string: l.getData().value
            });
        }), c('Event').listen(w, 'keydown', function(event) {
            if ((c('Event').getKeyCode(event) == c('RTLKeys').BACKSPACE || c('Event').getKeyCode(event) == c('RTLKeys').getLeft()) && c('Input').isEmpty(this._getNounInput())) this._showVerbTypeahead();
        }.bind(this)), c('Arbiter').subscribe('structuredSuggestion/add', function(y, z) {
            this._handleVerbChange(z);
        }.bind(this)), c('Arbiter').subscribe('ogComposer/asyncSuggest', function(y, z) {
            var aa = JSON.parse(z);
            if (!this.isSet()) {
                this.setVerbandNoun(aa.verb, aa.noun);
                c('Arbiter').inform('ogComposer/asyncSuggest/display', z);
                var ba = false;
                this.subscribe('changed', function(event) {
                    if (!ba) {
                        ba = true;
                        c('Arbiter').inform('ogComposer/asyncSuggest/xout', z);
                    }
                });
            }
        }.bind(this)), c('Arbiter').subscribe('highConfSuggestion/saved', function() {
            this._verbTypeahead.getData().dirty();
            this._verbTypeahead.getData().bootstrap();
        }.bind(this))]);
    }
    k.prototype._prefetchVerbs = function(l) {
        'use strict';
        if (this._enableVerbPrefetching) {
            var m = this._verbTypeahead.getData();
            m.bootstrapData.is_prefetching = true;
            m.bootstrap();
            m.bootstrapData.is_prefetching = false;
        }
    };
    k.prototype._prefetchNouns = function(l, m) {
        'use strict';
        for (var n in this._nounTypeaheadDatasources)
            if (this._nounTypeaheadDatasources.hasOwnProperty(n)) {
                var o = this._nounTypeaheadDatasources[n];
                o.init();
                o.dirty();
                if (l != null) {
                    o.bootstrapData[l] = m;
                    o.queryData[l] = m;
                }
                o.queryData.at_id = n;
                o.bootstrapData.at_id = n;
                o.bootstrapData.is_prefetching = true;
                o.bootstrap();
                o.bootstrapData.is_prefetching = false;
            }
    };
    k.prototype._updateNounTypeahead = function(l, m) {
        'use strict';
        var n = this._defaultNounTypeaheadDatasource;
        if (c('areEqual')(m, n.bootstrapData[l])) return;
        this._prefetchNouns(l, m);
        n.bootstrapData[l] = m;
        n.queryData[l] = m;
        if (n.bootstrapData.at_id) {
            this._nounTypeaheadMetrics.init(this._nounTypeahead);
            n.dirty();
            n.bootstrap();
        }
    };
    k.prototype.showTagger = function() {
        'use strict';
        c('Arbiter').inform('showOGTagger');
        this._nounTypeahead.getCore().setEnabled(true);
        if (this._suggestionMechanismInput.value === 'gk_based_production_prompt_classifier')
            if (this._suggestion_logging_data) {
                this._suggestion_logging_data.prompt_removed = true;
                this._suggestionLoggingDataInput.value = JSON.stringify(this._suggestion_logging_data);
            }
        if (this.isSet() && !this._suggestionMechanismInput.value) {
            this._showNounTypeahead();
        } else if (this.isSet()) {
            this._verbTypeahead.getCore().reset();
            this._nounTypeahead.getCore().reset();
            this.inform('changed');
            this._showVerbTypeahead();
        } else this._showVerbTypeahead();
        if (this._suggestIconElement) {
            c('CSS').hide(this._suggestIconElement);
            this._suggestIconShown = false;
            this._badgeClicked = true;
        }
        this._prefetchNouns();
        c('QE').logExposure('www_react_composer');
    };
    k.prototype.hideTagger = function() {
        'use strict';
        this._nounTypeahead.getCore().setEnabled(false);
    };
    k.prototype.isSet = function() {
        'use strict';
        return !!(this.getObjectID() || this.getObjectStr());
    };
    k.prototype.hasChanges = function() {
        'use strict';
        return this.getObjectID() !== this._initialObjectID || this.getObjectStr() !== this._initialObjectStr;
    };
    k.prototype.reset = function() {
        'use strict';
        this._nounTypeahead.getCore().reset();
        this._verbTypeahead.getCore().reset();
        this._hiddenObjectStr.value = '';
        this._objectQuery = null;
        this.setPlaceID(0);
        this.setCustomIconID('');
        this._iconPickerOpened = false;
    };
    k.prototype.setVerbandNoun = function(l, m) {
        'use strict';
        this._verbTypeahead.getCore().select(l);
        this._handleVerbChange(l);
        this._nounTypeahead.getCore().select(m);
        this._handleNounChange(m);
    };
    k.prototype.getActionTypeID = function() {
        'use strict';
        return this._verbTypeahead.getCore().getHiddenValue();
    };
    k.prototype.getObjectID = function() {
        'use strict';
        return this._nounTypeahead.getCore().getHiddenValue();
    };
    k.prototype.setViewerCoords = function(l) {
        'use strict';
        var m = JSON.stringify(l);
        this._updateNounTypeahead('coords', m);
    };
    k.prototype.setPlaceID = function(l) {
        'use strict';
        this._updateNounTypeahead('place_id', l);
        var m = this._verbTypeahead.getData();
        if (this._placeSpecificVerbList && l != m.bootstrapData.place_id) {
            m.bootstrapData.place_id = l;
            if (m.queryData !== undefined) m.queryData.place_id = l;
            m.dirty();
            this._prefetchVerbs();
        }
    };
    k.prototype.getObjectStr = function() {
        'use strict';
        return this._hiddenObjectStr.value;
    };
    k.prototype.getObjectQuery = function() {
        'use strict';
        return this._objectQuery;
    };
    k.prototype.getVerbTypeahead = function() {
        'use strict';
        return this._verbTypeahead;
    };
    k.prototype.getNounTypeahead = function() {
        'use strict';
        return this._nounTypeahead;
    };
    k.prototype._handleVerbChange = function(l) {
        'use strict';
        this._suggestionMechanismInput.value = l.suggestion_mechanism;
        if (l.suggestion_config) {
            this._suggestion_logging_data = l.suggestion_config;
            this._suggestionLoggingDataInput.value = JSON.stringify(this._suggestion_logging_data);
        } else if (this._suggestion_logging_data) {
            this._suggestion_logging_data.erased = true;
            this._suggestionLoggingDataInput.value = JSON.stringify(this._suggestion_logging_data);
        }
        if (l.type === 'page') {
            this._nounTypeahead.getCore().setHiddenValue(l.uid);
            this._verbTypeahead.getCore().setHiddenValue(l.at_id);
            this.inform('changed');
            return;
        }
        var m = null;
        if (this._nounTypeaheadDatasources.hasOwnProperty(l.uid)) {
            m = this._nounTypeaheadDatasources[l.uid];
        } else {
            m = this._defaultNounTypeaheadDatasource;
            m.dirty();
            m.queryData.at_id = l.uid;
            m.bootstrapData.at_id = l.uid;
        }
        if (m !== this._nounTypeahead.getData()) this._nounTypeahead.swapData(m);
        this._nounTypeaheadMetrics.resetWithData(this._nounTypeahead);
        m.bootstrap(true);
        this._nounTypeahead.getView().setContext(l);
        c('StickyPlaceholderInput').setPlaceholderText(this._nounTypeahead.getCore().getElement(), l.prompt);
        if (l.prompt_text) {
            c('CSS').show(this._getVerbSpan());
            c('DOM').setContent(this._getVerbSpan(), l.prompt_text);
        } else c('CSS').hide(this._getVerbSpan());
        this._showNounTypeahead();
    };
    k.prototype._handleNounUnselect = function() {
        'use strict';
        this._hiddenObjectStr.value = '';
        this.inform('changed');
        this.inform('unselect');
    };
    k.prototype._handleNounChange = function(l) {
        'use strict';
        this._suggestionMechanismInput.value = '';
        if (l.uid) {
            this._hiddenObjectStr.value = '';
        } else {
            this._nounTypeahead.getCore().setHiddenValue('');
            this._hiddenObjectStr.value = l.text.trim();
        }
        this._objectQuery = l.query;
        this.inform('changed');
    };
    k.prototype._getVerbSpan = function() {
        'use strict';
        if (!this._verbSpan) {
            this._verbSpan = c('DOM').create('span', {
                className: 'verbText'
            });
            c('DOM').prependContent(this._nounTypeahead.getElement(), this._verbSpan);
            c('tidyEvent')(c('Event').listen(this._verbSpan, 'click', function() {
                this._showVerbTypeahead();
                return false;
            }.bind(this)));
        }
        return this._verbSpan;
    };
    k.prototype._getNounInput = function() {
        'use strict';
        return this._nounTypeahead.getCore().getElement();
    };
    k.prototype._showVerbTypeahead = function() {
        'use strict';
        c('CSS').show(this._verbTypeahead.getElement());
        c('CSS').hide(this._nounTypeahead.getElement());
        this._verbTypeahead.getCore().reset();
        this._nounTypeahead.getCore().reset();
        this._verbTypeahead.getCore().getElement().focus();
        var l = this._verbTypeahead.getData();
        if (this._enableVerbPrefetching && this._placeSpecificVerbList) {
            l.bootstrap(true);
        } else l.bootstrap();
    };
    k.prototype._showNounTypeahead = function() {
        'use strict';
        c('CSS').hide(this._verbTypeahead.getElement());
        c('CSS').show(this._nounTypeahead.getElement());
        this._nounTypeahead.getCore().getElement().focus();
    };
    k.prototype._watchCloseButton = function(l) {
        'use strict';
        var m = c('DOM').scry(l.getElement(), '.uiCloseButton')[0];
        if (!m) m = c('DOM').scry(l.getElement(), "._50zy")[0];
        c('tidyEvent')(c('Event').listen(m, 'click', function() {
            this._showVerbTypeahead();
            return false;
        }.bind(this)));
    };
    k.prototype.suggestIconShown = function() {
        'use strict';
        return this._suggestIconShown;
    };
    k.prototype.showSuggestCount = function(l) {
        'use strict';
        if (this._badgeClicked) return;
        this._suggestIconShown = true;
        this._suggestIconElement = l;
        c('CSS').show(l);
    };
    k.prototype.setCustomIconID = function(l) {
        'use strict';
        this._customIconInput.value = l;
    };
    k.prototype.getCustomIconID = function() {
        'use strict';
        return this._customIconInput.value;
    };
    k.prototype.markIconPickerOpened = function() {
        'use strict';
        this._iconPickerOpened = true;
    };
    k.prototype.getIconPickerOpened = function() {
        'use strict';
        return this._iconPickerOpened;
    };
    f.exports = k;
    f.exports.asyncSuggest = function(l, m, n) {
        var o = JSON.stringify(l);
        c('Arbiter').subscribe('ogComposer/asyncSuggest/display', function(p, q) {
            if (o == q) m();
        });
        c('Arbiter').subscribe('ogComposer/asyncSuggest/xout', function(p, q) {
            if (o == q) n();
        });
        c('Arbiter').inform('ogComposer/asyncSuggest', o);
    };
}), null);
__d("OGComposerTaggerNounTypeaheadView", [], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(i) {
        "use strict";
    }
    f.exports = h;
}), null);
__d('ScrollableTypeaheadBehavior', ['cx', 'CSS', 'DOM', 'Parent', 'Scroll', 'ScrollableArea', 'Style'], (function a(b, c, d, e, f, g, h) {
    if (c.__markCompiled) c.__markCompiled();

    function i(j) {
        'use strict';
        this._typeahead = j;
    }
    i.prototype.enable = function() {
        'use strict';
        this._scrollableElems = c('ScrollableArea').renderDOM();
        c('CSS').addClass(this._scrollableElems.root, "_ml");
        c('DOM').appendContent(this._typeahead.getView().element, this._scrollableElems.root);
        this._typeahead.getView().content = this._scrollableElems.content;
        this._scrollableArea = c('ScrollableArea').fromNative(this._scrollableElems.root, {
            fade: false
        });
        this._subscriptions = [this._typeahead.getView().subscribe('reset', this._reset.bind(this)), this._typeahead.getView().subscribe('render', this._render.bind(this)), this._typeahead.getView().subscribe('beforeRender', this._beforeRender.bind(this)), this._typeahead.getView().subscribe('next', this._scrollHelper.bind(this)), this._typeahead.getView().subscribe('prev', this._scrollHelper.bind(this))];
        c('CSS').hide(this._scrollableElems.root);
        c('CSS').removeClass(this._scrollableElems.root, "_mm");
    };
    i.prototype.disable = function() {
        'use strict';
        while (this._subscriptions.length) this._subscriptions.pop().unsubscribe();
        this._subscriptions = null;
    };
    i.prototype._reset = function() {
        'use strict';
        c('CSS').hide(this._scrollableElems.root);
        c('CSS').removeClass(this._scrollableElems.root, "_mm");
        this._scrollableArea.scrollToTop();
    };
    i.prototype._render = function() {
        'use strict';
        this._scrollableArea.poke();
        this._showScrollbar ? this._scrollableArea.showScrollbar(false) : this._scrollableArea.hideScrollbar(true);
        c('CSS').addClass(this._scrollableElems.root, "_mm");
    };
    i.prototype._beforeRender = function(j, k) {
        'use strict';
        var l = 5;
        if (this._typeahead.getView().maxResults < 10) l = 3;
        c('CSS').show(this._scrollableElems.root);
        c('Style').set(this._scrollableElems.body, 'width', this._scrollableElems.wrap.offsetWidth + 'px');
        if (k.results.length < l) {
            c('Style').set(this._scrollableElems.wrap, 'height', 38 * k.results.length + 4 + 'px');
            this._showScrollbar = false;
        } else {
            this._scrollableArea.showScrollbar(false);
            c('Style').set(this._scrollableElems.wrap, 'height', 38 * l + 4 + 'px');
            this._showScrollbar = true;
        }
    };
    i.prototype._scrollHelper = function(j, k) {
        'use strict';
        if (!c('Parent').byClass(k, 'uiScrollableArea')) return;
        this._typeahead.getView().ignoreMouseover = true;
        var l = c('Parent').byClass(k, 'uiScrollableAreaWrap'),
            m = k.offsetTop - l.offsetTop;
        if (m < c('Scroll').getTop(l)) {
            c('Scroll').setTop(l, m);
            return;
        }
        var n = m + k.offsetHeight;
        if (n > c('Scroll').getTop(l) + l.offsetHeight) c('Scroll').setTop(l, n - l.offsetHeight);
    };
    Object.assign(i.prototype, {
        _subscriptions: null,
        _scrollableElems: null,
        _scrollableArea: null,
        _showScrollbar: null
    });
    f.exports = i;
}), null);
__d('legacy:LegacyScrollableTypeaheadBehavior', ['ScrollableTypeaheadBehavior'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    if (!b.TypeaheadBehaviors) b.TypeaheadBehaviors = {};
    b.TypeaheadBehaviors.scrollArea = function(h) {
        h.enableBehavior(c('ScrollableTypeaheadBehavior'));
    };
}), 3);
__d('PlacesTypeaheadCore', ['Arbiter', 'CSS', 'Focus', 'Run', 'StickyPlaceholderInput', 'Style', 'TypeaheadCore'], (function a(b, c, d, e, f, g) {
    var h, i;
    if (c.__markCompiled) c.__markCompiled();
    h = babelHelpers.inherits(j, c('TypeaheadCore'));
    i = h && h.prototype;
    j.prototype.init = function(k, l, m) {
        'use strict';
        i.init.call(this, k, l, m);
        this.arbiterTokens = [c('Arbiter').subscribe('Places/PlaceCreationCancel' + this.callbackID, function(n, o) {
            this.view.allowPlaceCreation = false;
            this.view.allowFreeformOption = true;
            this.view.reset();
            this.focusElement();
        }.bind(this))];
        c('Run').onLeave(function() {
            this.arbiterTokens.forEach(c('Arbiter').unsubscribe);
        }.bind(this));
        this._typeaheadID = m.id;
        this._citySet = false;
        this.data.subscribe('fetchComplete', this.update.bind(this));
    };
    j.prototype.initToggle = function() {
        'use strict';
        var k = this.root.parentNode,
            l = c('Style').get(k, 'position') != 'static' ? k : this.root,
            m = this.view,
            n = 'PlacesTypeaheadFocused';
        this.subscribe('focus', function() {
            m.show();
            c('CSS').addClass(l, n);
        });
        this.subscribe('blur', function() {
            m.hide();
            c('CSS').removeClass(l, n);
        });
    };
    j.prototype.focusElement = function() {
        'use strict';
        c('Focus').set(this.element);
        this.value = '';
        this.checkValue();
    };
    j.prototype.setValue = function(k) {
        'use strict';
        i.setValue.call(this, k);
        c('StickyPlaceholderInput').update(this.element);
    };
    j.prototype.updateDataSource = function(k) {
        'use strict';
        this.data.setQueryData({
            city_id: this._cityId,
            city_set: this._citySet
        });
        this.data.setBootstrapData({
            city_id: this._cityId
        });
        if (k) {
            this.data.dirty();
            this.data.bootstrap();
        }
    };
    j.prototype.setCity = function(k, l) {
        'use strict';
        this._citySet = l;
        if (this._cityId !== k) {
            this._cityId = k;
            this.updateDataSource(l);
        }
    };
    j.prototype.update = function(k, l) {
        'use strict';
        var m = l.response;
        if (!m) return;
        var n = m.getPayload();
        if (n.cityId)
            if (!this._citySet) this.setCity(n.cityId, false);
    };
    j.prototype.setLocation = function(k) {
        'use strict';
        if (!k || !k.latitude || !k.longitude) return;
        this.data.setQueryData({
            latitude: k.latitude,
            longitude: k.longitude,
            want_checkin_places: true
        });
        this.data.setBootstrapData({
            latitude: k.latitude,
            longitude: k.longitude,
            want_checkin_places: true
        });
        this.data.resetBootstrapEndpoint(true);
    };

    function j() {
        'use strict';
        h.apply(this, arguments);
    }
    Object.assign(j.prototype, {
        resetOnKeyup: false
    });
    f.exports = j;
}), null);
__d('PlacesTypeaheadRendererUtil', [], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = /[.,+*?$|#{}()\^\-\[\]\\\/!@%"~=<>_:;]/g;

    function i(l, m) {
        return l.end > m.end || l.start < m.start;
    }

    function j(l, m) {
        if (!l) return [];
        var n = [];
        l = l.replace(h, ' ');
        var o = l.split(' ');
        for (var p = 0; p < o.length; p++) {
            if (!o[p]) continue;
            var q = o[p];
            if (p < o.length - 1) q = q + '[ ,]';
            var r = new RegExp(' ' + q, 'i'),
                s = r.exec(' ' + m + ' ');
            if (s) {
                var t = {
                    start: s.index,
                    end: s.index + o[p].length
                };
                if (n.every(i.bind(null, t))) n.push(t);
            } else return [];
        }
        n.sort(function(u, v) {
            return u.start - v.start;
        });
        return n;
    }
    var k = {
        match_positions: j
    };
    f.exports = k;
}), null);
__d('PlacesTypeaheadRenderer', ['DOM', 'PlacesTypeaheadRendererUtil'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(i, j) {
        var k = [],
            l = i.photo;
        if (l) k.push(c('DOM').create('img', {
            alt: '',
            src: l
        }));
        if (i.text) {
            var m = c('DOM').create('span', {
                    className: 'text'
                }, ""),
                n = i.text;
            if (i.address) n = n + " \u00b7 " + i.address;
            var o = [];
            if (i.value) o = c('PlacesTypeaheadRendererUtil').match_positions(i.value, n);
            if (o.length > 0) {
                var p = 0;
                for (var q = 0; q < o.length; q++) {
                    var r = o[q].start,
                        s = o[q].end;
                    c('DOM').appendContent(m, n.substr(p, r - p));
                    c('DOM').appendContent(m, c('DOM').create('span', {
                        className: 'bold'
                    }, n.substr(r, s - r)));
                    p = s;
                }
                c('DOM').appendContent(m, n.substr(p));
            } else {
                c('DOM').appendContent(m, c('DOM').create('span', {
                    className: 'bold'
                }, i.text));
                if (i.address) c('DOM').appendContent(m, " \u00b7 " + i.address);
            }
            k.push(c('DOM').create('span', {}, m));
        }
        var t = i.subtext,
            u = i.category;
        if (t || u) {
            var v = [];
            t && v.push(t);
            u && v.push(u);
            k.push(c('DOM').create('span', {
                className: 'subtext'
            }, v.join(' \u00b7 ')));
        }
        return c('DOM').create('li', {
            className: i.type || ''
        }, k);
    }
    h.className = 'places';
    f.exports = h;
}), null);
__d('PlacesTypeaheadView', ['fbt', 'Arbiter', 'CSS', 'Dialog', 'DOM', 'Parent', 'Run', 'Scroll', 'ScrollableArea', 'Style', 'TypeaheadView'], (function a(b, c, d, e, f, g, h) {
    var i, j;
    if (c.__markCompiled) c.__markCompiled();
    i = babelHelpers.inherits(k, c('TypeaheadView'));
    j = i && i.prototype;
    k.prototype.init = function() {
        'use strict';
        this.content = c('DOM').find(this.element, 'div.PlacesTypeaheadViewList');
        j.init.call(this);
        this.subscribe(['render', 'reset'], this.renderBorders.bind(this));
        this.arbiterTokens = [c('Arbiter').subscribe('Places/PlaceCreated' + this.callbackID, function(l, m) {
            var n = {
                text: m.name,
                rawtext: m.name,
                uid: m.fbid,
                city_id: m.city_id,
                city_name: m.city_name,
                city_page_id: m.city_page_id
            };
            this.inform('select', {
                index: -1,
                clicked: true,
                selected: n
            });
            this.inform('afterSelect');
        }.bind(this))];
        this.arbiterTokens.push(c('Arbiter').subscribe('Events/autoSuggestionSelected', function(l, m) {
            this.inform('select', {
                index: -1,
                clicked: true,
                selected: {
                    text: m.event_name,
                    rawtext: m.event_name,
                    uid: m.event_fbid
                }
            });
            this.inform('afterSelect');
        }.bind(this)));
        this.arbiterTokens.push(c('Arbiter').subscribe('Prompt/PrefillCheckin', function(l, m) {
            this.inform('select', {
                index: -1,
                clicked: true,
                selected: m
            });
            this.inform('afterSelect');
        }.bind(this)));
        c('Run').onLeave(function() {
            this.arbiterTokens.forEach(c('Arbiter').unsubscribe);
        }.bind(this));
    };
    k.prototype.renderBorders = function() {
        'use strict';
        c('CSS').conditionClass(this.element, 'PlacesTypeaheadViewPopulated', this.items.length);
    };
    k.prototype.show = function() {
        'use strict';
        j.show.call(this);
        if (!this.results || !this.results.length) c('Style').set(this.element, 'height', 0);
    };
    k.prototype.render = function(l, m, n) {
        'use strict';
        m.forEach(function(r) {
            r.value = l;
        });
        if (this.allowFreeformOption && l && (!m || m.length === 0 || m[m.length - 1].type != 'freeform')) {
            var o = h._("Just use \"{custom_location}\"", [h.param('custom_location', l)]);
            m.push({
                uid: '0',
                rawtext: l,
                text: o,
                type: 'freeform'
            });
        }
        if (this.allowPlaceCreation && l && (!m || m.length === 0 || m[m.length - 1].type != 'placecreate')) {
            var p = h._("Add place \"{custom_location}\"", [h.param('custom_location', l)]);
            m.push({
                uid: '0',
                rawtext: l,
                text: p,
                type: 'placecreate'
            });
        }
        j.render.call(this, l, m, n);
        this.element.style.visibility = 'hidden';
        if (this.visible && this.results && this.results.length) c('Style').set(this.element, 'height', '');
        var q = c('ScrollableArea').getInstance(this.content);
        q && q.adjustGripper();
        this.inform('afterRender', m);
        this.element.style.visibility = '';
    };
    k.prototype.select = function(l) {
        'use strict';
        var m = this.index,
            n = this.results[m];
        if (n) {
            if (n.type === 'placecreate') {
                c('Dialog').bootstrap('/ajax/places/create/dialog.php', {
                    name: n.rawtext,
                    callback_id: this.callbackID
                });
                return;
            }
            if (n.type === 'freeform') n.text = n.rawtext;
            j.select.call(this, l);
        }
    };
    k.prototype.next = function() {
        'use strict';
        j.next.call(this);
        this._scrollIntoView(this.selected);
    };
    k.prototype.prev = function() {
        'use strict';
        j.prev.call(this);
        this._scrollIntoView(this.selected);
    };
    k.prototype._scrollIntoView = function(l) {
        'use strict';
        if (!c('Parent').byClass(l, 'uiScrollableArea')) return;
        this.ignoreNextMouseover = true;
        var m = c('Parent').byClass(l, 'uiScrollableAreaWrap'),
            n = l.offsetTop - m.offsetTop;
        if (n < c('Scroll').getTop(m)) {
            c('Scroll').setTop(m, n);
            return;
        }
        var o = n + l.offsetHeight;
        if (o > c('Scroll').getTop(m) + m.offsetHeight) c('Scroll').setTop(m, o - m.offsetHeight);
    };
    k.prototype.mouseover = function(event) {
        'use strict';
        this.ignoreNextMouseover || j.mouseover.call(this, event);
        this.ignoreNextMouseover = false;
    };
    k.prototype.highlight = function(l) {
        'use strict';
        j.highlight.call(this, l, true);
    };

    function k() {
        'use strict';
        i.apply(this, arguments);
    }
    Object.assign(k.prototype, {
        ignoreNextMouseover: false
    });
    f.exports = k;
}), null);
__d("ComposerXComponents", [], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(i) {
        "use strict";
        this.$ComposerXComponents1 = i;
    }
    h.prototype.getComponents = function() {
        "use strict";
        return this.$ComposerXComponents1;
    };
    f.exports = h;
}), null);
__d('OpenGraphDialog', ['ComposerXStandardTaggerWithOG', 'DOM', 'Focus'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(i, j) {
        'use strict';
        this.$OpenGraphDialog1 = i;
        if (arguments.length == 2) {
            this.$OpenGraphDialog2 = j.getComponents();
        } else {
            this.$OpenGraphDialog2 = {};
            for (var k = 1; k < arguments.length; k++) this.$OpenGraphDialog2 = babelHelpers['extends']({}, this.$OpenGraphDialog2, arguments[k].getComponents());
        }
        this.$OpenGraphDialog3 = new(c('ComposerXStandardTaggerWithOG'))({
            preventUnfinishedPostAlert: true
        });
        this.$OpenGraphDialog3.init(this);
        var l = this.getComponent('maininput').element;
        l = c('DOM').scry(l, 'textarea')[0];
        c('Focus').set(l);
    }
    h.prototype.allowOGTagPreview = function() {
        'use strict';
        return false;
    };
    h.prototype.getRoot = function() {
        'use strict';
        return this.$OpenGraphDialog1;
    };
    h.prototype.getComponent = function(i) {
        'use strict';
        return this.$OpenGraphDialog2[i];
    };
    h.prototype.getComposerID = function() {
        'use strict';
        return '';
    };
    f.exports = h;
}), null);
__d('OpenGraphTypeaheadBehavior', ['ContextualLayerAutoFlip', 'DOMVector'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(i) {
        'use strict';
        this.$OpenGraphTypeaheadBehavior1 = i.getView();
        this.$OpenGraphTypeaheadBehavior2 = this.$OpenGraphTypeaheadBehavior1.element;
    }
    h.prototype.enable = function() {
        'use strict';
        if (this.$OpenGraphTypeaheadBehavior1.layer) {
            this.$OpenGraphTypeaheadBehavior1.layer.setPosition('above');
            this.$OpenGraphTypeaheadBehavior1.layer.disableBehavior(c('ContextualLayerAutoFlip'));
        } else this.$OpenGraphTypeaheadBehavior3 = this.$OpenGraphTypeaheadBehavior1.subscribe('afterRender', this.$OpenGraphTypeaheadBehavior4.bind(this));
    };
    h.prototype.disable = function() {
        'use strict';
        if (this.listener) {
            this.$OpenGraphTypeaheadBehavior3.remove();
            this.$OpenGraphTypeaheadBehavior3 = null;
        }
    };
    h.prototype.$OpenGraphTypeaheadBehavior4 = function() {
        'use strict';
        var i = c('DOMVector').getElementDimensions(this.$OpenGraphTypeaheadBehavior2).y;
        if (i) this.$OpenGraphTypeaheadBehavior2.style.marginTop = -(i + 28) + 'px';
    };
    f.exports = h;
}), null);
__d('ExternalWebShareDialogObserver', ['Arbiter', 'CSS', 'DOM'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        setHidePrivacy: function i(j) {
            c('Arbiter').inform('setHidePrivacy', j, c('Arbiter').BEHAVIOR_STATE);
        },
        listenToHidePrivacy: function i(j) {
            c('Arbiter').subscribe('setHidePrivacy', function(k, l) {
                l.hide ? c('CSS').hide(j) : c('CSS').show(j);
            });
        },
        setHideComposerTaggers: function i(j) {
            c('Arbiter').inform('setHideComposerTaggers', j, c('Arbiter').BEHAVIOR_STATE);
        },
        listenToHideComposerTaggers: function i(j) {
            c('Arbiter').subscribe('setHideComposerTaggers', function(k, l) {
                l.hide ? c('CSS').hide(j) : c('CSS').show(j);
            });
        },
        setSubmitButtonActionText: function i(j) {
            c('Arbiter').inform('setSubmitButtonActionText', j, c('Arbiter').BEHAVIOR_STATE);
        },
        listenToChangeSubmitButtonActionText: function i(j) {
            c('Arbiter').subscribe('setSubmitButtonActionText', function(k, l) {
                if (l.actionText) c('DOM').setContent(j, l.actionText);
            });
        },
        setDisableSubmitButton: function i(j) {
            c('Arbiter').inform('setDisableSubmitButton', j, c('Arbiter').BEHAVIOR_STATE);
        },
        listenToDisableSubmitButton: function i(j) {
            c('Arbiter').subscribe('setDisableSubmitButton', function(k, l) {
                j.disabled = l.disable;
            });
        }
    };
    f.exports = h;
}), null);
__d('ShareDialogDataSources', ['getObjectValues'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
            ACTION: 'actionSource',
            EVENT: 'event',
            GROUP: 'groupSource',
            MENTIONS: 'mentionsSource',
            MESSAGE: 'messageSource',
            OBJECT: 'objectSource',
            PAGE: 'pageSource',
            PERSON: 'personSource',
            PERSON_WALL: 'personWallSource',
            PLACE: 'placeSource'
        },
        i = c('getObjectValues')(h);

    function j() {
        'use strict';
        this.$ShareDialogDataSources1 = {};
    }
    j.prototype.addSource = function(k, l) {
        'use strict';
        if (i.some(function(m) {
                return k === m;
            })) this.$ShareDialogDataSources1[k] = l;
        return this;
    };
    j.prototype.getSource = function(k) {
        'use strict';
        return this.$ShareDialogDataSources1[k];
    };
    j.TYPES = h;
    f.exports = j;
}), null);
__d('ShareDialogAudience.react', ['Bootloader', 'ReactComposerContextMixin', 'React', 'ShareDialogAudienceTypes', 'ShareDialogDataSources', 'emptyFunction'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = c('ShareDialogDataSources').TYPES,
        i, j, k, l, m, n = c('React').PropTypes,
        o = c('React').createClass({
            displayName: 'ShareDialogAudience',
            mixins: [c('ReactComposerContextMixin')],
            propTypes: {
                activeAudience: function p(q) {
                    if (!c('ShareDialogAudienceTypes').isValid(q.activeAudience)) return new Error('The active audience is invalid.');
                },
                customModules: n.shape({
                    groupsAudience: n.arrayOf(n.func)
                }),
                messageTargets: n.array,
                userId: n.string,
                dataSources: n.instanceOf(c('ShareDialogDataSources')),
                onClear: n.func,
                onChange: n.func,
                defaultPageTargetID: n.string,
                preselectedID: n.string,
                preselectedTitle: n.string
            },
            getDefaultProps: function p() {
                return {
                    customModules: {},
                    dataSources: new(c('ShareDialogDataSources'))(),
                    onClear: c('emptyFunction'),
                    onChange: c('emptyFunction')
                };
            },
            getInitialState: function p() {
                return {
                    bootloaded: false,
                    bootloading: false
                };
            },
            componentDidMount: function p() {
                if (!this.state.bootloading && !this.state.bootloaded) {
                    this.setState({
                        bootloading: true
                    });
                    c('Bootloader').loadModules(["ShareDialogMessageAudience.react", "ShareDialogGroupAudience.react", "ShareDialogEventAudience.react", "ShareDialogPersonAudience.react", "ShareDialogPageAudience.react"], function(q, r, s, t, u) {
                        i = q;
                        j = r;
                        k = s;
                        l = t;
                        m = u;
                        this.setState({
                            bootloading: false,
                            bootloaded: true
                        });
                    }.bind(this), 'ShareDialogAudience.react');
                }
            },
            render: function p() {
                if (this.state.bootloaded) {
                    var q = this.props.dataSources;
                    if (q.getSource(h.MESSAGE) && this.props.activeAudience === c('ShareDialogAudienceTypes').MESSAGE) return (c('React').createElement(i, {
                        userId: this.props.userId,
                        onClear: this.props.onClear,
                        onChange: this.props.onChange,
                        ref: this.props.ref,
                        messageTargets: this.props.messageTargets,
                        lockMessageTargets: this.props.lockMessageTargets
                    }));
                    if (q.getSource(h.PERSON_WALL) && this.props.activeAudience === c('ShareDialogAudienceTypes').PERSON) return (c('React').createElement(l, {
                        userId: this.props.userId,
                        onClear: this.props.onClear,
                        onChange: this.props.onChange,
                        preselectedID: this.props.preselectedID,
                        preselectedTitle: this.props.preselectedTitle,
                        ref: this.props.ref,
                        searchSource: q.getSource(h.PERSON_WALL)
                    }));
                    if (q.getSource(h.GROUP) && this.props.activeAudience === c('ShareDialogAudienceTypes').GROUP) {
                        var r = this.props.customModules ? this.props.customModules.groupsAudience : null;
                        return (c('React').createElement(j, {
                            customModules: r,
                            onClear: this.props.onClear,
                            onChange: this.props.onChange,
                            ref: this.props.ref,
                            searchSource: q.getSource(h.GROUP)
                        }));
                    }
                    if (q.getSource(h.EVENT) && this.props.activeAudience === c('ShareDialogAudienceTypes').EVENT) return (c('React').createElement(k, {
                        onClear: this.props.onClear,
                        onChange: this.props.onChange,
                        ref: this.props.ref,
                        searchSource: q.getSource(h.EVENT)
                    }));
                    if (q.getSource(h.PAGE) && this.props.activeAudience === c('ShareDialogAudienceTypes').PAGE) return (c('React').createElement(m, {
                        onClear: this.props.onClear,
                        onChange: this.props.onChange,
                        ref: this.props.ref,
                        pagesSource: q.getSource(h.PAGE),
                        defaultPageID: this.props.defaultPageTargetID
                    }));
                }
                return c('React').createElement('noscript', null);
            }
        });
    f.exports = o;
    f.exports.TYPES = c('ShareDialogAudienceTypes');
}), null);
__d('ShareDialogAudienceText.react', ['fbt', 'React', 'ShareDialogAudienceTypes', 'ShareDialogConfig'], (function a(b, c, d, e, f, g, h) {
    var i, j;
    if (c.__markCompiled) c.__markCompiled();
    i = babelHelpers.inherits(k, c('React').Component);
    j = i && i.prototype;

    function k() {
        var l, m;
        'use strict';
        for (var n = arguments.length, o = Array(n), p = 0; p < n; p++) o[p] = arguments[p];
        return m = (l = j.constructor).call.apply(l, [this].concat(o)), this.$ShareDialogAudienceText1 = function() {
            switch (this.props.audience) {
                case c('ShareDialogAudienceTypes').OWN:
                    return h._("Share on your own Timeline");
                case c('ShareDialogAudienceTypes').PERSON:
                    return h._("Share on a friend's Timeline");
                case c('ShareDialogAudienceTypes').GROUP:
                    return h._("Share in a group");
                case c('ShareDialogAudienceTypes').EVENT:
                    return h._("Share in an event");
                case c('ShareDialogAudienceTypes').PAGE:
                    return h._("Share on a Page you manage");
                case c('ShareDialogAudienceTypes').MESSAGE:
                    return c('ShareDialogConfig').share_in_separate_messages ? h._("Share in separate messages") : h._("Share in a private message");
                default:
                    return c('React').createElement('noscript', null);
            }
        }.bind(this), m;
    }
    k.prototype.render = function() {
        'use strict';
        return (c('React').createElement('span', this.props, this.$ShareDialogAudienceText1()));
    };
    k.propTypes = {
        audience: function l(m) {
            if (!c('ShareDialogAudienceTypes').isValid(m.audience)) return new Error('The audience is invalid.');
        }
    };
    k.defaultProps = {
        audience: c('ShareDialogAudienceTypes').OWN
    };
    f.exports = k;
}), null);
__d('ShareDialogAudienceSelector.react', ['cx', 'arrayContains', 'emptyFunction', 'React', 'ShareDialogAudienceText.react', 'ShareDialogAudienceTypes', 'XUIMenuSeparator.react', 'XUISelector.react'], (function a(b, c, d, e, f, g, h) {
    var i, j;
    if (c.__markCompiled) c.__markCompiled();
    var k = c('React').PropTypes,
        l = c('XUISelector.react').Option;
    i = babelHelpers.inherits(m, c('React').Component);
    j = i && i.prototype;

    function m() {
        var n, o;
        'use strict';
        for (var p = arguments.length, q = Array(p), r = 0; r < p; r++) q[r] = arguments[r];
        return o = (n = j.constructor).call.apply(n, [this].concat(q)), this.state = {
            activeAudience: this.props.activeAudience
        }, this.onChange = function(s) {
            this.setState({
                activeAudience: s.value
            });
            this.props.onAudienceSelect(s.value);
        }.bind(this), o;
    }
    m.prototype.componentWillReceiveProps = function(n) {
        'use strict';
        this.setState({
            activeAudience: n.activeAudience
        });
    };
    m.prototype.render = function() {
        'use strict';
        var n = this.props.allowedAudiences,
            o = [];
        if (n.length == 1) return (c('React').createElement('div', {
            className: "_94t _1nb1"
        }, c('React').createElement('div', {
            className: "_42ym _41kd"
        }, c('React').createElement(c('ShareDialogAudienceText.react'), {
            audience: this.props.activeAudience
        }))));
        if (c('arrayContains')(n, c('ShareDialogAudienceTypes').OWN)) o.push(c('React').createElement(l, {
            className: "_42ym _42yn",
            value: c('ShareDialogAudienceTypes').OWN,
            key: c('ShareDialogAudienceTypes').OWN
        }, c('React').createElement(c('ShareDialogAudienceText.react'), {
            audience: c('ShareDialogAudienceTypes').OWN
        })));
        if (c('arrayContains')(n, c('ShareDialogAudienceTypes').PERSON)) o.push(c('React').createElement(l, {
            className: "_42ym _42yp",
            value: c('ShareDialogAudienceTypes').PERSON,
            key: c('ShareDialogAudienceTypes').PERSON
        }, c('React').createElement(c('ShareDialogAudienceText.react'), {
            audience: c('ShareDialogAudienceTypes').PERSON
        })));
        if (c('arrayContains')(n, c('ShareDialogAudienceTypes').GROUP)) o.push(c('React').createElement(l, {
            className: "_42ym _2n3i",
            value: c('ShareDialogAudienceTypes').GROUP,
            key: c('ShareDialogAudienceTypes').GROUP
        }, c('React').createElement(c('ShareDialogAudienceText.react'), {
            audience: c('ShareDialogAudienceTypes').GROUP
        })));
        if (c('arrayContains')(n, c('ShareDialogAudienceTypes').EVENT)) o.push(c('React').createElement(l, {
            className: "_42ym _18sr",
            value: c('ShareDialogAudienceTypes').EVENT,
            key: c('ShareDialogAudienceTypes').EVENT
        }, c('React').createElement(c('ShareDialogAudienceText.react'), {
            audience: c('ShareDialogAudienceTypes').EVENT
        })));
        if (c('arrayContains')(n, c('ShareDialogAudienceTypes').PAGE)) o.push(c('React').createElement(l, {
            className: "_42ym _42y_",
            value: c('ShareDialogAudienceTypes').PAGE,
            key: c('ShareDialogAudienceTypes').PAGE
        }, c('React').createElement(c('ShareDialogAudienceText.react'), {
            audience: c('ShareDialogAudienceTypes').PAGE
        })));
        if (c('arrayContains')(n, c('ShareDialogAudienceTypes').MESSAGE)) {
            if (o.length > 0) o.push(c('React').createElement(c('XUIMenuSeparator.react'), {
                key: 'separator'
            }));
            o.push(c('React').createElement(l, {
                className: "_42ym _42z0",
                value: c('ShareDialogAudienceTypes').MESSAGE,
                key: c('ShareDialogAudienceTypes').MESSAGE
            }, c('React').createElement(c('ShareDialogAudienceText.react'), {
                audience: c('ShareDialogAudienceTypes').MESSAGE
            })));
        }
        var p = "_94t" + (this.state.activeAudience === c('ShareDialogAudienceTypes').OWN ? ' ' + "_47xt" : '') + (this.state.activeAudience === c('ShareDialogAudienceTypes').PERSON ? ' ' + "_47xu" : '') + (this.state.activeAudience === c('ShareDialogAudienceTypes').GROUP ? ' ' + "_47xv" : '') + (this.state.activeAudience === c('ShareDialogAudienceTypes').EVENT ? ' ' + "_18ss" : '') + (this.state.activeAudience === c('ShareDialogAudienceTypes').PAGE ? ' ' + "_47xw" : '') + (this.state.activeAudience === c('ShareDialogAudienceTypes').MESSAGE ? ' ' + "_47xx" : '');
        return (c('React').createElement(c('XUISelector.react'), {
            maxwidth: 400,
            className: p,
            defaultValue: this.state.activeAudience,
            name: 'mode',
            onChange: this.onChange
        }, o));
    };
    m.propTypes = {
        allowedAudiences: function n(o) {
            if (!o.allowedAudiences.every(function(p) {
                    return c('ShareDialogAudienceTypes').isValid(p);
                })) return new Error('The allowed audiences are not valid.');
        },
        activeAudience: function n(o) {
            if (!c('ShareDialogAudienceTypes').isValid(o.activeAudience) || !o.allowedAudiences.some(function(p) {
                    return p === o.activeAudience;
                })) return new Error('The active audience is either invalid or not included in the ' + 'allowed audience list.');
        },
        onAudienceSelect: k.func
    };
    m.defaultProps = {
        onAudienceSelect: c('emptyFunction'),
        activeAudience: c('ShareDialogAudienceTypes').OWN,
        allowedAudiences: c('ShareDialogAudienceTypes').ALL
    };
    f.exports = m;
}), null);
__d('ExternalWebShareDialogAudienceHeader.react', ['cx', 'fbt', 'Arbiter', 'React', 'CurrentUser', 'ReactComposerContextConfig', 'ReactComposerContextProviderMixin', 'ExternalWebShareDialogObserver', 'ShareDialogAudience.react', 'ShareDialogAudienceSelector.react', 'ShareDialogAudienceTypes', 'ShareDialogDataSources'], (function a(b, c, d, e, f, g, h, i) {
    if (c.__markCompiled) c.__markCompiled();
    var j = c('React').PropTypes,
        k = c('React').createClass({
            displayName: 'ExternalWebShareDialogAudienceHeader',
            mixins: [c('ReactComposerContextProviderMixin')],
            propTypes: {
                contextConfig: c('ReactComposerContextConfig').isRequired,
                dataSources: j.shape({
                    friend: j.object,
                    page: j.object,
                    group: j.object.isRequired
                }).isRequired,
                audience: j.oneOf(Object.keys(c('ShareDialogAudienceTypes')).map(function(l) {
                    return c('ShareDialogAudienceTypes')[l];
                })),
                disableMessage: j.bool,
                targetTitle: j.string
            },
            getDefaultProps: function l() {
                return {
                    audience: c('CurrentUser').isWorkUser() ? c('ShareDialogAudienceTypes').GROUP : c('ShareDialogAudienceTypes').OWN,
                    disableMessage: false
                };
            },
            getInitialState: function l() {
                var m = this.props.dataSources,
                    n = this.props.contextConfig.actorID,
                    o = this.props.contextConfig.targetID,
                    p = {
                        audience: this.props.audience,
                        audienceDataSources: new(c('ShareDialogDataSources'))().addSource(c('ShareDialogDataSources').TYPES.PERSON_WALL, m.friend).addSource(c('ShareDialogDataSources').TYPES.GROUP, m.group).addSource(c('ShareDialogDataSources').TYPES.EVENT, m.event).addSource(c('ShareDialogDataSources').TYPES.PAGE, m.page).addSource(c('ShareDialogDataSources').TYPES.MESSAGE, m.friend),
                        disableMessage: this.props.disableMessage
                    };
                if (n && this.props.audience === c('ShareDialogAudienceTypes').PAGE) {
                    p.audienceTargets = [n];
                    p.actorId = n;
                } else if (o) {
                    p.audienceTargets = [o];
                    p.targetTitle = this.props.targetTitle;
                }
                return p;
            },
            componentWillMount: function l() {
                c('Arbiter').subscribe('isQuoteSet', function(m, n) {
                    this.setState({
                        disableMessage: n
                    });
                }.bind(this));
            },
            _onAudienceSelect: function l(m) {
                this.setState({
                    audience: m,
                    audienceTargets: null,
                    actorId: null,
                    targetTitle: null
                });
            },
            _onChangeAudienceTargets: function l(m) {
                if (this.state.audience === c('ShareDialogAudienceTypes').PAGE) {
                    this.setState({
                        audienceTargets: [m[0].pageId],
                        actorId: m[0].actorId
                    });
                } else this.setState({
                    audienceTargets: m,
                    actorId: null
                });
            },
            _onClearAudienceTargets: function l() {
                this.setState({
                    audienceTargets: null
                });
            },
            render: function l() {
                var m;
                if (this.state.audience === c('ShareDialogAudienceTypes').OWN) {
                    c('ExternalWebShareDialogObserver').setHidePrivacy({
                        hide: false
                    });
                    m = null;
                } else {
                    c('ExternalWebShareDialogObserver').setHidePrivacy({
                        hide: true
                    });
                    var n = null,
                        o = null;
                    if (this.state.audience === c('ShareDialogAudienceTypes').PAGE) {
                        if (this.state.audienceTargets) n = this.state.audienceTargets[0];
                    } else if (this.state.audienceTargets && this.state.targetTitle) o = this.state.audienceTargets[0];
                    m = c('React').createElement('div', null, c('React').createElement(c('ShareDialogAudience.react'), {
                        activeAudience: this.state.audience,
                        dataSources: this.state.audienceDataSources,
                        onChange: this._onChangeAudienceTargets,
                        onClear: this._onClearAudienceTargets,
                        defaultPageTargetID: n,
                        preselectedID: o,
                        preselectedTitle: this.state.targetTitle,
                        userId: this.props.contextConfig.actorID
                    }));
                }
                if (this.state.audience === c('ShareDialogAudienceTypes').MESSAGE) {
                    c('ExternalWebShareDialogObserver').setHideComposerTaggers({
                        hide: true
                    });
                    c('ExternalWebShareDialogObserver').setSubmitButtonActionText({
                        actionText: i._("Send Message")
                    });
                } else {
                    c('ExternalWebShareDialogObserver').setHideComposerTaggers({
                        hide: false
                    });
                    c('ExternalWebShareDialogObserver').setSubmitButtonActionText({
                        actionText: i._("Post to Facebook")
                    });
                }
                c('ExternalWebShareDialogObserver').setDisableSubmitButton({
                    disable: this.state.audience !== c('ShareDialogAudienceTypes').OWN && (!Array.isArray(this.state.audienceTargets) || this.state.audienceTargets.length === 0)
                });
                var p = [c('ShareDialogAudienceTypes').OWN, c('ShareDialogAudienceTypes').GROUP];
                if (this.props.dataSources.friend) p.push(c('ShareDialogAudienceTypes').PERSON);
                if (this.props.dataSources.page) p.push(c('ShareDialogAudienceTypes').PAGE);
                if (this.props.dataSources.event) p.push(c('ShareDialogAudienceTypes').EVENT);
                if (!this.state.disableMessage) p.push(c('ShareDialogAudienceTypes').MESSAGE);
                return (c('React').createElement('div', null, c('React').createElement('div', {
                    className: "_kz1"
                }, c('React').createElement(c('ShareDialogAudienceSelector.react'), {
                    activeAudience: this.state.audience,
                    onAudienceSelect: this._onAudienceSelect,
                    allowedAudiences: p
                })), m, c('React').createElement('input', {
                    type: 'hidden',
                    name: 'audience_targets',
                    value: this.state.audienceTargets
                }), c('React').createElement('input', {
                    type: 'hidden',
                    name: 'av',
                    value: this.state.actorId
                })));
            }
        });
    f.exports = k;
}), null);
__d('PlatformShareDialogFunnelLogger', ['FunnelLogger'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    var h = 'PLATFORM_SHARE_DIALOG_FUNNEL',
        i = {
            _funnelStarted: false,
            startFunnel: function j(k, l, m, n, o, p, q) {
                c('FunnelLogger').startFunnel(h);
                c('FunnelLogger').addFunnelTag(h, 'domain:' + k);
                c('FunnelLogger').addFunnelTag(h, 'browser:' + l);
                c('FunnelLogger').addFunnelTag(h, 'req_dialog:' + m);
                c('FunnelLogger').addFunnelTag(h, 'dialog:' + n);
                c('FunnelLogger').addFunnelTag(h, 'controller:' + o);
                c('FunnelLogger').addFunnelTag(h, 'req_display:' + p);
                c('FunnelLogger').addFunnelTag(h, 'display:' + q);
                this._funnelStarted = true;
            },
            endFunnel: function j() {
                c('FunnelLogger').endFunnel(h);
            },
            registerListenerForVisibility: function j(k, l) {
                if (!l) return;
                if (this._funnelStarted && this.isElementVisible(l)) {
                    this.appendUserActionIfNew(k + ':visible');
                } else setTimeout(function() {
                    return this.registerListenerForVisibility(k, l);
                }.bind(this), 1000);
            },
            registerListenerForUserKeyInput: function j(k, l) {
                if (!l || !l.addEventListener) return;
                l.addEventListener('input', function(event) {
                    var m = event.target;
                    if (m instanceof HTMLInputElement || m instanceof HTMLTextAreaElement) {
                        this.appendUserActionIfNew(k + ':input');
                        var n = m.value;
                        if (/(^|\s+)#\w\s/.test(n)) this.appendUserActionIfNew(k + ':hash_intended');
                        if (/(^|\s+)@\w/.test(n)) this.appendUserActionIfNew(k + ':mention_intended');
                    }
                }.bind(this));
            },
            registerListenerForUserClick: function j(k, l) {
                if (!l) return;
                var m = ['click', 'touchstart', 'mousedown'],
                    n = function() {
                        this.appendUserActionIfNew(k + ':click');
                    }.bind(this);
                if (l.addEventListener) {
                    m.forEach(function(o) {
                        l && l.addEventListener(o, n);
                    });
                } else if (l.attachEvent) l.attachEvent('onclick', n);
            },
            registerListenerForUserClickAndVisibility: function j(k, l) {
                if (l) {
                    this.registerListenerForVisibility(k, l);
                    this.registerListenerForUserClick(k, l);
                }
            },
            appendUserActionIfNew: function j(k, l) {
                if (!l) {
                    c('FunnelLogger').appendActionIfNew(h, k);
                } else c('FunnelLogger').appendActionWithTagIfNew(h, k, l);
            },
            isElementVisible: function j(k) {
                if (!k) return false;
                var l = k.getBoundingClientRect(),
                    m = window.innerHeight || document.documentElement.clientHeight,
                    n = window.innerWidth || document.documentElement.clientWidth,
                    o = k.contains(document.elementFromPoint((l.left + l.right) / 2, (l.top + l.bottom) / 2));
                if (!o) return false;
                return l.top >= 0 && l.bottom <= m && l.left >= 0 && l.right <= n;
            }
        };
    f.exports = i;
}), null);
__d('ExternalWebShareDialogCloseConfirmation', ['Event', 'PlatformDialog', 'Run', 'PlatformShareDialogFunnelLogger'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        init: function i(j, k, l) {
            this._cancelWasClicked = false;
            this._confirmOnClose = j && !!l;
            this._confirmOnCancel = k && !!l;
            c('Run').onBeforeUnload(function() {
                var m = this._shouldShowConfirm() ? l : null;
                this._cancelWasClicked = false;
                return m;
            }.bind(this));
            c('Run').onAfterUnload(function() {
                c('PlatformShareDialogFunnelLogger').endFunnel();
            });
        },
        setCancelButton: function i(j) {
            c('Event').listen(j, 'click', function(k) {
                if (window.opener && this._confirmOnCancel) {
                    this._cancelWasClicked = true;
                    k.kill();
                    window.close();
                }
            }.bind(this));
        },
        _shouldShowConfirm: function i() {
            if (c('PlatformDialog').getInstance().hasBeenSubmitted()) return false;
            if (this._cancelWasClicked) return this._confirmOnCancel;
            return this._confirmOnClose;
        }
    };
    f.exports = h;
}), null);
__d('ExternalWebShareDialogQuoteInformer', ['Arbiter', 'MutationObserver'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        init: function i(j) {
            var k = j.getElementsByClassName('share-quote-text-text');
            if (!k || !k[0]) return;
            var l = k[0];
            if (l.childNodes.length > 0) {
                this._informQuoteState(l);
            } else {
                var m = new(c('MutationObserver'))(function(n) {
                    this._informQuoteState(n[0].target);
                }.bind(this));
                m.observe(l, {
                    childList: true
                });
            }
        },
        _informQuoteState: function i(j) {
            c('Arbiter').inform('isQuoteSet', !!j.textContent, c('Arbiter').BEHAVIOR_STATE);
        }
    };
    f.exports = h;
}), null);
__d('OGComposerActionTypeTypeaheadRenderer', ['cx', 'CSS', 'DOM', 'CompactTypeaheadRenderer'], (function a(b, c, d, e, f, g, h) {
    if (c.__markCompiled) c.__markCompiled();

    function i(j, k) {
        var l = c('CompactTypeaheadRenderer')(j, k);
        c('DOM').prependContent(l, j.icon);
        if (j.type == 'action_type') {
            var m = c('DOM').create('i', {
                className: 'arrowRight'
            });
            c('DOM').prependContent(l, m);
        }
        var n = c('DOM').scry(l, 'span');
        if (n.length == 1) c('CSS').addClass(n[0], "_5lpy");
        return l;
    }
    i.className = "compact _47i9";
    f.exports = i;
}), null);
__d('OGComposerNounTypeaheadMetrics', ['TypeaheadMetrics'], (function a(b, c, d, e, f, g) {
    var h, i;
    if (c.__markCompiled) c.__markCompiled();
    h = babelHelpers.inherits(j, c('TypeaheadMetrics'));
    i = h && h.prototype;
    j.prototype.submit = function() {
        'use strict';
        if ('log_all_sessions' in this.extraData || this.hasStats()) this.stats.at_id = this.data.queryData.at_id;
        i.submit.call(this);
    };

    function j() {
        'use strict';
        h.apply(this, arguments);
    }
    f.exports = j;
}), null);
__d('OGComposerObjectDataSource', ['createArrayFromMixed', 'DataSource'], (function a(b, c, d, e, f, g) {
    var h, i;
    if (c.__markCompiled) c.__markCompiled();
    h = babelHelpers.inherits(j, c('DataSource'));
    i = h && h.prototype;
    j.prototype.addEntries = function(k, l) {
        'use strict';
        var m = this.processEntries(c('createArrayFromMixed')(k || []), l);
        if (l) {
            var n = this.getQueryCache(),
                o = this.tokenizeCache(l).flatValue;
            n[o] = m;
        }
    };

    function j() {
        'use strict';
        h.apply(this, arguments);
    }
    f.exports = j;
}), null);
__d('OGNounTypeaheadView', ['csx', 'cx', 'fbt', 'CSS', 'DOM', 'HubsTypeaheadView', 'ScrollableArea', 'throttle', 'tidyEvent'], (function a(b, c, d, e, f, g, h, i, j) {
    var k, l;
    if (c.__markCompiled) c.__markCompiled();
    var m;
    k = babelHelpers.inherits(n, c('HubsTypeaheadView'));
    l = k && k.prototype;
    n.prototype._bindScrollListener = function() {
        'use strict';
        this._getScrollableArea() && c('tidyEvent')(m.subscribe('scroll', c('throttle')(this._checkScroll.bind(this))));
    };
    n.prototype._checkScroll = function() {
        'use strict';
        var o = this._getLastItemID();
        if (m.isScrolledToBottom() && this._lastItemID !== o) {
            this._lastItemID = o;
            this.inform('scrolledtobottom', {
                scrollableArea: m
            });
        }
    };
    n.prototype._createFreeFormNode = function(o) {
        'use strict';
        return {
            orig_text: o,
            icon: this.defaultIcon,
            text: o,
            type: 'calltoaction'
        };
    };
    n.prototype._getScrollableArea = function() {
        'use strict';
        if (!this._scrollableArea) this._scrollableArea = c('ScrollableArea').getInstance(this.content);
        return m = this._scrollableArea;
    };
    n.prototype._getLastItemID = function() {
        'use strict';
        var o = this.items[this.items.length - 1];
        return o && o.getAttribute('aria-label');
    };
    n.prototype.init = function() {
        'use strict';
        this.content = c('DOM').find(this.element, "div._52yd");
        l.init.call(this);
        c('tidyEvent')([this.subscribe(['render', 'reset'], this._updateView.bind(this)), this.subscribe('highlight', this._scrollIntoView.bind(this)), this.subscribeOnce('render', this._bindScrollListener.bind(this))]);
    };
    n.prototype._scrollIntoView = function(o, p) {
        'use strict';
        if (this._getScrollableArea()) {
            this.ignoreMouseover = true;
            m.scrollIntoView(p.element, false);
        }
    };
    n.prototype.validateQuery = function(o) {
        'use strict';
        if (!this.actionTypeID) return false;
        return this.minQueryLength ? o.length >= this.minQueryLength : true;
    };
    n.prototype.setContext = function(o) {
        'use strict';
        this.defaultIcon = o.default_icon;
        this.actionTypeID = o.uid;
        if (this.actionTypeID.indexOf(':') > -1) this.actionTypeID = o.action_type_id;
        var p = (!this.actionTypeIDsWithNoFreeform || !this.actionTypeIDsWithNoFreeform[this.actionTypeID]) && this.actionTypeID !== '';
        this.alwaysRender = p;
        this.allowFreeform = p;
        this.allowFreeformEntry = p;
    };
    n.prototype._updateView = function() {
        'use strict';
        this._lastItemID = null;
        c('CSS').conditionClass(this.element, "_52yc", this.items.length);
    };
    n.prototype._createCustomAddNode = function() {
        'use strict';
        return {
            text: String(j._("Add your own...")),
            type: 'calltoaction customadd',
            icon: this.defaultIcon
        };
    };
    n.prototype._containCustomAddNode = function(o) {
        'use strict';
        for (var p = 0; p < o.length; p++)
            if (o[p].type === 'calltoaction customadd') return true;
        return false;
    };
    n.prototype._removeCustomAddNode = function(o) {
        'use strict';
        for (var p = 0; p < o.length; p++)
            if (o[p].type === 'calltoaction customadd') o.splice(p, 1);
    };
    n.prototype.render = function(o, p, q) {
        'use strict';
        if (this.allowFreeform && p.length && o === '' && !this._containCustomAddNode(p)) {
            p.push(this._createCustomAddNode());
        } else this._removeCustomAddNode(p);
        return l.render.call(this, o, p, q);
    };
    n.prototype.select = function(o) {
        'use strict';
        var p = this.results[this.index];
        if (p && p.type.match('customadd')) {
            this.causalElement.focus();
            setTimeout(function() {
                return this.layer.hide();
            }.bind(this), 0);
            return;
        }
        if (p) p.actionTypeID = this.actionTypeID;
        return l.select.call(this, o);
    };

    function n() {
        'use strict';
        k.apply(this, arguments);
    }
    f.exports = n;
}), null);
__d('TypeaheadShowBootstrapOnFocus', ['TypeaheadShowResultsOnFocus'], (function a(b, c, d, e, f, g) {
    var h, i;
    if (c.__markCompiled) c.__markCompiled();
    h = babelHelpers.inherits(j, c('TypeaheadShowResultsOnFocus'));
    i = h && h.prototype;

    function j(k) {
        'use strict';
        i.constructor.call(this, k);
        this._uids = [];
    }
    j.prototype.getMaxBootstrapEntries = function() {
        'use strict';
        return 3;
    };
    j.prototype.cacheUids = function() {
        'use strict';
        return true;
    };
    j.prototype.firstFetch = function(k, l, m) {
        'use strict';
        if (!k.bootstrapping) {
            if (this.cacheUids()) this._uids = this.getUidsFromData(m);
            this.respond(l, m);
        }
    };
    j.prototype.respond = function(k, l) {
        'use strict';
        if (!k.getValue()) {
            k.setValue('');
            var m = this.cacheUids() ? this._uids : this.getUidsFromData(l),
                n = l.buildUids(' ', m);
            l.respond('', n);
        }
    };
    j.prototype.getUidsFromData = function(k) {
        'use strict';
        var l = k.getAllEntries(),
            m = [];
        for (var n in l)
            if (l[n].bootstrapped) m.push({
                uid: l[n].uid,
                index: l[n].index
            });
        m.sort(function(o, p) {
            return o.index - p.index;
        });
        if (this.getMaxBootstrapEntries()) m = m.slice(0, this.getMaxBootstrapEntries());
        return m.map(function(o) {
            return o.uid;
        });
    };
    f.exports = j;
}), null);
__d('TypeaheadShowAllBootstrapOnFocus', ['TypeaheadShowBootstrapOnFocus'], (function a(b, c, d, e, f, g) {
    var h, i;
    if (c.__markCompiled) c.__markCompiled();
    h = babelHelpers.inherits(j, c('TypeaheadShowBootstrapOnFocus'));
    i = h && h.prototype;
    j.prototype.getMaxBootstrapEntries = function() {
        'use strict';
        return undefined;
    };
    j.prototype.cacheUids = function() {
        'use strict';
        return false;
    };

    function j() {
        'use strict';
        h.apply(this, arguments);
    }
    f.exports = j;
}), null);
__d('OGComposerObjectTypeaheadRenderer', ['CompactTypeaheadRenderer', 'DOM'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(i, j) {
        var k = c('CompactTypeaheadRenderer')(i, j),
            l = i.icon;
        if (l) c('DOM').prependContent(k, l);
        return k;
    }
    h.className = c('CompactTypeaheadRenderer').className;
    f.exports = h;
}), null);
__d('SharerQuotation', ['DOM', 'CSS'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    var h = null,
        i = null,
        j = {
            addCloseListener: function k(l) {
                l.addEventListener('click', function() {
                    c('CSS').hide(i);
                    if (h) h.value = '';
                });
            },
            init: function k(l, m) {
                if (l.value) {
                    h = l;
                    i = m;
                }
                if (!window.opener) return;
                var n = false,
                    o = null;
                try {
                    n = window.opener.location.pathname.indexOf('/plugins/quote') !== -1;
                    o = window.opener.document.getElementById('quotationtext');
                } catch (p) {}
                if (n && o && o.value) {
                    l.value = o.value;
                    var q = m.getElementsByClassName('share-quote-text-text');
                    c('DOM').setContent(q[0], l.value);
                    c('CSS').show(m);
                    h = l;
                    i = m;
                }
            }
        };
    f.exports = j;
}), null);