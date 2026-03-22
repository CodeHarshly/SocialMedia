
/******************nav active maker****************/
let navicons = document.querySelectorAll('.icon');
let previousActiveIcon = 'homeIcon';
let allPreviousActiveId = 'homeIcon';
let allPostIds = [];
let currentUserImg = "";
let currentChatUserId = null;
let msgPollInterval = null;

function getData() {
    fetch('php/getUserData.php', { credentials: 'include' })
        .then(r => r.json())
        .then(data => {
            data.forEach(user => {
                currentUserImg = 'php/' + user.profileimage;
            });
        })
        .catch(e => console.error('Error fetching data:', e));
}

const handleClick = (iconId) => {
    navicons.forEach(item => {
        item.classList.toggle('active', item.id == iconId);
    });
};

navicons.forEach(item => {
    item.addEventListener('click', () => {
        handleClick(item.id);
        if(!['searchIcon','msgIcon','notifyIcon','CPIcon','menuIcon'].includes(item.id)){
            previousActiveIcon = item.id;
        }
        displayContent(item.id);
    });
});

function calculateTime(timestamp) {
    const diff = Date.now() - new Date(timestamp);
    const s = Math.floor(diff/1000), m = Math.floor(s/60), h = Math.floor(m/60), d = Math.floor(h/24);
    if(d > 0) return d + (d===1?' day ago':' days ago');
    if(h > 0) return h + (h===1?' hour ago':' hours ago');
    if(m > 0) return m + (m===1?' minute ago':' minutes ago');
    return s + (s===1?' second ago':' seconds ago');
}

function calculateLikes(likes){
    if(!likes || likes == 0) return '';
    return likes + (likes == 1 ? ' like' : ' likes');
}
function calculateComments(c){
    if(!c || c == 0) return '';
    if(c == 1) return 'view ' + c + ' comment';
    return 'view all ' + c + ' comments';
}

/**** POST RENDERING ****/
function buildPostHTML(post, classPrefix) {
    const profileImg = 'php/' + post.profileimage;
    const postImg    = 'php/' + post.imagepath;
    return `
        <div class="feeds"><div class="feed">
            <div class="feed-top">
                <div class="user">
                    <div class="profile-picture"><img src="${profileImg}" alt=""></div>
                    <div class="info">
                        <h3>${post.username}</h3>
                        <div class="time txt-gry"><small>${calculateTime(post.time)}</small></div>
                    </div>
                </div>
                <div class="edit"><i class="fa-solid fa-ellipsis"></i></div>
            </div>
            <div class="feed-content"><img src="${postImg}" alt="Feed Image" id="feedImg"></div>
            <div class="action-button">
                <div class="interaction-button">
                    <span><i class="fa fa-heart"></i></span>
                    <span><i class="fa fa-comment-dots" id="commentBtn"></i></span>
                    <span><i class="fa fa-link"></i></span>
                </div>
                <div class="bookmark"><i class="fa fa-bookmark" id="saved"></i></div>
            </div>
            <div class="likesCounter"><p>${calculateLikes(post.likes)}</p></div>
            <div class="caption"><p>${post.caption || ''}</p></div>
            <div class="postComment">
                <div class="profile-picture"><img src="${profileImg}" alt=""></div>
                <div>
                    <form action="" id="getCommentInput" enctype="multipart/form-data">
                        <input name="comment" placeholder="Add Comment" maxlength="2000">
                        <input type="hidden" name="post_id" value="${post.id}">
                        <input type="submit" value="post" class="postComment">
                    </form>
                </div>
            </div>
            <div class="specialComment"></div>
            <div class="viewComment"><p>${calculateComments(post.comments)}</p></div>
        </div></div>`;
}

function displayuserPosts(){
    const form = new FormData();
    form.append("action","user");
    fetch('php/fetchPost.php',{ method:'POST', body:form, credentials:'include' })
    .then(r => r.json())
    .then(data => {
        const container = document.querySelector('#userPosts');
        data.forEach(post => {
            if(!post.id) return;
            const sec = document.createElement('section');
            sec.classList.add('userPostSecUser');
            sec.setAttribute('data-post-id', `${post.id}_${post.user_id}`);
            sec.innerHTML = buildPostHTML(post, 'User');
            container.appendChild(sec);
            allPostIds.push(post.id);
        });
        printAllPostIds("User");
    }).catch(e => console.error(e));
}

function displayuserPosts2(id){
    const form = new FormData();
    form.append("id", id);
    form.append("action","search");
    fetch('php/fetchPost.php',{ method:'POST', body:form, credentials:'include' })
    .then(r => r.json())
    .then(data => {
        const container = document.querySelector('#searchUserPost');
        if(container) container.innerHTML = '';
        data.forEach(post => {
            if(!post.id) return;
            const sec = document.createElement('section');
            sec.classList.add('userPostSecSearch');
            sec.setAttribute('data-post-id', `${post.id}_${post.user_id}`);
            sec.innerHTML = buildPostHTML(post, 'Search');
            container.appendChild(sec);
            allPostIds.push(post.id);
        });
        printAllPostIds("Search");
    }).catch(e => console.error(e));
}

function displayFollowerPost(action){
    const form = new FormData();
    form.append("action", action);
    fetch('php/fetchPost.php',{ method:'POST', body:form, credentials:'include' })
    .then(r => r.json())
    .then(data => {
        const container = document.querySelector('#home');
        if(container) container.innerHTML = '';
        data.forEach(post => {
            if(!post.id) return;
            const sec = document.createElement('section');
            sec.classList.add('userPostSecHome');
            sec.setAttribute('data-post-id', `${post.id}_${post.user_id}`);
            sec.innerHTML = buildPostHTML(post, 'Home');
            container.appendChild(sec);
            allPostIds.push(post.id);
        });
        printAllPostIds("Home");
    }).catch(e => console.error(e));
}

function displayExplorePosts(){
    fetch('php/explore.php', { credentials:'include' })
    .then(r => r.json())
    .then(data => {
        const grid = document.querySelector('#exploreGrid');
        grid.innerHTML = '';
        data.forEach(post => {
            if(!post.id || !post.imagepath) return;
            const item = document.createElement('div');
            item.classList.add('explore-item');
            item.setAttribute('data-post-id', `${post.id}_${post.user_id}`);
            item.innerHTML = `<img src="php/${post.imagepath}" alt="${post.caption || ''}">`;
            item.addEventListener('click', () => {
                const profileImg = 'php/' + post.profileimage;
                const postImg    = 'php/' + post.imagepath;
                document.querySelector('#FullPost').style.display = 'flex';
                document.querySelector('#FullPost').setAttribute('full_post_id', post.id);
                displayFullPost(post.id, post.user_id, {
                    profileImage: profileImg,
                    PostImg: postImg,
                    time: calculateTime(post.time),
                    username: post.username,
                    likesCount: calculateLikes(post.likes),
                    liked: '', saved: ''
                });
            });
            grid.appendChild(item);
        });
    }).catch(e => console.error(e));
}

/**** LIKE / SAVE / COMMENT ****/
function UpdateLike$comment(post_Id, classId){
    const form = new FormData();
    form.append("action","getlike");
    fetch('php/postLiked.php',{ method:'POST', body:form, credentials:'include' })
    .then(r => r.json())
    .then(data => {
        const postElements = classId ? document.querySelectorAll(`.userPostSec${classId}`) : [];
        const Fullpost = document.querySelector('#FullPost');
        data.forEach(post => {
            postElements.forEach(el => {
                const [postId] = (el.getAttribute('data-post-id') || '').split('_');
                if(post.id == postId){
                    const el2 = el.querySelector('.likesCounter p');
                    if(el2) el2.textContent = calculateLikes(post.likes);
                }
            });
            const fpId = Fullpost.getAttribute('full_post_id');
            if(fpId && post.id == fpId){
                const el2 = Fullpost.querySelector('.fullPost-content .likesCounter p');
                if(el2) el2.textContent = calculateLikes(post.likes);
            }
        });
    }).catch(e => console.error(e));
}

function addLiked(likedPostIds, savePostIds, classId) {
    const postElements = document.querySelectorAll(`.userPostSec${classId}`);
    postElements.forEach(el => {
        const [postId] = (el.getAttribute('data-post-id') || '').split('_');
        const heartIcon = el.querySelector('.action-button span:first-child i');
        const savedIcon = el.querySelector('#saved');
        if(heartIcon) heartIcon.classList.toggle('liked', likedPostIds.includes(postId));
        if(savedIcon)  savedIcon.classList.toggle('saved',  savePostIds.includes(postId));
    });
}

function printAllPostIds(classId) {
    const formData = new FormData();
    formData.append('postIds', JSON.stringify(allPostIds));
    fetch('php/isLiked.php',{ method:'POST', body:formData, credentials:'include' })
    .then(r => r.json())
    .then(data => {
        if(data.success) addLiked(data.validPostIds, data.savePostIds, classId);
    }).catch(e => console.error(e));
}

function postliked(postId, location, classId){
    const formData = new FormData();
    formData.append('post_id', postId);
    fetch(location,{ method:'POST', body:formData, credentials:'include' })
    .then(r => r.json())
    .then(() => UpdateLike$comment(postId, classId))
    .catch(e => console.error(e));
}

function postSaved(postId, action, classId){
    const formData = new FormData();
    formData.append('post_id', postId);
    formData.append('action', action);
    fetch('php/postSave.php',{ method:'POST', body:formData, credentials:'include' })
    .then(r => r.json())
    .then(() => UpdateLike$comment(postId, classId))
    .catch(e => console.error(e));
}

function addFollower(action, profileId){
    const formData = new FormData();
    formData.append('profile_id', profileId);
    formData.append('action', action);
    fetch('php/follower.php',{ method:'POST', body:formData, credentials:'include' })
    .then(r => r.json())
    .then(data => console.log(data))
    .catch(e => console.error(e));
}

function updateFollwer(action, ProfileId){
    const formData = new FormData();
    formData.append('profile_id', ProfileId);
    formData.append('action', action);
    fetch('php/follower.php',{ method:'POST', body:formData, credentials:'include' })
    .then(r => r.json())
    .then(data => {
        data.forEach(user => {
            const el = document.querySelector('#sFollower h4');
            if(el) el.innerHTML = user.followers;
        });
    }).catch(e => console.error(e));
}

function checkfollow(ch, userId) {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('profile_id', userId);
        formData.append('action', 'check');
        fetch('php/follower.php',{ method:'POST', body:formData, credentials:'include' })
        .then(r => r.json())
        .then(data => {
            const following = data[0] === 'success';
            resolve(ch == 1 ? (following ? "addfollowcolor" : '0') : (following ? "following" : "follow"));
        }).catch(reject);
    });
}

/**** COMMENTS ****/
function RecentComment(id, CpostId, comment, flag, classId){
    fetch('php/getUserData.php', { credentials:'include' })
    .then(r => r.json())
    .then(data => {
        data.forEach(user => {
            const profileImg = 'php/' + user.profileimage;
            if(flag == '1'){
                const postElements = document.querySelectorAll(`.userPostSec${classId}`);
                postElements.forEach(el => {
                    const [postId] = (el.getAttribute('data-post-id') || '').split('_');
                    if(CpostId == postId){
                        const specialComment = el.querySelector('.specialComment');
                        if(specialComment){
                            specialComment.style.display = 'flex';
                            specialComment.innerHTML = `
                                <div class="profile-picture"><img src="${profileImg}" alt=""></div>
                                <div class="commenter">
                                    <p class="username">${user.username}</p>
                                    <p class="userComment">${comment}</p>
                                </div>`;
                        }
                    }
                });
            } else {
                const postComment = document.querySelector('.fullPost-content .post-comment');
                const div = document.createElement('div');
                div.classList.add('Comment');
                div.innerHTML = `
                    <div class="profile-picture"><img src="${profileImg}" alt=""></div>
                    <div class="commenter">
                        <p class="username">${user.username}</p>
                        <p class="userComment">${comment}</p>
                    </div>`;
                const first = postComment.querySelector('.Comment');
                first ? postComment.insertBefore(div, first) : postComment.appendChild(div);
            }
        });
    }).catch(e => console.error(e));
}

function handlePostClick(classId, event) {
    const parentFeed = event.target.closest('.feed');
    if(!parentFeed) return;
    const likeIcon = parentFeed.querySelector('.action-button span:first-child i');

    if(event.target.matches('.action-button span:first-child i')){
        event.target.classList.toggle('liked');
        const parentPost = event.target.closest(`.userPostSec${classId}`);
        if(!parentPost) return;
        const [postId] = (parentPost.getAttribute('data-post-id') || '').split('_');
        postliked(postId, event.target.classList.contains('liked') ? 'php/postLiked.php' : 'php/postUnliked.php', classId);
    }

    if(event.target.tagName.toLowerCase() === 'img' && event.detail === 2 && likeIcon && !likeIcon.classList.contains('liked')){
        likeIcon.classList.add('liked');
        const parentPost = likeIcon.closest(`.userPostSec${classId}`);
        if(!parentPost) return;
        const [postId] = (parentPost.getAttribute('data-post-id') || '').split('_');
        postliked(postId, 'php/postLiked.php', classId);
        printAllPostIds(classId);
    }

    if(event.target.matches('#saved')){
        event.target.classList.toggle('saved');
        const parentPost = event.target.closest(`.userPostSec${classId}`);
        if(!parentPost) return;
        const [postId] = (parentPost.getAttribute('data-post-id') || '').split('_');
        postSaved(postId, event.target.classList.contains('saved') ? 'saved' : 'unsaved', classId);
    }

    if(event.target.matches('#commentBtn')){
        const parentPost = event.target.closest(`.userPostSec${classId}`);
        if(!parentPost) return;
        const pce = parentPost.querySelector('.postComment');
        const vce = parentPost.querySelector('.viewComment');
        if(pce.style.display === 'flex'){ pce.style.display = 'none'; vce.style.display = 'flex'; }
        else { pce.style.display = 'flex'; vce.style.display = 'none'; }
    }

    if(event.target.matches('.postComment')){
        event.preventDefault();
        const formEl = event.target.closest('#getCommentInput');
        if(!formEl) return;
        const postId  = formEl.querySelector('input[name="post_id"]').value;
        const comment = formEl.querySelector('input[name="comment"]').value;
        const formData = new FormData();
        formData.append('comment', comment);
        formData.append('post_id', postId);
        fetch("php/postComment.php",{ method:"POST", body:formData, credentials:'include' })
        .then(r => r.json())
        .then(data => {
            if(data.success) RecentComment(data.commentId, postId, comment, '1', classId);
            else alert(data.message);
        }).catch(e => console.error(e));
    }

    if(event.target.matches('.viewComment p')){
        const parentPost = event.target.closest(`.userPostSec${classId}`);
        if(!parentPost) return;
        const [postId, userId] = (parentPost.getAttribute('data-post-id') || '').split('_');
        const likeContain  = parentPost.querySelector('.action-button span:first-child i');
        const savedContain = parentPost.querySelector('#saved');
        const postDetails = {
            profileImage: parentPost.querySelector('.profile-picture img').src,
            username:     parentPost.querySelector('.info h3').textContent,
            time:         parentPost.querySelector('.info .time small').textContent,
            PostImg:      parentPost.querySelector('.feed-content img').src,
            likesCount:   parentPost.querySelector('.likesCounter').textContent,
            liked:  likeContain  && likeContain.classList.contains('liked')  ? "liked"  : '',
            saved:  savedContain && savedContain.classList.contains('saved') ? "saved"  : '',
        };
        document.querySelector('#FullPost').setAttribute('full_post_id', postId);
        document.querySelector('#FullPost').style.display = 'flex';
        displayFullPost(postId, userId, postDetails);
    }
}

function displayFullPost(postId, userId, postDetails){
    const postComment = document.querySelector('.fullPost-content .post-comment');
    postComment.innerHTML = '';
    document.querySelector('.fullPostComment .profile-picture img').src = currentUserImg || 'php/upload/default/profile.jpg';

    const formData = new FormData();
    formData.append('post_id', postId);
    fetch("php/fetchPostComment.php",{ method:"POST", body:formData, credentials:'include' })
    .then(r => r.json())
    .then(data => {
        data.forEach(c => {
            const div = document.createElement('div');
            div.classList.add('Comment');
            div.innerHTML = `
                <div class="profile-picture"><img src="php/${c.profileimage}" alt=""></div>
                <div class="commenter">
                    <p class="username">${c.username}</p>
                    <p class="userComment">${c.comment}</p>
                </div>`;
            postComment.appendChild(div);
        });
    }).catch(e => console.error(e));

    document.querySelector('.fullPost-top .profile-picture img').src = postDetails.profileImage;
    document.querySelector('.fullPost-content .fullPost-img img').src  = postDetails.PostImg;
    document.querySelector('.fullPost-top .info .time small').textContent = postDetails.time;
    document.querySelector('.fullPost-top .info h3').textContent = postDetails.username;
    document.querySelector('.fullPost-content .action-button span:first-child i').classList.toggle('liked', !!postDetails.liked);
    document.querySelector('#FPsaved').classList.toggle('saved', !!postDetails.saved);
    document.querySelector('.fullPost-content .fullPost-img .likesCounter p').textContent = postDetails.likesCount;
}

/**** SEARCH ****/
function displayResults(results) {
    const list = document.getElementById('searchResults');
    list.innerHTML = '';
    results.forEach(r => {
        const div = document.createElement('div');
        div.classList.add('displayResult');
        div.setAttribute('data-search-id', r.user_id);
        div.innerHTML = `
            <div class="profile-picture"><img src="php/${r.profileimage}" alt=""></div>
            <div class="searchInfo"><h3>${r.username}</h3><p>${r.fname}</p></div>`;
        list.appendChild(div);
    });
}
function clearResults(){ document.getElementById('searchResults').innerHTML = ''; }

function displayUserProfile(id){
    const top  = document.querySelector('.searchUserTop');
    const post = document.querySelector('#searchUserPost');
    if(top)  top.innerHTML  = '';
    if(post) post.innerHTML = '';

    const form = new FormData();
    form.append('id', id);
    fetch("php/getUserData.php",{ method:"POST", body:form, credentials:'include' })
    .then(r => r.json())
    .then(data => {
        data.forEach(user => {
            top.setAttribute('data-searched-id', user.user_id);
            const div = document.createElement('div');
            div.classList.add('sear-user-page');
            div.innerHTML = `
                <header class="UserHead">
                    <div class="usernameHead">${user.username}</div>
                    <div class="NavIcon"><i class="fa-regular fa-square-plus"></i><i class="fa-solid fa-bars"></i></div>
                </header>
                <main>
                    <section class="userTopSec">
                        <div class="UserLeftSide"><img src="php/${user.profileimage}" alt="" id="profileImage"></div>
                        <div class="UserRightSide">
                            <div class="userTitle"><h3>${user.username}</h3></div>
                            <div class="userDetails">
                                <div class="posts"><h4>${user.posts}</h4><p>posts</p></div>
                                <div class="followers" id="sFollower"><h4>${user.followers}</h4><p>followers</p></div>
                                <div class="following"><h4>${user.following}</h4><p>following</p></div>
                            </div>
                            <div class="button">
                                <button class="follow" id="followButton${user.user_id}"></button>
                                <button class="addFriend" id="msgThisUser" data-uid="${user.user_id}" data-uname="${user.username}" data-uimg="${user.profileimage}">
                                    <i class="fa-regular fa-message"></i>
                                </button>
                            </div>
                        </div>
                    </section>
                    <section class="UserMiddle">
                        <div class="bioDetails">
                            <h4 class="name">${user.fname}</h4>
                            <p class="bio">${user.bio}</p>
                            <div class="stories"></div>
                        </div>
                    </section>
                    <section class="usercontent">
                        <div class="postIcon">
                            <button class="button activePostIcon">Posts</button>
                            <button>Tagged</button>
                        </div>
                    </section>
                </main>`;
            top.appendChild(div);
            displayuserPosts2(user.id);

            checkfollow('1', user.user_id).then(r => {
                const btn = document.getElementById(`followButton${user.user_id}`);
                if(btn) btn.classList.add(r);
            });
            checkfollow('2', user.user_id).then(r => {
                const btn = document.getElementById(`followButton${user.user_id}`);
                if(btn) btn.textContent = r;
            });
        });
    }).catch(e => console.error(e));
}

/**** DISPLAY CONTENT ****/
function displayContent(icon){
    const hide = (sel) => { const el = document.querySelector(sel); if(el) el.style.display = 'none'; };
    const show = (sel, d='block') => { const el = document.querySelector(sel); if(el) el.style.display = d; };

    if(icon === 'homeIcon' && allPreviousActiveId !== 'homeIcon'){
        show('#home'); hide('.user-page'); hide('.searchSection');
        hide('.message'); hide('.notification'); hide('.menu-box'); hide('#exploreSection');
        displayFollowerPost("follow");
        allPreviousActiveId = icon;
    } else if(icon === 'exploreIcon' && allPreviousActiveId !== 'exploreIcon'){
        show('#exploreSection'); hide('#home'); hide('.user-page');
        hide('.searchSection'); hide('.message'); hide('.notification'); hide('.menu-box');
        displayExplorePosts();
        allPreviousActiveId = icon;
    } else if(icon === 'searchIcon' && allPreviousActiveId !== 'searchIcon'){
        show('.searchSection'); hide('.message'); hide('.notification'); hide('.menu-box');
        allPreviousActiveId = icon;
    } else if(icon === 'msgIcon' && allPreviousActiveId !== 'msgIcon'){
        show('.message','flex'); hide('.notification'); hide('.searchSection'); hide('.menu-box');
        loadConversations();
        allPreviousActiveId = icon;
    } else if(icon === 'notifyIcon' && allPreviousActiveId !== 'notifyIcon'){
        show('.notification','flex'); hide('.message'); hide('.searchSection'); hide('.menu-box');
        loadNotifications();
        allPreviousActiveId = icon;
    } else if(icon === 'CPIcon' && allPreviousActiveId !== 'CPIcon'){
        show('.post-bg','flex');
        allPreviousActiveId = icon;
    } else if(icon === 'userIcon' && allPreviousActiveId !== 'userIcon'){
        getData();
        show('.user-page','flex');
        const container = document.querySelector('#userPosts');
        if(container) container.innerHTML = '';
        displayuserPosts();
        hide('#home'); hide('.notification'); hide('.searchSection');
        hide('.message'); hide('.menu-box'); hide('#exploreSection');
        allPreviousActiveId = icon;
    } else if(icon === 'menuIcon' && allPreviousActiveId !== 'menuIcon'){
        show('.menu-box','flex');
        allPreviousActiveId = icon;
    }
}

/**** MESSAGES ****/
function loadConversations(){
    const list = document.getElementById('conversationList');
    const chat = document.getElementById('chatView');
    const search = document.getElementById('msgUserSearch');
    if(chat) chat.style.display = 'none';
    if(search) search.style.display = 'none';
    if(list) list.style.display = 'block';

    fetch('php/getConversations.php', { credentials:'include' })
    .then(r => r.json())
    .then(data => {
        if(!list) return;
        list.innerHTML = '';
        if(data.length === 0){
            list.innerHTML = '<p style="text-align:center;color:#888;padding:2rem">No messages yet</p>';
            return;
        }
        data.forEach(conv => {
            const div = document.createElement('div');
            div.classList.add('msg-conv-item');
            div.setAttribute('data-uid', conv.other_user_id);
            div.setAttribute('data-uname', conv.username);
            div.setAttribute('data-uimg', conv.profileimage);
            div.innerHTML = `
                <img src="php/${conv.profileimage}" alt="">
                <div class="msg-conv-info">
                    <h4>${conv.username}</h4>
                    <p>${conv.last_message || ''}</p>
                </div>
                ${conv.unread > 0 ? '<div class="msg-unread-dot"></div>' : ''}`;
            div.addEventListener('click', () => openChat(conv.other_user_id, conv.username, 'php/'+conv.profileimage));
            list.appendChild(div);
        });
    }).catch(e => console.error(e));
}

function openChat(userId, username, profileImg){
    currentChatUserId = userId;
    const list   = document.getElementById('conversationList');
    const chat   = document.getElementById('chatView');
    const search = document.getElementById('msgUserSearch');
    if(list)   list.style.display = 'none';
    if(search) search.style.display = 'none';
    if(chat)   chat.style.display = 'flex';

    document.getElementById('chatPartnerImg').src = profileImg;
    document.getElementById('chatPartnerName').textContent = username;

    loadMessages(userId);
    if(msgPollInterval) clearInterval(msgPollInterval);
    msgPollInterval = setInterval(() => loadMessages(userId), 5000);
}

function loadMessages(userId){
    const formData = new FormData();
    formData.append('other_id', userId);
    fetch('php/getMessages.php',{ method:'POST', body:formData, credentials:'include' })
    .then(r => r.json())
    .then(data => {
        const container = document.getElementById('chatMessages');
        if(!container) return;
        container.innerHTML = '';
        data.forEach(msg => {
            const div = document.createElement('div');
            div.classList.add('chat-bubble');
            // We compare by checking if this message was sent by the current user
            fetch('php/getUserData.php',{ credentials:'include' })
            .then(r => r.json())
            .then(userData => {
                userData.forEach(u => {
                    // Store current user id globally on first load
                    if(!window._myUserId) window._myUserId = msg.sender_id; // fallback
                });
            });
            div.classList.add(msg.sender_id == (window._myUserId || userId) ? 'theirs' : 'mine');
            div.textContent = msg.message;
            container.appendChild(div);
        });
        container.scrollTop = container.scrollHeight;
    }).catch(e => console.error(e));
}

function sendMessage(){
    const input = document.getElementById('messageInput');
    const msg = input.value.trim();
    if(!msg || !currentChatUserId) return;
    const formData = new FormData();
    formData.append('receiver_id', currentChatUserId);
    formData.append('message', msg);
    input.value = '';
    fetch('php/sendMessage.php',{ method:'POST', body:formData, credentials:'include' })
    .then(r => r.json())
    .then(() => loadMessages(currentChatUserId))
    .catch(e => console.error(e));
}

/**** NOTIFICATIONS ****/
function loadNotificationBadge(){
    fetch('php/getNotifications.php', { credentials:'include' })
    .then(r => r.json())
    .then(data => {
        const badge = document.getElementById('notifyBadge');
        if(badge && data.unread > 0){
            badge.textContent = data.unread > 9 ? '9+' : data.unread;
            badge.style.display = 'flex';
        }
    }).catch(e => console.error(e));
}

function loadNotifications(){
    fetch('php/getNotifications.php', { credentials:'include' })
    .then(r => r.json())
    .then(data => {
        const badge = document.getElementById('notifyBadge');
        if(badge) badge.style.display = 'none';

        const list = document.getElementById('notificationList');
        if(!list) return;
        list.innerHTML = '';

        if(!data.notifications || data.notifications.length === 0){
            list.innerHTML = '<p class="notify-empty">No notifications yet</p>';
            return;
        }

        data.notifications.forEach(n => {
            const div = document.createElement('div');
            div.classList.add('notify-item');
            if(!n.is_read) div.classList.add('unread');
            const typeText = n.type === 'like' ? 'liked your post' : n.type === 'comment' ? 'commented on your post' : 'started following you';
            div.innerHTML = `
                <img src="php/${n.profileimage}" alt="">
                <div class="notify-text">
                    <strong>${n.username}</strong> ${typeText}
                    <div class="notify-time">${calculateTime(n.time)}</div>
                </div>
                ${n.imagepath ? `<img src="php/${n.imagepath}" class="notify-post-thumb" alt="">` : ''}`;
            list.appendChild(div);
        });
    }).catch(e => console.error(e));
}

/**** EDIT PROFILE ****/
function openEditProfile(){
    fetch('php/getUserData.php',{ credentials:'include' })
    .then(r => r.json())
    .then(data => {
        data.forEach(u => {
            document.getElementById('editFname').value    = u.fname    || '';
            document.getElementById('editUsername').value = u.username || '';
            document.getElementById('editBio').value      = u.bio      || '';
        });
    }).catch(e => console.error(e));
    document.getElementById('editProfileModal').style.display = 'flex';
}

/**** CAPTION COUNTER ****/
function countCharacters(TextArea) {
    const charCountElement = document.getElementById('charCount');
    if(charCountElement) charCountElement.textContent = TextArea.value.length + '/1000';
}

/*** DOM Ready ***/
document.addEventListener('DOMContentLoaded', function() {

    // Get current user id for messages
    fetch('php/getUserData.php',{ credentials:'include' })
    .then(r => r.json())
    .then(data => { data.forEach(u => { window._myUserId = u.user_id; }); })
    .catch(e => console.error(e));

    // Close buttons
    document.querySelector('#closeSearch').addEventListener('click', () => {
        document.querySelector('.searchSection').style.display = 'none';
        handleClick(previousActiveIcon);
    });
    document.querySelector('#searchIcon').addEventListener('dblclick', () => {
        document.querySelector('.searchSection').style.display = 'none';
        handleClick(previousActiveIcon);
    });
    document.querySelector('#msgClose').addEventListener('click', () => {
        document.querySelector('.message').style.display = 'none';
        if(msgPollInterval){ clearInterval(msgPollInterval); msgPollInterval = null; }
        handleClick(previousActiveIcon);
    });
    document.querySelector('#notifyClose').addEventListener('click', () => {
        document.querySelector('.notification').style.display = 'none';
        handleClick(previousActiveIcon);
    });
    document.querySelector('.post-close').addEventListener('click', () => {
        document.querySelector('.post-bg').style.display = 'none';
        document.querySelector('#add-post').src = '';
        document.querySelector('.right-content').style.display = 'none';
        document.querySelector('.post-btn').style.display = 'block';
        document.querySelector('textarea').value = '';
        const cc = document.getElementById('charCount');
        if(cc) cc.textContent = '0/1000';
        handleClick(previousActiveIcon);
    });

    // New post upload
    document.getElementById('postUploadForm').addEventListener("submit", function(e){
        e.preventDefault();
        const formData = new FormData(this);
        fetch("php/PostUpload.php",{ method:"POST", body:formData, credentials:'include' })
        .then(r => r.json())
        .then(data => {
            if(data.success) location.reload();
            else alert(data.message);
        }).catch(e => console.error(e));
    });

    document.querySelector('#post-upload').addEventListener('change', () => {
        document.querySelector('#add-post').src = URL.createObjectURL(document.querySelector('#post-upload').files[0]);
        document.querySelector('.post-btn').style.display = 'none';
        document.querySelector('.right-content').style.display = 'flex';
    });

    // Search
    document.getElementById('searchInput').addEventListener('input', function() {
        const q = this.value.trim();
        if(q !== ''){
            fetch(`php/search.php?query=${q}`, { credentials:'include' })
            .then(r => r.json())
            .then(data => displayResults(data))
            .catch(e => console.error(e));
        } else { clearResults(); }
    });

    document.querySelector('#searchResults').addEventListener('click', function(e){
        const item = e.target.closest('.displayResult');
        if(!item) return;
        const id = item.getAttribute('data-search-id');
        document.querySelector('.userSearch').style.display = 'block';
        document.querySelector('#home').style.display = 'none';
        document.querySelector('.user-page').style.display = 'none';
        displayUserProfile(id);
    });

    // Follow button in search
    document.querySelector('.userSearch').addEventListener('click', function(e){
        const profileSelect = document.querySelector('.searchUserTop');
        const searchitemId  = profileSelect.getAttribute('data-searched-id');
        if(e.target.matches('.follow')){
            const followbtn = document.querySelector('.userTopSec .button .follow');
            followbtn.classList.toggle('addfollowcolor');
            if(e.target.classList.contains('addfollowcolor')){
                followbtn.innerHTML = 'following';
                addFollower('add', searchitemId);
            } else {
                followbtn.innerHTML = 'follow';
                addFollower('del', searchitemId);
            }
        }
        // Message button on user profile
        if(e.target.matches('#msgThisUser') || e.target.closest('#msgThisUser')){
            const btn = e.target.closest('#msgThisUser') || e.target;
            const uid   = btn.getAttribute('data-uid');
            const uname = btn.getAttribute('data-uname');
            const uimg  = 'php/' + btn.getAttribute('data-uimg');
            document.querySelector('.message').style.display = 'flex';
            openChat(uid, uname, uimg);
        }
    });

    // Post interactions
    document.querySelector('#userPosts').addEventListener('click',  e => handlePostClick("User", e));
    document.querySelector('#searchUserPost').addEventListener('click', e => handlePostClick("Search", e));
    document.querySelector('#home').addEventListener('click',  e => handlePostClick("Home", e));

    // Full post
    document.querySelector('#FullPost').addEventListener('click', function(e){
        const FullPostId = this.getAttribute('full_post_id');
        const likeIcon   = document.querySelector('.fullPost-content .action-button span:first-child i');

        if(e.target.matches('.action-button span:first-child i')){
            e.target.classList.toggle('liked');
            postliked(FullPostId, e.target.classList.contains('liked') ? 'php/postLiked.php' : 'php/postUnliked.php', "");
            printAllPostIds("");
        }
        if(e.target.tagName.toLowerCase() === 'img' && e.detail === 2 && likeIcon && !likeIcon.classList.contains('liked')){
            likeIcon.classList.add('liked');
            postliked(FullPostId,'php/postLiked.php',"");
        }
        if(e.target.matches('#FPsaved')){
            e.target.classList.toggle('saved');
            postSaved(FullPostId, e.target.classList.contains('saved') ? 'saved' : 'unsaved', "");
        }
        if(e.target.matches('.fullPostComment')){
            e.preventDefault();
            const formEl  = e.target.closest('#getFullCommentInput');
            const comment = formEl.querySelector('input[name="comment"]').value;
            if(!comment) return;
            const formData = new FormData();
            formData.append('comment', comment);
            formData.append('post_id', FullPostId);
            fetch("php/postComment.php",{ method:"POST", body:formData, credentials:'include' })
            .then(r => r.json())
            .then(data => {
                if(data.success) RecentComment(data.commentId, FullPostId, comment, '2', "");
                else alert(data.message);
            }).catch(e => console.error(e));
        }
    });

    document.querySelector('.post-box .FullPost-close').addEventListener('click', () => {
        document.querySelector('#FullPost').style.display = 'none';
        document.querySelector('.fullPost-content .post-comment').innerHTML = '';
    });

    // Messages
    document.getElementById('backToList').addEventListener('click', () => {
        if(msgPollInterval){ clearInterval(msgPollInterval); msgPollInterval = null; }
        currentChatUserId = null;
        loadConversations();
    });
    document.getElementById('sendMsgBtn').addEventListener('click', sendMessage);
    document.getElementById('messageInput').addEventListener('keypress', e => {
        if(e.key === 'Enter') sendMessage();
    });
    document.getElementById('newMsgBtn').addEventListener('click', () => {
        document.getElementById('conversationList').style.display = 'none';
        document.getElementById('chatView').style.display = 'none';
        document.getElementById('msgUserSearch').style.display = 'block';
    });
    document.getElementById('backFromSearch').addEventListener('click', () => {
        document.getElementById('msgUserSearch').style.display = 'none';
        loadConversations();
    });
    document.getElementById('msgSearchInput').addEventListener('input', function(){
        const q = this.value.trim();
        const results = document.getElementById('msgSearchResults');
        if(!q){ results.innerHTML = ''; return; }
        fetch(`php/search.php?query=${q}`, { credentials:'include' })
        .then(r => r.json())
        .then(data => {
            results.innerHTML = '';
            data.forEach(u => {
                const div = document.createElement('div');
                div.classList.add('msg-search-result-item');
                div.innerHTML = `<img src="php/${u.profileimage}" alt=""><span>${u.username}</span>`;
                div.addEventListener('click', () => {
                    document.getElementById('msgUserSearch').style.display = 'none';
                    openChat(u.user_id, u.username, 'php/'+u.profileimage);
                });
                results.appendChild(div);
            });
        }).catch(e => console.error(e));
    });

    // Edit profile
    const editBtn = document.getElementById('editProfileBtn');
    if(editBtn) editBtn.addEventListener('click', openEditProfile);

    document.getElementById('closeEditProfile').addEventListener('click', () => {
        document.getElementById('editProfileModal').style.display = 'none';
    });

    document.getElementById('editProfileForm').addEventListener('submit', function(e){
        e.preventDefault();
        const formData = new FormData(this);
        fetch('php/editProfile.php',{ method:'POST', body:formData, credentials:'include' })
        .then(r => r.json())
        .then(data => {
            if(data.success){
                document.getElementById('editProfileModal').style.display = 'none';
                location.reload();
            } else {
                const err = document.getElementById('editProfileError');
                err.textContent = data.message || 'Update failed';
                err.style.display = 'block';
            }
        }).catch(e => console.error(e));
    });

    // Menu
    document.querySelector('#closeMenu').addEventListener('click', () => {
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

    // Dark mode
    document.querySelector('#moon').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? '1' : '0');
        const moon = document.querySelector('#moon');
        moon.classList.toggle('fa-moon', !document.body.classList.contains('dark-mode'));
        moon.classList.toggle('fa-sun',   document.body.classList.contains('dark-mode'));
    });
    if(localStorage.getItem('darkMode') === '1'){
        document.body.classList.add('dark-mode');
        document.querySelector('#moon').classList.replace('fa-moon','fa-sun');
    }

    // Theme close
    document.querySelector('.theme').addEventListener('click', () => {
        ['setting','saved','theme','report','switchAccount','logOut'].forEach(c => document.querySelector('.'+c).style.display = 'none');
        document.querySelector('.themecontent').style.display = 'flex';
    });
    document.querySelector('#closeTheme').addEventListener('click', () => {
        ['setting','saved','theme','report','switchAccount','logOut'].forEach(c => document.querySelector('.'+c).style.display = 'flex');
        document.querySelector('.themecontent').style.display = 'none';
    });

    // Logout confirm
    document.querySelector('.logOut').addEventListener('click', () => {
        ['setting','saved','theme','report','switchAccount','logOut'].forEach(c => document.querySelector('.'+c).style.display = 'none');
        document.querySelector('.logoutbtn').style.display = 'flex';
    });
    document.querySelector('#logout-cancel').addEventListener('click', () => {
        ['setting','saved','theme','report','switchAccount','logOut'].forEach(c => document.querySelector('.'+c).style.display = 'flex');
        document.querySelector('.logoutbtn').style.display = 'none';
    });

    // Comment button on initial static feed
    const staticCommentBtn = document.getElementById('commentBtn');
    if(staticCommentBtn){
        staticCommentBtn.addEventListener('click', () => {
            const pce = document.querySelector('.postComment');
            const vce = document.querySelector('.viewComment');
            if(pce) pce.style.display = pce.style.display === 'flex' ? 'none' : 'flex';
            if(vce) vce.style.display = vce.style.display === 'flex' ? 'none' : 'flex';
        });
    }
});
