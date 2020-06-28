import React, {useState,useEffect} from "react";
import items from "./data/items.json";
import gameconfig from "./data/gameconfig.json";
import Reel from "./Reel.jsx";
import Force from "./Force";

function App(){ 
  
let forceGameConfig=[
{
  "reelstops":""  }
];
const [reelStop, setReelStop] = useState([]);
  
  function myCallback(value){
      forceGameConfig.map((gc)=>{return gc.reelstops=value});
  }
  function handleClick(){
      forceGameConfig.map((gc)=>{
        if(gc.reelstops!=""){
          setReelStop(forceGameConfig.map((gc)=>{return gc.reelstops.split(',')}))
        }
    else{setReelStop(gameconfig.map((gc)=>{return gc.reelstops.split(',')}))}})
  }
  
  useEffect(() => {
   setReelStop(gameconfig.map((gc)=>{return gc.reelstops.split(',')}))
  },[]);
  let reelView = [];
  let symbolArray=[];
  let symbolPostions=[];
  let allSymbolPosition=[];
  function callbackSetReelView(a){
      reelView.push(a);
      checkWin()
  }
  function checkWin(){
    if(document.getElementById("windetails")!=null){
      document.getElementById("windetails").innerHTML=""
    }
    gameconfig.map((gc)=>{symbolArray= gc.symbols.split(",")});
    symbolArray.map((aSymbol)=>{
      reelView.map((a,c)=>{
        a.map((b,d)=>{
        if(aSymbol==b) return symbolPostions.push(c+"_"+d)
      })
    })
    allSymbolPosition.push({"symbolID":aSymbol,"positions":symbolPostions})
    symbolPostions=[];
    });
    
    allSymbolPosition.map((a)=>{
      
      gameconfig.map((gc,keys)=>
      {
        var result = [];
       
        for(var i in gc.winlines)
        result.push([i, gc.winlines [i]]);
          result.map((b,key)=>{if(b[1]==a.positions){
            document.getElementById("windetails").innerHTML+= "Win Line "+key+" Symbol: "+a.symbolID+"<br>";
            //console.log("Win Line "+key+" Symbol: "+a.symbolID)
          }else{
            //console.log("no win")
          }})
      })
    })
  }

    return (
     
    <div className="container-fluid">
    
    <div className="row">
      
            {
              items.map((aReel,key)=>{
                return <Reel 
                key={key}
                reelData={aReel.reel} 
                rowsToShow={gameconfig.map((gc)=>{return gc.rowsToShow})}
                reelStop={reelStop.map((rs)=>rs[key])}
                callbackSetReelView={callbackSetReelView}
                />
                })
            }
       
      <div className="col-1" style={{ alignSelf: "center"}}>
      
          <img className="start_btn_img" src="images/power.png" onClick={handleClick} ></img>
        </div>
        <div className="col">
        <div id="windetails"/>
        </div>
        <div className="col">
<div className="row"><Force callbackFromParent={myCallback} value="0,0,0,0,0"/>
      </div>
</div>
</div>

      </div>
      
   

);
}
export default App;
