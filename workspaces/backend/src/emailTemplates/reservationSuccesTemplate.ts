import mjml2html from 'mjml';

export const reservationSuccessTemplate = (
  userEmail: string,
  reservationId: string
): string => {
  return mjml2html(`<mjml owa="desktop" version="4.3.0">
  <mj-head>
    <mj-font href="https://fonts.googleapis.com/css?family=Montserrat" name="Montserrat"></mj-font>
    <mj-font href="https://fonts.googleapis.com/css?family=Raleway" name="Raleway"></mj-font>
    <mj-font href="https://fonts.googleapis.com/css?family=Open Sans" name="Open Sans"></mj-font>
    <mj-preview></mj-preview>
  </mj-head>
  <mj-body background-color="#f8f8f8">
    <mj-section background-repeat="repeat" background-size="auto" padding-bottom="0px" padding-top="0px" padding="20px 0px 20px 0px" text-align="center"></mj-section>
    <mj-section background-color="#ffffff" background-repeat="repeat" padding-bottom="0px" padding-left="0px" padding-right="0px" padding-top="0px" padding="20px 0" text-align="center">
      <mj-column>
        <mj-divider border-color="#58E2C2" border-style="solid" border-width="7px" padding-bottom="40px" padding-left="0px" padding-right="0px" padding-top="0px" padding="10px 25px" width="100%"></mj-divider>
        <mj-image align="center" alt="" border="none" href="" padding-bottom="0px" padding-top="0px" padding="10px 25px" src="https://lh5.googleusercontent.com/s4-KNlegPOHxe29jccgULt1Xd9UPp5GWjU9c39jh1cEqthFvMdpuvyj1rUtTqGFwoqeUl4Od-pwA-wdSLwdKRcMkavZ8VCOkoTz_jPhWXKHCr2llfPM_CBtq3Ye5aTQmz18vN9ugCWfE2i5nE1tg4E5D15ZP6u7A5rvsguTrj2UJ4GDLER5YHVG_hCaCK3-KtZj9MEAGACiKyzQNa5XzqvupnF-CTJHmgfWufLw=w512" target="_blank" title="" height="auto" width="110px"></mj-image>
      </mj-column>
    </mj-section>
    <mj-section background-color="#ffffff" background-repeat="repeat" background-size="auto" padding-bottom="0px" padding-top="0px" padding="20px 0" text-align="center">
      <mj-column>
        <mj-image align="center" alt="" border="none" height="auto" href="" padding-bottom="0px" padding-left="50px" padding-right="50px" padding-top="40px" padding="10px 25px" src="https://www.mailjet.com/wp-content/uploads/2019/07/Welcome-02.png" target="_blank" title="" width="300px"></mj-image>
      </mj-column>
    </mj-section>
    <mj-section background-color="#ffffff" background-repeat="repeat" background-size="auto" padding-bottom="30px" padding-top="30px" padding="20px 0px 20px 0px" text-align="center">
      <mj-column>
        <mj-text align="left" color="#797e82" font-family="Open Sans, Helvetica, Arial, sans-serif" font-size="13px" line-height="22px" padding-bottom="0px" padding-left="50px" padding-right="50px" padding-top="0px" padding="0px 25px 0px 25px">
          <h1 style="text-align:center; color: #000000; line-height:32px">¡Enhorabuena ${userEmail}, has realizado una reserva!</h1>
        </mj-text>
        <mj-text align="left" color="#797e82" font-family="Open Sans, Helvetica, Arial, sans-serif" font-size="13px" line-height="22px" padding-bottom="0px" padding-left="50px" padding-right="50px" padding-top="0px" padding="0px 25px 0px 25px">
          <p style="margin: 10px 0; text-align: center;">El ID de tu resserva es: ${reservationId}</p>
        </mj-text>
        <mj-button align="center" background-color="#58E2C2" border-radius="100px" border="none" color="#ffffff" font-family="Open Sans, Helvetica, Arial, sans-serif" font-size="13px" font-weight="normal" href="http://localhost:3000/my-reservations" inner-padding="15px 25px 15px 25px" padding-bottom="10px" padding-top="20px" padding="10px 25px" text-decoration="none" text-transform="none"><b style="font-weight:700"><b style="font-weight:700">Ver mis reservas</b></b></mj-button>
      </mj-column>
    </mj-section>
    <mj-section background-repeat="repeat" background-size="auto" padding-bottom="0px" padding-top="20px" padding="20px 0px 20px 0px" text-align="center">
      <mj-column>
        <mj-text align="center" color="#797e82" font-family="Open Sans, Helvetica, Arial, sans-serif" font-size="11px" line-height="22px" padding-bottom="0px" padding-top="0px" padding="0px 20px 0px 20px">
          <p><span style="font-size:10px">Created by&nbsp;</span><a target="_blank" rel="noopener noreferrer" style="font-size:10px; color:inherit; text-decoration: none" href="#"><span style="color:#58E2C2"><u>FeelMenorca</u></span></a></p>
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`).html;
};
