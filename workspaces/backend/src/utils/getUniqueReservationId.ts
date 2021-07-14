import { Db } from "mongodb";
import { customAlphabet } from "nanoid";

const MAX_RESERVATION_ID_ATTEMPTS = 10;
const nanoid = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 5);

export const getUniqueReservationId = async (db: Db) => {
  let reservationID;
  for (let i = 0; i < MAX_RESERVATION_ID_ATTEMPTS; i++) {
    reservationID = nanoid();
    const ddbbReservationIds = await db
      .collection("reservations")
      .find({ reservationID })
      .toArray();
    if (!ddbbReservationIds.length) {
      return reservationID;
    }
    if (i >= MAX_RESERVATION_ID_ATTEMPTS - 1) {
      return false;
    }
  }
};
