const fs = require("fs");
const path = require("path");
const { About_page } = require("../../../Models/Content/About_page");

const About_Edit = async (req, res) => {
    const { Title, Description, button } = req.body;

    if (!Title || !button || !Description) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    const { image } = req.files;
    let imageLink = null;

    const processImage = (image, about_page) => {
        if (!image || !image.path) {
            return null;
        }

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "image/heic",
        ];
        const allowedExtensions = [".jpeg", ".jpg", ".png", ".heic", ".webp"];
        const fileExtension = path.extname(image.name).toLowerCase();

        if (!allowedTypes.includes(image.type)) {
            throw new Error(
                "Only JPEG, PNG, and JPG and heic and webp images are allowed!"
            );
        }

        if (!allowedExtensions.includes(fileExtension)) {
            throw new Error("Invalid file extension.");
        }

        const uniqueSuffix = `About_page_Pic-${Date.now()}${fileExtension}`;
        const targetDir = path.join(
            __dirname,
            "../../../public/about_page_images"
        );
        const targetPath = path.join(targetDir, uniqueSuffix);

        // Ensure target directory exists
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }
        if (

            about_page?.image_link &&
            fs.existsSync(
                path.join(__dirname, "../../../public", about_page?.image_link)
            )
        ) {
            fs.unlinkSync(
                path.join(__dirname, "../../../public", about_page?.image_link)
            );
        }
        fs.copyFileSync(image.path, targetPath);
        fs.unlinkSync(image.path);

        return `/about_page_images/${uniqueSuffix}`;
    };

    try {
        const about_page = await About_page.findOne();

        if (image) {
            imageLink = processImage(image, about_page);
        }

        if (!about_page) {
            await About_page.create({
                Title,
                Description,
                button,
                image_link: imageLink, // Save relative path
            });
        } else {
            about_page.Title = Title || about_page.Title;
            about_page.Description = Description || about_page.Description;
            about_page.button = button || about_page.button;
            about_page.image_link = imageLink || about_page?.image_link;
            await about_page.save();
        }

        return res.status(200).json({ about_page });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = About_Edit;
