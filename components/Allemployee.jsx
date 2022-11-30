import React, { useEffect, useState } from 'react'
import Singel from './Singel';
import Image from "./img.png";

const Allemployee = () => {
    const [data,setData]=useState([]);
    const [singledata,SetSingleData]=useState([]);
    const[inputname,setInputname]=useState("");
    const[inputage,setInputage]=useState("");
    const[inputsalary,setInputsalary]=useState("");

 async function getData(){
     const response= await fetch("https://dummy.restapiexample.com/api/v1/employees");
     const user =await response.json();
     console.log(user.data);
     setData(user.data);
}

 useEffect(()=>{
      getData();
  },[])
        // -------------single data fetch----------
        async function singleData(id){
            const newId=id+1;
            const respons= await fetch(`https://dummy.restapiexample.com/api/v1/employee/${newId}`);
            const singleuser =await respons.json();
            console.log(singleuser.data);
            SetSingleData(singleuser.data);
          }
        // ----------------- delete data--------------

      const deletData=async(id)=>{
          const idname=id+1;
          await fetch(`https://dummy.restapiexample.com/public/api/v1/delete/${idname}`,{ method: 'DELETE' });
          getData()
      }



        // ---------------- update data--------------
    function updateData(id){
        const updateId=id+1;
        const item ={inputname,inputage,inputsalary};
       return  fetch(`https://dummy.restapiexample.com/public/api/v1/update/${updateId}`, {
        method: 'PUT',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify(item)
      }).then((result) => {
        result.json().then((resp) => {
          console.warn(resp)
          getData()
        })
    })
    }
  



  return (
    <div>
        <div className='container'>
          <h1 className='title'>All Employee Data</h1>
        </div>

    <div className='midSec'> 
              <div className='dataContainer'>
                    <table>
                        <thead>
                            <tr>
                            <th>Sr No</th>
                              <th>Name</th>
                              <th>Age</th>
                              <th>Salary</th>
                              <th className='search'>Search</th>
                              <th className='update'>Update</th>
                              <th className='red'>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                          
                              {data.map((data,index)=> 
                              <tr key={data.id}>
                                <td>{data.id}</td>
                                <td>{data.employee_name}</td>
                                <td>{data.employee_age}</td>
                                <td>{data.employee_salary}</td>
                                <td className='search'><i onClick={()=>singleData(index)}><span>🔍</span></i></td>
                                <td className='update'><i onClick={()=>updateData(index)}><span>🛠</span></i></td>
                                <td className='red'><i onClick={()=>deletData(index)}><span> 🗑</span></i></td>
                              </tr>
                              )}
                            
                        </tbody>
                    </table>
              </div>

              <div>
                      <Singel key={singledata.id} name={singledata.employee_name} age={singledata.employee_age} salary={singledata.employee_salary}/>
              </div>
      <div>
      <div className='personUpdate'>
            <h2>Update employee data</h2>
                <div>
                    <img src={Image} alt='image123'/>
                </div>
                <div>
                    <label>Name   : </label><input type="text" placeholder='Update name' value={inputname} onChange={(event)=>setInputname(event.target.value)}/><br/>
                    <label>Age    : </label> <input type="number" placeholder='Update age' value={inputage} onChange={(event)=>setInputage(event.target.value)}/><br/>
                    <label>Salary :  </label><input type="number" placeholder='Update salary' value={inputsalary} onChange={(event)=>setInputsalary(event.target.value)}/><br/>
                    <button>Update Data</button>
                </div>
        </div>
      </div>
    </div>
              
         
  </div>
    
  )
}

export default Allemployee