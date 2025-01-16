const fs = require("fs");
const path = require("path");
const { Services } = require("../../../Models/Content/Services");

const add_service = async (req, res) => {
    const { Title, Description, type } = req.body;

    if (!Title || !Description || !type) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    const { files } = req;
    const image = files ? files.image : null;
    let uniqueSuffix = null;

    try {
        if (image) {
            const allowedTypes = [
                "image/jpeg",
                "image/png",
                "image/jpg",
                "image/heic",
            ];
            const allowedExtensions = [".jpeg", ".jpg", ".png", ".heic"];
            const fileExtension = path.extname(image.name).toLowerCase();

            if (
                !allowedTypes.includes(image.type) ||
                !allowedExtensions.includes(fileExtension)
            ) {
                throw new Error(
                    "Only JPEG, PNG, JPG, and HEIC images are allowed!"
                );
            }

            uniqueSuffix = `Services_Pic-${Date.now()}${fileExtension}`;
            const targetDir = path.join(
                __dirname,
                "../../../public/services_images"
            );
            const targetPath = path.join(targetDir, uniqueSuffix);

            if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
            }

            fs.copyFileSync(image.path, targetPath);
            fs.unlinkSync(image.path);
        }

        const service = await Services.create({
            Title,
            Description,
            type,
            image_link: image ? `/services_images/${uniqueSuffix}` : null,
        });

        return res.status(200).json({ service });
    } catch (error) {
        console.error("Error in add_service:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = add_service;
