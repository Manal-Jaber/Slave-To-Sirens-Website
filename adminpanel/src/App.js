import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Bio from "./Component/Bio/Bio";
import News from "./Component/News/News";
import Gallery from "./Component/Gallery/Gallery";
import Carousel from "./Component/Carousel/Carousel";
import Events from "./Component/Events/Events";
import Highlights from "./Component/Hihglights/Highlights";
import Reviews from "./Component/Reviews/Reviews";
import Testimonies from "./Component/Testimonies/Testimonies";
import Discography from "./Component/Discography/Discography";
import Upcoming from "./Component/Upcoming/Upcoming" 
import "./App.css";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={Bio} />
        <Route  path="/News" component={News} />
        <Route  path="/Gallery" component={Gallery} />
        <Route  path="/Carousel" component={Carousel}/> 
        <Route  path="/EventsImages" component={Events} />
        <Route  path="/Highlights" component={Highlights}/>
        <Route  path="/Upcoming"   component={Upcoming}/>
        <Route  path="/Reviews" component={Reviews} />
        <Route  path="/Testimonies" component={Testimonies} />
        <Route  path="/Discography" component={Discography} />
        {/* <Route path="/upload" component={Images}/> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
