import { useRouter } from "next/router";
import { BasePageLayout } from "../../../components/BasePageLayout/BasePageLayout";

export default function Confirm() {
  const router = useRouter();
  const { reservationId } = router.query;
  return (
    <BasePageLayout>
      <section className="mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6 text-center">
              <p className="subtitle text-primary">
                ¡Ya has acabado!
              </p>
              <h1 className="h2 mb-5">
                Tu reserva se ha realizado con éxito
              </h1>
              <div className="text-block">
                <p className="text-muted mb-3">
                  Muchas gracias por tu reserva.
                </p>
                <p className="text-muted mb-5">
                  En menos de 48h recibirás un correo electrónico con la
                  confirmación y todos los detalles de tu reserva.
                </p>
                <p className="subtitle text-primary pb-5">
                  Tu codigo de reserva es: <strong>{reservationId}</strong>
                </p>
                <p className="text-center mb-5">
                  <a className="btn btn-primary mx-2 mb-2" href="#">
                    <i className="far fa-file mr-2"></i>Ver tu reserva
                  </a>
                </p>
                <p className="mb-5 text-center">
                  <img
                    className="img-fluid"
                    src="img/illustration/undraw_celebration_0jvk.svg"
                    alt=""
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </BasePageLayout>
  );
}
