import React , {useState , useEffect} from 'react';
import Axios from 'axios';

import Navigation from '../Navigation/Navigation';
import SideNav from "../sideNav/SideNav";

function News() {

    const path = `http://localhost:3001/`;

    const [image , setImage ] = useState(null);
    const [link , setLink ] = useState('');
    const [caption ,setCaption] = useState('');
    const [listItems , setListItems] = useState([]);



    useEffect(() => {
        Axios.get('http://localhost:3001/admin/news/read').then((response) => {
         setListItems(response.data);
        })
    },[]);

    const clickHandler = (e) => {
        e.preventDefault();
        setImage('');
        setLink('');
        setCaption('');
    }
   
    const addItem = async (e) => {
        e.preventDefault();
        const formData =  new FormData();
        formData.append('Image', image);
        formData.append('caption', caption);
        formData.append('link', link);
        console.log(formData);
        clickHandler(e);

       await Axios.post("http://localhost:3001/admin/news/insert", formData ).then(res => {
            console.log(res);
        }).catch(err => console.log(err))
    }

   const  onChange = (e) => {
        setImage(e.target.files[0]);
        console.log(e.target.files[0])
    }

    const deleteItem = async (id) => {
        try{
            await Axios.delete(`http://localhost:3001/admin/news/delete/${id}`)
            .then((data) => {
                if(data.status === 200){
                    console.log(data)
                }
            })
        }catch(err){
            console.log(err)
        }
    }


    return (
        <div className="container">
            <SideNav/>
            <Navigation/>
               <div className ="section">
                   <h1>Insert a News image :</h1>
                   <form onSubmit ={addItem}>
                   <input type="file" onChange = {onChange} name = "Image" /><br/>
               <h4>Insert A Image Caption :</h4>
               <input type="text" placeholder = "Insert A Image Caption ......" value = {caption} onChange = {(e) => {setCaption(e.target.value)}}/><br/>
               <h4>Insert A Link :</h4>
               <input type="url" placeholder = "http://....." value = {link} onChange = {(e) => {setLink(e.target.value)}}/><br/>
                <button type="submit">
                   Upload
                </button>
                   </form>
               </div>
               {listItems.slice(0).reverse().map((val) => {
                   return (
                       <div className = "section" key = {val._id}>
                           <img src = {path + val.route} target = "_blank" alt = "News Error"/>
                           <p>{val.caption}</p>
                           <p>{val.link}</p>
                           <button onClick = {() => {deleteItem(val._id)}}>Delete</button>
                       </div>
                   );
               })}
            </div>    
    )
}

export default News
