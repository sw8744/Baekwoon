import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './flowRate.css';

const { kakao } = window;

function Flowrate() {
    const [value, setValue] = useState(5);
    const navigate = useNavigate();
    const goMain = () => {
        navigate('/');
    };
    const goLiveData = () => {
        navigate('/map');
    };

    useEffect(() => {
        const overlayCoords = [
            [new kakao.maps.LatLng(36.35093930118267, 127.30003814907075)],
            [new kakao.maps.LatLng(36.35093930118267, 127.29983814907075)],
            [new kakao.maps.LatLng(36.35093930118267, 127.29963814907075)],
            [new kakao.maps.LatLng(36.35093930118267, 127.29943814907075)],
            [new kakao.maps.LatLng(36.35093930118267, 127.29923814907075)],
            [new kakao.maps.LatLng(36.35093930118267, 127.2990794907075)],
            [new kakao.maps.LatLng(36.35111930118267, 127.2990794907075)],
            [new kakao.maps.LatLng(36.35131930118267, 127.2990794907075)],
            [new kakao.maps.LatLng(36.35151930118267, 127.2990794907075)],
            [new kakao.maps.LatLng(36.35171930118267, 127.2991494907075)],
            [new kakao.maps.LatLng(36.35193930118267, 127.2992794907075)],
            [new kakao.maps.LatLng(36.35216030118267, 127.2994294907075)],
            [new kakao.maps.LatLng(36.35225530118267, 127.2996194907075)],
        ];

        var container = document.getElementById('map');
        var options = {
            center: new kakao.maps.LatLng(36.35139688692672, 127.30072975158693),
            level: 2
        };
        var map = new kakao.maps.Map(container, options);
        var customOverlay = new kakao.maps.CustomOverlay({
            map: map,
            clickable: true,
            content: '<div class="customOverlay">' + value + '</div>',
            position: new kakao.maps.LatLng(36.35093930118267, 127.30023814907075),
            xAnchor: 0.5,
            yAnchor: 1,
            zIndex: 2
        });
        customOverlay.setMap(map);

        for(var i = 0; i < overlayCoords.length; i++) {
            var temp = overlayCoords[i][0];
            var res = new kakao.maps.CustomOverlay({
                map: map,
                clickable: true,
                content: '<div class="customOverlay">1</div>',
                position: temp,
                xAnchor: 0.5,
                yAnchor: 1,
                zIndex: 2
            });
            res.setMap(map);
        }
    }, []);

    return (
        <div id="mapRoot">
            <div id="map">
                <div id="mapButtonDiv">
                    <button id="mapButton" className="mapButton" onClick={() => {goLiveData()}}>실시간 배수로 데이터</button>
                    <button id="mapButton" className="mapButtonClicked" onClick={() => {goMain()}}>배수 유속관리 시스템</button>
                    <button id="mapButton" className="mapButton">도시 정비계획 데이터</button>
                </div>
            </div>
        </div>
    );
}

export default Flowrate;