import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs
import Todoadd from '../components/Todoadd_nav';
import '../assets/custom_todo.css';
import Sidebar from '../components/Sidebar'
// A little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

// Moves an item from one list to another list.
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

function DragDropTodo() {
    const [columns, setColumns] = useState({
        todo: {
          name: "To Do",
          items: []
        },
        inProgress: {
          name: "In Progress",
          items: []
        },
        completed: {
          name: "Completed",
          items: []
        }
    });
    const [newTask, setNewTask] = useState('');
    const addNewTask = () => {
        if (!newTask.trim()) return; // Check for empty input
    
        const newItem = {
          id: uuidv4(),
          content: newTask.trim(),
        };
    // Add the new item to the 'todo' column
    setColumns({
        ...columns,
        todo: {
            ...columns.todo,
            items: [...columns.todo.items, newItem]
        }
    });

    // Reset the input field
    setNewTask('');
};
const deleteTask = (columnId, index) => {
    const newItems = columns[columnId].items.filter((_, itemIndex) => itemIndex !== index);
    setColumns({
        ...columns,
        [columnId]: {
            ...columns[columnId],
            items: newItems,
        },
    });
};

//   const [columns, setColumns] = useState(columnsFromBackend);


  const onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        columns[source.droppableId].items,
        source.index,
        destination.index
      );

      const newState = {
        ...columns,
        [source.droppableId]: {
          ...columns[source.droppableId],
          items,
        },
      };

      setColumns(newState);
    } else {
      const result = move(
        columns[source.droppableId].items,
        columns[destination.droppableId].items,
        source,
        destination
      );

      const newState = {
        ...columns,
        [source.droppableId]: {
          ...columns[source.droppableId],
          items: result[source.droppableId],
        },
        [destination.droppableId]: {
          ...columns[destination.droppableId],
          items: result[destination.droppableId],
        },
      };

      setColumns(newState);
    }
  };
 
  return (
    <div className="flex h-screen">
        <div className="bg-gray-100  h-full fixed">
            <Sidebar />
        </div>
        <div className="flex flex-col flex-grow pl-20"> {/* pl-60 should be the width of the sidebar */}
            <Todoadd/>
            <div className="flex justify-center p-6">
                <input
                    className="task-input animate-fadeIn bg-white border-2 border-pink-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 rounded-lg shadow-md transition duration-150 ease-in-out"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Enter a task"
                />
                <button
                    className="add-task-btn animate-scaleUp bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-150 ease-in-out ml-2"
                    onClick={addNewTask}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex justify-around p-6">
                    {Object.entries(columns).map(([columnId, column], index) => (
                        <Droppable droppableId={columnId} key={columnId}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={`flex flex-col flex-grow bg-gray-100 p-4 m-2 rounded-md w-64 ${
                                        snapshot.isDraggingOver ? 'bg-blue-100' : 'bg-gray-100'
                                    }`}
                                >
                                    <h2 className="column-header text-lg font-bold text-gray-800">{column.name}</h2>
                                    {column.items.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={`task-card animate-fadeIn bg-white rounded shadow hover:shadow-lg p-3 m-2 flex justify-between items-center transition duration-150 ease-in-out ${snapshot.isDragging ? 'bg-blue-50' : ''}`}>
                                                
                                                    {item.content}
                                                    <button onClick={() => deleteTask(columnId, index)}  className="delete-task-btn bg-red-500 hover:bg-red-600 text-white rounded-full p-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                                                    </button>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </div>
    </div>
);
}

export default DragDropTodo;