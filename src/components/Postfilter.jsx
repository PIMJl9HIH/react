import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup, ListGroupItem } from 'reactstrap';
import '../App.css';

const Postfilter = ({
    posts,
    category,
    postComment,
    filterPostCategory,
    handleChange,
    handleSubmit,
    onDismiss,
    onDismissFilterPostCategory,
    onClickChoose,
    toggleFunc,
    filterCategoryVisibility

	}) =>
  <div className="filter__posts" >

    <div className="filter__category category">
      <h5>Filter</h5>
      <div  >
        <span className="filter-icon " onClick={(event) => toggleFunc(null, null, event)}></span>
        {
          filterCategoryVisibility
            ?
            <div className="category__list">
              <ListGroup>
                {category.map((item, index) =>
                  <ListGroupItem className="filterCategoryItem" tag="a" href="#" action key={index} onClick={onClickChoose} >{item} </ListGroupItem>
                )}
              </ListGroup>
            </div>
            :
            <div></div>
        }
      </div>

    </div>

    <div className="postCategories">
      {[...new Set(filterPostCategory)].map((item,index, arr) =>
        <div key={index} className="categoryItem">
          {item}
          <div className="delete" onClick={() => onDismissFilterPostCategory(item,index, arr)}>  </div>
        </div>
      )}
    </div>



  </div>

export default Postfilter
