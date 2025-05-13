import { Button } from '@/components/ui/button'
import React from 'react'
import { prisma } from '../../../lib/prisma'
import { li } from 'motion/react-client'
import Link from 'next/link'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

export default async function page() {
  const courses = await prisma.course.findMany()
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <>
        <p>login please</p>
        <Link href={'/signin'}><Button>Login</Button></Link>
      </>
    )
  }
  if (session.user.role !== 'admin') {
    return (
      <>
        <p>Unauthorized</p>
        <Link href={'/'}><Button>Home</Button></Link>
      </>
    )
  }

  // 1. Get all users
  const users = await prisma.user.findMany();

  // 2. Parse course IDs and fetch actual course data
  const allCourses = await prisma.course.findMany();
  const courseMap = new Map(allCourses.map(course => [course.id, course.name]));

  const usersWithCourses = users.map(user => {
    const courseIds = user.courses?.split(',').map(id => id.trim()) || [];
    const enrolledCourses = courseIds.map(id => courseMap.get(id)).filter(Boolean);
    return {
      ...user,
      enrolledCourses,
    };
  });

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Link href={"./dashboard/new"}><Button>Add Course</Button></Link>
      <ul className='list-none pl-5 flex gap-2'>
        {courses.length > 0 ? (
          courses.map((course) => (
            <div className='flex flex-col items-center justify-center gap-2'>
              <li key={course.id} className="text-lg">{course.name}</li>
              <img src={course.imgUrl} alt={`img_of_${course.name}`} />
            </div>
          ))
        ) : (
          <p className="text-xl">No courses found</p>
        )}
      </ul>

      <h2 className="text-xl font-semibold mb-4">Users and Enrolled Courses</h2>
      <table className="w-full border border-gray-300 text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Courses</th>
          </tr>
        </thead>
        <tbody>
          {usersWithCourses.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                {user.enrolledCourses.length > 0
                  ? user.enrolledCourses.join(', ')
                  : 'No courses enrolled'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
