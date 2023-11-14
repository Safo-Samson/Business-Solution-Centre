import React, { useEffect, useRef } from "react";

const PopUpMenu = ({ message, onConfirm, onCancel }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onCancel();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center">
      <div className="absolute bg-gray-900 opacity-75 inset-0"></div>
      <div ref={popupRef} className="z-50 bg-white rounded-lg p-6">
        <p className="text-black fon">{message}</p>
        <div className="mt-4 flex justify-center items-left">
          <button
            onClick={onConfirm}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-4">
            Yes
          </button>
          <button
            onClick={onCancel}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpMenu;
