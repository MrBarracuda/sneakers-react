import styles from './Footer.module.scss'
import {Social} from "./Social";

export const Footer = () => {
    return (
        <footer>

            <div>
                <p>My first react project</p>
            </div>

            <div>
                <ul className={styles.list}>
                    <li className={styles.listItem}><Social type='Facebook'/></li>
                    <li className={styles.listItem}><Social type='GitHub'/></li>
                    <li className={styles.listItem}><Social type='LinkedIn'/></li>
                    <li className={styles.listItem}><Social type='Skype'/></li>
                    <li className={styles.listItem}><Social type='Instagram'/></li>
                </ul>
            </div>

        </footer>


    );
};