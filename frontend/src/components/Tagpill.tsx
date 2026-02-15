import React from 'react'

const Tagpill = ({pills}) => {
  return (
   <>
      {pills.map((pill) => (
        <span key={pill.id} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">
          {pill.name}
        </span>
      ))}
 </>
  )
}

export default Tagpill
