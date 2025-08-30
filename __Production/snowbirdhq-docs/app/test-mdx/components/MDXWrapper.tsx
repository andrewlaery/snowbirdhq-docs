import React, { ReactNode } from 'react';

interface MDXComponentProps {
    children?: ReactNode;
    key?: string | number;
    [key: string]: any;
}

// MDX-style components with consistent styling
const MDXComponents = {
    h1: ({ children }: MDXComponentProps) => (
        <h1 className="mt-5 text-3xl md:text-5xl font-extrabold text-center text-gray-800 leading-tight mb-4">
            {children}
        </h1>
    ),
    h2: ({ children }: MDXComponentProps) => (
        <h2 className="mt-8 text-2xl md:text-4xl font-bold text-gray-800 leading-tight mb-4">
            {children}
        </h2>
    ),
    h3: ({ children }: MDXComponentProps) => (
        <h3 className="mt-6 text-xl font-light text-gray-800 leading-normal mb-3">
            {children}
        </h3>
    ),
    h4: ({ children }: MDXComponentProps) => (
        <h4 className="mt-5 text-lg font-medium text-gray-800 leading-normal mb-2">
            {children}
        </h4>
    ),
    h5: ({ children }: MDXComponentProps) => (
        <h5 className="mt-4 text-base font-medium text-gray-800 leading-normal mb-2">
            {children}
        </h5>
    ),
    h6: ({ children }: MDXComponentProps) => (
        <h6 className="mt-3 text-sm font-medium text-gray-800 leading-normal mb-2">
            {children}
        </h6>
    ),
    p: ({ children }: MDXComponentProps) => (
        <p className="prose mt-6 text-base md:text-lg text-gray-600 leading-7 md:leading-8 mb-4">
            {children}
        </p>
    ),
    ul: ({ children, ...props }: MDXComponentProps) => (
        <ul className="prose-xl list-disc list-inside mt-4 leading-7 md:leading-8 mb-4 space-y-2" {...props}>
            {children}
        </ul>
    ),
    ol: ({ children, ...props }: MDXComponentProps) => (
        <ol className="prose-xl list-decimal list-inside mt-4 leading-7 md:leading-8 mb-4 space-y-2" {...props}>
            {children}
        </ol>
    ),
    li: ({ children, ...props }: MDXComponentProps) => (
        <li className="text-base text-gray-700 leading-7 md:leading-8" {...props}>
            {children}
        </li>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
        <blockquote className="border-l-4 border-gray-200 pl-4 py-2 italic text-gray-600">
            {children}
        </blockquote>
    ),
    br: () => (
        <div className="relative my-8">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
                <span className="bg-white px-2 text-sm text-gray-500">Continue</span>
            </div>
        </div>
    ),
    a: ({ children, ...props }: { children: React.ReactNode;[key: string]: any }) => (
        <a className="text-blue-600 hover:underline" {...props}>
            {children}
        </a>
    ),
    pre: ({ children }: { children: React.ReactNode }) => (
        <pre className="bg-gray-100 p-4 rounded-lg font-mono text-sm leading-normal overflow-x-auto">
            {children}
        </pre>
    ),
    code: ({ children }: { children: React.ReactNode }) => (
        <code className="font-mono text-sm bg-gray-100 p-1 rounded-md">
            {children}
        </code>
    ),
    strong: ({ children, ...props }: MDXComponentProps) => (
        <strong className="font-bold text-gray-800" {...props}>
            {children}
        </strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
        <em className="italic text-gray-700">
            {children}
        </em>
    ),
};

// Wrapper component that provides MDX-style styling
export function MDXWrapper({ children }: { children: ReactNode }) {
    return <div className="mdx-content">{children}</div>;
}

// Export components for use in other files
export { MDXComponents };
