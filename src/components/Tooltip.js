// src/components/Tooltip.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Tooltip = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        bgcolor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        zIndex: 1000,
      }}
    >
      <Typography variant="body2">
        <strong>Shortcuts:</strong>
        <br />
        <strong>R:</strong> Rotate
        <br />
        <strong>G:</strong> Translate
        <br />
        <strong>S:</strong> Scale
        <br />
        <strong>H:</strong> Toggle Transform Controls
      </Typography>
    </Box>
  );
};

export default Tooltip;