import React from 'react';


const Category = ({ 
		category,
		postComment,
		postCategory,
		handleChange,
		handleSubmit 
	}) => 
	<div className="category"> 
    <span >choose category </span>
    <select name="postCategory" onChange={handleChange} >
    	{category.map((item, index) =>
				<option key={index} value={item}> {item} </option>
			)}
    </select>

    <div className="postCategories">
			{postCategory.map((item,index) =>
				<div key={index} className="categoryItem">
					{item}
				</div>
			)}
		</div>
	</div>


export default Category
