import React from "react";
import CheatingTable from "./components/CheatingTable";

const ExamLogPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800">Exam Logs</h1>
          <p className="text-lg text-gray-600 mt-2">
            Monitoring and cheating detection reports
          </p>
        </header>

        {/* Card Container */}
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Cheating Activity Logs
          </h2>
          <CheatingTable />
        </div>
      </div>
    </div>
  );
};

export default ExamLogPage;
