import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import CompanyComponent from "../pages/CompanyComponent";
import AdminComponent from "../pages/AdminComponent";
import UserComponent from "../pages/UserComponent";

import StoreComponent from "../pages/main/StoreComponent";
import SearchComponent from "../pages/main/SearchComponent";
import AllProductsComponent from "../pages/main/AllProductsComponent";
import ProductSearch from "../pages/product/ProductSearch";
import ProductDetail from "../pages/product/ProductDetail";

const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        console.log("storedUser : ", storedUser);
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // 역할(role)에 따른 컴포넌트 선택
    const roleUser = () => {
        if (!user) {
            return <div>사용자 정보가 없습니다.</div>;
        }
        console.log("user Role", user.userRole);
        switch (user.userRole) {
            case 1:
            case "1":
                return <AdminComponent />;
            case 2:
            case "2":
                return <CompanyComponent />;
            case 3:
            case "3":
                return <UserComponent />;
            default:
                return <div>접근 권한이 없습니다.</div>;
        }
    };

    const handleLogout = () => {
        axios
            .post("http://localhost:8080/api/user/logout")
            .then((response) => {
                if (response.data.status === "logout") {
                    localStorage.removeItem("user");
                    sessionStorage.removeItem("user");
                    setUser(null);
                    alert("로그아웃 되었습니다.");
                    navigate("/");
                } else {
                    alert("현재 진행중인 작업을 종료하고 로그아웃 실행해주세요.");
                }
            })
            .catch((err) => {
                console.log("logout error : " + err);
                alert("백엔드에서 로그아웃을 처리하는데 문제가 발생했습니다.");
            });
    };

    return (
        <div>
            <h1>홈페이지</h1>

            {user ? (
                <div>
                    <p>환영합니다. {user.userName}님!</p>
                    <button onClick={handleLogout}>로그아웃</button>

                    {/* 역할에 따라 다른 컴포넌트 렌더링 */}
                    {roleUser()}
                </div>
            ) : (
                <div>
                    <button onClick={() => navigate("/login")}>로그인</button>
                    <button onClick={() => navigate("/")}>회원가입</button>
                </div>
            )}

            <hr />


            <h2>🛒 상품 검색</h2>
            <ProductSearch />

            <hr />

            <h2>🔍 상품 상세 조회</h2>
            <ProductDetail />
        </div>
    );
};

export default Home;