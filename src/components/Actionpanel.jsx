import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
// import {  FormGroup, Label, Input } from 'reactstrap';
import '../App.css';

const Actionpanel = ({
  actionPanel
	}) =>
  <div className="actionPanel__wrap">
    {actionPanel.length
      ?
      <div className="actionPanel__list">
        {actionPanel.map((item, index) =>
          <div className="actionPanel__item" key={index}>
            {item}
          </div>
        )}
      </div>
      :
      <div>
        no action
      </div>
    }
  </div>


export default Actionpanel
