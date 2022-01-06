import {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import {AppContext} from "./context";
import api from './api/baseURL'

import {Home} from "./pages/Home/Home";
import {Favorites} from "./pages/Favorites/Favorites";
import {Orders} from "./pages/Orders/Orders";
import {Layout} from "./pages/Layout/Layout";
import {Header} from './components/Header';
import {Cart} from './components/Cart';


export const handleFetchError = error => {
    if (error.response) {
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
    } else if (error.request) {
        console.log(error.request)
    } else {
        console.log(`Error: ${error.message}`)
    }
}

function App() {
    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [cartOpened, setCartOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
                    api.get('/cart'),
                    api.get('/favorites'),
                    api.get('/items'),
                ]);

                setIsLoading(false);
                setCartItems(cartResponse.data);
                setFavorites(favoritesResponse.data);
                setItems(itemsResponse.data);
            } catch (error) {
                handleFetchError(error)
            }
        }

        fetchData();
    }, []);

    const onAddToCart = async (obj) => {
        try {
            const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
            if (findItem) {
                setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
                await api.delete(`/cart/${findItem.id}`);
            } else {
                setCartItems((prev) => [...prev, obj]);
                const {data} = await api.post('/cart', obj);
                setCartItems((prev) =>
                    prev.map((item) => {
                        if (item.parentId === data.parentId) {
                            return {
                                ...item,
                                id: data.id,
                            };
                        }
                        return item;
                    }),
                );
            }
        } catch (error) {
            handleFetchError(error)
        }
    };

    const onRemoveItem = (id) => {
        try {
            api.delete(`/cart/${id}`);
            setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
        } catch (error) {
            handleFetchError(error)
        }
    };

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
                api.delete(`/favorites/${obj.id}`);
                setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
            } else {
                const {data} = await api.post('/favorites', obj,);
                setFavorites((prev) => [...prev, data]);
            }
        } catch (error) {
            handleFetchError(error)
        }
    };

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    };

    const isItemAdded = (id) => {
        return cartItems.some((obj) => Number(obj.parentId) === Number(id));
    };

    return (
        <AppContext.Provider
            value={{
                items,
                cartItems,
                favorites,
                isItemAdded,
                onAddToFavorite,
                onAddToCart,
                setCartOpened,
                setCartItems,
            }}>
            <Layout>
                <Cart
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                    onClose={() => setCartOpened(false)}
                    onRemove={onRemoveItem}
                    opened={cartOpened}
                />

                <Header cartItems={cartItems} onClickCart={() => setCartOpened(true)}/>

                <Routes>
                    <Route path="/" element={<Home
                        items={items}
                        cartItems={cartItems}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        onChangeSearchInput={onChangeSearchInput}
                        onAddToFavorite={onAddToFavorite}
                        onAddToCart={onAddToCart}
                        isLoading={isLoading}
                    />}/>

                    <Route path="/favorites" element={<Favorites
                        onAddToFavorite={onAddToFavorite}
                        favorites={favorites}
                    />}/>

                    <Route path="/orders" element={<Orders
                        onAddToFavorite={onAddToFavorite}
                        onAddToCart={onAddToCart}
                    />}/>
                </Routes>

            </Layout>
        </AppContext.Provider>
    );
}

export default App;
