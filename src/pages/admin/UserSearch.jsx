import {useState} from "react";
import axios from "axios";
import './UserSearch.css';

const UserSearch = () => {
    const [userName,setUserName]= useState("");
    // 검색 결과의 경우 배열 형태
    // 왜냐하면 검색에 대한 결과가 하나의 값이 나오지 않기 때문에 2개 이상의 값이 나온다는 가정
    // 초기 users 값도 빈 배열 (= 빈 목록 = 빈 리스트) 형태로 작성
    const [users,setUsers]= useState([]);

    const searchUser = () =>{
        if (!userName.trim()){
            alert("검색할 이름을 입력하세요.");
            return;
        }
            // ? userName 은 왜 useParams() 메서드를 사용하지 않을까 ?
            // useParams() 는 주소값에 있는 데이터를 가져와서 사용할 경우 작성
           // userName 은 클라이언트가 작성한 값을 API 주소로 가져가서 BackEnd 에 데이터를 요청
        axios
            .get("http://localhost:8080/api/user/search?userName=" + userName)
            .then(
                (res)=>{
                setUsers(res.data);
            })
            .catch(
                (err)=>{
                    console.log("err = " + err);
                    alert("벡엔드 주소와 연결할 수 없는 상태입니다.")
                }
            )
    }

    const getUserRoleText = (role) => {
        switch (role) {
            case 1,"1":
                return "관리자";
            case 2:
                return "업체";
            case 3:
                return "사용자";
            default:
                return "알 수 없음";
        }
    }

    return(
        <div className="usersearch-container">
            <h2>사용자 검색</h2>
            <div className="input-container">
            <input type="text"
                   value={userName}
                   placeholder="검색할 이름을 입력하세요."
                   onChange={(e)=> setUserName(e.target.value)}/>
       <button onClick={searchUser}>검색</button>
            </div>
        <ul className="user-list">
            { users.length > 0
                ?
                (
                    users.map((user)=>(
                    <li key={user.userId}>
                        <strong>{user.userName}</strong>({user.userEmail}) - 역할 : {getUserRoleText(user.userRole)}
                    </li>

                    )
                    )
                )
                :
                (<div className="no-results">검색결과가 존재하지 않습니다.</div>)}
        </ul>
        </div>
    )
}
export default UserSearch;