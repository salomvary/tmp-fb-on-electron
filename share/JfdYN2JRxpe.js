if (self.CavalryLogger) {
    CavalryLogger.start_js(["TdiVD"]);
}

__d('RespondToRequestButton', ['Arbiter', 'CSS'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    f.exports.subscribeDelete = function(h, i, j) {
        c('Arbiter').subscribe('CONNECTION_REQUEST', function(k, l) {
            if (l.hidden && l.id == h) {
                c('CSS').hide(i);
                c('CSS').show(j);
            }
        });
    };
}), null);
__d('HubsTypeaheadView', ['fbt', 'Arbiter', 'AsyncRequest', 'ContextualTypeaheadView', 'CSS', 'DOM', 'Event', '$'], (function a(b, c, d, e, f, g, h) {
    var i, j;
    if (c.__markCompiled) c.__markCompiled();
    i = babelHelpers.inherits(k, c('ContextualTypeaheadView'));
    j = i && i.prototype;

    function k(l, m) {
        'use strict';
        j.constructor.call(this, l, m);
        if (m.allowDedupe) this.subscribe('select', this.selectDuplicates.bind(this));
    }
    k.prototype.hide = function() {
        'use strict';
        return this.canHide ? j.hide.call(this) : null;
    };
    k.prototype.reset = function() {
        'use strict';
        return this.canHide ? j.reset.call(this) : null;
    };
    k.prototype._createFreeFormNode = function(l) {
        'use strict';
        var m = l;
        if (this.showCreatePrompt) {
            m = h._("Add \"{partial_name}\"", [h.param('partial_name', l)]);
        } else if (this.showAltCreatePrompt) m = h._("Create \"{partial_name}\"", [h.param('partial_name', l)]);
        return {
            text: m,
            orig_text: l,
            type: 'addnew calltoaction',
            uid: '0'
        };
    };
    k.prototype.validateQuery = function(l) {
        'use strict';
        return this.minQueryLength ? l.length >= this.minQueryLength : true;
    };
    k.prototype.render = function(l, m, n) {
        'use strict';
        var o = [],
            p = Math.max(1, Math.floor(m.length / 10));
        for (var q = p; q < m.length; q++)
            if (!!m[q].already_added) {
                o.push(m[q]);
                m.splice(q, 1);
                q--;
            }
        m = m.concat(o);
        if (this.alwaysRender && l !== '')
            if (this.allowFreeformEntry) {
                if (this.validateQuery(l)) m.push(this._createFreeFormNode(l));
            } else {
                var r = l.toLowerCase().trim(),
                    s = false;
                for (var t = 0; t < m.length; t++)
                    if (r == m[t].text.toLowerCase().trim()) {
                        s = true;
                        break;
                    }
                if (!s && this.validateQuery(l)) m.push(this._createFreeFormNode(l));
            }
        var u = m.length;
        for (var v = 0; v < m.length; v++)
            if (m[v].uid == false) u--;
        if (this.allowDedupe && u > 1 && l.length >= 3) m.push({
            text: h._("Mark Duplicate Results"),
            type: 'dupelink calltoaction'
        });
        return j.render.call(this, l, m, n);
    };
    k.prototype.selectDuplicates = function(l, m) {
        'use strict';
        if (!m.selected.type.match('dupelink')) return;
        var n = [];
        for (var o = 0; o < this.results.length; o++) {
            if (this.results[o].uid == false) continue;
            n.push(this.results[o].uid);
        }
        var p = c('Arbiter').subscribe('typeahead/' + this.collectionID + '/confirmDupes', function(q, r) {
            var s = this.results.map(function(v) {
                return v.uid;
            });
            for (var t = 0; t < r.dupe_ids.length; t++) {
                var u = s.indexOf(r.dupe_ids[t]);
                c('CSS').hide(this.items[u]);
            }
            this.hasHiddenDupes = r.dupe_ids.length > 0;
        }.bind(this));
        c('Arbiter').subscribe('typeahead/' + this.collectionID + '/finishDupes', function(q, r) {
            c('Arbiter').unsubscribe(p);
            this.canHide = true;
            this.hasHiddenDupes && c('CSS').hide(c('DOM').find(this.content, '.dupelink'));
            this.hasHiddenDupes = false;
        }.bind(this));
        this.canHide = false;
        new(c('AsyncRequest'))('/ajax/typeahead/quality/duplicates').setData({
            ids: n,
            surface: c('$')('collections_surface').value,
            collection_id: this.collectionID
        }).send();
    };
    k.initFreeformBoxes = function() {
        'use strict';
        var l = c('DOM').scry(document, 'div.fbAddFormDialog')[0];
        if (!l) return;
        var m = c('DOM').find(l, 'form');
        c('Event').listen(m, 'submit', function() {
            c('DOM').scry(m, 'div.fbFreeformInput').forEach(function(n) {
                if (c('DOM').find(n, 'input.inputtext').value) c('CSS').addClass(n.firstChild, 'selected');
            });
        });
    };
    Object.assign(k.prototype, {
        canHide: true,
        hasHiddenDupes: false
    });
    f.exports = k;
}), null);
__d('EscapeHatchFriendReject', ['Arbiter', 'DOM', 'Parent', 'Vector', 'ge'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = 50,
        i = {
            init: function j(k, l, m) {
                c('Arbiter').subscribe('CONNECTION_REQUEST', function(n, o) {
                    var p = c('ge')(k),
                        q = c('Parent').byClass(p, 'actions');
                    if (o.hidden && o.id === l && p) {
                        c('DOM').setContent(c('Parent').byTag(p, 'span'), m);
                        if (q) {
                            var r = q.parentNode,
                                s = c('DOM').find(r, 'div.name'),
                                t = c('Vector').getElementDimensions(r).x - c('Vector').getElementDimensions(s).x - h;
                            q.style.width = t + 'px';
                        }
                    }
                });
            }
        };
    f.exports = i;
}), null);
__d('TimelineBanner', ['csx', 'cx', 'Arbiter', 'ChannelConstants', 'DOM', 'Parent', 'ReloadPage', 'TimelineStickyHeader', 'Vector', 'destroyOnUnload'], (function a(b, c, d, e, f, g, h, i) {
    if (c.__markCompiled) c.__markCompiled();
    var j = "_2vhb",
        k = 50,
        l = {
            init: function m(n, o) {
                var p = c('Arbiter').subscribe(c('ChannelConstants').getArbiterType('friending_state_change'), function(r, s) {
                        if (s.obj.action === 'confirm' && s.obj.userid === n) c('ReloadPage').now();
                    }),
                    q = c('Arbiter').subscribe(c('TimelineStickyHeader').ADJUST_WIDTH, function(r, s) {
                        if (!CSS.matchesSelector(o.parentNode, ".actions")) return;
                        var t = o.parentNode.parentNode,
                            u = c('DOM').scry(o, "._5hb1");
                        if (u.length > 0) {
                            var v = c('Parent').byClass(o, 'actions');
                            if (v) {
                                var w = c('Vector').getElementDimensions(t).x - c('Vector').getElementDimensions(s).x - k;
                                v.style.width = w + 'px';
                            }
                            return;
                        }
                        var x = c('Vector').getElementDimensions(s).x + c('Vector').getElementDimensions(o).x + k > c('Vector').getElementDimensions(t).x;
                        if (!x) return;
                        if (CSS.hasClass(o, j)) return;
                        var y = c('DOM').scry(o, "._2vhc");
                        if (y.length == 0) return;
                        CSS.hide(c('DOM').find(o, "._2vhc"));
                        CSS.hide(c('DOM').find(o, "._2vhd"));
                        CSS.show(c('DOM').find(o, "._2vhe"));
                        CSS.show(c('DOM').find(o, "._2vhf"));
                        CSS.addClass(o, j);
                    });
                c('destroyOnUnload')(function() {
                    p.unsubscribe();
                    q.unsubscribe();
                });
            }
        };
    f.exports = l;
}), null);
__d('FriendRequestDoYouKnow', ['csx', 'Arbiter', 'AsyncRequest', 'CSS', 'DOM', 'ChannelConstants'], (function a(b, c, d, e, f, g, h) {
    if (c.__markCompiled) c.__markCompiled();

    function i(j, k, l) {
        'use strict';
        this.$FriendRequestDoYouKnow1 = j;
        this.$FriendRequestDoYouKnow2 = k;
        this.$FriendRequestDoYouKnow3 = l;
        this.$FriendRequestDoYouKnow4 = c('DOM').find(this.$FriendRequestDoYouKnow1, "._9z");
        this.$FriendRequestDoYouKnow5 = c('DOM').find(this.$FriendRequestDoYouKnow1, "._9-");
        this.$FriendRequestDoYouKnow6 = c('DOM').find(this.$FriendRequestDoYouKnow1, "._5hb1");
        this.$FriendRequestDoYouKnow7 = c('DOM').find(this.$FriendRequestDoYouKnow1, "._5hb2");
        this.$FriendRequestDoYouKnow8 = c('DOM').find(this.$FriendRequestDoYouKnow1, "._a2");
        this.$FriendRequestDoYouKnow9("._5hb3", 'mark_spam', this.$FriendRequestDoYouKnow6, this.$FriendRequestDoYouKnow7);
        this.$FriendRequestDoYouKnow9("._2qk_", 'unmark_spam', this.$FriendRequestDoYouKnow7, this.$FriendRequestDoYouKnow8);
        c('Arbiter').subscribe(c('ChannelConstants').getArbiterType('friending_state_change'), this.$FriendRequestDoYouKnow10.bind(this));
    }
    i.prototype.$FriendRequestDoYouKnow9 = function(j, k, l, m) {
        'use strict';
        c('DOM').find(this.$FriendRequestDoYouKnow1, j).onclick = function() {
            c('CSS').hide(l);
            this.$FriendRequestDoYouKnow11(k, function(n) {
                var o = n.payload;
                if (o.success) {
                    c('CSS').show(m);
                } else {
                    if (o.err) c('DOM').setContent(this.$FriendRequestDoYouKnow4, o.err);
                    c('CSS').show(this.$FriendRequestDoYouKnow4);
                }
            }.bind(this));
        }.bind(this);
    };
    i.prototype.$FriendRequestDoYouKnow11 = function(j, k) {
        'use strict';
        c('CSS').show(this.$FriendRequestDoYouKnow5);
        new(c('AsyncRequest'))().setURI('/requests/friends/ajax/').setData({
            action: j,
            id: this.$FriendRequestDoYouKnow2,
            ref: this.$FriendRequestDoYouKnow3
        }).setTransportErrorHandler(function() {
            c('CSS').hide(this.$FriendRequestDoYouKnow5);
            c('CSS').show(this.$FriendRequestDoYouKnow4);
        }.bind(this)).setHandler(function(l) {
            c('CSS').hide(this.$FriendRequestDoYouKnow5);
            if (k) k(l);
        }.bind(this)).send();
    };
    i.prototype.$FriendRequestDoYouKnow10 = function(j, k) {
        'use strict';
        if (k.obj.userid !== this.$FriendRequestDoYouKnow2) return;
        switch (k.obj.action) {
            case 'mark_spam':
                c('CSS').hide(this.$FriendRequestDoYouKnow6);
                c('CSS').show(this.$FriendRequestDoYouKnow7);
                break;
            case 'unmark_spam':
                c('CSS').hide(this.$FriendRequestDoYouKnow7);
                c('CSS').show(this.$FriendRequestDoYouKnow8);
                break;
            default:
                break;
        }
    };
    f.exports = i;
}), null);
__d('RampUpPendingRequests', ['AsyncRequest', 'CSS', 'DOM'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(i, j, k, l, m, n, o) {
        this._id = k;
        this._ref = l;
        this._friendingLocation = m;
        this._friendingLocationRefs = n;
        this._confirmButton = i;
        this._deleteButton = j;
        this._responseSection = c('DOM').find(this._confirmButton, '^.ruResponse');
        this._userBox = c('DOM').find(this._responseSection, '^.ruUserBox');
        this._deleteButton.onclick = this._delete.bind(this);
        this._confirmButton.onclick = this._confirm.bind(this);
        this._loadingIndicator = c('DOM').find(this._responseSection, '.ruResponseLoading');
        this._viewer_id = o;
    }
    Object.assign(h.prototype, {
        _send: function i(j, k) {
            c('DOM').remove(c('DOM').find(this._responseSection, '.ruResponseButtons'));
            var l = c('DOM').find(this._userBox, '.followUpQuestion'),
                m = c('DOM').find(this._userBox, '.requestInfoContainer');
            if (j === 'reject') {
                c('CSS').hide(m);
                c('DOM').remove(c('DOM').find(this._userBox, '.ruResponseSectionContainer'));
                c('CSS').show(l);
            } else c('CSS').show(this._loadingIndicator);
            var n = new(c('AsyncRequest'))().setURI('/requests/friends/ajax/').setData({
                action: j,
                id: this._id,
                ref: this._ref,
                floc: this._friendingLocation,
                frefs: this._friendingLocationRefs,
                viewer_id: this._viewer_id
            }).setTransportErrorHandler(function() {
                c('DOM').remove(this._loadingIndicator);
                c('DOM').remove(l);
                c('CSS').show(c('DOM').find(this._responseSection, '.ruTransportErrorMsg'));
            }.bind(this));
            if (k) n.setHandler(k);
            n.send();
        },
        _delete: function i() {
            var j = 'reject';
            this._send(j);
        },
        _confirm: function i() {
            this._send('confirm', function(j) {
                c('CSS').hide(this._loadingIndicator);
                var k = j.payload;
                c('DOM').setContent(this._responseSection, k.success ? k.button.markup : k.err);
            }.bind(this));
        }
    });
    Object.assign(h, {
        hookUp: function i(j, k, l, m, n, o, p) {
            new h(j, k, l, m, n, o, p);
        }
    });
    f.exports = h;
}), null);
__d('ClearableTypeahead', ['Event'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        resetOnCloseButtonClick: function i(j, k) {
            c('Event').listen(k, 'click', function() {
                var l = j.getCore();
                l.getElement().focus();
                l.reset();
            });
        }
    };
    f.exports = h;
}), null);
__d('TypeaheadSetPhotoOnSelect', ['CSS', 'DOM', 'Event'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(i) {
        'use strict';
        this._typeahead = i;
    }
    h.prototype.enable = function() {
        'use strict';
        var i = c('DOM').scry(this._typeahead.getElement(), '.photo')[0];
        if (i) {
            if (!c('DOM').isNodeOfType(i, 'img')) {
                var j = c('DOM').create('img', {
                    className: i.className
                });
                c('DOM').replace(i, j);
                i = j;
            }
            var k = c('CSS').hide.bind(null, i),
                l = c('CSS').show.bind(null, i);
            this._eventListener = c('Event').listen(i, {
                load: l,
                error: k,
                abort: k
            });
            this._subscription = this._typeahead.subscribe('select', function(m, n) {
                var o = n.selected.photo || this._typeahead.view.fallbackPhoto;
                o ? i.setAttribute('src', o) : k();
            }.bind(this));
        }
    };
    h.prototype.disable = function() {
        'use strict';
        this._eventListener.remove();
        this._eventListener = null;
        this._typeahead.unsubscribe(this._subscription);
        this._subscription = null;
    };
    Object.assign(h.prototype, {
        _eventListener: null,
        _subscription: null
    });
    f.exports = h;
}), null);
__d('legacy:SetPhotoOnSelectTypeaheadBehavior', ['TypeaheadSetPhotoOnSelect'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    if (!b.TypeaheadBehaviors) b.TypeaheadBehaviors = {};
    b.TypeaheadBehaviors.setPhotoOnSelect = function(h) {
        h.enableBehavior(c('TypeaheadSetPhotoOnSelect'));
    };
}), 3);