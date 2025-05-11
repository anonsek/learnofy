import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const body = await request.json()
    const { userId, courseId } = body

    if (!userId || !courseId) {
      return new Response(JSON.stringify({ error: 'Invalid input' }), {
        status: 400,
      })
    }

    // Get current user data
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
      })
    }

    // Parse existing courses string into array
    let existingCourses = user.courses
      ?.replace(/[()]/g, '')
      .split(',')
      .filter(Boolean)
      .map(id => id.trim()) || []

    // Add new courseId if not already present
    if (!existingCourses.includes(courseId)) {
      existingCourses.push(courseId)
    }

    // Convert array back to string
    const coursesString = existingCourses.join(',')

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { courses: coursesString },
    })

    return new Response(JSON.stringify({ message: 'Course added', user: updatedUser }), {
      status: 200,
    })
  } catch (error) {
    console.error('Error saving course:', error)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    })
  }
}
