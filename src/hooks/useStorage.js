import { useState, useEffect } from 'react';

import { db, storage, firebaseTimestamp } from '../firebase';

const useStorage = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);
   
  useEffect(() => {
    async function storageImage() {
        const storageRef = storage.ref(file.name);
        const collectionRef = db.collection('images');
        storageRef.put(file).on('state_changed', (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setUploadProgress(percentage);
        }, (err) => {
          console.error(err);
        }, async () => {
          const url = await storageRef.getDownloadURL();
          const created = firebaseTimestamp();
          console.log(created)
          collectionRef.add({url, created});
          setImageUrl(url);
          setCreatedAt(created);
        });
      }
      if (file) storageImage();
    }, [file]);
    return {uploadProgress, imageUrl, createdAt, setFile};
  };

  export default useStorage;