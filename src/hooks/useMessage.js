import { useState } from 'react';

function useMessage() {
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');
  const [timeout, setTimeout] = useState(null);

  const updateMessage = (type, message) => {
    clearTimeout(timeout);
    setTimeout(
      setTimeout(() => {
        setMessage('');
      }, 5000)
    );
    setType(type);
    setMessage(message);
  };

  return [{ type, message }, updateMessage];
}

export default useMessage;
