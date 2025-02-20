


// 가게 정보 표시 UI 공간


const StoreComponent = ({store}) => {
    return(
        <div className="store-container">
            <h2>가게정보</h2>
            <p>이름 {store.name}</p>
            <p>위치 {store.location}</p>
            <p>운영시간 {store.hours}</p>
        </div>
    )
}

export  default  StoreComponent;