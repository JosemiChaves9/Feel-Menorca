"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKayaksTotalPrice = void 0;
const filterKayakPricingInDate_1 = require("./filterKayakPricingInDate");
const getKayaksTotalPrice = (kayaks, date, kayakTypes) => {
    return new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
    }).format(kayaks.reduce((acc, kayak) => {
        if (!kayak.kayakType || !kayak.duration) {
            return (acc += 0);
        }
        const kayakType = kayakTypes.find((type) => type.name === kayak.kayakType);
        const duration = kayakType.pricing
            .filter((pricingItem) => filterKayakPricingInDate_1.filterKayakPricingInDate(pricingItem, date))
            .find((pricingItem) => pricingItem.durationName === kayak.duration);
        if (!duration) {
            return acc;
        }
        return (acc += duration.priceEur || 0);
    }, 0));
};
exports.getKayaksTotalPrice = getKayaksTotalPrice;
