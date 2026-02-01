/**
 * Конфігурація Eleventy для Української класичної гімназії
 * 
 * Цей файл налаштовує:
 * - Вхідну та вихідну директорії
 * - Passthrough copy для статичних файлів
 * - Шаблонізатор Nunjucks
 */

module.exports = function (eleventyConfig) {

    // Копіювання папки admin без обробки (для Decap CMS)
    eleventyConfig.addPassthroughCopy("src/admin");

    // Копіювання всіх assets (CSS, JS, зображення)
    eleventyConfig.addPassthroughCopy("src/assets");

    // Копіювання папки із завантаженнями CMS
    eleventyConfig.addPassthroughCopy("src/img");

    // Фільтр для безпечного виводу HTML (urlencode)
    eleventyConfig.addFilter("urlencode", function (str) {
        return encodeURIComponent(str || "");
    });

    // Налаштування watch targets
    eleventyConfig.addWatchTarget("src/assets/css/");
    eleventyConfig.addWatchTarget("src/assets/js/");

    // Налаштування директорій проекту
    return {
        // Вхідна директорія з вихідним кодом
        dir: {
            input: "src",
            // Директорія з шаблонами та layouts
            includes: "_includes",
            // Директорія з глобальними даними
            data: "_data",
            // Вихідна директорія для згенерованого сайту
            output: "_site"
        },
        // Використовуємо Nunjucks як основний шаблонізатор
        templateFormats: ["njk", "md", "html"],
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk"
    };
};
