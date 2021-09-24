import Post from "../post/Post";
import "./posts.css";

export default function Posts({ posts }) {

  const postBgColorList = ["#FEE8E7", "#F3F2F1", "#FEFDE6", "#F9FFE5", "#E5FFE6", "#EBF9F7"];
  var prevColorIndex = -1;

  function wordCount(str){
    return str.split(' ').filter(function(n) { return n != ''}).length;
  }

  function calcPostReadTime(post){
    const time = wordCount(post.title + " " + post.desc)/200;

    if(time < 1){
      return "less than 1"
    }
    return Math.floor(time);
  }

  return (
    <div className="posts">
      {posts.map(p => {
        var currColorIndex = Math.floor(Math.random() * 5);
        if(currColorIndex==prevColorIndex){
          if(currColorIndex<5){
            currColorIndex++;
          }else{
            currColorIndex--;
          }
        }
        const randomBgColor = postBgColorList[currColorIndex];
        prevColorIndex = currColorIndex;

        return <Post key={p._id} post={p} bgColor={randomBgColor} estimatedTime={calcPostReadTime(p)}/>
        // return <Post post={p}/>
      })}
    </div>
  );
}
