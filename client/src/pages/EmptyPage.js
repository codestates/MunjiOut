import logo from "../MunjioutLogo.png";
import { Link } from 'react-router-dom';

function EmptyPage() {
  return (
    <div className="emptyPage">
      <Link to="/">
        <img className="emptyPage_logo" src={logo} />
      </Link>
      <div className="emptyPage_caution">
        <h1>잘못된 접근입니다. 로고를 클릭해 메인 화면으로 돌아가세요.</h1>
      </div>
    </div>
  );
}

export default EmptyPage;
