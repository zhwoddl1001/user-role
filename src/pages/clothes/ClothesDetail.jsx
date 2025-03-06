import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import apiClothesService from "./apiClothesService";

const ClothesDetail = () => {


    const id = useParams();
    const [clothe,setClothe]= useState("");

    useEffect(() => {
        apiClothesService.getClothesById(id,setClothe);
    }, []);

    return (
        <div className="ClothesDetail-container">
            <div className="EditClothes-container">
                <h3>{clothe.name}상세보기</h3>
            </div>
        </div>
    )
};
export default ClothesDetail;