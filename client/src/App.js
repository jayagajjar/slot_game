import React, {useState,useEffect} from "react";
import reels from "./data/reels.json";
import gameconfig from "./data/gameconfig.json";
import Reel from "./Reel.jsx";
import Force from "./Force";

function App(){ 
  
let forceGameConfig=[
{
  "reelstops":""  }
];
function getRandomReelStop(){
  let randomReelStop=[];
  randomReelStop.push(reels.map((aReel,key)=>{return Math.floor(Math.random()*(aReel.reel.split(",").length))}));
  return randomReelStop;
}
const [reelStop, setReelStop] = useState([]);
  
  function myCallback(value){
      forceGameConfig.map((gc)=>{return gc.reelstops=value});
  }
  function handleClick(){
    
      forceGameConfig.map((gc)=>{
        if(gc.reelstops!=""){
          setReelStop(forceGameConfig.map((gc)=>{return gc.reelstops.split(',')}))
        }
      else{
        setReelStop(getRandomReelStop());
        //setReelStop(gameconfig.map((gc)=>{return gc.reelstops.split(',')}))
      }})
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
          result.map((b,key)=>{
            if(b[1]==a.positions){
            document.getElementById("windetails").innerHTML+= "Win Line "+key+" Symbol: "+a.symbolID+": 5 of a kind<br>";
            //console.log("Win Line "+key+" Symbol: "+a.symbolID)
            return;
            }else {
              let c= b[1].split(",");
              c.pop();
              if(c.toString() == a.positions){
                document.getElementById("windetails").innerHTML+= "Win Line "+key+" Symbol: "+a.symbolID+": 4 of a kind<br>";
              }
              else{
                let c= b[1].split(",");
              c.pop();c.pop();
              if(c.toString() == a.positions){
                document.getElementById("windetails").innerHTML+= "Win Line "+key+" Symbol: "+a.symbolID+": 3 of a kind<br>";
              }
              }
            }
              })
      })
    })
  }

    return (
     
    <div className="container-fluid">
    
    <div className="row">
      
            {
              reels.map((aReel,key)=>{
                return <Reel 
                key={key}
                reelData={aReel.reel} 
                rowsToShow={gameconfig.map((gc)=>{return gc.rowsToShow})}
                reelStop={reelStop.map((rs)=>rs[key])}
                callbackSetReelView={callbackSetReelView}
                />
                })
            }
       
      <div style={{ alignSelf: "center"}}>
            <button className="start_btn" title="Play"><img className="start_btn_img" src="images/power.png" onClick={handleClick} ></img></button>
          
        </div>
        <div>
        <div id="windetails"/>
        </div>
        <div>
<div><Force callbackFromParent={myCallback} value="0,0,0,0,0"/>
      </div>
</div>
</div>

      </div>
      
   

);
}
export default App;
