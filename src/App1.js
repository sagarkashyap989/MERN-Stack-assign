// Filename - App1.js

import React from "react";

import Counter from "./components/Counter";
import CategorySelector from "./CategorySelector";
import TableComponent from "./TableComponent";
function App1() {
	return (
		<div className="App">
      {/* <Counter /> */}
      {/* <CategorySelector/> */}
      <TableComponent/>
    </div>
	);
}

export default App1;
