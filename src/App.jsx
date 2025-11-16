import React, { useState } from 'react';
import { Send, CheckCircle, Plus, Trash2, Copy, Users, BookOpen } from 'lucide-react';

export default function QAApp() {
  // Shared state for questions and responses
  const [questions, setQuestions] = useState([
    {
      id: 'MATH01',
      question: 'What is the Pythagorean theorem and when would you use it?',
      createdAt: new Date().toISOString(),
      responses: []
    },
    {
      id: 'SCI02',
      question: 'Explain the process of photosynthesis in your own words.',
      createdAt: new Date().toISOString(),
      responses: []
    }
  ]);

  // View mode: 'student' or 'teacher'
  const [viewMode, setViewMode] = useState('student');

  // Student view state
  const [code, setCode] = useState('');
  const [studentName, setStudentName] = useState('');
  const [answer, setAnswer] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [studentError, setStudentError] = useState('');

  // Teacher view state
  const [showForm, setShowForm] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [teacherError, setTeacherError] = useState('');
  const [copiedCode, setCopiedCode] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // STUDENT FUNCTIONS
  const handleCodeSubmit = () => {
    const upperCode = code.toUpperCase().trim();
    const question = questions.find(q => q.id === upperCode);
    
    if (question) {
      setCurrentQuestion(question);
      setStudentError('');
      setSubmitted(false);
    } else {
      setStudentError('Invalid code. Please check with your teacher.');
      setCurrentQuestion(null);
    }
  };

  const handleAnswerSubmit = () => {
    if (!studentName.trim() || !answer.trim()) {
      setStudentError('Please enter both your name and answer.');
      return;
    }

    // Save the response
    const response = {
      studentName: studentName.trim(),
      answer: answer.trim(),
      timestamp: new Date().toISOString()
    };

    // Update the questions array with the new response
    setQuestions(questions.map(q => 
      q.id === currentQuestion.id 
        ? { ...q, responses: [...q.responses, response] }
        : q
    ));

    setSubmitted(true);
    setStudentError('');
  };

  const handleNewQuestion = () => {
    setCode('');
    setStudentName('');
    setAnswer('');
    setCurrentQuestion(null);
    setSubmitted(false);
    setStudentError('');
  };

  // TEACHER FUNCTIONS
  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleAutoGenerateCode = () => {
    let code;
    do {
      code = generateRandomCode();
    } while (questions.some(q => q.id === code));
    setNewCode(code);
  };

  const handleCreateQuestion = () => {
    if (!newCode.trim() || !newQuestion.trim()) {
      setTeacherError('Please enter both a code and a question.');
      return;
    }

    const upperCode = newCode.toUpperCase().trim();

    if (questions.some(q => q.id === upperCode)) {
      setTeacherError('This code already exists. Please use a different code.');
      return;
    }

    const question = {
      id: upperCode,
      question: newQuestion.trim(),
      createdAt: new Date().toISOString(),
      responses: []
    };

    setQuestions([...questions, question]);
    setNewCode('');
    setNewQuestion('');
    setTeacherError('');
    setShowForm(false);
  };

  const handleDeleteQuestion = (codeToDelete) => {
    setQuestions(questions.filter(q => q.id !== codeToDelete));
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const handleViewResponses = (question) => {
    setSelectedQuestion(question);
  };

  const handleBackToQuestions = () => {
    setSelectedQuestion(null);
  };

  // STUDENT VIEW
  const StudentView = () => (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
        Student Q&A
      </h1>

      {!currentQuestion && !submitted && (
        <div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter your question code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCodeSubmit()}
                placeholder="e.g., MATH01"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg uppercase"
                maxLength={10}
              />
            </div>
            
            {studentError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {studentError}
              </div>
            )}

            <button
              onClick={handleCodeSubmit}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Get Question
            </button>
          </div>
        </div>
      )}

      {currentQuestion && !submitted && (
        <div>
          <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
            <div className="text-sm text-indigo-600 font-medium mb-2">
              Question Code: {currentQuestion.id}
            </div>
            <div className="text-lg text-gray-800">
              {currentQuestion.question}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Answer
              </label>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here..."
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />
            </div>

            {studentError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {studentError}
              </div>
            )}

            <button
              onClick={handleAnswerSubmit}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <Send size={20} />
              Submit Answer
            </button>
          </div>

          <button
            onClick={handleNewQuestion}
            className="w-full mt-3 text-indigo-600 py-2 hover:text-indigo-800 transition-colors"
          >
            ← Back to enter code
          </button>
        </div>
      )}

      {submitted && (
        <div className="text-center py-8">
          <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Answer Submitted!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you, {studentName}. Your teacher will review your answer.
          </p>
          <button
            onClick={handleNewQuestion}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Answer Another Question
          </button>
        </div>
      )}
    </div>
  );

  // RESPONSE VIEWER
  const ResponseViewer = ({ question }) => (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <button
        onClick={handleBackToQuestions}
        className="text-purple-600 hover:text-purple-700 font-medium mb-6 flex items-center gap-2"
      >
        ← Back to Questions
      </button>

      <div className="mb-6 p-6 bg-purple-50 rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-md font-mono font-bold">
            {question.id}
          </span>
          <span className="text-sm text-gray-500">
            {question.responses.length} response{question.responses.length !== 1 ? 's' : ''}
          </span>
        </div>
        <p className="text-lg text-gray-800">{question.question}</p>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-4">Student Responses</h2>

      {question.responses.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No responses yet. Share code <span className="font-mono font-bold">{question.id}</span> with your students.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {question.responses.map((response, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {response.studentName}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {new Date(response.timestamp).toLocaleString()}
                  </p>
                </div>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-md text-xs font-medium">
                  Submitted
                </span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-wrap">{response.answer}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // TEACHER VIEW
  const TeacherView = () => (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-purple-600">
          Teacher Dashboard
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          New Question
        </button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 bg-purple-50 rounded-lg border-2 border-purple-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Create New Question</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  placeholder="e.g., MATH03"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent uppercase"
                  maxLength={10}
                />
                <button
                  onClick={handleAutoGenerateCode}
                  className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap"
                >
                  Auto-Generate
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Students will use this code to access the question
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question
              </label>
              <textarea
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Enter your question here..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
            </div>

            {teacherError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {teacherError}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleCreateQuestion}
                className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Create Question
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setNewCode('');
                  setNewQuestion('');
                  setTeacherError('');
                }}
                className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Your Questions ({questions.length})
        </h2>

        {questions.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="mb-4">No questions yet.</p>
            <button
              onClick={() => setShowForm(true)}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Create your first question →
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {questions.map((q) => (
              <div
                key={q.id}
                className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-md font-mono font-bold text-sm">
                        {q.id}
                      </span>
                      <button
                        onClick={() => handleCopyCode(q.id)}
                        className="text-gray-400 hover:text-purple-600 transition-colors"
                        title="Copy code"
                      >
                        {copiedCode === q.id ? (
                          <CheckCircle size={18} className="text-green-500" />
                        ) : (
                          <Copy size={18} />
                        )}
                      </button>
                      <span className="text-sm text-gray-500">
                        {q.responses.length} response{q.responses.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <p className="text-gray-800 text-lg mb-3">{q.question}</p>
                    <p className="text-xs text-gray-400 mb-3">
                      Created {new Date(q.createdAt).toLocaleString()}
                    </p>
                    <button
                      onClick={() => handleViewResponses(q)}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                    >
                      View Responses
                    </button>
                  </div>
                  <button
                    onClick={() => handleDeleteQuestion(q.id)}
                    className="text-red-400 hover:text-red-600 transition-colors p-2"
                    title="Delete question"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        {/* View Mode Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg shadow-md p-1 flex gap-1">
            <button
              onClick={() => setViewMode('student')}
              className={`px-6 py-3 rounded-md font-medium transition-colors flex items-center gap-2 ${
                viewMode === 'student'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BookOpen size={20} />
              Student View
            </button>
            <button
              onClick={() => setViewMode('teacher')}
              className={`px-6 py-3 rounded-md font-medium transition-colors flex items-center gap-2 ${
                viewMode === 'teacher'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Users size={20} />
              Teacher View
            </button>
          </div>
        </div>

        {/* Render appropriate view */}
        {viewMode === 'student' ? (
          <StudentView />
        ) : selectedQuestion ? (
          <ResponseViewer question={selectedQuestion} />
        ) : (
          <TeacherView />
        )}
      </div>
    </div>
  );
}
