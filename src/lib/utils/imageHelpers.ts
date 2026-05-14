export function toWebP(src: string): string {
	return src.replace(/\.(png|jpe?g)$/i, '.webp');
}
