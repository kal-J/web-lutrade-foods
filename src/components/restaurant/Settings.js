import React, { useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import firebase from '../../firebase';
import './settings.scss';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../redux/mapStateToProps';

const Settings = (props) => {
  const [campus, setCampus] = useState();
  const [pickupPoints, setPickupPoints] = useState([]);
  const [pickupPoint, setPickupPoint] = useState(null);
  const [deliveryFee, setDeliveryFee] = useState();

  const { user } = props.redux_state;

  return (
    <div className="settings_wrapper">
      <h3>#1. SELECT A CAMPUS TO DELIVER TO</h3>

      <div className="select">
        <select
          name="campus"
          id="campus"
          value={campus}
          onChange={(e) => {
            setCampus(e.target.value);
          }}
        >
          <option value="">-- SELECT CAMPUS --</option>
          <option value="Lira University">Lira University</option>
          <option value="UTC Lira">UTC Lira</option>
        </select>
      </div>

      <h3>#2. ADD Pickup Points</h3>
      <PickupPoints
        pickupPoint={pickupPoint}
        setPickupPoint={setPickupPoint}
        pickupPoints={pickupPoints}
        setPickupPoints={setPickupPoints}
      />

      <div className="delivery_fee">
        <label htmlFor="deliveryFee">
          <h3>#3 Delivery Fee to this campus</h3>
        </label>
        <input
          name="deliveryFee"
          type="number"
          placeholder="Delivery Fee"
          value={deliveryFee}
          onChange={(e) => setDeliveryFee(e.target.value)}
        />
      </div>

      <div className="row-btn">
        <Button
          size="medium"
          variant="contained"
          onClick={() => {
            props.history.push('/restaurant/dashboard');
          }}
        >
          <Typography variant="inherit">CANCEL</Typography>
        </Button>

        <Button
          size="medium"
          variant="contained"
          color="primary"
          onClick={() => {
            if (!campus) {
              return alert('campus not selected');
            }
            if (!pickupPoints.length) {
              return alert('no pickup point has been added for this campus');
            }

            if (!deliveryFee) {
              return alert('Delivery fee is not set ');
            }

            firebase
              .firestore()
              .collection('restaurants')
              .where('admin_uid', '==', user.uid)
              .get()
              .then((snapshot) => {
                console.log(snapshot);
                if (!snapshot) {
                  return alert('sorry, failed to save settings');
                }

                if (snapshot.empty) {
                  return alert('sorry, failed to save settings');
                }

                firebase
                  .firestore()
                  .collection('restaurants')
                  .doc(snapshot.docs[0].id)
                  .update({
                    get delivers_to() {
                      if (!snapshot.docs[0].data().delivers_to) {
                        return [{ campus, fee: deliveryFee, pickupPoints }];
                      }
                      return [
                        ...snapshot.docs[0].data().delivers_to,
                        { campus, fee: deliveryFee, pickupPoints },
                      ];
                    },
                  })
                  .then(() => {
                    return props.history.push('/restaurant/dashboard');
                  })
                  .catch(() => alert('sorry, Failed to save settings'));
              })
              .catch();
          }}
        >
          <Typography variant="inherit">CONTINUE</Typography>
        </Button>
      </div>
    </div>
  );
};

const PickupPoints = (props) => {
  const { pickupPoints, pickupPoint, setPickupPoints, setPickupPoint } = props;
  return (
    <>
      <div className="menu-add-on">
        <div className="addon-wrapper">
          {pickupPoints.length ? (
            pickupPoints.map((pickupPoint, index) => {
              return (
                <span key={index} className="addon">
                  {pickupPoint}
                  <span
                    onClick={() => {
                      return setPickupPoints(
                        pickupPoints.filter((pickupPoint, i) => i !== index)
                      );
                    }}
                  >
                    x
                  </span>
                </span>
              );
            })
          ) : (
            <p>You have not added any pickup Points to this campus</p>
          )}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (pickupPoint) {
              setPickupPoints([...pickupPoints, pickupPoint]);
              setPickupPoint(null);
            }
            return;
          }}
        >
          <h5>Add pickupPoints here</h5>
          <div>
            <input
              type="text"
              value={pickupPoint || ''}
              placeholder="Name of pickup point"
              onChange={(event) => setPickupPoint(event.target.value)}
            />
            <span>
              <Button
                size="medium"
                variant="contained"
                color="secondary"
                type="submit"
              >
                <Typography variant="inherit">+</Typography>
              </Button>
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default connect(mapStateToProps)(Settings);
