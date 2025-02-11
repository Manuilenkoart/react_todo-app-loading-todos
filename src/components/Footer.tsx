import classNames from 'classnames';
import { FC, memo, useEffect, useMemo, useState } from 'react';
import { ActiveFilter, Todo } from '../types';

type Props = {
  todos: Todo[];
  onFilter: (filter: ActiveFilter) => void;
};

export const Footer: FC<Props> = memo(({ todos, onFilter }) => {
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>('all');

  useEffect(() => onFilter(activeFilter), [activeFilter, onFilter]);

  const itemsLeft = useMemo(
    () => todos.filter(({ completed }) => !completed).length,
    [todos],
  );

  const handleActiveFilterClick = (filter: ActiveFilter) =>
    setActiveFilter(filter);

  return todos.length ? (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {itemsLeft} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link ', {
            selected: activeFilter === 'all',
          })}
          data-cy="FilterLinkAll"
          onClick={() => handleActiveFilterClick('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link ', {
            selected: activeFilter === 'active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => handleActiveFilterClick('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link ', {
            selected: activeFilter === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => handleActiveFilterClick('completed')}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  ) : null;
});

Footer.displayName = 'FooterMemo';
