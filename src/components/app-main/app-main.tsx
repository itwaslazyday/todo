import { KeyboardEvent } from 'react';
import { Task } from '../../types/types';
import './app-main.css';

type AppMainProps = {
  taskList: Task[];
  setTaskList: (task: Task[]) => void;
}

function AppMain ({taskList, setTaskList}: AppMainProps): JSX.Element {
  const handleFormSubmit = (evt: KeyboardEvent<HTMLInputElement>) => {
    if ((evt.keyCode === 10 || evt.keyCode === 13) && (evt.ctrlKey || evt.metaKey) && evt.currentTarget.value !== '') {
      setTaskList(
        [...taskList,
          {
            value: evt.currentTarget.value,
            isDone: false
          }
        ]
      );
      evt.currentTarget.value = '';
    }
  };

  const handleTaskRemove = (value: string) => {
    setTaskList(taskList.filter((task) => task.value !== value));
  };

  const handleTaskComplete = (value: string) => {
    const completedTask = taskList.find((task) => task.value === value) as Task;
    completedTask.isDone = !completedTask.isDone;
    setTaskList([...taskList]);
  };

  console.log(taskList);
  return (
    <main className='todo__main'>
      <h2 className='visually-hidden'>ToDo App - персональный список дел на каждый день.</h2>
      <form className='todo__form' action="" method="post" onSubmit={(evt) => evt.preventDefault()}>
        <input
          type="text"
          className='todo__input-field'
          placeholder='Whats needs to be done?'
          onKeyDown={(evt) => handleFormSubmit(evt)}
        />
      </form>
      <ul className='todo__task-list list-reset'>
        {taskList.length > 0 ?
          taskList.map((task) => (
            <li key={task.value} className='todo__task-item'>
              <label className='todo__task-label'>
                <input
                  className='todo__task-input visually-hidden'
                  type="checkbox"
                  name="task-item"
                  onChange={() => handleTaskComplete(task.value)}
                />
                <span className="todo__task-checkmark"></span>
                <span className={`todo__label-text ${task.isDone ? 'todo__label-text--complete' : ''}`}>
                  {task.value}
                </span>
              </label>
              <button
                className="todo__task-remove-button basic-button"
                onClick={() => handleTaskRemove(task.value)}
              >
                X
              </button>
            </li>
          ))
          : ''}
      </ul>
    </main>
  );
}

export default AppMain;