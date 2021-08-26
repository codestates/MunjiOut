import './Button.css';

export default function Button ({ isLogin }) {
    return (
        <div>
            <button className="btn">{isLogin ? 'Login' : 'Logout' }</button>
            <button className="btn">{isLogin ? 'Signup' : 'MyPage' }</button>
        </div>
    );
}
