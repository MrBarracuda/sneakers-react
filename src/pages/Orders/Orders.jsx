import {useEffect, useState} from "react";
import styles from './Orders.module.scss'
import api from '../../api/baseURL'

import {Card} from "../../components/Card";
import {handleFetchError} from "../../App";
import {Content} from "../Content/Content";


export const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData(){
            try {
                const { data } = await api.get('/orders');
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
                setIsLoading(false);
            } catch (error) {
                handleFetchError(error)
            }
        }
        fetchData()

    }, [])

    return (
        <Content>
            <div className={styles.heading}>
                <h1>My Orders</h1>
            </div>

            <div className={styles.orders}>
                {(isLoading ? [...Array(8)] : orders).map((item, index) => (
                    <Card key={index} loading={isLoading} {...item} />
                ))}
            </div>
        </Content>
    );
};