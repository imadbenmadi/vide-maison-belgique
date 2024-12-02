const fs = require("fs");
const path = require("path");

const ensureDirectoryExists = (dirPath) => {
    try {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    } catch (error) {
        console.error(`Failed to create directory: ${dirPath}`, error);
    }
};

const initializeDirectories = () => {
    const directories = [
        "public/about_page_images",
        "public/main_page_images",
        "public/phrases_images",
        "public/services_images",
    ];

    directories.forEach((dir) => {
        ensureDirectoryExists(path.join(__dirname, "../", dir));
    });
};

module.exports = { initializeDirectories };
