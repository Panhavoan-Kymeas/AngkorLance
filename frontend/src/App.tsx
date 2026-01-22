import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center gap-8">
      <div className="flex gap-10">
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img
            src={viteLogo}
            alt="Vite logo"
            className="h-24 w-24 hover:scale-110 transition-transform"
          />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img
            src={reactLogo}
            alt="React logo"
            className="h-24 w-24 hover:scale-110 transition-transform"
          />
        </a>
      </div>

      <h1 className="text-4xl font-bold">Vite + React</h1>

      <div className="bg-slate-900 rounded-xl p-6 flex flex-col items-center gap-4 shadow-lg">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 transition-colors font-medium"
        >
          count is {count}
        </button>

        <p className="text-sm text-slate-400">
          Edit <code className="text-indigo-400">src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <p className="text-xs text-slate-500">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
