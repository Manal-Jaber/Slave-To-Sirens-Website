import React , {useEffect , useState} from "react";
import SideNav from "../SideNav/SideNav";
import "./Gallery.css";
import Footer from "../footer/footer";
import { Carousel } from "react-responsive-carousel";
import Axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Error from "../../images/error.png";

function Gallery() {
   
  const path = `http://localhost:3001/`;
  
  const [listItems, setListItems] = useState([]);
  const [listItemsCarousel , setListItemsCarousel] = useState([]);

  useEffect(() => {
        
    Axios.get('http://localhost:3001/admin/gallery/read').then((response) => {
      setListItems(response.data)
    })
});

useEffect(() => {
        
  Axios.get('http://localhost:3001/admin/galleryCarousel/read').then((response) => {
    setListItemsCarousel(response.data)
  })
});

  return (
    <div className="background-position">
      <SideNav pageWrapId={"page-wrap"} outerContainerId={"App"} />
      <div className="resonsive-overflow">
        <div className="container">
          <div className="background">
            <div className="Gallery">
              <h1>Gallery</h1>
              <hr />
            </div>   
          <Carousel autoPlay className="Carousel">
            {listItemsCarousel.slice(0).reverse().map((val) =>{
               if(listItemsCarousel.length <= 10){
                return (<div key = {val._id}>
                  <img src={path + val.image} alt="bandImage"/>
              </div> );  
               }else{
                 return (<div key = {val._id} style = {{height : "550px"}} className = "error_image">
                  <img src={Error} alt="ErrorWarning"/>
              </div> ); 
               }
            })}
            </Carousel>
          
            <div className = "gallery">
            {listItems.slice(0).reverse().map((val) =>{
              return <div key = {val._id}  className ="images">
                <img className = "image_Size "src={`http://localhost:3001/${val.image}`} alt="bandImage"/>
              </div>
            })} 
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
