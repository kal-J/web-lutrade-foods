import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@material-ui/core';
import colors from '../layout/colors';
import './orders.scss';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../redux/mapStateToProps';
import { isArray } from 'lodash';

const Orders = (props) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const { restaurant } = props.redux_state;
    const { orders } = restaurant;
    if (isArray(orders)) {
      setOrders(orders);
    }
  }, []);

  if (!orders.length) {
    return (
      <div
        className="orders"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}
      >
        <p
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          No orders available
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="orders">
        {orders.map((order, index) => {
          return (
            <div key={index} className="order">
              <h5>Order.NO : {order.orderNumber} </h5>
              <p>Order Name : {order.name} </p>
              <p>Price : {order.price} </p>
              <p>Payment Method : {order.paymentMethod} </p>
              <p>
                status:
                <span style={{ color: colors.secondary }}>
                  
                  {order.status}
                </span>
              </p>
              <p>Addons: </p>
              <p className="addons">
                {Object.keys(order.inclusives).map((key, index) => {
                  return <span key={index}>{order.inclusives[key].name}</span>;
                })}
              </p>

              <hr />

              <div className="actions">
                <Button size="small" variant="contained" color="secondary">
                  <Typography variant="inherit">CANCEL</Typography>
                </Button>
                <Button size="small" variant="contained" color="primary">
                  <Typography variant="inherit">APPROVE</Typography>
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  className="btn-ready-pickup"
                >
                  <Typography variant="inherit">READY FOR PICKUP</Typography>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default connect(mapStateToProps)(Orders);
