// import '../styles/index.css'
import React, { useState } from 'react';
// import '../styles/Navbar.css'
import Link from 'next/link';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

const Navbar = () => {
	const [stateBurger, setStateBurger] = useState('')
	const [activeMenu, setActiveMenu] = useState('')
	const [closeMenu, setCloseMenu] = useState('')

	const toggleMenu = () => {
		if (stateBurger === 'active') {
			setStateBurger('')
			setActiveMenu('')
			setCloseMenu('')
		} else {
			setStateBurger('active')
			setActiveMenu('menu-active')
			setCloseMenu('active-close')
		}
	}

	return (
		<>
			<div className="barra-menu">
				<Link href="/">
					<a className="logo selectionNone">
						<img src="/static/assets/Blog-Post.png" style={{maxWidth:"40px",maxHeight:"auto"}} alt="Abstract Code" />
					</a>
				</Link>
				<div style={{margin:"7px"}}></div>
				<div id="hamburger-icon" className={stateBurger} onClick={toggleMenu}>
				<MenuOpenIcon/>
				</div>
			</div>
			<div className={`menu ${activeMenu}`}>
				<nav>
					<ul>
						<li>
							<Link href="/">
								<a onClick={toggleMenu}>Tech Blogsite</a>
							</Link>
						</li>
						<li>
							<Link href="/#aboutblog">
								<a onClick={toggleMenu}>About</a>
							</Link>
						</li>
						<li>
							<Link href="/#HomePage">
								<a onClick={toggleMenu}>Features</a>
							</Link>
						</li>
						<li>
							<Link href="/#design-box">
								<a onClick={toggleMenu}>User Interface</a>
							</Link>
						</li>
						<li>
							<Link href="/#quotes">
								<a onClick={toggleMenu}>Quotes</a>
							</Link>
						</li>	
						<li>
							<Link href="/blogs">
								<button className="btn btn-warning" onClick={toggleMenu}>Blogs</button>
							</Link>
						</li>	
					</ul>
					<div className="title-navbar">
						<span>Tech Blogsite</span>
					</div>
					<ul>
						<li>
							<Link href="/signup">
								<button className="btn btn-info" onClick={toggleMenu}>Sign-up</button>
							</Link>
						</li>
						<li>
							<Link href="/login">
								<button className="btn btn-success" onClick={toggleMenu}>login</button>
							</Link>
						</li>
					</ul>
				</nav>
			</div>
			<div onClick={toggleMenu} className={`close-menu ${closeMenu}`}></div>
		</>
	)
}

export default Navbar
