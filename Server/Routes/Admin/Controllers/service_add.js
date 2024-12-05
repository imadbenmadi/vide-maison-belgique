const fs = require("fs");
const path = require("path");
const { Services } = require("../../../Models/Content/Services");

const add_service = async (req, res) => {
    const { Title, Description, type } = req.body;
    if ((!Title, !type)) {
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
        uniqueSuffix = `Services_Pic-${ownerId}-${Date.now()}${fileExtension}`;
        const targetPath = path.join("public/services_images/", uniqueSuffix);
        fs.copyFileSync(image.path, targetPath);
        fs.unlinkSync(image.path);
    }
    try {
        const service = await Services.create({
            Title,
            Description,
            type,
            image_link: image ? `/services_images/${uniqueSuffix}` : null,
        });

        return res.status(200).json({ service });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = { add_service };
