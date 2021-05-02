let c = document.getElementById("my-canvas");
let ctx = c.getContext("2d");





let loadImage = (src,callback) => {
    let img = document.createElement("img"); 
img.onload = () => callback(img);
img.src = src;
};


let imagePath = (framenumber, animation) => {
    return "images/" + animation + "/" + framenumber + ".png";
};

let frames = {
    idle: [1, 2, 3, 4, 5, 6, 7, 8],
    kick: [1, 2, 3, 4, 5, 6, 7],
    punch: [1, 2, 3, 4, 5, 6, 7],
    block: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    forward: [1, 2, 3, 4, 5, 6]    
};


let loadImages = (callback) => {

    let images = { idle:[], kick:[], punch:[], block:[], forward:[] };
    let imagesToLoad = 0;

    ["idle", "kick", "punch", "block", "forward"].forEach(animation => {
        let animationFrames = frames[animation];
        imagesToLoad = imagesToLoad + animationFrames.length;

        animationFrames.forEach((framenumber) => {
            let path = imagePath(framenumber, animation);

            loadImage(path, (image) => {
                images[animation][framenumber-1] = image;
                imagesToLoad = imagesToLoad - 1;
    
                if(imagesToLoad ===0 ){
                    callback(images);
                }
    
            });

        })
       
    })
};

let animate = (ctx, images, animation, callback) =>{
    images[animation].forEach((image, index) => {
        setTimeout(() => {
            ctx.clearRect(0, 0, 500, 500);
            ctx.drawImage(image, 0, 0,500,500);
        }, index * 100);
    });
     setTimeout(callback, images[animation].length * 100);
};

loadImages((images) => {

    let queueAnimations = [];
    let aux = () =>{
        let selectedAnimation;

        if(queueAnimations.length === 0)
        selectedAnimation = "idle";
        else{
            selectedAnimation = queueAnimations.shift();
        }

        animate(ctx, images, selectedAnimation, aux)
    }

    aux(); 
    document.getElementById("kick").onclick = () => {
        queueAnimations.push("kick"); 
    }
    document.getElementById("punch").onclick = () => {
        queueAnimations.push("punch");
    } 
    document.getElementById("block").onclick = () => {
        queueAnimations.push("block"); 
    }
    document.getElementById("forward").onclick = () => {
        queueAnimations.push("forward"); 
    };

    document.addEventListener('keyup', function(event) {
        const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    
        if (key === "ArrowLeft" || key === "A" || key === "a"){
            queueAnimations.push("kick");
        } else if (key === "ArrowRight" || key === "D" || key === "d"){
            queueAnimations.push("punch");
        }
          else if (key === "ArrowUp" || key === "W" || key === "w"){
            queueAnimations.push("block");
        }
         else if (key === "ArrowDown" || key === "S" || key === "s"){
            queueAnimations.push("forward");
        }
    });
});


