import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage/Homepage';
import PageLayout from './Layout/PageLayout';
import Cases from './pages/Cases/Cases';
import ProfilePage from './pages/profile/ProfilePage';
import AdminPage from './pages/admin/AdminPage';


function App() {
  return (
    <div className="main-container">
      <PageLayout>
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/cazuri" element={<Cases/>}/>
            <Route path="/profil" element={<ProfilePage/>}/>
            <Route path="/admin" element={<AdminPage/>}/>
            {/* <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/> */}

        </Routes>
      </PageLayout>

    </div>
  );
}

export default App;
