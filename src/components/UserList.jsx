import { useEffect, useState } from "react";
import { getUsers, deleteUser, updateUser } from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/UserList.css";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({ first_name: "", last_name: "", email: "" });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers(page);
                setUsers(data.data);
                setFilteredUsers(data.data); // Initialize filtered users
            } catch (error) {
                toast.error("Error fetching users");
            }
        };
        fetchUsers();
    }, [page]);

    // Handle search filtering
    useEffect(() => {
        const filtered = users.filter((user) =>
            `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchQuery, users]);

    const handleEdit = (user) => {
        setEditingUser(user.id);
        setFormData({ first_name: user.first_name, last_name: user.last_name, email: user.email });
    };

    const handleUpdate = async () => {
        if (!editingUser) return;

        try {
            await updateUser(editingUser, formData);
            setUsers(users.map(user => user.id === editingUser ? { ...user, ...formData } : user));
            toast.success("User updated successfully!");
        } catch (error) {
            toast.error("Failed to update user.");
        }

        setEditingUser(null);
    };

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            const updatedUsers = users.filter(user => user.id !== id);
            setUsers(updatedUsers);
            setFilteredUsers(updatedUsers); // Update the filtered list as well
            toast.success("User deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete user.");
        }
    };

    return (
        <div className="user-list-container">
            <h2 className="poppins-semibold glow-text" style={{ color: "white", textAlign: "center" }}>Users List</h2>

            <ToastContainer position="top-right" autoClose={3000} />

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-bar"
            />

            <div className="user-grid">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <div key={user.id} className="user-card poppins-semibold">
                            <img src={user.avatar} alt={user.first_name} />

                            {editingUser === user.id ? (
                                <div className="edit-form">
                                    <input
                                        type="text"
                                        value={formData.first_name}
                                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        value={formData.last_name}
                                        onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                    />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                    <button className="save-btn" onClick={handleUpdate}>Update</button>
                                    <button className="cancel-btn" onClick={() => setEditingUser(null)}>Cancel</button>
                                </div>
                            ) : (
                                <>
                                    <p className="user-name">{user.first_name} {user.last_name}</p>
                                    <p className="user-email">{user.email}</p>
                                    <button onClick={() => handleEdit(user)}>Edit</button>
                                    <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="no-results poppins-semibold">No users found.</p>
                )}
            </div>

            <div className="pagination">
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</button>
                <button onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>
    );
};

export default UserList;
