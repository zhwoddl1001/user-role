import {useEffect, useState} from "react";
import apiService from "./apiService";
import {Link} from "react-router-dom";
import axios from "axios";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [err, setErr] = useState(null);
    const [keyword, setKeyword] = useState(""); // keyword 는 단순히 검색어 이기 때문에 배열 XXXX

    // keyword 를 통해서 가져온 추천 검색어 목록형태
    const [sugs, setSugs] = useState([]);       // 추천 검색어 리스트
    const [show, setShow] = useState(false) //추천검색어 표시 여부

    useEffect(() => {
        apiService.getAllPosts(setPosts, setErr);
    }, []);


    // 1. 검색어 입력 시 추천 검색어 제공 기능
    const handleChange = (e) => { // input 에 어떤 이벤트가 발생할 경우 작동하는 기능
        const value = e.target.value.trim(); // 이벤트가 발생한 input 에 들어있는 값을 공백제거하고 value 변수이름에 담아두기
        setKeyword(value);

        if (value) {

        }
    }


    // 2. 추천 검색어 클릭 시 검색어 입력창에 자동 입력
    function handleSug(sug) {
        setKeyword(sug);        //사용자가 검색어를 클릭해서 input 안에 넣어서 검색할 경우 input 키워드에 검색을 넣어주고
        setShow(false); // 더이상 추천 리스트를 보여줄 필요가 없기 때문에 추천 리스트 숨기기 설정
    }


    // 검색 기능 추가
    function handleSearch() {
        if (keyword.trim()) {
            apiService.searchPosts(keyword, setPosts, setErr)
        } else {
            alert("검색어가 없습니다.");
            apiService.getAllPosts(setPosts, setErr);

            return;
        }
    }

    /*
        onBlur      =  입력 필드에서 포커스가 벗어날 때 실행되는 이벤트
                        input 에서 작성하던 중 마우스로 input 태그가 아닌 다른 곳을 클릭했을 경우
                        200(0.2초) 후에 키워드에 따른 추천검색리스트 제안을 종료(setTimeout)
        onBlur={() => setTimeout(() => setShow(false), 200)


        onMouseDown = 마우스를 클릭하는 순간 실행되는 이벤트(동작, 행위)
                      사용자가 추천 검색어를 클릭할 경우 추천 검색어 리스트가 onBlur 로 인해 사라지고
                        마우스 클릭을 누르는 순간 제안한 리스트 중에서 사용자가 선택한 제안을
                        키워드 내부로 들어갈 수 있도록 설정

        onMouseDown={() => handleSug(sug)}

    * */
    return (
        <div>
            <h2>게시물 목록</h2>

            {/* 검색 입력 필드 */}
            <div>
                <input
                    type="text"
                    placeholder="검색어 입력"
                    value={keyword}
                    onChange={handleChange}
                    onBlur={
                        () => setTimeout(() => setShow(false), 200)

                    }
                />
                {show && sugs.length > 0 && (
                    <ul>
                        {sugs.map(
                            (sug, index) => (
                                <li key={index} onMouseDown={() => handleSug(sug)}>
                                    {sug}
                                </li>
                            )
                        )}
                    </ul>


                )}

                <button onClick={handleSearch}>검색</button>
            </div>

            {err && <p style={{color: "red"}}>{err}</p>}

            <ul>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <li key={post.postId}>
                            <h3>{post.postTitle}</h3>
                            <p>{post.postContent}</p>
                            <Link to={`/posts/${post.postId}`}>이동하기</Link>
                        </li>
                    ))
                ) : (
                    <p>게시물이 없습니다.</p>
                )}
            </ul>
        </div>
    );
}
export default PostList;