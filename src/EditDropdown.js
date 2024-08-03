import React, { useState } from 'react';

const EditDropdown = ({ productIndex, category, subCategory, grade, setSubSubCategory , setIsEdit}) => {
  // Initial state for selected values, assuming you want to manage the state inside the component
  const [selectedSubCategory, setSelectedSubCategory] = useState(subCategory);
  const [selectedGrade, setSelectedGrade] = useState(grade);

  // Handler for sub-category change
  const handleSubCategoryChange = (e) => {
    const newSubCategory = e.target.value;
    setSelectedSubCategory(newSubCategory);
    // setSubCategory(productIndex, category, newSubCategory, selectedGrade, 'TEMP'); // Assuming 'TEMP' is just a placeholder
  };

  // Handler for grade change
  const handleGradeChange = (e) => {
    const newGrade = e.target.value;
    setSelectedGrade(newGrade);
};


const handleSubmit = (e)=>{
    e.preventDefault()
    setSubSubCategory(productIndex, category, selectedSubCategory, grade, selectedGrade);
    setIsEdit([false, null])


}
  return (

    <td>
     <form onSubmit={handleSubmit}>
     {/* <div>
        <label htmlFor="firstDropdown">Sub Category: </label>
        <select
          id="firstDropdown"
          value={selectedSubCategory}
          onChange={handleSubCategoryChange}
        >
          <option value="" disabled>Select an option</option>
          <option value="">None</option>
          <option value="Metals">Metals</option>
          <option value="Plastic">Plastic</option>
          <option value="Synthetic">Synthetic</option>
        </select>
      </div> */}
      <div>
        <label htmlFor="secondDropdown">Sub Sub Category: </label>
        <select
          id="secondDropdown"
          value={selectedGrade}
          onChange={handleGradeChange}
        >
          <option value="" disabled>Select an option</option>
          <option value="">None</option>
          <option value="GradeA">GradeA</option>
          <option value="GradeB">GradeB</option>
          <option value="GradeC">GradeC</option>
        </select>
      </div>


      <button type='submit'>OK</button>
     </form>
    </td>
  );
};

export default EditDropdown;
