import React from "react";
import { Badge, Table } from "reactstrap";
import Loader from "./Loader";

const TableFormat = ({ spaceXData, loading }) => {
	// console.log(spaceXData);
	return (
		<Table style={{ minHeight: "70vh" }}>
			<thead>
				<tr>
					<th>No.</th>
					<th>Launched (UTC)</th>
					<th>Location</th>
					<th>Mission</th>
					<th>Orbit</th>
					<th>Launch Status</th>
					<th>Rocket</th>
				</tr>
			</thead>
			{loading ? (
				<Loader />
			) : spaceXData?.length === 0 ? (
				<div className="loader-img mt-5">
					No results found for the specified filter
				</div>
			) : (
				<tbody>
					{spaceXData?.map((item, id) => {
						const convertUTC = new Date(item?.launch_date_utc || "");
						const convertedTime = convertUTC.toUTCString().slice(5, -7);
						return (
							<tr key={id}>
								<th scope="row">{item?.flight_number || "#"}</th>
								<td>{convertedTime}</td>
								<td>{item?.launch_site?.site_name || ""}</td>
								<td>{item?.mission_name || ""}</td>
								<td>{item?.rocket?.second_stage?.payloads[0]?.orbit || ""}</td>
								<td>
									<Badge
										color={`${
											item?.launch_success
												? "success"
												: item?.upcoming
												? "warning"
												: "danger"
										}`}
										pill
									>
										{item?.launch_success
											? "Success"
											: item?.upcoming
											? "Upcoming"
											: "Failed"}
									</Badge>
								</td>
								<td>{item?.rocket?.rocket_name || ""}</td>
							</tr>
						);
					})}
				</tbody>
			)}
		</Table>
	);
};

export default TableFormat;
