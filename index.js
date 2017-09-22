const youtubeSearch_URL = "https://www.googleapis.com/youtube/v3/search";

function getDataFromApi(searchTerm, callback) {
	const query = {
		part:'snippet',
		key: AIzaSyC9xc2W_AWe_0k54KE6PYIR4JDQMH5QY1s,
		q: `${searchTerm}`,
		per_page: 5
	}
	$.getJSON(youtubeSearch_URL, query, callback);
}

// function displayResults//
function renderResults(result) {
	return `
	<div>
	   <h2>
	     <a class="js-result-name" href="${result.html_url}" target="_blank">${result.name}</a>
	   </h2>
	</div>
  `;
}

//function to display search data returned
function displayYouTubeSearchData(data) {
	const results = data.items.map((item, index)=> renderResult(item));
	$('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event=> {
  	event.preventDefault();
  	const queryTarget = $(event.currentTarget).find('.js-query');
  	const query = queryTarget.val();
  	//this clears the input
  	queryTarget.val("");
  	getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);