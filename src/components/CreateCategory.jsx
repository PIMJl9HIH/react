import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import {  FormGroup, Input, Button } from 'reactstrap';
import '../App.css';

const Category = ({ 
		posts,
		curPost,
		onDismissCategory,
    missingCategory,
    addCategory,
    toggleFunc
	}) => 
	<div className="categoryWrap"> 
		
    {posts[curPost].category.map((item, index, arr) =>
       <div className="categoryItem" key={index}>
         {item}
         <div className="delete" onClick={() => onDismissCategory(item, index, arr, curPost, posts)}> </div>
       </div>
    )}

    <Button
      className="addCategory button"
      color="primary"
      size="sm"
      outline
      onClick={(event) => toggleFunc(curPost, posts, event)}
    >
      Add Categories
    </Button>

		<div className="postAddingCategory" style={{display: posts[curPost].visibilityAddingCategory ? 'block' : 'none'}}>
			<FormGroup>
				<Input  type="select" multiple  name="curPostCategory" onClick={(event) => addCategory(curPost, posts, event)}>
					<option disabled>Select</option>
				{missingCategory(curPost).map((item, index) =>
				<option key={index} value={item}> {item} </option>
				)}
				</Input>
      </FormGroup>
		</div>




		
	</div>


export default Category
