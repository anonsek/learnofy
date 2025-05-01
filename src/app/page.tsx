import { TextLoopBasic } from "@/components/BasicLoop";
import { TextLoop } from "../../components/motion-primitives/text-loop";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";


export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <>
      <p>login please</p>
      <Link href={'/signin'}><Button>Login</Button></Link>
      </>
    )
  }
  return (
    <div>
      <section className="hero">
      <h1 className="text-6xl font-bold text-center mt-25 mx-3">Welcome to Learnofy</h1>
      <h1 className=" text-3xl text-center mt-3 mx-3">We are offering Free Courses to enhance your skills</h1>
      <h2 className="text-2xl font-extrabold text-center my-4">Learn with us</h2>
      <TextLoopBasic />
      <h2 className="text-center mt-5">Explore More!</h2>
      <div className="flex justify-center space-x-4 mt-2">
        {session && <h2 className="text-center mt-5">Welcome {session?.user?.name}</h2>}
      <Link href={'/blog'}><Button>Blogs</Button></Link>
      <Link href={'/courses'}><Button>Course</Button></Link>
      </div>
      </section>
    </div>
  );
}
