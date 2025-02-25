import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function generateStars(n) {
	let value = `${Math.random() * 2000}px ${Math.random() * 2000}px #FFF`;
	for (let i = 1; i < n; i++) {
		value += `, ${Math.random() * 2000}px ${Math.random() * 2000}px #FFF`;
	}
	return value;
}
