import { paymentCalculation } from '../utils/paymentCalculation';
import { DbService } from '../services/DbService';
import { PaymentService } from '../services/PaymentService';
import { ReservationParams, UserContext } from '../types/types';
import { EmailService } from '../services/EmailService';

export const createReservationMutation = async (
  parent: null | undefined,
  { timestamp, spotId, kayakReservations, paymentId }: ReservationParams,
  context: UserContext
) => {
  // Can't access without authentication
  if (!context.user) {
    return {
      error: 'Es necesario estar identificado como usuario.',
    };
  }

  // Get spot data
  const spotData = await DbService.getSpotById(spotId);

  // Price calculation
  const priceEur = paymentCalculation(
    kayakReservations,
    timestamp,
    spotData.kayakTypes
  );

  // Create charge to credit card
  let stripeChargeId;
  try {
    stripeChargeId = await PaymentService.createCharge(paymentId, priceEur);
  } catch (e) {
    return { error: `Couldn't create payment` };
  }

  // Create reservation in DB
  const createReservationResponse = await DbService.createReservation(
    timestamp,
    context.user._id,
    spotId,
    kayakReservations,
    stripeChargeId,
    priceEur
  );

  //Send confirmation email
  try {
    await EmailService.sendReservationConfirmationEmail(
      context.user.email,
      createReservationResponse.reservationID
    );
  } catch (e) {
    return new Error(e);
  }

  return createReservationResponse;
};
