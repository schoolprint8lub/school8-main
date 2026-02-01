document.addEventListener('DOMContentLoaded', () => {
    const booksContainer = document.getElementById('books-container');

    if (booksContainer) {
        const dataSource = booksContainer.getAttribute('data-source');
        if (dataSource) {
            loadBooks(dataSource, booksContainer);
        }
    }
});

async function loadBooks(url, container) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const books = await response.json();
        renderBooks(books, container);
    } catch (error) {
        console.error('Error loading books:', error);
        container.innerHTML = '<p class="error-message">Не вдалося завантажити список підручників.</p>';
    }
}

function renderBooks(books, container) {
    if (books.length === 0) {
        container.innerHTML = '<p class="no-books-message">Список підручників порожній.</p>';
        return;
    }

    const grid = document.createElement('div');
    grid.className = 'books-grid';

    books.forEach(book => {
        const card = document.createElement('a');
        card.className = 'book-card';
        card.href = book.url;
        card.target = '_blank';
        card.rel = 'noopener noreferrer';

        card.innerHTML = `
            <div class="book-cover-wrapper">
                <img src="${book.cover}" alt="${book.title}" class="book-cover" onerror="this.src='assets/img/books/default_book.png'">
            </div>
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <div class="book-grade">${book.grade}</div>
            </div>
        `;

        grid.appendChild(card);
    });

    // Clear loading placeholder
    container.innerHTML = '';
    container.appendChild(grid);
}
