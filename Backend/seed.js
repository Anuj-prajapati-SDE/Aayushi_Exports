const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('./models/User');
const HeroSlide = require('./models/HeroSlide');

// Load environment variables
dotenv.config();

const seedDatabase = async (isStandalone = false) => {
  try {
    // If not already connected (e.g., when run directly via CLI)
    if (mongoose.connection.readyState !== 1) {
      const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/e-commerce';
      console.log(`🌱 [Seeder]: Connecting to Database: ${mongoUri}...`);
      await mongoose.connect(mongoUri);
      console.log('🌱 [Seeder]: MongoDB Connected Successfully');
    }

    console.log('🌱 [Seeder]: Initializing database seeds...');

    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@pesco.com').toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const adminName = 'Super Administrator';

    // Check if demo admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      let isPasswordValid = false;
      try {
        isPasswordValid = await existingAdmin.matchPassword(adminPassword);
      } catch (err) {
        isPasswordValid = false;
      }

      if (!isPasswordValid || existingAdmin.role !== 'admin' || !existingAdmin.isActive) {
        existingAdmin.name = adminName;
        existingAdmin.role = 'admin';
        existingAdmin.password = adminPassword; // Pre-save hook will hash it
        existingAdmin.isActive = true;
        await existingAdmin.save();
        console.log(`✅ [Seeder]: Demo Admin Account Verified & Updated (${adminEmail})`);
      } else {
        console.log(`✅ [Seeder]: Demo Admin Account Active (${adminEmail})`);
      }
    } else {
      console.log(`[Seeder]: Creating demo admin account...`);
      const newAdmin = new User({
        name: adminName,
        email: adminEmail,
        password: adminPassword, // Pre-save hook will hash it
        role: 'admin',
        phone: '+1 (555) 019-2834',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
        isActive: true,
      });

      await newAdmin.save();
      console.log('----------------------------------------------------');
      console.log('🎉 [Seeder]: Demo Admin Created Successfully:');
      console.log(`   Email:    ${adminEmail}`);
      console.log(`   Password: ${adminPassword}`);
      console.log(`   Role:     admin`);
      console.log('----------------------------------------------------');
    }

    // Optional: Seed a few sample demo users
    const sampleCustomerEmail = 'customer@pesco.com';
    const existingCustomer = await User.findOne({ email: sampleCustomerEmail });
    if (!existingCustomer) {
      const customer = new User({
        name: 'Sarah Jenkins',
        email: sampleCustomerEmail,
        password: 'customer123',
        role: 'user',
        phone: '+1 (555) 234-5678',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
      });
      await customer.save();
      console.log(`✅ [Seeder]: Sample Demo Customer Created: ${sampleCustomerEmail} / customer123`);
    }

    // Seed Hero Slides if not present
    const heroSlidesCount = await HeroSlide.countDocuments();
    if (heroSlidesCount === 0) {
      const defaultSlides = [
        {
          subHeading: 'Handcrafted Luxury Metalware',
          title: 'Authentic Ratan Brass & Royal Artefacts',
          description: 'Elevate your living space with heirloom-quality antique brass pillar vases, intricate jali cutouts, and Moradabad artisan craftsmanship.',
          price: '145.00',
          buttonText: 'Shop Now',
          buttonLink: '/shops',
          image: 'assets/images/products/brass-cylinder-vase-1.jpg',
          shape: 'assets/images/hero/hero-one-shape1.png',
          order: 0,
          isActive: true,
        },
        {
          subHeading: 'Ambient Illuminations',
          title: 'Vintage Moroccan Lanterns & Fairy Lamps',
          description: 'Transform celebrations, balconies, and living rooms with our exquisite metal & tempered glass fairy light lanterns in Pearl White & Matte Black.',
          price: '89.00',
          buttonText: 'Shop Now',
          buttonLink: '/shops',
          image: 'assets/images/products/white-moroccan-lanterns.jpg',
          shape: 'assets/images/hero/hero-one-shape1.png',
          order: 1,
          isActive: true,
        },
        {
          subHeading: 'Traditional Spiritual Elegance',
          title: 'Embossed Brass Flower Vases & Peacock Diyas',
          description: 'Hand-engraved floral embossing and solid cast brass artefacts designed to bring timeless grandeur and warmth into your home.',
          price: '195.00',
          buttonText: 'Shop Now',
          buttonLink: '/shops',
          image: 'assets/images/products/brass-flower-vase-set.jpg',
          shape: 'assets/images/hero/hero-one-shape1.png',
          order: 2,
          isActive: true,
        },
      ];
      await HeroSlide.insertMany(defaultSlides);
      console.log('✅ [Seeder]: Default Hero Slides Seeded Successfully.');
    }

    console.log('🌟 [Seeder]: Database Seeding Finished.');

    if (isStandalone) {
      await mongoose.connection.close();
      process.exit(0);
    }
  } catch (error) {
    console.error('❌ [Seeder Error]:', error.message);
    if (isStandalone) {
      if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
      }
      process.exit(1);
    }
  }
};

// Auto-run if executed directly via CLI: `node seed.js`
if (require.main === module) {
  seedDatabase(true);
}

module.exports = seedDatabase;

