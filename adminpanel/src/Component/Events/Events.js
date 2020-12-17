import React , {useState , useEffect} from 'react';
import Axios from 'axios';
import Navigation from "../Navigation/Navigation";
import SideNav from "../sideNav/SideNav";

function Events() {

    const path = `http://localhost:3001/`;

    const [listItems , setListItems] = useState([]);
    const [newImages , setNewImages] = useState(null);

    

    useEffect(() => {
        Axios.get('http://localhost:8000/todos').then((response) => {
         console.log(response.data);
        })
    },[]);


    useEffect(() => {
        Axios.get('http://localhost:3001/admin/events/image/read').then((response) => {
         setListItems(response.data);
        })
    },[]);


    const  onChange = (e) => {
        setNewImages(e.target.files[0]);
        console.log(e.target.files[0])
    }

    const updateItem = async(id) => {
        const formData =  new FormData();
        formData.append('Image', newImages);
        console.log(formData);
        Axios.put(`http://localhost:3001/admin/events/image/update/${id}`, formData).then(res => {
            console.log(res);
        }).catch(err => console.log(err))
    }


    return (
        <div className = "container">
            <SideNav/>
            <Navigation/>
            <div className = "Creat">
            {listItems.slice(0).map((val) =>{
              if(val._id === 0){
                return (
                    <div key = {val._id}>
                        <div className = "section">
                           <h1>Top Image :</h1>
                           <h4>Make sure the size of your image is <br/>(1440 * 1444) </h4>
                           <p><img src={path + val.image} alt="error_Carousel" /></p>
                           <input type="file"   onChange = {onChange} name = "Image" /><br/>
                           <button onClick={() => {updateItem(val._id)}}>Update</button>
                        </div>
                    </div>
                )
              }else if(val._id === 1){
                return (
                    <div key = {val._id}>
                        <div className = "section">
                           <h1>Top Image :</h1>
                           <h4>Make sure the size of your image is <br/>(1440 * 1432)  </h4>
                           <p><img src={path + val.image} alt="error_Carousel" /></p>
                           <input type="file"   onChange = {onChange} name = "Image" /><br/>
                           <button onClick={() => {updateItem(val._id)}}>Update</button>
                        </div>
                    </div>
                )
              }else if(val._id === 2){
                return (
                    <div key = {val._id}>
                        <div className = "section">
                           <h1>Top Image :</h1>
                           <h4>Make sure the size of your image is<br/> (742  * 1024) </h4>
                           <p><img src={path + val.image} alt="error_Carousel" /></p>
                           <input type="file"   onChange = {onChange} name = "Image" /><br/>
                           <button onClick={() => {updateItem(val._id)}}>Update</button>
                        </div>
                    </div>
                )
              }
            })}
            </div>  
        </div>
    )
}

export default Events
