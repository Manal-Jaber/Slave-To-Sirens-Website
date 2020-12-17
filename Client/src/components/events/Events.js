import React , {useEffect , useState} from "react";
import Axios from 'axios';
import SideNav from "../SideNav/SideNav";
import Footer from "../footer/footer";
import "./Events.css";


function Images() {

  const path = `http://localhost:3001/`;
   
  const [listItemsImages , setListItemsImages] = useState([]);
  useEffect(() => {
        
    Axios.get('http://localhost:3001/admin/events/image/read').then((response) => {
      setListItemsImages(response.data)
    })
});
  
  return (
    <div className="imagecontainer">
       {listItemsImages.slice(0).map((val) => {
         if(val._id === 0){
           return (
            <div className ="imageEvents" key = {val._id}>
            <img className="image1" src={path + val.image} alt="band on stage"/>
            </div>
           );
         }else if(val._id === 1){
          return (
            <div className ="imageEvents" key = {val._id}>
            <img className="image1" src={path + val.image} alt="band on stage"/>
            </div>
           );
         }else{
         return (
            <div className ="imageEvents" key = {val._id}>
            <img className="image1" src={path + val.image} alt="band on stage"/>
            </div>
           );
         }
       })}
    </div>
  );
}

function Events() {


  const [listHighlights , setListHighlights] = useState([]);

useEffect(() => {
        
  Axios.get('http://localhost:3001/admin/highlights/read').then((response) => {
    setListHighlights(response.data)
  })
},[listHighlights  , setListHighlights]);

const [listUpcoming , setListUpcoming] = useState([]);

useEffect(() => {
        
  Axios.get('http://localhost:3001/admin/upcoming/read').then((response) => {
    setListUpcoming(response.data)
  })
},[listUpcoming , setListUpcoming]);




  return (
    <div className="background-position">
      <SideNav pageWrapId={"page-wrap"} outerContainerId={"App"} />
      <div className="resonsive-overflow">
        <div className="container">
          <div className="background">
            <div className="wraper">
              <header className="Events-header">
                <h1>BAND HIGHLIGHTS</h1>
                <hr />
                <div className="overall">
                  <div className="Events-text">
                  
                    <ul>
                     {listHighlights.slice(0).reverse().map((val) => {
                return(
                  
                  <li key = {val._id}>
                    <a href= {val.url} target="_blank">
                    <span className="spin">
                      {val.text}
                    </span><br/>
                    <span className = "date">
                      {`${"("} ${val.country} ${" -"} `}{`${val.date} ${")"}`}
                    </span>
                    </a>
                  </li>
                     );})}   
                     </ul>
                  </div>
                  <Images />
                </div>
              </header>
            </div>
            <div className='upcoming'>
              <h1>UPCOMING SHOWS</h1>
              <hr/>
              {/* <a href="#">
                          <span className="spin">
                          Festival L'Boulevard
                          </span>
                          <br />
                          <span className="date">(MAR) (29.09.19)</span>
                        </a> */}

              
                     {listUpcoming.slice(0).reverse().map((val) => {
                return(
                  
                   <div key = {val._id}>

                    <a href= {val.url} target="_blank">
                    <span className="spin">
                      {val.text}
                    </span><br/>
                    <span className = "date">
                      {`${"("} ${val.country} ${" -"} `}{`${val.date} ${")"}`}
                    </span>
                    </a>
                     </div>
                
                     );})}   
                    
                  
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;
