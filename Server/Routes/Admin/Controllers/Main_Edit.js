const fs = require("fs");
const path = require("path");
const { Main_page } = require("../../../Models/Content/Main_page");

const Main_Edit = async (req, res) => {
    const { Title, Description, button } = req.body;

    if (!Title || !Description || !button) {
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
        uniqueSuffix = `Main_page_Pic-${Date.now()}${fileExtension}`;
        const targetPath = path.join("/Main_page_images/", uniqueSuffix);
        fs.copyFileSync(image.path, targetPath);
        fs.unlinkSync(image.path);
    }
    try {
        const main_page = await Main_page.findOne();

        if (!main_page)
            await Main_page.create({
                Title,
                Description,
                button,
                image_link: uniqueSuffix,
            });
        else {
            main_page.Title = Title ? Title : main_page.Title;
            main_page.Description = Description
                ? Description
                : main_page.Description;
            main_page.button = button ? button : main_page.button;
            main_page.image_link = uniqueSuffix
                ? uniqueSuffix
                : main_page.image_link;
            await main_page.save();
        }

        return res.status(200).json({ main_page });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = Main_Edit;
