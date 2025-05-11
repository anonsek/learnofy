'use client'

function EnrollButton({ course, user }) {
  const clickFun = async () => {
    console.log("course", course)
    console.log("user", user)
    await fetch('/api/save-course', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user?.id,
        courseId: course?.id
      })
    })
  }
  return (
    <div>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300" onClick={clickFun}>Enroll</button>
    </div>
  )
}

export default EnrollButton