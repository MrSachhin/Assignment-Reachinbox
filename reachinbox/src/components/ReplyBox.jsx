import React, { useState } from 'react';

function ReplyBox({ thread_id }) {
  const [reply, setReply] = useState({ from: '', to: '', subject: '', body: '' });

  const handleSendReply = () => {
    fetch(`/reply/${thread_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reply),
    })
      .then(response => response.json())
      .then(data => console.log('Reply sent:', data));
  };

  return (
    <div className="reply-box">
      <input
        type="email"
        placeholder="From"
        value={reply.from}
        onChange={(e) => setReply({ ...reply, from: e.target.value })}
      />
      <input
        type="email"
        placeholder="To"
        value={reply.to}
        onChange={(e) => setReply({ ...reply, to: e.target.value })}
      />
      <input
        type="text"
        placeholder="Subject"
        value={reply.subject}
        onChange={(e) => setReply({ ...reply, subject: e.target.value })}
      />
      <textarea
        placeholder="Body"
        value={reply.body}
        onChange={(e) => setReply({ ...reply, body: e.target.value })}
      />
      <button onClick={handleSendReply}>Send</button>
    </div>
  );
}

export default ReplyBox;
