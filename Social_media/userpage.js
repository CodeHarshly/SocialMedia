window.addEventListener("scroll", function () {
    const UserHead = document.querySelector(".UserHead");
    if(!UserHead) return;
    UserHead.classList.toggle("hide", window.scrollY > 80);
});

document.addEventListener('DOMContentLoaded', function() {

    fetch('php/getUserData.php', { credentials: 'include' })
        .then(r => r.json())
        .then(data => {
            data.forEach(user => {
                const profileImg = document.getElementById('profileImage');
                if(profileImg) profileImg.src = 'php/' + user.profileimage;
                const uHead = document.querySelector('.usernameHead');
                if(uHead) uHead.textContent = user.username;
                const uTitle = document.querySelector('.userTitle h3');
                if(uTitle) uTitle.textContent = user.username;
                const postsEl = document.querySelector('.posts h4');
                if(postsEl) postsEl.textContent = user.posts;
                const follEl = document.querySelector('.followers h4');
                if(follEl) follEl.textContent = user.followers;
                const follgEl = document.querySelector('.following h4');
                if(follgEl) follgEl.textContent = user.following;
                const nameEl = document.querySelector('.name');
                if(nameEl) nameEl.textContent = user.fname;
                const bioEl = document.querySelector('.bio');
                if(bioEl) bioEl.textContent = user.bio;
            });
        })
        .catch(e => console.error('Error fetching user data:', e));

    const profileImage = document.querySelector('#profileImage');
    if(profileImage){
        profileImage.addEventListener('click', () => {
            document.querySelector('.imgEdit').style.display = 'flex';
        });
    }

    const imgEditClose = document.querySelector('.imgEdit-close');
    if(imgEditClose){
        imgEditClose.addEventListener('click', () => {
            document.querySelector('.imgEdit').style.display = 'none';
            document.querySelector('#add-profileImg').src = '';
            document.querySelector('.imgEdit-btn').style.display = 'flex';
        });
    }

    const profileUpload = document.querySelector('#profile-upload');
    if(profileUpload){
        profileUpload.addEventListener('change', () => {
            const url = URL.createObjectURL(profileUpload.files[0]);
            document.querySelector('#add-profileImg').src = url;
            document.querySelector('#profileImage').src = url;
            document.querySelector('.imgEdit-btn').style.display = 'none';
        });
    }

    const profileImgUpload = document.getElementById('profileImgUpload');
    if(profileImgUpload){
        profileImgUpload.addEventListener("submit", function(e){
            e.preventDefault();
            document.querySelector('.imgEdit').style.display = 'none';
            document.querySelector('#add-profileImg').src = '';
            document.querySelector('.imgEdit-btn').style.display = 'flex';
            const formData = new FormData(this);
            fetch("php/profImgUp.php",{ method:"POST", body:formData, credentials:'include' })
            .then(r => r.json())
            .then(data => {
                if(data.success) alert("Profile image updated!");
                else alert(data.message);
            }).catch(e => console.error(e));
        });
    }
});
