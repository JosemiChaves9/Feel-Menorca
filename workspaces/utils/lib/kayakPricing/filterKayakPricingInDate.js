"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterKayakPricingInDate = void 0;
const moment_1 = __importDefault(require("moment"));
const filterKayakPricingInDate = (kayakPricing, date) => {
    const selectedDate = moment_1.default(date, "YYYY/MM/DD");
    const from = moment_1.default(kayakPricing.from, "DD/MM");
    const to = moment_1.default(kayakPricing.to, "DD/MM");
    return moment_1.default(selectedDate).isBetween(from, to);
};
exports.filterKayakPricingInDate = filterKayakPricingInDate;
