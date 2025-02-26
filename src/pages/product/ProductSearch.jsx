import React, {useState} from "react";
import axios from "axios";
import apiProductService from "./apiProductService";

const ProductSearch = () => {
    // 검색 변수 이름
    const [keyword, setKeyword] = useState("");
    //검색 결과 조회 목록 변수 이름
    const [products, setProducts] = useState([]);
    const [sugs, setSugs] = useState([]); // suggestions -> sugs 추천 검색어를 제안하는 리스트
    const [show, setShow] = useState(false); // 빈 값일 경우 제안 X 빈 값이 아닐경우 제안 OK
    const [err, setErr] = useState(null);

    const handleChange = (e) => {
        const value = e.target.value.trim(); // input 창에서 이벤트가 발생 이벤트가 발생한 특정값을 공백제거하고 value 이름에 저장
        /* if(!value.trim()){
        * alert("추천할 검색어가 없습니다.")
        * }
        * 검색 추천은 추천일 뿐 필수로 추천해야할 이유가 없기 때문에 alert 사용 xxxx
        * */

        setKeyword(value); // input 가져온 value 값을 setKeyword 에 저장

        // value 값이 존재한다면 추천 검색어 제공
        if (value) {
            apiProductService.getSuggestions(value, setSugs, setShow)
        } else { // 추천할 검색어가 없다면 한마디로 input이 비어있다면
            setSugs([]); // 추천 검색어 리스트 비우기
            setShow(false);
        }


    }

    const handleSug = (sugs) => {
        setKeyword(sugs);
        setShow(false);
    }

    const searchProducts = () => {
        // input 비어있는지 확인 후 비어있다면
        if (!keyword.trim()) {
            alert("검색어를 입력하세요.")
            return;
        }
        // "검색어를 입력하세요." 보여준 후 리턴
      /*  axios
            .get(`http://localhost:8080/api/products/search?keyword=${keyword}`)
            .then((res) => {
                setProducts(res.data)
            })
            .catch((err) => {
                console.error("검색 실패 : ", err)
                setProducts([]); // 기존에 검색된 데이터가 있다면 지워버리기
            })*/
        apiProductService.searchProduct(keyword,setProducts,setErr);
    }


    return (
        <div className="productsearch-container">
            <h2>상품 검색</h2>
            {/* onChange 없음 */}
            <div>
                <input
                    type="text"
                    value={keyword}
                    onFocus={() => setShow(true)}
                    onChange={handleChange}
                    onBlur={() => setTimeout(() => setShow(false), 200)}
                />
                {
                    show && sugs.length > 0 && (
                        <ul>
                            {sugs.map(
                                (sugs, index) => (
                                    <li key={index} onMouseDown={()=> handleSug(sugs)}>
                                        {sugs}
                                    </li>
                                ))}

                        </ul>
                    )
                }
            </div>
            <button onClick={searchProducts}>검색</button>

            <ul>
                {/* 제품이 1개 이상 존재한다면 ? (
          이름 카테고리 가격 보여주기 map 형식으로 작성
        ) : (
          <p>검색 결과가 없습니다.</p>
        ) */}
                {products.length > 0 ?

                    (
                        products.map((product) => (
                                <li key={product.productId}>
                                    이름 : {product.productName}<br/>
                                    카테고리 : {product.productCategory}<br/>
                                </li>

                            )
                        )
                    )
                    :
                    <div> {keyword} <p>검색결과가 존재하지 않습니다.</p></div>
                }

            </ul>
        </div>
    );
};

export default ProductSearch;