import React,  { useEffect }  from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
    //const user = useSelector((state) => state.auth.user);
    const { user } = useSelector((state) =>  state.auth);
    const navigate = useNavigate();

    // Redirect to login if no user is logged in

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);
    if (!user) return null;

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Welcome to the application</h1>
        </div>
    );
};

export default Welcome;
