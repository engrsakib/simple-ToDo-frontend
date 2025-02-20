/* eslint-disable react/prop-types */
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";

const TaskCard = ({task}) => {

    if(!task) return null;

    const {title, category, description} = task;

  return (
    <div className="border border-black p-3 rounded-lg shadow-lg bg-gray-400 cursor-pointer">
      <h1 className="font-bold text-xl">{title}</h1>

      <p className="mt-2">{description}</p>

      <div className="flex justify-between items-center mt-3">
        <div>
            <button 
            className={`bg-green-500 py-1 px-5 rounded-3xl font-semibold text-white ${category === 'To-Do' ? 'bg-green-500' : category === 'In Progress' ? 'bg-orange-500' : 'bg-blue-500'}`}
            >
              {category}
            </button>
        </div>

        <div className="flex gap-2 items-center">
            <button className="bg-gray-500 rounded-full p-2 text-xl text-red-800"><MdDelete /></button>
            <button className="bg-gray-500 rounded-full p-2 text-xl text-blue-800"><FaPencilAlt /></button>
        </div>
      </div>
    </div>
  )
}

export default TaskCard