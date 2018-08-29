import React from 'react';
import Category from './Category';

import 'bootstrap/dist/css/bootstrap.min.css';
import {  Button, FormGroup, Input } from 'reactstrap';
import '../App.css';

const CreatePost = ({
  category,
  postCategory,
  postText,
  postComment,
  handleChange,
  handleSubmit,
  onDismiss,
  onDismissCreatePostCategory
  }) => 
	<div className="createPost">
		<form  className="post__form" name="postForm" onSubmit={handleSubmit} >
			<div className="post__category">
				<Category 
					category={category} 
					postCategory={postCategory} 
					handleChange={handleChange}
					onDismiss={onDismiss}
					onDismissCreatePostCategory={onDismissCreatePostCategory}
				/>
			</div>

			<div className="post__text">
        <FormGroup>
          <Input id="postTextArea" type="textarea"  name="postText" value={postText}  onChange={handleChange} placeholder="Enter your post" />
        </FormGroup>

			</div>
      <Button type="submit" className="button" color="primary" outline size="sm">Create Post</Button>
		</form>
	</div>


	
export default CreatePost