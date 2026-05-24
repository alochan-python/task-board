import { useEffect, useState } from 'react'
import type { Task } from '../types/task'
import { TaskItem } from './TaskItem'

const STORAGE_KEY = 'task-board-tasks'

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Task[]) : []
  } catch {
    return []
  }
}

export function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks)
  const [input, setInput] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    const text = input.trim()
    if (!text) return
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, completed: false },
    ])
    setInput('')
  }

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    )
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') addTask()
  }

  const remaining = tasks.filter((t) => !t.completed).length

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-lg">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
          Task Board
        </h1>

        {/* 入力フォーム */}
        <div className="mb-6 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="タスクを入力..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
          <button
            onClick={addTask}
            disabled={!input.trim()}
            className="rounded-lg bg-blue-500 px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            追加
          </button>
        </div>

        {/* タスクリスト */}
        {tasks.length === 0 ? (
          <p className="text-center text-sm text-gray-400">
            タスクがありません。追加してみましょう！
          </p>
        ) : (
          <>
            <ul className="space-y-2">
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              ))}
            </ul>
            <p className="mt-4 text-right text-xs text-gray-400">
              {remaining} / {tasks.length} 件 未完了
            </p>
          </>
        )}
      </div>
    </div>
  )
}
