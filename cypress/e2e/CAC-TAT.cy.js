describe('Central de Atendimento ao Cliente TAT', () => { 
  beforeEach(() =>{
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => { 
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  
// preenchimento dos campos da aplicação
  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10)
    cy.get('#firstName').type('Waldemir')
    cy.get('#lastName').type('Da Silva Braga')
    cy.get('#email').type('WaWaSilvaBraga@ToTestando.com')
    cy.get('#open-text-area').type(longText, { delay:0})
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
     })


  
  it('campo telefone continua vazio quando preenchido com valor NÃO-numerico', () => {
     cy.get('#phone')
     .type('abcde')
     .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Waldemir')
    cy.get('#lastName').type('Da Silva Braga')
    cy.get('#email').type('WaWaSilvaBraga@ToTestando.com')
    cy.get('#open-text-area').type('Test')
    cy.get('#phone-checkbox').click()
    cy.contains('button', 'Enviar').click()
   
    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () =>{
    cy.get('#firstName')
      .type('Waldemir')
      .should('have.value', 'Waldemir')
      .clear()
      .should('have.value', '')
    
    cy.get('#lastName')
      .type('Da Silva Braga')
      .should('have.value', 'Da Silva Braga')
      .clear()
      .should('have.value', '')
    
    cy.get('#email')
      .type('WaWaSilvaBraga@ToTestando.com')
      .should('have.value', 'WaWaSilvaBraga@ToTestando.com')
      .clear()
      .should('have.value', '')
    
    cy.get('#phone')
      .type('434054563')
      .should('have.value', '434054563')
      .clear()
      .should('have.value', '')
    cy.contains('button', 'Enviar').click()
  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

// resolução 1
it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

// resolução 2
  it('envia o formuário com sucesso usando um comando customizado', () => {
    const data = {
      firstName: 'Waldemir',
      lastName: 'Da Silva Braga',
      email: 'WaWaSilvaBraga@ToTestando.com',
      text: 'Test.'

    }
    cy.fillMandatoryFieldsAndSubmit(data)  
    cy.get('.success').should('be.visible')

  })

  // resolução 3
  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()  

    cy.get('.success').should('be.visible')
  })

  //ex 8
  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10)
    
    cy.get('#firstName').type('Waldemir')
    cy.get('#lastName').type('Da Silva Braga')
    cy.get('#email').type('WaWaSilvaBraga@ToTestando.com')
    cy.get('#open-text-area').type(longText, { delay:0})
    cy.contains('button', 'Enviar').click()
    
    cy.get('.success').should('be.visible')
 })



   it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit() 

    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () =>{
    cy.get('#product') 
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
   })
  
  it('seleciona um produto (Blog) por seu índice', () =>{
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

// Lesson 4 (Marcando inputs do tipo radio)
it('marca o tipo de atendimento "Feedback"', () => {
  cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('be.checked')
})

it('marca cada tipo de atendimento', () => {
  cy.get('input[type="radio"]')
    .each(typeOfService => {
      cy.wrap(typeOfService)
        .check()
        .should('be.checked')
    })
})

// Lesson 5
it('marca ambos checkboxes, depois desmarca o último', () => {
  cy.get('input[type="checkbox"]')
  .check()
  .should('be.checked')
  .last()
  .uncheck()
  .should('not.be.checked')
})

it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
  cy.get('#firstName').type('Waldemir')
    cy.get('#lastName').type('Da Silva Braga')
    cy.get('#email').type('WaWaSilvaBraga@ToTestando.com')
    cy.get('#open-text-area').type('Test')
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
})

// Lesson 6
it('seleciona um arquivo da pasta fixtures', () => {
  cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json')
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')            
    })
})
it('seleciona um arquivo simulando um drag-and-drop', () =>  {
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')            
    })
})

it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () =>{
  cy.fixture('example.json').as('sampleFile')
  cy.get('#file-upload')
    .selectFile('@sampleFile')
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')  
  })
})

// lesson 7
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () =>{
    cy.contains('a','Política de Privacidade')
      .should('have.attr', 'href','privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a','Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click() 

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })
     

}) 



  /*it.only('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () =>{
    cy.contains('a', 'política de privacidade')  
      .should('have.attr', 'href','privacy.html')
      .and('have.attr', 'target', '_blank')
  })*/

//
//.should('have.attr', 'href', 'privacy.html')
//.and('have.attr', 'target', '_blank')




  //teste independente da aula 
  /*it('validação das regras de email', () => {
    cy.validationOfEmailRules()

    cy.get('.error').should('be.visible')
        
    })

  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Waldemir')
    cy.get('#lastName').type('Da Silva Braga')
    cy.get('#email').type('WaWaSilvaBraga@ToTestando,com') // teste de email com "," ao invés de "."
    cy.get('#open-text-area').type('Test')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')

    cy.get('#email').type('WaWaSilvaBragaToTestando.com') // teste de email sem o uso do " @ "
    cy.get('button[type="submit"]').click()
    
    cy.get('#email').type('WaWaSilvaBraga@ToTestando.com') // teste de email com a nomenclatura certa
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')

    cy.get('#firstName').type('Waldemir')
    cy.get('#lastName').type('Da Silva Braga')
    cy.get('#email').type('WaWaSilvaBragaToTestando,com') // teste de email sem o uso do " @ "
    cy.get('#open-text-area').type('Test')
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })*/