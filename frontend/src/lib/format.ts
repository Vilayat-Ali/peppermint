export class Format {
    public static formatNumber(amount: number): string {
        const formatter: Intl.NumberFormat = Intl.NumberFormat('en-us', {
            notation: 'compact'
        });
        return formatter.format(amount);
    }

    public static formatWallet(walletAddress: string, charCount: number = 4): string {
        return `${walletAddress.slice(0,charCount)}...${walletAddress.slice(walletAddress.length - charCount, walletAddress.length)}`;
    }
}