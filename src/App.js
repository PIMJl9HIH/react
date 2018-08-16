import React, { Component } from 'react';

// import logo from './logo.svg';
import './App.css';
import list from './components/data';
import Post from './components/Post';


class App extends Component {
 
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      postTitle: '',
      postComment: '',
      error: false

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


// тут должна быть запись данных в мой пустой массив
  handleSubmit(event) {
    const { 
      posts,
      postTitle,
      postComment,
      error
    } = this.state;

    event.preventDefault();

    if((postTitle || postComment) !== 'string' || 
      (postTitle.length || postComment.length) === 0) {
      
      this.setState({
        error: true
      })
    }

    if((postTitle && postComment) === 'string' || 
      (postTitle.length && postComment.length) !== 0) {
      
      const newPost = {};
      newPost.title = postTitle;
      newPost.comment = postComment;

      this.setState({
        error: false,
        posts: [...posts, newPost]
      });
    }

    console.log(posts);
  }


  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }



  // отмена конкретной статьи
  onDismiss(id) {
  }
  // берет фразу для поиска при вводе в инпут
  onSearchChange(event){
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const {
      postTitle,
      postComment,
      error
    } = this.state;
    // console.log(this.state.posts);
    return (
      <div className="App">
        <div className="container">
          <Post 
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            postTitle={postTitle}
            postComment={postComment}
          />
          { error
            ? <div> Something went wrong. </div>
            : <CreatePost
              posts={this.state.posts}
            />
          }
        
        </div>
      </div>
    );
  }
}

  // Отрисовка массива из данных состояния постов
  const CreatePost = ({posts}) => 
    <div className="post-wrap">
      {posts.map((item, index) =>
        <div className="post" key={index}>
          <div>{item.title} </div>
          <div>{item.comment} </div>
          <br/>
        </div>
      )}
    </div>


export default App;
