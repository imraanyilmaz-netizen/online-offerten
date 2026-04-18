import type { Metadata } from 'next'
import {
  generateCategoryTwoSegmentStaticParams,
} from '@/data/categories'
import { locations } from '@/data/locations'
import { buildCategoryCatchAllMetadata } from '@/lib/categoryCatchAllMetadata'
import CategoryCatchAllServerPage from '@/lib/categoryCatchAllServerPage'

type Props = { params: Promise<{ category: string; slug: string; sub: string }> }

export function generateStaticParams() {
  return generateCategoryTwoSegmentStaticParams(locations)
}

export const revalidate = 3600

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { category, slug, sub } = await props.params
  return buildCategoryCatchAllMetadata(category, [slug, sub])
}

export default async function CategoryTwoSegmentPage(props: Props) {
  const { category, slug, sub } = await props.params
  return <CategoryCatchAllServerPage category={category} segments={[slug, sub]} />
}
