import type { Todo } from '@/hooks/todo'
import { useState } from 'react'

interface Props {
  todo: Todo
}

export default function TodoItem({ todo }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(todo.title)

  function onEditMode() {
    setIsEditing(true)
  }
  function offEditMode() {
    setIsEditing(false)
  }

  return (
    <li>
      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <button onClick={() => offEditMode()}>취소</button>
          <button>저장</button>
          <button>삭제</button>
        </>
      ) : (
        <>
          <h3>{todo.title}</h3>
          <button onClick={() => onEditMode()}>수정</button>
        </>
      )}
    </li>
  )
}
