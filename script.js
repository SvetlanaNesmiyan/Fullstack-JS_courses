class MovieSearch {
    constructor() {
        this.API_KEY = 'http://www.omdbapi.com/?t=Young+Royals'; 
        this.API_KEY = 'http://www.omdbapi.com/?t=Terrifier'; 
        this.BASE_URL = 'https://www.omdbapi.com/';
        this.currentPage = 1;
        this.currentSearch = '';
        this.currentType = '';
        this.currentYear = '';
        this.totalResults = 0;
        
        this.initializeElements();
        this.attachEventListeners();
        this.generateYearOptions();
    }

    initializeElements() {
        this.searchInput = document.getElementById('searchInput');
        this.typeFilter = document.getElementById('typeFilter');
        this.yearFilter = document.getElementById('yearFilter');
        this.loading = document.getElementById('loading');
        this.errorMessage = document.getElementById('errorMessage');
        this.resultsContainer = document.getElementById('resultsContainer');
        this.resultsStats = document.getElementById('resultsStats');
        this.resultsGrid = document.getElementById('resultsGrid');
        this.loadMore = document.getElementById('loadMore');
        this.loadMoreBtn = document.getElementById('loadMoreBtn');
        this.noResults = document.getElementById('noResults');
        this.movieModal = document.getElementById('movieModal');
        this.closeModal = document.getElementById('closeModal');
        this.modalBody = document.getElementById('modalBody');
    }

    attachEventListeners() {
        let searchTimeout;
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.handleSearch(e.target.value);
            }, 500);
        });

        this.typeFilter.addEventListener('change', () => {
            this.currentType = this.typeFilter.value;
            this.resetSearch();
        });

        this.yearFilter.addEventListener('change', () => {
            this.currentYear = this.yearFilter.value;
            this.resetSearch();
        });

        this.loadMoreBtn.addEventListener('click', () => {
            this.loadMoreResults();
        });

        this.closeModal.addEventListener('click', () => {
            this.closeMovieModal();
        });

        this.movieModal.addEventListener('click', (e) => {
            if (e.target === this.movieModal) {
                this.closeMovieModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMovieModal();
            }
        });
    }

    generateYearOptions() {
        const currentYear = new Date().getFullYear();
        for (let year = currentYear; year >= 1900; year--) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            this.yearFilter.appendChild(option);
        }
    }

    async handleSearch(query) {
        if (query.length < 3) {
            this.hideAllContainers();
            return;
        }

        this.currentSearch = query;
        this.currentPage = 1;
        await this.performSearch();
    }

    resetSearch() {
        this.currentPage = 1;
        this.resultsGrid.innerHTML = '';
        if (this.currentSearch.length >= 3) {
            this.performSearch();
        }
    }

    async performSearch() {
        this.showLoading();
        this.hideError();
        this.hideNoResults();

        try {
            const url = this.buildSearchURL();
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.Response === 'False') {
                if (this.currentPage === 1) {
                    this.showNoResults();
                }
                return;
            }

            this.totalResults = parseInt(data.totalResults);
            this.displayResults(data.Search || []);
            
        } catch (error) {
            this.showError(`Помилка пошуку: ${error.message}`);
            console.error('Search error:', error);
        } finally {
            this.hideLoading();
        }
    }

    buildSearchURL() {
        const params = new URLSearchParams({
            apikey: this.API_KEY,
            s: this.currentSearch,
            page: this.currentPage,
            type: this.currentType,
            y: this.currentYear
        });

        return `${this.BASE_URL}?${params.toString()}`;
    }

    displayResults(movies) {
        if (this.currentPage === 1) {
            this.resultsGrid.innerHTML = '';
        }

        if (movies.length === 0 && this.currentPage === 1) {
            this.showNoResults();
            return;
        }

        movies.forEach(movie => {
            const movieCard = this.createMovieCard(movie);
            this.resultsGrid.appendChild(movieCard);
        });

        this.showResults();
        this.updateResultsStats();

        if (this.resultsGrid.children.length < this.totalResults) {
            this.loadMore.style.display = 'block';
        } else {
            this.loadMore.style.display = 'none';
        }
    }

    createMovieCard(movie) {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <img 
                src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder-image.jpg'}" 
                alt="${movie.Title}"
                class="movie-poster"
                onerror="this.src='placeholder-image.jpg'"
            >
            <div class="movie-info">
                <h3 class="movie-title">${movie.Title}</h3>
                <span class="movie-year">${movie.Year}</span>
                <p class="movie-details">Тип: ${this.translateType(movie.Type)}</p>
                <p class="movie-details">ID: ${movie.imdbID}</p>
            </div>
        `;

        card.addEventListener('click', () => {
            this.showMovieDetails(movie.imdbID);
        });

        return card;
    }

    translateType(type) {
        const types = {
            'movie': 'Фільм',
            'series': 'Серіал',
            'episode': 'Епізод'
        };
        return types[type] || type;
    }

    async showMovieDetails(imdbID) {
        this.showLoading();
        
        try {
            const url = `${this.BASE_URL}?apikey=${this.API_KEY}&i=${imdbID}&plot=full`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const movie = await response.json();
            
            if (movie.Response === 'False') {
                throw new Error(movie.Error);
            }

            this.displayMovieModal(movie);
            
        } catch (error) {
            this.showError(`Помилка завантаження деталей: ${error.message}`);
        } finally {
            this.hideLoading();
        }
    }

    displayMovieModal(movie) {
        this.modalBody.innerHTML = `
            <div class="movie-detail">
                <div class="movie-detail-poster">
                    <img 
                        src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder-image.jpg'}" 
                        alt="${movie.Title}"
                        onerror="this.src='placeholder-image.jpg'"
                    >
                </div>
                <div class="movie-detail-info">
                    <h2 class="movie-detail-title">${movie.Title}</h2>
                    <div class="movie-detail-meta">
                        <span class="movie-year">${movie.Year}</span>
                        <span class="movie-detail-rating">⭐ ${movie.imdbRating}</span>
                        <span>${movie.Runtime}</span>
                    </div>
                    <p class="movie-detail-plot">${movie.Plot}</p>
                    <ul class="movie-detail-list">
                        <li><strong>Режисер:</strong> ${movie.Director}</li>
                        <li><strong>Актори:</strong> ${movie.Actors}</li>
                        <li><strong>Жанр:</strong> ${movie.Genre}</li>
                        <li><strong>Країна:</strong> ${movie.Country}</li>
                        <li><strong>Мова:</strong> ${movie.Language}</li>
                        <li><strong>Нагороди:</strong> ${movie.Awards}</li>
                    </ul>
                </div>
            </div>
        `;

        this.movieModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeMovieModal() {
        this.movieModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    async loadMoreResults() {
        this.currentPage++;
        await this.performSearch();
    }

    updateResultsStats() {
        const displayed = this.resultsGrid.children.length;
        this.resultsStats.innerHTML = `
            Знайдено результатів: ${displayed} з ${this.totalResults}
        `;
        this.resultsStats.style.display = 'block';
    }

    showLoading() {
        this.loading.style.display = 'block';
        this.hideAllContainers();
    }

    hideLoading() {
        this.loading.style.display = 'none';
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.style.display = 'block';
        this.hideAllContainers();
    }

    hideError() {
        this.errorMessage.style.display = 'none';
    }

    showResults() {
        this.resultsContainer.style.display = 'block';
        this.noResults.style.display = 'none';
    }

    showNoResults() {
        this.noResults.style.display = 'block';
        this.resultsContainer.style.display = 'none';
    }

    hideNoResults() {
        this.noResults.style.display = 'none';
    }

    hideAllContainers() {
        this.resultsContainer.style.display = 'none';
        this.noResults.style.display = 'none';
        this.errorMessage.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MovieSearch();
});

window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'placeholder-image.jpg';
    }
}, true);