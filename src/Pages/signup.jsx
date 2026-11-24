import AuthForm from "../Component/AuthPageData/AuthForm";
import "../Css/auth.css";

function Signup({ onAuthenticated }) {
  return <AuthForm mode="signup" onAuthenticated={onAuthenticated} />;
}

export default Signup;
