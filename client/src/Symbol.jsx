import React from "react";
function Symbol(props){
return (
 <div>
<img className="symbol_image" src={"images/symbols/" + props.id + ".png"}/>
</div>   
)
}
export default Symbol;
