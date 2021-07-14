import { FunctionComponent } from "react"
import { BaseHeader } from "../BaseHeader/BaseHeader"
import styles from './BasePageLayout.module.scss'

export const BasePageLayout: FunctionComponent = ({ children }) => {
    return (
        <div>
            <BaseHeader />
            <div className={styles.basePageLayoutContent}>
                {children}
            </div>
        </div>
    )
}