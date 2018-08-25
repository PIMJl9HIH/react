import React from 'react';


const Comment = ({ 
		posts,
		curPost,
		postComment,
		handleChange,
		handleSubmit,
		addComment,
		toggleFunc,
		onDismissCategory,
		onDismissComment

	}) => {
	return (

		
	<div className="comment"> 

		<button className="createComment" onClick={toggleFunc}>
			Create comment
		</button>

			<div className="post__comment" style={{display: posts[curPost].visibility ? 'block' : 'none'}}>
				<textarea  name="postComment" value={postComment}    onChange={handleChange} placeholder="Enter your comment"/>
				<button  onClick={addComment}> add </button>
			</div>
			<div className="commentList">
				{posts[curPost].comment.map((item, index, arr) =>
					<div className="commentItem" key={index}>
						{item}
						<span onClick={() => onDismissComment(item, index, arr, curPost)} > del </span>
					</div>
				)}
			</div>
		

		
		
	</div>
	)}


export default Comment
