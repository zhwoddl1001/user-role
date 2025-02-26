import {Link} from "react-router-dom";

const NavBar = ({user}) => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">

                <Link className="navbar-brand" to="/">메인</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/home">홈</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                               aria-expanded="false">
                                게시물
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/posts">게시글목록</Link></li>
                                <li><Link className="dropdown-item" to="/posts/search">게시물 검색</Link></li>

                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>
                                <li><Link className="dropdown-item" to="/posts/create">게시물작성</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                               aria-expanded="false">
                                제품
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/products">제품목록</Link></li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>
                                <li><Link className="dropdown-item" to="/products/search">제품 검색</Link></li>

                            </ul>
                        </li>
                        {user?.role === 1 && (
                            <li className="nav-item">
                            <Link className="nav-link" to="/admin">관리자 페이지</Link>
                            </li>
                        )}
                        {user?.role === 2 && (
                            <li className="nav-item">
                            <Link className="nav-link" to="/company">회사 페이지</Link>
                            </li>
                        )}
                        {user?.role === 3 && (
                            <li className="nav-item">
                            <Link className="nav-link" to="/admin">유저 페이지</Link>
                            </li>
                        )}
                        {/* 로그인 로그아웃 버튼 */}
                        {
                            user ? (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/logout">로그아웃</Link>
                                </li>
                            )
                                :
                                (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">로그인</Link>
                                    </li>
                                )
                        }

                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

const NavBars = ({user}) => {
    return (
        <div className="NavBar-container">
            <Link to="/home">홈</Link>
            <Link to="/">메인</Link>
            <Link to="/posts">게시글목록</Link>
            <Link to="/posts/search">게시물 검색</Link>
            <Link to="/posts/create">게시물작성</Link>
            <Link to="/products">제품리스트</Link>
            <Link to="/products/search">제품 검색</Link>

            {/* 사용자 권한에 따른 메뉴 표시
                ?. -> user 정보가 null 또는 undefined 일 경우 대비해서
                존재할 경우에만 사용할 수 있도록 설정
            */}
            {user?.role === 1 && (
                <Link to="/admin">관리자 페이지</Link>
            )}
            {user?.role === 2 && (
                <Link to="/company">회사 페이지</Link>
            )}
            {user?.role === 3 && (
                <Link to="/admin">유저 페이지</Link>
            )}
        </div>
    )
};
export default NavBar;