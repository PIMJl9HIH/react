import React from 'react';

import Comment from './Comment';
import CreateCategory from './CreateCategory';
import Posttext from './Posttext';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import '../App.css';

const Post = ({
  posts,
  onDismiss,
  postComment,
  postCategory,
  handleChange,
  handleSubmit,
  addComment,
  addCategory,
  toggleFunc,
  onDismissCategory,
  showItem,
  onDismissComment,
  missingCategory,
  commentVisibility,
  postVisibility,
  editComment,
  editPost,
  onClickChoose,
  filterPostCategory,
  filteredResult
  }) =>
  <div className="post-wrap">

    {(filterPostCategory.length !== 0)
      ?
      <div className="filteredPosts">
        <h5> This is filtered posts </h5>

        {filteredResult().map((item, index, arr) =>
          <div className="post" key={index}>

            <CreateCategory
              posts={arr}
              curPost={index}
              onDismissCategory={onDismissCategory}
              missingCategory={missingCategory}
              addCategory={addCategory}
              toggleFunc={toggleFunc}
            />

            <Posttext
              posts={arr}
              item={item}
              curPost={index}
              editPost={ editPost}
              postVisibility={ postVisibility}
            />

            <Button
              className="button deletePost"
              color="danger"
              size="sm"
              outline
              type="button"
              onClick={(event) => onDismiss(item, index, arr, event)}
            >
              Delete Post
            </Button>

            <Comment
              posts={arr}
              curPost={index}
              postComment={postComment}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              addComment={addComment}
              toggleFunc={toggleFunc}
              onDismissCategory={() => onDismissCategory(index)}
              onDismissComment={onDismissComment}
              commentVisibility={commentVisibility}
              editComment={editComment}
            />

          </div>
        )}
      </div>
      :
      <div className="notFilteredPosts">
        {posts.map((item, index, arr) =>
          <div className="post" key={index}>
            <div className="post__category">

              <CreateCategory
                posts={posts}
                curPost={index}
                onDismissCategory={onDismissCategory}
                missingCategory={missingCategory}
                addCategory={addCategory}
                toggleFunc={toggleFunc}
              />
            </div>
            <Posttext
              posts={posts}
              item={item}
              curPost={index}
              editPost={ editPost}
              postVisibility={ postVisibility}
            />

            <Button
              className="button deletePost"
              color="danger"
              size="sm"
              outline
              type="button"
              onClick={(event) => onDismiss(item, index, arr, event)}
            >
              Delete Post
            </Button>

            <Comment
              posts={posts}
              curPost={index}
              postComment={postComment}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              addComment={addComment}
              toggleFunc={toggleFunc}
              onDismissCategory={() => onDismissCategory(index)}
              onDismissComment={onDismissComment}
              commentVisibility={commentVisibility}
              editComment={editComment}
            />

          </div>
        )}
      </div>
    }
  </div>

export default Post
