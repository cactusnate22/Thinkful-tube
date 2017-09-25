const youtubeSearch_URL = "https://www.googleapis.com/youtube/v3/search";

function getDataFromApi(searchTerm, callback) {
	let query = {
		part:'snippet',
		key: "AIzaSyC9xc2W_AWe_0k54KE6PYIR4JDQMH5QY1s",
		type: 'video',
		q: `${searchTerm}`,
		per_page: 5
	}
	$.getJSON(youtubeSearch_URL, query, callback);
	//need to create variables for searchTerm and callback?
}


// function renderResult(result) {
// 	var url = 'https://youtube.com/watch?v=' + result.id.videoId
// 	return `
// 	<div>
// 	   <h2>
// 	     <a class="js-result-name" href="${url}" target="_blank">
// 	     	<img class="js-result-name" src="${result.snippet.thumbnails.medium.url}">
// 	     	<br>
// 	     	${result.snippet.title}
// 	     </a>
// 	   </h2>
// 	</div>
//   `;
// }


function renderVideo(videoInfo) {
	var url = 'https://youtube.com/watch?v=' + videoInfo.id.videoId;
	var title = videoInfo.snippet.title;
	var thumbnail = videoInfo.snippet.thumbnails.medium.url;

	return `
		<div>
		<a href="${url}"><img src="${thumbnail}">
		</a>
		<h3>${title}
		</h3>
		</div>
	`;
}

//function to display search data returned
function displayYouTubeSearchData(data) {
	const results = data.items.map((item, index)=> renderVideo(item));
	$('.js-search-results').html(results);
	//console.log(displayYouTubeSearchData(data));

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