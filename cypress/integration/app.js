/* global cy */

describe('jegerima.dev', function() {
  it('frontpage can be opened', function() {
    cy.visit('http://localhost:8011');
    cy.contains('DingDong');
    cy.contains('BTC');
  });
});
