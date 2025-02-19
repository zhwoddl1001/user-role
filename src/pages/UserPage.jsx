
const UserPage= ({user}) =>{
    return(
        
        <div>
            <h1>유저 페이지</h1>
            <p>환영합니다. {user.username}님</p>
        </div>
    )
}
export default UserPage;