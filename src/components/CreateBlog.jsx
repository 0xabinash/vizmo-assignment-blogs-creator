import React, { useEffect, useState } from 'react'
import { Editor } from './exporter';
import Compressor from 'compressorjs';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { useToast } from './ui/use-toast';

const CreateBlog = () => {
  const { toast } = useToast()
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    heading: "",
    id: "",
    creator: "",
    avatar: "https://github.com/shadcn.png",
    body: "",
    createdAt: "",
    category:"",
    cardThumbnail:"default.jpg",
    isDummy: false
  });

  const [blogBody, setBlogBody] = useState("");

  const handleSubmit = () =>{
    if(localStorage.getItem("posts")){
      const posts = JSON.parse(localStorage.getItem("posts"));
      posts.push(blogData);
      localStorage.setItem("posts", JSON.stringify(posts));
    }else{
      let posts = [];
      posts.push(blogData);
      localStorage.setItem("posts", JSON.stringify(posts));
    }

    toast({
      className: "bg-green-600 text-2xl font-semibold",
      title: "Success",
      description: "Post Created successfully",
    })

    setTimeout(()=>{
      navigate("/")
    },2000)
  }

  useEffect(()=>{
    setBlogData({...blogData, body: blogBody});
  },[blogBody])

  const handleInput = (e)=>{
    if(!blogData.id){
      const date = new Date();
      setBlogData({...blogData, [e.target.name]: e.target.value, id: nanoid(), createdAt: date.toISOString()});
    }else{
      setBlogData({...blogData, [e.target.name]: e.target.value});
    }
  }

  const handleAvatarUpload = (e) => {
    const reader = new FileReader();

    reader.readAsDataURL(e);

    reader.onload = () => {
      setBlogData({ ...blogData, avatar: reader.result });
    };
  };

  const handleCardThumbnail = (e) => {
    const reader = new FileReader();

    reader.readAsDataURL(e);

    reader.onload = () => {
      setBlogData({ ...blogData, cardThumbnail: reader.result });
    };
  };

  const handleCompressedUpload = (e, flag) => {
    const image = e.target.files[0];
    new Compressor(image, {
      quality: 0.6,
      success: (compressedResult) => {  
        flag === "card"? handleCardThumbnail(compressedResult): handleAvatarUpload(compressedResult)
      },
    });
  };

  return (
    <div className='bg-background  box-border p-2 m-auto space-y-5'>
      <div className='space-y-5 md:w-[90%] lg:w-[70%] m-auto'>
        <h2 className='text-4xl font-semibold text-orange-600 w-fit rounded-md hover:shadow-md m-auto'>
          Create a blog here...
        </h2>
        <input 
          className='p-2 w-full rounded-md placeholder:text-foreground bg-background border'
          id="heading" 
          type="text" 
          name='heading'
          placeholder='Blog Heading...'
          autoFocus
          onChange={(e)=>handleInput(e)}
        />
        <input
          className='p-2 w-full rounded-md placeholder:text-foreground bg-background border'
          type="text" 
          name='creator'
          placeholder='Creator...'
          onChange={(e)=>handleInput(e)}
        />
        <input 
          className='p-2 w-full rounded-md placeholder:text-foreground bg-background border'
          id="heading" 
          type="text" 
          name='category'
          placeholder='Category...'
          autoFocus
          onChange={(e)=>handleInput(e)}
        />
        <label 
          className=' inline-block font-semibold'
          htmlFor="cardThumbnail"
        >
          Upload card Thumbnail below (optional)
        </label>
        <input
          className='p-2 w-full rounded-md placeholder:text-foreground bg-background border'
          id="cardThumbnail"
          type="file"
          onChange={(e)=> handleCompressedUpload(e,"card")}
        />
        <label 
          className=' inline-block font-semibold'
          htmlFor="avatar"
        >
          Upload you profile avatar below (optional)
        </label>
        <input
          className='p-2 w-full rounded-md placeholder:text-foreground bg-background border'
          id="avatar"
          type="file"
          onChange={(e)=> handleCompressedUpload(e,"avatar")}
        />
      </div>

      <span 
        className='inline-block text-2xl font-semibold'
      >
        Write the body of the blog below.
      </span>
      <p>Images and videos can be resized.</p>

      <Editor blogBody={blogBody} setBlogBody={setBlogBody} />

      <button
        className='p-3 rounded-md bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white hover:translate-x-3 duration-300 font-semibold'
        type='button'
        onClick={()=> handleSubmit()}
      >
        Submit blog
      </button>
    </div>
  )
}

export default CreateBlog