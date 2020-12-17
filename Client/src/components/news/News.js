import React , {useEffect , useState} from "react";
import Axios from 'axios';

import SideNav from "../SideNav/SideNav";
import "./News.css";
import Footer from "../footer/footer";



function News() {

  const path = `http://localhost:3001/`;

  const [listItemsNews , setListItemsNews] = useState([]);

  useEffect(() => {
        
    Axios.get('http://localhost:3001/admin/news/read').then((response) => {
       setListItemsNews(response.data)
    })
});



    return (
    <div className="background-position Events">
      <SideNav pageWrapId={"page-wrap"} outerContainerId={"App"} />
      <div className="resonsive-overflow">
        <div className="container">
          <div className="background">
            <h1 className = "news">NEWS</h1>
            <hr />
            <div className="imagecontainer-news">
              {listItemsNews.slice(0).reverse().map((val) => {
                return(
                  <div className = "imageNews" key ={val._id}>
                   <a href= {val.link} target = "_blank" rel="noreferrer" >
                     <img src={path + val.route} alt="press_Error"/>
                     <span className = "caption">{val.caption}</span>
                   </a>
                </div>
                );
              })}   
           </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
