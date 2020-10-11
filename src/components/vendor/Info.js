import React from "react";
import "./info.scss";

const Info = () => {
  return (
    <div className="container">
      <div className="align-center">
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" />
        </div>

        <div>
          <label htmlFor="image">Vendor cover Image</label>
          <input id="image" type="file" />
        </div>
        <div>
          <label htmlFor="campus">Campus</label>
          <select name="campus" id="campus">
            <option value="">--select campus--</option>
            <option value="Lira University">Lira University</option>
            <option value="UTC Lira">UTC Lira</option>
          </select>
        </div>
        <div>
          <label htmlFor="fee">Delivery Fee</label>
          <input type="number" name="fee" id="fee" />
        </div>
      </div>
      <button>continue</button>
    </div>
  );
};

const Menu = () => {
  return (
    <div id='restaurant_menu' className="container">
      <div className="align-center">
        <div>
          <label htmlFor="meal">Meal</label>
          <select name="meal" id="meal">
            <option value="">--select--</option>
            <option value="BREAKFAST">BREAKFAST</option>
            <option value="LUNCH">LUNCH</option>
            <option value="SUPPER">SUPPER</option>
          </select>
        </div>

        <div>
          <h3>ADD A MEAL ITEM</h3>
          <div>
            <label htmlFor="name">name</label>
            <input name="name" id="name" type="text" />
          </div>
          <div>
            <label htmlFor="image">Item Image</label>
            <input id="image" type="file" />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input id="price" type="number" />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea name="description" id="description"></textarea>
          </div>
          <div>
            <label htmlFor="options">what's included</label>
            <select name="options" id="options">
              <option value="">--select--</option>
              <option value="">any...</option>
            </select>
          </div>
        </div>
      </div>
      <button>continue</button>
    </div>
  );
};

export default Menu;
