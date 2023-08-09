import React from 'react'

function AdminPrivaleges( {first_name, last_name} ) {
  
  return (
   
    <div>{`User:${first_name} ${last_name} Currently has Administrative Privileges`}</div>
  )
}

export default AdminPrivaleges