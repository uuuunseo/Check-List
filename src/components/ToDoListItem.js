import React from 'react';
import './ToDoListItem.scss';
import cn from 'classnames';

function ToDoListItem({
  todo,
  onRemove,
  onToggle,
  onChangeSelectedTodo,
  onInsertToggle,
  style
}) {
  const { id, text, checked } = todo;
  return (
    <div className="TodoListItem-virtualized" style={style}>
      <li className="TodoListItem">
        <div
          className={cn('checkbox', { checked: checked })}
          onClick={() => onToggle(id)}
        >
          {checked ? "🍀" : "🏃‍♂️" }
          <div className="text">{text}</div>
        </div>
        <div
          className="edit"
          onClick={() => {
            onChangeSelectedTodo(todo);
            onInsertToggle();
          }}
        >
          수정
        </div>
        <div className="remove" onClick={() => onRemove(id)}>
          삭제
        </div>
      </li>
    </div>
  );
}

export default React.memo(ToDoListItem);
