import React from 'react';

const Post = ({ postTitle, postComment, handleChange, handleSubmit }) => 
	<div className="post"> 
		<form  className="post__form" name="postForm" onSubmit={handleSubmit}>
			<div className="post__title">
				<label>
					 Enter title
					<input type="text" name="postTitle" value={postTitle} onChange={handleChange} />
				</label>
			</div>
			<div className="post__comment">
				<label>
					Enter comment
					<textarea  name="postComment" value={postComment} onChange={handleChange} />
				</label>
			</div>
			<button type="submit" >Create Post</button>
		</form>
	</div>


	
export default Post