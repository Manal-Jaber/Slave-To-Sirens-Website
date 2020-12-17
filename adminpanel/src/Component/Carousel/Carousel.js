import React , {useState  , useEffect} from 'react';
import Axios from 'axios';

import Navigation from "../Navigation/Navigation";
import SideNav from "../sideNav/SideNav";

function Carousel() {

    const path = `http://localhost:3001/`;

    const [image , setImage ] = useState(null);
    const [listItems , setListItems] = useState([]);



    useEffect(() => {
        Axios.get('http://localhost:3001/admin/galleryCarousel/read').then((response) => {
         setListItems(response.data);
        })
    },[]);

 
   
    const addItem = async (e) => {
        e.preventDefault();
        const formData =  new FormData();
        formData.append('Image', image);
        console.log(formData);

       await Axios.post("http://localhost:3001/admin/galleryCarousel/insert", formData ).then(res => {
            console.log(res);
        }).catch(err => console.log(err))
    }

   const  onChange = (e) => {
        setImage(e.target.files[0]);
        console.log(e.target.files[0])
    }

    const deleteItem = async (id) => {
        try{
            await Axios.delete(`http://localhost:3001/admin/galleryCarousel/delete/${id}`)
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
        <div className = "container">
            <SideNav/>
            <Navigation/>
            <div className = "section section_raduis">
                <h1>Upload New Image Inside Carousel : </h1>
                <input type="file"  onChange = {onChange} name = "Image"/><br/>
                <button onClick={addItem}>
                   Upload
                </button>
            </div>
            <div className = "Creat">
            {listItems.slice(0).reverse().map((val) =>{
                return (
                    <div key = {val._id}>
                        <div className = "section">
                           <p><img src={path + val.image} alt="error_Carousel" /></p>
                           <button onClick = {() => {deleteItem(val._id)}}>Delete</button>
                        </div>
                    </div>
                )
            })}
            </div>        
        </div>
    )
}

export default Carousel
