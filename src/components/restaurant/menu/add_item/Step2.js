import React, { useState } from 'react';
import ActionButtons from './ActionButtons';
import { Button, Typography } from '@material-ui/core';

const Step2 = (props) => {
  const [addons, setAddOns] = useState([]);
  const [addon, setAddon] = useState(null);
  return (
    <>
      <div className="menu-add-on">
        <h4>Meal Item: Add ons</h4>

        <div className="addon-wrapper">
          {addons.length ? (
            addons.map((addon, index) => {
              return (
                <span key={index} className="addon">
                  {addon}
                  <span
                    onClick={() => {
                      return setAddOns(
                        addons.filter((addon, i) => i !== index)
                      );
                    }}
                  >
                    x
                  </span>
                </span>
              );
            })
          ) : (
            <p>You have not added any addons to this meal item</p>
          )}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (addon) {
              setAddOns([...addons, addon]);
              setAddon(null);
            }
            return;
          }}
        >
          <h5>Add your meal addons here</h5>
          <div>
            <input
              type="text"
              value={addon || ''}
              placeholder="Name of meal add on"
              onChange={(event) => setAddon(event.target.value)}
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
      <ActionButtons step={2} inputInfo={addons} {...props} />
    </>
  );
};
export default Step2;
