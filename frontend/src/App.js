import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage/Homepage';
import PageLayout from './Layout/PageLayout';
import Posts from './pages/posts/Posts';
import ProfilePage from './pages/profile/ProfilePage';
import AdminPage from './pages/admin/AdminPage';
import AuthPage from './pages/auth/AuthPage';
import { FilterProvider } from './context/FilterContext';
import { PostsProvider } from './context/PostsContext';
import env from "react-dotenv";

function App() {
  console.log(env)
  return (
    <div className="main-container">
      <PostsProvider>
        <FilterProvider>
          <PageLayout>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/cazuri" element={<Posts/>}/>
                <Route path="/profil" element={<ProfilePage/>}/>
                <Route path="/admin" element={<AdminPage/>}/>
                <Route path="/autentificare" element={<AuthPage/>}/>
                {/* <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/> */}

            </Routes>
          </PageLayout>
        </FilterProvider>
      </PostsProvider>
    </div>
  );
}

export default App;
