import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  // 1. Load authenticated User
  const { user, isAuthenticated, isLoading } = useUser();

  // 2. if no user redirect to /login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  // 3. while loading show sppiner
  if (isLoading)
    <FullPage>
      <Spinner />
    </FullPage>;

  // 4. if there is user reder the app

  if (isAuthenticated) return children;
};

export default ProtectedRoute;
