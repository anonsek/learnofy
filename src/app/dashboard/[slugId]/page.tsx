import React from 'react'
import { prisma } from '../../../../lib/prisma'

async function page({params}) {
    const para = await params
    console.log(para.slugId)
   
    const course = await prisma.course.findUnique({
        where:{
            id:para.slugId
        }
    })
  return (
    <div>
      <h1>Course details</h1>
      <h1>{course?.name}</h1>
      <h1>{course?.slug}</h1>
    </div>
  )
}

export default page
