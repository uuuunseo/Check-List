import "./ToDoTemplate.scss";

function TodoTemplate({children, checkedCount}) {
    console.log('Checked Count:', checkedCount); // 로그 추가
    return (
        <div className="TodoTemplate">
            <div className="app-title">Check List 🍀</div>
            <div className="checked-count">지금까지 모은 🍀: {checkedCount}</div>
            <div className="content">{children}</div>
        </div>
    )
}

export default TodoTemplate;