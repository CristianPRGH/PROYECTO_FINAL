export function BookListItem(book)
{
//   console.table(book);
  const id = book.id;
  const cover = book.bk_cover;
//   const title = book.bk_title.length > 20 ? `${book.bk_title.substring(0,20)}...` : book.bk_title;
  const title = book.bk_title;

  const authorname = book.username;
  // const coauthors = book.properties.coauthors.length;
  // const pages = book.bk_pages;
  const tags = book.bk_tags;

  
    return `
            <div class="swiper-slide w-fit">
                <div id="book-${id}" class="open-bookDialog w-full flex flex-col justify-center items-center p-2 overflow-hidden duration-200 hover:shadow-lg cursor-pointer">
                    <img src="images/books_covers/${cover}" class="rounded-md w-[85px] h-[132px] sm:w-[128px] sm:h-[200px]" alt="${title} cover">
                    <p class="mt-1 w-full truncate text-xs text-center">${title}</p>
                </div>
            </div>`;
}

// export function BookDetail(cover, title, authorimg, authorname, pages, tags, coauthors, sinopsis)
export function BookDetail(book)
{
    const cover     = book.bk_cover;
    const title     = book.bk_title;
    const sinopsis  = book.bk_sinopsis;
    const pages     = book.bk_pages;
    const tags      = book.bk_tags;
    const authorimg = book.userimg;
    const authorname = book.username;
    const coauthors = book.coauthors;
    
    return `<img src="../images/books_covers/${cover}" class="w-[128px] h-[200px] self-center rounded-md  md:w-[256px] md:h-[400px] duration-200" >
            <p class="font-bold text-center text-xl w-full my-3 break-words">${title}</p>
            <div class="flex flex-row items-center justify-center w-full">
                <img class="w-8 h-8 mr-3" src="../images/users_avatars/${authorimg}">
                <p>${authorname}</p>
            </div>
            
            <p>${pages} páginas</p>
            <hr class="w-full border-orange-500">
            <p class="my-1 text-justify">${sinopsis}</p>
            <hr class="w-full border-orange-500">
            <p>Coautores</p>`;
            
}

/**<div class="flex flex-col">
                ${coauthors.map(coauthor =>
                    `<div class="flex p-1 items-center border-b-[1px] border-b-orange-400">
                        <img class="w-6 h-6 mr-3" src="images/users_avatars/${coauthor.image}">
                        <p>${coauthor.name}</p>
                    </div>`
                ).join('')}
            </div> */

export function BookPage(id)
{
    return `<textarea id="page-${id}" class="bg-transparent w-full h-full p-2 outline-none text-justify overflow-x-hidden resize-none" placeholder="Escribe aquí..."></textarea>`
}




/**
 * COAUTORES
 * <p class="flex align-middle text-xs">
    <svg class="h-3 mr-2" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 896 1024">
        <g>
        <path d="M829.42,932.11c-.8.15-4.52.83-10.58,1.94-238.88,43.95-282.82,51.5-287.75,52.09-11.76,1.4-20.55.69-26.88-2.17-3.95-1.79-6.09-3.96-6.66-4.91.28-1.7,2.38-5.74,3.66-8.21,1.25-2.4,2.66-5.13,3.9-8.03,8.22-19.26,2.47-38.79-15.01-50.98-13.04-9.09-30.32-12.78-51.39-10.97-12.58,1.08-233.03,39.02-354.13,59.95l-59.44,47.98c138.62-24.02,402.7-69.5,416.59-70.88,12.41-1.07,22.1.55,28.01,4.67,3.44,2.4,3.1,3.19,2.19,5.31-.68,1.59-1.65,3.47-2.69,5.45-3.97,7.64-9.4,18.09-7.6,31.05,1.97,14.21,12.16,26.45,27.95,33.59,8.88,4.02,19.07,6.01,30.88,6.01,4.66,0,9.58-.31,14.77-.93,9.5-1.13,107.06-18.77,289.97-52.42,6.02-1.11,9.73-1.79,10.52-1.93,9.85-1.79,16.41-11.44,14.66-21.55-1.75-10.11-11.14-16.85-20.99-15.05Z"/>
        <path d="M188.4,751.48l-153.82,165.17c-16.94,18.19-28.87,40.67-34.58,65.15l218.41-176.32c68.37,31.12,122.99,41.04,164.85,41.04,73.54,0,107.68-30.62,107.68-30.62-68.46-36.57-78.22-104.82-78.22-104.82,52.43,22.76,161.66,49.58,161.66,49.58,145.05-99.38,220.86-314.55,220.86-314.55-15.02,4.24-29.38,6-42.91,6-68.08,0-114.85-44.75-114.85-44.75l189.5-42.36C889.97,232.31,896,0,896,0L319.84,526.05c-65.25,59.57-111.13,138.26-131.44,225.44Z"/>
        </g>
        <path d="M430.5,168h-133c-9.66,0-17.5-7.84-17.5-17.5V17.5c0-9.66-7.84-17.5-17.5-17.5h-77c-9.66,0-17.5,7.84-17.5,17.5v133c0,9.66-7.84,17.5-17.5,17.5H17.5c-9.66,0-17.5,7.84-17.5,17.5v77c0,9.66,7.84,17.5,17.5,17.5h133c9.66,0,17.5,7.84,17.5,17.5v133c0,9.66,7.84,17.5,17.5,17.5h77c9.66,0,17.5-7.84,17.5-17.5v-133c0-9.66,7.84-17.5,17.5-17.5h133c9.66,0,17.5-7.84,17.5-17.5v-77c0-9.66-7.84-17.5-17.5-17.5Z"/>
    </svg>
    ${coauthors}
</p> 

* PÁGINAS           
<p class="flex align-middle text-xs">
<svg class="h-3" fill="#000000" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
    viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
<g>
    <path d="M86.45,23.27h-3.475V90.18c0,0.835-0.677,1.513-1.513,1.513H31.987v3.475c0,0.836,0.677,1.513,1.513,1.513l0.001,0v0h52.95
        c0.836,0,1.513-0.677,1.513-1.513V24.782C87.963,23.946,87.286,23.27,86.45,23.27z"/>
    <path d="M77.988,85.193V14.807c0-0.836-0.677-1.513-1.513-1.513h-3.475v66.911c0,0.836-0.677,1.513-1.513,1.513H22.011v3.475
        c0,0.836,0.677,1.513,1.513,1.513c0,0,0,0,0,0h52.951C77.311,86.706,77.988,86.029,77.988,85.193z"/>
    <path d="M68.013,75.218V4.832c0-0.836-0.677-1.513-1.513-1.513H13.55c-0.836,0-1.513,0.677-1.513,1.513v70.386
        c0,0.836,0.677,1.513,1.513,1.513H66.5C67.336,76.731,68.013,76.054,68.013,75.218z"/>
</g>
</svg>
${pages}</p>*/