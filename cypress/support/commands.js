//resolução 1 
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Waldemir')
    cy.get('#lastName').type('Da Silva Braga')
    cy.get('#email').type('WaWaSilvaBraga@ToTestando,com')
    cy.get('#open-text-area').type('Test.')
    cy.contains('button', 'Enviar').click()
})

//reolução 2
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', data => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.contains('button', 'Enviar').click()
})

//resolução 3 
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = { 
    firstName: 'John',
    lastName: 'Lemmon',
    email: 'johonLemon@ToTestando.com',
    text: 'Test.'

}) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.contains('button', 'Enviar').click()
})

//teste independente da aula 
/*Cypress.Commands.add('validationOfEmailRules', () => {
    cy.get('#firstName').type('Waldemir')
    cy.get('#lastName').type('Da Silva Braga')
    cy.get('#email').type('WaWaSilvaBraga@ToTestando,com')
    cy.get('#open-text-area').type('Test.')

    cy.get('button[type="submit"]').click()

    .clear()
    .should('have.value', '')

    cy.get('#firstName').type('Waldemir')
    cy.get('#lastName').type('Da Silva Braga')
    cy.get('#email').type('WaWaSilvaBragaToTestando.com')
    cy.get('#open-text-area').type('Test.')
    cy.get('button[type="submit"]').click()
    .clear()
    .should('have.value', '')


    cy.get('#firstName').type('Waldemir')
    cy.get('#lastName').type('Da Silva Braga')
    cy.get('#email').type('WaWaSilvaBragaToTestando.br')
    cy.get('#open-text-area').type('Test.')
    //cy.get('button[type="submit"]').click()
    .clear()
    .should('have.value', '')


    cy.get('#firstName').type('Waldemir')
    cy.get('#lastName').type('Da Silva Braga')
    cy.get('#email').type('WaWaSilvaBragaToTestando.br')
    cy.get('#open-text-area').type('Test.')
    //cy.get('button[type="submit"]').click()
    .clear()
    .should('have.value', '')


    cy.get('#firstName').type('Waldemir')
    cy.get('#lastName').type('Da Silva Braga')
    cy.get('#email').type('WaWaSilvaBraga@ToTestando.com')
    cy.get('#open-text-area').type('Test.')
   // cy.get('button[type="submit"]').click()
    .clear()
    .should('have.value', '')


})*/
    

