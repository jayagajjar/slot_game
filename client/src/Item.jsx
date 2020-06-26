import React from "react";

function Item(props) {
  
  function clickHandler(event) {
    props.onAdd(props.name);
  }
  let src, tooltip;
  if(props.isItemAdded){
   src= "images/list.png"
   tooltip= "Added"
}
  else{
    src= "images/add.png"
    tooltip="Add to List"
  }
  
  return (
    <div className="col one_item_status">
      <div className="row">
        <div className="col-4 item_icon_div">
          <img
            className="item_icon_image"
            src={"images/" + props.image + ".jpg"}
            alt=""
          />
        </div>
        <div className="col-5 item_details">
          <div className="row">
            <div className="col">{props.name}</div>
          </div>
          <div className="row">
            <div className="col">Current Weight {props.currWeight}</div>
          </div>
          <div className="row">
            <div className="col">Minimum Limit Weight {props.minWeightReq}</div>
          </div>
        </div>
        <div className="col-3 add_to_list_div">
          <button
            onClick={clickHandler}
            className="add_to_list_btn"
            type="button"
            title={tooltip}
          >
            <img className="add_to_list_img" src={src}  />
           
          </button>
        </div>
      </div>
    </div>
  );
}

export default Item;
