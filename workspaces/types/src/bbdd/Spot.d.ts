export interface SpotKayakType {
  type: string; //single, double, journey...
  pax: string;
  pricing: [
    // List of prices per duration. For example: 1hour 9€ 2hour 16€...
    {
      from: string; //01/05
      to: string; //31/08
      duration: string; // 1hour, halfday
      priceEur: number;
    }
  ];
}

export interface Spot {
  title: string;
  description: string;
  locationName: string;
  location: Location;
  imageUrls: string[];
  mainImageUrl: string;
  kayakTypes: SpotKayakType[];
}
