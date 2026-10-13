import React from 'react';

export const SpinnerLoader = () => {
  return (
    <div className={'d-flex justify-content-center mt-4'}>
      <div className="spinner-border text-light" role="status"></div>
    </div>
  );
}