const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const CATEGORIES = [
  {
    name: "Gold",
    slug: "gold",
    subcategories: [
      { name: "Necklace Sets", slug: "necklace-sets" },
      { name: "Pendant Sets", slug: "pendant-sets" },
      { name: "Lady's Rings", slug: "ladys-rings" },
      { name: "Gent's Rings", slug: "gents-rings" },
      { name: "Eartops", slug: "eartops" },
      { name: "Bracelets", slug: "bracelets" },
      { name: "Bangles", slug: "bangles" },
      { name: "Noa", slug: "noa" },
      { name: "Chains", slug: "chains" },
      { name: "Rakhi", slug: "rakhi" },
    ],
  },
  {
    name: "Diamond",
    slug: "diamond",
    subcategories: [
      { name: "Chains with Pendant", slug: "chains-with-pendant" },
      { name: "Rings", slug: "rings" },
      { name: "Earrings", slug: "earrings" },
      { name: "Nosepins", slug: "nosepins" },
    ],
  },
  {
    name: "Silver",
    slug: "silver",
    subcategories: [
      { name: "Nosepins", slug: "nosepins" },
      { name: "Rakhi", slug: "rakhi" },
      { name: "Rings", slug: "rings" },
      { name: "Necklaces", slug: "necklaces" },
    ],
  },
  {
    name: "Astrological Stones",
    slug: "astrological-stones",
    subcategories: [
      { name: "Nila", slug: "nila" },
      { name: "Opal", slug: "opal" },
      { name: "Emerald", slug: "emerald" },
      { name: "Ruby", slug: "ruby" },
    ],
  },
  {
    name: "Costume Jewellery",
    slug: "costume-jewellery",
  },
  {
    name: "Offers & Deals",
    slug: "offers-deals",
  },
];

async function main() {
  console.log('Seeding categories...');
  
  for (const cat of CATEGORIES) {
    const parent = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        name: cat.name,
        slug: cat.slug,
        isActive: true,
      },
    });

    if (cat.subcategories) {
      for (const sub of cat.subcategories) {
        // We add parent slug to sub slug to ensure uniqueness if needed, 
        // though here we just use the name for simplicity in this seed
        const subSlug = `${cat.slug}-${sub.slug}`;
        await prisma.category.upsert({
          where: { slug: subSlug },
          update: {},
          create: {
            name: sub.name,
            slug: subSlug,
            parentId: parent.id,
            isActive: true,
          },
        });
      }
    }
  }

  console.log('✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
