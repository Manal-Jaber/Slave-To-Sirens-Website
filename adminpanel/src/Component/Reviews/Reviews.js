import React  , {useState , useEffect} from 'react';
import Axios from 'axios';

import './Reviews.css';

import Navigation from '../Navigation/Navigation';
import SideNav from "../sideNav/SideNav";

function Reviews() {

    const [listItems , setLisItems] = useState([]);

    useEffect(() => {
        
        Axios.get('http://localhost:3001/admin/reviews/read').then((response) => {
           setLisItems(response.data)
        })
    });

    const [text , setText] = useState('');
    const [link , setLink] = useState('');
    const [name , setName ] = useState('');
    

    const addItem = async (e) => {
        e.preventDefault();
        try{
            await Axios.post('http://localhost:3001/admin/reviews/insert', {
                text : text,
                link : link,
                name : name
            }).then((data) => {
                if(data.status === 200){
                    console.log(200);
                    clickHandler(e);
                    setLisItems([
                        ...listItems , {
                            text : text,
                            link : link,
                            name : name 
                        }
                    ])
                }
            })
        }catch(err){
            console.log(err);
        }
    }

    // const deleteItem = async (id) => {
    //     try{
    //         await Axios.delete(`http://localhost:3001/admin/reviews/delete/${id}`)
    //         .then((data) => {
    //             if(data.status === 200){
    //                 console.log(data)
    //             }
    //         })
    //     }catch(err){
    //         console.log(err)
    //     }
    // }

    const [newText , setNewText] = useState('');
    const [newLink , setNewLink] = useState('');
    const [newName , setNewName] = useState('');

    const updateItem = async(id) => {
        Axios.put(`http://localhost:3001/admin/reviews/update/${id}`, {
            id : id ,
            text : newText , 
            link : newLink ,
            name : newName 
        }).then((response) => {
            alert("Updated");
        })
    }

    const clickHandler = (e) => {
        e.preventDefault();
        setText('');
        setLink('');
        setName('')
    }

  
    const isEnable = (text.length > 0) && (link.length > 0) && (name.length > 0);

    return (
        <div>
        <SideNav/>
        <Navigation/>
       <div className = "container">
         
           <div className = "section">
               <h1>Create Reviews</h1>
               <h4>Insert your Name :</h4>
               <input type ="text" placeholder = "Insert your name ...."  value = {name} onChange = {(event) => {setName(event.target.value)}}/>
               <h4>Enter your social media link</h4>
               <input type = "text" placeholder="http://..." value = {link} onChange={(event) => {setLink(event.target.value)}}/><br/>
               <h4>Insert Reviews</h4>
               <form>
               <textarea className = "textarea1" rows = '10' cols ="80" placeholder="Enter your Message..." value={text} onChange={(event) => {setText(event.target.value)}}></textarea><br/>
               <button onClick={addItem}  disabled = {!isEnable}>Add Social Media</button>
               </form>
           </div>
           <div className = "Creat"> 
               {listItems.slice(0).reverse().map((val) =>{
                    return (<div key = {val._id}>
                       <div className = "section position_section">
                       <p>{val.name}</p>
                       <p>{val.text}</p>
                       <p>{val.link}</p>
                       {/* <button onClick = {() => {deleteItem(val._id)}}>Delete</button> */}
                       <h4>Update your Name :</h4>
               <input type = "text" placeholder = "Insert your name ...."   onChange = {(event) => {setNewName(event.target.value)}}/>
               <h4>Update your social media link</h4>
               <input type ="text" placeholder="http://..."  onChange={(event) => {setNewLink(event.target.value)}}/><br/>
               <form>
               <textarea className = "textarea1"rows = '10' cols ="80" placeholder="Enter your Message..."  onChange={(event) => {setNewText(event.target.value)}}></textarea><br/>
               <button onClick={() => {updateItem(val._id)}}>Update</button>
               </form>
               </div>
                    </div>)
                })} 
           </div>
       </div>
       </div>
    )
}

export default Reviews;


