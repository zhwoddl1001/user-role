import React, {useEffect, useState} from "react";
import apiProductService from "./apiProductService";
import {useNavigate, useParams} from "react-router-dom";

const ProductDetail = () => {
    // http://localhost:3000/products/5 5 숫자를 가져와서 사용
    const {productId} = useParams();
    //const [productId, setProductId] = useState("");
    //제품 정보 변수 이름
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);// 주문 수량 상태 관리
    const navigate = useNavigate();


    useEffect(() => {
        apiProductService.getProductById(productId, setProduct)
    }, [productId]);

    const handleDelete= ()=>{
        apiProductService.deleteProduct(productId,navigate);
    }

    const handleEdit= ()=>{
        navigate(`/products/edit/${productId}`)
    }



    return (
        <section className="py-5">
            <div className="container px-4 px-lg-5 my-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
                    <div className="col-md-6">
                        <img className="card-img-top mb-5 mb-md-0"
                             src="https://dummyimage.com/600x700/dee2e6/6c757d.jpg" alt="..."/>
                    </div>
                    <div className="col-md-6">
                        <div className="small mb-1">{product?.productCategory}</div>
                        <h1 className="display-5 fw-bolder">{product?.productName}</h1>
                        <div className="fs-5 mb-5">
                            <span className="text-decoration-line-through">
                                {(product?.productPrice * 1.3).toLocaleString()}원
                            </span>
                            <span>{product?.productPrice.toLocaleString()}원</span>
                        </div>
                        <p className="lead">{product?.productDescription}</p>
                        <div className="d-flex">
                            <div className="fs-5 mb-5">
                                <span>재고 : {product?.productStock}</span>
                            </div>

                            {/*
                            리액트의 경우
                            style 태그를 직접적으로 작성 XX
                            style = "max-width: 3rem"  를
                            style={{maxWidth: "3rem"}} 와 같이 변형해서 작성
                            */}
                            <input className="form-control text-center me-3"
                                   id="inputQuantity"
                                   type="num"
                                   value={quantity}
                                   onChange={(e) => setQuantity(e.target.value)}
                                   style={{maxWidth: "3rem"}}/>
                            <button className="btn btn-outline-dark flex-shrink-0" type="button">
                                <i className="bi-cart-fill me-1"></i>
                                Add to cart
                            </button>
                            <div className="fs-5 mb-5">
                                <button className="btn btn-outline-warning flex-shrink-0"
                                        type="button"
                                        onClick={handleDelete}>
                                    삭제하기
                                </button>
                                <button className="btn btn-outline-warning flex-shrink-0"
                                        type="button"
                                        onClick={handleEdit}>
                                    수정하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


const ProductDetails = () => {
    //제품 아이디 변수 이름
    const [productId, setProductId] = useState("");
    //제품 정보 변수 이름
    const [product, setProduct] = useState(null);

    const getProductDetail = () => {
        // input 비어있는지 확인 후 비어있다면
        // "상품 ID를 입력하세요." 보여준 후 리턴
        if (!productId.trim()) { // trim() 왼쪽 오른쪽 공백 제거
            alert("상품 ID를 입력하세요.");
            return;
        }
        // 조회 클릭시 api endpoint 로 접근해서 제품 id 에 해당하는 데이터 호출
        apiProductService.getProductById(productId, setProduct)
    }

    return (
        <div>
            <h2>상품 상세 조회</h2>
            {/* input onChange 설정  */}
            <input
                type="text"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="상품 ID 입력"
            />
            <button onClick={getProductDetail}>조회</button>

            {product ? (
                <div>
                    <h3>{product.productName}</h3>
                    <p>카테고리: {product.productCategory}</p>
                    <p>가격: {product.productPrice}원</p>
                    <p>재고: {product.productStock}개</p>
                    <p>설명: {product.productDescription}</p>
                </div>
            ) : (
                <p>상품 정보를 찾을 수 없습니다.</p>
            )}
        </div>
    );
};

export default ProductDetail;