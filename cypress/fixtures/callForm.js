class Form {

getPopUpWindow() {
    return cy.get('[id="call-form"]')
  }


  getCallTypeListBoxButton() {
    return cy.get('[id="call-type"]')
  }

  getCallTypeListOption1() {
    return  cy.get('[data-value="Outgoing Call"]')
  }
  getPhoneNumberField() {
    return cy.get('[id="phone-number"]')
  }

  getCallReasonField() {
    return cy.get('[id="call-reason"]')
  }
  getResultTypeField() {
    return cy.get('[id="result-type"]')
  
  }

  getCallResultField() {
    return cy.get('[id="call-result"]')
  
  }
  getButtonSave() {
    return cy.get('[id="form-save"]')
  
  }
}

  export default Form;
