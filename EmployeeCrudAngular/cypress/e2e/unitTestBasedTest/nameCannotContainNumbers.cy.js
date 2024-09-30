describe("editEmployeeTest", () => {
  it("Muestra el mensaje de error 'El nombre no puede contener números.' correctamente", () => {
    cy.visit("https://giovaborgogno-crud-frontend-qa.azurewebsites.net"); // URL del front
    cy.get(".btn").click();
    cy.wait(500);
    cy.get(".form-control").type("1111");
    cy.get(".btn").click();
    cy.wait(500);
    cy.get(".ng-trigger").should(
      "include.text",
      "El nombre no puede contener números."
    );
  });
});
