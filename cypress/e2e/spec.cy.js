/// <reference types="cypress" />
/* global cy, describe, it, beforeEach */
describe("Login Form Testleri", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173"); // Projenin çalıştığı yer
  });

  it("Sadece email hatalıysa 1 hata mesajı ve buton disabled", () => {
    cy.get('input[type="email"]').type("yanlisemail");
    cy.get('input[type="password"]').type("Dogru123!");
    cy.get('input[type="checkbox"]').check();
    cy.get("button").should("be.disabled");
    cy.get(".invalid-feedback").should("have.length", 1);
    cy.contains("Geçerli bir email girin");
  });

  it("Email ve şifre hatalıysa 2 hata mesajı görünür ve buton disabled", () => {
    cy.get('input[type="email"]').type("yanlis");
    cy.get('input[type="password"]').type("kisa");
    cy.get('input[type="checkbox"]').check();
    cy.get("button").should("be.disabled");
    cy.get(".invalid-feedback").should("have.length", 2);
    cy.contains("Geçerli bir email girin");
    cy.contains("Şifreniz en az 6 karakter olmalı");
  });

  it("Email ve şifre doğru ama checkbox seçilmezse buton yine disabled", () => {
    cy.get('input[type="email"]').type("ornek@mail.com");
    cy.get('input[type="password"]').type("Sifre123!");
    cy.get("button").should("be.disabled");
  });

  it("Tüm alanlar geçerliyse buton enabled olur ve /success sayfasına gider", () => {
    cy.get('input[type="email"]').type("ornek@mail.com");
    cy.get('input[type="password"]').type("Sifre123!");
    cy.get('input[type="checkbox"]').check();
    cy.get("button").should("not.be.disabled").click();
    cy.url().should("include", "/success");
  });
});
