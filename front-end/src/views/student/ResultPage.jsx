import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const ResultPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (userInfo?.role === "teacher") {
          const res = await axiosInstance.get("/api/users/results/all", {
            withCredentials: true,
          });
          setResults(res.data.data);
        } else {
          const res = await axiosInstance.get("/api/users/results/user", {
            withCredentials: true,
          });
          setResults(res.data.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch data");
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userInfo]);

  const handleViewCode = (result) => {
    setSelectedResult(result);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">{error}</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {userInfo?.role === "teacher" ? "Results Dashboard" : "My Exam Results"}
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-gray-600 font-medium">Total Exams</h2>
          <p className="text-3xl font-bold">{results.length}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-gray-600 font-medium">Average Score</h2>
          <p className="text-3xl font-bold">
            {results.length > 0
              ? `${(
                  results.reduce((a, c) => a + c.percentage, 0) / results.length
                ).toFixed(1)}%`
              : "0%"}
          </p>
        </div>
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-gray-600 font-medium">Total Submissions</h2>
          <p className="text-3xl font-bold">
            {results.reduce(
              (acc, curr) => acc + (curr.codingSubmissions?.length || 0),
              0
            )}
          </p>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
            <tr>
              {userInfo?.role === "teacher" && <th className="p-3">Student</th>}
              <th className="p-3">Exam</th>
              <th className="p-3">Score</th>
              <th className="p-3">Total Marks</th>
              <th className="p-3">Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr
                key={result._id}
                className="border-b hover:bg-gray-50 text-sm"
              >
                {userInfo?.role === "teacher" && (
                  <td className="p-3">{result.userId?.name}</td>
                )}
                <td className="p-3">{result.examId?.examName || "Exam"}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs ${
                      result.percentage >= 70 ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  >
                    {result.percentage.toFixed(1)}%
                  </span>
                </td>
                <td className="p-3">{result.totalMarks}</td>
                <td className="p-3">
                  {new Date(result.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">
                  {result.codingSubmissions?.length > 0 && (
                    <button
                      onClick={() => handleViewCode(result)}
                      className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                    >
                      View Code
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code View Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-3xl">
            <h2 className="text-xl font-semibold mb-4">
              Code Submissions
            </h2>
            <div className="max-h-[500px] overflow-y-auto">
              {selectedResult?.codingSubmissions?.map((submission, i) => (
                <div key={i} className="mb-6">
                  <h3 className="text-lg font-medium mb-2">
                    Question {i + 1} ({submission.language})
                  </h3>
                  <SyntaxHighlighter
                    language={submission.language}
                    style={docco}
                  >
                    {submission.code}
                  </SyntaxHighlighter>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultPage;
