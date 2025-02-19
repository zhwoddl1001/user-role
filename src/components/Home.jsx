import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import CompanyComponent from "../pages/CompanyComponent";
import axios from "axios";
import UserComponent from "../pages/UserComponent";
import AdminComponent from "../pages/AdminComponent";


const Home = () => {
    const navigate = useNavigate();
    // window.location.href 처럼 자바스크립트에서 이동 경로 설정
    const [user, setUser] = useState(null);
    // 메인에서 로그인한 정보가 존재할 경우 session 에서 가져온 로그인 정보로 메인 설정
    // Java Spring Boot 에서 저장한 session 은 자바 내에만 저장이 되는 것이 아니라
    // 자신의 컴퓨터 web에 임시 저장
    // 임시로 저장된 session 정보에 user 라는 변수이름으로 저장된 유저가 존재한다면
    // user 라는 명칭으로 저장된 유저 정보를 getItem 을 사용해 가져오기
    // 가져온 데이터가 JSON 형식이 아니라 객체나 배열 다른 형태로 존재한다면
    // 다른 형태로 존재하는 데이터를 JSON 형식으로 parse 변환하여 유저정보를 확인하겠다.
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        console.log("storedUser : " , storedUser);
        if(storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // 역할(role)에 따른 컴포넌트 선택
    const roleUser = () => {
        if(!user) {
            return <div>사용자 정보가 없습니다.</div>;
        }
        console.log("user Role",user.userRole);
        switch (user.userRole) {
            // 추후 -> 문자열로 전달받는 값을 형변환해서 switch 문에 전달
            case 1 ,"1":
                return <AdminComponent/>
            case 2, "2":
                return <CompanyComponent/>
            case 3,"3":
                return <UserComponent/>
            default:
                return <div>접근 권한이 없습니다.</div>;
        }

    }
const handleLogout= () =>{
        axios
            .get("http://localhost:8080/api/user/logout")
            .then((response)=>{
                // 1 번 로그아웃 성공했을 경우
                if (response.data.status === "logout"){
                    localStorage.removeItem("user");
                    sessionStorage.removeItem("user");
                    setUser(null);
                    alert("로그아웃 되었습니다.");
                    navigate("/")
                }else {
                    alert("현재 진행중인 작업을 종료하고 로그아웃을 실행해주세요")
                }
            })
            .catch((err)=>{
                console.log("logout error :" + err);
                alert("벡엔드에서 로그아웃을 처리하는데 문제가 발생했습니다.")
            })
}

    return(
        <div>
            <h1>홈페이지</h1>

            {user

                ?

                <div>

                    <p>환영합니다. {user.username}님!</p>
                    <button onClick={handleLogout}>로그아웃</button>


                    {/* 역할에 따라 다른 컴포넌트 렌더링  */}
                    {roleUser()}
                </div>

                :

                <div>
                    <button onClick={ () => navigate("/login")}>로그인</button>
                    <button onClick={ () => navigate("/")}>회원가입</button>
                </div>


            }
        </div>
    )
}

export default Home;