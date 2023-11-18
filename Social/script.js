
/******************nav active maker****************/
let navicons = document.querySelectorAll('.icon');
let previousActiveIcon = 'homeIcon';

const handleClick = (iconId) => {
    // Update URL when navigating to a different view
    /*const url = iconId;
    if(iconId != 'searchIcon' && iconId != 'msgIcon' && iconId != 'notifyIcon' && iconId != 'CPIcon' && iconId != 'menuIcon'){
        window.history.replaceState(null, null, url);
        previousActiveIcon = iconId;
    }*/

    navicons.forEach(item => {
        if (item.id == iconId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    //displayContent(iconId);
};

/*function includeHTML(url, targetId) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById(targetId).innerHTML = html;
        })
        .catch(error => console.error('Error loading HTML:', error));
}*/

navicons.forEach(item => {
    item.addEventListener('click', () => {

        handleClick(item.id);

        if(item.id != 'searchIcon' && item.id != 'msgIcon' && item.id != 'notifyIcon' && item.id != 'CPIcon' && item.id != 'menuIcon'){
            previousActiveIcon = item.id;
        }
        console.log(previousActiveIcon);
        // logic for displaying content here
        displayContent(item.id);
        
    });
    
});
function calculateTime(timestamp) {
    const currentDate = new Date();
    const postDate = new Date(timestamp);
    console.log(currentDate);
    console.log(postDate);
    const timeDifference = currentDate - postDate;
    console.log(timeDifference);
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return days + (days === 1 ? ' day ago' : ' days ago');
    } else if (hours > 0) {
        return hours + (hours === 1 ? ' hour ago' : ' hours ago');
    } else if (minutes > 0) {
        return minutes + (minutes === 1 ? ' minute ago' : ' minutes ago');
    } else {
        return seconds + (seconds === 1 ? ' second ago' : ' seconds ago');
    }
}

function displayuserPosts(){
    fetch('php/fetchPost.php')
    .then(response => response.json())
    .then(data => {
        // Update HTML with fetched data
        const userPostsContainer = document.querySelector('.userPosts');

        data.forEach(post => {
            const postSection = document.createElement('section');
            postSection.classList.add('userPostSec');
            const ProfileImgPath = 'php/' + post.profileimage;
            const PostImgPath = 'php/' + post.imagepath;
            postSection.innerHTML = `
                <div class="feeds">
                    <div class="feed">
                        <div class="feed-top">
                            <div class="user">
                                <div class="profile-picture">
                                    <img src="${ProfileImgPath}" alt="Profile Picture">
                                </div>
                                <div class="info">
                                    <h3>${post.username}</h3>
                                    <div class="time txt-gry">
                                        <small>${calculateTime(post.time)}</small>
                                    </div>
                                </div>
                            </div>
                            <div class="edit">
                                <i class="fa-solid fa-ellipsis"></i>
                            </div>
                        </div>
                        <div class="feed-content">
                            <img src="${PostImgPath}" alt="Feed Image" id="feedImg">
                        </div>
                        <div class="action-button">
                            <div class="interaction-button">
                                <span><i class="fa fa-heart"></i></span>
                                <span><i class="fa fa-comment-dots"></i></span>
                                <span><i class="fa fa-link"></i></span>
                            </div>   
                            <div class="bookmark">
                                <i class="fa fa-bookmark"></i>
                            </div>
                        </div>
                        <div class="caption">
                            <p>${post.caption}</p>
                        </div>
                    </div>
                </div>
            `;

            // Append the post section to the main container
            userPostsContainer.appendChild(postSection);
        });
    })
    .catch(error => console.error('Error fetching data:', error));

}
function displayContent(icon){
    if (icon === 'homeIcon') {
        document.querySelector('#home').style.display = 'block';
        document.querySelector('.user-page').style.display = 'none';
        document.querySelector('.Search').style.display = 'none';
        document.querySelector('.message').style.display = 'none';
        document.querySelector('.notification').style.display = 'none';
        document.querySelector('.menu-box').style.display = 'none';
    } else if (icon === 'exploreIcon') {
        document.querySelector('#home').style.display = 'none';
        document.querySelector('.user-page').style.display = 'none';
        document.querySelector('.Search').style.display = 'none';
        document.querySelector('.message').style.display = 'none';
        document.querySelector('.notification').style.display = 'none';
        document.querySelector('.menu-box').style.display = 'none';
    } else if (icon === 'searchIcon') {
        document.querySelector('.Search').style.display = 'block';
        document.querySelector('.message').style.display = 'none';
        document.querySelector('.notification').style.display = 'none';
        document.querySelector('.menu-box').style.display = 'none';
    } else if (icon === 'msgIcon') {
        document.querySelector('.message').style.display = 'block';
        document.querySelector('.notification').style.display = 'none';
        document.querySelector('.Search').style.display = 'none';
        document.querySelector('.menu-box').style.display = 'none';
    } else if (icon === 'notifyIcon') {
        document.querySelector('.notification').style.display = 'block';
        document.querySelector('.message').style.display = 'none';
        document.querySelector('.Search').style.display = 'none';
        document.querySelector('.menu-box').style.display = 'none';
    } else if (icon === 'CPIcon') {
        document.querySelector('.post-bg').style.display = 'flex';
    } else if (icon === 'userIcon') {
        document.querySelector('.user-page').style.display = 'flex';
        displayuserPosts();
        /*const scriptElement = document.createElement('script');
        scriptElement.src = 'userpage.js';
        scriptElement.id = 'user-page-script';
        document.body.appendChild(scriptElement);
        includeHTML('userpage.html', 'user-page');*/
        
        document.querySelector('#home').style.display = 'none';
        document.querySelector('.notification').style.display = 'none';
        document.querySelector('.Search').style.display = 'none';
        document.querySelector('.message').style.display = 'none';
        document.querySelector('.menu-box').style.display = 'none';
    } else if(icon === 'menuIcon'){
        document.querySelector('.menu-box').style.display = 'flex';
    }
}

/****************caption counter*******************/
function countCharacters(TextArea) {
    // Calculate and update character count
    const charCount = TextArea.value.length;
    const charCountElement = document.getElementById('charCount');
    charCountElement.textContent = charCount + '/1000';
}

document.addEventListener('DOMContentLoaded', function() {
    /**************************Close btn*************************/

document.querySelector('#closeSearch').addEventListener('click', () => {
    document.querySelector('.Search').style.display = 'none';
    
    console.log(previousActiveIcon);
    handleClick(previousActiveIcon);
});
document.querySelector('#searchIcon').addEventListener('dblclick', () => {
    document.querySelector('.Search').style.display = 'none';
    
    console.log(previousActiveIcon);
    handleClick(previousActiveIcon);
});
document.querySelector('#msgClose').addEventListener('click', () => {
    document.querySelector('.message').style.display = 'none';
    
    console.log(previousActiveIcon);
    handleClick(previousActiveIcon);
});
document.querySelector('#notifyClose').addEventListener('click', () => {
    document.querySelector('.notification').style.display = 'none';
    
    console.log(previousActiveIcon);
    handleClick(previousActiveIcon);
});
document.querySelector('.post-close').addEventListener('click', () => {
    document.querySelector('.post-bg').style.display = 'none';
    document.querySelector('#add-post').src = '';
    document.querySelector('.right-content').style.display = 'none';
    document.querySelector('.post-btn').style.display = 'block';
    document.querySelector('textarea').value = '';
    const charCountElement = document.getElementById('charCount');
    charCountElement.textContent = '0/1000';
    
    console.log(previousActiveIcon);
    handleClick(previousActiveIcon);
});
/*********************new post****************************************/
document.getElementById('postUploadForm').addEventListener("submit", function(event){
    console.log("post submit btn");
    event.preventDefault();
    const formData = new FormData(this);

    fetch("php/PostUpload.php",{
        method: "POST",
        body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.success){
            location.reload();
        } else{
            alert(data.message);
        }
    })
    .catch((error) => {
        console.error("Error: ", error);
    });
    
    
});

document.querySelector('#post-upload').addEventListener('change',() =>{
    document.querySelector('#add-post').src = URL.createObjectURL(document.querySelector('#post-upload').files[0]);
    //problem: can't upload the same image after closing
    document.querySelector('.post-btn').style.display = 'none';
    document.querySelector('.right-content').style.display = 'flex';
});

/******************menu****************************/
/************theme*****************/
document.querySelector('.theme').addEventListener('click', () => {
    document.querySelector('.setting').style.display = 'none';
    document.querySelector('.saved').style.display = 'none';
    document.querySelector('.theme').style.display = 'none';
    document.querySelector('.report').style.display = 'none';
    document.querySelector('.switchAccount').style.display = 'none';
    document.querySelector('.logOut').style.display = 'none';
    document.querySelector('.themecontent').style.display = 'flex';
})
//exit theme
document.querySelector('#closeTheme').addEventListener('click', () => {
    document.querySelector('.setting').style.display = 'flex';
    document.querySelector('.saved').style.display = 'flex';
    document.querySelector('.theme').style.display = 'flex';
    document.querySelector('.report').style.display = 'flex';
    document.querySelector('.switchAccount').style.display = 'flex';
    document.querySelector('.logOut').style.display = 'flex';
    document.querySelector('.themecontent').style.display = 'none';
});
/****add dark mode logic here*********/
/************Log Out***********/
document.querySelector('.logOut').addEventListener('click', () => {
    document.querySelector('.setting').style.display = 'none';
    document.querySelector('.saved').style.display = 'none';
    document.querySelector('.theme').style.display = 'none';
    document.querySelector('.report').style.display = 'none';
    document.querySelector('.switchAccount').style.display = 'none';
    document.querySelector('.logOut').style.display = 'none';
    document.querySelector('.logoutbtn').style.display = 'flex';
})
//cancel log out
document.querySelector('#logout-cancel').addEventListener('click', () => {
    document.querySelector('.setting').style.display = 'flex';
    document.querySelector('.saved').style.display = 'flex';
    document.querySelector('.theme').style.display = 'flex';
    document.querySelector('.report').style.display = 'flex';
    document.querySelector('.switchAccount').style.display = 'flex';
    document.querySelector('.logOut').style.display = 'flex';
    document.querySelector('.logoutbtn').style.display = 'none';
});
/****************UserPage*****************/
/****************menu*****************/
document.querySelector('#closeMenu').addEventListener('click',() =>{
    document.querySelector('.menu-box').style.display = 'none';
    
    handleClick(previousActiveIcon);

    document.querySelector('.setting').style.display = 'flex';
    document.querySelector('.saved').style.display = 'flex';
    document.querySelector('.theme').style.display = 'flex';
    document.querySelector('.report').style.display = 'flex';
    document.querySelector('.switchAccount').style.display = 'flex';
    document.querySelector('.logOut').style.display = 'flex';
    document.querySelector('.themecontent').style.display = 'none';
    document.querySelector('.logoutbtn').style.display = 'none';
});

});
