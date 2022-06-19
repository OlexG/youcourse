import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUsername } from "../lib/useUsername";

export function Header() {  
  const [show, setShow] = useState(false)

  const username = useUsername()

  return (
    <nav className="flex items-center justify-between flex-wrap bg-green-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link href="/"><span className="cursor-pointer font-semibold text-xl tracking-tight">YouCourse</span></Link>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-green-200 border-green-400 hover:text-white hover:border-white" onClick={()=>{
          setShow(!show)
        }}>
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div className={`w-full ${show?'block': 'hidden'} flex-grow lg:flex lg:items-center lg:w-auto`}>
        <div className="text-sm lg:flex-grow">
          <Link href="/">
            <span className="cursor-pointer block mt-4 lg:inline-block lg:mt-0 text-green-200 hover:text-white mr-4">
              Discover
            </span>
          </Link>
          <Link href="/create">
            <span className="cursor-pointer block mt-4 lg:inline-block lg:mt-0 text-green-200 hover:text-white mr-4">
              Create
            </span>
          </Link>
        </div>
        {
          username
          ?
          <p className="font-semibold text-xl text-white hover:opacity-50 transition ease-in delay-50 hidden lg:block">
            {username}
          </p>
          :
          <Link href="/login">
            <p className="cursor-pointer inline-block text-sm mr-4 px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-green-500 hover:bg-white mt-4 lg:mt-0">
              Login
            </p>
          </Link>
        }
      </div>
    </nav>
  )
}