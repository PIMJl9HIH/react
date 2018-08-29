import React, { Component } from 'react';

import CreatePost from './components/CreatePost';
import Comment from './components/Comment';
import CreateCategory from './components/CreateCategory';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import './App.css';




class App extends Component {
 
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      category: ['Category-1','Category-2','Category-3','Category-4','Category-5'],
      postCategory : [],
      postText: '',
      postComment: '',
      actionPanel: [],
      showItem : false,
      error: false

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onDismissCreatePostCategory = this.onDismissCreatePostCategory.bind(this);
    this.onDismissCategory = this.onDismissCategory.bind(this);
    this.onDismissComment = this.onDismissComment.bind(this);
    this.addComment = this.addComment.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.toggleFunc = this.toggleFunc.bind(this);
    this.missingCategory = this.missingCategory.bind(this);
    this.commentVisibility = this.commentVisibility.bind(this);
    this.editComment = this.editComment.bind(this);

  }

  handleSubmit(event) {
    event.preventDefault();

    const { 
      posts,
      postCategory,
      postText,
      actionPanel
    } = this.state;

    if((postCategory.length) === 0 || (postText.length === 0)) {

      this.setState({
        error: true
      })
    }

    if((postCategory.length) !== 0 && (postText.length !== 0)) {

      const newPost = {};
      newPost.category = postCategory;
      newPost.text = postText;
      newPost.comment = [];
      newPost.visibilityCommentCreate = false;
      newPost.visibilityAddingCategory = false;

      this.setState({
        actionPanel: [...actionPanel, 'post sozdan'],
        error: false,
        posts: [...posts, newPost],
        postCategory : [],
        postText: ''

      })
    }
    
  }


  handleChange(event, ) {
    const {
      postCategory
    } = this.state;

    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    // формируем массив категорий для поста
    if (name === 'postCategory' ) {
      this.setState({
        postCategory: [...new Set([...postCategory, value])]
      });
    }

  }

  addCategory(curPost, event) {
    const {
      posts
    } = this.state;

    posts[curPost].category = [...new Set([...posts[curPost].category, event.target.value])];
    posts[curPost].visibilityAddingCategory = false;
    this.setState({posts: [...posts] });
  }

  addComment(curIndex) {
    // event.preventDefault();
    const { 
      posts,
      postComment
    } = this.state;

    if(postComment.length !== 0) {
      posts[curIndex].comment = [...posts[curIndex].comment, {
        text: postComment,
        visibilityComment: false
      }];

      document.getElementById(`postCommentForm-${curIndex}`).reset();
      posts[curIndex].visibilityCommentCreate = false;
    }

    this.setState({
      posts: [...posts],
      postComment: ''
    });

  }

  // не совсем понял почему item === index
  onDismissComment(item, index, arr, curPost) {
    const { posts } = this.state;

    const isNotIndex = (item, i) => i !== index;

    posts[curPost].comment = posts[curPost].comment.filter(isNotIndex);

    this.setState({
      posts: [...posts]
    });
  }


  toggleFunc(curIndex, event) {
    const { posts } = this.state;

    if(event.target.className.includes('addCategory')) {
      posts[curIndex].visibilityAddingCategory = posts[curIndex].visibilityAddingCategory ? false : true;

    }

    if(event.target.className.includes('createComment')) {
      posts[curIndex].visibilityCommentCreate = posts[curIndex].visibilityCommentCreate ? false : true;
    }


    this.setState({
      posts: [...posts]
    });
  }

  onDismiss(item, index, arr) {
    const {posts} = this.state;
    const isNotIndex = (item, i) => i !== index;
    const updatePosts = posts.filter(isNotIndex);

    this.setState({
      posts: updatePosts
    });
  }

  onDismissCreatePostCategory(item, index, arr) {

    const isNotIndex = (item, i) => i !== index;
    const updateCategory =  arr.filter(isNotIndex);

    this.setState({
      postCategory: updateCategory
    });
  }

  onDismissCategory(item, index, arr, curPost) {
    const { 
      posts
    } = this.state;

    const isNotIndex = (item, i) => i !== index;
    const updateCategory =  arr.filter(isNotIndex);

    if(curPost === 0 || curPost) {
      posts[curPost].category = updateCategory;
    }

    this.setState({
      posts: [...posts]
    });
  }

  missingCategory(curPost) {
    let result = [];
    const category = this.state.category.slice();
    let postCategory;

    if (this.state.posts[curPost] && this.state.posts[curPost].category && this.state.posts[curPost].category.length) {
      postCategory = this.state.posts[curPost].category.slice()
    } else {
      postCategory = [];
    }
    // was var
    for (let i = 0; i < category.length; i++) {
      if (!postCategory.includes(category[i])) {
          result.push(category[i]);
      }
    }
    return result;
  }

  commentVisibility(indexComment, indexPost) {
    const {
      posts
    } = this.state;
    posts[indexPost].comment[indexComment].visibilityComment = true;
    // console.log(posts[indexPost].comment[indexComment].visibility);

    this.setState({
      posts: [...posts]
    });
  }

  editComment(indexComment, indexPost) {
    const {
      posts
    } = this.state;

    const input = document.getElementById(`commentEditForm-${indexPost}${indexComment}`)[`commenteditfield-${indexPost}${indexComment}`];

    posts[indexPost].comment[indexComment].text = input.value;
    posts[indexPost].comment[indexComment].visibilityComment = false;

    this.setState({
      posts: [...posts]
    });

  }


  render() {
    const {
      posts,
      category,
      postComment,
      postCategory,
      postText,
      error
    } = this.state;
    return (
      <div className="App">
        <div className="container">
          <div className="main">
            <div className="post-container">
              <CreatePost
                category={category}
                postCategory={postCategory}
                postText={postText}
                postComment={postComment}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                onDismiss={this.onDismiss}
                onDismissCreatePostCategory={this.onDismissCreatePostCategory}
              />
              { error
                ? <div> Something went wrong. </div>
                : <Post
                  posts={posts}
                  postComment={postComment}
                  postCategory={postCategory}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  onDismiss={this.onDismiss}
                  addComment={this.addComment}
                  addCategory={this.addCategory}
                  toggleFunc={this.toggleFunc}
                  onDismissCategory={this.onDismissCategory}
                  onDismissComment={this.onDismissComment}
                  missingCategory={this.missingCategory}
                  commentVisibility={this.commentVisibility}
                  editComment={this.editComment}
                />
              }
            </div>
            <div className="actionPanel">
              <h3>Action Panel</h3>
              <div className="actionPanel__wrap">

              </div>
            </div>
          </div>


        
        </div>
      </div>
    );
  }
}

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
  editComment
  }) => 
  <div className="post-wrap">
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
        <div className="post__text">{item.text} </div>

        <Comment 
          posts={posts}
          curPost={index}
          postComment={postComment}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          addComment={() => addComment(index)}
          toggleFunc={toggleFunc}
          onDismissCategory={() => onDismissCategory(index)}
          onDismissComment={onDismissComment}
          commentVisibility={commentVisibility}
          editComment={editComment}
        />

        <Button
          className="button"
          color="danger"
          size="sm"
          outline
          type="button"
          onClick={() => onDismiss(item, index, arr)}
        >
          Delete Post
        </Button>
      </div>
    )}
  </div>

export default App;


// --------