import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { TailSpin } from 'react-loader-spinner'

import { Header } from '../../components/Header'
import { useFetchTopCourses } from '../../lib/useFetchTopCourses'

const Course: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { courses, loading } = useFetchTopCourses();
  const [page, setPage] = useState(0);

  const {title, items} = courses?.find((item)=>{
    return item._id === id
  }) || {title: "", items: [{type: "video", link: "https://www.youtube.com/embed/dQw4w9WgXcQ"}]}

  const { type, link, text } = items[page]

    
  return (
    <div>
      <Head>
        <title>YouCode</title>
        <meta name="description" content="The number one open source code tutorial platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen min-h-fit w-screen bg-green-400">
        <Header />
        {
          loading ?
          <div className="w-screen flex flex-row items-center justify-center">
            <TailSpin color="white" />
          </div>
          :
          <div className="p-10 h-full flex flex-col items-center gap-10 text-white">
            <p className="text-5xl">{title}</p>
            {
              type === "video"?
              <iframe width="768" height="432" src={link} title="title"/>
              :
              <div className="max-w-3xl w-full text-center text-xl">
                <p>{text}</p>
              </div>
            }
            <div className="flex items-center gap-10 mt-auto text-xl">
              {
                page > 0 ?
                <button onClick={()=>{
                  setPage(page-1)
                }}>Previous</button>
                :null
              }
              {
                page+1 < items.length ?
                <button onClick={()=>{
                  setPage(page+1)
                }}>Next</button>
                :null
              }
            </div>
          </div>
        }
      </main>
    </div>
  )
}

export default Course
