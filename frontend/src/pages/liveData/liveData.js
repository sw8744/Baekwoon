import { useEffect, useState } from "react";
import './liveData.css';
import Daedeok from "./geojson/Daedeok";
import Dong from "./geojson/Dong";
import Jung from "./geojson/Jung";
import Seo from "./geojson/Seo";
import Yuseong from "./geojson/Yuseong";
import Daejeon from "./geojson/Daejeon";
import DongFinder from "./dong";
import safe from "../../assets/pin/safe.png";
import warning from "../../assets/pin/warning.png";
import danger from "../../assets/pin/danger.png";
import { useNavigate } from "react-router-dom";
import refresh from "../../assets/refresh.svg";

const { kakao } = window;
var pins = [];

function Livedata() {
    const navigate = useNavigate();
    const [guState, setGuState] = useState({"대덕구": 0, "유성구": 0, "동구": 0, "중구": 0, "서구": 0});
    const pinImg = [new kakao.maps.MarkerImage(safe, new kakao.maps.Size(30, 62), {offset: new kakao.maps.Point(15, 62)}), new kakao.maps.MarkerImage(warning, new kakao.maps.Size(60, 75), {offset: new kakao.maps.Point(30, 75)}), new kakao.maps.MarkerImage(danger, new kakao.maps.Size(40, 70), {offset: new kakao.maps.Point(20, 70)})];

    const colorCode = [['#39DE2A', '#A2FF99'], ['#FFC107', '#FFE400'], ['#DC3545', '#FF4848']]

    const fetchGuInfo = async () => {
        const response = await fetch('http://127.0.0.1:5000/api/getGuInfo');
        const data = await response.json();
        return data;
    };

    const fetchBlockInfo = async () => { 
        const response = await fetch('http://127.0.0.1:5000/api/getBlockInfo');
        const data = await response.json();
        return data;
    };

    const fetchPinInfo = async (marker, index) => {
        const response = await fetch('http://127.0.0.1:5000/api/getSensorInfo');
        const data = await response.json();
        index = String(index);
        if(data[index]["switch1"] === 2 || data[index]["switch2"] === 2) {
            marker.setImage(pinImg[2]);
        }
        else {
            marker.setImage(pinImg[1]);
        }
    };

    const goMain = () => {
        navigate('/');
    };

    const goFlowRate = () => {
        navigate('/flowrate');
    };

    const goFixData = () => {
        navigate('/fixdata');
    };

    useEffect(() => {
        var container = document.getElementById('map');
        var options = {
            center: new kakao.maps.LatLng(36.3513473654900, 127.30094246537497),
            level: 13
        };
        var map = new kakao.maps.Map(container, options);
        var polygonPathDaejeon = [];
        var polygonPathYuseong = [];
        var polygonPathDaedeok = [];
        var polygonPathDong = [];
        var polygonPathSeo = [];
        var polygonPathJung = [];

        for (var i = 0; i < Daejeon.features.length; i++) {
            var geo = Daejeon.features[i].geometry.coordinates[0];
            for (var j = 0; j < geo.length; j++) {
                polygonPathDaejeon.push(new kakao.maps.LatLng(geo[j][1], geo[j][0]));
            }
        };

        for (var i = 0; i < Yuseong.features.length; i++) {
            var geo = Yuseong.features[i].geometry.coordinates[0];
            for (var j = 0; j < geo.length; j++) {
                polygonPathYuseong.push(new kakao.maps.LatLng(geo[j][1], geo[j][0]));
            }
        };

        for (var i = 0; i < Dong.features.length; i++) {
            var geo = Dong.features[i].geometry.coordinates[0];
            for (var j = 0; j < geo.length; j++) {
                polygonPathDong.push(new kakao.maps.LatLng(geo[j][1], geo[j][0]));
            }
        };

        for (var i = 0; i < Daedeok.features.length; i++) {
            var geo = Daedeok.features[i].geometry.coordinates[0];
            for (var j = 0; j < geo.length; j++) {
                polygonPathDaedeok.push(new kakao.maps.LatLng(geo[j][1], geo[j][0]));
            }
        };

        for (var i = 0; i < Seo.features.length; i++) {
            var geo = Seo.features[i].geometry.coordinates[0];
            for (var j = 0; j < geo.length; j++) {
                polygonPathSeo.push(new kakao.maps.LatLng(geo[j][1], geo[j][0]));
            }
        };

        for (var i = 0; i < Jung.features.length; i++) {
            var geo = Jung.features[i].geometry.coordinates[0];
            for (var j = 0; j < geo.length; j++) {
                polygonPathJung.push(new kakao.maps.LatLng(geo[j][1], geo[j][0]));
            }
        };


        var polygonDajeon = new kakao.maps.Polygon({
            path: polygonPathDaejeon, // 그려질 다각형의 좌표 배열입니다
            strokeWeight: 3, // 선의 두께입니다
            strokeColor: '#39DE2A', // 선의 색깔입니다
            strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid', // 선의 스타일입니다
            fillColor: '#A2FF99', // 채우기 색깔입니다
            fillOpacity: 0.7 // 채우기 불투명도 입니다
        });

        var polygonYuseong = new kakao.maps.Polygon({
            path: polygonPathYuseong,
            strokeWeight: 3,
            strokeColor: colorCode[guState["유성구"]][0],
            strokeOpacity: 0.5,
            strokeStyle: 'solid',
            fillColor: colorCode[guState["유성구"]][1],
            fillOpacity: 0.7
        });

        var polygonDaedeok = new kakao.maps.Polygon({
            path: polygonPathDaedeok,
            strokeWeight: 3,
            strokeColor: colorCode[guState["대덕구"]][0],
            strokeOpacity: 0.5,
            strokeStyle: 'solid',
            fillColor: colorCode[guState["대덕구"]][1],
            fillOpacity: 0.7
        });

        var polygonJung = new kakao.maps.Polygon({
            path: polygonPathJung,
            strokeWeight: 3,
            strokeColor: colorCode[guState["중구"]][0],
            strokeOpacity: 0.5,
            strokeStyle: 'solid',
            fillColor: colorCode[guState["중구"]][1],
            fillOpacity: 0.7
        });

        var polygonSeo = new kakao.maps.Polygon({
            path: polygonPathSeo,
            strokeWeight: 3,
            strokeColor: colorCode[guState["서구"]][0],
            strokeOpacity: 0.5,
            strokeStyle: 'solid',
            fillColor: colorCode[guState["서구"]][1],
            fillOpacity: 0.7
        });

        var polygonDong = new kakao.maps.Polygon({
            path: polygonPathDong,
            strokeWeight: 3,
            strokeColor: colorCode[guState["동구"]][0],
            strokeOpacity: 0.5,
            strokeStyle: 'solid',
            fillColor: colorCode[guState["동구"]][1],
            fillOpacity: 0.7
        });

        polygonDajeon.setMap(map);

        kakao.maps.event.addListener(polygonDajeon, 'click', function(mouseEvent) {  
            map.setCenter(new kakao.maps.LatLng(36.350556922518145, 127.38483493545483));
            map.setLevel(9);
            polygonDajeon.setMap(null);
            polygonYuseong.setMap(map);
            polygonDaedeok.setMap(map);
            polygonJung.setMap(map);
            polygonSeo.setMap(map);
            polygonDong.setMap(map);
        });

        kakao.maps.event.addListener(polygonYuseong, 'click', async function(mouseEvent) {  
            map.setCenter(new kakao.maps.LatLng(36.39652012072702, 127.35557556152345));
            map.setLevel(9);
            polygonYuseong.setMap(null);
            polygonDaedeok.setMap(null);
            polygonJung.setMap(null);
            polygonSeo.setMap(null);
            polygonDong.setMap(null);
            var yuseongInfo = await DongFinder(kakao, "유성구");
            var blockInfo = await fetchBlockInfo();
            console.log(blockInfo);
            yuseongInfo.forEach(element => {
                element.setMap(map);
                kakao.maps.event.addListener(element, 'click', async function(mouseEvent) {  
                    map.setCenter(new kakao.maps.LatLng(36.35139688692672, 127.30072975158693));
                    map.setLevel(2);
                    yuseongInfo.forEach(element => {
                        element.setMap(null);
                    });
                    var polygonPathBlock1 = [
                        new kakao.maps.LatLng(36.35092881404372, 127.29913651943208),
                        new kakao.maps.LatLng(36.3516935408418, 127.29913115501405),
                        new kakao.maps.LatLng(36.35236321068214, 127.29965686798097),
                        new kakao.maps.LatLng(36.35238049240821, 127.30030059814455),
                        new kakao.maps.LatLng(36.35093745506643, 127.30033814907075)
                    ];

                    var polygonPathBlock2 = [
                        new kakao.maps.LatLng(36.35093745506643, 127.30033814907075),
                        new kakao.maps.LatLng(36.350920173020015, 127.29911506175996),
                        new kakao.maps.LatLng(36.350747352344854, 127.29916334152223),
                        new kakao.maps.LatLng(36.349775228899006, 127.30008602142335),
                        new kakao.maps.LatLng(36.35070846764009, 127.3011213541031),
                        new kakao.maps.LatLng(36.35123124926858, 127.30140030384065),
                        new kakao.maps.LatLng(36.35166761802249, 127.30204939842226),
                        new kakao.maps.LatLng(36.35159849046213, 127.3003669139863),
                    ];
                    
                    var polygonBlock1 = new kakao.maps.Polygon({
                        path: polygonPathBlock1,
                        strokeWeight: 3,
                        strokeColor: colorCode[1][0],
                        strokeOpacity: 0.5,
                        strokeStyle: 'solid',
                        fillColor: colorCode[1][1],
                        fillOpacity: 0.7
                    });

                    var polygonBlock2 = new kakao.maps.Polygon({
                        path: polygonPathBlock2,
                        strokeWeight: 3,
                        strokeColor: colorCode[2][0],
                        strokeOpacity: 0.5,
                        strokeStyle: 'solid',
                        fillColor: colorCode[2][1],
                        fillOpacity: 0.7
                    });

                    polygonBlock1.setMap(map);
                    polygonBlock2.setMap(map);

                    var markerPosition = [
                        {
                            latlng: new kakao.maps.LatLng(36.35100203157771, 127.29940096624644)
                        },
                        {
                            latlng: new kakao.maps.LatLng(36.35198889750537, 127.30026814240678)
                        },
                        {
                            latlng: new kakao.maps.LatLng(36.350531352427645, 127.29932675141482)
                        },
                        {
                            latlng: new kakao.maps.LatLng(36.35156153168215, 127.30178161602238)
                        }
                    ];

                    for(var i = 0; i < markerPosition.length; i++) {
                        var pin = new kakao.maps.Marker({
                            map: map,
                            position: markerPosition[i].latlng,
                            image: pinImg[2]
                        });
                        pins.push(pin);
                    }
                });
            });
        });

        kakao.maps.event.addListener(polygonDaedeok, 'click', async function(mouseEvent) {  
            map.setCenter(new kakao.maps.LatLng(36.39652012072702, 127.35557556152345));
            map.setLevel(9);
            polygonYuseong.setMap(null);
            polygonDaedeok.setMap(null);
            polygonJung.setMap(null);
            polygonSeo.setMap(null);
            polygonDong.setMap(null);
            var daedeokInfo = await DongFinder(kakao, "대덕구");
            daedeokInfo.forEach(element => {
                element.setMap(map);
            });   
        });

        kakao.maps.event.addListener(polygonDong, 'click', async function(mouseEvent) {  
            map.setCenter(new kakao.maps.LatLng(36.33652012072702, 127.45557556152345));
            map.setLevel(9);
            polygonYuseong.setMap(null);
            polygonDaedeok.setMap(null);
            polygonJung.setMap(null);
            polygonSeo.setMap(null);
            polygonDong.setMap(null);
            var dongInfo = await DongFinder(kakao, "동구");
            dongInfo.forEach(element => {
                element.setMap(map);
            });
        });

        kakao.maps.event.addListener(polygonJung, 'click', async function(mouseEvent) {  
            map.setCenter(new kakao.maps.LatLng(36.32652012072702, 127.38557556152345));
            map.setLevel(9);
            polygonYuseong.setMap(null);
            polygonDaedeok.setMap(null);
            polygonJung.setMap(null);
            polygonSeo.setMap(null);
            polygonDong.setMap(null);
            var jungInfo = await DongFinder(kakao, "중구");
            jungInfo.forEach(element => {
                element.setMap(map);
            });
        });

        kakao.maps.event.addListener(polygonSeo, 'click', async function(mouseEvent) {  
            map.setCenter(new kakao.maps.LatLng(36.32652012072702, 127.38557556152345));
            map.setLevel(9);
            polygonYuseong.setMap(null);
            polygonDaedeok.setMap(null);
            polygonJung.setMap(null);
            polygonSeo.setMap(null);
            polygonDong.setMap(null);
            var seoInfo = await DongFinder(kakao, "서구");
            seoInfo.forEach(element => {
                element.setMap(map);
            });
        });

        fetchGuInfo().then(data => {
            setGuState(data);
            console.log(guState);
            if(data["대덕구"] === 0) {
                polygonDaedeok.setOptions({
                    strokeColor: colorCode[0][0],
                    fillColor: colorCode[0][1]
                });
            }
            else if(data["대덕구"] === 1) {
                polygonDaedeok.setOptions({
                    strokeColor: colorCode[1][0],
                    fillColor: colorCode[1][1]
                });
            }
            else if(data["대덕구"] === 2) {
                polygonDaedeok.setOptions({
                    strokeColor: colorCode[2][0],
                    fillColor: colorCode[2][1]
                });
            }

            if(data["유성구"] === 0) {
                polygonYuseong.setOptions({
                    strokeColor: colorCode[0][0],
                    fillColor: colorCode[0][1]
                });
            }
            else if(data["유성구"] === 1) {
                polygonYuseong.setOptions({
                    strokeColor: colorCode[1][0],
                    fillColor: colorCode[1][1]
                });
            }
            else if(data["유성구"] === 2) {
                polygonYuseong.setOptions({
                    strokeColor: colorCode[2][0],
                    fillColor: colorCode[2][1]
                });
            }

            if(data["동구"] === 0) {
                polygonDong.setOptions({
                    strokeColor: colorCode[0][0],
                    fillColor: colorCode[0][1]
                });
            }
            else if(data["동구"] === 1) {
                polygonDong.setOptions({
                    strokeColor: colorCode[1][0],
                    fillColor: colorCode[1][1]
                });
            }
            else if(data["동구"] === 2) {
                polygonDong.setOptions({
                    strokeColor: colorCode[2][0],
                    fillColor: colorCode[2][1]
                });
            }
            
            if(data["중구"] === 0) {
                polygonJung.setOptions({
                    strokeColor: colorCode[0][0],
                    fillColor: colorCode[0][1]
                });
            }
            else if(data["중구"] === 1) {
                polygonJung.setOptions({
                    strokeColor: colorCode[1][0],
                    fillColor: colorCode[1][1]
                });
            }
            else if(data["중구"] === 2) {
                polygonJung.setOptions({
                    strokeColor: colorCode[2][0],
                    fillColor: colorCode[2][1]
                });
            }

            if(data["서구"] === 0) {
                polygonSeo.setOptions({
                    strokeColor: colorCode[0][0],
                    fillColor: colorCode[0][1]
                });
            }
            else if(data["서구"] === 1) {
                polygonSeo.setOptions({
                    strokeColor: colorCode[1][0],
                    fillColor: colorCode[1][1]
                });
            }
            else if(data["서구"] === 2) {
                polygonSeo.setOptions({
                    strokeColor: colorCode[2][0],
                    fillColor: colorCode[2][1]
                });
            }
        });
    }, []);

    return (
        <div id="mapRoot">
            <div id="map">
                <div id="mapButtonDiv">
                    <button id="mapButton" className="mapButtonClicked" onClick={() => {goMain()}}>실시간 배수로 데이터</button>
                    <button id="mapButton" className="mapButton" onClick={() => {goFlowRate()}}>배수 유속관리 시스템</button>
                    <button id="mapButton" className="mapButton" onClick={() => {goFixData()}}>도시 정비계획 데이터</button>
                    <button id="mapButton" className="mapButton" onClick={() => {for(var i = 0; i < pins.length; i++) {fetchPinInfo(pins[i], i + 1);}}}><img src={refresh} id="refreshBtnImg" /></button>
                </div>
            </div>
        </div>
    )
}

export default Livedata;