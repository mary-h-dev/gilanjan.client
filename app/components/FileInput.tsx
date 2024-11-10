// FileInput.js

import React, { ChangeEvent } from 'react';

interface FileInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onChange }) => {
  return (
    <div className="relative inline-block ">
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={onChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <button
        type="button"
        className="py-2 px-6 bg-gray-400 text-white rounded-xl cursor-pointer"
      >
        انتخاب تصاویر
      </button>
    </div>
  );
};

export default FileInput;
