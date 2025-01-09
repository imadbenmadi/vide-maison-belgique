const fs = require("fs");
const path = require("path");
const { Description_page } = require("../../../Models/Content/Description");

const Description_Edit = async (req, res) => {
    const { Title, Description } = req.body;

    if (!Title || !Description) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    const { image1, image2 } = req.files;
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/heic"];
    const allowedExtensions = [".jpeg", ".jpg", ".png", ".heic"];
    const images = { image1: null, image2: null };

    const processImage = (image) => {
        const fileExtension = path.extname(image.name).toLowerCase();

        if (!allowedTypes.includes(image.type)) {
            throw new Error("Only JPEG, PNG, and JPG images are allowed!");
        }

        if (!allowedExtensions.includes(fileExtension)) {
            throw new Error("Invalid file extension.");
        }

        const uniqueSuffix = `Description_page_Pic-${Date.now()}${fileExtension}`;
        const targetPath = path.join(
            "public/Description_page_images/",
            uniqueSuffix
        );

        fs.copyFileSync(image.path, targetPath);
        fs.unlinkSync(image.path);

        return `/Description_page_images/${uniqueSuffix}`;
    };

    try {
        if (image1) images.image1 = processImage(image1);
        if (image2) images.image2 = processImage(image2);

        await Description_page.destroy({ where: {} });

        const about_page = await Description_page.create({
            Title,
            Description,
            button,
            image_link1: images.image1,
            image_link2: images.image2,
        });

        return res.status(200).json({ about_page });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = Description_Edit;
