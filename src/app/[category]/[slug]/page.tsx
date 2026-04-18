import type { Metadata } from 'next'
import {
  generateCategoryOneSegmentStaticParams,
} from '@/data/categories'
import { locations } from '@/data/locations'
import { buildCategoryCatchAllMetadata } from '@/lib/categoryCatchAllMetadata'
import CategoryCatchAllServerPage from '@/lib/categoryCatchAllServerPage'

type Props = { params: Promise<{ category: string; slug: string }> }

export function generateStaticParams() {
  return generateCategoryOneSegmentStaticParams(locations)
}

export const revalidate = 3600

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { category, slug } = await props.params
  return buildCategoryCatchAllMetadata(category, [slug])
}

export default async function CategoryOneSegmentPage(props: Props) {
  const { category, slug } = await props.params
  return <CategoryCatchAllServerPage category={category} segments={[slug]} />
}
