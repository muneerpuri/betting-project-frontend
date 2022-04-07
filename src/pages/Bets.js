import React from "react";

import { Table, Container, Spinner } from "react-bootstrap";

function Bets() {
  const [content, setContent] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

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
  let timeZoneNow = Intl.DateTimeFormat().resolvedOptions().timeZone;
  React.useEffect(() => {
    setLoading(true);
    fetch(
      `${
        process.env.REACT_APP_BACKEND
      }/bets?populate=*&filters[userId][$eq]=${localStorage.getItem("userId")}`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        setContent(res.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);
  return loading ? (
    <Container className=" mt-5 mb-5 d-flex justify-content-center align-items-center">
      {" "}
      <Spinner animation="border" variant="light" />
    </Container>
  ) : (
    <>
      <Table className="w-100" responsive striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>GAME</th>
            <th>GAME TIME</th>
            <th>WINNING NO.</th>
            <th>BET NO.</th>
            <th>BET TYPE</th>
            <th>AMOUNT</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {content.length > 0 &&
            content.map((el) => {
              let date = new Date(el.attributes.game.data.attributes.gameTime);
              let data = date.toLocaleString("en-US", {
                timeZone: timeZoneNow,
              });
              let time = data.split(", ");
              //  let date= new Date(el.attributes.gameTime)
              return (
                <tr className="pe-auto">
                  <td>{el.attributes.game.data.id}</td>
                  <td>{el.attributes.game.data.attributes.game}</td>
                  <td>
                  {monthNames[date.getMonth()] +
                              " " +
                              date.getDate() +
                              " " +
                              date.getFullYear() +
                              ", " +
                              time[1]}
                  </td>
                  <td>{el.attributes.game.data.attributes.winningNo}</td>
                  <td>{el.attributes.betNo}</td>
                  <td>{el.attributes.betType}</td>
                  <td>{el.attributes.amount}</td>
                  <td
                    className={
                      el.attributes.status === "WAITING"
                        ? "text-warning"
                        : el.attributes.status === "CANCELLED"
                        ? "text-danger"
                        : el.attributes.status === "WIN"
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
    </>
  );
}

export default Bets;
