import React from "react";
// import uuid from "react-uuid";
import { dropDownItems } from "../constants";
import { useParams, useHistory } from "react-router";
import { useToasts } from "react-toast-notifications";

import { Button, Container, Spinner, Card } from "react-bootstrap";
function MakeBet() {
  const { addToast } = useToasts();
  const history = useHistory();
  const gameId = parseInt(useParams().id);
  const [value, setValue] = React.useState("");
  const [content, setContent] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [gameData, setGameData] = React.useState(null);
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  React.useEffect(() => {
    if (!gameId) {
      history.push("/");
    } else {
      // if (!user) {
      //   localStorage.setItem("user", JSON.stringify(uuid()));
      // } else {
      //   console.log(user);
      // }
    }
  }, [gameId, history]);
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
  let date = gameData?new Date(gameData.attributes.gameTime):"";
  let data = date.toLocaleString("en-US", {
    timeZone: timeZoneNow,
  });
  let time = data.split(", ");
  React.useEffect(() => {
    if (gameId) {
      setLoading(true);
      fetch(`${process.env.REACT_APP_BACKEND}/games/${gameId}`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res.data)
          var today = new Date();
          var Christmas = new Date(res?.data?.attributes?.gameTime);
          var diffMs = (Christmas - today); 
          var diffHrs = Math.floor((diffMs % 86400000) / 3600000);
          console.log(diffHrs,"HOURS")
         
          if (!res.data || diffHrs < 2 || res?.data?.attributes?.status === "PROCESSED") {
            history.push("/");
          } else {
            setGameData(res.data);
            getBetsBasedOnGame();
          }
        })
        .catch((e) => {
          setLoading(false);
        });
    }
    // eslint-disable-next-line
  }, [gameId]);

  function makeBet() {
    if (value) {
      setLoading(true);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        data: {
          game: [gameId],
          userId: localStorage.getItem("userId"),
          amount: gameData.attributes.amount,
          betType: gameData.attributes.betType,
          betNo: value,
          status: "WAITING",
        },
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      var requestOptions2 = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch(
        `${process.env.REACT_APP_BACKEND}/bets?filters[game][id][$eq]=${gameId}&filters[betNo][$eq]=${value}`,
        requestOptions2
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.data.length > 0) {
            addToast("Bet Already Taken :( !", { appearance: "error" });
            getBetsBasedOnGame();

            setLoading(false);
          } else {
            fetch(`${process.env.REACT_APP_BACKEND}/bets`, requestOptions)
              .then((response) => response.json())
              .then((result) => {
                getBetsBasedOnGame();
                addToast("Bet Made!", { appearance: "success" });
                console.log(result);
                setLoading(false);
              })
              .catch((error) => {
                addToast(error.message, { appearance: "error" });
                setLoading(false);
              });
          }
        })
        .catch((error) => {
          addToast(error.message, { appearance: "error" });
          setLoading(false);
        });
    } else {
      addToast("Please select bet no.", { appearance: "error" });
    }
  }

  function getBetsBasedOnGame() {
    setLoading(true);
    fetch(
      `${process.env.REACT_APP_BACKEND}/bets?filters[game][id][$eq]=${gameId}`
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
  }
  return (
    <Container fluid bg="dark" className="p-2 pagination-bg-dark bg-dark ">
      {loading ? (
        <Container className=" mt-5 mb-5 d-flex justify-content-center align-items-center">
          {" "}
          <Spinner animation="border" variant="light" />
        </Container>
      ) : (
        <Container fluid className="p-5">
          {gameData && (
            <Card>
              <Card.Header>Game: {gameData.attributes.game}</Card.Header>
              <Card.Body>
                <Card.Title>Amount: {gameData.attributes.amount}</Card.Title>
                <Card.Text>{gameData.attributes.description}</Card.Text>

                <Card.Text>{"Game Time: "+monthNames[date.getMonth()] +
                              " " +
                              date.getDate() +
                              " " +
                              date.getFullYear() +
                              ", " +
                              time[1]}</Card.Text>
                <Container fluid>
                  <p
                    style={{ padding: "5px", margin: "5px" }}
                    className="fw-normal"
                  >
                    Select bet number
                    <select
                      style={{ padding: "5px", margin: "5px" }}
                      value={value}
                      onChange={handleChange}
                    >
                      <option selected="true" value="" disabled="disabled">
                        Choose Bet No.
                      </option>

                      {dropDownItems.map((option) => {
                        let indexOfItem = content.findIndex(
                          (el) => el.attributes.betNo === option
                        );
                        console.log(indexOfItem);
                        return (
                          <option
                            disabled={indexOfItem !== -1 ? true : false}
                            value={option}
                          >
                            {option}
                          </option>
                        );
                      })}
                    </select>
                  </p>
                </Container>
                <Button onClick={makeBet} variant="dark">
                  Make Bet!
                </Button>
              </Card.Body>
            </Card>
          )}
        </Container>
      )}
    </Container>
  );
}

export default MakeBet;
