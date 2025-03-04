import logo from './logo.svg';
import './App.css';
import FileExplorerContextWrapper from './context/FileExplorerContext';
import FileExplorer from './components/FileExplorer';

function App() {
  return (
    <div >
     <FileExplorerContextWrapper >
      <FileExplorer />
     </FileExplorerContextWrapper>
    </div>
  );
}

export default App;
