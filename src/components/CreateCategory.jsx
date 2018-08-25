import React from 'react';


const Category = ({ 
		posts,
		curPost,
		onDismissCategory
	}) => 
	<div className="categoryWrap"> 
		
    {posts[curPost].category.map((item, index, arr) =>
       <div className="categoryItem" key={index}>
         {item}
         <span onClick={() => onDismissCategory(item, index, arr, curPost)}> del </span>
       </div>
    )}
		
	</div>


export default Category
