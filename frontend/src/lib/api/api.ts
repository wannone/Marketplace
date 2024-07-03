import {ApiRoutes} from '@server/src/app'
import { hc } from 'hono/client'
import Cookies from 'js-cookie'

const client = hc<ApiRoutes>('/', {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('Token')}}`
    },
})

export const api = client.api