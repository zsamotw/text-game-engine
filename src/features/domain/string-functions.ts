import * as S from 'sanctuary'

const equalsIgnoreCase = (str1: string) => (str2: string) => {
    return S.equals(S.toLower(str1))(S.toLower(str2))
}

export { equalsIgnoreCase }