const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable inside .env.local');
  process.exit(1);
}

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  image: String,
  role: String,
  createdAt: Date,
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function setAdmin(email) {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const user = await User.findOneAndUpdate(
      { email: email },
      { role: 'admin' },
      { new: true }
    );

    if (user) {
      console.log(`Successfully updated role to admin for user: ${user.name} (${user.email})`);
    } else {
      console.log(`User not found with email: ${email}`);
    }
  } catch (error) {
    console.error('Error updating user:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

const email = process.argv[2];
if (!email) {
  console.log('Usage: node scripts/set-admin.js <email>');
  process.exit(1);
}

setAdmin(email);
