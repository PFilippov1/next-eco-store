import prisma from '@/lib/prisma'
import { hash } from 'bcryptjs'




async function main() {
  // Clearing existing data
  await prisma.favorite.deleteMany()
  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.user.deleteMany()

  console.log('🌱 Starting seed...')

  // Create a user
  const hashedPassword = await hash('password123', 10)
  
  const user = await prisma.user.create({
    data: {
      email: 'eco@example.com',
      password: hashedPassword,
      name: 'Eco',
    }
  })

  // Create main categories
  const fruits = await prisma.category.create({
    data: {
      name: 'Fruits',
      slug: 'fruits'
    }
  })

  const vegetables = await prisma.category.create({
    data: {
      name: 'Vegetables',
      slug: 'vegetables'
    }
  })

  const berries = await prisma.category.create({
    data: {
      name: 'Berries',
      slug: 'berries'
    }
  })

  const greens = await prisma.category.create({
    data: {
      name: 'Greens & Herbs',
      slug: 'greens-herbs'
    }
  })

  const organic = await prisma.category.create({
    data: {
      name: 'Organic Products',
      slug: 'organic'
    }
  })

  // Create subcategories for Fruits
  const citrus = await prisma.category.create({
    data: {
      name: 'Citrus',
      slug: 'citrus',
      parentId: fruits.id
    }
  })

  const tropical = await prisma.category.create({
    data: {
      name: 'Tropical',
      slug: 'tropical',
      parentId: fruits.id
    }
  })

  const applesPears = await prisma.category.create({
    data: {
      name: 'Apples & Pears',
      slug: 'apples-pears',
      parentId: fruits.id
    }
  })

  const stoneFruits = await prisma.category.create({
    data: {
      name: 'Stone Fruits',
      slug: 'stone-fruits',
      parentId: fruits.id
    }
  })

  // Subcategories for Vegetables
  const rootVegetables = await prisma.category.create({
    data: {
      name: 'Root Vegetables',
      slug: 'root-vegetables',
      parentId: vegetables.id
    }
  })

  const leafyGreens = await prisma.category.create({
    data: {
      name: 'Leafy Greens',
      slug: 'leafy-greens',
      parentId: vegetables.id
    }
  })

  const cruciferous = await prisma.category.create({
    data: {
      name: 'Cruciferous',
      slug: 'cruciferous',
      parentId: vegetables.id
    }
  })

  const nightshade = await prisma.category.create({
    data: {
      name: 'Nightshade',
      slug: 'nightshade',
      parentId: vegetables.id
    }
  })

  // Create products with free images
  const products = [
    // Fruits
    {
      name: 'Granny Smith Apples',
      description: 'Crisp and tart green apples, perfect for pies or fresh eating. Grown in eco-friendly orchards without pesticides.',
      price: 2.99,
      categoryId: applesPears.id,
      images: [
        'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800&auto=format&fit=crop'
      ]
    },
    {
      name: 'Organic Bananas',
      description: 'Sweet and creamy bananas from Ecuador. Certified organic, non-GMO, and fair trade.',
      price: 1.99,
      categoryId: tropical.id,
      images: [
        'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&auto=format&fit=crop'
      ]
    },
    {
      name: 'Juicy Oranges',
      description: 'Sweet and juicy oranges from Spain. Packed with vitamin C and perfect for fresh juice.',
      price: 3.49,
      categoryId: citrus.id,
      images: [
        'https://images.unsplash.com/photo-1547514701-42782101795e?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=800&auto=format&fit=crop'
      ]
    },
    {
      name: 'Ripe Mangoes',
      description: 'Sweet and fragrant mangoes from Thailand. Perfect for smoothies, desserts, or eating fresh.',
      price: 4.99,
      categoryId: tropical.id,
      images: [
        'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&auto=format&fit=crop'
      ]
    },
    {
      name: 'Fresh Lemons',
      description: 'Aromatic lemons with thin skin. Great for tea, lemonade, and cooking.',
      price: 1.49,
      categoryId: citrus.id,
      images: [
        'https://images.unsplash.com/photo-1624308277796-a869edbba8b8?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1605185189315-fc269c231e41?w=800&auto=format&fit=crop'
      ]
    },
    {
      name: 'Red Apples',
      description: 'Sweet and crunchy red apples. Perfect for snacking and baking.',
      price: 2.79,
      categoryId: applesPears.id,
      images: [
        'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?w=800&auto=format&fit=crop'
      ]
    },
    {
      name: 'Sweet Peaches',
      description: 'Juicy and sweet peaches. Perfect for desserts or eating fresh.',
      price: 4.49,
      categoryId: stoneFruits.id,
      images: [
        'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1531072901881-d644216d4bf9?w=800&auto=format&fit=crop'
      ]
    },

    // Berries
    {
      name: 'Fresh Strawberries',
      description: 'Sweet and aromatic strawberries from local farms. Hand-picked in the morning.',
      price: 5.99,
      categoryId: berries.id,
      images: [
        'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1587393855524-087f83d95bc9?w=800&auto=format&fit=crop'
      ]
    },
    {
      name: 'Blueberries',
      description: 'Large sweet blueberries. Rich in antioxidants and perfect for breakfast.',
      price: 6.99,
      categoryId: berries.id,
      images: [
        'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop'
      ]
    },
    {
      name: 'Raspberries',
      description: 'Delicate and aromatic raspberries. Perfect for desserts and jams.',
      price: 7.99,
      categoryId: berries.id,
      images: [
        'https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=800&auto=format&fit=crop'
      ]
    },
    {
      name: 'Blackberries',
      description: 'Plump and juicy blackberries. Great for smoothies and healthy snacks.',
      price: 6.49,
      categoryId: berries.id,
      images: [
        'https://images.unsplash.com/photo-1723580892175-2e267106c089?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1720019962117-8d3916d970d7?w=800&auto=format&fit=crop'
      ]
    },

    // Vegetables
    {
      name: 'Organic Carrots',
      description: 'Sweet and crunchy carrots. Rich in beta-carotene and grown organically.',
      price: 2.49,
      categoryId: rootVegetables.id,
      images: [
        'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1447175008436-054170c2e979?w=800&auto=format&fit=crop'
      ]
    },
    {
      name: 'Broccoli',
      description: 'Fresh and crisp broccoli heads. Packed with vitamins and minerals.',
      price: 2.99,
      categoryId: cruciferous.id,
      images: [
        'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1459411621453-7b03977f4e8c?w=800&auto=format&fit=crop'
      ]
    },
    {
      name: 'Tomatoes on the Vine',
      description: 'Sweet and flavorful tomatoes. Perfect for salads and sauces.',
      price: 3.99,
      categoryId: nightshade.id,
      images: [
        'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=800&auto=format&fit=crop'
      ]
    },
    {
      name: 'Bell Peppers Mix',
      description: 'Colorful mix of red, yellow, and green bell peppers. Sweet and crunchy.',
      price: 4.99,
      categoryId: nightshade.id,
      images: [
        'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1526470498-9ae73c665de8?w=800&auto=format&fit=crop'
      ]
    },
    {
      name: 'Cucumbers',
      description: 'Fresh and crisp cucumbers. Great for salads and healthy snacks.',
      price: 1.99,
      categoryId: vegetables.id,
      images: [
        'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1580624474734-0c7d7b02b6f6?w=800&auto=format&fit=crop'
      ]
    },
    {
      name: 'Potatoes',
      description: 'Versatile russet potatoes. Perfect for baking, mashing, or roasting.',
      price: 3.49,
      categoryId: rootVegetables.id,
      images: [
        'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1580654712603-eb43273aff37?w=800&auto=format&fit=crop'
      ]
    },
    {
      name: 'Spinach',
      description: 'Fresh and tender spinach leaves. Rich in iron and vitamins.',
      price: 3.49,
      categoryId: leafyGreens.id,
      images: [
        'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1651427660796-1bc57aafa229?w=800&auto=format&fit=crop'
      ]
    },

    // Greens & Herbs
    {
      name: 'Fresh Basil',
      description: 'Aromatic fresh basil. Essential for Italian cuisine and pesto.',
      price: 2.49,
      categoryId: greens.id,
      images: [
        'https://images.unsplash.com/photo-1662422325326-19089df23d98?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1572978577745-245cde7e1da3?w=800&auto=format&fit=crop'
      ]
    },
    {
      name: 'Cilantro',
      description: 'Fresh cilantro. Perfect for Mexican and Asian dishes.',
      price: 1.99,
      categoryId: greens.id,
      images: [
        'https://images.unsplash.com/photo-1723810330043-dd05647294cb?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1660092751699-39905fc4e4c5?w=800&auto=format&fit=crop'
      ]
    },
    {
      name: 'Mint',
      description: 'Refreshing mint leaves. Great for tea, cocktails, and desserts.',
      price: 2.29,
      categoryId: greens.id,
      images: [
        'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1615485925760-8d2e66684b68?w=800&auto=format&fit=crop'
      ]
    },

    // Organic Products
    {
      name: 'Organic Avocados',
      description: 'Creamy and nutritious organic avocados. Perfect for guacamole and toast.',
      price: 5.99,
      categoryId: organic.id,
      images: [
        'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1601039641847-7857b994d704?w=800&auto=format&fit=crop'
      ]
    },
    {
      name: 'Organic Garlic',
      description: 'Strong and flavorful organic garlic. Essential for cooking.',
      price: 2.99,
      categoryId: organic.id,
      images: [
        'https://images.unsplash.com/photo-1726161646475-1888873f3d89?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1722810767145-5f8380c009df?w=800&auto=format&fit=crop'
      ]
    },
    {
      name: 'Organic Onions',
      description: 'Sweet and pungent organic onions. A kitchen staple.',
      price: 2.49,
      categoryId: organic.id,
      images: [
        'https://images.unsplash.com/photo-1741517480859-cc010cff7e6a?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1621295213070-e7c9c89972af?w=800&auto=format&fit=crop'
      ]
    }
  ]

  // Create products and their images
  for (const productData of products) {
    const { images, ...productInfo } = productData
    
    const product = await prisma.product.create({
      data: {
        ...productInfo,
        images: {
          create: images.map(url => ({ url }))
        }
      }
    })

    // Add some products to user's favorites
    if (product.name.includes('Strawberries') || product.name.includes('Avocados') || product.name.includes('Bananas')) {
      await prisma.favorite.create({
        data: {
          userId: user.id,
          productId: product.id
        }
      })
    }
  }

  console.log('✅ Seed completed successfully!')
  console.log(`📊 Created:`)
  console.log(`   - 1 user`)
  console.log(`   - ${await prisma.category.count()} categories`)
  console.log(`   - ${await prisma.product.count()} products`)
  console.log(`   - ${await prisma.productImage.count()} product images`)
  console.log(`   - ${await prisma.favorite.count()} favorites`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })