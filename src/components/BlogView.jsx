import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogView = () => {
  const { id } = useParams();
  const [postToShow, setPostToShow] = useState({})

  useEffect(()=>{
    const posts = JSON.parse(localStorage.getItem("posts"));
    if(posts){
      const selectedPost = posts.filter((post)=> post.id === id);
      setPostToShow(...selectedPost);
    }
  },[])

  const date = new Date(postToShow?.createdAt);

  return (
    <div className="w-[80%] bg-background m-auto mt-5 px-5 space-y-5">
      <h1 className="text-4xl underline font-semibold">{postToShow.heading}</h1>
      <div className="flex w-full justify-between  items-center">
        <div className=" flex flex-col gap-2 items-start w-fit ">
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden ring">
            <img src={postToShow?.avatar} alt={postToShow?.creator} />
          </div>
          <p className="text-md text-foreground font-semibold ">
            By: {postToShow.creator}
          </p>
        </div>
        <div className="flex space-x-1">
          <span
            className="text-sm text-muted-foreground font-semibold"
          >
            {date.toLocaleString('en-US', { month: 'long' })}
          </span>
          <span
            className="text-sm text-muted-foreground font-semibold"
          >
            {date.toLocaleString('default', { day: 'numeric' })},
          </span>
          <span 
            className="text-sm text-muted-foreground font-semibold"
          >
            {date.toLocaleString('en-US', { year: 'numeric' })}
          </span>
        </div>
      </div>
      <div className=" bg-foreground h-[1px]"></div>
      {postToShow.isDummy?(<p 
        className=" text-2xl"
      >
        This is a dummy post, thus blog body is not provided. Please go to create page and create a new post with a new body.<br/>
        This message will only show for pre-loaded posts.
      </p>):
      (<div>
        <div dangerouslySetInnerHTML={{ __html: postToShow.body }} />
      </div>)}
    </div>
  );
};

export default BlogView;
