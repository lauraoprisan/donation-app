import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage/Homepage';
import PageLayout from './Layout/PageLayout';
import Cases from './pages/Cases/Cases';


function App() {
  return (
    <div className="main-container">
      <PageLayout>
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/cazuri" element={<Cases/>}/>
            {/* <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/> */}

        </Routes>
      </PageLayout>

    </div>
  );
}

export default App;
