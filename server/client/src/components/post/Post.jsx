import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post, bgColor, estimatedTime }) {
  const PF = "http://localhost:5000/images/";
  return (
    <div className="post" style={{backgroundColor: bgColor}}>
    {/* <div className="post"> */}
      <div className="postInfo">
      {/* {post.photo && <img className="postImg" src={PF + post.photo} alt="" />} */}
        {/* <div className="postCategories">
          {post.categories.map((c) => (
            <span className="postCategory">{c.name}</span>
          ))}
        </div> */}
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        {/* <hr /> */}
        <p className="postDesc">{post.desc}</p>
      </div>
      <div className="publishDate-readMore">
        <span className="postDate">
          <span className="dateBold"> {new Date(post.createdAt).toDateString()} </span>
        </span>

        <span className="postReadTime">
          <span className="timeBold"> <span className="dot-sep">    &#9679;   </span> {estimatedTime} </span> {" min read"} 
        </span>
        <Link to={`/post/${post._id}`} className="link">
        <div className="postReadMore">
          Read More
        </div>
        </Link>
      </div>
    </div>
  );
}
