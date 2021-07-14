import { filterKayakPricingInDate } from "./filterKayakPricingInDate";
import { KayakType } from "./types/KayakType";

export const getKayakPriceInDate = (
  kayakType: string,
  kayakTime: string,
  date: string,
  kayakTypes: KayakType[]
) => {
  const type = kayakTypes.find((type) => type.name === kayakType);
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(
    type.pricing
      .filter((pricingItem) => filterKayakPricingInDate(pricingItem, date))
      .find((pricingItem) => pricingItem.durationName === kayakTime).priceEur
  );
};
