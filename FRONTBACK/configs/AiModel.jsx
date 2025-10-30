import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const CodegenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [],
});

export const GenAiCode = model.startChat({
  generationConfig: CodegenerationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate a to do app: Generate a Project in React. Create multiple components, use Tailwind CSS, and explain project structure. The app structure should work with an existing App.js in the root directory."
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `{
  "projectTitle": "React TODO App with Tailwind CSS",
  "explanation": "This project is a modern and responsive Todo application built with React and styled using Tailwind CSS. It uses React Context API for state management and includes reusable components for forms, lists, headers, and footers.",
  "files": {
    "App.js": {
      "code": "import React from 'react';\nimport Header from './components/Header';\nimport TodoForm from './components/TodoForm';\nimport TodoList from './components/TodoList';\nimport { TodoProvider } from './contexts/TodoContext';\n\nexport default function App() {\n  return (\n    <TodoProvider>\n      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-100'>\n        <Header />\n        <main className='container mx-auto p-4'>\n          <TodoForm />\n          <TodoList />\n        </main>\n      </div>\n    </TodoProvider>\n  );\n}"
    },
    "components/Header.js": {
      "code": "import React from 'react';\n\nexport default function Header() {\n  return (\n    <header className='bg-gradient-to-r from-blue-600 to-indigo-700 p-6 shadow-lg'>\n      <h1 className='text-5xl font-extrabold text-white'>My Awesome Todo App ✨</h1>\n    </header>\n  );\n}"
    },
    "components/TodoForm.js": {
      "code": "import React, { useState } from 'react';\nimport { useTodo } from '../contexts/TodoContext';\nimport { Plus } from 'lucide-react';\n\nexport default function TodoForm() {\n  const [inputText, setInputText] = useState('');\n  const [inputDueDate, setInputDueDate] = useState('');\n  const { addTodo } = useTodo();\n\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    if (inputText.trim()) {\n      addTodo(inputText, inputDueDate);\n      setInputText('');\n      setInputDueDate('');\n    }\n  };\n\n  return (\n    <form onSubmit={handleSubmit} className='mb-8 p-6 bg-white shadow-xl rounded-lg'>\n      <input type='text' placeholder='What needs to be done?' value={inputText} onChange={(e) => setInputText(e.target.value)} className='w-full p-3 border rounded-md' />\n      <input type='date' value={inputDueDate} onChange={(e) => setInputDueDate(e.target.value)} className='w-full p-3 border rounded-md mt-3' />\n      <button type='submit' className='mt-3 px-6 py-3 bg-blue-600 text-white rounded-md'>Add Todo</button>\n    </form>\n  );\n}"
    },
    "components/TodoList.js": {
      "code": "import React from 'react';\nimport { useTodo } from '../contexts/TodoContext';\nimport { Trash2, CheckCircle } from 'lucide-react';\n\nexport default function TodoList() {\n  const { todos, deleteTodo, toggleTodo } = useTodo();\n\n  return (\n    <div className='space-y-3'>\n      {todos.map(todo => (\n        <div key={todo.id} className='flex items-center gap-3 p-4 bg-white rounded-lg shadow'>\n          <button onClick={() => toggleTodo(todo.id)} className='flex-shrink-0'>\n            <CheckCircle className={todo.completed ? 'text-green-500' : 'text-gray-300'} />\n          </button>\n          <span className={todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}>{todo.text}</span>\n          <button onClick={() => deleteTodo(todo.id)} className='ml-auto'>\n            <Trash2 className='text-red-500' />\n          </button>\n        </div>\n      ))}\n    </div>\n  );\n}"
    },
    "contexts/TodoContext.js": {
      "code": "import React, { createContext, useContext, useState } from 'react';\n\nconst TodoContext = createContext();\n\nexport const TodoProvider = ({ children }) => {\n  const [todos, setTodos] = useState([]);\n\n  const addTodo = (text, dueDate = null) => {\n    setTodos([...todos, { id: Date.now(), text, dueDate, completed: false }]);\n  };\n\n  const deleteTodo = (id) => {\n    setTodos(todos.filter(todo => todo.id !== id));\n  };\n\n  const toggleTodo = (id) => {\n    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));\n  };\n\n  return (\n    <TodoContext.Provider value={{ todos, addTodo, deleteTodo, toggleTodo }}>\n      {children}\n    </TodoContext.Provider>\n  );\n};\n\nexport const useTodo = () => useContext(TodoContext);"
    }
  },
  "generatedFiles": ["App.js", "components/Header.js", "components/TodoForm.js", "components/TodoList.js", "contexts/TodoContext.js"]
}`
        },
      ],
    },
  ],
});