import React from 'react'
import EmployeesTable from './employeestable'
import { Button,Typography } from '@material-tailwind/react'

function OrgEmployess() {
  return (
    <>
    <Typography variant="h3" color="blue-gray">
          Organization Data
        </Typography>
    <div className='m-6 flex justify-end'>
    <a href='/dashboardAdmin/createusers'><Button size="md" variant="outlined" className="rounded-full" >Add Employee</Button></a>
    </div>
    <div>
        <EmployeesTable />
    </div>

    </>
  )
}

export default OrgEmployess