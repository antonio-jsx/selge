import 'dotenv/config';
import { db } from 'src';
import { settings } from 'src/schemas/settings';

const main = async (): Promise<void> => {
  await db.insert(settings).values({
    section: 'home',
    title: '🛍️ Modern E-Commerce Boilerplate',
    description:
      'Build a fast, scalable online store with modern tools. Includes auth, cart, checkout, admin panel, and integrations for a seamless e-commerce setup.',
  });
  process.exit(0);
};

void main();
