const itemsCounter = (el) => {
  const elements = document.querySelectorAll(el);
  return elements.length;
};
module.exports = itemsCounter;
