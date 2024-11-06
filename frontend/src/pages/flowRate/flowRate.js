import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './flowRate.css';
import refresh from '../../assets/refresh.svg';

const { kakao } = window;

var overlay;

function Flowrate() {
    const navigate = useNavigate();
    const goMain = () => {
        navigate('/');
    };
    const goLiveData = () => {
        navigate('/map');
    };
    const goFixData = () => {
        navigate('/fixdata');
    };

    const fetchFlowRate = async (overlay) => {
        const response = await fetch('http://127.0.0.1:5000/api/getSensorInfo');
        const data = await response.json();
        const dataOverlay = await data["1"].state;
        var classNameOverlay = await data > 2 ? 'customOverlay' : 'customOverlayLow';
        console.log(dataOverlay);
        await overlay.setContent('<div class="' + classNameOverlay + '">' + dataOverlay + '</div>');
    };

    var flowValue = [1, 2, 1, 1, 2, 2, 3, 3, 4, 5, 4, 3, 5, 4, 3, 3, 5, 4, 4, 5, 3, 3, 4, 5, 3, 2, 1, 2, 2, 1];

    useEffect(() => {
        const overlayCoords = [
            // Block 1
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
            [new kakao.maps.LatLng(36.35229530118267, 127.2996194907075)],
            [new kakao.maps.LatLng(36.35232530118267, 127.2998194907075)],
            [new kakao.maps.LatLng(36.35232530118267, 127.300044907075)],
            [new kakao.maps.LatLng(36.35232736118267, 127.300254907075)],
            [new kakao.maps.LatLng(36.35210036118267, 127.300254907075)],
            [new kakao.maps.LatLng(36.35180036118267, 127.300254907075)],
            [new kakao.maps.LatLng(36.35150036118267, 127.300254907075)],
            [new kakao.maps.LatLng(36.35120036118267, 127.300254907075)],

            // Block 2
            [new kakao.maps.LatLng(36.35073930118267, 127.2990794907075)],
            [new kakao.maps.LatLng(36.35048930118267, 127.2993194907075)],
            [new kakao.maps.LatLng(36.35022930118267, 127.2995794907075)],
            [new kakao.maps.LatLng(36.35002930118267, 127.2997794907075)],
            [new kakao.maps.LatLng(36.34972930118267, 127.3000794907075)],
            [new kakao.maps.LatLng(36.35002930118267, 127.3004294907075)],
            [new kakao.maps.LatLng(36.350422930118267, 127.3009094907075)],
            [new kakao.maps.LatLng(36.350822930118267, 127.3011694907075)],
            [new kakao.maps.LatLng(36.351322930118267, 127.3015094907075)],
            [new kakao.maps.LatLng(36.351622930118267, 127.3019094907075)],
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
            content: '<div class="customOverlayLow">0</div>',
            position: new kakao.maps.LatLng(36.35093930118267, 127.30023814907075),
            xAnchor: 0.5,
            yAnchor: 1,
            zIndex: 2
        });
        overlay = customOverlay;
        customOverlay.setMap(map);

        for(var i = 0; i < overlayCoords.length; i++) {
            var temp = overlayCoords[i][0];
            var contentValue = flowValue[i];
            var contentClassValue = contentValue > 2 ? 'customOverlay' : 'customOverlayLow';
            var res = new kakao.maps.CustomOverlay({
                map: map,
                clickable: true,
                content: '<div class="' + contentClassValue + '">' + contentValue + '</div>',
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
                    <button id="mapButton" className="mapButton" onClick={() => {goFixData()}}>도시 정비계획 데이터</button>
                    <button id="mapButton" className="mapButton" onClick={() => {fetchFlowRate(overlay)}}><img src={refresh} id="refreshBtnImg" /></button>
                </div>
            </div>
        </div>
    );
}

export default Flowrate;