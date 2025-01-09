const fs = require("fs");
const path = require("path");
const { About_page } = require("../../../Models/Content/About_page");

const Main_Edit = async (req, res) => {
    const { Title, Description, button } = req.body;

    if (!Title || !button || !Description) {
        return res.status(400).json({ message: "Missing required fields." });
    }
    let uniqueSuffix = null;
    const { image } = req.files;
    if (image) {
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "image/heic",
        ];
        if (!allowedTypes.includes(image.type)) {
            throw new Error("Only JPEG and PNG and JPG images are allowed!");
        }

        const fileExtension = path.extname(image.name).toLocaleLowerCase();
        if (![".jpeg", ".jpg", ".png", ".heic"].includes(fileExtension)) {
            throw new Error("Invalid file extension");
        }
        uniqueSuffix = `About_page_Pic-${Date.now()}${fileExtension}`;
        const targetPath = path.join("public/About_page_images/", uniqueSuffix);
        fs.copyFileSync(image.path, targetPath);
        fs.unlinkSync(image.path);
    }
    try {
        await About_page.destroy({ where: {} });
        const about_page = await About_page.create({
            Title,
            Description,
            button,
            image_link: image ? `/About_page_images/${uniqueSuffix}` : null,
        });

        return res.status(200).json({ about_page });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = Main_Edit;
