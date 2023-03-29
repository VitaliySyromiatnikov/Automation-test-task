import mainPage from "../fixtures/mainPage.js";
import Form from "../fixtures/callForm";

describe('template spec', () => {
  beforeEach(() => {
    cy.fixture("main").then(function (data) {
      this.data = data;
      cy.visit(this.data.link)
    })
  });

  const mainPageElements = new mainPage();
  const FormFields = new Form();
  const numberFromField = "+1 123 456 7890"

  it('Check if the "Call Form" button is visible on the page.', () => {
    mainPageElements.getСallFormButton().should('be.visible')
  })

  it('Verify that a pop-up window with the form opens after clicking the "Call Form" button.', () => {
    mainPageElements.getСallFormButton().click()
    FormFields.getPopUpWindow().should('be.visible')
  })

  it('Confirm that the form has the correct fields and options', () => {

    mainPageElements.getСallFormButton().click()
    FormFields.getCallTypeListBoxButton().click()

    cy.contains("Incoming Call")
    cy.contains("Outgoing Call").click()

    FormFields.getPhoneNumberField().click()
    cy.contains("+1 123 456 7890")
    cy.contains("+1 987 654 3210")
    cy.contains("+1 555 444 3333")

    FormFields.getResultTypeField().click()
    cy.contains("Not available")
    cy.contains("Wrong Person")
    cy.contains("Busy")
    cy.contains("Successful")

    FormFields.getCallTypeListBoxButton().click({ force: true })
    cy.contains("Incoming Call").click()
    FormFields.getCallReasonField().click()
    cy.contains("Email")
    cy.contains("SMS")
    cy.contains("Missed Call")

    FormFields.getCallResultField()
  })

  it('Verify that the form fields are updated after changing the "Call Type" drop down list value.', () => {

    mainPageElements.getСallFormButton().click()
    FormFields.getCallReasonField().should('not.exist');
    FormFields.getCallTypeListBoxButton().click()

    cy.get('[data-value="Incoming Call"]').click()
    FormFields.getCallReasonField().should('be.visible')

    FormFields.getResultTypeField().should('not.exist');

    FormFields.getCallTypeListBoxButton().click()
    FormFields.getCallTypeListOption1().click()
    FormFields.getResultTypeField().should('be.visible')
  })


  it('Test the form validation and error messages', () => {


    //Check successfull form validation
    mainPageElements.getСallFormButton().click()
    FormFields.getCallTypeListBoxButton().click()
    FormFields.getCallTypeListOption1().click()
    FormFields.getPhoneNumberField().click()
    cy.contains(numberFromField).click()

    FormFields.getResultTypeField().click()
    cy.contains("Busy").click()

    FormFields.getCallResultField().type("Call me please at 1AM")
    FormFields.getButtonSave().click()

    cy.contains("Successfully saved!")
  })

  it('Test the form validation and error messages', () => {

    //Check error  message when  validation without filled all fields
    mainPageElements.getСallFormButton().click()
    FormFields.getButtonSave().click()
    cy.contains("Required")

    //Check error  message when  validation without field 'Call Result'
    FormFields.getCallTypeListBoxButton().click()
    FormFields.getCallTypeListOption1().click()
    FormFields.getPhoneNumberField().click()
    cy.contains(numberFromField).click()

    FormFields.getResultTypeField().click()
    cy.contains("Busy").click()
    FormFields.getButtonSave().click()
    cy.contains("Required")
  })

  it('Verify that the form is hidden, and a success message appears when the user fills out the form and clicks "Save', () => {

    //Check successfull form validation
    mainPageElements.getСallFormButton().click()
    FormFields.getCallTypeListBoxButton().click()
    FormFields.getCallTypeListOption1().click()
    FormFields.getPhoneNumberField().click()
    cy.contains(numberFromField).click()

    FormFields.getResultTypeField().click()
    cy.contains("Busy").click()

    FormFields.getCallResultField().type("Call me please at 1AM")
    FormFields.getButtonSave().click()

    cy.contains("Successfully saved!")
    FormFields.getPopUpWindow().should('not.exist');
  })


  /// All cases fall down because they have no logic or they have bugs 
  it('Check edge cases and negative scenarios.', () => {
    // Cannot type in Phone number field , because it select

    mainPageElements.getСallFormButton().click()
    FormFields.getPhoneNumberField().type("312312312")
    FormFields.getPhoneNumberField().should('have.value', '');

  });

  it('Check edge cases and negative scenarios.', () => {
    // Cannot type more than 15 symbols in Phone number field

    mainPageElements.getСallFormButton().click()
    FormFields.getPhoneNumberField().type("+1 123 456 78901234421412521512")
    FormFields.getPhoneNumberField().should('have.value', '+1 123 456 7890');

  });

  it('Check edge cases and negative scenarios.', () => {
    // Cannot type more than 1000 symbols in Call Result field
    mainPageElements.getСallFormButton().click()
    cy.fixture("main").then(function (data) {
      this.data = data;
      FormFields.getCallResultField().type(this.data.moreThan1000Symbols).should('have.value', this.data.only1000Symbols);
    })

  });
})