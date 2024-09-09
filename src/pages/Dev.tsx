import { Link } from "react-router-dom";

const Dev = () => {
  return (
    <div>
      <h1>Dev</h1>
      <p>開発者用メニュー</p>
      <h2>ページ一覧</h2>
      <ul>
        <li><Link to="/weather/">天気情報</Link></li>
        <li><Link to="/signin/">ログイン</Link></li>
        <li><Link to="/signup/">新規登録</Link></li>
        <li><Link to="/verify/">メール認証</Link></li>
        <li><Link to="/">マイページ</Link></li>
        <li><Link to="/setup/">セットアップ</Link></li>
      </ul>
    </div>
  );
}

export default Dev
