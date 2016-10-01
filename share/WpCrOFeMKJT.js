if (self.CavalryLogger) {
    CavalryLogger.start_js(["zt57n"]);
}

__d("CreditCardFormParam", [], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = {
        ACCOUNT_ID: "account_id",
        ACCOUNT_COUNTRY_CODE: "account_country_code",
        APP_ID: "app_id",
        CARD_EXPIRATION: "exp",
        CARD_FBID: "cc_fbid",
        CARD_ID: "cc_id",
        CARD_TYPE: "cardType",
        CITY: "city",
        CONTEXT_ID: "context_id",
        COUNTRY: "country",
        CSC_LENGTH: "csc_length",
        EMAIL: "email",
        FIRST_NAME: "firstName",
        TRACKING_ID: "tracking_id",
        JSFAIL_SOURCE: "jsfail_source",
        KEYPRESS_TIMES: "kpts",
        LAST_NAME: "lastName",
        MONTH: "month",
        STATE: "state",
        STREET: "street",
        STREET_2: "street2",
        VALIDATE_ADDRESS: "validate_address",
        VALIDATE_NAME: "validate_name",
        VALIDATE_ZIP: "validate_zip",
        YEAR: "year",
        ZIP: "zip",
        VALIDATOR_CHECKS: "checks",
        CARD_NUMBER: "creditCardNumber",
        CSC: "csc",
        CARD_NUMBER_FIRST_6: "creditCardNumber_first6",
        CARD_NUMBER_LAST_4: "creditCardNumber_last4",
        CARD_NUMBER_TOKEN: "creditCardNumber_token",
        CSC_TOKEN: "csc_token",
        AUTH_LEVEL_FLAG: "auth_level",
        AUTH_AMOUNT: "auth_amount",
        AUTH_CURRENCY: "auth_currency",
        AUTO_EXPAND_AUTH_LEVEL_FLAG: "auto_expand_auth_level",
        PAYMENT_ITEM_TYPE: "payment_item_type",
        CREDENTIAL_ID: "credential_id",
        IS_STORED_BALANCE: "is_stored_balance",
        FLOW_PLACEMENT: "flow_placement",
        FLOW_TYPE: "flow_type",
        STORED_BALANCE_STATUS: "stored_balance_status"
    };
}), null);
__d("CreditCardTypeEnum", [], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = {
        VISA: 86,
        MASTERCARD: 77,
        DISCOVER: 68,
        AMERICANEXPRESS: 65,
        DINERSCLUB: 64,
        JCB: 74,
        CUP: 80
    };
}), null);
__d('ShareDialogAudienceTypes', ['getObjectValues', 'ShareModeConst'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
            OWN: c('ShareModeConst').SELF_POST,
            PERSON: c('ShareModeConst').FRIEND,
            GROUP: c('ShareModeConst').GROUP,
            EVENT: c('ShareModeConst').EVENT,
            PAGE: c('ShareModeConst').PAGE,
            MESSAGE: c('ShareModeConst').MESSAGE
        },
        i = c('getObjectValues')(h);

    function j(k) {
        return i.some(function(l) {
            return l === k;
        });
    }
    f.exports = h;
    f.exports.ALL = i;
    f.exports.isValid = j;
    f.exports.propType = function(k, l) {
        if (!j(k[l])) throw new Error('Invalid audience ' + k[l]);
    };
}), null);
__d('PaymentMethodUtils', [], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = 16,
        i = 4,
        j = [{
            pattern: /^5[1-5]/,
            name: 'mc',
            cscDigits: 3,
            digits: 16,
            supported: true,
            code: 77
        }, {
            pattern: /^4/,
            name: 'visa',
            cscDigits: 3,
            digits: 16,
            supported: true,
            code: 86
        }, {
            pattern: /^3[47]/,
            name: 'amex',
            cscDigits: 4,
            digits: 15,
            supported: true,
            code: 65
        }, {
            pattern: /^35(2[8-9]|[3-8])/,
            name: 'jcb',
            cscDigits: 3,
            digits: 16,
            supported: true,
            code: 74
        }, {
            pattern: /^62/,
            name: 'cup',
            cscDigits: 3,
            digits: 16,
            supported: true,
            code: 80
        }, {
            pattern: /^(6011|65|64[4-9])/,
            name: 'disc',
            cscDigits: 3,
            digits: 16,
            supported: true,
            code: 68
        }, {
            pattern: /^30[0-5]/,
            name: 'diners',
            digits: 14,
            cscDigits: 3,
            supported: false,
            code: 64
        }, {
            name: 'unknown',
            digits: 16,
            cscDigits: 3,
            supported: false,
            code: 85
        }],
        k = function m(n) {
            return n.replace(/[iIl]/g, '1').replace(/[Oo]/g, '0').replace(/[^\d]/gi, '');
        },
        l = {
            getCardType: function m(n) {
                n = k(n);
                n = n.substr(0, 6);
                for (var o = 0; o < j.length; o++)
                    if (n.match(j[o].pattern)) return j[o];
            },
            getCardTypeFromCode: function m(n) {
                for (var o = 0; o < j.length; o++)
                    if (n == j[o].code) return j[o];
                return null;
            },
            isValidCCNumber: function m(n) {
                n = k(n);
                var o = l.getCardType(n);
                if (o.digits !== n.length) return false;
                if (!o.supported) return false;
                return l.isValidLuhn(n);
            },
            isValidLuhn: function m(n) {
                n = k(n);
                var o = n.split('').reverse(),
                    p = '';
                for (var q = 0; q < o.length; q++) {
                    var r = parseInt(o[q], 10);
                    if (q % 2 !== 0) r = r * 2;
                    p = p + r;
                }
                var s = 0;
                for (q = 0; q < p.length; q++) s = s + parseInt(p.charAt(q), 10);
                return !!(s !== 0 && s % 10 === 0);
            },
            getMaxCardLength: function m(n) {
                return h;
            },
            getMaxCSCLength: function m() {
                return i;
            }
        };
    f.exports = l;
}), null);
__d('PaymentTokenProxyUtils', ['CurrentEnvironment', 'URI'], (function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = {
        getURI: function i(j) {
            var k = new(c('URI'))('/ajax/payment/token_proxy.php').setDomain(window.location.hostname).setProtocol('https').addQueryData(j),
                l = k.getDomain().split('.');
            if (l.indexOf('secure') < 0) {
                l.splice(1, 0, 'secure');
                if (l[0] == 'www') l.shift();
                k.setDomain(l.join('.'));
            }
            if (c('CurrentEnvironment').messengerdotcom) {
                var m = k.getDomain();
                m = m.replace('messenger.com', 'facebook.com');
                k.setDomain(m);
            }
            return k;
        }
    };
    f.exports = h;
}), null);
__d("XShareDialogSubmitController", ["XController"], (function a(b, c, d, e, f, g) {
    c.__markCompiled && c.__markCompiled();
    f.exports = c("XController").create("\/share\/dialog\/submit\/", {
        post_id: {
            type: "Int"
        },
        share_type: {
            type: "Int"
        },
        url: {
            type: "String"
        },
        audience_type: {
            type: "String"
        },
        owner_id: {
            type: "Int"
        },
        app_id: {
            type: "Int"
        },
        message: {
            type: "String"
        },
        shared_ad_id: {
            type: "Int"
        },
        sharer_id: {
            type: "Int"
        },
        source: {
            type: "String"
        },
        composer_session_id: {
            type: "String"
        },
        audience_targets: {
            type: "IntVector"
        },
        ephemeral_ttl_mode: {
            type: "Int"
        },
        tagged_people: {
            type: "IntVector"
        },
        tagged_place: {
            type: "Int"
        },
        tagged_action: {
            type: "Int"
        },
        tagged_object: {
            type: "Int"
        },
        tagged_object_str: {
            type: "String"
        },
        tagged_action_icon: {
            type: "Int"
        },
        tagged_feed_topics: {
            type: "StringVector"
        },
        attribution: {
            type: "Int"
        },
        privacy: {
            type: "String"
        },
        messaging_tags: {
            type: "StringVector"
        },
        internalextra: {
            type: "StringToStringMap"
        },
        internal_preview_image_id: {
            type: "Int"
        },
        share_now: {
            type: "Bool",
            defaultValue: false
        },
        is_forced_reshare_of_post: {
            type: "Bool",
            defaultValue: false
        },
        targeted_privacy_data: {
            type: "HackType"
        },
        unpublished_content_type: {
            type: "Enum",
            enumType: 0
        },
        branded_content_repost_root: {
            type: "Int"
        },
        share_to_group_as_page: {
            type: "Bool",
            defaultValue: false
        },
        shared_to_group_id: {
            type: "Int"
        }
    });
}), null);