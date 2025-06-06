import React, { useState } from 'react';
import axios from 'axios';

const UploadPhoto = ({ token }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file)); // preview ảnh
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const res = await axios.post(
        'http://localhost:8081/photos/upload',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setMessage('Upload thành công: ' + res.data.filename);
    } catch (err) {
      console.error('Upload error:', err);
      setMessage(
        'Upload thất bại: ' + err.response?.data?.message || err.message
      );
    }
  };

  return (
    <div className="py-4  rounded w-full max-w-sm mx-auto">
      <input type="file" onChange={handleFileChange} className="mb-2" />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-full h-auto mb-2 rounded"
        />
      )}
      <div className="flex ">
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-auto"
        >
          Upload
        </button>
      </div>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
};
export default UploadPhoto;
