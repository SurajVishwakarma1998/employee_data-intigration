import React from 'react';
import Image from "./img.png";

const Singel = (props) => {
  return (
    <div className='person'>
        <div >
        <h2>Employee data</h2>
            <div>
                <img src={Image} alt='image123'/>
            </div>
            <div>
                <p>Name : {props.name} </p>
                <p>Age : {props.age}</p>
                <p>Salary : {props.salary}</p>
            </div>
        </div>
    </div>
  )
}

export default Singel