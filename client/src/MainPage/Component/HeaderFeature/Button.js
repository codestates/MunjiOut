import './Button.css';
import { Link } from 'react-router-dom';

export default function Button ({ isLogin }) {
    return (
        <div>
            { !isLogin ? 
                <Link to="/login" style={{ textDecoration: 'none' }}>
                    <button className="btn login">Login</button>
                </Link> 
                :
                <Link to="/logout" style={{ textDecoration: 'none' }}>
                    <button className="btn logout">Logout</button>
                </Link>
            }
            { !isLogin ?
                <Link to="/signup" style={{ textDecoration: 'none' }}> 
                    <button className="btn signup">Signup</button> 
                </Link> 
                :
                <Link to="/mypage" style={{ textDecoration: 'none' }}> 
                    <button className="btn mypage">MyPage</button>
                </Link> 
            }
        </div>
    );
}
