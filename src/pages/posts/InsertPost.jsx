import FormPostData from "./FormPostData";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const InsertPost = () => {

    const [formData,setFormData] = useState({
        postTitle:"",
        postContent:"",
        thumbnail:"",
        postCategory:"",
        postStatus:"",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
      const {name,value} =  e.target;
      setFormData({
          ...formData,
          [name]:value
      })
    }
    const handleSubmit = (e) =>{
        e.preventDefault(); // 기본 폼 제출 동작 방지
        axios.post("http://localhost:8080/api/posts",formData)
            .then((res)=>{
                alert("게시물 등록이 완료되었습니다.");
                // navigate 이용해서 게시물 리스트로 이동
                navigate("/products")
            })
            .catch((err)=>{
                alert("데이터를 등록할 수 없습니다.")
                console.log("err : ", err)
            })
    }

    const inputPostField = [
        {id:"postTitle",label:"게시물명",placeholder:"제목을 작성해주세요"},
        {id:"postContent",label:"게시물 내용",placeholder:"내용을 작성해주세요"},
        {id:"thumbnail",label:"이미지",placeholder:"이미지를 삽입해주세요."},
        {id:"postCategory",label:"카테고리",placeholder:"카테고리를 작성해주세요."},
        {id:"postStatus",label:"상태",placeholder:"상태를 넣어주세요."},
    ]
    return (
        <div className="col-6 mx-auto">
            {/* row 한 가로줄 기준으로 12 칸 중에서 6칸 차지하고 
            나머지 3칸을 mx-auto 를 이용해서 왼쪽 오른쪽에 균등하게 배분 
            row = 12
            왼쪽 = 3 가운데(폼데이터) = 6 오른쪽 =3
            
            mx = 왼쪽 오른쪽
            my = 위쪽 아래쪽
            auto 가운데 자동 정렬
            */}
            <form onSubmit={handleSubmit}>

            {inputPostField.map(
                (f)=>(
                    <FormPostData key={f.id}{...f} value={formData.value}/>
                )
            )}
                <div className="d-gird mt-3">
                    <button className="btn btn-success btn-lg">
                        등록하기
                    </button>
                </div>
            </form>
        </div>
    )
};
export default InsertPost;