import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './fixData.css';
import refresh from '../../assets/refresh.svg';

const { kakao } = window;
var overlay = [];
var maxValue = [100, 150, 300, 50, 200, 75];

const Graph = async (maxValue, currentValue) => {
    var graphWidth = 20;
    var graphHeight = 100;
    var graphValue = Math.round((currentValue / maxValue) * 100);
    var graphColor = '#FF0000';
    if (graphValue < 50) {
        graphColor = '#9FCE63';
    } else if (graphValue < 80) {
        graphColor = '#F8D648';
    }
    var graphValueFinal = graphValue;
    if (graphValue > 100) {
        graphValue = 100;
    }
    return ('<div id="graphRoot"><div id="graphText">' + maxValue + 'mm/h 수용 가능<br>(' + graphValueFinal + '%)</div><div class="graph" style="width:' + graphWidth + 'px;height:' + graphHeight + 'px; border: 1px solid #000066;"><div class="graphValue" style="width:' + graphWidth + 'px;height:' + graphValue + '%;background-color:' + graphColor + '; margin-top: ' + (graphHeight - graphValue) + 'px;"></div></div></div>');
    
}

function Fixdata() {
    const rainFallInput = useRef();

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

    const calculate = async (overlays) => {
        var rainFall = await rainFallInput.current.value;
        rainFall = parseInt(rainFall);
        var contents = [];
        for(var i = 0; i < overlays.length; i++) {
            var maxSize = maxValue[i];
            if(maxSize != undefined) {
                await Graph(maxSize, rainFall).then((overlayContent) => {
                    contents.push(overlayContent);
                });
            }
        }
        console.log(contents);
        console.log(overlays);
        if(contents != undefined) {
            for(var i = 0; i < contents.length; i++) {
                overlays[i].setContent('<div class="">' + contents[i] + '</div>');
            }
        }
    };
    useEffect(() => {
        var container = document.getElementById('map');
        var options = {
            center: new kakao.maps.LatLng(36.35139688692672, 127.30072975158693),
            level: 2
        };
        var map = new kakao.maps.Map(container, options);
        if(overlay.length <= 6) {
            overlay = [];
            Graph(maxValue[0], 10).then((overlayContent) => {
                var customOverlay1 = new kakao.maps.CustomOverlay({
                    map: map,
                    clickable: true,
                    content: '<div class="">' + overlayContent + '</div>',
                    position: new kakao.maps.LatLng(36.35093930118267, 127.30023814907075),
                    xAnchor: 0.5,
                    yAnchor: 1,
                    zIndex: 2
                });
                overlay.push(customOverlay1);
                customOverlay1.setMap(map);
            });
            
            Graph(maxValue[1], 10).then((overlayContent) => {
                var customOverlay2 = new kakao.maps.CustomOverlay({
                    map: map,
                    clickable: true,
                    content: '<div class="">' + overlayContent + '</div>',
                    position: new kakao.maps.LatLng(36.35093930118267, 127.29906814907075),
                    xAnchor: 0.5,
                    yAnchor: 1,
                    zIndex: 2
                });
                overlay.push(customOverlay2);
                customOverlay2.setMap(map);
            });
    
            Graph(maxValue[2], 10).then((overlayContent) => {
                var customOverlay3 = new kakao.maps.CustomOverlay({
                    map: map,
                    clickable: true,
                    content: '<div class="">' + overlayContent + '</div>',
                    position: new kakao.maps.LatLng(36.34973930118267, 127.30006814907075),
                    xAnchor: 0.5,
                    yAnchor: 1,
                    zIndex: 2
                });
                overlay.push(customOverlay3);
                customOverlay3.setMap(map);
            });
    
            Graph(maxValue[3], 10).then((overlayContent) => {
                var customOverlay4 = new kakao.maps.CustomOverlay({
                    map: map,
                    clickable: true,
                    content: '<div class="">' + overlayContent + '</div>',
                    position: new kakao.maps.LatLng(36.35047930118267, 127.30093814907075),
                    xAnchor: 0.5,
                    yAnchor: 1,
                    zIndex: 2
                });
                overlay.push(customOverlay4);
                customOverlay4.setMap(map);
            });
    
            Graph(maxValue[4], 10).then((overlayContent) => {
                var customOverlay5 = new kakao.maps.CustomOverlay({
                    map: map,
                    clickable: true,
                    content: '<div class="">' + overlayContent + '</div>',
                    position: new kakao.maps.LatLng(36.3516430118267, 127.30189814907075),
                    xAnchor: 0.5,
                    yAnchor: 1,
                    zIndex: 2
                });
                overlay.push(customOverlay5);
                customOverlay5.setMap(map);
            });
    
            Graph(maxValue[5], 10).then((overlayContent) => {
                var customOverlay6 = new kakao.maps.CustomOverlay({
                    map: map,
                    clickable: true,
                    content: '<div class="">' + overlayContent + '</div>',
                    position: new kakao.maps.LatLng(36.3523430118267, 127.30025814907075),
                    xAnchor: 0.5,
                    yAnchor: 1,
                    zIndex: 2
                });
                overlay.push(customOverlay6);
                customOverlay6.setMap(map);
            });
        }
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
                    <input type="text" id="settingInput" placeholder="예상 강수량..." defaultValue={10} ref={rainFallInput} />
                    <button id="settingButton" onClick={() => {calculate(overlay)}}>설정</button>
                </div>
            </div>
        </div>
    )
}

export default Fixdata;