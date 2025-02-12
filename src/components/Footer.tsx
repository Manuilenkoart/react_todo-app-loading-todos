import classNames from 'classnames';
import { FC, memo } from 'react';
import { ActiveFilter } from '../types';

type Props = {
  itemsLeft: number;
  activeFilter: ActiveFilter;
  hasTodo: boolean;
  onFilterClick: (todo: ActiveFilter) => void;
};

export const Footer: FC<Props> = memo(
  ({ itemsLeft, activeFilter, hasTodo, onFilterClick }) => {
    return hasTodo ? (
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
            onClick={() => onFilterClick('all')}
          >
            All
          </a>

          <a
            href="#/active"
            className={classNames('filter__link ', {
              selected: activeFilter === 'active',
            })}
            data-cy="FilterLinkActive"
            onClick={() => onFilterClick('active')}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={classNames('filter__link ', {
              selected: activeFilter === 'completed',
            })}
            data-cy="FilterLinkCompleted"
            onClick={() => onFilterClick('completed')}
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
  },
);

Footer.displayName = 'FooterMemo';
