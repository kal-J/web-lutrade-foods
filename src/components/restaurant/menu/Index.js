import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../../redux/mapStateToProps';
import { Rating } from '@material-ui/lab';
import colors from '../../layout/colors';
import './index.scss';
import Error from '../../error/Error';
import { deleteMenuItem } from '../../../api/deleteMenuItem';
import Loading from '../../loading/Loading';

const Index = (props) => {
  const [selectedMeal, setSelectedMeal] = useState('breakfast');
  const [mealMenu, setMealMenu] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { restaurant } = props.redux_state;
  const { menu, name } = restaurant;
  const restaurant_name = name;

  console.log(JSON.stringify(menu));

  useEffect(() => {
    if (menu) {
      setMealMenu(menu.filter((item, index) => item.meal === selectedMeal));
    }
  }, [menu, selectedMeal]);

  const rating = 4;
  const dynamic_styles = {
    span: {
      borderBottom: '#fff solid 3px',
    },
  };

  return (
    <>
      {loading && <Loading />}
      <div className="main-menu-container">
        <section className="hero-section">
          <section className="restaurant-cover-image-wrapper">
            <img
              src="/images/restaurant-cover-placeholder.jpg"
              alt="Restaurant cover"
            />
          </section>
          <section className="restaurant-details">
            <Typography variant="inherit">{restaurant_name || ''}</Typography>

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
        </section>

        <section className="add-menu-item">
          {error && <Error error={error} />}
          <button
            onClick={() => props.history.push('/restaurant/menu/add-item')}
          >
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
          {mealMenu.length ? (
            mealMenu.map((item, index) => {
              return (
                <section key={index} className="menu-item">
                  <span className="menu-item-image">
                    <img
                      src={
                        item.meal_item_image_url ||
                        '/images/meal-item-placeholder.png'
                      }
                      alt="Meal Item"
                    />
                  </span>
                  <span className="menu-item-details">
                    <Typography>{item.meal_item_name || ''}</Typography>
                    <Typography>{item.meal_item_description || ''}</Typography>
                    <Typography>{item.meal_item_price || ''}</Typography>
                  </span>

                  <section className="menu-item-actions">
                    <Button size="small" variant="contained">
                      <Typography variant="inherit">EDIT</Typography>
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        deleteMenuItem(item, setLoading, setError, restaurant)
                          .then(() => console.log('ITEM DELETED'))
                          .catch((error) => console.log('ERROR DELETING ITEM'));
                      }}
                    >
                      <Typography variant="inherit">DELETE</Typography>
                    </Button>
                  </section>
                </section>
              );
            })
          ) : (
            <h5>There is nothing on the menu for this meal</h5>
          )}
        </section>
      </div>
    </>
  );
};

export default connect(mapStateToProps)(Index);
