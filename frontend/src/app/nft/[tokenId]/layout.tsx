import type { Metadata } from "next";

export const metadata: Metadata = {
    title: '',
    description: '',
};

const NFTDetailLayout = ({ children }: Readonly<{
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

export default NFTDetailLayout;