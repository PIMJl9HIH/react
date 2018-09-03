import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup, ListGroupItem } from 'reactstrap';
import '../App.css';

const Category = ({ 
		category,
		postComment,
		postCategory,
		handleChange,
		handleSubmit,
		onDismiss,
		onDismissCreatePostCategory,
    onClickChoose,
    toggleFunc,
    createPostCategoryVisibility
	}) => 
	<div className="category">

		<div className="category__top">
      <div >Choose category</div>
      <div  >
				<span className="choose-category add" onClick={(event) => toggleFunc(null, null, event)}></span>
        {
          createPostCategoryVisibility
          ?
            <div className="category__list">
              <ListGroup>
                {category.map((item, index) =>
                  <ListGroupItem className="categoryItem" tag="a" href="#" action key={index} onClick={onClickChoose} >{item} </ListGroupItem>
                  )}
              </ListGroup>
            </div>
					:
					<div></div>
        }
			</div>

		</div>



     {/*<FormGroup>*/}
        {/*<Label for="categoryMulti">Choose category</Label>*/}
        {/*<Input id="categoryMulti" className="categoryList" type="select" multiple name="postCategory" onClick={onClickChoose}>*/}
          {/*<option disabled>Select</option>*/}
          {/*{category.map((item, index) =>*/}
              {/*<option className="categoryItem"  key={index} value={item}> {item} </option>*/}
          {/*)}*/}
        {/*</Input>*/}
		{/*</FormGroup>*/}

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
