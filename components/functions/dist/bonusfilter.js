"use strict";
exports.__esModule = true;
var currency_1 = require("./currency");
var BonusFilter = function (bdata) {
    bdata.forEach(function (item, index) {
        var firstBonus = item.bonuses.find(function (v) { return v.deposit > 0; });
        var ndBonus = item.bonuses.find(function (v) { return v.nodeposit > 0; });
        item.currency = currency_1["default"](firstBonus.multi_currency);
        item.fstext = "";
        if (firstBonus && ndBonus) {
            item.nodeposit_type = "No Deposit";
            item.ndcurrency = currency_1["default"](firstBonus.multi_currency);
            if (ndBonus.freespins > 0) {
                item.nodeposit_type = "Free Spins";
                item.fstext = "Spins";
                item.ndcurrency = "";
            }
            item.nodeposit = ndBonus.nodeposit;
            item.nodepositplaythrough = ndBonus.playthrough;
            item.nodepositCode = ndBonus.code;
            if (ndBonus.code.length > 1) {
                item.ndCodeDisp = ndBonus.code;
            }
            else {
                item.ndCodeDisp = "No Code Used";
            }
            item.deposit = firstBonus.deposit;
            item.depositBonus = firstBonus.deposit_amount;
            if (item.deposit && item.depositBonus) {
                firstBonus.percent = Math.round((item.depositBonus / item.deposit) * 100);
            }
            item.depositPlaythough = firstBonus.playthrough;
            item.depositCode = firstBonus.code;
            item.depositPercent = firstBonus.percent;
            if (item.depositCode.length > 1) {
                item.depCodeDisp = item.depositCode;
            }
            else {
                item.depCodeDisp = "No Code Used";
            }
            if (item.casino.length > 10) {
                item.casinoRevText = item.casino;
                item.casinoSiteText = "site";
            }
            else {
                item.casinoRevText = item.casino + " Review";
                item.casinoSiteText = "secure site";
            }
        }
        else if (firstBonus) {
            item.deposit = firstBonus.deposit;
            item.depositBonus = firstBonus.deposit_amount;
            if (item.deposit && item.depositBonus) {
                firstBonus.percent = Math.round((item.depositBonus / item.deposit) * 100);
            }
            item.depositPlaythough = firstBonus.playthrough;
            item.depositCode = firstBonus.code;
            item.depositPercent = firstBonus.percent;
            if (item.depositCode.length > 1) {
                item.depCodeDisp = item.depositCode;
            }
            else {
                item.depCodeDisp = "No Code Used";
            }
            if (item.casino.length > 10) {
                item.casinoRevText = item.casino;
                item.casinoSiteText = "site";
            }
            else {
                item.casinoRevText = item.casino + " Review";
                item.casinoSiteText = "secure site";
            }
        }
        delete item.bonuses;
    });
    //return { props: { data: bdata } };
    return bdata;
};
exports["default"] = BonusFilter;
