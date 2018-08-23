import React from 'react';
import Category from './Category';

const Post = ({
  category,
  postCategory,
  postText,
  postComment,
  handleChange,
  handleSubmit
  }) => 
	<div className="post"> 
		<form  className="post__form" name="postForm" onSubmit={handleSubmit} >
			<div className="post__category">
				<Category 
					category={category} 
					postCategory={postCategory} 
					handleChange={handleChange}
				/>
			</div>

			<div className="post__text">
				<textarea  name="postText" value={postText} onChange={handleChange} placeholder="Enter your post"/>
			</div>
			<button type="submit" >Create Post</button>
		</form>
	</div>


	
export default Post