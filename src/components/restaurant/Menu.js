import { Button, Typography } from '@material-ui/core';
import React from 'react';
import './menu.scss';

const Menu = () => {
  return (
    <div className="container-restaurant-menu">
      <div className="align-center">
        <h3>CONFIGURE YOUR RESTAURANT MENU</h3>

        <div className="row-select">
          <label htmlFor="meal">Meal</label>
          <select name="meal" id="meal">
            <option value="">--select--</option>
            <option value="BREAKFAST">BREAKFAST</option>
            <option value="LUNCH">LUNCH</option>
            <option value="SUPPER">SUPPER</option>
          </select>
        </div>

        <div className="row">
          <h4>ADD A MEAL ITEM</h4>
          <div className="row">
            <label htmlFor="name">name</label>
            <input name="name" id="name" type="text" />
          </div>
          <div className="row">
            <label htmlFor="image">Item Image</label>
            <input id="image" type="file" />
          </div>
          <div className="row">
            <label htmlFor="price">Price</label>
            <input id="price" type="number" />
          </div>
          <div className="row">
            <label htmlFor="description">Description</label>
            <textarea name="description" id="description"></textarea>
          </div>
          <div className="row">
            <label htmlFor="options">what's included</label>
            <select name="options" id="options">
              <option value="">--select--</option>
              <option value="">any...</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row-btn">
        <Button
          size="medium"
          variant="contained"
          color="primary"
          onClick={() => {}}
        >
          <Typography variant="p">SAVE</Typography>
        </Button>
      </div>
    </div>
  );
};

export default Menu;
