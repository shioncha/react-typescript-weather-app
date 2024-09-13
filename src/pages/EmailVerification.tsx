import { Link } from "react-router-dom"

const EmailVerification = () => {
  return (
    <div>
      <h1>メールアドレスの認証</h1>
      <p>メールアドレスの認証を行います。メールボックスを確認し、認証を行ってください。</p>
      <p>認証が完了するまで、ログインすることはできません。</p>
      <Link to="/signin/">ログイン画面へ</Link>
    </div>
  )
}

export default EmailVerification
