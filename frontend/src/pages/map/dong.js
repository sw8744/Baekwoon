import DongOfDaejeon from "./geojson/DongOfDajeon.json";

function DongFinder(kakao, guName) {
    const dongOfDaedeok = ["갈전동", "대화동", "덕암동", "목상동", "문평동", "미호동", "법동", "부수동", "비래동", "삼정동_대덕구", "상서동", "석봉동", "송촌동", "신대동", "신일동", "신탄진동", "연축동", "오정동", "와동", "용호동", "읍내동", "이현동", "장동_대덕구", "중리동", "평촌동_대덕구", "황호동"];
    const dongOfDong = ["가양동", "가오동", "구도동", "낭월동", "내탑동", "대동_동구", "대별동", "대성동", "마산동", "비룡동", "사성동", "삼괴동", "삼성동", "삼정동_동구", "상소동", "성남동", "세천동", "소제동", "소호동", "신상동", "신안동", "신촌동", "신하동", "신흥동", "오동_동구", "용계동_동구", "용운동", "용전동", "원동", "이사동", "인동", "자양동", "장척동", "정동", "주산동", "주촌동", "중동", "직동", "천동", "추동", "판암동", "하소동", "홍도동", "효동", "효평동"];
    const dongOfSeo = ["가수원동", "가장동", "갈마동", "관저동", "괴곡동", "괴정동", "내동", "도마동", "도안동", "둔산동", "만년동", "매노동", "변동", "복수동", "봉곡동", "산직동", "오동_서구", "용문동", "용촌동", "우명동", "원정동", "월평동", "장안동", "정림동", "탄방동", "평촌동_서구", "흑석동"];
    const dongOfYuseong = ["가정동", "갑동", "계산동", "관평동", "교촌동", "구룡동", "구성동", "구암동", "궁동", "금고동", "금탄동", "노은동", "대동_유성구", "대정동", "덕명동", "덕진동", "도룡동_유성구", "둔곡동", "문지동", "반석동", "방동", "방현동", "복용동", "봉명동", "봉산동", "봉산동", "상대동", "성북동", "세동", "송강동", "송정동", "수남동", "신동", "신봉동", "신성동", "안산동", "어은동", "외삼동", "용계동_유성구", "용산동", "원내동", "원신흥동", "원촌동", "자운동", "장대동", "장동_유성구", "전민동", "죽동", "지족동", "추목동", "탑립동", "하기동", "학하동", "화암동"];
    const dongOfJung = ["구완동", "금동", "대사동", "대흥동", "목달동", "목동", "무수동", "문창동", "문화동", "부사동", "사정동", "산성동", "석교동", "선화동", "안영동", "어남동", "오류동", "옥계동", "용두동", "유천동", "은행동", "정생동", "중촌동", "침산동", "태평동", "호동"];

    var resultDaedeok = [];
    var resultDong = [];
    var resultSeo = [];
    var resultYuseong = [];
    var resultJung = [];

    for (var i = 0; i < DongOfDaejeon.features.length; i++) {
        var dongName = DongOfDaejeon.features[i].properties.EMD_KOR_NM;
        var temp = [];
        console.log(dongName);
        if(dongOfDaedeok.includes(dongName)) {
            for(var j = 0; j < DongOfDaejeon.features[i].geometry.coordinates[0].length; j++) {
                temp.push(new kakao.maps.LatLng(DongOfDaejeon.features[i].geometry.coordinates[0][j][1], DongOfDaejeon.features[i].geometry.coordinates[0][j][0]));
            }
            var res = new kakao.maps.Polygon({
                path: temp,
                strokeWeight: 3,
                strokeColor: '#39DE2A',
                strokeOpacity: 0.5,
                strokeStyle: 'solid',
                fillColor: '#A2FF99',
                fillOpacity: 0.7
            })
            resultDaedeok.push(res);
            console.log("대덕구");
        }
        else if(dongOfDong.includes(dongName)) {
            for(var j = 0; j < DongOfDaejeon.features[i].geometry.coordinates[0].length; j++) {
                temp.push(new kakao.maps.LatLng(DongOfDaejeon.features[i].geometry.coordinates[0][j][1], DongOfDaejeon.features[i].geometry.coordinates[0][j][0]));
            }
            var res = new kakao.maps.Polygon({
                path: temp,
                strokeWeight: 3,
                strokeColor: '#39DE2A',
                strokeOpacity: 0.5,
                strokeStyle: 'solid',
                fillColor: '#A2FF99',
                fillOpacity: 0.7
            })
            resultDong.push(res);
            console.log("동구");
        }
        else if(dongOfSeo.includes(dongName)) {
            for(var j = 0; j < DongOfDaejeon.features[i].geometry.coordinates[0].length; j++) {
                temp.push(new kakao.maps.LatLng(DongOfDaejeon.features[i].geometry.coordinates[0][j][1], DongOfDaejeon.features[i].geometry.coordinates[0][j][0]));
            }
            var res = new kakao.maps.Polygon({
                path: temp,
                strokeWeight: 3,
                strokeColor: '#39DE2A',
                strokeOpacity: 0.5,
                strokeStyle: 'solid',
                fillColor: '#A2FF99',
                fillOpacity: 0.7
            })
            resultSeo.push(res);
            console.log("서구");
        }
        else if(dongOfYuseong.includes(dongName)) {
            for(var j = 0; j < DongOfDaejeon.features[i].geometry.coordinates[0].length; j++) {
                temp.push(new kakao.maps.LatLng(DongOfDaejeon.features[i].geometry.coordinates[0][j][1], DongOfDaejeon.features[i].geometry.coordinates[0][j][0]));
            }
            var res = new kakao.maps.Polygon({
                path: temp,
                strokeWeight: 3,
                strokeColor: '#39DE2A',
                strokeOpacity: 0.5,
                strokeStyle: 'solid',
                fillColor: '#A2FF99',
                fillOpacity: 0.7
            })
            resultYuseong.push(res);
            console.log("유성구");
        }
        else if(dongOfJung.includes(dongName)) {
            for(var j = 0; j < DongOfDaejeon.features[i].geometry.coordinates[0].length; j++) {
                temp.push(new kakao.maps.LatLng(DongOfDaejeon.features[i].geometry.coordinates[0][j][1], DongOfDaejeon.features[i].geometry.coordinates[0][j][0]));
            }
            var res = new kakao.maps.Polygon({
                path: temp,
                strokeWeight: 3,
                strokeColor: '#39DE2A',
                strokeOpacity: 0.5,
                strokeStyle: 'solid',
                fillColor: '#A2FF99',
                fillOpacity: 0.7
            })
            resultJung.push(res);
            console.log("중구");
        }
        else {
            console.log("Error");
        }
    }

        if(guName === "대덕구") {
            return resultDaedeok;
        }
        else if(guName === "동구") {
            return resultDong;
        }
        else if(guName === "서구") {
            return resultSeo;
        }
        else if(guName === "유성구") {
            return resultYuseong;
        }
        else if(guName === "중구") {
            return resultJung;
        }
    }

export default DongFinder;