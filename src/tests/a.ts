const x = 123
const z = 'Hello'

// 1) Default Export (기본 내보내기)
// 1개만 내보내기 가능
// 이름 필요 없음(내보내는 데이터의 이름이 사용되지 않음)
export default x

// 2) Named Export (이름 내보내기)
// n개 내보내기 가능
// 이름 필수(내보내는 데이터의 이름이 사용됨)
export const y = 456
export const h = 'HEROPY'
export { x, z }
export interface User {
  name: string
  age: number
}
export type Abc = string | number
