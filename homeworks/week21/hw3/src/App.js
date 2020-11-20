/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension,  */

import './App.css';
import Hearder from './Hearder';
import Title from './Title';
import Form from './Form';
import Footer from './Footer';


function App() {
  return (
    <div className="App">
      <Hearder />
      <div className="all">
        <Title />
        <Form />
        <Footer />
      </div>
    </div>
  );
}

export default App;
