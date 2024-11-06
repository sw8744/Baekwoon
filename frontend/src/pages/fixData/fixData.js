import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './fixData.css';
import refresh from '../../assets/refresh.svg';
import Graph from "./graph";


const { kakao } = window;
var overlay;

function Fixdata() {
    const navigate = useNavigate();
    const goMain = () => {
        navigate('/');
    };
    const goLiveData = () => {
        navigate('/map');
    };
    const goFlowRate = () => {
        navigate('/flowrate');
    };

    useEffect(() => {
        var container = document.getElementById('map');
        var options = {
            center: new kakao.maps.LatLng(36.35139688692672, 127.30072975158693),
            level: 2
        };
        var map = new kakao.maps.Map(container, options);
        var overlayContent = Graph(100, 10);
        var customOverlay = new kakao.maps.CustomOverlay({
            map: map,
            clickable: true,
            content: '<div class="">' + overlayContent + '</div>',
            position: new kakao.maps.LatLng(36.35093930118267, 127.30023814907075),
            xAnchor: 0.5,
            yAnchor: 1,
            zIndex: 2
        });
        overlay = customOverlay;
        customOverlay.setMap(map);
    }, []);

    return (
        <div id="mapRoot">
            <div id="map">
                <div id="mapButtonDiv">
                    <button id="mapButton" className="mapButton" onClick={() => {goLiveData()}}>실시간 배수로 데이터</button>
                    <button id="mapButton" className="mapButton" onClick={() => {goFlowRate()}}>배수 유속관리 시스템</button>
                    <button id="mapButton" className="mapButtonClicked" onClick={() => {goMain()}}>도시 정비계획 데이터</button>
                    <button id="mapButton" className="mapButton" onClick={() => {}}><img src={refresh} id="refreshBtnImg" /></button>
                </div>
                <div id="settingDiv">
                    <input type="text" id="settingInput" placeholder="예상 강수량..." />
                    <button id="settingButton">설정</button>
                </div>
            </div>
        </div>
    )
}

export default Fixdata;