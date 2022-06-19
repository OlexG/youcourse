import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { TailSpin } from 'react-loader-spinner'

import { Header } from '../components/Header'
import { useFetchTopCourses } from '../lib/useFetchTopCourses'
import { addItem } from "../lib/api";
import { useState } from 'react'
import { useUsername } from '../lib/useUsername'

function filter(text: string) {
  return text.replace("watch?v=", "embed/");
}

const Create: NextPage = () => {
  const username = useUsername()

  const [title, setTitle] = useState<string>("");
  const [nextItem, setNextItem] = useState<string>("");
  const [items, setItems] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  function addVideo() {
    setItems([...items, { type: "video", link: filter(nextItem) }]);
    setNextItem("");
  }
  function addTextBlurb() {
    setItems([...items, { type: "text", text: nextItem }]);
    setNextItem("");
  }

  function handleModalOpen() {
    setModalOpen(true);
  }

  function hideModal() {
    setModalOpen(false);
  }

  function handleCreate() {
    addItem({
      title,
      items,
      author: localStorage.getItem("username"),
    });
    setTitle("");
    setItems([]);
    setModalOpen(false);
    window.location.href = "/"
  }
  
  return (
    <div>
      <Head>
        <title>YouCode</title>
        <meta name="description" content="The number one open source code tutorial platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen min-h-fit w-screen bg-green-400">
        <Header />
        <div className="p-6 flex flex-col items-center gap-8 overflow-x-hidden">
          {username && (
            <>
              <input
                className="w-1/2 p-2 border-1 border-green-300 rounded-lg"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                className="w-1/2 p-2 flex-shrink-0 h-20 border-1 border-green-300 rounded-lg"
                placeholder="Text Blurb or Link"
                value={nextItem}
                onChange={(e) => setNextItem(e.target.value)}
              />
              {items.map((item, index) => {
                if (item.type === "video") {
                  return (
                    // add an iframe
                    <iframe
                      src={item.link}
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      className="rounded h-48 w-80 flex-shrink-0"
                      key={index}
                      title={item.link}
                    />
                  );
                } else {
                  return <p className="text-green-800">{item.text}</p>;
                }
              })}
              <div className="flex flex-row w-full justify-center gap-4">
                <button
                  className="flex flex-col items-center border-4 border-green-300 text-green-200 rounded-full w-28 h-28 hover:opacity-50 transition ease-in delay-50"
                  onClick={addVideo}
                >
                  <span className="text-6xl">+</span>
                  <span className="font-semibold text-lg">Video</span>
                </button>
                {items.length > 0 && (
                  <button
                    className="flex flex-col items-center border-4 border-green-300 text-green-200 rounded-full w-28 h-28 hover:opacity-50 transition ease-in delay-50"
                    onClick={addTextBlurb}
                  >
                    <span className="text-6xl">+</span>
                    <span className="font-semibold text-lg">Text Blurb</span>
                  </button>
                )}
              </div>
              {items.length > 0 && (
                <button
                  className="px-8 font-semibold text-xl text-green-200 border-2 border-green-200 p-4 rounded hover:opacity-50 transition ease-in delay-50"
                  onClick={handleModalOpen}
                >
                  Create
                </button>
              )}
              {modalOpen && (
                <div
                  className="absolute h-screen w-screen flex flex-row items-center justify-center top-0 left-0 bg-black"
                  style={{
                    background: "rgba(0,0,0,0.4)",
                  }}
                >
                  <div className="flex flex-col items-center justify-center bg-green-300 h-40 w-96 rounded-lg">
                    <p className="p-4 text-white font-semibold text-lg text-center">
                      Are you sure you want to create this course?
                    </p>
                    <div className="w-full flex flex-row gap-2 justify-center items-center">
                      <button
                        className="h-10 w-32 text-lg font-semibold text-white border-2 border-white rounded-lg hover:opacity-50 transition ease-in delay-50"
                        onClick={handleCreate}
                      >
                        Create
                      </button>
                      <button
                        className="h-10 w-32 text-lg font-semibold text-white border-2 border-white rounded-lg hover:opacity-50 transition ease-in delay-50"
                        onClick={hideModal}
                      >
                        Keep Editing
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          {
            !username && (
              <p className="text-white text-lg font-semibold">
                You must be logged in to create a course. Please login
              </p>
            )
          }
        </div>
      </main>
    </div>
  )
}

export default Create
