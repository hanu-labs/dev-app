import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const CodeInput = ({ invalid = false, value, onChange }) => {
  return (
    <textarea
      className={'code-input ' + (invalid ? 'invalid ' : '')}
      value={value}
      onChange={ev => onChange(ev.target.value)}
    />
  );
}

function App() {
  const [string, setString] = useState('');
  const [base64, setBase64] = useState('');
  const [invalids, setInvalids] = useState([]);

  const types = [
    {
      key: 'string',
      value: string,
    },
    {
      key: 'base64',
      value: base64,
    },
  ];
  
  useEffect(() => {
    updateValue('string', string);
  }, []);

  const updateValue = (type, value) => {
    const filtered = invalids.filter((filter) => filter !== type);
    try {
      if (type === 'base64') {
        setBase64(value);
        const newValue = value ? atob(value) : '';
        setString(newValue);
      }
      if (type === 'string') {
        setString(value);
        const newValue = value ? btoa(value) : '';
        setBase64(newValue);
      }
      setInvalids(filtered);
    } catch(err) {
      setInvalids([
        ...filtered,
        type,
      ]);
    }
  }

  return (
    <div className="App">
      {types.map((type) => (
      <div key={type.key}>
        {type.key}: <CodeInput
          invalid={invalids.includes(type.key)}
          value={type.value}
          onChange={(value) => updateValue(type.key, value)} /> 
      </div>
      ))}
      {string}
    </div>
  );
}

export default App;
