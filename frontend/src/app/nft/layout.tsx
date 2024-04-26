import type { Metadata } from "next";

export const metadata: Metadata = {
    title: '',
    description: '',
};

const NFTListingLayout = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <html lang="en">
            <body>
                { children }
            </body>
        </html>
    )
}

export default NFTListingLayout;