import { useState } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const RESET = 'reset';
const SORT_APLHABET = 'alphabet';
const SORT_LENGTH = 'length';
const REVERSE = 'reverse';

const getPreparedGoods = (goods, action) => {
  let preparedGoods = [...goods];

  if (action) {
    switch (action) {
      case RESET:
        return goods;

      case SORT_APLHABET:
        return preparedGoods.sort();

      case SORT_LENGTH:
        return preparedGoods.sort(
          (good1, good2) => good1.length - good2.length,
        );

      case REVERSE:
        return preparedGoods.reverse();

      default:
        return 0;
    }
  }

  return preparedGoods;
};

const GoodList = ({ goods }) => {
  return goods.map(good => (
    <li key={good} data-cy="Good">
      {good}
    </li>
  ));
};

export const App = () => {
  const [sortAction, setSortAction] = useState(RESET);

  const showReset = () => {
    if (getPreparedGoods !== goodsFromServer) {
      return (
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortAction !== RESET,
          })}
          onClick={() => setSortAction(RESET)}
        >
          Reset
        </button>
      );
    }

    return null;
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortAction !== SORT_APLHABET,
          })}
          onClick={() => setSortAction(SORT_APLHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortAction !== SORT_LENGTH,
          })}
          onClick={() => setSortAction(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortAction !== REVERSE,
          })}
          onClick={() => setSortAction(REVERSE)}
        >
          Reverse
        </button>

        {showReset}

        <ul>
          <GoodList goods={getPreparedGoods(goodsFromServer, sortAction)} />
        </ul>
      </div>
    </div>
  );
};
