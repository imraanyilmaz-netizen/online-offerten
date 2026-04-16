/** URL-fragment ids for in-page TOC anchors. */
export function generateHeadingSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[äÄ]/g, 'ae')
    .replace(/[öÖ]/g, 'oe')
    .replace(/[üÜ]/g, 'ue')
    .replace(/[ß]/g, 'ss')
    .replace(/<[^>]*>/g, '')
    .replace(/&[^;]+;/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export type TocItem = { id: string; title: string; level: number }

export function buildTableOfContentsFromPost(post: {
  content?: unknown
  faq?: unknown
  faq_title?: string | null
}): TocItem[] {
  if (!post?.content) return []

  const headings: TocItem[] = []
  const usedIds: Record<string, number> = {}

  const addHeading = (text: string, level: number) => {
    const plainText = text.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, '').trim()
    if (!plainText) return
    let slug = generateHeadingSlug(plainText)
    if (!slug) return
    if (usedIds[slug]) {
      usedIds[slug]++
      slug = `${slug}-${usedIds[slug]}`
    } else {
      usedIds[slug] = 1
    }
    headings.push({ id: slug, title: plainText, level })
  }

  const content = post.content

  if (typeof content === 'string') {
    const regex = /<h2[^>]*>([\s\S]*?)<\/h2>/gi
    let match
    while ((match = regex.exec(content)) !== null) {
      addHeading(match[1], 2)
    }
  } else if (typeof content === 'object' && content !== null && 'content' in content) {
    const doc = content as { content?: Array<{ type?: string; attrs?: { level?: number }; content?: Array<{ type?: string; text?: string }> }> }
    doc.content?.forEach((node) => {
      if (node.type === 'heading' && node.attrs?.level === 2) {
        let text = ''
        node.content?.forEach((child) => {
          if (child.type === 'text' && child.text) text += child.text
        })
        addHeading(text, 2)
      }
    })
  }

  const faq = post.faq
  if (
    Array.isArray(faq) &&
    faq.length > 0 &&
    faq.some(
      (item: { question?: string; answer?: string }) =>
        item.question?.trim() && item.answer?.trim()
    )
  ) {
    const faqTitle =
      post.faq_title && post.faq_title.trim()
        ? post.faq_title.trim()
        : 'Häufige Fragen (FAQ)'
    addHeading(faqTitle, 2)
  }

  return headings
}
