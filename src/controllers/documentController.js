
import fs from "fs/promises";
import {
    createDocument,
    findDocumentById
} from "../repositories/documentRepository.js";

export async function uploadDocument(req, res, next) {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please select a file"
            });
        }

        const document = await createDocument({
            originalName: req.file.originalname,
            storedName: req.file.filename,
            mimeType: req.file.mimetype,
            fileSize: req.file.size,
            storagePath: req.file.path,
            uploadedBy: req.user.id
        });

        return res.status(201).json({
            success: true,
            message: "Document uploaded successfully",
            data: document
        });

    } catch (error) {
        // Avoid leaving an orphaned file if DB insertion fails.
        if (req.file?.path) {
            await fs.unlink(req.file.path).catch(() => {});
        }

        next(error);
    }
}

export async function getDocument(req, res, next) {
    try {
        const document = await findDocumentById(req.params.id);

        if (!document) {
            return res.status(404).json({
                success: false,
                message: "Document not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: document
        });

    } catch (error) {
        next(error);
    }
}
