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
		onDismissCreatePostCategory
	}) => 
	<div className="category">
     <FormGroup>
        <Label for="categorySelectMulti">Choose category</Label>
        <Input id="categorySelectMulti" type="select" multiple  name="postCategory" onChange={handleChange}  >
          <option disabled>Select</option>
          {category.map((item, index) =>
              <option key={index} value={item}> {item} </option>
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
