"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterKayakTypesWithPricingInDate = void 0;
const moment_1 = __importDefault(require("moment"));
const filterKayakTypesWithPricingInDate = (kayakType, date) => {
    return kayakType.pricing.some((pricingItem) => {
        const selectedDate = moment_1.default(date, "YYYY/MM/DD");
        const from = moment_1.default(pricingItem.from, "DD/MM");
        const to = moment_1.default(pricingItem.to, "DD/MM");
        return moment_1.default(selectedDate).isBetween(from, to);
    });
};
exports.filterKayakTypesWithPricingInDate = filterKayakTypesWithPricingInDate;
