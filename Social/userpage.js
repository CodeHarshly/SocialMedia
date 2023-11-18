window.addEventListener("scroll", function () {
    const UserHead = document.querySelector(".UserHead");
    const scrollPos = window.scrollY;
    const scrollThreshold = 80;

    if (scrollPos > scrollThreshold) {
        UserHead.classList.add("hide");
    } else {
        UserHead.classList.remove("hide");
    }
});
document.addEventListener('DOMContentLoaded', function() {

    fetch('php/getUserData.php')
        .then(response => response.json())
        .then(data => {
            // Assuming data is an array of user profiles
            data.forEach(user => {
                // Update profile image
                console.log(user.profileimage);
                document.getElementById('profileImage').src = 'php/' + user.profileimage;

                // Update user details
                document.querySelector('.usernameHead').textContent = user.username;
                document.querySelector('.userTitle h3').textContent = user.username;
                document.querySelector('.posts h4').textContent = user.posts;
                document.querySelector('.followers h4').textContent = user.followers;
                document.querySelector('.following h4').textContent = user.following;

                // Update bio details
                document.querySelector('.name').textContent = user.fname;
                document.querySelector('.bio').textContent = user.bio;

                // You can add more updates as needed based on your HTML structure
            });
        })
        .catch(error => console.error('Error fetching data:', error));



    console.log("working userpage");
    document.querySelector('#profileImage').addEventListener('click',() =>{
        document.querySelector('.imgEdit').style.display = 'flex';
    });
    document.querySelector('.imgEdit-close').addEventListener('click', () => {
        document.querySelector('.imgEdit').style.display = 'none';
        document.querySelector('#add-profileImg').src = '';
        document.querySelector('.imgEdit-btn').style.display = 'flex';
    });
    document.querySelector('#profile-upload').addEventListener('change',() =>{
        let newprofileImg = URL.createObjectURL(document.querySelector('#profile-upload').files[0]);
        document.querySelector('#add-profileImg').src = newprofileImg;
        document.querySelector('#profileImage').src = newprofileImg;
        //problem: can't upload the same image after closing
        document.querySelector('.imgEdit-btn').style.display = 'none';
    });
    document.getElementById('profileImgUpload').addEventListener("submit", function(event){
        
        document.querySelector('.imgEdit').style.display = 'none';
        document.querySelector('#add-profileImg').src = '';
        document.querySelector('.imgEdit-btn').style.display = 'flex';

        event.preventDefault();
        const formData = new FormData(this);

        fetch("php/profImgUp.php",{
            method: "POST",
            body: formData,
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.success){
                alert("Profile Image Added");
            } else{
                alert(data.message);
            }
        })
        .catch((error) => {
            console.error("Error: ", error);
        });
        
        
    });
});
