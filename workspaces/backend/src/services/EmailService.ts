import axios from 'axios';
import { reservationSuccessTemplate } from '../emailTemplates/reservationSuccesTemplate';
import { changePasswordTemplate } from '../emailTemplates/changePasswordTemplate';

export class EmailService {
  static sendEmail(to: string, html: string, subject: string) {
    return axios({
      method: 'post',
      url: process.env.EMAIL_MICROSERVICE_URL,
      data: {
        from: process.env.TRANSMITTER_EMAIL_ADDRESS,
        to,
        subject,
        html,
      },
    });
  }
  static sendReservationConfirmationEmail(
    userEmail: string,
    reservationId: string
  ) {
    return EmailService.sendEmail(
      userEmail,
      reservationSuccessTemplate(userEmail, reservationId),
      'Confirmacion de reserva'
    );
  }
  static sendChangePasswordRequest(
    userEmail: string,
    changePasswordToken: string
  ) {
    return EmailService.sendEmail(
      userEmail,
      changePasswordTemplate(changePasswordToken),
      'Cambiar contraseña'
    );
  }
}
