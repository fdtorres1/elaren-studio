export interface Plan {
	key: string;
	name: string;
	price: number;
	billing: "one-time" | "monthly";
	description: string;
	badge?: string;
}

export const PLANS: Record<string, Plan> = {
	launch: {
		key: "launch",
		name: "Website Launch",
		price: 500,
		billing: "one-time",
		description: "Custom setup + design to get your site live quickly.",
	},
	starter: {
		key: "starter",
		name: "WaaS Starter",
		price: 99,
		billing: "monthly",
		description: "Hosting + maintenance essentials. 1 small edit/month.",
	},
	carePlus: {
		key: "carePlus",
		name: "WaaS Care+",
		price: 199,
		billing: "monthly",
		badge: "Most Popular",
		description: "Unlimited edits, monthly optimization, priority support.",
	},
};

export const PLAN_LIST = [PLANS.launch, PLANS.starter, PLANS.carePlus];

export function formatPrice(plan: Plan): string {
	return `$${plan.price}`;
}

export function formatBilling(plan: Plan): string {
	return plan.billing === "one-time" ? "one-time" : "/month";
}

export function buildOfferCatalog() {
	return {
		"@type": "OfferCatalog",
		name: "Therapist Website Plans",
		itemListElement: PLAN_LIST.map((plan) => ({
			"@type": "Offer",
			name: plan.name,
			price: String(plan.price),
			priceCurrency: "USD",
			...(plan.billing === "monthly" && {
				priceSpecification: {
					"@type": "UnitPriceSpecification",
					billingDuration: "P1M",
				},
			}),
			description: plan.description,
		})),
	};
}
