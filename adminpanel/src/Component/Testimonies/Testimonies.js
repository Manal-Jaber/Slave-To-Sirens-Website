import React , {useState , useEffect} from 'react';
import Axios from 'axios';

import Navigation from '../Navigation/Navigation';
import SideNav from "../sideNav/SideNav";

function Testimonies() {
   
    const [listItems , setLisItems] = useState([]);
    
    useEffect(() => {
        
        Axios.get('http://localhost:3001/admin/testimonies/read').then((response) => {
           setLisItems(response.data)
        })
    });

    const [testimonies , setTestimonies] = useState('');
    const [testimoniesBy , setTestimoniesBy] = useState('');

    
    const addItem = async (e) => {
        e.preventDefault();
        try{
            await Axios.post('http://localhost:3001/admin/testimonies/insert', {
                testimonies : testimonies,
                testimoniesBy : testimoniesBy
            }).then((data) => {
                if(data.status === 200){
                    console.log(200);
                    clickHandler(e);
                    setLisItems([
                        ...listItems , {
                            testimonies : testimonies,
                            testimoniesBy : testimoniesBy
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
        setTestimonies('');
        setTestimoniesBy('');
    }




    // const deleteItem = async (id) => {
    //     try{
    //         await Axios.delete(`http://localhost:3001/admin/testimonies/delete/${id}`)
    //         .then((data) => {
    //             if(data.status === 200){
    //                 console.log(data)
    //             }
    //         })
    //     }catch(err){
    //         console.log(err)
    //     }
    // }


    const [newTestimonie , setNewTestimonies] = useState('');
    const [newTestimonieBy , setNewTestimoniesBy] = useState('');

    const updateItem = async(id) => {
        Axios.put(`http://localhost:3001/admin/testimonies/update/${id}`, {
            id : id ,
            testimonies : newTestimonie, 
            testimoniesBy : newTestimonieBy
        }).then((response) => {
            console.log(response)
        })
    }

 


    const isEnable = (testimonies.length > 0) && (testimoniesBy.length > 0);
    
    return (
        <div>
            <SideNav/>
            <Navigation/>
            <div className = "container">
            <div className = "section">
               <h1>Create Testimonies</h1>
               <h4>Tesimonies By :</h4>
               <input type ="text"  placeholder = "Insert you name ...." value = {testimoniesBy} onChange  = {(event) => {setTestimoniesBy(event.target.value)}}/>
               <h4>Insert your Testimonies :</h4>
               <form>
               <textarea rows = "10" cols = "80" placeholder = "Insert your message   ...."  value = {testimonies} onChange = {(event) => {setTestimonies(event.target.value)}}></textarea><br/>
               <button onClick={addItem}  disabled = {!isEnable}>Add Social Media</button>
               </form>
           </div>
           <div className = "Creat">    
           {listItems.slice(0).reverse().map((val) =>{
               return (
                   <div key = {val._id}>
                     <div className = "section position_section">
                        <p>{val.testimoniesBy}</p>
                        <p>{val.testimonies}</p>
                        {/* <button onClick = {() => {deleteItem(val._id)}}>Delete</button> */}
                        <h4>Update your Name</h4>
                   
                <input type = "text" placeholder = "Insert your name ...."   onChange = {(event) => {setNewTestimoniesBy(event.target.value)}}/>
               <form>
               <h4>Update your testimonies :</h4>
               <textarea className = "textarea1"rows = '10' cols ="80" placeholder="Enter your Message..."  onChange={(event) => {setNewTestimonies(event.target.value)}}></textarea><br/>
               <button onClick={() => {updateItem(val._id)}}>Update</button>
               </form>
                   </div>
                   </div>
               )
           })}
           </div>
            </div>
        </div>
    )
}

export default Testimonies
