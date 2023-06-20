/// <reference types="cypress" />
describe('Тестирование приложения "Игра пары"', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('input').type('4');
    cy.contains('Начать игру').click();
  });

  it('В начальном состоянии игра должна иметь поле 4 на 4 клетки, каждая клетка невидима', () => {
    cy.get('#app').children().should('have.lengthOf', 16);
    cy.get('.overflow-hidden').each(($el) => {
      cy.wrap($el).should('not.be.visible');
    });
  });

  it('Нажать на одну произвольную карточку. Убедиться, что она осталась открытой', () => {
    cy.get('#app')
      .children()
      .each(($el, index) => {
        if (index === 6) {
          cy.wrap($el).click();
          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(2000);
          cy.wrap($el.children().first()).should('be.visible');
        }
      });
  });

  it('Нажать на левую верхнюю карточку, затем на следующую. Если это не пара, то повторять со следующей карточкой, пока не будет найдена пара. Проверить, что найденная пара карточек осталась видимой', () => {
    cy.get('#app')
      .find('.overflow-hidden')
      .each(($el, index, list) => {
        cy.wrap(list[0]).parent().click();
        if (index !== 0) {
          cy.wrap($el).parent().click();
          if (list[0].outerHTML === list[index].outerHTML) {
            // eslint-disable-next-line cypress/no-unnecessary-waiting
            cy.wait(2000);
            cy.wrap(list[0]).should('be.visible');
            cy.wrap($el).should('be.visible');
            return false;
          }
          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(2000);
        }
      });
  });

  it('Нажать на левую верхнюю карточку, затем на следующую. Если это пара, то повторять со следующими двумя карточками, пока не найдутся непарные карточки. Проверить, что после нажатия на вторую карточку обе становятся невидимыми', () => {
    let first = 0;
    cy.get('#app')
      .find('.overflow-hidden')
      .each(($el, index, list) => {
        cy.wrap(list[first]).parent().click();
        if (index !== first) {
          cy.wrap($el).parent().click();
          if (list[first].outerHTML !== list[index].outerHTML) {
            // eslint-disable-next-line cypress/no-unnecessary-waiting
            cy.wait(2000);
            cy.wrap(list[0]).should('not.be.visible');
            cy.wrap($el).should('not.be.visible');
            return false;
          }
          first++;
          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(2000);
        }
      });
  });
});
