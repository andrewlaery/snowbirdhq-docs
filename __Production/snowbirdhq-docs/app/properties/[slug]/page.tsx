  import { notFound } from 'next/navigation'
  import { allProperties } from 'contentlayer/generated'
  import { getMDXComponent } from 'next-contentlayer/hooks'

  export async function generateStaticParams() {
    return allProperties.map((property) => ({
      slug: property.slug,
    }))
  }

  export default async function PropertyPage({
    params
  }: {
    params: Promise<{ slug: string }>
  }) {
    const resolvedParams = await params
    const property = allProperties.find(
      (property) => property.slug === resolvedParams.slug
    )

    if (!property) {
      notFound()
    }

    const MDXContent = getMDXComponent(property.body.code)

    return (
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <MDXContent />
        </div>
      </article>
    )
  }
