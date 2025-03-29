import UserList from "../components/UserList";

const UserListPage = () => {
    return (
        <div>
            <h1 className="poppins-semibold glow-text" style={{color:"white", textAlign: "center"}}>Users</h1>
            <UserList />
        </div>
    );
};

export default UserListPage;
