import {Card} from "../../components/Card";
import {Content} from "../Content/Content";
import styles from './Home.module.scss'

export const Home = ({
                         items,
                         searchValue,
                         setSearchValue,
                         onChangeSearchInput,
                         onAddToFavorite,
                         onAddToCart,
                         isLoading
                     }) => {


    const renderItems = () => {
        const filteredItems = items.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase()),
        );
        return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
            <Card
                key={index}
                onFavorite={obj => onAddToFavorite(obj)}
                onPlus={obj => onAddToCart(obj)}
                loading={isLoading}
                {...item}
            />
        ));
    };

    return (
        <Content>
            <div className={styles.heading}>
                <h1>{searchValue ? `Searching: "${searchValue}"` : 'All Sneakers'}</h1>
                <div className={styles.search}>
                    <img src="img/search.svg" alt="Search"/>
                    {searchValue && (
                        <img
                            onClick={() => setSearchValue('')}
                            src="img/btn-remove.svg"
                            alt="clear"
                            className={styles.clear}
                        />
                    )}
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Search..."/>
                </div>
            </div>
            <div className={styles.items}>{renderItems()}</div>
        </Content>
    );
};

