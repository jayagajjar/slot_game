import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
function showGame() {
  ReactDOM.render(<App />, document.getElementById("root"));
}

function IndexApp() {
  
  return (
    <div className="container">
      <div className="row">
        <div className="col">
        <div className="title_div">
          Slot Game Template
          <button title="Click to see the Game" className="balance_scale_btn" onClick={showGame}>
            This is Game Intro 
          </button>
          </div>
          
        </div>
      </div>
      
      
    </div>
  );
}
export default IndexApp;
