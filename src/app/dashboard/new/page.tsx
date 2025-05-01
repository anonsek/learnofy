import { addCourse } from '@/lib/actions'
import React from 'react'

function page() {
  return (
    <div>
      <h1>Here we will upload new course</h1>
      <form action={addCourse}>
        <input type='text' name='name' placeholder='course name'/>
        <input type="text" name='slug' placeholder='your-slug-here' />
        <input type='text' name='imgUrl' placeholder='image-url' />
        <input type="text" name='details' placeholder='your course details here' />
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export default page
