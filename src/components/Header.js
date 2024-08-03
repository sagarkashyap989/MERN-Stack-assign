// Filename - components/header.js

import React from "react";
import { useSelector } from "react-redux";

export default function Header() {
	const signed = useSelector(
		(state) => state.auth.signed
	);

	return (
		<div signed={signed}>
			<h3>Logged in: {String(signed)}</h3>
		</div>
	);
}
