module.exports = function(eleventyConfig)
{
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/fonts");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy("src/downloads");

      return {
          dir: 
          {
              input: "src",
              output: "build",
              includes: "fragments"
          }
    };
};