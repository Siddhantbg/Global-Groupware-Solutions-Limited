import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UserListPage from "./pages/UserListPage";
import EditUserPage from "./pages/EditUserPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/users" element={<UserListPage />} />
                <Route path="/edit/:id" element={<EditUserPage />} />
            </Routes>
        </Router>
    );
}

export default App;
