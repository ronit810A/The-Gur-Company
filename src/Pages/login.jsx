import AuthForm from "../Component/AuthPageData/AuthForm";
import "../Css/auth.css";

function Login({ onAuthenticated }) {
  return <AuthForm mode="login" onAuthenticated={onAuthenticated} />;
}

export default Login;
