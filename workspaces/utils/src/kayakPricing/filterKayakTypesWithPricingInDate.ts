import moment from "moment";
import { KayakType } from "./types/KayakType";

export const filterKayakTypesWithPricingInDate = (
  kayakType: KayakType,
  date: string
) => {
  return kayakType.pricing.some((pricingItem) => {
    const selectedDate = moment(date, "YYYY/MM/DD");
    const from = moment(pricingItem.from, "DD/MM");
    const to = moment(pricingItem.to, "DD/MM");
    return moment(selectedDate).isBetween(from, to);
  });
};
