import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import {  FormGroup, Label, Input } from 'reactstrap';
import '../App.css';

const Category = ({ 
		category,
		postComment,
		postCategory,
		handleChange,
		handleSubmit,
		onDismiss,
		onDismissCreatePostCategory,
    onClickChoose
	}) => 
	<div className="category">
     <FormGroup>
        <Label for="categoryMulti">Choose category</Label>
        <Input id="categoryMulti" className="categoryList" type="select" multiple name="postCategory" onClick={onClickChoose}>
          <option disabled>Select</option>
          {category.map((item, index) =>
              <option className="categoryItem"  key={index} value={item}> {item} </option>
          )}
        </Input>
		</FormGroup>

    <div className="postCategories">
			{[...new Set(postCategory)].map((item,index, arr) =>
				<div key={index} className="categoryItem">
					{item}
					<div className="delete" onClick={() => onDismissCreatePostCategory(item,index, arr)}>  </div>
				</div>
			)}
		</div>
	</div>


export default Category
