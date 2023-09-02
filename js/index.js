const loadData = async () => {
    const data = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const all = await data.json();
    const categories = all.data;
    createElements(categories)
}
const createElements = (videos) => {
    const elements = document.getElementById('show-categories');
    elements.textContent = '';
    videos.forEach(video => {
        const create = document.createElement('div');
        create.classList = `py-3`
        create.innerHTML = `
        <button onclick="clikDataLoad('${video.category_id}')" class="bg-[#F2F2F2] hover:bg-fuchsia-600 hover:text-white font-medium text-base px-5 py-[10px] rounded-xl">${video.category}</button>
        
        `
        elements.appendChild(create);
    });

}


const clikDataLoad = async (categoriesid = '1000')=>{
const data3 = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoriesid}`);
const alldata = await data3.json();
const alldata2 = alldata.data;
if (alldata2.length === 0) {
   const noDataElements = document.getElementById('selected');
   noDataElements.textContent = '';
   const create3 = document.createElement('div');
   create3.classList =` items-center justify-center mr-1 h-full md:mr-[-400px] lg:mr-[-1100px] mt-20`
   create3.innerHTML = `
   <div class="text-center">
   <div class=" pl-32 md:pl-80 lg:pl-[650px]"><img src="./img/Icon.png" class="" alt=""></div>
   <h3 class="text-3xl font-bold">Oops!! Sorry, There is no <br> content here</h3>
</div>
   `
   noDataElements.appendChild(create3);

} else {
    selected(alldata2);
}




}




const selected = (id)=>{
    const elements3 = document.getElementById('selected');
    
    
    elements3.textContent = '';

    id.forEach(cradSection2 => {
        const create3 = document.createElement('div');
        create3.classList = `mx-6 my-4`;
        const uploadedDate = (cradSection2.others.posted_date ); // Parse the uploaded date

        // Calculate hours and minutes
        const hours = Math.floor(uploadedDate / 3600);
        const minutes = Math.floor((uploadedDate % 3600) / 60);
        const timeText = (hours === 0 && minutes === 0) ? '': `${hours} hours ${minutes} minutes ago`;
        create3.innerHTML = `
            <div class="">
            <figure class="relative">
            <img src="${cradSection2.thumbnail}" alt="Shoes" class="w-full h-full" />
            <p class="absolute right-[20px] text-white bg-black p-1  bottom-2">${timeText}</p>
            </figure>
            <div class="flex gap-4 items-center mt-3">
            <img src="${cradSection2?.authors[0]?.profile_picture}" class="rounded-full w-10 h-10" alt="">
            <h2 class="text-xl font-semibold">${cradSection2.title}</h2>    
            </div>
            <div class="flex gap-2 mt-3">
            <p>${cradSection2?.authors[0]?.profile_name}</p>
            <p>${cradSection2?.authors[0]?.verified === true? '<img src="img/fi_10629607.svg" alt="">' : ''}</p>
            </div>
            <p>${cradSection2?.others?.views} <span>views</span></p>
        </div>
            
            
        `
        elements3.appendChild(create3);
    })


}
// end

clikDataLoad()

loadData()
