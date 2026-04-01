import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

//style
import "./index.css";

//layout
import RootLayout from "./Layout/RootLayout";

//pages
import Home from "./Pages/Home";
import ArticlePage from "./Pages/ArticlePage";
import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";
import SettingsPage from "./Pages/SettingsPage";
import ProfilePage from "./Pages/ProfilePage";
import NewArticlePlage from "./Pages/NewArticlePage";
import EditArticlePage from "./Pages/EditArticlePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="articles/:slug" element={<ArticlePage />} />
      <Route path="sign-in" element={<SignInPage />} />
      <Route path="sign-up" element={<SignUpPage />} />
      <Route path="settings" element={<SettingsPage />} />
      <Route path="profile/:username" element={<ProfilePage />} />
      <Route path="new-article" element={<NewArticlePlage />} />
      <Route path="articles/:slug/edit" element={<EditArticlePage />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
