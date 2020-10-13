import React from 'react';
import './error.scss';

const Error = ({ error }) => (
  <div className="row error">{error && <p>{error}</p>}</div>
);

export default Error;
