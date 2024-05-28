import { useState, useRef, useCallback, useEffect } from 'react';
import ToDoEdit from './components/ToDoEdit';
import ToDoInsert from './components/ToDoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/ToDoTemplate';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [selectedTodo, setSelectedTodo] = useState(null);
  const [insertToggle, setInsertToggle] = useState(false);
  const [checkedCount, setCheckedCount] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos).filter(todo => todo.checked).length : 0;
  });

  const nextId = useRef(todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1);

  useEffect(() => {
    // todos가 변경될 때마다 로컬 스토리지에 저장
    localStorage.setItem('todos', JSON.stringify(todos));
    // checkedCount 업데이트
    const newCheckedCount = todos.filter(todo => todo.checked).length;
    setCheckedCount(newCheckedCount);
    console.log('Checked Count Updated:', newCheckedCount);
  }, [todos]);

  const onInsertToggle = useCallback(() => {
    if (selectedTodo) {
      setSelectedTodo(null);
    }
    setInsertToggle(prev => !prev);
  }, [selectedTodo]);

  const onChangeSelectedTodo = (todo) => {
    setSelectedTodo(todo);
  };

  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    setTodos(todos => todos.concat(todo));
    nextId.current++;
  }, []);

  const onRemove = useCallback((id) => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  }, []);

  const onUpdate = useCallback(
    (id, text) => {
      onInsertToggle();
      setTodos(todos =>
        todos.map(todo => (todo.id === id ? { ...todo, text } : todo))
      );
    },
    [onInsertToggle]
  );

  const onToggle = useCallback((id) => {
    setTodos(todos => {
      const updatedTodos = todos.map(todo =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      );
      console.log('Updated todos:', updatedTodos);
      return updatedTodos;
    });
  }, []);

  return (
    <TodoTemplate checkedCount={checkedCount}>
      <ToDoInsert onInsert={onInsert} />
      <TodoList
        todos={todos}
        onToggle={onToggle}
        onRemove={onRemove}
        onChangeSelectedTodo={onChangeSelectedTodo}
        onInsertToggle={onInsertToggle}
      />
      {insertToggle && (
        <ToDoEdit
          onInsert={onInsert}
          selectedTodo={selectedTodo}
          onInsertToggle={onInsertToggle}
          onUpdate={onUpdate}
          insertToggle={insertToggle}
        />
      )}
    </TodoTemplate>
  );
}

export default App;
