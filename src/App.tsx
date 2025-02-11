/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { ErrorNotification, Footer, Header, TodoList } from './components';
import { ActiveFilter, Todo } from './types';
// import { todosMock } from './utils/mock';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosFiltered, setTodosFiltered] = useState<Todo[]>([]);

  const [error, setError] = useState('');
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setError('Unable to load todos'));
  }, []);

  const handleHideError = useCallback(() => setError(''), []);

  const handleFilter = useCallback(
    (filter: ActiveFilter) => {
      switch (filter) {
        case 'active':
          setTodosFiltered(todos.filter(({ completed }) => !completed));
          break;

        case 'completed':
          setTodosFiltered(todos.filter(({ completed }) => completed));
          break;

        case 'all':
          setTodosFiltered(todos);
          break;

        default:
          break;
      }
    },
    [todos],
  );

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />

        <TodoList todos={todosFiltered} />
        <Footer todos={todos} onFilter={handleFilter} />
      </div>

      <ErrorNotification error={error} onHideError={handleHideError} />
    </div>
  );
};
