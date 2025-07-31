import React from 'react';

export default function ColorTool({ onColorChange, onShirtColorChange }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <label htmlFor="ColorpickerAll" className="font-medium">
          Change Mesh Color:
        </label>
        <input
          type="color"
          id="ColorpickerAll"
          defaultValue="#ffffff"
          className="w-10 h-10 rounded-full"
          onChange={onColorChange}
        />
      </div>
      <div className="flex items-center space-x-2">
        <label htmlFor="shirtColor" className="font-medium">
          Change Shirt Color:
        </label>
        <input
          type="color"
          id="shirtColor"
          defaultValue="#ffffff"
          className="w-10 h-10 rounded-full"
          onChange={onShirtColorChange}
        />
      </div>
    </div>
  );
}
