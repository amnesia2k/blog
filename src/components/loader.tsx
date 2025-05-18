import React from 'react'

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-[110px] w-[110px] border-b-[3px] border-primary" />
    </div>
  )
}
