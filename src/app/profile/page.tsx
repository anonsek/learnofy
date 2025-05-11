import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { Card } from '@/components/ui/card';

const prisma = new PrismaClient();

export default async function Page() {
    // Get the session to check authentication
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/signin'); // Redirect to signin page if user is not authenticated
    }

    // Fetch user data directly from Prisma
    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
    });

    if (!user) {
        return (
            <div className="text-center mt-10">
                <p>User not found.</p>
            </div>
        );
    }

    // Get course data by course IDs
    const courseIds = user.courses ? user.courses.split(',') : [];
    const courses = await prisma.course.findMany({
        where: {
            id: {
                in: courseIds,
            },
        },
    });

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold">Welcome {user.name}</h1>
            <p className="text-xl">Email: {user.email}</p>
            <p className="text-xl">Role: {user.role}</p>
            <p className="text-xl">Courses:</p>
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
        </div>
    );
}
