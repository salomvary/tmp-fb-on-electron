if (self.CavalryLogger) {
    CavalryLogger.start_js(["Pszbx"]);
}

__d("LocaleSwitchingReferrers", [], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = {
        CARRY_LOGOUT_LOGIN: "carry_logout_login",
        FB4B_GLOBAL_SITES_DIALOG: "fb4b_global_sites_dialog",
        FB4B_GLOBAL_SITES_FOOTER: "fb4b_global_sites_footer",
        LOCALE_SWITCH_SCRIPT: "locale_switch_script",
        M_TOUCH_LOCALE_SELECTOR: "m_touch_locale_selector",
        SAFETY_CENTER_GLOBAL_SITES_FOOTER: "fbsc_global_sites_footer",
        SITEMAP: "sitemap",
        QP_PROMO: "qp_promo",
        WWW_ACCOUNT_SETTINGS: "www_account_settings",
        WWW_CARD_SELECTOR: "www_card_selector",
        WWW_CARD_SELECTOR_MORE: "www_card_selector_more",
        WWW_DEV_SITE: "www_dev_site",
        WWW_HELP_INLINE_SELECTOR: "www_help_inline_selector",
        WWW_I18N_NUB: "www_i18n_nub",
        WWW_LANGUAGE_PAGE: "www_language_page",
        WWW_LINK_DIALOG_SELECTOR: "www_link_dialog_selector",
        WWW_LIST_SELECTOR: "www_list_selector",
        WWW_LIST_SELECTOR_MORE: "www_list_selector_more",
        WWW_TRANS_APP_INCONSISTENT: "www_trans_app_inconsistent",
        FBCOLUMN_FOOTER: "fbcolumn_footer",
        OTHER: "other"
    };
}), null);
__d("ModuleDependencies", [], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(l, m, n) {
        var o = c.__debug.modulesMap[n],
            p = c.__debug.deps;
        if (m[n]) return;
        m[n] = true;
        if (!o) {
            p[n] && (l[n] = true);
            return;
        }
        if (!o.dependencies || !o.dependencies.length) {
            if (o.waiting) l[n] = true;
            return;
        }
        o.dependencies.forEach(function(q) {
            h(l, m, q);
        });
    }

    function i(l) {
        if (c.__debug) {
            var m = {};
            h(m, {}, l);
            var n = Object.keys(m);
            n.sort();
            return n;
        }
        return null;
    }

    function j() {
        var l = {
            loading: {},
            missing: []
        };
        if (!c.__debug) return l;
        var m = {},
            n = c.__debug.getModules(),
            o = c.__debug.deps;
        for (var p in n) {
            var q = n[p];
            if (q.waiting) {
                var r = {};
                h(r, {}, q.id);
                delete r[q.id];
                l.loading[q.id] = Object.keys(r);
                l.loading[q.id].sort();
                l.loading[q.id].forEach(function(s) {
                    if (!(s in n) && o[s]) m[s] = 1;
                });
            }
        }
        l.missing = Object.keys(m);
        l.missing.sort();
        return l;
    }
    var k = {
        setRequireDebug: function l(m) {
            c.__debug = m;
        },
        getMissing: i,
        getNotLoadedModules: j
    };
    f.exports = k;
}), null);
__d('ModuleErrorLogger', ['Bootloader', 'ErrorUtils', 'ModuleDependencies', 'BanzaiScuba'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(k) {
        if (!k || !k.length) return 0;
        return k.reduce(function(l, m) {
            return l + m;
        }) / k.length;
    }

    function i(k) {
        if (!k) return [];
        var l = [];
        for (var m in k) l.push(k[m]);
        return l;
    }
    var j = {
        init: function k() {
            c('ErrorUtils').addListener(function(l) {
                if (l.name !== 'ModuleError') return;
                var m = c('ModuleDependencies').getNotLoadedModules(),
                    n = Object.keys(m.loading),
                    o = i(c('Bootloader').getLoadingUrls()),
                    p = i(c('Bootloader').getLoadedUrlTimes()),
                    q = {};
                m.missing.forEach(function(t) {
                    q[t] = 1;
                });
                var r = {};
                n.forEach(function(t) {
                    r[t] = 1;
                });
                var s = new(c('BanzaiScuba'))('module_errors', null, {
                    addAsnFields: true,
                    addPredictedGeographyFields: true,
                    addBrowserFields: true,
                    addMobileDeviceFields: true,
                    addPageFields: true,
                    addUserFields: true
                });
                s.addNormal('message', l.message).addInteger('missing_count', m.missing.length).addInteger('loading_count', n.length).addInteger('error_url_count', c('Bootloader').getErrorUrls().length).addTagset('missing_modules', q).addTagset('loading_modules', r).addInteger('mean_url_loading_time', Math.floor(h(o))).addInteger('mean_url_loaded_time', Math.floor(h(p))).post();
            }, true);
        }
    };
    f.exports = j;
}), null);
__d('ResetScrollOnUnload', ['Run'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        disableScrollRestoration: function i() {
            c('Run').onUnload(function() {
                window.history.scrollRestoration = 'manual';
            });
        },
        init: function i(j) {
            c('Run').onUnload(function() {
                window.history.scrollRestoration = 'manual';
                j.style.opacity = '0';
                window.scrollTo(0, 0);
            });
        }
    };
    f.exports = h;
}), null);
__d('AccessibilityWebAssistiveTechTypedLogger', ['Banzai', 'GeneratedLoggerUtils', 'nullthrows'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();

    function h() {
        this.clear();
    }
    h.prototype.log = function() {
        c('GeneratedLoggerUtils').log('logger:AccessibilityWebAssistiveTechLoggerConfig', this.$AccessibilityWebAssistiveTechTypedLogger1, c('Banzai').BASIC);
    };
    h.prototype.logVital = function() {
        c('GeneratedLoggerUtils').log('logger:AccessibilityWebAssistiveTechLoggerConfig', this.$AccessibilityWebAssistiveTechTypedLogger1, c('Banzai').VITAL);
    };
    h.prototype.clear = function() {
        this.$AccessibilityWebAssistiveTechTypedLogger1 = {};
        return this;
    };
    h.prototype.updateData = function(j) {
        this.$AccessibilityWebAssistiveTechTypedLogger1 = babelHelpers['extends']({}, this.$AccessibilityWebAssistiveTechTypedLogger1, j);
        return this;
    };
    h.prototype.setIndicatedBrowsers = function(j) {
        this.$AccessibilityWebAssistiveTechTypedLogger1.indicated_browsers = c('GeneratedLoggerUtils').serializeVector(j);
        return this;
    };
    h.prototype.setIsVirtualCursorAction = function(j) {
        this.$AccessibilityWebAssistiveTechTypedLogger1.is_virtual_cursor_action = j;
        return this;
    };
    h.prototype.setVC = function(j) {
        this.$AccessibilityWebAssistiveTechTypedLogger1.vc = j;
        return this;
    };
    h.prototype.updateExtraData = function(j) {
        j = c('nullthrows')(c('GeneratedLoggerUtils').serializeMap(j));
        c('GeneratedLoggerUtils').checkExtraDataFieldNames(j, i);
        this.$AccessibilityWebAssistiveTechTypedLogger1 = babelHelpers['extends']({}, this.$AccessibilityWebAssistiveTechTypedLogger1, j);
        return this;
    };
    h.prototype.addToExtraData = function(j, k) {
        var l = {};
        l[j] = k;
        return this.updateExtraData(l);
    };
    var i = {
        indicated_browsers: true,
        is_virtual_cursor_action: true,
        vc: true
    };
    f.exports = h;
}), null);
__d('AccessibilityWebVirtualCursorClickLogger', ['AccessibilityWebAssistiveTechTypedLogger', 'VirtualCursorStatus'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        init: function i(j) {
            j.forEach(function(k) {
                c('VirtualCursorStatus').add(k, this._log);
            }.bind(this), this);
        },
        _log: function i(j, k) {
            var l = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
            if (j) new(c('AccessibilityWebAssistiveTechTypedLogger'))().setIndicatedBrowsers(k).setIsVirtualCursorAction(l).log();
        }
    };
    f.exports = h;
}), null);
__d('BootloaderEventsTypedLogger', ['Banzai', 'GeneratedLoggerUtils', 'nullthrows'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();

    function h() {
        this.clear();
    }
    h.prototype.log = function() {
        c('GeneratedLoggerUtils').log('bootloader_events:BootloaderEventsLoggerConfig', this.$BootloaderEventsTypedLogger1, c('Banzai').BASIC);
    };
    h.prototype.logVital = function() {
        c('GeneratedLoggerUtils').log('bootloader_events:BootloaderEventsLoggerConfig', this.$BootloaderEventsTypedLogger1, c('Banzai').VITAL);
    };
    h.prototype.clear = function() {
        this.$BootloaderEventsTypedLogger1 = {};
        return this;
    };
    h.prototype.updateData = function(j) {
        this.$BootloaderEventsTypedLogger1 = babelHelpers['extends']({}, this.$BootloaderEventsTypedLogger1, j);
        return this;
    };
    h.prototype.setAllResourcesCount = function(j) {
        this.$BootloaderEventsTypedLogger1.all_resources_count = j;
        return this;
    };
    h.prototype.setAllResourcesDownloaded = function(j) {
        this.$BootloaderEventsTypedLogger1.all_resources_downloaded = j;
        return this;
    };
    h.prototype.setAsyncResourcesCount = function(j) {
        this.$BootloaderEventsTypedLogger1.async_resources_count = j;
        return this;
    };
    h.prototype.setAsyncResourcesDownloaded = function(j) {
        this.$BootloaderEventsTypedLogger1.async_resources_downloaded = j;
        return this;
    };
    h.prototype.setBlEndpointMode = function(j) {
        this.$BootloaderEventsTypedLogger1.bl_endpoint_mode = j;
        return this;
    };
    h.prototype.setBlSampleRate = function(j) {
        this.$BootloaderEventsTypedLogger1.bl_sample_rate = j;
        return this;
    };
    h.prototype.setBlockingResourcesCount = function(j) {
        this.$BootloaderEventsTypedLogger1.blocking_resources_count = j;
        return this;
    };
    h.prototype.setBlockingResourcesDownloaded = function(j) {
        this.$BootloaderEventsTypedLogger1.blocking_resources_downloaded = j;
        return this;
    };
    h.prototype.setCavalryBlCohort = function(j) {
        this.$BootloaderEventsTypedLogger1.cavalry_bl_cohort = j;
        return this;
    };
    h.prototype.setCavalryCohort = function(j) {
        this.$BootloaderEventsTypedLogger1.cavalry_cohort = j;
        return this;
    };
    h.prototype.setComponents = function(j) {
        this.$BootloaderEventsTypedLogger1.components = c('GeneratedLoggerUtils').serializeVector(j);
        return this;
    };
    h.prototype.setDuration = function(j) {
        this.$BootloaderEventsTypedLogger1.duration = j;
        return this;
    };
    h.prototype.setErrCount = function(j) {
        this.$BootloaderEventsTypedLogger1.err_count = j;
        return this;
    };
    h.prototype.setFirstIdenticalRequest = function(j) {
        this.$BootloaderEventsTypedLogger1.first_identical_request = j;
        return this;
    };
    h.prototype.setHasNewComponent = function(j) {
        this.$BootloaderEventsTypedLogger1.has_new_component = j;
        return this;
    };
    h.prototype.setIsEmployee = function(j) {
        this.$BootloaderEventsTypedLogger1.is_employee = j;
        return this;
    };
    h.prototype.setMsSinceNavstart = function(j) {
        this.$BootloaderEventsTypedLogger1.ms_since_navstart = j;
        return this;
    };
    h.prototype.setPkgCohort = function(j) {
        this.$BootloaderEventsTypedLogger1.pkg_cohort = j;
        return this;
    };
    h.prototype.setRef = function(j) {
        this.$BootloaderEventsTypedLogger1.ref = j;
        return this;
    };
    h.prototype.setRequestPath = function(j) {
        this.$BootloaderEventsTypedLogger1.request_path = j;
        return this;
    };
    h.prototype.setRetries = function(j) {
        this.$BootloaderEventsTypedLogger1.retries = j;
        return this;
    };
    h.prototype.setSvnRev = function(j) {
        this.$BootloaderEventsTypedLogger1.svn_rev = j;
        return this;
    };
    h.prototype.setTimesliceContext = function(j) {
        this.$BootloaderEventsTypedLogger1.timeslice_context = j;
        return this;
    };
    h.prototype.setVC = function(j) {
        this.$BootloaderEventsTypedLogger1.vc = j;
        return this;
    };
    h.prototype.setWeight = function(j) {
        this.$BootloaderEventsTypedLogger1.weight = j;
        return this;
    };
    var i = {
        all_resources_count: true,
        all_resources_downloaded: true,
        async_resources_count: true,
        async_resources_downloaded: true,
        bl_endpoint_mode: true,
        bl_sample_rate: true,
        blocking_resources_count: true,
        blocking_resources_downloaded: true,
        cavalry_bl_cohort: true,
        cavalry_cohort: true,
        components: true,
        duration: true,
        err_count: true,
        first_identical_request: true,
        has_new_component: true,
        is_employee: true,
        ms_since_navstart: true,
        pkg_cohort: true,
        ref: true,
        request_path: true,
        retries: true,
        svn_rev: true,
        timeslice_context: true,
        vc: true,
        weight: true
    };
    f.exports = h;
}), null);
__d('performanceNavigationStart', ['performance'], (function a(b, c, d, e, f, g) {
    var h;
    if (c.__markCompiled) c.__markCompiled();
    var i = void 0;
    if (c('performance').now) {
        if (c('performance').timing && c('performance').timing.navigationStart) {
            i = function j() {
                return c('performance').timing.navigationStart;
            };
        } else if (typeof window._cstart === 'number') {
            i = function j() {
                return window._cstart;
            };
        } else(function() {
            var j = Date.now();
            i = function k() {
                return j;
            };
        })();
    } else i = function j() {
        return 0;
    };
    f.exports = i;
}), null);
__d('BootloaderLoggerUtil', ['Arbiter', 'Bootloader', 'BootloaderEventsTypedLogger', 'CurrentUser', 'ScriptPath', 'SiteData', 'performanceNavigationStart'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = null,
        i = {
            initLogging: function j(k) {
                if (h) return;
                h = c('Arbiter').subscribe(c('Bootloader').Events.BOOTLOAD, function(l, m) {
                    var n = m.start_time,
                        o = babelHelpers.objectWithoutProperties(m, ['start_time']),
                        p = Math.round(n - c('performanceNavigationStart')());
                    new(c('BootloaderEventsTypedLogger'))().setMsSinceNavstart(p).setCavalryCohort(k.cavalry_cohort).setPkgCohort(c('SiteData').pkg_cohort).setWeight(k.sample_rate).setIsEmployee(c('CurrentUser').isEmployee()).setSvnRev(c('SiteData').revision).setBlEndpointMode(c('SiteData').be_mode).setRequestPath(c('ScriptPath').getScriptPath()).setCavalryBlCohort(k.cavalry_bl_cohort).setBlSampleRate(k.bl_sample_rate).updateData(o).log();
                });
            }
        };
    f.exports = i;
}), null);
__d('DetectBrokenProxyCache', ['AsyncSignal', 'Cookie', 'URI'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(i, j) {
        var k = c('Cookie').get(j);
        if (k != i && k != null && i != '0') {
            var l = {
                    c: 'si_detect_broken_proxy_cache',
                    m: j + ' ' + i + ' ' + k
                },
                m = new(c('URI'))('/common/scribe_endpoint.php').getQualifiedURI().toString();
            new(c('AsyncSignal'))(m, l).send();
        }
    }
    f.exports = {
        run: h
    };
}), null);
__d('LoggedOutSwitchingLocaleTypedLogger', ['Banzai', 'GeneratedLoggerUtils', 'nullthrows'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();

    function h() {
        this.clear();
    }
    h.prototype.log = function() {
        c('GeneratedLoggerUtils').log('logger:LoggedOutSwitchingLocaleLoggerConfig', this.$LoggedOutSwitchingLocaleTypedLogger1, c('Banzai').BASIC);
    };
    h.prototype.logVital = function() {
        c('GeneratedLoggerUtils').log('logger:LoggedOutSwitchingLocaleLoggerConfig', this.$LoggedOutSwitchingLocaleTypedLogger1, c('Banzai').VITAL);
    };
    h.prototype.clear = function() {
        this.$LoggedOutSwitchingLocaleTypedLogger1 = {};
        return this;
    };
    h.prototype.updateData = function(j) {
        this.$LoggedOutSwitchingLocaleTypedLogger1 = babelHelpers['extends']({}, this.$LoggedOutSwitchingLocaleTypedLogger1, j);
        return this;
    };
    h.prototype.setIndex = function(j) {
        this.$LoggedOutSwitchingLocaleTypedLogger1.index = j;
        return this;
    };
    h.prototype.setNewLocale = function(j) {
        this.$LoggedOutSwitchingLocaleTypedLogger1.new_locale = j;
        return this;
    };
    h.prototype.setOldLocale = function(j) {
        this.$LoggedOutSwitchingLocaleTypedLogger1.old_locale = j;
        return this;
    };
    h.prototype.setReferrer = function(j) {
        this.$LoggedOutSwitchingLocaleTypedLogger1.referrer = j;
        return this;
    };
    var i = {
        index: true,
        new_locale: true,
        old_locale: true,
        referrer: true
    };
    f.exports = h;
}), null);
__d("XIntlAccountSetLocaleAsyncController", ["XController"], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = c("XController").create("\/intl\/ajax\/save_locale\/", {});
}), null);
__d('IntlUtils', ['AsyncRequest', 'Cookie', 'LocaleSwitchingReferrers', 'LoggedOutSwitchingLocaleTypedLogger', 'ReloadPage', 'XIntlAccountSetLocaleAsyncController', 'goURI'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        setXmode: function i(j) {
            new(c('AsyncRequest'))().setURI('/ajax/intl/save_xmode.php').setData({
                xmode: j
            }).setHandler(function() {
                c('ReloadPage').now();
            }).send();
        },
        setAmode: function i(j) {
            new(c('AsyncRequest'))().setURI('/ajax/intl/save_xmode.php').setData({
                amode: j,
                app: false
            }).setHandler(function() {
                c('ReloadPage').now();
            }).send();
        },
        setRmode: function i(j) {
            new(c('AsyncRequest'))().setURI('/ajax/intl/save_xmode.php').setData({
                rmode: j
            }).setHandler(function() {
                c('ReloadPage').now();
            }).send();
        },
        setLocale: function i(j, k, l, m) {
            if (!l) l = j.options[j.selectedIndex].value;
            var n = c('XIntlAccountSetLocaleAsyncController').getURIBuilder().getURI();
            new(c('AsyncRequest'))().setURI(n).setData({
                loc: l,
                ref: k,
                should_redirect: false
            }).setHandler(function(o) {
                c('ReloadPage').now();
            }).send();
        },
        setCookieLocale: function i(j, k, l) {
            var m = arguments.length <= 3 || arguments[3] === undefined ? c('LocaleSwitchingReferrers').OTHER : arguments[3],
                n = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];
            c('Cookie').set('locale', j, 7 * 24 * 3600000);
            new(c('LoggedOutSwitchingLocaleTypedLogger'))().setNewLocale(j).setOldLocale(k).setIndex(n).setReferrer(m).log();
            c('goURI')(l);
        }
    };
    f.exports = h;
}), null);
__d('legacy:intl-base', ['IntlUtils'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    b.intl_set_xmode = c('IntlUtils').setXmode;
    b.intl_set_amode = c('IntlUtils').setAmode;
    b.intl_set_rmode = c('IntlUtils').setRmode;
    b.intl_set_locale = c('IntlUtils').setLocale;
}), 3);
__d('FormTypeABTester', ['Base64', 'Event'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(i) {
        var j = 16,
            k = 32,
            l = 65,
            m = 90,
            n = 48,
            o = 57,
            p = 58,
            q = 63,
            r = 91,
            s = 94,
            t = 0,
            u = 0,
            v = 0,
            w = 0,
            x = [],
            y = null,
            z = [],
            aa = [],
            ba = [],
            ca = [];
        for (var da = 0; da < 10; da++) {
            z.push(0);
            aa.push(0);
        }
        for (var ea = 0; ea < 10; ea++) {
            aa.push(0);
            ba.push(0);
            ca.push(0);
        }
        var fa = function ia(ja) {
                var ka = window.event ? Date.now() : ja.timeStamp,
                    la = window.event ? window.event.keyCode : ja.which;
                la %= 128;
                if (la >= l && la <= m || la == k) {
                    t++;
                } else if (la >= n && la <= o) {
                    u++;
                } else if (la >= p && la <= q || la >= r && la <= s) {
                    v++;
                } else w++;
                x[la] = ka;
                if (y) {
                    var ma = ka - y;
                    if (ma >= 0 && (la >= l && la <= m || la == k))
                        if (ma < 400) {
                            aa[Math.floor(ma / 20)]++;
                        } else if (ma < 1000) {
                        ba[Math.floor((ma - 400) / 60)]++;
                    } else if (ma < 3000) ca[Math.floor((ma - 1000) / 200)]++;
                }
                y = ka;
            },
            ga = function ia(ja) {
                var ka = window.event ? Date.now() : ja.timeStamp,
                    la = window.event ? window.event.keyCode : ja.which,
                    ma = ka - x[la % 128];
                if (ma >= 50 && ma < 250) z[Math.floor((ma - 50) / 20)]++;
            },
            ha = function ia(ja) {
                var ka = Math.max.apply(Math, ja),
                    la = [];
                ja.forEach(function(ma) {
                    la.push(Math.floor(ma * 63 / (ka || 1)));
                });
                return la;
            };
        this.getDataVect = function() {
            var ia = aa.concat(ba, ca);
            return ha(ia).concat(ha(z), [t / 2, u / 2, v / 2, w / 2]);
        };
        this.getData = function() {
            return c('Base64').encodeNums(this.getDataVect());
        };
        c('Event').listen(i, {
            keyup: ga.bind(this),
            keydown: fa.bind(this)
        });
    }
    f.exports = h;
}), null);
__d('legacy:onload-action', ['PageHooks'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    b._domreadyHook = c('PageHooks')._domreadyHook;
    b._onloadHook = c('PageHooks')._onloadHook;
    b.runHook = c('PageHooks').runHook;
    b.runHooks = c('PageHooks').runHooks;
    b.keep_window_set_as_loaded = c('PageHooks').keepWindowSetAsLoaded;
}), 3);
__d('FlipDirection', ['DOM', 'Input', 'Style'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        setDirection: function i(j) {
            var k = c('DOM').isNodeOfType(j, 'input') && j.type == 'text',
                l = c('DOM').isNodeOfType(j, 'textarea');
            if (!(k || l) || j.getAttribute('data-prevent-auto-flip')) return;
            var m = c('Input').getValue(j),
                n = j.style && j.style.direction;
            if (!n) {
                var o = 0,
                    p = true;
                for (var q = 0; q < m.length; q++) {
                    var r = m.charCodeAt(q);
                    if (r >= 48) {
                        if (p) {
                            p = false;
                            o++;
                        }
                        if (r >= 1470 && r <= 1920) {
                            c('Style').set(j, 'direction', 'rtl');
                            j.setAttribute('dir', 'rtl');
                            return;
                        }
                        if (o == 5) {
                            c('Style').set(j, 'direction', 'ltr');
                            j.setAttribute('dir', 'ltr');
                            return;
                        }
                    } else p = true;
                }
            } else if (m.length === 0) {
                c('Style').set(j, 'direction', '');
                j.removeAttribute('dir');
            }
        }
    };
    f.exports = h;
}), null);
__d('FlipDirectionOnKeypress', ['Event', 'FlipDirection'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = function i(event) {
        var j = event.getTarget();
        c('FlipDirection').setDirection(j);
    };
    c('Event').listen(document.documentElement, {
        keyup: h,
        input: h
    });
}), null);
__d('FourOhFourJSTypedLogger', ['Banzai', 'GeneratedLoggerUtils', 'nullthrows'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();

    function h() {
        this.clear();
    }
    h.prototype.log = function() {
        c('GeneratedLoggerUtils').log('logger:FourOhFourJSLoggerConfig', this.$FourOhFourJSTypedLogger1, c('Banzai').BASIC);
    };
    h.prototype.logVital = function() {
        c('GeneratedLoggerUtils').log('logger:FourOhFourJSLoggerConfig', this.$FourOhFourJSTypedLogger1, c('Banzai').VITAL);
    };
    h.prototype.clear = function() {
        this.$FourOhFourJSTypedLogger1 = {};
        return this;
    };
    h.prototype.updateData = function(j) {
        this.$FourOhFourJSTypedLogger1 = babelHelpers['extends']({}, this.$FourOhFourJSTypedLogger1, j);
        return this;
    };
    h.prototype.setFbid = function(j) {
        this.$FourOhFourJSTypedLogger1.fbid = j;
        return this;
    };
    h.prototype.setOriginalURI = function(j) {
        this.$FourOhFourJSTypedLogger1.original_uri = j;
        return this;
    };
    h.prototype.setScriptPath = function(j) {
        this.$FourOhFourJSTypedLogger1.script_path = j;
        return this;
    };
    h.prototype.updateExtraData = function(j) {
        j = c('nullthrows')(c('GeneratedLoggerUtils').serializeMap(j));
        c('GeneratedLoggerUtils').checkExtraDataFieldNames(j, i);
        this.$FourOhFourJSTypedLogger1 = babelHelpers['extends']({}, this.$FourOhFourJSTypedLogger1, j);
        return this;
    };
    h.prototype.addToExtraData = function(j, k) {
        var l = {};
        l[j] = k;
        return this.updateExtraData(l);
    };
    var i = {
        fbid: true,
        original_uri: true,
        script_path: true
    };
    f.exports = h;
}), null);
__d("XConsentCookieController", ["XController"], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = c("XController").create("\/cookie\/consent\/", {
        pv: {
            type: "Enum",
            enumType: 0
        }
    });
}), null);
__d('DeferredCookie', ['AsyncRequest', 'Cookie', 'Map', 'XConsentCookieController'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    var h = new(c('Map'))(),
        i = {
            shouldAddDefaultListener: true,
            defaultHandler: null,
            autoFlushCookies: false,
            sentConsentToServer: false,
            addToQueue: function j(k, l, m, n, o, p, q) {
                if (this.autoFlushCookies) {
                    if (p) {
                        c('Cookie').setIfFirstPartyContext(k, l, m, n, o);
                    } else c('Cookie').set(k, l, m, n, o);
                    return;
                }
                if (h.has(k)) return;
                h.set(k, {
                    name: k,
                    value: l,
                    nMilliSecs: m,
                    path: n,
                    secure: o,
                    firstPartyOnly: p
                });
                if (q) this.addDefaultInteractionListener();
            },
            flushAllCookies: function j() {
                h.forEach(function(l, m) {
                    if (l.firstPartyOnly) {
                        c('Cookie').setIfFirstPartyContext(l.name, l.value, l.nMilliSecs, l.path, l.secure);
                    } else c('Cookie').set(l.name, l.value, l.nMilliSecs, l.path, l.secure);
                });
                this.autoFlushCookies = true;
                h = new(c('Map'))();
                if (!this.sentConsentToServer) {
                    this.sentConsentToServer = true;
                    var k = c('XConsentCookieController').getURIBuilder().setEnum('pv', this.getNoticePolicyVersion()).getURI();
                    new(c('AsyncRequest'))().setURI(k).send();
                }
                this.removeDefaultInteractionListener();
            },
            getNoticePolicyVersion: function j() {
                try {
                    var l = document.getElementById('cpn-pv-link');
                    if (!l) return '1';
                    return l.getAttribute('data-pv');
                } catch (k) {
                    return '1';
                }
            },
            removeDefaultInteractionListener: function j() {
                if (this.defaultHandler) {
                    if (window.removeEventListener) {
                        window.removeEventListener('click', this.defaultHandler, true);
                    } else if (document.detachEvent) document.detachEvent('onclick', this.defaultHandler);
                    this.defaultHandler = null;
                }
            },
            addDefaultInteractionListener: function j() {
                if (this.shouldAddDefaultListener) {
                    this.shouldAddDefaultListener = false;
                    this.defaultHandler = this.baseInteractionHandler.bind(this);
                    if (window.addEventListener) {
                        window.addEventListener('click', this.defaultHandler, true);
                    } else if (document.attachEvent) document.attachEvent('onclick', this.defaultHandler);
                }
            },
            baseInteractionHandler: function j() {
                this.flushAllCookies();
            }
        };
    f.exports = i;
}), null);
__d('LoginFormController', ['Event', 'ge', 'Button', 'Cookie', 'DeferredCookie', 'FormTypeABTester'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    g.init = function(h, i, j, k) {
        if (k) var l = new(c('FormTypeABTester'))(h);
        c('Event').listen(h, 'submit', function() {
            if (k && h.ab_test_data) h.ab_test_data.value = l.getData();
            if (window.__cookieReload) window.clearInterval(window.__cookieReload);
            c('Button').setEnabled(i, false);
            setTimeout(c('Button').setEnabled.bind(null, i, true), 15000);
            c('DeferredCookie').flushAllCookies();
        });
        var m = c('ge')('lgnjs');
        if (m) {
            var n = Math.floor(Date.now() / 1000);
            m.value = n;
        }
        var o = parseInt(c('Cookie').get('m_ts'), 10),
            p = j != null;
        if (o > n - 60) p = false;
        if (p) {
            var q, r = function s() {
                if (c('Cookie').get('c_user') != null) {
                    window.clearInterval(q);
                    c('Cookie').set('m_ts', Math.floor(Date.now() / 1000), null, '/', false);
                    window.location.href = j;
                }
            };
            q = window.setInterval(r, 1000);
            r();
        }
    };
}), null);
__d('AccessibilityLogger', ['AsyncSignal', 'Cookie'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        COOKIE: 'a11y',
        DECAY_MS: 6 * 60 * 60 * 1000,
        DEFAULT: {
            sr: 0,
            'sr-ts': Date.now(),
            jk: 0,
            'jk-ts': Date.now(),
            kb: 0,
            'kb-ts': Date.now(),
            hcm: 0,
            'hcm-ts': Date.now()
        },
        getCookie: function i() {
            var j = h.DEFAULT,
                k = c('Cookie').get(h.COOKIE);
            if (k) {
                k = JSON.parse(k);
                for (var l in j)
                    if (l in k) j[l] = k[l];
            }
            return j;
        },
        logKey: function i(j, k) {
            var l = h.getCookie();
            l[j]++;
            var m = Date.now();
            if (m - l[j + '-ts'] > h.DECAY_MS) {
                new(c('AsyncSignal'))('/ajax/accessibilitylogging', {
                    eventName: k,
                    times_pressed: l[j]
                }).send();
                l[j + '-ts'] = m;
                l[j] = 0;
            }
            c('Cookie').set(h.COOKIE, JSON.stringify(l));
        },
        logHCM: function i() {
            h.logKey('hcm', 'hcm_users');
        },
        logSRKey: function i() {
            h.logKey('sr', 'sr_users');
        },
        logJKKey: function i() {
            h.logKey('jk', 'jk_users');
        },
        logFocusIn: function i() {
            h.logKey('kb', 'kb_users');
        }
    };
    f.exports = h;
}), null);
__d('AsyncRequestNectarLogging', ['AsyncRequest', 'Nectar'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    Object.assign(c('AsyncRequest').prototype, {
        setNectarModuleData: function h(i) {
            if (this.method == 'POST') c('Nectar').addModuleData(this.data, i);
        },
        setNectarImpressionId: function h() {
            if (this.method == 'POST') c('Nectar').addImpressionID(this.data);
        }
    });
}), null);
__d('ClickRefUtils', ['DataAttributeUtils'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        get_intern_ref: function i(j) {
            if (!!j) {
                var k = {
                    profile_minifeed: 1,
                    gb_content_and_toolbar: 1,
                    gb_muffin_area: 1,
                    ego: 1,
                    bookmarks_menu: 1,
                    jewelBoxNotif: 1,
                    jewelNotif: 1,
                    BeeperBox: 1,
                    searchBarClickRef: 1
                };
                for (var l = j; l && l != document.body; l = l.parentNode) {
                    if (!l.id || typeof l.id !== 'string') continue;
                    if (l.id.substr(0, 8) == 'pagelet_') return l.id.substr(8);
                    if (l.id.substr(0, 8) == 'box_app_') return l.id;
                    if (k[l.id]) return l.id;
                }
            }
            return '-';
        },
        get_href: function i(j) {
            var k = j.getAttribute && (j.getAttribute('ajaxify') || j.getAttribute('data-endpoint')) || j.action || j.href || j.name;
            return typeof k === 'string' ? k : null;
        },
        should_report: function i(j, k) {
            if (k == 'FORCE') return true;
            if (k == 'INDIRECT') return false;
            return j && (h.get_href(j) || j.getAttribute && c('DataAttributeUtils').getDataFt(j));
        }
    };
    f.exports = h;
}), null);
__d("setUECookie", ["Env"], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(i) {
        if (!c("Env").no_cookies) document.cookie = "act=" + encodeURIComponent(i) + "; path=/; domain=" + window.location.hostname.replace(/^.*(\.facebook\..*)$/i, '$1');
    }
    f.exports = h;
}), null);
__d('ClickRefLogger', ['Arbiter', 'Banzai', 'ClickRefUtils', 'Env', 'ScriptPath', 'SessionName', 'Vector', '$', 'collectDataAttributes', 'ge', 'pageID', 'setUECookie'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        delay: 0,
        retry: true
    };

    function i(m) {
        if (!c('ge')('content')) return [0, 0, 0, 0];
        var n = c('$')('content'),
            o = c('Vector').getEventPosition(m);
        return [o.x, o.y, n.offsetLeft, n.clientWidth];
    }

    function j(m, n, event, o) {
        var p = 'r',
            q = [0, 0, 0, 0],
            r, s;
        if (!!event) {
            r = event.type;
            if (r == 'click' && c('ge')('content')) q = i(event);
            var t = 0;
            event.ctrlKey && (t += 1);
            event.shiftKey && (t += 2);
            event.altKey && (t += 4);
            event.metaKey && (t += 8);
            if (t) r += t;
        }
        if (!!n) s = c('ClickRefUtils').get_href(n);
        var u = c('collectDataAttributes')(!!event ? event.target || event.srcElement : n, ['ft', 'gt']);
        Object.assign(u.ft, o.ft);
        Object.assign(u.gt, o.gt);
        if (typeof u.ft.ei === 'string') delete u.ft.ei;
        var v = [m._ue_ts, m._ue_count, s || '-', m._context, r || '-', c('ClickRefUtils').get_intern_ref(n), p, b.URI ? b.URI.getRequestURI(true, true).getUnqualifiedURI().toString() : location.pathname + location.search + location.hash, u].concat(q).concat(c('pageID')).concat(c('ScriptPath').getScriptPath());
        return v;
    }
    c('Arbiter').subscribe("ClickRefAction/new", function(m, n) {
        if (c('ClickRefUtils').should_report(n.node, n.mode)) {
            var o = j(n.cfa, n.node, n.event, n.extra_data);
            c('setUECookie')(n.cfa.ue);
            var p = [c('SessionName').getName(), Date.now(), 'act'];
            c('Banzai').post('click_ref_logger', Array.prototype.concat(p, o), h);
        }
    });

    function k(m) {
        function n(v) {
            var w = '';
            for (var x = 0; x < v.length; x++) w += String.fromCharCode(1 ^ v.charCodeAt(x));
            return w;
        }

        function o(v, w, x, y) {
            var z = w[x];
            if (z && v && z in v)
                if (x + 1 < w.length) {
                    o(v[z], w, x + 1, y);
                } else {
                    var aa = v[z],
                        ba = function ca() {
                            setTimeout(y.bind(null, arguments));
                            return aa.apply(this, arguments);
                        };
                    ba.toString = aa.toString.bind(aa);
                    Object.defineProperty(v, z, {
                        configurable: false,
                        writable: true,
                        value: ba
                    });
                }
        }
        var p = {},
            q = {},
            r = false;

        function s(v, w) {
            if (q[v]) return;
            q[v] = p[v] = 1;
        }
        var t = m[n('jiri')];
        if (t) {
            var u = [];
            n(t).split(',').map(function(v, w) {
                var x = v.substring(1).split(':'),
                    y;
                switch (v.charAt(0)) {
                    case '1':
                        y = new RegExp('\\b(' + x[0] + ')\\b', 'i');
                        u.push(function(z) {
                            var aa = y.exec(Object.keys(window));
                            if (aa) s(w, '' + aa);
                        });
                        break;
                    case '2':
                        y = new RegExp(x[0]);
                        o(window, x, 2, function(z) {
                            var aa = z[x[1]];
                            if (typeof aa === 'string' && y.test(aa)) s(w, v);
                        });
                        break;
                    case '3':
                        o(window, x, 0, function() {
                            for (var z = u.length; z--;) u[z]();
                            var aa = Object.keys(p);
                            if (aa.length) {
                                p = {};
                                setTimeout(c('Banzai')[n('qnru')].bind(c('Banzai'), n('islg'), {
                                    m: '' + aa
                                }), 5000);
                            }
                        });
                        break;
                    case '4':
                        r = true;
                        break;
                }
            });
        }
    }
    try {
        k(c('Env'));
    } catch (l) {}
}), null);
__d('DimensionTracking', ['Cookie', 'Event', 'debounce', 'getViewportDimensions', 'isInIframe'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h() {
        var i = c('getViewportDimensions')();
        c('Cookie').set('wd', i.width + 'x' + i.height);
    }
    if (!c('isInIframe')()) {
        setTimeout(h, 100);
        c('Event').listen(window, 'resize', c('debounce')(h, 250));
        c('Event').listen(window, 'focus', h);
    }
}), null);
__d('FourOhFourJSLogger', ['FourOhFourJSTypedLogger', 'ScriptPath'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        log: function i() {
            window.onload = function() {
                var j = new(c('FourOhFourJSTypedLogger'))();
                j.setOriginalURI(window.location.href);
                j.setScriptPath(c('ScriptPath').getScriptPath());
                j.logVital();
            };
        }
    };
    f.exports = h;
}), null);
__d('HighContrastMode', ['AccessibilityLogger', 'CSS', 'CurrentUser', 'DOM', 'Style', 'URI', 'emptyFunction'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        init: function i(j) {
            var k = new(c('URI'))(window.location.href);
            if (k.getPath().indexOf('/intern/') === 0) return;
            if (window.top !== window.self) return;
            var l = c('DOM').create('div');
            c('DOM').appendContent(document.body, l);
            l.style.cssText = 'border: 1px solid !important;' + 'border-color: red green !important;' + 'position: fixed;' + 'height: 5px;' + 'top: -999px;' + 'background-image: url(' + j.spacerImage + ') !important;';
            var m = c('Style').get(l, 'background-image'),
                n = c('Style').get(l, 'border-top-color'),
                o = c('Style').get(l, 'border-right-color'),
                p = n == o && m && (m == 'none' || m == 'url(invalid-url:)');
            if (p) {
                c('CSS').conditionClass(document.documentElement, 'highContrast', p);
                if (c('CurrentUser').getID()) c('AccessibilityLogger').logHCM();
            }
            c('DOM').remove(l);
            h.init = c('emptyFunction');
        }
    };
    f.exports = h;
}), null);
__d('PopoverAsyncMenu', ['Bootloader', 'Event', 'KeyStatus', 'PopoverMenu', 'VirtualCursorStatus', 'setImmediate'], (function a(b, c, d, e, f, g) {
    var h, i;
    if (c.__markCompiled) c.__markCompiled();
    var j = {},
        k = 0;
    h = babelHelpers.inherits(l, c('PopoverMenu'));
    i = h && h.prototype;

    function l(m, n, o, p, q, r) {
        'use strict';
        i.constructor.call(this, m, n, null, q);
        this._endpoint = p;
        this._endpointData = r || {};
        this._loadingMenu = o;
        this._instanceId = k++;
        j[this._instanceId] = this;
        this._mouseoverListener = c('Event').listen(n, 'mouseover', this.fetchMenu.bind(this));
    }
    l.prototype._onLayerInit = function() {
        'use strict';
        if (!this._menu && this._loadingMenu) this.setMenu(this._loadingMenu);
        this._popover.getLayer().subscribe('key', this._handleKeyEvent.bind(this));
        this._triggerInfo = {
            isKeyDown: c('KeyStatus').isKeyDown(),
            isVirtualCursorTriggered: c('VirtualCursorStatus').isVirtualCursorTriggered()
        };
        c('setImmediate')(function() {
            return this.fetchMenu();
        }.bind(this));
    };
    l.prototype._onPopoverHide = function() {
        'use strict';
        i._onPopoverHide.call(this);
        this._triggerInfo = null;
    };
    l.prototype.fetchMenu = function() {
        'use strict';
        if (this._fetched) return;
        c('Bootloader').loadModules(["AsyncRequest"], function(m) {
            new m().setURI(this._endpoint).setData(Object.assign({
                pmid: this._instanceId
            }, this._endpointData)).send();
        }.bind(this), 'PopoverAsyncMenu');
        this._fetched = true;
        if (this._mouseoverListener) {
            this._mouseoverListener.remove();
            this._mouseoverListener = null;
        }
    };
    l.prototype._setFocus = function(m) {
        'use strict';
        var n = this._triggerInfo || {},
            o = n.isKeyDown,
            p = n.isVirtualCursorTriggered;
        this.setInitialFocus(m, o || p);
        this._triggerInfo = null;
    };
    l.setMenu = function(m, n) {
        'use strict';
        var o = j[m];
        o.setMenu(n);
        o._setFocus(n);
    };
    l.getInstance = function(m) {
        'use strict';
        return j[m];
    };
    l.getInstanceByTriggerElem = function(m) {
        'use strict';
        var n = null;
        Object.keys(j).forEach(function(o) {
            if (j[o]._triggerElem == m) n = j[o];
        });
        return n;
    };
    f.exports = l;
}), null);
__d("ScreenDimensionsAutoSet", [], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h() {
        if (!window.btoa) return '';
        var j = {
            w: screen.width,
            h: screen.height,
            aw: screen.availWidth,
            ah: screen.availHeight,
            c: screen.colorDepth
        };
        return btoa(JSON.stringify(j));
    }
    var i = {
        setInputValue: function j(k) {
            k.value = h();
        }
    };
    f.exports = i;
}), null);
__d('StringTransformations', [], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    f.exports = {
        unicodeEscape: function h(i) {
            return i.replace(/[^A-Za-z0-9\-\.\:\_\$\/\+\=]/g, function(j) {
                var k = j.charCodeAt().toString(16);
                return '\\u' + ('0000' + k.toUpperCase()).slice(-4);
            });
        },
        unicodeUnescape: function h(i) {
            return i.replace(/(\\u[0-9A-Fa-f]{4})/g, function(j) {
                return String.fromCharCode(parseInt(j.slice(2), 16));
            });
        }
    };
}), null);
__d('TimeSpentArray', ['Banzai', 'pageID', 'setTimeoutAcrossTransitions'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = 2,
        i = h * 32,
        j, k, l, m, n, o, p, q, r, s = {},
        t;

    function u() {
        return {
            timeoutDelayMap: s,
            nextDelay: t,
            timeoutInSeconds: l
        };
    }

    function v() {
        if (j) {
            var da = Date.now();
            if (da > n) p = Math.min(i, Math.ceil(da / 1000 - m));
            var ea = aa();
            if (ea) j(ea, t);
        }
        z();
    }

    function w() {
        x();
        k = c('setTimeoutAcrossTransitions')(v, l * 1000);
    }

    function x() {
        if (k) {
            clearTimeout(k);
            k = null;
        }
    }

    function y(da) {
        m = da;
        n = m * 1000;
        o = [1];
        for (var ea = 1; ea < h; ea++) o.push(0);
        p = 1;
        q += 1;
        r += 1;
        var fa = r.toString() + '_delay';
        t = s[fa];
        if (t === undefined) t = s.delay;
        var ga = r.toString() + '_timeout',
            ha = s[ga];
        if (ha === undefined) ha = s.timeout;
        ha = Math.min(ha, i);
        l = ha || i;
        w();
    }

    function z() {
        x();
        o = null;
    }

    function aa() {
        if (!o) return null;
        return {
            tos_id: c('pageID'),
            start_time: m,
            tos_array: o.slice(0),
            tos_len: p,
            tos_seq: r,
            tos_cum: q
        };
    }

    function ba(da) {
        if (da >= n && da - n < 1000) return;
        ca(Math.floor(da / 1000));
    }

    function ca(da) {
        var ea = da - m;
        if (ea < 0 || ea >= i) v();
        if (!o) {
            y(da);
        } else {
            o[ea >> 5] |= 1 << (ea & 31);
            p = ea + 1;
            q += 1;
            n = da * 1000;
        }
    }
    f.exports = {
        init: function da(ea, fa, ga) {
            q = 0;
            r = -1;
            j = ea;
            if (typeof fa == 'object' && fa !== null) {
                s = fa;
            } else s = {};
            if (!ga) ga = Date.now();
            y(Math.floor(ga / 1000));
            c('Banzai').subscribe(c('Banzai').SHUTDOWN, v);
        },
        update: function da(ea) {
            ba(ea);
        },
        get: function da() {
            return aa();
        },
        ship: function da() {
            v();
        },
        reset: function da() {
            z();
        },
        testState: function da() {
            return u();
        }
    };
}), null);
__d('TimeSpentImmediateActiveSecondsLogger', ['Banzai', 'ImmediateActiveSecondsConfig', 'ScriptPath'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = 'immediate_active_seconds',
        i = {
            signal: true,
            retry: true
        },
        j = c('ImmediateActiveSecondsConfig').sampling_rate,
        k = c('ImmediateActiveSecondsConfig').ias_bucket,
        l = 0;

    function m(q) {
        if (j <= 0) return false;
        var r = Math.floor(q / 1000) % j;
        return r === k;
    }

    function n(q) {
        if (q >= l && q - l < 1000) return;
        if (m(q)) {
            var r = {
                activity_time_ms: q,
                last_activity_time_ms: l,
                script_path: c('ScriptPath').getTopViewEndpoint()
            };
            try {
                c('Banzai').post(h, r, i);
            } catch (s) {}
        }
        l = Math.floor(q / 1000) * 1000;
    }

    function o(event, q, r) {
        if (s < 0 || t < 0 || s > t) return;
        var s = Math.floor(q / 1000),
            t = Math.floor(r / 1000);
        if (!p(s, t)) return;
        var u = {
            event: event,
            start_time_ms: q,
            end_time_ms: r
        };
        c('Banzai').post(h, u, i);
    }

    function p(q, r) {
        if (j <= 0) return false;
        if (r - q >= j) return true;
        var s = q + (k - q % j + j) % j;
        return s <= r;
    }
    f.exports = {
        maybeReportActiveSecond: n,
        maybeReportActiveInterval: o
    };
}), null);
__d('TimeSpentBitArrayLogger', ['Arbiter', 'Banzai', 'BanzaiODS', 'TimeSpentArray', 'TimeSpentConfig', 'TimeSpentImmediateActiveSecondsLogger', 'UserActivity', 'isInIframe'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        delay: c('Banzai').BASIC.delay,
        retry: true
    };

    function i(j, k) {
        c('Arbiter').inform('timespent/tosbitdataposted', babelHelpers['extends']({}, j));
        if (typeof k == 'number') {
            h.delay = k;
        } else h.delay = c('Banzai').BASIC.delay;
        c('Banzai').post('time_spent_bit_array', babelHelpers['extends']({}, j), h);
        h.delay = c('TimeSpentConfig').delay;
    }
    f.exports = {
        init: function j(k) {
            if (c('isInIframe')()) return;
            c('UserActivity').subscribe(function(m, n) {
                var o = n.last_inform;
                c('TimeSpentArray').update(o);
                c('TimeSpentImmediateActiveSecondsLogger').maybeReportActiveSecond(o);
            });
            var l = Date.now();
            c('TimeSpentArray').init(i, c('TimeSpentConfig'), l);
            c('TimeSpentImmediateActiveSecondsLogger').maybeReportActiveSecond(l);
            c('BanzaiODS').bumpEntityKey('ms.time_spent.qa.www', 'time_spent.bits.js_initialized');
        }
    };
}), null);
__d('UserActionHistory', ['Arbiter', 'ClickRefUtils', 'ScriptPath', 'throttle', 'WebStorage'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
            click: 1,
            submit: 1
        },
        i = false,
        j = {
            log: [],
            len: 0
        },
        k = c('throttle').acrossTransitions(function() {
            try {
                i._ua_log = JSON.stringify(j);
            } catch (n) {
                i = false;
            }
        }, 1000);

    function l() {
        var n = c('WebStorage').getSessionStorage();
        if (n) {
            i = n;
            i._ua_log && (j = JSON.parse(i._ua_log));
        } else i = false;
        j.log[j.len % 10] = {
            ts: Date.now(),
            path: '-',
            index: j.len,
            type: 'init',
            iref: '-'
        };
        j.len++;
        c('Arbiter').subscribe("UserAction/new", function(o, p) {
            var q = p.ua,
                r = p.node,
                event = p.event;
            if (!event || !(event.type in h)) return;
            var s = {
                path: c('ScriptPath').getScriptPath(),
                type: event.type,
                ts: q._ue_ts,
                iref: c('ClickRefUtils').get_intern_ref(r) || '-',
                index: j.len
            };
            j.log[j.len++ % 10] = s;
            i && k();
        });
    }

    function m() {
        return j.log.sort(function(n, o) {
            return o.ts != n.ts ? o.ts - n.ts : o.index - n.index;
        });
    }
    l();
    f.exports = {
        getHistory: m
    };
}), null);
__d('KappaWrapper', ['AsyncSignal', 'setTimeoutAcrossTransitions'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = false;
    f.exports = {
        forceStart: function i(j, k, l) {
            var m = 0,
                n = function o() {
                    new(c('AsyncSignal'))('/si/kappa/', {
                        Ko: "a"
                    }).send();
                    if (++m < j) c('setTimeoutAcrossTransitions')(o, k * 1000);
                };
            c('setTimeoutAcrossTransitions')(n, (k + l) * 1000);
        },
        start: function i(j, k, l) {
            if (!h) {
                h = true;
                this.forceStart(j, k, l);
            }
        }
    };
}), null);
/**
 * @providesModule sha256
 * @preserve-header
 *
 * Copyright (c) 2003, Christoph Bichlmeier
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the copyright holder nor the names of contributors
 *    may be used to endorse or promote products derived from this software
 *    without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE AUTHORS ''AS IS'' AND ANY EXPRESS
 * OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED.  IN NO EVENT SHALL THE AUTHORS OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
 * BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
 * OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
__d("sha256", ["str2rstr"], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    var h = c('str2rstr');

    function i(ga, ha) {
        return ((ha >>> ga) | (ha << (32 - ga)));
    }

    function j(ga, ha, ia) {
        return ((ga & ha) ^ (~ga & ia));
    }

    function k(ga, ha, ia) {
        return ((ga & ha) ^ (ga & ia) ^ (ha & ia));
    }

    function l(ga) {
        return (i(2, ga) ^ i(13, ga) ^ i(22, ga));
    }

    function m(ga) {
        return (i(6, ga) ^ i(11, ga) ^ i(25, ga));
    }

    function n(ga) {
        return (i(7, ga) ^ i(18, ga) ^ (ga >>> 3));
    }

    function o(ga) {
        return (i(17, ga) ^ i(19, ga) ^ (ga >>> 10));
    }

    function p(ga, ha) {
        return (ga[ha & 15] += o(ga[(ha + 14) & 15]) + ga[(ha + 9) & 15] + n(ga[(ha + 1) & 15]));
    }
    var q = new Array(1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298),
        r = new Array(8),
        s = new Array(2),
        t = new Array(64),
        u = new Array(16),
        v = "0123456789abcdef";

    function w(ga, ha) {
        var ia = (ga & 65535) + (ha & 65535),
            ja = (ga >> 16) + (ha >> 16) + (ia >> 16);
        return (ja << 16) | (ia & 65535);
    }

    function x() {
        s[0] = s[1] = 0;
        r[0] = 1779033703;
        r[1] = 3144134277;
        r[2] = 1013904242;
        r[3] = 2773480762;
        r[4] = 1359893119;
        r[5] = 2600822924;
        r[6] = 528734635;
        r[7] = 1541459225;
    }

    function y() {
        var ga, ha, ia, ja, ka, la, ma, na, oa, pa;
        ga = r[0];
        ha = r[1];
        ia = r[2];
        ja = r[3];
        ka = r[4];
        la = r[5];
        ma = r[6];
        na = r[7];
        for (var qa = 0; qa < 16; qa++) u[qa] = ((t[(qa << 2) + 3]) | (t[(qa << 2) + 2] << 8) | (t[(qa << 2) + 1] << 16) | (t[qa << 2] << 24));
        for (var ra = 0; ra < 64; ra++) {
            oa = na + m(ka) + j(ka, la, ma) + q[ra];
            if (ra < 16) {
                oa += u[ra];
            } else oa += p(u, ra);
            pa = l(ga) + k(ga, ha, ia);
            na = ma;
            ma = la;
            la = ka;
            ka = w(ja, oa);
            ja = ia;
            ia = ha;
            ha = ga;
            ga = w(oa, pa);
        }
        r[0] += ga;
        r[1] += ha;
        r[2] += ia;
        r[3] += ja;
        r[4] += ka;
        r[5] += la;
        r[6] += ma;
        r[7] += na;
    }

    function z(ga, ha) {
        var ia, ja, ka = 0;
        ja = ((s[0] >> 3) & 63);
        var la = (ha & 63);
        if ((s[0] += (ha << 3)) < (ha << 3)) s[1]++;
        s[1] += (ha >> 29);
        for (ia = 0; ia + 63 < ha; ia += 64) {
            for (var ma = ja; ma < 64; ma++) t[ma] = ga.charCodeAt(ka++);
            y();
            ja = 0;
        }
        for (var ma = 0; ma < la; ma++) t[ma] = ga.charCodeAt(ka++);
    }

    function aa() {
        var ga = ((s[0] >> 3) & 63);
        t[ga++] = 128;
        if (ga <= 56) {
            for (var ha = ga; ha < 56; ha++) t[ha] = 0;
        } else {
            for (var ha = ga; ha < 64; ha++) t[ha] = 0;
            y();
            for (var ha = 0; ha < 56; ha++) t[ha] = 0;
        }
        t[56] = (s[1] >>> 24) & 255;
        t[57] = (s[1] >>> 16) & 255;
        t[58] = (s[1] >>> 8) & 255;
        t[59] = s[1] & 255;
        t[60] = (s[0] >>> 24) & 255;
        t[61] = (s[0] >>> 16) & 255;
        t[62] = (s[0] >>> 8) & 255;
        t[63] = s[0] & 255;
        y();
    }

    function ba() {
        var ga = 0,
            ha = new Array(32);
        for (var ia = 0; ia < 8; ia++) {
            ha[ga++] = ((r[ia] >>> 24) & 255);
            ha[ga++] = ((r[ia] >>> 16) & 255);
            ha[ga++] = ((r[ia] >>> 8) & 255);
            ha[ga++] = (r[ia] & 255);
        }
        return ha;
    }

    function ca() {
        var ga = new String();
        for (var ha = 0; ha < 8; ha++)
            for (var ia = 28; ia >= 0; ia -= 4) ga += v.charAt((r[ha] >>> ia) & 15);
        return ga;
    }

    function da(ga) {
        var ha = 0;
        for (var ia = 0; ia < 8; ia++)
            for (var ja = 28; ja >= 0; ja -= 4) ga[ha++] = v.charCodeAt((r[ia] >>> ja) & 15);
    }

    function ea(ga, ha) {
        x();
        z(ga, ga.length);
        aa();
        if (ha) {
            da(ha);
        } else return ca();
    }

    function fa(ga, ha, ia) {
        if (ga === null || ga === undefined) return null;
        ha = (typeof ha == 'undefined') ? true : ha;
        if (ha) ga = h(ga);
        return ea(ga, ia);
    }
    f.exports = fa;
}), null);
__d('QuickSandHeader', ['sha256', 'Int64'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(i, j) {
        'use strict';
        this.$QuickSandHeader1 = 1 << j;
        this.$QuickSandHeader2 = this.$QuickSandHeader1 / 2;
        this.$QuickSandHeader3 = c('Int64').fromInt(this.$QuickSandHeader2 - 1);
        this.$QuickSandHeader4 = [];
        this.$QuickSandHeader5 = 0;
        this.$QuickSandHeader6 = 0;
        this.$QuickSandHeader7 = 0;
        this.$QuickSandHeader8 = 0;
        var k = c('sha256')(i),
            l = this.$QuickSandHeader9(this.$QuickSandHeader10(k)),
            m = this.$QuickSandHeader9(this.$QuickSandHeader10(k).slice(8));
        this.$QuickSandHeader4.push(l.xor(c('Int64').fromString('736f6d6570736575', 16)));
        this.$QuickSandHeader4.push(m.xor(c('Int64').fromString('646f72616e646f6d', 16)));
        this.$QuickSandHeader4.push(l.xor(c('Int64').fromString('6c7967656e657261', 16)));
        this.$QuickSandHeader4.push(m.xor(c('Int64').fromString('7465646279746573', 16)));
    }
    h.prototype.sipEdge = function(i) {
        'use strict';
        return [this.sipNode(i, 0), this.sipNode(i, 1)];
    };
    h.prototype.sipNode = function(i, j) {
        'use strict';
        return this.$QuickSandHeader11(2 * i + j).and(this.$QuickSandHeader3).toInt();
    };
    h.prototype.getSize = function() {
        'use strict';
        return this.$QuickSandHeader1;
    };
    h.prototype.getHalfSize = function() {
        'use strict';
        return this.$QuickSandHeader2;
    };
    h.prototype.$QuickSandHeader12 = function(i, j) {
        'use strict';
        return i.shiftLeft(j).or(i.shiftRightUnsigned(64 - j));
    };
    h.prototype.$QuickSandHeader9 = function(i) {
        'use strict';
        var j = new(c('Int64').fromInt)(i[0]),
            k = c('Int64').fromInt(i[1]).shiftLeft(8),
            l = c('Int64').fromInt(i[2]).shiftLeft(16),
            m = c('Int64').fromInt(i[3]).shiftLeft(24),
            n = c('Int64').fromInt(i[4]).shiftLeft(32),
            o = c('Int64').fromInt(i[5]).shiftLeft(40),
            p = c('Int64').fromInt(i[6]).shiftLeft(48),
            q = c('Int64').fromInt(i[7]).shiftLeft(56);
        return j.or(k).or(l).or(m).or(n).or(o).or(p).or(q);
    };
    h.prototype.$QuickSandHeader13 = function() {
        'use strict';
        this.$QuickSandHeader5 = this.$QuickSandHeader5.add(this.$QuickSandHeader6);
        this.$QuickSandHeader7 = this.$QuickSandHeader7.add(this.$QuickSandHeader8);
        this.$QuickSandHeader6 = this.$QuickSandHeader12(this.$QuickSandHeader6, 13);
        this.$QuickSandHeader8 = this.$QuickSandHeader12(this.$QuickSandHeader8, 16);
        this.$QuickSandHeader6 = this.$QuickSandHeader6.xor(this.$QuickSandHeader5);
        this.$QuickSandHeader8 = this.$QuickSandHeader8.xor(this.$QuickSandHeader7);
        this.$QuickSandHeader5 = this.$QuickSandHeader12(this.$QuickSandHeader5, 32);
        this.$QuickSandHeader7 = this.$QuickSandHeader7.add(this.$QuickSandHeader6);
        this.$QuickSandHeader5 = this.$QuickSandHeader5.add(this.$QuickSandHeader8);
        this.$QuickSandHeader6 = this.$QuickSandHeader12(this.$QuickSandHeader6, 17);
        this.$QuickSandHeader8 = this.$QuickSandHeader12(this.$QuickSandHeader8, 21);
        this.$QuickSandHeader6 = this.$QuickSandHeader6.xor(this.$QuickSandHeader7);
        this.$QuickSandHeader8 = this.$QuickSandHeader8.xor(this.$QuickSandHeader5);
        this.$QuickSandHeader7 = this.$QuickSandHeader12(this.$QuickSandHeader7, 32);
    };
    h.prototype.$QuickSandHeader10 = function(i) {
        'use strict';
        for (var j = [], k = 0; k < i.length; k += 2) j.push(parseInt(i.substr(k, 2), 16));
        return j;
    };
    h.prototype.$QuickSandHeader11 = function(i) {
        'use strict';
        var j = c('Int64').fromInt(i);
        this.$QuickSandHeader5 = this.$QuickSandHeader4[0];
        this.$QuickSandHeader6 = this.$QuickSandHeader4[1];
        this.$QuickSandHeader7 = this.$QuickSandHeader4[2];
        this.$QuickSandHeader8 = this.$QuickSandHeader4[3].xor(j);
        for (var k = 0; k < 2; k++) this.$QuickSandHeader13();
        this.$QuickSandHeader5 = this.$QuickSandHeader5.xor(j);
        this.$QuickSandHeader7 = this.$QuickSandHeader7.xor(c('Int64').fromString('ff', 16));
        for (k = 0; k < 4; k++) this.$QuickSandHeader13();
        return this.$QuickSandHeader5.xor(this.$QuickSandHeader6).xor(this.$QuickSandHeader7).xor(this.$QuickSandHeader8);
    };
    f.exports = h;
}), null);
__d('QuickSandSolver', ['AsyncRequest', 'Base64', 'Form', 'QuickSandHeader', 'sha256'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        solveAndEncode: function i(j, k, l, m, n, o) {
            var p = JSON.stringify([this.solve(j, k, l, m, n), o]);
            return c('Base64').encode(p);
        },
        solveAndUpdateForm: function i(j, k, l, m, n, o, p) {
            var q = this.solveAndEncode(j, k, l, m, n, p),
                r = document.getElementById(o);
            c('Form').createHiddenInputs({
                qsstamp: q
            }, r);
        },
        solveAndSendRequestBack: function i(j, k) {
            var l = this.solveAndEncode(k.__iterations, k.__header, k.__graphSizeShift, k.__proofSize, k.__edgePercentage, k.__blob);
            j.data.qsstamp = l;
            j.send();
        },
        solveAndCallAsyncController: function i(j, k, l, m, n, o) {
            var p = this.solveAndEncode(j, k, l, m, n, o);
            new(c('AsyncRequest'))().setURI('/qs/').setData({
                qsstamp: p
            }).send();
        },
        solve: function i(j, k, l, m, n) {
            var o = [],
                p = k;
            for (var q = 0; q < j; q++) {
                o.push(h.solveOneIteration(p, l, m, n));
                p = h.hashList(o[q]);
            }
            return o;
        },
        solveOneIteration: function i(j, k, l, m) {
            var n = 8192,
                o = new(c('QuickSandHeader'))(j, k),
                p = m * o.getSize() / 100,
                q = [],
                r = [],
                s = [];
            for (var t = 0; t < p; t++) {
                var u = o.sipEdge(t),
                    v = u[0],
                    w = u[1];
                v += 1;
                w += 1 + o.getHalfSize();
                var x = q[v],
                    y = q[w];
                if (x == w || y == v) continue;
                r[0] = v;
                s[0] = w;
                var z = h.path(x, r, q, n),
                    aa = h.path(y, s, q, n);
                if (r[z] == s[aa]) {
                    var ba = Math.min(z, aa);
                    for (z -= ba, aa -= ba; r[z] != s[aa]; z++, aa++);
                    var ca = z + aa + 1;
                    if (ca == l) return h.recoverSolution(z, aa, r, s, o, l, p);
                    continue;
                }
                if (z < aa) {
                    while (z--) q[r[z + 1]] = r[z];
                    q[v] = w;
                } else {
                    while (aa--) q[s[aa + 1]] = s[aa];
                    q[w] = v;
                }
            }
            return [];
        },
        path: function i(j, k, l, m) {
            var n = 0;
            for (n = 0; j; j = l[j]) {
                if (++n >= m) {
                    while (n-- && k[n] != j);
                    if (n < 0) {
                        throw "Maximum path length was exceeded";
                    } else throw "Illegal cycle has occurred";
                }
                k[n] = j;
            }
            return n;
        },
        recoverSolution: function i(j, k, l, m, n, o, p) {
            var q = function w() {};
            q.prototype.add = function(w) {
                this[w] = true;
            };
            q.prototype.remove = function(w) {
                delete this[w];
            };
            var r = [],
                s = new q();
            s.add([l[0], m[0]]);
            while (j--) s.add([l[j + 1 & ~1], l[j | 1]]);
            while (k--) s.add([m[k | 1], m[k + 1 & ~1]]);
            var t = 0;
            for (var u = 0; u < p; u++) {
                var v = [1 + n.sipNode(u, 0), 1 + n.getHalfSize() + n.sipNode(u, 1)];
                if (v in s) {
                    r[t++] = u;
                    s.remove(v);
                }
            }
            return r;
        },
        hashList: function i(j) {
            var k = j.join('-');
            return c('sha256')(k);
        }
    };
    f.exports = h;
}), null);
__d('Chromedome', ['fbt'], (function a(b, c, d, e, f, g, h) {
    if (c.__markCompiled) c.__markCompiled();
    g.start = function(i) {
        if (i.off || top !== window || !/(^|\.)facebook\.(com|sg)$/.test(document.domain)) return;
        var j = i.stop || h._("Stop!"),
            k = i.text || h._("This is a browser feature intended for developers. If someone told you to copy-paste something here to enable a Facebook feature or \"hack\" someone's account, it is a scam and will give them access to your Facebook account."),
            l = i.more || h._("See {url} for more information.", [h.param('url', 'https://www.facebook.com/selfxss')]);
        if ((window.chrome || window.safari) && !i.textonly) {
            var m = 'font-family:helvetica; font-size:20px; ';
            [
                [j, i.c1 || m + 'font-size:50px; font-weight:bold; ' + 'color:red; -webkit-text-stroke:1px black;'],
                [k, i.c2 || m],
                [l, i.c3 || m],
                ['', '']
            ].map(function(s) {
                setTimeout(console.log.bind(console, '\n%c' + s[0], s[1]));
            });
        } else {
            var n = ['', ' .d8888b.  888                       888', 'd88P  Y88b 888                       888', 'Y88b.      888                       888', ' "Y888b.   888888  .d88b.  88888b.   888', '    "Y88b. 888    d88""88b 888 "88b  888', '      "888 888    888  888 888  888  Y8P', 'Y88b  d88P Y88b.  Y88..88P 888 d88P', ' "Y8888P"   "Y888  "Y88P"  88888P"   888', '                           888', '                           888', '                           888'],
                o = ('' + k).match(/.{35}.+?\s+|.+$/g),
                p = Math.floor(Math.max(0, (n.length - o.length) / 2));
            for (var q = 0; q < n.length || q < o.length; q++) {
                var r = n[q];
                n[q] = r + new Array(45 - r.length).join(' ') + (o[q - p] || '');
            }
            console.log('\n\n\n' + n.join('\n') + '\n\n' + l + '\n');
            return;
        }
    };
}), null);
__d('NavigationClickPointHandler', ['Event', 'ScriptPath', 'collectDataAttributes'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        getClickPointInfo: function j(k) {
            var l = null,
                m = c('collectDataAttributes')(k, ['ft'], ['href', 'data-click']),
                n = m.normal.href;
            if (!n || n === '#') return false;
            var o = m.normal['data-click'];
            if (l === null && o) l = {
                click: o
            };
            var p = m.ft.tn;
            if (l === null && p) l = {
                tn: p
            };
            if (l === null && k.getAttribute) {
                var q = k.getAttribute('class');
                if (q) l = {
                    'class': q
                };
            }
            return l;
        }
    };

    function i(event) {
        var j = event.target || event.srcElement,
            k = h.getClickPointInfo(j);
        if (k !== false) c('ScriptPath').setClickPointInfo(k);
    }
    c('Event').listen(document.documentElement, {
        click: i
    });
    f.exports = h;
}), null);
__d('TimezoneAutoset', ['AsyncRequest', 'emptyFunction'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = false;

    function i(l) {
        var m = new Date(),
            n = m.getTimezoneOffset() / 15,
            o = m.getTime() / 1000,
            p = Math.round((l - o) / 900),
            q = Math.round(n + p) % 96;
        if (q == 0) {
            return 0;
        } else if (q > 48) {
            q -= Math.ceil(q / 96) * 96;
        } else if (q < -56) q += Math.ceil(q / -96) * 96;
        return q * 15;
    }

    function j(l, m, n) {
        if (!l || undefined == m) return;
        if (h) return;
        h = true;
        var o = -i(l);
        if (n || o != m) {
            var p = '/ajax/timezone/update.php';
            new(c('AsyncRequest'))().setURI(p).setData({
                gmt_off: o,
                is_forced: n
            }).setErrorHandler(c('emptyFunction')).setTransportErrorHandler(c('emptyFunction')).setOption('suppressErrorAlerts', true).send();
        }
    }
    var k = {
        setInputValue: function l(m, n) {
            m.value = i(n);
        },
        setTimezone: j
    };
    f.exports = k;
}), null);
__d('PopoverLoadingMenu', ['cx', 'BehaviorsMixin', 'DOM', 'PopoverMenuInterface', 'joinClasses'], (function a(b, c, d, e, f, g, h) {
    var i, j;
    if (c.__markCompiled) c.__markCompiled();
    i = babelHelpers.inherits(k, c('PopoverMenuInterface'));
    j = i && i.prototype;

    function k(l) {
        'use strict';
        j.constructor.call(this);
        this._config = l || {};
        this._theme = l.theme || {};
    }
    k.prototype.getRoot = function() {
        'use strict';
        if (!this._root) {
            this._root = c('DOM').create('div', {
                className: c('joinClasses')("_54nq", this._config.className, this._theme.className)
            }, c('DOM').create('div', {
                className: "_54ng"
            }, c('DOM').create('div', {
                className: "_54nf _54af"
            }, c('DOM').create('span', {
                className: "_54ag"
            }))));
            if (this._config.behaviors) this.enableBehaviors(this._config.behaviors);
        }
        return this._root;
    };
    Object.assign(k.prototype, c('BehaviorsMixin'), {
        _root: null
    });
    f.exports = k;
}), null);
__d('ErrorContextualDialogXUITheme', ['cx'], (function a(b, c, d, e, f, g, h) {
    if (c.__markCompiled) c.__markCompiled();
    var i = {
        wrapperClassName: "_572t",
        arrowDimensions: {
            offset: 12,
            length: 22
        }
    };
    f.exports = i;
}), null);
__d("XWebStorageLoggingAsyncController", ["XController"], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = c("XController").create("\/ajax\/webstorage\/process_keys\/", {});
}), null);
__d('WebStorageMonster', ['Event', 'AsyncRequest', 'UserActivity', 'StringTransformations', 'WebStorage', 'XWebStorageLoggingAsyncController', 'arrayContains', 'isEmpty', 'setTimeoutAcrossTransitions'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = 300000,
        i = false;

    function j(o) {
        var p = {};
        for (var q in o) {
            var r = o.getItem(q),
                s = c('StringTransformations').unicodeEscape(q);
            if (typeof r === 'string') p[s] = r.length;
        }
        return p;
    }

    function k(o) {
        var p = c('WebStorage').getLocalStorage();
        if (!p || !o.keys) return;
        n._getLocalStorageKeys().forEach(function(q) {
            if (c('arrayContains')(o.keys, q)) p.removeItem(q);
        });
    }

    function l(o) {
        var p = c('WebStorage').getLocalStorage();
        if (p) n._getLocalStorageKeys().forEach(function(q) {
            if (!o.some(function(r) {
                    return new RegExp(r).test(q);
                })) p.removeItem(q);
        });
    }

    function m() {
        if (c('UserActivity').isActive(h)) {
            c('setTimeoutAcrossTransitions')(m, h);
        } else n.cleanNow();
    }
    var n = {
        registerLogoutForm: function o(p, q) {
            c('Event').listen(p, 'submit', function(r) {
                n.cleanOnLogout(q);
            });
        },
        schedule: function o() {
            if (i) return;
            i = true;
            m();
        },
        cleanNow: function o() {
            var p = Date.now(),
                q = {},
                r = c('WebStorage').getLocalStorage();
            if (r) q.local_storage = j(r);
            var s = c('WebStorage').getSessionStorage();
            if (s) q.session_storage = j(s);
            var t = !c('isEmpty')(q),
                u = Date.now();
            q.logtime = u - p;
            if (t) {
                var v = c('XWebStorageLoggingAsyncController').getURIBuilder().getURI();
                new(c('AsyncRequest'))(v).setData(q).setHandler(function(w) {
                    var x = w.getPayload();
                    if (x.keys) x.keys = x.keys.map(c('StringTransformations').unicodeUnescape);
                    k(x);
                }).send();
            }
        },
        cleanOnLogout: function o(p) {
            if (p) l(p);
            var q = c('WebStorage').getSessionStorage();
            if (q) q.clear();
        },
        _getLocalStorageKeys: function o() {
            var p = c('WebStorage').getLocalStorage();
            return p ? Object.keys(p) : [];
        }
    };
    f.exports = n;
}), null);
__d('ScriptPathLogger', ['Banzai', 'ScriptPath', 'TimeSpentPageTransitionCause', 'URI', 'isInIframe'], (function a(b, c, d, e, f, g) {
    'use strict';
    if (c.__markCompiled) c.__markCompiled();
    var h = 'script_path_change',
        i = {
            scriptPath: null,
            categoryToken: null,
            extraData: {}
        },
        j = false,
        k = 'imp_id';

    function l(v) {
        var w = c('URI').getNextURI ? c('URI').getNextURI() : new(c('URI'))(window.location.href),
            x = w.getQueryData(),
            y = w.getPath();
        if (y.endsWith('/')) y = y.substr(0, y.length - 1);
        var z = m(y, x);
        if (z) {
            v.content_id = z;
            return;
        }
        var aa = n(y);
        if (aa !== '') {
            v.dest_topic_feed = aa;
            return;
        }
        if (o(y)) {
            var ba = x.queue_id;
            if (ba) v.dest_srt_queue_id = ba;
            return;
        }
    }

    function m(v, w) {
        if (w.story_fbid) return w.story_fbid;
        if (w.fbid) return w.fbid;
        if (w.view === 'permalink' && w.id) return w.id;
        var x = /\/(posts|videos|notes|groups\/.*\/permalink)\//,
            y = /^[0-9]+$/;
        if (x.test(v)) {
            var z = v.split('/'),
                aa = z[z.length - 1];
            if (y.test(aa)) return aa;
        }
        return '';
    }

    function n(v) {
        if (!v || v.search('/feed/topics/') == -1) return '';
        var w = v.split('/');
        return w[w.length - 1];
    }

    function o(v) {
        return !!v && v.search('/intern/review/') !== -1;
    }

    function p(v, w, x, y) {
        if (!j || c('isInIframe')()) return;
        var z = c('Banzai').isEnabled('vital_navigations'),
            aa = z ? c('Banzai').VITAL : c('Banzai').BASIC;
        if (z) {
            y = y || {};
            y.via_banzai_vital = '1';
        }
        var ba = {
            source_path: v.scriptPath,
            source_token: v.categoryToken,
            dest_path: w.scriptPath,
            dest_token: w.categoryToken,
            impression_id: w.extraData ? w.extraData.imp_id : null,
            cause: x
        };
        l(ba);
        if (y) {
            if (y.snowlift_photo_id) {
                ba.content_id = y.snowlift_photo_id;
                delete y.snowlift_photo_id;
            }
            ba.extra_data = y;
        }
        if (v.scriptPath === null) ba.referrer = document.referrer;
        var ca = c('ScriptPath').getClickPointInfo();
        if (ca) ba.click_point_info = ca;
        if (v.extraData)
            for (var da in v.extraData)
                if (da != k) ba['source_' + da] = v.extraData[da];
        if (w.extraData)
            for (var ea in w.extraData)
                if (ea != k) ba['dest_' + ea] = w.extraData[ea];
        if (v.topViewEndpoint) ba.source_endpoint = v.topViewEndpoint;
        if (w.topViewEndpoint) ba.dest_endpoint = w.topViewEndpoint;
        if (v.restored) ba.source_restored = true;
        c('Banzai').post(h, ba, aa);
        c('ScriptPath').setClickPointInfo(null);
    }

    function q() {
        p(c('ScriptPath').getSourcePageInfo() || i, c('ScriptPath').getPageInfo() || i, c('TimeSpentPageTransitionCause').PAGE_LOAD);
    }

    function r(v, w, x) {
        p(v, w, c('TimeSpentPageTransitionCause').TRANSITION, x);
    }

    function s() {
        p(c('ScriptPath').getPageInfo() || i, i, c('TimeSpentPageTransitionCause').PAGE_UNLOAD);
        c('ScriptPath').shutdown();
    }
    var t = c('ScriptPath').subscribe(function(v) {
        if (j) {
            var w = v.source,
                x = v.dest,
                y = v.cause,
                z = v.extraData;
            if (y) {
                p(w || i, x || i, y, z);
            } else if (w) {
                r(w, x || i, z);
            } else q();
        }
    });
    c('Banzai').subscribe(c('Banzai').SHUTDOWN, s);
    var u = {
        startLogging: function v() {
            j = true;
            if (c('ScriptPath').getPageInfo()) q();
        },
        stopLogging: function v() {
            j = false;
            t.remove();
        },
        BANZAI_LOGGING_ROUTE: h
    };
    f.exports = u;
}), null);