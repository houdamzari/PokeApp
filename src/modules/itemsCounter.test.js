/**
 * @jest-environment jsdom
 */

const itemsCounter = require('./itemsCounter.js');

describe('Counting all items on the page', () => {
  test('should return 0 when there is no item in container', () => {
    // Arrange
    document.body.innerHTML = '<ul class="gallery"></ul>';
    const container = document.querySelector('.gallery');
    container.innerHTML = '';
    // Act
    const totalItems = itemsCounter('.grid-item');
    // Assert
    expect(totalItems).toBe(0);
  });

  test('should return 10 when there is 10 elements with "grid-item" class', () => {
    // Arrange
    document.body.innerHTML = '<ul class="gallery"></ul>';
    const container = document.querySelector('.gallery');
    for (let i = 0; i < 10; i += 1) {
      container.innerHTML += '<li class="grid-item"></li>';
    }
    // Act
    const totalItems = itemsCounter('.grid-item');
    // Assert
    expect(totalItems).toBe(10);
  });

  test('should return 1 when only one element has "grid-item" class', () => {
    // Arrange
    document.body.innerHTML = '<ul class="gallery"></ul>';
    const container = document.querySelector('.gallery');

    container.innerHTML += '<li class="grid-item"></li>';
    // Act
    const totalItems = itemsCounter('.grid-item');
    // Assert
    expect(totalItems).toBe(1);
  });
});
