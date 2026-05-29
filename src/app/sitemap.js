const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://followproperty.org";

export default function sitemap() {
    const routes = [
        { url: "", priority: 1.0, changeFrequency: "daily" },

        { url: "/services", priority: 0.9, changeFrequency: "weekly" },
        { url: "/current-projects", priority: 0.9, changeFrequency: "weekly" },

        { url: "/products", priority: 0.8, changeFrequency: "weekly" },
        { url: "/business", priority: 0.8, changeFrequency: "weekly" },
        { url: "/contact", priority: 0.8, changeFrequency: "monthly" },

        { url: "/faq", priority: 0.7, changeFrequency: "weekly" },
        { url: "/press-releases", priority: 0.7, changeFrequency: "weekly" },
        { url: "/careers", priority: 0.7, changeFrequency: "weekly" },
        { url: "/team", priority: 0.6, changeFrequency: "monthly" },
        { url: "/locate-us", priority: 0.6, changeFrequency: "monthly" },

        { url: "/privacy", priority: 0.3, changeFrequency: "monthly" },
        { url: "/terms", priority: 0.3, changeFrequency: "monthly" },
        { url: "/security", priority: 0.3, changeFrequency: "monthly" },
    ];

    return routes.map((route) => ({
        url: `${siteUrl}${route.url}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
    }));
}