const fs = require("fs");
const path = require("path");
const { Main_page } = require("../../../Models/Content/Main_page");

const Main_Edit = async (req, res) => {
    const { Title, Description, button } = req.body;

    if (!Title || !Description || !button) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    const { image } = req.files;
    let imageLink = null;

    const processImage = (image) => {
        if (!image || !image.path) {
            return null;
        }
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "image/heic",
        ];
        const allowedExtensions = [".jpeg", ".jpg", ".png", ".heic"];
        const fileExtension = path.extname(image.name).toLowerCase();

        if (!allowedTypes.includes(image.type)) {
            throw new Error("Only JPEG, PNG, and JPG images are allowed!");
        }

        if (!allowedExtensions.includes(fileExtension)) {
            throw new Error("Invalid file extension.");
        }

        const uniqueSuffix = `Main_page_Pic-${Date.now()}${fileExtension}`;
        const targetDir = path.join(
            __dirname,
            "../../../public/main_page_images"
        );
        const targetPath = path.join(targetDir, uniqueSuffix);

        // Ensure target directory exists
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        fs.copyFileSync(image.path, targetPath);
        fs.unlinkSync(image.path);

        return `/main_page_images/${uniqueSuffix}`;
    };

    try {
        if (image) {
            imageLink = processImage(image);
        }

        const main_page = await Main_page.findOne();

        if (!main_page) {
            await Main_page.create({
                Title,
                Description,
                button,
                image_link: imageLink,
            });
        } else {
            main_page.Title = Title || main_page.Title;
            main_page.Description = Description || main_page.Description;
            main_page.button = button || main_page.button;
            main_page.image_link = imageLink || main_page.image_link;
            await main_page.save();
        }

        return res.status(200).json({ main_page });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = Main_Edit;
