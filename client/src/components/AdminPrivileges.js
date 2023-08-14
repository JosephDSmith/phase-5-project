import React from 'react'

function AdminPrivaleges( {first_name, last_name} ) {
  
  return (
   
    <div className='admin'>
      <h4>
      {`User: ${first_name} ${last_name} Currently has Administrative Privileges`}
      </h4></div>
  )
}

export default AdminPrivaleges