import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AllRecords from './AllRecords'
import RecordForm from './RecordForm'
import { Toaster } from 'react-hot-toast'

export default function App() {
  return (
    <div>
      <h1>Hello User Form</h1>
      <Routes>
        <Route path="/" element={<RecordForm />} />
        <Route path="/all" element={<AllRecords />} />
      </Routes>
      <Toaster />
    </div>
  )
}
