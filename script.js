//Load images in script.js

const container = document.querySelector('.container');
async function loadImages(numImages = 9) {
    for (let i = 0; i < numImages; i++) {
        try {
            // Show loading spinner before fetching
            loadingSpinner();
            // Show loading spinner before fetching

            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await response.json();

            // Remove loading spinner after fetching
            document.querySelector('.loading').remove();
            // Remove loading spinner after fetching

            const image = document.createElement('img');
            image.src = data.message;
            container.appendChild(image);
        } catch (error) {
            console.log(error);
        }
    }
}


//Call handleScroll every time a user triggers a “scroll” event on the browser.

const handleScroll = () => {
    console.log('innerHeight', window.innerHeight);
    console.log('scrolly', window.scrollY);
    console.log('container.scrollHeight', container.scrollHeight);

    if (window.innerHeight + window.scrollY >= container.scrollHeight) {
        console.log('Loading more images');
        loadImages();
    }
}

/**
 * There are 3 properties that you need to know:

1.window.innerHeight: height of what you see in your browser
2.window.scrollY: what’s the height you scroll down already
3.element.scrollHeight: the height of your loaded content which could overflow outside the screen
if (window.innerHeight + window.scrollY >= container.scrollHeight) , this means that we have reached the end of the content. It’s time to fetch more images.
 */


//Add loading spinners for a better user experience
const loadingSpinner = () => {
    const loadingDiv = document.createElement("img");
    loadingDiv.className = "loading";
    loadingDiv.src = 'https://i.gifer.com/PVtR.gif';
    container.append(loadingDiv);
}

/**
 * Wait…How can we make it better?
If you keep triggering scrolling events rapidly,
 you will notice that it doesn’t stop fetching. This is not ideal because it will trigger too many API requests in a short period. We could improve this by using “throttling” which ensures 
 we only fetch images at most once in 2s.
 */

const throttle = (callback, limit) => {
    let lastFunc;
    let lastRan;
    return function () {
        const args = arguments;
        if (!lastRan) {
            callback(...args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function () {
                if ((Date.now() - lastRan) >= limit) {
                    callback(...args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

loadImages();
window.addEventListener('scroll', throttle(handleScroll, 1000));