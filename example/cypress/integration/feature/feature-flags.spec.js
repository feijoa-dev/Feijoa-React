/// <reference types="cypress" />


describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  describe("Unmanaged feature flag", () => {

    describe("React hook", () => {

      it('displays active feature', () => {
        cy.contains('Visible hook with boolean flag').should('have.length', 1)
      });
  
      it('hides inactive feature', () => {
        cy.contains('Hidden hook with boolean flag').should('not.exist');
      });

      it('displays active feature managed by env var', () => {
        cy.contains('Env var Visible').should('have.length', 1)
      });

      it('displays inactive feature managed by env var', () => {
        cy.contains('Env var Hidden').should('not.exist', 1)
      });
      
    })
    
    describe("override feature flag", () => {

      describe("Query string override", () => {

        it("Should not be visible when query string is false", () => {
          cy.contains('Env var Visible').should('exist')

          cy.visit('http://localhost:3000?REACT_APP_VISIBLE_FEATURE=false')

          cy.contains('Env var Visible').should('not.exist');
        })

        it("Should be visible when query string is true", () => {
          cy.contains('/^Env var Hidden$/').should('not.exist')

          cy.visit('http://localhost:3000?REACT_APP_HIDDEN_FEATURE=true')

          cy.contains('Env var Hidden').should('have.length', 1);
        })

        it("Should override enabled value", () => {
          cy.contains('My feature').should('not.exist')

          cy.visit('http://localhost:3000?MY_FEATURE=true')

          cy.contains('My feature').should('have.length', 1);
        })
      })

      describe("Cookie override", () => {

        it("Should not be visible when cookie is false", () => {

          cy.contains('Env var Visible').should('exist')

          cy.setCookie("REACT_APP_VISIBLE_FEATURE", "false")

          cy.visit('http://localhost:3000')

          cy.contains('Env var Visible').should('not.exist');
        })

        it("Should be visible when cookie is true", () => {

          cy.contains('/^Env var Hidden$/').should('not.exist')

          cy.setCookie("REACT_APP_HIDDEN_FEATURE", "true")

          cy.visit('http://localhost:3000')

          cy.contains('Env var Hidden').should('have.length', 1);
        })

        it("Should override enabled value", () => {
          cy.contains('My feature').should('not.exist')

          cy.setCookie("MY_FEATURE", "true")

          cy.visit('http://localhost:3000')

          cy.contains('My feature').should('have.length', 1);
        })
      })
    })
    
  });

  

})
