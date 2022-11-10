import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import TableFormat from "./Table";
import Select from "react-select";
import Pagination from "react-js-pagination";

const customStyles2 = {
  container: () => ({
    height: 50,
    width: "30%",
    position: "relative !important",
  }),
  control: (provided) => ({
    ...provided,
    display: "flex",
    maxHeight: 80,
    minHeight: 50,
    overflow: "auto",
    borderRadius: 8,
  }),
};

const options = [
  {
    label: "All Launches",
    value: "all",
  },
  {
    label: "Upcoming Launches",
    value: "upcoming",
  },
  {
    label: "Successful Launches",
    value: "success",
  },
  {
    label: "Failed Launches",
    value: "failed",
  },
];

function App() {
  const [spaceXData, setSpaceXData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterLaunches, setFilterLaunches] = useState({
    label: "All Launches",
    value: "all",
  });
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchSpaceXData();
    setLoading(true);
  }, [filterLaunches?.value, currentPage]);

  let url = `https://api.spacexdata.com/v3/launches?limit=10&offset=${
    currentPage * 10
  }`;

  const fetchSpaceXData = () => {
    axios
      .get(url)
      .then((res) => {
        let data = [];
        if (filterLaunches?.value === "success") {
          data = res?.data?.filter((item) => item?.launch_success === true);
          setSpaceXData(data);
        } else if (filterLaunches?.value === "failed") {
          data = spaceXData?.filter((item) => item?.launch_success === false);
          setSpaceXData(data);
        } else if (filterLaunches?.value === "upcoming") {
          data = spaceXData?.filter((item) => item?.upcoming === true);
          setSpaceXData(data);
        } else {
          console.log(res?.data);
          setSpaceXData(res?.data || []);
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const setCurrentPageNo = (e) => {
    console.log(e);
    setCurrentPage(e);
  };

  return (
    <div className="App mt-5">
      <h1 className="text-center mb-4">SpaceX</h1>
      {JSON.stringify(currentPage, null, 2)}

      <div className="d-flex justify-content-between mx-auto w-75 mb-4">
        <Select
          className="h-100"
          styles={customStyles2}
          cacheOptions
          defaultOptions
          onChange={(e) => {
            // setFilterLaunches(e);
            // console.log(e);
          }}
          // value={filterLaunches}
          placeholder="Past 6 months"
          components={{
            IndicatorSeparator: () => null,
          }}
          // options={options}
          isLoading={false}
        />

        <Select
          className="h-100"
          styles={customStyles2}
          cacheOptions
          defaultOptions
          onChange={(e) => {
            setFilterLaunches(e);
          }}
          value={filterLaunches}
          placeholder="All launches"
          components={{
            IndicatorSeparator: () => null,
          }}
          options={options}
          isLoading={false}
        />
      </div>

      <div className="w-75 pl-5 pr-5 mx-auto border h-100">
        <TableFormat spaceXData={spaceXData} loading={loading} />
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={10}
          totalItemsCount={110}
          onChange={setCurrentPageNo}
          nextPageText="Next"
          prevPageText="Prev"
          firstPageText="First"
          lastPageText="Last"
          itemClass="page-item"
          linkClass="page-link"
          activeClass="pageItemActive"
          activeLinkClass="pageLinkActive"
        />
      </div>
    </div>
  );
}

export default App;
