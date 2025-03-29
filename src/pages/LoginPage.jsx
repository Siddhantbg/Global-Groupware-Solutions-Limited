import LoginForm from "../components/LoginForm";

const LoginPage = () => {
    return (
<div>
<h1 className="poppins-semibold" style={{ 
    color: "white", 
    fontSize: "44px", 
    textAlign: "center", 
    textShadow: "0px 0px 10px #6587fd, 0px 0px 20px #6587fd" 
}}>
    EmployWise Assignment
</h1>

    <LoginForm />
</div>

    );
};

export default LoginPage;
