// export default function TextTool({ onAddText,text,onButtonClick }) {
//   return (
//     <div className="space-y-4">
//       <div className="relative">
//         <input
//           type="text"
//           id="textInput"
//           placeholder="Add your text"
//           value={text}
//           onChange={(e) => onAddText(e.target.value)}
//           className="text-black border-b border-gray-400 w-full px-3 py-2 rounded focus:outline-none"
//         />
//         <button
//           className="absolute top-1 right-0 text-xs bg-orange-500 text-white px-2 py-1 rounded"
//           onClick={onButtonClick}
//         >
//           Add
//         </button>
//       </div>
//       {/* Include size adjusters, color pickers, font selector here */}
//     </div>
//   );
// }

// TextTool.jsx (if you don't have this component, here's a basic implementation)
export default function TextTool({ text, onAddText, onButtonClick }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Add Text</h3>
      <input
        type="text"
        value={text}
        onChange={(e) => onAddText(e.target.value)}
        placeholder="Enter text here..."
        className="w-full text-black p-2 border border-gray-300 rounded"
      />
      <button
        onClick={onButtonClick}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Add Text to 3D Model
      </button>
    </div>
  );
}