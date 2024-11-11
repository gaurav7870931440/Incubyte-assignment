// src/pages/CatalogPage.ts
import from 'playwright';

class CatalogPage {
  constructor(private page: Page) {}

  async searchForSkill(skill: string) {
    await this.page.fill('#search-input', skill);
    await this.page.click('#search-button');
  }

  // Other relevant methods...
}
export default CatalogPage;

import { setWorldConstructor, World } from '@cucumber/cucumber';

interface CustomWorld extends World {
  searchTerm?: string;
  apiResults?: any;
  uiResults?: any;
}

setWorldConstructor(function(this: CustomWorld) {
  this.searchTerm = '';
  this.apiResults = [];
  this.uiResults = [];
});
import { Given, When, Then } from '@cucumber/cucumber';
import CatalogPage from '../pages/CatalogPage';
import { expect } from 'chai';

Given('the application is loaded successfully', async function () {
  await this.page.goto('https://example.com/catalog');
});

When('user search for {string}', async function (term: string) {
  this.searchTerm = term;
  await catalogPage.searchForSkill(term);
  this.uiResults = await catalogPage.getSearchResults();
});

Then('the UI results should match the API results', async function () {
  const apiResults = await fetchAPIResults(this.searchTerm);
  this.apiResults = apiResults;
  expect(this.uiResults).to.deep.equal(this.apiResults);
});
