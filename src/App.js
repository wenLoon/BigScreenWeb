import React from 'react';
import './global.scss';
import Router from './router/Router';

function App() {
  return (
    <div className="router" style={{width:"100%", height:'100%'}}>
      <Router />
    </div>
  );
}

export default App;
