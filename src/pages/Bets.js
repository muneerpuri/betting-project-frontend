import React from 'react'

import { Table,Container,Spinner} from "react-bootstrap";

function Bets() {

  const [content,setContent] = React.useState([])
  const [loading,setLoading] = React.useState(false)

  React.useEffect(()=>{
    setLoading(true)
      fetch(`${process.env.REACT_APP_BACKEND}/bets?populate=*&filters[userId][$eq]=${JSON.parse(localStorage.getItem("user"))}`)
      .then(res=>res.json())
      .then(res=>{
          console.log(res.data)
        setContent(res.data)
        setLoading(false)})
      .catch(e=>{setLoading(false)})

  },[])
  return (loading ?<Container className=" mt-5 mb-5 d-flex justify-content-center align-items-center"> <Spinner animation="border" variant="light" /></Container>: <><Table className="w-100" responsive striped bordered hover variant="dark">
    <thead>
      <tr>
        <th>#</th>
        <th>GAME</th>
        <th>BET NO.</th>
        <th>BET TYPE</th>
        <th>AMOUNT</th>
        <th>STATUS</th>
      </tr>
    </thead>
    <tbody>
     {content.length>0 &&  
     
     content.map((el,index)=>{
      //  let date= new Date(el.attributes.gameTime)
       return  <tr className="pe-auto">
        <td>{index+1}</td>
        <td>{el.attributes.game.data.attributes.game}</td>
        <td>{el.attributes.betNo}</td>
        <td>{el.attributes.betType}</td>
        <td>{el.attributes.amount}</td>
        <td className={el.attributes.status==="WAITING"?'text-warning':el.attributes.status==="CANCELLED"?'text-danger':el.attributes.status==="WIN"?'text-success':el.attributes.status==="LOSS"?'text-info':""}>{el.attributes.status}</td>
      </tr> 

     })}
      
    </tbody>
  </Table>
  </>
  )
}

export default Bets