import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import {  FormGroup, Label, Input } from 'reactstrap';
import '../App.css';

const Posttext = ({
    posts,
    category,
    postComment,
    filterPostCategory,
    handleChange,
    handleSubmit,
    onDismiss,
    onDismissFilterPostCategory,
    onClickChoose

	}) =>
  <div className="post__filter" >

    <div className="category">
      <FormGroup>
        <Label for="categoryFilterMulti">Filter by category</Label>
        <Input id="categoryFilterMulti" className="categoryList" type="select" multiple   onClick={onClickChoose}  >
          <option disabled>Select</option>
          {category.map((item, index) =>
            <option className="filterCategoryItem" key={index} value={item}> {item} </option>
          )}
        </Input>
      </FormGroup>

      <div className="postCategories">
        {[...new Set(filterPostCategory)].map((item,index, arr) =>
          <div key={index} className="categoryItem">
            {item}
            <div className="delete" onClick={() => onDismissFilterPostCategory(item,index, arr)}>  </div>
          </div>
        )}
      </div>
    </div>


  </div>

export default Posttext
