import React from 'react';


const Comment = ({ 
		posts,
		curPost,
		postComment,
		handleChange,
		handleSubmit,
		addComment
	}) => 
	<div className="comment"> 
			<div className="post__comment">
				<textarea  name="postComment" value={postComment} onChange={handleChange} placeholder="Enter your comment"/>
				<button  onClick={addComment}> add </button>
			</div>
			<div className="commentList">
				{posts[curPost].comment.map((item, index) =>
					<div className="commentItem" key={index}>
						{item}
					</div>
				)}
			</div>
	</div>


export default Comment
