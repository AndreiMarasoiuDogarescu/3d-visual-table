import React, { useState } from 'react';
import { Modal, Box, Button, TextField, Select, MenuItem } from '@mui/material';
import '../App.css';

const ShapeModal = ({ shapes, setShapes, showModal, setShowModal }) => {
    const [shape, setShape] = useState({ name: '', type: 'cube' });

    const handleClose = () => setShowModal(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShape(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSave = () => {
        const updatedShapes = [...shapes, shape];
        setShapes(updatedShapes);
        localStorage.setItem('shapes', JSON.stringify(updatedShapes));
        handleClose();
    };

    return (
        <Modal open={showModal} onClose={handleClose} className='modal-button'>
            <Box sx={{ ...modalStyle }}>
                <h2>Create Modal</h2>
                <TextField name="name" label="Name" onChange={handleChange} fullWidth margin="dense" />
                <Select name="type" value={shape.type} onChange={handleChange} fullWidth margin="dense">
                    <MenuItem value="cube">Cube</MenuItem>
                    <MenuItem value="sphere">Sphere</MenuItem>
                    <MenuItem value="cylinder">Cylinder</MenuItem>
                    <MenuItem value="cone">Cone</MenuItem>
                </Select>
                <div className='modal-container'>
                <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
                <Button variant="contained" color="secondary" onClick={handleClose}>Cancel</Button>
                </div>
            </Box>
        </Modal>
    );
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default ShapeModal;