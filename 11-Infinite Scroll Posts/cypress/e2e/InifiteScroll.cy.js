// [o] - 처음 화면 올때 5개 보여주기
// [o] - 검색하면 해당 단어로 filter되기 (=> f를 눌렀을때 list.length 3이면 되네)
// [o] - 스크롤을 다 하면 loader show, list.length 5개 늘어나기
describe('Infinite Scrol Posts', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/11-Infinite%20Scroll%20Posts/index.html');
  });

  it('처음 화면 렌더링 시 posts 5개 보여주기', () => {
    cy.get('.post').should('have.length', 5);
  });

  it('검색하면 해당 단어로 filter되기', () => {
    cy.get('.filter').type('f');

    cy.get('.post').should('have.length', 3);
  });

  it('스크롤을 다 하면 loader show, list.length 5개 늘어나기', () => {
    cy.scrollTo('bottom');
    cy.get('.loader').should('have.class', 'show');
    cy.get('.post').should('have.length', 10);
    cy.get('.loader').should('not.have.class', 'show');
  });
});
