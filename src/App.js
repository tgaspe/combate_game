import './App.css';
import Board from './components/Board/Board';
import Holder from './components/Holder';
import Buttons from './components/Buttons';


function App() {

//<Holder/>
  return (
    <div id="app">
      <Holder/>
      <Board/>
      <Buttons/>
    </div>
  );
}

export default App;
