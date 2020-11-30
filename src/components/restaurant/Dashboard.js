import React, { useState } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../redux/mapStateToProps';
import firebase from '../../firebase';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import SettingsIcon from '@material-ui/icons/Settings';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './dashboard.scss';
import Loading from '../loading/Loading';

const Dashboard = (props) => {
  const { restaurant } = props.redux_state;
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState('ADD_IMAGE');

  const restaurant_name = restaurant.name;
  const restaurant_id = restaurant.id;
  return (
    <>
      {loading && <Loading />}
      <div className="dashboard_container">
        <div className="row restaurant_hero">
          <picture>
            <div
              onClick={() => {
                if (action === 'DELETE_IMAGE') {
                  return;
                }
                const fileInputElement = document.querySelector('#add-image');
                fileInputElement.click();
              }}
              className="row meal-item-image"
            >
              <div className="action-wrapper">
                <div
                  className="action"
                  onClick={() => {
                    if (action === 'DELETE_IMAGE') {
                      const image = document.querySelector('#meal-item-image');
                      image.style.display = 'none';
                      setLoading(true);
                      // update restaurant
                      firebase
                        .firestore()
                        .collection('restaurants')
                        .doc(restaurant_id)
                        .update({
                          coverPhoto: null,
                        })
                        .then(() => {
                          setLoading(false);
                          setAction('ADD_IMAGE');
                        })
                        .catch(() => {
                          setLoading(false);
                        });
                    }
                    return;
                  }}
                >
                  <h5>
                    {action === 'ADD_IMAGE' ? 'CHANGE IMAGE' : 'CHANGE IMAGE'}
                  </h5>
                </div>
              </div>

              <input
                style={{ visibility: 'hidden' }}
                id="add-image"
                type="file"
                accept="image/*"
                onClick={(event) => (event.target.value = null)}
                onChange={(event) => {
                  if (event.target.value === null) {
                    return;
                  }
                  const file = event.target.files[0];
                  const imageElement = document.querySelector(
                    '#meal-item-image'
                  );
                  imageElement.src = URL.createObjectURL(file);
                  imageElement.style.display = 'block';

                  setLoading(true);

                  // Add overlay
                  const imageWrapper = document.querySelector(
                    '.meal-item-image'
                  );
                  const overlay = document.createElement('div');
                  overlay.classList.add('overlay');
                  imageWrapper.appendChild(overlay);

                  const uploadFileName = `${Date.now()}-${file.name}`;

                  // save file to cloud
                  const storageRef = firebase
                    .storage()
                    .ref(`${restaurant_name}/${uploadFileName}`);

                  storageRef.put(file).then((uploadedFile) => {
                    storageRef.getDownloadURL().then((downloadURL) => {
                      console.log('File available at', downloadURL);

                      // update restaurant
                      firebase
                        .firestore()
                        .collection('restaurants')
                        .doc(restaurant_id)
                        .update({
                          coverPhoto: downloadURL,
                        })
                        .then(() => {
                          setLoading(false);
                        })
                        .catch(() => {
                          setLoading(false);
                        });
                    });
                  });

                  setAction('DELETE_IMAGE');
                }}
              />
              <img
                src={restaurant.coverPhoto || '/images/hero-placeholder.jpg'}
                id="meal-item-image"
                alt="Cover"
              />
            </div>
          </picture>

          <div className="restaurant_name">
            <Typography
              style={{
                backgroundColor: '#000',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
              variant="h5"
            >
              {restaurant_name || ''}
            </Typography>
          </div>
        </div>

        <div className="actions">
          <Link to="/restaurant/menu">
            <div className="action">
              <RestaurantMenuIcon fontSize="large" />
              <Typography>MENU</Typography>
            </div>
          </Link>

          <Link to="/restaurant/orders">
            <div className="action">
              <ShoppingCartOutlinedIcon fontSize="large" />
              <Typography>ORDERS</Typography>
            </div>
          </Link>
        </div>

        <div className="actions">
          <Link to="/#">
            <div className="action">
              <AddShoppingCartOutlinedIcon fontSize="large" />
              <Typography>PLACE ORDER</Typography>
            </div>
          </Link>

          <Link to="/restaurant/settings">
            <div className="action">
              <SettingsIcon fontSize="large" />
              <Typography>SETTINGS</Typography>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default connect(mapStateToProps)(Dashboard);
