import Canvas3D from "./three_js/Canvas3D.jsx";
import TextTool from "./components/sidebar/TextTool.jsx";
import FabricOverlay from "./fabric_js/FabricOverlay.jsx";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { useState, useRef, useEffect } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [inputValue, setInputValue] = useState("");
  const fabricCanvasRef = useRef(null);

  const handleAddText = (value) => {
    setInputValue(value);
  };

  const handleButtonClick = () => {
    if (inputValue.trim()) {
      setText(inputValue);
      setInputValue("");
    }
  };

  const handleFabricCanvasReady = (canvas) => {
    fabricCanvasRef.current = canvas;
  };

  useEffect(() => {
    console.log("All canvases in DOM:", document.querySelectorAll("canvas"));
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div className="w-[250px] bg-white p-4 overflow-y-auto border-r border-gray-200 flex-shrink-0">
        <TextTool
          text={inputValue}
          onAddText={handleAddText}
          onButtonClick={handleButtonClick}
        />
        {/* Add tabs for ImageTool, TextureTool, ColorTool */}
      </div>
      <div className="flex-1 relative">
        {/* Visible 3D canvas */}
        <div className="w-full h-full">
          <Canvas3D fabricCanvasRef={fabricCanvasRef} />
        </div>
        {/* Hidden Fabric.js canvas for texture mapping - positioned after 3D canvas */}
        <div
          style={{
            position: "absolute",
            top: "-9999px",
            left: "-9999px",
            width: "1px",
            height: "1px",
            overflow: "hidden",
          }}
        >
          {/* <canvas width={512} height={512} /> */}
          <FabricOverlay text={text} onCanvasReady={handleFabricCanvasReady} />
        </div>
      </div>
    </div>
  );
}
