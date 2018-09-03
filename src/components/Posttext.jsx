import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
// import {  FormGroup, Label, Input } from 'reactstrap';
import '../App.css';

const Posttext = ({
  posts,
	curPost,
	item,
  editPost,
  postVisibility
	}) =>
  <div className="post__text" >

    {item.postEdit
      ?
      <form action="" id={`postEditForm-${curPost}`} className="postEditForm">
        <input type="text"  className="postEditField" name={`posteditfield-${curPost}`} defaultValue={item.text}/>
        <span className="postConfirmButton commentConfirmButton postEdited" onClick={(event) => editPost(curPost, posts, event)} ></span>
      </form>
      :
      <div className="edit-block">
        {item.text}
        <span className="editButton" onClick={() => postVisibility(curPost,posts)} > </span>
      </div>
    }
  </div>

export default Posttext
