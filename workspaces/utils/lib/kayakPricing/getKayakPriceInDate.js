"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKayakPriceInDate = void 0;
const filterKayakPricingInDate_1 = require("./filterKayakPricingInDate");
const getKayakPriceInDate = (kayakType, kayakTime, date, kayakTypes) => {
    const type = kayakTypes.find((type) => type.name === kayakType);
    return new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
    }).format(type.pricing
        .filter((pricingItem) => filterKayakPricingInDate_1.filterKayakPricingInDate(pricingItem, date))
        .find((pricingItem) => pricingItem.durationName === kayakTime).priceEur);
};
exports.getKayakPriceInDate = getKayakPriceInDate;
