"use server"

import { prisma } from "../../lib/prisma";

export async function addCourse(formData:FormData) {
    await prisma.course.create({
        data:{
            slug: formData.get("slug") as string,
            name : formData.get("name") as string,
            imgUrl: formData.get("imgUrl") as string,
            details: formData.get("details") as string
        }
    })
}