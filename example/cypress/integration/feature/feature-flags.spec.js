/// <reference types="cypress" />


describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  describe("Managed feature flag", () => {

    describe("React element component", () => {
      
      it('displays active feature', () => {
        cy.contains('Visible').should('have.length', 1)
      });
  
      it('hides inactive feature', () => {
        cy.contains('Visible').should('have.length', 1)
      });

    })

    describe("React hook", () => {

      it('displays active feature', () => {
        cy.get('.feature-flag').should('have.length', 1)
      });
  
      it('hides inactive feature', () => {
        cy.get('.hidden').should('not.exist')
      });
      
    })
    
  });

  describe("Unmanaged feature flag", () => {

    describe("React element component", () => {
      
      it('displays active feature', () => {
        cy.contains('Unmanaged Visible').should('have.length', 1)
      });
  
      it('hides inactive feature', () => {
        cy.contains('Unmanaged Hidden').should('not.exist');
      });

    })

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
          cy.contains('Visible').should('have.length', 1)

          cy.visit('http://localhost:3000?visible=false')

          cy.contains(/^Visible$/).should('not.exist');
        })

        it("Should be visible when query string is true", () => {
          cy.contains('/^Hidden hook$/').should('not.exist')

          cy.visit('http://localhost:3000?hidden=true')

          cy.contains(/^Hidden hook$/).should('have.length', 1);
        })
      })

      describe("Cookie override", () => {

        it("Should not be visible when cookie is false", () => {
          cy.contains('Visible').should('have.length', 1)

          cy.setCookie("visible", "false")

          cy.contains(/^Visible$/).should('not.exist');
        })

        it("Should be visible when cookie is true", () => {
          cy.contains('/^Hidden hook$/').should('not.exist')

          cy.setCookie("hidden", "true")
          cy.visit('http://localhost:3000')

          cy.contains(/^Hidden hook$/).should('have.length', 1);
        })
      })
    })
    
  });

  

})
