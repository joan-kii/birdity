import { useState, useEffect } from 'react';

import { db, storage, firebaseTimestamp } from '../firebase';

const useStorage = (image) => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);

  setFile(image);
   
  useEffect(() => {
    async function storageImage() {
      try {
        const storageRef = storage.ref(file.name);
        const collectionRef = db.collection('images');
        storageRef.put(file).on('state_changed', (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setUploadProgress(percentage);
        })
        const url = await storageRef.getDownloadURL();
        const createdAt = firebaseTimestamp();
        await collectionRef.add({url, createdAt});
        setImageUrl(url);
        setCreatedAt(createdAt);
      } catch (err) {
          console.eroor(err);
        }
    }
      if (file) storageImage();
    }, [file]);
    console.log(imageUrl, createdAt)
    return {uploadProgress, imageUrl, createdAt};
  };

  export default useStorage;