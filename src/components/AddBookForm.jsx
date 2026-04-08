import { useState } from "react"

function AddBookForm({ onAdd }) {
  const [input, setInput] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim() === "") return
    onAdd(input)
    setInput("")
  }

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <input
        className="form-control mb-2"
        placeholder="Enter book title"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="btn btn-primary">Add Book</button>
    </form>
  )
}

export default AddBookForm