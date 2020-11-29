import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { schemaStep1, schemaStep2, schemaStep3 } from '../inputValidation';
import { addMenuItem } from '../../../../api/addMenuItem';

const ActionButtons = (props) => {
  const { step, setStep, inputInfo, setError, addMealItem, setLoading } = props;
  const { restaurant } = props.redux_state;

  return (
    <div className="row-btn">
      <Button
        size="medium"
        variant="contained"
        onClick={() => {
          if (step === 1) {
            return props.history.push('/restaurant/menu');
          }
          if (step === 2) {
            return setStep(step - 1);
          }
          if (step === 3) {
            return setStep(step - 1);
          }
        }}
      >
        <Typography variant="inherit">CANCEL</Typography>
      </Button>
      <Button
        size="medium"
        variant="contained"
        color="primary"
        onClick={() => {
          if (step === 1) {
            // Verify step 1 data
            const { value, error } = schemaStep1.validate(inputInfo);

            if (error) {
              return setError(error.message);
            }

            // save step 1 data to global app state

            setError(null); // clear error
            addMealItem(value);
            return setStep(step + 1);
          }

          if (step === 2) {
            // Verify step 3 data
            const { value, error } = schemaStep2.validate({
              meal_addons: inputInfo,
            });

            if (error) {
              return setError(error.message);
            }

            setError(null); // clear error
            addMealItem(value);
            return setStep(step + 1);
          }

          if (step === 3) {
            // Verify step 2 data
            const { value, error } = schemaStep3.validate(inputInfo);

            if (error) {
              return setError(error.message);
            }

            console.log(JSON.stringify(value, null, 4));

            setError(null); // clear error

            const menu_item = {
              ...props.redux_state.meal_item,
              ...value,
            };

            addMenuItem(menu_item, setLoading, setError, restaurant).then(
              () => {
                alert('New Item has been added on the menu');
                props.history.push('/restaurant/menu');
              }
            );
          }
        }}
      >
        <Typography variant="inherit">
          {step === 3 ? 'ADD MEAL ITEM' : 'CONTINUE'}
        </Typography>
      </Button>
    </div>
  );
};

export default ActionButtons;
