import React from 'react';
import '../styling/GreyBackground.css'

const GreyBackground = (props) => {
  return (
    <div className="background-screen">{props.children}</div>
  )
};

export default GreyBackground;