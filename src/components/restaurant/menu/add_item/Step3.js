import React, { useState } from 'react';
import firebase from '../../../../firebase';
import ActionButtons from './ActionButtons';
import DeleteIcon from '@material-ui/icons/Delete';

const Step3 = (props) => {
  const [inputInfo, setInputInfo] = useState({});
  const [action, setAction] = useState('ADD_IMAGE');
  const restaurant_name = props.redux_state.restaurant.name;
  const { setLoading, setError } = props;

  return (
    <>
      <div className="row">
        <h4>ADD A MEAL ITEM</h4>

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
                  setInputInfo({ ...inputInfo, meal_item_image_file: null });
                  setAction('ADD_IMAGE');
                }
                return;
              }}
            >
              {action === 'DELETE_IMAGE' ? (
                <h5>
                  <DeleteIcon color="white" />
                </h5>
              ) : (
                <h5 className="add-symbol">+</h5>
              )}
              <h5>
                {action === 'ADD_IMAGE' ? 'ADD ITEM IMAGE' : 'REMOVE IMAGE'}
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
              const imageElement = document.querySelector('#meal-item-image');
              imageElement.src = URL.createObjectURL(file);
              imageElement.style.display = 'block';

              // Add overlay
              const imageWrapper = document.querySelector('.meal-item-image');
              const overlay = document.createElement('div');
              overlay.classList.add('overlay');
              imageWrapper.appendChild(overlay);

              // save file to cloud
              const storageRef = firebase
                .storage()
                .ref(`${restaurant_name}/${file.name}`);
              storageRef.put(file).then((uploadedFile) => {
                storageRef.getDownloadURL().then((downloadURL) => {
                  console.log('File available at', downloadURL);
                  setInputInfo({
                    ...inputInfo,
                    meal_item_image_url: downloadURL,
                  });
                });
              });

              setAction('DELETE_IMAGE');
            }}
          />
          <img id="meal-item-image" alt="Meal Item" />
        </div>

        <div className="row">
          <label htmlFor="description">Description</label>
          <div className="textarea_wrapper">
            <textarea
              name="description"
              id="description"
              placeholder="A Brief description of a meal item ..."
              rows="5"
              value={inputInfo.meal_item_description}
              onChange={(event) =>
                setInputInfo({
                  ...inputInfo,
                  meal_item_description: event.target.value,
                })
              }
            ></textarea>
          </div>
        </div>
      </div>
      <ActionButtons step={3} inputInfo={inputInfo} {...props} />
    </>
  );
};
export default Step3;
