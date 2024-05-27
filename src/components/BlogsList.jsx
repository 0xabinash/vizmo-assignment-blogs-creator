import React, { useEffect, useState } from 'react'
import { BlogCard } from './exporter';

const BlogsList = () => {
  const [postsList, setPostsList] = useState([]);

  const posts = JSON.parse(localStorage.getItem("posts"));

  useEffect(()=>{
    if(posts){
      const sortedPosts = posts.slice().sort((a,b)=> b.createdAt.localeCompare(a.createdAt))
      setPostsList(sortedPosts);
    }
  },[posts?.length]);

  return (
    <div className=' bg-background w-[80%] m-auto space-y-10 mt-5'>
      <h1
        className='text-5xl font-bold text-orange-600 underline'
      >
        You can find all blogs here...
      </h1>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-2'>
        {
          postsList?.map((item)=>(
            <div key={item.id}>
              <BlogCard data={item} />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default BlogsList;