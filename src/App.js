import React, { Component } from 'react';

// import logo from './logo.svg';
import './App.css';
import Post from './components/Post';
import Comment from './components/Comment';



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
    this.addComment = this.addComment.bind(this);
  }




// тут должна быть запись данных в мой пустой массив
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

    posts[curIndex].comment = [...posts[curIndex].comment, postComment];

    // const curPost = posts[curIndex].comment;
    // curPost.comment = [...posts, curPost.comment, postComment];

    //posts[curIndex].comment = [...posts[curIndex].comment, postComment]

    this.setState({
      posts: [...posts],
      postComment: ''

    });

  }



  // отмена конкретной статьи
  onDismiss(postIndex) {

    const { 
      posts
    } = this.state;

    const isNotIndex = (item, i) => i !== postIndex;
    const updatePosts = this.state.posts.filter(isNotIndex);
    this.setState({posts: updatePosts});
  }
  // берет фразу для поиска при вводе в инпут
  onSearchChange(event){
    this.setState({ searchTerm: event.target.value });
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

    //console.log(posts);
     console.log(error);
  
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
          />
          { error
            ? <div> Something went wrong. </div>
            : <CreatePost
              posts={posts}
              postComment={postComment}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              onDismiss={this.onDismiss}
              addComment={this.addComment}
            />
          }
        
        </div>
      </div>
    );
  }
}
  
  // Отрисовка массива из данных состояния постов
  const CreatePost = ({
    posts,
    onDismiss, 
    postComment, 
    handleChange, 
    handleSubmit, 
    addComment
    }) => 
    <div className="post-wrap">
      {posts.map((item, index) =>
        <div className="post" key={index}>
          <br/>
          <div>
            {item.category.map((item, index) =>
              <span className="categoryItem" key={index}>
                {item}
              </span>
            )}
          </div>
          <div>{item.text} </div>


          <Comment 
            posts={posts}
            curPost={index}
            postComment={postComment}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            addComment={() => addComment(index)}
          />

          <Button
            onClick={() => onDismiss(index)}
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
