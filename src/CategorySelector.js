// src/CategorySelector.js
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';

const dummyData = {
  Electronics: {
    Metals: {
      GradeA: "Copper",
      GradeB: "Aluminum",
      GradeC: "Steel",
    },
    Plastics: {
      GradeA: "Polycarbonate",
      GradeB: "ABS",
      GradeC: "PVC",
    },
    Semiconductors: {
      GradeA: "Silicon",
      GradeB: "Germanium",
      GradeC: "Gallium Arsenide",
    },
  },
  Furniture: {
    Wood: {
      GradeA: "Oak",
      GradeB: "Pine",
      GradeC: "Birch",
    },
    Metal: {
      GradeA: "Stainless Steel",
      GradeB: "Aluminum",
      GradeC: "Iron",
    },
    Plastic: {
      GradeA: "Polypropylene",
      GradeB: "Polyethylene",
      GradeC: "Acrylic",
    },
  },
  Clothing: {
    Fabric: {
      GradeA: "Cotton",
      GradeB: "Polyester",
      GradeC: "Wool",
    },
    Leather: {
      GradeA: "Full-Grain",
      GradeB: "Top-Grain",
      GradeC: "Split Leather",
    },
    Synthetic: {
      GradeA: "Nylon",
      GradeB: "Rayon",
      GradeC: "Spandex",
    },
  },
};

const CategorySelector = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedSubSubCategories, setSelectedSubSubCategories] = useState([]);
  const [productList, setProductList] = useState({})


  const transformNestedObjectToArray = (nestedObject) => {
    const result = [];
    console.log(nestedObject, 'helo')
  
    Object.keys(nestedObject).forEach(category => {
      Object.keys(nestedObject[category]).forEach(subCategory => {
        nestedObject[category][subCategory].forEach(grade => {
          result.push(`${category} | ${subCategory} | ${grade}`);
        });
      });
    });
  
    return result;
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategory('');
    // setSelectedSubSubCategories([]);
  };

  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(subCategory);

  };

 
  const handleSubSubCategoryClick = (subSubCategory) => {
    // Toggle in selectedSubSubCategories

    
    setSelectedSubSubCategories(prevCategories => {
      // if (prevCategories.includes(subSubCategory)) {
      //   // Remove if already included
      //   return prevCategories.filter(category => category !== subSubCategory);
      // } else {
        // Add if not included
        return [...prevCategories, subSubCategory];
      // }
    });
  
    // Toggle in productList
    setProductList(prevState => {
      const existingCategories = prevState[selectedCategory]?.[selectedSubCategory] || [];
  
      if (existingCategories.includes(subSubCategory)) {
        // Remove the subSubCategory if it exists
        console.log('includes')
        return {
          ...prevState,
          [selectedCategory]: {
            ...prevState[selectedCategory],
            [selectedSubCategory]: existingCategories.filter(e => e !== subSubCategory)
          }
        };
      } else {
        console.log('not includes')
        // Add the subSubCategory if it does not exist
        return {
          ...prevState,
          [selectedCategory]: {
            ...prevState[selectedCategory],
            [selectedSubCategory]: [...existingCategories, subSubCategory]
          }
        };
      }
    });



    console.log(productList, 'productList')
  };
  

  const addProducts = () => {

let res = transformNestedObjectToArray(productList)
 
props.add(productList)
    console.log(productList, 'temp')
    setProductList({})
    setSelectedSubSubCategories([]);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className='category-wrapper'>
          <div className='category'>
            <h3>Categories</h3>
            <div>
              {Object.keys(dummyData).map((category) => (
                <div
                  key={category}
                  style={{ padding: '5px', cursor: 'pointer', backgroundColor: selectedCategory === category ? 'lightgray' : 'white' }}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </div>
              ))}
            </div>
          </div>

          <div className='category'>
            <h3>Sub Categories</h3>
            {selectedCategory && (
              <div>
                {Object.keys(dummyData[selectedCategory]).map((subCategory) => (
                  <div
                    key={subCategory}
                    style={{ padding: '5px', cursor: 'pointer', backgroundColor: selectedSubCategory === subCategory ? 'lightgray' : 'white' }}
                    onClick={() => handleSubCategoryClick(subCategory)}
                  >
                    {subCategory}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className='category'>
            <h3>Sub Sub Categories</h3>
            {selectedSubCategory && (
              <div>
                {Object.keys(dummyData[selectedCategory][selectedSubCategory]).map((subSubCategory) => (
                  <div
  key={subSubCategory}
  style={{ 
    padding: '5px', 
    cursor: 'pointer', 
    backgroundColor: ( false || productList[selectedCategory]?.[selectedSubCategory]?.includes(subSubCategory)) ? 'lightgray' : 'white'

  }}
  onClick={() => handleSubSubCategoryClick(subSubCategory)}
>
                    {subSubCategory}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <Button onClick={addProducts} disabled={selectedSubSubCategories.length === 0}>Add to Products</Button>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => ({
  add: (value) => dispatch({ type: "ADD", payload: value }),
});

export default connect(null, mapDispatchToProps)(CategorySelector);
