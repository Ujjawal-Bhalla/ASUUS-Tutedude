require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const fixUserRoles = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find users with old role names
    const usersToUpdate = await User.find({
      role: { $in: ['buyer', 'seller'] }
    });

    console.log(`Found ${usersToUpdate.length} users with old role names:`);
    usersToUpdate.forEach(user => {
      console.log(`- ${user.email}: ${user.role}`);
    });

    if (usersToUpdate.length === 0) {
      console.log('No users with old role names found.');
      return;
    }

    // Update roles
    const updatePromises = usersToUpdate.map(async (user) => {
      const newRole = user.role === 'buyer' ? 'vendor' : 'supplier';
      console.log(`Updating ${user.email}: ${user.role} → ${newRole}`);
      
      return User.findByIdAndUpdate(
        user._id,
        { role: newRole },
        { new: true, runValidators: false }
      );
    });

    const updatedUsers = await Promise.all(updatePromises);
    console.log(`Successfully updated ${updatedUsers.length} users`);

    // Verify the updates
    const allUsers = await User.find({});
    console.log('\nAll users after update:');
    allUsers.forEach(user => {
      console.log(`- ${user.email}: ${user.role}`);
    });

  } catch (error) {
    console.error('Error fixing user roles:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

fixUserRoles(); 