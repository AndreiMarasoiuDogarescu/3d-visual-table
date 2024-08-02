import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Button } from '@mui/material';

const Canvas3D = ({ shapes, setShowCanvas, currentShape }) => {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        mount.appendChild(renderer.domElement);

        // Add the current shape to the scene
        let shape;
        if (currentShape) {
            if (currentShape.type === 'cube') {
                const geometry = new THREE.BoxGeometry();
                const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
                shape = new THREE.Mesh(geometry, material);
            } else if (currentShape.type === 'sphere') {
                const geometry = new THREE.SphereGeometry();
                const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
                shape = new THREE.Mesh(geometry, material);
            }
            if (shape) {
                scene.add(shape);
            }
        }

        camera.position.z = 5;

        const animate = () => {
            requestAnimationFrame(animate);
            if (shape) {
                shape.rotation.x += 0.01;
                shape.rotation.y += 0.01;
            }
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            mount.removeChild(renderer.domElement);
        };
    }, [currentShape]);

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={() => setShowCanvas(false)}>Close</Button>
            <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
        </div>
    );
};

export default Canvas3D;
