const testUrl = 'http://localhost:4000';
const selectIngredientItem = '[data-cy="ingredient-item"]';
const selectIngredientModal = '[data-cy="ingredient-modal"]';

describe('Тестирование конструктора бургеров', () => {
   beforeEach(() => {
    // Мокируем запросы
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    // Устанавливаем токены
    window.localStorage.setItem('refreshToken', 'test-refresh-token');
    cy.setCookie('accessToken', 'test-access-token');

    // Переходим на страницу
    cy.visit(testUrl);
    cy.wait(['@getIngredients', '@getUser']);
  });

  afterEach(() => {
    window.localStorage.removeItem('refreshToken');
    cy.clearCookie('accessToken');
  });

  describe('Добавление ингредиентов', () => {
    it('Должен добавляться ингредиент в конструктор', () => {
      // Находим и добавляем первый доступный ингредиент
      cy.get(selectIngredientItem).first().find('button').click();

      // Проверяем, что ингредиент появился в конструкторе
      cy.get('[data-cy="burger-constructor"]').should(
        'not.contain',
        'Выберите булки'
      );
    });
  });

  describe('Тестирование модальных окон ингредиентов', () => {
    it('Должно открываться и закрываться модальное окно ингредиента', () => {
      // 1. Проверяем загрузку ингредиентов
      cy.get(selectIngredientItem).should('have.length', 8); // По количеству в фикстуре

      // 2. Отладочная информация
      cy.get(selectIngredientItem).first().should('be.visible');

      // 3. Кликаем по первому ингредиенту (не по кнопке)
      cy.get(selectIngredientItem)
        .first()
        .within(() => {
          cy.get('a').click(); // Кликаем по ссылке
        });

      // 4. Проверяем модальное окно
      cy.get(selectIngredientModal, { timeout: 5000 }).should(
        'be.visible'
      );
      cy.contains('Детали ингредиента').should('exist');

      // 5. Закрываем модальное окно
      cy.get('[data-cy="modal-close"]').click();
      cy.get(selectIngredientModal).should('not.exist');
    });
  });

  describe('Создание заказа', () => {
   it('Собирает бургер и оформляет заказ', () => {
    // Проверяется, что конструктор пуст
    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');

    // Добавляем ингредиенты
    cy.get(selectIngredientItem).as('ingredients');
    cy.get('@ingredients').first().find('button').click();
    cy.get('@ingredients').last().find('button').click();

    // Вызывается клик по кнопке «Оформить заказ».
    cy.contains('Оформить заказ').click();

    // Проверяется, что модальное окно открылось и номер заказа верный.
    cy.get(selectIngredientModal).as('modal');
    cy.get('@modal').should('exist');
    cy.get('@modal').should('contain', '1');

    // Закрывается модальное окно и проверяется успешность закрытия.
    cy.get('[data-cy="modal-close"]').click();;
    cy.get('[data-cy="order-modal"]').should('not.exist');

    // Проверяется, что конструктор пуст
    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
    });
  });
});
