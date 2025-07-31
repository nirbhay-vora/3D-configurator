import { useLoader, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

export default function Model({ fabricCanvasRef }) {
  const modelRef = useRef();
  const [texture, setTexture] = useState(null);
  const [originalMaterials, setOriginalMaterials] = useState(new Map());
  const [hasTextContent, setHasTextContent] = useState(false);
  const gltf = useLoader(GLTFLoader, "/GLTF/scene.glb");

  // Store original materials when model loads
  useEffect(() => {
    if (gltf.scene && originalMaterials.size === 0) {
      const materialsMap = new Map();
      gltf.scene.traverse((child) => {
        if (child.isMesh && child.material) {
          // Store original material
          materialsMap.set(child.uuid, child.material.clone());
        }
      });
      setOriginalMaterials(materialsMap);
      console.log("✅ Original materials stored:", materialsMap.size);
    }
  }, [gltf.scene]);

  // Check if fabric canvas has text content
  useEffect(() => {
    if (!fabricCanvasRef.current) return;

    const checkForContent = () => {
      const objects = fabricCanvasRef.current.getObjects();
      const hasText = objects.some(obj => obj.type === 'text' && obj.text && obj.text.trim() !== '');
      setHasTextContent(hasText);
      console.log("📝 Has text content:", hasText, "Objects:", objects.length);
    };

    // Check immediately
    checkForContent();

    // Listen for canvas changes
    const canvas = fabricCanvasRef.current;
    canvas.on('object:added', checkForContent);
    canvas.on('object:removed', checkForContent);
    canvas.on('object:modified', checkForContent);

    return () => {
      canvas.off('object:added', checkForContent);
      canvas.off('object:removed', checkForContent);
      canvas.off('object:modified', checkForContent);
    };
  }, [fabricCanvasRef.current]);

  // Apply or remove texture based on content
  useEffect(() => {
    if (!fabricCanvasRef.current || !gltf.scene) return;

    if (hasTextContent) {
      // Create and apply texture
      const canvasEl = fabricCanvasRef.current.getElement();
      if (canvasEl) {
        const canvasTexture = new THREE.CanvasTexture(canvasEl);
        canvasTexture.colorSpace = THREE.SRGBColorSpace;
        canvasTexture.needsUpdate = true;
        canvasTexture.flipY = false;
        
        setTexture(canvasTexture);

        // Apply texture to model
        gltf.scene.traverse((child) => {
          if (child.isMesh && child.material) {
            console.log("✅ Applying texture to mesh:", child.name || child.type);
            child.material = child.material.clone();
            child.material.map = canvasTexture;
            child.material.needsUpdate = true;
          }
        });

        console.log("✅ Texture applied to model");
      }
    } else {
      // Restore original materials
      gltf.scene.traverse((child) => {
        if (child.isMesh && originalMaterials.has(child.uuid)) {
          console.log("🔄 Restoring original material for:", child.name || child.type);
          child.material = originalMaterials.get(child.uuid).clone();
          child.material.needsUpdate = true;
        }
      });
      setTexture(null);
      console.log("🔄 Original materials restored");
    }
  }, [hasTextContent, gltf.scene, originalMaterials, fabricCanvasRef.current]);

  // Keep texture live-updating only when texture exists
  useFrame(() => {
    if (texture && hasTextContent) {
      texture.needsUpdate = true;
    }
  });

  return <primitive object={gltf.scene} ref={modelRef} />;
}