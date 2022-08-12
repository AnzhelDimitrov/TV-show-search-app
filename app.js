const form = document.querySelector('#searchForm');
const gridContainer = document.querySelector('#gridContainer');
const searchResultMessage = document.querySelector('#searchResultMessage');

form.addEventListener('submit', async (e) => {
	e.preventDefault();
	gridContainer.innerText = '';
	searchResultMessage.innerText = '';
	const searchTerm = form.elements.query.value;
	const config = { params: {q:searchTerm}}
	const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
	getShowInfo(res.data);
	form.elements.query.value = '';
	
	if (res.data.length >= 1) {
		p = `Results for: '${searchTerm}'`;
		searchResultMessage.append(p);
	}else if(!searchTerm){
		p = 'Invalid input';
		searchResultMessage.append(p);
	}else{
		p = `No results found for: '${searchTerm}'`;
		searchResultMessage.append(p);
	}
});

const getShowInfo = async (shows) => {
	const searchTerm = form.elements.query.value;
	const config = { params: {q:searchTerm}}
	const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
	
	for (let i = 0; i < shows.length; i++) {
		const cardMain = document.createElement('div');
		cardMain.setAttribute('class', 'card h-100');
		const cardBody = document.createElement('div');
		cardBody.setAttribute('class', 'card-body')
		const titleName = document.createElement('h5');
		titleName.setAttribute('class', 'card-title text-center');
		const summary = document.createElement('p');
		summary.setAttribute('class', 'card-text');
		const image = document.createElement('img');
		image.setAttribute('class', 'card-img-top');
		const cardGridRow = document.createElement('div');
		cardGridRow.setAttribute('class', 'row row-cols-1 row-cols-md-3 g-10');
		const cardGridCol = document.createElement('div');
		cardGridCol.setAttribute('class', 'col');
		
		try {
			image.src = await res.data[i].show.image.medium;
		} catch {
			image.src = 'image.png';
		}
	
		titleName.innerText = await res.data[i].show.name;
		cardBody.append(titleName);

		summary.classList.add('summary');
		summary.innerHTML = await res.data[i].show.summary;
		cardBody.append(summary);
		cardMain.append(image);
		cardMain.append(cardBody);
		cardGridCol.append(cardMain);
		gridContainer.append(cardGridCol);
	}
}



