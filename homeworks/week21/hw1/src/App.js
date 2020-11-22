/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension */
/* eslint-disable react/button-has-type, react/prop-types, import/no-unresolved */

import useTodos from './useTodos';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const {
    todos,
    value,
    handleChange,
    handleButtonClick,
    filter,
    handleFilterAll,
    handleFilterDone,
    handleFilterNotDone,
    handleClearAll,
    isFilterState,
  } = useTodos();

  function Button({ className, onClick, children }) {
    return (
      <button className={className} onClick={onClick} style={{ margin: '5px' }}>
        {children}
      </button>
    );
  }

  // class Button extends React.Component {
  //   render() {
  //     const { onClick, children } = this.props;
  //     return <button onClick={onClick}>{children}</button>;
  //   }
  // }

  return (
    <div className="App">
      <div style={{ textAlign: 'center' }}>
        <input
          type="text"
          placeholder="todo"
          value={value}
          onChange={handleChange}
          style={{
            width: '50%',
          }}
        />
        <Button className="btn btn-primary" onClick={handleButtonClick}>
          Add todo
        </Button>
        <Button className="btn btn-info" onClick={handleFilterAll}>
          All
        </Button>
        <Button className="btn btn-success" onClick={handleFilterDone}>
          Done
        </Button>
        <Button className="btn btn-warning" onClick={handleFilterNotDone}>
          Not Done
        </Button>
        <Button className="btn btn-danger" onClick={handleClearAll}>
          Clear All
        </Button>
        {isFilterState(filter, todos)}
      </div>
    </div>
  );
}

export default App;
