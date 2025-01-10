const fs = require("fs");
const path = require("path");
const { About_page } = require("../../../Models/Content/About_page");

const About_Edit = async (req, res) => {
    const { Title, Description, button } = req.body;

    if (!Title || !button || !Description) {
        return res.status(400).json({ message: "Missing required fields." });
    }
    let uniqueSuffix = null;
    let targetPath = null;
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
        targetPath = path.join("/About_page_images/", uniqueSuffix);
        fs.copyFileSync(image.path, targetPath);
        fs.unlinkSync(image.path);
    }
    try {
        const about_page = await About_page.findOne();
        if (!about_page)
            await About_page.create({
                Title,
                Description,
                button,
                image_link: targetPath,
            });
        else {
            about_page.Title = Title ? Title : about_page.Title;
            about_page.Description = Description
                ? Description
                : about_page.Description;
            about_page.button = button ? button : about_page.button;
            about_page.image_link = targetPath
                ? targetPath
                : about_page.image_link;
            await about_page.save();
        }

        return res.status(200).json({ about_page });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = About_Edit;
