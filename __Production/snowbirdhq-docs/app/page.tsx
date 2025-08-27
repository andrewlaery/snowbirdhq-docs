  import Link from 'next/link'

  export default function HomePage() {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Welcome to Snowbird HQ
        </h1>
        <p className="text-xl mb-8 text-gray-600">
          Your comprehensive property guide system
        </p>
        <Link
          href="/properties"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Browse Properties
        </Link>
      </div>
    )
  }
