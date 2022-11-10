import React, { useState } from "react";
import { Badge, NavLink, Table } from "reactstrap";
import Loader from "./Loader";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const TableFormat = ({ spaceXData, loading }) => {
  const [openModal, setOpenModal] = useState(false);
  const [capsulesDetails, setCapsulesDetails] = useState(null);
  const toggleModal = (item) => {
    setOpenModal(!openModal);
    console.log(item);
    setCapsulesDetails(item);
  };
  return (
    <>
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
                <tr key={id} onClick={() => toggleModal(item)}>
                  <th scope="row">{item?.flight_number || "#"}</th>
                  <td>{convertedTime}</td>
                  <td>{item?.launch_site?.site_name || ""}</td>
                  <td>{item?.mission_name || ""}</td>
                  <td>
                    {item?.rocket?.second_stage?.payloads[0]?.orbit || ""}
                  </td>
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

      <Modal isOpen={openModal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          <div className="d-flex align-items-center" style={{ gap: 10 }}>
            <img
              src={capsulesDetails?.links?.mission_patch}
              alt="satelite-img"
              width={50}
              height={50}
            />
            {capsulesDetails?.mission_name || ""}
            <Badge
              color={`${
                capsulesDetails?.launch_success
                  ? "success"
                  : capsulesDetails?.upcoming
                  ? "warning"
                  : "danger"
              }`}
              pill
            >
              {capsulesDetails?.launch_success
                ? "Success"
                : capsulesDetails?.upcoming
                ? "Upcoming"
                : "Failed"}
            </Badge>
          </div>
        </ModalHeader>
        <ModalBody>
          {capsulesDetails?.details || ""}.
          <NavLink to={() => window.open(capsulesDetails?.links?.article_link)}>
            Wikipedia
          </NavLink>
          <div className="d-flex align-items-center" style={{ gap: 10 }}>
            <span>Flight Number:</span>
            <span>{capsulesDetails?.flight_number || "#"}</span>
          </div>
          <hr />
          <div className="d-flex align-items-center" style={{ gap: 10 }}>
            <span>Mission Name:</span>
            <span>{capsulesDetails?.mission_name || ""}</span>
          </div>
          <hr />
          <div className="d-flex align-items-center" style={{ gap: 10 }}>
            <span>Rocket Type:</span>
            <span>{capsulesDetails?.rocket?.rocket_type || ""}</span>
          </div>
          <hr />
          <div className="d-flex align-items-center" style={{ gap: 10 }}>
            <span>Rocket Name:</span>
            <span>{capsulesDetails?.rocket?.rocket_name || ""}</span>
          </div>
          <hr />
          <div className="d-flex align-items-center" style={{ gap: 10 }}>
            <span>Manufacturer:</span>
            <span>
              {capsulesDetails?.rocket?.second_stage?.payloads[0]
                ?.manufacturer || ""}
            </span>
          </div>
          <hr />
          <div className="d-flex align-items-center" style={{ gap: 10 }}>
            <span>Nationality:</span>
            <span>
              {capsulesDetails?.rocket?.second_stage?.payloads[0]
                ?.nationality || ""}
            </span>
          </div>
          <hr />
        </ModalBody>
      </Modal>
    </>
  );
};

export default TableFormat;
