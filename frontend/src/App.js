import { Route, Routes, Navigate } from 'react-router-dom';
import Homepage from './pages/homepage/Homepage';
import PageLayout from './Layout/PageLayout';
import Posts from './pages/posts/Posts';
import ProfilePage from './pages/profile/ProfilePage';
import AdminPage from './pages/admin/AdminPage';
import AuthPage from './pages/auth/AuthPage';
import { useAuthContext } from './hooks/useAuthContext'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="main-container">
      <PageLayout>
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/cazuri" element={<Posts/>}/>
            <Route path="/profil" element={<ProfilePage/>}/>
            <Route path="/administrare" element={<AdminPage/> }/>
            <Route path="/autentificare" element={!user ? <AuthPage/> : user?.isAdmin ? <Navigate to="/administrare"/> : <Navigate to="/cazuri"/>}/>
            {/* <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/> */}
        </Routes>
      </PageLayout>
    </div>
  );
}

export default App;
