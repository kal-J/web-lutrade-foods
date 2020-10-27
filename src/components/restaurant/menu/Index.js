import React, { useState } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import './index.scss';
import { Rating } from '@material-ui/lab';
import colors from '../../layout/colors';

const Index = (props) => {
  const [selectedMeal, setSelectedMeal] = useState('breakfast');
  const rating = 4;
  const dynamic_styles = {
    span: {
      borderBottom: '#fff solid 3px',
    },
  };

  return (
    <div className="main-menu-container">
      <section className="restaurant-cover-image-wrapper">
        <img
          src="/images/restaurant-cover-placeholder.jpg"
          alt="Restaurant cover"
        />
      </section>

      <section className="restaurant-details">
        <Typography variant="inherit">Restaurant Name</Typography>

        <div className="restuarant-ratings">
          <Box component="fieldset" borderColor="transparent">
            <Rating
              style={{
                color: colors.secondary,
              }}
              name="rating"
              value={rating}
              readOnly
            />
          </Box>
        </div>
      </section>

      <section className="add-menu-item">
        <button onClick={() => props.history.push('/restaurant/menu/add-item')}>
          <span className="add">+</span>
          <span>ADD NEW ITEM</span>
        </button>
      </section>

      <section className="meals">
        <span
          style={selectedMeal === 'breakfast' ? dynamic_styles.span : {}}
          onClick={() => setSelectedMeal('breakfast')}
        >
          BreakFast
        </span>

        <span
          style={selectedMeal === 'lunch' ? dynamic_styles.span : {}}
          onClick={() => setSelectedMeal('lunch')}
        >
          Lunch
        </span>
        <span
          style={selectedMeal === 'supper' ? dynamic_styles.span : {}}
          onClick={() => setSelectedMeal('supper')}
        >
          Supper
        </span>
      </section>

      <section className="menu-items">
        <section className="menu-item">
          <span className="menu-item-image">
            <img
              src="/images/meal-item-placeholder.png"
              alt="Meal Item placeholder"
            />
          </span>
          <span className="menu-item-details">
            <Typography>Item Name</Typography>
            <Typography>Item Description</Typography>
            <Typography>Item Price</Typography>
          </span>

          <section className="menu-item-actions">
            <Button size="small" variant="contained">
              <Typography variant="inherit">EDIT</Typography>
            </Button>
            <Button size="small" variant="contained" color="secondary">
              <Typography variant="inherit">DELETE</Typography>
            </Button>
          </section>
        </section>

        <section className="menu-item">
          <span className="menu-item-image">
            <img
              src="/images/meal-item-placeholder.png"
              alt="Meal Item placeholder"
            />
          </span>
          <span className="menu-item-details">
            <Typography>Item Name</Typography>
            <Typography>Item Description</Typography>
            <Typography>Item Price</Typography>
          </span>

          <section className="menu-item-actions">
            <Button size="small" variant="contained">
              <Typography variant="inherit">EDIT</Typography>
            </Button>
            <Button size="small" variant="contained" color="secondary">
              <Typography variant="inherit">DELETE</Typography>
            </Button>
          </section>
        </section>

        <section className="menu-item">
          <span className="menu-item-image">
            <img
              src="/images/meal-item-placeholder.png"
              alt="Meal Item placeholder"
            />
          </span>
          <span className="menu-item-details">
            <Typography>Item Name</Typography>
            <Typography>Item Description</Typography>
            <Typography>Item Price</Typography>
          </span>

          <section className="menu-item-actions">
            <Button size="small" variant="contained">
              <Typography variant="inherit">EDIT</Typography>
            </Button>
            <Button size="small" variant="contained" color="secondary">
              <Typography variant="inherit">DELETE</Typography>
            </Button>
          </section>
        </section>
      </section>
    </div>
  );
};

export default Index;
