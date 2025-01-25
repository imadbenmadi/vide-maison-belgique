const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { Description_page } = require("../../../Models/Content/Description");

const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/heic"];
const allowedExtensions = [".jpeg", ".jpg", ".png", ".heic", ".webp"];
const targetDir = path.join(
    __dirname,
    "../../../public/Description_page_images"
);

const ensureDirectoryExists = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

const deleteExistingImage = (imagePath) => {
    const fullPath = path.join(__dirname, "../../../public", imagePath);
    if (imagePath && fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
    }
};

const processImage = (image, descriptionPage) => {
    if (!image?.path) return null;

    const fileExtension = path.extname(image.name).toLowerCase();
    if (
        !allowedTypes.includes(image.type) ||
        !allowedExtensions.includes(fileExtension)
    ) {
        throw new Error("Invalid image type or file extension.");
    }

    const uniqueFilename = `Description_page_Pic-${uuidv4()}${fileExtension}`;
    const targetPath = path.join(targetDir, uniqueFilename);

    ensureDirectoryExists(targetDir);

    if (descriptionPage.image_link1) {
        deleteExistingImage(descriptionPage.image_link1);
    }
    if (descriptionPage.image_link2) {
        deleteExistingImage(descriptionPage.image_link2);
    }

    fs.copyFileSync(image.path, targetPath);
    fs.unlinkSync(image.path);

    return `/Description_page_images/${uniqueFilename}`;
};

const Description_Edit = async (req, res) => {
    const { Title, Description } = req.body;
    const { image1, image2 } = req.files;

    if (!Title || !Description) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    try {
        const descriptionPage = await Description_page.findOne();
        const images = {
            image1: image1 ? processImage(image1, descriptionPage) : null,
            image2: image2 ? processImage(image2, descriptionPage) : null,
        };

        if (!descriptionPage) {
            const newPage = await Description_page.create({
                Title,
                Description,
                image_link1: images.image1,
                image_link2: images.image2,
            });
            return res.status(201).json({ description_page: newPage });
        }

        descriptionPage.Title = Title;
        descriptionPage.Description = Description;
        if (images.image1) descriptionPage.image_link1 = images.image1;
        if (images.image2) descriptionPage.image_link2 = images.image2;

        await descriptionPage.save();

        return res.status(200).json({ description_page: descriptionPage });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = Description_Edit;
