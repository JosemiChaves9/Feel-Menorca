import moment from "moment";
import { KayakPricing } from './types/KayakPricing';

export const filterKayakPricingInDate = (
  kayakPricing: KayakPricing,
  date: string
) => {
  const selectedDate = moment(date, "YYYY/MM/DD");
  const from = moment(kayakPricing.from, "DD/MM");
  const to = moment(kayakPricing.to, "DD/MM");
  return moment(selectedDate).isBetween(from, to);
};
