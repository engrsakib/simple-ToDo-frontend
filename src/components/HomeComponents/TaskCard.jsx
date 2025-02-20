import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

const TaskCard = ({ task, refetchDone, refetchInProgress, refetchTodo }) => {
  const { dark } = useContext(AuthContext);
  if (!task) return null;

  const { title, category, description } = task;

  const handleDelete = async (taskId) => {
    // SweetAlert
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        // axios.delete
        const response = await axios.delete(
          `http://localhost:5000/add-task/deleteTask/${taskId}`
        );

        if (response.status === 200) {
          // refetch all categories after deleting
         

          Swal.fire({
            title: "Deleted!",
            text: "Your task has been deleted.",
            icon: "success",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "There was an error deleting the task.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div
      className={`p-5 rounded-2xl shadow-lg transition-all duration-300 cursor-pointer border 
      ${dark
        ? "bg-gray-800 border-gray-700 text-white"
        : "bg-gray-200 border-gray-300 text-black"} 
      hover:scale-105 hover:shadow-2xl`}
    >
      <h1 className="font-bold text-2xl mb-2 truncate">{title}</h1>

      <p className="text-sm opacity-80 mb-4">{description}</p>

      <div className="flex justify-between items-center">
        <button
          className={`py-1 px-5 rounded-3xl font-semibold text-white text-sm 
          ${category === "To-Do"
            ? "bg-green-500"
            : category === "In Progress"
            ? "bg-orange-500"
            : "bg-blue-500"}`}
        >
          {category}
        </button>

        <div className="flex gap-3 items-center">
          <button
            className="p-2 rounded-full text-xl transition-all duration-200 hover:scale-110 
            bg-gray-600 text-red-400 hover:bg-red-600 hover:text-white"
            onClick={() => handleDelete(task._id)}
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
