const signInBtn=document.getElementById("signInBtn");

signInBtn.addEventListener('click',()=>{
    window.location.href="signIn.html";
})
 const registerForm=document.getElementById("register-form");
  
 registerForm.addEventListener('submit',function(e){

    e.preventDefault();
    const email=document.getElementById('reg-email').value.trim();
    const name=document.getElementById('reg-name').value.trim();
    const role=document.querySelector('input[name="role"]:checked').value;

    let users=JSON.parse(localStorage.getItem(users)) || [];

    users.push({name,email,role});

    localStorage.setItem('users',JSON.stringify(users));

    if(role ==="admin"){
        window.location.href="admin-dashboard.html";
    }else{
        Window.location.href="member-dashboard.html";
    }
 })
 const signinForm=document.getElementById("signin-form");
 signinForm.addEventListener('submit',function(e){
    e.preventDefault();

    const email=document.getElementById("email").value.trim;
    const name=document.getElementById("name").value.trim;

    let users=JSON.parse(localStorage.getItem('users')) || [];
     let existingUser=users.find(u=>u.email===email);
      
     if(existingUser){

        if(existingUser.role==="admin"){
            window.location.href="admin-dashboard.html";
        }else{
            window.location.href="member-dashboard.html";
        }
      }  else{
        alert("user not found! Please register first.");
        window.location.href="register.html";
    }
     
 })
