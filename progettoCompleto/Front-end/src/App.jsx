import Footer from "./components/Footer"

import NavBar from "./components/NavBar"
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PostDetail from "./Pages/PostDetail"
import AddPost from "./Pages/AddPost"
import { LoginRegister } from "./Pages/LoginRegister"
import { AuthProvider } from "../context/authContext"
import { ProtectedRoute } from "./components/ProtectedRoutes"
import UserProfile from "./Pages/UserProfile"
import { ViewPosts } from "./Pages/ViewPosts"


function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <NavBar />
        <Routes>
          {/* rotta pubblica */}
          <Route path='/loginRegister' element={<LoginRegister />} />

          {/* rotte private */}
          <Route path='/userProfile' element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } />
          <Route path='/viewPosts' element={
            <ProtectedRoute>
              <ViewPosts />
            </ProtectedRoute>
          } />
          <Route path='/addPost' element={
            <ProtectedRoute>
              <AddPost />
            </ProtectedRoute>
          } />
          <Route path='/posts/:id' element={
            <ProtectedRoute>
              <PostDetail />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/loginRegister" replace />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
