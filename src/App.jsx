import { useState } from 'react';
import ToDo from './component/todo';
import './styles/style.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='main'>
      <header>
        <h1>To-Do</h1>
      </header>

      <div className="content">
        <ToDo/>
      </div>

      <ul>
        <li className="list-item">item1</li>
        <li className="list-item">item2</li>
        <li className="list-item">item3</li>
        <li className="list-item">item4</li>
        <li className="list-item">item5</li>
        <li className="list-item">item6</li>
        <li className="list-item">item7</li>
        <li className="list-item">item8</li>
        <li className="list-item">item9</li>
        <li className="list-item">item10</li>
      </ul>
    </div>
  )
}

export default App
