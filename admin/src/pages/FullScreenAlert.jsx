import React, { useState } from 'react';

function FullScreenAlert({clicked, isVisible}) {

  const handleOk = () => {
    clicked(true);
  };

  const handleCancel = () => {
    clicked(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
        <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
        <p className="mb-6">Do you want to proceed with this action?</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleOk}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            OK
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default FullScreenAlert;
