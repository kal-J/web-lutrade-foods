import React, { useState } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../../redux/mapStateToProps';
import { addMealItem, setLoading } from '../../../redux/actions';
import Error from '../../error/Error';
import Step1 from './add_item/Step1';
import Step2 from './add_item/Step2';
import Step3 from './add_item/Step3';
import './menu.scss';


const Menu = (props) => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);

  return (
    <div className="container-restaurant-menu">
      {error ? <Error error={error} /> : ''}
      <div className="align-center">
        {step === 1 ? (
          <Step1 setStep={setStep} setError={setError} {...props} />
        ) : step === 2 ? (
          <Step2 setStep={setStep} setError={setError} {...props} />
        ) : step === 3 ? (
          <Step3 setStep={setStep} setError={setError} {...props} />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, { addMealItem, setLoading })(Menu);
