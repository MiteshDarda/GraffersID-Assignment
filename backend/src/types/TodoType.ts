type TodoType = {
  id: string; // Unique identifier for the todo
  title: string; // Title of the todo
  description?: string; // Optional description
  isCompleted: boolean; // Status of the todo
  subTodos?: TodoType[]; // Array of nested todos
  dueDate?: number; // Optional due date
  priority?: 'low' | 'medium' | 'high'; // Optional priority
  createdAt: number; // Timestamp for creation
  updatedAt: number; // Timestamp for last update
};

export default TodoType;
