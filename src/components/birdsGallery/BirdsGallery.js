import React, { useEffect } from 'react';

import { db } from '../../firebase';
import { useAuth } from '../../context/Context';

const BirdsGallery = () => {

  const { currentUser } = useAuth();

  return (
    <div>
      BIRDS!!!
    </div>
  )
};

export default BirdsGallery;
