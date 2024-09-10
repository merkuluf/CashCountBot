const ENV = import.meta.env.VITE_ENVIRONMENT

const URL = ENV === 'production' ? '' : 'https://server.a.pinggy.online'

export const BASE_URL = URL + '/api/'
// export const ADMIN_URL = URL + '/admin_api/'
