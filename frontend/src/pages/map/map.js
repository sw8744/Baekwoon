import { useEffect, useState } from "react";
import './map.css';
import Daedeok from "./geojson/Daedeok";
import Dong from "./geojson/Dong";
import Jung from "./geojson/Jung";
import Seo from "./geojson/Seo";
import Yuseong from "./geojson/Yuseong";
import Daejeon from "./geojson/Daejeon";
import DongFinder from "./dong";

const { kakao } = window;

function Map() {
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
            strokeColor: '#39DE2A',
            strokeOpacity: 0.5,
            strokeStyle: 'solid',
            fillColor: '#A2FF99',
            fillOpacity: 0.7
        });

        var polygonDaedeok = new kakao.maps.Polygon({
            path: polygonPathDaedeok,
            strokeWeight: 3,
            strokeColor: '#39DE2A',
            strokeOpacity: 0.5,
            strokeStyle: 'solid',
            fillColor: '#A2FF99',
            fillOpacity: 0.7
        });

        var polygonJung = new kakao.maps.Polygon({
            path: polygonPathJung,
            strokeWeight: 3,
            strokeColor: '#39DE2A',
            strokeOpacity: 0.5,
            strokeStyle: 'solid',
            fillColor: '#A2FF99',
            fillOpacity: 0.7
        });

        var polygonSeo = new kakao.maps.Polygon({
            path: polygonPathSeo,
            strokeWeight: 3,
            strokeColor: '#39DE2A',
            strokeOpacity: 0.5,
            strokeStyle: 'solid',
            fillColor: '#A2FF99',
            fillOpacity: 0.7
        });

        var polygonDong = new kakao.maps.Polygon({
            path: polygonPathDong,
            strokeWeight: 3,
            strokeColor: '#39DE2A',
            strokeOpacity: 0.5,
            strokeStyle: 'solid',
            fillColor: '#A2FF99',
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

        kakao.maps.event.addListener(polygonYuseong, 'click', function(mouseEvent) {  
            map.setCenter(new kakao.maps.LatLng(36.39652012072702, 127.35557556152345));
            map.setLevel(9);
            polygonYuseong.setMap(null);
            polygonDaedeok.setMap(null);
            polygonJung.setMap(null);
            polygonSeo.setMap(null);
            polygonDong.setMap(null);
            DongFinder(kakao, "유성구").forEach(element => {
                element.setMap(map);
            });
        });

        kakao.maps.event.addListener(polygonDaedeok, 'click', function(mouseEvent) {  
            map.setCenter(new kakao.maps.LatLng(36.39652012072702, 127.35557556152345));
            map.setLevel(9);
            polygonYuseong.setMap(null);
            polygonDaedeok.setMap(null);
            polygonJung.setMap(null);
            polygonSeo.setMap(null);
            polygonDong.setMap(null);
            DongFinder(kakao, "대덕구").forEach(element => {
                element.setMap(map);
            });
        });

        kakao.maps.event.addListener(polygonDong, 'click', function(mouseEvent) {  
            map.setCenter(new kakao.maps.LatLng(36.33652012072702, 127.45557556152345));
            map.setLevel(9);
            polygonYuseong.setMap(null);
            polygonDaedeok.setMap(null);
            polygonJung.setMap(null);
            polygonSeo.setMap(null);
            polygonDong.setMap(null);
            DongFinder(kakao, "동구").forEach(element => {
                element.setMap(map);
            });
        });

        kakao.maps.event.addListener(polygonJung, 'click', function(mouseEvent) {  
            map.setCenter(new kakao.maps.LatLng(36.32652012072702, 127.38557556152345));
            map.setLevel(9);
            polygonYuseong.setMap(null);
            polygonDaedeok.setMap(null);
            polygonJung.setMap(null);
            polygonSeo.setMap(null);
            polygonDong.setMap(null);
            DongFinder(kakao, "중구").forEach(element => {
                element.setMap(map);
            });
        });

        kakao.maps.event.addListener(polygonSeo, 'click', function(mouseEvent) {  
            map.setCenter(new kakao.maps.LatLng(36.32652012072702, 127.38557556152345));
            map.setLevel(9);
            polygonYuseong.setMap(null);
            polygonDaedeok.setMap(null);
            polygonJung.setMap(null);
            polygonSeo.setMap(null);
            polygonDong.setMap(null);
            DongFinder(kakao, "서구").forEach(element => {
                element.setMap(map);
            });
        });

    }, []);

    return (
        <div id="mapRoot">
            <div id="map"></div>
        </div>
    )
}

export default Map;