export interface Reservation {
    createdAt: string;
    userId: string;
    spotId: string;
    details: {
        date: string;
        kayaks: {
            kayakType: string;
            duration: string;
        }[]
    },
    totalPriceEur: string;
    isCanceled: boolean;
}