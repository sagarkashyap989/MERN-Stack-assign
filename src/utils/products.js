export const transformNestedObjectToArray = (nestedObject) => {
    console.log(nestedObject, 'helo')
    const result = [];

  nestedObject.map( (e) =>{
    Object.keys(e).forEach(category => {
        Object.keys(e[category]).forEach(subCategory => {
            e[category][subCategory].forEach(grade => {
                result.push(`${category} | ${subCategory} | ${grade}`);
            });
        });
    });
  })

    return result;
};