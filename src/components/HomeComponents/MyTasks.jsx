import { useQuery } from "@tanstack/react-query";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"; // Updated import
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TaskCard from "./TaskCard";
import { useContext } from "react";
import { AuthContext } from './../../provider/AuthProvider';
import axios from "axios";
import useGetAllUsers from "../Dashboard/user/AllUsers/useGetAllUsers";

const MyTasks = () => {
  const{user, loadding, dark} = useContext(AuthContext);
  const { users, refetch, isPending } = useGetAllUsers(user);
  const queryClient = useQueryClient();

  // Fetch Tasks for different categories
  const { data: todoTask = [] } = useQuery({
    queryKey: ["todo-tasks", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:5000/add-task/getTodoTask/${users?.email}`);
      return data;
    }
  });

  const { data: inProgressTask = [] } = useQuery({
    queryKey: ["in-progress-tasks", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:5000/add-task/getInProgressTask/${users?.email}`);
      return data;
    }
  });

  const { data: doneTask = [] } = useQuery({
    queryKey: ["done-tasks", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:5000/add-task/getDoneTask/${users?.email}`);
      return data;
    }
  });

  // API call to update task category
  const { mutateAsync: updateTaskCategory } = useMutation({
    mutationFn: async ({ id, category }) => {
      await axios.patch(`http://localhost:5000/add-task/updateCategory/${id}`, { category });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todo-tasks"]);
      queryClient.invalidateQueries(["in-progress-tasks"]);
      queryClient.invalidateQueries(["done-tasks"]);
    }
  });

  // Handle Drag & Drop
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { destination, draggableId } = result;

    // Determine new category
    let newCategory = "";
    if (destination.droppableId === "todo") newCategory = "To-Do";
    if (destination.droppableId === "inProgress") newCategory = "In Progress";
    if (destination.droppableId === "done") newCategory = "Done";

    // Update task category using API call
    updateTaskCategory({ id: draggableId, category: newCategory });
  };

  return (
    <section>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* To-Do Section */}
          <Droppable droppableId="todo">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-300 p-4 rounded-lg min-h-screen"
              >
                <h1 className="text-center font-bold text-2xl mb-3">To Do</h1>
                <div className="flex flex-col gap-5">
                  {todoTask?.map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>

          {/* In Progress Section */}
          <Droppable droppableId="inProgress">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-300 p-4 rounded-lg min-h-screen"
              >
                <h1 className="text-center font-bold text-2xl mb-3">In Progress</h1>
                <div className="flex flex-col gap-5">
                  {inProgressTask?.map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>

          {/* Done Section */}
          <Droppable droppableId="done">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-300 p-4 rounded-lg min-h-screen"
              >
                <h1 className="text-center font-bold text-2xl mb-3">Done</h1>
                <div className="flex flex-col gap-5">
                  {doneTask?.map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>

        </div>
      </DragDropContext>
    </section>
  );
}

export default MyTasks;