import React,{useState,useEffect} from "react";
import Symbol from "./Symbol.jsx"
function Reel(props){
    let reelData = props.reelData.split(',');
    let rowsToShow= parseInt(props.rowsToShow);
    let reelStop= parseInt(props.reelStop);
    let reelStopArray=[];
    for(let i=reelStop;i<reelStop+rowsToShow;i++){
       { 
           if(i>reelData.length-1){
            reelStopArray.push(i-reelData.length);
            }
            else{
            reelStopArray.push(i);
            }
        }
    }
    let oneReelView =[]
    reelStopArray.map((aSymbol)=>oneReelView.push(aSymbol))
    props.callbackSetReelView(oneReelView);
     
return (
 <div>
 {
    reelStopArray.map((aSymbol, counter)=>{      
         
            return <Symbol key={counter} id={aSymbol}></Symbol>
           
        })
    
    }
 </div>   
)
}
export default Reel;
