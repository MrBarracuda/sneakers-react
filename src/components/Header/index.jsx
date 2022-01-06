import styles from './Header.module.scss'
import {Link} from 'react-router-dom';
import {useGetPrice} from "../../hooks/useGetPrice";

export const Header = ({onClickCart, cartItems}) => {

    const totalPrice = useGetPrice(cartItems)

    return (
        <header>
            <Link to="/">
                <div className={styles.logo}>
                    <img width={40} height={40} src="img/logo.png" alt="logo"/>
                    <div>
                        <h3>React Sneakers</h3>
                        <p>Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>
            <ul className={styles.nav}>

                <li onClick={onClickCart}>
                    <img width={18} height={18} src="img/cart.svg" alt="cart"/>
                    <span>$ {totalPrice}</span>
                </li>
                <li>
                    <Link to="/favorites">
                        <img width={18} height={18} src="img/heart.svg" alt="favorites"/>
                    </Link>
                </li>
                <li>
                    <Link to="/orders">
                        <img width={18} height={18} src="img/user.svg" alt="orders"/>
                    </Link>
                </li>

            </ul>
        </header>
    );
}
