import "./about-us.css";

export default function AboutUs() {

  return (
    <div className="about-us">
        <div className="container">
        <div className="card">
        <span className="about-name"> Writopedia </span>
        <span className="about-tag-line">Write Your Heart Out </span>
        <span className="about-dev-name"> Harsh Mange </span>
        <span className="about-dev"> Founder, Writopedia </span>
        </div>
        <br />
        <br />
        <br />
        <br />
        <hr />
        <ul className="social-media-list">
          <li>
              <a href="https://github.com/harshmange44" target="_blank" className="contact-icon">
            <i className="fab fa-github" aria-hidden="true"></i></a>
          </li>
          <li>
              <a href="https://in.linkedin.com/in/harshmange" target="_blank" className="contact-icon">
            <i className="fab fa-linkedin" aria-hidden="true"></i></a>
          </li>
          <li><a href="https://mail.google.com/mail/?view=cm&fs=1&to=harshmange44@gmail.com"
           target="_blank" className="contact-icon">
            <i className="fa fa-envelope" aria-hidden="true"></i></a>
          </li>
          <li><a href="https://www.instagram.com/im.h_r_s_h/" target="_blank" className="contact-icon">
            <i className="fab fa-instagram" aria-hidden="true"></i></a>
          </li>
        </ul>
        <hr />
        </div>  
    </div>
  );
}
