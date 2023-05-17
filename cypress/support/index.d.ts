declare namespace Cypress {
  interface Chainable {
    googleLogin(): Chainable<void>
    dataCy(selector: string, ...args: object): Chainable<JQuery<HTMLElement>>
  }
}
