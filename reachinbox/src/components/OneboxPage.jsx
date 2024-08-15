import React, { useEffect, useState } from 'react';


const OneboxPage = () => {
  const [Items, setItems] = useState(null);
  const [threads, setThreads] = useState([]);
  const [selectedThreadId, setSelectedThreadId] = useState(null);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState('');


  useEffect(() => {
    fetch('/onebox/list')
      .then(response => {
        console.log(response); // Log the entire response object
        return response.text(); // Get the raw text of the response
      })
      .then(text => {
        console.log('Response Text:', text); // Log the raw response text
        try {
          const data = JSON.parse(text); // Try parsing it as JSON
          setItems(data);
        } catch (error) {
          console.error('Parsing error:', error);
        }
      })
      .catch(error => console.error('Fetch error:', error));
  }, []);
  

  useEffect(() => {
    fetch('/onebox/list')
      .then(response => {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return response.json(); // Parse as JSON if content-type is application/json
        } else {
          return response.text(); // Otherwise, return text
        }
      })
      .then(data => {
        if (typeof data === 'string') {
          console.error('Non-JSON response:', data);
        } else {
          setItems(data); // Process JSON data
        }
      })
      .catch(error => console.error('Fetch error:', error));
  }, []);

  useEffect(() => {
    fetch('/onebox/list')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setItems(data))
      .catch(error => console.error('Fetch error:', error));
  }, []);
  
  

  const handleThreadSelect = (threadId) => {
    setSelectedThreadId(threadId);
  };

  const handleReplyOpen = () => {
    setReplyOpen(true);
  };

  const handleReplySend = () => {
    fetch(`/reply/${selectedThreadId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'email',
        to: 'email',
        subject: '',
        body: replyText,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    setReplyOpen(false);
    setReplyText('');
  };

  const handleDeleteThread = (threadId) => {
    fetch(`/onebox/${threadId}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then((data) => console.log(data));
    setThreads(threads.filter((thread) => thread.id !== threadId));
  };

  const handleKeyPress = (event) => {
    if (event.key === 'd') {
      handleDeleteThread(selectedThreadId);
    } else if (event.key === 'r') {
      handleReplyOpen();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-lg font-bold mb-2">OneBox</h2>
        <ul>
          {threads.map((thread) => (
            <li key={thread.id}>
              <button
                onClick={() => handleThreadSelect(thread.id)}
                className="block w-full p-2 mb-2 border border-gray-300 rounded-lg"
              >
                {thread.subject}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedThreadId && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-lg font-bold mb-2">Thread {selectedThreadId}</h2>
          <button
            onClick={() => handleDeleteThread(selectedThreadId)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Delete
          </button>
          {replyOpen && (
            <div>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="block w-full p-2 mb-2 border border-gray-300 rounded-lg"
              />
              <button
                onClick={handleReplySend}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Send
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OneboxPage;
