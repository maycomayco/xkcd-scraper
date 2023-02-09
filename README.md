# xkcd Scraper

A web scraper for xkcd.com, a comic website. This scraper extracts each comic in JSON format, including its ID, image URL, link, title, and alt text. It also aggregates the data from all scraped comics into a single JSON file for indexing in Algolia, which is used as a frontend service.

## Usage

The scraper will create a JSON file for each comic and an aggregated JSON file containing the data from all scraped comics. These files can be used for indexing in Algolia.

## TODO List

- [ ] Automate loading of the aggregated JSON file into Algolia

## Credits

- xkcd.com for the comic data

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
