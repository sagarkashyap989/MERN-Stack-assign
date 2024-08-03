import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import CategoryFilter from './CategoryFilter';
import { transformNestedObjectToArray } from './utils/products';
import EditDropdown from './EditDropdown';

const TableComponent = ({ products, setModalShow, update }) => {
  const [productArray, setProductArray] = useState([]);
  const [material, setMaterial] = useState(null);
  const [grade, setGrade] = useState(null);
  const [isEdit, setIsEdit] = useState([false, null]);
  const [checkedProducts, setCheckedProducts] = useState([]);

  useEffect(() => {
    const temp = transformNestedObjectToArray(products);
    setProductArray(temp);
  }, [products]);

  const filters = [material, grade].filter(filter => filter && filter !== '');

  const setSubSubCategory = (index, category, subCategory, grade, newValue) => {
    update(index, category, subCategory, grade, newValue);
  };

  const handleCheckboxChange = (productIndex, category, subCategory, grade) => {
    const productObject = { productIndex, category, subCategory, grade };
    setCheckedProducts(prevState =>
      prevState.some(product => (
        product.productIndex === productIndex &&
        product.category === category &&
        product.subCategory === subCategory &&
        product.grade === grade
      ))
        ? prevState.filter(product => !(
          product.productIndex === productIndex &&
          product.category === category &&
          product.subCategory === subCategory &&
          product.grade === grade
        ))
        : [...prevState, productObject]
    );

    console.log(checkedProducts, 'checkedProducts');
  };

  return (
    <>
      <div>
        <CategoryFilter
          material={material}
          setMaterial={setMaterial}
          grade={grade}
          setGrade={setGrade}
          setModalShow={setModalShow}
          checkedProducts={checkedProducts}
        />
      </div>
      <table style={{ width: '80%' }}>
        <thead>
          <tr>
            <th>Select</th>
            <th>Category | Sub Category | Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody style={{ textAlign: 'center' }}>
          {products.map((product, productIndex) => (
            Object.keys(product).map(category => (
              Object.keys(product[category]).map(subCategory => (
                product[category][subCategory].map((grade, gradeIndex) => {
                  const uniqueKey = `${productIndex}-${category}-${subCategory}-${gradeIndex}`;
                  const isChecked = checkedProducts.some(product => (
                    product.productIndex === productIndex &&
                    product.category === category &&
                    product.subCategory === subCategory &&
                    product.grade === grade
                  ));
                  return (
                    (filters.length === 0 || filters.some(filter => filter === subCategory || filter === grade)) ? (
                      <React.Fragment key={uniqueKey}>
                        <tr>
                          <td>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleCheckboxChange(productIndex, category, subCategory, grade)}
                            />
                          </td>
                          <td>{`${category} | ${subCategory} | ${grade}`}</td>
                          <td>
                            <button onClick={() => setIsEdit([true, uniqueKey])}>edit</button>
                          </td>
                        </tr>
                        <tr className={isEdit[0] && isEdit[1] === uniqueKey ? 'show edit-wrapper' : 'hide edit-wrapper'}>
                          <EditDropdown
                            productIndex={productIndex}
                            category={category}
                            subCategory={subCategory}
                            grade={grade}
                            setSubSubCategory={setSubSubCategory}
                            setIsEdit={setIsEdit}
                          />
                        </tr>
                      </React.Fragment>
                    ) : null
                  );
                })
              ))
            ))
          ))}
        </tbody>
      </table>
    </>
  );
};

const mapStateToProps = (state) => ({
  products: state.product,
});

const mapDispatchToProps = (dispatch) => ({
  update: (index, category, subCategory, grade, newValue) => dispatch({
    type: "UPDATE",
    payload: { index, category, subCategory, grade, newValue }
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableComponent);
