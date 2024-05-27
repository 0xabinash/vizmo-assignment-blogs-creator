import React,{useEffect, useRef, useState} from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from './exporter';
import { posts } from "../sampleData";

const Layout = () => {
  const navHeightRef = useRef(null);
  const [isDarkActive, setIsDarkActive] = useState(false)
  const [navHeight, setNavHeight] = useState(0);
  const localStorageItems = localStorage.getItem("posts")

  useEffect(()=>{
    if(!localStorageItems){
      if(posts){
        localStorage.setItem("posts", JSON.stringify(posts))
      }
    }
  },[posts?.length]);

  useEffect(()=>{
    if (navHeightRef) {
      const height = navHeightRef.current.offsetHeight;
      if (height) {
        setNavHeight(height);
      }
    }
  }, [navHeightRef.current]);

  return (
    <main className='flex flex-col min-h-[100vh]'>
      <Navbar setIsDarkActive={setIsDarkActive} ref={navHeightRef} /> 
      <main 
        className='bg-background my-5 max-w-[1440px] w-full m-auto' 
        style={{marginTop:  navHeight + "px"}}
      >
        <Outlet context={[isDarkActive]} />
      </main>
      <Footer /> 
    </main>
  )
}

export default Layout;