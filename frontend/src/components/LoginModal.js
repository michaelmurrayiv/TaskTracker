import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

function LoginModal({ open, handleClose }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginView, setIsLoginView] = useState(true); // New state to toggle between login and register

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        if (isLoginView) {
            // Login logic
            console.log("Logging in with:", username, password);
fetch("http://localhost:9999/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				password: password,
			}),
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.then((data) => {
			console.log("Login successful:", data.token);
			localStorage.setItem("token", data.token);
		})
		.catch((error) => console.error("Error during login:", error));       
	 } else {
            // Registration logic
            console.log("Registering with:", username, password);
		fetch("http://localhost:9999/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.then((data) => {
			console.log("Registration successful:", data.token);
			localStorage.setItem("token", data.token);
		})
		.catch((error) => console.error("Error during registration:", error));        }
        handleClose(); 
    };

    // Toggle view between login and registration
    const toggleView = () => {
        setIsLoginView(!isLoginView);
        setUsername("");
        setPassword("");
    };

    // Modal style
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={style} component="form" onSubmit={handleSubmit}>
                <Typography id="modal-title" variant="h6" component="h2">
                    {isLoginView ? "Log In" : "Register"}
                </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Username"
                    autoComplete="username"
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    {isLoginView ? "Log In" : "Register"}
                </Button>
                <Button
                    fullWidth
                    variant="text"
                    sx={{ mt: 1 }}
                    onClick={toggleView}
                > 
                    {isLoginView ? "Need an account? Register" : "Have an account? Log In"}
                </Button>
            </Box>
        </Modal>
    );
}

export default LoginModal;