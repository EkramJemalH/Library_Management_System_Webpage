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

// ---------------------- ADMIN DASHBOARD ----------------------
if(window.location.pathname.includes('admin-dashboard.html')) {
    const booksTableBody = document.querySelector('#books-table tbody');
    const membersTableBody = document.querySelector('#members-table tbody');
    const totalBooksEl = document.getElementById('total-books');
    const totalMembersEl = document.getElementById('total-members');
    const booksIssuedEl = document.getElementById('books-issued');

    // Quick Stats
    if(totalBooksEl) totalBooksEl.textContent = books.length;
    if(totalMembersEl) totalMembersEl.textContent = members.filter(u => u.role === 'member').length;
    if(booksIssuedEl) booksIssuedEl.textContent = books.filter(b => b.issued).length;

    // Render books table
    function renderAdminBooks() {
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
    }

    // Render members table
    function renderMembers() {
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

    // Initial render
    renderAdminBooks();
    renderMembers();

    // Event delegation for books
    booksTableBody.addEventListener('click', (e) => {
        const target = e.target;
        const index = target.dataset.index;

        if(target.classList.contains('edit-book')) {
            const newTitle = prompt("Enter new title:", books[index].title);
            const newAuthor = prompt("Enter new author:", books[index].author);
            const newCover = prompt("Enter new cover URL:", books[index].cover);

            if(newTitle && newAuthor && newCover){
                books[index] = { title: newTitle, author: newAuthor, cover: newCover, issued: books[index].issued };
                localStorage.setItem('books', JSON.stringify(books));
                renderAdminBooks();
            }
        }

        if(target.classList.contains('delete-book')) {
            if(confirm("Are you sure you want to delete this book?")){
                books.splice(index, 1);
                localStorage.setItem('books', JSON.stringify(books));
                renderAdminBooks();
            }
        }
    });

    // Event delegation for members
    membersTableBody.addEventListener('click', (e) => {
        const target = e.target;
        const index = target.dataset.index;

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
}

// ---------------------- MEMBER DASHBOARD ----------------------
if(window.location.pathname.includes('member-dashboard.html')) {
    const booksTableBody = document.querySelector('#books-table tbody');
    const totalBooksEl = document.getElementById('total-books');
    const booksIssuedEl = document.getElementById('books-issued');

    function renderMemberBooks() {
        booksTableBody.innerHTML = '';

        books.forEach((book, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${book.cover}" alt="${book.title}" style="width:50px;"></td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.issued ? 'Issued' : 'Available'}</td>
                <td>
                    ${!book.issued 
                        ? `<button class="request-book" data-index="${index}">Request</button>` 
                        : `<button class="request-book" disabled>Requested</button>`}
                </td>
            `;
            booksTableBody.appendChild(row);
        });

        if(totalBooksEl) totalBooksEl.textContent = books.length;
        if(booksIssuedEl) booksIssuedEl.textContent = books.filter(b => b.issued).length;

        // Request book action
        booksTableBody.addEventListener('click', (e) => {
            if(e.target.classList.contains('request-book')){
                const index = e.target.dataset.index;
                if(!books[index].issued){
                    books[index].issued = true;
                    localStorage.setItem('books', JSON.stringify(books));
                    alert(`You requested "${books[index].title}" successfully!`);
                    renderMemberBooks();
                }
            }
        });
    }

    renderMemberBooks();
}
function displayBooksForMember() {
  let books = JSON.parse(localStorage.getItem("books")) || [];
  const search = document.getElementById("searchInput").value.toLowerCase();
  const filter = document.getElementById("filterSelect").value;

  let filteredBooks = books.filter(book => {
    const matchesSearch = 
      book.title.toLowerCase().includes(search) || 
      book.author.toLowerCase().includes(search);

    const matchesFilter = 
      filter === "all" ? true : book.status === filter;

    return matchesSearch && matchesFilter;
  });

  let output = "";
  filteredBooks.forEach(book => {
    output += `
      <div class="book-card">
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Status:</strong> ${book.status}</p>
        ${book.status === "available" ? `<button onclick="requestBorrow('${book.title}')">Borrow</button>` : ""}
      </div>
    `;
  });

  document.getElementById("bookList").innerHTML = output;
}

// Event listeners
if(document.getElementById("searchInput")){
  document.getElementById("searchInput").addEventListener("input", displayBooksForMember);
  document.getElementById("filterSelect").addEventListener("change", displayBooksForMember);
  displayBooksForMember();
}
function generateReports() {
  let books = JSON.parse(localStorage.getItem("books")) || [];
  let members = JSON.parse(localStorage.getItem("members")) || [];

  const totalBooks = books.length;
  const availableBooks = books.filter(b => b.status === "available").length;
  const borrowedBooks = books.filter(b => b.status === "borrowed").length;
  const totalMembers = members.length;

  if(document.getElementById("totalBooks")){
    document.getElementById("totalBooks").textContent = totalBooks;
    document.getElementById("availableBooks").textContent = availableBooks;
    document.getElementById("borrowedBooks").textContent = borrowedBooks;
    document.getElementById("totalMembers").textContent = totalMembers;
  }
}

function generateCharts() {
  let books = JSON.parse(localStorage.getItem("books")) || [];
  const availableBooks = books.filter(b => b.status === "available").length;
  const borrowedBooks = books.filter(b => b.status === "borrowed").length;

  if(document.getElementById("bookChart")){
    new Chart(document.getElementById("bookChart"), {
      type: "pie",
      data: {
        labels: ["Available", "Borrowed"],
        datasets: [{
          data: [availableBooks, borrowedBooks],
          backgroundColor: ["#4CAF50", "#FF5722"]
        }]
      }
    });
  }
}

// Run on admin dashboard load
generateReports();
generateCharts();

// ---------------------- Dark/Light Mode Toggle ----------------------
const modeToggle = document.getElementById('mode-toggle');

// Check localStorage for mode preference on page load
if(localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    if(modeToggle) modeToggle.textContent = '🌙';
} else {
    if(modeToggle) modeToggle.textContent = '☀️';
}

if(modeToggle){
    modeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if(document.body.classList.contains('dark-mode')){
            localStorage.setItem('darkMode', 'enabled'); // save preference
            modeToggle.textContent = '🌙';
        } else {
            localStorage.setItem('darkMode', 'disabled'); // save preference
            modeToggle.textContent = '☀️';
        }
    });
}

