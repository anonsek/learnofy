import { Button } from '@/components/ui/button'
import React from 'react'
import { prisma } from '../../../lib/prisma'
import { li } from 'motion/react-client'
import Link from 'next/link'

export default async function page() {
  const courses = await prisma.course.findMany()
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Link href={"./dashboard/new"}><Button>Add Course</Button></Link>
      <ul>
      {courses.map((course)=>(
        <Link  key={course.id} href={`/dashboard/${course.id}`}><li>{course.name}</li></Link>
      ))}
      </ul>
    </div>
  )
}
