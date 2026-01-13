import { useState } from 'react'

function App() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [userAnswers, setUserAnswers] = useState({})

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    // Reset data when a new file is picked
    setData(null)
    setUserAnswers({})
  }

  const handleUpload = async () => {
    if (!file) return;
    
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      // Use the environment variable if it exists, otherwise use your Render link
      const baseUrl = import.meta.env.VITE_API_URL || 'https://sdg4-ai-agent.onrender.com';
      
      const response = await fetch(`${baseUrl}/upload-textbook`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) throw new Error('Network response was not ok');

      const result = await response.json();
      
      // 2. SAFETY PARSE: Preventing the "White Screen" by ensuring quiz is an array
      let parsedQuiz = [];
      if (result.quiz) {
        try {
          // If result.quiz is a string, parse it; if it's already an object, use it
          parsedQuiz = typeof result.quiz === 'string' ? JSON.parse(result.quiz) : result.quiz;
        } catch (e) {
          console.error("Quiz parsing failed:", e);
          parsedQuiz = [];
        }
      }

      setData({
        ...result,
        quiz: Array.isArray(parsedQuiz) ? parsedQuiz : [] 
      });

    } catch (error) {
      console.error('Error uploading file:', error);
      alert("Could not connect to the AI Backend. Check if main.py is running on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = (questionIdx, option) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIdx]: option
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-center text-gray-800 mb-4">
            SDG 4: Quality Education
          </h1>
          <p className="text-xl text-center text-gray-600 mb-12">
            AI-Powered Textbook Simplifier & Quiz Generator
          </p>
          
          <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Textbook PDF
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-indigo-50 file:text-indigo-700
                  hover:file:bg-indigo-100"
              />
            </div>
            
            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg
                font-semibold hover:bg-indigo-700 disabled:bg-gray-400
                disabled:cursor-not-allowed transition-colors shadow-md"
            >
              {loading ? 'AI is analyzing text...' : 'Process Textbook'}
            </button>
          </div>

          {/* Results Display */}
          {data && (
            <div className="space-y-8 animate-in fade-in duration-700">
              
              {/* Summary Section */}
              <div className="bg-white rounded-xl shadow-lg p-8 border-l-8 border-green-500">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">Kid-Friendly Summary</h2>
                  {data.mode === 'demo/fallback' && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-bold">DEMO MODE</span>
                  )}
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {data.summary}
                </p>
              </div>

              {/* Quiz Section */}
              <div className="bg-white rounded-xl shadow-lg p-8 border-l-8 border-indigo-500">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Interactive Quiz</h2>
                <div className="space-y-8">
                  {data.quiz.map((q, idx) => (
                    <div key={idx} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                      <p className="text-lg font-semibold text-gray-800 mb-4">
                        {idx + 1}. {q.question}
                      </p>
                      <div className="grid grid-cols-1 gap-3">
                        {q.options.map((opt) => {
                          const isSelected = userAnswers[idx] === opt;
                          const isCorrect = opt === q.answer;
                          
                          let btnStyle = "w-full text-left p-4 rounded-lg border-2 transition-all ";
                          if (!isSelected) {
                            btnStyle += "bg-white border-gray-200 hover:border-indigo-300";
                          } else {
                            btnStyle += isCorrect 
                              ? "bg-green-100 border-green-500 text-green-800 font-bold" 
                              : "bg-red-100 border-red-500 text-red-800 font-bold";
                          }

                          return (
                            <button
                              key={opt}
                              onClick={() => handleOptionClick(idx, opt)}
                              className={btnStyle}
                            >
                              <span className="flex justify-between items-center">
                                {opt}
                                {isSelected && (isCorrect ? ' ✅' : ' ❌')}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App



