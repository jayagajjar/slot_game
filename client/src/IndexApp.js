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
          Slot Game Template<br/>
          
          </div>
          <div className="intro">
        
          Game Specifications<br/>
          5x3 15 Win Line<br/>
          <button title="Click to see the Game" className="title_div intro_btn" onClick={showGame}>Start </button>
          </div>
          
            
          
        </div>
      </div>
      
      
    </div>
  );
}
export default IndexApp;
