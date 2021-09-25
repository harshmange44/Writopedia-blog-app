import axios from "axios";
import { useState } from "react";
import "./contact-us.css";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/contact/post-contact", {
        name,
        email,
        message,
      });
      setSuccess(true);
    //   res.data && window.location.replace("/");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="contact-us">
      <section id="contact">
  
  <h1 className="section-header">Contact Us</h1>
  
  <div className="contact-wrapper">
      
    <form id="contact-form" className="form-horizontal" role="form" onSubmit={handleSubmit}>
       
      <div className="form-group">
        <div className="col-sm-12">
          <input type="text"
          className="form-control"
          id="name"
          placeholder="NAME"
          name="name"
          onChange={(e) => setName(e.target.value)}
          required />
        </div>
      </div>

      <div className="form-group">
        <div className="col-sm-12">
          <input type="email"
          className="form-control"
          id="email"
          placeholder="EMAIL"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          required />
        </div>
      </div>

      <textarea className="form-control txt-area"
      rows="10"
      placeholder="MESSAGE"
      name="message"
      onChange={(e) => setMessage(e.target.value)}
      required>
      </textarea>
      
      <button className="btn btn-primary send-button" id="submit" type="submit" value="SEND">
        <div className="alt-send-button">
          <i className="fa fa-paper-plane"></i><span className="send-text">SEND</span>
        </div>
      </button>
      {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Successfully Sent...
            </span>
        )}
    </form>
  </div>
</section>  
  
      {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
    </div>
  );
}
