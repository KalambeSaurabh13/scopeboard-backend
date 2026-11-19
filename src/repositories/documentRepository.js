
import pool from "../config/db.js";


export async function createDocument(document) {
    const query = `
        INSERT INTO documents (
            original_name,
            storage_name,
            mime_type,
            file_size,
            storage_path,
            uploaded_by
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
    `;

    const values = [
        document.originalName,
        document.storedName,
        document.mimeType,
        document.fileSize,
        document.storagePath,
        document.uploadedBy
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
}

export async function findDocumentById(id) {
    const result = await pool.query(
        "SELECT * FROM documents WHERE id = $1",
        [id]
    );

    return result.rows[0];
}
