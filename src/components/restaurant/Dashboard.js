import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../redux/mapStateToProps';
import { Typography } from '@material-ui/core';
import './dashboard.scss';

const Dashboard = () => {
  return (
    <div className="dashboard_container">
      <div className="row">
        <Typography variant="h6">FUCKING DASHBOARD</Typography>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Dashboard);
