import React from "react";

const AllProductsComponent = ({ products }) => {
    return (
        <div>
            <h2>전체 상품</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - {product.price}원
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllProductsComponent;