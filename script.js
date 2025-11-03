class MovieSearch {
    constructor() {
        this.API_KEY = 'your_api_key_here';
        this.BASE_URL = 'https://www.omdbapi.com/';
        this.currentPage = 1;
        this.currentSearch = '';
        this.selectedType = '';
        this.selectedYear = '';
        this.totalResults = 0;
        
        this.initializeElements();
        this.attachEventListeners();
        this.generateYearsModal();
    }

    initializeElements() {
        this.searchInput = document.getElementById('searchInput');
        this.loading = document.getElementById('loading');
        this.errorMessage = document.getElementById('errorMessage');
        this.resultsContainer = document.getElementById('resultsContainer');
        this.resultsStats = document.getElementById('resultsStats');
        this.resultsGrid = document.getElementById('resultsGrid');
        this.loadMore = document.getElementById('loadMore');
        this.loadMoreBtn = document.getElementById('loadMoreBtn');
        this.noResults = document.getElementById('noResults');
        
        this.filtersBar = document.getElementById('filtersBar');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.moreYearsBtn = document.querySelector('.more-years');
    
        this.movieModal = document.getElementById('movieModal');
        this.closeModal = document.getElementById('closeModal');
        this.modalBody = document.getElementById('modalBody');
        this.yearsModal = document.getElementById('yearsModal');
        this.closeYearsModal = document.getElementById('closeYearsModal');
        this.yearsGrid = document.getElementById('yearsGrid');
    }

    attachEventListeners() {
        let searchTimeout;
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.handleSearch(e.target.value);
            }, 500);
        });

        this.loadMoreBtn.addEventListener('click', () => {
            this.loadMoreResults();
        });

        this.attachFilterListeners();
        
        this.moreYearsBtn.addEventListener('click', () => {
            this.showYearsModal();
        });

        this.closeYearsModal.addEventListener('click', () => {
            this.closeYearsModalFunc();
        });

        this.yearsModal.addEventListener('click', (e) => {
            if (e.target === this.yearsModal) {
                this.closeYearsModalFunc();
            }
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
                this.closeYearsModalFunc();
            }
        });
    }

    attachFilterListeners() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                if (btn.classList.contains('more-years')) return;
                
                const filterGroup = btn.closest('.filter-options');
                const activeBtn = filterGroup.querySelector('.filter-btn.active');
                
                if (activeBtn) {
                    activeBtn.classList.remove('active');
                }
                btn.classList.add('active');
                
                if (btn.dataset.type !== undefined) {
                    this.selectedType = btn.dataset.type;
                }
                
                if (btn.dataset.year !== undefined) {
                    this.selectedYear = btn.dataset.year;
                }

                if (this.currentSearch.length >= 3) {
                    this.resetSearch();
                }
            });
        });
    }

    generateYearsModal() {
        const currentYear = new Date().getFullYear();
        for (let year = currentYear; year >= 1900; year--) {
            const yearOption = document.createElement('div');
            yearOption.className = 'year-option';
            yearOption.textContent = year;
            yearOption.dataset.year = year;
            
            yearOption.addEventListener('click', () => {
                const yearBtns = document.querySelectorAll('[data-year]');
                yearBtns.forEach(btn => {
                    if (btn.classList.contains('more-years')) return;
                    btn.classList.remove('active');
                });
                
                yearOption.classList.add('active');
                
                const mainYearBtn = document.querySelector(`[data-year="${year}"]`);
                if (mainYearBtn) {
                    mainYearBtn.classList.add('active');
                }
                
                this.selectedYear = year;
                this.closeYearsModalFunc();
            
                if (this.currentSearch.length >= 3) {
                    this.resetSearch();
                }
            });
            
            this.yearsGrid.appendChild(yearOption);
        }
    }

    showYearsModal() {
        this.yearsModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeYearsModalFunc() {
        this.yearsModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    async handleSearch(query) {
        if (query.length < 3) {
            this.hideAllContainers();
            this.filtersBar.style.display = 'none';
            return;
        }

        this.currentSearch = query;
        this.currentPage = 1;
        
        this.filtersBar.style.display = 'block';
        
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
                    this.filtersBar.style.display = 'none';
                }
                return;
            }

            this.totalResults = parseInt(data.totalResults);
            this.displayResults(data.Search || []);
            
        } catch (error) {
            this.showError(`Помилка пошуку: ${error.message}`);
            console.error('Search error:', error);
            this.filtersBar.style.display = 'none';
        } finally {
            this.hideLoading();
        }
    }

    buildSearchURL() {
        const params = new URLSearchParams({
            apikey: this.API_KEY,
            s: this.currentSearch,
            page: this.currentPage
        });

        if (this.selectedType) {
            params.append('type', this.selectedType);
        }
        
        if (this.selectedYear) {
            params.append('y', this.selectedYear);
        }

        return `${this.BASE_URL}?${params.toString()}`;
    }

    displayResults(movies) {
        if (this.currentPage === 1) {
            this.resultsGrid.innerHTML = '';
        }

        if (movies.length === 0 && this.currentPage === 1) {
            this.showNoResults();
            this.filtersBar.style.display = 'none';
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
            <div class="movie-content">
                ${movie.Poster !== 'N/A' ? 
                    `<img src="${movie.Poster}" alt="${movie.Title}" class="movie-poster" onerror="this.src='placeholder-image.jpg'">` 
                    : '<div class="no-poster">No Image</div>'
                }
                <div class="movie-details-expanded">
                    <h3 class="movie-title-expanded">${this.createUkrainianTitle(movie)}</h3>
                    <div class="movie-meta">
                        <span class="movie-year">${movie.Year}</span>
                        <span class="movie-type">${this.translateType(movie.Type)}</span>
                        <span class="movie-id">ID: ${movie.imdbID}</span>
                    </div>
                    <p class="movie-description">${this.generateDescription(movie)}</p>
                    <div class="movie-actions">
                        <button class="watch-btn" onclick="event.stopPropagation(); movieSearch.watchMovie('${movie.imdbID}')">
                            Дивитися онлайн
                        </button>
                        <button class="details-btn" onclick="event.stopPropagation(); movieSearch.showMovieDetails('${movie.imdbID}')">
                            Деталі
                        </button>
                    </div>
                </div>
            </div>
        `;

        card.addEventListener('click', () => {
            this.showMovieDetails(movie.imdbID);
        });

        return card;
    }

    createUkrainianTitle(movie) {
        const type = this.translateType(movie.Type);
        if (movie.Type === 'series') {
            return `Серіал ${movie.Title}`;
        } else {
            return `${movie.Title} / ${type.toLowerCase()}`;
        }
    }

    translateType(type) {
        const types = {
            'movie': 'фільм',
            'series': 'серіал',
            'episode': 'епізод'
        };
        return types[type] || type;
    }

    generateDescription(movie) {
        const type = this.translateType(movie.Type);
        return `Дивіться ${type} "${movie.Title}" ${movie.Year} року у високій якості. Українською мовою з субтитрами.`;
    }

    watchMovie(imdbID) {
        alert(`Перегляд фільму з ID: ${imdbID}\n(Це демонстраційна функція)`);
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
                        ${movie.imdbRating !== 'N/A' ? `<span class="movie-detail-rating">⭐ ${movie.imdbRating}</span>` : ''}
                        ${movie.Runtime !== 'N/A' ? `<span>${movie.Runtime}</span>` : ''}
                    </div>
                    <p class="movie-detail-plot">${movie.Plot}</p>
                    <ul class="movie-detail-list">
                        ${movie.Director !== 'N/A' ? `<li><strong>Режисер:</strong> ${movie.Director}</li>` : ''}
                        ${movie.Actors !== 'N/A' ? `<li><strong>Актори:</strong> ${movie.Actors}</li>` : ''}
                        ${movie.Genre !== 'N/A' ? `<li><strong>Жанр:</strong> ${movie.Genre}</li>` : ''}
                        ${movie.Country !== 'N/A' ? `<li><strong>Країна:</strong> ${movie.Country}</li>` : ''}
                        ${movie.Language !== 'N/A' ? `<li><strong>Мова:</strong> ${movie.Language}</li>` : ''}
                        ${movie.Awards !== 'N/A' ? `<li><strong>Нагороди:</strong> ${movie.Awards}</li>` : ''}
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
        let statsText = `Знайдено результатів: ${displayed} з ${this.totalResults}`;
        
        if (this.selectedType) {
            const typeName = this.translateType(this.selectedType);
            statsText += ` • Тип: ${typeName}`;
        }
        
        if (this.selectedYear) {
            statsText += ` • Рік: ${this.selectedYear}`;
        }
        
        this.resultsStats.innerHTML = statsText;
        this.resultsStats.style.display = 'block';
    }

    // Методи для управління відображенням станів
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

let movieSearch;
document.addEventListener('DOMContentLoaded', () => {
    movieSearch = new MovieSearch();
});

window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'placeholder-image.jpg';
    }
}, true);