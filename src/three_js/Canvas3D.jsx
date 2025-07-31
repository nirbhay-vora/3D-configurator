// import { Canvas, useThree } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import Model from "./Model";
// import { useEffect } from "react";

// function CanvasResizer() {
//   const { gl, camera } = useThree();

//   useEffect(() => {
//     const handleResize = () => {
//       const container = gl.domElement.parentElement;
//       if (container) {
//         const { width, height } = container.getBoundingClientRect();
//         gl.setSize(width, height);
//         gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//         if (camera) {
//           camera.aspect = width / height;
//           camera.updateProjectionMatrix();
//         }
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [gl, camera]);

//   return null;
// }

// export default function Canvas3D({ fabricCanvasRef }) {
//   console.log("Canvas3D: Rendering with fabricCanvasRef:", fabricCanvasRef);

//   return (
//     <div
//       className="relative w-full h-full min-h-[400px] z-10" // removed bg-gray-100
//       style={{
//         width: "100%",
//         height: "100%",
//       }}
//     >
//       <Canvas
//         camera={{ position: [0, 0, 10], fov: 45 }}
//         className="w-full h-full block"
//         style={{
//           width: "100%",
//           height: "100%",
//           display: "block",
//           background: "transparent", // ensure transparent background
//         }}
//         gl={{
//           antialias: true,
//           alpha: true, // <-- set alpha to true for transparent bg
//           powerPreference: "high-performance",
//         }}
//       >
//         {/* <axesHelper args={[5]} />
//         <gridHelper args={[10, 10]} /> */}

//         <CanvasResizer />
//         <ambientLight intensity={2.0} />
//         <directionalLight position={[5, 5, 5]} intensity={1} />
//         <directionalLight position={[-5, -5, -5]} intensity={0.5} />
//         <directionalLight position={[0, 10, 0]} intensity={0.8} />
//         <pointLight position={[0, 10, 10]} intensity={2} />
//         <Model fabricCanvasRef={fabricCanvasRef} />
//         <OrbitControls
//           enablePan={true}
//           enableZoom={true}
//           enableRotate={true}
//           minDistance={1}
//           maxDistance={50}
//         />
//       </Canvas>
//     </div>
//   );
// }

  
// Canvas3D.jsx
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./Model";
import { useEffect } from "react";

function CanvasResizer() {
  const { gl, camera } = useThree();

  useEffect(() => {
    const handleResize = () => {
      const container = gl.domElement.parentElement;
      if (container) {
        const { width, height } = container.getBoundingClientRect();
        gl.setSize(width, height);
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        if (camera) {
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [gl, camera]);

  return null;
}

export default function Canvas3D({ fabricCanvasRef }) {
  console.log("Canvas3D: Rendering with fabricCanvasRef:", fabricCanvasRef);

  return (
    <div
      className="relative w-full h-full min-h-[400px] z-10"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        className="w-full h-full block"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          background: "transparent",
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <CanvasResizer />
        <ambientLight intensity={2.0} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, -5, -5]} intensity={0.5} />
        <directionalLight position={[0, 10, 0]} intensity={0.8} />
        <pointLight position={[0, 10, 10]} intensity={2} />
        <Model fabricCanvasRef={fabricCanvasRef} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={1}
          maxDistance={50}
        />
      </Canvas>
    </div>
  );
}