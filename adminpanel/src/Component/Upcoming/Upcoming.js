import React  , {useState , useEffect} from 'react';
import Axios from 'axios';

import Navigation from '../Navigation/Navigation';
import SideNav from "../sideNav/SideNav";

function Upcoming() {

    const [text , setText] = useState('');
    const [date , setDate] = useState('');
    const [url , setUrl] = useState('');
    const [country , setCountry] = useState('');

    const [listItems , setListItems] = useState([]);

    useEffect(() => {
        
        Axios.get('http://localhost:3001/admin/upcoming/read').then((response) => {
           setListItems(response.data)
        })
    },[listItems, setListItems]);


    const addItem = async (e) => {
        e.preventDefault();
        try{
            await Axios.post('http://localhost:3001/admin/upcoming/insert', {
                text : text,
                date : date,
                url : url,
                country : country
            }).then((data) => {
                if(data.status === 200){
                    console.log(200);
                    clickHandler(e);
                    setListItems([                        
                        ...listItems , {
                            text : text,
                            date : date,
                            url : url,
                            country : country
                        }
                    ])
                }
            })
        }catch(err){
            console.log(err);
        }
    }

    const clickHandler = (e) => {
        e.preventDefault();
        setText('');
        setUrl('');
        setDate('');
        setCountry('')
    }

    const deleteItem = async (id) => {
        try{
            await Axios.delete(`http://localhost:3001/admin/upcoming/delete/${id}`)
            .then((data) => {
                if(data.status === 200){
                    console.log(data)
                }
            })
        }catch(err){
            console.log(err)
        }
    }


    const [newText , setNewText] = useState('');
    const [newUrl , setNewUrl] = useState('');
    const [newDate , setNewDate] = useState('');
    const [newCountry , setNewCountry] = useState('');

    const updateItem = async(id) => {
        Axios.put(`http://localhost:3001/admin/upcoming/update/${id}`, {
            id : id ,
            text : newText , 
            url : newUrl,
            date : newDate,
            country : newCountry
        }).then((response) => {
            alert("Updated");
        })
    }

    return (
        <div className ="container">
            <Navigation/>
            <SideNav/>
            <div className = "section">
                <h1>Add UpComing</h1>
                <h4> Add A Date :</h4>
                <input type = "date" value = {date} onChange = {(e) => {setDate(e.target.value)}}/><br/>
                <h4>Add A Link :</h4>
            <input type = "url" placeholder="http://..." value = {url} onChange = {(e)=> {setUrl(e.target.value)}}/><br/>
            <h4>Add A Country : </h4>
             <input type="text" placeholder = "Insert A Country..." value = {country} onChange = {(e) => {setCountry(e.target.value)}}/><br/>
            <form>
                <h4>Add UpComing Title : </h4>
               <textarea className = "textarea1" rows = '10' cols ="80" placeholder="Enter UpComing title..." value ={text} onChange = {(e) => {setText(e.target.value)}}></textarea><br/>
               <button onClick = {addItem}>Add UpComing</button>
               </form>
            </div>
            <div className = "Creat">
                {listItems.slice(0).reverse().map((val) => {
                    return (
                        <div  style = {{borderRadius :"1%"}} className = "section" key = {val._id}>
                            <p>{val.text}</p>
                            <p>{val.country}</p>
                            <p>{val.date}</p>
                            <p>{val.url}</p>
                            <button onClick = {() => {deleteItem(val._id)}}>Delete</button>
                            <h1>Update UpComing</h1>
                            <h4>Update A Date :</h4>
                <input type = "date"  onChange = {(e) => {setNewDate(e.target.value)}}/><br/>
                <h4>Update A Link :</h4>
            <input type = "url" placeholder="http://..."  onChange = {(e)=> {setNewUrl(e.target.value)}}/><br/>
            <h4>Update  A Country : </h4>
             <input type="text" placeholder = "Insert A Country..."  onChange = {(e) => {setNewCountry(e.target.value)}}/><br/>
            <form>
                <h4>Update UpComing Title : </h4>
               <textarea className = "textarea1" rows = '10' cols ="80" placeholder="Enter UpComing title..." onChange = {(e) => {setNewText(e.target.value)}}></textarea><br/>
               <button onClick={() => {updateItem(val._id)}}>Update UpComing</button>
               </form>
            </div> 
                    );
                })}
            </div>
        </div>
    )
}

export default Upcoming
