// Filename - components/content.js

import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	login,
	logout,
	increment,
	decrement,
} from "../redux/actions/actions";

export default function Main() {
	const count = useSelector(
		(state) => state.count.counter
	);
	const signed = useSelector(
		(state) => state.auth.signed
	);
	const dispatch = useDispatch();

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			{signed ? (
				<button onClick={() => dispatch(logout())}>
					LOGOUT
				</button>
			) : (
				<button onClick={() => dispatch(login())}>
					LOGIN
				</button>
			)}
			<h3>Total count: {count}</h3>
			<h4>Change the state by</h4>

			<div
				style={{ margin: "auto", display: "flex" }}
			>
				<button
					style={{
						margin: "20px",
						padding: "10px",
						fontSize: "15px",
					}}
					onClick={() => dispatch(decrement(2))}
				>
					-2
				</button>
				<button
					style={{
						margin: "20px",
						padding: "10px",
						fontSize: "15px",
					}}
					onClick={() => dispatch(increment(2))}
				>
					+2
				</button>
			</div>
		</div>
	);
}
