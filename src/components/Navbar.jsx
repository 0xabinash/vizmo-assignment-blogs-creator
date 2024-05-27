import React, {forwardRef} from 'react';
import { DarkThemeSwitcher } from './exporter';
import { NavLink, useLocation } from 'react-router-dom';

const navArr = [
  {name: "Create", to: "/"},
  {name: "Blogs", to: "/blogs"}
]

const Navbar = forwardRef(({setIsDarkActive}, ref) => {
  const location = useLocation()
  return (
    <div 
      className='w-full h-[10dvh] border flex items-center px-5 py-1 justify-between space-x-4 fixed top-0 z-10 box-border backdrop-blur'
      ref={ref}
    >
      <div className='w-[90px] rounded-full overflow-hidden'>
        {!location.pathname.includes("blog-view")? (<img src="x.png" alt="blog-logo" className=' object-contain' />):
        <p className=' w-fit inline-block text-2xl font-bold tracking-widest text-orange-600'>BLOGS!</p>}
      </div>
      <div className='flex space-x-4 items-center'>
        {
          navArr.map((btn)=>(
            <NavLink
              key={btn.name}
              className={({isActive})=>(
                `h-fit py-1 px-2 rounded-sm font-semibold ${isActive? " bg-orange-500 text-blue-700" : " bg-background text-foreground"}`
              )}
              to={btn.to}
            >
              {btn.name}
            </NavLink>
          ))
        }
        <DarkThemeSwitcher setIsDarkActive={setIsDarkActive} />
      </div>
    </div>
  )
})

export default Navbar