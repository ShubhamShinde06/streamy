import Home from "./pages/Home";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import SingleMovie from "./pages/SingleMovie";
import Movies from "./pages/Movies";
import Shows from "./pages/Shows";
import Auth from "./pages/Auth/Auth";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import SendEmail from "./pages/Auth/SendEmail";
import OTP from "./pages/Auth/OTP";
import SingleShow from "./pages/SingleShow";
import MyProfile from "./pages/MyProfile";
import MyList from "./pages/MyList";
import { ToastContainer, toast } from "react-toastify";
import { authApi } from "./API/authAPI";
import { useEffect } from "react";
import PlayerMovie from "./pages/PlayerMovie";
import PlayerShow from "./pages/PlayerShow";

// Redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = authApi();

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = authApi();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

function App() {
  const { checkAuth, user } = authApi();

  useEffect(() => {
    checkAuth();
  }, [user && checkAuth]);

  return (
    <div className="w-full h-[100vh]">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/single-movie/:id" element={<SingleMovie />} />
          <Route path="/single-show/:id" element={<SingleShow />} />
          <Route path="/otp" element={<OTP />} />

          {/* Protected Routes */}
          <Route
            path="/streamy-player/:id"
            element={
              <ProtectedRoute>
                <PlayerMovie />
              </ProtectedRoute>
            }
          />
          <Route
            path="/streamy-player/:seriesId/:episodeId"
            element={
              <ProtectedRoute>
                <PlayerShow />
              </ProtectedRoute>
            }
          />

          {/* non public routes */}
          <Route
            path="/auth"
            element={
              <RedirectAuthenticatedUser>
                <Auth />
              </RedirectAuthenticatedUser>
            }
          />

          <Route
            path="/send-email"
            element={
              <RedirectAuthenticatedUser>
                <SendEmail />
              </RedirectAuthenticatedUser>
            }
          />

          <Route
            path="/reset-password/:token"
            element={
              <RedirectAuthenticatedUser>
                <ForgotPassword />
              </RedirectAuthenticatedUser>
            }
          />

          <Route
            path="/my-list"
            element={
              <ProtectedRoute>
                <MyList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
