import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const token = localStorage.getItem('token');

function TaskModal({ open, handleClose }) {
	const [description, setDescription] = useState("");
	const [dueDate, setDueDate] = useState("");

	const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:9999/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
										'authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    description,
                    dueDate,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            };

            setDescription("");
            setDueDate("");
            handleClose(); 

        } catch (error) {
            console.error('Failed to create task:', error);
        }
    };


	// Modal style
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		boxShadow: 24,
		p: 4,
	};

	return (
		<Modal
      className="new-task"
			open={open}
			onClose={handleClose}
			aria-labelledby="new task"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style} component="form" onSubmit={handleSubmit}>
				<Typography id="modal-modal-title" variant="h6" component="h2">
					Create Task
				</Typography>
				<TextField
					margin="normal"
					required
					fullWidth
					id="description"
					label="Task Description"
					name="description"
					autoComplete="description"
					autoFocus
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<TextField
					margin="normal"
					fullWidth
					id="dueDate"
					label="Due Date"
					name="dueDate"
					type="date"
					InputLabelProps={{ shrink: true }}
					autoComplete="due-date"
					value={dueDate}
					onChange={(e) => setDueDate(e.target.value)}
				/>
				<Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
					<Button
						variant="outlined"
						onClick={handleClose} // This will close the modal without submitting
					>
						Cancel
					</Button>
					<Button type="submit" variant="contained" sx={{ ml: 2 }}>
						Create Task
					</Button>
				</Box>
			</Box>
		</Modal>
	);
}

export default TaskModal;
