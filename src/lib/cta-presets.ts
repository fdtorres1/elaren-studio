export const CTA_PRESETS = {
	audit: {
		text: "Get a Free 10-Minute Website Audit",
		href: "/therapist-websites#audit",
	},
	call: {
		text: "Book a 15-Minute Call",
		href: "/contact",
	},
	contact: {
		text: "Start a Project",
		href: "/contact",
	},
} as const;

export type CtaPresetKey = keyof typeof CTA_PRESETS;

export const CTA_PRESET_KEYS = Object.keys(CTA_PRESETS) as CtaPresetKey[];

/**
 * Resolve CTA text and href from a preset key + optional overrides.
 * Overrides take precedence over the preset defaults.
 */
export function resolveCta(
	preset: CtaPresetKey = "audit",
	textOverride?: string,
	hrefOverride?: string,
): { text: string; href: string } {
	const base = CTA_PRESETS[preset];
	return {
		text: textOverride ?? base.text,
		href: hrefOverride ?? base.href,
	};
}
