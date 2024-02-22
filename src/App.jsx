import React, { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import ReactPaginate from "react-paginate";

function App() {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 10;

  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayUsers = data
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((item) => {
      return <div key={item.id}>{item.title} </div>;
    });

  useEffect(() => {
    let fetchData = async () => {
      try {
        let response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos/"
        );
        setData(response.data.slice(0, 50));
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>App</div>
      <div>{displayUsers}</div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        nextLinkClassName={"nextBttn"}
        previousLinkClassName={"previousBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      ></ReactPaginate>
    </>
  );
}

export default App;
