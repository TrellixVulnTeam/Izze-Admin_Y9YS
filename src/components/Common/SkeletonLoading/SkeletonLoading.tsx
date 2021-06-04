import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

function SkeletonLoading() {
  return (
    <div>
      <Skeleton
        animation='wave'
        height={30}
        width='70%'
        style={{ marginTop: 40 }}
      />
      <Skeleton
        animation='wave'
        height={30}
        width='70%'
        style={{ marginTop: 20 }}
      />
      <Skeleton
        animation='wave'
        height={40}
        width='90%'
        style={{ marginTop: 20 }}
      />
      <Skeleton
        animation='wave'
        height={400}
        width='100%'
        style={{ marginTop: -60 }}
      />
    </div>
  );
}

export default SkeletonLoading;
