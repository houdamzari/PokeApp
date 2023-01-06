import countComments from '../mockfunctions/commentcount.js';

test('counting comments', () => {
  const comments = [
    {
      comment: 'Good Morning',
      username: 'Demo User',
      creation_date: '2023-01-03',
    },
    {
      comment: 'Good Day',
      username: 'Biswas',
      creation_date: '2023-01-06',
    },
  ];
  const TestComment = countComments(comments);
  expect(TestComment).toBe(2);
});