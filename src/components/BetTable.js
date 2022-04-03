import React from "react";

import { Table, Pagination, Container ,Spinner} from "react-bootstrap";
function BetTable() {
  const [activePageTab, setActivePageTab] = React.useState(1);
  const [content,setContent] = React.useState([])
  const [loading,setLoading] = React.useState(false)

  React.useEffect(()=>{
    setLoading(true)
      fetch(process.env.REACT_APP_BACKEND+"/games")
      .then(res=>res.json())
      .then(res=>{
          console.log(res.data)
        setContent(res.data)
        setLoading(false)})
      .catch(e=>{setLoading(false)})

  },[])

  let items = [];
  for (let number = 1; number <= 5; number++) {
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

     {loading ?<Container className=" mt-5 mb-5 d-flex justify-content-center align-items-center"> <Spinner animation="border" variant="light" /></Container>: <><Table className="w-100" responsive striped bordered hover variant="dark">
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
         {content.length>0 &&  
         
         content.map((el,index)=>{
           let date= new Date(el.attributes.gameTime)
           return <tr className="pe-auto">
            <td>{index+1}</td>
            <td>{el.attributes.game}</td>
            <td>{el.attributes.description}</td>
            <td>{el.attributes.betType}</td>
            <td>{el.attributes.amount}</td>
            <td>{date.toUTCString()}</td>
            <td>{el.attributes.status}</td>
          </tr>

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
      </Container></>}
    </Container>
  );
}

export default BetTable;
