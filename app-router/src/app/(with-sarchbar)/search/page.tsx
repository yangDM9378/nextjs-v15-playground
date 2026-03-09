import React from 'react'

export default async function Page({searchParams,}:{saarchParams: Promise<{q:string}>}) {
  
  const {q} = await searchParams
  return (
    <div>Search 페이지 : {q}</div>
  )
}
