const bcrypt = require('bcrypt');

(async () => {
    const originalPassword = "Admin@123"; // The password you originally stored
    const storedHash = "$2b$10$YlqBfwpHCz2Z6zpKDsv1venGYmEGXoIx5LkFr6gLg.a0nw5d1LQ2C"; // Copy from MongoDB

    console.log("🔹 Rehashing Password for Comparison...");
    // const newHash = await bcrypt.hash(originalPassword, 10);
    // console.log("🔹 New Hash:", newHash);

    const isMatch = await bcrypt.compare(originalPassword, storedHash);
    console.log("🔹 Password Match Test:", isMatch);
})();
