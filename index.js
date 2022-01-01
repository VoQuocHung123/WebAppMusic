const playlist = document.querySelector(".playlist");
const heading = document.querySelector("header h2");
const cdThumb = document.querySelector(".cd-thumb");
const audio = document.querySelector("#audio");
const cd = document.querySelector('.cd');
const btnPlay = document.querySelector('.btn-toggle-play');
const playing = document.querySelector('.player');
const progress = document.querySelector('#progress');
const btnNext = document.querySelector('.btn-next');
const btnPrev = document.querySelector('.btn-prev');
const btnRandom = document.querySelector('.btn-random');
const btnRepeat = document.querySelector('.btn-repeat');
var check = false;
var checkRandom = false;
var checkRepeat = false;
var i = 0;
const nhac = {
    song:[
        {
            name:"Bước Qua Nhau",
            singer:"Vũ",
            path:"./baihat/buoc_qua_nhau.mp3",
            image:"./hinhanh/buoc_qua_nhau.jpg"
        },
        {
            name:"Ái Nộ",
            singer:"Masew x Khôi Vũ",
            path:"./baihat/ai_no.mp3",
            image:"./hinhanh/ai_no.jpg"
        },
        {
            name:"Dịu Dàng Em Đến",
            singer:"Erik",
            path:"./baihat/diu_dang_em_den.mp3",
            image:"./hinhanh/diu_dang_em_den.jpg"
        },
        {
            name:"Nàng Thơ",
            singer:"Hoàng Dũng",
            path:"./baihat/NangTho-HoangDung-6413381.mp3",
            image:"./hinhanh/nangtho.jpg"
        },
        {
            name:"Em Đã Thương Người Ta Hơn Anh",
            singer:"Noo Phước Thịnh",
            path:"./baihat/EmDaThuongNguoiTaHonAnh-NooPhuocThinh-6607401.mp3",
            image:"./hinhanh/emdathuongnguoitahonanh.jpg"
        },
        {
            name:"Em Có Còn Dùng Số Này Không",
            singer:"Thái Đinh",
            path:"./baihat/EmCoConDungSoNayKhong-ThaiDinh-5947752.mp3",
            image:"./hinhanh/emcocondungsonaykhong.jpg"
        }
        ],
    render:function(){
        const html = this.song.map((song,index) => {
            return ` <div class="song" data-index="${index}">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>`
        })
        playlist.innerHTML = html.join();
    },

    handleEvents:function(){
        
        const cdWidth = cd.offsetWidth;
        document.onscroll = function(){
            let scroll = window.scrollY || document.documentElement.scrollTop;
            scroll = Math.floor(scroll);
            const newCDwidth = cdWidth - scroll;
            if(newCDwidth <0){
                cd.style.width = 0+"px";
            }else{
                cd.style.width = newCDwidth +"px";
                cd.style.opacity = newCDwidth/cdWidth;
            }
        }

        btnPlay.onclick = function(){
            if(check == false){
                audio.play();
                playing.classList.add('playing');
                check = true;
                handleQuay.play();
            }else{
                audio.pause();
                playing.classList.remove('playing');
                check = false;
                handleQuay.pause();
            }
            nhac.activeSong();
        }
        btnRandom.onclick = function(){
            if(checkRandom ==false){
                btnRandom.classList.add('active')
                checkRandom = true;
            }else{
                btnRandom.classList.remove('active')
                checkRandom = false;
            }
        }
        btnNext.onclick = function(){
            if(checkRandom == true){
                nhac.randomSong();
            }else{
                nhac.nextSong();
            }
            playing.classList.add('playing');
            handleQuay.play();
            audio.play();
            nhac.activeSong();
            nhac.scrollToActiveSong();
            check = true;
        }
        btnPrev.onclick = function(){
            if(checkRandom == true){
                nhac.randomSong();
            }else{
                nhac.PrevSong();
            }
            playing.classList.add('playing');
            handleQuay.play();
            audio.play();
            nhac.activeSong();
            nhac.scrollToActiveSong();
            check = true;
        }
        btnRepeat.onclick = function(){
            if(checkRepeat == false){
                checkRepeat = true;
                btnRepeat.classList.add('active')
            }else{
                btnRepeat.classList.remove('active')
                checkRepeat = false;
            }
        }
       
        audio.ontimeupdate = function(){
            if(audio.duration){
                const progressPercent = Math.floor(audio.currentTime/audio.duration*100);
                progress.value =progressPercent;
                if(progressPercent>=100){
                    if(checkRandom== true){
                        nhac.randomSong();
                        audio.play();
                    }else if(checkRepeat ==true){
                        nhac.loadSongTheFirst();
                        audio.play();
                    }
                    else{
                    nhac.nextSong();
                    audio.play();
                    }
                    progress.value = 0;
                }
            }
        }
        progress.onchange = function(e){
            audio.currentTime =audio.duration/ 100 * e.target.value
        }
        const handleQuay =  cdThumb.animate([
            { transform :'rotate(360deg)'}
        ],{
            duration : 10000,
            iterations : Infinity
        })
        handleQuay.pause();
        playlist.onclick  =function(e){
            const songIndex = e.target.closest('.song');
            i = Number(songIndex.dataset.index);
            nhac.loadSongTheFirst();
            audio.play();
            nhac.activeSong();
            handleQuay.play();
            playing.classList.add('playing');
            check = true;
        }
    },
    loadSongTheFirst:function(){
        heading.textContent = this.song[i].name;
        cdThumb.style.backgroundImage = `url('${this.song[i].image}')`;
        audio.src = this.song[i].path;
    },
    activeSong: function(){
        const itemSong =document.querySelectorAll('.song');
        itemSong.forEach((item,index)=>{
            if(index ==i){
                item.classList.add('active');
            }else{
                item.classList.remove('active');
            }
        })
    },
    scrollToActiveSong:function(){
        setTimeout(()=>{
            document.querySelector(".song.active").scrollIntoView({
                behavior : "smooth",
                block: "center"
            });
        },300)
        
    },
    nextSong: function(){
        i++;
        if(i>=this.song.length){
            i = 0;
        }
        this.loadSongTheFirst();
    },
    PrevSong: function(){
        i--;
        if(i<0){
            i = this.song.length-1
        }
        this.loadSongTheFirst();
    },
    randomSong: function(){
        let rand = 0;
        do{
             rand = Math.floor(Math.random()*this.song.length);
             console.log(rand);
        }while(rand == i)
        i = rand;
        this.loadSongTheFirst();
    },
    start: function(){
        
        this.handleEvents();
        this.loadSongTheFirst();
        this.render();
    }

};
nhac.start();

// function renderNhac(){
//     const html = nhac.song.map(song => {
//         return ` <div class="song">
//         <div class="thumb" style="background-image: url('${song.image}')">
//         </div>
//         <div class="body">
//           <h3 class="title">${song.name}</h3>
//           <p class="author">${song.singer}</p>
//         </div>
//         <div class="option">
//           <i class="fas fa-ellipsis-h"></i>
//         </div>
//       </div>`
//     })
//     playlist.innerHTML = html.join();
// }
// renderNhac();
