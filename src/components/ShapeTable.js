import React, { useState } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import Canvas3D from "./Canvas3D";
import ShapeModal from "./ShapeModal";
import "../App.css";
import { div } from "three/webgpu";

const ShapeTable = ({ shapes, setShapes }) => {
  const [showCanvas, setShowCanvas] = useState(false);
  const [currentShape, setCurrentShape] = useState(null);
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
    <div className="wrapper">
    <div className="table-container">
    {!showCanvas ? (
      <TableContainer component={Paper} className="centered-table">
          <div className="mbutton-container">
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
            onClick={() => {
              setCurrentShape(null);
              setShowCanvas(true);
            }}
          >
            Render All
          </Button>
          </div>
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
      ) : (
        <Canvas3D
          shapes={currentShape ? [currentShape] : shapes}
          setShowCanvas={setShowCanvas}
          currentShape={currentShape}
        />
      )}
    </div>
    </div>
  );
};

export default ShapeTable;