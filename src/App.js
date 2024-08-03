import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { connect } from "react-redux";
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
function Example(props, add) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState('');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategory('');
    setSelectedSubSubCategory('');
  };

  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setSelectedSubSubCategory('');
  };

  const handleSubSubCategoryClick = (subSubCategory) => {
    setSelectedSubSubCategory(subSubCategory);

add(`${selectedCategory} | ${selectedSubCategory} | ${subSubCategory}`)

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

        <div  className='category'> 
          <h3>Sub Categories</h3>
      {selectedCategory && (
          <div >
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

        <div  className='category'>
          <h3>Sub Sub Categories</h3>
      {selectedSubCategory && (
          <div>
            {Object.keys(dummyData[selectedCategory][selectedSubCategory]).map((subSubCategory) => (
              <div
                key={subSubCategory}
                style={{ padding: '5px', cursor: 'pointer', backgroundColor: selectedSubSubCategory === subSubCategory ? 'lightgray' : 'white' }}
                onClick={() => handleSubSubCategoryClick(subSubCategory)}
              >
                {subSubCategory}
              </div>
            ))}
          </div>
      )}
        </div>

     
    </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const mapDispatchToProps = (dispatch) => ({
  add: (value) => dispatch({ type: "ADD", payload: value }), 
});

export default connect(null, mapDispatchToProps)(Example);