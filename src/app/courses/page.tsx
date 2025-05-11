import React from 'react'
import { prisma } from '../../../lib/prisma'
import { Card } from '@/components/ui/card';
import { Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import EnrollButton from '@/components/courses/enrollButton';



export default async function page() {
  const courses = await prisma.course.findMany();
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/signin');
  }

  return (
    <div>
      <h1 className='text-3xl text-center my-10 font-bold'>Our latest Courses Are :</h1>
      <hr />
      <div >
        <ul className='card_container'>
          {courses.map((course) => (
            <Card key={course.slug} className='card'>
              <li>
                <div className='img_con'><img src={course.imgUrl} alt={`img_of_${course.name}`} /></div>
                {course.name}
                <EnrollButton course={course} user={session?.user}/>
              </li>
            </Card>
          ))}
        </ul>
      </div>
    </div>
  )
}
