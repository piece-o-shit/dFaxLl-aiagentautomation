import cookie, {
  type CookieParseOptions,
  type CookieSerializeOptions,
} from 'cookie'

const isProduction = process.env.NODE_ENV === 'production'

const getCookie = (name: string, options?: CookieParseOptions) => {
  const cookies = cookie.parse(document.cookie, options)

  return cookies[name] as string
}

const setCookie = (
  name: string,
  value: string,
  options?: CookieSerializeOptions,
) => {
  document.cookie = cookie.serialize(name, value, {
    secure: isProduction,
    path: '/',
    sameSite: 'lax',
    ...options,
  })
}

const deleteCookie = (name: string, options?: CookieSerializeOptions) => {
  document.cookie = cookie.serialize(name, '', {
    maxAge: 0,
    secure: isProduction,
    path: '/',
    sameSite: 'lax',
    ...options,
  })
}

export const CookieTool = {
  get: getCookie,
  set: setCookie,
  delete: deleteCookie,
}
