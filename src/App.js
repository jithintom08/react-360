import React from 'react';

import React360Viewer from './React360Viewer'

function App() {
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mb-4 card p-0">
          <div className="v360-header text-light bg-dark">
              <span className="v360-header-title">36 Images - Reverse Spin</span>
              <span className="v360-header-description"></span>
          </div>
          <React360Viewer
            amount={36}
            imagePath="https://scaleflex.cloudimg.io/crop/1920x700/n/https://scaleflex.airstore.io/demo/360-car"
            fileName="iris-{index}.jpeg"
            spinReverse
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-4 text-center card">
          <h4>More Examples</h4>
          <p>A simple, interactive resource that can be used to provide a virtual tour of your product.</p>
        </div>
        <div className="col-12 col-md-6 mb-4 card p-0">
          <div className="v360-header text-light bg-dark">
              <span className="v360-header-title">36 Images</span>
              <span className="v360-header-description"></span>
          </div>
          <React360Viewer
            amount={36}
            imagePath="https://scaleflex.cloudimg.io/width/600/q35/https://scaleflex.ultrafast.io/https://scaleflex.airstore.io/demo/chair-360-36"
            fileName="chair_{index}.jpg?v1"
          />
        </div>
        <div className="col-12 col-md-6 mb-4 card p-0">
          <div className="v360-header text-dark bg-light">
              <span className="v360-header-title">72 Images - Box Shadow</span>
              <span className="v360-header-description"></span>
          </div>
          <React360Viewer
            amount={72}
            imagePath="https://scaleflex.cloudimg.io/width/600/q35/https://scaleflex.ultrafast.io/https://scaleflex.airstore.io/demo/chair-360-72"
            fileName="chair_{index}.jpg?v1"
            boxShadow
          />
        </div>
      </div>
    </div>
  );
}

export default App;
