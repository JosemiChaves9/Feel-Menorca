export interface TempReservation {
  kayaks: { kayakType: string; duration: string }[];
  date: string;
  spotId: string;
}

const TEMP_RESERVATION_STORAGE_KEY = `tempreservation`;

export class TempReservationService {
  static setTempReservation(tempReservation: TempReservation) {
    sessionStorage.setItem(
      TEMP_RESERVATION_STORAGE_KEY,
      JSON.stringify(tempReservation)
    );
  }

  static getTempReservation(): TempReservation | null {
    // try/catch to avoid error if parsing non-json content in session storage
    try {
      return JSON.parse(sessionStorage.getItem(TEMP_RESERVATION_STORAGE_KEY));
    } catch {
      return null;
    }
  }
  static clearTempReservation() {
    sessionStorage.removeItem(TEMP_RESERVATION_STORAGE_KEY);
  }
}
