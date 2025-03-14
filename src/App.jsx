import { useState, useEffect } from 'react'
import Editor from 'react-simple-code-editor'
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-dark.css";
import axios from "axios"
import Markdown from "react-markdown"

function App() {

  const [code, setcode] = useState(``);

    const [review, setReview] = useState(``)

    async function reviewCode() { 
      const response = axios.post('http://localhost:3000/ai/get-review', { code });
      setReview((await response).data)
    }

  return (
    <>
     <main className='w-full h-screen bg-zinc-800'>
        <div className='flex p-5 gap-4 h-full'>
          <div className="relative  left w-1/2 h-full bg-black rounded-xl border-3 border-white">
            <div className='code text-white font-semibold p-5'>
            <Editor
              value={code}
              onValueChange={(code) => setcode(code)}
              padding={14}
              highlight={(code) => Prism.highlight(code, Prism.languages.javascript, "javascript")}
              style={{
                backgroundColor: "grey",
                fontSize: 12,
                width: "100%",
                height: "100%",
                color: "white",
                borderRadius: "8px",
                }}
              />
            </div>
            <button onClick={reviewCode} className='absolute cursor-pointer bottom-3 right-3 rounded-md btn px-5 font-bold bg-blue-800 text-white py-2'>Review</button>
          </div>
          <div className="right w-1/2 h-full border-3 border-white overflow-y-auto bg-zinc-900 rounded-xl">
            <div className='code text-white text-sm p-5'>
              <Markdown>{review}</Markdown>
            </div>
          </div>
        </div>
     </main>
    </>
  )
}

export default App
