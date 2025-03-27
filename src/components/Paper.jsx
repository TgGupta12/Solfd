import React, { useEffect } from 'react'
import {useSelector} from "react-redux"
function Paper() {
  const subjects=useSelector((state)=>state.subject.value);
  useEffect(()=>{
    console.log(subjects)
  })
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center mb-4">Previous Year Papers</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3 text-left">Year</th>
              <th className="p-3 text-left">Exam</th>
              <th className="p-3 text-left">Question Paper</th>
              <th className="p-3 text-left">Solution</th>
            </tr>
          </thead>
          <tbody>
            {subjects.length > 0 ? (
              subjects.map((subject, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="p-3">{subject.year}</td>
                  <td className="p-3">{subject.exam}</td>
                  <td className="p-3">
                    <a
                      href={subject.queUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Paper
                    </a>
                  </td>
                  <td className="p-3">
                    <a
                      href={subject.solUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline"
                    >
                      View Solution
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-3">
                  No papers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Paper
