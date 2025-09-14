import { Link } from "react-router-dom";


const Logo = () => {
  return (
    <Link
      to="/"
      className="flex items-center h-[70px] w-[200px] overflow-hidden mr-[30px]"
    >

      <span className="ml-4 text-xl font-bold text-blue-600">ExamGuardian</span>
      
    </Link>
  );
};

export default Logo;
