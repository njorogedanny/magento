import { test, expect, type Page} from "@playwright/test";
import {HomePage} from '../pages/home-page'

//AAA

const URL = 'https://magento.softwaretestingboard.com/'
const userName = 'techsystems@safeboda.com'
const password = 'Safeboda123$'
let homePage: HomePage;
type Items={
  style: string;
  price: number;
}


async function clearCart(page:Page) {
  await page.getByRole('link', { name: ' My Cart' }).click();
  await page.getByRole('link', { name: ' Remove' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
}

async function addToCart(page:Page) {
  await page.getByRole('menuitem', { name: ' Women' }).hover();
  await page.getByRole('menuitem', { name: ' Tops' }).click();
  await page.getByRole('tab', { name: 'Category ' }).click();
  await page.getByRole('link', { name: 'Tees (12 item )' }).click();
  await page.getByRole('tab', { name: 'Size ' }).click();
  await page.getByRole('tab', { name: 'Color ' }).click();
  await page.getByRole('tab', { name: 'Price ' }).click();
  await page.getByRole('link', { name: '$20.00 - $29.99 (8 item )' }).click();
  await page.getByRole('link', { name: 'Tiffany Fitness Tee' }).first().click();
  await page.getByLabel('L', { exact: true }).click();
  await page.getByLabel('White').click();
  await page.getByLabel('Qty').click();
  await page.getByLabel('Qty').fill('3');
  await page.getByRole('button', { name: 'Add to Cart' }).click();

  
}

async function checkoutCart(page:Page) {
  await page.getByRole('link', { name: ' My Cart 3 3\nitems' }).click();
  await page.getByText('Cart Subtotal').click();
  await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
  await page.goto('https://magento.softwaretestingboard.com/checkout/#shipping');
  await page.getByText('SafeBoda SafeBoda Block 210, Plot 1704,, Kyebando, Kanyike Road. Kampala, P.O. B').click();
  await page.getByText('Shipping Methods').click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('rowheader', { name: 'Cart Subtotal' }).click();
  await page.getByRole('cell', { name: '$84.00' }).locator('span').click();
  await page.getByRole('rowheader', { name: 'Shipping Flat Rate - Fixed' }).click();
  await page.getByRole('cell', { name: '$15.00' }).locator('span').click();
  await page.getByText('Order Total').click();
  await page.getByRole('cell', { name: '$99.00' }).locator('span').click();
  await page.getByRole('tab', { name: 'View Details ' }).click();
  await page.getByRole('button', { name: 'Place Order' }).click();

  
}

test.beforeEach(async({page})=>{
    await page.goto(URL);
    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.getByLabel('Email', { exact: true }).click();
    await page.getByLabel('Email', { exact: true }).fill(userName);
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'Sign In' }).click();
  //  await clearCart(page);
    //homePage = new HomePage(page);

});

 test('add items to cart', async ({ page }) => {
  //await clearCart(page);
  await addToCart(page);
});

test('checkout cart',async ({ page }) => {
  await checkoutCart(page);
  
});
