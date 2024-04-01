export class Email {
  readonly value: string

  constructor(email: string) {
    if (!email.match(/^(.+)@(.+)$/)) {
      throw new Error('Invalid email')
    }
    this.value = email
  }
}
