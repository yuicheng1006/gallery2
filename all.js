// 存資料的 data
let data = null;
// 當前圖片
let gallery = document.querySelector('.gallery');
// 作者名字
let userName = document.querySelector('.user-name');
// 相片列表
let galleryItem = document.querySelector('.gallery');
// lightbox 的背景
let backgroundCover = document.querySelector('.background-cover');
// 輪播圖
let lightBox = document.querySelector('.lightbox');
// 顯示目前的照片
let slideImg = document.querySelector('.slide-img');
// title
let imgName = document.querySelector('.img-name');
// 當前頁
let photoCurren = document.querySelector('.photo-curren');
// 照片總數量
let photoTotal = document.querySelector('.photo-total');

~async function () {
    console.log('開始'); // 先顯示「開始」
    await fetch('https://emma.pixnet.cc/album/elements?set_id=4555593&user=jiney&format=json') // 帶有 await 的 fetch
        .then(res => {
            return res.json();
        }).then(res => {
            console.log('res', res);
            userName.innerHTML = `<div class="user-name">${res.set.user.name}'s</div>`;
            // 塞照片資料
            let str = res.elements.map((element) =>
                `
            <li class="gallery-item">
            <div class="item-image" id="${element.id}" style="background-image:url('${element.thumb}')"></div>
            <div class="item-name">
                <span>${element.title}</span>
            </div>
        </li>
            `
            ).join("");
            gallery.innerHTML = str;
            // 把資料存進 data 裡
            data = res.elements;
            console.log('data', data);
        });
    // 顯示當前圖片
    galleryItem.addEventListener('click', (e) => {
        data.forEach(element => {
            console.log(element.id);
            if (e.target.id === element.id) {
                backgroundCover.style.display = 'block';
                lightBox.style.display = 'flex';
                slideImg.style.backgroundImage = `url('${element.thumb}')`;
                imgName.textContent = element.title;
                photoCurren.textContent = parseInt(element.position) + 1;
                slideImg.dataset.num = element.position;
            };
            photoTotal.textContent = data.length;
        });
    });
    // 切換上一張照片

    // 前一個按鈕監聽
    let preArrow = document.querySelector('.pre-arrow');
    let sum = 0;
    preArrow.addEventListener('click', () => {
        sum = parseInt(slideImg.dataset.num);
        console.log('sum', sum);
        if (slideImg.dataset.num == 0) {
            slideImg.dataset.num = 7;
            photoCurren.textContent = 8;
            imgName.textContent = data[7].title;
            slideImg.style.backgroundImage = `url('${data[7].thumb}')`;
            sum = 8;
        } else {
            slideImg.dataset.num = sum - 1;
            photoCurren.textContent = sum;
            imgName.textContent = data[sum - 1].title;
            slideImg.style.backgroundImage = `url('${data[sum-1].thumb}')`;
            sum = sum - 1;
        }


    });


    // 切換下一張照片

    // 後一個按鈕監聽
    let nextArrow = document.querySelector('.next-arrow');
    nextArrow.addEventListener('click', () => {
        sum = parseInt(slideImg.dataset.num);
        if (slideImg.dataset.num == 7) {
            photoCurren.textContent = 1;
            slideImg.dataset.num = 0;
            imgName.textContent = data[0].title;
            slideImg.style.backgroundImage = `url('${data[0].thumb}')`;
            sum = 0;
        } else {
            slideImg.dataset.num = sum + 1;
            photoCurren.textContent = sum + 2;
            imgName.textContent = data[sum + 1].title;
            slideImg.style.backgroundImage = `url('${data[sum+1].thumb}')`;
            sum = sum + 1;
        }
    });

    // 點擊外面背景關閉 lightbox

    backgroundCover.addEventListener('click', () => {
        backgroundCover.style.display = 'none';
        lightBox.style.display = 'none';
    });

}();