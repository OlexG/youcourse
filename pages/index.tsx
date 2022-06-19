import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { TailSpin } from 'react-loader-spinner'

import { Header } from '../components/Header'
import { useFetchTopCourses } from '../lib/useFetchTopCourses'

const Home: NextPage = () => {
  const { courses, loading } = useFetchTopCourses();  
  
  return (
    <div>
      <Head>
        <title>YouCode</title>
        <meta name="description" content="The number one open source code tutorial platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen min-h-fit w-screen bg-green-400">
        <Header />
        <div className="p-6 overflow-x-hidden">
          <div className="w-full flex flex-row gap-5 flex-wrap">
            {
              !loading && courses && courses.map((course, index) => {
                // show thumnail of firt video
                let linkId;
                if (course.items[0].type === "video") {
                  const link = course.items[0].link!;
                  if (link.split("=")[1]) {
                    linkId = link.split("=")[1];
                  } else {
                    linkId = link.split("/")[4];
                  }
                }
                return <Link href={`/courses/${course._id}`} key={index}>
                  <div className="flex flex-col items-center flex-shrink-0 hover:opacity-50 transition ease-in delay-50 cursor-pointer">
                    <Image src={`http://img.youtube.com/vi/${linkId}/maxresdefault.jpg`} alt="thumbnail" width={320} height={180} className="rounded flex-shrink-0"/>
                    <button className="text-green-800 font-semibold text-lg">
                      {course.title}
                    </button>
                    <p className="text-green-800">By {course.author}</p>
                  </div>
                </Link>
                })
            }
            {
              loading && 
              <div className="w-screen flex flex-row items-center justify-center">
                <TailSpin color="white" />
              </div>
            }
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
