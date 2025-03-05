import {Link} from "react-router-dom";

const ClothesCard = ({id,name,price,image,onDelete}) => {
    return (
            <div class="col mb-5">
                <div class="card h-100">
                    <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                         alt="Fancy Product"/>
                        <div class="card-body p-4 text-center">
                            <h5 class="fw-bolder">
                                <Link to={`/clothes/${id}`} class="text-decoration-none">{name}</Link>
                            </h5>
                            {price.toLocaleString()} 원
                        </div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center">
                                <button class="btn btn-outline-dark mt-auto"
                                    onClick={()=>onDelete(id)}
                                >삭제</button>
                            </div>
                        </div>
                </div>
            </div>

    )
};
export default ClothesCard;