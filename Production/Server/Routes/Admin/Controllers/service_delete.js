const fs = require("fs");
const { Services } = require("../../../Models/Content/Services");

const delete_service = async (req, res) => {
    const { serviceId } = req.params;
    if (!serviceId) {
        return res.status(400).json({ message: "serviceId is required." });
    }

    try {
        const service = await Services.findOne({ where: { id: serviceId } });
        if (!service) {
            return res.status(404).json({ message: "Services not found." });
        }
        if (service?.image_link) {
            const previousFilename = service?.image_link.split("/").pop();
            const previousImagePath = `public/Services_Pics/${previousFilename}`;
            try {
                if (fs.existsSync(previousImagePath)) {
                    fs.unlinkSync(previousImagePath);
                }
            } catch (error) {
                console.error(error);
                // return res.status(400).send({
                //     message:
                //         "Could not delete Services picture : " + error.message,
                // });
            }
        }
        await service.destroy();
        return res
            .status(200)
            .json({ message: "Services deleted successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

module.exports =  delete_service ;
