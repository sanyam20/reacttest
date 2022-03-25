 import React from 'react'
 import "./style.css";
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import { faCoffee } from '@fortawesome/free-solid-svg-icons'
 import { FcApproval } from "react-icons/fc";
 import { FaPlus,FaMarker,FaPen,FaTrash } from "react-icons/fa";
import { useState } from 'react';
import { useEffect } from 'react';
//get local storage data back
const getLocalData=()=>{
const lists=localStorage.getItem("mytodolist");
if(lists)
{
    return JSON.parse(lists);
}
else{
    return [];
}
};
  const Todo =()=>{
      const[inputdata,setInputData]=useState("");
      const [items,setItems]=useState(getLocalData());
      const [isEditItem,setIsEditItem]=useState("");
      const [toggleButton,setToggleButton]=useState(false);
      //add the item func
      const addItem=()=>
      {
          if(!inputdata)
          {
              alert("pls fill the data");
          }
          else{
              const myNewInputData={
                  id:new Date().getTime().toString(),
                  name:inputdata  
              }; 
              setItems([...items,myNewInputData]);
              
              setInputData("");
          }
      };
      //edit the items
      const editItem=(index)=>{
      const item_todo_edited=items.find((curElem)=>{
          return curElem.id===index;
      });
      setIsEditItem(index); 
      setInputData(item_todo_edited.name);
      setToggleButton(true);
      };
       //how to delete item
       const deleteItem=(index)=>{
const updatedItems=items.filter((curElem)=>
{
    return curElem.id!==index;
}) ;
setItems(updatedItems);
       };
       //remove all items
       const removeAll=()=>
       {
           setItems([]);
       }
       //adding local storage
       useEffect(()=>{
     localStorage.setItem("mytodolist",JSON.stringify(items));
       },[items]);
      return(
          <>
        <div className="main-div">
            <div className='child_div'>
                <figure>
                    <img src='todo.svg' width='50px' alt="todologo" />
                    <figcaption>Add yourjjj List here </figcaption>
                </figure>
                <div className='addItems'>
                    <input type="text"
                    placeholder="🧐 add items" className="form-control"
                        value={inputdata}
                        onChange={(event)=>setInputData(event.target.value)}
                    />
                   {toggleButton?( <FaPen className='fa fa-plus add-btn' onClick={addItem}/> ):
                   ( <FaPlus className='fa fa-plus add-btn' onClick={addItem}/>)
                   }
                  
                </div>
                {/*show our items*/}
               <div className='showItems'>
               {
                   items.map((curElem)=>{
                       return(
                        <div className='eachItem' key={curElem.id}>
                       <h3>{curElem.name}</h3>
                       <div className='todo-btn'>
                       <FaPen className='fa fa-plus add-btn' onClick={()=>editItem(curElem.id)} />
                       <FaTrash className='fa fa-plus add-btn' onClick={()=>
                       deleteItem(curElem.id)} />

                       </div>
                   </div>
                       );
                   })
               }
                  
               </div>
                <div className='showItems'>
                <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
                <span>
                    Check list
                    </span>

                </button>

                </div>
            </div>
        </div>
          </>
      );
  }
  export default Todo;