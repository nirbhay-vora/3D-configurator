import React from 'react';

const textures = [
  'texture-1.png',
  'texture-2.png',
  'texture-3.png',
  'texture-4.png',
  'texture-5.png',
  'texture-6.png',
  'texture-7.png',
  'texture-8.png',
  'texture-9.png',
  'top-view-cloth.png',
  'top-view-fabric-texture.png',
  'close-up-flannel-shirt-detail.png',
  'full-frame-shot-colorful-chequered-pattern-textile.png',
  'seamless-chequered-pattern-textile.png'
];

export default function TextureTool({ onTextureSelect }) {
  return (
    <div className="right-container p-2">
      <div className="grid grid-cols-3 gap-2 border rounded p-2 bg-white">
        {textures.map((name) => (
          <img
            key={name}
            src={`/GLTF/texture/${name}`}
            alt={name}
            className="w-16 h-16 object-cover cursor-pointer hover:scale-105 transition"
            onClick={() => onTextureSelect(`/GLTF/texture/${name}`)}
          />
        ))}
      </div>
    </div>
  );
}