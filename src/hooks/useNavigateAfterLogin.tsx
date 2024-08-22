import { useLocation, useNavigate } from "react-router-dom";

const useNavigateAfterLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigateToQueryOrRoot = () => {
    const params = new URLSearchParams(location.search);
    const next = params.get("next");

    if (next) {
      navigate(next);
    } else {
      navigate("/dashboard");
    }
  };

  return navigateToQueryOrRoot;
};

export default useNavigateAfterLogin;
