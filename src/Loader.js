import React from "react";
import Spinner from "./spinner.gif";

const Loader = () => {
	return (
		<div className="mx-auto">
			<img src={Spinner} alt="loader" className="loader-img" />
		</div>
	);
};

export default Loader;
