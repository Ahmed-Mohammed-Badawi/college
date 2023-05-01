import fs from "fs";

async function getCssData(filePath) {
    const cssData = await fs.promises.readFile(filePath, "utf-8");
    return cssData;
}

export default getCssData;