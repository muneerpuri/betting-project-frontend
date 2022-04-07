import React from "react";
import { useHistory } from "react-router";
import {
  Table,
  Tabs,
  Tab,
  Pagination,
  Container,
  Spinner,
} from "react-bootstrap";
function BetTable() {
  const history = useHistory();
  const [activePageTab, setActivePageTab] = React.useState(1);
  const [activePageTabUpcoming, setActivePageTabUpcoming] = React.useState(1);
  const [content, setContent] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [upcomingData, setUpcomingData] = React.useState([]);
  const itemsPerPage = 10;
  let timeZoneNow = Intl.DateTimeFormat().resolvedOptions().timeZone;
  React.useEffect(() => {
    setLoading(true);
    fetch(process.env.REACT_APP_BACKEND + "/games")
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        let dateSortedArray = res.data.sort(function (a, b) {
          var dateA = new Date(a.attributes.gameTime);
          var dateB = new Date(b.attributes.gameTime);
          return (
            dateA &&
            a.attributes.status === "UPCOMING" - dateB &&
            b.attributes.status === "PROCESSED"
          );
        });
        let upcomingArr = dateSortedArray
          .filter((e) => {
            var inputDate = new Date(e.attributes.gameTime);

            var todaysDate = new Date();

            if (inputDate > todaysDate) {
              return e;
            }
          })
          .filter((el) => el.attributes.status === "UPCOMING");
        let processedArr = dateSortedArray
          .filter((e) => {
            var inputDate = new Date(e.attributes.gameTime);

            var todaysDate = new Date();

            if (inputDate > todaysDate) {
              return e;
            }
          })
          .filter((el) => el.attributes.status === "PROCESSED");
        setUpcomingData(upcomingArr);
        setContent(upcomingArr.concat(processedArr));
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  setInterval(() => {
    setLoading(true);
    fetch(process.env.REACT_APP_BACKEND + "/games")
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        let dateSortedArray = res.data.sort(function (a, b) {
          var dateA = new Date(a.attributes.gameTime);
          var dateB = new Date(b.attributes.gameTime);
          return (
            dateA &&
            a.attributes.status === "UPCOMING" - dateB &&
            b.attributes.status === "PROCESSED"
          );
        });
        let upcomingArr = dateSortedArray.filter(
          (el) => el.attributes.status === "UPCOMING"
        );
        let processedArr = dateSortedArray.filter(
          (el) => el.attributes.status === "PROCESSED"
        );
        setUpcomingData(upcomingArr);
        setContent(upcomingArr.concat(processedArr));
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, 180000);
  const indexOfLastTodo = activePageTab * itemsPerPage;
  const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
  const activeData = content.slice(indexOfFirstTodo, indexOfLastTodo);

  const indexOfLastTodoU = activePageTabUpcoming * itemsPerPage;
  const indexOfFirstTodoU = indexOfLastTodoU - itemsPerPage;
  const activeDataU = upcomingData.slice(indexOfFirstTodoU, indexOfLastTodoU);

  let itemsU = [];
  for (
    let number = 1;
    number <= Math.ceil(upcomingData.length / itemsPerPage);
    number++
  ) {
    itemsU.push(
      <Pagination.Item
        style={{ backrgound: "black !important" }}
        bg-dar
        onClick={() => setActivePageTabUpcoming(number)}
        key={number}
        active={activePageTabUpcoming === number}
      >
        {number}
      </Pagination.Item>
    );
  }
  let items = [];
  for (
    let number = 1;
    number <= Math.ceil(content.length / itemsPerPage);
    number++
  ) {
    items.push(
      <Pagination.Item
        style={{ backrgound: "black !important" }}
        bg-dar
        onClick={() => setActivePageTab(number)}
        key={number}
        active={activePageTab === number}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Container fluid bg="dark" className="p-2 pagination-bg-dark bg-dark ">
      {loading ? (
        <Container className=" mt-5 mb-5 d-flex justify-content-center align-items-center">
          {" "}
          <Spinner animation="border" variant="light" />
        </Container>
      ) : (
        <Tabs
          defaultActiveKey="home"
          id="uncontrolled-tab-example"
          className="mb-3 text-white"
        >
          <Tab className="text-white" eventKey="home" title="Upcoming">
            <>
              {/* <p className="fw-normal text-white">{timeZoneNow}</p> */}
              <Table
                className="w-100"
                responsive
                striped
                bordered
                hover
                variant="dark"
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>GAME</th>
                    <th>DESCRIPTION</th>
                    <th>BET TYPE</th>
                    <th>AMOUNT</th>
                    <th>TIME</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {content.length > 0 &&
                    activeDataU.map((el, index) => {
                      let date = new Date(el.attributes.gameTime);
                      let data = date.toLocaleString("en-US", {
                        timeZone: timeZoneNow,
                      });
                      let time = data.split(", ");
                      //    console.log(date)

                      //    let intlDateObj = new Intl.DateTimeFormat('en-US', {
                      //     timeZone: timeZoneNow
                      // });
                      // let Time = intlDateObj.format(date);
                      return (
                        <tr
                          onClick={() => history.push(`/makebet/${el.id}`)}
                          className="pe-auto"
                        >
                          <td>{index + 1}</td>
                          <td>{el.attributes.game}</td>
                          <td>{el.attributes.description}</td>
                          <td>{el.attributes.betType}</td>
                          <td>{el.attributes.amount}</td>
                          <td>
                            {" "}
                            {monthNames[date.getMonth()] +
                              " " +
                              date.getDate() +
                              " " +
                              date.getFullYear() +
                              ", " +
                              time[1]}
                          </td>
                          <td
                            className={
                              el.attributes.status === "UPCOMING"
                                ? "text-warning"
                                : el.attributes.status === "PROCESSED"
                                ? "text-success"
                                : el.attributes.status === "LOSS"
                                ? "text-info"
                                : ""
                            }
                          >
                            {el.attributes.status}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
              <Container
                bg="dark"
                className="p-2 pagination-bg-dark bg-dark text-secondary d-flex justify-content-center align-items-center"
              >
                <Pagination
                  style={{ backrgound: "black !important" }}
                  className="pagination-bg-dark bg-dark"
                >
                  {itemsU}
                </Pagination>
              </Container>
            </>
          </Tab>
          <Tab className="text-white" eventKey="profile" title="All">
            <>
              {/* <p className="fw-normal text-white">{timeZoneNow}</p> */}
              <Table
                className="w-100"
                responsive
                striped
                bordered
                hover
                variant="dark"
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>GAME</th>
                    <th>DESCRIPTION</th>
                    <th>BET TYPE</th>
                    <th>AMOUNT</th>
                    <th>TIME</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {content.length > 0 &&
                    activeData.map((el, index) => {
                      let date = new Date(el.attributes.gameTime);
                      let data = date.toLocaleString("en-US", {
                        timeZone: timeZoneNow,
                      });
                      let time = data.split(", ");
                      //    console.log(date)

                      //    let intlDateObj = new Intl.DateTimeFormat('en-US', {
                      //     timeZone: timeZoneNow
                      // });
                      // let Time = intlDateObj.format(date);
                      return (
                        <tr
                          onClick={() => history.push(`/makebet/${el.id}`)}
                          className="pe-auto"
                        >
                          <td>{index + 1}</td>
                          <td>{el.attributes.game}</td>
                          <td>{el.attributes.description}</td>
                          <td>{el.attributes.betType}</td>
                          <td>{el.attributes.amount}</td>
                          <td>
                            {" "}
                            {monthNames[date.getMonth()] +
                              " " +
                              date.getDate() +
                              " " +
                              date.getFullYear() +
                              ", " +
                              time[1]}
                          </td>
                          <td
                            className={
                              el.attributes.status === "UPCOMING"
                                ? "text-warning"
                                : el.attributes.status === "PROCESSED"
                                ? "text-success"
                                : el.attributes.status === "LOSS"
                                ? "text-info"
                                : ""
                            }
                          >
                            {el.attributes.status}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
              <Container
                bg="dark"
                className="p-2 pagination-bg-dark bg-dark text-secondary d-flex justify-content-center align-items-center"
              >
                <Pagination
                  style={{ backrgound: "black !important" }}
                  className="pagination-bg-dark bg-dark"
                >
                  {items}
                </Pagination>
              </Container>
            </>
          </Tab>
        </Tabs>
      )}
    </Container>
  );
}

export default BetTable;
