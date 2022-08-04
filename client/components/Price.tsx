import React from 'react'
import styles from '../styles/Price.module.scss'

const Price = ({regularPrice, oldPrice}:any) => {
    return (
        <div className={styles.price}>
            {regularPrice && <p>€ {regularPrice}</p>}
            {oldPrice &&
                <p className={styles.oldPrice}>€ {oldPrice}</p>
            }
        </div>
    )
}

export default Price