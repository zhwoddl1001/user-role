// ProductSearch
// ProductDetail
// 작성된 api 호출
// 분리하여 기능 사용

import axios from "axios";

const API_PRODUCT_URL = "http://localhost:8080/api/products";

const apiProductService = {
// 1. getProducts(keyword)
    getProducts:
        function (callback, errCallback) {
            axios
                .get(API_PRODUCT_URL)
                .then((res) => {
                    if (res.data.lenght > 0) {
                        callback(res.data)
                    } else {
                        alert("백엔드 오류 데이터를 가져올 수 없습니다.")
                    }
                })
                .catch((err) => {
                    alert("물품을 불러오는 중 오류가 발생했습니다.")
                    errCallback("물품 보기 실패")
                })
        },

    // 2. getSuggestions(keyword)
    searchProduct:
        function (keyword, setProducts, setErr) {
            // encodeURIComponent -> 영어, 숫자 이외 값이 왔을 때 문제가 생길 경우 UTF-8 로 한글 깨짐 없도록 설정
            // 예전 코드에선 필수 였으나, 근래 필수 아님
            axios.get(`${API_PRODUCT_URL}/search?keyword=${encodeURIComponent(keyword)}`)
                .then(response => setProducts(response.data))
                .catch(error => setErr(error));
        },

    getSuggestions:
        function (value, setSugs, setShow) {
            axios
                .get(`${API_PRODUCT_URL}/search?keyword=${value}`)
                .then((res) => {
                    const 제안리스트 = res.data?.map(post => post.postTitle) || [];
                    setSugs(제안리스트);
                    setShow(true);
                })
                .catch(
                    (err) => {
                        console.error("추천 검색어 동작 실행 실패 : ", err);
                        setSugs([]);
                    }
                )
        },
    // 3. getProductById
    getProductById:
        function (productId, setProduct) {
            if (!productId.trim()) { // trim() 왼쪽 오른쪽 공백 제거
                alert("상품 Id 를 입력하세요. ");
                return;
            }

            axios
                .get(`${API_PRODUCT_URL}/${productId}`)
                .then(  // 백엔드 연결 성공
                    (res) => {
                        if (res.data) {
                            setProduct(res.data);
                        }
                    }
                )
                .catch(  // 백엔드 연결 실패
                    err => {
                        alert("백엔드에서 데이터를 가져올 수 없습니다.");
                    }
                )
        },

}
export default apiProductService;
