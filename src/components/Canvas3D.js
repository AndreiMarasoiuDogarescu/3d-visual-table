import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { Button } from "@mui/material";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const Canvas3D = ({ shapes, setShowCanvas, currentShape }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    // OrbitControls
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;
    orbitControls.dampingFactor = 0.25;
    orbitControls.screenSpacePanning = false;
    orbitControls.maxPolarAngle = Math.PI / 2;


    // Ray

    // Shape Name
    const createTextSprite = (text) => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      context.font = "Bold 20px Arial";
      context.fillStyle = "rgba(255,255,255,1)";
      context.fillText(text, 0, 20);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(2, 1, 1);
      return sprite;
    };

    shapes.forEach((shapeData, index) => {
      let shape;
      if (shapeData.type === "cube") {
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshNormalMaterial({
          color: shapeData.color || 0xffffff,
        });
        shape = new THREE.Mesh(geometry, material);
      } else if (shapeData.type === "sphere") {
        const geometry = new THREE.SphereGeometry();
        const material = new THREE.MeshNormalMaterial({
          color: shapeData.color || 0xffffff,
        });
        shape = new THREE.Mesh(geometry, material);
      } else if (shapeData.type === "cylinder") {
        const geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
        const material = new THREE.MeshNormalMaterial({
          color: shapeData.color || 0xffffff,
        });
        shape = new THREE.Mesh(geometry, material);
      } else if (shapeData.type === "cone") {
        const geometry = new THREE.ConeGeometry(1, 2, 32);
        const material = new THREE.MeshNormalMaterial({
          color: shapeData.color || 0x00ff00,
        });
        shape = new THREE.Mesh(geometry, material);
      }

      if (shape) {
        shape.position.set(index * 3, 0, 0); // Position the shapes next to each other
        scene.add(shape);
        shape.userData = { name: shapeData.name };
        shape.callback = () => {
          alert(`Shape: ${shapeData.name}`);
        };

        const textSprite = createTextSprite(shapeData.name);
        textSprite.position.set(0, 1.5, 0); // Position the text above the shape
        shape.add(textSprite);
      }

      camera.position.z = 10;
      const transformControls = new TransformControls(camera, renderer.domElement);
      transformControls.attach(shape);
      transformControls.visible = false;
      scene.add(transformControls);
      
      // Toggle TransformControls visibility
      const toggleControlsVisibility = () => {
        transformControls.visible = !transformControls.visible;
      };
      
      // Add event listeners for TransformControls
      window.addEventListener("keydown", function (event) {
        switch (event.code) {
          case "KeyG":
            transformControls.setMode("translate");
            break;
          case "KeyR":
            transformControls.setMode("rotate");
            break;
          case "KeyS":
            transformControls.setMode("scale");
            break;
        }
      });
      
      // Enable/Disable OrbitControls based on TransformControls state
      transformControls.addEventListener('dragging-changed', function (event) {
        orbitControls.enabled = !event.value;
      });
      
      // Toggle TransformControls visibility on click
      renderer.domElement.addEventListener("click", () => {
        toggleControlsVisibility();
      });
      
      // Handle window resize
      window.addEventListener("resize", onWindowResize, false);
      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      function animate() {
        requestAnimationFrame(animate);
        render();
      }

      function render() {
        renderer.render(scene, camera);
      }

      animate();
    });

    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, [shapes, currentShape]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setShowCanvas(false)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          minWidth: "40px",
          padding: "0",
        }}
      >
        X
      </Button>
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default Canvas3D;
