import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Button } from '@mui/material';

const Canvas3D = ({ shapes, setShowCanvas, currentShape }) => {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mount.appendChild(renderer.domElement);

        shapes.forEach(shapeData => {
            let shape;
            console.log('Shape type:', shapeData.type); // Debug log

            if (shapeData.type === 'cube') {
                const geometry = new THREE.BoxGeometry();
                const material = new THREE.MeshBasicMaterial({ color: shapeData.color || 0x00ff00 });
                shape = new THREE.Mesh(geometry, material);
            } else if (shapeData.type === 'sphere') {
                const geometry = new THREE.SphereGeometry();
                const material = new THREE.MeshBasicMaterial({ color: shapeData.color || 0x00ff00 });
                shape = new THREE.Mesh(geometry, material);
            } else if (shapeData.type === 'cylinder') {
                const geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
                const material = new THREE.MeshBasicMaterial({ color: shapeData.color || 0x00ff00 });
                shape = new THREE.Mesh(geometry, material);
            } else if (shapeData.type === 'cone') {
                const geometry = new THREE.ConeGeometry(1, 2, 32);
                const material = new THREE.MeshBasicMaterial({ color: shapeData.color || 0x00ff00 });
                shape = new THREE.Mesh(geometry, material);
            }

            if (shape) {
                shape.position.set(0, 0, 0); // Ensure the shape is positioned within the view
                scene.add(shape);
                shape.userData = { name: shapeData.name };
                shape.callback = () => {
                    alert(`Shape: ${shapeData.name}`);
            };
            }
        });

        camera.position.z = 5;

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            mount.removeChild(renderer.domElement);
        };
    }, [shapes, currentShape]);

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={() => setShowCanvas(false)}>Close</Button>
            <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
        </div>
    );
};

export default Canvas3D;