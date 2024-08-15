import React, { useState } from 'react';

function CustomEditor() {
  const [content, setContent] = useState('');

  const handleSave = () => {
    console.log('Content saved:', content);
    // Add API call to save content
  };

  const handleInsertVariable = () => {
    const variable = prompt('Enter variable name:');
    setContent(content + `{{${variable}}}`);
  };

  return (
    <div id="editor-container">
      <div id="toolbar">
        <button onClick={handleSave}>SAVE</button>
        <button onClick={handleInsertVariable}>Variables</button>
      </div>
      <div
        id="editor"
        contentEditable
        dangerouslySetInnerHTML={{ __html: content }}
        onInput={(e) => setContent(e.currentTarget.innerHTML)}
      ></div>
    </div>
  );
}

export default CustomEditor;
