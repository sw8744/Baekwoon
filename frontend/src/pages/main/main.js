import './main.css';
import raibit from '../../assets/raibit.png';
import { useNavigate } from 'react-router-dom';

function Main() {
    const navigate = useNavigate();
    const goLiveData = () => {
        navigate('/map');
    };
    const goFlowRate = () => {
        navigate('/flowrate');
    };
    
    return (
      <div id="mainRoot">
        <img src={raibit} alt="raibit" id='raibitLogo'/>
        <div id='baekwoonTitle'>BAEKWOON</div>
        <div id='baekwoonSubtitle'>한국형 폭우 재난구조 시스템</div>
        <div id='mainButtonDiv'>
            <button id='liveDataButton' className='mainButton' onClick={() => {goLiveData()}}>실시간 배수로 데이터</button>
            <button id='floadButton' className='mainButton' onClick={() => {goFlowRate()}}>배수 유속관리 시스템</button>
            <button id='fixDataButton' className='mainButton'>도시 정비계획 데이터</button>
        </div>
      </div>
    );
}

export default Main;