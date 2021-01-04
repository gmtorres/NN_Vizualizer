import './App.css';
import Navbar from './components/Navbar/Navbar';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <div className="App" style={{height:'100vh', display:'flex' , 'flexDirection':'column' }}>
      <Navbar></Navbar> 
      <Layout/>
    </div>
  );
}

export default App;
