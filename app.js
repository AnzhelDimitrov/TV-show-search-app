const form = document.querySelector('#searchForm');
const tbody = document.querySelector('#tBody');
const searchResultMessage = document.querySelector('#searchResultMessage');

form.addEventListener('submit', async (e) => {
	e.preventDefault();
	tBody.innerText = '';
	searchResultMessage.innerText = '';
	const searchTerm = form.elements.query.value;
	const config = { params: {q:searchTerm}}
	const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
	getShowInfo(res.data);
	form.elements.query.value = '';
	
	if (res.data.length >= 1) {
		p = `Results for: ${searchTerm}`;
		searchResultMessage.append(p);
	}else{
		p = `No results found for: ${searchTerm}`;
		searchResultMessage.append(p);
	}
});

const getShowInfo = async (shows) => {
	const searchTerm = form.elements.query.value;
	const config = { params: {q:searchTerm}}
	const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
	
	for (let i = 0; i < shows.length; i++) {
		const tr = document.createElement('tr');
		const titleName = document.createElement('td');
		const summary = document.createElement('td');
		const image = document.createElement('img');
		
		image.classList.add('image-box');
		try {
			image.src = await res.data[i].show.image.medium;
		} catch {
			image.src = 'image.png';
		}
		
		tr.append(image);
		tr.append(titleName);
		titleName.innerText = await res.data[i].show.name;
		tr.append(summary);
		summary.innerHTML = await res.data[i].show.summary;
		summary.classList.add('summary');
		
		tbody.append(tr);
	}
}



