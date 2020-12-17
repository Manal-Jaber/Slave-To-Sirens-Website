import React from "react";
import "./Home.css";
import "./home.scss";
import Nav from "../Navigations/nav";
import SideNav from "../SideNav/SideNav";
import image from "../../images/Home_bg.jpg";

function Home() {
  return (
    <div className="Home_bg">
      <div className="Navigation">
        <Nav />
      </div>
      <div className="SideNav">
        <SideNav pageWrapId={"page-wrap"} outerContainerId={"App"} />
      </div>
      <div class="c-glitch" style={{backgroundImage: `url(${image})`}}>
        <audio controls style ={{position:"relative" , zIndex : "1000" ,opacity :"0.0000001"}} autoPlay="autoPlay" loop play ="true">
          <source src="https://soundsnap-prod.nyc3.digitaloceanspaces.com/files/audio/1z/transcode/439654-Electricity-Zap-Thin-Intense.mp3?response-content-disposition=attachment%3B+filename%3D%22439654-Electricity-Zap-Thin-Intense.mp3%22&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AD4PI63EK5AJWZMJZZKH%2F20201204%2Fnyc3%2Fs3%2Faws4_request&X-Amz-Date=20201204T083202Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Signature=4aee7ed8423477bc997b8a2c7207f54896bc48af82e1d460e99531f96314676c" type="audio/ogg"/>
        </audio>
      <div class="c-glitch__img" style={{backgroundImage: `url(${image})`}}></div>
      <div class="c-glitch__img" style={{backgroundImage: `url(${image})`}}></div>
     <div class="c-glitch__img" style={{backgroundImage: `url(${image})`}}></div>
     <div class="c-glitch__img" style={{backgroundImage: `url(${image})`}}></div>
     <div class="c-glitch__img" style={{backgroundImage: `url(${image})`}}></div>
     </div>

 
      <div className = "copyright" id= "home_Copyright">
      <p>CopyRight Ⓒ 2020 <a target="_blank"   rel="noreferrer" href= "https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=codestalers@gmail.com">Code Stellars.</a>All Rights Reserved</p>
      </div>
    </div>
  );
}

export default Home;
