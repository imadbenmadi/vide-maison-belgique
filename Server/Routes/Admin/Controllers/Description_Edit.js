const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
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

    const processImage = (image, description_page) => {
        if (!image || !image.path) {
            return null;
        }
        const fileExtension = path.extname(image.name).toLowerCase();

        if (!allowedTypes.includes(image.type)) {
            throw new Error("Only JPEG, PNG, and JPG images are allowed!");
        }

        if (!allowedExtensions.includes(fileExtension)) {
            throw new Error("Invalid file extension.");
        }

        const uniqueSuffix = `Description_page_Pic-${uuidv4()}${fileExtension}`;
        const targetDir = path.join(
            __dirname,
            "../../../public/Description_page_images"
        );
        const targetPath = path.join(targetDir, uniqueSuffix);

        // Ensure target directory exists
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }
        if (
            description_page.image_link1 &&
            fs.existsSync(
                path.join(
                    __dirname,
                    "../../../public",
                    description_page.image_link1
                )
            )
        ) {
            fs.unlinkSync(
                path.join(
                    __dirname,
                    "../../../public",
                    description_page.image_link1
                )
            );
        }
        if (
            description_page.image_link2 &&
            fs.existsSync(
                path.join(
                    __dirname,
                    "../../../public",
                    description_page.image_link2
                )
            )
        ) {
            fs.unlinkSync(
                path.join(
                    __dirname,
                    "../../../public",
                    description_page.image_link2
                )
            );
        }
        fs.copyFileSync(image.path, targetPath);
        fs.unlinkSync(image.path);

        return `/Description_page_images/${uniqueSuffix}`;
    };

    try {
        const description_page = await Description_page.findOne();

        if (image1) images.image1 = processImage(image1, description_page);
        if (image2) images.image2 = processImage(image2, description_page);

        if (!description_page) {
            await Description_page.create({
                Title,
                Description,
                image_link1: images.image1,
                image_link2: images.image2,
            });
        } else {
            description_page.Title = Title;
            description_page.Description = Description;

            if (images.image1) {
                description_page.image_link1 = images.image1;
            }
            if (images.image2) {
                description_page.image_link2 = images.image2;
            }

            await description_page.save();
        }

        return res.status(200).json({ description_page });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = Description_Edit;
