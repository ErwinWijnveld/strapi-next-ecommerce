import Cookies from 'js-cookie';

export const addProductToCart = (productId, qty) => {
    if (typeof window === 'undefined') {
        return;
    }

    if (Cookies.get('ew_cart')) {
        Cookies.set('ew_cart', JSON.stringify([
            ...JSON.parse(Cookies.get('ew_cart')),
            {
                productId,
                qty,
            }
        ]));
    } else {
        Cookies.set('ew_cart', JSON.stringify([{
            productId,
            qty,
        }]));
    }
    return
};