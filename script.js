const accessKey = 'y62FpLISAI1EKgMaLuhsDZWPPRDqHwEcHyfnR4Wx0Lk';
const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const loadMoreContainer = document.getElementById('loadMoreContainer');
let page = 1;
let currentQuery = '';

function fetchImages(query = '', page = 1) {
    fetch(`https://api.unsplash.com/photos/?client_id=${accessKey}&query=${query}&page=${page}&per_page=10`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayImages(data);
        })
        .catch(error => {
            console.error('Error fetching images:', error);
        });
}

function displayImages(images) {
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.urls.small;
        imgElement.alt = image.alt_description;
        imgElement.addEventListener('click', () => {
            showModal(image.description || 'No description available');
        });
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
        imageContainer.appendChild(imgElement);
        gallery.appendChild(imageContainer);
    });

    if (images.length < 10) {
        loadMoreContainer.style.display = 'none';
    } else {
        loadMoreContainer.style.display = 'block';
    }
}

function showModal(description) {
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <p>${description}</p>
        </div>
    `;
    modal.style.display = 'block';
    const closeButton = document.querySelector('.close');
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

document.getElementById('searchButton').addEventListener('click', () => {
    page = 1;
    currentQuery = document.getElementById('searchInput').value.trim();
    gallery.innerHTML = ''; // Clear existing images
    fetchImages(currentQuery);
});

document.getElementById('loadMoreButton').addEventListener('click', () => {
    page++;
    fetchImages(currentQuery, page);
});

fetchImages(); // Fetch images on page load
