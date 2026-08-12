import { useState } from 'react'
import Loader from '@/components/Loader'
import { useFetchTodos, useCreateTodo } from '@/hooks/todo'
import type { Todo } from '@/hooks/todo'
import TodoItem from '@/components/todos/TodoItem'

export default function Todos() {
  const [title, setTitle] = useState('')
  const { data: todos = [] } = useFetchTodos()
  const { mutateAsync, isPending } = useCreateTodo()

  function createTodo() {
    if (!title.trim()) return
    const newTodo = {
      id: Math.random().toString(),
      title
    } as Todo
    mutateAsync(newTodo)
  }

  return (
    <>
      <div>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={e => {
            if (e.nativeEvent.isComposing) return // 한글 중복 입력 이슈
            if (e.key === 'Enter') createTodo()
          }}
        />
        <button onClick={() => createTodo()}>
          {isPending ? <Loader className="relative inline-block" /> : '추가'}
        </button>
      </div>
      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}></TodoItem>
        ))}
      </ul>
    </>
  )
}
