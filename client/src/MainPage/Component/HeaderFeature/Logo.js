import logo from "../../../MunjioutLogo.png";
import smallLogo from "../../../MunjioutLogo_small.png";
import styled from 'styled-components';
import { media, media_min } from '../../../components/utils/_media-queries';

const Wrapper = styled.div`
  .logoImg {
    ${media.tablet`display: none;`}
    margin-left: 10px;
    margin-top: 90px;
    width: 120px;
    transform: translateY(5%);
  }
  .logoImg:hover {
    cursor: pointer;
  }
  .smallLogoImg {
    ${media_min.tablet_l`display: none;`}
    margin-left: 10px;
    margin-top: 80px;
    width: 65px;
    transform: translateY(5%);
  }
  .smallLogoImg:hover {
    cursor: pointer;
  }
`
export default function Logo() {
  const handleReplace = () => {
    window.location.replace("/");
  };
  return (
    <Wrapper>
      <img
        className="smallLogoImg"
        src={smallLogo}
        alt="small_logo"
        onClick={handleReplace}
      />
      <img
        className="logoImg"
        src={logo}
        alt="MunjiOut"
        onClick={handleReplace}
      />
    </Wrapper>
  );
}