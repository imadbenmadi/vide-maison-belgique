const fs = require("fs");
const path = require("path");
const { Description_page } = require("../../../Models/Content/Description");

const Description_Edit = async (req, res) => {
    const { Title, Description } = req.body;

    if (!Title || !Description) {
        return res.status(400).json({ message: "Missing required fields." });
    }
    let uniqueSuffix = null;
    const { image1, image2 } = req.files;
    if (image1) {
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "image/heic",
        ];
        if (!allowedTypes.includes(image1.type)) {
            throw new Error("Only JPEG and PNG and JPG images are allowed!");
        }

        const fileExtension = path.extname(image1.name).toLocaleLowerCase();
        if (![".jpeg", ".jpg", ".png", ".heic"].includes(fileExtension)) {
            throw new Error("Invalid file extension");
        }
        uniqueSuffix = `Description_page_Pic-${Date.now()}${fileExtension}`;
        const targetPath = path.join(
            "public/Description_page_images/",
            uniqueSuffix
        );
        fs.copyFileSync(image1.path, targetPath);
        fs.unlinkSync(image1.path);
    }
    if (image2) {
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "image/heic",
        ];
        if (!allowedTypes.includes(image2.type)) {
            throw new Error("Only JPEG and PNG and JPG images are allowed!");
        }

        const fileExtension = path.extname(image2.name).toLocaleLowerCase();
        if (![".jpeg", ".jpg", ".png", ".heic"].includes(fileExtension)) {
            throw new Error("Invalid file extension");
        }
        uniqueSuffix = `Description_page_Pic-${Date.now()}${fileExtension}`;
        const targetPath = path.join(
            "public/Description_page_images/",
            uniqueSuffix
        );
        fs.copyFileSync(image2.path, targetPath);
        fs.unlinkSync(image2.path);
    }
    try {
        await Description_page.destroy({ where: {} });
        const about_page = await Description_page.create({
            Title,
            Description,
            button,
            image_link1: image1
                ? `/Description_page_images/${uniqueSuffix}`
                : null,
            image_link2: image2
                ? `/Description_page_images/${uniqueSuffix}`
                : null,
        });

        return res.status(200).json({ about_page });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = Description_Edit;
