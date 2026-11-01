import { readFile } from "node:fs/promises";

async function readProjectInfo() {
    try {
        const data = await readFile(
            "README.md",
            "utf-8"
        );

        console.log(data);
    } catch (error) {
        console.error("Unable to read file:", error);
    }
}

readProjectInfo();