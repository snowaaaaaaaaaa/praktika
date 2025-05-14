document.addEventListener('DOMContentLoaded', () => {
    const booksContainer = document.getElementById('books-container');
    const specialtiesList = document.getElementById('specialties-list');
    const modal = document.getElementById("book-modal");
    const closeButton = document.querySelector(".close-button");

    const modalBookImage = document.getElementById("modal-book-image");
    const modalBookTitle = document.getElementById("modal-book-title");
    const modalBookAuthor = document.getElementById("modal-book-author");
    const modalBookYear = document.getElementById("modal-book-year");
    const modalBookDescription = document.getElementById("modal-book-description");

    async function loadBooksForSpecialty(specialty) {
        booksContainer.innerHTML = ''; 

        try {
            const response = await fetch(/kursova/api.php?specialty=${specialty});
            console.log(response);  
            if (!response.ok) {
                throw new Error('Не вдалося отримати дані з сервера');
            }

            const books = await response.json();
            console.log(books); 

            if (books.length === 0) {
                booksContainer.innerHTML = '<p>Немає доступних книг для цієї спеціальності.</p>';
            } else {
                books.forEach(book => {
                    const bookItem = document.createElement('div');
                    bookItem.classList.add('book-item');
                    bookItem.innerHTML = 
                        <img src="images/${book.image}" alt="${book.title}" class="book-image">
                        <div class="book-info">
                            <p class="book-title">${book.title}</p>
                            <p class="book-author">Автор: ${book.author}</p>
                            <p class="book-year">Рік: ${book.year}</p>
                        </div>
                    ;

                    bookItem.addEventListener('click', () => {
                        modalBookImage.src = images/${book.image};
                        modalBookTitle.textContent = book.title;
                        modalBookAuthor.textContent = Автор: ${book.author};
                        modalBookYear.textContent = Рік: ${book.year};
                        modalBookDescription.textContent = book.description || "Опис книги поки що відсутній.";
                        modal.style.display = "block";
                    });

                    booksContainer.appendChild(bookItem);
                });
            }
        } catch (error) {
            console.error('Помилка завантаження книг:', error);
            booksContainer.innerHTML = '<p>Сталася помилка під час завантаження книг. Спробуйте ще раз пізніше.</p>';
        }
    }

    // тут коли тицяємо на спеціальність
    specialtiesList.addEventListener('click', (event) => {
        if (event.target.classList.contains('specialty')) {
            document.querySelectorAll('.sidebar .specialty').forEach(li => li.classList.remove('selected'));
            event.target.classList.add('selected');
            const specialty = event.target.dataset.specialty;
            loadBooksForSpecialty(specialty);
        }
    });

    // закриття вікна
    closeButton.addEventListener('click', () => {
        modal.style.display = "none";
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

 const searchBar = document.getElementById('search-bar');
    let allBooks = []; // це масивчик щоб книжки зберігати

    async function loadBooksForSpecialty(specialty) {
        booksContainer.innerHTML = ''; 

        try {
            const response = await fetch(/kursova/api.php?specialty=${specialty});
            if (!response.ok) {
                throw new Error('Не вдалося отримати дані з сервера');
            }

            const books = await response.json();
            allBooks = books; // зберігаємо книжки для пошуку

            displayBooks(books);
        } catch (error) {
            console.error('Помилка завантаження книг:', error);
            booksContainer.innerHTML = '<p>Сталася помилка під час завантаження книг. Спробуйте ще раз пізніше.</p>';
        }
    }

    // це окрема функція для відображення книжок
    function displayBooks(books) {
        booksContainer.innerHTML = '';

        if (books.length === 0) {
            booksContainer.innerHTML = '<p>Немає доступних книг.</p>';
            return;
        }

        books.forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.classList.add('book-item');
            bookItem.innerHTML = 
                <img src="images/${book.image}" alt="${book.title}" class="book-image">
                <div class="book-info">
                    <p class="book-title">${book.title}</p>
                    <p class="book-author">Автор: ${book.author}</p>
                    <p class="book-year">Рік: ${book.year}</p>
                </div>
            ;

            bookItem.addEventListener('click', () => {
                modalBookImage.src = images/${book.image};
                modalBookTitle.textContent = book.title;
                modalBookAuthor.textContent = Автор: ${book.author};
                modalBookYear.textContent = Рік: ${book.year};
                modalBookDescription.textContent = book.description || "Опис книги поки що відсутній.";
                modal.style.display = "block";
            });

            booksContainer.appendChild(bookItem);
        });
    }

    // це обробник пошуку
    searchBar.addEventListener('input', () => {
        const query = searchBar.value.trim().toLowerCase();
        const filteredBooks = allBooks.filter(book =>
            book.title.toLowerCase().includes(query)
        );
        displayBooks(filteredBooks);
    });

    // це шоб по дефолту 121 спеціальність завантажувалась
    loadBooksForSpecialty("121");
});
