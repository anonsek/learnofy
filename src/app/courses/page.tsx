import React from 'react'
import { prisma } from '../../../lib/prisma'
import { li } from 'motion/react-client';
import { Card } from '@/components/ui/card';

export default  async function page() {
    const courses = await prisma.course.findMany();
  return (
    <div>
        <h1 className='text-3xl text-center my-10 font-bold'>Our latest Courses Are :</h1>
        <hr />
        <div >
            <ul className='card_container'>
                {courses.map((course)=>(
                   <Card key={course.slug} className='card'>
                     <li>
                        <div className='img_con'><img src={course.imgUrl} alt={`img_of_${course.name}`} /></div>
                        {course.name}
                    </li>
                   </Card>
                ))}
            </ul>
        </div>
    </div>
  )
}
