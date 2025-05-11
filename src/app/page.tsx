import { TextLoopBasic } from "@/components/BasicLoop";
import { TextLoop } from "../../components/motion-primitives/text-loop";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default async function Home() {
  return (
    <div>
      <section className="hero">
      <h1 className="text-6xl font-bold text-center mt-25 mx-3">Welcome to Learnofy</h1>
      <h1 className=" text-3xl text-center mt-3 mx-3">We are offering Free Courses to enhance your skills</h1>
      <h2 className="text-2xl font-extrabold text-center my-4">Learn with us</h2>
      <TextLoopBasic />
      <h2 className="text-center mt-5">Explore More!</h2>
      <div className="flex justify-center space-x-4 mt-2">
      <Link href={'/blog'}><Button>Blogs</Button></Link>
      <Link href={'/courses'}><Button>Course</Button></Link>
      </div>
      </section>
    </div>
  );
}
