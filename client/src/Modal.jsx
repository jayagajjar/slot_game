import React, {useEffect} from "react";

function Modal(props) {
    
    useEffect(() => {
        props.isLoaded[0] = true;
        props.onLoad(props.isLoaded);
        
      });

    if(!props.show.toShow){
        return null;
    }
    //console.log("mmmmmmmm"+props.show.shoppingItems);
    function clikHandler(e){
        e.persist();
        props.show.toShow = false;
        props.onClose(e);
    }
    return <div>{props.show.shoppingItems.map((a,index)=> {return <li onClick={(e) => {
        props.onChecked(a.id);
        }} key={a.id}>{a.name}</li>})}<div>
    <button
            onClick={clikHandler}>
            Close
          </button>
  </div>
  </div>

}

export default Modal;