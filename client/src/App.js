import React, {useState,useEffect} from "react";
import { BrowserRouter as Route } from 'react-router-dom'
import items from "./data/items.json";
import Item from "./Item.jsx";
import ModalShoppingList from "./Modal.jsx"; 
import api from "./api/app.js";
import { Modal} from 'react-bootstrap';
import IndexApp from "./IndexApp";
import ReactDOM from "react-dom";

//<Modal show={show} onClose={showModal} onChecked={deleteItem}/>
function App(){ 
  const isModalLoaded = useState(false);
  const itemFromShoppingList=[];
  const [show, showModal] = useState({shoppingItems:itemFromShoppingList,toShow:false});

  function addItem(newItemName) {
    console.log(api.getAllItems());
    
    api.getAllItems().then((a,b)=>{b= a.data.data.filter(b=>b.name === newItemName);
      if(b.length===0){api.insertItem({name:newItemName}).then(res => {
        console.log(`Item inserted successfully`);
      })}else{console.log("Item already exists")}}).catch(error => {
        if(error.response.status === 404){
          showModal(()=>{
            return {shoppingItems:[],toShow:false};
          }); 
          setShow(false);
          api.insertItem({name:newItemName}).then(res => {
            console.log(`Item inserted successfully`);
          })
        }
        })


    /*api.insertItem({name:newItemName}).then(res => {
      console.log(`Item inserted successfully`);
    })*/
    var anItem=[];
    console.log(api.getAllItems());
    api.getAllItems().then(items =>
      {(items.data.data.map(a=> {return anItem.push({name:a.name,id:a._id});}));
      showModal(()=>{
        return {shoppingItems:anItem,toShow:false};
      }); })
  }
  
  function handleClick(){
    var anItem=[];
    console.log(api.getAllItems());
    api.getAllItems().then(items =>
      {(items.data.data.map(a=> {return anItem.push({name:a.name,id:a._id});}));
      showModal(()=>{
        return {shoppingItems:anItem,toShow:false};
      }); }).catch(error => {
        if(error.response.status === 404){
          showModal(()=>{
            return {shoppingItems:[],toShow:false};
          }); 
          setShow(false);
            console.log("Shopping list is empty");
        }
        })
  }
  /** loads the shopping list for the first time use, to show the states of the 'Add to List' buttons*/
  function loadShoppingList(){
    console.log("loading shopping list")
    var anItem=[];
    api.getAllItems().then(items =>
      {(items.data.data.map(a=> {return anItem.push({name:a.name,id:a._id});}));
      showModal(()=>{
        return {shoppingItems:anItem,toShow:false};
      })
      ; }).catch(error => {
        if(error.response.status === 404){
            console.log("Shopping list is empty");
        }
        })
  }
  useEffect(() => {
    loadShoppingList();
  },[]);
  
  function deleteItem(index) {
    console.log(index);
   api.deleteItemById(index);

   var anItem=[];
   console.log(api.getAllItems());
    api.getAllItems().then(items =>
      {(items.data.data.map(a=> {return anItem.push({name:a.name,id:a._id});}));
      showModal(()=>{
        return {shoppingItems:anItem,toShow:false};
      }); }).catch(error => {
        if(error.response.status === 404){
          showModal(()=>{
            return {shoppingItems:[],toShow:false};
          }); 
          setShow(false);
            console.log("Shopping list is empty");
        }
        })
  }

  function showIndexPage() {
    ReactDOM.render(<IndexApp />, document.getElementById("root"));
  }
  
  const [show1, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {setShow(true)};

  function printShoppingListModal(){
    var elem = document.getElementById("shoppingListModal");
    var domClone = elem.cloneNode(true);
    
    var $printSection = document.getElementById("printSection");
    if (!$printSection) {
      var $printSection = document.createElement("div");
      $printSection.id = "printSection";
      document.body.appendChild($printSection);
  }
  
  $printSection.innerHTML = "";
  $printSection.appendChild(domClone);
    window.print();
  }
    return (
    <div className="container-fluid">
    <div className="row">
        <div className="col">
        <table width="100%"><tbody>
        <tr><td className="title_div">
          Kilograms
          <button title="Click to see Home page" className="balance_scale_btn" onClick={showIndexPage}>
            <img
              className="balance_scale_image"
              src="images/balance_scale.png"
              alt=""
            />
          </button>
          </td>
          </tr></tbody>
          </table>
        </div>
      </div>
    <div className="row">
      <div className="col nav_container" >
      <div className="pantry_status_heading">
            Your Pantry Status
      </div>
      <div className="top_button_right_cells">
      
      <button title="Home" className="nav_btn" onClick={showIndexPage}><img src="images/home_icon.png" style={{width:"2em"}}  alt="HomeIconImage"/></button>
      <button title="Shopping List" className="nav_btn" onClick={handleShow}><img src="images/date.png" style={{width:"2em"}}  alt="shoppingListImage"/></button>
      <button title="WIP" className="nav_btn" ><img src="images/plus.png" style={{width:"2em"}} alt="addItemImage"/></button>
       
        <Route pathname="/shoppinglist"
                    exact
                    component={() => 
                    <ModalShoppingList isLoaded={isModalLoaded} show={show} onClose={showModal} onChecked={deleteItem} onLoad={loadShoppingList}/>}
                />
                

                <Modal id="shoppingListModal" show={show1} onHide={handleClose}>
        <Modal.Header className="shoppinListModalTitle" closeButton>
          <Modal.Title >Shopping List</Modal.Title>
        </Modal.Header><table><tbody><tr><td><div id="removeInstruction">Click on the items to remove</div></td>
        <td style={{'textAlign': 'center'}}><img id="printImg" src="images/print.png" onClick={printShoppingListModal} style={{width:"2em"}}  alt="PrintIconImage"/>
        </td></tr></tbody></table> 
        <Modal.Body className="shoppinListModal">{show.shoppingItems.map((a,index)=> <li onClick={(e) => {
        deleteItem(a.id);
        }} key={a.id}>{a.name}</li> )}</Modal.Body>
      </Modal>
      </div>
      </div>
    </div>

    <div className="row">
    
      {items.map((anItem) => {
        return (
          <div className="col-lg-6 " key={anItem.id}><Item onAdd={addItem}
      currWeight={anItem.currWeight}
      name={anItem.name}
      minWeightReq={anItem.minWeightReq}
      image={anItem.image}
      isItemAdded={show.shoppingItems.filter(a => a.name === anItem.name).length > 0}
          /></div>
        );
      })}
   
     
    </div>
    
</div>
);
}
export default App;
