import React from "react";
import styled from "styled-components";

const CompanyComponent  = () => {
    return (
        <Container>
            <h2>🏢 업체 관리 페이지</h2>
            <p>업체 정보를 관리하고, 서비스 현황을 확인할 수 있습니다.</p>
            <CompanyMenu>
                <MenuItem>📦 제품 관리</MenuItem>
                <MenuItem>🛠 서비스 설정</MenuItem>
                <MenuItem>📈 통계 보기</MenuItem>
            </CompanyMenu>
        </Container>
    );
};



const Container = styled.div`
    background: #eaffec;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
`;

const CompanyMenu = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 15px;
`;

const MenuItem = styled.button`
    background: #55efc4;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background: #00b894;
    }
`;
export default CompanyComponent;