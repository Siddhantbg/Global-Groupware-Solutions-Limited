import { useState } from "react";
import { updateUser } from "../api";
import { useLocation, useNavigate } from "react-router-dom";

const EditUserForm = () => {
    const location = useLocation();
    const user = location.state;
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [email, setEmail] = useState(user.email);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUser(user.id, { first_name: firstName, last_name: lastName, email });
        navigate("/users");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="submit">Update</button>
        </form>
    );
};

export default EditUserForm;
