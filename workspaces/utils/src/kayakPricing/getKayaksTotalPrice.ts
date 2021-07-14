import { filterKayakPricingInDate } from "./filterKayakPricingInDate";
import { KayakType } from "./types/KayakType";

export const getKayaksTotalPrice = (
  kayaks: { kayakType: string; duration: string }[],
  date: string,
  kayakTypes: KayakType[]
) => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(
    kayaks.reduce((acc, kayak) => {
      if (!kayak.kayakType || !kayak.duration) {
        return (acc += 0);
      }
      const kayakType = kayakTypes.find(
        (type) => type.name === kayak.kayakType
      );
      const duration = kayakType.pricing
        .filter((pricingItem) => filterKayakPricingInDate(pricingItem, date))
        .find((pricingItem) => pricingItem.durationName === kayak.duration);
      if (!duration) {
        return acc;
      }
      return (acc += duration.priceEur || 0);
    }, 0)
  );
};
