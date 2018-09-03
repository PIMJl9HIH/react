import React, { Component } from 'react';

import CreatePost from './components/CreatePost';
import Comment from './components/Comment';
import CreateCategory from './components/CreateCategory';
import Posttext from './components/Posttext';
import Postfilter from './components/Postfilter';
import Actionpanel from './components/Actionpanel';

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

    const value = event.target.value;
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

    if((postCategory.length === 0) || (postText.length === 0)) {


    }

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
    //const name = target.parentElement.name;
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
      createPostCategoryVisibility,
      filterCategoryVisibility
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


    console.log(posts[curPost].comment.filter(isNotIndex));
    // console.log(item);
    // console.log(index);
    console.log(arr);
    // console.log(curPost);
    // console.log(arrPost);
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
    // posts[indexPost].postEdit = true;
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
              <Actionpanel
                actionPanel={actionPanel}

              />

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

export default App;