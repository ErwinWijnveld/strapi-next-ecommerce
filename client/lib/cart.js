import Cookies from 'js-cookie';


export const getCartFromClientCookie = () => {
    if (typeof window === 'undefined') {
        return;
    }
    return Cookies.get('cart');
}

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

export const updateCartCookie = (cart) => {
    if (typeof window === 'undefined') {
        return;
    }
    const formattedCart = cart.map((item) => {
        return {
            productId: item.id,
            qty: item.qty,
        }
    })

    return Cookies.set('ew_cart', JSON.stringify(formattedCart));
}

export const getCartFromServerCookie = (req) => {
    if ((!req.headers.cookie || '' || !req.headers.cookie.includes('ew_cart'))) {
        return undefined;
    }

    // get ew_cart cookie from server
    const cartCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('ew_cart='));

    const cart = JSON.parse(decodeURIComponent(cartCookie.split('=')[1]));

    return cart;
}