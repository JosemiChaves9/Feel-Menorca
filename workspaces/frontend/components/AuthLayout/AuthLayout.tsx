import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import styles from './AuthLayout.module.scss';

export const AuthLayout = ({ children, title }) => {
    const router = useRouter();
    return (
        <div className='container-fluid px-3'>
            <div className='row min-vh-100'>
                <div className='col-md-8 col-lg-6 col-xl-5 d-flex align-items-center'>
                    <div className='w-100 py-5 px-md-5 px-xl-6 position-relative'>
                        <div className='mb-3'>
                            <img
                                className={`${styles.imgFix} img-fluid mb-3`}
                                src='/feelmenorca-logo.png'
                                alt='Beach Sport Rent Logo'
                            />

                            <h2 className="py-3">{title}</h2>
                        </div>
                        {children}
                        <div>
                            <a
                                onClick={() => router.push('/')}
                                className={`close-absolute mr-md-5 mr-xl-6 border-2 pt-5 mx-3 ${styles.closeButton}`}>
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    size='2x'
                                    className={`${styles.closeIcon}`}
                                />
                            </a>
                        </div>
                    </div>
                </div>
                <div className='col-md-4 col-lg-6 col-xl-7 d-none d-md-block'>
                    <div className={`${styles.bgFix} bg-cover h-100 mr-n3`}></div>
                </div>
            </div>
        </div>
    )
}