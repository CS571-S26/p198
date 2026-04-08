function VoteCard({ book, votes, onVote }) {
  return (
    <div className="card mb-2">
      <div className="card-body d-flex justify-content-between">
        <span>{book}</span>
        <button className="btn btn-success" onClick={onVote}>
          👍 {votes}
        </button>
      </div>
    </div>
  )
}

export default VoteCard