import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../redux/mapStateToProps';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import SettingsIcon from '@material-ui/icons/Settings';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './dashboard.scss';


const Dashboard = () => {
  return (
    <div className="dashboard_container">
      <div className="row restaurant_hero">
        <div className='restaurant_name'>
          <Typography variant="h5">Restaurant Name</Typography>
        </div>

        <picture>
          <img src="/images/hero-placeholder.jpg" alt="Hero Placeholder" />
        </picture>
      </div>

      <div className="actions">
        <Link to='/#'>
          <div className="action">
            <RestaurantMenuIcon fontSize="large" />
            <Typography>MENU</Typography>
          </div>
        </Link>

        <Link to='/#'>
          <div className="action">
            <ShoppingCartOutlinedIcon fontSize="large" />
            <Typography>ORDERS</Typography>
          </div>
        </Link>
      </div>

      <div className="actions">
      <Link to='/#'>
          <div className="action">
            <AddShoppingCartOutlinedIcon fontSize="large" />
            <Typography>PLACE ORDER</Typography>
          </div>
        </Link>

        <Link to='/#'>
          <div className="action">
            <SettingsIcon fontSize="large" />
            <Typography>SETTINGS</Typography>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Dashboard);
