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
  onDismissCreatePostCategory,
  onClickChoose,
  toggleFunc,
  createPostCategoryVisibility
  }) => 
	<div className="createPostWrap">

    <h5	>Create Post Section</h5>

		<form  className="post__form createPost" name="postForm" onSubmit={handleSubmit} >
			<div className="post__category">
				<Category 
					category={category} 
					postCategory={postCategory} 
					handleChange={handleChange}
					onDismiss={onDismiss}
					onDismissCreatePostCategory={onDismissCreatePostCategory}
          onClickChoose={onClickChoose}
          toggleFunc={toggleFunc}
          createPostCategoryVisibility={createPostCategoryVisibility}
				/>
			</div>

			<div className="post__text">
        <FormGroup>
          <Input id="postTextArea" type="textarea"  name="postText" value={postText}  onChange={handleChange} placeholder="Enter your post text" />
        </FormGroup>

			</div>
      <Button type="submit" className="createPostButton button " color="success" outline size="sm">Create Post</Button>
		</form>
	</div>


	
export default CreatePost