/* eslint-disable @typescript-eslint/no-explicit-any */
import { createHmac } from 'node:crypto'
import { ApiError } from '../../common/api-error'
import { StatusCode } from '../../common/status-code'

export class JwtService {
  private constructor() {}

  static generate(payload: any, secret: string, expiresIn: number): string {
    const now = Math.floor(Date.now() / 1000)
    const expirationTime = now + expiresIn
    payload.exp = expirationTime
    const header = {
      alg: 'HS256',
      typ: 'JWT',
    }
    const encodedHader = JwtService.base64UrlEncode(header)
    const encodedPayload = JwtService.base64UrlEncode(payload)
    const rawToken = `${encodedHader}.${encodedPayload}`
    const signature = createHmac('sha256', secret)
      .update(rawToken)
      .digest('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
    return `${rawToken}.${signature}`
  }

  private static base64UrlEncode(input: any): string {
    const json = JSON.stringify(input)
    return Buffer.from(json)
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
  }

  static verify(token: string, secret: string) {
    const [encodedHeader, encodedPayload, signature] = token.split('.')
    const payload = JSON.parse(JwtService.base64UrlDecode(encodedPayload))
    const expectedSignature = createHmac('sha256', secret)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
    if (signature !== expectedSignature) {
      throw new ApiError('token inválido!', StatusCode.BAD_REQUEST)
    }
    const now = Math.floor(Date.now() / 1000)
    if (payload.exp && payload.exp <= now) {
      throw new ApiError('expired token!', StatusCode.BAD_REQUEST)
    }
    return payload
  }

  private static base64UrlDecode(input: string): string {
    let base64 = input.replace(/-/g, '+').replace(/_/g, '/')
    const padding = 4 - (base64.length % 4)
    if (padding !== 4) base64 += '='.repeat(padding)
    return Buffer.from(base64, 'base64').toString()
  }
}

const token = JwtService.generate({ id: 1 }, 'adadadjajdnajdnadkjfinrv', 3600)
console.log(token)
const getToken = JwtService.verify(token, 'adadadjajdnajdnadkjfinrv')
console.log(getToken)
