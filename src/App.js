import React, { useState, useEffect } from 'react';
import ShapeTable from './components/ShapeTable';
import Canvas3D from './components/Canvas3D';

const App = () => {
    const [shapes, setShapes] = useState([]);
    const [showCanvas, setShowCanvas] = useState(false);
    const [currentShape, setCurrentShape] = useState(null);

    useEffect(() => {
        const savedShapes = JSON.parse(localStorage.getItem('shapes'));
        if (savedShapes) {
            setShapes(savedShapes);
        }
    }, []);

    return (
        <div>
            {!showCanvas && (
                <ShapeTable shapes={shapes} setShapes={setShapes} setShowCanvas={setShowCanvas} setCurrentShape={setCurrentShape} />
            )}
            {showCanvas && (
                <Canvas3D shapes={shapes} setShowCanvas={setShowCanvas} currentShape={currentShape} />
            )}
        </div>
    );
};

export default App;
