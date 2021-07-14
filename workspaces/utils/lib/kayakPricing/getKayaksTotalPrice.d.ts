import { KayakType } from "./types/KayakType";
export declare const getKayaksTotalPrice: (kayaks: {
    kayakType: string;
    duration: string;
}[], date: string, kayakTypes: KayakType[]) => string;
