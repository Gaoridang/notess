CREATE OR REPLACE FUNCTION semantic_search(
    query_text TEXT,
    query_embedding vector(1536),
    match_count INT,
    match_date DATE DEFAULT NULL
)
RETURNS TABLE (
    id UUID,
    description TEXT,
    metadata JSONB,
    similarity FLOAT,
    created_at TIMESTAMP WITH TIME ZONE
) LANGUAGE sql SECURITY DEFINER AS $$
    WITH date_range AS (
        SELECT
            CASE
                WHEN match_date IS NULL THEN CURRENT_DATE - INTERVAL '30 days'
                ELSE match_date - INTERVAL '7 day'
            END AS start_date,
            CASE
                WHEN match_date IS NULL THEN CURRENT_DATE
                ELSE match_date
            END AS end_date
    ),
    filtered_activities AS (
        SELECT activities.id, activities.description, activities.metadata, activities.created_at
        FROM activities
        CROSS JOIN date_range
        WHERE (activities.metadata->>'date')::DATE BETWEEN date_range.start_date AND date_range.end_date
        AND activities.user_id = auth.uid()
    ),
    semantic AS (
        SELECT
            fa.id,
            1 - (activity_embeddings.embedding <=> query_embedding) AS similarity
        FROM
            filtered_activities fa
        JOIN
            activity_embeddings ON fa.id = activity_embeddings.activity_id
        ORDER BY similarity DESC
        LIMIT match_count
    )
    SELECT
        fa.id,
        fa.description,
        fa.metadata,
        s.similarity,
        fa.created_at
    FROM
        semantic s
    JOIN
        filtered_activities fa ON s.id = fa.id
    ORDER BY
        s.similarity DESC
    LIMIT
        match_count;
$$;