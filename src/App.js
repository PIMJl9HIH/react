import React, { Component } from 'react';

import CreatePost from './components/CreatePost';
import Postfilter from './components/Postfilter';
import Actionpanel from './components/Actionpanel';
import Post from './components/Post';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends Component {
 
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      category: ['Category-1','Category-2','Category-3','Category-4','Category-5'],
      postCategory : [],
      filterPostCategory : [],
      postText: '',
      postComment: '',
      actionPanel: [],
      showItem : false,
      createPostCategoryVisibility: false,
      filterCategoryVisibility: false

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onDismissCreatePostCategory = this.onDismissCreatePostCategory.bind(this);
    this.onDismissFilterPostCategory = this.onDismissFilterPostCategory.bind(this);
    this.onDismissCategory = this.onDismissCategory.bind(this);
    this.onDismissComment = this.onDismissComment.bind(this);
    this.addComment = this.addComment.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.toggleFunc = this.toggleFunc.bind(this);
    this.missingCategory = this.missingCategory.bind(this);
    this.commentVisibility = this.commentVisibility.bind(this);
    this.postVisibility = this.postVisibility.bind(this);
    this.editComment = this.editComment.bind(this);
    this.editPost = this.editPost.bind(this);
    this.onClickChoose = this.onClickChoose.bind(this);
    this.filteredResult = this.filteredResult.bind(this);

  }

  onClickChoose(event) {
    const {
      postCategory,
      filterPostCategory
    } = this.state;

    const valueTag = event.target.innerHTML;

    if(event.target.className.includes('categoryItem')) {
      this.setState({
        postCategory: [...new Set([...postCategory, valueTag])],
        createPostCategoryVisibility: false
      });
    }

    if(event.target.className.includes('filterCategoryItem')) {
      this.setState({
        filterPostCategory: [...new Set([...filterPostCategory, valueTag])],
        filterCategoryVisibility: false
      });
    }

  }

  handleSubmit(event) {
    event.preventDefault();

    const { 
      posts,
      postCategory,
      postText,
      actionPanel
    } = this.state;

    if((postCategory.length !== 0) && (postText.length !== 0)) {

      const newPost = {};
      newPost.category = postCategory;
      newPost.text = postText;
      newPost.comment = [];
      newPost.visibilityCommentCreate = false;
      newPost.visibilityAddingCategory = false;
      newPost.postEdit = false;

      if(event.target.className.includes('createPost')) {
        this.setState({
          actionPanel: ['post was created', ...actionPanel],
        });
      }

      this.setState({
        posts: [...posts, newPost],
        postCategory : [],
        postText: ''
      })
    }
    
  }

  handleChange(event) {
    const {
      postCategory,
      filterPostCategory
    } = this.state;

    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    if (name === 'postCategory' ) {
      this.setState({
        postCategory: [...new Set([...postCategory, value])]
      });
    }

    if (name === 'postFilterCategory' ) {
      this.setState({
        filterPostCategory: [...new Set([...filterPostCategory, value])]
      });
    }

  }

  addCategory(curPost, arrPost, event) {
    const {
      posts,
      actionPanel
    } = this.state;

    arrPost[curPost].category = [...new Set([...arrPost[curPost].category, event.target.innerHTML])];
    arrPost[curPost].visibilityAddingCategory = false;
    this.setState({
      posts: [...posts],
      actionPanel: ['category was added', ...actionPanel],
    });

  }

  addComment(curIndex, arrPost) {

    const { 
      posts,
      postComment,
      actionPanel
    } = this.state;

    if(postComment.length !== 0) {
      arrPost[curIndex].comment = [...arrPost[curIndex].comment, {
        text: postComment,
        visibilityComment: false
      }];

      document.getElementById(`postCommentForm-${curIndex}`).reset();
      arrPost[curIndex].visibilityCommentCreate = false;
    }

    this.setState({
      posts: [...posts],
      postComment: '',
      actionPanel: ['comment was added', ...actionPanel],
    });

  }

  toggleFunc(curIndex, arrPost, event) {
    const {
      posts,
      createPostCategoryVisibility
    } = this.state;

    if(event.target.className.includes('addCategory')) {
      arrPost[curIndex].visibilityAddingCategory = arrPost[curIndex].visibilityAddingCategory ? false : true;

    }

    if(event.target.className.includes('createComment')) {
      arrPost[curIndex].visibilityCommentCreate = arrPost[curIndex].visibilityCommentCreate ? false : true;
    }

    if(event.target.className.includes('choose-category')) {
      this.setState({
        createPostCategoryVisibility: createPostCategoryVisibility ? false : true
      });
    }

    if(event.target.className.includes('filter-icon')) {
      this.setState(prevState => ({
        filterCategoryVisibility: !prevState.filterCategoryVisibility
      }));
    }

    this.setState({
      posts: [...posts]
    });

  }

  // --------------------------------------------------------------

  onDismiss(item, index, arr, event) {
    const {
      posts,
      actionPanel
    } = this.state;
    const isNotIndex = (item, i) => i !== index;
    const updatePosts = posts.filter(isNotIndex);

    if(event.target.className.includes('deletePost')) {
      this.setState({
        posts: updatePosts,
        actionPanel: ['post was deleted', ...actionPanel],
      });
    }
  }

  onDismissComment(item, index, arr, curPost, arrPost) {
    const {
      posts,
      actionPanel
    } = this.state;

    const isNotIndex = (item, i) => i !== index;

    arrPost[curPost].comment = arrPost[curPost].comment.filter(isNotIndex);

    this.setState({
      posts: [...posts],
      actionPanel: ['comment was deleted', ...actionPanel],
    });

  }

  onDismissCreatePostCategory(item, index, arr) {

    const isNotIndex = (item, i) => i !== index;
    const updateCategory =  arr.filter(isNotIndex);

    this.setState({
      postCategory: updateCategory
    });
  }

  onDismissFilterPostCategory(item, index, arr) {

    const isNotIndex = (item, i) => i !== index;
    const updateCategory =  arr.filter(isNotIndex);

    this.setState({
      filterPostCategory: updateCategory
    });

  }

  onDismissCategory(item, index, arr, curPost, arrPost) {
    const { 
      posts,
      actionPanel
    } = this.state;

    const isNotIndex = (item, i) => i !== index;
    const updateCategory =  arr.filter(isNotIndex);

    if(curPost === 0 || curPost) {
      arrPost[curPost].category = updateCategory;
    }

    this.setState({
      posts: [...posts],
      actionPanel: ['category was deleted', ...actionPanel],
    });
  }

  // --------------------------------------------------------------

  missingCategory(curPost) {
    let result = [];
    const category = this.state.category.slice();
    let postCategory;

    if (this.state.posts[curPost] && this.state.posts[curPost].category && this.state.posts[curPost].category.length) {
      postCategory = this.state.posts[curPost].category.slice()
    } else {
      postCategory = [];
    }

    for (let i = 0; i < category.length; i++) {
      if (!postCategory.includes(category[i])) {
          result.push(category[i]);
      }
    }
    return result;
  }

  commentVisibility(indexComment, indexPost, arrPost) {
    const {
      posts
    } = this.state;
    arrPost[indexPost].comment[indexComment].visibilityComment = true;

    this.setState({
      posts: [...posts]
    });

  }

  postVisibility(indexPost, arrPost) {
    const {
      posts
    } = this.state;

    arrPost[indexPost].postEdit = true;

    this.setState({
      posts: [...posts]
    });

  }

  editComment(indexComment, indexPost, arrPost) {
    const {
      posts,
      actionPanel
    } = this.state;

    const input = document.getElementById(`commentEditForm-${indexPost}${indexComment}`)[`commenteditfield-${indexPost}${indexComment}`];

    arrPost[indexPost].comment[indexComment].text = input.value;
    arrPost[indexPost].comment[indexComment].visibilityComment = false;

    this.setState({
      posts: [...posts],
      actionPanel: ['comment was edited', ...actionPanel],
    });

  }

  editPost(indexPost, arrPost, event) {
    const {
      posts,
      actionPanel
    } = this.state;

    const input = document.getElementById(`postEditForm-${indexPost}`)[`posteditfield-${indexPost}`];

    arrPost[indexPost].text = input.value;
    arrPost[indexPost].postEdit = false;

    this.setState({
      posts: [...posts]
    });

    if(event.target.className.includes('postEdited')) {
      this.setState({
        actionPanel: ['post was edited', ...actionPanel]
      });
    }
  }

  filteredResult() {
    const {
      posts,
      filterPostCategory
    } = this.state;

    let result = [];
    const copyPosts = posts.slice();

    for (let i = 0; i < copyPosts.length; i++) {
      if (copyPosts[i].category.some(r => filterPostCategory.includes(r))) {
        result.push(copyPosts[i]);
      }
    }
    return result;
  }

  render() {
    const {
      posts,
      category,
      postComment,
      postCategory,
      filterPostCategory,
      postText,
      actionPanel,
      createPostCategoryVisibility,
      filterCategoryVisibility
    } = this.state;

    return (
      <div className="App">
        <div className="container">
          <div className="main">
            <div className="post-section">
              <div className="create-filter-wrap">

                <CreatePost
                  category={category}
                  postCategory={postCategory}
                  postText={postText}
                  postComment={postComment}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  onDismiss={this.onDismiss}
                  onDismissCreatePostCategory={this.onDismissCreatePostCategory}
                  onClickChoose={this.onClickChoose}
                  toggleFunc={this.toggleFunc}
                  createPostCategoryVisibility={createPostCategoryVisibility}
                />
              </div>

              <div className="post-container">
                <div className="filter">
                  <Postfilter
                    posts={posts}
                    category={category}
                    filterPostCategory={filterPostCategory}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    onDismiss={this.onDismiss}
                    onDismissFilterPostCategory={this.onDismissFilterPostCategory}
                    onClickChoose={this.onClickChoose}
                    filterCategoryVisibility={filterCategoryVisibility}
                    toggleFunc={this.toggleFunc}
                  />
                </div>
                <Post
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
                  postVisibility={this.postVisibility}
                  editComment={this.editComment}
                  editPost={this.editPost}
                  onClickChoose={this.onClickChoose}
                  filterPostCategory={filterPostCategory}
                  filteredResult={this.filteredResult}
                />
              </div>
            </div>
            <div className="actionPanel">
              <h3>Action Panel</h3>
              <Actionpanel actionPanel={actionPanel} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;