  _   _                     ____        _              _____ _____ 
 | \ | |                   |  _ \      | |       /\   |  __ \_   _|
 |  \| | _____      _____  | |_) | ___ | |_     /  \  | |__) || |  
 | . ` |/ _ \ \ /\ / / __| |  _ < / _ \| __|   / /\ \ |  ___/ | |  
 | |\  |  __/\ V  V /\__ \ | |_) | (_) | |_   / ____ \| |    _| |_ 
 |_| \_|\___| \_/\_/ |___/ |____/ \___/ \__| /_/    \_\_|   |_____|
                       ______            ______                    
                      |______|          |______|   


One Application that would serve as the scrapper and one application that would serve as server and an api 

PS : Make sure to have the lattest node version

steps to run the applications :

    1 setup 
    you need to install the depencies with 
            npm install

    2 you first start to run the server 
            npm run server 

    3 on a diffrent process to run the scrapping application  
            npm start

    2 api endpoint 
            1 ) please make sure to respect the body syntax
            
            url = http:localhost:3000/api/v1/
            method: post 
            body : {
                date: "Thu_Nov_24_2022"
            }

