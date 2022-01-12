import {useState, useContext, useEffect} from "react";
import {AppContext} from "../../context";
import ContentLoader from 'react-content-loader';
import styles from './Card.module.scss';

export const Card = ({
                         id,
                         title,
                         imageUrl,
                         price,
                         onFavorite,
                         onPlus,
                         favorited = false,
                         loading = false,
                     }) => {
    const {isItemAdded} = useContext(AppContext)
    const [isFavorite, setIsFavorite] = useState(favorited)
    const obj = {id, parentId: id, title, imageUrl, price}
    const src = {
        fav: {
            add: 'img/liked.svg',
            remove: 'img/unliked.svg'
        },
        cart: {
            add: 'img/btn-checked.svg',
            remove: 'img/btn-plus.svg'
        }
    }

    const onClickPlus = () => onPlus(obj)

    const onClickFavorite = () => {
        onFavorite(obj)
        setIsFavorite(!isFavorite)
    }
    // useEffect(() => {
    //     setIsFavorite(isFavorite)
    // },[isFavorite])

    return (
        <div className={styles.card}>
            {loading ? (
                <ContentLoader
                    speed={2}
                    width={155}
                    height={250}
                    viewBox="0 0 155 265"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb">
                    <rect x="1" y="0" rx="10" ry="10" width="155" height="155"/>
                    <rect x="0" y="167" rx="5" ry="5" width="155" height="15"/>
                    <rect x="0" y="187" rx="5" ry="5" width="100" height="15"/>
                    <rect x="1" y="234" rx="5" ry="5" width="80" height="25"/>
                    <rect x="124" y="230" rx="10" ry="10" width="32" height="32"/>
                </ContentLoader>
            ) : (
                <>
                    {onFavorite && (
                        <div className={styles.favorite} onClick={onClickFavorite}>
                            <img src={isFavorite ? src.fav.add : src.fav.remove} alt="add item to favorites"/>
                        </div>
                    )}
                    <img width="100%" height={135} src={imageUrl} alt="Sneakers"/>
                    <h5>{title}</h5>
                    <div className={styles.cardInfo}>
                        <div className={styles.details}>
                            <span>Price:</span>
                            <b>$ {price}</b>
                        </div>
                        {onPlus && (
                            <img
                                className={styles.plus}
                                onClick={onClickPlus}
                                src={isItemAdded(id) ? src.cart.add : src.cart.remove}
                                alt="add item to cart"
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
