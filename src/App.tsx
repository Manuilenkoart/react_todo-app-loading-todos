import React, { useCallback, useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { ErrorNotification, Footer, Header, TodoList } from './components';
import { Todo } from './types';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosFiltered, setTodosFiltered] = useState<Todo[]>([]);

  const [error, setError] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setError('Unable to load todos'));
  }, []);

  const handleHideError = useCallback(() => setError(''), []);

  const handleFilter = useCallback(
    (todo: Todo[]) => setTodosFiltered(todo),
    [],
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
