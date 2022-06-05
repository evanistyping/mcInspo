const button = document.getElementById("button1");
const mcImage = document.getElementById("mcImage");


async function getRedditPost() {
    const res = await fetch("https://www.reddit.com/r/Minecraftbuilds/random.json");
    const data = await res.json();
    return data[0].data.children[0].data;
}

async function getImage(){
    const match = /.(jpg|gif|png)$/;
    const gallery = /\/gallery/
    const rjson = await getRedditPost();

    // alert(rjson.url);

    // If type gallery, return concatinated string for img link
    if(gallery.test(rjson.url)){ return "https://i.redd.it/" + rjson.gallery_data.items[0].media_id + ".png"};
    // else check if png or jpeg or gif and return, base case return error image.
    return {img: match.test(rjson.url) ? rjson.url : "https://media.minecraftstation.com/2020/11/image-1024x542.png"};
}


async function start(){
    const rjson = await getImage();

    // alert(rjson.img);

    if(rjson.img != null){
        // For png/jpeg/gif
        mcImage.setAttribute("src", rjson.img);
    }
    else{
        // for gallery img link
        mcImage.setAttribute("src", rjson);
    }
    
}

button.addEventListener("click", start);