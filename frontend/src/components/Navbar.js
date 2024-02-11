import React, { useState } from "react";
import LoginModal from "./LoginModal.js";

function Navbar() {
    const [open, setOpen] = useState(false);
		const handleOpen = () => setOpen(true);
		const handleClose = () => setOpen(false);
		const handleLogout = () => {
			console.log("User logged out");
			handleClose(); 
		};
	return (
		<nav className="navbar">
			<div className="navbar-container">
				<a href="/" className="navbar-logo">
					TaskTracker
				</a>
				<ul className="navbar-menu">
					<li className="navbar-item">
						<a href="/" className="navbar-links">
							Profile
						</a>
					</li>
					<li className="navbar-item"></li>
					  <button onClick={handleOpen} className="navbar-links">
						  Sign In
					  </button>
				</ul>
			</div>
			<LoginModal open={open} handleClose={handleClose} />
		</nav>
	);
}

export default Navbar;
