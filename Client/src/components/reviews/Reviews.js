import React, { useState ,useEffect } from "react";
import SideNav from "../SideNav/SideNav";
import "./Reviews.css";
import Footer from "../footer/footer";
import Collapse from "rc-collapse";
import Axios from 'axios'

var Panel = Collapse.Panel;
const Reviews = (props) => {
  const [listItemNews , setListItemNews] = useState([]);

  useEffect(() => {
        
    Axios.get('http://localhost:3001/admin/reviews/read').then((response) => {
       setListItemNews(response.data)
    })
});

const [listItemTestimonies , setListItemTestimonies] = useState([]);

useEffect(() => {
        
  Axios.get('http://localhost:3001/admin/testimonies/read').then((response) => {
     setListItemTestimonies(response.data)
  })
});

  return (
    <div className="background-position">
      <SideNav pageWrapId={"page-wrap"} outerContainerId={"App"} />
      <div className="resonsive-overflow">
        <div className="container">
          <div className="background">
            <Collapse
              accordion={false}
              destroyInactivePanel={true}
              defaultActiveKey={"0"}
            >
              <Panel
                header="REVIEWS"
                headerClass="my-header-class"
                className="reviews_reviews"
              >
              
              {listItemNews.slice(0).reverse().map((val) => {
                if(val._id % 2 === 0) {
                  return (
                    <div className = "reviews_odd" key = {val._id}>
                      <p>{val.text}
                       <a href= {`${val.link}`}  target = "_blank" rel="noreferrer"><br/>
                  <small>{`${val.name}`}</small>
                       </a>
                      </p>
                    </div>
                  )
                }else{
                  return (
                  <div className = "reviews_even" key = {val._id}>
                     <p>{val.text}
                       <a href= {`${val.link}`}  target = "_blank" rel="noreferrer"><br/>
                       <small>{`${val.name}`}</small>
                       </a>
                      </p>
                  </div>
                  )
                }
              })}
               
              </Panel>
              <Panel
                header="TESTIMONIES"
                headerClass="my-header-class"
                className="reviews_testimonies"
              >

                {listItemTestimonies.slice(0).reverse().map((val) => {
                  if(val._id % 2 === 0){
                    return(
                      <p className = "reviews_odd" key = {val._id}>
                        {val.testimonies}<br/>
                        <small>{val.testimoniesBy}</small>
                      </p>
                    );
                  }else{
                   return( <p className = "reviews_even" key = {val._id}>
                      {val.testimonies}<br/>
                      <small>{val.testimoniesBy}</small>
                    </p>
                   )}
                })}
              </Panel>
            </Collapse>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
