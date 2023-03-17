const url =
  'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=searchValue';

const form = document.querySelector('.form');
const formInput = document.querySelector('.form-input');
const results = document.querySelector('.results');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = formInput.value;
  if (!value) {
    results.innerHTML = `<div class="error">Incorrect Search Term</div>`;
    return;
  }
  fetchPages(value);
});

const fetchPages = async (searchValue) => {
  results.innerHTML = `<div class="loading"></div>`;
  try {
    const response = await fetch(`${url} ${searchValue}`);
    const data = await response.json();
    const result = data.query.search;
    if (result.length < 1) {
      results.innerHTML = `<div class="error">No results</div>`;
      return;
    }
    renderResults(result);
  } catch (error) {
    results.innerHTML = `<div class="error">Error</div>`;
  }
};

const renderResults = (list) => {
  const cards = list
    .map((item) => {
      const { title, snippet, pageid } = item;
      return `<a href="http://en.wikipedia.org/?curid=${pageid}" target="_blank">
            <h4>${title}</h4>
            <p${snippet}</p>
          </a>`;
    })
    .join('');
  results.innerHTML = `<div class="articles">
${cards}
        </div>`;
};
