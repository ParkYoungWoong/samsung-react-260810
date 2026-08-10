import { Link } from 'react-router'

export default function NotFound() {
  return (
    <>
      <h1>404 - 찾을 수 없는 페이지입니다.</h1>
      <Link to="/">홈으로 돌아가기</Link>
    </>
  )
}
