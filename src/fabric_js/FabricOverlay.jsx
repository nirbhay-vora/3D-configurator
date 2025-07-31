import { useEffect, useRef } from "react";
import * as fabric from "fabric";

export default function FabricOverlay({ text, onCanvasReady }) {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);

  useEffect(() => {
    console.log("FabricOverlay: Canvas initialization");
    if (!canvasRef.current) return;

    // Fixed dimensions - use fixed size instead of container dimensions
    const width = 512;
    const height = 512;

    console.log("FabricOverlay: Canvas dimensions:", width, height);

    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: width,
      height: height,
      backgroundColor: "white", // Use white background for visibility
    });

    fabricCanvasRef.current = fabricCanvas;

    // Pass the fabric canvas instance to parent
    if (onCanvasReady) onCanvasReady(fabricCanvas);

    // Clean up
    return () => {
      fabricCanvas.dispose();
    };
  }, [onCanvasReady]);

  useEffect(() => {
    console.log("FabricOverlay: Text changed to:", text);
    if (!fabricCanvasRef.current) {
      console.log("FabricOverlay: Canvas not ready yet");
      return;
    }

    // Clear existing text objects
    const textObjects = fabricCanvasRef.current
      .getObjects()
      .filter((obj) => obj.type === "text");
    textObjects.forEach((obj) => fabricCanvasRef.current.remove(obj));

    // Only add text if it exists
    if (text && text.trim()) {
      console.log("FabricOverlay: Adding text to canvas:", text);

      // Add new text with interactive properties
      const fabricText = new fabric.Text(text, {
        left: 50,
        top: 50,
        fontSize: 40,
        fill: "black",
        fontFamily: "Arial",
        selectable: true,
        editable: true,
        hasControls: true,
        hasBorders: true,
        lockUniScaling: false,
        lockRotation: false,
        lockScalingX: false,
        lockScalingY: false,
        lockMovementX: false,
        lockMovementY: false,
        cornerStyle: "rect",
        cornerColor: "rgba(102, 153, 255, 0.8)",
        cornerSize: 10,
        transparentCorners: false,
        borderColor: "rgba(102, 153, 255, 0.8)",
        borderScaleFactor: 1,
      });

      fabricCanvasRef.current.add(fabricText);
      fabricCanvasRef.current.setActiveObject(fabricText);
      fabricCanvasRef.current.renderAll();

      console.log("FabricOverlay: Text added successfully");
      console.log(
        "Canvas objects count:",
        fabricCanvasRef.current.getObjects().length
      );

      // Add event listeners for text changes
      fabricText.on("changed", function () {
        console.log("Text changed:", fabricText.text);
        fabricCanvasRef.current.renderAll();
      });

      fabricText.on("modified", function () {
        console.log(
          "Text modified - new position:",
          fabricText.left,
          fabricText.top
        );
        console.log(
          "Text modified - new scale:",
          fabricText.scaleX,
          fabricText.scaleY
        );
        fabricCanvasRef.current.renderAll();
      });
    } else {
      console.log("FabricOverlay: No text to add or empty text");
      fabricCanvasRef.current.renderAll();
    }
  }, [text]);

  return (
    <div className="w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full border-2 border-blue-500"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
    </div>
  );
}
