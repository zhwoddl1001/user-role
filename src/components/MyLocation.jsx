import React, { useEffect, useState } from "react";

const MyLocation = () => {
    const [map, setMap] = useState(null);

    // 기본 위치: 서울특별시 강남구 역삼동 테헤란로 14길 6
    const defaultLocation = { lat: 37.498095, lng: 127.028202 };

    // 임시 음식점 리스트
    const foodPlaces = [
        { name: "김밥천국", lat: 37.493853, lng: 127.029433 },
        { name: "한식 뷔페", lat: 37.493649, lng: 127.025028 },
        { name: "중국집 홍콩반점", lat: 37.493612, lng: 127.026400 },
        { name: "일식 초밥집", lat: 37.501482, lng: 127.025329 },
        { name: "베트남 쌀국수집", lat: 37.494318, lng: 127.030146 }
    ];
    useEffect(() => {
        if (window.kakao && window.kakao.maps) {
            console.log("✅ 카카오맵이 이미 로드됨");
            loadKakaoMap();
            return;
        }

        console.log("🟡 카카오맵 스크립트 추가 중...");
        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=9302732d4f5922e076cdba0d49a8a2fc&libraries=services`;
        script.async = true;
        script.onload = () => {
            console.log("✅ 카카오맵 API 로드 완료");

            setTimeout(() => {
                if (window.kakao && window.kakao.maps) {
                    console.log("✅ 카카오맵 객체 확인됨, 지도 로드 실행");
                    loadKakaoMap();
                } else {
                    console.error("❌ 카카오맵 객체가 없음, API 재로드 필요!");
                }
            }, 1000);
        };
        document.head.appendChild(script);
    }, []);

    const loadKakaoMap = () => {
        if (!window.kakao) {
            console.error("카카오맵 API가 로드되지 않음!");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                console.log(`사용자 위치: ${latitude}, ${longitude}`);
                initializeMap(latitude, longitude);
            },
            (error) => {
                console.warn("Geolocation error:", error);
                console.log("기본 위치로 설정: ", defaultLocation);
                initializeMap(defaultLocation.lat, defaultLocation.lng);
            },
            { enableHighAccuracy: true }
        );
    };

    const initializeMap = (lat, lng) => {
        setTimeout(() => {
            if (!window.kakao || !window.kakao.maps) {
                console.error("❌ 카카오맵 API가 아직 로드되지 않았습니다! 초기화 중단.");
                return;
            }

            console.log("✅ 카카오맵이 정상적으로 로드됨:", window.kakao.maps);

            const container = document.getElementById("map");
            if (!container) {
                console.error("❌ 지도를 표시할 div(#map)를 찾을 수 없음!");
                return;
            }

            // 🛠 `LatLng`이 올바르게 호출되도록 수정
            const centerPosition = new window.kakao.maps.LatLng(lat, lng);

            const options = {
                center: centerPosition,
                level: 4,
            };

            const kakaoMap = new window.kakao.maps.Map(container, options);
            setMap(kakaoMap);

            const userMarker = new window.kakao.maps.Marker({
                position: centerPosition, // 🛠 수정된 부분
                map: kakaoMap,
            });

            const userInfowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
            userInfowindow.setContent('<div style="padding:5px;">내 위치</div>');
            userInfowindow.open(kakaoMap, userMarker);

            addMarkers(kakaoMap);
            searchNearbyPlaces(kakaoMap, lat, lng);
        }, 500);
    };

    const addMarkers = (map) => {
        foodPlaces.forEach((place) => {
            const marker = new window.kakao.maps.Marker({
                position: new window.kakao.maps.LatLng(place.lat, place.lng),
                map,
            });

            const infowindow = new window.kakao.maps.InfoWindow({
                content: `<div style="padding:5px;font-size:12px;">${place.name}</div>`,
            });

            window.kakao.maps.event.addListener(marker, "mouseover", () => {
                infowindow.open(map, marker);
            });

            window.kakao.maps.event.addListener(marker, "mouseout", () => {
                infowindow.close();
            });
        });

        console.log("음식점 마커 추가 완료");
    };

    const searchNearbyPlaces = (map, lat, lng) => {
        const ps = new window.kakao.maps.services.Places();
        const options = {
            location: new window.kakao.maps.LatLng(lat, lng),
            radius: 10000, // 반경 10km
        };

        ps.keywordSearch("음식점", (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                console.log(`반경 10km 내 음식점 개수: ${data.length}`);
                data.forEach((place) => {
                    const marker = new window.kakao.maps.Marker({
                        position: new window.kakao.maps.LatLng(place.y, place.x),
                        map,
                    });

                    const infowindow = new window.kakao.maps.InfoWindow({
                        content: `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`,
                    });

                    window.kakao.maps.event.addListener(marker, "mouseover", () => {
                        infowindow.open(map, marker);
                    });

                    window.kakao.maps.event.addListener(marker, "mouseout", () => {
                        infowindow.close();
                    });
                });
            } else {
                console.log("반경 10km 내 음식점을 찾을 수 없습니다.");
            }
        });
    };

    return (
        <div>
            <h2>내 위치 기반 음식점 검색</h2>
            <div id="map" style={{ width: "100%", height: "500px", minHeight: "400px", border: "1px solid black" }}></div>
        </div>
    );
};

export default MyLocation;