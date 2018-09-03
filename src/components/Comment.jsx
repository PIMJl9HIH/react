import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import {  Button, FormGroup, Input  } from 'reactstrap';
import '../App.css';


const Comment = ({ 
		posts,
		curPost,
		postComment,
		handleChange,
		handleSubmit,
		addComment,
		toggleFunc,
		onDismissCategory,
		onDismissComment,
		commentVisibility,
    editComment

	}) => {
	return (

		
	<div className="comment">

    <Button
      className="createComment button"
      color="success"
      size="sm"
      outline
      onClick={(event) => toggleFunc(curPost, posts, event)}
    >
      Comment
    </Button>

			<div className="post__comment" style={{display: posts[curPost].visibilityCommentCreate ? 'block' : 'none'}}>
        <form action="" id={`postCommentForm-${curPost}`} className="postCommentForm" onSubmit={() => addComment(curPost, posts)}>

					<FormGroup>
						<Input id="postCommentArea" type="textarea"  name="postComment"  onChange={handleChange} placeholder="Enter your comment" />
					</FormGroup>

          <Button
            className="addComment button"
            color="success"
            size="sm"
            outline
            onClick={() => addComment(curPost, posts)}
          >
            Create Comment
          </Button>
				</form>
			</div>


			<div className="comment__list">
				{posts[curPost].comment.map((item, index, arr) =>
					<div className="comment__item" key={index}>
						{item.visibilityComment
							?
							<form action="" id={`commentEditForm-${curPost}${index}`} className="commentConfirmForm">
								<input type="text"  className="commentEditField" name={`commenteditfield-${curPost}${index}`} defaultValue={item.text}/>
								<span className="commentConfirmButton" onClick={() => editComment(index, curPost, posts)} ></span>
							</form>
							: 
							<div className="edit-block">
								{item.text}
								<span className="editButton" onClick={() => commentVisibility(index, curPost, posts)} > </span>
							</div>
						}

            <div
              className="delete"
              onClick={() => onDismissComment(item, index, arr, curPost, posts)}
            >
            </div>
					</div>
				)}
			</div>
		

		
		
	</div>
	)}


export default Comment
