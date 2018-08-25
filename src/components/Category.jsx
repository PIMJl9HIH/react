import React from 'react';


const Category = ({ 
		category,
		postComment,
		postCategory,
		handleChange,
		handleSubmit,
		onDismiss,
		onDismissCreatePostCategory
	}) => 
	<div className="category"> 
    <span >choose category </span>
    <select name="postCategory" onChange={handleChange} >
    	{category.map((item, index) =>
				<option key={index} value={item}> {item} </option>
			)}
    </select>

    <div className="postCategories">
			{postCategory.map((item,index, arr) =>
				<div key={index} className="categoryItem">
					{item}
					<span onClick={() => onDismissCreatePostCategory(item,index, arr)}> del </span>
				</div>
			)}
		</div>
	</div>


export default Category
