document.addEventListener('DOMContentLoaded', function() {
    
    /***********************sign & login******************/
    /*************button fuction***************/
    document.querySelector('#signupBTN').addEventListener('click', () => {
        document.querySelector('#user-login').style.display = 'none';
        document.querySelector('#signup').style.display = 'flex';
    });
    document.querySelector('#loginBTN').addEventListener('click', () => {
        document.querySelector('#user-login').style.display = 'flex';
        document.querySelector('#signup').style.display = 'none';
    });
    /*******verify******/
    const OTP = document.querySelectorAll('.OTP-field');

    OTP[0].focus();

    OTP.forEach((field, index) =>{
        field.addEventListener('keydown', (e) =>{
            if(e.key >= 0 && e.key <=9){
                OTP[index].value = "";
                setTimeout(() => {
                    OTP[index+1].focus();
                },4);
            }
            else if(e.key === 'Backspace'){
                setTimeout(() => {
                    OTP[index-1].focus();
                },4);
            }
        }); 
    });
    /***************form input********************/
    /****SIGNUP*****/
    const form = document.querySelector('#myForm');
    submitBtn = form.querySelector('#signupSubmit');
    errorTxt = form.querySelector('#signupError');

    form.onsubmit = (e) => {
        e.preventDefault();
    }
    
    submitBtn.onclick = () =>{
        let xhr = new XMLHttpRequest();
        xhr.open("POST","php/signup.php", true);
        xhr.withCredentials = true;
        xhr.onload = () =>{
            if(xhr.readyState === XMLHttpRequest.DONE){
                if(xhr.status == 200){
                    let data = xhr.response;
                    console.log(data);
                    if(data == "success"){
                        console.log('successfully signup');
                        location.href = "planner.php";
                    } else{
                        errorTxt.textContent = data;
                        errorTxt.style.display = 'block';
                    }
                }
            } else{
                console.log('not working');
            }
        }

        let formData = new FormData(form);
        xhr.send(formData);
    }
    /****OTPverify*****/
    const OTPform = document.querySelector('#OTPinput');
    verifySubmit = OTPform.querySelector('#verifySubmit');
    verifyError = OTPform.querySelector('#verifyError');

    OTPform.onsubmit = (e) => {
        e.preventDefault();
    }
    
    verifySubmit.onclick = () =>{
        let xhr = new XMLHttpRequest();
        xhr.open("POST","php/verify.php", true);
        xhr.withCredentials = true;
        xhr.onload = () =>{
            if(xhr.readyState === XMLHttpRequest.DONE){
                if(xhr.status == 200){
                    let data = xhr.response;
                    console.log(data);
                    if(data == "success"){
                        console.log('successfully Verified');
                        location.href = "planner.php";
                    } else{
                        verifyError.textContent = data;
                        verifyError.style.display = 'block';
                    }
                }
            } else{
                console.log('not working');
            }
        }

        let formData = new FormData(OTPform);
        xhr.send(formData);
    }
    /****login*****/
    const Loginform = document.querySelector('#LoginForm');
    loginSubmit = Loginform.querySelector('#loginSubmit');
    loginError = Loginform.querySelector('#loginError');

    Loginform.onsubmit = (e) => {
        e.preventDefault();
    }
    
    loginSubmit.onclick = () =>{
        let xhr = new XMLHttpRequest();
        xhr.open("POST","php/login.php", true);
        xhr.withCredentials = true;
        xhr.onload = () =>{
            if(xhr.readyState === XMLHttpRequest.DONE){
                if(xhr.status == 200){
                    let data = xhr.response;
                    console.log(data);
                    if(data == "success"){
                        console.log('successfully Login');
                        location.href = "planner.php";
                    } else{
                        loginError.textContent = data;
                        loginError.style.display = 'block';
                    }
                }
            } else{
                console.log('not working');
            }
        }

        let formData = new FormData(Loginform);
        xhr.send(formData);
    }

});