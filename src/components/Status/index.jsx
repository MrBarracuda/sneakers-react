import {useContext} from "react";
import {AppContext} from "../../context";
import styles from './Status.module.scss'


export const Status = ({title, image, description}) => {
    const {setCartOpened} = useContext(AppContext)
    return (
        <div className={styles.cartEmpty}>
            <img src={image} width={120} alt="cart status"/>
            <h2>{title}</h2>
            <p>{description}</p>
            <button onClick={() => setCartOpened(false)} className={styles.greenButton}>
                <img src="/img/arrow.svg" alt="arrow"/>Go Back
            </button>
        </div>
    );
};
