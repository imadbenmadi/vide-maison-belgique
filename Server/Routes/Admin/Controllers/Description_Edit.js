const fs = require("fs");
const path = require("path");
const { Description_page } = require("../../../Models/Content/Description");

const Description_Edit = async (req, res) => {
    const { Title, Description } = req.body;

    if (!Title || !Description) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    const { image1, image2 } = req.files;
    console.log(req.files?.image1?.path);
    console.log(req.files?.image2?.path);
    console.log("________________");

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
            "/Description_page_images/",
            uniqueSuffix
        );

        fs.copyFileSync(image.path, targetPath);
        fs.unlinkSync(image.path);

        return `/Description_page_images/${uniqueSuffix}`;
    };

    try {
        if (image1) images.image1 = processImage(image1);
        if (image2) images.image2 = processImage(image2);

        const description_page = await Description_page.findOne();
        if (!description_page) {
            await Description_page.create({
                Title,
                Description,
                image_link1: images.image1,
                image_link2: images.image2,
            });
        } else {
            description_page.Title = Title ? Title : description_page.Title;
            description_page.Description = Description
                ? Description
                : description_page.Description;
            description_page.image_link1 = images.image1
                ? images.image1
                : description_page.image_link1;
            description_page.image_link2 = images.image2
                ? images.image2
                : description_page.image_link2;
        }

        return res.status(200).json({ description_page });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = Description_Edit;
