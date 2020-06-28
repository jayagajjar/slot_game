import React,{useState} from "react";
function Force(props){
    
    const [count, setTextValue] = useState([]);
   function handleChange(event){
    setTextValue(event.target.value);
    props.callbackFromParent(event.target.value);
   }

return (
 <div>
 
    <input type="text" name="forcedreelstops" id="forcedreelstops" 
    value={count} onChange={handleChange} />

 </div>   
)
}
export default Force;
