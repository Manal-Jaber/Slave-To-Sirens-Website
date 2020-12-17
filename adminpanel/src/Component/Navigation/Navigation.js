import React from 'react';
import {Link} from "react-router-dom";

import './Navigation.css';

function Navigation() {
    return (
        <div className = "navigation">
            <nav>
                <ul>
                    {/* <li><Link to = "/" className = "nav-link">Home</Link></li> */}
                    <li><Link to = "/News" className = "nav-link">News</Link></li>
                    <li><Link to = "/Gallery" className = "nav-link">Gallery</Link></li>
                    <li><Link to ="/Carousel" className = "nav-link">Gallery Carousel</Link></li>
                    <li><Link to = "/EventsImages" className = "nav-link">Events Images</Link></li>
                    <li><Link to = "/Highlights" className = "nav-link">Highlights</Link></li>
                    <li><Link to = "/Upcoming" className = "nav-link">Upcoming Shows</Link></li>
                    <li><Link to = "/Reviews" className = "nav-link">Reviews</Link></li>
                    <li><Link to="/Testimonies" className = "nav-link">Testimonies</Link></li>
                    <li><Link to="/Discography" className = "nav-link">Discography</Link></li>
                    {/* <li><Link to="/upload" className = "nav-link">Upload</Link></li> */}
                </ul>
            </nav>
        </div>
    )
}

export default Navigation
