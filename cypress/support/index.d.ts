import NextAuthSession from './session'

declare global {
  namespace Cypress {
    interface Chainable {
      googleLogin(session: NextAuthSession): Chainable<void>
      dataCy(
        selector: string,
        ...args: object[]
      ): Chainable<JQuery<HTMLElement>>
    }
  }
}
