import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import apiProductService from "./apiProductService";

const ProductUpdate = () => {
    const {productId} = useParams();
    const navigete = useNavigate();
    const [product,setProduct] = useState({
        productName: "",
        productCategory: "",
        productPrice: "",
        productStock: "",
        productDescription: "",
    });

    useEffect(() => {
        apiProductService.getProductById(productId)
    }, []);

    const handleUpdate = () =>{

    }

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setProduct({
            ...product,
            [name]:value
        })
    }

    return (
        <div className="container">
           <h2>상품수정</h2>
            <div className="mb-3">
                <label className="form-label">
                    상품명
                </label>
                <input type="text"
                       className="fprm-control"
                       name="productName"
                       value={product.productName}
                       onChange={handleChange}/>
                <button onClick={handleUpdate}>수정</button>
            </div>
        </div>
    )
};
export default ProductUpdate;