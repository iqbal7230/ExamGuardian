import { Link } from "react-router-dom";
import ErrorImg from "../../assets/images/backgrounds/404-error-idea.gif";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <div className="max-w-md w-full">
        <img
          src={ErrorImg}
          alt="404"
          className="w-full max-w-xs mx-auto"
        />
        <h1 className="text-5xl font-bold mt-6">Oops!!!</h1>
        <h2 className="text-2xl text-gray-600 mt-4">
          The page you are looking for could not be found.
        </h2>
        <Link
          to="/"
          className="mt-6 inline-block bg-blue-600 text-white font-medium py-2 px-6 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
