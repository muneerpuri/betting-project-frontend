import React from "react";

import {  useHistory } from "react-router";
import { Table, Pagination, Container ,Spinner} from "react-bootstrap";
function BetTable() {
  const history = useHistory();
  const [activePageTab, setActivePageTab] = React.useState(1);
  const [content,setContent] = React.useState([])
  const [loading,setLoading] = React.useState(false)
  const itemsPerPage = 10;

  React.useEffect(()=>{
    setLoading(true)
      fetch(process.env.REACT_APP_BACKEND+"/games")
      .then(res=>res.json())
      .then(res=>{
          console.log(res.data)
        setContent(res.data.sort(function(a, b) {
          var dateA = new Date(a.attributes.gameTime);
          var dateB = new Date(b.attributes.gameTime);
          return dateB - dateA
      }))
        setLoading(false)})
      .catch(e=>{setLoading(false)})

  },[])
  const indexOfLastTodo = activePageTab * itemsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
    const activeData = content.slice(indexOfFirstTodo, indexOfLastTodo);

  let items = [];
  for (let number = 1; number <=Math.ceil(content.length / itemsPerPage); number++) {
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
         
         activeData.map((el,index)=>{
           let date= new Date(el.attributes.gameTime)
           return  <tr onClick={()=>history.push(`/makebet/${el.id}`)} className="pe-auto">
            <td>{index+1}</td>
            <td>{el.attributes.game}</td>
            <td>{el.attributes.description}</td>
            <td>{el.attributes.betType}</td>
            <td>{el.attributes.amount}</td>
            <td>{date.toLocaleString()}</td>
            <td className={el.attributes.status==="WAITING"?'text-warning':el.attributes.status==="CANCELLED"?'text-danger':el.attributes.status==="WIN"?'text-success':el.attributes.status==="LOSS"?'text-info':""}>{el.attributes.status}</td>
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
