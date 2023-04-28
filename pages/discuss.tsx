import type { NextPage } from 'next'
import CreatePost from '../components/feed/CreatePost'
import Feed from '../components/feed'
import useSWR from 'swr'
import { useState, useEffect } from 'react'

const style = {
  wrapper: `flex min-h-screen flex-col bg-black text-white`,
  main: `mx-auto flex w-full max-w-5xl flex-1 space-x-6 py-5 px-6`,
  content: `w-full space-y-4 lg:w-2/3`,
  infoContainer: `hidden w-1/3 lg:block`,
}

const Home: NextPage = () => {
  const [myPosts, setMyPosts] = useState([])
  //const fetcher = (url) => fetch(url).then((res) => res.json());
  const fetcher = (...args) =>   fetch(...args).then(res => res.json())
  const {data, error, isLoading } = useSWR('api/get-post', fetcher ,{refreshInterval: 200})
  
  //if (error) return "An error has occurred.";
  //if (isLoading) return "Loading...";
  useEffect (()=> {
    if (!data) return
    setMyPosts(data.data)
  },[data])

  return (
    <div className={style.wrapper}>

      <main className={style.main}>
        <div className={style.content}>
          <CreatePost />
          <Feed post={myPosts}/>
        </div>
        <div className={style.infoContainer}>
        </div>
      </main>
    </div>
  )
}

export default Home
