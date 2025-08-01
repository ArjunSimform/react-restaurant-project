const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);

  try {
    const res = await fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    console.log('data', data);
    if (data.secure_url) {
      return data.secure_url;
    }
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
