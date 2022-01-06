import styles from './Cart.module.scss'
import api from '../../api/baseURL'
import {useState} from "react";
import {useGetPrice} from "../../hooks/useGetPrice";
import {handleFetchError} from "../../App";
import {Status} from "../Status";


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); // remake it

export const Cart = ({onClose, onRemove, setCartItems, cartItems = [], opened}) => {

    const totalPrice = useGetPrice(cartItems);
    const tax = totalPrice * 0.05

    const [orderId, setOrderId] = useState(null)
    const [isComplete, setIsComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const {data} = await api.post('/orders', {
                items: cartItems,
            });
            setOrderId(data.id);
            setIsComplete(true);
            setCartItems([]);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await api.delete('/cart/' + item.id);
                await delay(1000);
            } // remake it
        } catch (error) {
            handleFetchError(error)
        }
        setIsLoading(false);
    };

    return (
        <div className={`${styles.overlay} ${opened && styles.visible}`}>
            <div className={styles.cart}>

                {cartItems.length > 0 && (
                    <div className={styles.cartHeading}>
                        <h2>Cart</h2>
                        <img onClick={onClose} src="img/btn-remove.svg" alt="Close"/>
                    </div>
                )}



                {cartItems.length > 0 ? (
                    <div className={styles.cartFull} >
                        <div className={styles.cartItems}>
                            {cartItems.map((obj) => (
                                <div key={obj.id} className={styles.cartItemsExtend}>
                                    <div
                                        style={{backgroundImage: `url(${obj.imageUrl})`}}
                                       className={styles.cartItemImg}/>

                                    <div className={styles.cartDesc}>
                                        <p>{obj.title}</p>
                                        <b>$ {obj.price}</b>
                                    </div>
                                    <img
                                        onClick={() => onRemove(obj.id)}
                                        className={styles.removeBtn}
                                        src="img/btn-remove.svg"
                                        alt="Remove"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className={styles.cartTotalBlock}>
                            <ul>
                                <li>
                                    <span>Total:</span>
                                    <div/>
                                    <b>$ {totalPrice}</b>
                                </li>
                                <li>
                                    <span>Tax 5%:</span>
                                    <div/>
                                    <b>$ {tax}</b>
                                </li>
                            </ul>
                            <button disabled={isLoading} onClick={onClickOrder} className={styles.greenButton}>
                                Place order <img src="img/arrow.svg" alt="Arrow"/>
                            </button>
                        </div>
                    </div>
                ) : (
                    <Status
                        title={isComplete ? "Order complete" : "Cart is empty"}
                        description={isComplete ? `Have a good one, dear customer! \n Order Number is ${orderId}` : "Add at least one item to make a purchase"}
                        image={isComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}
                    />
                )}
            </div>
        </div>
    );
}
