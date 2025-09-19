// ---------------------- Sign-In Button ----------------------
const signInBtn = document.getElementById("signInBtn");
if (signInBtn) {
    signInBtn.addEventListener('click', () => {
        window.location.href = "signIn.html";
    });
}

// ---------------------- Registration Form ----------------------
const registerForm = document.getElementById("register-form");
if (registerForm) {
    registerForm.addEventListener('submit', function(e){
        e.preventDefault();

        const email = document.getElementById('reg-email').value.trim();
        const name = document.getElementById('reg-name').value.trim();
        const roleInput = document.querySelector('input[name="reg-role"]:checked');
        if (!roleInput) return alert("Please select a role.");
        const role = roleInput.value;

        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push({ name, email, role });
        localStorage.setItem('users', JSON.stringify(users));

        if(role === "admin") {
            window.location.href = "admin-dashboard.html";
        } else {
            window.location.href = "member-dashboard.html";
        }
    });
}

// ---------------------- Sign-In Form ----------------------
const signinForm = document.getElementById("signin-form");
if (signinForm) {
    signinForm.addEventListener('submit', function(e){
        e.preventDefault();

        const email = document.getElementById("email").value.trim();

        let users = JSON.parse(localStorage.getItem('users')) || [];
        let existingUser = users.find(u => u.email === email);

        if(existingUser){
            if(existingUser.role === "admin"){
                window.location.href = "admin-dashboard.html";
            } else {
                window.location.href = "member-dashboard.html";
            }
        } else {
            alert("User not found! Please register first.");
            window.location.href = "register.html";
        }
    });
}

// ---------------------- Logout ----------------------
const logoutBtn = document.getElementById('logout-btn');
if(logoutBtn){
    logoutBtn.addEventListener('click', function(){
        alert("Logged out successfully!");
        window.location.href = "index.html";
    });
}

// ---------------------- Sample Data ----------------------
if (!localStorage.getItem('books')) {
    const sampleBooks = [
      { title: "The Great Gatsby", author: "F. Scott Fitzgerald", cover: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/TheGreatGatsby_1925jacket.jpeg/220px-TheGreatGatsby_1925jacket.jpeg", issued: false },
      { title: "To Kill a Mockingbird", author: "Harper Lee", cover: "https://upload.wikimedia.org/wikipedia/en/7/79/To_Kill_a_Mockingbird.JPG", issued: true },
      { title: "1984", author: "George Orwell", cover: "https://upload.wikimedia.org/wikipedia/en/c/c3/1984first.jpg", issued: false },
      { title: "Pride and Prejudice", author: "Jane Austen", cover: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/PrideAndPrejudiceTitlePage.jpg/220px-PrideAndPrejudiceTitlePage.jpg", issued: true },
      { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", cover: "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg", issued: false }
    ];
    localStorage.setItem('books', JSON.stringify(sampleBooks));
}

if (!localStorage.getItem('users')) {
    const sampleMembers = [
      { name: "Alice Johnson", email: "alice@gmail.com", role: "member" },
      { name: "Bob Smith", email: "bob@gmail.com", role: "member" },
      { name: "Charlie Davis", email: "charlie@gmail.com", role: "member" },
      { name: "Admin User", email: "admin@booknest.com", role: "admin" }
    ];
    localStorage.setItem('users', JSON.stringify(sampleMembers));
}

// ---------------------- Load Data ----------------------
let books = JSON.parse(localStorage.getItem('books')) || [];
let members = JSON.parse(localStorage.getItem('users')) || [];

// ---------------------- Quick Stats ----------------------
const totalBooksEl = document.getElementById('total-books');
if(totalBooksEl) totalBooksEl.textContent = books.length;

const totalMembersEl = document.getElementById('total-members');
if(totalMembersEl) totalMembersEl.textContent = members.filter(u => u.role === 'member').length;

const booksIssuedEl = document.getElementById('books-issued');
if(booksIssuedEl) booksIssuedEl.textContent = books.filter(b => b.issued).length;

// ---------------------- Populate Books Table ----------------------
const booksTableBody = document.querySelector('#books-table tbody');
if(booksTableBody){
    booksTableBody.innerHTML = '';
    books.forEach((book, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${book.cover}" alt="${book.title}" class="book-cover"></td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.issued ? 'Issued' : 'Available'}</td>
            <td>
                <button class="edit-book" data-index="${index}">Edit</button>
                <button class="delete-book" data-index="${index}">Delete</button>
            </td>
        `;
        booksTableBody.appendChild(row);
    });
}

// ---------------------- Populate Members Table ----------------------
const membersTableBody = document.querySelector('#members-table tbody');
if(membersTableBody){
    membersTableBody.innerHTML = '';
    members.forEach((member, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${member.name}</td>
            <td>${member.email}</td>
            <td>${member.role}</td>
            <td>
                <button class="edit-member" data-index="${index}">Edit</button>
                <button class="delete-member" data-index="${index}">Delete</button>
            </td>
        `;
        membersTableBody.appendChild(row);
    });
}

// ---------------------- Add Book Form Toggle ----------------------
const addBookBtn = document.getElementById('add-book-btn');
const addBookFormContainer = document.getElementById('add-book-form-container');
const addBookForm = document.getElementById('add-book-form');

if(addBookBtn && addBookFormContainer){
    addBookBtn.addEventListener('click', () => {
        addBookFormContainer.classList.toggle('hidden');
    });
}

// ---------------------- Add Book Form Submission ----------------------
if(addBookForm){
    addBookForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('new-title').value.trim();
        const author = document.getElementById('new-author').value.trim();
        const cover = document.getElementById('new-cover').value.trim();

        if(!title || !author || !cover) return alert("Please fill all fields.");

        books.push({ title, author, cover, issued: false });
        localStorage.setItem('books', JSON.stringify(books));

        // Add row to table
        if(booksTableBody){
            const index = books.length - 1;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${cover}" alt="${title}" class="book-cover"></td>
                <td>${title}</td>
                <td>${author}</td>
                <td>Available</td>
                <td>
                    <button class="edit-book" data-index="${index}">Edit</button>
                    <button class="delete-book" data-index="${index}">Delete</button>
                </td>
            `;
            booksTableBody.appendChild(row);
        }

        if(totalBooksEl) totalBooksEl.textContent = books.length;

        addBookForm.reset();
        addBookFormContainer.classList.add('hidden');
    });
}
// --- BOOKS ---


// Event delegation for Edit/Delete buttons
booksTableBody.addEventListener('click', (e) => {
    const target = e.target;
    const index = target.dataset.index;
    let books = JSON.parse(localStorage.getItem('books')) || [];

    if(target.classList.contains('edit-book')) {
        // Prompt new values (you can replace with a nicer form later)
        const newTitle = prompt("Enter new title:", books[index].title);
        const newAuthor = prompt("Enter new author:", books[index].author);
        const newCover = prompt("Enter new cover URL:", books[index].cover);

        if(newTitle && newAuthor && newCover){
            books[index] = {
                ...books[index],
                title: newTitle,
                author: newAuthor,
                cover: newCover
            };
            localStorage.setItem('books', JSON.stringify(books));
            renderBooks();
        }
    }

    if(target.classList.contains('delete-book')) {
        if(confirm("Are you sure you want to delete this book?")){
            books.splice(index, 1);
            localStorage.setItem('books', JSON.stringify(books));
            renderBooks();
        }
    }
});

// --- MEMBERS ---


membersTableBody.addEventListener('click', (e) => {
    const target = e.target;
    const index = target.dataset.index;
    let members = JSON.parse(localStorage.getItem('users')) || [];

    if(target.classList.contains('edit-member')) {
        const newName = prompt("Enter new name:", members[index].name);
        const newEmail = prompt("Enter new email:", members[index].email);
        const newRole = prompt("Enter new role (admin/member):", members[index].role);

        if(newName && newEmail && newRole){
            members[index] = { name: newName, email: newEmail, role: newRole };
            localStorage.setItem('users', JSON.stringify(members));
            renderMembers();
        }
    }

    if(target.classList.contains('delete-member')) {
        if(confirm("Are you sure you want to delete this member?")){
            members.splice(index, 1);
            localStorage.setItem('users', JSON.stringify(members));
            renderMembers();
        }
    }
});

// --- FUNCTIONS TO RE-RENDER TABLES ---
function renderBooks(){
    let books = JSON.parse(localStorage.getItem('books')) || [];
    booksTableBody.innerHTML = '';
    books.forEach((book, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${book.cover}" alt="${book.title}" class="book-cover" style="width:50px"></td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.issued ? 'Issued' : 'Available'}</td>
            <td>
                <button class="edit-book" data-index="${index}">Edit</button>
                <button class="delete-book" data-index="${index}">Delete</button>
            </td>
        `;
        booksTableBody.appendChild(row);
    });

    // Update quick stats
    document.getElementById('total-books').textContent = books.length;
    document.getElementById('books-issued').textContent = books.filter(b => b.issued).length;
}

function renderMembers(){
    let members = JSON.parse(localStorage.getItem('users')) || [];
    membersTableBody.innerHTML = '';
    members.forEach((member, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${member.name}</td>
            <td>${member.email}</td>
            <td>${member.role}</td>
            <td>
                <button class="edit-member" data-index="${index}">Edit</button>
                <button class="delete-member" data-index="${index}">Delete</button>
            </td>
        `;
        membersTableBody.appendChild(row);
    });

    // Update member stats
    document.getElementById('total-members').textContent = members.filter(u => u.role === 'member').length;
}

// Initial render
renderBooks();
renderMembers();
