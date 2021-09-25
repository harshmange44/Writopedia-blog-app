import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/"

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      <div className="topLeft">
        {/* <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-instagram-square"></i> */}
        
        <span className="headerTitleLg"> <a href="/">Writopedia</a> </span>

      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <div className="link-div">
            <Link className="link" to="/">
              HOME
            </Link>
            </div>
          </li>
          <li className="topListItem">
          <div className="link-div">
            <Link className="link" to="/about-us">
              ABOUT
            </Link>
            </div>
          </li>
          <li className="topListItem">
          <div className="link-div">
            <Link className="link" to="/contact-us">
              CONTACT
            </Link>
            </div>
          </li>
          <li className="topListItem-write">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
        </ul>
      </div>
      <div className="topRight">
      <div className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
      </div>
        {user ? (
          <Link to="/settings">
            {user.profilePic!="" ? (
            <img className="topImg" src={`data:image/png;base64,${user.profilePic}`} alt="SETTING" />
            ) : (
              "SETTINGS"
            )}
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
