const form = document.querySelector('#searchForm');
const tbody = document.getElementById('tBody');

form.addEventListener('submit', async (e) => {
	e.preventDefault();
	tbody.innerText = '';
    const searchTerm = form.elements.query.value;
    const config = { params: {q:searchTerm}}
    const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
    getShowInfo(res.data);
});

const getShowInfo = async (shows) => {
    const searchTerm = form.elements.query.value;
    const config = { params: {q:searchTerm}}
    const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
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



