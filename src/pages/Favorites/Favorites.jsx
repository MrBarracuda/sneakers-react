import {Card} from "../../components/Card";
import {Content} from "../Content/Content";
import styles from './Favorites.module.scss'

export const Favorites = ({favorites, onAddToFavorite}) => {


    return (
        <Content>
            <div className={styles.heading}>
                <h1>Favorites</h1>
            </div>

            <div className={styles.favoriteItems}>
                {favorites.map((item, index) => (
                    <Card key={index} favorited={true} onFavorite={onAddToFavorite} {...item} />
                ))}
            </div>
        </Content>
    );
};
