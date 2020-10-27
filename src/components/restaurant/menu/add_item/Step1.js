import React, {useState} from 'react';
import ActionButtons from './ActionButtons';


const Step1 = (props) => {
    const [mealInfo, setMealInfo] = useState({ meal: 'breakfast' });
  
    const dynamic_styles = {
      backgroundColor: '#db5a6b',
    };
  
    return (
      <>
        <h3>CONFIGURE YOUR RESTAURANT MENU</h3>
        <h4>SELECT A MEAL</h4>
  
        <div className="row-select-meals">
          <h5
            style={mealInfo.meal === 'breakfast' ? dynamic_styles : {}}
            onClick={() => setMealInfo({ ...mealInfo, meal: 'breakfast' })}
          >
            BREAKFAST
          </h5>
          <h5
            style={mealInfo.meal === 'lunch' ? dynamic_styles : {}}
            onClick={() => setMealInfo({ ...mealInfo, meal: 'lunch' })}
          >
            LUNCH
          </h5>
          <h5
            style={mealInfo.meal === 'supper' ? dynamic_styles : {}}
            onClick={() => setMealInfo({ ...mealInfo, meal: 'supper' })}
          >
            SUPPER
          </h5>
        </div>
  
        <div className="row">
          <h4>ADD A MEAL ITEM</h4>
          <div className="row">
            <label htmlFor="name">Name</label>
            <input
              name="name"
              id="name"
              type="text"
              value={mealInfo.meal_item_name || ''}
              placeholder="Meal item name"
              onChange={(event) =>
                setMealInfo({ ...mealInfo, meal_item_name: event.target.value })
              }
            />
          </div>
  
          <div className="row">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              type="number"
              value={mealInfo.meal_item_price || ''}
              onChange={(event) =>
                setMealInfo({ ...mealInfo, meal_item_price: event.target.value })
              }
            />
          </div>
        </div>
  
        <ActionButtons step={1} inputInfo={mealInfo} {...props} />
      </>
    );
  };

  export default Step1;