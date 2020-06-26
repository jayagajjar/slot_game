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
        <image src="images/symbols/1.png"></image>
        <image src="images/symbols/2.png"></image>
        <image src="images/symbols/3.png"></image>

        </div>
      </div>
    

    
</div>
);
}
export default App;
