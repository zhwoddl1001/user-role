// axios. 작성했던 기능을 모아서 설정한다음 각 jsx 파일로 전달
// 프링부트 실행 포트 restcontroller 에서 requestMapping 에 작성한 api 를 그대로 작성
// 데이터를 백엔드에서 가지고 왔을 때 왜 res.data 로 작성하는가?!
// res.data 에서 res 라는 명칭은 response 라고 작성해도 되고,
// abc, xyz, abc123 ... 원하는 변수이름으로 작성 OK
// 왜냐하면 백엔드에서 작성되어있는 데이터를 담아서 가져오는 변수 이름일 뿐
// 백엔드 주소에서 담아온 데이터를 변수이름에서 가져와 사용할 때는
// 변수이름.data 라는 명칭을 붙여줘야 함
// 자바스크립트 에서 변수이름에 들어있는 데이터를 확인할 때 .data
// 라는 명칭을 사용하기 때문

import axios from "axios";

const API_POST_URL = "http://localhost:8080/api/posts";

const apiService = {
    // 외부에서 사용할 메서드 명칭 :
    // 기능설정 (파라미터값) {
    //            기능작성
    // }
    getAllPosts:
        function (setPosts, setErr) {
            axios
                .get(API_POST_URL)
                .then( //백엔드 연결 성공
                    (res) => {
                        console.log("res.data", res.data);
                        if (res.data.length > 0) { //  데이터가 1개이상 존재하기 때문에 데이터 보여주기
                            console.log("res.data", res.data);
                            setPosts(res.data)
                        } else {            // 데이터를 가져올 수 있는 데이터가 없기 때문에 데이터 없음 표시
                            alert("백엔드에서 가져올 수 있는 데이터가 없습니다.");
                        }
                    }
                )
                .catch( //백엔드 연결 실패
                    (err) => {
                        alert("게시물을 불러오는 중 오류가 발생했습니다.");
                        setErr("게시판 목록 보기 실패");
                        console.log("err 문제 개발자가 확인하기 : ", err);
                    }
                )
        },

    getPostById:
        function (postId, setPost, setErr) {
            axios
                //.get(API_POST_URL + postId) //http://localhost:8080/api/posts1
                //.get(API_POST_URL + "/"+ postId) //http://localhost:8080/api/posts1
                .get(`${API_POST_URL}/${postId}`) //http://localhost:8080/api/posts1
                .then(
                    res =>
                        setPost(res.data)
                )
                .catch(
                    err => {
                        alert("백엔드에서 데이터를 가져올 수 없습니다.");
                        console.log("개발자만 무슨 문제인지 확인할 수 있도록 설정 : ", setErr(err));
                    }
                )
        },

    searchPosts:
        function (keyword, callback, errorCallback) {
            // encodeURIComponent -> 영어, 숫자 이외 값이 왔을 때 문제가 생길 경우 UTF-8 로 한글 깨짐 없도록 설정
            // 예전 코드에선 필수 였으나, 근래 필수
            axios.get(`${API_POST_URL}/search?keyword=${encodeURIComponent(keyword)}`)
                .then(response => callback(response.data))
                .catch(error => errorCallback(error));
        },

    suggestedPosts:
        function (keyword, callback, errorCallback) {
            axios
                .get(`http://localhost:8080/api/posts/search?keyword=${keyword}`)
                .then(
                    (res) => {
                        const 제안리스트 = res.data?.map(post => post.postTitle) || [];
                        callback(제안리스트);
                        errorCallback(true);
                    }
                )
                .catch(
                    // 백엔드에서 검색어를 입력했을 때 추천하는 검색 리스트 가져오기에 문제가 발생했을 때는
                    // 클라이언트한테 문제가 발생했음을 알려줄 필요 X
                    // 추천 검색어 리스트를 비우고 보여주지 않음 설정
                    (err) => {
                        callback([]);
                        errorCallback(false);
                    }
                )
        },

    updatePost: function (postId, postData, callback, errorCallback) {
        axios.put(`${API_POST_URL}/${postId}`, postData, {
            headers: {"Content-Type": "application/json"}
        })
            .then( // 백엔드와 연결에 성공했습니다.
                (res) => {

                    if (res.data && res.data.updatedAt) {
                        alert("변경된 내용이 없습니다.")
                    } else {

                        alert(callback); //게시물이 수정되었다. 표기
                    }


                }
            )
            .catch( // 백엔드와 연결을 실패했습니다.
                (err) => {
                    alert(errorCallback);
                }
            );
    },
    // 자바스크립트는 , 뒤에 다른 값이 존재하지 않아도
    // 문제가 발생하지 않으므로
    // 기능이나 목록을 작성할 때
    // , 를 작성해주는 것이 가장 좋음!

    deletePost:
    //                                                                                      PostDetail 에서 전달받은 매개변수 자리
    //          매 개 변 수 는 전달 받은 값을 기능 내에서 사용할 수 있도록 설정한 이름일 뿐이기 때문에
    //          postId 가 아니라 abc, apple, xyz 와 같은 이름으로 작성 후 {} 내부에서 작성한 변수이름을 활용
    // function (PostDetail 에서 apiService 를 호출하여 deletePost 기능을 실행했을 때 가져온 postId,
    //           PostDetail 에서 apiService 를 호출하여 deletePost 기능을 실행했을 때 가져온 callback,
    //           PostDetail 에서 apiService 를 호출하여 deletePost 기능을 실행했을 때 가져온 errorCallback) {
    // function (postId, callback, errorCallback) {
        function (postId, callback, errorCallback) {
            axios
                .delete(`${API_POST_URL}/${postId}`)
                .then(
                    (response) => {
                        //  callback(response.data)
                        alert(callback);
                    }
                )
                .catch(
                    // 백엔드에서 삭제가 불가능할 때
                    // 알람으로
                    // 백엔드에서 컨트롤러 연결에 실패하였습니다.

                    error => {
                        alert(errorCallback);
                        //alert("백엔드에서 컨트롤러 연결에 실패하였습니다.");

                        console.error("프론트엔드에서 확인할 에러 메세지 : ", error);
                    }
                )
        }

}

export default apiService;