import React from 'react';
import { Outlet } from 'react-router-dom';

const GoBackButton = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div>
    <button className="go-back-button" onClick={goBack}>
      Back
    </button>

    <Outlet/>
    </div>
  );
};

export default GoBackButton;
