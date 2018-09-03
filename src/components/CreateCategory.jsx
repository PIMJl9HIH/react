import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup, ListGroupItem } from 'reactstrap';
import '../App.css';

const Category = ({ 
		posts,
		curPost,
		onDismissCategory,
    missingCategory,
    addCategory,
    toggleFunc
	}) => 
	<div >
		<div className="post__category-container">
			<div className="post__category-title">
				<div >Post categories : </div>
        <div
          className="addCategory add button"
          onClick={(event) => toggleFunc(curPost, posts, event)}>
        </div>
			</div>
			{posts[curPost].category.map((item, index, arr) =>
				 <div className="categoryItem" key={index}>
					 {item}
					 <div className="delete" onClick={() => onDismissCategory(item, index, arr, curPost, posts)}> </div>
				 </div>
			)}

      <div className="postAddingCategory category__list" style={{display: posts[curPost].visibilityAddingCategory ? 'block' : 'none'}}>
        {/*<FormGroup>*/}
        {/*<Input  type="select" multiple  name="curPostCategory" onClick={(event) => addCategory(curPost, posts, event)}>*/}
        {/*<option disabled>Select</option>*/}
        {/*{missingCategory(curPost).map((item, index) =>*/}
        {/*<option key={index} value={item}> {item} </option>*/}
        {/*)}*/}
        {/*</Input>*/}
        {/*</FormGroup>*/}

        <ListGroup>
          {missingCategory(curPost).map((item, index) =>
            <ListGroupItem className="categoryItem" tag="a" href="#" action key={index} onClick={(event) => addCategory(curPost, posts, event)} >{item} </ListGroupItem>
          )}
        </ListGroup>
      </div>

		</div>




	</div>


export default Category
