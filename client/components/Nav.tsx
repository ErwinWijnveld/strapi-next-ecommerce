import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import { BsCart3 } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import { useFetchUser, useUser } from '../contexts/authContext';
import { unsetToken } from '../lib/auth';

const Nav = () => {
	const { user, loading } = useFetchUser();

	const handleLogout = () => {
		unsetToken();
	};

	return (
		<header className="py-4">
			<nav className="flex justify-between items-center container">
				<Link href="/" passHref>
					ErwinWijnveld
				</Link>

				<ul className="p-0 flex items-center gap-8">
					<li>
						<Link href="/about">About</Link>
					</li>
					<li>
						<Link href="/cart">
							<a>
								<BsCart3 />
							</a>
						</Link>
					</li>
					{/* <li>
                        <Link href="/products">
                            Products
                        </Link>
                    </li> */}
					{user ? (
						<button
							onClick={() => handleLogout()}
							className="btn flex items-center gap-2"
						>
							<FaUserCircle />
							{user}
						</button>
					) : (
						<Link href={'/login'}>
							<button className="btn">Login</button>
						</Link>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default Nav;
