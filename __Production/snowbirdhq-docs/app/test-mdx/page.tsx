import { MDXComponents, MDXWrapper } from './components/MDXWrapper';

// Mock property data structure (similar to contentlayer's allProperties)
const mockProperties = [
    {
        slug: 'family-beach-house',
        title: 'Family Beach House',
        description: 'Your spacious lakefront family retreat with private beach access and stunning lake views.',
        capacity: 8,
        location: 'Kelvin Heights Peninsula',
        bedrooms: '4 bedrooms + sofa bed',
        beachAccess: 'Private lakefront with jetty',
        wifi: {
            network: 'BeachHouse_Family',
            password: 'Lakefront2024!'
        },
        emergency: {
            services: '111',
            manager: '+64 21 555 0178'
        }
    }
];

// Function to find property by slug (like properties page does)
function findPropertyBySlug(slug: string) {
    return mockProperties.find(property => property.slug === slug);
}

// Simple demo of MDX wrapper with property data
function PropertyContent({ property }: { property: typeof mockProperties[0] }) {
    const { h1, h2, p, ul, li, strong } = MDXComponents;

    return (
        <>
            {h1({ children: `Welcome to ${property.title}` })}
            {p({ children: property.description })}

            {h2({ children: "Quick Info" })}
            {ul({
                children: [
                    li({ key: "capacity", children: [strong({ children: "Capacity:" }), ` ${property.capacity} guests`] }),
                    li({ key: "location", children: [strong({ children: "Location:" }), ` ${property.location}`] }),
                    li({ key: "wifi", children: [strong({ children: "WiFi:" }), ` ${property.wifi.network}`] })
                ]
            })}

            {h2({ children: "Emergency Contacts" })}
            {ul({
                children: [
                    li({ key: "services", children: [strong({ children: "Emergency:" }), ` ${property.emergency.services}`] }),
                    li({ key: "manager", children: [strong({ children: "Manager:" }), ` ${property.emergency.manager}`] })
                ]
            })}
        </>
    );
}

export default function TestMDXPage() {
    // Simulate how properties page works - find property by slug
    const property = findPropertyBySlug('family-beach-house');

    if (!property) {
        return <div>Property not found</div>;
    }

    return (
        <article className="container mx-auto px-4 py-8 max-w-4xl">
            <MDXWrapper>
                <PropertyContent property={property} />
            </MDXWrapper>
        </article>
    );
}
