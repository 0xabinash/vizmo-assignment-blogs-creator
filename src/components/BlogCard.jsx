import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const BlogCard = ({data}) => {
  const navigate = useNavigate();
  const [isDarkActive] = useOutletContext();
  const date = new Date(data.createdAt);

  return (
    <div 
      className={`bg-background p-2 box-border space-y-3 rounded-md border cursor-pointer ${isDarkActive?"hover:shadow-gray-700": "hover:shadow-black"}  hover:shadow-lg duration-300`}
      onClick={()=>navigate(`/blog-view/${data.id}`)}
    >
      <div className="w-full h-[140px] overflow-hidden rounded-md">
        <img src={data.cardThumbnail} alt="image" className=" object-cover" />
      </div>
      <div className="space-y-2">
        <span className="p-[3px] bg-background border rounded-md inline-block text-sm text-muted-foreground font-semibold ">
          {data.category}
        </span>
        <h3 className=" text-foreground font-bold">
          {data.heading}
        </h3>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center w-fit">
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden ring">
            <img src={data.avatar} alt={data.creator} />
          </div>
          <p className="text-sm text-muted-foreground font-semibold ">{data.creator}</p>
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
    </div>
  );
};

export default BlogCard;
