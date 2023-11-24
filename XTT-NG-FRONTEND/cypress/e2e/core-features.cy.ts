/// <reference types="cypress"/>

describe("Testing admin",()=>{
    // it("using contains keysword",()=>{
    //     cy.visit("http://localhost:4200/admin")
    //     // cy.contains('Tours')
    //     cy.get('main button').contains('Create Tour')
    //     cy.get('main').get('a')
    //     cy.get('main').find('button')
    //     // cy.get('.tours').contains('app-tours')
    // })

    // it("Checking the modal if present",()=>{
    //     cy.visit("http://localhost:4200/admin")
    //     // cy.get('.newTour ')
    // })

    // it("difference between the get() and find()",()=>{
    //     cy.visit("http://localhost:4200/admin")
    //     // cy.get(".tours").get('app-navbar')
    // })

    // it("chaining using should", () => {
    //     // cy.get("h2").should("have.length", 2);
    //   });

      it("creates a tour",()=>{
        cy.visit("http://localhost:4200/admin")
        cy.get('main button').click()
        cy.get('.newTour')
        cy.get('[data-cy="tour-name"]').type('Bogoria Tours')
        cy.get('[data-cy="destination"]').type("Bogoria")
        cy.get('[data-cy="price"]').type('4500')
        cy.get('[data-cy="type"]').select('Hiking')
        cy.get('[data-cy="description"]').type('aiiiiiiiiobb')
        cy.get('[data-cy="startDate"]').type('2023-11-24')
        cy.get('[data-cy="endDate"]').type('2023-11-30')
        cy.get('[data-cy="add-event-btn"]').click()
      })

    //   it('registers a user',()=>{
    //     cy.visit("http://localhost:4200/register")
    //     cy.get('[data-cy="fullName"]')
    //   })
})