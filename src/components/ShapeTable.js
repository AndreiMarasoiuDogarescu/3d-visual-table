import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ShapeModal from "./ShapeModal";

const ShapeTable = ({ shapes, setShapes, setShowCanvas, setCurrentShape }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (index) => {
    const updatedShapes = shapes.filter((_, i) => i !== index);
    setShapes(updatedShapes);
    localStorage.setItem("shapes", JSON.stringify(updatedShapes));
  };

  const handleRender = (shape) => {
    setCurrentShape(shape);
    setShowCanvas(true);
  };

  return (
    <TableContainer component={Paper}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowModal(true)}
      >
        Create
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setShowCanvas(true)}
      >
        Render All
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Shape Type</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shapes.map((shape, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{shape.name}</TableCell>
              <TableCell>{shape.type}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleRender(shape)}
                >
                  Render
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ShapeModal
        shapes={shapes}
        setShapes={setShapes}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </TableContainer>
  );
};

export default ShapeTable;
