import React from 'react';

const useForceUpdate = () => {
  return React.useReducer(() => ({}))[1];
};

export default useForceUpdate;