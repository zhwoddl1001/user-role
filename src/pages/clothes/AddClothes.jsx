import {Link} from "react-router-dom";
import FormInput from "./FormInput";
import {useEffect, useState} from "react";
import axios from "axios";
/*
 <FormInput key={field.id} {...field} /> 로 inputFields 를 가져와서 활용하는 방법

 1. React 가 각 값을 구별할 수 있도록 index 대신 key 라는 명칭으로 숫자를 가져올 수 있도록 설정
 각 키에 해당하는 id 를 가져오고 가져온 아이디에 해당하는 모든 속성을 FormInput 전달

 {...field} -> inputFields 에서 key 순서에 해당하는 id, label, placeholder 값을 FormInput 으로 전달

  onChange 이벤트 핸들러를 사용하지 않아도 되는가 ?!
  FormInput 내부에 onChange 를 추가해서 상태 관리를 해야함

  onChange 가 없으면 사용자가 입력한 값을 저장할 수 없음
           하는 역할 : 사용자가 입력한 값을 임시저장 -> 저장해놓은 값을 백엔드로 전달
*/
const AddClothes = () => {
    /*
        const [ cName, setCName] = useState("");
        const [ cCategory, setCCategory] = useState("");
        const [ cBrand, setCBrand] = useState("");
        const [ cColor, setCColor] = useState("");
        const [ cMaterial, setCMaterial] = useState("");
        const [ cPrice, setCPrice] = useState("");
        const [ cStock, setCStock] = useState("");
        });
 */
    // 의류 정보 상태 관리
    const [formData, setFormData] = useState({
        Name: "",
        Category: "",
        Brand: "",
        Color: "",
        Size: "",
        Material: "",
        Price: "",
        Stock: "",
        Gender: "",
        Season: "",
    });

    /* 입력 값 변경 시 상태 업데이트
    e.target = 사용자가 값을 작성했고, 사용자가 값을 작성함으로 인해 input 값이 변경된 곳을 가리킴
     {name, value} = e.target
     e.target.name  : 현재 입력 필드의 name 속성값을 가져옴
     e.target.value : 현재 입력 필드의 value 속성값을 가져옴

     구조 분해 할당 방식
     e.target 이벤트가 발생한 input 에서 name 과 value 값을 가져오는 과정

     예를 들어
     <input type="text" name="cName" value = {formData.cName} onChange={handleChange}
     존재함

     사용자가 input 내부에 "아름다운 티셔츠" 를 입력
     1. onChange 함수 실행 -> handleChange 기능을 호출
     2. 호출된 handleChange 내부에는 e.target 이벤트가 발생한 타겟의 name 과 value 값 가져오기 실행
     e.target = {
                    name:"cName".
                    value:"아름다운  티셔츠",
                    type:"text".
     }
     와 같은 형태로 이루어져 있음

     e.target 내부에 들어있는 값들 중에서 name 과 value 값만 꺼내서 사용하겠다는 의미
                                    const {name, value} = e.target;
    const name 변수와 value 변수 이름에 해당하는 값을 e.target 에서 꺼내오기
    제대로 해당 변수이름과 일치하는 것을 꺼내왔다면
    name = "cName" 이 담기고
    value = "아름다운 티셔츠" -> 사용자가 입력한 값이 담겨지게 됨
    */
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,   // 값이 변경된 input 을 제외하고 값이 변경되지 않은 다른 input 값 상태를 그대로 유지한 채로
            [name]: value, // 값이 변경된 input 값만 변경
        })
        console.log("폼 데이터:", formData);
    }


    // 백엔드 폼 제출 핸들러
    const handleSubmit = (e) => {
        e.preventDefault(); // form 태그가 제출되기 전에 체크하고 제출하기 위해 제출 지연
        // formdata check
        console.log(formData);
        // 유효성 검사 체크 -> pattern 정규식 type required 와 같은 형식을 참조하여 체크
        const form = e.target;
        if(!form.checkValidity()) {
            form.classList.add("was-validated"); //bootstrap 내부에서만 동작
            return;
        }
        axios
            .post("http://localhost:8080/api/clothes", formData)
            .then(
                (res) => {
                    alert("의류 등록이 완료되었습니다.")
                    // forData 초기화 할 수 있음

                    // 데이터 전달 성공 표시 메세지
                    // 성공했을 경우
                    document.getElementById("submitSuccessMessage").classList.remove("d-none");
                    document.getElementById("submitErrorMessage").classList.add("d-none");

                }

            )
            .catch(
                (err) => {
                    alert("제품 등록에 실패했습니다. 백엔드를 확인하세요.")

                    // invalid-feedback  활성화 비활성화
                    document.getElementById("submitSuccessMessage").classList.add("invalid-feedback");
                    document.getElementById("submitSuccessMessage").classList.add("d-none");
                    document.getElementById("submitErrorMessage").classList.remove("d-none");
                }
            )
    }

    const inputFields = [
        {id: "Name", label: "의류 명칭", placeholder: "상품명을 입력하세요."},                          // index = 0 번
        {id: "Category", label: "카테고리", placeholder: "카테고리(예:티셔츠, 바지, 자켓) 입력하세요."},// index = 1 번
        {id: "Brand", label: "브랜드", placeholder: "브랜드명을 입력하세요."},                          // index = 2 번
        {id: "Color", label: "색상", placeholder: "색상을 입력하세요."},
        {id: "Size", label: "사이즈", placeholder: "사이즈(예:S, M, L, XL)을 입력하세요."},
        {id: "Material", label: "소재", placeholder: "소재를 입력하세요."},
        {id: "Price", label: "가격", placeholder: "가격을 입력하세요."},
        {id: "Stock", label: "재고 수량", placeholder: "재고수량을 입력하세요."},
        {id: "Gender", label: "성별", placeholder: "성별(예:공용, 남성, 여성)을 입력하세요."},
        {id: "Season", label: "시즌", placeholder: "계절(예:봄, 여름, 가을, 겨울, 사계절) 을 입력하세요."},// index = 9 번
    ]
    return (
        <div className="container px-5">
            <div className="bg-light rounded-4 py-5 px-4 px-md-5">
                <div className="text-center mb-5">
                    <div className="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-3 mb-3"><i
                        className="bi bi-envelope"></i></div>
                    <h1 className="fw-bolder">의류 등록하기</h1>
                    <p className="lead fw-normal text-muted mb-0">판매할 옷을 등록해주세요!</p>
                </div>
                <div className="row gx-5 justify-content-center">
                    <div className="col-lg-8 col-xl-6">
                        <form onSubmit={handleSubmit}>
                            {inputFields.map(
                                (field) => (
                                    <FormInput key={field.id}
                                               {...field}
                                               value={formData[field.id] || ""}
                                               onChange={handleChange}
                                    />
                                )
                            )}
                            <div className="d-none"
                                 id="submitSuccessMessage">
                                <div className="text-center mb-3">
                                    <div className="fw-bolder">
                                        등록 성공했습니다.
                                    </div>
                                    등록한 제품 확인하기
                                    <br/>
                                    <Link to={"/clothesList"}>의류 목록 페이지 이동하기</Link>
                                </div>
                            </div>

                            <div className="d-none" id="submitErrorMessage">
                                <div className="text-center text-danger mb-3">
                                    의류를 등록하는데 문제가 발생했습니다.
                                </div>
                            </div>

                            <div className="d-grid">
                                <button className="btn btn-primary btn-lg"
                                        id="submitButton"
                                        type="submit">
                                    등록하기
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

};
export default AddClothes;