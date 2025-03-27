describe('Додаток Контакти', () => {
    beforeEach(() => {
      // Відвідуємо сторінку додатку перед кожним тестом
      cy.visit('http://localhost:5173');
    });
  
    it('додає новий контакт', () => {
      // Підготовка: Визначаємо тестові дані
      const імʼя = 'Іван Іванов';
      const телефон = '1234567890';
  
      // Дія: Заповнюємо форму та додаємо контакт
      cy.get('input[placeholder="Ім\'я"]').type(імʼя);
      cy.get('input[placeholder="Телефон"]').type(телефон);
      cy.get('button').contains('Додати').click();
  
      // Перевірка: Переконуємося, що контакт з’явився у списку
      cy.get('.contacts-list')
        .find('.contact-item')
        .should('have.length', 1)
        .and('contain', `${імʼя} - ${телефон}`);
    });
  
    it('редагує існуючий контакт', () => {
      // Підготовка: Спочатку додаємо контакт
      const початковеІмʼя = 'Марія Петрова';
      const початковийТелефон = '0987654321';
      const оновленеІмʼя = 'Марія Сидорова';
      const оновленийТелефон = '1112223333';
  
      cy.get('input[placeholder="Ім\'я"]').type(початковеІмʼя);
      cy.get('input[placeholder="Телефон"]').type(початковийТелефон);
      cy.get('button').contains('Додати').click();
  
      // Дія: Редагуємо контакт
      cy.get('.contact-item').contains(початковеІмʼя).parent().find('button').contains('Редагувати').click();
      cy.get('input[placeholder="Ім\'я"]').clear().type(оновленеІмʼя);
      cy.get('input[placeholder="Телефон"]').clear().type(оновленийТелефон);
      cy.get('button').contains('Редагувати').click();
  
      // Перевірка: Переконуємося, що контакт оновлено
      cy.get('.contacts-list')
        .find('.contact-item')
        .should('have.length', 1)
        .and('contain', `${оновленеІмʼя} - ${оновленийТелефон}`);
    });
  
    it('видаляє контакт', () => {
      // Підготовка: Спочатку додаємо контакт
      const імʼя = 'Олена Коваленко';
      const телефон = '5556667777';
  
      cy.get('input[placeholder="Ім\'я"]').type(імʼя);
      cy.get('input[placeholder="Телефон"]').type(телефон);
      cy.get('button').contains('Додати').click();
  
      // Дія: Видаляємо контакт
      cy.get('.contact-item').contains(імʼя).parent().find('button').contains('Видалити').click();
  
      // Перевірка: Переконуємося, що контакт видалено
      cy.get('.contacts-list').find('.contact-item').should('not.exist');
    });
  
    it('сортує контакти за ім’ям', () => {
      // Підготовка: Додаємо кілька контактів у довільному порядку
      const контакти = [
        { імʼя: 'Сергій', телефон: '3334445555' },
        { імʼя: 'Аліна', телефон: '1112223333' },
        { імʼя: 'Богдан', телефон: '2223334444' },
      ];
  
      контакти.forEach(контакт => {
        cy.get('input[placeholder="Ім\'я"]').type(контакт.імʼя);
        cy.get('input[placeholder="Телефон"]').type(контакт.телефон);
        cy.get('button').contains('Додати').click();
      });
  
      // Дія: Сортуємо за ім’ям
      cy.get('.buttons-container').find('button').contains('Сортувати за іменем').click();
  
      // Перевірка: Переконуємося, що контакти відсортовані за ім’ям (Аліна, Богдан, Сергій)
      cy.get('.contacts-list .contact-item').eq(0).should('contain', 'Аліна');
      cy.get('.contacts-list .contact-item').eq(1).should('contain', 'Богдан');
      cy.get('.contacts-list .contact-item').eq(2).should('contain', 'Сергій');
    });
  
    it('сортує контакти за телефоном', () => {
      // Підготовка: Додаємо кілька контактів із різними номерами телефонів
      const контакти = [
        { імʼя: 'Сергій', телефон: '3334445555' },
        { імʼя: 'Аліна', телефон: '1112223333' },
        { імʼя: 'Богдан', телефон: '2223334444' },
      ];
  
      контакти.forEach(контакт => {
        cy.get('input[placeholder="Ім\'я"]').type(контакт.імʼя);
        cy.get('input[placeholder="Телефон"]').type(контакт.телефон);
        cy.get('button').contains('Додати').click();
      });
  
      // Дія: Сортуємо за телефоном
      cy.get('.buttons-container').find('button').contains('Сортувати за телефоном').click();
  
      // Перевірка: Переконуємося, що контакти відсортовані за номером телефону (1112223333, 2223334444, 3334445555)
      cy.get('.contacts-list .contact-item').eq(0).should('contain', '1112223333');
      cy.get('.contacts-list .contact-item').eq(1).should('contain', '2223334444');
      cy.get('.contacts-list .contact-item').eq(2).should('contain', '3334445555');
    });
  });