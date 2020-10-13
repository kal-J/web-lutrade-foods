import React from 'react';
import Loader from 'react-loader-spinner';
import colors from '../layout/colors';
import './loading.scss';

const Loading = () => (
  <div className="loading">
    <Loader type="ThreeDots" color={colors.primary} height={80} width={80} />
  </div>
);

export default Loading;
