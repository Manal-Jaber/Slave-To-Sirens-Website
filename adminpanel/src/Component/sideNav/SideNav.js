import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";

function SideNav(props) {
    return (
      <Menu {...props}>
        <Link className="menu-item a" to="/News">
          News
        </Link>
        <Link className="menu-item a" to="/Gallery">
          Gallery
        </Link>
        <Link className="menu-item a" to="/Carousel">
          Carousel
        </Link>
        <Link className="menu-item a" to="/EventsImages">
         EventsImages
        </Link>
        <Link className="menu-item a" to="/Highlights">
        Highlights
        </Link>
        <Link className="menu-item a" to="/Upcoming">
          Upcoming
        </Link>
        <Link className="menu-item a" to="/Reviews">
         Reviews
        </Link>
        <Link className="menu-item a" to="/Testimonies">
        Testimonies
        </Link>
        <Link className="menu-item a" to="/Discography">
         Discography
        </Link>
      </Menu>
    );
  }
  
  export default SideNav;