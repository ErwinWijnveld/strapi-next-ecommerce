import { motion } from 'framer-motion';
import Head from 'next/head';
import { UserProvider } from '../contexts/authContext';
import { CartProvider } from '../contexts/cartContext';
import Nav from './Nav';

const variants = {
	hidden: { opacity: 0, x: 100 },
	enter: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: -100 },
};

const Layout = ({ user, loading = false, children, cart }: any) => {
	return (
		<UserProvider value={{ user, loading }}>
			<CartProvider cart={{ cart }}>
				<Head>
					<title>Erwin's site</title>
				</Head>
				<Nav />
				<motion.main
					initial="hidden"
					animate="enter"
					exit="exit"
					variants={variants}
					transition={{ duration: 0.5, type: 'easeInOut' }}
				>
					{children}
				</motion.main>
			</CartProvider>
		</UserProvider>
	);
};

export default Layout;
