  import Link from 'next/link'
  import { allProperties } from 'contentlayer/generated'

  export default function PropertiesPage() {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Snowbird HQ Properties</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allProperties.map((property) => (
            <Link
              key={property.slug}
              href={`/properties/${property.slug}`}
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border"
            >
              <h2 className="text-2xl font-semibold mb-2">{property.title}</h2>
              <p className="text-gray-600 mb-2">📍 {property.location}</p>
              <p className="text-sm text-gray-500">
                👥 Sleeps {property.capacity} • 📋 Guest Guide Available
              </p>
            </Link>
          ))}
        </div>
      </div>
    )
  }
