// src/reducers/index.js
import { combineReducers } from 'redux';

// Reducers
const initialState = {
  counter: 0,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1 };
    case 'DECREMENT':
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
};


const initialProductState = [
  {
    "Electronics": {
      "Metals": ["GradeA", "GradeB", "GradeB"],
    },
    "Furniture": {
      "Metal": ["GradeB"]
    },
    "Clothing": {
      "Fabric": ["GradeB"]
    }
  }
]


const productReducer = (state = initialProductState, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'UPDATE': {
      const { index, category, subCategory, grade, newValue } = action.payload;
console.log('from reducer', index, category, subCategory, grade, newValue )
      return state.map((product, i) => {
        if (i === index) {
          // Check if category and subCategory exist
          if (product[category] && product[category][subCategory]) {
            return {
              ...product,
              [category]: {
                ...product[category],
                [subCategory]: product[category][subCategory].map(g => g === grade ? newValue : g)
              }
            };
          }
        }
        return product;
      });
    }
    case 'UPDATE_BULK': {
      const { indexes, category, subCategory, grade, newValue } = action.payload;
console.log('from reducer', indexes, category, subCategory, grade, newValue )
      return state.map((product, i) => {
        if (indexes.includes(i)) {
          // Check if category and subCategory exist
          if (product[category] && product[category][subCategory]) {
            return {
              ...product,
              [category]: {
                ...product[category],
                [subCategory]: product[category][subCategory].map(g => g === grade ? newValue : g)
              }
            };
          }
        }
        return product;
      });
    }
    default:
      return state;
  }
}
// Combine Reducers
const rootReducer = combineReducers({
  counter: counterReducer,
  product: productReducer
  // Add other reducers here if you have more
});


export default rootReducer;