import "./settings.css";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Settings() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  // const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { user, dispatch } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    
      const data = new FormData();
      data.append("userId", user._id);

      if(name!=""){
        data.append("name", name);
      }
      // if(username!=""){
      //   data.append("username", username);
      // }
      if(email!=""){
        data.append("email", email);
      }
      if(password!=""){
        data.append("password", password);
      }
      if(file!=null){
        data.append("imgFile", file);
      }
    try {
      const res = await axios.patch("/users/" + user._id, data);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);
    try {
      const res = await axios.delete("/users/"+user._id);
      res.data && dispatch({ type: "LOGOUT" });
      // res.data && setSubmitted(true);
    } catch (err) {
      setError(true);
      setErrorMsg(err);
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle" onClick={handleDeleteAccount}>Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : `data:image/png;base64,${user.profilePic}`}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              accept="image/png, image/jpeg, image/jpg"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Name</label>
          <input
            type="text"
            placeholder={user.name}
            onChange={(e) => setName(e.target.value)}
          />
          {/* <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          /> */}
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {error && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              {errorMsg && "err: "+errorMsg}
            </span>
          )}
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
    </div>
  );
}
