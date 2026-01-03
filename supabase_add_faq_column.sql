-- FAQ sütunu ekle (JSONB tipinde)
-- Bu sütun FAQ verilerini JSON formatında saklar
ALTER TABLE posts 
ADD COLUMN IF NOT EXISTS faq JSONB DEFAULT NULL;

-- Sütunun başarıyla eklendiğini kontrol et
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'posts' AND column_name = 'faq';

