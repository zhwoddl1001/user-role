import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import apiService from "./apiService";



const PostDetail = () => {

    const navigate = useNavigate();
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [err, setErr] = useState(null);

    useEffect(() => {
        apiService.getPostById(postId, setPost, setErr);
    }, [postId]);

    if (!post) {
        return <p>게시물 불러오는 중입니다.</p>;
    }

    const handleDelete = () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            apiService.deletePost(postId, "삭제 성공", "삭제 실패");
            navigate("/");
        }
    };

    return (
        <div className="container text-center">
            <div className="row">
            <h2 className="col">{post.postTitle}</h2>
            <p className="col">{post.postContent}</p>
            </div>

            {/* ✅ 수정 버튼 */}
            <Link to={`/posts/edit/${postId}`}>
                <button className="btn btn-outline-warning" >수정</button>
            </Link>

            {/* ✅ 삭제 버튼 */}
            <button className="btn btn-outline-danger" onClick={handleDelete}>삭제</button>
        </div>
    );

};

const PostDetails = () => {
    /*
   기본   자바스크립트에서는 페이지를 이동할 때
   window.location.href("이동할경로") 로 페이지 이동
   리액트 자바스크립트에서는 페이지를 이동할 때
   useNavigate()  hook 을 사용해서 페이지 이동


   Link 의 경우 a 태그 대신 활용

   useNavigate = html 형식이 아니라 자바스크립트 내에서 특정 행동을 진행한 후
   페이지 를 이동하거나
   페이지 이동 후 특정 기능을 수행해야할 때 사용

   const navigate = useNavigate() 와 같은 형식으로 사용
   navigate(-1) : 뒤 페이지로 이동하기
   navigate(+1) : 앞 페이지로 이동하기

    * */
    const navigate = useNavigate();
    const {postId} = useParams();
    const [post, setPost] = useState(null);
    const [err, setErr] = useState(null);

    useEffect(() => {
        apiService.getPostById(postId,setPost,setErr)
    }, [postId]);


    if (!post) {
        return <p>게시물 불러오는 중입니다.</p>
    }
    /*
    * alert(message)
      간단한 알림 메세지 표시
      확인 버튼 누르기만 가능    문자열 입력 불가                           반환 불가
    * prompt(message, defaultValue)
      사용자로부터 입력을 받을 때 사용
      확인 취소 버튼 존재       문자열 입력 가능  사용자가 입력하면 입력한 문자열 반환
                                                  취소버튼을 누르면 null 값 반환
      defaultValue = 입력하는 기본값을 제공할 수 있음 보통 사용 X
    * confirm(message)
      사용자의 확인 또는 취소 여부를 물어볼 때 사용
      확인 취소 버튼 존재       문자열 입력 불가  확인버튼을 누르면 true  반환
                                                  취소버튼을 누르면 false 반환
     confirm 메세지의 경우 window 함수 내부에 들어있는 메서드이기 때문에
     window.confirm(""); 형식으로 사용 가능
     confirm 마찬가지로 window 생략하고 사용가능하지만 리액트의 경우에는 window 를 붙여줘야함
    */
    const handleDelete = () => {
        alert("알람 메세지");
        prompt("프롬포트 메세지","기본값"); // 기본값은 지워도 됨
        window.confirm("확인 취소 메세지");

        if(window.confirm("정말 삭제하시겠습니까?")) {
            // apiService 에서 deletePost 메서드 호출 후 기능 실행
            apiService.deletePost(postId,"삭제성공","삭제실패");
            // 게시물이 삭제가 된 상태
            navigate("/"); // 메인으로 이동하기

        }

    }
    return (
        <div className="PostDetail-container">
            <h2>{post.postTitle}</h2>
            <p>{post.postContent}</p>
            {/*  ✅ 수정 버튼 */}
            {/* Route 에 작성한 path 와 to 경로를 맞춰서 작성 */}
            <Link to={`/posts/edit/${postId}`}>
                <button>수정</button>
            </Link>

            {/*  ✅ 삭제 버튼 */}
            <button onClick={handleDelete}>삭제</button>
        </div>
    )

};
export default PostDetail;