import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import apiService from "./apiService";


const UpdatePost = () => {
    // useParams = URLSearchParams 와 같은 기
    const {postId} = useParams();
    const [post, setPost] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("일반");
    const [message, setMessage] = useState(null);

    // PostDetail 에서 작성한 것처럼
    // 수정할 내용에 들어갈 기존 값 불러오기
    useEffect(() => {
        apiService.getPostById(postId,
            (data) => {
                setPost(data);
                setTitle(data.postTitle);
                setContent(data.postContent);
                setCategory(data.postCategory);
            },

            setMessage)
    }, [postId]);

    // 수정 버튼을 눌렀을 때 실행할 기능 생성
    const handleUpdate = () => {
        const updateContent = {
// userId 는 추후 login 한 세션에서 가져와 넣을 것
// 현재 postStatus 는 설정해좋은 변수이름이 없기 때문에 "XX" 라는 값으로 임의 설정            
// controller DTO 명칭    : react 에서 작성한 명칭   
            postId:postId,
            userId:post.userId, // 기존 작성자 유지
            postTitle:title,
            postContent:content,
            postCategory:category,
            postStatus:"XX",
            updateAt: new Date().toISOString(),
        };
        apiService.updatePost(
            postId,updateContent,"수정성공","벡엔드 에러"
        )
    }

    return (
        <div className="container">
            <h2>게시물 수정</h2>
            <input
                type="text"
                placeholder="제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="내용"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>


            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="일반">일반</option>
                <option value="공지사항">공지사항</option>
                <option value="질문">질문</option>
                <option value="후기">후기</option>
            </select>

            <button onClick={handleUpdate}>수정</button>
        </div>
    )
};
export default UpdatePost;