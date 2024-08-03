import React, { useState } from "react";
import { connect } from 'react-redux';

const CategoryFilter = ({update, material, setMaterial, grade, setGrade, setModalShow, checkedProducts}) => {
  const [bulkProps, setBulkProps] = useState(null);
  const [secondDropdownValue, setSecondDropdownValue] = useState("");

  const [bulkModal, setBulkModal] = useState(false);

  
  const handleSubmit = (e) =>{
    e.preventDefault();
checkedProducts.map((product) =>{
update(product.productIndex, product.category, product.subCategory, product.grade, bulkProps)
})

setBulkModal(false)

  }

  return (
    <div className="dropdown-wrapper">
    <div>
        <button className="add-product-button" onClick={()=>setModalShow(true)}>Add products + </button>
    </div>

    <div>
        <button className="add-product-button" onClick={()=>setBulkModal(true)}>Take Bulk action </button>
    </div>

    {bulkModal&& (
      <div>

    <form onSubmit={handleSubmit}>
    <div>
        <label htmlFor="secondDropdownb">Update Grade (bulk): </label>
        <select
          id="secondDropdownb"
          value={bulkProps}
          onChange={(e) => setBulkProps(e.target.value)}
        >
          <option value="" disabled>Select an option</option>
          <option value="">none</option>
          <option value="GradeA">GradeA</option>
          <option value="GradeB">GradeB</option>
          <option value="GradeC">GradeC</option>
        </select>
      </div>


      <button type="submit">OK</button>
    </form>

      </div>

    )}


      <div>
        <label htmlFor="firstDropdown">Material </label>
        <select
          id="firstDropdown"
          value={material}
          onChange={(e)=>setMaterial(e.target.value)}
        >
          <option value="" disabled>Select an option</option>
          <option value="">none</option>
          <option value="Metals">Metals</option>
          <option value="Plastic">Plastic</option>
          <option value="Synthetic">Synthetic</option>
        </select>
      </div>
      <div>
        <label htmlFor="secondDropdown">Grade: </label>
        <select
          id="secondDropdown"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        >
          <option value="" disabled>Select an option</option>
          <option value="">none</option>
          <option value="GradeA">GradeA</option>
          <option value="GradeB">GradeB</option>
          <option value="GradeC">GradeC</option>
        </select>
      </div>
     
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  update: (index, category, subCategory, grade, newValue) => dispatch({
    type: "UPDATE",
    payload: { index, category, subCategory, grade, newValue }
  }),
});

export default connect(null, mapDispatchToProps)(CategoryFilter);
