/* eslint-disable react/prop-types */
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const TaskCard = ({ task }) => {
  const { dark } = useContext(AuthContext);
  if (!task) return null;

  const { title, category, description } = task;

  return (
    <div
      className={`p-5 rounded-2xl shadow-lg transition-all duration-300 cursor-pointer border 
      ${dark ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-200 border-gray-300 text-black"} 
      hover:scale-105 hover:shadow-2xl`}
    >
      <h1 className="font-bold text-2xl mb-2 truncate">{title}</h1>

      <p className="text-sm opacity-80 mb-4">{description}</p>

      <div className="flex justify-between items-center">
        <button
          className={`py-1 px-5 rounded-3xl font-semibold text-white text-sm 
          ${category === "To-Do" ? "bg-green-500" : category === "In Progress" ? "bg-orange-500" : "bg-blue-500"}`}
        >
          {category}
        </button>

        <div className="flex gap-3 items-center">
          <button
            className="p-2 rounded-full text-xl transition-all duration-200 hover:scale-110 
            bg-gray-600 text-red-400 hover:bg-red-600 hover:text-white"
          >
            <MdDelete />
          </button>
          <button
            className="p-2 rounded-full text-xl transition-all duration-200 hover:scale-110 
            bg-gray-600 text-blue-400 hover:bg-blue-600 hover:text-white"
          >
            <FaPencilAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
