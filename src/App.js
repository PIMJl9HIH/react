import React, { Component } from 'react';

import './App.css';
import Post from './components/Post';
import Comment from './components/Comment';
import CreateCategory from './components/CreateCategory';



class App extends Component {
 
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      category: ['select', 'post-1','post-2','post-3','post-4','post-5'],
      postCategory : [],
      postText: '',
      postComment: '',
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
    this.toggleFunc = this.toggleFunc.bind(this);

  }

  handleSubmit(event) {
    event.preventDefault();

    const { 
      posts,
      postCategory,
      postText,
      error
    } = this.state;

    if((postCategory.length) === 0 && (postText.length === 0)) {

      this.setState({
        error: true
      })
    }

    if((postCategory.length) !== 0 && (postText.length !== 0)) {

      const newPost = {};
      newPost.category = postCategory;
      newPost.text = postText;
      newPost.comment = [];
      newPost.visibility = false;

      this.setState({
        error: false,
        posts: [...posts, newPost],
        postCategory : [],
        postText: ''

      })
    }
   
  }


  handleChange(event) {
    const { 
      posts,
      category,
      postCategory,
      postComment

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
        postCategory: [...postCategory, value]
      });
    }

  }

  addComment(curIndex) {
    // event.preventDefault();
    const { 
      posts,
      postComment
    } = this.state;

    if(postComment.length !== 0) {
      posts[curIndex].comment = [...posts[curIndex].comment, postComment];
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
    const updateComment =  posts[curPost].comment.filter(isNotIndex);

    posts[curPost].comment = updateComment;

    this.setState({
      posts: [...posts]
    });
  }


  toggleFunc(curIndex) {
    const { posts } = this.state;

    posts[curIndex].visibility = posts[curIndex].visibility ? false : true;

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
    const {postCategory} = this.state;
    const isNotIndex = (item, i) => i !== index;
    const updateCategory =  arr.filter(isNotIndex);

    this.setState({
      postCategory: updateCategory
    });
  }

  onDismissCategory(item, index, arr, curPost) {
    const { 
      posts,
      postCategory
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
          <Post 
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
            : <CreatePost
              posts={posts}
              postComment={postComment}
              postCategory={postCategory}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              onDismiss={this.onDismiss}
              addComment={this.addComment}
              toggleFunc={this.toggleFunc}
              toggleFunc={this.toggleFunc}
              onDismissCategory={this.onDismissCategory}
              onDismissComment={this.onDismissComment}
            />
          }
        
        </div>
      </div>
    );
  }
}

const CreatePost = ({
  posts,
  onDismiss, 
  postComment, 
  postCategory,
  handleChange, 
  handleSubmit, 
  addComment,
  toggleFunc,
  onDismissCategory,
  showItem,
  onDismissComment
  }) => 
  <div className="post-wrap">
    {posts.map((item, index, arr) =>
      <div className="post" key={index}>
        <br/>
        <div className="post__category">
          
          <CreateCategory 
            posts={posts}
            curPost={index}
            onDismissCategory={onDismissCategory}
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
          toggleFunc={() => toggleFunc(index)}
          onDismissCategory={() => onDismissCategory(index)}
          onDismissComment={onDismissComment}
        />
        
        <Button
          onClick={() => onDismiss(item, index, arr)}
        >
          Delete Post
        </Button>

      </div>
    )}
  </div>

const Button = ({onClick, className = '', children}) =>
  <button
    onClick={onClick}
    className={className}
    type="button"
  >
    {children}
  </button>


export default App;
