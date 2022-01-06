import styles from './Layout.module.scss'
import {Footer} from "../../components/Footer";

export const Layout = ({children}) => {
    return (
        <div className={styles.wrapper}>
            {children}
            <Footer/>
        </div>
    );
};

