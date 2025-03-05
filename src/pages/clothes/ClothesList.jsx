import {useEffect, useState} from "react";
import axios from "axios";
import apiClothesService from "./apiClothesService";
import {Link} from "react-router-dom";
import ClothesCard from "./ClothesCard";

const ClothesList = () => {

    const [clothes, setClothes] = useState([]);
    const [callback, setCallback] = useState("");

    const a = () => {
        apiClothesService.getAllClothes(setClothes);

    }

    const handleDelete = () => {
        apiClothesService.deleteClothes(setCallback);
    }

    useEffect(() => {
        a();
    }, []);

    return (
        <div>
            <div>
                <div className="row mt-5">
                    {clothes.map((clothe)=>(
                        <ClothesCard
                        key={clothe.cid}
                        id={clothe.cid}
                        name={clothe.cname}
                        price={clothe.cprice}
                        image="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"

                        onDelete={handleDelete}/>
                    ))}

                </div>
            </div>
        </div>
                )
                };
export default ClothesList;