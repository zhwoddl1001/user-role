
const AdminPage= ({user}) =>{
    return(
        
        <div>
            <h1>관리자 페이지</h1>
            <p>환영합니다. {user.username}님</p>
        </div>
    )
}
export default AdminPage;