interface TodoInterface {
  id: number;
  isActive?: boolean;
  isArchived?: boolean;
  createDateTime?: Date;
  createdBy?: string | null;
  lastChangedDateTime?: Date;
  lastChangedBy?: string | null;
  title?: string;
  description?: string | null;
  isCompleted?: boolean;
  dueDate?: Date | null;
  priority?: 'low' | 'medium' | 'high';
  internalComment?: string | null;
  parentTodoId?: number | null;
  parentId?: number;
  userId?: number;
  order?: number;
}

export default TodoInterface;
